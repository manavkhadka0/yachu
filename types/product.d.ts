import { StaticImageData } from "next/image";

export type TProduct = {
  title: string;
  subtitle: string;
  price: number;
  tag?: string;
  imageSrc: string;
};
