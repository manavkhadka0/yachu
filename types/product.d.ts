import { StaticImageData } from "next/image";

 type TProduct = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  tag?: string;
  imageSrc: string;
};

export type CartItem = {
  product: TProduct;
  count: number;
};

export type Prod= TProduct[];