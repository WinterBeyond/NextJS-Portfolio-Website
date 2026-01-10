import { cn } from "@/lib/common";
import { DEFAULT_LOCALE } from "@/lib/localization";
import { rubikFont } from "@/routing/shared-layout";

export default function LayoutShell() {
  return (
    <html lang={DEFAULT_LOCALE} className={cn(rubikFont.variable, "antialiased dark")} data-scroll-behavior="smooth">
      <body>
        <div className="min-h-screen bg-background">
          <div className="h-16 bg-background border-b animate-pulse" />
          <main className="flex-1">
            <div className="h-96 bg-background animate-pulse" />
          </main>
          <div className="h-32 bg-background border-t animate-pulse" />
        </div>
      </body>
    </html>
  );
}
