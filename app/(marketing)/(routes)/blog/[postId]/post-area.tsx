"use client";

import dynamic from "next/dynamic";

import { Post } from "@/types/post";
import TextareaAutosize from "react-textarea-autosize";

interface EditorProps {
  post: Pick<Post, "id" | "title" | "content" | "published">;
}

export function PostArea({ post }: EditorProps) {
  const Editor = dynamic(() => import("./editor"), { ssr: false });

  return (
    <div className="container px-4 sm:px-8 mx-auto grid items-start gap-6 md:gap-10 py-8">
      <div className="mx-auto max-w-3xl w-full">
        <TextareaAutosize
          autoFocus
          id="title"
          defaultValue={post.title ?? undefined}
          placeholder="Post title"
          disabled={true}
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl sm:text-4xl lg:text-5xl font-bold focus:outline-none"
        />
        <div className="-translate-x-12">
          <Editor
            initialContent={post?.content ?? undefined}
            editable={false}
          />
        </div>
      </div>
    </div>
  );
}
