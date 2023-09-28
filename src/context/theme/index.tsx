import { createContext, useContext } from "react";

const theme = {
  darkGreen: "#001500",
  green: "#1D4817",
  lightGreen: "#3A7C2D",
  red: "#c62e21",
  yellow: "#ffb42d",
  lightYellow: "#f7cc6d",
  gray: "#e5e4e2",
};
export const ThemeContext = createContext(theme);

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const ThemeUse = () => useContext(ThemeContext);