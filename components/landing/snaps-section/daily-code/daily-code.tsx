import { CardContainer, CardItem } from "@/components/3dcard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import dailycode from "@/public/platform/dailycode.png";

const DailyCodeSection = () => {
  return (
    <div className="w-full flex flex-row-reverse items-center justify-between py-24 my-20 bg-neutral-900 dark:bg-slate-200">
      <div className="w-full flex flex-col items-start justify-center px-4 md:px-12">
        <h3 className="font-medium text-sm text-neutral-200 dark:text-neutral-800">
          <span className="font-bold text-blue-600 pr-1 text-lg">|</span>
          The best learning path
        </h3>
        <h2 className="text-2xl md:text-4xl font-semibold text-neutral-100 dark:text-neutral-900 mt-2 mb-6">
          Worried about missing crucial details?
        </h2>
        <p className="text-lg text-neutral-100 dark:text-neutral-800  font-medium mb-4">
          Forget about time travel, quantum minds! Ditch the note-taking frenzy
          and leap forward with QuantumMind&apos;s well-documented slides. Our
          learning path provides comprehensive documentation and engaging
          tutorials, allowing you to seamlessly revisit concepts and solidify
          your understanding.
        </p>
        <p className="text-lg text-neutral-200 dark:text-neutral-600 font-medium my-2">
          Combine this with engaging tutorials, and you&apos;ve got the ultimate
          recipe for programming mastery. Enroll now and unlock a future where
          learning is effortless and electrifying!
        </p>

        <Button
          className="mt-6 bg-blue-700 rounded-full hover:shadow-sm"
          size={"lg"}
          asChild
        >
          <Link href={"/explore-courses"} target="_blank">
            <p className="text-white">See more</p>{" "}
            <ChevronRight className="text-white h-4 w-4 ml-1 hover:translate-x-1 ease-in-out duration-200 " />
          </Link>
        </Button>
      </div>

      <CardContainer className="w-full cursor-pointer">
        <Link href="/explore-courses">
          <div className="hidden md:block py-3 pr-3 md:py-6 md:pr-6 rounded-r-xl md:rounded-r-2xl bg-neutral-800 shadow-2xl">
            <CardItem>
              <Image
                src={dailycode}
                alt={"dailycode"}
                width={1400}
                height={1260}
                className="rounded-r-lg md:rounded-r-xl"
              />
            </CardItem>
          </div>
        </Link>
      </CardContainer>
    </div>
  );
};

export default DailyCodeSection;
