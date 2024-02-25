import { Chapter, Course } from "@prisma/client";
import { FastForward, Lock } from "lucide-react";
import React from "react";

type Props = {
  course: Course & {
    chapters: Chapter[];
  };
};

const TabChapterItems = ({ course }: Props) => {
  return (
    <div className="space-y-2">
      {course.chapters.map((chapter) => (
        <div
          key={chapter.id}
          className="p-2 rounded-sm bg-blue-100 text-blue-700 flex items-center justify-between"
        >
          {chapter.title}
          {/* To do: Link the chapters to their destinations */}
          {chapter.isFree ? (
            <a href={`/search/course/${course.id}/chapters/${chapter.id}`}>
              <button className="flex gap-x-2 items-center">
                <span className="">Free for preview</span>
                <FastForward className="h-4 w-4 mr-2" />
              </button>
            </a>
          ) : (
            <Lock className="h-4 w-4 mr-2" />
          )}
        </div>
      ))}
    </div>
  );
};

export default TabChapterItems;
