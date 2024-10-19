import dynamic from "next/dynamic";

import { getTopMonthlySongs } from "@/data-layer/spotify";

const SpotifySong = dynamic(() => import("@/components/spotify/spotify-song"));

export default async function SpotifySongGrid() {
  try {
    const songs = await getTopMonthlySongs(12);

    return (
      <div
        id="spotify-songs"
        className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {songs.map((song) => (
          <SpotifySong key={song.id} song={song} />
        ))}
      </div>
    );
  } catch {
    return (
      <span className="text-lg font-bold text-red-500">
        Unable to fetch songs!
      </span>
    );
  }
}
