"use client";

import * as React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { NavItem } from "@/types/nav-items";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { AlignLeft, Gift, X } from "lucide-react";
import { Spinner } from "@/components/misc/spinner";
import LanguageSwitch from "../app/(marketing)/_components/language-switch";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { UserData } from "@/types/user-data";
import { UserAccount } from "@/app/(main)/_components/user-account";

interface MainNavProps {
  user: UserData | null;
  items?: NavItem[];
  children?: React.ReactNode;
  Dashboard?: boolean;
}

export default function Navbar({
  items,
  children,
  user,
  Dashboard,
}: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <header className="container px-4 sm:px-8 z-40 bg-background">
      <div className="flex h-20 items-center justify-between py-6">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <Gift />
            <span className="hidden font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
          {items?.length ? (
            <nav className="hidden gap-6 md:flex">
              {items?.map((item, index) => (
                <Link
                  key={index}
                  href={item.disabled ? "#" : item.href}
                  className={cn(
                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                    item.href.startsWith(`/${segment}`)
                      ? "text-foreground"
                      : "text-foreground/60",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          ) : null}
          <button
            className="flex items-center space-x-2 md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X /> : <AlignLeft />}
            <span className="sr-only">Menu</span>
          </button>
          {showMobileMenu && items && (
            <MobileNav items={items}>{children}</MobileNav>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <nav>
            {user === undefined ? (
              <Spinner />
            ) : user?.email ? (
              Dashboard ? (
                <UserAccount user={user} />
              ) : (
                <Link
                  href={"/dashboard"}
                  className={buttonVariants({ variant: "ghost" })}
                >
                  Dashboard
                </Link>
              )
            ) : (
              <Link
                href={"/login"}
                className={buttonVariants({ variant: "outline" })}
              >
                Sign In
              </Link>
            )}
          </nav>
          {!Dashboard && (
            <>
              <LanguageSwitch />
              <ThemeToggle />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
