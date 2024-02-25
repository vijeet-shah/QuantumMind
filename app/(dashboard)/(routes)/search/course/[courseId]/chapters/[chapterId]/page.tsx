import { db } from "@/lib/db";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import CoursePreviewSidebarItem from "./_components/course-preview-sidebar-item";
import { auth } from "@clerk/nextjs";
import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import PreviewVideoPlayer from "./_components/preview-video-player";
import { Separator } from "@/components/ui/separator";

const BrowseChapterIdPage = async ({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
  };
}) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/search");
  }

  const catergory = await db.category.findUnique({
    where: {
      id: course.categoryId!,
    },
  });

  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  const { attachments, chapter, nextChapter, userProgress } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter) {
    return redirect(`/search/course/${params.courseId}`);
  }

  // Redirect to dashboard course page if purchased
  if (purchase) {
    return redirect(`/dashboard/course/${params.courseId}`);
  }

  return (
    <main className="px-5 py-4 space-y-6">
      <section className="flex items-center gap-x-1 md:gap-x-2 text-sm md:text-md">
        <Link href={"/search"}>
          <span className="font-semibold text-blue-700">Courses</span>
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/search?categoryId=${course.categoryId!}`}>
          <span className="font-semibold text-blue-700">{catergory?.name}</span>
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/search/course/${course.id}`}>
          <span className="font-semibold line-clamp-1 text-blue-700">
            {course.title}
          </span>
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-semibold line-clamp-1 ">Preview</span>
      </section>
      {/* NOT FOR MOBILE */}
      <section className="hidden md:block w-full rounded-md shadow-sm overflow-hidden border">
        <div className="min-h-[792px] relative">
          <div className="absolute left-0 top-0 w-60 h-full border-r flex flex-col gap-y-5">
            <h2 className="text-center font-medium text-xl mt-5">
              Course Contents
            </h2>
            <div className="w-full flex flex-col">
              {course.chapters.map((chapter) => (
                <CoursePreviewSidebarItem
                  key={chapter.id}
                  id={chapter.id}
                  label={chapter.title}
                  courseId={course.id}
                  isLocked={!chapter.isFree}
                />
              ))}
            </div>
          </div>
          <div className="pl-60">
            {!chapter.isFree && (
              <Banner
                variant={"warning"}
                label="This content is locked. Please purchase the course to continue"
              />
            )}
            <div className="p-2">
              <PreviewVideoPlayer
                isLocked={!chapter.isFree}
                chapterId={chapter.id}
                description={chapter.description!}
                title={chapter.title}
                courseId={course.id}
                price={course.price}
                hasPurchased={!!purchase}
              />
            </div>
          </div>
        </div>
      </section>
      {/* FOR MOBILE ONLY */}
      <section className="h-full md:hidden flex flex-col gap-y-6">
        <div className="w-full">
          <span className="text-xl font-semibold">{chapter.title}</span>
          <PreviewVideoPlayer
            isLocked={!chapter.isFree}
            chapterId={chapter.id}
            description={chapter.description!}
            title={chapter.title}
            courseId={course.id}
            price={course.price}
            hasPurchased={!!purchase}
          />
        </div>
        <Separator />
        <span className="text-lg font-semibold">Course chapters</span>
        <div className="w-full">
          {course.chapters.map((chapter) => (
            <CoursePreviewSidebarItem
              id={chapter.id}
              courseId={params.courseId}
              isLocked={!chapter.isFree}
              label={chapter.title}
              key={chapter.id}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default BrowseChapterIdPage;
