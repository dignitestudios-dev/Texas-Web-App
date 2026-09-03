import type { Metadata } from "next";
import { Rubik, Poppins } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Texas Caregiver Alliance",
  description: "Texas Caregiver Alliance",
};

import QueryProvider from "@/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { TopProgressBar } from "@/components/common/top-progress-bar";
import { NetworkGuard } from "@/components/common/network-guard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rubik.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <TopProgressBar />
        <NetworkGuard />
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
