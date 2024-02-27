"use client";

import LandingPage from "@/components/landing/landing-page";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const HeroPage = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return redirect("/dashboard");
  }

  return (
    <div>
      <LandingPage />
    </div>
  );
};

export default HeroPage;
