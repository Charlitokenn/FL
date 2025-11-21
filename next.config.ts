import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [new URL('https://img.clerk.com/**')],
  }
};

export default nextConfig;
