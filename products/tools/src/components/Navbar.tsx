import React, { useState, useRef, useEffect } from 'react';
import { BrandLogo, ProductSwitcher, ThemeSelector } from '@shared';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { Wrench, LogIn, LogOut, User as UserIcon, Menu, X } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

export interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  user,
  onSignIn,
  onSignOut,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const mobileToggleBtnRef = useRef<HTMLButtonElement>(null);
  const dict = TRANSLATIONS[language];

  // Close mobile drawer when tapping/clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleOutsideInteraction = (e: PointerEvent | MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (!target) return;

      if (mobileDrawerRef.current && mobileDrawerRef.current.contains(target)) {
        return;
      }

      if (mobileToggleBtnRef.current && mobileToggleBtnRef.current.contains(target)) {
        return;
      }

      setMobileMenuOpen(false);
    };

    const pointerEvent = typeof window !== 'undefined' && 'PointerEvent' in window ? 'pointerdown' : 'mousedown';

    document.addEventListener(pointerEvent, handleOutsideInteraction, true);
    document.addEventListener('touchstart', handleOutsideInteraction, true);

    return () => {
      document.removeEventListener(pointerEvent, handleOutsideInteraction, true);
      document.removeEventListener('touchstart', handleOutsideInteraction, true);
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Product Switcher */}
        <div className="flex items-center gap-3 sm:gap-5">
          <BrandLogo
            size="md"
            productName="Tools"
            showText={true}
            showMark={true}
            href="#"
          />

          <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

          <div className="hidden sm:block">
            <ProductSwitcher currentProductId="tools" />
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <a
            href="#workbench"
            className="px-3 py-1.5 rounded-xl hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center gap-1.5"
          >
            <Wrench className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>{dict.nav.workbench}</span>
          </a>
        </nav>

        {/* Right: Language, Theme, and Auth */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="hidden sm:flex items-center">
            <ThemeSelector size="sm" />
          </div>

          {/* Language Switcher */}
          <div
            id="tools-lang-switcher"
            className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          >
            <button
              type="button"
              id="tools-lang-en-btn"
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              id="tools-lang-vi-btn"
              onClick={() => onLanguageChange('vi')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === 'vi'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              VI
            </button>
          </div>

          {/* User Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                <UserIcon className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                <span className="max-w-[120px] truncate">{user.email?.split('@')[0]}</span>
              </div>
              <button
                type="button"
                id="tools-signout-btn"
                onClick={onSignOut}
                className="p-1.5 text-slate-400 hover:text-red-500 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                title={dict.nav.signOut}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              id="tools-signin-btn"
              onClick={onSignIn}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 dark:bg-slate-200 dark:hover:bg-white text-white dark:text-slate-900 shadow-sm transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{dict.nav.signIn}</span>
            </button>
          )}

          {/* Mobile Drawer Toggle */}
          <button
            ref={mobileToggleBtnRef}
            type="button"
            id="tools-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-30 md:hidden animate-in fade-in duration-150"
          onClick={() => setMobileMenuOpen(false)}
          onPointerDown={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          ref={mobileDrawerRef}
          className="relative z-40 md:hidden border-t border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 px-4 py-4 space-y-3"
        >
          <div className="pb-3 border-b border-slate-200 dark:border-slate-850">
            <p className="text-xs font-mono text-slate-400 mb-2">Ecosystem Navigation</p>
            <ProductSwitcher currentProductId="tools" />
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Theme</span>
            <ThemeSelector size="sm" />
          </div>
        </div>
      )}
    </header>
  );
};
