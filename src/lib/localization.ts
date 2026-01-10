export const DEFAULT_LOCALE = "en";
export const LOCALES = ["en"];
export const LOCALE_REGIONS: Record<string, string> = {
  sv: "sv_SE",
  en: "en_US",
};

export type Locale = "sv" | "en";

export function getLocaleFromSlug(slug?: string | string[] | null): Locale {
  if (!slug) return DEFAULT_LOCALE;
  if (Array.isArray(slug)) slug = slug.join("/");

  if (slug.startsWith("/")) slug = slug.substring(1);
  if (slug.startsWith("preview/")) slug = slug.replace("preview/", "");

  const matchedLocale = LOCALES.find((locale) => slug.toLowerCase().startsWith(locale));
  return (matchedLocale as Locale) || DEFAULT_LOCALE;
}
