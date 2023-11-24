import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PricingCardProps {
  features: string[];
  price: string;
  label: string;
}

const PricingCard = ({ features, price, label }: PricingCardProps) => {
  return (
    <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
      <div className="grid gap-6">
        <h3 className="text-xl font-bold sm:text-2xl">
          {`What's included in the ${label} plan`}
        </h3>
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          {features.map((item, index) => (
            <li key={index} className="flex items-center">
              <Check className="mr-2 h-4 w-4" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4 text-center">
        <div>
          <h4 className="text-7xl font-bold">{`$${price}`}</h4>
          <p className="text-sm font-medium text-muted-foreground">
            Billed Monthly
          </p>
        </div>
        <Link href={"/"}>
          <Button className="px-8">Get Started</Button>
        </Link>
      </div>
    </div>
  );
};

export default PricingCard;
