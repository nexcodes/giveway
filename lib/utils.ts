import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${process?.env?.NEXT_PUBLIC_APP_URL}${path}`;
}

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_APP_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  url = url.concat("auth/callback");
  return url;
};

export function calculateRemainingTime(futureDate: Date) {
  // Get the current date and time
  let currentDate = new Date();

  // Calculate the time difference in milliseconds
  let timeDifference: number = futureDate.getTime() - currentDate.getTime();

  // Calculate remaining days, hours, minutes, and seconds
  let remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  let remainingHours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let remainingMinutes = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
  );
  let remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return {
    days: remainingDays,
    hours: remainingHours,
    minutes: remainingMinutes,
    seconds: remainingSeconds,
  };
}
