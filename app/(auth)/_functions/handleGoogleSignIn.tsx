"use server";

import { Database } from "@/types/db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface handleGoogleSignInProps {
  ORIGIN: string;
}

export const handleGoogleSignIn = async ({
  ORIGIN,
}: handleGoogleSignInProps) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",

    options: {
      redirectTo: ORIGIN,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return true;
};
