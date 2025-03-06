"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  ArrowUpDown,
  Check,
  ChevronDown,
  Package,
  Plus,
  Search,
  ShoppingCart,
} from "lucide-react";

// Mock data for franchise stock
const stockItems = [
  {
    id: 1,
    name: "Yachu Hair Oil - 100ml",
    sku: "YHO-100",
    quantity: 120,
    reorderLevel: 30,
    status: "optimal",
    lastUpdated: "2023-09-18",
    price: 300,
  },
  {
    id: 2,
    name: "Yachu Hair Oil - 200ml",
    sku: "YHO-200",
    quantity: 85,
    reorderLevel: 25,
    status: "optimal",
    lastUpdated: "2023-09-17",
    price: 550,
  },
  {
    id: 3,
    name: "Yachu Hair Oil - 50ml",
    sku: "YHO-050",
    quantity: 95,
    reorderLevel: 20,
    status: "optimal",
    lastUpdated: "2023-09-16",
    price: 180,
  },
  {
    id: 4,
    name: "Yachu Hair Oil - 500ml",
    sku: "YHO-500",
    quantity: 15,
    reorderLevel: 20,
    status: "low",
    lastUpdated: "2023-09-15",
    price: 1200,
  },
  {
    id: 5,
    name: "Yachu Hair Oil - Premium - 100ml",
    sku: "YHO-P100",
    quantity: 25,
    reorderLevel: 15,
    status: "optimal",
    lastUpdated: "2023-09-14",
    price: 450,
  },
];

const StockManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Filter stock items based on search term and status filter
  const filteredItems = stockItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? item.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Stock Management</CardTitle>
              <CardDescription>
                Manage your Yachu Hair Oil product inventory
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Request Stock
              </button>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by product name or SKU..."
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <button
                className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[180px]"
                onClick={() => setStatusFilter(statusFilter ? null : "low")}
              >
                <span>Filter by Status</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>
              {statusFilter && (
                <div className="absolute right-0 top-11 z-10 w-[180px] rounded-md border bg-popover text-popover-foreground shadow-md">
                  <div
                    className="flex cursor-pointer items-center justify-between py-1.5 px-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setStatusFilter(null)}
                  >
                    <span>All</span>
                    {!statusFilter && <Check className="h-4 w-4" />}
                  </div>
                  <div
                    className="flex cursor-pointer items-center justify-between py-1.5 px-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setStatusFilter("optimal")}
                  >
                    <span>Optimal</span>
                    {statusFilter === "optimal" && (
                      <Check className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className="flex cursor-pointer items-center justify-between py-1.5 px-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setStatusFilter("low")}
                  >
                    <span>Low Stock</span>
                    {statusFilter === "low" && <Check className="h-4 w-4" />}
                  </div>
                  <div
                    className="flex cursor-pointer items-center justify-between py-1.5 px-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setStatusFilter("critical")}
                  >
                    <span>Critical</span>
                    {statusFilter === "critical" && (
                      <Check className="h-4 w-4" />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-md border">
            <div className="grid grid-cols-12 bg-muted py-3 px-4 text-sm font-medium">
              <div className="col-span-4 flex items-center">
                <span>Product Name</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
              <div className="col-span-2">SKU</div>
              <div className="col-span-1 text-center">Quantity</div>
              <div className="col-span-1 text-center">Reorder Level</div>
              <div className="col-span-1 text-center">Price (₹)</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>

            <div className="divide-y">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 items-center py-3 px-4"
                >
                  <div className="col-span-4 flex items-center">
                    <Package className="mr-2 h-4 w-4 text-purple-600" />
                    <span>{item.name}</span>
                  </div>
                  <div className="col-span-2">{item.sku}</div>
                  <div className="col-span-1 text-center">{item.quantity}</div>
                  <div className="col-span-1 text-center">
                    {item.reorderLevel}
                  </div>
                  <div className="col-span-1 text-center">{item.price}</div>
                  <div className="col-span-2 text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        item.status === "optimal"
                          ? "bg-green-100 text-green-800"
                          : item.status === "low"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status === "low" && (
                        <AlertCircle className="mr-1 h-3 w-3" />
                      )}
                      {item.status === "critical" && (
                        <AlertCircle className="mr-1 h-3 w-3" />
                      )}
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </span>
                  </div>
                  <div className="col-span-1 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0">
                        <span className="sr-only">Edit</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                          <path d="m15 5 4 4"></path>
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0">
                        <span className="sr-only">Order</span>
                        <ShoppingCart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockManagement;
