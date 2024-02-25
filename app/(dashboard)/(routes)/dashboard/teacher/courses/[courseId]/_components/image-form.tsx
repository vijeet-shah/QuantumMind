"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { cn } from "@/lib/utils";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course updated");
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
        Course image
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
            {!isEditing && !initialData.imageUrl && (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add an image
              </>
            )}
            {!isEditing && initialData.imageUrl && (
              <div className="flex items-center ">
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  <div className="font-semibold">Edit image</div>
                </>
              </div>
            )}
          </Button>
          {!isEditing && initialData.imageUrl && (
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
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
              priority
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            The recommended aspect ratio is 16:9
          </div>
        </div>
      )}
    </div>
  );
};
