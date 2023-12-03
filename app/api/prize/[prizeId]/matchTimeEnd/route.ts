import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import * as z from "zod";

import { Database } from "@/types/db";

export async function GET() {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  try {
    const { data: prize } = await supabase
      .from("prizes")
      .select("time_end")
      .lte("time_end", new Date().toISOString())
      .select();

    if (!prize) {
      throw new Error("Prize hasn't ended yet.");
    }

    return new Response(JSON.stringify(prize));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
