import { TBlog } from "@/types/blog";

import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import { getImageUrl } from "@/utils/image";

interface BlogCardProps {
  blog: TBlog;
}

export const BlogCard = ({ blog }: BlogCardProps) => {
  const date = new Date(blog.updated_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const excerpt = blog.blog_content
    ? blog.blog_content
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .substring(0, 120) + "..."
    : "";

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-background transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <article className="flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-forest">
          <img
            src={getImageUrl(blog.thumbnail_image)}
            alt={blog.thumbnail_image_alt_description || blog.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-xs font-medium uppercase tracking-wider text-forest">
            {blog.category?.category_name || "Hair Care"}
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-xs text-cream/90">
            <Calendar className="h-3.5 w-3.5" />
            {date}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="line-clamp-2 font-display text-xl leading-tight text-forest transition-colors group-hover:text-moss md:text-2xl">
            {blog.title}
          </h3>
          {excerpt && (
            <p className="mt-3 line-clamp-3 leading-relaxed text-foreground/65">
              {excerpt}
            </p>
          )}
          <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-forest transition-all group-hover:gap-2">
            Read more <ChevronRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </article>
    </Link>
  );
};
