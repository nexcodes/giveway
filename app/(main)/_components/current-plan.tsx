"use client";

import * as React from "react";

import { UserSubscriptionPlan } from "@/types/subscription";
import { cn, formatDate } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/misc/spinner";
import { toast } from "sonner";

interface CurrentPlanProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan & {
    isCanceled: boolean;
  };
}

export function CurrentPlan({
  subscriptionPlan,
  className,
  ...props
}: CurrentPlanProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: any) {
    event.preventDefault();
    setIsLoading(!isLoading);

    // Get a Stripe session URL.
    const response = await fetch(`/api/stripe/portal`);

    console.log(response);

    if (!response?.ok) {
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
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>
            You are currently on the <strong>{subscriptionPlan.name}</strong>{" "}
            plan.
          </CardDescription>
        </CardHeader>
        <CardContent>{subscriptionPlan.description}</CardContent>
        <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          {(subscriptionPlan.isPro || subscriptionPlan.isPremium) && (
            <button
              type="submit"
              className={cn(buttonVariants())}
              disabled={isLoading}
            >
              {isLoading && <Spinner className="mr-2" />}
              Manage Subscription
            </button>
          )}
          {subscriptionPlan.isPro || subscriptionPlan.isPremium ? (
            <p className="rounded-full text-xs font-medium">
              {subscriptionPlan.isCanceled
                ? "Your plan will be canceled on "
                : "Your plan renews on "}
              {formatDate(subscriptionPlan.stripe_current_period_end * 1000)}.
            </p>
          ) : null}
        </CardFooter>
      </Card>
    </form>
  );
}
