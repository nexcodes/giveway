"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./sidebar";

interface LayoutBodyProps {
  children: React.ReactNode;
}

const sidebarNavItems = [
  {
    title: "Appearance",
    href: "/dashboard/appearance",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
  },
];

const LayoutBody = ({ children }: LayoutBodyProps) => {
  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-3xl">{children}</div>
        </div>
      </div>
    </>
  );
};

export default LayoutBody;
