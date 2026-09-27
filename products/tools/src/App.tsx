import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { TOOLS } from './data/tools';
import { LANGUAGE_STORAGE_KEY } from './i18n/translations';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Workbench } from './components/Workbench';
import { createClient, User } from '@supabase/supabase-js';
import { processSsoCallback, initiateSsoAuthRequest } from '@shared/sso';
import { ThemeProvider, AdSlot, isValidProductPublicRoute, hasDisallowedUrlParams } from '@shared';

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

  const [user, setUser] = useState<User | null>(null);
  const [ssoProcessing, setSsoProcessing] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      (window.location.hash || '').includes('ticket=') ||
      (window.location.search || '').includes('ticket=') ||
      hasDisallowedUrlParams(window.location.search, window.location.hash)
    );
  });
  const [isToolsEmpty, setIsToolsEmpty] = useState(false);
  const [isValidRoute, setIsValidRoute] = useState(() => {
    if (typeof window === 'undefined') return true;
    return isValidProductPublicRoute('tools', window.location.pathname, window.location.hash);
  });
  const [isWorkspaceLoading, setIsWorkspaceLoading] = useState(false);

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
        setSsoProcessing(true);
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
          })
          .finally(() => {
            setSsoProcessing(false);
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
          <Workbench
            tools={TOOLS}
            language={language}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onResultCountChange={(count) => setIsToolsEmpty(count === 0)}
            onRouteValidityChange={setIsValidRoute}
            onWorkspaceLoadingChange={setIsWorkspaceLoading}
          />
        </div>

        <AdSlot
          product="tools"
          user={user}
          supabaseClient={supabase}
          isLoading={isWorkspaceLoading}
          isSsoProcessing={ssoProcessing}
          isEmptyResult={isToolsEmpty}
          isValidRoute={isValidRoute}
        />
        <Footer language={language} />
      </div>
    </ThemeProvider>
  );
}

export default App;
