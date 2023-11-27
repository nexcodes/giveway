"use client";

import { useLanguageStore } from "@/zustand/language";
import React from "react";
import PricingCard from "../../_components/pricing-card";
import { UserData } from "@/types/user-data";

const content = {
  English: {
    title: "Simple, transparent pricing",
    description: "Unlock all features & participate in lucky draws",
  },
  French: {
    title: "Tarification simple et transparente",
    description:
      "Débloquez toutes les fonctionnalités et participez aux tirages au sort",
  },
};

const pricing_1 = {
  English: {
    title: "What's included in the Premium plan",
    bill: "Billed Monthly",
    button: "Get Started",
    price: "$29",
    features: [
      { content: "500 Credits", check: true },
      { content: "Daily free Coupons", check: true },
      { content: "Daily 15 free credits", check: true },
      { content: "Access to Random Draw", check: true },
    ],
  },
  French: {
    title: "Ce qui est inclus dans le plan Premium",
    bill: "Facturé mensuellement",
    button: "Commencer",
    price: "$29",
    features: [
      { content: "500 Crédits", check: true },
      { content: "Coupons gratuits quotidiens", check: true },
      { content: "15 crédits gratuits par jour", check: true },
      { content: "Accès au tirage au sort aléatoire", check: true },
    ],
  },
};

const pricing_2 = {
  English: {
    title: "What's included in the Pro plan",
    bill: "Billed Monthly",
    button: "Get Started",
    price: "$19",
    features: [
      { content: "300 Credits", check: true },
      { content: "Weekly free Coupons", check: true },
      { content: "Daily 10 free credits", check: true },
      { content: "Access to Random Draw", check: true },
    ],
  },
  French: {
    title: "Ce qui est inclus dans le plan Pro",
    bill: "Facturé mensuellement",
    button: "Commencer",
    price: "$19",
    features: [
      { content: "300 Crédits", check: true },
      { content: "Coupons gratuits hebdomadaires", check: true },
      { content: "10 crédits gratuits par jour", check: true },
      { content: "Accès au tirage au sort aléatoire", check: true },
    ],
  },
};

interface PageContentProps {
  user: UserData | null;
}

const PageContent = ({ user }: PageContentProps) => {
  const { language } = useLanguageStore();

  const { title, description } = content[language];
  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          {title}
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          {description}
        </p>
      </div>
      <PricingCard {...pricing_1[language]} user={user} />
      <PricingCard {...pricing_2[language]} user={user} />
    </section>
  );
};

export default PageContent;
