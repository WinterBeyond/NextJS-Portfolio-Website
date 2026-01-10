"use client";

import { createContext, ReactNode, useContext } from "react";
import { ISbComponentType, ISbLinkURLObject } from "storyblok-js-client";

import storyblokDefinitions from "@/lib/storyblok-definitions";
import { StoryblokSiteConfig } from "@/storyblok-components";
import { apiPlugin, ISbStoryData, storyblokInit } from "@storyblok/react";

export type SiteConfigContextType = {
  config?: {
    cv: number;
    links: (ISbStoryData | ISbLinkURLObject)[];
    rels: ISbStoryData[];
    story: ISbStoryData<ISbComponentType<string> & StoryblokSiteConfig>;
  } | null;
};

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

type SiteConfigProviderProps = SiteConfigContextType & {
  children: ReactNode;
};

export function SiteConfigProvider({ config, children }: SiteConfigProviderProps) {
  // Initialize Storyblok on the client to provide component definitions
  storyblokInit({
    accessToken: "_",
    use: [apiPlugin],
    components: storyblokDefinitions,
  });

  return <SiteConfigContext.Provider value={{ config }}>{children}</SiteConfigContext.Provider>;
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (!context) throw new Error("useSiteConfig must be used within a SiteConfigProvider");
  return context.config;
}

export function useSiteTranslatedLinks() {
  const context = useContext(SiteConfigContext);
  if (!context) throw new Error("useSiteTranslatedLinks must be used within a SiteConfigProvider");

  const translatedLinks = context.config?.links.map((link) => ({
    originalSlug: link.slug,
    translatedSlug: link.full_slug,
  }));

  return translatedLinks;
}
