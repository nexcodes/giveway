import supabase from "@/lib/supabase";

const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  return data?.session?.user;
};

export default getSession;
