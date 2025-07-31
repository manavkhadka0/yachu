"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useOrders, useUpdateOrderStatus } from "@/hooks/use-orders";
import { OrderStatus, TOrderFilters,TOrdersResponse } from "@/types/order";
import {
  SearchFilters,
  OrdersTable,
  ErrorAlert,
  EmptyState,
  LoadingSpinner,
} from "./components";
import Pagination from "@/components/ui/pagination";

type SortDirection = "asc" | "desc";

interface SortState {
  column: string;
  direction: SortDirection;
}



export default function AdminOrdersPage() {
  // UI State Management
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sort, setSort] = useState<SortState>({
    column: "created_at",
    direction: "desc",
  });
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Build filters object
  const filters: TOrderFilters = useMemo(
    () => ({
      page: pagination.page,
      page_size: pagination.pageSize,
      search: debouncedSearchQuery?.trim() || "",
      status: filterStatus === "all" ? "" : filterStatus,
      ordering: `${sort.direction === "desc" ? "-" : ""}${sort.column}`,
    }),
    [pagination, debouncedSearchQuery, filterStatus, sort]
  );

  // API Hooks
  const {
    data: ordersData,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useOrders(filters, {
  placeholderData: (previousData: TOrdersResponse | undefined) => previousData,
  });

  const {
    mutate: updateOrderStatus,
    isPending: isUpdating,
    variables: updatingVariables,
  } = useUpdateOrderStatus();

  // Event Handlers
  const handleUpdateStatus = useCallback(
    (orderId: number, status: OrderStatus) => {
      updateOrderStatus({ id: orderId, status });
    },
    [updateOrderStatus]
  );

  const handleSort = useCallback((column: string) => {
    setSort((prevSort) => ({
      column,
      direction: (prevSort.column === column && prevSort.direction === "desc"
        ? "asc"
        : "desc") as SortDirection,
    }));
    setPagination((p) => ({ ...p, page: 1 }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const handlePageSizeChange = useCallback((newSize: number) => {
    setPagination({ page: 1, pageSize: newSize });
  }, []);

  const handleToggleExpand = useCallback((orderId: number) => {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId));
  }, []);

  const handleFilterChange = useCallback((status: string) => {
    setFilterStatus(status);
    setPagination((p) => ({ ...p, page: 1 }));
  }, []);

  // Computed values
  const totalPages = useMemo(() => {
    return ordersData?.count
      ? Math.ceil(ordersData.count / pagination.pageSize)
      : 1;
  }, [ordersData?.count, pagination.pageSize]);

  const orders = ordersData?.results || [];
  const isDataLoading = isLoading || isFetching;

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage and track all franchise orders
        </p>
      </div>

      <SearchFilters
        searchQuery={searchQuery}
        filterStatus={filterStatus}
        onSearchChange={setSearchQuery}
        onFilterChange={handleFilterChange}
        onRefresh={() => refetch()}
        isLoading={isDataLoading}
      />

      {error && <ErrorAlert error={error} />}

      {isLoading ? (
        <LoadingSpinner />
      ) : orders.length === 0 ? (
        <EmptyState searchQuery={searchQuery} filterStatus={filterStatus} />
      ) : (
        <>
          <OrdersTable
            orders={orders}
            sortColumn={sort.column}
            sortDirection={sort.direction}
            onSort={handleSort}
            expandedOrder={expandedOrder}
            onToggleExpand={handleToggleExpand}
            onUpdateStatus={handleUpdateStatus}
            isUpdating={isUpdating}
            updatingOrderId={updatingVariables?.id}
          />

          <Pagination
            count={ordersData?.count || 0}
            currentPage={pagination.page}
            pageSize={pagination.pageSize}
            totalPages={totalPages}
            hasNext={!!ordersData?.next}
            hasPrevious={!!ordersData?.previous}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      )}
    </div>
  );
}
