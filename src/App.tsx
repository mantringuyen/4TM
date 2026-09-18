import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './theme/ThemeContext';
import { LanguageProvider } from './i18n/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EcosystemGrid } from './components/EcosystemGrid';
import { WhySection } from './components/WhySection';
import { SynergySection } from './components/SynergySection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { supabase, isSupabaseConfigured } from './services/supabase';
import { authService } from './services/authService';
import {
  processSsoCallback,
  generateSsoState,
  isValidSsoTargetOrigin,
  SSO_STATE_STORAGE_KEY,
  SSO_DOWNSTREAM_TARGET_STORAGE_KEY,
  AdSlot,
} from '@shared';
import { issueSsoTicket } from './services/ssoIssuer';
import type { User, Session } from '@supabase/supabase-js';

export const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [ssoProcessing, setSsoProcessing] = useState(false);
  const [ssoNotice, setSsoNotice] = useState<string | null>(null);

  // 1. Root Supabase session lifecycle
  useEffect(() => {
    if (!supabase) return;

    // Load initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    // Reactive subscription to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 2. Handle SP-initiated SSO incoming request /sso?from=... and callback fragments
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const pathname = window.location.pathname;
    const search = window.location.search || '';
    const hash = window.location.hash || '';

    // A. SP-Initiated Handshake Entry: Root creates state nonce and redirects to peer
    if (pathname === '/sso' || search.includes('from=')) {
      const searchParams = new URLSearchParams(search.startsWith('?') ? search.substring(1) : search);
      const fromPeer = searchParams.get('from');
      const downstreamTarget = searchParams.get('target_origin');

      if (fromPeer === 'study') {
        const rootState = generateSsoState();
        if (window.sessionStorage) {
          window.sessionStorage.setItem(SSO_STATE_STORAGE_KEY, rootState);
          if (downstreamTarget && isValidSsoTargetOrigin(downstreamTarget)) {
            window.sessionStorage.setItem(SSO_DOWNSTREAM_TARGET_STORAGE_KEY, downstreamTarget);
          } else {
            window.sessionStorage.removeItem(SSO_DOWNSTREAM_TARGET_STORAGE_KEY);
          }
        }

        // Redirect browser to Study handoff endpoint
        const redirectUrl = `https://study.4tm.io.vn/sso/handoff?state=${encodeURIComponent(rootState)}`;
        window.location.replace(redirectUrl);
        return;
      }
    }

    // B. SSO Callback Handoff (Return from Study or external IdP with ticket)
    if (hash.includes('ticket=') || search.includes('ticket=')) {
      setSsoProcessing(true);

      // Process SSO callback using Root's local sessionStorage state
      processSsoCallback({
        supabaseClient: supabase,
        targetOrigin: 'https://4tm.io.vn',
      })
        .then(async (result) => {
          if (!result.success) {
            setSsoNotice(`SSO Sign-in error: ${result.error || 'Failed to authenticate'}`);
            setSsoProcessing(false);
            return;
          }

          // Check if downstream target was stored during SP-initiation (Flow C: Study -> Root -> Games)
          let downstreamTarget: string | null = null;
          if (window.sessionStorage) {
            downstreamTarget = window.sessionStorage.getItem(SSO_DOWNSTREAM_TARGET_STORAGE_KEY);
            window.sessionStorage.removeItem(SSO_DOWNSTREAM_TARGET_STORAGE_KEY);
          }

          if (
            downstreamTarget &&
            downstreamTarget !== 'https://4tm.io.vn' &&
            isValidSsoTargetOrigin(downstreamTarget)
          ) {
            setSsoNotice(`Routing to ${downstreamTarget}...`);
            const newState = generateSsoState();
            const issueRes = await issueSsoTicket({
              supabaseClient: supabase,
              targetOrigin: downstreamTarget,
              state: newState,
            });

            if (issueRes.success && issueRes.redirectUrl) {
              window.location.href = issueRes.redirectUrl;
              return;
            }
          }

          setSsoNotice('Signed in successfully via 4TM Ecosystem SSO.');
          setTimeout(() => setSsoNotice(null), 4000);
          setSsoProcessing(false);
        })
        .catch((err) => {
          console.error('SSO handoff processing error:', err);
          setSsoNotice('SSO processing failed.');
          setSsoProcessing(false);
        });
    }
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await authService.signOut();
    } catch (err) {
      console.error('Root sign out error:', err);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200">
          {ssoNotice && (
            <div className="bg-blue-600 text-white text-xs font-semibold py-2 px-4 text-center sticky top-0 z-50 transition-all shadow-md">
              {ssoNotice}
            </div>
          )}
          <Navbar
            user={user}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onSignOut={handleSignOut}
            isSigningOut={isSigningOut}
          />
          <main className="flex-1">
            <Hero />
            <EcosystemGrid />
            <WhySection />
            <SynergySection />
          </main>
          <AdSlot product="root" user={user} supabaseClient={supabase} />
          <Footer />

          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
          />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
