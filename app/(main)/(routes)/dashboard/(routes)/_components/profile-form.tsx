"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/app/(main)/_components/user-avatar";
import { User } from "@supabase/supabase-js";
import { useEdgeStore } from "@/lib/edgestore";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import supabase from "@/lib/supabase";
import { toast } from "sonner";
import { Spinner } from "@/components/misc/spinner";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [file, setFile] = useState<File | null>();
  const [base64File, setBase64File] = useState<string | ArrayBuffer | null>();
  const [isLoading, setIsLoading] = useState(false);

  const { edgestore } = useEdgeStore();

  const defaultValues: Partial<ProfileFormValues> = {
    username: user?.user_metadata?.name ?? "",
    email: user?.email ?? "",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit({ username }: ProfileFormValues) {
    if (!file && username === defaultValues.username) {
      return toast.error("Nothing to update!");
    }
    try {
      setIsLoading(true);
      if (file) {
        const res = await edgestore.publicFiles.upload({
          file,
        });

        const { data, error } = await supabase.auth.updateUser({
          data: {
            name: username,
            picture: res.url,
          },
        });
        setFile(null);
        if (error) {
          throw new Error(error.message);
        }
        toast.success("Profile Updated Successfully!");
      }

      if (!file) {
        const { data, error } = await supabase.auth.updateUser({
          data: {
            name: username,
          },
        });
        if (error) {
          throw new Error(error.message);
        }
        toast.success("Profile Updated Successfully!");
      }
    } catch (error) {
      toast.error("Failed to update profile!");
    } finally {
      setIsLoading(false);
    }
  }

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="David Mason"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center space-x-2">
          <UserAvatar
            user={{
              name: user?.user_metadata?.name || null,
              image: base64File || user?.user_metadata?.picture || null,
            }}
          />
          <Label
            htmlFor="Avatar"
            className="cursor-pointer hover:text-muted-foreground transition"
          >
            Change
          </Label>
          <input
            id="Avatar"
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
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Spinner />}{" "}
          <span className="ml-2">Update profile</span>
        </Button>
      </form>
    </Form>
  );
}
