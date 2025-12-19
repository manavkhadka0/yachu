import { useMutation, useQuery } from "@tanstack/react-query";
import { instantOrderAPI } from "@/services/api/instant-order";
import {
  InstantOrderFormData,
  InstantOrderFilters,
} from "@/types/instant-order";

export const useGetInstantOrders = (filters: InstantOrderFilters = {}) => {
  return useQuery({
    queryKey: ["instant-orders", filters],
    queryFn: () => instantOrderAPI.getInstantOrders(filters),
  });
};

export const useCreateInstantOrder = () => {
  return useMutation({
    mutationFn: (data: InstantOrderFormData) =>
      instantOrderAPI.createInstantOrder(data),
  });
};

