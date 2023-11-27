"use client";

import { AppearanceForm } from "@/app/(main)/_components/appearance-form";
import { useLanguageStore } from "@/zustand/language";
import { Separator } from "@/components/ui/separator";
import React from "react";

const content = {
  English: {
    title: "Appearance",
    description: "Customize the appearance of the app.",
  },
  French: {
    title: "Apparence",
    description: "Personnalisez l'apparence de l'application.",
  },
};

const PageContent = () => {
  const { language } = useLanguageStore();
  const { title, description } = content[language];
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  );
};

export default PageContent;
