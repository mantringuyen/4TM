import React, { useState } from 'react';
import { Header, HeaderNavItem } from '@shared';
import { useLanguage } from '../i18n/LanguageContext';
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
  const [searchQuery, setSearchQuery] = useState('');

  const navItems: HeaderNavItem[] = [
    {
      id: 'nav-products',
      label: dict.nav.products,
      href: '#products',
    },
    {
      id: 'nav-why',
      label: dict.nav.why,
      href: '#why',
    },
    {
      id: 'nav-features',
      label: dict.nav.features,
      href: '#synergy',
    },
  ];

  const handleSearchSubmit = (query: string) => {
    if (!query.trim()) return;
    const q = query.toLowerCase().trim();
    if (
      q.includes('prod') ||
      q.includes('sản phẩm') ||
      q.includes('study') ||
      q.includes('ebook') ||
      q.includes('game') ||
      q.includes('tool') ||
      q.includes('app')
    ) {
      const el = document.getElementById('products');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (q.includes('why') || q.includes('tại sao') || q.includes('lý do')) {
      const el = document.getElementById('why');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (q.includes('synergy') || q.includes('feature') || q.includes('tính năng')) {
      const el = document.getElementById('synergy');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById('products');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Header
      productId="ecosystem"
      productName="ecosystem"
      navItems={navItems}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onSearchSubmit={handleSearchSubmit}
      searchPlaceholder={language === 'vi' ? 'Tìm trong hệ sinh thái...' : 'Search ecosystem...'}
      language={language}
      onLanguageChange={setLanguage}
      user={user ? { email: user.email, name: user.user_metadata?.full_name } : null}
      onSignIn={onOpenAuthModal}
      onSignOut={onSignOut}
      isSigningOut={isSigningOut}
      signInLabel={dict.nav.signIn}
      signOutLabel={language === 'vi' ? 'Đăng xuất' : 'Sign Out'}
      menuItems={navItems}
    />
  );
};

