import { redirect } from "next/navigation";

import { stripe } from "@/lib/stripe";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { createStripeCustomerId, getUser } from "@/actions/supabase-actions";
import { CurrentPlan } from "@/app/(main)/_components/current-plan";
import PricingSection from "./pricing-section";

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
};

export default async function BillingPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  if (!user.stripe_customer_id) {
    const customer = await stripe.customers.create({
      email: user.email ?? "",
      name: user.name ?? "",
    });

    const stripe_customer_id = customer.id;

    await createStripeCustomerId(stripe_customer_id, user.email ?? "");
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false;
  if (
    (subscriptionPlan.isPro || subscriptionPlan.isPremium) &&
    subscriptionPlan.stripe_subscription_id
  ) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.stripe_subscription_id
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return (
    <div className="space-y-4">
      <CurrentPlan
        subscriptionPlan={{
          ...subscriptionPlan,
          isCanceled,
        }}
      />
      {subscriptionPlan.NoPlanActive && <PricingSection />}
    </div>
  );
}
