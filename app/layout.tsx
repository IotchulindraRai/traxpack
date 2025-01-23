import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

import { cn } from "@/lib/utils";
import "./globals.css";
import NavigationBar from "@/components/Navbar"; // Renamed Navbar to NavigationBar

export const pageMetadata: Metadata = {
  title: "TraxPack - Luggage Tracking Simplified",
  description: "Keep track of your luggage with ease, wherever you go.",
  icons: {
    icon: [
      {
        url: "/assets/logo.svg", // Changed logo path to assets folder for clarity
        href: "/assets/logo.svg",
      },
    ],
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en" className="light">
        <body
          className={cn(
            "grainy flex min-h-screen flex-col font-sans antialiased text-black bg-light", // Added bg-light for clarity
            GeistSans.className,
          )}
        >
          <Toaster />
          <NavigationBar /> {/* Renamed Navbar to NavigationBar */}
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
