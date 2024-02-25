"use client";

import Navbar from "./_components/navbar";

import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const HeroPage = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return redirect("/dashboard");
  }

  return (
    <div className="w-full px-4 pt-4 lg:pt-6 lg:px-12 overflow-x-hidden relative flex flex-col items-center">
      <Navbar />

      <div className="w-[60%] aspect-video relative -translate-y-40 lg:flex flex-col items-center justify-center hidden"></div>
    </div>
  );
};

export default HeroPage;
