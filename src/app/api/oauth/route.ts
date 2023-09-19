import generateRandomString from "@/lib/generateRandomString";
import getSpotifyAccessToken from "@/lib/getSpotifyAccessToken";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const state = generateRandomString(16);
	const scope = "user-top-read";

	const searchParams = req.nextUrl.searchParams;
	const code = searchParams.get("code");
	if (!code)
		return NextResponse.redirect(
			`https://accounts.spotify.com/authorize?${new URLSearchParams({
				response_type: "code",
				client_id: process.env.SPOTIFY_OAUTH_CLIENT_ID as string,
				scope,
				redirect_uri: process.env.SPOTIFY_OAUTH_REDIRECT_URI as string,
				state,
			})}`
		);

	try {
		const accessTokenData = await getSpotifyAccessToken(code.toString());
		console.log(accessTokenData);

		return NextResponse.json({
			message: "OAuth has successfully been granted!",
		});
	} catch (error: any) {
		return NextResponse.json(
			{ message: error.message },
			{
				status: 500,
			}
		);
	}
}
