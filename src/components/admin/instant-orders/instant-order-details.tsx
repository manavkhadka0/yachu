"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetInstantOrders } from "@/hooks/use-instant-order";
import { InstantOrderFilters } from "@/types/instant-order";
import {
  InstantOrdersTable,
  SearchFilters,
  ErrorAlert,
  EmptyState,
  LoadingSpinner,
} from "./components";
import Pagination from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

type SortDirection = "asc" | "desc";

interface SortState {
  column: string;
  direction: SortDirection;
}

const InstantOrderDetails = () => {
  // UI State Management
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sort, setSort] = useState<SortState>({
    column: "created_at",
    direction: "desc",
  });

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Convert date to YYYY-MM-DD format for API
  // Backend expects simple date format: YYYY-MM-DD
  const formatDateForAPI = (dateString: string): string => {
    if (!dateString) return "";
    
    // Validate date string format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      console.warn("Invalid date format:", dateString);
      return "";
    }
    
    try {
      // Parse the date string
      const [year, month, day] = dateString.split("-").map(Number);
      
      // Validate date components
      if (year < 1900 || year > 2100) {
        console.warn("Year out of range:", year);
        return "";
      }
      if (month < 1 || month > 12) {
        console.warn("Month out of range:", month);
        return "";
      }
      if (day < 1 || day > 31) {
        console.warn("Day out of range:", day);
        return "";
      }
      
      // Create a date object to validate it's a real date (handles invalid dates like Feb 30)
      const date = new Date(year, month - 1, day);
      
      if (
        isNaN(date.getTime()) ||
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
      ) {
        console.warn("Invalid date:", dateString);
        return "";
      }
      
      // Return the date string as-is in YYYY-MM-DD format
      return dateString;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  // Build ordering string for API (e.g., "-created_at", "name")
  const orderingString = useMemo(() => {
    const prefix = sort.direction === "desc" ? "-" : "";
    return `${prefix}${sort.column}`;
  }, [sort]);

  // Build filters object for API
  const filters: InstantOrderFilters = useMemo(
    () => ({
      page: pagination.page,
      page_size: pagination.pageSize,
      search: debouncedSearchQuery.trim() || undefined,
      ordering: orderingString,
      date_gte: dateFrom ? formatDateForAPI(dateFrom) : undefined,
      date_lte: dateTo ? formatDateForAPI(dateTo) : undefined,
    }),
    [pagination, debouncedSearchQuery, orderingString, dateFrom, dateTo]
  );

  // API Hooks
  const {
    data: instantOrdersData,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetInstantOrders(filters);

  // Get orders from paginated response
  const orders = useMemo(() => {
    if (!instantOrdersData) return [];
    return instantOrdersData.results || [];
  }, [instantOrdersData]);

  const count = instantOrdersData?.count || 0;

  // Event Handlers
  const handleSort = useCallback((column: string) => {
    setSort((prevSort) => ({
      column,
      direction:
        prevSort.column === column && prevSort.direction === "desc"
          ? "asc"
          : "desc",
    }));
    setPagination((p) => ({ ...p, page: 1 }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const handlePageSizeChange = useCallback((newSize: number) => {
    setPagination({ page: 1, pageSize: newSize });
  }, []);

  const handleDateFromChange = useCallback((date: string) => {
    setDateFrom(date);
    setPagination((p) => ({ ...p, page: 1 }));
  }, []);

  const handleDateToChange = useCallback((date: string) => {
    setDateTo(date);
    setPagination((p) => ({ ...p, page: 1 }));
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setPagination((p) => ({ ...p, page: 1 }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setDateFrom("");
    setDateTo("");
    setPagination({ page: 1, pageSize: pagination.pageSize });
  }, [pagination.pageSize]);

  // Computed values
  const totalPages = useMemo(() => {
    return count ? Math.ceil(count / pagination.pageSize) : 1;
  }, [count, pagination.pageSize]);

  const isDataLoading = isLoading || isFetching;

  return (
    <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Instant Orders
          </h1>
          <p className="mt-1.5 text-sm sm:text-base text-gray-600">
            Manage and view all instant orders
          </p>
        </div>
        <Badge
          variant="secondary"
          className="text-sm sm:text-base px-3 py-1.5 w-fit bg-primary/10 text-primary border-primary/20"
        >
          {count} {count === 1 ? "order" : "orders"}
        </Badge>
      </div>

      <SearchFilters
        searchQuery={searchQuery}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onSearchChange={handleSearchChange}
        onDateFromChange={handleDateFromChange}
        onDateToChange={handleDateToChange}
        onRefresh={() => refetch()}
        onClearFilters={handleClearFilters}
        isLoading={isDataLoading}
      />

      {error && <ErrorAlert error={error} />}

      {isLoading ? (
        <LoadingSpinner />
      ) : orders.length === 0 ? (
        <EmptyState searchQuery={searchQuery} />
      ) : (
        <>
          <InstantOrdersTable
            orders={orders}
            sortColumn={sort.column}
            sortDirection={sort.direction}
            onSort={handleSort}
          />

          {totalPages > 1 && (
            <Pagination
              count={count}
              currentPage={pagination.page}
              pageSize={pagination.pageSize}
              totalPages={totalPages}
              hasNext={!!instantOrdersData?.next}
              hasPrevious={!!instantOrdersData?.previous}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default InstantOrderDetails;

