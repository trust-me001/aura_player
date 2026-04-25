import { create } from "zustand";

type Theme = "dark" | "light";

interface ThemeState {
  theme: Theme;
  accent: string;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
  setAccent: (c: string) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: (typeof window !== "undefined" && localStorage.getItem("theme") as Theme) || "dark",
  accent: (typeof window !== "undefined" && localStorage.getItem("accent")) || "#1db954",
  toggleTheme: () =>
    set((s) => {
      const next = s.theme === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") localStorage.setItem("theme", next);
      return { theme: next };
    }),
  setTheme: (t) => {
    if (typeof window !== "undefined") localStorage.setItem("theme", t);
    set({ theme: t });
  },
  setAccent: (c) => {
    if (typeof window !== "undefined") localStorage.setItem("accent", c);
    set({ accent: c });
  },
}));
