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
import React, { useContext } from "react";
import { UserContext } from "@/context/user";
import { UserData } from "@/types/user-data";
import { LanguagesType } from "@/types/language";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: UserData | null;
  language: LanguagesType;
}

const content = {
  English: {
    dashboard: "Dashboard",
    settings: "Settings",
    billing: "Billing",
    signOut: "Sign out"
  },
  French: {
    dashboard: "Tableau de bord",
    settings: "Paramètres",
    billing: "Facturation",
    signOut: "Se déconnecter"
  }
}

export function UserAccount({ user, language }: UserAccountNavProps) {
  const { handleSignOut } = useContext(UserContext);
  const { dashboard, settings, billing, signOut } = content[language];

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
            {user?.name && (
              <p className="font-medium">{user?.name}</p>
            )}
            {user?.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user?.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
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
        <DropdownMenuItem className="cursor-pointer" onSelect={handleSignOut}>
          {signOut}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
