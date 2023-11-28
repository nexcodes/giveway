import { SubscriptionPlan } from "@/types/subscription";

export const NoPlan: SubscriptionPlan = {
  name: "No",
  description:
    "You are not on a plan.",
  stripe_price_id: "",
};

export const proPlan: SubscriptionPlan = {
  name: "PRO",
  description: "This is the pro plan",
  stripe_price_id: process.env.STRIPE_PRO_PLAN_PRICE_ID || "",
};

export const PremiumPlan: SubscriptionPlan = {
  name: "Premium",
  description: "This is the premium plan",
  stripe_price_id: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID || "",
};
