import { Metadata } from "next";

import { generateSharedMetadata } from "@/routing/shared-metadata";
import SharedPage from "@/routing/shared-page";

export async function generateStaticParams() {
  return [{ slug: [] }];
}

export async function generateMetadata({ params }: PageProps<"/preview/[[...slug]]">): Promise<Metadata> {
  return generateSharedMetadata({ params, isPreview: true });
}

export default async function PreviewPage({ params }: PageProps<"/preview/[[...slug]]">) {
  return <SharedPage params={params} isPreview={true} />;
}
