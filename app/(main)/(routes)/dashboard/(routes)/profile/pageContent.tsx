"use client";

import { ProfileForm } from "@/app/(main)/_components/profile-form";
import { Separator } from "@/components/ui/separator";
import { content } from "@/messages/settings/profile";
import { UserData } from "@/types/user-data";
import { useLanguageStore } from "@/zustand/language";
import React from "react";

interface PageContentProps {
  user: UserData;
}

const PageContent = ({ user }: PageContentProps) => {
  const { language } = useLanguageStore();

  const { title, description } = content[language.locale];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Separator />
      <ProfileForm user={user} />
    </div>
  );
};

export default PageContent;
