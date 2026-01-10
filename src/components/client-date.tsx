"use client";

import { useMemo } from "react";

type RenderMode = "date" | "time" | "datetime" | "year" | "month";

type ClientProps = {
  date: Date | string | number;
  locale?: Intl.LocalesArgument;
  options?: Intl.DateTimeFormatOptions;
  mode?: RenderMode;
};

export default function ClientDate({ date, locale, options, mode = "datetime" }: ClientProps) {
  const dateString = useMemo(() => {
    const parsedDate = new Date(date);
    if (mode === "time") return parsedDate.toLocaleTimeString(locale, options);
    else if (mode === "date") return parsedDate.toLocaleDateString(locale, options);
    else if (mode === "year") return parsedDate.getFullYear().toString();
    else if (mode === "month") return parsedDate.toLocaleString(locale, { month: "short", year: "numeric" });
    else return parsedDate.toLocaleString(locale, options);
  }, [date, locale, options, mode]);

  return dateString;
}
