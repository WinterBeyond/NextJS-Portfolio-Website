import { NextRequest, NextResponse } from "next/server";

import { getPage } from "@/data-layer/storyblok";

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug") || "";
    const isPreview = req.nextUrl.searchParams.get("preview") === "true";
    const data = await getPage(slug, isPreview ? "draft" : "published");

    if (!data) throw new Error("Story not found");

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
