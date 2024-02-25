"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  icon: LucideIcon;
  label: string;
  href: string;
};

export const SidebarItem = ({ icon: Icon, label, href }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/dashboard" && href === "/dashboard") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm lg:text-[16px] font-semibold pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-blue-700 bg-blue-200/20 hover:bg-blue-200/20 hover:text-blue-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-blue-700")}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-blue-700/85 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};
