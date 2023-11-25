"use client";

import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/app/(main)/_components/profile-form";
import { useContext } from "react";
import { UserContext } from "@/context/user";
import { Spinner } from "@/components/misc/spinner";

export default function SettingsProfilePage() {
  const { user , setUser } = useContext(UserContext);

  if (!user)
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size="lg" />
      </div>
    );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm user={user} setUser={setUser}/>
    </div>
  );
}
