'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'dark' | 'light';
const themeStorageKey = 'portfolio-theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const initialTheme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const currentTheme: Theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    const nextTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);

    try {
      window.localStorage.setItem(themeStorageKey, nextTheme);
    } catch {
      // The in-memory theme still works when browser storage is unavailable.
    }
  };

  return <button
    className="theme-toggle"
    type="button"
    onClick={toggleTheme}
    aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    aria-pressed={theme === 'light'}
    title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
  >
    <Sun className="theme-toggle-sun" size={17} strokeWidth={1.8} aria-hidden="true" />
    <Moon className="theme-toggle-moon" size={16} strokeWidth={1.8} aria-hidden="true" />
    <span className="sr-only">Change color theme</span>
  </button>;
}
