"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Logo = () => {
  const pathname = usePathname();

  const isTeacher = pathname?.includes("/teacher");

  return (
    <div>
      <Link href={`${isTeacher ? "/dashboard/teacher/courses" : "/dashboard"}`}>
        <h1 className="font-extrabold text-xl  lg:text-2xl text-blue-700  select-none">
          Quantum<span className="text-black">Mind</span>{" "}
        </h1>
      </Link>
    </div>
  );
};
