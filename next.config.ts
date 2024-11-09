import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    imageSizes: [16, 32, 48, 64, 96],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
};

export default nextConfig;
