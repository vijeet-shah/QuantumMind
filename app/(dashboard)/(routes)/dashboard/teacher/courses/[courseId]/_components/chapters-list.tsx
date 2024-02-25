"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

interface ChaptersListProps {
  items: Chapter[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  deletingId: string | null;
}

const ChaptersList = ({
  items,
  onEdit,
  deletingId,
  onDelete,
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-y-2 justify-center">
      {items.map((chapter) => (
        <div
          key={chapter.id}
          className={cn(
            "w-full p-2 rounded-md bg-slate-200 flex justify-between",
            chapter.isPublished && "bg-blue-100 text-blue-700"
          )}
        >
          <p className="font-semibold flex items-center">{chapter.title}</p>
          <div className="ml-auto pr-2 flex items-center gap-x-2">
            {chapter.isFree && <Badge>Free</Badge>}
            <Badge
              className={cn(
                "bg-slate-500",
                chapter.isPublished && "bg-blue-700 hover:bg-blue-600"
              )}
            >
              {chapter.isPublished ? "Published" : "Draft"}
            </Badge>
            <Pencil
              onClick={() => onEdit(chapter.id)}
              className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
            />
            {deletingId !== chapter.id ? (
              <AlertDialog>
                <AlertDialogTrigger>
                  <Trash2 className="w-4 h-4 ml-2 text-red-600 cursor-pointer hover:opacity-75" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this chapter and remove it&apos;s data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(chapter.id)}
                      className="bg-blue-700 hover:bg-blue-700 hover:opacity-90 transition"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Loader2 className="w-4 h-4 ml-2 animate-spin" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChaptersList;
