import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { instantOrdersApi } from "@/services";
import { toast } from "sonner";

export const useGetInstantOrders = (filters: any) => {
  return useQuery({
    queryKey: ["instant-orders", filters],
    queryFn: () => instantOrdersApi.getOrders(filters),
  });
};

export const useUpdateInstantOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { id: any; status: any }>({
    mutationFn: ({ id, status }) => instantOrdersApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instant-orders"] });
      toast.success("Status updated successfully");
    },
  });
};
