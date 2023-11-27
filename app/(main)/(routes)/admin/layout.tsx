import { redirect } from "next/navigation";

import { getUser } from "@/actions/supabase-actions";
import { SidebarNav } from "@/app/(main)/_components/sidebar";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const sidebarNav = [
  {
    title: "Posts",
    href: "/admin",
    icon: "post",
  },
  {
    title: "Gifts",
    href: "/admin/gifts",
    icon: "billing",
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: "settings",
  },
];

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
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
