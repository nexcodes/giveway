"use client";

import { Spinner } from "@/components/misc/spinner";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { Prize } from "@/types/prize";
import { useRouter } from "next/navigation";

interface ButtonsProps {
  prize: Pick<Prize, "id" | "published">;
}

const Buttons = ({ prize: { id, published = false } }: ButtonsProps) => {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);

  async function handlePublish() {
    try {
      setIsPublishing(true);
      const response = await fetch(`/api/prize/publish/${id}`, {
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
      toast.success(`Your post has been ${published ? "un" : ""}published.`);
      router.refresh();
      return;
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
        <Button variant="ghost" type="button" onClick={handlePublish}>
          {isPublishing ? (
            <Spinner className="mr-2" />
          ) : published ? (
            "Unpublish"
          ) : (
            "Publish"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Buttons;
