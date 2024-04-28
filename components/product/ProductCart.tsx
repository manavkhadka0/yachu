"use client";

import { calculateTotalPrice } from "@/lib/utils";
import useProductCart from "@/store/zustand";
import Image from "next/image";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2Icon, X, XCircleIcon } from "lucide-react";
import { CheckoutModal } from "../popover/CheckoutModal";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { toast } from "sonner";

const ProductCart = () => {
  const { cart, increaseCount, decreaseCount, removeItem } = useProductCart();
  const [openCheckoutForm, setOpenCheckoutForm] = useState(false);

  const handleCheckout = () => {
    if (cart.length == 0) {
      toast.warning("Cart is empty!", {
        description: "Please add items to cart first.",
      });
      return;
    }
    setOpenCheckoutForm(true);
  };

  return (
    <div className="  flex flex-col justify-between h-full w-full">
      <div className=" space-y-6 ">
        <h2 className="text-xl font-bold my-4">Shopping Cart</h2>
        {cart.map(({ product, count }) => (
          <div className="flex gap-2 relative items-center " key={product.id}>
            <X
              className="absolute text-gray-400  transition-all -top-2 -right-1 h-5 w-5 cursor-pointer"
              onClick={() => removeItem(product.id)}
            />
            <div className="p-4 border min-w-[90px] border-gray-300 rounded-lg flex justify-center items-center">
              <Image src={product.image1} alt="item" height={60} width={60} />
            </div>

            <div className=" space-y-2  ">
              <p className="text-base pr-4 font-medium">{product.title}</p>
              <div className=" flex  gap-2">
                <Button
                  variant={"secondary"}
                  className="p-1"
                  onClick={() => decreaseCount(product.id)}
                >
                  <Minus />
                </Button>
                <div className="flex items-center justify-center max-w-[50px] input-bordered text-sm text-center font-medium bg-white border border-slate-200 px-4 rounded-md">
                  {count}
                </div>
                <Button
                  variant={"secondary"}
                  className="p-1 px-2"
                  onClick={() => increaseCount(product.id)}
                >
                  <Plus />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className=" space-y-6 mb-6 w-full">
        <span className="text-2xl font-bold">
          Total:{" "}
          <span className=" text-lime-600">
            Rs. {calculateTotalPrice(cart)}
          </span>
        </span>

        <Button
          className="w-full  sm:text-lg p-6 bg-amber-700 hover:bg-amber-800"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </Button>
      </div>
      <CheckoutModal
        isOpen={openCheckoutForm}
        setIsOpen={setOpenCheckoutForm}
      />
    </div>
  );
};
export default ProductCart;
