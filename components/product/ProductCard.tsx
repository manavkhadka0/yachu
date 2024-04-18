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
    // <div classname="product-card-shadow py-4 sm:py-8 rounded-lg sm:rounded-2xl  r overflow-hidden">
    //   <div classname=" rounded-t-3xl bg-white  flex flex-col h-full justify-between items-center overflow-hidden">
    //     <div classname="flex p-4 flex-col justify-center items-center h-64">
    //       <Image
    //         src={imageSrc}
    //         alt="product"
    //         height={400}
    //         width={600}
    //         classname=" object-contain h-full w-full  rounded-lg mb-4"
    //       />
    //     </div>
    //     <div classname="sm:px-4 px-2 flex flex-col gap-2 items-center w-full">
    //       <Link
    //         href={"/product/" + id}
    //         classname="sm:text-lg text-sm font-bold text-center px-4 sm:px-6 py-2 border-2 border-amber-600  rounded-xl hover:text-amber-600 transition-all "
    //       >
    //         {title}
    //       </Link>
    //       <p classname=" text-xs sm:text-base font-semibold text-lime-700 text-center mt-4">
    //         {subtitle}
    //       </p>
    //     </div>
    //     <div classname="w-full flex flex-col sm:px-4 px-2">
    //       <div classname="sm:text-2xl text-lg font-bold my-2 sm:my-4 text-center">
    //         Rs. {price}
    //       </div>

    //       <Button
    //         classname="w-full bg-amber-700 hover:bg-amber-900 text-sm sm:text-lg flex items-center"
    //         size={"lg"}
    //         onClick={handleAddToCart}
    //       >
    //         <ShoppingCartIcon classname="mr-2" />
    //         Add to cart
    //       </Button>
    //     </div>
    //   </div>
    // </div>

    <div className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-md hover:shadow-xl shadow-lg">
      <div className="flex-shrink-0  w-full h-80 ">
        <img className="object-contain text-center w-full h-full p-12" src={product.imageSrc} alt="" />
      </div>

      <div className="flex flex-col flex-1 px-4 py-3">

        <h3 className="text-sm sm:text-base text-center font-bold text-gray-900 mt-2.5 flex-1 hover:text-blue-600 transition-all duratin-200">
          <a href="#" className="text-lg text-center pb-2 text-gray-800 font-bold" >{product.title} </a>
          <p className="text-sm text-center text-green-700 opacity-80 font-normal mb-3">{product.subtitle}</p>
        </h3>
        <div className="flex justify-center items-center text-center flex-shrink-0">
          <p className="text-3xl text-center font-bold text-gray-900">Nrs. {product.price}</p>
        </div>
        <div className="flex items-center justify-between mt-8">


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
