"use client";

import { calculateTotalPrice } from "@/lib/utils";
import useProductCart from "@/store/zustand";
import Image from "next/image";
import { Button } from "../ui/button";

const ProductCart = () => {
  const { cart } = useProductCart();
  return (
    <div className="  flex flex-col justify-between h-full w-full">
      <div className=" space-y-4 ">
        <h2 className="text-xl font-bold my-4">Shopping Cart</h2>
        <span className="font-bold text-sm mb-6">{cart.length} Items</span>
        {cart.map(({ product, count }) => (
          <div
            className="flex gap-2 justify-between items-center "
            key={product.id}
          >
            <Image src={product.imageSrc} alt="item" height={20} width={30} />{" "}
            <span className="text-xl ">x</span>{" "}
            <span className="text-lg font-bold">{count}</span>
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

        <Button className="w-full  sm:text-lg p-6 bg-amber-700 hover:bg-amber-800">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};
export default ProductCart;
