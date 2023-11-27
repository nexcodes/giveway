import { formatDate } from "@/lib/utils";
import { Post } from "@/types/post";
import Link from "next/link";
import React from "react";
import { PostOperations } from "./post-operations";

interface PostCardProps {
  post: Pick<Post , "id" | "title" | "created_at">;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div>
      <div className="divide-y divide-border rounded-md border">
        <div className="flex items-center justify-between p-4">
          <div className="grid gap-1">
            <Link
              className="font-semibold hover:underline"
              href={`/editor/${post.id}`}
            >
              {post.title}
            </Link>
            <div>
              <p className="text-sm text-muted-foreground">
                {formatDate(new Date(post.created_at).toDateString())}
              </p>
            </div>
          </div>
         <PostOperations post={{ id: post.id, title: post.title }} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
