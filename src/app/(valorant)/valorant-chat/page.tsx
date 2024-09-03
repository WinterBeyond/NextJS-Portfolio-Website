"use client";

import {
  CharacterNamesToUnicodes,
  CharacterTuple,
  CharacterUnicode,
  MAX_HEIGHT,
  MAX_WIDTH,
  STRETCHED_MAX_WIDTH,
  generateGridRow,
  generateGridTemplate,
  generateGridTemplateFromClipboard,
  generateText,
} from "@/lib/ascii";
import Link from "next/link";
import { useRef, useState, useCallback } from "react";

export default function ValorantChatPage() {
  const [grid, setGrid] = useState(generateGridTemplate(MAX_HEIGHT));
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isStretched, setIsStretched] = useState(false);
  const [promptText, setPromptText] = useState("");
  const promptTextModalRef = useRef<HTMLDialogElement>(null);
  const [height, setHeight] = useState(MAX_HEIGHT);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterUnicode>(
    CharacterNamesToUnicodes.White,
  );

  const width = isStretched ? STRETCHED_MAX_WIDTH : MAX_WIDTH;

  const getBackgroundColorFromUnicode = (
    characterUnicode: CharacterUnicode,
  ) => {
    switch (characterUnicode) {
      case "░":
        return "gray";
      case "█":
        return "white";
      case "▀":
        return "linear-gradient(to bottom, white 50%, gray 50%)";
      case "▄":
        return "linear-gradient(to top, white 50%, gray 50%)";
      case "▌":
        return "linear-gradient(to right, white 50%, gray 50%)";
      case "▐":
        return "linear-gradient(to left, white 50%, gray 50%)";
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

  const loadClipboardContent = useCallback(
    async (isModal: boolean) => {
      try {
        const text = isModal
          ? promptText
          : await navigator.clipboard.readText();

        if (!text) return;

        promptTextModalRef.current?.close();
        setPromptText("");
        setGrid(generateGridTemplateFromClipboard(text, height, isStretched));
      } catch (error) {
        console.error(error);
        promptTextModalRef.current?.showModal();
      }
    },
    [height, isStretched, promptText],
  );

  const increaseHeight = () => {
    if (height >= MAX_HEIGHT) return;

    setHeight((prev) => prev + 1);
    setGrid((prevGrid) => [...prevGrid, ...generateGridRow(isStretched)]);
  };

  const decreaseHeight = () => {
    if (height <= 1) return;

    setHeight((prev) => prev - 1);
    setGrid((prevGrid) =>
      prevGrid.slice(
        0,
        prevGrid.length - (isStretched ? STRETCHED_MAX_WIDTH : MAX_WIDTH),
      ),
    );
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-8 p-32 xl:px-80">
      <div className="flex flex-col gap-6 text-white">
        <div className="text-center">
          <p className="text-sm text-gray-300">
            Created By:{" "}
            <Link
              className="text-blue-300 underline"
              href="https://tracker.gg/valorant/profile/riot/WinterBeyond%23DEV/overview"
              target="_blank"
              prefetch={false}
            >
              WinterBeyond#DEV
            </Link>
          </p>
          <h1 className="text-4xl font-bold sm:text-2xl">
            Valorant Chat ASCII Art
          </h1>
          <p className="text-base">
            Click/Drag to create ASCII art for Valorant chat!
          </p>
        </div>
        <div className="hidden flex-col items-center gap-2 lg:flex">
          <select
            className="w-full rounded-md border border-gray-500 bg-neutral-600 px-4 py-2 text-base focus:border-blue-500"
            onChange={(e) => {
              const newIsStretched = e.target.value === "stretched";
              setIsStretched(newIsStretched);
              setGrid(generateGridTemplate(height, newIsStretched));
            }}
          >
            <option value="fullhd">Full HD (16:9)</option>
            <option value="stretched">Stretched (4:3)</option>
          </select>
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold">Height: {height}</p>
            <button
              className={`rounded-lg bg-neutral-600 p-2 text-sm hover:bg-neutral-700 ${
                height <= 1 && "opacity-50"
              }`}
              onClick={decreaseHeight}
            >
              -1
            </button>
            <button
              className={`rounded-lg bg-neutral-600 p-2 text-sm hover:bg-neutral-700 ${
                height >= MAX_HEIGHT && "opacity-50"
              }`}
              onClick={increaseHeight}
            >
              +1
            </button>
          </div>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
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
            className="rounded-lg bg-gray-200 p-2 text-lg text-black hover:bg-gray-300"
            onClick={() => loadClipboardContent(false)}
          >
            Load Clipboard
          </button>
          <button
            className="rounded-lg bg-red-500 p-2 text-lg hover:bg-red-600"
            onClick={() => setGrid(generateGridTemplate(height, isStretched))}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="hidden size-full gap-4 lg:flex">
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
          className="grid w-full"
          style={{
            gridTemplateRows: `repeat(${height}, 1fr)`,
            gridTemplateColumns: `repeat(${width}, 1fr)`,
            maxHeight: `${height * 4}rem`,
          }}
          onMouseLeave={handleMouseUp}
        >
          {grid.map((characterUnicode, index) => (
            <button
              key={`grid-unicode-${index}`}
              className="max-h-16 max-w-16 border text-xl hover:border-4 hover:border-red-500"
              style={{
                background: getBackgroundColorFromUnicode(characterUnicode),
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
      <dialog ref={promptTextModalRef} className="w-1/4 bg-transparent">
        <div className="hidden flex-col gap-2 rounded-lg bg-neutral-800 p-4 lg:flex">
          <textarea
            className="h-80 resize-none rounded-lg border border-gray-500 bg-neutral-600 px-4 py-2 text-base text-white outline-none focus:border-blue-500"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
          />
          <div className="flex items-center justify-center gap-2">
            <button
              className="rounded-lg bg-gray-200 px-4 py-2 text-lg text-black hover:bg-gray-300"
              onClick={() => loadClipboardContent(true)}
            >
              Load Clipboard
            </button>
            <button
              className="rounded-lg bg-red-500 px-4 py-2 text-lg text-white hover:bg-red-600"
              onClick={() => {
                promptTextModalRef.current?.close();
                setPromptText("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
