import { SidebarRoutes } from "./sidebar-routes";
import { Logo } from "@/components/logo";

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm z-20">
      <div className="p-6 flex justify-center">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};
