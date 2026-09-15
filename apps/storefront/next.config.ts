import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  reactStrictMode: true,
  transpilePackages: ["@adnelyq/types", "@adnelyq/ui"]
};

export default nextConfig;
