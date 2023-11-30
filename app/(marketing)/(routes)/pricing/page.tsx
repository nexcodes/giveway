import { getUser } from "@/actions/supabase-actions";
import React from "react";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import PricingCard from "../../_components/pricing-card";

export async function generateMetadata(): Promise<Metadata> {
  const ogUrl = new URL(`${siteConfig.url}/api/og`);
  ogUrl.searchParams.set("heading", `${siteConfig.name} Pricing`);
  ogUrl.searchParams.set("type", siteConfig.name);
  ogUrl.searchParams.set("mode", "light");

  return {
    metadataBase: new URL(siteConfig.url),
    title: `${siteConfig.name} / Pricing`,
    description: `This is the pricing page of ${siteConfig.name}`,
    openGraph: {
      title: `${siteConfig.name} / Pricing`,
      type: "website",
      url: absoluteUrl(`/pricing`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} / Pricing`,
        },
      ],
    },
  };
}

const pricing_1 = {
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
}

const pricing_2 = {
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
}

const Pricing = async () => {
  const user = await getUser();

  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Simple, transparent pricing
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Unlock all features & participate in lucky draws
        </p>
      </div>
      <PricingCard {...pricing_1} user={user} />
      <PricingCard {...pricing_2} user={user} />
    </section>
  );
};

export default Pricing;
