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

// Mock data for distributor products
const products = [
  {
    id: 1,
    name: "Yachu Hair Oil - 100ml",
    sku: "YHO-100",
    quantity: 450,
    reorderLevel: 100,
    status: "optimal",
    lastUpdated: "2023-09-18",
    price: 250,
  },
  {
    id: 2,
    name: "Yachu Hair Oil - 200ml",
    sku: "YHO-200",
    quantity: 320,
    reorderLevel: 80,
    status: "optimal",
    lastUpdated: "2023-09-17",
    price: 450,
  },
  {
    id: 3,
    name: "Yachu Hair Oil - 50ml",
    sku: "YHO-050",
    quantity: 280,
    reorderLevel: 70,
    status: "optimal",
    lastUpdated: "2023-09-16",
    price: 150,
  },
  {
    id: 4,
    name: "Yachu Hair Oil - 500ml",
    sku: "YHO-500",
    quantity: 85,
    reorderLevel: 100,
    status: "low",
    lastUpdated: "2023-09-15",
    price: 950,
  },
  {
    id: 5,
    name: "Yachu Hair Oil - Premium - 100ml",
    sku: "YHO-P100",
    quantity: 65,
    reorderLevel: 80,
    status: "low",
    lastUpdated: "2023-09-14",
    price: 350,
  },
];

const ProductInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Filter products based on search term and status filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? product.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Product Inventory</CardTitle>
              <CardDescription>
                Manage your Yachu Hair Oil product inventory
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Order from Factory
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
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-12 items-center py-3 px-4"
                >
                  <div className="col-span-4 flex items-center">
                    <Package className="mr-2 h-4 w-4 text-purple-600" />
                    <span>{product.name}</span>
                  </div>
                  <div className="col-span-2">{product.sku}</div>
                  <div className="col-span-1 text-center">
                    {product.quantity}
                  </div>
                  <div className="col-span-1 text-center">
                    {product.reorderLevel}
                  </div>
                  <div className="col-span-1 text-center">{product.price}</div>
                  <div className="col-span-2 text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        product.status === "optimal"
                          ? "bg-green-100 text-green-800"
                          : product.status === "low"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status === "low" && (
                        <AlertCircle className="mr-1 h-3 w-3" />
                      )}
                      {product.status === "critical" && (
                        <AlertCircle className="mr-1 h-3 w-3" />
                      )}
                      {product.status.charAt(0).toUpperCase() +
                        product.status.slice(1)}
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

export default ProductInventory;
