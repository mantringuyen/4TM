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
 * Safely replaces the <meta name="theme-color"> element in document.head.
 * On iOS Safari during SPA transitions, replacing/re-inserting the meta node
 * reliably forces Safari to re-evaluate the top status bar / Dynamic Island appearance,
 * whereas merely mutating .content often fails to trigger a recalculation.
 */
function updateThemeColorMeta(color: string) {
  if (typeof document === 'undefined') return;
  const existingMetas = document.querySelectorAll('meta[name="theme-color"]');
  existingMetas.forEach((meta) => meta.remove());

  const newMeta = document.createElement('meta');
  newMeta.name = 'theme-color';
  newMeta.content = color;
  newMeta.id = 'theme-color-meta';
  document.head.appendChild(newMeta);
}

/**
 * Safely replaces/updates <meta name="apple-mobile-web-app-status-bar-style">
 * For edge-to-edge fullscreen PWA / Safari standalone display, 'black-translucent'
 * enables web content to render fully under the status bar / Dynamic Island.
 */
function updateAppleStatusBarStyle(style: string) {
  if (typeof document === 'undefined') return;
  const existingMetas = document.querySelectorAll('meta[name="apple-mobile-web-app-status-bar-style"]');
  existingMetas.forEach((meta) => meta.remove());

  const newMeta = document.createElement('meta');
  newMeta.name = 'apple-mobile-web-app-status-bar-style';
  newMeta.content = style;
  newMeta.id = 'apple-status-bar-meta';
  document.head.appendChild(newMeta);
}

interface SavedDomPresentation {
  htmlClassName: string;
  htmlBackgroundColor: string;
  htmlColorScheme: string;
  bodyBackgroundColor: string;
  themeColor: string;
  appleStatusBarStyle: string;
}

/**
 * Host-level synchronizer directly under ThemeProvider:
 * - Reads current theme / resolvedTheme from ThemeProvider as the single source of truth.
 * - Does NOT call setTheme() and does NOT modify localStorage or 4tm_theme_mode.
 * - While /block-puzzle is active (isActive = true), temporarily sets:
 *     1. document.documentElement.dataset.game = 'block-puzzle'
 *     2. Adds 'dark' class, removes 'light' class
 *     3. document.documentElement.style.backgroundColor = '#000000'
 *     4. document.body.style.backgroundColor = '#000000'
 *     5. document.documentElement.style.colorScheme = 'dark'
 *     6. Replaces <meta name="theme-color"> with #000000
 *     7. Replaces <meta name="apple-mobile-web-app-status-bar-style"> with 'black-translucent'
 * - When leaving /block-puzzle (isActive = false), restores the exact DOM presentation:
 *     1. Removes dataset.game
 *     2. Restores html classes, backgrounds, colorScheme, and original theme-color / apple status-bar style
 */
function BlockPuzzleThemeSync({ isActive }: BlockPuzzleThemeSyncProps) {
  const { resolvedTheme } = useTheme();
  const savedPresentationRef = useRef<SavedDomPresentation | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (isActive) {
      // 1. Capture the original DOM presentation exactly once upon entering Block Puzzle
      if (savedPresentationRef.current === null) {
        const currentMeta = (document.getElementById('theme-color-meta') ||
          document.querySelector('meta[name="theme-color"]')) as HTMLMetaElement | null;
        const currentAppleMeta = (document.getElementById('apple-status-bar-meta') ||
          document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')) as HTMLMetaElement | null;

        savedPresentationRef.current = {
          htmlClassName: root.className,
          htmlBackgroundColor: root.style.backgroundColor,
          htmlColorScheme: root.style.colorScheme,
          bodyBackgroundColor: body.style.backgroundColor,
          themeColor: currentMeta?.content || (resolvedTheme === 'dark' ? '#020617' : '#f8fafc'),
          appleStatusBarStyle: currentAppleMeta?.content || (resolvedTheme === 'dark' ? 'black-translucent' : 'default'),
        };
      }

      // 2. Set root route marker for CSS & styling
      root.dataset.game = 'block-puzzle';

      // 3. Temporarily enforce dark classes on <html>
      root.classList.add('dark');
      root.classList.remove('light');

      // 4. Force black background & color-scheme on html and body
      root.style.backgroundColor = '#000000';
      body.style.backgroundColor = '#000000';
      root.style.colorScheme = 'dark';

      // 5. Replace theme-color meta with black for iOS Safari status-bar
      updateThemeColorMeta('#000000');

      // 6. Replace apple-mobile-web-app-status-bar-style with black-translucent for PWA / standalone edge-to-edge
      updateAppleStatusBarStyle('black-translucent');
    } else {
      // Leaving Block Puzzle: restore previous DOM presentation
      if (savedPresentationRef.current !== null) {
        const saved = savedPresentationRef.current;
        savedPresentationRef.current = null;

        // 1. Remove route marker
        delete root.dataset.game;

        // 2. Clean up boot stylesheet if left over from cold load
        const bootStyle = document.getElementById('block-puzzle-boot-css');
        if (bootStyle && bootStyle.parentNode) {
          bootStyle.parentNode.removeChild(bootStyle);
        }
        const earlyStyle = document.getElementById('block-puzzle-early-theme');
        if (earlyStyle && earlyStyle.parentNode) {
          earlyStyle.parentNode.removeChild(earlyStyle);
        }

        // 3. Restore html classes
        root.className = saved.htmlClassName;

        // 4. Restore inline styles
        root.style.backgroundColor = saved.htmlBackgroundColor;
        body.style.backgroundColor = saved.bodyBackgroundColor;
        root.style.colorScheme = saved.htmlColorScheme;

        // 5. Restore original theme-color meta
        updateThemeColorMeta(saved.themeColor);

        // 6. Restore original apple status bar style
        updateAppleStatusBarStyle(saved.appleStatusBarStyle);
      }
    }
  }, [isActive, resolvedTheme]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      const root = document.documentElement;
      const body = document.body;
      delete root.dataset.game;

      const bootStyle = document.getElementById('block-puzzle-boot-css');
      if (bootStyle && bootStyle.parentNode) {
        bootStyle.parentNode.removeChild(bootStyle);
      }
      const earlyStyle = document.getElementById('block-puzzle-early-theme');
      if (earlyStyle && earlyStyle.parentNode) {
        earlyStyle.parentNode.removeChild(earlyStyle);
      }

      if (savedPresentationRef.current !== null) {
        const saved = savedPresentationRef.current;
        savedPresentationRef.current = null;

        root.className = saved.htmlClassName;
        root.style.backgroundColor = saved.htmlBackgroundColor;
        body.style.backgroundColor = saved.bodyBackgroundColor;
        root.style.colorScheme = saved.htmlColorScheme;
        updateThemeColorMeta(saved.themeColor);
        updateAppleStatusBarStyle(saved.appleStatusBarStyle);
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
