"use client";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Prize } from "@/types/prize";
import { useState, useEffect } from "react";
import { calculateRemainingTime } from "@/lib/utils";
import { UserData } from "@/types/user-data";
import Link from "next/link";
import { Spinner } from "@/components/misc/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Participant } from "@/types/participants";
interface PrizeAreaProps {
  prize: Prize;
  user: UserData | null;
}

const PrizeArea = ({ prize, user }: PrizeAreaProps) => {
  const router = useRouter();
  const [sliderValue, setSliderValue] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [winningChance, setWinningChance] = useState<number>();

  useEffect(() => {
    const participants: Participant[] = JSON.parse(
      prize.participants ?? JSON.stringify([])
    );
    const totalWeight = participants.reduce((sum, obj) => sum + obj.weight, 0);
    const specificObject = participants.find(
      (obj) => obj.email === user?.email
    );

    if (specificObject) {
      const winningChance = (specificObject.weight / totalWeight) * 100;
      setWinningChance(winningChance);
    }
  }, [prize, user]);

  const endTime = prize.time_end ? new Date(prize.time_end) : null;

  const [time, setTime] = useState(endTime);
  const [remainingTime, setRemainingTime] = useState(
    endTime ? calculateRemainingTime(endTime) : null
  );

  async function onAddParticipant() {
    try {
      setIsLoading(true);

      const isEligible =
        (user?.balance ?? 0) >= (prize.credit_need ?? 0) * sliderValue;

      if (!isEligible) {
        toast.error(
          "You don't have enough credit to participate in this prize"
        );
        return;
      }

      const participants: Participant[] = JSON.parse(
        prize.participants ?? JSON.stringify([])
      );
      const index = participants.findIndex(
        (item) => item.email === user?.email
      );
      if (index !== -1) {
        // Email exists in the array
        participants[index].weight += sliderValue;
      } else {
        // Email doesn't exist in the array
        participants.push({
          email: user?.email ?? "",
          weight: sliderValue,
        });
      }

      await fetch("/api/prize/addParticipant", {
        method: "PATCH",
        body: JSON.stringify({
          prizeId: prize.id,
          participants,
          credit: (prize?.credit_need ?? 0) * sliderValue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("You have successfully participated in this prize");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (time) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime && new Date(prevTime.getTime() - 500));
      }, 500);

      return () => clearInterval(interval);
    }
  }, [time]);

  useEffect(() => {
    if (time) {
      setRemainingTime(calculateRemainingTime(time));
    }
  }, [time]);

  return (
    <section className="container px-5 py-4 mx-auto">
      <div className="flex flex-wrap">
        <div className="lg:w-[65%] w-full space-y-4">
          <div className="relative overflow-hidden w-full pt-[56.25%] ">
            <Image
              src={prize.image ?? ""}
              alt={prize.title ?? ""}
              fill
              className="object-cover rounded"
            />
          </div>
          <h2 className="md:hidden font-bold text-3xl sm:text-4xl">
            {prize.title}
          </h2>
          <p className="max-w-[42rem] leading-normal text-muted-foreground text-base sm:text-xl sm:leading-8">
            {prize.description}
          </p>
        </div>

        <div className="lg:w-[30%] w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 space-y-4">
          <h2 className="hidden md:block font-bold text-5xl lg:text-6xl">
            {prize.title}
          </h2>
          <div>
            <p className="my-2 leading-normal text-muted-foreground text-xs sm:text-sm">
              Lucky draw ends in:
            </p>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 text-muted-foreground">
              <div className="border-2 border-neutral-199 rounded px-2 py-4 flex flex-col items-center justify-center space-y-1">
                <p className="font-bold text-lg text-primary">
                  {remainingTime?.days || 0}
                </p>
                <p className="font-medium text-sm">Days</p>
              </div>
              <div className="border-2 border-neutral-199 rounded px-2 py-4 flex flex-col items-center justify-center space-y-1">
                <p className="font-bold text-lg text-primary">
                  {remainingTime?.hours || 0}
                </p>
                <p className="font-medium text-sm">Hours</p>
              </div>
              <div className="border-2 border-neutral-199 rounded px-2 py-4 flex flex-col items-center justify-center space-y-1">
                <p className="font-bold text-lg text-primary">
                  {remainingTime?.minutes || 0}
                </p>
                <p className="font-medium text-sm">Minutes</p>
              </div>
              <div className="border-2 border-neutral-199 rounded px-2 py-4 flex flex-col items-center justify-center space-y-1">
                <p className="font-bold text-lg text-primary">
                  {remainingTime?.seconds || 0}
                </p>
                <p className="font-medium text-sm">Seconds</p>
              </div>
            </div>
          </div>

          <div>
            <p className="mt-2 leading-normal text-muted-foreground text-xs sm:text-sm text-right">
              {sliderValue}
            </p>
            <input
              type="range"
              min={1}
              max={20}
              value={sliderValue}
              onChange={(e) => setSliderValue(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-neutral-500 [&::-webkit-slider-thumb]:bg-neutral-800 dark:[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5  [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full"
            />

            <p className="mt-2 leading-normal text-muted-foreground text-xs sm:text-sm">
              Multiply your change of winning
            </p>
          </div>
          {user ? (
            <button
              type="button"
              onClick={onAddParticipant}
              className={buttonVariants({ className: "w-full" })}
            >
              {isLoading ? <Spinner /> : "I Participate"}
            </button>
          ) : (
            <Link href={"/login"} className={buttonVariants()}>
              Sign In to participate
            </Link>
          )}
          <p className="mt-2 leading-normal text-muted-foreground text-xs sm:text-sm">
            credit required: {(prize.credit_need ?? 0) * sliderValue}
          </p>
          {winningChance && (
            <>
              <Separator />
              <div className="border-2 border-neutral-199 rounded px-2 py-4 flex flex-col items-center justify-center space-y-1">
                <p className="font-bold text-lg text-primary">
                  {winningChance}%
                </p>
                <p className="font-medium text-sm">your chance you winning</p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PrizeArea;
