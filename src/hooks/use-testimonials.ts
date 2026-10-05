import { useQuery } from "@tanstack/react-query";
import {
  testimonialsApi,
  type Testimonial,
  type VideoGallery,
} from "@/services/api/testimonials";

export const useTestimonials = () => {
  return useQuery<Testimonial[], Error>({
    queryKey: ["testimonials"],
    queryFn: testimonialsApi.getTestimonials,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useVideos = () => {
  return useQuery<VideoGallery[], Error>({
    queryKey: ["videos"],
    queryFn: testimonialsApi.getVideos,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
