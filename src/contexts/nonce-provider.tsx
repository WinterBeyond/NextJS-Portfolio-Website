"use client";

import { createContext, ReactNode, useContext } from "react";

type NonceContextType = {
  nonce?: string;
};

const NonceContext = createContext<NonceContextType | undefined>(undefined);

type NonceProviderProps = {
  nonce?: string;
  children: ReactNode;
};

export function NonceProvider({ nonce, children }: NonceProviderProps) {
  return <NonceContext.Provider value={{ nonce }}>{children}</NonceContext.Provider>;
}

export function useNonce() {
  const context = useContext(NonceContext);
  if (!context) throw new Error("useNonce must be used within a NonceProvider");
  return context.nonce;
}
