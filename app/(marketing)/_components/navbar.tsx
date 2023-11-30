"use client";

import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { AlignLeft, Gift } from "lucide-react";
import Link from "next/link";
import { Spinner } from "@/components/misc/spinner";
import LanguageSwitch from "./language-switch";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserData } from "@/types/user-data";

interface NavbarProps {
  user: UserData | null;
}

const Navbar = ({ user }: NavbarProps) => {
  return (
    <header className="container px-4 sm:px-8 z-40 bg-background">
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
              Pricing
            </Link>
            <Link
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60"
              href="/blog"
            >
              Blog
            </Link>
            <Link
              className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60"
              href="/prize"
            >
              Prizes
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
                Dashboard
              </Link>
            ) : (
              <Link
                href={"/login"}
                className={buttonVariants({ variant: "outline" })}
              >
                Sign In
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
