import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import * as z from "zod";

import { Database } from "@/types/db";

const routeContextSchema = z.object({
  params: z.object({
    prizeId: z.string(),
  }),
});

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this prize.
    if (!(await verifyCurrentUserHasAccessToPost(params.prizeId))) {
      return new Response(null, { status: 403 });
    }

    const json = await req.json();
    const { data: prize } = await supabase
      .from("prizes")
      .update({
        ...json,
        time_end: new Date(json.time_end).toISOString(),
        prize_value: parseInt(json.prize_value),
        credit_need: parseInt(json.credit_need),
      })
      .eq("id", params.prizeId)
      .select();
    return new Response(JSON.stringify(prize));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

async function verifyCurrentUserHasAccessToPost(postId: string) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from("users")
    .select("isAdmin")
    .eq("email", session?.user.email ?? "")
    .eq("isAdmin", true);

  return data && data?.length > 0;
}
