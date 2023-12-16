export type CharacterName = "Gray" | "White" | "White Top" | "White Bottom";
export type CharacterUnicode = "░" | "█" | "▀" | "▄";
export type CharacterNameToUnicode = Record<CharacterName, CharacterUnicode>;
export type CharacterUnicodeToName = Record<CharacterUnicode, CharacterName>;
export type Grid = CharacterUnicode[];

export const CharacterNamesToUnicodes: CharacterNameToUnicode = {
	Gray: "░",
	White: "█",
	"White Top": "▀",
	"White Bottom": "▄",
};

export const CharacterUnicodesToNames: CharacterUnicodeToName = {
	"░": "Gray",
	"█": "White",
	"▀": "White Top",
	"▄": "White Bottom"
};

export const CharacterTuple: [CharacterName, CharacterUnicode][] = [
	[CharacterUnicodesToNames["░"], CharacterNamesToUnicodes.Gray],
	[CharacterUnicodesToNames["█"], CharacterNamesToUnicodes.White],
	[CharacterUnicodesToNames["▀"], CharacterNamesToUnicodes["White Top"]],
	[CharacterUnicodesToNames["▄"], CharacterNamesToUnicodes["White Bottom"]],
];

export const MAX_HEIGHT = 13;
export const MAX_WIDTH = 26, STRETCHED_MAX_WIDTH = 27;

export function generateGridTemplate(): Grid {
	return new Array(MAX_HEIGHT * MAX_WIDTH).fill("░");
}

export function generateText(grid: Grid, isStretched = false): string {
	const width = isStretched ? STRETCHED_MAX_WIDTH : MAX_WIDTH;
	const rowCount = Math.ceil(grid.length / width);

	let text = "";
	for (let i = 0; i < rowCount; i++) {
		const row = grid.slice(i * width, (i + 1) * width);
		text += row.join('') + "\n";
	}

	return text.slice(0, -1);
};
