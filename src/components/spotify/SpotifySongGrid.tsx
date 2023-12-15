import getTopMonthlySongs from "@/lib/getTopMonthlySongs";
import dynamic from "next/dynamic";

const SpotifySong = dynamic(() => import("@/components/spotify/SpotifySong"), {
	ssr: false,
});

export default async function SpotifySongGrid() {
	const songs = await getTopMonthlySongs();
	return (
		<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{songs.map((song) => (
				<SpotifySong key={song.id} song={song} />
			))}
		</div>
	);
}
