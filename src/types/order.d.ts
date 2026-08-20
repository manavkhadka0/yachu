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
  order_status:
    | "Pending"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled";
  created_at: string;
  updated_at: string;
  total_amount: string;
  order_products: TOrderProduct[];
  remarks: string | null;
}

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
  transaction_id?: string | null;
  is_paid?: boolean;
  payment_type?: "COD" | "NPS" | string;
}

export interface TOrderFilters {
  franchise?: string;
  page?: number;
  page_size?: number;
  search?: string;
  status?: string;
  ordering?: string;
}

export interface TOrdersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TOrder[];
}

export type TCreateOrderResponse = TOrder;

export interface TUpdateOrderRequest {
  order_status?: TOrder["order_status"];
  remarks?: string;
}

export interface TOrderApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export type OrderStatus = TOrder["order_status"];
