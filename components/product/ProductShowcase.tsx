import ProductCard from "./ProductCard";

import { Button } from "../ui/button";
import { PRODUCTS } from "@/constants/product";

const ProductShowcase = () => {
  return (
    <div className="container pb-14">
      <div className="flex justify-between gap-4 items-center  mb-8 ">
        <h3 className="sm:text-2xl font-bold  uppercase">Bestsellers</h3>
        <Button variant={"outline"} className="sm:text-lg" size={"lg"}>
          View all
        </Button>
      </div>
      <div className=" grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2  gap-4 sm:gap-8 ">
        {PRODUCTS.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  );
};
export default ProductShowcase;
