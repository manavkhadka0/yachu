import { fetcher } from "@/lib/api";
import type { Testimonial, UpdateTestimonialData } from "@/types";

export const testimonialsApi = {
  getTestimonials: (): Promise<Testimonial[]> =>
    fetcher<Testimonial[]>("/testimonials/"),

  createTestimonial: (data: FormData): Promise<Testimonial> =>
    fetcher<Testimonial>("/testimonials/", {
      method: "POST",
      body: data,
      headers: {
        // Let the browser set Content-Type with multipart boundary when sending FormData
        "Content-Type": undefined,
      },
    }),

  updateTestimonial: (
    id: number | string,
    data: FormData | UpdateTestimonialData
  ): Promise<Testimonial> =>
    fetcher<Testimonial>(`/testimonials/${id}/`, {
      method: "PATCH",
      body: data instanceof FormData ? data : JSON.stringify(data),
      headers: data instanceof FormData
        ? { "Content-Type": undefined }
        : undefined,
    }),

  deleteTestimonial: (id: number | string): Promise<null> =>
    fetcher<null>(`/testimonials/${id}/`, { method: "DELETE" }),
};
