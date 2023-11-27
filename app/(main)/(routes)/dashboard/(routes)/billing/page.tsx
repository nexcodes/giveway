import { redirect } from "next/navigation";

import { stripe } from "@/lib/stripe";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { getUser } from "@/actions/supabase-actions";
import { BillingForm } from "@/app/(main)/_components/billing-form";

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
};

export default async function BillingPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false;
  if (subscriptionPlan.isPro && subscriptionPlan.stripe_subscription_id) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.stripe_subscription_id
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return (
    <div className="grid gap-8">
      <BillingForm
        subscriptionPlan={{
          ...subscriptionPlan,
          isCanceled,
        }}
      />
    </div>
  );
}
