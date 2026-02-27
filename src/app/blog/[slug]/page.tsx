import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { blogAPI } from "@/services/api/blogs";
import { blogQueryKeys } from "@/hooks/use-blogs";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/config";
import BlogDetails from "./blog-details";
import { yachuCompanyName } from "@/constants/constant";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata for SEO
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { slug } = await params;

    const blog = await blogAPI.getBlogBySlug(slug);

    if (!blog) {
      return {
        title: "Blog Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const stripHtml = (html: string) => {
      return html
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim();
    };

    const description = blog.blog_content
      ? stripHtml(blog.blog_content).substring(0, 160) + "..."
      : `Read about ${blog.title} on our blog.`;

    const imageUrl = blog.thumbnail_image
      ? BASE_URL + blog.thumbnail_image
      : null;

    const siteName = yachuCompanyName;
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL_DEV || "https://yachunepal.com";

    return {
      title: `${blog.title} | Blog`,
      description: description,
      keywords: [
        blog.category?.category_name,
        blog.title,
        "blog",
        ...(blog.tags?.map((tag) => tag.tag_name) || []),
      ],
      authors: blog.author ? [{ name: blog.author.name }] : undefined,
      openGraph: {
        title: blog.title,
        description: description,
        type: "article",
        publishedTime: blog.created_at,
        modifiedTime: blog.updated_at,
        authors: blog.author ? [blog.author.name] : undefined,
        section: blog.category?.category_name,
        tags: blog.tags?.map((tag) => tag.tag_name),
        url: `${baseUrl}/blog/${slug}`,
        siteName: siteName,
        images: imageUrl
          ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: blog.title,
              type: "image/jpeg",
            },
          ]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: description,
        images: imageUrl ? [imageUrl] : undefined,
        creator: blog.author ? `@${blog.author.name}` : undefined,
      },
      robots: {
        index: blog.is_published !== false,
        follow: true,
        googleBot: {
          index: blog.is_published !== false,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      alternates: {
        canonical: `${baseUrl}/blog/${slug}`,
      },
      other: {
        "article:author": blog.author?.name || "",
        "article:published_time": blog.created_at || "",
        "article:modified_time": blog.updated_at || "",
        "article:section": blog.category?.category_name || "",
        "article:tag": blog.tags?.map((tag) => tag.tag_name).join(", ") || "",
      },

      metadataBase: new URL(baseUrl),
    };
  } catch (error) {
    console.error("Error generating metadata for blog:", error);
    return {
      title: "Blog Post",
      description: "Read our latest blog post.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export async function generateStaticParams() {
  try {
    const blogsResponse = await blogAPI.getBlogs({
      page: 1,
      page_size: 50,
    });

    return blogsResponse.results.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: blogQueryKeys.detail(slug),
      queryFn: () => blogAPI.getBlogBySlug(slug),
    }),
    queryClient.prefetchQuery({
      queryKey: blogQueryKeys.list({
        page: 1,
        page_size: 6,
        is_published: true,
      }),
      queryFn: () =>
        blogAPI.getBlogs({
          page: 1,
          page_size: 6,
          is_published: true,
        }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogDetails slug={slug} />
    </HydrationBoundary>
  );
}
