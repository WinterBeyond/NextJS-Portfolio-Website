import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Suspense } from "react";
import { WebPage, WithContext } from "schema-dts";
import serialize from "serialize-javascript";

import { PageConfigProvider } from "@/contexts/page-config-provider";
import { getPage } from "@/data-layer/storyblok";
import { sharedEnv } from "@/env/shared";
import { getAllowedHosts } from "@/lib/common";
import { getLocaleFromSlug } from "@/lib/localization";
import { StoryblokStory } from "@storyblok/react/rsc";

export type SharedPageProps = {
  params: Promise<{ slug?: string[] }>;
  isPreview?: boolean;
};

type DynamicPageProps = {
  slug?: string[];
  headerData: Headers;
  isPreview?: boolean;
};

function getPageTypeFromSlug(slug?: string[]): "plp" | "pdp" | "content" {
  if (!slug || slug.length === 0) return "content";

  const path = `/${slug.join("/")}`;

  if (path.includes("/c") && slug.length === 2) return "plp"; // /c/category
  if (path.includes("/p/") || (path.includes("/c") && slug.length === 3)) return "pdp"; // /p/slug or /c/category/item

  return "content";
}

function PageSkeleton({ slug }: { slug?: string[] }) {
  const pageType = getPageTypeFromSlug(slug);

  return null;

  // TODO Add back skeletons when needed
  /*switch (pageType) {
    case "plp":
      return <PLPSkeleton />;
    case "pdp":
      return <PDPSkeleton />;
    case "content":
    default:
      return <ContentSkeleton />;
  }*/
}

export default async function SharedPage({ params, isPreview = false }: SharedPageProps) {
  const [{ slug }, headerData] = await Promise.all([params, headers()]);

  return (
    <Suspense fallback={<PageSkeleton slug={slug} />}>
      <DynamicPage slug={slug} headerData={headerData} isPreview={isPreview} />
    </Suspense>
  );
}

async function DynamicPage({ slug, headerData, isPreview = false }: DynamicPageProps) {
  if (sharedEnv.NODE_ENV === "development" && sharedEnv.PAGE_SUSPENSE_TESTING_DELAY)
    await new Promise((resolve) => setTimeout(resolve, sharedEnv.PAGE_SUSPENSE_TESTING_DELAY));

  const locale = getLocaleFromSlug(slug);
  const version = isPreview ? "draft" : "published";

  const data = await getPage(slug, version);
  if (!data) return notFound();

  const nonce = headerData.get("x-nonce");

  let host = headerData.get("host") || "";
  if (!getAllowedHosts().includes(host)) host = getAllowedHosts()[0];

  const baseUrl = `https://${host}`;
  const { meta_title: name, meta_description: description } = data.story.content;

  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    image: `${baseUrl}/icon.png`,
    description,
    dateCreated: new Date(data.story.created_at).toISOString(),
    datePublished: data.story.first_published_at ? new Date(data.story.first_published_at).toISOString() : undefined,
    dateModified: data.story.published_at ? new Date(data.story.published_at).toISOString() : undefined,
  };

  return (
    <PageConfigProvider locale={locale} preview={isPreview} pageStory={data}>
      <StoryblokStory story={data.story} preview={isPreview} />
      <Script
        id="structured-data"
        type="application/ld+json"
        nonce={nonce || undefined}
        dangerouslySetInnerHTML={{
          __html: serialize(jsonLd),
        }}
      />
    </PageConfigProvider>
  );
}
