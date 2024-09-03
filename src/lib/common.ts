import { clsx, type ClassValue } from "clsx";
import crypto from "crypto";
import { twMerge } from "tailwind-merge";

export function cn(...classNames: ClassValue[]) {
  return twMerge(clsx(...classNames));
}

export function generateRandomString(length: number) {
  return crypto.randomBytes(length).toString("hex");
}

export function getParsedNumberOrDefault(
  str: string | null = "",
  defaultValue: number,
  minimumValue?: number,
) {
  const parsedNumber = parseInt(str ?? "");
  return isNaN(parsedNumber)
    ? defaultValue
    : minimumValue && parsedNumber < minimumValue
      ? minimumValue
      : parsedNumber;
}
