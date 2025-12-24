import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // API routes require dynamic rendering, cannot use static export
  // output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
