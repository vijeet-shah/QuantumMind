import { db } from "@/lib/db";
import { ChevronRight, FastForward, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CoursePageItems } from "./_components/coure-page-items";
import { formatPrice } from "@/lib/priceFormat";
import { CourseEnrollButton } from "@/components/course-enroll-button";
import { auth } from "@clerk/nextjs";
import { getProgress } from "@/actions/get-progress";

const BrowseCoursePage = async ({
  params,
}: {
  params: {
    courseId: string;
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

  const hasPurchased = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: params.courseId,
      },
    },
  });

  const courseProgress = await getProgress(userId, params.courseId);

  return (
    <main className="px-5 py-4 space-y-6">
      {/* Breadcrumbs */}
      <section className="flex items-center gap-x-1 md:gap-x-2 text-xs md:text-sm  md:text-md">
        <Link href={"/search"}>
          <span className="font-semibold text-blue-700">Courses</span>
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/search?categoryId=${course.categoryId!}`}>
          <span className="font-semibold text-blue-700">{catergory?.name}</span>
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-semibold line-clamp-1">{course.title}</span>
      </section>
      {/* Hidden for mobile and tabs */}
      <section className="hidden lg:block w-full rounded-md shadow-sm border overflow-hidden">
        <div className="h-48 relative text-white p-5 overflow-hidden">
          <h1 className="text-3xl">{course.title}</h1>
          {/* Short description */}
          <Image
            src={course.imageUrl!}
            alt="course image"
            height={1200}
            width={2160}
            className=" absolute left-0 top-0 -z-20 blur-sm scale-110 brightness-75"
            priority
          />
        </div>
        <div className="min-h-[600px] p-5">
          <CoursePageItems
            course={course}
            hasPurchased={!!hasPurchased}
            courseProgress={courseProgress}
          />
        </div>
      </section>
      {/* For mobile only */}
      <section className="lg:hidden flex flex-col items-center w-full gap-y-5">
        <div className="space-y-2">
          <Image
            src={course.imageUrl!}
            alt="course image"
            className="object-cover aspect-video rounded-md"
            height={500}
            width={500}
          />
          <div className=" w-full flex items-center justify-between p-2">
            <h1 className="text-md font-semibold">{course.title}</h1>
            <span className="font-bold">{formatPrice(course.price!)}</span>
          </div>
          <CourseEnrollButton
            courseId={course.id}
            price={course.price}
            hasPurchased={!!hasPurchased}
          />
        </div>
        <div className="w-full  rounded-md shadow-md p-2 space-y-5">
          <h2 className="font-semibold text-lg">Course Description</h2>
          <span className="text-muted-foreground">{course.description}</span>
        </div>
        <div className="w-full rounded-md shadow-md p-2 space-y-5">
          <h2 className="font-semibold text-lg">Course Contents</h2>
          <div className="w-full space-y-2">
            {course.chapters.map((chapter) => (
              <div
                key={chapter.id}
                className="bg-blue-100 p-1 text-blue-700 rounded-sm flex items-center justify-between"
              >
                <span>{chapter.title}</span>
                {chapter.isFree ? (
                  <Link
                    href={`/search/course/${course.id}/chapters/${chapter.id}`}
                  >
                    <span className="flex items-center gap-x-2">
                      Free
                      <FastForward className="h-4 w-4 mr-2" />{" "}
                    </span>
                  </Link>
                ) : (
                  <span>
                    <Lock className="h-4 w-4 mr-2" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BrowseCoursePage;
