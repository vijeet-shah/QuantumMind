import { CourseProgress } from "@/components/course-progress";
import { Attachment, Chapter, Course, UserProgress } from "@prisma/client";
import DashboardCourseSidebarItems from "./dashboard-course-sidebar-items";

interface DashboardCourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
    attachments: Attachment[];
  };
  progressCount: number;
}

const DashboardCourseSidebar = ({
  course,
  progressCount,
}: DashboardCourseSidebarProps) => {
  return (
    <div className="h-full w-full">
      <div className="p-6 flex flex-col items-center w-full gap-y-2 border-b">
        <h1 className="font-semibold">{course.title}</h1>
        <CourseProgress
          value={progressCount}
          variant={progressCount === 100 ? "success" : "default"}
          size="sm"
        />
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <DashboardCourseSidebarItems
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardCourseSidebar;
