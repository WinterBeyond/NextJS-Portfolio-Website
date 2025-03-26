"use server";

import { load as loadCheerio } from "cheerio";

import { Song } from "@/entities/song";
import {
  SpotifyAccessTokenResponse,
  SpotifyTopSongsResponse,
} from "@/entities/spotify";
import { serverEnv } from "@/env/server";
import fetcher from "@/lib/fetcher";

function getSpotifyAuthorizationHeader() {
  return `Basic ${Buffer.from(
    `${serverEnv.SPOTIFY_OAUTH_CLIENT_ID}:${serverEnv.SPOTIFY_OAUTH_SECRET}`,
    "utf8",
  ).toString("base64")}`;
}

export async function getSpotifyAccessToken(
  code: string,
): Promise<SpotifyAccessTokenResponse> {
  return await fetcher<SpotifyAccessTokenResponse>(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      headers: {
        Authorization: getSpotifyAuthorizationHeader(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code: code,
        redirect_uri: serverEnv.SPOTIFY_OAUTH_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    },
  );
}

export async function refreshSpotifyAccessToken(
  refreshToken: string,
): Promise<SpotifyAccessTokenResponse> {
  return await fetcher<SpotifyAccessTokenResponse>(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      headers: {
        Authorization: getSpotifyAuthorizationHeader(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      next: {
        revalidate: 3000,
      },
    },
  );
}

async function getSpotifyPreviewUrls(
  spotifyTrackUrls: Array<string>,
): Promise<Record<string, string>> {
  const responses = await Promise.allSettled(
    spotifyTrackUrls.map((url) =>
      fetcher<string>(url, {
        next: {
          revalidate: 3000,
        },
      }),
    ),
  );

  const pages = responses
    .filter((page) => page.status === "fulfilled")
    .map((page) => (page as PromiseFulfilledResult<string>).value);

  const previewUrlMap: Record<string, string> = {};

  for (const page of pages) {
    const $ = loadCheerio(page);
    const audioUrl = $('meta[property="og:audio"]').attr("content");
    const canonicalUrl = $('link[rel="canonical"]').attr("href");

    if (audioUrl && canonicalUrl) {
      const trackId = canonicalUrl.split("/").pop();
      if (trackId) previewUrlMap[trackId] = audioUrl;
    }
  }

  return previewUrlMap;
}

export async function getTopMonthlySongs(
  limit: number = 10,
  timeRange: "long_term" | "medium_term" | "short_term" = "medium_term",
): Promise<Array<Song>> {
  const accessTokenData = await refreshSpotifyAccessToken(
    serverEnv.SPOTIFY_OAUTH_REFRESH_TOKEN,
  );

  const searchParams = new URLSearchParams({
    limit: limit.toString(),
    time_range: timeRange,
  });

  const data = await fetcher<SpotifyTopSongsResponse>(
    `https://api.spotify.com/v1/me/top/tracks?${searchParams}`,
    {
      headers: {
        Authorization: `Bearer ${accessTokenData.access_token}`,
      },
      next: {
        revalidate: 3000,
      },
    },
  );

  const previewUrls = await getSpotifyPreviewUrls(
    data.items.map((entry) => entry.external_urls.spotify),
  );

  return data.items.map((entry) => ({
    id: entry.id,
    name: entry.name.includes("(")
      ? entry.name.split("(")[0].trim()
      : entry.name,
    image: entry.album.images[1]?.url ?? entry.album.images[0]?.url, // Fallback to the first image if the second one is not available (Sorted by size)
    previewUrl: previewUrls[entry.id],
    artists: entry.artists.map((artist) => artist.name),
  }));
}
