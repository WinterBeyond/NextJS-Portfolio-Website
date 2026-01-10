"use client";

import { createContext, ReactNode, useContext } from "react";
import { ISbComponentType, ISbLinkURLObject } from "storyblok-js-client";

import { StoryblokPage } from "@/storyblok-components";
import { ISbStoryData } from "@storyblok/react";

type PageConfigContextType = {
  locale?: string;
  preview?: boolean;
  pageStory: {
    cv: number;
    links: (ISbStoryData | ISbLinkURLObject)[];
    rels: ISbStoryData[];
    story: ISbStoryData<ISbComponentType<string> & StoryblokPage>;
  };
};

const PageConfigContext = createContext<PageConfigContextType | undefined>(undefined);

type PageConfigProviderProps = PageConfigContextType & {
  children: ReactNode;
};

export function PageConfigProvider({ locale, preview, pageStory, children }: PageConfigProviderProps) {
  return <PageConfigContext.Provider value={{ locale, preview, pageStory }}>{children}</PageConfigContext.Provider>;
}

export function usePageConfig() {
  const context = useContext(PageConfigContext);
  if (!context) throw new Error("usePageConfig must be used within a PageConfigProvider");

  const defaultSlug = context.pageStory.story?.default_full_slug || undefined;
  const translatedSlugs =
    context.pageStory.story.translated_slugs?.map((alt) => ({
      lang: alt.lang,
      path: alt.path,
    })) || [];

  const translatedLinks = context.pageStory.links.map((link) => ({
    originalSlug: link.slug,
    translatedSlug: link.full_slug,
  }));

  return { ...context, defaultSlug, translatedSlugs, translatedLinks };
}
