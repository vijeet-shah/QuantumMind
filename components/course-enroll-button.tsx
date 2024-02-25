"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/priceFormat";
import axios from "axios";
import { ArrowRightCircle, Loader2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number | null;
  hasPurchased: boolean;
}

export const CourseEnrollButton = ({
  courseId,
  price,
  hasPurchased,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.post(`/api/courses/${courseId}/checkout`);
      toast.success("Course purchased");
      router.push(`/dashboard/course/${courseId}`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const afterBuyClick = () => {
    router.push(`/dashboard/course/${courseId}`);
  };

  return (
    <>
      {!hasPurchased && (
        <Button
          className="w-full md:w-auto bg-blue-700 hover:bg-blue-600"
          size="sm"
          onClick={onClick}
          disabled={isLoading}
        >
          {!isLoading && !hasPurchased && <>Enroll for {formatPrice(price!)}</>}
          {isLoading && !hasPurchased && (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
            </>
          )}
          {isLoading && hasPurchased && (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
            </>
          )}
          {!isLoading && hasPurchased && (
            <div className="flex items-center gap-x-2">
              <span className="text-sm">Go to course</span>
              <ArrowRightCircle className="w-4 h-4 " />
            </div>
          )}
        </Button>
      )}
      {hasPurchased && (
        <Button
          className="w-full md:w-auto bg-blue-700 hover:bg-blue-600"
          size="sm"
          onClick={afterBuyClick}
          disabled={isLoading}
        >
          {isLoading && hasPurchased && (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
            </>
          )}
          {!isLoading && hasPurchased && (
            <div className="flex items-center gap-x-2">
              <span className="text-sm">Go to course</span>
              <ArrowRightCircle className="w-4 h-4 " />
            </div>
          )}
        </Button>
      )}
    </>
  );
};
