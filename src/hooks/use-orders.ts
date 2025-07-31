
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "@/services/api/order";
import { 
  TCreateOrderRequest, 
  TCreateOrderResponse, 
  TOrderFilters,
  TUpdateOrderRequest,
  TOrder,
  OrderStatus 
} from "@/types/order";
import { toast } from "sonner";

export const orderKeys = {
  all: ["orders"] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  list: (filters: TOrderFilters) => [...orderKeys.lists(), { filters }] as const,
  details: () => [...orderKeys.all, "detail"] as const,
  detail: (id: number) => [...orderKeys.details(), id] as const,
};

// Hook to fetch orders with filters
export const useOrders = (filters: TOrderFilters, options = {}) => {
  return useQuery({
    queryKey: orderKeys.list(filters),
    queryFn: () => ordersApi.getOrders(filters),
    staleTime: 30000, // 30 seconds
    ...options,
  });
};

// Hook to fetch single order
export const useOrder = (id: number, options = {}) => {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => ordersApi.getOrder(id),
    enabled: !!id,
    ...options,
  });
};

// Hook to create order
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: TCreateOrderRequest) =>
      ordersApi.createOrder(orderData),
    onSuccess: (data: TCreateOrderResponse) => {
      // Invalidate orders lists
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });

      // Set query data for the new order
      if (data && typeof data === "object" && "id" in data) {
        queryClient.setQueryData(orderKeys.detail(data.id), data);
      }

      toast.success("Order placed successfully!", {
        description: "We'll contact you shortly to confirm your order details.",
      });
    },
    onError: (error: Error) => {
      console.error("Failed to create order:", error);
      toast.error("Error submitting order", {
        description:
          error.message ||
          "There was a problem submitting your order. Please try again.",
      });
    },
  });
};

// Hook to update order
export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TUpdateOrderRequest }) =>
      ordersApi.updateOrder(id, data),
    onSuccess: (updatedOrder: TOrder) => {
      // Update the specific order in cache
      queryClient.setQueryData(orderKeys.detail(updatedOrder.id), updatedOrder);
      
      // Invalidate and refetch orders lists
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });

      toast.success("Order updated successfully!");
    },
    onError: (error: Error) => {
      console.error("Failed to update order:", error);
      toast.error("Error updating order", {
        description: error.message || "Failed to update order. Please try again.",
      });
    },
  });
};

// Hook to update order status (specialized version)
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: OrderStatus }) =>
      ordersApi.updateOrder(id, { order_status: status }),
    onSuccess: (updatedOrder: TOrder) => {
      // Update the specific order in cache
      queryClient.setQueryData(orderKeys.detail(updatedOrder.id), updatedOrder);
      
      // Invalidate and refetch orders lists
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });

      toast.success(`Order status updated to ${updatedOrder.order_status}!`);
    },
    onError: (error: Error) => {
      console.error("Failed to update order status:", error);
      toast.error("Error updating order status", {
        description: error.message || "Failed to update order status. Please try again.",
      });
    },
  });
};

// Hook to delete order
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => ordersApi.deleteOrder(id),
    onSuccess: (_, deletedId) => {
      // Remove the order from cache
      queryClient.removeQueries({ queryKey: orderKeys.detail(deletedId) });
      
      // Invalidate and refetch orders lists
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });

      toast.success("Order deleted successfully!");
    },
    onError: (error: Error) => {
      console.error("Failed to delete order:", error);
      toast.error("Error deleting order", {
        description: error.message || "Failed to delete order. Please try again.",
      });
    },
  });
};