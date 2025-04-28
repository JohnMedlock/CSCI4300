import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: [
      "maps.googleapis.com"
    ],
  },
};

export default nextConfig;
