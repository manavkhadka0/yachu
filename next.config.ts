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
        hostname: "latina-trail-yards-encyclopedia.trycloudflare.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "latina-trail-yards-encyclopedia.trycloudflare.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
