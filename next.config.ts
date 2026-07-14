import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Limit to a single build thread to prevent concurrent worker processes from exhausting local postgres database proxy connections (limit 10)
    cpus: 1,
    workerThreads: false
  }
};

export default nextConfig;
