type TProduct = {
  id: string;
  slug: string;
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
