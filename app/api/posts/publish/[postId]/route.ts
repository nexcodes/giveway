import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import * as z from "zod";

import { Database } from "@/types/db";

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
});

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  const supabase = createRouteHandlerClient<Database>({
    cookies,
  });
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context);

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToPost(params.postId))) {
      return new Response(null, { status: 403 });
    }

    // Get the request body and validate it.
    const json = await req.json();

    // Update the post.
    await supabase
      .from("posts")
      .update({
        published: json.published,
      })
      .eq("id", params.postId)
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
  const supabase = createRouteHandlerClient<Database>({
    cookies,
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