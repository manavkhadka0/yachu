"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useBlogs, useBlogCategories, useDeleteBlog } from "@/hooks/use-blogs";
import { BlogsTable } from "@/components/admin/blogs/blog-table";
import { BlogHeader } from "@/components/admin/blogs/blog-header";
import { BlogSearch } from "@/components/admin/blogs/blog-search";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TBlog, BlogFilters } from "@/types/blog";
import Pagination from "@/components/ui/pagination";
import { useDebounce } from "@/hooks/use-debounce";
const BlogsManagement = () => {
  const router = useRouter();

  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    blog: TBlog | null;
  }>({ isOpen: false, blog: null });

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [filters, setFilters] = useState<Omit<BlogFilters, "is_published">>({
    page: 1,
    search: "",
    category: "",
    page_size: 10,
  });

  // Update filters when debounced search term changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: debouncedSearchTerm,
      page: 1,
    }));
  }, [debouncedSearchTerm]);

  const queryFilters: BlogFilters = useMemo(
    () => ({
      ...filters,
    }),
    [filters]
  );

  const {
    data: blogData,
    isLoading: isLoadingBlogs,
    refetch,
  } = useBlogs(queryFilters);
  const { data: categories } = useBlogCategories();

  const deleteBlogMutation = useDeleteBlog();

  const handleCreateNew = () => router.push("/admin/blogs/add");
  const handleRefresh = () => refetch();
  const handleDeleteBlog = (blog: TBlog) =>
    setDeleteDialog({ isOpen: true, blog });
  const cancelDelete = () => setDeleteDialog({ isOpen: false, blog: null });

  const confirmDelete = () => {
    if (!deleteDialog.blog) return;
    deleteBlogMutation.mutate(
      { slug: deleteDialog.blog.slug },
      {
        onSuccess: () => {
          toast.success("Blog deleted successfully!");
          cancelDelete();
          refetch();
        },
        onError: (error) => {
          toast.error(error.message || "Failed to delete blog.");
          cancelDelete();
        },
      }
    );
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilters: { category: string }) =>
    setFilters((prev) => ({ ...prev, category: newFilters.category, page: 1 }));

  const handlePageChange = (page: number) =>
    setFilters((prev) => ({ ...prev, page }));

  const blogs = blogData?.results || [];
  const totalBlogs = blogData?.count || 0;
  const totalPages = Math.ceil(totalBlogs / (filters.page_size || 10));

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="px-4">
        <BlogHeader
          onCreateNew={handleCreateNew}
          onRefresh={handleRefresh}
          blogsCount={totalBlogs}
        />
        <BlogSearch
          onSearch={handleSearch}
          onFilter={handleFilter}
          categories={categories || []}
          searchValue={searchTerm}
        />
        <div className="mt-6">
          <BlogsTable
            blogs={blogs}
            onDelete={handleDeleteBlog}
            isLoading={isLoadingBlogs || deleteBlogMutation.isPending}
          />
        </div>
        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination
              currentPage={filters.page || 1}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
      <AlertDialog
        open={deleteDialog.isOpen}
        onOpenChange={(open) => !open && cancelDelete()}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the blog post titled &quot;
              {deleteDialog.blog?.title}&quot;. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogsManagement;
