import { getProgress } from "@/actions/get-progress";
import { CourseEnrollButton } from "@/components/course-enroll-button";
import { CourseProgress } from "@/components/course-progress";

import { formatPrice } from "@/lib/priceFormat";
import { auth } from "@clerk/nextjs";

import { Check, RefreshCw, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

type Props = {
  imageUrl: string;
  price: number | null;
  courseId: string;
  hasPurchased: boolean;
  courseProgress: number;
};

const CourseFeatureCard = ({
  imageUrl,
  price,
  courseId,
  hasPurchased,
  courseProgress,
}: Props) => {
  return (
    <div className="w-[70%] border rounded-md shadow-md bg-white overflow-hidden ">
      <div className="w-full aspect-video overflow-hidden">
        <Image
          height={500}
          width={500}
          className="object-cover scale-100"
          alt={"course-image"}
          src={imageUrl}
          priority
        />
      </div>
      <div className="p-4 flex flex-col justify-between min-h-[250px] w-full">
        <div>
          <p className="text-xs text-muted-foreground">Price</p>
          <span className="text-3xl font-bold text-blue-700">
            {formatPrice(price!)}
          </span>
        </div>
        <section className="text-muted-foreground text-xs flex gap-x-1 items-center justify-between">
          <div className="flex gap-x-2 items-center ">
            <Check className="h-4 w-4 " />
            Easy Access
          </div>
          <div className="flex gap-x-2 items-center ">
            <RefreshCw className="h-4 w-4 " />
            Easy Refunds
          </div>
          <div className="flex gap-x-2 items-center">
            <ShieldCheck className="h-4 w-4 " />
            High Quality
          </div>
        </section>

        <CourseEnrollButton
          courseId={courseId}
          price={price}
          hasPurchased={hasPurchased}
        />
        <div className="-mt-6">
          {hasPurchased && (
            <CourseProgress
              value={courseProgress}
              size="default"
              variant={courseProgress === 100 ? "success" : "default"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseFeatureCard;
