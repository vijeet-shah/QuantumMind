"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardVideoPlayerProps {
  chapterId: string;
  courseId: string;
}

const DashboardVideoPlayer = ({
  chapterId,
  courseId,
}: DashboardVideoPlayerProps) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const getChapter = async () => {
      try {
        const response = await axios.get(
          `/api/courses/${courseId}/chapters/${chapterId}`
        );
        const recievedUrl = response.data.videoUrl;

        setUrl(recievedUrl);
        setIsReady(true);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };
    getChapter();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {!isReady && (
        <div className=" w-full lg:w-[800px] bg-[#333333] flex items-center justify-center aspect-video">
          <div className="flex flex-col gap-y-5 text-black">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </div>
      )}
      {isReady && (
        <video controls src={url} width={800} className="aspect-video"></video>
      )}
    </div>
  );
};

export default DashboardVideoPlayer;
