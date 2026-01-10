import { ReactNode } from "react";
import { ISbComponentType, ISbLinkURLObject } from "storyblok-js-client";

import { StoryblokSiteConfig } from "@/storyblok-components";
import { ISbStoryData } from "@storyblok/react";

import { CookieConsentProvider } from "./cookie-consent-provider";
import { NonceProvider } from "./nonce-provider";
import { SiteConfigProvider } from "./site-config-provider";

type ProvidersProps = {
  siteConfig?: {
    cv: number;
    links: (ISbStoryData | ISbLinkURLObject)[];
    rels: ISbStoryData[];
    story: ISbStoryData<ISbComponentType<string> & StoryblokSiteConfig>;
  } | null;
  nonce?: string;
  children: ReactNode;
};

export default function Providers({ siteConfig, nonce, children }: ProvidersProps) {
  return (
    <SiteConfigProvider config={siteConfig}>
      <CookieConsentProvider>
        <NonceProvider nonce={nonce}>{children}</NonceProvider>
      </CookieConsentProvider>
    </SiteConfigProvider>
  );
}
