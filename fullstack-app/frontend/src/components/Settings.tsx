import React, { useState, useEffect } from "react";
import Navbar from "./dashboard/Navbar";

const themes = ["light", "dark"];
const languages = ["pl", "en"];
const fontSizes = ["small", "medium", "large"];

const exampleTexts: Record<string, string> = {
  pl: `Przykładowy tekst w języku polskim. Zmień ustawienia, aby zobaczyć różne opcje. Możesz dostosować rozmiar czcionki, motyw kolorystyczny oraz język interfejsu. To jest dłuższy tekst, który pozwala zobaczyć, jak będą wyglądały akapity, nagłówki oraz zwykłe notatki w Twojej aplikacji. Dzięki temu możesz łatwiej wybrać ustawienia, które będą dla Ciebie najwygodniejsze podczas codziennego korzystania z aplikacji do notatek.`,
  en: `Sample text in English. Change settings to see different options. You can adjust the font size, color theme, and interface language. This is a longer text that lets you see how paragraphs, headings, and regular notes will look in your app. This way, you can easily choose the settings that are most comfortable for you when using the notes app every day.`
};

const translations = {
  en: {
    settings: "Settings",
    customize: "Customize your experience",
    theme: "Theme",
    language: "Language",
    fontSize: "Font Size",
    preview: "Preview",
  },
  pl: {
    settings: "Ustawienia",
    customize: "Dostosuj swoje doświadczenie",
    theme: "Motyw",
    language: "Język",
    fontSize: "Rozmiar czcionki",
    preview: "Podgląd",
  }
};

const Settings: React.FC = () => {
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light");
  const [language, setLanguage] = useState<string>(localStorage.getItem("language") || "en");
  const [fontSize, setFontSize] = useState<string>(localStorage.getItem("fontSize") || "medium");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
    let fontSizeValue = "16px";
    if (fontSize === "small") {
      fontSizeValue = "14px";
    } else if (fontSize === "large") {
      fontSizeValue = "18px";
    }
    document.documentElement.style.fontSize = fontSizeValue;
  }, [fontSize]);

  return (
    <div className="min-vh-100">
      <Navbar />
      <div className="container py-5">
        <div className="card shadow mx-auto">
          <h1 className="card-title text-center mb-4" style={{ color: "white" }}>
            {translations[language].settings}
          </h1>
          <p className="text-center" style={{ color: "white" }}>
            {translations[language].customize}
          </p>
          <div className="card-body d-flex flex-row gap-4 align-items-start">
            <form className="mt-2" style={{ width: "40%" }}>
              <div className="mb-3 text-start">
                <label htmlFor="theme-select" className="form-label">
                  {translations[language].theme} :
                </label>
                <select
                  className="form-select"
                  id="theme-select"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  style={{ maxWidth: 420 }}
                >
                  {themes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="language-select" className="form-label">
                  {translations[language].language} :
                </label>
                <select 
                  className="form-select"
                  id="language-select"
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{ maxWidth: 420 }}
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="fontSize-select" className="form-label">
                  {translations[language].fontSize} :
                </label>
                <select
                  className="form-select"
                  id="fontSize-select"
                  value={fontSize} 
                  onChange={(e) => setFontSize(e.target.value)}
                  style={{ maxWidth: 420 }}
                >
                  {fontSizes.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </form>
            <div className="mt-1" style={{ width: "60%" }}>
              <div className="mb-2 text-start" style={{ color: "white" }}>
                {translations[language].preview} :
              </div>
              <div
                className="form-control"
                style={{
                  background: "var(--note-bg)",
                  color: "var(--note-color)",
                  fontSize: fontSize === "small" ? 14 : fontSize === "large" ? 20 : 16,
                  minHeight: 60,
                  border: "none",
                  borderRadius: 8,
                }}
              >
                {exampleTexts[language]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;