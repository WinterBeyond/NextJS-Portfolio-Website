import { NextRequest, NextResponse } from "next/server";

import { sharedEnv } from "@/env/shared";

export async function proxy(req: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDevelopment = sharedEnv.NODE_ENV === "development";

  const cspHeader = `
    default-src 'self';
    script-src 'nonce-${nonce}' 'strict-dynamic' ${isDevelopment ? "'unsafe-eval'" : ""};
    style-src 'self' 'unsafe-inline' app.storyblok.com;
    connect-src 'self';
    img-src 'self' blob: data: a.storyblok.com;
    media-src 'self' a.storyblok.com p.scdn.co media.valorant-api.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'self' https://app.storyblok.com;
    frame-src 'self' https://app.storyblok.com;
    require-trusted-types-for 'script';
    trusted-types 'allow-duplicates';
    upgrade-insecure-requests;
  `;

  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, " ").trim();

  const response = NextResponse.next({
    request: {
      headers: req.headers,
    },
    headers: {
      "Content-Security-Policy": contentSecurityPolicyHeaderValue,
      "x-nonce": nonce,
      "x-pathname": req.nextUrl.pathname,
    },
  });

  return response;
}

export const config = {
  // Match all request paths except for the ones starting with:
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
