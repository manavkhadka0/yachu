// ─── Instant Order Domain Types ───────────────────────────────────────────────

export interface InstantOrder {
  id: number;
  name: string;
  address: string;
  phone_number: string;
  quantity: number;
  status: string;
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

// ─── Paginated Response ──────────────────────────────────────────────────────

export interface PaginatedInstantOrders {
  count: number;
  next: string | null;
  previous: string | null;
  results: InstantOrder[];
}

// ─── Filter / Query Params ───────────────────────────────────────────────────

export interface InstantOrderFilters {
  page?: number;
  page_size?: number;
  search?: string;
  /** e.g. "created_at", "-created_at", "name", "-name" */
  ordering?: string;
  /** ISO format date */
  date_gte?: string;
  /** ISO format date */
  date_lte?: string;
}

export interface UpdateInstantOrderStatusPayload {
  status: string;
}
