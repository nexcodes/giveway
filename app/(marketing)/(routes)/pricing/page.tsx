import { getUser } from "@/actions/supabase-actions";
import React from "react";
import PageContent from "./pageContent";

const Pricing = async () => {
  
  const user = await getUser();

  return (
    <PageContent user={user} />
  );
};

export default Pricing;
