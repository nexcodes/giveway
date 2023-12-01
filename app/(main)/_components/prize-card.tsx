import { formatDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { PostOperations } from "./post-operations";
import { Prize } from "@/types/prize";

interface PrizeCardProps {
  prize: Pick<Prize, "id" | "title" | "created_at">;
}

const PrizeCard = ({ prize }: PrizeCardProps) => {
  return (
    <div>
      <div className="divide-y divide-border rounded-md border">
        <div className="flex items-center justify-between p-4">
          <div className="grid gap-1">
            <Link
              className="font-semibold hover:underline"
              href={`/prizes/${prize.id}`}
            >
              {prize.title}
            </Link>
            <div>
              <p className="text-sm text-muted-foreground">
                {formatDate(new Date(prize.created_at).toDateString())}
              </p>
            </div>
          </div>
          <PostOperations post={{ id: prize.id, title: prize.title }} />
        </div>
      </div>
    </div>
  );
};

export default PrizeCard;
