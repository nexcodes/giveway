import { stripe } from "@/lib/stripe";
import { UpdateUserSubscription } from "./supabase-actions";

export const StripeSuccess = async (session_id: string) => {
  const session = await stripe.checkout.sessions.retrieve(session_id);

  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  );
    
  if (session.customer_email) {
    UpdateUserSubscription(
      subscription.id,
      subscription.current_period_end,
      subscription.items.data[0].plan.id,
      session.customer_email
    );
  }
};
