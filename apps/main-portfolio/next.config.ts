import type { NextConfig } from "next";

const DASHBOARD_URL = process.env.DASHBOARD_URL || "http://localhost:3001";

const nextConfig: NextConfig = {
  transpilePackages: ["@portfolio/ui"], // Add this to enable HMR for the shared package
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
    ];
  },
};

export default nextConfig;
