import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import DashboardCourseSidebar from "./_components/dashboard-course-sidebar";
import DashboardChapterPlayerSection from "./_components/dashboard-chapter-player-section";
import DashboardVideoPlayer from "./_components/dashboard-video-player";

const DashboardCourseChapterIdPage = async ({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
  };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
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
          courseId: params.courseId,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/dashboard");
  }

  const purchased = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId: userId,
        courseId: params.courseId,
      },
    },
  });

  if (!purchased) {
    return redirect(`/dashboard/search/course/${params.courseId}`);
  }

  const progressCount = await getProgress(userId, course.id);

  return (
    <main className="px-5 py-4 space-y-6">
      {/* Breadcrumbs */}
      <section className="flex items-center gap-x-1 md:gap-x-2 text-sm md:text-md">
        <Link href={"/dashboard"}>
          <span className="font-semibold text-blue-700">My Courses</span>
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/search/course/${course.id}`}>
          <span className="font-semibold line-clamp-1 ">{course.title}</span>
        </Link>
      </section>
      {/* Not for mobile or tabs */}
      <section className="hidden lg:block w-full rounded-md shadow-sm border min-h-[792px] relative">
        {/* SIDEBAR */}
        <div className="absolute top-0 left-0 h-full border-r w-60 z-20 bg-white">
          <DashboardCourseSidebar
            progressCount={progressCount}
            course={course}
          />
        </div>
        <div className="pl-60 w-full h-full">
          <div className="w-full h-full p-4">
            <DashboardChapterPlayerSection
              courseId={course.id}
              chapterId={params.chapterId}
            />
          </div>
        </div>
      </section>
      <section className="lg:hidden w-full">
        <DashboardChapterPlayerSection
          courseId={course.id}
          chapterId={params.chapterId}
        />
      </section>
    </main>
  );
};

export default DashboardCourseChapterIdPage;
