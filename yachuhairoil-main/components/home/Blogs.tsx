import { Calendar, ChevronRight } from "lucide-react";
import { getImageUrl } from "@/lib/image";
import Link from "next/link";

export function Blogs({ blogs, hideReadAll = false }) {
  const displayBlogs = blogs?.length > 0 ? blogs : [];

  const gradients = [
    "from-[oklch(0.5_0.1_145)] to-[oklch(0.32_0.07_150)]",
    "from-[oklch(0.55_0.13_75)] to-[oklch(0.36_0.06_55)]",
    "from-[oklch(0.6_0.12_95)] to-[oklch(0.4_0.08_145)]",
  ];

  return (
    <section id="blog" className="relative py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-script text-2xl text-gold mb-2">
              From the journal
            </p>
            <h2 className="text-4xl md:text-6xl text-forest">
              Stories & rituals
            </h2>
          </div>
          {!hideReadAll && (
            <a
              href="/blog"
              className="text-forest font-medium inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
              Read all posts <ChevronRight className="w-4 h-4" />
            </a>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {displayBlogs.map((b, i) => {
            const date = new Date(b.updated_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            const excerpt = b.blog_content
              ? b.blog_content.replace(/<[^>]*>/g, "").substring(0, 120) + "..."
              : "Read our latest updates and hair care tips.";

            return (
              <Link
                href={`/blog/${b.slug}`}
                key={b.id}
                className="group rounded-2xl overflow-hidden border border-border bg-background hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer block"
              >
                <article>
                  <div
                    className={`relative aspect-[4/3] bg-gradient-to-br ${gradients[i % gradients.length]} overflow-hidden`}
                  >
                    <img
                      src={getImageUrl(b.thumbnail_image)}
                      alt={b.thumbnail_image_alt_description || b.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className="absolute inset-0 opacity-25"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                      }}
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cream/95 text-forest text-xs font-medium uppercase tracking-wider">
                      {b.category?.category_name || "Hair Care"}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-cream/80 text-xs">
                      <Calendar className="w-3.5 h-3.5" />
                      {date}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl md:text-2xl text-forest leading-tight group-hover:text-moss transition-colors line-clamp-2">
                      {b.title}
                    </h3>
                    <p className="mt-3 text-foreground/65 leading-relaxed line-clamp-3">
                      {excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-forest font-medium text-sm group-hover:gap-2 transition-all">
                      Read more <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
