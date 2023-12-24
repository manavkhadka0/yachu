"use client";

import { CartItem, TProduct } from "@/types/product";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { newCart } from "@/lib/utils";
import { toast } from "sonner";
import useProductCart from "@/store/zustand";

type ProductCardProps = {
  product: TProduct;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, title, subtitle, price, tag, imageSrc } = product;
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
    <div className="product-card-shadow py-4 sm:py-8 rounded-lg sm:rounded-2xl  r overflow-hidden">
      <div className=" rounded-t-3xl bg-white  flex flex-col h-full justify-between items-center overflow-hidden">
        <div className="flex p-4 flex-col justify-center items-center h-64">
          <Image
            src={imageSrc}
            alt="product"
            height={400}
            width={600}
            className=" object-contain h-full w-full  rounded-lg mb-4"
          />
        </div>
        <div className="sm:px-4 px-2 flex flex-col gap-2 items-center w-full">
          <Link
            href={"/product/" + id}
            className="sm:text-lg text-sm font-bold text-center px-4 sm:px-6 py-2 border-2 border-amber-600  rounded-xl hover:text-amber-600 transition-all "
          >
            {title}
          </Link>
          <p className=" text-xs sm:text-base font-semibold text-lime-700 text-center mt-4">
            {subtitle}
          </p>
        </div>
        <div className="w-full flex flex-col sm:px-4 px-2">
          <div className="sm:text-2xl text-lg font-bold my-2 sm:my-4 text-center">
            Rs. {price}
          </div>

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
export default ProductCard;
