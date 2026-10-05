import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { testimonialsApi } from "@/services";

export const useTestimonials = () => {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: () => testimonialsApi.getTestimonials(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, any>({
    mutationFn: (testimonialData) =>
      testimonialsApi.createTestimonial(testimonialData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
};

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { id: any; testimonialData: any }>({
    mutationFn: ({ id, testimonialData }) =>
      testimonialsApi.updateTestimonial(id, testimonialData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, any>({
    mutationFn: (id) => testimonialsApi.deleteTestimonial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
};
