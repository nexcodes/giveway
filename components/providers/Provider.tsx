import { UserProvider } from "@/context/user";
import { EdgeStoreProvider } from "@/lib/edgestore";
import React from "react";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  return (
    <UserProvider>
      <EdgeStoreProvider>{children}</EdgeStoreProvider>
    </UserProvider>
  );
};

export default Provider;
