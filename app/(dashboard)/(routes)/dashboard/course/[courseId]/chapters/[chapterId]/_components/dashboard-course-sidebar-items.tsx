"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface DashboardCourseSidebarItemProps {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
}

const DashboardCourseSidebarItems = ({
  courseId,
  id,
  isCompleted,
  label,
}: DashboardCourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isCompleted ? CheckCircle : PlayCircle;

  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/dashboard/course/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-3 lg:pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 w-full rounded-sm lg:rounded-none",
        isActive &&
          "text-blue-700 bg-blue-200/20 hover:bg-blue-200/20 hover:text-blue-700",
        isCompleted && "text-emerald-700 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-200/20"
      )}
    >
      <div className="flex items-center gap-x-2 py-4 font-semibold">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-s;ate-700",
            isCompleted && "text-emerald-700"
          )}
        />
        {label}
      </div>
    </button>
  );
};

export default DashboardCourseSidebarItems;
