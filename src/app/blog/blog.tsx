"use client";

import { BlogCard } from "@/components/blog/blog-card";
import { useBlogs } from "@/hooks/use-blogs";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, RefreshCw } from "lucide-react";

const BlogsLoading = () => (
  <div className="grid grid-cols-1 gap-5 mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:mt-16">
    {[...Array(8)].map((_, index) => (
      <Card key={index} className="overflow-hidden">
        <CardContent className="p-0">
          <Skeleton className="h-40 w-full rounded-t-lg" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const BlogsError = ({ error, retry }: { error: Error; retry: () => void }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <Alert variant="destructive" className="max-w-md">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex flex-col items-center gap-4">
        <div className="text-center">
          <h3 className="font-semibold mb-2">Failed to load blogs</h3>
          <p>{error.message}</p>
        </div>
        <Button onClick={retry} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </AlertDescription>
    </Alert>
  </div>
);

const BlogContent = () => {
  const {
    data: blogsResponse,
    isLoading,
    error,
    refetch,
  } = useBlogs({ page: 1, page_size: 6 });

  if (isLoading) {
    return <BlogsLoading />;
  }

  if (error) {
    return <BlogsError error={error} retry={refetch} />;
  }

  if (!blogsResponse?.results || blogsResponse.results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Alert className="max-w-md">
          <AlertDescription className="text-center">
            <h3 className="font-semibold mb-2">No blogs found</h3>
            <p>Check back later for new content!</p>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:mt-16">
      {blogsResponse.results.map((blog, index) => (
        <BlogCard blog={blog} key={blog.slug || index} />
      ))}
    </div>
  );
};

const Blog = () => {
  return (
    <section
      className="container py-12 sm:py-16 lg:py-20 mx-auto"
      id="blogsection"
    >
      <div>
        <h2 className="tracking-tighter text-gray-800">
          <span className="font-sans text-2xl font-normal sm:text-5xl md:text-6xl">
            Our Blogs
          </span>
        </h2>
        <p className="mt-6 font-sans text-lg text-opacity-50 text-gray-800">
          Read our latest blogs about your hair growth, hair care, and hair
          loss.
        </p>
      </div>
      <Suspense fallback={<BlogsLoading />}>
        <BlogContent />
      </Suspense>
    </section>
  );
};

export default Blog;
