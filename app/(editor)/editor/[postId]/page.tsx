import { notFound, redirect } from "next/navigation";

import { PostArea } from "../../_components/post-area";
import { getPostForUser, getUser } from "@/actions/supabase-actions";

interface EditorPageProps {
  params: { postId: string };
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const post = await getPostForUser(params.postId, user.id);

  if (!post) {
    notFound();
  }

  return (
    <PostArea
      post={{
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
        description: post.description,
        image: post.image,
      }}
    />
  );
}
