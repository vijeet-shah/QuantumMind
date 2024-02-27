"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Logo from "./landing/logo/logo";
import { Button } from "./ui/button";
import { ThemeToggler } from "./ThemeToggler";
import { NavigationMenu } from "./landing/appbar/nav-menu";
import { ClerkLoading, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export const Appbar = () => {
  const currentPath = usePathname();
  return (
    <>
      <nav className="fixed z-50 top-0 px-4 w-full h-16 border-b shadow-sm bg-background/80 backdrop-blur-md flex items-center gap-2">
        <div className="md:max-w-screen-2xl mx-auto flex items-center justify-between w-full">
          <Logo onFooter={false} />
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center justify-around md:w-auto md:block space-x-2">
              <ClerkLoading>
                <Button className="bg-transparent text-muted-foreground px-10 hidden md:flex">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </Button>
              </ClerkLoading>

              <SignInButton mode="modal">
                <Button
                  className="bg-blue-100 text-black border border-black px-10 hover:text-white hover:bg-blue-700 hover:border-blue-700"
                  size="sm"
                >
                  Login
                </Button>
              </SignInButton>

              <SignUpButton mode="modal">
                <Button
                  className="bg-blue-800 text-white border border-black px-10 hover:text-white hover:bg-blue-500 hover:border-black"
                  size="sm"
                >
                  JOIN NOW
                </Button>
              </SignUpButton>
            </div>
            <ThemeToggler />

            <div className="block sm:hidden">
              <NavigationMenu />
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16 w-full" />
    </>
  );
};
