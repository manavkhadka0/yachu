import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "@/services";
import { toast } from "sonner";

export const orderKeys = {
  all: ["orders"],
  lists: () => [...orderKeys.all, "list"],
  list: (filters: any) => [...orderKeys.lists(), { filters }],
  details: () => [...orderKeys.all, "detail"],
  detail: (id: any) => [...orderKeys.details(), id],
};

export const useOrders = (filters: any, options = {}) => {
  return useQuery({
    queryKey: orderKeys.list(filters),
    queryFn: () => ordersApi.getOrders(filters),
    staleTime: 30000,
    ...options,
  });
};

export const useOrder = (id: any, options = {}) => {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => ordersApi.getOrder(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<any, any, any>({
    mutationFn: (orderData) => ordersApi.createOrder(orderData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });

      if (data && typeof data === "object" && data.id) {
        queryClient.setQueryData(orderKeys.detail(data.id), data);
      }

      toast.success("Order placed successfully!", {
        description: "We'll contact you shortly to confirm your order details.",
      });
    },
    onError: (error: any) => {
      console.error("Failed to create order:", error);
      toast.error("Error submitting order", {
        description:
          error.message ||
          "There was a problem submitting your order. Please try again.",
      });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<any, any, { id: any; data: any }>({
    mutationFn: ({ id, data }) => ordersApi.updateOrder(id, data),
    onSuccess: (updatedOrder) => {
      queryClient.setQueryData(orderKeys.detail(updatedOrder.id), updatedOrder);
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      toast.success("Order updated successfully!");
    },
    onError: (error: any) => {
      console.error("Failed to update order:", error);
      toast.error("Error updating order", {
        description: error.message || "Failed to update order. Please try again.",
      });
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<any, any, { id: any; status: any }>({
    mutationFn: ({ id, status }) => ordersApi.updateOrder(id, { order_status: status }),
    onSuccess: (updatedOrder) => {
      queryClient.setQueryData(orderKeys.detail(updatedOrder.id), updatedOrder);
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      toast.success(`Order status updated to ${updatedOrder.order_status}!`);
    },
    onError: (error: any) => {
      console.error("Failed to update order status:", error);
      toast.error("Error updating order status", {
        description: error.message || "Failed to update order status. Please try again.",
      });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<any, any, any>({
    mutationFn: (id) => ordersApi.deleteOrder(id),
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: orderKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      toast.success("Order deleted successfully!");
    },
    onError: (error: any) => {
      console.error("Failed to delete order:", error);
      toast.error("Error deleting order", {
        description: error.message || "Failed to delete order. Please try again.",
      });
    },
  });
};
