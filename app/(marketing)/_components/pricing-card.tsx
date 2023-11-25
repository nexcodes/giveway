import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PricingCardProps {
  title: string;
  bill: string;
  button: string;
  price: string;
  features: {
    content: string;
    check: boolean;
  }[];
}

const PricingCard = ({
  title,
  price,
  bill,
  button,
  features,
}: PricingCardProps) => {
  return (
    <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
      <div className="grid gap-6">
        <h3 className="text-xl font-bold sm:text-2xl">{title}</h3>
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          {features.map((item, index) => (
            <li key={index} className="flex items-center">
              {item.check ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <X className="mr-2 h-4 w-4" />
              )}
              {item.content}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4 text-center">
        <div>
          <h4 className="text-7xl font-bold">{price}</h4>
          <p className="text-sm font-medium text-muted-foreground">{bill}</p>
        </div>
        <Link href={"/"}>
          <Button className="px-8">{button}</Button>
        </Link>
      </div>
    </div>
  );
};

export default PricingCard;
