"use client";

import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/priceFormat";
import { CourseProgress } from "./course-progress";
import { redirect, usePathname } from "next/navigation";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

export const CourseCard = ({
  category,
  chaptersLength,
  id,
  imageUrl,
  price,
  progress,
  title,
}: CourseCardProps) => {
  const pathname = usePathname();

  const isSearchPage = pathname?.includes("/search");

  const url = isSearchPage ? `/search/course/${id}` : `/dashboard/course/${id}`;

  return (
    <Link href={url}>
      <div className="relative group-hover:shadow-sm transition overflow-hidden border rounded-lg h-full">
        <div className="w-full aspect-video rounded-t-lg overflow-hidden">
          <Image
            height={500}
            width={500}
            className="object-cover"
            alt={title}
            src={imageUrl}
            priority
          />
        </div>
        <div className="flex flex-col px-2 py-2">
          <div className="text-lg md:text-base font-semibold group-hover:text-blue-700 line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size={"sm"} icon={BookOpen} />
              <span className="">
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              value={progress}
              variant={progress === 100 ? "success" : "default"}
              size="sm"
            />
          ) : (
            <p className="font-bold text-md md:text-sm text-slate-700">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
