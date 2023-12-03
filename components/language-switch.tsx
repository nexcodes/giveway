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
import { useLanguageStore } from "@/zustand/language";

const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguageStore();

  const languages = [
    {
      name: "English",
      locale: "en",
    },
    {
      name: "French",
      locale: "fr",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className={buttonVariants({ variant: "outline" })}>
          <Globe className="w-4 h-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((item) => (
          <DropdownMenuItem
            key={item.locale}
            className={cn(
              "cursor-pointer",
              language.locale === item.locale && "bg-accent"
            )}
            onClick={() => setLanguage(item)}
          >
            {item.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitch;
