"use server";

import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { ISbComponentType, ISbLinkURLObject } from "storyblok-js-client";

import { DEFAULT_LOCALE, Locale } from "@/lib/localization";
import { getStory, getStoryblokApi } from "@/lib/storyblok";
import { StoryblokPage, StoryblokSiteConfig } from "@/storyblok-components";
import { CacheLifeProfiles } from "@/types/cache-life-profiles";
import { ISbError, ISbStoriesParams, ISbStoryData } from "@storyblok/react/rsc";

export async function getStoryById(
  id: string,
  version: ISbStoriesParams["version"] = "published",
  locale?: Locale,
  cacheLifeProfile: CacheLifeProfiles = "default",
) {
  "use cache";

  try {
    const storyblokApi = getStoryblokApi();
    const response = await storyblokApi.getStory(id, {
      version,
      find_by: "uuid",
      language: locale === DEFAULT_LOCALE ? undefined : locale,
    });

    if (version === "published") {
      applyCacheLife(cacheLifeProfile);
      cacheTag(`storyblok:${response.data.story.full_slug}`);
    } else applyCacheLife("no-cache");

    return response.data;
  } catch (error) {
    if (error && typeof error === "object" && Object.hasOwn(error, "status") && (error as ISbError).status === 404) {
      applyCacheLife(version === "published" ? "minutes" : "no-cache");
      return null;
    }

    throw error;
  }
}

export const getPage = cache(
  async (
    slug?: string | string[],
    version: ISbStoriesParams["version"] = "published",
    cacheLifeProfile: CacheLifeProfiles = "default",
  ) => {
    "use cache";

    const story = await getStory(slug, version, undefined, true);

    if (!story) {
      applyCacheLife(version === "published" ? "minutes" : "no-cache");
      return null;
    }

    if (version === "published") {
      applyCacheLife(cacheLifeProfile);
      cacheTag(`storyblok:${story.story.full_slug}`);
    } else applyCacheLife("no-cache");

    return story as {
      cv: number;
      links: (ISbStoryData | ISbLinkURLObject)[];
      rels: ISbStoryData[];
      story: ISbStoryData<ISbComponentType<string> & StoryblokPage>;
    };
  },
);

export const getSiteConfig = cache(
  async (
    locale?: Locale,
    version: ISbStoriesParams["version"] = "published",
    cacheLifeProfile: CacheLifeProfiles = "default",
  ) => {
    "use cache";

    const slug = `${locale ? `${locale}/` : ""}site-config`;
    const story = await getStory(slug, version, undefined, false);

    if (!story) {
      applyCacheLife(version === "published" ? "minutes" : "no-cache");
      return null;
    }

    if (version === "published") {
      applyCacheLife(cacheLifeProfile);
      cacheTag(`storyblok:${story.story.full_slug}`);
    } else applyCacheLife("no-cache");

    return story as {
      cv: number;
      links: (ISbStoryData | ISbLinkURLObject)[];
      rels: ISbStoryData[];
      story: ISbStoryData<ISbComponentType<string> & StoryblokSiteConfig>;
    };
  },
);

export async function getStories(
  version: ISbStoriesParams["version"] = "published",
  locale?: string,
  cacheLifeProfile: CacheLifeProfiles = "default",
) {
  "use cache";

  if (version === "published") {
    applyCacheLife(cacheLifeProfile);
    cacheTag(`storyblok:links`);
  } else applyCacheLife("no-cache");

  const storyblokApi = getStoryblokApi();
  return await storyblokApi.getStories({
    version,
    excluding_fields: "content",
    language: locale === DEFAULT_LOCALE ? undefined : locale,
  });
}

function applyCacheLife(profile: CacheLifeProfiles) {
  if (profile === "default") cacheLife("default");
  else if (profile === "seconds") cacheLife("seconds");
  else if (profile === "minutes") cacheLife("minutes");
  else if (profile === "hours") cacheLife("hours");
  else if (profile === "days") cacheLife("days");
  else if (profile === "weeks") cacheLife("weeks");
  else if (profile === "max") cacheLife("max");
  else if (profile === "no-cache") cacheLife({ stale: 0, revalidate: 0, expire: 0 });
  else cacheLife(profile);
}
