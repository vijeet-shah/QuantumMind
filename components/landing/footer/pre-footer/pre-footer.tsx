import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";

const PreFooterSection = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 md:px-36 py-32 my-20">
      <div className="flex flex-col items-center justify-center gap-y-2 mb-3 md:mb-6">
        <h3 className="text-2xl md:text-4xl text-center font-semibold text-neutral-800 dark:text-neutral-200 px-6 md:px-24">
          Every dev has the potential to become a legendary{" "}
          <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Quantum Engineer
          </span>
        </h3>

        <p className="text-lg text-neutral-600 dark:text-neutral-400 text-center font-medium px-12">
          Stop settling for average, awaken the quantum mind within, and unlock
          coding superpowers with QuantumMind.{" "}
          <span className=" text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
            {" "}
            Ready to level up your game{" "}
          </span>{" "}
          and dominate the tech world? Join the quantum revolution today!
        </p>
      </div>

      <Button size={"lg"} className="text-lg rounded-full" asChild>
        <Link href={"/sign-in"} target="_blank">
          <p className="text-white">Join now</p>{" "}
          <Sparkles className="text-white ml-2 h-4 w-4 hover:translate-x-0.5 ease-linear duration-200" />
        </Link>
      </Button>
    </div>
  );
};

export default PreFooterSection;
