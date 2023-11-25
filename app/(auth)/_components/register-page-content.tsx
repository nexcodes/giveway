"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { UserAuthForm } from "./user-auth-form";
import { Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { LanguageContext } from "@/context/language";

const content = {
  English: {
    title: "Create an account",
    description: "Enter your email below to create your account",
    contract: "By clicking continue, you agree to our",
    and: "and",
    terms: "Terms of Service",
    policy: "Privacy Policy.",
    SignIn: "Sign In",
  },
  French: {
    title: "Créer un compte",
    description: "Entrez votre email ci-dessous pour créer votre compte",
    contract: "En cliquant sur continuer, vous acceptez nos",
    and: "et",
    terms: "Conditions d'utilisation",
    policy: "Politique de confidentialité.",
    SignIn: "Se connecter",
  },
};

const RegisterPageContent = () => {
  const { language } = useContext(LanguageContext);
  const { SignIn, title, description, contract, and, terms, policy } = content[language];

  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        {SignIn}
      </Link>
      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Gift className="mx-auto h-6 w-6" />

            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <UserAuthForm IsRegisterUser language={language}/>
          <p className="px-8 text-center text-sm text-muted-foreground">
            {contract}{" "}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              {terms}
            </Link>{" "}
            {and}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              {" "}
              {policy}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPageContent;
