"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import React from "react";
import { LanguagesType } from "@/types/language";
import { useLanguageStore } from "@/zustand/language";

const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguageStore();

  const languages = ["English", "French"];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className={buttonVariants({ variant: "outline" })}>
          <Globe className="w-4 h-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            className={cn("cursor-pointer", language === lang && "bg-accent")}
            onClick={() => setLanguage(lang as LanguagesType)}
          >
            {lang}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitch;
