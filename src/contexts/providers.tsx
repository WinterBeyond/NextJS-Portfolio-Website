import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

import SpotifySongProvider from "./spotify-song-context";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <SpotifySongProvider>
      <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
    </SpotifySongProvider>
  );
}
