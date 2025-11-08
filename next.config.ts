import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.europosters.eu"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.europosters.eu",
      },
    ],
  },
};

export default nextConfig;
