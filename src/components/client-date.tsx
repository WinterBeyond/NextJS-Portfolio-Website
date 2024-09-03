"use client";

import { useEffect, useState } from "react";

type RenderMode = "date" | "time" | "datetime" | "year";

type ClientProps = {
  date: Date | string | number;
  locale?: Intl.LocalesArgument;
  options?: Intl.DateTimeFormatOptions;
  mode?: RenderMode;
};

export default function ClientDate({
  date,
  locale,
  options,
  mode = "datetime",
}: ClientProps) {
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    const parsedDate = new Date(date);
    if (mode === "time")
      setDateString(parsedDate.toLocaleTimeString(locale, options));
    else if (mode === "date")
      setDateString(parsedDate.toLocaleDateString(locale, options));
    else if (mode === "year")
      setDateString(parsedDate.getFullYear().toString());
    else setDateString(parsedDate.toLocaleString(locale, options));
  }, [date, locale, options, mode]);

  return dateString;
}
