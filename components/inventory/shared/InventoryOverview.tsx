"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "./Charts";
import {
  BarChart3,
  Box,
  Factory,
  Package,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";
import { TbTruckDelivery } from "react-icons/tb";
import { MdStorefront } from "react-icons/md";

interface InventoryOverviewProps {
  title: string;
  description: string;
  data: any;
  role: "factory" | "distributor" | "franchise";
}

const InventoryOverview = ({
  title,
  description,
  data,
  role,
}: InventoryOverviewProps) => {
  // Role-specific icons and labels
  const getRoleSpecificContent = () => {
    switch (role) {
      case "factory":
        return {
          icon: <Factory className="h-6 w-6 text-primary" />,
          inventoryLabel: "Raw Materials & Products",
          salesLabel: "Production Output",
          ordersLabel: "Distribution Orders",
          fourthMetricIcon: <Truck className="h-4 w-4 text-orange-600" />,
          fourthMetricLabel: "Distributors",
          fourthMetricValue: data.distributors?.total || 0,
          fourthMetricSubtext: `${
            data.distributors?.active || 0
          } active distributors`,
        };
      case "distributor":
        return {
          icon: <TbTruckDelivery className="h-6 w-6 text-primary" />,
          inventoryLabel: "Product Inventory",
          salesLabel: "Sales to Retailers",
          ordersLabel: "Orders",
          fourthMetricIcon: (
            <MdStorefront className="h-4 w-4 text-orange-600" />
          ),
          fourthMetricLabel: "Retailers",
          fourthMetricValue: data.retailers?.total || 0,
          fourthMetricSubtext: `${
            data.retailers?.active || 0
          } active retailers`,
        };
      case "franchise":
        return {
          icon: <MdStorefront className="h-6 w-6 text-primary" />,
          inventoryLabel: "Stock Inventory",
          salesLabel: "Sales",
          ordersLabel: "Orders",
          fourthMetricIcon: <Users className="h-4 w-4 text-orange-600" />,
          fourthMetricLabel: "Customers",
          fourthMetricValue: data.customers?.total || 0,
          fourthMetricSubtext: `${data.customers?.new || 0} new this week`,
        };
      default:
        return {
          icon: <Box className="h-6 w-6 text-primary" />,
          inventoryLabel: "Inventory",
          salesLabel: "Sales",
          ordersLabel: "Orders",
          fourthMetricIcon: <Users className="h-4 w-4 text-orange-600" />,
          fourthMetricLabel: "Users",
          fourthMetricValue: 0,
          fourthMetricSubtext: "",
        };
    }
  };

  const roleContent = getRoleSpecificContent();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        {roleContent.icon}
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {roleContent.inventoryLabel}
            </CardTitle>
            <Package className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.inventory.total} items
            </div>
            <p className="text-xs text-muted-foreground">
              ₹{data.inventory.value.toLocaleString()} total value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {roleContent.salesLabel}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.sales.daily} units</div>
            <p className="text-xs text-muted-foreground">
              {data.sales.monthly} units this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {roleContent.ordersLabel}
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.orders.pending} pending
            </div>
            <p className="text-xs text-muted-foreground">
              {data.orders.completed} completed this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {roleContent.fourthMetricLabel}
            </CardTitle>
            {roleContent.fourthMetricIcon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {roleContent.fourthMetricValue}
            </div>
            <p className="text-xs text-muted-foreground">
              {roleContent.fourthMetricSubtext}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Inventory Breakdown</CardTitle>
            <CardDescription>Distribution by category</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="w-full h-full relative">
              <PieChart large />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>Sales and orders over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="w-full h-full">
              <LineChart large />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best performing items</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="w-full h-full">
              <BarChart large />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="flex items-start gap-4 pb-4 border-b last:border-0"
              >
                <div
                  className={`p-2 rounded-full ${
                    [
                      "bg-blue-100",
                      "bg-green-100",
                      "bg-yellow-100",
                      "bg-purple-100",
                    ][index % 4]
                  }`}
                >
                  {
                    [
                      <Package
                        key="package"
                        className="h-4 w-4 text-blue-600"
                      />,
                      <TrendingUp
                        key="trending"
                        className="h-4 w-4 text-green-600"
                      />,
                      <ShoppingCart
                        key="cart"
                        className="h-4 w-4 text-yellow-600"
                      />,
                      <Truck key="truck" className="h-4 w-4 text-purple-600" />,
                    ][index % 4]
                  }
                </div>
                <div>
                  <p className="font-medium">
                    {
                      [
                        "New stock received",
                        "Sales target achieved",
                        "New order placed",
                        "Shipment delivered",
                      ][index % 4]
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {
                      [
                        "50 units of Yachu Hair Oil - 100ml added to inventory",
                        "Monthly sales target of 750 units achieved",
                        "Order #OR-2023-001 placed for 35 units",
                        "Order #OR-2023-003 delivered successfully",
                      ][index % 4]
                    }
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {
                      ["2 hours ago", "Yesterday", "Yesterday", "3 days ago"][
                        index % 4
                      ]
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryOverview;
