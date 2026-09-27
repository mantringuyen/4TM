import React, { useState, useEffect } from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';
import {
  fetchSystemSettings,
  subscribeSystemSettings,
  getLocalCachedSettings,
  SystemSettingsState,
} from '../systemSettings';
import {
  AdSlotProps,
  DEFAULT_CAMPAIGNS,
  BOTTOM_AD_DIMENSIONS,
} from './AdConfig';
import {
  DEFAULT_ADSENSE_CLIENT_ID,
  evaluateAdEligibility,
  shouldLoadAdSenseScript,
  ensureAdSenseScriptLoaded,
  removeAdSenseScript,
} from './AdEligibility';
import { useAds } from './AdProvider';

export const AdSlot: React.FC<AdSlotProps> = ({
  product,
  user,
  supabaseClient,
  className = '',
  adSlotId,
  adFormat = 'auto',
  showDevPlaceholder = false,
  view,
  isLoading = false,
  isAuthChecking = false,
  isSsoProcessing = false,
  isError = false,
  isEmptyResult = false,
  isModalOpen = false,
  isValidRoute = true,
  isContentReady = true,
}) => {
  // Optional AdProvider context
  const adContext = useAds();

  const [localSettings, setLocalSettings] = useState<SystemSettingsState>(() => getLocalCachedSettings());
  const [isSettingsSynced, setIsSettingsSynced] = useState<boolean>(() => !supabaseClient);
  const [activeCampaignIndex, setActiveCampaignIndex] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const [, setLocationTick] = useState(0);

  useEffect(() => {
    setHasMounted(true);
    if (typeof window === 'undefined') return;

    const syncLocation = () => {
      setLocationTick((t) => t + 1);
    };

    window.addEventListener('popstate', syncLocation);
    window.addEventListener('hashchange', syncLocation);
    return () => {
      window.removeEventListener('popstate', syncLocation);
      window.removeEventListener('hashchange', syncLocation);
    };
  }, []);

  // Synchronize settings if outside provider or if supabase client is explicitly passed
  useEffect(() => {
    let active = true;
    if (supabaseClient) {
      fetchSystemSettings(supabaseClient)
        .then((s) => {
          if (active) {
            setLocalSettings(s);
            setIsSettingsSynced(true);
          }
        })
        .catch(() => {
          if (active) setIsSettingsSynced(true);
        });
    } else {
      setIsSettingsSynced(true);
    }

    const unsubscribe = subscribeSystemSettings((s) => {
      if (active) setLocalSettings(s);
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, [supabaseClient]);

  // Merge active settings
  const settings = adContext?.settings || localSettings;

  // Select non-self campaign to promote 4TM ecosystem synergy
  useEffect(() => {
    const relevant = DEFAULT_CAMPAIGNS.filter((c) => c.targetProduct !== product);
    if (relevant.length > 0) {
      const idx = Math.floor(Math.random() * relevant.length);
      const selected = DEFAULT_CAMPAIGNS.indexOf(relevant[idx]);
      setActiveCampaignIndex(selected >= 0 ? selected : 0);
    }
  }, [product]);

  const currentPathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const currentSearch = typeof window !== 'undefined' ? window.location.search : '';
  const currentHash = typeof window !== 'undefined' ? window.location.hash : '';

  const eligibilityContext = {
    product,
    user,
    settings,
    pathname: currentPathname,
    search: currentSearch,
    hash: currentHash,
    view,
    isLoading,
    isAuthChecking,
    isSsoProcessing,
    isError,
    isEmptyResult,
    isModalOpen,
    isValidRoute,
    isContentReady: hasMounted && isSettingsSynced && isContentReady,
  };

  const eligibility = evaluateAdEligibility(eligibilityContext);
  const providerAllowed = adContext ? adContext.shouldShowAds(product, user) : true;
  const isVisible = eligibility.eligible && providerAllowed;

  const isAdSenseMode = settings.ad_provider?.type === 'adsense';
  const rawNetwork = adContext?.adsenseClientId || settings.ad_provider?.network || '';
  const adsenseClient = rawNetwork.startsWith('ca-pub-')
    ? rawNetwork
    : isAdSenseMode
    ? DEFAULT_ADSENSE_CLIENT_ID
    : '';
  const slotIdentifier = adSlotId || settings.ad_provider?.slotId || '';

  // Conditionally load Google AdSense script ONLY when screen eligibility has settled and provider is adsense.
  // If screen becomes ineligible (loading/error/auth/empty/modal/private), cancel pending load and remove script.
  useEffect(() => {
    const canLoadAdSense =
      isVisible &&
      isAdSenseMode &&
      Boolean(adsenseClient) &&
      Boolean(slotIdentifier) &&
      shouldLoadAdSenseScript(eligibilityContext);

    if (!canLoadAdSense) {
      removeAdSenseScript();
      return;
    }

    const timer = window.setTimeout(() => {
      const latestContext = {
        ...eligibilityContext,
        pathname: typeof window !== 'undefined' ? window.location.pathname : currentPathname,
        search: typeof window !== 'undefined' ? window.location.search : currentSearch,
        hash: typeof window !== 'undefined' ? window.location.hash : currentHash,
      };
      if (!shouldLoadAdSenseScript(latestContext)) {
        removeAdSenseScript();
        return;
      }
      ensureAdSenseScriptLoaded(adsenseClient, latestContext).then((loaded) => {
        if (!loaded) return;
        try {
          const w = window as any;
          w.adsbygoogle = w.adsbygoogle || [];
          w.adsbygoogle.push({});
        } catch {
          // Ignore duplicate push on re-render
        }
      });
    }, 50);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    isVisible,
    isAdSenseMode,
    adsenseClient,
    slotIdentifier,
    currentPathname,
    currentSearch,
    currentHash,
    view,
    isLoading,
    isAuthChecking,
    isSsoProcessing,
    isError,
    isEmptyResult,
    isModalOpen,
    isValidRoute,
    isContentReady,
    isSettingsSynced,
  ]);

  if (!isVisible) {
    return null;
  }

  const campaign = DEFAULT_CAMPAIGNS[activeCampaignIndex] || DEFAULT_CAMPAIGNS[0];

  return (
    <aside
      id={`ad-slot-${product}`}
      aria-label="Advertisement"
      className={`${BOTTOM_AD_DIMENSIONS.containerClass} ${className}`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900/90 dark:via-slate-900/60 dark:to-slate-900/90 border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-sm transition-all duration-200 ${BOTTOM_AD_DIMENSIONS.mobileMinHeight} sm:${BOTTOM_AD_DIMENSIONS.desktopMinHeight} flex flex-col justify-center`}
      >
        {/* Subtle decorative accent glow */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-36 h-36 rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-2xl pointer-events-none" />

        {/* Future Google AdSense Slot Structure (when enabled in settings) */}
        {isAdSenseMode && adsenseClient && slotIdentifier ? (
          <div className="w-full flex flex-col items-center justify-center min-h-[90px] relative z-10">
            <ins
              className="adsbygoogle"
              style={{ display: 'block', width: '100%' }}
              data-ad-client={adsenseClient}
              data-ad-slot={slotIdentifier}
              data-ad-format={adFormat}
              data-full-width-responsive="true"
            />
            {/* Safe Fallback / Dev Indicator if AdSense script is not yet mounted */}
            <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>AdSense Ready ({slotIdentifier})</span>
            </div>
          </div>
        ) : (
          /* Standard 4TM Ecosystem Partner / House Banner */
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-start gap-3.5 min-w-0">
              {/* Ad Icon / Brand Indicator */}
              <div className="shrink-0 mt-0.5">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${campaign.accentColor} text-white flex items-center justify-center shadow-sm`}>
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              {/* Ad Content / Copy */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300/60 dark:border-slate-700/80">
                    Sponsored • {campaign.badge}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 hidden sm:inline">
                    Verified 4TM Ecosystem Partner
                  </span>
                  {(showDevPlaceholder || adContext?.isDev) && (
                    <span className="text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                      Ad Space Reserved (Zero CLS)
                    </span>
                  )}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                  {campaign.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2 sm:line-clamp-1 leading-relaxed">
                  {campaign.description}
                </p>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <a
                href={campaign.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                <span>{campaign.ctaText}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
