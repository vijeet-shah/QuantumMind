"use client";

import * as z from "zod";
import axios, { AxiosResponse } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Image from "next/image";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const [isCreating, setIsCreating] = useState(false);

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsCreating(true);

      const response = await axios.post("/api/courses", values);
      const promise = Promise.resolve(response);

      await toast.promise(promise, {
        loading: "Creating course...",
        success: "Course Created",
        error: "Failed to create course",
      });

      router.push(`/dashboard/teacher/courses/${response.data.id}`);
    } catch (error) {
      console.log("Something went wrong!", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-full w-full relative overflow-hidden ">
      <Image
        src={"/login-bg1.jpg"}
        height={2000}
        width={2000}
        alt="login-bg"
        className="object-contain absolute left-0 top-0 -z-10 blur-sm scale-110 brightness-50 opacity-90 bg-black"
        priority
      />

      <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full md:h-max p-10 rounded-md bg-white shadow-xl">
        <div>
          <h1 className="text-2xl font-semibold">Name your course</h1>
          <p className="text-sm">
            What would you like to name your course? Don&apos;t worry, you can
            change this later.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-8"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 'Advanced Photoshop'"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What will you teach in this course?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Link href={"/dashboard/teacher/courses"}>
                  <Button type="button" variant="ghost">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  {!isSubmitting && "Continue"}
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
