import ProductCard from "./ProductCard";

import { Button } from "../ui/button";
import { PRODUCTS } from "@/constants/product";

const ProductShowcase = () => {
  return (
    <div className="container pb-14" id="products">
      <div className="flex justify-between pl-[585px] gap-4 items-center text-center mb-8 ">
        <h3 className="sm:text-2xl font-bold text-center ">Our Products</h3>
        <Button variant={"outline"} className="sm:text-lg" size={"lg"}>
          View all
        </Button>
      </div>
      <section className="py-12 bg-white sm:py-16 lg:py-0">

        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">

          <div className="grid grid-cols-2 gap-3 mt-8 sm:gap-6 lg:gap-8 xl:gap-12 sm:mt-12 lg:grid-cols-3">
            {PRODUCTS.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default ProductShowcase;
