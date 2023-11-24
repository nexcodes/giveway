import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Provider from "@/components/providers/Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Giveaway Application",
  description: "This is a giveaway application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Toaster position="top-center" />
          {children}
        </Provider>
      </body>
    </html>
  );
}
