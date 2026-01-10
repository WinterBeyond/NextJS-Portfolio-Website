import "@/app/globals.css";

import SharedLayout from "@/routing/shared-layout";

export default async function PreviewLayout({ children, params }: LayoutProps<"/preview/[[...slug]]">) {
  return (
    <SharedLayout params={params} isPreview={true}>
      {children}
    </SharedLayout>
  );
}
