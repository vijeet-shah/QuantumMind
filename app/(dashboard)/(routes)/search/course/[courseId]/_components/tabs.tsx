"use client";

import { useState } from "react";
import { Separator } from "../../../../../../../components/ui/separator";
import { Chapter, Course } from "@prisma/client";
import TabChapterItems from "./tab-chapter-items";

interface TabsProps {
  course: Course & {
    chapters: Chapter[];
  };
}

const tabsData = [
  {
    id: "description",
    label: "Course Description",
  },
  {
    id: "courseContents",
    label: "Course Contents",
  },
  { id: "teacher", label: "Teacher" },
];

const Tabs = ({ course }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(tabsData[0].id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="w-full p-0">
      <div className="max-w-2xl flex flex-col">
        <div className="flex justify-around">
          {tabsData.map((tab) => (
            <div
              key={tab.id}
              className={`cursor-pointer px-4 pt-2 pb-2 text-md  ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-700 text-black font-semibold"
                  : "text-muted-foreground"
              }`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </div>
          ))}
        </div>
      </div>
      <Separator />

      <div className="p-4">
        {tabsData.map((tab) => (
          <div key={tab.id}>
            {activeTab === tab.id && (
              <div>
                <div className=" font-semibold mb-4 px-2 flex gap-x-2 items-center">
                  <h1 className="text-xl">{tab.label}</h1>
                  {tab.id === "courseContents" && (
                    <p className="text-muted-foreground font-normal text-sm">
                      ({course.chapters.length} chapters)
                    </p>
                  )}
                </div>
                {tab.id === "description" && (
                  <p className="px-2">{course.description}</p>
                )}
                {tab.id === "courseContents" && (
                  <TabChapterItems course={course} />
                )}
                {tab.id === "teacher" && (
                  <div className="px-2">
                    {/**                 TEMPORARY: This course was made by {course.userId}
                     */}
                    This Course is Made by Vijeet Shah.
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
