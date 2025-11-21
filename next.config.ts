import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/Epiko-Hub',
  assetPrefix: '/Epiko-Hub/',
};

export default nextConfig;
