import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

interface CourseProgressProps {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
}

const colorVariant = {
  default: "text-blue-700",
  success: "text-emerald-700",
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

export const CourseProgress = ({
  value,
  size,
  variant,
}: CourseProgressProps) => {
  return (
    <div className="w-full">
      <Progress className="h-2" value={value} variant={variant} />
      <p
        className={cn(
          "font-semibold mt-2 text-blue-700",
          colorVariant[variant || "default"],
          sizeByVariant[size || "default"]
        )}
      >
        {Math.round(value)}% Completed
      </p>
    </div>
  );
};
