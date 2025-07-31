import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseQueryOptions,
} from "@tanstack/react-query";
import { blogAPI } from "@/services/api/blogs";
import {
  TBlog,
  CreateBlogData,
  UpdateBlogData,
  PaginatedBlogResponse,
  BlogFilters,
  TCategory,
  TTag,
  TAuthor,
} from "@/types/blog";

export const blogQueryKeys = {
  all: ["blogs"] as const,
  lists: () => [...blogQueryKeys.all, "list"] as const,
  list: (filters: BlogFilters) => [...blogQueryKeys.lists(), filters] as const,
  details: () => [...blogQueryKeys.all, "detail"] as const,
  detail: (slug: string) => [...blogQueryKeys.details(), slug] as const,
  categories: () => [...blogQueryKeys.all, "categories"] as const,
  tags: () => [...blogQueryKeys.all, "tags"] as const,
  authors: () => [...blogQueryKeys.all, "authors"] as const,
};

export function useBlogs(
  filters: BlogFilters,
  options?: Partial<UseQueryOptions<PaginatedBlogResponse, Error>>
): UseQueryResult<PaginatedBlogResponse, Error> {
  return useQuery({
    queryKey: blogQueryKeys.list(filters),
    queryFn: () => blogAPI.getBlogs(filters),
    ...options,
  });
}

export function useBlog(slug: string): UseQueryResult<TBlog, Error> {
  return useQuery({
    queryKey: blogQueryKeys.detail(slug),
    queryFn: () => blogAPI.getBlogBySlug(slug),
    enabled: !!slug,
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation<TBlog, Error, { blogData: CreateBlogData }>({
    mutationFn: ({ blogData }) => blogAPI.createBlog(blogData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogQueryKeys.lists() });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation<TBlog, Error, { slug: string; blogData: UpdateBlogData }>({
    mutationFn: ({ slug, blogData }) => blogAPI.updateBlog(slug, blogData),
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries({ queryKey: blogQueryKeys.lists() });
      queryClient.setQueryData(
        blogQueryKeys.detail(updatedBlog.slug),
        updatedBlog
      );
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { slug: string }>({
    mutationFn: ({ slug }) => blogAPI.deleteBlog(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogQueryKeys.lists() });
    },
  });
}

export function useBlogCategories(): UseQueryResult<TCategory[], Error> {
  return useQuery({
    queryKey: blogQueryKeys.categories(),
    queryFn: blogAPI.getBlogCategories,
    staleTime: 5 * 60 * 1000,
  });
}

export function useBlogTags(): UseQueryResult<TTag[], Error> {
  return useQuery({
    queryKey: blogQueryKeys.tags(),
    queryFn: blogAPI.getBlogTags,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAuthors(): UseQueryResult<TAuthor[], Error> {
  return useQuery({
    queryKey: blogQueryKeys.authors(),
    queryFn: blogAPI.getAuthors,
    staleTime: 5 * 60 * 1000,
  });
}

// New hook for creating tags
export function useCreateTag() {
  const queryClient = useQueryClient();
  return useMutation<TTag, Error, { tag_name: string }>({
    mutationFn: ({ tag_name }) => blogAPI.createTag(tag_name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogQueryKeys.tags() });
    },
  });
}
