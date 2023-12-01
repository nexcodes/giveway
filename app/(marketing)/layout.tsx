import Navbar from "@/components/main-nav";
import { getUser } from "@/actions/supabase-actions";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  const items =  [
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Prizes",
      href: "/prize",
    },
  ]

  return (
    <main>
      <>
        <Navbar items={items} user={user} />
        {children}
      </>
    </main>
  );
}
