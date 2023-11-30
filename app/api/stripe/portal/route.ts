import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { z } from "zod";

import { Database } from "@/types/db";
import { proPlan } from "@/config/subscription";
import { stripe } from "@/lib/stripe";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { absoluteUrl } from "@/lib/utils";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const billingUrl = absoluteUrl("/dashboard/billing");

async function getCookie() {
  const cookie = cookies();
  return new Promise<ReadonlyRequestCookies>((resolve) =>
    setTimeout(() => {
      resolve(cookie);
    }, 1000)
  );
}

export async function GET(req: Request) {
  const cookie = await getCookie();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookie,
  });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user || !session?.user.email) {
      return new Response(null, { status: 403 });
    }

    const subscriptionPlan = await getUserSubscriptionPlan(session.user.id);

    // The user is on the pro plan.
    // Create a portal session to manage subscription.
    if (!subscriptionPlan.NoPlanActive && subscriptionPlan.stripe_customer_id) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripe_customer_id,
        return_url: billingUrl,
      });
      return new Response(JSON.stringify({ url: stripeSession.url }));
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
