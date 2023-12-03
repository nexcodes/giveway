import { Separator } from "@/components/ui/separator";
import BlogCard from "../../_components/blog-card";
import { getAllPublishedPost } from "@/actions/supabase-actions";
import { Spinner } from "@/components/misc/spinner";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";
import { Metadata } from "next";
import BlogArea from "./blog-area";

export async function generateMetadata(): Promise<Metadata> {
  const ogUrl = new URL(`${siteConfig.url}/api/og`);
  ogUrl.searchParams.set("heading", `${siteConfig.name} Blog`);
  ogUrl.searchParams.set("type", siteConfig.name);
  ogUrl.searchParams.set("mode", "light");

  return {
    metadataBase: new URL(siteConfig.url),
    title: `${siteConfig.name} / Blog`,
    description: `This is the blog of ${siteConfig.name}`,
    openGraph: {
      title: `${siteConfig.name} / Blog`,
      type: "website",
      url: absoluteUrl(`/blog`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} / Blog`,
        },
      ],
    },
  };
}

export default async function Blog() {
  const posts = await getAllPublishedPost();

  if (posts === undefined) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!posts) {
    return (
      <section className="container max-w-4xl py-6 lg:py-10">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block font-semibold text-4xl tracking-tight lg:text-5xl">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Uncover the Depth of Our Blog
            </p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-10 sm:grid-cols-2">
          <h1 className="text-2xl font-semibold">No Posts</h1>
        </div>
      </section>
    );
  }

  return (
    <BlogArea posts={posts}/>
  );
}
