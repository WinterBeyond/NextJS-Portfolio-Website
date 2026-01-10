import { Metadata } from "next";

import ErrorNotFound from "@/components/error-not-found";
import { generateSharedMetadata } from "@/routing/shared-metadata";

export async function generateMetadata({ params }: PageProps<"/preview/[[...slug]]">): Promise<Metadata> {
  return generateSharedMetadata({ params, isPreview: true, isNotFound: true });
}

export default function PreviewNotFound() {
  return <ErrorNotFound />;
}
