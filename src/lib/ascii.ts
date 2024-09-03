export type CharacterName =
  | "Gray"
  | "White"
  | "White Top"
  | "White Bottom"
  | "White Left"
  | "White Right";

export type CharacterUnicode = "░" | "█" | "▀" | "▄" | "▌" | "▐";
export type CharacterNameToUnicode = Record<CharacterName, CharacterUnicode>;
export type CharacterUnicodeToName = Record<CharacterUnicode, CharacterName>;
export type Grid = CharacterUnicode[];

export const CharacterNamesToUnicodes: CharacterNameToUnicode = {
  Gray: "░",
  White: "█",
  "White Top": "▀",
  "White Bottom": "▄",
  "White Left": "▌",
  "White Right": "▐",
};

export const CharacterUnicodesToNames: CharacterUnicodeToName = {
  "░": "Gray",
  "█": "White",
  "▀": "White Top",
  "▄": "White Bottom",
  "▌": "White Left",
  "▐": "White Right",
};

export const CharacterTuple: [CharacterName, CharacterUnicode][] = [
  [CharacterUnicodesToNames["░"], CharacterNamesToUnicodes.Gray],
  [CharacterUnicodesToNames["█"], CharacterNamesToUnicodes.White],
  [CharacterUnicodesToNames["▀"], CharacterNamesToUnicodes["White Top"]],
  [CharacterUnicodesToNames["▄"], CharacterNamesToUnicodes["White Bottom"]],
  [CharacterUnicodesToNames["▌"], CharacterNamesToUnicodes["White Left"]],
  [CharacterUnicodesToNames["▐"], CharacterNamesToUnicodes["White Right"]],
];

export const MAX_HEIGHT = 13;
export const MAX_WIDTH = 26,
  STRETCHED_MAX_WIDTH = 27;

export function generateGridTemplate(
  height: number,
  isStretched = false,
): Grid {
  return new Array(
    height * (isStretched ? STRETCHED_MAX_WIDTH : MAX_WIDTH),
  ).fill("░");
}

export function generateGridTemplateFromClipboard(
  text: string,
  height: number,
  isStretched = false,
): Grid {
  text = text.replace(/\s/g, "");
  const grid = new Array(
    height * (isStretched ? STRETCHED_MAX_WIDTH : MAX_WIDTH),
  ).fill("░");
  for (let i = 0, len = text.length; i < len; i++) {
    if (i >= grid.length) break;
    if (Object.keys(CharacterUnicodesToNames).includes(text[i]))
      grid[i] = text[i];
  }
  return grid;
}

export function generateGridRow(isStretched = false): Grid {
  return generateGridTemplate(1, isStretched);
}

export function generateText(grid: Grid, isStretched = false): string {
  const width = isStretched ? STRETCHED_MAX_WIDTH : MAX_WIDTH;
  const rowCount = Math.ceil(grid.length / width);

  let text = "";
  for (let i = 0; i < rowCount; i++) {
    const row = grid.slice(i * width, (i + 1) * width);
    text += row.join("") + "\n";
  }

  return text.slice(0, -1);
}
