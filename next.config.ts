import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // এটি যেকোনো ডোমেইনের (https) ছবি ব্যবহারের অনুমতি দেবে
      },
      {
        protocol: "http",
        hostname: "**", // কিছু সাইট যদি http ব্যবহার করে, সেগুলোর জন্যও অনুমতি দেওয়া হলো
      },
    ],
  },
};

export default nextConfig;
