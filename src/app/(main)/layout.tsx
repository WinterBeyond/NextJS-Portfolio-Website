import "@/styles/globals.css";

import { Rubik as RubikFont } from "next/font/google";
import { ReactNode } from "react";

import Footer from "@/components/footer";
import CurrentSpotifySong from "@/components/spotify/current-spotify-song";
import { meta } from "@/constants/meta";
import Providers from "@/contexts/providers";
import { cn } from "@/lib/common";

const rubikFont = RubikFont({ subsets: ["latin"], variable: "--font-rubik" });

export const metadata = meta;

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-gradient-to-br from-gray-800 to-black antialiased",
          rubikFont.variable,
        )}
      >
        <Providers>
          <main className="mx-auto my-28 flex max-w-7xl flex-col gap-48 p-5">
            {children}
            <CurrentSpotifySong />
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
