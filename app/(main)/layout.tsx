import { getUser } from "@/actions/supabase-actions";
import Navbar from "./_components/navbar";

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
