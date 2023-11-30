import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { z } from "zod";

import { Database } from "@/types/db";
import { proPlan, PremiumPlan } from "@/config/subscription";
import { stripe } from "@/lib/stripe";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { absoluteUrl } from "@/lib/utils";

const billingUrl = absoluteUrl("/dashboard/billing");

export async function GET(req: Request) {
  const supabase = createRouteHandlerClient<Database>({
    
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

    const lineItem = {
      price: proPlan.stripe_price_id,
      quantity: 1,
    };

    // The user is on the free plan.
    // Create a checkout session to upgrade.
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: session.user.email,
      line_items: [lineItem],
      metadata: {
        userId: session.user.id,
      },
    });

    return new Response(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
