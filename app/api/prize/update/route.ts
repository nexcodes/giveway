import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import * as z from "zod";

import { Database } from "@/types/db";

const PrizeUpdateSchema = z.object({
  title: z.string(),
});

export async function POST(req: Request) {
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
    const body = PrizeUpdateSchema.parse(json);

    const { data: prize } = await supabase
      .from("prizes")
      .update({
        ...body
      })
      .eq("author_id" , session.user.id)
      .select();

    return new Response(JSON.stringify(prize));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
