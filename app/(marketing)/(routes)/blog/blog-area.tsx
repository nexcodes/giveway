"use client";

import { Separator } from "@/components/ui/separator";
import React from "react";
import BlogCard from "../../_components/blog-card";
import { Post } from "@/types/post";
import { BlogHeading } from "@/messages/heading";
import { useLanguageStore } from "@/zustand/language";

interface Props {
  posts:
    | Pick<Post, "id" | "title" | "description" | "image" | "created_at">[]
    | undefined;
}

const BlogArea = ({ posts }: Props) => {
  const { language } = useLanguageStore();

  const { title, subtitle } = BlogHeading[language.locale];

  return (
    <section className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-semibold text-4xl tracking-tight lg:text-5xl">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="grid gap-10 sm:grid-cols-2">
        {posts && posts.map((post) => <BlogCard key={post.id} post={post} />)}
      </div>
    </section>
  );
};

export default BlogArea;
