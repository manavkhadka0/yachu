export type TCategory = {
  id: number;
  category_name: string;
  category_image?: string | null;
};

export type TTag = {
  id: number;
  tag_name: string;
};

export type TAuthor = {
  id: number;
  name: string;
  role: string;
  picture: string;
};

export type TBlog = {
  id: number;
  slug: string;
  title: string;
  blog_content?: string;
  blog_duration_to_read: string;
  thumbnail_image: string;
  thumbnail_image_alt_description: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  category: TCategory;
  author: TAuthor;
  tags: TTag[];
};

export interface PaginatedBlogResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TBlog[];
}

export interface BlogFilters {
  category?: string;
  search?: string;
  page?: number;
  page_size?: number;
  is_published?: boolean;
}

export interface CreateBlogData {
  title: string;
  blog_content: string;
  blog_duration_to_read: string;
  thumbnail_image: File | null;
  thumbnail_image_alt_description: string;
  category: string; 
  author: number; 
  tags: number[]; 
  is_published?: boolean;
}

export interface UpdateBlogData
  extends Partial<Omit<CreateBlogData, "thumbnail_image">> {
  thumbnail_image?: File | string | null;
}