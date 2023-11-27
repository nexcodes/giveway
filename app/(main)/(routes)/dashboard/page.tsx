import { getAuthUser } from "@/actions/supabase-actions";
import { Spinner } from "@/components/misc/spinner";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getAuthUser();

  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }
  if (user === null) {
    redirect("/login");
  }
  return <></>;
}
