"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

import { useSiteConfig } from "./site-config-provider";

export type CookieConsent = "accepted" | "rejected" | "unset" | undefined;

type CookieConsentContextType = {
  consent: CookieConsent;
  setConsent: (consent: CookieConsent) => void;
  getPromptConsentComponent: (theme?: string) => ReactNode;
};

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

type CookieConsentProviderProps = {
  children: ReactNode;
};

const ESSENTIAL_COOKIES: Array<string> = [];

export function readCookieConsent(): CookieConsent | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )cookieConsent=([^;]*)/);
  const stored = match ? decodeURIComponent(match[1]) : null;

  switch (stored) {
    case "accepted":
    case "rejected":
    case "unset":
      break;
    default: {
      recallCookieConsent();
      return null;
    }
  }

  return stored;
}

function recallCookieConsent() {
  const cookies = document.cookie.split(";");
  const hostname = window.location.hostname;
  const domain = hostname.startsWith("www.") ? hostname.substring(4) : hostname;

  for (const cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();

    if (ESSENTIAL_COOKIES.includes(name)) continue;

    const deletionConfigs = [
      `${name}=; path=/; max-age=0`,
      `${name}=; path=/; domain=${hostname}; max-age=0`,
      `${name}=; path=/; domain=.${domain}; max-age=0`,
      `${name}=; path=/; secure; samesite=Strict; max-age=0`,
      `${name}=; path=/; domain=${hostname}; secure; samesite=Strict; max-age=0`,
      `${name}=; path=/; domain=.${domain}; secure; samesite=Strict; max-age=0`,
    ];

    deletionConfigs.forEach((config) => {
      document.cookie = config;
    });
  }
}

export function CookieConsentProvider({ children }: CookieConsentProviderProps) {
  const [consent, setConsentState] = useState<CookieConsent>(() => {
    const stored = readCookieConsent();
    if (stored === "accepted" || stored === "rejected" || stored == null) return stored == null ? "unset" : stored;
    return undefined;
  });

  useEffect(() => {
    console.debug(`Cookie consent state: ${consent}`);
  }, [consent]);

  const setConsent = useCallback((value: CookieConsent) => {
    setConsentState(value);
    if (typeof document !== "undefined" && !!value) {
      if (value === "unset") recallCookieConsent();
      else
        document.cookie = `cookieConsent=${encodeURIComponent(
          value,
        )}; secure; path=/; samesite=Strict; max-age=15768000`;
    }
  }, []);

  const getPromptConsentComponent = (theme?: string) => {
    return <div></div>;
  };

  return (
    <CookieConsentContext.Provider value={{ consent, setConsent, getPromptConsentComponent }}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  return context;
}
