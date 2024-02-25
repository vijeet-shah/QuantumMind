"use client";

import * as z from "zod";
import axios from "axios";
import { PlusCircle, ImageIcon, File, Loader2, X, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { cn } from "@/lib/utils";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId,
}: AttachmentFormProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-semibold flex items-center justify-between">
        Course attachments
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
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div>
          {!initialData.attachments.length && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          )}
          {/* <AttachmentList
            attachments={initialData.attachments || []}
            onDelete={onDelete}
            deletingId={deletingId}
          /> */}
          <div className="space-y-2 mt-2">
            {initialData.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="w-full bg-blue-100 rounded-md p-2 text-blue-700 flex justify-between items-center"
              >
                <p className="text-sm">{attachment.name}</p>
                {deletingId === attachment.id ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Trash2
                    className="w-4 h-4 cursor-pointer text-red-600 hover:opacity-75 transition mr-2"
                    onClick={() => onDelete(attachment.id)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything that is relavant to your course and might be helpful to
            the students
          </div>
        </div>
      )}
    </div>
  );
};
