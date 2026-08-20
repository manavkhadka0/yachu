import React from "react";
import { RefreshCw } from "lucide-react";
import { TOrder, OrderStatus } from "@/types/order";
import SortIcon from "./sort-icon";
import OrderDetails from "./order-details";
import {
  formatCurrency,
  formatDate,
  getStatusIcon,
  getStatusColor,
} from "./utils";

interface OrdersTableProps {
  orders: TOrder[];
  sortColumn: string;
  sortDirection: "asc" | "desc";
  onSort: (column: string) => void;
  expandedOrder: number | null;
  onToggleExpand: (orderId: number) => void;
  onUpdateStatus: (orderId: number, status: OrderStatus) => void;
  isUpdating: boolean;
  updatingOrderId?: number;
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  sortColumn,
  sortDirection,
  onSort,
  expandedOrder,
  onToggleExpand,
  onUpdateStatus,
  isUpdating,
  updatingOrderId,
}) => (
  <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
    {/* Mobile view - card layout */}
    <div className="p-2 space-y-3 sm:hidden">
      {orders.map((order) => {
        const isCurrentlyUpdating = isUpdating && updatingOrderId === order.id;
        const isNps = order.payment_type === "NPS" || order.payment_type === "Nepal Payment Solution";
        return (
          <div
            key={order.id}
            className={`p-3 border rounded-lg transition-colors ${
              expandedOrder === order.id
                ? "bg-blue-50 border-blue-200"
                : "border-gray-200 bg-white"
            }`}
          >
            <div
              onClick={() => onToggleExpand(order.id)}
              className="cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    #{order.id}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {order.full_name || "N/A"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {formatCurrency(order.total_amount)}
                  </p>
                  <div className="flex items-center justify-end gap-1.5 mt-1">
                    <span
                      className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full items-center ${getStatusColor(
                        order.order_status
                      )}`}
                    >
                      {getStatusIcon(order.order_status)}
                      <span className="ml-1 capitalize">
                        {order.order_status}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Type & Paid Badge */}
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span
                  className={`px-2 py-0.5 text-xs font-semibold rounded-md border ${
                    isNps
                      ? "bg-purple-50 text-purple-700 border-purple-200"
                      : "bg-gray-100 text-gray-700 border-gray-200"
                  }`}
                >
                  {order.payment_type || "COD"}
                </span>

                {isNps && (
                  <span
                    className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                      order.is_paid
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {order.is_paid ? "Paid" : "Unpaid"}
                  </span>
                )}
              </div>

              {isNps && order.transaction_id && (
                <p className="mt-1 text-xs font-mono text-gray-500 break-all">
                  Txn ID: {order.transaction_id}
                </p>
              )}

              <p className="mt-2 text-xs text-gray-500">
                {formatDate(order.created_at)}
              </p>
            </div>

            <div className="flex items-center justify-between mt-2">
              <select
                value={order.order_status}
                onChange={(e) =>
                  onUpdateStatus(order.id, e.target.value as OrderStatus)
                }
                disabled={isCurrentlyUpdating}
                className="block px-2 py-1 text-xs border border-gray-300 rounded-md shadow-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={(e) => e.stopPropagation()}
              >
                {[
                  "Pending",
                  "Processing",
                  "Shipped",
                  "Delivered",
                  "Cancelled",
                ].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {isCurrentlyUpdating && (
                <RefreshCw className="w-4 h-4 text-gray-500 animate-spin" />
              )}
            </div>

            {expandedOrder === order.id && (
              <div className="mt-3 -mx-3 -mb-3 overflow-hidden">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <OrderDetails order={order} />
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>

    {/* Desktop view - table layout */}
    <div className="hidden overflow-x-auto sm:block">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              { key: "id", label: "Order ID" },
              { key: "full_name", label: "Customer" },
              { key: "created_at", label: "Created At" },
              { key: "total_amount", label: "Total Amount" },
            ].map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => onSort(column.key)}
              >
                <div className="flex items-center">
                  {column.label}
                  <SortIcon
                    column={column.key}
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                  />
                </div>
              </th>
            ))}
            <th
              scope="col"
              className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Payment
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => {
            const isCurrentlyUpdating =
              isUpdating && updatingOrderId === order.id;
            const isNps = order.payment_type === "NPS" || order.payment_type === "Nepal Payment Solution";
            return (
              <React.Fragment key={order.id}>
                <tr
                  className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                    expandedOrder === order.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => onToggleExpand(order.id)}
                >
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    #{order.id}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                    <div>
                      <div className="font-medium">{order.full_name}</div>
                      {order.email && (
                        <div className="text-xs text-gray-500">
                          {order.email}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {formatCurrency(order.total_amount)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`px-2 py-0.5 text-xs font-semibold rounded-md border ${
                            isNps
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : "bg-gray-100 text-gray-700 border-gray-200"
                          }`}
                        >
                          {order.payment_type || "COD"}
                        </span>
                        {isNps && (
                          <span
                            className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                              order.is_paid
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {order.is_paid ? "Paid" : "Unpaid"}
                          </span>
                        )}
                      </div>
                      {isNps && order.transaction_id && (
                        <span className="font-mono text-xs text-gray-500">
                          {order.transaction_id}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full items-center ${getStatusColor(
                        order.order_status
                      )}`}
                    >
                      {getStatusIcon(order.order_status)}
                      <span className="ml-1 capitalize">
                        {order.order_status}
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                    <div className="relative flex items-center">
                      <select
                        value={order.order_status}
                        onChange={(e) =>
                          onUpdateStatus(
                            order.id,
                            e.target.value as OrderStatus
                          )
                        }
                        disabled={isCurrentlyUpdating}
                        className="block w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {[
                          "Pending",
                          "Processing",
                          "Shipped",
                          "Delivered",
                          "Cancelled",
                        ].map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      {isCurrentlyUpdating && (
                        <div className="absolute right-0 flex items-center pr-8 pointer-events-none">
                          <RefreshCw className="w-4 h-4 text-gray-500 animate-spin" />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
                {expandedOrder === order.id && (
                  <tr>
                    <OrderDetails order={order} />
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default OrdersTable;
