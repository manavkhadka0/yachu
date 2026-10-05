import { fetcher, franchise } from "@/lib/api";
import type {
  TBlog,
  PaginatedBlogResponse,
  BlogFilters,
  CreateBlogData,
  UpdateBlogData,
  CreateTagData,
  TCategory,
  TTag,
  TAuthor,
} from "@/types";

export const blogApi = {
  getBlogs: (params?: BlogFilters): Promise<PaginatedBlogResponse> => {
    const query = new URLSearchParams({
      ...(params as Record<string, string>),
      franchise,
    }).toString();
    return fetcher<PaginatedBlogResponse>(`/posts/?${query}`);
  },

  getBlogBySlug: (slug: string): Promise<TBlog> =>
    fetcher<{ data: TBlog }>(`/post-single/${slug}/`).then((res) => res.data),

  getCategories: (): Promise<TCategory[]> =>
    fetcher<TCategory[]>("/categories/"),

  getTags: (): Promise<TTag[]> => fetcher<TTag[]>("/tags/"),

  getAuthors: (): Promise<TAuthor[]> => fetcher<TAuthor[]>("/authors/"),

  createBlog: (data: CreateBlogData): Promise<TBlog> =>
    fetcher<TBlog>("/posts/", { method: "POST", body: JSON.stringify(data) }),

  updateBlog: (slug: string, data: UpdateBlogData): Promise<TBlog> =>
    fetcher<TBlog>(`/posts/${slug}/`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  deleteBlog: (slug: string): Promise<null> =>
    fetcher<null>(`/posts/${slug}/`, { method: "DELETE" }),

  createTag: (data: CreateTagData): Promise<TTag> =>
    fetcher<TTag>("/tags/", { method: "POST", body: JSON.stringify(data) }),
};
