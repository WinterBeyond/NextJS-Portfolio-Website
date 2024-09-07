import { ReactNode } from "react";
import Footer from "@/components/footer";
import SpotifySongProvider from "@/providers/spotify-song-provider";
import CurrentSpotifySong from "@/components/spotify/current-spotify-song";
import { Rubik as RubikFont } from "next/font/google";
import { cn } from "@/lib/common";
import { meta } from "@/constants/meta";
import "@/styles/globals.css";

const rubikFont = RubikFont({ subsets: ["latin"], variable: "--font-rubik" });

export const metadata = meta;

type RootLayoutProps = {
  children?: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <SpotifySongProvider>
        <body
          className={cn(
            "bg-gradient-to-br from-gray-800 to-black antialiased",
            rubikFont.variable,
          )}
        >
          <main className="mx-auto my-28 flex max-w-7xl flex-col gap-48 p-5">
            {children}
            <CurrentSpotifySong />
            <Footer />
          </main>
        </body>
      </SpotifySongProvider>
    </html>
  );
}
