import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { blogApi } from "@/services";
import { BlogFilters, TBlog, PaginatedBlogResponse, TCategory, TTag, TAuthor } from "@/types";

export const blogQueryKeys = {
  all: ["blogs"],
  lists: () => [...blogQueryKeys.all, "list"],
  list: (filters?: BlogFilters) => [...blogQueryKeys.lists(), filters],
  details: () => [...blogQueryKeys.all, "detail"],
  detail: (slug: string) => [...blogQueryKeys.details(), slug],
  categories: () => [...blogQueryKeys.all, "categories"],
  tags: () => [...blogQueryKeys.all, "tags"],
  authors: () => [...blogQueryKeys.all, "authors"],
};

export function useBlogs(filters?: BlogFilters, options = {}) {
  return useQuery<PaginatedBlogResponse>({
    queryKey: blogQueryKeys.list(filters),
    queryFn: () => blogApi.getBlogs(filters),
    ...options,
  });
}

export function useBlog(slug: string) {
  return useQuery<TBlog>({
    queryKey: blogQueryKeys.detail(slug),
    queryFn: () => blogApi.getBlogBySlug(slug),
    enabled: !!slug,
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation<TBlog, Error, { blogData: any }>({
    mutationFn: ({ blogData }) => blogApi.createBlog(blogData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogQueryKeys.lists() });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation<TBlog, Error, { slug: string; blogData: any }>({
    mutationFn: ({ slug, blogData }) => blogApi.updateBlog(slug, blogData),
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
  return useMutation<null, Error, { slug: string }>({
    mutationFn: ({ slug }) => blogApi.deleteBlog(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogQueryKeys.lists() });
    },
  });
}

export function useBlogCategories() {
  return useQuery<TCategory[]>({
    queryKey: blogQueryKeys.categories(),
    queryFn: blogApi.getCategories,
    staleTime: 5 * 60 * 1000,
  });
}

export function useBlogTags() {
  return useQuery<TTag[]>({
    queryKey: blogQueryKeys.tags(),
    queryFn: blogApi.getTags,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAuthors() {
  return useQuery<TAuthor[]>({
    queryKey: blogQueryKeys.authors(),
    queryFn: blogApi.getAuthors,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateTag() {
  const queryClient = useQueryClient();
  return useMutation<TTag, Error, { tag_name: any }>({
    mutationFn: ({ tag_name }) => blogApi.createTag(tag_name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogQueryKeys.tags() });
    },
  });
}
