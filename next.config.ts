import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "asset.kalerkantho.com",
      },
      {
        protocol: "https",
        hostname: "media.prothomalo.com",
      },
    ],
  },
};

export default nextConfig;
