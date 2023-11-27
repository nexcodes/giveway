// "use client";

// import React, { createContext, useEffect, useState } from "react";
// import { toast } from "sonner";
// import axios from "axios";
// import { UserData } from "@/types/user-data";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { Database } from "@/types/db";
// import { getAuthUser } from "@/actions/supabase-actions";
// interface UserContextProps {
//   user?: UserData | null;
//   setUser: React.Dispatch<React.SetStateAction<UserData | null | undefined>>;
//   handleSignOut: () => void;
// }

// interface UserProviderProps {
//   children: React.ReactNode;
// }

// export const UserContext = createContext<UserContextProps>({
//   user: null,
//   setUser: () => {},
//   handleSignOut: () => {},
// });

// export const UserProvider = ({ children }: UserProviderProps) => {
//   const supabase = createClientComponentClient<Database>();

//   const [user, setUser] = useState<UserData | null | undefined>(undefined);

//   useEffect(() => {
//     (async () => {
//       try {
//         const AuthUser = await getAuthUser();

//         if (!AuthUser?.email) {
//           setUser(null);
//           return;
//         }

//         const { data, error } = await supabase
//           .from("users")
//           .select()
//           .eq("email", AuthUser?.email);

//         if (error) {
//           throw new Error(`SELECT USER ${error.message}`);
//         }

//         if (data[0]?.email === AuthUser?.email) {
//           setUser(data[0]);
//           return;
//         }

//         if (!data[0]?.email) {
//           const response = await axios.post("/api/stripe/createAccount", {
//             email: AuthUser?.email,
//             name: AuthUser?.user_metadata?.name,
//           });

//           const stripe_customer_id = response.data.id;

//           const { data, error } = await supabase.from("users").insert([
//             {
//               id: AuthUser?.id,
//               email: AuthUser?.email,
//               name: AuthUser?.user_metadata?.name,
//               image: AuthUser?.user_metadata?.picture,
//               stripe_customer_id,
//             },
//           ]);

//           if (error) {
//             throw new Error(`!DATA ${error.message}`);
//           }

//           if (data) {
//             setUser(data[0]);
//           }

//           return;
//         }
//         setUser(null);
//       } catch (error) {
//         setUser(null);
//         console.log(error);
//       }
//     })();
//   }, [supabase]);

//   const handleSignOut = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) {
//         throw new Error(error.message);
//       }
//       toast.success("Signed out successfully!");
//       setUser(null);
//     } catch (error) {
//       toast.error("Failed to Sign out!");
//       console.log(error);
//     }
//   };

//   return (
//     <UserContext.Provider value={{ user, setUser, handleSignOut }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
