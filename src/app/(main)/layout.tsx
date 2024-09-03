import { ReactNode } from "react";
import Footer from "@/components/footer";
import { Metadata } from "next";
import SpotifySongProvider from "@/providers/spotify-song-provider";
import CurrentSpotifySong from "@/components/spotify/current-spotify-song";
import { sharedEnv } from "@/env/shared";
import { Rubik as RubikFont } from "next/font/google";
import { cn } from "@/lib/common";
import "@/styles/globals.css";

const rubikFont = RubikFont({ subsets: ["latin"], variable: "--font-rubik" });

const title = "Max Wiggedal - Full Stack Web Developer";
const description =
  "Full Stack Web Developer with a passion for innovating and building meaningful applications.";
const url =
  sharedEnv.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://maxwiggedal.dev";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    template: `%s | ${title}`,
    default: title,
  },
  applicationName: "Max Wiggedal",
  description,
  keywords: [
    "software engineer",
    "software developer",
    "web developer",
    "developer",
    "fullstack",
    "backend",
  ],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    url,
    title,
    siteName: "Max Wiggedal",
    description,
    images: [
      {
        url: "/logo192.png",
      },
    ],
  },
  twitter: {
    card: "summary",
    title,
  },
};

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
