import { ISbComponentType, ISbLinkURLObject } from "storyblok-js-client";

import { StoryblokSiteConfig } from "@/storyblok-components";
import { ISbStoryData } from "@storyblok/react/rsc";

type HeaderProps = {
  locale: string;
  siteConfig?: {
    cv: number;
    links: (ISbStoryData | ISbLinkURLObject)[];
    rels: ISbStoryData[];
    story: ISbStoryData<ISbComponentType<string> & StoryblokSiteConfig>;
  } | null;
  isPreview?: boolean;
};

export default function Header({ locale, siteConfig, isPreview }: HeaderProps) {
  return <header></header>;
}
