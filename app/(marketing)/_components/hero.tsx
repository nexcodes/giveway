"use client";

import React, { useContext } from "react";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { LanguageContext } from "@/context/language";

const myFont = localFont({ src: "../../../fonts/CalSans-SemiBold.ttf" });

const content = {
  English: {
    title: "Experience Winning Thrills on Our Giveaway Platform!",
    description:
      "Explore a world full of fun and chances by trying your luck on our easy-to-use and secure online giveaway platform.",
    getStarted: "Get Started",
    pricing: "Pricing",
  },
  French: {
    title: "Vivez des sensations gagnantes sur notre plateforme de cadeaux !",
    description:
      "Explorez un monde plein de plaisir et de chances en tentant votre chance sur notre plateforme de cadeaux en ligne facile à utiliser et sécurisée.",
    getStarted: "Commencer",
    pricing: "Tarifs",
  },
};

const Hero = () => {
  const { language } = useContext(LanguageContext);
  const { title, description, getStarted, pricing } = content[language];
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1
          className={cn(
            myFont.className,
            "font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
          )}
        >
          {title}
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          {description}
        </p>
        <div className="space-x-4">
          <Link className={buttonVariants({ className: "px-8" })} href="/login">
            {getStarted}
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              variant: "outline",
              className: "px-8",
            })}
            href="/pricing"
          >
            {pricing}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
