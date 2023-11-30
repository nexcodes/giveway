import Navbar from "./_components/navbar";
import { getUser } from "@/actions/supabase-actions";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <main>
      <>
        <Navbar user={user} />
        {children}
      </>
    </main>
  );
}
