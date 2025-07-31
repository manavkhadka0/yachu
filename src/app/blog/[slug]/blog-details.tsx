"use client";
import React, { Suspense } from "react";
import BlogDetailsContent from "@/components/blog/blog-detail-contents";
import BlogDetailsLoading from "@/components/blog/blog-detail-loading";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BlogDetailsProps {
  slug: string;
}

const BlogDetails = ({ slug }: BlogDetailsProps) => {
  if (!slug) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-center">
            <h2 className="text-lg font-semibold mb-2">Invalid blog URL</h2>
            <p className="mb-4 text-muted-foreground">
              The blog URL is missing or invalid.
            </p>
            <Button asChild className="mt-2">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blogs
              </Link>
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <Suspense fallback={<BlogDetailsLoading />}>
      <BlogDetailsContent slug={slug} />
    </Suspense>
  );
};

export default BlogDetails;