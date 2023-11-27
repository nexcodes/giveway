import { UserData } from "./user-data";

export type SubscriptionPlan = {
  name: string;
  description: string;
  stripe_price_id: string;
};

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<UserData, "stripe_customer_id" | "stripe_subscription_id"> & {
    stripe_current_period_end: number;
    isPro: boolean;
  };
