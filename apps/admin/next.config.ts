import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@adnelyq/config", "@adnelyq/types", "@adnelyq/ui"]
};

export default nextConfig;
