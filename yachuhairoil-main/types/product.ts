// ─── Product Domain Types ─────────────────────────────────────────────────────

export interface TProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  image1: string;
}

export interface CartItem {
  product: TProduct;
  count: number;
}

export type Prod = TProduct[];
