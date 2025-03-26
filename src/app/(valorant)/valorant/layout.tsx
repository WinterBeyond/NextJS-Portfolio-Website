import "@/styles/globals.css";

import { Metadata } from "next";
import { Rubik as RubikFont } from "next/font/google";
import { ReactNode } from "react";

import { sharedEnv } from "@/env/shared";
import { cn } from "@/lib/common";

const rubikFont = RubikFont({ subsets: ["latin"], variable: "--font-rubik" });

const title = "Personal Valorant Tools";
const description = "Create ASCII art for Valorant chat!";
const url =
  sharedEnv.NODE_ENV === "development"
    ? "http://localhost:3000/valorant"
    : "https://maxwiggedal.dev/valorant";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    template: `%s | ${title}`,
    default: title,
  },
  applicationName: title,
  description,
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    url,
    title,
    siteName: title,
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
      <body className={cn("bg-neutral-900", rubikFont.variable)}>
        {children}
      </body>
    </html>
  );
}
