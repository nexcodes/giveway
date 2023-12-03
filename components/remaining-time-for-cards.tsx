"use client";

import React, { useEffect, useState } from "react";
import { calculateRemainingTime } from "@/lib/utils";
import { Prize } from "@/types/prize";

interface RemainingTimeProps {
  time_end: Prize["time_end"];
}

const RemainingTimeForCard = ({ time_end }: RemainingTimeProps) => {
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
    <div className="grid grid-cols-4 gap-2 text-muted-foreground">
      <div className=" bg-white rounded px-4 py-2 flex flex-col items-center justify-center space-y-0.5">
        <p className="font-bold text-neutral-900 text-lg">
          {remainingTime?.days || 0}
        </p>
        <p className="font-medium text-xs text-neutral-900">D</p>
      </div>
      <div className=" bg-white rounded px-4 py-2 flex flex-col items-center justify-center space-y-0.5">
        <p className="font-bold text-neutral-900 text-lg">
          {remainingTime?.hours || 0}
        </p>
        <p className="font-medium text-xs text-neutral-900">H</p>
      </div>
      <div className=" bg-white rounded px-4 py-2 flex flex-col items-center justify-center space-y-0.5">
        <p className="font-bold text-neutral-900 text-lg">
          {remainingTime?.minutes || 0}
        </p>
        <p className="font-medium text-xs text-neutral-900">M</p>
      </div>
    </div>
  );
};

export default RemainingTimeForCard;
