// @ts-nocheck

import { UserSubscriptionPlan } from "@/types/subscription";
import { NoPlan, proPlan, PremiumPlan } from "@/config/subscription";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/db";

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  const supabase = createClientComponentClient<Database>();

  const proPlanPriceId = process.env.STRIPE_PRO_PLAN_PRICE_ID;
  const premiumPlanPriceId = process.env.STRIPE_PREMIUM_PLAN_PRICE_ID;

  const { data: user } = await supabase
    .from("users")
    .select(
      "stripe_subscription_id, stripe_current_period_end, stripe_customer_id, stripe_price_id"
    )
    .eq("id", userId)
    .single();

  if (!user) {
    throw new Error("User not found");
  }

  // Check if user is on a plan.
  // stripe_current_period_end is in seconds, so we multiply by 1000 to get milliseconds.
  const isPro =
  user.stripe_price_id === proPlanPriceId &&
  (user.stripe_current_period_end * 1000) + 86_400_000 > Date.now();
  
  const isPremium =
  user.stripe_price_id === premiumPlanPriceId &&
  (user.stripe_current_period_end * 1000) + 86_400_000 > Date.now();
  
  
  const plan = isPremium ? PremiumPlan : isPro ? proPlan : NoPlan;
  
  const NoPlanActive = !(isPro || isPremium)

  return {
    ...plan,
    ...user,
    stripe_current_period_end: user.stripe_current_period_end,
    isPro,
    isPremium,
    NoPlanActive
  };
}
