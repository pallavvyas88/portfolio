import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "/workspaces/compressor/portfolio",
  },
  webpack: (config) => {
    config.resolve.modules = [
      "/workspaces/compressor/portfolio/node_modules",
      "node_modules",
    ];
    return config;
  },
};

export default nextConfig;
