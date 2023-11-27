import { getUser } from "@/actions/supabase-actions";
import { createServerSupabaseClient } from "@/actions/supabase-actions";
import NoPost from "@/app/(main)/_components/no-post";
import PostCard from "@/app/(main)/_components/post-card";
import { Spinner } from "@/components/misc/spinner";
import { PostCreateButton } from "@/components/post-create-button";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getUser();

  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }
  if (user === null) {
    redirect("/login");
  }

  if (!user?.isAdmin) {
    redirect("/dashboard");
  }

  const supabase = createServerSupabaseClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="font-semibold text-3xl md:text-4xl">Posts</h1>
          <p className="text-lg text-muted-foreground">
            Create and manage posts.
          </p>
        </div>
        <PostCreateButton />
      </div>
      {posts?.length ? (
        <div className="divide-y divide-border rounded-md border">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <NoPost />
      )}
    </div>
  );
}
