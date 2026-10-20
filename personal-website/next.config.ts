import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Resolve exported chunks beside the current page on any static host.
  assetPrefix: process.env.NODE_ENV === "production" ? "." : undefined,
};

export default nextConfig;
