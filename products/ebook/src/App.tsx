import React, { useState, useEffect } from 'react';
import { Book, Language } from './types';
import { EBOOKS, CATEGORIES, SUBJECTS } from './data/ebooks';
import { LANGUAGE_STORAGE_KEY } from './i18n/translations';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CatalogView } from './components/CatalogView';
import { BookDetailView } from './components/BookDetailView';
import { ReaderView } from './components/ReaderView';
import { createClient, User } from '@supabase/supabase-js';
import { processSsoCallback, initiateSsoAuthRequest } from '@shared/sso';

// Client-side Supabase client (lazy & safe fallback)
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

  const [activeView, setActiveView] = useState<'catalog' | 'detail' | 'reader'>('catalog');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
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

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setActiveView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartReading = (chapterIndex: number) => {
    setCurrentChapterIndex(chapterIndex);
    if (selectedBook) {
      const updated = { ...lastRead, [selectedBook.id]: chapterIndex };
      setLastRead(updated);
      localStorage.setItem('4tm_ebook_last_read', JSON.stringify(updated));
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
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Navigation (hidden when in deep reader mode for distraction-free reading) */}
      {activeView !== 'reader' && (
        <Navbar
          language={language}
          onLanguageChange={handleLanguageChange}
          onNavigateHome={() => {
            setActiveView('catalog');
            setSelectedBook(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          user={user}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
        />
      )}

      {/* Main View Flow */}
      <div className="flex-1">
        {activeView === 'catalog' && (
          <CatalogView
            books={EBOOKS}
            categories={CATEGORIES}
            subjects={SUBJECTS}
            language={language}
            onSelectBook={handleSelectBook}
          />
        )}

        {activeView === 'detail' && selectedBook && (
          <BookDetailView
            book={selectedBook}
            language={language}
            onBack={() => {
              setActiveView('catalog');
              setSelectedBook(null);
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
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
          />
        )}
      </div>

      {/* Footer (hidden in reader mode) */}
      {activeView !== 'reader' && <Footer language={language} />}
    </div>
  );
}

export default App;
