import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Logo = ({ onFooter = false }: { onFooter: boolean }) => {
  return (
    <Link href={"/"}>
      <div className="hover:opacity-90 transition flex items-center gap-x-2">
        <Image
          src="/qm.png"
          className="rounded-full"
          width={30}
          height={30}
          alt="Picture of the author"
        />

        <h1
          className={cn(
            onFooter
              ? "font-extrabold text-xl  lg:text-2xl text-blue-700  select-none"
              : "font-extrabold text-xl  lg:text-2xl text-blue-500  select-none"
          )}
        >
          Quantum
          <span className={cn(onFooter ? "text-black" : "text-white")}>
            Mind
          </span>{" "}
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
