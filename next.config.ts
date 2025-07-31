import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
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
        hostname:
          "experienced-sufficient-instrument-automatic.trycloudflare.com",
        port: "",
      },
      {
        protocol: "https",
        hostname:
          "experienced-sufficient-instrument-automatic.trycloudflare.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
