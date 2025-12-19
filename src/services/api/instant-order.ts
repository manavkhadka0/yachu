import { BASE_API_URL } from "@/utils/config";
import { franchise } from "@/constants/constant";
import {
  InstantOrderFormData,
  InstantOrderResponse,
  PaginatedInstantOrders,
  InstantOrderFilters,
} from "@/types/instant-order";

export const instantOrderAPI = {
  getInstantOrders: async (
    filters: InstantOrderFilters = {}
  ): Promise<PaginatedInstantOrders> => {
    try {
      const {
        page = 1,
        page_size = 10,
        search,
        ordering,
        date_gte,
        date_lte,
      } = filters;

      const url = new URL(`${BASE_API_URL}/instant-order/`);
      const params = new URLSearchParams();
      
      params.append("page", page.toString());
      params.append("page_size", page_size.toString());

      if (franchise) {
        params.append("franchise", franchise);
      }

      if (search && search.trim()) {
        params.append("search", search.trim());
      }

      if (ordering) {
        params.append("ordering", ordering);
      }

      // Handle date parameters - URLSearchParams will encode them automatically
      // The %3A you see is correct URL encoding for :
      if (date_gte && date_gte.trim()) {
        params.append("date_gte", date_gte.trim());
      }

      if (date_lte && date_lte.trim()) {
        params.append("date_lte", date_lte.trim());
      }

      const finalUrl = `${url.toString()}?${params.toString()}`;

      const response = await fetch(finalUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch instant orders: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching instant orders:", error);
      throw error;
    }
  },

  createInstantOrder: async (
    orderData: InstantOrderFormData
  ): Promise<InstantOrderResponse> => {
    try {
      const response = await fetch(`${BASE_API_URL}/instant-order/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...orderData,
          franchise: franchise,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            errorData.detail ||
            `Failed to create instant order: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating instant order:", error);
      throw error;
    }
  },
};

