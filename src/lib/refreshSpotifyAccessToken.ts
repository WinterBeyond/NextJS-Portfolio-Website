import fetcher from "@/lib/fetcher";

export default async function refreshSpotifyAccessToken() {
	try {
		return await fetcher<any>("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				Authorization: `Basic ${Buffer.from(
					`${process.env.SPOTIFY_OAUTH_CLIENT_ID}:${process.env.SPOTIFY_OAUTH_SECRET}`,
					"utf8"
				).toString("base64")}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				grant_type: "refresh_token",
				refresh_token:
					process.env.SPOTIFY_OAUTH_REFRESH_TOKEN?.toString() ?? "",
			}),
		});
	} catch (error) {
		throw error;
	}
}
