// ─── Order Domain Types ───────────────────────────────────────────────────────

export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface TOrderProduct {
  id: number;
  product: {
    id: number;
    title: string;
    price: number;
    image1?: string;
  };
  quantity: number;
}

export interface TOrder {
  id: number;
  franchise: number;
  full_name: string;
  email: string | null;
  phone_number: string;
  alternate_phone_number: string | null;
  delivery_address: string;
  order_status: OrderStatus;
  created_at: string;
  updated_at: string;
  total_amount: string;
  order_products: TOrderProduct[];
  remarks: string | null;
}

// ─── Paginated Response ──────────────────────────────────────────────────────

export interface TOrdersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TOrder[];
}

// ─── Filter / Query Params ───────────────────────────────────────────────────

export interface TOrderFilters {
  franchise?: string;
  page?: number;
  page_size?: number;
  search?: string;
  status?: string;
  ordering?: string;
}

// ─── Mutation Payloads ───────────────────────────────────────────────────────

export interface TCreateOrderRequest {
  full_name: string;
  email: string | null;
  phone_number: string;
  alternate_phone_number: string | null;
  delivery_address: string;
  payment_method: string;
  total_amount: number;
  order_products: {
    product_id: number;
    quantity: number;
  }[];
  remarks: string | null;
}

export type TCreateOrderResponse = TOrder;

export interface TUpdateOrderRequest {
  order_status?: OrderStatus;
  remarks?: string;
}

export interface TOrderApiError {
  message: string;
  errors?: Record<string, string[]>;
}
