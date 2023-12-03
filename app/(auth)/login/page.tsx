import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getUser } from "@/actions/supabase-actions";
import LoginArea from "./login-area";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function LoginPage() {
  const user = await getUser();

  if (user) {
    redirect("/dashboard");
  }

  return <LoginArea />;
}
