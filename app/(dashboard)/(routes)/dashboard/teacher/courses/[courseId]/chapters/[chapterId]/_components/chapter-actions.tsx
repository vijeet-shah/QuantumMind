"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

interface ChapterActionProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

export const ChapterActions = ({
  chapterId,
  courseId,
  disabled,
  isPublished,
}: ChapterActionProps) => {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const onDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success("Chapter deleted");
      router.push(`/dashboard/teacher/courses/${courseId}`);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  const onClick = async () => {
    try {
      setIsPublishing(true);
      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
        );
        toast.success("Chapter unpublished");
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`
        );
        toast.success("Chapter published");
      }
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isDeleting}
        variant={"outline"}
        size={"sm"}
        className="font-semibold"
      >
        {/* {isPublishing && <PulseLoader color="#000000" className="" />} */}
        {isPublishing && <Loader2 className="h-4 w-4 animate-spin" />}
        {!isPublishing && (isPublished ? "Unpublish" : "Publish")}
      </Button>
      <ConfirmModal
        onConfirm={onDelete}
        desc="This action cannot be undone. This will permanently delete this
            chapter and remove it's data from our servers."
      >
        <Button size={"sm"}>
          {!isDeleting && <Trash2 className="h-4 w-4" />}
          {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
        </Button>
      </ConfirmModal>
    </div>
  );
};
