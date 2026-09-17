import React, { useState } from 'react';
import { BrandLogo, ProductSwitcher, ThemeSelector } from '@shared';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { Gamepad2, LogIn, LogOut, User as UserIcon, Menu, X } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

export interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateHome: () => void;
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  onNavigateHome,
  user,
  onSignIn,
  onSignOut,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dict = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-md transition-colors text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Product Switcher */}
        <div className="flex items-center gap-3 sm:gap-5">
          <BrandLogo
            size="md"
            productName="Games"
            showText={true}
            showMark={true}
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            href="#"
          />

          <div className="h-5 w-px bg-slate-800 hidden sm:block" />

          <div className="hidden sm:block">
            <ProductSwitcher currentProductId="games" />
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-300">
          <button
            type="button"
            onClick={onNavigateHome}
            className="px-3 py-1.5 rounded-xl hover:text-rose-400 hover:bg-slate-900 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Gamepad2 className="w-3.5 h-3.5 text-rose-500" />
            <span>{dict.nav.arcade}</span>
          </button>
        </nav>

        {/* Right: Language, Theme, and Auth */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="hidden sm:flex items-center">
            <ThemeSelector size="sm" />
          </div>

          {/* Language Switcher */}
          <div
            id="games-lang-switcher"
            className="flex items-center p-0.5 rounded-xl bg-slate-900 border border-slate-800"
          >
            <button
              type="button"
              id="games-lang-en-btn"
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-slate-800 text-rose-400 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              id="games-lang-vi-btn"
              onClick={() => onLanguageChange('vi')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === 'vi'
                  ? 'bg-slate-800 text-rose-400 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              VI
            </button>
          </div>

          {/* User Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-xs font-semibold text-slate-300 border border-slate-800">
                <UserIcon className="w-3.5 h-3.5 text-rose-500" />
                <span className="max-w-[120px] truncate">{user.email?.split('@')[0]}</span>
              </div>
              <button
                type="button"
                id="games-signout-btn"
                onClick={onSignOut}
                className="p-1.5 text-slate-400 hover:text-red-400 rounded-xl hover:bg-slate-900 transition-colors cursor-pointer"
                title={dict.nav.signOut}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              id="games-signin-btn"
              onClick={onSignIn}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-sm transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{dict.nav.signIn}</span>
            </button>
          )}

          {/* Mobile Drawer Toggle */}
          <button
            type="button"
            id="games-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:bg-slate-900 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-3">
          <div className="pb-3 border-b border-slate-850">
            <p className="text-xs font-mono text-slate-400 mb-2">Ecosystem Navigation</p>
            <ProductSwitcher currentProductId="games" />
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-semibold text-slate-400">Theme</span>
            <ThemeSelector size="sm" />
          </div>
        </div>
      )}
    </header>
  );
};
