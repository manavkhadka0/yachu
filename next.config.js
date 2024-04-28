/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yachu.baliyoventures.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
