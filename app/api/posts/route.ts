import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import * as z from "zod";

import { Database } from "@/types/db";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
});

async function getCookie() {
  const cookie = cookies();
  return new Promise<ReadonlyRequestCookies>((resolve) =>
    setTimeout(() => {
      resolve(cookie);
    }, 1000)
  );
}

export async function GET() {
  const cookie = await getCookie();

  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookie,
  });
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { data: posts } = await supabase
      .from("posts")
      .select("id, title, published, created_at")
      .order("created_at", { ascending: false });

    return new Response(JSON.stringify(posts));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function POST(req: Request) {
  const cookie = await getCookie();

  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookie,
  });
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const json = await req.json();
    const body = postCreateSchema.parse(json);

    const { data: post } = await supabase
      .from("posts")
      .insert({
        title: body.title,
        content: body.content,
        author_id: session.user.id,
      })
      .select();

    return new Response(JSON.stringify(post));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
