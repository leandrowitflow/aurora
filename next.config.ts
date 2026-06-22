import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/tecendo-geracoes",
        destination: "/tecer-geracoes",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
