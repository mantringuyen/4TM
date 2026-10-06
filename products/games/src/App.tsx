import React, { useState, useEffect, useRef } from 'react';
import { Game, Language } from './types';
import { GAMES } from './data/games';
import { LANGUAGE_STORAGE_KEY } from './i18n/translations';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GameCatalog } from './components/GameCatalog';
import { PlayView } from './components/PlayView';
import { createClient, User } from '@supabase/supabase-js';
import { processSsoCallback, initiateSsoAuthRequest } from '@shared/sso';
import { ThemeProvider, useTheme, ThemeMode, AdSlot, useSEO, SchemaGenerators } from '@shared';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

interface BlockPuzzleThemeSyncProps {
  isActive: boolean;
}

/**
 * Host-level synchronizer directly under ThemeProvider:
 * 1. While /block-puzzle is active, applies the host's dark theme via standard setTheme('dark').
 * 2. Keeps data-game="block-puzzle" route marker and theme-color=#000000.
 * 3. When leaving /block-puzzle, removes route marker, restores user's previous preference, and restores theme-color.
 * 4. Does NOT permanently overwrite the user's general 4tm_theme_mode preference.
 * 5. Lifecycle depends strictly on isActive (not theme) to prevent theme changes from re-triggering the effect.
 */
function BlockPuzzleThemeSync({ isActive }: BlockPuzzleThemeSyncProps) {
  const { theme, setTheme } = useTheme();
  const savedPreferenceRef = useRef<ThemeMode | null>(null);
  const themeRef = useRef(theme);
  const setThemeRef = useRef(setTheme);

  // Keep theme & setTheme refs updated without triggering the lifecycle effect
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    setThemeRef.current = setTheme;
  }, [setTheme]);

  useEffect(() => {
    const root = document.documentElement;

    if (isActive) {
      // 1. Capture the user's original preference exactly once when entering Block Puzzle
      if (savedPreferenceRef.current === null) {
        let stored = themeRef.current;
        try {
          const val = localStorage.getItem('4tm_theme_mode') as ThemeMode;
          if (val === 'light' || val === 'dark' || val === 'system') {
            stored = val;
          }
        } catch {}
        savedPreferenceRef.current = stored;
      }

      // 2. Set root route marker for early CSS & scoping
      root.setAttribute('data-game', 'block-puzzle');

      // 3. Set the existing shared theme to dark
      if (themeRef.current !== 'dark') {
        setThemeRef.current('dark');
      }

      // 4. Ensure theme-color meta is black
      const themeColorMeta = (document.getElementById('theme-color-meta') ||
        document.querySelector('meta[name="theme-color"]')) as HTMLMetaElement | null;
      if (themeColorMeta) {
        themeColorMeta.content = '#000000';
      }

      // 5. Restore original preference in localStorage if browser tab is closed/unloaded while playing
      const handleRestoreOnUnload = () => {
        if (savedPreferenceRef.current !== null) {
          try {
            localStorage.setItem('4tm_theme_mode', savedPreferenceRef.current);
          } catch {}
        }
      };
      window.addEventListener('beforeunload', handleRestoreOnUnload);
      window.addEventListener('pagehide', handleRestoreOnUnload);

      return () => {
        window.removeEventListener('beforeunload', handleRestoreOnUnload);
        window.removeEventListener('pagehide', handleRestoreOnUnload);
      };
    } else {
      // Leaving Block Puzzle:
      // 1. Remove route marker and boot stylesheet
      root.removeAttribute('data-game');
      const bootStyle = document.getElementById('block-puzzle-boot-css');
      if (bootStyle && bootStyle.parentNode) {
        bootStyle.parentNode.removeChild(bootStyle);
      }
      const earlyStyle = document.getElementById('block-puzzle-early-theme');
      if (earlyStyle && earlyStyle.parentNode) {
        earlyStyle.parentNode.removeChild(earlyStyle);
      }

      // 2. Restore saved user preference exactly once
      if (savedPreferenceRef.current !== null) {
        const previous = savedPreferenceRef.current;
        savedPreferenceRef.current = null;

        if (themeRef.current !== previous) {
          setThemeRef.current(previous);
        }
        try {
          localStorage.setItem('4tm_theme_mode', previous);
        } catch {}

        const themeColorMeta = (document.getElementById('theme-color-meta') ||
          document.querySelector('meta[name="theme-color"]')) as HTMLMetaElement | null;
        if (themeColorMeta) {
          themeColorMeta.content = previous === 'dark' ? '#020617' : '#f8fafc';
        }
        root.style.backgroundColor = '';
      }
    }
  }, [isActive]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      const root = document.documentElement;
      root.removeAttribute('data-game');
      const bootStyle = document.getElementById('block-puzzle-boot-css');
      if (bootStyle && bootStyle.parentNode) {
        bootStyle.parentNode.removeChild(bootStyle);
      }
      const earlyStyle = document.getElementById('block-puzzle-early-theme');
      if (earlyStyle && earlyStyle.parentNode) {
        earlyStyle.parentNode.removeChild(earlyStyle);
      }
      if (savedPreferenceRef.current !== null) {
        try {
          localStorage.setItem('4tm_theme_mode', savedPreferenceRef.current);
        } catch {}
      }
    };
  }, []);

  return null;
}

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

  const isBlockPuzzleActive = activeGame?.id === 'block-puzzle';

  return (
    <ThemeProvider>
      <BlockPuzzleThemeSync isActive={isBlockPuzzleActive} />
      <div className={`min-h-screen flex flex-col ${isBlockPuzzleActive ? 'bg-black text-white' : 'bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100'} transition-colors duration-200`}>
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
