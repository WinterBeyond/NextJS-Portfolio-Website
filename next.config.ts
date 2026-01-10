import { NextConfig } from "next";

import { clientEnv } from "@/env/client";
import { serverEnv } from "@/env/server";
import { sharedEnv } from "@/env/shared";

const nextConfig: NextConfig = {
  cacheComponents: true,
  output: serverEnv.DEPLOYMENT_MODE,
  images: {
    minimumCacheTTL: 3600, // 1 hour
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.scdn.co",
        port: "",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "media.valorant-api.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "a.storyblok.com",
        pathname: "/f/289522194400323/**",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: false,
    },
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, X-API-Key",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Permissions-Policy",
            value:
              'camera=(), microphone=(), geolocation=(), browsing-topics=(), fullscreen=(self), autoplay=(self "https://youtube.com")',
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          ...(process.env.DEPLOYMENT_MODE === "standalone"
            ? [
                {
                  key: "X-Accel-Buffering",
                  value: "no",
                },
              ]
            : []),
        ],
      },
    ];
  },
};

export default nextConfig;
