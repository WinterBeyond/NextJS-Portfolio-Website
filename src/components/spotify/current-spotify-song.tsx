"use client";

import { useEffect, useMemo, useState } from "react";

import { useSpotifySongContext } from "@/contexts/spotify-song-context";
import { cn } from "@/lib/common";

import SpotifySong from "./spotify-song";

export default function CurrentSpotifySong() {
  const [isInitial, setIsInitial] = useState(false);
  const [isInactive, setIsInactive] = useState(false);
  const { currentSong } = useSpotifySongContext();

  const isPaused = useMemo(
    () => !!currentSong?.state.paused,
    [currentSong?.state.paused],
  );

  useEffect(() => {
    if (!currentSong) return;
    if (!isInitial && !isPaused) {
      setIsInitial(true);
      setIsInactive(false);
    }
  }, [currentSong, isInitial, isPaused]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isPaused)
      timeout = setTimeout(() => {
        setIsInitial(false);
        setIsInactive(true);
      }, 10_000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isPaused]);

  return (
    <div
      className={cn(
        "slide-initial fixed bottom-0 left-1/2 z-20 w-full max-w-5xl text-white md:bottom-10",
        isInitial && "slide-up",
        isInactive && "slide-down",
        !currentSong && "pointer-events-none opacity-0",
      )}
    >
      <SpotifySong song={currentSong} extended />
    </div>
  );
}
