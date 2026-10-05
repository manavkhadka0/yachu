"use client";

import { useVideos } from "@/hooks/use-testimonials";
import type { VideoGallery } from "@/services/api/testimonials";

function getYouTubeEmbedUrl(url: string) {
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

function VideoCard({ video }: { video: VideoGallery }) {
  const embedUrl = getYouTubeEmbedUrl(video.youtube_video_link);
  if (!embedUrl) return null;

  return (
    <article className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[oklch(0.4_0.07_145)] to-[oklch(0.32_0.06_55)] transition-all hover:border-gold">
      <iframe
        className="absolute inset-0 h-full w-full border-0"
        src={embedUrl}
        title={video.title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </article>
  );
}

const VideoStories = () => {
  const { data: videos, isLoading, isError } = useVideos();

  if (isLoading || isError || !videos?.length) return null;

  return (
    <section className="relative bg-card py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <p className="mb-2 font-script text-2xl text-gold">
            In their own words
          </p>
          <h2 className="text-4xl text-forest md:text-6xl">
            Stories from the family
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {videos.slice(0, 4).map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoStories;
