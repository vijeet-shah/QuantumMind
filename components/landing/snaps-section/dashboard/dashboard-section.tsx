import Image from "next/image";
import dashboard from "@/public/platform/dashboard.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CardContainer, CardItem } from "@/components/3dcard";

const DashboardSection = () => {
  return (
    <div className="w-full flex items-center justify-between my-20">
      <div className="w-full flex flex-col items-start justify-center px-4 md:px-12">
        <h3 className="font-medium text-sm text-neutral-500 dark:text-neutral-400">
          <span className="font-bold text-blue-600 pr-1 text-lg">|</span>The
          best learning platform!
        </h3>
        <h2 className="text-2xl md:text-4xl font-semibold text-neutral-800 dark:text-neutral-200 mt-2 mb-6">
          What is QuantumMind?
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 font-medium">
          <span className="text-blue-700 ">Quantum</span>Mind isn't just another
          learning platform. It's your launchpad to decipher the code and unlock
          your inner developer genius. Explore cutting-edge courses curated by
          industry engineers, and level up your skills faster than you thought
          possible. Get ready to bend the code and become a engineer with
          QuantumMind.
        </p>

        <Button
          className="mt-6 rounded-full hover:shadow-sm"
          size={"lg"}
          asChild
        >
          <Link href={"/explore-courses"}>
            <p className="text-white">Explore courses</p>{" "}
            <ChevronRight className="text-white h-4 w-4 ml-1 hover:translate-x-1 ease-in-out duration-200 " />
          </Link>
        </Button>
      </div>
      <CardContainer className="w-full cursor-pointer">
        <Link href="/explore-courses" target="_blank">
          <div className="hidden md:block py-3 md:py-6 pl-3 md:pl-6 rounded-l-xl md:rounded-l-2xl bg-slate-200 dark:bg-slate-800">
            <CardItem>
              <Image
                src={dashboard}
                alt={"platform"}
                width={1400}
                height={1260}
                className="rounded-l-lg md:rounded-l-xl"
              />
            </CardItem>
          </div>
        </Link>
      </CardContainer>
    </div>
  );
};

export default DashboardSection;
