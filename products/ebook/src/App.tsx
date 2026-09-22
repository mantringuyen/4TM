import React, { useState, useEffect, useCallback } from 'react';
import { Book, BookMetadata, Language } from './types';
import { EBOOKS, CATEGORIES, SUBJECTS } from './data/ebooks';
import { loadBookContent, getCachedBookContent } from './data/loaders';
import { LANGUAGE_STORAGE_KEY } from './i18n/translations';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CatalogView } from './components/CatalogView';
import { BookDetailView } from './components/BookDetailView';
import { ReaderView } from './components/ReaderView';
import { createClient, User } from '@supabase/supabase-js';
import { processSsoCallback, initiateSsoAuthRequest } from '@shared/sso';
import { ThemeProvider, AdSlot } from '@shared';

// Client-side Supabase client (lazy & safe fallback)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Approved Phase 4U legacy-to-canonical slug alias map
const LEGACY_SLUG_ALIASES: Record<string, string> = {
  'python-definitions': 'python-core-concepts-definitions',
  'python-tips': 'python-engineering-tips',
  'python-common-errors': 'python-common-errors-diagnosis',
  'python-best-practices': 'python-engineering-best-practices',
  'python-practical-guides': 'python-practical-guides-solutions',
  'python-patterns': 'python-patterns-recipes',
};

