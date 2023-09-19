import getTopMonthlySongs from "@/lib/getTopMonthlySongs";
import SpotifySong from "@/components/spotify/SpotifySong";

export default async function SpotifySongGrid() {
	let songs, hasError;
	try {
		songs = await getTopMonthlySongs();
	} catch (error) {
		hasError = true;
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
			{hasError ? (
				<span className="text-lg text-red-500 font-bold">
					Unable to fetch songs!
				</span>
			) : (
				<>
					{songs?.map((song) => (
						<SpotifySong key={song.id} song={song} />
					))}
				</>
			)}
		</div>
	);
}
