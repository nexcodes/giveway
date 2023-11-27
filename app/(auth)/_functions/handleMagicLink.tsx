"use server";

import { Database } from "@/types/db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { userAuthSchema } from "@/lib/validations/auth";
import { z } from "zod";

type FormData = z.infer<typeof userAuthSchema>;

interface handleMagicLinkProps {
  data: FormData;
  ORIGIN: string;
  IsRegisterUser?: boolean;
}

async function handleMagicLink({
  data,
  ORIGIN,
  IsRegisterUser,
}: handleMagicLinkProps) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const { error } = await supabase.auth.signInWithOtp({
    email: data.email,
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: IsRegisterUser,
      emailRedirectTo: ORIGIN,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return true;
}

export { handleMagicLink };
