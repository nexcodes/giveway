import { LanguageProvider } from "@/context/language";
import { UserProvider } from "@/context/user";
import { EdgeStoreProvider } from "@/lib/edgestore";
import React from "react";
import { ThemeProvider } from "./theme-provider";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  return (
    <UserProvider>
      <LanguageProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </ThemeProvider>
      </LanguageProvider>
    </UserProvider>
  );
};

export default Provider;
