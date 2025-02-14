"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NAVBAR_LINKS } from "@/constants/navbar";

export function NavMenus() {
  return (
    <NavigationMenu className="max-w-full">
      <NavigationMenuList className="flex flex-col lg:flex-row lg:gap-4">
        {NAVBAR_LINKS.map(({ title, href, options }, index) => (
          <NavigationMenuItem key={index} className="relative">
            {options ? (
              <>
                <NavigationMenuTrigger className="text-lg lg:text-base">
                  {title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute left-0 mt-2 z-10 bg-white border border-gray-200 rounded-lg shadow-md">
                  <ul className="grid gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {options.map((option) => (
                      <ListItem
                        key={option.title}
                        title={option.title}
                        href={option.href}
                      >
                        {option.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {title}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";