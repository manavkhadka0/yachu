import { LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import {yachuCompanyName} from "@/constants/constant";
interface SidebarBrandProps {
  isCollapsed?: boolean;
}

export function SidebarBrand({ isCollapsed = false }: SidebarBrandProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 py-3 transition-all duration-300",
        isCollapsed ? "justify-center px-2" : "px-4 pr-12 md:pr-4"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center bg-primary rounded-lg shadow-sm transition-all duration-300",
          isCollapsed ? "w-6 h-6" : "w-8 h-8 md:w-9 md:h-9"
        )}
      >
        {isCollapsed ? (
          <span className="text-white font-bold text-xs">B</span>
        ) : (
          <LayoutDashboard className="w-4 h-4 md:w-5 md:h-5 text-white" />
        )}
      </div>
      {!isCollapsed && (
        <div className="flex flex-col transition-all duration-300">
          <span className="text-sm font-semibold text-foreground">{yachuCompanyName}</span>
          <span className="text-xs text-muted-foreground hidden sm:block">
            Management Portal
          </span>
        </div>
      )}
    </div>
  );
}
