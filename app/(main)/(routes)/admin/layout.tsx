import { getUser } from "@/actions/supabase-actions";
import { SidebarNav } from "@/app/(main)/_components/sidebar";
import { Spinner } from "@/components/misc/spinner";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const sidebarNav = [
  {
    title: "Posts",
    href: "/admin",
  },
  {
    title: "Prizes",
    href: "/admin/prizes",
  },
];

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getUser();

  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user?.isAdmin) {
    redirect("/dashboard");
  }

  return (
    <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
      <aside className="hidden w-[200px] flex-col md:flex">
        <SidebarNav items={sidebarNav} />
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}
