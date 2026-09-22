import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  SystemSettingsState,
  DEFAULT_SYSTEM_SETTINGS,
  getLocalCachedSettings,
  fetchSystemSettings,
  subscribeSystemSettings,
  shouldDisplayAds,
} from '../systemSettings';
import { AdProductKey, AdSystemConfig } from './AdConfig';

interface AdContextValue {
  settings: SystemSettingsState;
  isAdsEnabled: boolean;
  shouldShowAds: (
    product: AdProductKey,
    user?: { id?: string; email?: string; ad_free?: boolean; role?: string } | null
  ) => boolean;
  adsenseClientId?: string;
  isDev?: boolean;
}

const AdContext = createContext<AdContextValue>({
  settings: DEFAULT_SYSTEM_SETTINGS,
  isAdsEnabled: true,
  shouldShowAds: (product, user) => shouldDisplayAds(product, user, DEFAULT_SYSTEM_SETTINGS),
});

export interface AdProviderProps {
  children: React.ReactNode;
  supabaseClient?: SupabaseClient | null;
  initialSettings?: SystemSettingsState;
  config?: AdSystemConfig;
  disabled?: boolean;
}

export const AdProvider: React.FC<AdProviderProps> = ({
  children,
  supabaseClient,
  initialSettings,
  config,
  disabled = false,
}) => {
  const [settings, setSettings] = useState<SystemSettingsState>(
    () => initialSettings || getLocalCachedSettings()
  );

  useEffect(() => {
    // 1. Initial fetch from database if client provided
    if (supabaseClient) {
      fetchSystemSettings(supabaseClient).then((s) => setSettings(s));
    }

    // 2. Subscribe to realtime updates across ecosystem
    const unsubscribe = subscribeSystemSettings((updated) => {
      setSettings(updated);
    });

    return () => {
      unsubscribe();
    };
  }, [supabaseClient]);

  const isAdsEnabled = !disabled && settings.ads_enabled;

  const checkShouldShowAds = (
    product: AdProductKey,
    user?: { id?: string; email?: string; ad_free?: boolean; role?: string } | null
  ): boolean => {
    if (disabled) return false;
    return shouldDisplayAds(product, user, settings);
  };

  const contextValue: AdContextValue = {
    settings,
    isAdsEnabled,
    shouldShowAds: checkShouldShowAds,
    adsenseClientId: config?.adsenseClientId,
    isDev: config?.isDev,
  };

  return <AdContext.Provider value={contextValue}>{children}</AdContext.Provider>;
};

export const useAds = (): AdContextValue => {
  return useContext(AdContext);
};
