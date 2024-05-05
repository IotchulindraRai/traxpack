import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";


import { cn } from "@/lib/utils";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "TraxPack",
  description: "Your Luggage, Your Way",
  icons:{
    icon: [
      {
        url: "/logo.svg",
        href: "/logo.svg"
      },
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en" className="light">
        <body
          className={cn(
            "grainy flex min-h-screen flex-col font-sans antialiased text-black",
            GeistSans.className,
          )}
        >
          <Toaster />
          <Navbar />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
