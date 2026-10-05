import { Blogs } from "@/components/home/Blogs";
import { blogApi } from "@/services";
import { generateItemListSchema } from "@/lib/schema";

export const metadata = {
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

export default async function BlogPage() {
  const blogsData = await blogApi.getBlogs();
  const blogs = blogsData?.results || [];
  const blogListSchema = generateItemListSchema(blogs, "Yachu Blog", "https://yachu.com.np/blog", "BlogPosting");

  return (
    <main className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />
      <div className="bg-cream/30 py-16">
        <div className="max-w-7xl mx-auto px-6 md:text-center">
          <h1 className="text-5xl md:text-7xl font-display text-forest mb-6">
            Journal
          </h1>
          <p className="text-moss text-lg max-w-2xl mx-auto">
            Discover the wisdom of traditional hair care, modern rituals, and
            stories from the Yachu community.
          </p>
        </div>
      </div>
      <Blogs blogs={blogs} hideReadAll={true} />
    </main>
  );
}
