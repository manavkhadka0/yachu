"use client";
import { TBlog } from "@/types/blog";
import { BlogCard } from "./blog-card";
import { useBlogs } from "@/hooks/use-blogs";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

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
  maxItems = 4,
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
    }
  );

  // Use prop values or fallback to fetched values
  const fetchedBlogs = fetchedBlogsResponse?.results;
  const blogs = propBlogs || fetchedBlogs;
  const isLoading = propIsLoading ?? fetchIsLoading;
  const error = propError ?? fetchError;

  if (isLoading) {
    return (
      <section
        className="container px-4 py-12 sm:py-16 lg:py-20"
        id="blog-section"
      >
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          <p className="max-w-2xl text-muted-foreground">{description}</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:mt-16">
          {Array.from({ length: maxItems }).map((_, index) => (
            <Card key={index}>
              <div className="space-y-4 p-6">
                <Skeleton className="h-40 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className="container px-4 py-12 sm:py-16 lg:py-20"
        id="blog-section"
      >
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          <p className="text-destructive">
            Failed to load blogs. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  if (!blogs || blogs.length === 0) {
    return null;
  }

  const displayBlogs = blogs.slice(0, maxItems);

  return (
    <section
      className="container px-4 py-12 sm:py-16 lg:py-20"
      id="blog-section"
    >
      <div className="flex flex-col items-center justify-center space-y-2 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        <p className="max-w-2xl text-muted-foreground">{description}</p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:mt-16">
        {displayBlogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
    </section>
  );
};
