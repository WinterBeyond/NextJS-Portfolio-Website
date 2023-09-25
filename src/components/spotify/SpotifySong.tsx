"use client";

import { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Song from "@/lib/models/song";
import PauseIcon from "@/components/icons/PauseIcon";
import PlayIcon from "@/components/icons/PlayIcon";
import Tooltip from "@/components/Tooltip";

type SpotifySongProps = {
	song: Song;
};

type AudioState = {
	audio?: HTMLAudioElement;
	paused: boolean;
};

export default function SpotifySong({ song }: SpotifySongProps) {
	const [audioState, setAudioState] = useState<AudioState>();
	const listFormat = new Intl.ListFormat();

	const onAudioPlay = () => {
		setAudioState((previousAudioState) => ({
			...previousAudioState,
			paused: false,
		}));
	};

	const onAudioPause = () => {
		setAudioState((previousAudioState) => ({
			...previousAudioState,
			paused: true,
		}));
	};

	useEffect(() => {
		const audio = new Audio(song.previewUrl);

		setAudioState({
			audio,
			paused: true,
		});

		audio.addEventListener("play", onAudioPlay);
		audio.addEventListener("pause", onAudioPause);

		return () => {
			audio.removeEventListener("play", onAudioPlay);
			audio.removeEventListener("pause", onAudioPause);
		};
	}, [song.previewUrl]);

	const togglePreviewAudio = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		try {
			if (audioState?.paused) audioState?.audio?.play();
			else audioState?.audio?.pause();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Link
			className="group/song flex items-center justify-center gap-x-5 rounded-xl border border-neutral-700 bg-neutral-900 bg-opacity-30 bg-clip-padding p-3 backdrop-blur-lg backdrop-filter hover:z-50 hover:border-green-500"
			href={`https://open.spotify.com/track/${song.id}`}
			target="_blank"
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
			<div className="flex w-full justify-between">
				<div className="flex flex-col">
					<label className="font-bold text-white group-hover/song:text-green-500">
						{song.name}
					</label>
					<span className="text-sm font-semibold text-gray-200">
						{listFormat.format(song.artists)}
					</span>
				</div>
				<button
					className="group/audiopreview relative"
					onClick={(e) => togglePreviewAudio(e)}
					aria-label={`${
						audioState?.paused
							? "Play Audio Preview"
							: "Pause Audio Preview"
					} for ${song.name}`}
				>
					{audioState &&
						(audioState.paused ? <PlayIcon /> : <PauseIcon />)}
					<Tooltip
						visibleClass="group-hover/audiopreview:block"
						text={
							audioState?.paused
								? "Play Audio Preview"
								: "Pause Audio Preview"
						}
					/>
				</button>
			</div>
		</Link>
	);
}
