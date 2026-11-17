"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit, Trash2, FileText } from "lucide-react";
import { TBlog } from "@/types/blog";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { BASE_URL } from "@/utils/config";

interface BlogsTableProps {
  blogs: TBlog[];
  onDelete: (blog: TBlog) => void;
  isLoading?: boolean;
}

const getThumbnailUrl = (src?: string | null) => {
  if (!src) return null;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  const base = BASE_URL || "";
  const prefix = base.endsWith("/") ? base.slice(0, -1) : base;
  const path = src.startsWith("/") ? src : `/${src}`;
  return `${prefix}${path}`;
};

export function BlogsTable({ blogs, onDelete, isLoading }: BlogsTableProps) {
  const router = useRouter();

  const handleEdit = (slug: string) => {
    router.push(`/admin/blogs/edit/${slug}`);
  };

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-none">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border/80 bg-muted/40">
              <TableHead className="w-[88px] font-semibold">Image</TableHead>
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Last Updated</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i} className="border-b border-border/60">
                <TableCell>
                  <Skeleton className="h-11 w-16 rounded-lg" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-3/4 h-4 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-24 h-4 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-28 h-4 rounded" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-none">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border/80 bg-muted/40">
            <TableHead className="w-[88px] font-semibold text-xs uppercase tracking-wider text-muted-foreground">Image</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Title</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Category</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Last Updated</TableHead>
            <TableHead className="text-right font-semibold text-xs uppercase tracking-wider text-muted-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-44 text-center">
                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                  <FileText className="h-8 w-8 opacity-40" />
                  <p className="text-sm font-medium">No blog posts found</p>
                  <p className="text-xs">Try adjusting your search or category filter</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            blogs.map((blog) => {
              const thumbnailUrl = getThumbnailUrl(blog.thumbnail_image);
              return (
                <TableRow
                  key={blog.id}
                  className="border-b border-border/60 transition-colors hover:bg-muted/40"
                >
                  <TableCell>
                    <div className="relative h-11 w-16 overflow-hidden rounded-lg border border-border/60 bg-muted shrink-0">
                      {thumbnailUrl ? (
                        <img
                          src={thumbnailUrl}
                          alt={blog.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link
                      href={`/admin/blogs/edit/${blog.slug}`}
                      className="text-foreground transition-colors hover:text-forest hover:underline line-clamp-2"
                    >
                      {blog.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md border border-border/80 bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-foreground">
                      {blog.category?.category_name || "Uncategorized"}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {blog.updated_at
                      ? formatDistanceToNow(new Date(blog.updated_at), {
                          addSuffix: true,
                        })
                      : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(blog.slug)}
                        title="Edit blog"
                        className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer shadow-none"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(blog)}
                        title="Delete blog"
                        className="h-8 w-8 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 cursor-pointer shadow-none"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
