import React, { createContext, useContext, useEffect, useState } from "react";
import { loadTheme, saveTheme } from "../storage";

type SettingsContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    (async () => {
      const t = await loadTheme();
      if (t) setTheme(t);
    })();
  }, []);

  useEffect(() => void saveTheme(theme), [theme]);

  const toggleTheme = () => setTheme(t => (t === "light" ? "dark" : "light"));

  return <SettingsContext.Provider value={{ theme, toggleTheme }}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
