"use client";

import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, Gift } from "lucide-react";
import UserAuthForm from "../_components/user-auth-form";
import { useLanguageStore } from "@/zustand/language";
import { content } from "@/messages/auth/login-area";
import Link from "next/link";

const LoginArea = () => {
  const { language } = useLanguageStore();

  const { back, WelcomeBack } = content[language.locale];

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center relative">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <ChevronLeft className="mr-2 h-4 w-4" />
          {back}
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Gift className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            {WelcomeBack}
          </h1>
        </div>
        <UserAuthForm />
      </div>
    </div>
  );
};

export default LoginArea;
