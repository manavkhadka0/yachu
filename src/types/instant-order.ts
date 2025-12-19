export interface InstantOrder {
  id: number;
  name: string;
  address: string;
  phone_number: string;
  quantity: number;
  franchise: number | null;
  created_at: string;
  updated_at: string;
}

export interface InstantOrderFormData {
  name: string;
  address: string;
  phone_number: string;
  quantity: number;
}

export interface InstantOrderResponse {
  message?: string;
  data?: InstantOrder;
}

export interface PaginatedInstantOrders {
  count: number;
  next: string | null;
  previous: string | null;
  results: InstantOrder[];
}

export interface InstantOrderFilters {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string; // e.g., "created_at", "-created_at", "name", "-name"
  date_gte?: string; // ISO format date
  date_lte?: string; // ISO format date
}
