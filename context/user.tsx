"use client";

import supabase from "@/lib/supabase";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import getSession from "@/actions/get-session";
import axios from "axios";
import { UserData } from "@/types/user-data";
interface UserContextProps {
  user?: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null | undefined>>;
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
  const [user, setUser] = useState<UserData | null | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const AuthUser = await getSession();

        if (!AuthUser) {
          setUser(null);
          return;
        }

        const { data, error } = await supabase
          .from("users")
          .select()
          .eq("email", AuthUser?.email);

        if (error) {
          throw new Error(`SELECT USER ${error.message}`);
        }

        if (data[0]?.email === AuthUser?.email) {
          setUser(data[0]);
          return;
        }

        if (!data[0]?.email) {
          const response = await axios.post("/api/stripe/createAccount", {
            email: AuthUser?.email,
            name: AuthUser?.user_metadata?.name,
          });

          const customer_id = response.data.id;

          const { data, error } = await supabase.from("users").insert([
            {
              id: AuthUser?.id,
              email: AuthUser?.email,
              name: AuthUser?.user_metadata?.name,
              image: AuthUser?.user_metadata?.picture,
              customer_id,
            },
          ]);

          if (error) {
            throw new Error(`!DATA ${error.message}`);
          }

          if (data) {
            setUser(data[0]);
          }

          return;
        }
        setUser(null);
      } catch (error) {
        setUser(null);
        console.log(error);
      }
    })();
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
      toast.success("Signed out successfully!");
      setUser(null);
    } catch (error) {
      toast.error("Failed to Sign out!");
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, handleSignOut }}>
      {children}
    </UserContext.Provider>
  );
};
