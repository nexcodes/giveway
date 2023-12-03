import { formatDate } from "@/lib/utils";
import { Prize } from "@/types/prize";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import React from "react";
import RemainingTimeForCard from "@/components/remaining-time-for-cards";

interface PrizeCardProps {
  prize: Pick<
    Prize,
    "id" | "title" | "credit_need" | "image" | "time_end" | "prize_value"
  >;
}

const PrizeCard = ({
  prize: { title, image, id, time_end, prize_value },
}: PrizeCardProps) => {
  return (
    <article className="group relative flex flex-col space-y-2">
      <div className="my-4 relative overflow-hidden w-full pt-[56.25%] rounded-md border bg-muted transition-colors">
        <Image src={image ?? "/images/cover.jpg"} alt="alt" fill />
        <div className="absolute inset-0 z-40 bg-gradient-to-r from-black/60 to-black/0">
          <div className="p-4 w-2/3 line-clamp-2">
            <h2 className="text-xl md:text-2xl font-extrabold text-white">
              {title}
            </h2>

            <div className="absolute bottom-4">
              <p className="text-sm text-white">
                Ends at {format(new Date(time_end ?? ""), "PPpp")}
              </p>
            </div>
            <div className="absolute bottom-4 right-4">
              <span className="px-2 py-1 bg-white rounded text-neutral-900 text-sm font-bold">
                $ {prize_value}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Link className="absolute inset-0 z-50" href={`/prize/${id}`}>
        <span className="sr-only">View Prize</span>
      </Link>
    </article>
  );
};

export default PrizeCard;
