"use client";

import React, { useContext } from "react";
import { Button } from "../../../components/ui/button";
import { AlignLeft, Gift } from "lucide-react";
import Link from "next/link";
import { Spinner } from "../../../components/misc/spinner";
import { UserAccount } from "./user-account";
import { UserContext } from "@/context/user";
import { LanguageContext } from "@/context/language";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const { language } = useContext(LanguageContext);

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
              href="/blog"
            >
              Blog
            </Link>
          </nav>
          <button className="flex items-center space-x-2 md:hidden">
            <AlignLeft />
            <span className="sr-only">Menu</span>
          </button>
        </div>
        <nav>
          {user === undefined ? (
            <Spinner />
          ) : user ? (
            <UserAccount language={language} user={user} />
          ) : (
            <Link href={"/login"}>
              <Button variant={"outline"}>Sign In</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
