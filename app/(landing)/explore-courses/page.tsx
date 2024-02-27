"use client";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

function ExploreCourse() {
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

export default ExploreCourse;
