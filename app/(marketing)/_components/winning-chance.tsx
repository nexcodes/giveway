import { Participant } from "@/types/participants";
import { Separator } from "@radix-ui/react-select";
import { useEffect, useState } from "react";

interface WinningChanceProps {
  participants: string | null;
  email?: string | null;
  chance: string;
}

const WinningChance = ({ participants, email, chance }: WinningChanceProps) => {
  const [winningChance, setWinningChance] = useState<number>();

  useEffect(() => {
    const participant: Participant[] = JSON.parse(
      participants ?? JSON.stringify([])
    );

    const totalWeight = participant.reduce((sum, obj) => sum + obj.weight, 0);
    const specificEmail = participant.find((user) => user.email === email);

    if (specificEmail) {
      const winningChance = (specificEmail.weight / totalWeight) * 100;
      setWinningChance(winningChance);
    }
  }, [participants, email]);

  if (!winningChance) {
    return;
  }

  return (
    <>
      <Separator />
      <div className="border-2 border-neutral-200 rounded px-2 py-4 flex flex-col items-center justify-center space-y-1">
        <p className="font-bold text-lg text-primary">
          {winningChance.toFixed(2)}%
        </p>
        <p className="font-medium text-sm">{chance}</p>
      </div>
    </>
  );
};

export default WinningChance;
