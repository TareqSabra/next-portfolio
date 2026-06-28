import type { NextConfig } from "next";
import path from "path";

const DASHBOARD_URL = process.env.DASHBOARD_URL || "http://localhost:3001";
const DESIGN_SYSTEM_URL = process.env.DESIGN_SYSTEM_URL || "http://localhost:3002";

const nextConfig: NextConfig = {
  transpilePackages: ["@portfolio/ui"],
  outputFileTracingRoot: path.resolve(__dirname, "../../"),
  turbopack: {
    root: path.resolve(__dirname, "../../"),
  },
  async rewrites() {
    return [
      {
        source: "/dashboard",
        destination: `${DASHBOARD_URL}/dashboard`,
      },
      {
        source: "/dashboard/:path*",
        destination: `${DASHBOARD_URL}/dashboard/:path*`,
      },
      {
        source: "/design-system",
        destination: `${DESIGN_SYSTEM_URL}/design-system`,
      },
      {
        source: "/design-system/:path*",
        destination: `${DESIGN_SYSTEM_URL}/design-system/:path*`,
      },
    ];
  },
};

export default nextConfig;
