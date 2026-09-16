import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './theme/ThemeContext';
import { LanguageProvider } from './i18n/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EcosystemGrid } from './components/EcosystemGrid';
import { WhySection } from './components/WhySection';
import { SynergySection } from './components/SynergySection';
import { Footer } from './components/Footer';
import { supabase, isSupabaseConfigured } from './services/supabase';
import { processSsoCallback, parseAndScrubSsoCallback, generateSsoState, isValidSsoTargetOrigin } from '@shared';
import { issueSsoTicket } from './services/ssoIssuer';

export const App: React.FC = () => {
  const [ssoProcessing, setSsoProcessing] = useState(false);
  const [ssoNotice, setSsoNotice] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash || '';
    const search = window.location.search || '';

    // Detect if this is an incoming SSO handoff or callback
    if (hash.includes('ticket=') || search.includes('ticket=')) {
      setSsoProcessing(true);
      const searchParams = new URLSearchParams(search.startsWith('?') ? search.substring(1) : search);
      const downstreamTarget = searchParams.get('target_origin');

      // 1. Process SSO callback at Root
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

          // 2. If downstream target is requested (Flow C: Product -> Product through Root)
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

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200">
          {ssoNotice && (
            <div className="bg-blue-600 text-white text-xs font-semibold py-2 px-4 text-center sticky top-0 z-50 transition-all shadow-md">
              {ssoNotice}
            </div>
          )}
          <Navbar />
          <main className="flex-1">
            <Hero />
            <EcosystemGrid />
            <WhySection />
            <SynergySection />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
