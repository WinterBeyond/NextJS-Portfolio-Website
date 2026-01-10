import { Metadata } from "next";

import { generateSharedMetadata } from "@/routing/shared-metadata";
import SharedPage from "@/routing/shared-page";

export async function generateStaticParams() {
  return [{ slug: [] }];
}

export async function generateMetadata({ params }: PageProps<"/[[...slug]]">): Promise<Metadata> {
  return generateSharedMetadata({ params, isPreview: false });
}

export default async function DefaultPage({ params }: PageProps<"/[[...slug]]">) {
  return <SharedPage params={params} isPreview={false} />;
}
