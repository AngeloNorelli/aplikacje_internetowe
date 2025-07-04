import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type Theme = "dark" | "light";
type FontSize = "small" | "medium" | "large";
type Language = "en" | "pl";

type Settings = {
  theme: Theme;
  fontSize: FontSize;
  language: Language;
  setTheme: (theme: Theme) => void;
  setFontSize: (size: FontSize) => void;
  setLanguage: (lang: Language) => void;
};

const defaultSettings: Settings = {
  theme: "dark",
  fontSize: "medium",
  language: "en",
  setTheme: () => {},
  setFontSize: () => {},
  setLanguage: () => {},
};

const SettingsContext = createContext<Settings>(defaultSettings);

export const useSettings = () => useContext(SettingsContext);

const getSettingsFromToken = (): { theme: Theme; fontSize: FontSize; language: Language } => {
  const token = localStorage.getItem("token");
  if (!token) return { theme: "dark", fontSize: "medium", language: "en" };
  try {
    const decoded: any = jwtDecode(token);
    return {
      theme: decoded.theme || "dark",
      fontSize: decoded.font_size || "large",
      language: decoded.language || "en",
    };
  } catch {
    return { theme: "dark", fontSize: "large", language: "en" };
  }
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initial = getSettingsFromToken();
  const [theme, setTheme] = useState<Theme>(initial.theme);
  const [fontSize, setFontSize] = useState<FontSize>(initial.fontSize);
  const [language, setLanguage] = useState<Language>(initial.language);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    const interval = setInterval(() => {
      const { theme: t, fontSize: f, language: l } = getSettingsFromToken();
      setTheme(prev => prev !== t ? t : prev);
      setFontSize(prev => prev !== f ? f : prev);
      setLanguage(prev => prev !== l ? l : prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SettingsContext.Provider value={{ theme, fontSize, language, setTheme, setFontSize, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
};