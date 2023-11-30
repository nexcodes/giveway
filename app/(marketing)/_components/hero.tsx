"use client";

import React from "react";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const myFont = localFont({ src: "../../../fonts/CalSans-SemiBold.ttf" });

const Hero = () => {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1
          className={cn(
            myFont.className,
            "font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
          )}
        >
          Experience Winning Thrills on Our Giveaway Platform!
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Explore a world full of fun and chances by trying your luck on our
          easy-to-use and secure online giveaway platform.
        </p>
        <div className="space-x-4">
          <Link className={buttonVariants({ className: "px-8" })} href="/login">
            Get Started
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              variant: "outline",
              className: "px-8 py-5",
            })}
            href="/pricing"
          >
            Pricing
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
