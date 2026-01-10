"use client";

import { useEffect, useState } from "react";

export default function useDevice() {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile" | undefined>();

  useEffect(() => {
    const tabletMediaQuery = window.matchMedia("(min-width: 640px)");
    const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");

    const updateDevice = () => {
      if (desktopMediaQuery.matches) setDevice("desktop");
      else if (tabletMediaQuery.matches) setDevice("tablet");
      else setDevice("mobile");
    };

    updateDevice();
    tabletMediaQuery.addEventListener("change", updateDevice);
    desktopMediaQuery.addEventListener("change", updateDevice);

    return () => {
      tabletMediaQuery.removeEventListener("change", updateDevice);
      desktopMediaQuery.removeEventListener("change", updateDevice);
    };
  }, []);

  return device;
}
