"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const PRODUCT = {
  title: "New Hair Growth for Dandruff Case",
  subtitle:
    "It helps to remove dandruff from the hair, stops hair fall and grows new hair.",
  price: 99.99,
  tag: "Bestseller",
  imageSrc: "/product.jpeg",
};

const ProductPage = () => {
  const [count, setCount] = useState<number>(1);

  const handleIncrement = () => {
    setCount((p) => p + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount((p) => p - 1);
    }
  };

  return (
    <div className="flex sm:flex-row flex-col gap-10 container mx-auto my-16">
      <div className="p-4 border border-gray-300 rounded-lg">
        <Image
          src={PRODUCT.imageSrc}
          alt="yachu oil"
          height={400}
          width={500}
          className=" h-[400px] object-contain max-w-sm w-auto lg:w-[400px] "
        />
      </div>
      <div className="sm:px-4 px-2 flex flex-col gap-4 items-start  w-full">
        <p className="lg:text-4xl sm:text-3xl text-lg font-bold  px-4 sm:px-6 py-2 border-2 border-amber-600  rounded-xl ">
          {PRODUCT.title}
        </p>
        <p className=" text-xs sm:text-base font-semibold text-lime-700 text-center mt-2">
          {PRODUCT.subtitle}
        </p>
        <div className=" space-y-2 my-2 ">
          <p>❌ Dandruff, Hair Loss, Baldness ? Multiple Hair Problems</p>
          <p>🟢 Ultimate Solution = Yachu Hair Oil</p>
          <p>🍃 Crafted with a mix of 33 Jadibuti</p>
          <p>🇳🇵 Made in Nepal</p>
        </div>

        <p className="text-3xl font-bold"> Rs {PRODUCT.price}</p>
        <div className=" flex items-center gap-2">
          <Button
            size={"icon"}
            variant={"secondary"}
            className="btn btn-square  btn-accent"
            onClick={handleDecrement}
          >
            {" "}
            <Minus />
          </Button>
          <Input
            type="text"
            className="input max-w-[50px] input-bordered text-lg text-center font-medium "
            value={count}
          />
          <Button
            size={"icon"}
            variant={"secondary"}
            className="btn btn-square btn-accent "
            onClick={handleIncrement}
          >
            <Plus />
          </Button>
        </div>
        <div className="">
          <Button
            className="w-full bg-amber-700 hover:bg-amber-900 text-sm sm:text-lg flex items-center"
            size={"lg"}
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
