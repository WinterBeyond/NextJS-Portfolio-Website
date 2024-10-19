import { NextRequest, NextResponse } from "next/server";

import { getSpotifyAccessToken } from "@/data-layer/spotify";
import { serverEnv } from "@/env/server";
import { sharedEnv } from "@/env/shared";
import { generateRandomString } from "@/lib/common";
import { HttpError } from "@/lib/fetcher";

const OAUTH_SCOPE = "user-top-read";

export async function GET(req: NextRequest) {
  if (sharedEnv.NODE_ENV !== "development")
    return NextResponse.json(
      { message: "This API endpoint is only available in development!" },
      {
        status: 403,
      },
    );

  const state = generateRandomString(16);

  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  if (!code)
    return NextResponse.redirect(
      `https://accounts.spotify.com/authorize?${new URLSearchParams({
        response_type: "code",
        client_id: serverEnv.SPOTIFY_OAUTH_CLIENT_ID,
        scope: OAUTH_SCOPE,
        redirect_uri: serverEnv.SPOTIFY_OAUTH_REDIRECT_URI,
        state,
      })}`,
    );

  try {
    const accessTokenData = await getSpotifyAccessToken(code);

    return NextResponse.json({
      message: "OAuth has successfully been granted!",
      data: accessTokenData,
    });
  } catch (error) {
    const errorMessage =
      error instanceof HttpError
        ? error.formattedMessage
        : error instanceof Error
          ? error.message
          : "Internal Server Error";

    return NextResponse.json(
      { message: errorMessage },
      {
        status: 500,
      },
    );
  }
}
