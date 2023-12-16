"use client";

import {
	CharacterTuple,
	CharacterUnicode,
	CharacterUnicodesToNames,
	MAX_HEIGHT,
	MAX_WIDTH,
	STRETCHED_MAX_WIDTH,
	generateGridTemplate,
	generateText,
} from "@/lib/ascii";
import { useState } from "react";

export default function ValorantChatPage() {
	const [grid, setGrid] = useState(generateGridTemplate());
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [isStretched, setIsStretched] = useState(false);
	const [height, setHeight] = useState(MAX_HEIGHT);
	const [selectedCharacter, setSelectedCharacter] =
		useState<CharacterUnicode>("█");

	const width = isStretched ? STRETCHED_MAX_WIDTH : MAX_WIDTH;

	const getBackgroundColorFromUnicode = (
		characterUnicode: CharacterUnicode
	) => {
		switch (characterUnicode) {
			case "░":
				return "gray";
			case "█":
				return "white";
			case "▀":
				return "linear-gradient(to bottom, black 50%, white 50%)";
			case "▄":
				return "linear-gradient(to bottom, white 50%, black 50%)";
			default:
				return "transparent";
		}
	};

	const handleClick = (index: number) =>
		setGrid((prevGrid) => {
			const newGrid = [...prevGrid];
			newGrid[index] = selectedCharacter;
			return newGrid;
		});

	const handleMouseDown = (index: number) => {
		setIsMouseDown(true);
		handleClick(index);
	};

	const handleMouseUp = () => setIsMouseDown(false);

	const handleMouseOver = (index: number) => {
		if (isMouseDown) handleClick(index);
	};

	const copyText = async () => {
		const text = generateText(grid, isStretched);
		await navigator.clipboard.writeText(text);
	};

	const downloadText = () => {
		const text = generateText(grid, isStretched);
		const blob = new Blob([text], { type: "text/plain" });
		const anchorElement = document.createElement("a");
		anchorElement.href = URL.createObjectURL(blob);
		anchorElement.download = "valorant-ascii-art.txt";
		anchorElement.click();
	};

	return (
		<div className="flex h-screen w-full flex-col items-center justify-center gap-8 p-32">
			<div className="flex flex-col gap-4 text-center text-white">
				<div>
					<h1 className="text-4xl font-bold sm:text-2xl">
						Valorant Chat ASCII Art
					</h1>
					<p className="text-base">
						Click/Drag to create ASCII art for Valorant chat!
					</p>
				</div>
				<div className="flex items-center gap-2">
					<button
						className="rounded-lg bg-blue-600 p-2 text-lg hover:bg-blue-700"
						onClick={copyText}
					>
						Copy Text
					</button>
					<button
						className="rounded-lg bg-green-600 p-2 text-lg hover:bg-green-700"
						onClick={downloadText}
					>
						Download Text
					</button>
					<button
						className="rounded-lg bg-red-500 p-2 text-lg hover:bg-red-600"
						onClick={() => setGrid(generateGridTemplate())}
					>
						Reset
					</button>
				</div>
			</div>
			<div className="flex h-full w-full gap-4">
				<aside className="flex flex-col gap-2">
					{CharacterTuple.map((character) => (
						<button
							key={`selected-character-${character[0]}`}
							className={`rounded-lg p-2 text-lg text-white ${
								selectedCharacter === character[1]
									? "bg-green-700"
									: "bg-neutral-700 hover:bg-green-800"
							}`}
							onClick={() => setSelectedCharacter(character[1])}
						>
							{character[0]}
						</button>
					))}
				</aside>
				<div
					className="hidden w-full lg:grid"
					style={{
						gridTemplateRows: `repeat(${height}, 1fr)`,
						gridTemplateColumns: `repeat(${width}, 1fr)`,
					}}
				>
					{grid.map((characterUnicode, index) => (
						<button
							key={`grid-unicode-${index}`}
							className="border text-xl hover:border-4 hover:border-red-500"
							style={{
								background:
									getBackgroundColorFromUnicode(
										characterUnicode
									),
							}}
							onMouseDown={() => handleMouseDown(index)}
							onMouseUp={handleMouseUp}
							onMouseOver={() => handleMouseOver(index)}
						/>
					))}
				</div>
			</div>
			<p className="font-bold text-red-500 lg:hidden">
				Sorry, Canvas is only available on desktop!
			</p>
		</div>
	);
}
