"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Prize } from "@/types/prize";
import { useState, useEffect } from "react";
import { calculateRemainingTime } from "@/lib/utils";

interface PrizeAreaProps {
  prize: Prize;
}

const PrizeArea = ({ prize }: PrizeAreaProps) => {
  const [sliderValue, setSliderValue] = useState(1);

  const endTime = prize.time_end ? new Date(prize.time_end) : null;

  const [time, setTime] = useState(endTime);
  const [remainingTime, setRemainingTime] = useState(
    endTime ? calculateRemainingTime(endTime) : null
  );

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
          <Button className="w-full">I Participate</Button>
          <p className="mt-2 leading-normal text-muted-foreground text-xs sm:text-sm">
            credit required: {(prize.credit_need ?? 0) * sliderValue}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrizeArea;
