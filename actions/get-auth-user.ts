import supabase from "@/lib/supabase";

const getAuthUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

export default getAuthUser;