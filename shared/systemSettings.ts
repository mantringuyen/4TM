/**
 * 4TM Ecosystem Centralized System Settings & Global Ad System Service
 */

import { SupabaseClient } from '@supabase/supabase-js';

export interface AdsProductConfig {
  study?: boolean;
  ebook?: boolean;
  tools?: boolean;
  games?: boolean;
  apps?: boolean;
  root?: boolean;
  [key: string]: boolean | undefined;
}

export interface AdProviderConfig {
  type: 'partner_banner' | 'house' | 'adsense' | 'custom' | 'none';
  network?: string;
  slotId?: string;
}

export interface SystemSettingsState {
  public_registration_enabled: boolean;
  ads_enabled: boolean;
  ads_products: AdsProductConfig;
  ad_provider: AdProviderConfig;
}

export type SystemSettings = SystemSettingsState;

export const DEFAULT_SYSTEM_SETTINGS: SystemSettingsState = {
  public_registration_enabled: false,
  ads_enabled: true,
  ads_products: {
    study: true,
    ebook: true,
    tools: true,
    games: true,
    apps: true,
    root: false,
  },
  ad_provider: {
    type: 'partner_banner',
    network: 'house',
  },
};

const CACHE_KEY = '4tm_system_settings_cache';
const CACHE_TTL_MS = 60 * 1000; // 1 minute local cache

let memoryCache: { data: SystemSettingsState; timestamp: number } | null = null;
const listeners = new Set<(settings: SystemSettingsState) => void>();

export function subscribeSystemSettings(callback: (settings: SystemSettingsState) => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function notifyListeners(settings: SystemSettingsState) {
  listeners.forEach((fn) => {
    try {
      fn(settings);
    } catch (e) {
      console.warn('SystemSettings listener error:', e);
    }
  });
}

/**
 * Reads settings from localStorage cache if available
 */
export function getLocalCachedSettings(): SystemSettingsState {
  if (memoryCache && Date.now() - memoryCache.timestamp < CACHE_TTL_MS) {
    return memoryCache.data;
  }
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.public_registration_enabled === 'boolean') {
          memoryCache = { data: parsed, timestamp: Date.now() };
          return parsed;
        }
      }
    } catch {}
  }
  return DEFAULT_SYSTEM_SETTINGS;
}

/**
 * Saves settings to local cache and memory
 */
export function setLocalCachedSettings(settings: SystemSettingsState) {
  memoryCache = { data: settings, timestamp: Date.now() };
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(settings));
    } catch {}
  }
  notifyListeners(settings);
}

/**
 * Fetches all system settings from Supabase database with fallback to local cache
 */
export async function fetchSystemSettings(
  supabaseClient?: SupabaseClient | null
): Promise<SystemSettingsState> {
  const current = getLocalCachedSettings();
  if (!supabaseClient) {
    return current;
  }

  try {
    const { data, error } = await supabaseClient
      .from('system_settings')
      .select('key, value');

    if (error || !Array.isArray(data)) {
      return current;
    }

    const merged: SystemSettingsState = { ...DEFAULT_SYSTEM_SETTINGS };

    for (const row of data) {
      if (row.key === 'public_registration_enabled') {
        merged.public_registration_enabled = Boolean(
          typeof row.value === 'boolean' ? row.value : row.value === 'true' || row.value === true
        );
      } else if (row.key === 'ads_enabled') {
        merged.ads_enabled = Boolean(
          typeof row.value === 'boolean' ? row.value : row.value === 'true' || row.value === true
        );
      } else if (row.key === 'ads_products') {
        merged.ads_products = {
          ...DEFAULT_SYSTEM_SETTINGS.ads_products,
          ...(typeof row.value === 'object' && row.value ? row.value : {}),
        };
      } else if (row.key === 'ad_provider') {
        merged.ad_provider = {
          ...DEFAULT_SYSTEM_SETTINGS.ad_provider,
          ...(typeof row.value === 'object' && row.value ? row.value : {}),
        };
      }
    }

    setLocalCachedSettings(merged);
    return merged;
  } catch (err) {
    console.warn('Failed to fetch system_settings from database:', err);
    return current;
  }
}

/**
 * Admin: Update a specific system setting in Supabase
 */
export async function adminUpdateSystemSetting(
  key: keyof SystemSettingsState | string,
  value: any,
  supabaseClient?: SupabaseClient | null,
  description?: string
): Promise<{ success: boolean; error?: string }> {
  // Update local memory & cache immediately for responsive UI
  const current = getLocalCachedSettings();
  const updated: SystemSettingsState = {
    ...current,
    [key]: value,
  };
  setLocalCachedSettings(updated);

  if (!supabaseClient) {
    return { success: true };
  }

  try {
    const { error } = await supabaseClient.rpc('admin_update_system_setting', {
      p_key: key,
      p_value: typeof value === 'object' ? value : JSON.stringify(value),
      p_description: description || null,
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to update system setting.' };
  }
}

/**
 * Admin: Update a user's ad_free status
 */
export async function adminSetUserAdFree(
  userId: string,
  adFree: boolean,
  supabaseClient?: SupabaseClient | null
): Promise<{ success: boolean; error?: string }> {
  if (!supabaseClient) {
    return { success: true };
  }

  try {
    const { error } = await supabaseClient.rpc('admin_set_user_ad_free', {
      target_user_id: userId,
      p_ad_free: adFree,
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to update user ad-free status.' };
  }
}

/**
 * Checks if public registration is currently enabled
 */
export function isPublicRegistrationEnabled(): boolean {
  return getLocalCachedSettings().public_registration_enabled;
}

/**
 * Checks if ads should be rendered for a given product and user
 */
export function shouldDisplayAds(
  product: 'root' | 'study' | 'ebook' | 'tools' | 'games' | 'apps' | string,
  user?: { id?: string; ad_free?: boolean; role?: string } | null,
  settings?: SystemSettingsState
): boolean {
  // 1. If user is explicitly Ad-Free (e.g. VIP / Ad-Free subscription / admin exempt)
  if (user?.ad_free === true) {
    return false;
  }

  if (typeof window !== 'undefined') {
    try {
      if (localStorage.getItem('4tm_ad_free') === 'true') {
        return false;
      }
    } catch {}
  }

  const s = settings || getLocalCachedSettings();

  // 2. If master switch is OFF
  if (!s.ads_enabled) {
    return false;
  }

  // 3. If ad provider is none
  if (s.ad_provider?.type === 'none') {
    return false;
  }

  // 4. Check product-specific config
  const productKey = product.toLowerCase();
  if (s.ads_products && s.ads_products[productKey] === false) {
    return false;
  }

  return true;
}
