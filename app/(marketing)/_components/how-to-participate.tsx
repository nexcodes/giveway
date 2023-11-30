"use client";

import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import React from "react";

const myFont = localFont({ src: "../../../fonts/CalSans-SemiBold.ttf" });

const Participate = () => {
  return (
    <section className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2
          className={cn(
            myFont.className,
            "font-semibold text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
          )}
        >
          How to Participate
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 mx-auto">
            <span className="text-3xl font-semibold">1</span>
          </div>
          <h3 className="text-xl font-semibold mt-4">I become a member</h3>
          <p className="mt-2 text-muted-foreground">From $19 per month</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 mx-auto">
            <span className="text-3xl font-semibold">2</span>
          </div>
          <h3 className="text-xl font-semibold mt-4">I receive my credits</h3>
          <p className="mt-2 text-muted-foreground">To spend every day</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 mx-auto">
            <span className="text-3xl font-semibold">3</span>
          </div>
          <h3 className="text-xl font-semibold mt-4">I win my gifts</h3>
          <p className="mt-2 text-muted-foreground">
            By participating in the draws
          </p>
        </div>
      </div>
    </section>
  );
};

export default Participate;
