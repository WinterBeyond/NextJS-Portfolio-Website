"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { PageConfigProvider } from "@/contexts/page-config-provider";
import fetcher from "@/lib/fetcher";
import { getLocaleFromSlug } from "@/lib/localization";
import { StoryblokPage } from "@/storyblok-components";
import { ISbStoryData, StoryblokComponentType } from "@storyblok/react";
import { StoryblokStory } from "@storyblok/react/rsc";

interface ISbLinkURLObject {
  id: number;
  name: string;
  slug: string;
  full_slug: string;
  url: string;
  uuid: string;
}

export default function ErrorNotFound() {
  const slug = usePathname();
  const isPreview = useMemo(() => slug?.includes("preview"), [slug]);
  const locale = useMemo(() => getLocaleFromSlug(slug), [slug]);
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState<{
    cv: number;
    links: (ISbStoryData | ISbLinkURLObject)[];
    rels: ISbStoryData[];
    story: ISbStoryData<StoryblokComponentType<string> & StoryblokPage>;
  } | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchStory(signal: AbortSignal) {
      try {
        const searchParams = new URLSearchParams({
          slug: "not-found",
          preview: isPreview ? "true" : "false",
        });

        const data = await fetcher<{
          cv: number;
          links: (ISbStoryData | ISbLinkURLObject)[];
          rels: ISbStoryData[];
          story: ISbStoryData<StoryblokComponentType<string> & StoryblokPage>;
        }>(`/api/story?${searchParams}`, {
          signal,
        });

        setData(data);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError")
          console.error("Error fetching not-found story:", error);
      } finally {
        setIsFetching(false);
      }
    }

    fetchStory(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [locale, isPreview]);

  if (isFetching) return null;

  if (!data?.story)
    return (
      <main>
        <h1>Missing Storyblok page not found blok</h1>
      </main>
    );

  return (
    <PageConfigProvider locale={locale} preview={isPreview} pageStory={data}>
      <StoryblokStory story={data.story} preview={isPreview} />
    </PageConfigProvider>
  );
}
