"use client";
import { BarChart, Compass, Layout, List } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoute = [
  { icon: List, label: "Dashboard", href: "/" },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const teacherRoute = [
  { icon: Layout, label: "Courses", href: "/teacher/courses" },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherMode = pathname?.includes("/teacher");
  const routes = isTeacherMode ? teacherRoute : guestRoute;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
