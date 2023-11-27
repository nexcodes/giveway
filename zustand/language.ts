import { LanguagesType } from "@/types/language";
import { create } from "zustand";

type LanguageStore = {
  language: LanguagesType;
  setLanguage: (language: LanguagesType) => void;
};

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: "English",
  setLanguage: (language) => set({ language }),
}));
