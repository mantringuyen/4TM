import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop, ChevronDown, Check } from 'lucide-react';
import {
  ThemeSelector as SharedThemeSelector,
  useTheme as useSharedTheme,
  ThemeMode as SharedThemeMode,
} from '@shared';
import { useLanguage } from '../i18n/LanguageContext';

export interface ThemeSelectorProps {
  variant?: 'dropdown' | 'segmented';
  className?: string;
  align?: 'left' | 'right' | 'auto';
  size?: 'sm' | 'md';
  showLabels?: boolean;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  variant = 'dropdown',
  className = '',
  align = 'auto',
  size = 'sm',
  showLabels = false,
}) => {
  const { theme, resolvedTheme, setTheme } = useSharedTheme();
  const { dict } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (variant === 'segmented') {
    return (
      <SharedThemeSelector
        size={size}
        showLabels={showLabels}
        className={className}
      />
    );
  }

  const options: { id: SharedThemeMode; label: string; icon: React.ReactNode }[] = [
    {
      id: 'light',
      label: dict.nav?.themeLight || 'Light',
      icon: <Sun className="w-3.5 h-3.5 text-amber-500" />,
    },
    {
      id: 'dark',
      label: dict.nav?.themeDark || 'Dark',
      icon: <Moon className="w-3.5 h-3.5 text-blue-400" />,
    },
    {
      id: 'system',
      label: dict.nav?.themeSystem || 'System',
      icon: <Laptop className="w-3.5 h-3.5 text-slate-400" />,
    },
  ];

  const currentOption = options.find((o) => o.id === theme) || options[2];

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`${dict.nav?.themeToggleAria || 'Theme selector'}: ${currentOption.label}`}
        title={`${dict.nav?.theme || 'Theme'}: ${currentOption.label} (${resolvedTheme})`}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300/70 dark:border-slate-800 transition-all text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-2xs cursor-pointer"
      >
        <span className="flex items-center justify-center">
          {theme === 'system' ? (
            resolvedTheme === 'dark' ? (
              <Laptop className="w-3.5 h-3.5 text-blue-400" />
            ) : (
              <Laptop className="w-3.5 h-3.5 text-amber-500" />
            )
          ) : (
            currentOption.icon
          )}
        </span>
        <span className="hidden sm:inline-block font-semibold">{currentOption.label}</span>
        <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={dict.nav?.themeToggleAria || 'Select color theme'}
          className={`absolute mt-1.5 w-36 py-1 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95 duration-100 overflow-hidden ${
            align === 'left' ? 'left-0' : 'right-0'
          }`}
        >
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/80 mb-1">
            {dict.nav?.theme || 'Theme'}
          </div>
          {options.map((option) => {
            const isSelected = theme === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setTheme(option.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-2">
                  {option.icon}
                  <span>{option.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
