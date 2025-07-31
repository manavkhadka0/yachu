"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarBrand } from "./sidebar-brand";
import { SidebarNavItem } from "./sidebar-navitem";
import { SidebarUserMenu } from "./sidebar-user-menu";
import { navItems } from "./navigation-config";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();
  const { isMobile, open } = useSidebar();

  // Determine if we're in collapsed/icon-only mode
  const isCollapsed = !open && !isMobile;

  return (
    <Sidebar
      variant="inset"
      className={cn(
        "border-r border-border/40 transition-all duration-300",
        isCollapsed && "w-16"
      )}
      collapsible="icon"
    >
      <SidebarHeader
        className={cn(
          "border-b border-border/40 transition-all duration-300",
          isCollapsed ? "px-2" : "px-4"
        )}
      >
        <div className="flex items-center justify-between">
          {!isCollapsed && <SidebarBrand />}
          {isCollapsed && (
            <div className="flex items-center justify-center w-full py-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg shadow-sm">
                <span className="text-white font-bold text-sm">N</span>
              </div>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent
        className={cn(
          "transition-all duration-300",
          isCollapsed ? "px-1" : "px-2"
        )}
      >
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="px-2 text-xs font-medium text-muted-foreground/70">
              Navigation
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className={cn("gap-2", isCollapsed && "items-center")}>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarNavItem
                    href={item.url}
                    icon={item.icon}
                    title={item.title}
                    isActive={item.isActive(pathname)}
                    isCollapsed={isCollapsed}
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter
        className={cn(
          "border-t border-border/40 transition-all duration-300",
          isCollapsed ? "p-1" : "p-2"
        )}
      >
        <SidebarUserMenu isCollapsed={isCollapsed} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
