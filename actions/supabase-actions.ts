import { cache } from "react";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Post } from "@/types/post";
import { UserData } from "@/types/user-data";

import { Database } from "@/types/db";
import { Prize } from "@/types/prize";

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
  const user = await getAuthUser();
  if (!user) return null;

  try {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("email", user.email ?? "")
      .single();

    if (user && !data) {
      const { data } = await supabase.from("users").insert([
        {
          id: user?.id,
          email: user?.email,
          name: user?.user_metadata?.name,
          image: user?.user_metadata?.picture,
        },
      ]);

      return data;
    }

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

export async function getPrizeForUser(prizeId: Prize["id"]) {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase
    .from("prizes")
    .select("*")
    .eq("id", prizeId)
    .single();

  return data;
}

export async function getAllPrizeForUser(prizeIds: Prize["id"][]) {
  const supabase = createServerSupabaseClient();

  const { data } = await supabase.from("prizes").select("*").in("id", prizeIds);

  return data;
}

export async function getPublishedPost(postId: Post["id"]) {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .eq("published", true)
    .single();
  return data ? { ...data, content: data.content as unknown as string } : null;
}

export async function getPublishedPrize(prizeId: Prize["id"]) {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase
    .from("prizes")
    .select("*")
    .eq("id", prizeId)
    .eq("published", true)
    .single();
  return data;
}

export async function getAllPublishedPost() {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase
    .from("posts")
    .select("title, description , image , id , created_at")
    .eq("published", true);

  return data;
}

export async function getAllPublishedPrize() {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase
    .from("prizes")
    .select("title , image , id, credit_need , time_end, winner , prize_value")
    .order("created_at", { ascending: false })
    .eq("published", true);

  return data;
}

export async function getThreePublishedPost() {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase
    .from("posts")
    .select("title, description , image , id , created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .range(0, 2);
  return data;
}

export async function createStripeCustomerId(
  stripe_customer_id: string,
  email: string
) {
  const supabase = createServerSupabaseClient();
  const { error } = await supabase
    .from("users")
    .update({
      stripe_customer_id,
    })
    .eq("email", email);

  if (error) return false;

  return true;
}
