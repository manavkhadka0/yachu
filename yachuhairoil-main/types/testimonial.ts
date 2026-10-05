// ─── Testimonial Domain Types ─────────────────────────────────────────────────

export interface Testimonial {
  id: number;
  name: string;
  before: string;
  after: string;
  role: string;
  title: string;
  source: string;
  review: string;
  rating: string;
  franchise?: number | null;
}

export type TestimonialFormData = Omit<Testimonial, "id" | "franchise">;

export type UpdateTestimonialData = Partial<TestimonialFormData>;
