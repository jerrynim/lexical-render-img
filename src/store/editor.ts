import { create } from "zustand";

interface EditorState {
    isBold: boolean;
    setIsBold: (bool: boolean) => void;
}

export const useEditor = create<EditorState>((set) => ({
    isBold: false,
    setIsBold: (bool: boolean) => set({ isBold: bool }),
}));
