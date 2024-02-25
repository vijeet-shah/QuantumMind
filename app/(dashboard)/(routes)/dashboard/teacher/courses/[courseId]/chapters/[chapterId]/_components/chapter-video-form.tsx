"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, Trash2, Loader2, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { cn } from "@/lib/utils";
import React from "react";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(
        `/api/courses/${courseId}/chapters/${chapterId}/chapterVideo`
      );
      toast.success("Video deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-semibold flex items-center justify-between">
        Chapter video
        <div className="flex gap-x-2">
          <Button
            onClick={toggleEdit}
            variant="ghost"
            className={cn(
              "font-semibold transition-all duration-100",
              isEditing &&
                "bg-[#FF0000] hover:bg-[#FF0000] text-white hover:text-white "
            )}
            size={"sm"}
          >
            {isEditing && <>Cancel</>}
            {!isEditing && !initialData.videoUrl && (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add a video
              </>
            )}
            {!isEditing && initialData.videoUrl && (
              <div className="flex items-center gap-x-2">
                <div className="flex items-center">
                  <Pencil className="h-4 w-4 mr-2" />
                  <div className="font-semibold">Edit</div>
                </div>
              </div>
            )}
          </Button>
          {!isEditing && initialData.videoUrl && (
            <Button
              variant={"ghost"}
              className={cn(
                "font-semibold text-red-600 flex items-center hover:none md:hover:text-red-600 transition border border-transparent md:hover:border-red-600"
              )}
              size={"sm"}
              onClick={onDelete}
            >
              <div className="flex items-center">
                {!isDeleting ? (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </>
                ) : (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
              </div>
            </Button>
          )}
        </div>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div
            className="flex items-center justify-center h-60 bg-slate-200 rounded-md cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2">
            <video
              src={initialData.videoUrl}
              autoPlay
              controls
              className="rounded-md"
              loop={true}
            ></video>
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload a video for this specific chapter
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if the
          video does not appear.
        </div>
      )}
    </div>
  );
};
