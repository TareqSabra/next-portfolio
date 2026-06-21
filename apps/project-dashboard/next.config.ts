import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/dashboard",
  transpilePackages: ["@portfolio/ui"],
};

export default nextConfig;
