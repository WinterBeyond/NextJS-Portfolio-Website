import { headers } from "next/headers";

import { getAllowedHosts } from "@/lib/common";

import type { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headerData = await headers();
  let host = headerData.get("host") || "";

  if (!getAllowedHosts().includes(host)) host = getAllowedHosts()[0];

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/preview/",
    },
    sitemap: `https://${host}/sitemap.xml`,
  };
}
