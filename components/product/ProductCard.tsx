"use client";

import { CartItem, TProduct } from "@/types/product";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { newCart } from "@/lib/utils";
import { toast } from "sonner";
import useProductCart from "@/store/zustand";
import { BASE_API_URL } from "@/utils/config";

type ProductCardProps = {
  product: TProduct;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, title, description, price, image1 } = product;
  const { cart, addToCart } = useProductCart();

  const handleAddToCart = () => {
    if (!product) return;
    const cartItem: CartItem = {
      product: product,
      count: 1,
    };
    const updatedCart = newCart(cartItem, cart);
    addToCart(updatedCart);
    toast.success("Product added to cart. Checkout now!");
  };

  return (  
    <div className="flex flex-col overflow-hidden transition-all duration-300 border border-gray-200 rounded-md hover:shadow-xl bg-slate-100">

      <div className="flex-shrink-0  w-full h-80 ">
        <Image height={300} width={300} className="object-contain text-center w-full h-full p-12 md:p-8" src={image1} alt="" />
      </div>

      <div className="flex flex-col flex-1 px-4 py-3">

        <div className="flex justify-center items-center text-center flex-shrink-0">
          <p className="text-xl md:text-4xl text-center font-black text-gray-900 pb-4 "><span className="text-amber-600">Rs.</span> {price}</p>
        </div>
        <h3 className="text-sm md:text-center text-center sm:text-base font-bold text-gray-900 flex-1 hover:text-blue-600 transition-all duratin-200">
          <a href="#" className="text-base md:text-xl text-gray-800 sm:font-semibold font-bold" >{title} </a>
          <p className="text-xs md:text-sm  text-green-700  font-medium" dangerouslySetInnerHTML={{ __html: description }}></p>
        </h3>
        <div className="flex items-center justify-between  pb-4">


          <Button
            className=" w-full p-3  h-12 text-xs justify-center bg-amber-700
             md:text-sm  hover:text-white hover:bg-amber-500 font-medium  sm:text-lg flex items-center shadow-2xl"
            size={"lg"}
            onClick={handleAddToCart}
          >
            <ShoppingCartIcon className="  mr-2" />
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
