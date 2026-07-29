"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import LenisProvider from "@/components/providers/LenisProvider";

interface GlobalContextType {
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  cursorType: string;
  setCursorType: (val: string) => void;
  cursorLabel: string;
  setCursorLabel: (val: string) => void;
  navOpen: boolean;
  setNavOpen: (val: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function Providers({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [cursorType, setCursorType] = useState("default");
  const [cursorLabel, setCursorLabel] = useState("");
  const [navOpen, setNavOpen] = useState(false);

  // Stop body scroll when loader or nav is active
  useEffect(() => {
    if (isLoading || navOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading, navOpen]);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setIsLoading,
        cursorType,
        setCursorType,
        cursorLabel,
        setCursorLabel,
        navOpen,
        setNavOpen,
      }}
    >
      <LenisProvider>
        {children}
      </LenisProvider>
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a Providers wrapper");
  }
  return context;
}
