import React, { useState, useEffect, useRef } from 'react';
import { BrandLogo, ProductSwitcher } from '@shared';
import { getCanonicalEcosystemProducts } from '../config/products';
import { useLanguage } from '../i18n/LanguageContext';
import { ThemeSelector } from './ThemeSelector';
import { Menu, X, ExternalLink, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, setLanguage, dict } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const products = getCanonicalEcosystemProducts('hub', language);

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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Canonical Product Switcher */}
        <div className="flex items-center gap-3 sm:gap-5">
          <BrandLogo size="md" showText={true} showMark={true} />

          <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

          <div className="hidden sm:block">
            <ProductSwitcher
              currentProductId="hub"
              products={products}
            />
          </div>
        </div>

        {/* Center: Ecosystem Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <a
            href="#products"
            className="px-3 py-2 rounded-xl hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            {dict.nav.products}
          </a>
          <a
            href="#why"
            className="px-3 py-2 rounded-xl hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            {dict.nav.why}
          </a>
          <a
            href="#synergy"
            className="px-3 py-2 rounded-xl hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            {dict.nav.features}
          </a>
        </nav>

        {/* Right: Theme Toggle, Language Switcher & Primary Action */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme Selector Dropdown */}
          <div className="hidden sm:flex items-center">
            <ThemeSelector variant="dropdown" />
          </div>

          {/* [EN] [VI] Language Switcher Segment - matching 4TM-Study */}
          <div
            id="nav-language-switcher-segment"
            className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-inner"
          >
            <button
              type="button"
              id="nav-lang-en-btn"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Switch to English"
            >
              EN
            </button>
            <button
              type="button"
              id="nav-lang-vi-btn"
              onClick={() => setLanguage('vi')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === 'vi'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Chuyển sang Tiếng Việt"
            >
              VI
            </button>
          </div>

          {/* Launch Study CTA */}
          <a
            href="https://study.4tm.io.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{dict.nav.launchStudy}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-75" />
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            aria-label={mobileMenuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          ref={mobileDrawerRef}
          className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200"
        >
          <div className="py-2">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
              {dict.nav.products}
            </span>
            <ProductSwitcher
              currentProductId="hub"
              products={products}
            />
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-900 space-y-1">
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {dict.nav.products}
            </a>
            <a
              href="#why"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {dict.nav.why}
            </a>
            <a
              href="#synergy"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {dict.nav.features}
            </a>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              {dict.footer.appearance}
            </span>
            <ThemeSelector variant="dropdown" />
          </div>

          <div className="pt-2">
            <a
              href="https://study.4tm.io.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-md shadow-blue-600/20"
            >
              <span>{dict.nav.launchStudy}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
