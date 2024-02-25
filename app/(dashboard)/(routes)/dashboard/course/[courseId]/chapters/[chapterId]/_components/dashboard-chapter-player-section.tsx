import { getChapter } from "@/actions/get-chapter";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DashboardVideoPlayer from "./dashboard-video-player";
import { Download, File } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { CourseProgressButton } from "./course-progress-button";
import { db } from "@/lib/db";
import DashboardCourseSidebarItems from "./dashboard-course-sidebar-items";
import { getProgress } from "@/actions/get-progress";
import { CourseProgress } from "@/components/course-progress";

interface DashboardChapterPlayerSection {
  courseId: string;
  chapterId: string;
}
const DashboardChapterPlayerSection = async ({
  chapterId,
  courseId,
}: DashboardChapterPlayerSection) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const progressCount = await getProgress(userId, courseId);

  const courseChapters = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      attachments: {
        where: {
          courseId: courseId,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const { attachments, chapter, course, nextChapter, purchase, userProgress } =
    await getChapter({
      userId,
      chapterId: chapterId,
      courseId: courseId,
    });

  if (!chapter || !course) {
    return redirect("/dashboard/search");
  }

  return (
    <main className="mx-auto items-center max-w-[800px] space-y-3">
      <div className="lg:hidden w-full border p-2 rounded-sm flex flex-col items-center gap-y-3">
        <h2 className="text-sm font-bold">{courseChapters?.title}</h2>
        <CourseProgress
          value={progressCount}
          size={"sm"}
          variant={progressCount === 100 ? "success" : "default"}
        />
      </div>
      <DashboardVideoPlayer chapterId={chapterId} courseId={courseId} />
      <div className="w-full flex  flex-col items-center md:flex-row md:justify-between gap-y-4">
        <h1 className="text-2xl font-semibold">{chapter.title}</h1>
        <CourseProgressButton
          chapterId={chapterId}
          courseId={courseId}
          nextChapterId={nextChapter?.id}
          isCompleted={!!userProgress?.isCompleted}
        />
      </div>
      <Separator />
      <div className="-ml-3.5">
        <Preview value={chapter.description!} />
      </div>
      <Separator />
      <h2 className="font-semibold">Attachments by creator:</h2>
      <div className="flex flex-col gap-y-2">
        {attachments.map((attachment) => (
          <a
            href={attachment.url}
            download
            className="bg-blue-100 rounded-sm p-2 text-blue-700 flex justify-between items-center"
            key={attachment.id}
          >
            <div className="flex items-center gap-x-1">
              <File className="w-4 h-4" />
              <span className="text-xs line-clamp-1">{attachment.name}</span>
            </div>
            <Download className="h-4 w-4 mr-2" />
          </a>
        ))}
      </div>
      {/* For mobile */}
      <section className="lg:hidden pt-4 space-y-4 w-full">
        <Separator />
        <h2 className="font-semibold">Course chapters:</h2>
        <div className="space-y-2">
          {courseChapters?.chapters.map((chapter) => (
            <DashboardCourseSidebarItems
              key={chapter.id}
              courseId={courseId}
              id={chapter.id}
              isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
              label={chapter.title}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default DashboardChapterPlayerSection;
