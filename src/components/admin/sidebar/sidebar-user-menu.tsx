"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LogOut, User, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {yachuCompanyName} from "@/constants/constant";
interface SidebarUserMenuProps {
  isCollapsed?: boolean;
}

export function SidebarUserMenu({ isCollapsed = false }: SidebarUserMenuProps) {
  const router = useRouter();

  const handleLogout = () => {
    try {
      // Clear authentication data
      localStorage.removeItem("adminAuthenticated");
      localStorage.removeItem("adminAuthTime");
      localStorage.removeItem("adminUser");
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
      window.location.href = "/admin/login";
    }
  };

  const menuButton = (
    <SidebarMenuButton
      size={isCollapsed ? "default" : "lg"}
      className={cn(
        "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground hover:bg-accent/50 transition-colors",
        isCollapsed ? "h-10 w-10 p-0 justify-center" : "h-12 justify-start"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center  rounded-full",
          isCollapsed ? "w-6 h-6" : "w-8 h-8"
        )}
      >
        <User
          className={cn("text-primary", isCollapsed ? "w-3 h-3" : "w-4 h-4")}
        />
      </div>
      {!isCollapsed && (
        <>
          <div className="flex flex-col text-left flex-1">
            <span className="text-sm font-medium">{yachuCompanyName}</span>
            <span className="text-xs text-muted-foreground">
              {yachuCompanyName}@gmail.com
            </span>
          </div>
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        </>
      )}
    </SidebarMenuButton>
  );

  const dropdownContent = (
    <DropdownMenuContent
      className="w-56 rounded-lg shadow-lg"
      side={isCollapsed ? "right" : "bottom"}
      align={isCollapsed ? "start" : "end"}
      sideOffset={4}
    >
      {isCollapsed && (
        <div className="px-2 py-1.5 text-sm font-medium border-b border-border/40">
          <div className="font-medium">{yachuCompanyName}</div>
          <div className="text-xs text-muted-foreground">admin@gmail.com</div>
        </div>
      )}
      <DropdownMenuItem
        onClick={handleLogout}
        className="text-red-600 hover:text-red-700 hover:bg-red-50 focus:text-red-700 focus:bg-red-50 cursor-pointer"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );

  const menu = (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>{menuButton}</DropdownMenuTrigger>
          {dropdownContent}
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );

  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full">{menu}</div>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="font-medium bg-gray-700 text-white"
          >
            {yachuCompanyName}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return menu;
}
