import { StaticImageData } from "next/image";

export type TProduct = {
  title: string;
  subtitle: string;
  rating: number;
  reviews: number;
  price: number;
  tag?: string;
  image: StaticImageData;
};
