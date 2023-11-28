"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { Spinner } from "../../../components/misc/spinner";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface PrizeCreateButtonProps extends ButtonProps {}

export function PrizeCreateButton({
  className,
  variant,
  ...props
}: PrizeCreateButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onClick() {
    setIsLoading(true);

    const response = await fetch("/api/prize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Prize",
      }),
    });

    setIsLoading(false);

    if (!response?.ok) {
      return toast.error(
        "Something went wrong. Your post was not created. Please try again."
      );
    }

    const prize = await response.json();

    // This forces a cache invalidation.
    router.refresh();

    router.push(`/prizes/${prize[0].id}`);
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Spinner className="mr-2" /> : <Plus className="mr-2 h-4 w-4" />}
      New Prize
    </button>
  );
}
