import { createHmac } from "crypto";
import ipaddr from "ipaddr.js";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { serverEnv } from "@/env/server";
import { getClientIp } from "@/lib/common";

export async function POST(req: NextRequest) {
  const rawData = await req.text();

  const signature = req.headers.get("webhook-signature");
  const generatedSignature = getSignature(rawData);
  if (generatedSignature && generatedSignature !== signature)
    return NextResponse.json({ error: "Invalid signature!" }, { status: 401 });

  const ip = getClientIp(req.headers);
  if (!ip || !isValidStoryblokIp(ip)) return NextResponse.json({ error: "Invalid IP address!" }, { status: 401 });

  const data = JSON.parse(rawData);
  if (!data.full_slug) return NextResponse.json({ error: "Missing slug in request!" }, { status: 400 });

  revalidateTag(`storyblok:${data.full_slug}`, "max");
  revalidateTag("storyblok:links", "max");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

const ALLOWED_CIDRS = serverEnv.STORYBLOK_IPS?.map((cidr) => {
  try {
    return ipaddr.parseCIDR(cidr.trim());
  } catch {
    throw new Error(`Invalid CIDR in STORYBLOK_IPS: ${cidr}`);
  }
});

function isValidStoryblokIp(ip: string) {
  if (!serverEnv.STORYBLOK_IPS) return true;
  if (!ipaddr.isValid(ip)) return false;

  const addr = ipaddr.parse(ip);

  return ALLOWED_CIDRS?.some(([range, prefix]) => addr.kind() === range.kind() && addr.match([range, prefix])) ?? true;
}

function getSignature(body: string) {
  if (!serverEnv.STORYBLOK_WEBHOOK_SECRET) return null;

  return createHmac("sha1", serverEnv.STORYBLOK_WEBHOOK_SECRET).update(body).digest("hex");
}
