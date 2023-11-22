import { TProduct } from "@/types/product";
import { MessageSquareIcon, ShoppingCartIcon, StarIcon } from "lucide-react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { Button } from "../ui/button";

type ProductCardProps = {
  product: TProduct;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { title, subtitle, rating, reviews, price, tag, image } = product;
  return (
    <div className="shadow border-2 border-amber-600  bg-amber-600 pt-2 sm:pt-4 rounded-t-xl sm:rounded-t-3xl  rounded-b-lg overflow-hidden">
      <div className=" rounded-t-3xl bg-white  flex flex-col h-full justify-between items-center overflow-hidden">
        <Image
          src={image}
          alt="product"
          height={400}
          width={300}
          className=" object-contain max-w-[80px] sm:max-w-[150px] w-full mb-4"
        />
        <div className="sm:px-4 px-1 flex flex-col gap-2 items-center">
          <p className="sm:text-xl text-sm font-bold text-center">{title}</p>
          <p className=" text-[8px] sm:text-sm font-medium text-lime-700 text-center">
            {subtitle}
          </p>
          {/* <div className="hidden sm:flex w-full justify-between gap-2 my-3 ">
            <p className=" items-center gap-1 text-sm text-gray-500 flex">
              {rating}
              <StarIcon className=" text-orange-500 h-3 w-3" />
            </p>
            <p className="flex items-center gap-1 text-sm text-gray-500">
              <MessageSquareIcon className=" text-orange-500 h-3 w-3" />
              {reviews} Reviews
            </p>
          </div> */}
        </div>
        <div className="w-full flex flex-col">
          <div className="sm:text-xl text-sm font-bold my-2 sm:my-4 text-center">
            Rs. {price}
          </div>

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
export default ProductCard;
