import { StaticImageData } from "next/image";

export type TProduct = {
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
