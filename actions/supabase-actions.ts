import { cache } from "react";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Post } from "@/types/post";
import { UserData } from "@/types/user-data";

import { Database } from "@/types/db";

export const createServerSupabaseClient = cache(() =>
  createServerComponentClient<Database>({ cookies })
);

export async function getSupabaseSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getAuthUser() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getUser() {
  const supabase = createServerSupabaseClient();
  try {
    const { data } = await supabase.from("users").select("*").single();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getPostForUser(
  postId: Post["id"],
  userId: UserData["id"]
) {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .eq("author_id", userId)
    .single();
  return data ? { ...data, content: data.content as unknown as string } : null;
}

export async function getPublishedPost(
  postId: Post["id"],
) {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .eq("published", true)
    .single();
  return data ? { ...data, content: data.content as unknown as string } : null;
}

export async function getAllPublishedPost() {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase
    .from("posts")
    .select("title, description , image , id , created_at")
    .eq("published", true)

  return data;
}
