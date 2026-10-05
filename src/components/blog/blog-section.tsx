"use client";
import { TBlog } from "@/types/blog";
import { BlogCard } from "./blog-card";
import { useBlogs } from "@/hooks/use-blogs";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BlogSectionProps {
  blogs?: TBlog[];
  title?: string;
  description?: string;
  maxItems?: number;
  isLoading?: boolean;
  error?: Error | null;
}

export const BlogSection = ({
  blogs: propBlogs,
  title = "LATEST BLOGS",
  description = "Read our latest blogs about your hair growth, hair care, and hair loss.",
  maxItems = 3,
  isLoading: propIsLoading,
  error: propError,
}: BlogSectionProps) => {
  // Only fetch blogs if no blogs are provided as props
  const {
    data: fetchedBlogsResponse,
    isLoading: fetchIsLoading,
    error: fetchError,
  } = useBlogs(
    {
      page: 1,
      page_size: maxItems,
    },
    {
      enabled: !propBlogs, // Only fetch if no blogs provided
    },
  );

  // Use prop values or fallback to fetched values
  const fetchedBlogs = fetchedBlogsResponse?.results;
  const blogs = propBlogs || fetchedBlogs;
  const isLoading = propIsLoading ?? fetchIsLoading;
  const error = propError ?? fetchError;

  if (isLoading || error) return null;

  if (!blogs || blogs.length === 0) {
    return null;
  }

  const displayBlogs = blogs.slice(0, maxItems);

  return (
    <section id="blog-section" className="relative bg-card py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-2 font-script text-2xl text-gold">{description}</p>
            <h2 className="text-4xl text-forest md:text-6xl">{title}</h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-medium text-forest transition-all hover:gap-3"
          >
            Read all posts <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {displayBlogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};
