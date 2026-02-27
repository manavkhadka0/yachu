import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { blogAPI } from "@/services/api/blogs";
import { blogQueryKeys } from "@/hooks/use-blogs";
import Blog from "./blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yachu Blogs | Hair Growth, Care, and Loss",
  description:
    "Read Yachus Hair Oil's latest blogs about hair growth, hair care, and hair loss. Expert advice and insights for healthier hair.",
  keywords: ["hair growth", "hair care", "hair loss", "blogs", "expert advice"],
  openGraph: {
    title: "Yachu Blogs | Hair Growth, Care, and Loss",
    description:
      "Expert advice and insights for healthier hair. Read our latest blogs on hair growth, care, and loss.",
    images: [
      {
        url: "/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Hair Care Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};
export default async function Page() {
  const queryClient = getQueryClient();
  const filters = { page: 1, page_size: 10 };

  await queryClient.prefetchQuery({
    queryKey: blogQueryKeys.list(filters),
    queryFn: () => blogAPI.getBlogs(filters),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Blog />
    </HydrationBoundary>
  );
}
