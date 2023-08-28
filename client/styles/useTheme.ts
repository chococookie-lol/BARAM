import { useCallback, useEffect, useState } from 'react';

export default function useTheme(): [typeof theme, typeof toggleTheme] {
  const getInitialTheme = useCallback(() => {
    if (typeof window === 'undefined') return 'light';
    let theme = window.localStorage.getItem('theme') as 'light' | 'dark' | null;
    const INVALID_THEME = theme !== 'light' && theme !== 'dark';

    if (!theme || INVALID_THEME) {
      const { matches } = window.matchMedia('(prefers-color-scheme: dark)');
      theme = matches ? 'dark' : 'light';
    }

    return theme;
  }, []);

  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return [theme, toggleTheme];
}
