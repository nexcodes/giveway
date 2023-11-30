import { getUser } from "@/actions/supabase-actions";
import Navbar from "@/components/main-nav";
import { redirect } from "next/navigation";
import { Spinner } from "@/components/misc/spinner";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    redirect("/login");
  }

  const items = [
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Prizes",
      href: "/prize",
    },
  ];

  return (
    <main>
      <>
        <Navbar items={items} user={user} Dashboard />
        {children}
      </>
    </main>
  );
}
