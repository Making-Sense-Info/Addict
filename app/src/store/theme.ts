import { create } from "zustand";

interface ThemeState {
    theme: "dark" | "light";
    setTheme: (p: "dark" | "light") => void;
}

export const useTheme = create<ThemeState>(set => ({
    theme: "dark",
    setTheme: t => set(() => ({ theme: t }))
}));
