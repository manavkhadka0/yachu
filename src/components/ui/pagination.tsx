"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  count?: number;
  pageSize?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
  onPageSizeChange?: (size: number) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 7,
  className,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirst = () => {
    onPageChange(1);
  };

  const handleLast = () => {
    onPageChange(totalPages);
  };

  // Calculate which page numbers to show
  const getVisiblePages = () => {
    const delta = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, currentPage + delta);

    // Adjust if we're near the beginning or end
    if (end - start + 1 < maxVisiblePages) {
      if (start === 1) {
        end = Math.min(totalPages, start + maxVisiblePages - 1);
      } else if (end === totalPages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();
  const showStartEllipsis = visiblePages[0] > 2;
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages - 1;

  const buttonClass = (isActive: boolean, isDisabled: boolean = false) =>
    `inline-flex items-center justify-center w-9 h-9 text-xs sm:text-sm font-medium transition-colors border rounded-lg cursor-pointer ${
      isDisabled
        ? "text-muted-foreground/50 bg-muted/40 border-border cursor-not-allowed"
        : isActive
        ? "text-white bg-forest border-forest shadow-none"
        : "text-foreground bg-card border-border hover:bg-muted shadow-none"
    }`;

  const navButtonClass = (isDisabled: boolean) =>
    `inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors border rounded-lg shadow-none cursor-pointer ${
      isDisabled
        ? "text-muted-foreground/50 bg-muted/40 border-border cursor-not-allowed"
        : "text-foreground bg-card border-border hover:bg-muted"
    }`;

  return (
    <div className={cn("flex flex-col items-center gap-4 mt-6", className)}>
      {/* Pagination controls */}
      <div className="flex items-center gap-1.5">
        {/* First page button */}
        {showFirstLast && currentPage > 1 && (
          <button
            onClick={handleFirst}
            className={navButtonClass(false)}
            title="Go to first page"
          >
            First
          </button>
        )}

        {/* Previous button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={navButtonClass(currentPage === 1)}
          title="Go to previous page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page 1 */}
        {!visiblePages.includes(1) && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className={buttonClass(currentPage === 1)}
            >
              1
            </button>
            {showStartEllipsis && (
              <div className="flex items-center justify-center w-9 h-9">
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </>
        )}

        {/* Visible page numbers */}
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={buttonClass(currentPage === page)}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ))}

        {/* Last page */}
        {!visiblePages.includes(totalPages) && (
          <>
            {showEndEllipsis && (
              <div className="flex items-center justify-center w-9 h-9">
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className={buttonClass(currentPage === totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={navButtonClass(currentPage === totalPages)}
          title="Go to next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last page button */}
        {showFirstLast && currentPage < totalPages && (
          <button
            onClick={handleLast}
            className={navButtonClass(false)}
            title="Go to last page"
          >
            Last
          </button>
        )}
      </div>

      {/* Mobile-friendly quick jump */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground sm:hidden">
        <span>Jump to:</span>
        <select
          value={currentPage}
          onChange={(e) => onPageChange(Number(e.target.value))}
          className="px-2 py-1 text-xs border border-border rounded-lg bg-card text-foreground shadow-none outline-none"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <option key={page} value={page}>
              Page {page}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
