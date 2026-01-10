import "@/app/globals.css";

import SharedLayout from "@/routing/shared-layout";

export default async function DefaultLayout({ children, params }: LayoutProps<"/[[...slug]]">) {
  return (
    <SharedLayout params={params} isPreview={false}>
      {children}
    </SharedLayout>
  );
}
