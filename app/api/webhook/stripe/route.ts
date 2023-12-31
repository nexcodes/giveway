import { cookies, headers } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import Stripe from "stripe";

import { Database } from "@/types/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  const supabase = createRouteHandlerClient<Database>({
    cookies,
  });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    const balance =
      process.env.STRIPE_PREMIUM_PLAN_PRICE_ID ===
      subscription.items.data[0].plan.id
        ? 500
        : process.env.STRIPE_PRO_PLAN_PRICE_ID ===
          subscription.items.data[0].plan.id
        ? 300
        : 0;
    // Update the user stripe into in our database.
    // Since this is the initial subscription, we need to update
    // the subscription id and customer id.
    const { error } = await supabase
      .from("users")
      .update({
        stripe_subscription_id: subscription.id,
        stripe_current_period_end: subscription.current_period_end,
        stripe_price_id: subscription.items.data[0].plan.id,
        balance,
      })
      .eq("email", session?.customer_email ?? "");
  }

  if (event.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    const balance =
      process.env.STRIPE_PREMIUM_PLAN_PRICE_ID ===
      subscription.items.data[0].plan.id
        ? 500
        : process.env.STRIPE_PRO_PLAN_PRICE_ID ===
          subscription.items.data[0].plan.id
        ? 300
        : 0;
    // Update the price id and set the new period end.
    await supabase
      .from("users")
      .update({
        stripe_price_id: subscription.items.data[0].price.id,
        stripe_current_period_end: subscription.current_period_end,
        balance,
      })
      .eq("stripe_subscription_id", subscription.id);
  }

  return new Response(null, { status: 200 });
}
