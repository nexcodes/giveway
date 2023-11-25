"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { userAuthSchema } from "@/lib/validations/auth";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Spinner } from "@/components/misc/spinner";
import GoogleIcon from "@/components/icons/google-icon";
import supabase from "@/lib/supabase";
import { useOrigin } from "@/hooks/use-origin";
import { LanguagesType } from "@/types/language";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  IsRegisterUser?: boolean;
  language: LanguagesType;
}

type FormData = z.infer<typeof userAuthSchema>;

const content = {
  English: {
    instruction: "Sign In with Email",
    Continue: "OR CONTINUE WITH",
    Email: "Email",
  },
  French: {
    instruction: "Se connecter avec Email",
    Continue: "OU CONTINUER AVEC",
    Email: "Email",
  },
};

export function UserAuthForm({
  className,
  IsRegisterUser,
  language = "English",
  ...props
}: UserAuthFormProps) {
  const ORIGIN = useOrigin();

  const { instruction, Continue, Email } = content[language];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    try {
      setIsLoading(true);

      const { error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: {
          // set this to false if you do not want the user to be automatically signed up
          shouldCreateUser: IsRegisterUser,
          emailRedirectTo: ORIGIN,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      return toast.message("Check your email", {
        description:
          "We sent you a login link. Be sure to check your spam too.",
      });
    } catch (error) {
      console.log(error, "LOGIN_ERROR");
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",

        options: {
          redirectTo: ORIGIN,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      return;
    } catch (error) {
      console.log(error, "GOOGLE_LOGIN_ERROR");
      return toast.error("Sign In Failed!");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              {Email}
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGoogleLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            className={cn(buttonVariants())}
            disabled={isLoading || isGoogleLoading}
          >
            {isLoading && <Spinner />}
            {instruction}
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {Continue}
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={handleGoogleLogin}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Spinner />
        ) : (
          <GoogleIcon className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </button>
    </div>
  );
}
