"use client";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignIn,
} from "@clerk/nextjs";

function page() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return redirect("/search");
  }

  return (
    <div>
      explore-courses <SignInButton />
      <SignUpButton />
    </div>
  );
}

export default page;
