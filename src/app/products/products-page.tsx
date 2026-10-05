"use client";

import ProductShowcase from "@/components/product/product-showcase";
import DashainDhamaka from "@/components/home/DashainDhamaka";
import YachuHairOilHowToUse from "@/components/home/YachuHairOilHowToUse";
import { CheckoutModal } from "@/components/popover/CheckoutModal";
import { useProducts } from "@/hooks/use-products";
import { useQuickOrder } from "@/hooks/use-quick-order";

export default function ProductsPage() {
  const { data: products, isLoading, error } = useProducts();
  const { handleOrder, checkoutOpen, setCheckoutOpen } = useQuickOrder();

  return (
    <div className="flex flex-col">
      <DashainDhamaka onOrder={handleOrder} />

      <ProductShowcase products={products} isLoading={isLoading} error={error} />

      <YachuHairOilHowToUse />

      <CheckoutModal isOpen={checkoutOpen} setIsOpen={setCheckoutOpen} />
    </div>
  );
}
