import React, { createContext, useState, useContext, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, Theme } from "../../design-system/themes";

type ThemeContextType = {
  theme: Theme;
  toggle: () => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const AppThemeProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  // initialize from localStorage or system preference
  const getInitial = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("venux:theme");
      if (stored === "dark") return true;
      if (stored === "light") return false;
      const mq =
        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
      if (mq && mq.matches) return true;
    }
    return false;
  };

  const [isDark, setIsDark] = useState<boolean>(getInitial);

  useEffect(() => {
    try {
      localStorage.setItem("venux:theme", isDark ? "dark" : "light");
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute(
          "data-theme",
          isDark ? "dark" : "light"
        );
      }
    } catch {}
  }, [isDark]);

  const toggle = () => setIsDark((s) => !s);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggle, isDark }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useAppTheme must be used within AppThemeProvider");
  return ctx;
};
