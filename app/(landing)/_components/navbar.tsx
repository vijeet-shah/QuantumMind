import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ClerkLoading, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="h-12 items-center flex justify-between w-full">
      {/* Logo */}
      <Link href={"/"}>
        <h1 className="font-extrabold text-xl md:text-2xl text-blue-700">
          Quantum<span className="text-black">Mind</span>{" "}
        </h1>
      </Link>
      {/* Sign Up and Login buttons */}
      <div className="flex items-center">
        <div className="flex gap-2 md:gap-5 lg:gap-10 items-center">
          <ClerkLoading>
            <Button
              className="bg-transparent text-muted-foreground px-10 "
              size="sm"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
            </Button>
          </ClerkLoading>
          <ClerkLoading>
            <Button className="bg-transparent text-muted-foreground px-10 hidden md:flex">
              <Loader2 className="w-4 h-4 animate-spin" />
            </Button>
          </ClerkLoading>
          <SignInButton mode="modal">
            <Button
              className="bg-transparent text-black border border-black px-10 hover:text-white hover:bg-blue-700 hover:border-blue-700"
              size="sm"
            >
              Login
            </Button>
          </SignInButton>
          <div className="hidden md:flex">
            <SignUpButton mode="modal">
              <Button className="px-10 hover:bg-blue-700" size="sm">
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
