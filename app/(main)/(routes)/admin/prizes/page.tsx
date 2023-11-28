import { createServerSupabaseClient } from "@/actions/supabase-actions";
import { PrizeCreateButton } from "@/app/(main)/_components/prize-create-button";
import NoPrize from "@/app/(main)/_components/no-prize";
import PrizeCard from "@/app/(main)/_components/prize-card";

export default async function Dashboard() {

  const supabase = createServerSupabaseClient();

  const { data: prize } = await supabase
    .from("prizes")
    .select("id, title, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="font-semibold text-3xl md:text-4xl">Prizes</h1>
          <p className="text-lg text-muted-foreground">
            Create and manage Prizes.
          </p>
        </div>
        <PrizeCreateButton />
      </div>
      {prize?.length ? (
        <div className="divide-y divide-border rounded-md border">
          {prize.map((prize) => (
            <PrizeCard key={prize.id} prize={prize} />
          ))}
        </div>
      ) : (
        <NoPrize />
      )}
    </div>
  );
}
