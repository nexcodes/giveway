"use client";

import { LanguagesType } from "@/types/language";
import React, { createContext, useEffect, useState } from "react";

interface LanguageContextProps {
  language: LanguagesType;
  setLanguage: React.Dispatch<React.SetStateAction<LanguagesType>>;
  changeLanguage: (language: LanguagesType) => void;
}

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageContext = createContext<LanguageContextProps>({
  language: "English",
  setLanguage: () => {},
  changeLanguage: () => {},
});

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<LanguagesType>("English");

  useEffect(() => {
    const language = localStorage.getItem("language") as LanguagesType;
    if (!language) return;

    setLanguage(language);
  }, []);

  const changeLanguage = (language: LanguagesType) => {
    localStorage.setItem("language", language);
    setLanguage(language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
