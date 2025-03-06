"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  Boxes,
  Factory,
  Leaf,
  Package,
  Send,
  TrendingUp,
  Truck,
} from "lucide-react";
import RawMaterialsInventory from "./RawMaterialsInventory";
import ProductionManagement from "./ProductionManagement";
import FinishedProductsInventory from "./FinishedProductsInventory";
import DistributionManagement from "./DistributionManagement";
import InventoryOverview from "../shared/InventoryOverview";

const FactoryDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for the overview
  const overviewData = {
    rawMaterials: {
      total: 24,
      lowStock: 5,
      value: 125000,
    },
    production: {
      daily: 150,
      weekly: 950,
      monthly: 4200,
    },
    finishedProducts: {
      total: 3250,
      allocated: 1200,
      available: 2050,
    },
    distribution: {
      pending: 8,
      inTransit: 5,
      completed: 42,
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Raw Materials</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overviewData.rawMaterials.total} types
            </div>
            <p className="text-xs text-muted-foreground">
              {overviewData.rawMaterials.lowStock} items low in stock
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Production</CardTitle>
            <Factory className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overviewData.production.daily} units/day
            </div>
            <p className="text-xs text-muted-foreground">
              {overviewData.production.monthly} units this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Finished Products
            </CardTitle>
            <Package className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overviewData.finishedProducts.available} units
            </div>
            <p className="text-xs text-muted-foreground">
              {overviewData.finishedProducts.allocated} units allocated
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Distribution</CardTitle>
            <Truck className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overviewData.distribution.pending} pending
            </div>
            <p className="text-xs text-muted-foreground">
              {overviewData.distribution.inTransit} shipments in transit
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="overview"
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger
            value="raw-materials"
            className="flex items-center gap-2"
          >
            <Leaf className="h-4 w-4" />
            <span className="hidden sm:inline">Raw Materials</span>
          </TabsTrigger>
          <TabsTrigger value="production" className="flex items-center gap-2">
            <Factory className="h-4 w-4" />
            <span className="hidden sm:inline">Production</span>
          </TabsTrigger>
          <TabsTrigger
            value="finished-products"
            className="flex items-center gap-2"
          >
            <Boxes className="h-4 w-4" />
            <span className="hidden sm:inline">Finished Products</span>
          </TabsTrigger>
          <TabsTrigger value="distribution" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Distribution</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <InventoryOverview
            title="Factory Inventory Overview"
            description="Comprehensive view of raw materials, production, finished products, and distribution."
            data={overviewData}
            role="factory"
          />
        </TabsContent>

        <TabsContent value="raw-materials">
          <RawMaterialsInventory />
        </TabsContent>

        <TabsContent value="production">
          <ProductionManagement />
        </TabsContent>

        <TabsContent value="finished-products">
          <FinishedProductsInventory />
        </TabsContent>

        <TabsContent value="distribution">
          <DistributionManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FactoryDashboard;
