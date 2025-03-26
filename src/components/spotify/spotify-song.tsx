"use client";

import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useCallback, useEffect, useMemo } from "react";

import PauseIcon from "@/components/icons/pause-icon";
import PlayIcon from "@/components/icons/play-icon";
import { useSpotifySongContext } from "@/contexts/spotify-song-context";
import { Song } from "@/entities/song";
import { cn } from "@/lib/common";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import SpotifySongSkeleton from "./spotify-song-skeleton";

type SpotifySongProps = {
  song?: Song;
  extended?: boolean;
};

function formatTime(timeInSeconds: number): string {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

const listFormat = new Intl.ListFormat();

export default function SpotifySong({ song, extended }: SpotifySongProps) {
  const { songs, registerSong, currentSong, timePlayed, setCurrentSongId } =
    useSpotifySongContext();

  const togglePreviewAudio = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const statefulSong = songs.find((s) => s.id === song?.id);

      // Song is not registered
      if (!statefulSong || !statefulSong.state.audio) return;

      // Playback is not ready yet
      if (statefulSong.state.audio.readyState < 3) return;

      // Another or no song is playing
      if (song?.id !== currentSong?.id) {
        try {
          currentSong?.state.audio?.pause();
        } catch {
          // Ignore
        }

        setCurrentSongId?.(song?.id);
      } else {
        if (currentSong?.state.paused) currentSong?.state.audio?.play();
        else currentSong?.state.audio?.pause();
      }
    },
    [
      songs,
      currentSong?.id,
      currentSong?.state.paused,
      currentSong?.state.audio,
      setCurrentSongId,
      song,
    ],
  );

  useEffect(() => {
    if (extended || !song) return;
    registerSong?.(song);
  }, [registerSong, song, extended]);

  const isPaused = useMemo(
    () => currentSong?.id !== song?.id || currentSong?.state.paused,
    [currentSong?.id, currentSong?.state.paused, song?.id],
  );

  if (!song) return <SpotifySongSkeleton />;

  return (
    <Link
      className={cn(
        "group/song bg-opacity-30 flex flex-col justify-center rounded-xl border border-neutral-700 bg-neutral-900 bg-clip-padding p-3 backdrop-blur-lg backdrop-filter hover:z-50 hover:border-green-500",
        extended && "w-full gap-y-4",
      )}
      href={`https://open.spotify.com/track/${song.id}`}
      target="_blank"
      prefetch={false}
    >
      <div
        className={cn(
          "flex items-center justify-center gap-x-5",
          extended && "flex-col md:flex-row",
        )}
      >
        {song.image && (
          <Image
            src={song.image}
            alt={`${song.name} preview`}
            className="rounded-xl"
            width={60}
            height={60}
          />
        )}
        <div
          className={cn(
            "flex w-full justify-between",
            extended &&
              "flex-col items-center justify-center gap-x-8 gap-y-4 text-center md:flex-row md:justify-between md:text-left",
          )}
        >
          <div className="flex flex-col">
            <label className="cursor-pointer font-bold text-white group-hover/song:text-green-500">
              {song.name}
            </label>
            <span className="text-sm font-semibold text-gray-200">
              {listFormat.format(song.artists)}
            </span>
          </div>
          {extended && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400">
                {formatTime(currentSong?.state.audio?.currentTime ?? 0)}
              </span>
              <div
                className="h-1 w-48 rounded-md bg-gray-200 md:w-96"
                key={`playback-time-${song.id}`}
              >
                <div
                  className={cn(
                    "h-1 rounded-md bg-green-500",
                    (timePlayed?.[song.id] ?? 0) >= 1 &&
                      "transition-all duration-1000 ease-linear",
                  )}
                  style={{
                    width: `${timePlayed?.[song.id] ?? 0}%`,
                  }}
                />
              </div>
              <span className="text-gray-400">
                {formatTime(currentSong?.state.audio?.duration ?? 0)}
              </span>
            </div>
          )}
          {song.previewUrl && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="group/audiopreview relative cursor-pointer"
                    onClick={togglePreviewAudio}
                    aria-label={`${
                      isPaused ? "Play Audio Preview" : "Pause Audio Preview"
                    } for ${song.name}`}
                  >
                    {isPaused ? <PlayIcon /> : <PauseIcon />}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {isPaused ? "Play Audio Preview" : "Pause Audio Preview"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </Link>
  );
}
