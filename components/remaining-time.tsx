"use client";

import React, { useEffect, useState } from "react";
import { calculateRemainingTime } from "@/lib/utils";
import { Prize } from "@/types/prize";

interface RemainingTimeProps {
  time_end: Prize["time_end"];
}

const RemainingTime = ({ time_end }: RemainingTimeProps) => {
  const endTime = time_end ? new Date(time_end) : null;

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
  );
};

export default RemainingTime;
