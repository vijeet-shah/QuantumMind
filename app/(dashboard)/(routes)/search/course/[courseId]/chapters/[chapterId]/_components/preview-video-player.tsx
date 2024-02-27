"use client";

import { CourseEnrollButton } from "@/components/course-enroll-button";
import { Preview } from "@/components/preview";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Loader2, Lock } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  isLocked: boolean;
  chapterId: string;
  description: string;
  title: string;
  courseId: string;
  price: number | null;
  hasPurchased: boolean;
};

const PreviewVideoPlayer = ({
  chapterId,
  description,
  isLocked,
  title,
  courseId,
  price,
  hasPurchased,
}: Props) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const getChapter = async () => {
      try {
        if (!isLocked) {
          const response = await axios.get(
            `/api/courses/${courseId}/chapters/${chapterId}`
          );
          const recievedUrl = response.data.videoUrl;
          //   console.log("Recieved Url");
          setUrl(recievedUrl);
          setIsReady(true);
        }
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };
    getChapter();
  });

  return (
    <div className="mt-5 md:mt-12 max-w-3xl mx-auto h-full">
      {isLocked && (
        <div className="h-[220px] lg:h-[500px] w-full bg-blue-950 flex justify-center items-center">
          <div className="flex flex-col text-white items-center gap-y-2">
            <Lock className="w-5 h-5" />
            <span>This chapter is locked</span>
          </div>
        </div>
      )}
      {!isLocked && !isReady && (
        <div className="aspect-video h-[220px]  lg:h-[500px] w-full bg-[#333333] flex justify-center items-center">
          <div className="flex flex-col text-white items-center gap-y-2">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      )}
      {!isLocked && isReady && (
        <video src={url} controls height={500} className="aspect-video"></video>
      )}
      {!isLocked && (
        <div className="mt-5">
          <h2 className="text-lg font-semibold">Chapter description</h2>
          <div className="-ml-3.5 mb-2">
            <Preview value={description} />
          </div>
          <Separator className="mb-6" />
          <div className="w-full flex justify-between items-center">
            <span className="text-muted-foreground hidden md:block">
              Purchase the course to view the full content
            </span>
            <CourseEnrollButton
              courseId={courseId}
              price={price}
              hasPurchased={hasPurchased}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewVideoPlayer;
