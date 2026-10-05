"use client";

import { useVideos } from "@/hooks/use-videos";
import { useTestimonials } from "@/hooks/use-testimonials";
import { Star } from "lucide-react";

function getYouTubeEmbedUrl(url) {
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/shorts\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^&]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
  }
  return null;
}

function VideoCard({ video }) {
  const embedUrl = getYouTubeEmbedUrl(video.youtube_video_link);
  return (
    <article className="group relative aspect-[9/16] rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-[oklch(0.4_0.07_145)] to-[oklch(0.32_0.06_55)] cursor-pointer hover:border-gold transition-all">
      {embedUrl ? (
        <iframe
          className="absolute inset-0 w-full h-full border-0"
          src={embedUrl}
          title={video.title}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-cream/50 text-sm">
          Invalid video URL
        </div>
      )}
    </article>
  );
}

function ReviewCard({ t }) {
  const stars = t.rating ? Math.round(t.rating) : 5;
  return (
    <div className="p-7 rounded-2xl border border-border bg-background">
      <div className="flex gap-1 mb-3">
        {[...Array(stars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-gold text-gold" />
        ))}
      </div>
      <p className="font-display italic text-lg text-forest leading-snug">
        "{t.review}"
      </p>
      <p className="mt-4 text-sm text-foreground/55">— {t.name}</p>
    </div>
  );
}

export function Testimonials() {
  const {
    data: videos,
    isLoading: videosLoading,
    isError: videosError,
  } = useVideos();
  const {
    data: testimonials,
    isLoading: testimonialsLoading,
    error: testimonialsError,
  } = useTestimonials();

  if (videosLoading || testimonialsLoading) return null;

  return (
    <section className="relative py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-script text-2xl text-gold mb-2">
              In their own words
            </p>
            <h2 className="text-4xl md:text-6xl text-forest">
              Stories from the family
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-gold text-gold" />
            ))}
            <span className="ml-2 text-foreground/70 text-sm">
              4.9 from 2,400+ reviews
            </span>
          </div>
        </div>

        {!videosError && videos?.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {videos.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
