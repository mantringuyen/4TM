import React, { useState, useRef, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { ThemeSelector } from './theme';
import { DEFAULT_ECOSYSTEM_PRODUCTS } from './ProductSwitcher';
import { getProductAccent, ProductId } from './tokens';
import {
  Search,
  Menu,
  X,
  User as UserIcon,
  LogIn,
  LogOut,
  ExternalLink,
  Check,
  Layers,
} from 'lucide-react';

export interface HeaderNavItem {
  id?: string;
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick?: (e?: any) => void;
  badge?: string;
  active?: boolean;
}

export interface HeaderProps {
  productId: ProductId | 'hub';
  productName?: string;
  logoHref?: string;
  onLogoClick?: (e: React.MouseEvent) => void;

  // Desktop middle navigation area
  navItems?: HeaderNavItem[];
  children?: React.ReactNode;

  // Search (Header search ONLY active on Root: 4tm.io.vn)
  showSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
  onOpenSearch?: () => void;
  searchPlaceholder?: string;

  // Language
  language: 'en' | 'vi';
  onLanguageChange: (lang: 'en' | 'vi') => void;

  // Auth / Account state (displayed in Menu)
  user?: {
    email?: string | null;
    name?: string | null;
    user_metadata?: { full_name?: string; avatar_url?: string; [key: string]: any };
    role?: string | null;
    streak?: number;
  } | null;
  onSignIn?: () => void;
  onSignOut?: () => void;
  isSigningOut?: boolean;
  signInLabel?: string;
  signOutLabel?: string;

  // Product-specific menu content
  menuItems?: HeaderNavItem[];
  renderCustomMenuContent?: (props: { closeMenu: () => void }) => React.ReactNode;

  // Extra controls if needed
  extraHeaderControls?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  productId,
  productName,
  logoHref,
  onLogoClick,
  navItems,
  children,
  showSearch,
  searchQuery = '',
  onSearchChange,
  onSearchSubmit,
  onOpenSearch,
  searchPlaceholder,
  language,
  onLanguageChange,
  user,
  onSignIn,
  onSignOut,
  isSigningOut = false,
  signInLabel,
  signOutLabel,
  menuItems,
  renderCustomMenuContent,
  extraHeaderControls,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  const resolvedProductId = (productId === 'hub' ? 'ecosystem' : productId) as ProductId;
  const accent = getProductAccent(resolvedProductId);
  // Header Search is ONLY enabled on Root (ecosystem) by default
  const shouldRenderSearch = showSearch !== undefined ? showSearch : (resolvedProductId === 'ecosystem');

  const defaultPlaceholder = language === 'vi' ? 'Tìm kiếm...' : 'Search...';
  const resolvedPlaceholder = searchPlaceholder || defaultPlaceholder;

  const defaultSignInLabel = language === 'vi' ? 'Đăng nhập' : 'Sign In';
  const defaultSignOutLabel = language === 'vi' ? 'Đăng xuất' : 'Sign Out';

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;

    const handleOutsideInteraction = (e: Event) => {
      const target = e.target as Node | null;
      if (!target) return;

      if (menuPanelRef.current && menuPanelRef.current.contains(target)) {
        return;
      }
      if (menuBtnRef.current && menuBtnRef.current.contains(target)) {
        return;
      }
      setMenuOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setMobileSearchOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleOutsideInteraction, true);
    document.addEventListener('mousedown', handleOutsideInteraction, true);
    document.addEventListener('touchstart', handleOutsideInteraction, true);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideInteraction, true);
      document.removeEventListener('mousedown', handleOutsideInteraction, true);
      document.removeEventListener('touchstart', handleOutsideInteraction, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  // Focus input when mobile search bar expands
  useEffect(() => {
    if (mobileSearchOpen) {
      setTimeout(() => {
        mobileSearchInputRef.current?.focus();
      }, 50);
    }
  }, [mobileSearchOpen]);

  const handleMobileSearchClick = () => {
    if (onOpenSearch) {
      onOpenSearch();
    } else {
      setMobileSearchOpen((prev) => !prev);
    }
  };

  const handleDesktopSearchClick = () => {
    if (onOpenSearch) {
      onOpenSearch();
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      id={`${resolvedProductId}-header`}
      className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors text-slate-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: 4TM logo + product label */}
        <div className="flex items-center shrink-0">
          <BrandLogo
            size="md"
            productName={productName || resolvedProductId}
            showText={true}
            showMark={true}
            href={logoHref}
            onClick={onLogoClick}
          />
        </div>

        {/* Center / Main Navigation area (desktop) */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2 flex-1 justify-center px-2 min-w-0 overflow-hidden">
          {children ? (
            children
          ) : navItems && navItems.length > 0 ? (
            <nav className="flex items-center gap-1 lg:gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
              {navItems.map((item, idx) => {
                const Icon = item.icon;
                return item.href ? (
                  <a
                    key={item.id || idx}
                    href={item.href}
                    onClick={item.onClick}
                    className={`px-2.5 lg:px-3 py-1.5 rounded-xl hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center gap-1.5 shrink-0 ${
                      item.active ? accent.classes.activeNav : ''
                    }`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5 opacity-75" />}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 font-mono">
                        {item.badge}
                      </span>
                    )}
                  </a>
                ) : (
                  <button
                    key={item.id || idx}
                    type="button"
                    onClick={item.onClick}
                    className={`px-2.5 lg:px-3 py-1.5 rounded-xl hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer ${
                      item.active ? accent.classes.activeNav : ''
                    }`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5 opacity-75" />}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 font-mono">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          ) : null}
        </div>

        {/* Right Controls: [Search] [EN/VI] [Menu] */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {extraHeaderControls}

          {/* Search Control (Header Search ONLY on Root: 4tm.io.vn) */}
          {shouldRenderSearch && (
            <>
              {/* Desktop Search Input */}
              <div className="hidden md:flex items-center relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                <input
                  type="text"
                  id={`${resolvedProductId}-desktop-search`}
                  value={searchQuery}
                  readOnly={!!onOpenSearch && !onSearchChange}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onSearchSubmit?.(searchQuery);
                    }
                  }}
                  onClick={handleDesktopSearchClick}
                  placeholder={resolvedPlaceholder}
                  className={`w-32 lg:w-48 xl:w-60 pl-8 ${onOpenSearch ? 'pr-12 cursor-pointer' : 'pr-3'} py-1.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:focus:ring-blue-400/30 transition-all shadow-2xs`}
                />
                {onOpenSearch && (
                  <kbd className="absolute right-2 text-[10px] font-mono px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 pointer-events-none border border-slate-300 dark:border-slate-700">
                    Ctrl+K
                  </kbd>
                )}
              </div>

              {/* Mobile Search Icon Button */}
              <button
                type="button"
                id={`${resolvedProductId}-mobile-search-btn`}
                onClick={handleMobileSearchClick}
                className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                aria-label={resolvedPlaceholder}
              >
                <Search className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Language Switcher [EN] [VI] */}
          <div
            id={`${resolvedProductId}-lang-switcher`}
            className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0"
          >
            <button
              type="button"
              id={`${resolvedProductId}-lang-en-btn`}
              onClick={() => onLanguageChange('en')}
              className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              id={`${resolvedProductId}-lang-vi-btn`}
              onClick={() => onLanguageChange('vi')}
              className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === 'vi'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              VI
            </button>
          </div>

          {/* Standardized Rightmost Menu Button */}
          <button
            ref={menuBtnRef}
            type="button"
            id={`${resolvedProductId}-menu-btn`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-haspopup="true"
            aria-label="Toggle navigation menu"
            className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shrink-0 ${
              menuOpen
                ? 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span className="hidden sm:inline">Menu</span>
          </button>
        </div>
      </div>

      {/* Expandable Mobile Search Bar (Header Search ONLY on Root: 4tm.io.vn) */}
      {shouldRenderSearch && mobileSearchOpen && (
        <div
          id={`${resolvedProductId}-mobile-search-bar`}
          className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-2.5 flex items-center gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={mobileSearchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSearchSubmit?.(searchQuery);
                  setMobileSearchOpen(false);
                }
              }}
              placeholder={resolvedPlaceholder}
              className="w-full pl-9 pr-8 py-1.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange?.('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setMobileSearchOpen(false)}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 px-1 py-1"
          >
            {language === 'vi' ? 'Đóng' : 'Close'}
          </button>
        </div>
      )}

      {/* Backdrop overlay for Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-40 animate-in fade-in duration-150"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Standardized Header Menu Dropdown / Panel */}
      {menuOpen && (
        <div
          ref={menuPanelRef}
          id={`${resolvedProductId}-menu-panel`}
          role="dialog"
          aria-label="Navigation Menu"
          className="absolute right-3 sm:right-6 lg:right-8 top-full mt-2 w-80 sm:w-96 max-w-[calc(100vw-1.5rem)] max-h-[calc(100vh-5rem)] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50 space-y-4 animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Section 1: User Auth / Account */}
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800/80">
            {user ? (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 font-bold text-xs shrink-0 border border-slate-200 dark:border-slate-700">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {user.name || user.email?.split('@')[0]}
                    </p>
                    {user.email && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>
                {onSignOut && (
                  <button
                    type="button"
                    onClick={() => {
                      onSignOut();
                      closeMenu();
                    }}
                    disabled={isSigningOut}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 transition-colors cursor-pointer shrink-0"
                    title={signOutLabel || defaultSignOutLabel}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{signOutLabel || defaultSignOutLabel}</span>
                  </button>
                )}
              </div>
            ) : onSignIn ? (
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {language === 'vi' ? 'Tài khoản 4TM' : '4TM Account'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onSignIn();
                    closeMenu();
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold ${accent.classes.cta} cursor-pointer`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{signInLabel || defaultSignInLabel}</span>
                </button>
              </div>
            ) : null}
          </div>

          {/* Section 2: Custom / Product-Specific Content */}
          {renderCustomMenuContent && (
            <div className="pb-3 border-b border-slate-100 dark:border-slate-800/80">
              {renderCustomMenuContent({ closeMenu })}
            </div>
          )}

          {/* Section 3: Product Navigation Links (if items provided) */}
          {menuItems && menuItems.length > 0 && (
            <div className="pb-3 border-b border-slate-100 dark:border-slate-800/80">
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                {language === 'vi' ? 'Điều hướng' : 'Navigation'}
              </p>
              <div className="space-y-1">
                {menuItems.map((item, idx) => {
                  const Icon = item.icon;
                  return item.href ? (
                    <a
                      key={item.id || idx}
                      href={item.href}
                      onClick={(e) => {
                        item.onClick?.();
                        closeMenu();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {Icon && <Icon className="w-3.5 h-3.5 text-slate-500" />}
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 font-mono">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  ) : (
                    <button
                      key={item.id || idx}
                      type="button"
                      onClick={() => {
                        item.onClick?.();
                        closeMenu();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        {Icon && <Icon className="w-3.5 h-3.5 text-slate-500" />}
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 font-mono">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 4: 4TM Digital Ecosystem Switcher */}
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              <Layers className="w-3 h-3 text-blue-500" />
              <span>4TM Digital Ecosystem</span>
            </div>
            <div className="space-y-0.5">
              {DEFAULT_ECOSYSTEM_PRODUCTS.map((prod) => {
                const isCurrent =
                  prod.id === resolvedProductId ||
                  (resolvedProductId === 'ecosystem' && prod.id === 'hub');
                return (
                  <a
                    key={prod.id}
                    href={prod.url}
                    onClick={closeMenu}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors ${
                      isCurrent
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span>{prod.name}</span>
                      {prod.id !== 'hub' && <ExternalLink className="w-3 h-3 opacity-40" />}
                    </div>
                    {isCurrent && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Section 5: Theme Appearance Selector */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {language === 'vi' ? 'Giao diện' : 'Appearance'}
            </span>
            <ThemeSelector size="sm" />
          </div>
        </div>
      )}
    </header>
  );
};
