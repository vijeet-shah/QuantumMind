"use client";

import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import { FcLandscape } from "react-icons/fc";
import { FcBusiness } from "react-icons/fc";

interface CategoriesProps {
  items: Category[];
}

import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";

const iconMap: Record<Category["name"], IconType> = {
  "Music": FcMusic,
  "Photography": FcOldTimeCamera,
  "Fitness": FcSportsMode,
  "Accounting": FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
  "Videography": FcFilmReel,
  "Engineering": FcEngineering,
  "Art & Illustration": FcLandscape,
  "Business": FcBusiness,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2 r">
        {items.map((item) => (
            <CategoryItem 
                key={item.id}
                label={item.name}
                icon={iconMap[item.name]}
                value={item.id}
            />
        ))}
    </div>
  )
};
