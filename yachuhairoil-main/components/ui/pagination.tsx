import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

interface PaginationProps {
  className?: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  count?: number;
  pageSize?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
  [key: string]: any;
}

function Pagination({
  className,
  currentPage,
  totalPages,
  onPageChange,
  onPageSizeChange,
  count,
  pageSize,
  hasNext,
  hasPrevious,
  ...props
}: PaginationProps) {
  if (currentPage !== undefined || totalPages !== undefined) {
    const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (currentPage && currentPage > 1 && onPageChange)
        onPageChange(currentPage - 1);
    };

    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (currentPage && totalPages && currentPage < totalPages && onPageChange)
        onPageChange(currentPage + 1);
    };

    const handlePageClick = (
      e: React.MouseEvent<HTMLAnchorElement>,
      page: number,
    ) => {
      e.preventDefault();
      if (onPageChange) onPageChange(page);
    };

    const getPageNumbers = () => {
      const pages: number[] = [];
      const start = Math.max(1, (currentPage || 1) - 2);
      const end = Math.min(totalPages || 1, (currentPage || 1) + 2);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    };

    return (
      <nav
        role="navigation"
        aria-label="pagination"
        className={cn(
          "mx-auto flex w-full flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-4 mt-6",
          className,
        )}
        {...props}
      >
        {count !== undefined && pageSize !== undefined && (
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium">
              {Math.min(count, (currentPage - 1) * pageSize + 1)}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(count, currentPage * pageSize)}
            </span>{" "}
            of <span className="font-medium">{count}</span> results
          </div>
        )}

        <PaginationContent
          className={cn(
            "flex items-center gap-1",
            count !== undefined && "sm:ml-auto",
          )}
        >
          <PaginationItem>
            <Button
              variant="ghost"
              size="default"
              onClick={handlePrev}
              disabled={currentPage <= 1 || hasPrevious === false}
              className="gap-1 pl-2.5 disabled:opacity-50 disabled:pointer-events-none"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              <span>Previous</span>
            </Button>
          </PaginationItem>

          {getPageNumbers().map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={(e) => handlePageClick(e, page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <Button
              variant="ghost"
              size="default"
              onClick={handleNext}
              disabled={currentPage >= totalPages || hasNext === false}
              className="gap-1 pr-2.5 disabled:opacity-50 disabled:pointer-events-none"
            >
              <span>Next</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>

        {onPageSizeChange && pageSize !== undefined && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 sm:mt-0">
            <span>Show</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>entries per page</span>
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }) {
  return <li data-slot="pagination-item" {...props} />;
}

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: {
  className?: string;
  isActive?: boolean;
  size?: any;
  [x: string]: any;
}) {
  return (
    <Button
      asChild
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(className)}
    >
      <a
        aria-current={isActive ? "page" : undefined}
        data-slot="pagination-link"
        data-active={isActive}
        {...props}
      />
    </Button>
  );
}

function PaginationPrevious({ className, text = "Previous", ...props }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("pl-1.5!", className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  );
}

function PaginationNext({ className, text = "Next", ...props }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("pr-1.5!", className)}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
