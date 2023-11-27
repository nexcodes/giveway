import { notFound } from "next/navigation"

import { PostArea } from "./post-area"
import { getPublishedPost } from "@/actions/supabase-actions"

interface EditorPageProps {
  params: { postId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const post = await getPublishedPost(params.postId)

  if (!post) {
    notFound()
  }

  return (
    <PostArea
      post={{
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
      }}
    />
  )
}
