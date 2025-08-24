
import { createContext, useContext } from "react";
import { ThemeContextType } from '../Types/ThemeContextType';


// Create the context with a default value
export const ThemeContext = createContext<ThemeContextType>({
  darkMode: true,
  toggleDarkMode: () => {},
});

// Export the Provider with the correct type
export const ThemeProvider = ThemeContext.Provider;

// Custom hook to consume the theme context
export default function useTheme(): ThemeContextType {
  return useContext(ThemeContext);
}