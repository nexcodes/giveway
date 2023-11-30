import { stripe } from "@/lib/stripe";
import { UpdateUserSubscription } from "./supabase-actions";

export const StripeSuccess = async (session_id: string) => {
  const session = await stripe.checkout.sessions.retrieve(session_id);

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

  if (session.customer_email) {
    UpdateUserSubscription(
      subscription.id,
      subscription.current_period_end,
      subscription.items.data[0].plan.id,
      session.customer_email,
      balance
    );
  }
};