// Helper: Parse URL hash to state
function parseLocationHash(hash: string): {
  view: 'catalog' | 'detail' | 'reader';
  bookSlug?: string;
  chapterIndex?: number;
} {
  if (!hash || hash.includes('ticket=')) {
    return { view: 'catalog' };
  }
  const clean = hash.replace(/^#\/?/, '').trim();
  if (!clean || clean === 'catalog') {
    return { view: 'catalog' };
  }

  const readerMatch = clean.match(/^book\/([^/]+)\/ch\/(\d+)$/i);
  if (readerMatch) {
    return {
      view: 'reader',
      bookSlug: decodeURIComponent(readerMatch[1]),
      chapterIndex: parseInt(readerMatch[2], 10),
    };
  }

  const detailMatch = clean.match(/^book\/([^/]+)$/i);
  if (detailMatch) {
    return {
      view: 'detail',
      bookSlug: decodeURIComponent(detailMatch[1]),
    };
  }

  return { view: 'catalog' };
}

// Helper: Safely update window hash / history
function setHashUrl(hash: string, replace = false) {
  if (typeof window === 'undefined') return;
  if (window.location.hash === hash) return;
  if (replace) {
    window.history.replaceState(null, '', hash);
  } else {
    window.history.pushState(null, '', hash);
  }
}

export function App() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'en' || saved === 'vi') return saved;
    }
    return 'en';
  });

  const [activeView, setActiveView] = useState<'catalog' | 'detail' | 'reader'>('catalog');
  const [selectedBook, setSelectedBook] = useState<Book | BookMetadata | null>(null);
  const [isLoadingBookContent, setIsLoadingBookContent] = useState<boolean>(false);
  const [bookContentLoadError, setBookContentLoadError] = useState<boolean>(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  // Bookmarks state
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('4tm_ebook_bookmarks');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return [];
  });

  // Last read positions per book
  const [lastRead, setLastRead] = useState<Record<string, number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('4tm_ebook_last_read');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return {};
  });

  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBookContent = useCallback(async (slugOrId: string) => {
    const cached = getCachedBookContent(slugOrId);
    if (cached) {
      setSelectedBook(cached);
      setIsLoadingBookContent(false);
      setBookContentLoadError(false);
      return cached;
    }

    setIsLoadingBookContent(true);
    setBookContentLoadError(false);
    try {
      const loaded = await loadBookContent(slugOrId);
      if (loaded) {
        setSelectedBook(loaded);
        setIsLoadingBookContent(false);
        setBookContentLoadError(false);
        return loaded;
      } else {
        setIsLoadingBookContent(false);
        setBookContentLoadError(true);
        return null;
      }
    } catch (err) {
      console.error('Error loading book content:', err);
      setIsLoadingBookContent(false);
      setBookContentLoadError(true);
      return null;
    }
  }, []);

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    if (activeView !== 'catalog' && q) {
      setActiveView('catalog');
      setSelectedBook(null);
      setHashUrl('#/catalog');
    }
  };

  // Sync route state from window.location.hash
  const syncRouteFromHash = useCallback(() => {
    if (typeof window === 'undefined') return;
    const currentHash = window.location.hash || '';
    if (currentHash.includes('ticket=')) return;

    const parsed = parseLocationHash(currentHash);

    if (parsed.view === 'catalog') {
      setActiveView('catalog');
      setSelectedBook(null);
      setIsLoadingBookContent(false);
      setBookContentLoadError(false);
    } else if (parsed.view === 'detail' && parsed.bookSlug) {
      const rawSlug = parsed.bookSlug;
      const canonicalSlug = LEGACY_SLUG_ALIASES[rawSlug] || rawSlug;
      const foundBook = EBOOKS.find(
        (b) => b.slug === canonicalSlug || b.id === canonicalSlug
      );
      if (foundBook) {
        const cached = getCachedBookContent(canonicalSlug);
        setSelectedBook(cached || foundBook);
        setActiveView('detail');
        setIsLoadingBookContent(false);
        setBookContentLoadError(false);
        if (rawSlug !== canonicalSlug) {
          setHashUrl(`#/book/${canonicalSlug}`, true);
        }
      } else {
        // Fallback to catalog if book not found
        setActiveView('catalog');
        setSelectedBook(null);
        setHashUrl('#/catalog', true);
      }
    } else if (parsed.view === 'reader' && parsed.bookSlug) {
      const rawSlug = parsed.bookSlug;
      const canonicalSlug = LEGACY_SLUG_ALIASES[rawSlug] || rawSlug;
      const foundBook = EBOOKS.find(
        (b) => b.slug === canonicalSlug || b.id === canonicalSlug
      );
      if (foundBook) {
        const rawCh = typeof parsed.chapterIndex === 'number' && !isNaN(parsed.chapterIndex) ? parsed.chapterIndex : 0;
        const validCh = Math.max(0, Math.min(rawCh, foundBook.chapters.length - 1));
        const cached = getCachedBookContent(canonicalSlug);
        setSelectedBook(cached || foundBook);
        setCurrentChapterIndex(validCh);
        setActiveView('reader');
        fetchBookContent(canonicalSlug);
        if (rawSlug !== canonicalSlug) {
          setHashUrl(`#/book/${canonicalSlug}/ch/${validCh}`, true);
        }
      } else {
        // Fallback to catalog if book not found
        setActiveView('catalog');
        setSelectedBook(null);
        setHashUrl('#/catalog', true);
      }
    }
  }, [fetchBookContent]);

  // Handle URL hash changes & initial deep-link routing
  useEffect(() => {
    syncRouteFromHash();

    const handleHashOrPopState = () => {
      syncRouteFromHash();
    };

    window.addEventListener('hashchange', handleHashOrPopState);
    window.addEventListener('popstate', handleHashOrPopState);

    return () => {
      window.removeEventListener('hashchange', handleHashOrPopState);
      window.removeEventListener('popstate', handleHashOrPopState);
    };
  }, [syncRouteFromHash]);

  // Centralized Navigation Scroll Reset: Return to top of page on view, book, or chapter change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [activeView, selectedBook?.id, currentChapterIndex]);

  // Initialize Auth & Handle SSO Ticket
  useEffect(() => {
    if (!supabase) return;

    // Check existing session
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

  const handleSelectBook = (book: Book | BookMetadata) => {
    setSelectedBook(book);
    setActiveView('detail');
    setHashUrl(`#/book/${book.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartReading = (chapterIndex: number) => {
    setCurrentChapterIndex(chapterIndex);
    if (selectedBook) {
      const updated = { ...lastRead, [selectedBook.id]: chapterIndex };
      setLastRead(updated);
      localStorage.setItem('4tm_ebook_last_read', JSON.stringify(updated));
      setHashUrl(`#/book/${selectedBook.slug}/ch/${chapterIndex}`);
      fetchBookContent(selectedBook.slug);
    }
    setActiveView('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateChapter = (idx: number) => {
    setCurrentChapterIndex(idx);
    if (selectedBook) {
      const updated = { ...lastRead, [selectedBook.id]: idx };
      setLastRead(updated);
      localStorage.setItem('4tm_ebook_last_read', JSON.stringify(updated));
      setHashUrl(`#/book/${selectedBook.slug}/ch/${idx}`);
    }
  };

  const handleToggleBookmark = (chapterId: string) => {
    setBookmarks((prev) => {
      const exists = prev.includes(chapterId);
      const next = exists ? prev.filter((id) => id !== chapterId) : [...prev, chapterId];
      localStorage.setItem('4tm_ebook_bookmarks', JSON.stringify(next));
      return next;
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

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        {/* Navigation (hidden when in deep reader mode for distraction-free reading) */}
        {activeView !== 'reader' && (
          <Navbar
            language={language}
            onLanguageChange={handleLanguageChange}
            onNavigateHome={() => {
              setActiveView('catalog');
              setSelectedBook(null);
              setSearchQuery('');
              setHashUrl('#/catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            user={user}
            onSignIn={handleSignIn}
            onSignOut={handleSignOut}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        )}

        {/* Main View Flow */}
        <div className="flex-1 w-full min-w-0">
          {activeView === 'catalog' && (
            <CatalogView
              books={EBOOKS}
              categories={CATEGORIES}
              subjects={SUBJECTS}
              language={language}
              onSelectBook={handleSelectBook}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
          )}

          {activeView === 'detail' && selectedBook && (
            <BookDetailView
              book={selectedBook}
              language={language}
              onBack={() => {
                setActiveView('catalog');
                setSelectedBook(null);
                setHashUrl('#/catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onStartReading={handleStartReading}
              savedChapterIndex={lastRead[selectedBook.id] || 0}
            />
          )}

          {activeView === 'reader' && selectedBook && (
            <ReaderView
              book={selectedBook}
              currentChapterIndex={currentChapterIndex}
              language={language}
              onNavigateChapter={handleNavigateChapter}
              onBackToBook={() => {
                setActiveView('detail');
                if (selectedBook) {
                  setHashUrl(`#/book/${selectedBook.slug}`);
                } else {
                  setHashUrl('#/catalog');
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
              isLoading={isLoadingBookContent}
              loadError={bookContentLoadError}
              onRetry={() => {
                if (selectedBook) {
                  fetchBookContent(selectedBook.slug);
                }
              }}
            />
          )}
        </div>

        {/* Footer (hidden in reader mode) */}
        {activeView !== 'reader' && <AdSlot product="ebook" user={user} supabaseClient={supabase} />}
        {activeView !== 'reader' && <Footer language={language} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
