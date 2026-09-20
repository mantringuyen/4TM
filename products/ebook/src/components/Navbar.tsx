import React from 'react';
import { Header, HeaderNavItem } from '@shared';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { BookOpen } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

export interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateHome: () => void;
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  onNavigateHome,
  user,
  onSignIn,
  onSignOut,
  searchQuery = '',
  onSearchChange,
}) => {
  const dict = TRANSLATIONS[language];

  const navItems: HeaderNavItem[] = [
    {
      id: 'nav-library',
      label: dict.nav.library,
      href: '#catalog',
      icon: BookOpen,
      onClick: () => {
        onNavigateHome();
      },
    },
  ];

  return (
    <Header
      productId="ebook"
      productName="ebook"
      navItems={navItems}
      showSearch={false}
      language={language}
      onLanguageChange={onLanguageChange}
      user={user ? { email: user.email, name: user.user_metadata?.full_name } : null}
      onSignIn={onSignIn}
      onSignOut={onSignOut}
      signInLabel={dict.nav.signIn}
      signOutLabel={dict.nav.signOut}
      menuItems={navItems}
    />
  );
};
