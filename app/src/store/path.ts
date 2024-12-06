import { create } from "zustand";

interface PathState {
    path: string;
    setPath: (p: string) => void;
}

export const usePath = create<PathState>(set => ({
    path: "resources",
    setPath: p => set(() => ({ path: p }))
}));
