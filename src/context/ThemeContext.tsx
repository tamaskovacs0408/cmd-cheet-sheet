import {
  createContext,
} from "react";
import { Theme } from "./ThemeProvider";


interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);