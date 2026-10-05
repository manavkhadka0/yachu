import { fetcher, franchise } from "@/lib/api";
import type {
  InstantOrder,
  InstantOrderFilters,
  PaginatedInstantOrders,
  UpdateInstantOrderStatusPayload,
} from "@/types";

export const instantOrdersApi = {
  getOrders: (params?: InstantOrderFilters): Promise<PaginatedInstantOrders> => {
    // Filter out undefined, null, or empty string values from params
    const cleanParams = Object.entries(params ?? {}).reduce<
      Record<string, string>
    >((acc, [key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "undefined"
      ) {
        acc[key] = String(value);
      }
      return acc;
    }, {});

    const query = new URLSearchParams({ ...cleanParams, franchise }).toString();
    return fetcher<PaginatedInstantOrders>(`/instant-order/?${query}`);
  },

  updateStatus: (
    id: number | string,
    status: UpdateInstantOrderStatusPayload["status"]
  ): Promise<InstantOrder> =>
    fetcher<InstantOrder>(`/instant-order/${id}/`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};
