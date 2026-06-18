import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensures all URLs are served WITHOUT trailing slash
  // Fixes "Page with redirect" issue in Google Search Console
  trailingSlash: false,
};

export default nextConfig;
