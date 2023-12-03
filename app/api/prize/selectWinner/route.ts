// pages/api/schedule.js
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import cron from "node-cron";
import { Database } from "@/types/db";
import { NextResponse } from "next/server";

// Initialize Supabase client
const cookieStore = cookies();
const supabase = createRouteHandlerClient<Database>({
  cookies: () => cookieStore,
});

// Function to trigger the webhook
const triggerWebhook = async () => {
  console.log("Webhook triggered successfully");
};

// Function to check and trigger webhooks for past dates
const checkAndTriggerWebhooks = async () => {
  // Query records where time_end is in the past
  const currentDatetime = new Date().toISOString();
  const { data, error } = await supabase
    .from("prizes")
    .select("*")
    .lte("time_end", currentDatetime)
    .is("winner", null);

  // Handle errors if any
  if (error) {
    console.error("Error querying Supabase:", error);
    return;
  }

  console.log(data);
};
cron.schedule("* * * * * *", async () => {
  console.log("Running scheduled task...");
  await checkAndTriggerWebhooks();
});
