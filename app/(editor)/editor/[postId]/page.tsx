import { notFound } from "next/navigation";

import { PostArea } from "../../_components/post-area";
import { getPublishedPost } from "@/actions/supabase-actions";
import { Spinner } from "@/components/misc/spinner";

interface EditorPageProps {
  params: { postId: string };
}

export default async function BlogPage({ params }: EditorPageProps) {
  const post = await getPublishedPost(params.postId);

  if (post === undefined) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

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
        image: post.image,
        description: post.description,
      }}
    />
  );
}
