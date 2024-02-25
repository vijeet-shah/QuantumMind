"use client";

import { cn } from "@/lib/utils";
import { Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface PreviewCourseSidebarItemProps {
  id: string;
  label: string;
  courseId: string;
  isLocked: boolean;
}

const CoursePreviewSidebarItem = ({
  courseId,
  id,
  isLocked,
  label,
}: PreviewCourseSidebarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const Icon = isLocked ? Lock : PlayCircle;

  const onClick = () => {
    router.push(`/search/course/${courseId}/chapters/${id}`);
  };

  const isActive = pathname?.includes(id);

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 w-full rounded-sm lg:rounded-none",
        isActive &&
          "text-blue-700 bg-blue-200/20 hover:bg-blue-200/20 hover:text-blue-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4 font-semibold">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-s;ate-700")}
        />
        {label}
      </div>
    </button>
  );
};

export default CoursePreviewSidebarItem;
