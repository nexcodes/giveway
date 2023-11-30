"use client";

import { Spinner } from "@/components/misc/spinner";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { RefObject, useState } from "react";
import { toast } from "sonner";
import MetaData from "./meta-data";
import { Post } from "@/types/post";

interface ButtonsProps {
  titleRef: RefObject<HTMLTextAreaElement>;
  contentRef: RefObject<HTMLInputElement>;
  post: Pick<Post, "id" | "published" | "description" | "image">;
}

const Buttons = ({
  titleRef,
  contentRef,
  post: { id, published, description, image },
}: ButtonsProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  async function handleSubmit() {
    try {
      setIsSaving(true);
      const response = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleRef?.current?.value || "Untitled",
          content: contentRef?.current?.value || "",
        }),
      });
      if (!response?.ok) {
        return toast.error(
          "Something went wrong. Your post was not saved. Please try again."
        );
      }
      return toast.success("Your post has been saved.");
    } catch (error) {
      console.log(error, "Button_Error");
      toast.error(
        "Something went wrong. Your post was not saved. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handlePublish() {
    try {
      setIsPublishing(true);
      const response = await fetch(`/api/posts/publish/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          published: !published,
        }),
      });
      if (!response?.ok) {
        return toast.error(
          "Something went wrong. Your post was not published. Please try again."
        );
      }
      published = !published;
      return toast.success("Your post has been published.");
    } catch (error) {
      console.log(error, "Button_Error");
      toast.error(
        "Something went wrong. Your post was not published. Please try again."
      );
    } finally {
      setIsPublishing(false);
    }
  }

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center space-x-10">
        <Link
          href="/admin"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
      </div>
      <div className="space-x-2 flex">
        <Button variant="ghost" onClick={handlePublish}>
          {isPublishing && <Spinner className="mr-2" />}
          <span>{published ? "Unpublish" : "Publish"}</span>
        </Button>
        <MetaData post={{ id, description, image }} />
        <Button onClick={handleSubmit}>
          {isSaving && <Spinner className="mr-2" />}
          <span>Save</span>
        </Button>
      </div>
    </div>
  );
};

export default Buttons;
