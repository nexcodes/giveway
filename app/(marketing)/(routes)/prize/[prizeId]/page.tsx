import { notFound } from "next/navigation";

import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";
import { getPublishedPrize } from "@/actions/supabase-actions";
import PrizeArea from "./prize-area";

interface PageProps {
  params: {
    prizeId: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const prize = await getPublishedPrize(params.prizeId);

  if (!prize) {
    notFound();
  }

  const ogUrl = new URL(`${siteConfig.url}/api/og`);
  ogUrl.searchParams.set("heading", prize.title ?? "untitled");
  ogUrl.searchParams.set("type", siteConfig.name);
  ogUrl.searchParams.set("mode", "light");

  return {
    metadataBase: new URL(siteConfig.url),
    title: prize.title,
    description: prize.description,
    openGraph: {
      title: prize.title ?? "untitled",
      description: prize.description ?? "",
      type: "website",
      url: absoluteUrl(`/prize/${prize.id}`),
      images: [
        {
          url: prize.image || ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: prize.title ?? "untitled",
        },
      ],
    },
  };
}

export default async function PrizePage({ params }: PageProps) {
  const prize = await getPublishedPrize(params.prizeId);

  if (!prize) {
    notFound();
  }

  return (
    <PrizeArea prize={prize} />
  );
}
