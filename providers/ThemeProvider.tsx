'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type ThemeKey = 'light' | 'dark' | 'system';

const THEME_STORAGE_KEY = 'app_theme';

interface ThemeContextType {
  theme: ThemeKey;
  setTheme: (theme: ThemeKey) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeKey>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (typeof window !== 'undefined' && localStorage.getItem(THEME_STORAGE_KEY)) as ThemeKey | null;
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      setThemeState(stored);
    }
    setMounted(true);
  }, []);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (!mounted) {
      return;
    }
    if (theme === 'system') {
      const m = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDark(m.matches);
      const handler = () => setIsDark(m.matches);
      m.addEventListener('change', handler);
      return () => m.removeEventListener('change', handler);
    }
    setIsDark(theme === 'dark');
  }, [mounted, theme]);

  useEffect(() => {
    if (!mounted || typeof document === 'undefined') {
      return;
    }
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [mounted, isDark]);

  const setTheme = useCallback((newTheme: ThemeKey) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
