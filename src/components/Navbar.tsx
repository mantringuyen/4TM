import React, { useState, useEffect, useRef } from 'react';
import { BrandLogo, ProductSwitcher } from '@shared';
import { getCanonicalEcosystemProducts } from '../config/products';
import { useLanguage } from '../i18n/LanguageContext';
import { ThemeSelector } from './ThemeSelector';
import { Menu, X, ExternalLink, Sparkles, LogIn, User as UserIcon, LogOut, ChevronDown } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

export interface NavbarProps {
  user?: User | null;
  onOpenAuthModal?: () => void;
  onSignOut?: () => void;
  isSigningOut?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenAuthModal,
  onSignOut,
  isSigningOut = false,
}) => {
  const { language, setLanguage, dict } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const mobileToggleBtnRef = useRef<HTMLButtonElement>(null);
  const products = getCanonicalEcosystemProducts('hub', language);

  // Close user dropdown on outside click
  useEffect(() => {
    if (!userDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userDropdownOpen]);

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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Canonical Product Switcher */}
        <div className="flex items-center gap-3 sm:gap-5">
          <BrandLogo size="md" showText={true} showMark={true} href="/" />

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

          {/* Sign In / User Profile Entry */}
          {user ? (
            <div className="relative hidden sm:block" ref={userDropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                aria-expanded={userDropdownOpen}
              >
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold uppercase">
                  {user.email ? user.email.charAt(0) : <UserIcon className="w-3 h-3" />}
                </div>
                <span className="max-w-[120px] truncate">{user.email?.split('@')[0] || 'User'}</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-150 ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 py-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3.5 py-1.5 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">{language === 'vi' ? 'Đã đăng nhập với' : 'Signed in as'}</p>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{user.email}</p>
                  </div>
                  <div className="p-1">
                    <button
                      type="button"
                      disabled={isSigningOut}
                      onClick={() => {
                        setUserDropdownOpen(false);
                        if (onSignOut) onSignOut();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{isSigningOut ? (language === 'vi' ? 'Đang đăng xuất...' : 'Signing out...') : (language === 'vi' ? 'Đăng xuất' : 'Sign Out')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
              title={dict.nav.signIn}
            >
              <LogIn className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{dict.nav.signIn}</span>
            </button>
          )}

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
            ref={mobileToggleBtnRef}
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
          className="relative z-40 md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200"
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

          <div className="pt-2 space-y-2">
            {user ? (
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{language === 'vi' ? 'Tài khoản' : 'Account'}</p>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{user.email}</p>
                </div>
                <button
                  type="button"
                  disabled={isSigningOut}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onSignOut) onSignOut();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 text-sm font-bold transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{isSigningOut ? (language === 'vi' ? 'Đang đăng xuất...' : 'Signing out...') : (language === 'vi' ? 'Đăng xuất' : 'Sign Out')}</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAuthModal) onOpenAuthModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 text-sm font-bold shadow-2xs cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{dict.nav.signIn}</span>
              </button>
            )}

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
