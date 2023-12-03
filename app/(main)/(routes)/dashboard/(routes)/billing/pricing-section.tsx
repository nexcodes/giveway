"use client";

import PricingCard from "@/app/(main)/_components/pricing-card";
import { pricing_1, pricing_2 } from "@/messages/pricing/pricing";
import { useLanguageStore } from "@/zustand/language";

const PricingSection = () => {
  const { language } = useLanguageStore();

  return (
    <>
      <PricingCard {...pricing_1[language.locale]} route={"premium"} />
      <PricingCard {...pricing_2[language.locale]} route={"pro"} />
    </>
  );
};

export default PricingSection;
