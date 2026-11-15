import React, { createContext, useContext, useMemo, useState } from "react";
import { Colors } from "../constants/Colors";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [scheme, setScheme] = useState("light");
  const toggleTheme = () => setScheme((current) => (current === "dark" ? "light" : "dark"));
  const theme = Colors[scheme];
  const value = useMemo(() => ({ scheme, theme, toggleTheme }), [scheme, theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme must be used inside ThemeProvider");
  return value;
}
