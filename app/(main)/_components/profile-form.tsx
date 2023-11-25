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
import { useEdgeStore } from "@/lib/edgestore";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import supabase from "@/lib/supabase";
import { toast } from "sonner";
import { Spinner } from "@/components/misc/spinner";
import { UserData } from "@/types/user-data";
import { LanguagesType } from "@/types/language";

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
  user: UserData;
  setUser: React.Dispatch<React.SetStateAction<UserData | null | undefined>>;
  language: LanguagesType;
}

const content = {
  English: {
    Label_name: "Username",
    Label_email: "Email",
    Label_avatar: "Change",
    Button_update: "Update profile",
  },
  French: {
    Label_name: "Nom d'utilisateur",
    Label_email: "Email",
    Label_avatar: "Changer",
    Button_update: "Mettre à jour le profil",
  },
};

export function ProfileForm({ user, setUser, language }: ProfileFormProps) {
  const [file, setFile] = useState<File | null>();
  const [base64File, setBase64File] = useState<string | ArrayBuffer | null>();
  const [isLoading, setIsLoading] = useState(false);

  const { edgestore } = useEdgeStore();

  const { Label_name, Label_email, Label_avatar, Button_update } =
    content[language];

  const defaultValues: Partial<ProfileFormValues> = {
    username: user?.name ?? "",
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
          options: {
            replaceTargetUrl: user?.image,
          },
        });

        const { error } = await supabase
          .from("users")
          .update({ name: username, image: res.url })
          .eq("email", user?.email);
        setFile(null);
        if (error) {
          throw new Error(error.message);
        }
        setUser({ ...user, name: username, image: res.url });
        toast.success("Profile Updated Successfully!");
      }

      if (!file) {
        const { error } = await supabase
          .from("users")
          .update({ name: username })
          .eq("id", user?.id);

        if (error) {
          throw new Error(error.message);
        }
        setUser({ ...user, name: username });
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
              <FormLabel>{Label_name}</FormLabel>
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
              <FormLabel>{Label_email}</FormLabel>
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
              name: user?.name || null,
              image: base64File || user?.image || null,
            }}
          />
          <Label
            htmlFor="Avatar"
            className="cursor-pointer hover:text-muted-foreground transition"
          >
            {Label_avatar}
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
          <span className="ml-2">{Button_update}</span>
        </Button>
      </form>
    </Form>
  );
}
