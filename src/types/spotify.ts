export type SpotifyPaginatedResponse<T> = {
  href: string;
  next?: string;
  previous?: string;
  total: number;
  limit: number;
  offset: number;
  items: Array<T>;
};

export type SpotifyAccessTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

export type SpotifyArtist = {
  id: string;
  name: string;
  href: string;
};

export type SpotifyImage = {
  url: string;
  height?: number;
  width?: number;
};

export type SpotifyAlbum = {
  id: string;
  name: string;
  href: string;
  release_date: string;
  images: Array<SpotifyImage>;
};

export type SpotifySong = {
  id: string;
  name: string;
  image: string;
  duration_ms: number;
  explicit: boolean;
  href: string;
  preview_url?: string;
  album: SpotifyAlbum;
  artists: Array<SpotifyArtist>;
  external_urls: Record<string, string>;
};

export type SpotifyTopSongsResponse = SpotifyPaginatedResponse<SpotifySong>;
