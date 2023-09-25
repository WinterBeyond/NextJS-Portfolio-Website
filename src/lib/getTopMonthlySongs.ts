import fetcher from "@/lib/fetcher";
import Song from "@/lib/models/song";
import refreshSpotifyAccessToken from "./refreshSpotifyAccessToken";

export default async function getTopMonthlySongs() {
	try {
		const accessTokenData = await refreshSpotifyAccessToken();

		const data = await fetcher<any>(
			"https://api.spotify.com/v1/me/top/tracks?limit=12&time_range=short_term",
			{
				headers: {
					Authorization: `Bearer ${accessTokenData.access_token}`,
				},
				next: {
					revalidate: 3000,
				},
			}
		);

		return data?.items?.map((entry: any) => ({
			id: entry.id,
			name: entry.name.includes("(")
				? entry.name.split("(")[0].trim()
				: entry.name,
			image: entry.album.images[0]?.url,
			previewUrl: entry.preview_url,
			artists: entry.artists.map((artist: any) => artist.name),
		})) as Song[];
	} catch (error) {
		throw error;
	}
}
