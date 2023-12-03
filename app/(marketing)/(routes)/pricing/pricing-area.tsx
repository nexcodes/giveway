"use client";

import { content, pricing_1, pricing_2 } from "@/messages/pricing/pricing";
import { useLanguageStore } from "@/zustand/language";
import React from "react";
import PricingCard from "../../_components/pricing-card";
import { UserData } from "@/types/user-data";

const PricingArea = ({ user }: { user: UserData | null }) => {
  const { language } = useLanguageStore();

  const { title, subtitle } = content[language.locale];

  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          {title}
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          {subtitle}
        </p>
      </div>
      <PricingCard {...pricing_1[language.locale]} user={user} />
      <PricingCard {...pricing_2[language.locale]} user={user} />
    </section>
  );
};

export default PricingArea;
