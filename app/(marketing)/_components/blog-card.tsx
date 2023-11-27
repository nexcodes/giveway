import { formatDate } from "@/lib/utils";
import { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BlogCardProps {
  post: Pick<Post, "id" | "title" | "description" | "image" | "created_at">;
}

const BlogCard = ({
  post: { title, description, image, created_at, id },
}: BlogCardProps) => {
  return (
    <article className="group relative flex flex-col space-y-2">
      <div className="my-4 relative overflow-hidden w-full pt-[56.25%] rounded-md border bg-muted transition-colors">
        <Image src={image} alt="alt" fill />
      </div>
      <h2 className="text-2xl font-extrabold">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
      <p className="text-sm text-muted-foreground">{formatDate(created_at)}</p>
      <Link className="absolute inset-0" href={`/blog/${id}`}>
        <span className="sr-only">View Article</span>
      </Link>
    </article>
  );
};

export default BlogCard;
