import { Button } from "@/components/ui/button";
import { ChevronRight, Medal } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import PlatformSection from "../snaps-section/platform/platform-section";
import DashboardSection from "../snaps-section/dashboard/dashboard-section";
import TrustedBySection from "../trustedby-section/trusted-by";
import WhyUsSection from "../us-section/why-us";
import AboutUsSection from "../us-section/about-us";
import CertsSection from "../snaps-section/certs-section/certs-section";
import PreFooterSection from "../footer/pre-footer/pre-footer";
import DailyCodeSection from "../snaps-section/daily-code/daily-code";
import { Appbar } from "../../Appbar";
import Footer from "../footer/footer";

const textFont = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function MainLandingPage() {
  const scrollToSection = (sectionId: number) => {
    scroll.scrollTo(sectionId, {
      duration: 800,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <div>
      <Appbar />
      <main className="flex items-center justify-center flex-col ">
        {/* Tagline */}
        <div className={cn("flex items-center justify-center flex-col")}>
          <div className="mb-4 text-sm md:text-md font-sans font-semibold flex items-center border shadow-md py-2.5 px-4 md:px-5 bg-blue-50 text-blue-700 rounded-full uppercase">
            <Medal className="h-5 w-5 mr-2" />
            #1 learning platform
          </div>

          <h1 className="text-4xl font-semibold	md:text-6xl text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-3 md:mb-4">
            Quantum<span className="text-black">Mind</span>
          </h1>

          <div className="text-3xl font-medium md:text-6xl text-center text-neutral-800 dark:text-neutral-200 px-4 pb-4 w-fit">
            because normal mind ain&apos;t enough!
          </div>

          <div
            className={cn(
              "text-sm md:text-xl text-neutral-400 dark:text-neutral-500 mt-4 max-w-sm md:max-w-2xl text-center mx-auto px-2",
              textFont.className
            )}
          >
            Cracking the Quantum Code, Dive into the world of programming and
            unlock your inner developer potential.Programming is the key, and
            you hold the brush. It&apos;s time to code your way to the future!
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            className="mt-6 rounded-full hover:shadow-sm"
            size={"lg"}
            asChild
          >
            <Link href={"/explore-courses"}>
              <p className="text-white">Explore courses</p>
            </Link>
          </Button>

          <Button
            className="mt-6 rounded-full hover:shadow-sm"
            size={"lg"}
            variant={"outline"}
            asChild
          >
            {/* Use ScrollLink to scroll to the desired section */}
            <ScrollLink
              to="trustedby"
              spy={true}
              smooth={true}
              offset={-70}
              duration={800}
            >
              <p className="text-black">See more</p>
              <ChevronRight className="text-black h-4 w-4 ml-1 hover:translate-x-1 ease-in-out duration-200" />
            </ScrollLink>
          </Button>
        </div>

        {/* Platform */}
        <PlatformSection />

        {/* Trusted by */}
        <TrustedBySection />

        {/* Dashboard */}
        <DashboardSection />

        {/* DailyCode */}
        <DailyCodeSection />

        {/* Why Us? */}
        <WhyUsSection />

        {/* About us */}
        <AboutUsSection />

        {/* Certificate Section */}
        <CertsSection />

        {/* PreFooter Section */}
        <PreFooterSection />
      </main>
      <Footer />
    </div>
  );
}
