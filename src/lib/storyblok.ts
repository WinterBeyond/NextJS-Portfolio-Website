import { serverEnv } from "@/env/server";
import { apiPlugin, ISbError, ISbStoriesParams, storyblokInit } from "@storyblok/react/rsc";

import { DEFAULT_LOCALE, LOCALES } from "../lib/localization";
import storyblokDefinitions from "./storyblok-definitions";

export const getStoryblokApi = storyblokInit({
  accessToken: serverEnv.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components: storyblokDefinitions,
});

export async function getStory(
  slug?: string | string[],
  version: ISbStoriesParams["version"] = "published",
  revalidate?: number,
  isPage: boolean = false,
) {
  try {
    const { locale, slug: parsedSlug } = parseSlug(slug);

    const storyblokApi = getStoryblokApi();
    const response = await storyblokApi.getStory(
      `${isPage ? "pages/" : ""}${parsedSlug}`,
      {
        version,
        resolve_links: "url",
        resolve_links_level: 2,
        resolve_relations: ["resume.experience", "resume.projects", "resume.education", "resume.skills"],
        language: locale === DEFAULT_LOCALE ? undefined : locale,
      },
      {
        next: {
          revalidate,
          tags:
            revalidate && version === "published" ? [`storyblok:${isPage ? "pages/" : ""}${parsedSlug}`] : undefined,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (error && typeof error === "object" && Object.hasOwn(error, "status") && (error as ISbError).status === 404)
      return null;

    throw error;
  }
}

function parseSlug(slug: string | string[] | undefined) {
  if (!slug) return { locale: DEFAULT_LOCALE, slug: "" };
  if (Array.isArray(slug)) slug = slug.join("/");

  let locale = DEFAULT_LOCALE;
  if (LOCALES.includes(slug.split("/")[0].toLowerCase())) {
    locale = slug.split("/")[0].toLowerCase();
    slug = slug.replace(`${slug.split("/")[0].toLowerCase()}/`, "");
    if (LOCALES.includes(slug.toLowerCase())) slug = "";
  }

  return { locale, slug };
}
