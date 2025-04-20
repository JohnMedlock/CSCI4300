import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      "maps.googleapis.com"
    ],
  },
};

export default nextConfig;
