"use client";
import Tabs from "@/app/(dashboard)/(routes)/search/course/[courseId]/_components/tabs";
import { Chapter, Course } from "@prisma/client";
import CourseFeatureCard from "./course-feature-card";

interface CoursePageItemsProps {
  course: Course & {
    chapters: Chapter[];
  };
  hasPurchased: boolean;
  courseProgress: number;
}

export const CoursePageItems = ({
  course,
  hasPurchased,
  courseProgress,
}: CoursePageItemsProps) => {
  return (
    <div className="h-full w-full flex">
      <div className="w-[70%]">
        <Tabs course={course} />
      </div>
      <div className="w-[30%] flex justify-center items-center">
        <div className="w-full flex justify-center -translate-y-28">
          <CourseFeatureCard
            imageUrl={course.imageUrl!}
            price={course.price}
            courseId={course.id}
            hasPurchased={hasPurchased}
            courseProgress={courseProgress}
          />
        </div>
      </div>
    </div>
  );
};
