import { Rubik } from "next/font/google";
import { headers } from "next/headers";
import { ReactNode, Suspense } from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";
import LayoutShell from "@/components/skeletons/layout-shell";
import Providers from "@/contexts/providers";
import { getSiteConfig } from "@/data-layer/storyblok";
import { cn } from "@/lib/common";
import { getLocaleFromSlug } from "@/lib/localization";

export const rubikFont = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
  preload: true,
});

type SharedLayoutProps = {
  children: ReactNode;
  params: Promise<{ slug?: string[] }>;
  isPreview?: boolean;
};

export default async function SharedLayout({ children, params, isPreview }: SharedLayoutProps) {
  return (
    <Suspense fallback={<LayoutShell />}>
      <DynamicLayout params={params} isPreview={isPreview}>
        {children}
      </DynamicLayout>
    </Suspense>
  );
}

async function DynamicLayout({ children, params, isPreview }: SharedLayoutProps) {
  const [{ slug }, headerData] = await Promise.all([params, headers()]);
  const locale = getLocaleFromSlug(slug);
  const siteConfig = await getSiteConfig(locale, "published", isPreview ? "no-cache" : "default");
  const nonce = headerData.get("x-nonce");

  return (
    <html lang={locale} className={cn(rubikFont.variable, "antialiased dark")} data-scroll-behavior="smooth">
      <body>
        <Providers siteConfig={siteConfig} nonce={nonce || undefined}>
          <div className="min-h-screen flex flex-col">
            <Header locale={locale} siteConfig={siteConfig} isPreview={isPreview} />

            <main className="flex-1 max-w-7xl xl:my-16 mx-auto relative">{children}</main>

            <Footer locale={locale} siteConfig={siteConfig} isPreview={isPreview} />
          </div>
        </Providers>
      </body>
    </html>
  );
}
