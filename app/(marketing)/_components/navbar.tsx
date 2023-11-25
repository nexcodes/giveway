"use client";

import React, { useContext } from "react";
import { buttonVariants } from "@/components/ui/button";
import { AlignLeft, Gift } from "lucide-react";
import Link from "next/link";
import { Spinner } from "@/components/misc/spinner";
import { UserContext } from "@/context/user";
import LanguageSwitch from "./language-switch";
import { LanguageContext } from "@/context/language";
import { ThemeToggle } from "@/components/theme-toggle";

const content = {
  English: {
    SignIn: "Sign In",
    Dashboard: "Dashboard",
    Blog: "Blog",
    Pricing: "Pricing",
  },
  French: {
    SignIn: "Se connecter",
    Dashboard: "Tableau de bord",
    Blog: "Blog",
    Pricing: "Tarifs",
  },
};

const Navbar = () => {
  const { user } = useContext(UserContext);
  const { language } = useContext(LanguageContext);

  const { SignIn, Dashboard, Blog, Pricing } = content[language];
  return (
    <header className="container z-40 bg-background">
      <div className="flex h-20 items-center justify-between py-6">
        <div className="flex gap-6 md:gap-10">
          <Link className="hidden items-center space-x-2 md:flex" href="/">
            <Gift />
            <span className="hidden font-bold sm:inline-block">Giveaway</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60"
              href="/pricing"
            >
              {Pricing}
            </Link>
            <Link
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60"
              href="/blog"
            >
              {Blog}
            </Link>
          </nav>
          <button className="flex items-center space-x-2 md:hidden">
            <AlignLeft />
            <span className="sr-only">Menu</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <nav>
            {user === undefined ? (
              <Spinner />
            ) : user?.email ? (
              <Link
                href={"/dashboard"}
                className={buttonVariants({ variant: "ghost" })}
              >
                {Dashboard}
              </Link>
            ) : (
              <Link
                href={"/login"}
                className={buttonVariants({ variant: "outline" })}
              >
                {SignIn}
              </Link>
            )}
          </nav>
          <LanguageSwitch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
