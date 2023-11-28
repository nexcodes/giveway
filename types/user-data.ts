export interface UserData {
  id: string;
  created_at: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
  stripe_current_period_end: number | null;
  stripe_customer_id: string | null;
  stripe_price_id: string | null;
  stripe_subscription_id: string | null;
  isAdmin?: boolean | null;
}
