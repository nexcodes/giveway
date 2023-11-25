"use client";

import { AppearanceForm } from "@/app/(main)/_components/appearence-form";
import { Spinner } from "@/components/misc/spinner";
import { Separator } from "@/components/ui/separator";
import { LanguageContext } from "@/context/language";
import { useContext } from "react";

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

export default function SettingsAppearancePage() {
  const { language, changeLanguage } = useContext(LanguageContext);
  const { title, description } = content[language];

  if (!language) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Separator />
      <AppearanceForm language={language} changeLanguage={changeLanguage} />
    </div>
  );
}
