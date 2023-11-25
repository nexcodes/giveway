import { Metadata } from "next";
import LayoutBody from "@/app/(main)/_components/layout_body";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return <LayoutBody>{children}</LayoutBody>;
}
