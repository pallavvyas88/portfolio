import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["sharp", "archiver"],
  allowedDevOrigins: ["192.168.11.93", "localhost", "127.0.0.1"],
};

export default nextConfig;
