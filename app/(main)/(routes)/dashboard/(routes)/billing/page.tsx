import { redirect, useSearchParams } from "next/navigation";

import { stripe } from "@/lib/stripe";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { getUser } from "@/actions/supabase-actions";
import { CurrentPlan } from "@/app/(main)/_components/current-plan";
import { createStripeAccount } from "@/actions/create-stripe-account";
import PricingCard from "@/app/(main)/_components/pricing-card";
import { StripeSuccess } from "@/actions/stripe-success";

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
};

const pricing_1 = {
  title: "What's included in the Premium plan",
  bill: "Billed Monthly",
  button: "Upgrade to Premium",
  price: "$29",
  features: [
    { content: "500 Credits", check: true },
    { content: "Daily free Coupons", check: true },
    { content: "Daily 15 free credits", check: true },
    { content: "Access to Random Draw", check: true },
  ],
};

const pricing_2 = {
  title: "What's included in the Pro plan",
  bill: "Billed Monthly",
  button: "Upgrade to Pro",
  price: "$19",
  features: [
    { content: "300 Credits", check: true },
    { content: "Weekly free Coupons", check: true },
    { content: "Daily 10 free credits", check: true },
    { content: "Access to Random Draw", check: true },
  ],
};

// app/posts/page.ts
type Props = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function BillingPage(props: Props) {
  const searchParams = props.searchParams;

  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  if (!user.stripe_customer_id) {
    await createStripeAccount({
      user: {
        email: user.email,
        name: user.name,
      },
    });
  }

  if (searchParams.success && searchParams.session_id) {
    const session_id = searchParams.session_id;
    if (session_id) {
      StripeSuccess(session_id as string);
    }
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
      {subscriptionPlan.NoPlanActive && (
        <>
          <PricingCard {...pricing_1} route={"premium"} />
          <PricingCard {...pricing_2} route={"pro"} />
        </>
      )}
    </div>
  );
}
