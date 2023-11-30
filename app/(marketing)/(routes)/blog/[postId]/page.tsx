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

  const ogUrl = new URL(`${siteConfig.url}/api/og`);
  ogUrl.searchParams.set("heading", page.title ?? "untitled");
  ogUrl.searchParams.set("type", siteConfig.name);
  ogUrl.searchParams.set("mode", "light");

  return {
    metadataBase: new URL(siteConfig.url),
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title ?? "untitled",
      description: page.description ?? "",
      type: "article",
      url: absoluteUrl(`/blog/${page.id}`),
      images: [
        {
          url: page.image || ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: page.title ?? "untitled",
        },
      ],
    },
  };
}

export default async function BlogPage({ params }: EditorPageProps) {
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
