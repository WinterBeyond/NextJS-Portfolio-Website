"use client";

import { AudioState } from "@/lib/models/audo-state";
import Song from "@/lib/models/song";
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

type StatefulSong = Song & {
	state: AudioState;
};

type SongTimePlayed = { [songId: string]: number };

type SpotifySongContextData = {
	songs: StatefulSong[];
	registerSong?: (newSong: Song) => void;
	currentSong?: StatefulSong;
	timePlayed?: SongTimePlayed;
	setCurrentSongId?: Dispatch<SetStateAction<string | undefined>>;
};

const SpotifySongContext = createContext<SpotifySongContextData>({
	songs: [],
});

type SpotifySongProviderProps = {
	children: ReactNode;
} & Omit<SpotifySongContextData, "songs">;

export default function SpotifySongProvider({
	children,
}: SpotifySongProviderProps) {
	const [songs, setSongs] = useState<StatefulSong[]>([]);
	const [currentSongId, setCurrentSongId] = useState<string>();
	const [timePlayed, setTimePlayed] = useState<SongTimePlayed>({});
	const currentSong = useMemo(
		() => songs.find((s) => s.id === currentSongId),
		[songs, currentSongId]
	);

	const registerSong = useCallback(
		(newSong: Song) =>
			setSongs((previousSongs) => {
				if (previousSongs.some((song) => song.id === newSong.id))
					return previousSongs;
				return [
					...previousSongs,
					{
						...newSong,
						state: {
							audio: new Audio(newSong.previewUrl),
							paused: true,
						},
					},
				];
			}),
		[]
	);

	const updatePlayedAmount = useCallback(() => {
		if (!currentSong) return;

		const audio = currentSong.state.audio;
		if (!audio) return;

		setTimePlayed((previousTimePlayed) => ({
			...previousTimePlayed,
			[currentSong.id]: (audio.currentTime / audio.duration) * 100,
		}));
	}, [currentSong]);

	const setAudioPaused = useCallback(
		(paused: boolean, ended: boolean = false) => {
			if (!currentSong) return;

			setSongs((previousSongs) => {
				const newSongs = [...previousSongs];
				const songIndex = newSongs.findIndex(
					(song) => song.id === currentSong.id
				);

				if (songIndex === -1) return previousSongs;

				if (ended) newSongs[songIndex].state.audio!.currentTime = 0;
				newSongs[songIndex].state = {
					...newSongs[songIndex].state,
					paused,
				};

				return newSongs;
			});
		},
		[currentSong]
	);

	const onAudioPlay = useCallback(
		() => setAudioPaused(false),
		[setAudioPaused]
	);

	const onAudioPause = useCallback(
		() => setAudioPaused(true),
		[setAudioPaused]
	);

	const onAudioEnded = useCallback(() => {
		setAudioPaused(true, true);
	}, [setAudioPaused]);

	useEffect(() => {
		if (!currentSong || !currentSong.state.audio) return;

		currentSong.state.audio.addEventListener("play", onAudioPlay);
		currentSong.state.audio.addEventListener("pause", onAudioPause);
		currentSong.state.audio.addEventListener("ended", onAudioEnded);

		updatePlayedAmount();
		currentSong.state.audio.play();

		return () => {
			currentSong.state.audio?.pause();
			currentSong.state.audio?.removeEventListener("play", onAudioPlay);
			currentSong.state.audio?.removeEventListener("pause", onAudioPause);
			currentSong.state.audio?.removeEventListener("ended", onAudioEnded);
		};
	}, [
		currentSong,
		onAudioPlay,
		onAudioPause,
		onAudioEnded,
		updatePlayedAmount,
	]);

	useEffect(() => {
		const audio = currentSong?.state.audio;
		if (audio) {
			audio.addEventListener("timeupdate", updatePlayedAmount);
			return () => {
				audio.removeEventListener("timeupdate", updatePlayedAmount);
			};
		}
	}, [currentSong, updatePlayedAmount]);

	return (
		<SpotifySongContext.Provider
			value={{
				songs,
				registerSong,
				currentSong,
				timePlayed,
				setCurrentSongId,
			}}
		>
			{children}
		</SpotifySongContext.Provider>
	);
}

export const useSpotifySongContext = () => useContext(SpotifySongContext);
