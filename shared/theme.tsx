import React, { createContext, useContext, useEffect, useState } from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export interface SharedThemeContextType {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const SharedThemeContext = createContext<SharedThemeContextType | undefined>(undefined);

const STORAGE_KEY = '4tm_theme_mode';
export const THEME_STORAGE_KEY = STORAGE_KEY;

function getSystemTheme(): ResolvedTheme {
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
  storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  storageKey = STORAGE_KEY,
}) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    const saved = localStorage.getItem(storageKey) as ThemeMode;
    return saved === 'light' || saved === 'dark' || saved === 'system' ? saved : defaultTheme;
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    if (theme === 'system') return getSystemTheme();
    return theme;
  });

  useEffect(() => {
    const handleMediaChange = () => {
      if (theme === 'system') {
        const sys = getSystemTheme();
        setResolvedTheme(sys);
      }
    };

    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (mediaQuery) {
      mediaQuery.addEventListener('change', handleMediaChange);
    }
    return () => {
      if (mediaQuery) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      }
    };
  }, [theme]);

  useEffect(() => {
    const active = theme === 'system' ? getSystemTheme() : theme;
    setResolvedTheme(active);

    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // Ignore
    }

    const root = document.documentElement;
    // Skip mutating root DOM classes/colors if temporary game override (e.g. Block Puzzle) is active
    if (root.dataset.game === 'block-puzzle') {
      return;
    }

    root.setAttribute('data-theme', active);
    root.style.colorScheme = active;

    if (active === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  const toggleTheme = () => {
    setThemeState((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  };

  return (
    <SharedThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
        isDark: resolvedTheme === 'dark',
      }}
    >
      {children}
    </SharedThemeContext.Provider>
  );
};

export const useTheme = (): SharedThemeContextType => {
  const context = useContext(SharedThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export interface ThemeSelectorProps {
  size?: 'sm' | 'md';
  showLabels?: boolean;
  className?: string;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  size = 'sm',
  showLabels = false,
  className = '',
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ${className}`}
    >
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-label="Light mode"
        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
          theme === 'light'
            ? 'bg-white dark:bg-slate-800 text-amber-500 shadow-sm'
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
        }`}
      >
        <Sun className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => setTheme('dark')}
        aria-label="Dark mode"
        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
          theme === 'dark'
            ? 'bg-white dark:bg-slate-800 text-blue-400 shadow-sm'
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
        }`}
      >
        <Moon className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={() => setTheme('system')}
        aria-label="System mode"
        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
          theme === 'system'
            ? 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm'
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
        }`}
      >
        <Laptop className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
