import { Separator } from "@/components/ui/separator";
import { getAllPublishedPrize } from "@/actions/supabase-actions";
import { Spinner } from "@/components/misc/spinner";
import PrizeCard from "../../_components/prize-card";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const ogUrl = new URL(`${siteConfig.url}/api/og`);
  ogUrl.searchParams.set("heading", "See all prizes");
  ogUrl.searchParams.set("type", siteConfig.name);
  ogUrl.searchParams.set("mode", "light");

  return {
    metadataBase: new URL(siteConfig.url),
    title: "See all prizes",
    openGraph: {
      title: "See all prizes",
      type: "website",
      url: absoluteUrl(`/prize`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: "See all prizes",
        },
      ],
    },
  };
}

export default async function PrizePage() {
  const prizes = await getAllPublishedPrize();

  if (prizes === undefined) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!prizes) {
    return (
      <section className="container max-w-4xl py-6 lg:py-10">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block font-semibold text-4xl tracking-tight lg:text-5xl">
              prizes
            </h1>
            <p className="text-xl text-muted-foreground">
              These are the all prizes you can participate in
            </p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-10 sm:grid-cols-2">
          <h1 className="text-2xl font-semibold">No Prizes</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-semibold text-4xl tracking-tight lg:text-5xl">
            Prizes
          </h1>
          <p className="text-xl text-muted-foreground">
            These are the all prizes you can participate in
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="grid gap-10 sm:grid-cols-2">
        {prizes &&
          prizes.map((prize) => (
            <PrizeCard
              key={prize.id}
              prize={{
                id: prize.id,
                title: prize.title,
                credit_need: prize.credit_need,
                image: prize.image,
                prize_value: prize.prize_value,
                time_end: prize.time_end?.toString() || "",
              }}
            />
          ))}
      </div>
    </section>
  );
}
