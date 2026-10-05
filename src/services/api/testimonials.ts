import { BASE_API_URL } from "@/utils/config";

export type Testimonial = {
  id: number;
  name: string;
  before: string | null;
  after: string | null;
  role: string;
  title: string;
  source: string;
  review: string;
  rating: number | null;
};

export type VideoGallery = {
  id: number;
  title: string;
  youtube_video_link: string;
};

const getJson = async <T,>(path: string): Promise<T> => {
  const res = await fetch(`${BASE_API_URL}${path}`);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

export const testimonialsApi = {
  getTestimonials: () => getJson<Testimonial[]>("/testimonials/"),
  getVideos: () => getJson<VideoGallery[]>("/video-galleries/"),
};
