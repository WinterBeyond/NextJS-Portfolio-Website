import { ClassValue, clsx } from "clsx";
import crypto from "crypto";
import { extendTailwindMerge } from "tailwind-merge";

import { serverEnv } from "@/env/server";

const twMerge = extendTailwindMerge({});

export function cn(...classNames: ClassValue[]) {
  return twMerge(clsx(...classNames));
}

export function generateRandomString(length: number) {
  return crypto.randomBytes(length).toString("hex");
}

export function getParsedNumberOrDefault(str: string | null = "", defaultValue: number, minimumValue?: number) {
  const parsedNumber = parseInt(str ?? "");
  return isNaN(parsedNumber) ? defaultValue : minimumValue && parsedNumber < minimumValue ? minimumValue : parsedNumber;
}

export function getAllowedHosts() {
  const allowedHosts = serverEnv.ALLOWED_HOSTS;
  if (!allowedHosts) return [];
  return allowedHosts.map((host) => host.trim());
}

export function getDimensionsFromUrl(url?: string | null) {
  if (!url) return null;

  const match = url.match(/\/(\d+)x(\d+)\//);
  if (!match) return null;

  return {
    width: parseInt(match[1], 10),
    height: parseInt(match[2], 10),
  };
}

export function getYoutubeVideoId(url: string | undefined): string | null {
  if (!url) return null;

  const standard = url.match(/v=([^&]+)/);
  const short = url.match(/youtu\.be\/([^?]+)/);

  return (standard && standard[1]) || (short && short[1]);
}

export function getClientIp(headers: Headers): string | null {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();

  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp;

  const forwarded = headers.get("forwarded");
  if (forwarded) {
    const match = forwarded.match(/for="?([^";,]+)"?/);
    if (match) return match[1];
  }

  return null;
}
