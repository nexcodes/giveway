"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";

import { Post } from "@/types/post";
import TextareaAutosize from "react-textarea-autosize";

import Buttons from "./buttons";

interface EditorProps {
  post: Pick< Post, "id" | "title" | "description" | "published" | "image" | "content">;
}

export function PostArea({ post }: EditorProps) {
  const Editor = dynamic(() => import("./editor"), { ssr: false });

  const contentRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="grid w-full gap-10">
      <Buttons
        post={{
          id: post.id,
          published: post.published,
          description: post.description,
          image: post.image,
        }}
        titleRef={titleRef}
        contentRef={contentRef}
      />
      <div className="mx-auto max-w-3xl w-full">
        <TextareaAutosize
          autoFocus
          id="title"
          ref={titleRef}
          defaultValue={post.title ?? undefined}
          placeholder="Post title"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl sm:text-4xl lg:text-5xl font-bold focus:outline-none"
        />
        <input ref={contentRef} type="text" className="hidden" />
        <div className="-translate-x-10 sm:-translate-x-12">
          <Editor
            initialContent={
              contentRef?.current?.value ?? post?.content ?? undefined
            }
            onChange={(value) => {
              if (contentRef?.current) {
                contentRef.current.value = value;
              }
            }}
            editable
          />
        </div>
      </div>
    </div>
  );
}
