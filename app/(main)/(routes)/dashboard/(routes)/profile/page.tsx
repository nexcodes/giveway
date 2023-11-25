"use client";

import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/app/(main)/_components/profile-form";
import { useContext } from "react";
import { UserContext } from "@/context/user";
import { Spinner } from "@/components/misc/spinner";
import { LanguageContext } from "@/context/language";

const content = {
  English: {
    title: "Profile",
    description: "This is how others will see you on the site.",
  },
  French: {
    title: "Profil",
    description: "C'est ainsi que les autres vous verront sur le site.",
  },
}

export default function SettingsProfilePage() {
  const { user , setUser } = useContext(UserContext);
  const { language } = useContext(LanguageContext);

  const { title, description } = content[language];

  if (!user)
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size="lg" />
      </div>
    );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <Separator />
      <ProfileForm user={user} setUser={setUser} language={language}/>
    </div>
  );
}
