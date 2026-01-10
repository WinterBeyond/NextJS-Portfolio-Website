import Link from "next/link";
import { ISbComponentType, ISbLinkURLObject } from "storyblok-js-client";

import { StoryblokSiteConfig } from "@/storyblok-components";
import { ISbStoryData } from "@storyblok/react/rsc";

type FooterProps = {
  locale: string;
  siteConfig?: {
    cv: number;
    links: (ISbStoryData | ISbLinkURLObject)[];
    rels: ISbStoryData[];
    story: ISbStoryData<ISbComponentType<string> & StoryblokSiteConfig>;
  } | null;
  isPreview?: boolean;
};

export default function Footer({ locale, siteConfig, isPreview }: FooterProps) {
  return <footer className="flex flex-col justify-between gap-y-2 md:flex-row"></footer>;
}
