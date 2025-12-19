import React from "react";
import { Phone, MapPin, User, Calendar, Package } from "lucide-react";
import { InstantOrder } from "@/types/instant-order";
import { format } from "date-fns";
import SortIcon from "@/app/admin/orders/components/sort-icon";

interface InstantOrdersTableProps {
  orders: InstantOrder[];
  sortColumn: string;
  sortDirection: "asc" | "desc";
  onSort: (column: string) => void;
}

const InstantOrdersTable: React.FC<InstantOrdersTableProps> = ({
  orders,
  sortColumn,
  sortDirection,
  onSort,
}) => {
  return (
    <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
      {/* Mobile view - card layout */}
      <div className="p-2 space-y-3 sm:hidden">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-4 border rounded-lg border-gray-200 bg-white"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {order.name}
                  </p>
                  <p className="text-xs text-gray-500">ID: #{order.id}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                <span className="text-xs text-gray-600">{order.phone_number}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                <span className="text-xs text-gray-600 break-words">{order.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                <span className="text-xs text-gray-600">Quantity: {order.quantity}</span>
              </div>
              {order.created_at && (
                <div className="flex items-center gap-2 pt-2 border-t">
                  <Calendar className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs text-gray-500">
                    {format(new Date(order.created_at), "MMM dd, yyyy 'at' h:mm a")}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view - table layout */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                { key: "id", label: "ID" },
                { key: "name", label: "Name" },
                { key: "phone_number", label: "Phone Number" },
                { key: "address", label: "Address" },
                { key: "quantity", label: "Quantity" },
                { key: "created_at", label: "Created At" },
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                  #{order.id}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="font-medium">{order.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    {order.phone_number}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  <div className="flex items-start gap-2 max-w-xs">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="break-words">{order.address}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="font-medium">{order.quantity}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {order.created_at ? (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      {format(new Date(order.created_at), "MMM dd, yyyy")}
                    </div>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstantOrdersTable;



