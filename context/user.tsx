"use client";

import getAuthUser from "@/actions/get-auth-user";
import supabase from "@/lib/supabase";
import React, { createContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

interface UserContextProps {
  user?: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
  handleSignOut: () => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  handleSignOut: () => {},
});

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const user = await getAuthUser();
      setUser(user);
    })();
  });

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, handleSignOut }}>
      {children}
    </UserContext.Provider>
  );
};
