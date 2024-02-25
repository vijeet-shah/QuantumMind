import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CourseList } from "@/components/courses-list";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  let getCategory;

  if (searchParams.categoryId) {
    getCategory = await db.category.findUnique({
      where: {
        id: searchParams.categoryId,
      },
    });
  }

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        {getCategory ? (
          <h1 className="text-2xl font-medium">{getCategory.name}</h1>
        ) : (
          <h1 className="text-2xl font-medium">All Courses</h1>
        )}
        <CourseList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
