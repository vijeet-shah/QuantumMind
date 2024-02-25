import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const DashboardCousePage = async ({
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
        where: {
          isPublished: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/dashboard");
  }

  return redirect(
    `/dashboard/course/${params.courseId}/chapters/${course.chapters[0].id}`
  );
};

export default DashboardCousePage;
