"use client";

import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NAVBAR_LINKS } from "@/constants/navbar";

export function NavMenus() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const handleDropdownToggle = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <nav className="flex items-center space-x-4">
      {NAVBAR_LINKS.map(({ title, href, options }, index) => (
        <div key={index} className="relative">
          {options ? (
            <>
              <Button
                variant="ghost"
                onClick={() => handleDropdownToggle(index)}
                className="text-base font-medium hover:text-primary transition-colors"
              >
                {title}
                <svg
                  className={cn(
                    "ml-1 h-4 w-4 transition-transform",
                    openDropdown === index && "rotate-180"
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>
              {openDropdown === index && (
                <div className="absolute top-full left-0 mt-2 w-[400px] md:w-[500px] lg:w-[600px] bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <div className="grid gap-3 p-4 md:grid-cols-2">
                    {options.map((option) => (
                      <Link
                        key={option.title}
                        href={option.href || "#"}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => setOpenDropdown(null)}
                      >
                        <div className="text-sm font-medium leading-none">
                          {option.title}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                          {option.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link
              href={href || "#"}
              className="text-[18px] font-medium text-black transition-colors bg-white px-4 "
            >
              {title}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
