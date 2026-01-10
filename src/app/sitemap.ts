import type { MetadataRoute } from "next";

import { headers } from "next/headers";

import { getStories } from "@/data-layer/storyblok";
import { getAllowedHosts } from "@/lib/common";
import { DEFAULT_LOCALE } from "@/lib/localization";

export async function getPathDataForLocale(locale: string) {
  const { data } = await getStories("published", locale);

  const pathData: Array<{
    slug: string[];
    lastModified?: Date;
  }> = [];

  if (!data.stories) return pathData;

  for (const story of data.stories.filter((story) => story.full_slug.startsWith("pages"))) {
    if (story.is_folder || story.slug === "not-found") continue;

    if (!story.full_slug) continue;
    if (locale !== DEFAULT_LOCALE && !story.full_slug.startsWith(`pages/${locale}`)) continue;

    const lastModified = story.published_at ? new Date(story.published_at) : undefined;

    pathData.push({
      slug: story.full_slug.split("/").filter((segment) => segment && segment !== "pages"),
      lastModified,
    });
  }

  return pathData;
}

// When you add a new locale, also update the sitemap.xml file in the public folder
export async function generateSitemaps() {
  return [{ id: DEFAULT_LOCALE }];
}

export default async function sitemap({ id: locale }: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const [headerData, pathData] = await Promise.all([headers(), getPathDataForLocale(await locale)]);

  let host = headerData.get("host") || "";

  if (!getAllowedHosts().includes(host)) host = getAllowedHosts()[0];

  return pathData.map((path) => {
    const slug = path.slug.join("/");
    const url = `https://${host}/${slug}`;

    return {
      url,
      lastModified: path.lastModified,
      changeFrequency: "daily",
      priority: 0.7,
    };
  });
}
