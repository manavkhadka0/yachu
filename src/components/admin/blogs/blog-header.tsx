"use client";

import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";

interface BlogHeaderProps {
  title?: string;
  showAddButton?: boolean;
  onCreateNew?: () => void;
  onRefresh?: () => void;
  blogsCount?: number;
}

export function BlogHeader({
  title = "Blog Management",
  showAddButton = true,
  onCreateNew,
  onRefresh,
  blogsCount,
}: BlogHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
          {blogsCount !== undefined && (
            <span className="inline-flex items-center rounded-full bg-forest/10 px-2.5 py-0.5 text-xs font-semibold text-forest">
              {blogsCount} {blogsCount === 1 ? "post" : "posts"}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Create, edit, and manage all your blog posts and articles
        </p>
      </div>
      <div className="flex items-center gap-2">
        {onRefresh && (
          <Button
            variant="outline"
            onClick={onRefresh}
            className="h-10 rounded-xl border-border bg-card shadow-none hover:bg-muted text-foreground cursor-pointer font-medium"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        )}
        {showAddButton && (
          <Button
            onClick={onCreateNew}
            className="h-10 rounded-xl bg-forest hover:bg-forest/90 text-white shadow-none cursor-pointer font-medium"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Blog Post
          </Button>
        )}
      </div>
    </div>
  );
}
