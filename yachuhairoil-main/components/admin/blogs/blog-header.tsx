"use client";

import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";



export function BlogHeader({
  title = "Blog Management",
  showAddButton = true,
  onCreateNew,
  onRefresh,
  blogsCount
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">
          Manage your blog posts and content
          {blogsCount !== undefined && ` (${blogsCount} total)`}
        </p>
      </div>
      <div className="flex gap-2">
        {onRefresh && (
          <Button variant="outline" onClick={onRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        )}
        {showAddButton && (
          <Button onClick={onCreateNew}>
            <Plus className="mr-2 h-4 w-4" />
            Add Blog Post
          </Button>
        )}
      </div>
    </div>
  );
}