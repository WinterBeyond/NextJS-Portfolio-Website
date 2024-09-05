import { getTopMonthlySongs } from "@/data-layer/spotify";
import dynamic from "next/dynamic";

const SpotifySong = dynamic(() => import("@/components/spotify/spotify-song"), {
  ssr: false,
});

export default async function SpotifySongGrid() {
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
}
