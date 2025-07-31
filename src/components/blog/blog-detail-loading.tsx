import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BlogDetailsLoading = () => (
  <div className="py-12 px-3 sm:px-20 xl:px-72 bg-background sm:py-16 lg:py-10">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <div className="max-w-5xl mx-auto animate-pulse">
        <div className="flex mb-10 text-xs">
          <Skeleton className="h-4 w-48" />
        </div>

        <Skeleton className="h-9 w-24 mb-10" />

        <Skeleton className="h-12 w-full mb-8" />

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-4 mt-8 mb-8">
          <Skeleton className="h-4 w-12" />
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-9 h-9 rounded-full" />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  </div>
);

export default BlogDetailsLoading;