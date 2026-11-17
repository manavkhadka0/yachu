import React from "react";
import { RefreshCw, Search, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchFiltersProps {
  searchQuery: string;
  filterStatus: string;
  onSearchChange: (query: string) => void;
  onFilterChange: (status: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "Pending", label: "Pending" },
  { value: "Processing", label: "Processing" },
  { value: "Shipped", label: "Shipped" },
  { value: "Delivered", label: "Delivered" },
  { value: "Cancelled", label: "Cancelled" },
];

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  filterStatus,
  onSearchChange,
  onFilterChange,
  onRefresh,
  isLoading,
}) => {
  const handleStatusClick = (status: string) => {
    if (status === "all") {
      onFilterChange("all");
    } else if (filterStatus === status) {
      // Click again to unclick / reset to all
      onFilterChange("all");
    } else {
      onFilterChange(status);
    }
  };

  return (
    <div className="mb-6 space-y-3">
      {/* Search Input & Refresh Button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search by customer name or order ID..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground shadow-none outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground shadow-none transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer shrink-0"
        >
          <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Status Buttons below Search */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs font-medium text-muted-foreground mr-1 hidden sm:inline">
          Status:
        </span>
        {STATUS_OPTIONS.map((status) => {
          const isActive =
            status.value === "all"
              ? filterStatus === "all" || !filterStatus
              : filterStatus === status.value;

          return (
            <button
              key={status.value}
              type="button"
              onClick={() => handleStatusClick(status.value)}
              className={cn(
                "inline-flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-xs font-semibold transition-all cursor-pointer select-none",
                isActive
                  ? "bg-forest text-white border border-forest shadow-none"
                  : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border shadow-none"
              )}
            >
              {status.label}
              {isActive && status.value !== "all" && (
                <Check className="h-3.5 w-3.5 ml-0.5 opacity-80" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SearchFilters;
