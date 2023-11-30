"use client";

import { Spinner } from "@/components/misc/spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEdgeStore } from "@/lib/edgestore";
import { Post } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloudIcon } from "lucide-react";
import Image from "next/image";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const MetaDataSchema = z.object({
  description: z.string(),
});

type MetaDataFormValues = z.infer<typeof MetaDataSchema>;

interface MetaDataProps {
  post: Pick<Post, "id" | "image" | "description">;
}

const MetaData = ({ post: { id, image, description } }: MetaDataProps) => {
  const form = useForm<MetaDataFormValues>({
    resolver: zodResolver(MetaDataSchema),
    defaultValues: {
      description: description || "",
    },
    mode: "onChange",
  });

  const [file, setFile] = useState<File | null>();
  const [base64File, setBase64File] = useState<string | ArrayBuffer | null>();
  const [isLoading, setIsLoading] = useState(false);

  const { edgestore } = useEdgeStore();

  function getBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setBase64File(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  async function onSubmit({ description }: MetaDataFormValues) {
    try {
      setIsLoading(true);

      if (file) {
        const res = await edgestore.publicFiles.upload({
          file,
          options: {
            replaceTargetUrl: image ?? "",
          },
        });

        const response = await fetch(`/api/posts/metadata/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: description,
            image: res.url,
          }),
        });

        if (!response?.ok) {
          return toast.error(
            "Something went wrong. Your post was not saved. Please try again."
          );
        }
      }

      if (!file) {
        const response = await fetch(`/api/posts/metadata/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: description,
          }),
        });
        if (!response?.ok) {
          return toast.error(
            "Something went wrong. Your post was not saved. Please try again."
          );
        }
      }
      return toast.success("Your post has been saved.");
    } catch (error) {
      console.log(error, "Button_Error");
      toast.error(
        "Something went wrong. Your post was not saved. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Meta Data</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">
            Change the information about the blog
          </DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="image" className="cursor-pointer w-full">
                    {!!base64File || !!image ? (
                      <div className="my-4 relative overflow-hidden w-full pt-[56.25%] rounded-md border bg-muted transition-colors">
                        <Image
                          src={
                            (base64File as string) ||
                            image ||
                            "/images/cover.png"
                          }
                          alt="alt"
                          fill
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg ">
                        <div className="flex flex-col items-center justify-center py-10 px-20">
                          <UploadCloudIcon className="mb-2 h-7 w-7" />
                          <div className="text-gray-400">
                            Click or drag file to this area to upload
                          </div>
                        </div>
                      </div>
                    )}
                    <input
                      id="image"
                      name="image"
                      accept="image/*"
                      type="file"
                      className="hidden"
                      disabled={isLoading}
                      onChange={(e) => {
                        if (e.target.files) {
                          const file = e.target.files[0];
                          setFile(file);
                          getBase64(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="write a description..."
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {isLoading ? <Spinner /> : "Update"}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MetaData;
