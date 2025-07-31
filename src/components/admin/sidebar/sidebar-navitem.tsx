import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface SidebarNavItemProps {
  href: string;
  icon: LucideIcon;
  title: string;
  isActive: boolean;
  isCollapsed?: boolean;
}

export function SidebarNavItem({ 
  href, 
  icon: Icon, 
  title, 
  isActive, 
  isCollapsed = false 
}: SidebarNavItemProps) {
  const content = (
    <SidebarMenuButton 
      asChild 
      isActive={isActive}
      tooltip={isCollapsed ? title : undefined}
      className={cn(
        "transition-all duration-200 hover:bg-accent/50",
        isCollapsed 
          ? "h-10 w-10 p-0 justify-center" 
          : "h-9 px-3 font-medium justify-start ",
        isActive && " text-accent-foreground font-semibold shadow-sm"
      )}
    >
      <Link href={href} className={cn(
        "flex items-center transition-all duration-200",
        isCollapsed ? "justify-center" : "gap-3"
      )}>
        <Icon className={cn(
          "transition-all duration-200",
          isCollapsed ? "w-5 h-5" : "w-4 h-4",
          isActive ? "text-muted-foreground" : "text-muted-foreground"
        )} />
        {!isCollapsed && (
          <span className=" text-sm transition-all duration-200">{title}</span>
        )}
      </Link>
    </SidebarMenuButton>
  );

  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium bg-gray-700 text-white ">
            {title}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}