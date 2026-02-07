import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Navbar from "@/components/Navbar";
import { DataProvider } from "@/data/DataContext";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevConnect - Developer Networking Platform",
  description: "Connect with developers, showcase your projects, and find collaborators for your next big idea.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`}>
        <DataProvider>
          <Navbar />
          <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
        </DataProvider>
      </body>
    </html>
  );
}
