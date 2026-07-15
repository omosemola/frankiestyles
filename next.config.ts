import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Limit to a single build thread to prevent concurrent worker processes from exhausting local postgres database proxy connections (limit 10)
    cpus: 1,
    workerThreads: false
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
