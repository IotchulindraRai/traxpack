"use client";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { LoginButton } from "@/components/auth/login-button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { MobileNav } from "@/components/MobileNav";
import { RegisterButton } from "@/components/auth/register-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUserServerSide } from "@/hooks/currentUserServerSide";
import { UserButton } from "./auth/user-button";
import { useSession } from "next-auth/react";
const Navbar = () => {
  const { status } = useSession();
  return (
    <nav
      className={cn(
        "sticky h-14 inset-x-0 top-0 z-30 border-b border-gray-200  bg-white/40 backdrop-blur-lg transition-all"
      )}
    >
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link
            href="/"
            className="flex z-40 justify-center items-center gap-1"
          >
            <Image
              src="/logo.svg"
              alt="TraxPack logo"
              width={40}
              height={40}
            />
            <span className="text-2xl font-semibold">TraxPack</span>
          </Link>
          <div className="flex gap-1 sm:gap-4 items-center">
            {status !== 'authenticated' ? (
              <MobileNav />
            ) : (
              <Link
                className={buttonVariants({
                  size: "sm",
                  className: "sm:hidden mr-3",
                  variant: "secondary",
                })}
                href="/dashboard"
              >
                Dashboard
              </Link>
            )}

            <div className="hidden items-center space-x-4 sm:flex">
              {status !== 'authenticated' ? (
                <>
                  <LoginButton mode="modal" asChild>
                  <Button variant="secondary" size="sm">
                    Sign in
                  </Button>
                  </LoginButton>
                  <RegisterButton mode="modal" asChild>
                  <Button size="sm">
                    Get Started
                  </Button>
                  </RegisterButton>
                </>
              ) : (
                <>
                  <Link
                    className={buttonVariants({
                      size: "sm",
                      variant: "secondary",
                    })}
                    href="/dashboard"
                  >
                    Dashboard
                  </Link>
                </>
              )}
            </div>

            {/* User profile mockup below, e.g using Clerk: <UserButton afterSignOutUrl="/" /> */}
            {status !== 'unauthenticated' && (
                <UserButton />
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
