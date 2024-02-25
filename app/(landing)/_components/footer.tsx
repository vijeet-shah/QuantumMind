import { Button } from "@/components/ui/button";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="pb-3 flex items-center w-full justify-between">
      <Link href="/">
        <h1 className="font-extrabold text-md text-blue-700">
          Quantum<span className="text-black">Mind</span>{" "}
        </h1>
      </Link>
      <div className="flex md:gap-2 text-black/60 font-bold">
        <Button variant={"ghost"} className="text-xs">
          Privacy Policy
        </Button>
        <Button variant={"ghost"} className="text-xs">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};

export default Footer;
