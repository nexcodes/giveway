import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import * as z from "zod";

import { Database } from "@/types/db";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const routeContextSchema = z.object({
  params: z.object({
    prizeId: z.string(),
  }),
});

async function getCookie() {
  const cookie = cookies()
  return new Promise<ReadonlyRequestCookies>((resolve) =>
    setTimeout(() => {
      resolve(cookie)
    }, 1000)
  )
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  const cookie = await getCookie()
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookie
  });
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this prize.
    if (!(await verifyCurrentUserHasAccessToPost(params.prizeId))) {
      return new Response(null, { status: 403 });
    }

    // Get the request body and validate it.
    const json = await req.json();

    // Update the prize.
    await supabase
      .from("prizes")
      .update({
        published: json.published,
      })
      .eq("id", params.prizeId)
      .select();

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

async function verifyCurrentUserHasAccessToPost(postId: string) {
  const cookie = await getCookie()

  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookie
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
