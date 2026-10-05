// ─── Video Gallery Domain Types ───────────────────────────────────────────────

export interface VideoGallery {
  id: number;
  title: string;
  url: string;
  description?: string;
  franchise?: number | null;
  created_at?: string;
  updated_at?: string;
}

export type CreateVideoData = Omit<VideoGallery, "id" | "created_at" | "updated_at">;
export type UpdateVideoData = Partial<CreateVideoData>;
