import Link from "next/link";
import SpotifyIcon from "@/components/icons/SpotifyIcon";
import Tooltip from "@/components/Tooltip";

export default function SpotifySocial() {
	return (
		<Link
			className="group/social relative"
			href="https://open.spotify.com/user/4lcnka5zo2n9bbwqcmzao4ppi/"
			target="_blank"
			aria-label="Spotify"
		>
			<SpotifyIcon />
			<Tooltip
				visibleClass="group-hover/social:block"
				text="WinterBeyond"
			/>
		</Link>
	);
}
