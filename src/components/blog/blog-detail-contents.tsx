"use client";

import React from "react";

import { useBlog, useBlogs } from "@/hooks/use-blogs";
import { BASE_URL } from "@/utils/config";
import { sanitizeBlogContent } from "@/utils/htmlsanitizer";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { BlogSection } from "@/components/blog/blog-section";
import FlowerDivider from "@/components/shared/FlowerDivider";
import SocialShare from "@/components/shared/social-shared";
import BlogDetailsLoading from "@/components/blog/blog-detail-loading";
import BlogDetailsError from "@/components/blog/blog-details-error";
import BlogBreadcrumb from "@/components/blog/blog-breadcrumb";
import BlogAuthorCard from "@/components/blog/blog-author-card";
import { AlertCircle } from "lucide-react";

interface BlogDetailsContentProps {
  slug: string;
}

const BlogDetailsContent = ({ slug }: BlogDetailsContentProps) => {
  const { data: blog, isLoading, error, refetch } = useBlog(slug);
  const { data: blogsResponse } = useBlogs({
    page: 1,
    page_size: 6, // or whatever default you want
    is_published: true, // if you only want published blogs
  });

  if (isLoading) {
    return <BlogDetailsLoading />;
  }

  if (error) {
    return <BlogDetailsError error={error} retry={refetch} />;
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-center">
            <h2 className="text-lg font-semibold mb-2 text-foreground">
              Blog not found
            </h2>
            <p className="mb-4 text-muted-foreground">
              The blog post you&apos;re looking for doesn&apos;t exist.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const {
    title,
    thumbnail_image,
    blog_content,
    updated_at,
    category: { category_name },
  } = blog;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const sanitizedContent = sanitizeBlogContent(blog_content || "");

  return (
    <>
      <section className="py-12 px-3 sm:px-20 xl:px-72 bg-background sm:py-16 lg:py-10">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-5xl mx-auto">
            <BlogBreadcrumb title={title} />{" "}
            <Badge
              variant="default"
              className="mb-6 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {category_name}
            </Badge>
            <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl mb-8">
              {title}
            </h1>
            <BlogAuthorCard updatedAt={updated_at} />
            <SocialShare
              url={currentUrl}
              title={title}
              description={`Read this blog post: ${title}`}
              className="mb-8"
            />
            <Separator className="mb-8" />
            <div className="mt-8">
              <article className="prose dark:prose-invert lg:prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:text-primary/80">
                <div className="mb-8">
                  <img
                    src={BASE_URL + thumbnail_image}
                    alt={title}
                    width={800}
                    height={500}
                    className="rounded-lg shadow-lg w-full object-cover border"
                  />
                </div>

                <div
                  className="blog-content leading-10 text-foreground"
                  dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                />
              </article>
            </div>
          </div>
        </div>
      </section>

      <FlowerDivider />
      {blogsResponse && (
        <div className="container mx-auto px-4 py-12">
          <BlogSection blogs={blogsResponse.results} />
        </div>
      )}
    </>
  );
};

export default BlogDetailsContent;
