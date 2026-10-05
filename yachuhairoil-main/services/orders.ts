import { fetcher, franchise } from "@/lib/api";
import type {
  TOrder,
  TOrdersResponse,
  TOrderFilters,
  TCreateOrderRequest,
  TCreateOrderResponse,
  TUpdateOrderRequest,
} from "@/types";

export const ordersApi = {
  getOrders: (params?: TOrderFilters): Promise<TOrdersResponse> => {
    const query = new URLSearchParams({
      ...(params as Record<string, string>),
      franchise,
    }).toString();
    return fetcher<TOrdersResponse>(`/orders/?${query}`);
  },

  getOrder: (id: number | string): Promise<TOrder> =>
    fetcher<TOrder>(`/orders/${id}/`),

  createOrder: (data: TCreateOrderRequest): Promise<TCreateOrderResponse> =>
    fetcher<TCreateOrderResponse>("/orders/", {
      method: "POST",
      body: JSON.stringify({ ...data, franchise }),
    }),

  updateOrder: (
    id: number | string,
    data: TUpdateOrderRequest
  ): Promise<TOrder> =>
    fetcher<TOrder>(`/orders/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  deleteOrder: (id: number | string): Promise<null> =>
    fetcher<null>(`/orders/${id}/`, { method: "DELETE" }),
};
