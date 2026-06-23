import type { NextConfig } from "next";

function getCmsImageRemotePatterns() {
  const patterns: Array<{
    protocol: "https";
    hostname: string;
    pathname: string;
  }> = [
    {
      protocol: "https",
      hostname: "**.supabase.co",
      pathname: "/storage/v1/object/public/**",
    },
  ];

  const baseUrl = process.env.CMS_API_BASE_URL?.trim();
  if (baseUrl) {
    try {
      const { hostname } = new URL(baseUrl);
      if (!hostname.includes("supabase.co")) {
        patterns.push({ protocol: "https", hostname, pathname: "/**" });
      }
    } catch {
      // keep default supabase pattern only
    }
  }

  return patterns;
}

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: getCmsImageRemotePatterns(),
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
