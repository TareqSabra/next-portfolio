import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/design-system",
  transpilePackages: ["@portfolio/ui"],
};

export default nextConfig;
