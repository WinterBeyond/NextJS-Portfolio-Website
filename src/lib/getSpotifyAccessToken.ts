import fetcher from "@/lib/fetcher";

export default async function getSpotifyAccessToken(code: string) {
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
				code: code,
				redirect_uri: process.env.SPOTIFY_OAUTH_REDIRECT_URI?.toString() ?? "",
				grant_type: "authorization_code",
			}),
		});
	} catch (error) {
		throw error;
	}
}
