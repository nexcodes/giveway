import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import * as z from "zod";

import { Database } from "@/types/db";
import { getUser } from "@/actions/supabase-actions";

export async function PATCH(req: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  try {
    const user = await getUser();
    // Validate route params.
    const json = await req.json();

    const isEligible = (user?.balance ?? 0) > json.credit;

    if (isEligible) {
      await supabase
        .from("prizes")
        .update({
          participants: json.participants,
        })
        .eq("id", json.prizeId)
        .select();

      await supabase
        .from("users")
        .update({
          balance: (user?.balance ?? 0) - json.credit,
        })
        .eq("email", user?.email ?? "")
        .select();
    }
    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
