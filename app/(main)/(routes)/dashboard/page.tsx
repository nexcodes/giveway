import { getAllPrizeForUser, getUser } from "@/actions/supabase-actions";
import ParticipationCard from "../../_components/participation-card";

export default async function Dashboard() {
  const user = await getUser();

  const prizes = await getAllPrizeForUser(user?.participations ?? []);

  return (
    <div className="container px-5 py-4">
      <div className="text-center">
        <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          Your participations
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {prizes?.map((prize) => (
          <ParticipationCard
            key={prize.id}
            prize={{
              id: prize.id,
              image: prize.image,
              time_end: prize.time_end,
              title: prize.title,
            }}
          />
        ))}
      </div>
    </div>
  );
}
