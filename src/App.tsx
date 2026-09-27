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
  useSEO,
  SchemaGenerators,
} from '@shared';
import { useLanguage } from './i18n/LanguageContext';
import { issueSsoTicket } from './services/ssoIssuer';
import type { User, Session } from '@supabase/supabase-js';

const SSO_PENDING_PEER_REQUEST_KEY = '4tm_sso_pending_peer_request';

const RootContent: React.FC<{
  user: User | null;
  onOpenAuthModal: () => void;
  onSignOut: () => void;
  isSigningOut: boolean;
  ssoNotice: string | null;
  ssoProcessing: boolean;
  isAuthModalOpen: boolean;
  isValidRoute: boolean;
  isAuthOrSsoRoute: boolean;
}> = ({
  user,
  onOpenAuthModal,
  onSignOut,
  isSigningOut,
  ssoNotice,
  ssoProcessing,
  isAuthModalOpen,
  isValidRoute,
  isAuthOrSsoRoute,
}) => {
  const { language } = useLanguage();

  useSEO({
    title:
      language === 'vi'
        ? 'Hệ sinh thái 4TM — Học lập trình & Kỹ thuật phần mềm thực chiến'
        : '4TM Ecosystem — Learning by Doing',
    description:
      language === 'vi'
        ? 'Cổng thông tin hệ sinh thái 4TM kết nối nền tảng học lập trình tương tác (Study), thư viện ấn phẩm kỹ thuật (Ebook), bộ công cụ lập trình (Tools), ứng dụng web (Apps) và trò chơi tư duy máy tính (Games).'
        : 'Official 4TM Ecosystem Homepage connecting Interactive Programming LMS (Study), Engineering Ebooks, Developer Utilities (Tools), Web Applications (Apps), and CS Games.',
    canonicalUrl: 'https://4tm.io.vn/',
    language,
    noindex: !isValidRoute || isAuthOrSsoRoute,
    jsonLd: [
      SchemaGenerators.organization(),
      SchemaGenerators.website(
        'https://4tm.io.vn',
        '4TM Ecosystem',
        'Official 4TM Ecosystem Homepage connecting Study, Ebook, Tools, Apps, and Games.'
      ),
    ],
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {ssoNotice && (
        <div className="bg-blue-600 text-white text-xs font-semibold py-2 px-4 text-center sticky top-0 z-50 transition-all shadow-md">
          {ssoNotice}
        </div>
      )}
      <Navbar
        user={user}
        onOpenAuthModal={onOpenAuthModal}
        onSignOut={onSignOut}
        isSigningOut={isSigningOut}
      />
      <main className="flex-1">
        <Hero />
        <EcosystemGrid />
        <WhySection />
        <SynergySection />
      </main>
      <AdSlot
        product="root"
        user={user}
        supabaseClient={supabase}
        isSsoProcessing={ssoProcessing}
        isModalOpen={isAuthModalOpen}
        isValidRoute={isValidRoute && !isAuthOrSsoRoute}
      />
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [ssoProcessing, setSsoProcessing] = useState(false);
  const [ssoNotice, setSsoNotice] = useState<string | null>(null);

  const currentPathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isAuthOrSsoRoute =
    currentPathname === '/sso' ||
    currentPathname.startsWith('/sso/') ||
    currentPathname === '/auth' ||
    currentPathname.startsWith('/auth/');
  const isValidRoute =
    currentPathname === '/' ||
    currentPathname === '' ||
    currentPathname === '/index.html';

  // Helper to complete a pending peer SSO request (/auth?target_origin=...&state=...) once authenticated
  const fulfillPendingPeerSso = async (
    targetOrigin: string,
    state: string,
    redirectPath = ''
  ) => {
    if (!isValidSsoTargetOrigin(targetOrigin) || !state) return false;
    setSsoProcessing(true);
    setSsoNotice(`Routing to ${targetOrigin}...`);
    const issueRes = await issueSsoTicket({
      supabaseClient: supabase,
      targetOrigin,
      state,
      redirectPath,
    });
    if (issueRes.success && issueRes.redirectUrl) {
      window.location.replace(issueRes.redirectUrl);
      return true;
    }
    setSsoProcessing(false);
    setSsoNotice(null);
    return false;
  };

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

      if (session?.user && typeof window !== 'undefined' && window.sessionStorage) {
        const rawPending = window.sessionStorage.getItem(SSO_PENDING_PEER_REQUEST_KEY);
        if (rawPending) {
          window.sessionStorage.removeItem(SSO_PENDING_PEER_REQUEST_KEY);
          try {
            const parsed = JSON.parse(rawPending);
            if (parsed?.targetOrigin && parsed?.state) {
              fulfillPendingPeerSso(parsed.targetOrigin, parsed.state, parsed.redirectPath || '');
            }
          } catch {
            // Ignore malformed sessionStorage payload
          }
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 2. Handle SP-initiated SSO incoming request (/sso or /auth) and callback fragments
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const pathname = window.location.pathname;
    const search = window.location.search || '';
    const hash = window.location.hash || '';
    const searchParams = new URLSearchParams(search.startsWith('?') ? search.substring(1) : search);
    const hashParams = new URLSearchParams(hash.startsWith('#') ? hash.substring(1) : hash);

    // A. SP-Initiated Handshake Entry: Root creates state nonce and redirects to peer
    if (pathname === '/sso' || pathname === '/auth' || search.includes('from=')) {
      const fromPeer = searchParams.get('from');
      const downstreamTarget = searchParams.get('target_origin');

      if (fromPeer === 'study') {
        setSsoProcessing(true);
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

      // Direct peer SSO auth request: /auth?target_origin=...&state=... (without ticket callback)
      const peerTargetOrigin = searchParams.get('target_origin');
      const peerState = searchParams.get('state');
      const peerRedirectPath = searchParams.get('redirect_path') || '';

      if (
        !hash.includes('ticket=') &&
        !search.includes('ticket=') &&
        peerTargetOrigin &&
        peerState &&
        isValidSsoTargetOrigin(peerTargetOrigin)
      ) {
        setSsoProcessing(true);
        // Clean query parameters from address bar while handling SSO
        if (window.history && window.history.replaceState) {
          window.history.replaceState({}, document.title, '/');
        }

        if (supabase) {
          supabase.auth.getSession().then(async ({ data: { session: activeSess } }) => {
            if (activeSess?.user) {
              await fulfillPendingPeerSso(peerTargetOrigin, peerState, peerRedirectPath);
            } else {
              if (window.sessionStorage) {
                window.sessionStorage.setItem(
                  SSO_PENDING_PEER_REQUEST_KEY,
                  JSON.stringify({
                    targetOrigin: peerTargetOrigin,
                    state: peerState,
                    redirectPath: peerRedirectPath,
                  })
                );
              }
              setSsoProcessing(false);
              setIsAuthModalOpen(true);
            }
          });
        } else {
          setSsoProcessing(false);
          setIsAuthModalOpen(true);
        }
        return;
      }
    }

    // B. SSO Callback Handoff (Return from Study or external IdP with ticket on / or /auth)
    if (hash.includes('ticket=') || search.includes('ticket=')) {
      setSsoProcessing(true);

      // Capture any explicit target_origin passed in callback before parseAndScrubSsoCallback scrubs the URL
      const callbackTargetOrigin =
        hashParams.get('target_origin') || searchParams.get('target_origin');

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
          let downstreamTarget: string | null = callbackTargetOrigin || null;
          if (window.sessionStorage) {
            const storedTarget = window.sessionStorage.getItem(SSO_DOWNSTREAM_TARGET_STORAGE_KEY);
            window.sessionStorage.removeItem(SSO_DOWNSTREAM_TARGET_STORAGE_KEY);
            if (!downstreamTarget && storedTarget) {
              downstreamTarget = storedTarget;
            }
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
        <RootContent
          user={user}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onSignOut={handleSignOut}
          isSigningOut={isSigningOut}
          ssoNotice={ssoNotice}
          ssoProcessing={ssoProcessing}
          isAuthModalOpen={isAuthModalOpen}
          isValidRoute={isValidRoute}
          isAuthOrSsoRoute={isAuthOrSsoRoute}
        />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
