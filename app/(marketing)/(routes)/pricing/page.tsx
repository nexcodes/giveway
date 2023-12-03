import { getUser } from "@/actions/supabase-actions";
import React from "react";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import PricingCard from "../../_components/pricing-card";
import PricingArea from "./pricing-area";

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

const Pricing = async () => {
  const user = await getUser();

  return <PricingArea user={user} />;
};

export default Pricing;
