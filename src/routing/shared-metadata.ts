import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { getPage } from "@/data-layer/storyblok";
import { getAllowedHosts } from "@/lib/common";
import { getLocaleFromSlug, LOCALE_REGIONS } from "@/lib/localization";

import { SharedPageProps } from "./shared-page";

type SharedMetadataProps = SharedPageProps & {
  isNotFound?: boolean;
};

export async function generateSharedMetadata({
  params,
  isPreview = false,
  isNotFound = false,
}: SharedMetadataProps): Promise<Metadata> {
  const [{ slug }, headerData] = await Promise.all([params, headers()]);
  const locale = getLocaleFromSlug(slug);
  const version = isPreview ? "draft" : "published";

  const data = isNotFound
    ? await getPage(`${locale ? `${locale}/` : ""}not-found`, version)
    : await getPage(slug, version);

  if (!data) return notFound();

  const page = data.story.content;
  const { meta_title: title, meta_description: description } = page;
  const storySlug = data.story.slug === "home" ? locale || "" : data.story.full_slug;

  let host = "";
  if (headerData) {
    host = headerData.get("host") || "";
    if (!getAllowedHosts().includes(host)) host = getAllowedHosts()[0];
  } else host = getAllowedHosts()[0];

  const baseUrl = `https://${host}`;

  let url: string;
  if (isNotFound) url = `${baseUrl}/${storySlug}`;
  else {
    const urlPrefix = isPreview ? "/preview" : "";
    url = `${baseUrl}${urlPrefix}/${storySlug}`;
  }

  if (url.endsWith("/")) url = url.slice(0, -1);

  const baseMetadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title,
    description,
    openGraph: {
      locale: LOCALE_REGIONS[locale || "sv"],
      title,
      description,
      url,
      type: isNotFound ? "website" : page.type === "article" ? "article" : "website",
      images: "/icon.png",
      ...(isNotFound || page.type !== "article"
        ? {}
        : {
            publishedTime: data.story.first_published_at
              ? new Date(data.story.first_published_at).toISOString()
              : undefined,
            modifiedTime: data.story.published_at ? new Date(data.story.published_at).toISOString() : undefined,
          }),
    },
    robots: {
      index: !isPreview && !isNotFound,
      follow: !isPreview && !isNotFound,
    },
  };

  // Only add alternates for regular pages, not 404 pages
  if (!isNotFound) {
    let defaultSlug = data.story.default_full_slug;
    if (defaultSlug === "home") defaultSlug = "";

    const urlPrefix = isPreview ? "/preview" : "";
    let svUrl = `${baseUrl}${urlPrefix}/${defaultSlug}`;
    if (svUrl.endsWith("/")) svUrl = svUrl.slice(0, -1);

    baseMetadata.alternates = {
      canonical: url,
      languages: data.story.translated_slugs
        ?.filter((alt) => (!isPreview ? alt.published : true) && alt.lang !== locale)
        .reduce(
          (acc, alt) => {
            const altSlug = alt.path === "home" ? locale || "" : alt.path;
            let altUrl = `${baseUrl}${urlPrefix}/${alt.lang}/${altSlug}`;
            if (altUrl.endsWith("/")) altUrl = altUrl.slice(0, -1);
            return { ...acc, [alt.lang]: altUrl };
          },
          {
            ...(locale ? { sv: svUrl } : {}),
          },
        ),
    };
  }

  return baseMetadata;
}
