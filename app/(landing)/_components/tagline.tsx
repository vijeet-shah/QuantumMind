import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { ClerkLoading, SignUpButton, useAuth } from "@clerk/nextjs";

const Tagline = () => {
  return (
    <div className="h-[calc(100vh-117px)] flex flex-col items-center justify-center space-y-10">
      <div className="flex items-center flex-col justify-center gap-5 md:gap-7 lg:gap-12 relative  max-w-[90%] lg:max-w-[70%]">
        <header className="h-max text-3xl md:text-5xl lg:text-8xl font-extrabold text-center ">
          <h1 className="">
            The
            <span className="relative">
              {" "}
              best{" "}
              <Image
                src={"/crown.png"}
                className="object-contain h-[40px] w-[40px] md:h-[120px] md:w-[60px]  lg:h-[150px] lg:w-[110px] absolute -top-7 left-3 md:-top-16 md:left-5 lg:-top-24 lg:left-10 -z-10 opacity-100"
                height={100}
                width={800}
                alt="scribble"
              />
            </span>
            way to learn or practice a
            <span className="text-blue-700"> subject</span>
          </h1>
          {/* <h1 className="">
            practice a<span className="text-blue-700"> subject</span>{" "}
          </h1> */}
        </header>
        {/* sub text */}
        <p className="max-w-[90%] text-sm lg:text-xl text-black/50 font-medium text-center">
          Educating. Inspiring. & Transforming lives with immersive lessons{" "}
          <br className="hidden lg:block" /> & dynamic learning approach.
        </p>

        <ClerkLoading>
          <Button
            className=" px-8 py-6 text-muted-foreground bg-transparent"
            size="sm"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
          </Button>
        </ClerkLoading>

        <SignUpButton mode="modal">
          <Button
            className="flex gap-1 px-6 py-3 lg:gap-2 lg:px-8 lg:py-6 bg-blue-700 hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition"
            size="sm"
          >
            Explore <ArrowRight size={20} />{" "}
          </Button>
        </SignUpButton>

        <Image
          src={"/starblue.png"}
          width={40}
          height={40}
          className="object-contain absolute -left-3 lg:-left-10 lg:bottom-32 h-[25px] w-[25px] lg:h-[55px] lg:w-[55px]"
          alt="star"
        />
        <Image
          src={"/starblack.png"}
          width={40}
          height={40}
          className="object-contain absolute right-2 bottom-2 lg:right-5 lg:bottom-8 h-[30px] w-[30px] lg:h-[60px] lg:w-[60px]"
          alt="star"
        />
        <Image
          src={"/starblue.png"}
          width={30}
          height={30}
          className="object-contain absolute right-0 bottom-24  lg:-right-24 lg:top-32 h-[15px] w-[15px] lg:h-[45px] lg:w-[45px]"
          alt="star"
        />
      </div>
      <div className="w-full aspect-video relative lg:hidden">
        <Image src="/ipad.png" fill alt="ipad" className="object-contain" />
      </div>
    </div>
  );
};

export default Tagline;
