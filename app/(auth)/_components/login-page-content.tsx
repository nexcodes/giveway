"use client";

import React, { useContext } from "react";
import { UserAuthForm } from "./user-auth-form";
import Link from "next/link";
import { ChevronLeft, Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { LanguageContext } from "@/context/language";

const content = {
  English: {
    title: "Welcome back",
    description: "Enter your email to sign in to your account",
    SignUp: "Don't have an account? Sign Up",
    back: "Back",
  },
  French: {
    title: "Bienvenue",
    description: "Entrez votre email pour vous connecter à votre compte",
    SignUp: "Vous n'avez pas de compte? S'inscrire",
    back: "Retour",
  },
};

const LoginPageContent = () => {
  const { language } = useContext(LanguageContext);
  const { title, SignUp, description, back } = content[language];
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
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
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <UserAuthForm language={language}/>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            {SignUp}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPageContent;
