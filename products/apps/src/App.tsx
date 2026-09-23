import React, { useState, useEffect } from 'react';
import { AppItem, Language } from './types';
import { APPS } from './data/apps';
import { LANGUAGE_STORAGE_KEY } from './i18n/translations';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AppCatalog } from './components/AppCatalog';
import { AppModal } from './components/AppModal';
import { createClient, User } from '@supabase/supabase-js';
import { processSsoCallback, initiateSsoAuthRequest } from '@shared/sso';
import { ThemeProvider, AdSlot, useSEO, SchemaGenerators } from '@shared';

const FAVORITES_STORAGE_KEY = '4tm_apps_favorites';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export function App() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'en' || saved === 'vi') return saved;
    }
    return 'en';
  });

  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const favs = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (favs) return JSON.parse(favs);
      } catch {}
    }
    return ['study-companion', 'api-studio'];
  });

  const [user, setUser] = useState<User | null>(null);

  // Initialize Auth & Handle SSO Ticket
  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Handle incoming SSO callback
    if (typeof window !== 'undefined') {
      const hash = window.location.hash || '';
      const search = window.location.search || '';
      if (hash.includes('ticket=') || search.includes('ticket=')) {
        processSsoCallback({
          supabaseClient: supabase,
        })
          .then((result) => {
            if (result.success && result.user) {
              setUser(result.user);
            }
          })
          .catch((err) => {
            console.warn('SSO callback processing error:', err);
          });
      }
    }

    return () => subscription.unsubscribe();
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  const handleToggleFavorite = (appId: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(appId)
        ? prev.filter((id) => id !== appId)
        : [...prev, appId];
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleSignIn = () => {
    try {
      const currentOrigin = window.location.origin;
      const { authUrl } = initiateSsoAuthRequest({ targetOrigin: currentOrigin });
      window.location.href = authUrl;
    } catch {
      window.location.href = 'https://4tm.io.vn';
    }
  };

  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic SEO Synchronization
  const pageTitle = selectedApp
    ? `${selectedApp.title[language]} | 4TM Apps`
    : language === 'vi'
    ? '4TM Apps — Danh bạ Ứng dụng Web & Công cụ Lập trình viên'
    : '4TM Apps — Curated Web Software Directory & Developer Utilities';

  const pageDescription = selectedApp
    ? selectedApp.description[language]
    : language === 'vi'
    ? 'Khám phá và sử dụng các ứng dụng web chuyên dụng cho lập trình viên: trợ lý học tập, sổ tay snippet, API Studio và phối màu trực quan.'
    : 'Application Ecosystem & Curated Web Software Directory — explore, launch, and experiment with purpose-built developer utilities, API studios, and productivity suites.';

  const canonicalUrl = selectedApp
    ? `https://apps.4tm.io.vn/#${selectedApp.id}`
    : 'https://apps.4tm.io.vn/';

  useSEO({
    title: pageTitle,
    description: pageDescription,
    canonicalUrl,
    language,
    jsonLd: selectedApp
      ? [
          SchemaGenerators.softwareApplication({
            id: selectedApp.id,
            name: selectedApp.title[language],
            description: selectedApp.description[language],
            category: 'DeveloperApplication',
            url: `https://apps.4tm.io.vn/#${selectedApp.id}`,
          }),
          SchemaGenerators.website('https://apps.4tm.io.vn', '4TM Apps', pageDescription),
        ]
      : [
          SchemaGenerators.website('https://apps.4tm.io.vn', '4TM Apps', pageDescription),
        ],
  });

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <Navbar
          language={language}
          onLanguageChange={handleLanguageChange}
          user={user}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="flex-1">
          <AppCatalog
            apps={APPS}
            language={language}
            onSelectApp={(app) => setSelectedApp(app)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {selectedApp && (
          <AppModal
            app={selectedApp}
            language={language}
            onClose={() => setSelectedApp(null)}
            isFavorite={favorites.includes(selectedApp.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        <AdSlot product="apps" user={user} supabaseClient={supabase} />
        <Footer language={language} />
      </div>
    </ThemeProvider>
  );
}

export default App;
