import { PostCreateButton } from "@/components/post-create-button";
import { FileBarChart2, Plus } from "lucide-react";
import React from "react";

const NoPost = () => {
  return (
    <div>
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <FileBarChart2 className="h-10 w-10" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">No posts created</h2>
          <p className="mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground">
           {"You don't have any posts yet. Start creating content."}
          </p>
          <PostCreateButton variant="outline" />
        </div>
      </div>
    </div>
  );
};

export default NoPost;
