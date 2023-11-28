"use client";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./user-avatar";
import React from "react";
import { UserData } from "@/types/user-data";
import { LanguagesType } from "@/types/language";
import { toast } from "sonner";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/db";
import { useRouter } from "next/navigation";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: UserData | null;
  language: LanguagesType;
}

const content = {
  English: {
    Admin: "Admin Panel",
    dashboard: "Dashboard",
    settings: "Settings",
    billing: "Billing",
    signOut: "Sign out",
  },
  French: {
    Admin: "panneau d'administration",
    dashboard: "Tableau de bord",
    settings: "Paramètres",
    billing: "Facturation",
    signOut: "Se déconnecter",
  },
};

export function UserAccount({ user, language }: UserAccountNavProps) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
      toast.success("Signed out successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Failed to Sign out!");
      console.log(error);
    }
  };

  const { Admin, dashboard, settings, billing, signOut } = content[language];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{
            name: user?.name || null,
            image: user?.image || null,
          }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user?.name && <p className="font-medium">{user?.name}</p>}
            {user?.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user?.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        {user?.isAdmin && (
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/admin">{Admin}</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/dashboard">{dashboard}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/dashboard/billing">{billing}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/dashboard/appearance">{settings}</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={() => handleSignOut()}
        >
          {signOut}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
