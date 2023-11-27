"use client";

import { Separator } from "@/components/ui/separator";
import React, { useContext } from "react";
import { SidebarNav } from "./sidebar";

import { useLanguageStore } from "@/zustand/language";
interface LayoutBodyProps {
  children: React.ReactNode;
}

const sidebarNavItems = {
  English: [
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
  ],
  French: [
    {
      title: "Apparence",
      href: "/dashboard/appearance",
    },
    {
      title: "Profil",
      href: "/dashboard/profile",
    },
    {
      title: "Facturation",
      href: "/dashboard/billing",
    },
  ],
};

const content = {
  English: {
    title: "Settings",
    subtitle: "Manage your account settings",
  },
  French: {
    title: "Paramètres",
    subtitle: "Gérez les paramètres de votre compte",
  },
};

const LayoutBody = ({ children }: LayoutBodyProps) => {
  const { language } = useLanguageStore();
  const { title, subtitle } = content[language];
  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems[language]} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
};

export default LayoutBody;
