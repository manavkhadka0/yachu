import React from "react";
import { RefreshCw, Search, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchFiltersProps {
  searchQuery: string;
  dateFrom: string;
  dateTo: string;
  onSearchChange: (query: string) => void;
  onDateFromChange: (date: string) => void;
  onDateToChange: (date: string) => void;
  onRefresh: () => void;
  onClearFilters: () => void;
  isLoading: boolean;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  dateFrom,
  dateTo,
  onSearchChange,
  onDateFromChange,
  onDateToChange,
  onRefresh,
  onClearFilters,
  isLoading,
}) => {
  const hasActiveFilters = searchQuery || dateFrom || dateTo;

  return (
    <div className="mb-6 p-4 sm:p-5 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, phone number, or address..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full py-2.5 sm:py-3 pl-10 sm:pl-11 pr-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-gray-50 focus:bg-white"
          />
        </div>

        {/* Date Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              From Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => onDateFromChange(e.target.value)}
                className="block w-full py-2.5 sm:py-3 pl-10 pr-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-gray-50 focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              To Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => onDateToChange(e.target.value)}
                className="block w-full py-2.5 sm:py-3 pl-10 pr-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-gray-50 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
          <Button
            onClick={onRefresh}
            disabled={isLoading}
            variant="outline"
            size="default"
            className="flex-1 sm:flex-initial"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>

          {hasActiveFilters && (
            <Button
              onClick={onClearFilters}
              variant="outline"
              size="default"
              className="flex-1 sm:flex-initial border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;

