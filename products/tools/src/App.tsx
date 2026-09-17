import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { TOOLS } from './data/tools';
import { LANGUAGE_STORAGE_KEY } from './i18n/translations';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Workbench } from './components/Workbench';
import { createClient, User } from '@supabase/supabase-js';
import {
  extractSsoTicketFromUrl,
  exchangeSsoTicket,
  clearSsoStateFromUrl,
} from '@shared/sso';

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

    const incomingTicket = extractSsoTicketFromUrl();
    if (incomingTicket) {
      exchangeSsoTicket(incomingTicket)
        .then(async (tokenData) => {
          if (tokenData && tokenData.access_token && tokenData.refresh_token) {
            await supabase.auth.setSession({
              access_token: tokenData.access_token,
              refresh_token: tokenData.refresh_token,
            });
          }
          clearSsoStateFromUrl();
        })
        .catch((err) => {
          console.warn('SSO ticket exchange failed or expired', err);
          clearSsoStateFromUrl();
        });
    }

    return () => subscription.unsubscribe();
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  const handleSignIn = () => {
    const rootOrigin = 'https://4tm.io.vn';
    const currentOrigin = window.location.origin;
    const targetUrl = new URL(rootOrigin);
    targetUrl.searchParams.set('sso_target', currentOrigin);
    window.location.href = targetUrl.toString();
  };

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        user={user}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />

      <div className="flex-1">
        <Workbench tools={TOOLS} language={language} />
      </div>

      <Footer language={language} />
    </div>
  );
}

export default App;
