"use client";

import { cn } from "@/lib/utils";
import { useLanguageStore } from "@/zustand/language";
import localFont from "next/font/local";
import React from "react";

const myFont = localFont({ src: "../../../fonts/CalSans-SemiBold.ttf" });

const content = {
  English: {
    title: "How to Participate",
    subtitle: "Become a member, receive credits, win gifts",
    step1: "I become a member",
    step2: "I receive my credits",
    step3: "I win my gifts",
    step1desc: "From $19 per month",
    step2desc: "To spend every day",
    step3desc: "By participating in the draws",
  },
  French: {
    title: "Comment participer",
    subtitle: "Devenez membre, recevez des crédits, gagnez des cadeaux",
    step1: "Je deviens membre",
    step2: "Je reçois mes crédits",
    step3: "Je gagne mes cadeaux",
    step1desc: "À partir de 19 $ par mois",
    step2desc: "À dépenser chaque jour",
    step3desc: "En participant aux tirages",
  },
};

const Participate = () => {
  const { language } = useLanguageStore();

  const { title, step1, step2, step3, step1desc, step2desc, step3desc } =
    content[language];

  return (
    <section className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2
          className={cn(
            myFont.className,
            "font-semibold text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
          )}
        >
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 text-white mx-auto">
            <span className="text-2xl">1</span>
          </div>
          <h3 className="text-xl font-semibold mt-4">{step1}</h3>
          <p className="mt-2 text-muted-foreground">{step1desc}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 text-white mx-auto">
            <span className="text-2xl">2</span>
          </div>
          <h3 className="text-xl font-semibold mt-4">{step2}</h3>
          <p className="mt-2 text-muted-foreground">{step2desc}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 text-white mx-auto">
            <span className="text-2xl">3</span>
          </div>
          <h3 className="text-xl font-semibold mt-4">{step3}</h3>
          <p className="mt-2 text-muted-foreground">{step3desc}</p>
        </div>
      </div>
    </section>
  );
};

export default Participate;
