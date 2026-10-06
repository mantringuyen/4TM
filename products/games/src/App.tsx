import React, { useState, useEffect } from 'react';
import { Game, Language } from './types';
import { GAMES } from './data/games';
import { LANGUAGE_STORAGE_KEY } from './i18n/translations';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GameCatalog } from './components/GameCatalog';
import { PlayView } from './components/PlayView';
import { createClient, User } from '@supabase/supabase-js';
import { processSsoCallback, initiateSsoAuthRequest } from '@shared/sso';
import { ThemeProvider, AdSlot, useSEO, SchemaGenerators } from '@shared';

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

  const [activeGame, setActiveGame] = useState<Game | null>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/\/+$/, '');
      const hash = window.location.hash.replace(/^#\/?/, '').replace(/\/+$/, '');
      if (path === '/block-puzzle' || hash === 'block-puzzle') {
        return GAMES.find((g) => g.id === 'block-puzzle') || null;
      }
      if (hash) {
        return GAMES.find((g) => g.id === hash || g.slug === hash) || null;
      }
    }
    return null;
  });
  const [user, setUser] = useState<User | null>(null);

  // Sync route state on back/forward browser navigation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleRouteChange = () => {
      const path = window.location.pathname.replace(/\/+$/, '');
      const hash = window.location.hash.replace(/^#\/?/, '').replace(/\/+$/, '');
      if (path === '/block-puzzle' || hash === 'block-puzzle') {
        setActiveGame(GAMES.find((g) => g.id === 'block-puzzle') || null);
      } else if (hash) {
        setActiveGame(GAMES.find((g) => g.id === hash || g.slug === hash) || null);
      } else if (path === '' || path === '/') {
        setActiveGame(null);
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

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
  const pageTitle = activeGame
    ? `${activeGame.title[language]} — Play Online | 4TM Games`
    : language === 'vi'
    ? '4TM Games — Trò chơi Tư duy & Thử thách Thuật toán'
    : '4TM Games — Computer Science Puzzles & Algorithmic Arcade';

  const pageDescription = activeGame
    ? activeGame.description[language]
    : language === 'vi'
    ? 'Hệ thống mini game và thử thách tư duy lập trình: câu đố nhị phân, thuật toán sắp xếp, regular expression và đồ thị chạy trực tiếp trên web.'
    : 'Interactive Game Ecosystem — browser-native computer science puzzles, logic riddles, algorithmic visualizers, binary search games, and interactive problem-solving challenges.';

  const canonicalUrl = activeGame
    ? activeGame.id === 'block-puzzle'
      ? 'https://games.4tm.io.vn/block-puzzle'
      : `https://games.4tm.io.vn/#/${activeGame.id}`
    : 'https://games.4tm.io.vn/';

  useSEO({
    title: pageTitle,
    description: pageDescription,
    canonicalUrl,
    language,
    jsonLd: activeGame
      ? [
          SchemaGenerators.videoGame({
            id: activeGame.id,
            name: activeGame.title[language],
            description: activeGame.description[language],
            genre: activeGame.category,
            url:
              activeGame.id === 'block-puzzle'
                ? 'https://games.4tm.io.vn/block-puzzle'
                : `https://games.4tm.io.vn/#/${activeGame.id}`,
          }),
          SchemaGenerators.website('https://games.4tm.io.vn', '4TM Games', pageDescription),
        ]
      : [
          SchemaGenerators.website('https://games.4tm.io.vn', '4TM Games', pageDescription),
        ],
  });

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    if (activeGame && q) {
      setActiveGame(null);
      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', '/');
      }
    }
  };

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  return (
    <ThemeProvider>
      <div className={`min-h-screen flex flex-col ${activeGame?.id === 'block-puzzle' ? 'bg-black text-white' : 'bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100'} transition-colors duration-200`}>
        <Navbar
          language={language}
          onLanguageChange={handleLanguageChange}
          onNavigateHome={() => {
            setActiveGame(null);
            setSearchQuery('');
            if (typeof window !== 'undefined') {
              window.history.pushState(null, '', '/');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          user={user}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        <div className="flex-1">
          {activeGame ? (
            <PlayView
              game={activeGame}
              language={language}
              onBackToCatalog={() => {
                setActiveGame(null);
                if (typeof window !== 'undefined') {
                  window.history.pushState(null, '', '/');
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : (
            <GameCatalog
              games={GAMES}
              language={language}
              onSelectGame={(game) => {
                setActiveGame(game);
                if (typeof window !== 'undefined') {
                  if (game.id === 'block-puzzle') {
                    window.history.pushState(null, '', '/block-puzzle');
                  } else {
                    window.history.pushState(null, '', `/#/${game.id}`);
                  }
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
          )}
        </div>

        <AdSlot product="games" user={user} supabaseClient={supabase} />
        <Footer language={language} />
      </div>
    </ThemeProvider>
  );
}

export default App;
