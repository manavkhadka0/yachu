import ProductCard from "./ProductCard";
import ProductImg from "../../public/product.jpeg";
import { TProduct } from "@/types/product";
import { Button } from "../ui/button";
const products: TProduct[] = [
  {
    title: "Yachu Hari Oil",
    subtitle: "High-quality hair growth experience",
    rating: 4.5,
    reviews: 120,
    price: 99.99,
    tag: "Bestseller",
    image: ProductImg,
  },
  {
    title: "Yachu Skil Oil",
    subtitle: "High-quality skin care",
    rating: 4.2,
    reviews: 80,
    price: 149.99,
    image: ProductImg,
  },
];

const ProductShowcase = () => {
  return (
    <div className="container  pb-10">
      <div className="flex justify-between gap-4 items-center  mb-8 ">
        <h3 className="sm:text-2xl font-bold  uppercase">Bestsellers</h3>
        <Button variant={"outline"} className="sm:text-lg" size={"lg"}>
          View all
        </Button>
      </div>
      <div className=" grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2  gap-4 sm:gap-8 ">
        {products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  );
};
export default ProductShowcase;
