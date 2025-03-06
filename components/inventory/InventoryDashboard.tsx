"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Factory } from "lucide-react";
import { TbTruckDelivery } from "react-icons/tb";
import { MdStorefront } from "react-icons/md";
import FactoryDashboard from "./factory/FactoryDashboard";
import DistributorDashboard from "./distributor/DistributorDashboard";
import FranchiseDashboard from "./franchise/FranchiseDashboard";

const InventoryDashboard = () => {
  const [activeRole, setActiveRole] = useState<
    "factory" | "distributor" | "franchise"
  >("factory");

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Tabs
        defaultValue="factory"
        onValueChange={(value) => setActiveRole(value as any)}
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="factory" className="flex items-center gap-2">
            <Factory className="h-5 w-5" />
            <span>Factory</span>
          </TabsTrigger>
          <TabsTrigger value="distributor" className="flex items-center gap-2">
            <TbTruckDelivery className="h-5 w-5" />
            <span>Distributor</span>
          </TabsTrigger>
          <TabsTrigger value="franchise" className="flex items-center gap-2">
            <MdStorefront className="h-5 w-5" />
            <span>Franchise</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="factory">
          <FactoryDashboard />
        </TabsContent>

        <TabsContent value="distributor">
          <DistributorDashboard />
        </TabsContent>

        <TabsContent value="franchise">
          <FranchiseDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryDashboard;
