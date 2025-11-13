import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_FACEIO_PUBLIC_KEY: process.env.NEXT_PUBLIC_FACEIO_PUBLIC_KEY,
  },
};

export default nextConfig;
