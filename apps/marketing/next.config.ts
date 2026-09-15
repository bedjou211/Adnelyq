import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  reactStrictMode: true,
  transpilePackages: ["@adnelyq/ui"]
};

export default nextConfig;
