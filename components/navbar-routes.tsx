"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { FaChalkboardTeacher } from "react-icons/fa";
import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacher = pathname?.startsWith("/dashboard/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto items-center">
        {isTeacher || isCoursePage ? (
          <Link href={"/dashboard"}>
            <Button size={"sm"} variant={"ghost"} className="font-semibold">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : (
          <Link href={"/dashboard/teacher/courses"}>
            <Button size={"sm"} variant={"ghost"} className=" font-semibold">
              <div className="flex items-center gap-x-2">
                <FaChalkboardTeacher className="h-5 w-5 opacity-80" />
                Teacher Mode
              </div>
            </Button>
          </Link>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};
