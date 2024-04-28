import ProductCard from "./ProductCard";

import { Button } from "../ui/button";
import { PRODUCTS } from "@/constants/product";
import { BASE_URL } from "@/utils/config";
import { Prod, TProduct } from "@/types/product";

const getProducts = async () => {
  try {

    const res = await fetch(BASE_URL + "/products", {
      next: { revalidate: 10 },
    });
    return res.json();
  } catch (error) {
    console.error("Error fetching Products", error);
    return PRODUCTS;
  }
};
const ProductShowcase = async () => {
  // let data: Prod = await getProducts();
  //   if (data.length === 0) {
  //     data = PRODUCTS;
  //   }

    const res = await fetch(BASE_URL + '/products', { next: { revalidate: 10 } })
    return res.json();
  }
  catch (error) {
    console.error("Error fetching Products", error)
    return PRODUCTS;
  }
}
const ProductShowcase = async () => {
  let data: Prod = await getProducts();
  if (data.length === 0) {
    data = PRODUCTS;
  }

  return (
    <div className="container pb-6 md:pb-28" id="products">
      <div className="flex flex-col md:flex-row justify-center items-center mb-8">
        <div className="mx-auto">
          <h3 className="sm:text-2xl md:pl-40 font-bold text-center uppercase">
            Our Products
          </h3>
        </div>

        <div className=" md:flex-row md:mr-7">
          <Button
            variant={"ghost"}
            className=" h-7 sm:h-9 w-auto mt-3 md:mt-0 sm:text-lg border-2 border-amber-600 hover:bg-amber-600 hover:text-white  hover:ring-0 focus:ring-0"
            size={"lg"}
          >
            View all
          </Button>
        </div>
      </div>

      <section className=" bg-white sm:py-12 lg:py-0">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2  gap-3 mt-8 sm:gap-6 lg:gap-8 xl:gap-12 sm:mt-12 lg:grid-cols-3">
            {data.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default ProductShowcase;
