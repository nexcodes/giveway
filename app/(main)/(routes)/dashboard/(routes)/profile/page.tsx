import { Spinner } from "@/components/misc/spinner";
import { redirect } from "next/navigation";
import { getUser } from "@/actions/supabase-actions";
import PageContent from "./pageContent";


export default async function SettingsProfilePage() {
  const user = await getUser()
  

  if (user === undefined)
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size="lg" />
      </div>
    );

  if (user === null) redirect("/login");

  return (
    <PageContent user={user} />
  );
}
