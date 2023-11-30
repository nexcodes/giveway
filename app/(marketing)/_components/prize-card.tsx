import { formatDate } from "@/lib/utils";
import { Prize } from "@/types/prize";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import React from "react";

interface PrizeCardProps {
  prize: Pick<Prize, "id" | "title" | "credit_need" | "image" | "time_end">;
}

const PrizeCard = ({
  prize: { title, image, id, time_end, credit_need },
}: PrizeCardProps) => {
  return (
    <article className="group relative flex flex-col space-y-2">
      <div className="my-4 relative overflow-hidden w-full pt-[56.25%] rounded-md border bg-muted transition-colors">
        <Image src={image ?? "/images/cover.jpg"} alt="alt" fill />
      </div>
      <h2 className="text-2xl font-extrabold">{title}</h2>
      <p className="text-sm text-muted-foreground">
        Credit Require: {credit_need} - Ends at {format(new Date(time_end ?? "") , 'PPpp')}
      </p>
      <Link className="absolute inset-0" href={`/prize/${id}`}>
        <span className="sr-only">View Prize</span>
      </Link>
    </article>
  );
};

export default PrizeCard;
