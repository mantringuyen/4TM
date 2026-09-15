import React, { createContext, useContext, useEffect } from 'react';
import {
  ThemeProvider as SharedThemeProvider,
  useTheme as useSharedTheme,
  ThemeMode as SharedThemeMode,
  THEME_STORAGE_KEY
} from '@shared';

export type ThemeMode = SharedThemeMode;
export type ResolvedTheme = 'light' | 'dark';

export interface ThemeContextType {
  themeMode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  // Canonical @shared properties
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  isDark: boolean;
}

const LEGACY_STORAGE_KEY = '4tm_theme_mode';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeBridge({ children }: { children: React.ReactNode }) {
  const shared = useSharedTheme();

  // Ensure dual DOM attribute & class synchronization:
  // @shared manages root.classList.toggle('dark').
  // We guarantee data-theme, colorScheme, html.light/html.dark, and legacy localStorage stay in sync.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const resolved = shared.resolvedTheme;

    root.setAttribute('data-theme', resolved);
    root.style.colorScheme = resolved;

    if (resolved === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    try {
      localStorage.setItem(LEGACY_STORAGE_KEY, shared.theme);
    } catch {
      // Ignore storage access errors
    }
  }, [shared.resolvedTheme, shared.theme]);

  const value: ThemeContextType = {
    themeMode: shared.theme,
    resolvedTheme: shared.resolvedTheme,
    setThemeMode: shared.setTheme,
    toggleTheme: shared.toggleTheme,
    theme: shared.theme,
    setTheme: shared.setTheme,
    isDark: shared.isDark,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SharedThemeProvider storageKey={THEME_STORAGE_KEY}>
      <ThemeBridge>{children}</ThemeBridge>
    </SharedThemeProvider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      themeMode: 'system',
      resolvedTheme: 'dark',
      setThemeMode: () => {},
      toggleTheme: () => {},
      theme: 'system',
      setTheme: () => {},
      isDark: true,
    };
  }
  return context;
};

