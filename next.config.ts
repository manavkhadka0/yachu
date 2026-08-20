import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yachu.baliyoventures.com",
        port: "",
      },
      {
        protocol: "http",
        hostname: "yachu.baliyoventures.com",
        port: "",
      },
      // images.unsplash.com"
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "http",
        hostname: "qualify-ruling-heater-sbjct.trycloudflare.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "qualify-ruling-heater-sbjct.trycloudflare.com",
        port: "",
      },
    ],
  },
  // PostHog reverse proxy configuration
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
