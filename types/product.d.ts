import { StaticImageData } from "next/image";

type TProduct = {
  id: string;
  title: string;
  description: string;
  price: number;
  image1: string;
};

export type CartItem = {
  product: TProduct;
  count: number;
};

export type Prod = TProduct[];
