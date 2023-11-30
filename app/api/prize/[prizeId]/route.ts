import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import * as z from "zod";

import { Database } from "@/types/db";

export async function PATCH(req: Request) {
  console.log("running");
  const supabase = createRouteHandlerClient<Database>({
    cookies,
  });
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const json = await req.json();

    const { data: prize, error } = await supabase
      .from("prizes")
      .update({
        title: json.title,
        image: json.image,
        winner: json.winner,
        time_end: new Date(json.time_end).toISOString(),
        participants: json.participants,
        credit_need: parseInt(json.credit_need),
      })
      .eq("author_id", session.user.id)
      .select();

    console.log(error, "ERROR_");

    return new Response(JSON.stringify(prize));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
