import { fetcher } from "@/lib/api";
import type { VideoGallery, CreateVideoData, UpdateVideoData } from "@/types";

export const videoApi = {
  getVideo: (): Promise<VideoGallery[]> =>
    fetcher<VideoGallery[]>("/video-galleries/"),

  createVideo: (data: CreateVideoData): Promise<VideoGallery> =>
    fetcher<VideoGallery>("/video-galleries/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateVideo: (
    id: number | string,
    data: UpdateVideoData
  ): Promise<VideoGallery> =>
    fetcher<VideoGallery>(`/video-galleries/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  deleteVideo: (id: number | string): Promise<null> =>
    fetcher<null>(`/video-galleries/${id}/`, { method: "DELETE" }),
};
