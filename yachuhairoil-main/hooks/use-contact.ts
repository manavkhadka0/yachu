import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { contactApi } from "@/services";

export const useGetContacts = (filters: any = {}) => {
  return useQuery({
    queryKey: ["contacts", filters],
    queryFn: () => contactApi.getContacts(filters),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: (data) => contactApi.createContact(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};
