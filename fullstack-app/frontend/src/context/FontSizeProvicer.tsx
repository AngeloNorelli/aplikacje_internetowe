import React from "react";

type FontSize = "small" | "medium" | "large";
type FontSizeContextType = {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
};

const FontSizeContext = React.createContext<FontSizeContextType>({
  fontSize: "medium",
  setFontSize: () => {},
});

export const useFontSize = () => React.useContext(FontSizeContext);

export const FontSizeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = React.useState<FontSize>(
    (localStorage.getItem("fontSize") as FontSize) || "medium"
  );

  React.useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};