import { Separator } from "@radix-ui/react-select";
import React, { useEffect } from "react";
import PrizeCard from "../../_components/prize-card";
import { Prize } from "@/types/prize";
import { PrizeHeading } from "@/messages/heading";
import { useLanguageStore } from "@/zustand/language";

interface PrizeAreaProps {
  prizes: Prize[];
}

const PrizeArea = ({ prizes }: PrizeAreaProps) => {

    const {language} = useLanguageStore();

    const {
        title,
        description,
    } = PrizeHeading[language.locale];

    useEffect(() => {
        
    }, [])

  return (
    <section className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-semibold text-4xl tracking-tight lg:text-5xl">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {description}
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
};

export default PrizeArea;
