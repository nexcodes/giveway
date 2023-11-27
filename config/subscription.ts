import { SubscriptionPlan } from "@/types/subscription";

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "The free plan is limited to 3 posts. Upgrade to the PRO plan for unlimited posts.",
  stripe_price_id: "",
};

export const proPlan: SubscriptionPlan = {
  name: "PRO",
  description: "The PRO plan has unlimited posts.",
  stripe_price_id: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID || "",
};
