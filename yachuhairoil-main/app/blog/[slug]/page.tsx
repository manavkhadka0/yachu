import { blogApi } from "@/services";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { getImageUrl } from "@/lib/image";
import { Calendar, User, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const blog = await blogApi.getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: `${blog.title} | Yachu Blog`,
    description: (blog.blog_content || "")
      .replace(/<[^>]*>/g, "")
      .substring(0, 160),
  };
}

export async function generateStaticParams() {
  const blogsData = await blogApi.getBlogs({ page_size: 100 });
  const blogs = blogsData?.results || [];
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await blogApi.getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const date = new Date(blog.updated_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const articleSchema = generateArticleSchema(blog, `https://yachu.com.np/blog/${blog.slug}`);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "https://yachu.com.np/" },
    { name: "Journal", item: "https://yachu.com.np/blog" },
    { name: blog.title, item: `https://yachu.com.np/blog/${blog.slug}` }
  ]);
  const schemas = [articleSchema, breadcrumbSchema];

  return (
    <main className="pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <div className="max-w-4xl mx-auto px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-moss hover:text-forest transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" /> Back to journal
        </Link>

        <article>
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-forest text-cream text-xs font-semibold uppercase tracking-wider">
                {blog.category?.category_name || "Hair Care"}
              </span>
              <span className="text-foreground/40 text-sm">•</span>
              <div className="flex items-center gap-2 text-foreground/60 text-sm">
                <Calendar className="w-4 h-4" />
                {date}
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-display text-forest mb-8 leading-tight">
              {blog.title}
            </h1>

            {blog.author && (
              <div className="flex items-center gap-3 border-y border-border py-6">
                <div className="w-10 h-10 rounded-full bg-cream border border-border flex items-center justify-center text-forest">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-forest uppercase tracking-widest">
                    {blog.author.name}
                  </p>
                  <p className="text-xs text-foreground/50">
                    Expert contributor
                  </p>
                </div>
              </div>
            )}
          </header>

          <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-12 border border-border bg-cream">
            <img
              src={getImageUrl(blog.thumbnail_image)}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className="prose prose-stone prose-lg max-w-none prose-headings:font-display prose-headings:text-forest prose-p:text-foreground/80 prose-p:leading-relaxed space-y-8"
            dangerouslySetInnerHTML={{ __html: blog.blog_content || "" }}
          />
        </article>

        <div className="mt-20 p-10 rounded-3xl bg-forest text-cream text-center">
          <h3 className="text-3xl font-display mb-4">Join the Yachu Ritual</h3>
          <p className="text-cream/70 mb-8 max-w-xl mx-auto">
            Discover the botanical blends that are transforming hair care.
            Experience the beauty of naturally nourished hair.
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-4 rounded-full bg-yellow-cta text-[oklch(0.2_0.04_55)] font-bold uppercase tracking-widest text-sm hover:brightness-95 transition-all"
          >
            Shop the collection
          </Link>
        </div>
      </div>
    </main>
  );
}
