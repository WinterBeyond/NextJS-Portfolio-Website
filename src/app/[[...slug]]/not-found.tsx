import { Metadata } from "next";

import ErrorNotFound from "@/components/error-not-found";
import { generateSharedMetadata } from "@/routing/shared-metadata";

export async function generateMetadata({ params }: PageProps<"/[[...slug]]">): Promise<Metadata> {
  return generateSharedMetadata({ params, isPreview: false, isNotFound: true });
}

export default function NotFound() {
  return <ErrorNotFound />;
}
