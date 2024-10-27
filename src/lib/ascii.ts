import { CharacterToGridMapping } from "./characters";

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

export const MAX_HEIGHT = 17;
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

export function generateGridTemplateFromText(
  text: string,
  height: number,
  isStretched = false,
): Grid {
  text = text.replace(/\s/g, "");
  const width = isStretched ? STRETCHED_MAX_WIDTH : MAX_WIDTH;
  const grid = new Array(height * width).fill("░");

  let currentRow = 0;
  let currentCol = 0;

  for (const char of text.split("")) {
    const charGrid = CharacterToGridMapping[char.toUpperCase()] || [];
    const charWidth = charGrid[0]?.length || 0;
    const charHeight = charGrid.length;

    // Check if the character fits in the current row
    if (currentCol + charWidth > width) {
      currentRow += charHeight + 1; // Move to the next row and add a blank line
      currentCol = 0;
    }

    // Place the character in the grid
    for (let row = 0; row < charHeight; row++) {
      for (let col = 0; col < charWidth; col++) {
        const gridIndex = (currentRow + row) * width + (currentCol + col);
        if (gridIndex < grid.length) {
          grid[gridIndex] = charGrid[row][col];
        }
      }
    }

    // Add a blank line (gray character) after each letter
    currentCol += charWidth + 1;
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
