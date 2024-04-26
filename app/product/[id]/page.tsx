"use client";

import { newCart } from "@/lib/utils";
import { CartItem, TProduct } from "@/types/product";
import { useState } from "react";
import { toast } from "sonner";
import useProductCart from "@/store/zustand";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import { PRODUCTS } from "@/constants/product";

const PRODUCT: TProduct = {
  id: "1",
  title: "New Hair Growth for Dandruff Case",
  description:
    "It helps to remove dandruff from the hair, stops hair fall and grows new hair.",
  price: 99.99,
  image1: "/product.jpeg",
};

interface IParams {
  id: string;
}

const ProductPage = ({ params }: { params: IParams }) => {
  let product: TProduct | undefined = PRODUCTS.find(
    (item) => item.id === params.id
  );

  const [count, setCount] = useState<number>(1);
  const { cart, addToCart } = useProductCart();

  const handleIncrement = () => {
    setCount((p) => p + 1);
  };
  const handleDecrement = () => {
    if (count > 1) {
      setCount((p) => p - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    const cartItem: CartItem = {
      product: product,
      count,
    };
    const updatedCart = newCart(cartItem, cart);
    addToCart(updatedCart);
    toast.success("Product added to cart. Checkout now!");
  };

  if (!product) {
    return <h1>No product available</h1>;
  }

  return (
    <div className="flex sm:flex-row flex-col gap-10 container mx-auto my-16">
      <div className="p-4 border border-gray-300 rounded-lg flex justify-center  items-center">
        <Image
          src={product.image1}
          alt="yachu oil"
          height={400}
          width={500}
          className=" object-contain max-w-sm w-full lg:w-[400px] "
        />
      </div>
      <div className="sm:px-4 px-2 flex flex-col gap-4 items-start  w-full">
        <p className="lg:text-4xl sm:text-3xl text-lg font-bold  px-4 sm:px-6 py-2 border-2 border-amber-600  rounded-xl ">
          {product.title}
        </p>
        <p className=" text-xs sm:text-base font-semibold text-lime-700 text-center mt-2">
          {product.description}
        </p>
        <div className=" space-y-2 my-2 ">
          <p>❌ Dandruff, Hair Loss, Baldness ? Multiple Hair Problems</p>
          <p>🟢 Ultimate Solution = Yachu Hair Oil</p>
          <p>🍃 Crafted with a mix of 33 Jadibuti</p>
          <p>🇳🇵 Made in Nepal</p>
        </div>

        <p className="text-3xl font-bold"> Rs {product.price}</p>
        <div className=" flex  gap-2">
          <Button size={"icon"} variant={"secondary"} onClick={handleDecrement}>
            <Minus />
          </Button>
          <div className="flex items-center justify-center max-w-[50px] input-bordered text-lg text-center font-medium bg-white border border-slate-200 px-4 rounded-md">
            {count}
          </div>
          <Button size={"icon"} variant={"secondary"} onClick={handleIncrement}>
            <Plus />
          </Button>
        </div>
        <div className="">
          <Button
            className="w-full bg-amber-700 hover:bg-amber-900 text-sm sm:text-lg flex items-center"
            size={"lg"}
            onClick={handleAddToCart}
          >
            <ShoppingCartIcon className="mr-2" />
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
