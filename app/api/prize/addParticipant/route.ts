import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import * as z from "zod";

import { Database } from "@/types/db";
import { getUser } from "@/actions/supabase-actions";

function removeDuplicates(arr: string[]) {
  return Array.from(new Set(arr));
}

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

    if (!isEligible) {
      return new Response(
        JSON.stringify({ success: false, error: "Not enough credits" })
      );
    }

    const participations = removeDuplicates([
      ...(user?.participations ?? []),
      json.prizeId,
    ]);

    if (isEligible) {
      await supabase
        .from("prizes")
        .update({
          participants: JSON.stringify(json.participants),
        })
        .eq("id", json.prizeId)
        .select();

      await supabase
        .from("users")
        .update({
          participations: participations,
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
