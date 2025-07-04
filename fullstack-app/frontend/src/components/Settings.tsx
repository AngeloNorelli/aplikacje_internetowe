import React, { useState, useEffect } from "react";
import Navbar from "./dashboard/Navbar";
import { useSettings } from "../context/SettingsContext";
import translations from "../assets/translations";
import { updateSettings } from "../api/settings";
import { useToast } from "../context/ToastContext";

const languages = ["pl", "en"];

const exampleTexts: Record<string, string> = {
  pl: `Przykładowy tekst w języku polskim. Zmień ustawienia, aby zobaczyć różne opcje. Możesz dostosować rozmiar czcionki, motyw kolorystyczny oraz język interfejsu. To jest dłuższy tekst, który pozwala zobaczyć, jak będą wyglądały akapity, nagłówki oraz zwykłe notatki w Twojej aplikacji. Dzięki temu możesz łatwiej wybrać ustawienia, które będą dla Ciebie najwygodniejsze podczas codziennego korzystania z aplikacji do notatek.`,
  en: `Sample text in English. Change settings to see different options. You can adjust the font size, color theme, and interface language. This is a longer text that lets you see how paragraphs, headings, and regular notes will look in your app. This way, you can easily choose the settings that are most comfortable for you when using the notes app every day.`
};

const Settings: React.FC = () => {
  const { theme, setTheme } = useSettings();
  const { language, setLanguage } = useSettings();
  const { fontSize, setFontSize } = useSettings();

  const [formTheme, setFormTheme] = useState(theme);
  const [formLanguage, setFormLanguage] = useState(language);
  const [formFontSize, setFormFontSize] = useState(fontSize);

  const { setErrorMessage, setSuccessMessage } = useToast();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.title = "2Note - Settings";
  }, []);

  return (
    <div className="min-vh-100">
      <Navbar />
      <div className="container py-5">
        <div className="card shadow mx-auto">
          <h1 className="card-title text-center mb-4" style={{ color: "white" }}>
            {translations[language].settingBigs}
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
                  value={formTheme}
                  onChange={(e) => setFormTheme(e.target.value as "dark" | "light")}
                  style={{ maxWidth: 420 }}
                >
                  {translations.en.themes.map((t, index) => (
                    <option key={t} value={t}>{translations[language].themes[index]}</option>
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
                  value={formLanguage} 
                  onChange={(e) => setFormLanguage(e.target.value as "pl" | "en")}
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
                  value={formFontSize} 
                  onChange={(e) => setFormFontSize(e.target.value as "small" | "medium" | "large")}
                  style={{ maxWidth: 420 }}
                >
                  {translations.en.fontSizes.map((size, index) => (
                    <option key={size} value={size}>{translations[language].fontSizes[index]}</option>
                  ))}
                </select>
              </div>
            </form>
            <div 
              className="d-flex flex-column" 
              style={{ width: "60%", height: "100%" }}
            >
              <div className="mt-1">
                <div className="mb-2 text-start" style={{ color: "white" }}>
                  {translations[language].preview} :
                </div>
                <div
                  className="form-control"
                  style={{
                    background: formTheme === "dark" ? "#404082": "#f0f0f0",
                    color: formTheme === "dark" ? "#c6c6e6" : "#343440",
                    fontSize: formFontSize,
                    minHeight: 60,
                    border: "none",
                    borderRadius: 8,
                  }}
                >
                  {exampleTexts[formLanguage]}
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary mt-3"
                style={{ alignSelf: "flex-end" }}
                onClick={async () => {
                  setTheme(formTheme);
                  setLanguage(formLanguage);
                  setFontSize(formFontSize);
                  localStorage.setItem("theme", formTheme);
                  localStorage.setItem("language", formLanguage);
                  localStorage.setItem("fontSize", formFontSize);

                  const token = localStorage.getItem("token");
                  if (token) {
                    try {
                      await updateSettings(token, {
                        theme: formTheme,
                        font_size: formFontSize,
                        language: formLanguage,
                      });
                      setSuccessMessage(translations[language].settingsUpdateSuccess);
                      window.dispatchEvent(new Event("localTokenUpdate"));
                    } catch (error) {
                      console.error("Update settings error:", error);
                      setErrorMessage(translations[language].settingsUpdateError);
                    }
                  }
                }}
              >
                {translations[language].save}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;