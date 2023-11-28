import { UserData } from "@/types/user-data";
import { createStripeCustomerId } from "./supabase-actions";

interface createStripeAccountProps {
  user: Pick<UserData, "email" | "name">;
}

export const createStripeAccount = async ({
  user,
}: createStripeAccountProps) => {
  const response = await fetch(
   `${location.origin}/api/stripe/createAccount`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        name: user.name,
      }),
    }
  );

  const data = await response.json();

  const stripe_customer_id = data.id;

  await createStripeCustomerId(stripe_customer_id, user.email ?? "");
};
