import { sharedEnv } from "@/env/shared";
import { Metadata } from "next";

const title = "Max Wiggedal - Software Engineer";
const description =
  "Full Stack Web Developer with a passion for innovating and building meaningful applications.";
const url =
  sharedEnv.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://maxwiggedal.dev";

export const meta: Readonly<Metadata> = Object.freeze({
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
    "engineer",
    "fullstack",
    "backend",
    "frontend",
    "react",
    "next",
    "node",
    "typescript",
    "javascript",
    "mongodb",
    "redis",
    "restful",
    "graphql",
    "api",
    "docker",
    "linux",
    "nginx",
    "express",
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
});
