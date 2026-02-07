import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Navbar from "@/components/Navbar";
import { DataProvider } from "@/data/DataContext";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "DevTables - Developer Dinners in Medellin",
  description: "Recurring small-group dinners for developers. Every Wednesday, 6 strangers meet for 90 minutes of genuine conversation and collaboration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={`${geist.variable} antialiased`}>
          <DataProvider>
            <Navbar />
            <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
          </DataProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
