import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { lightTheme, Theme } from './theme';

interface ThemeContextProps {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

const GlobalThemeContext = createContext<ThemeContextProps | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function GlobalThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  return (
    <GlobalThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </GlobalThemeContext.Provider>
  );
}

export function useGlobalTheme() {
  const value = useContext(GlobalThemeContext);

  if (value === null) {
    throw new Error(`useGlobalTheme must be used in GlobalThemeProvider`);
  }

  return value;
}
