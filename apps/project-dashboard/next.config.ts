import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  basePath: "/dashboard",
  transpilePackages: ["@portfolio/ui"],
  outputFileTracingRoot: path.resolve(__dirname, "../../"),
  turbopack: {
    root: path.resolve(__dirname, "../../"),
  },
};

export default nextConfig;
