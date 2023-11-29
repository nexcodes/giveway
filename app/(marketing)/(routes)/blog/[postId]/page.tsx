import { notFound } from "next/navigation";

import { PostArea } from "./post-area";
import { getPublishedPost } from "@/actions/supabase-actions";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";

interface EditorPageProps {
  params: { postId: string };
}

interface PageProps {
  params: {
    postId: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPublishedPost(params.postId);

  if (!page) {
    notFound();
  }

  const url = process.env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", page.title ?? "untitled");
  ogUrl.searchParams.set("type", siteConfig.name);
  ogUrl.searchParams.set("mode", "light");

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title ?? "untitled",
      description: page.description ?? "",
      type: "article",
      url: absoluteUrl(page.id),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: page.title ?? "untitled",
        },
      ],
    },
  };
}

export default async function EditorPage({ params }: EditorPageProps) {
  const post = await getPublishedPost(params.postId);

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
      }}
    />
  );
}
