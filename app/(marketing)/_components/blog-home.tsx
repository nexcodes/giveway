"use client";

import React from "react";
import BlogCard from "./blog-card";
import { Post } from "@/types/post";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { useLanguageStore } from "@/zustand/language";
import { BlogHeading } from "@/messages/heading";

interface BlogHomeProps {
  posts:
    | Pick<Post, "title" | "description" | "image" | "id" | "created_at">[]
    | null;
}

const myFont = localFont({ src: "../../../fonts/CalSans-SemiBold.ttf" });

const BlogHome = ({ posts }: BlogHomeProps) => {
  const { language } = useLanguageStore();

  if (!posts) {
    return;
  }

  const { title, subtitle } = BlogHeading[language.locale];

  return (
    <section className="container space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2
          className={cn(
            myFont.className,
            "font-semibold text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
          )}
        >
          {title}
        </h2>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          {subtitle}
        </p>
      </div>
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        {posts && posts.map((post) => <BlogCard key={post.id} post={post} />)}
      </div>
    </section>
  );
};

export default BlogHome;
