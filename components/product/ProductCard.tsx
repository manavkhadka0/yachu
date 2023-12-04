import { TProduct } from "@/types/product";
import { MessageSquareIcon, StarIcon } from "lucide-react";
import Image from "next/image";

type ProductCardProps = {
  product: TProduct;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { title, subtitle, rating, reviews, price, tag, imageSrc } = product;
  return (
    <div className="product-card-shadow pt-2 sm:pt-4 rounded-lg sm:rounded-2xl  r overflow-hidden">
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
          <p className="sm:text-lg text-sm font-bold text-center px-4 sm:px-6 py-2 border-2 border-amber-600  rounded-xl ">
            {title}
          </p>
          <p className=" text-xs sm:text-base font-semibold text-lime-700 text-center mt-4">
            {subtitle}
          </p>
          <div className=" flex w-full justify-between gap-2 my-6 sm:my-8 px-4 ">
            <p className=" items-center gap-1 text-sm text-gray-500 flex">
              {rating}
              <StarIcon className=" text-orange-500 h-3 w-3" />
            </p>
            <p className="flex items-center gap-1 text-sm text-gray-500">
              <MessageSquareIcon className=" text-orange-500 h-3 w-3" />
              {reviews} Reviews
            </p>
          </div>
        </div>
        {/* <div className="w-full flex flex-col">
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
        </div> */}
      </div>
    </div>
  );
};
export default ProductCard;
