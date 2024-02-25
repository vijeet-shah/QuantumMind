import { db } from "@/lib/db";
import { Categories } from "../search/_components/categories";
import { CourseList } from "@/components/courses-list";
import { auth } from "@clerk/nextjs";
import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./_components/info-card";

export default async function DashboardPage() {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  return (
    <>
      <div></div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard
            icon={Clock}
            label="In Progress"
            numberOfItems={coursesInProgress.length}
          />
          <InfoCard
            icon={CheckCircle}
            label="Completed"
            numberOfItems={completedCourses.length}
          />
        </div>
        <h1 className="text-2xl">My Courses</h1>
        <CourseList items={[...coursesInProgress, ...completedCourses]} />
      </div>
    </>
  );
}
