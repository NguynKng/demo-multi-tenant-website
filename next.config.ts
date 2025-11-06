import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ngrok-free.app", // Cho phép tất cả subdomain của ngrok
      },
      {
        protocol: "http",
        hostname: "localhost", // Cho phép load ảnh từ localhost
      },
      {
        protocol: "http",
        hostname: "127.0.0.1", // (tùy chọn) Cho phép load ảnh từ 127.0.0.1
      },
    ],
  },
};

export default nextConfig;
