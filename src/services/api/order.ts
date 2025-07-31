import { BASE_API_URL } from "@/utils/config";
import { franchise } from "@/constants/constant";
import {
  TCreateOrderRequest,
  TCreateOrderResponse,
  TOrderFilters,
  TOrdersResponse,
  TUpdateOrderRequest,
  TOrder,
} from "@/types/order";

export const ordersApi = {
  // Get orders with filters
  async getOrders(filters: TOrderFilters = {}): Promise<TOrdersResponse> {
    try {
      const params = new URLSearchParams();

      // Add franchise filter
      params.append("franchise", franchise);

      // Add other filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, String(value));
        }
      });

      const res = await fetch(`${BASE_API_URL}/orders/?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${res.status}`
        );
      }

      return res.json();
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  // Get single order by ID
  async getOrder(id: number): Promise<TOrder> {
    try {
      const res = await fetch(
        `${BASE_API_URL}/orders/${id}/?franchise=${franchise}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${res.status}`
        );
      }

      return res.json();
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  },

  // Create new order
  async createOrder(
    orderData: TCreateOrderRequest
  ): Promise<TCreateOrderResponse> {
    try {
      const res = await fetch(`${BASE_API_URL}/orders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...orderData,
          franchise: franchise,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${res.status}`
        );
      }

      return res.json();
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  // Update order
  async updateOrder(
    id: number,
    updateData: TUpdateOrderRequest
  ): Promise<TOrder> {
    try {
      const res = await fetch(`${BASE_API_URL}/orders/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${res.status}`
        );
      }

      return res.json();
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  },

  // Delete order
  async deleteOrder(id: number): Promise<void> {
    try {
      const res = await fetch(
        `${BASE_API_URL}/orders/${id}/?franchise=${franchise}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${res.status}`
        );
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  },
};
