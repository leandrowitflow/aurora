import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
