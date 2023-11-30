"use client";

import { Spinner } from "@/components/misc/spinner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface PricingCardProps extends React.HTMLAttributes<HTMLFormElement> {
  route: string;
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
  route,
  title,
  price,
  bill,
  button,
  features,
  className,
  ...props
}: PricingCardProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: any) {
    event.preventDefault();
    setIsLoading(!isLoading);

    // Get a Stripe session URL.
    const response = await fetch(`/api/stripe/portal/${route}`);

    if (!response?.ok) {
      setIsLoading(false);
      return toast.error(
        "Something went wrong. Please refresh the page and try again."
      );
    }

    // Redirect to the Stripe session.
    // This could be a checkout page for initial upgrade.
    // Or portal to manage existing subscription.
    const session = await response.json();
    if (session) {
      window.location.href = session.url;
    }
  }

  return (
    <form className={cn(className)} onSubmit={onSubmit} {...props}>
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
          <Button type="submit" className="px-8">
            {isLoading ? <Spinner /> : button}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PricingCard;
