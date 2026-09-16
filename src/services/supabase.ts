import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseConfig } from '@shared';

const sharedConfig = getSupabaseConfig ? getSupabaseConfig() : { url: '', anonKey: '' };
const windowEnv = typeof window !== 'undefined' ? (window as any).__ENV__ || {} : {};
const rawUrl = (
  import.meta.env.VITE_SUPABASE_URL ||
  windowEnv.VITE_SUPABASE_URL ||
  sharedConfig?.url ||
  ''
).trim();
const rawAnonKey = (
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  windowEnv.VITE_SUPABASE_ANON_KEY ||
  sharedConfig?.anonKey ||
  ''
).trim();

export const normalizeSupabaseUrl = (url: string): string => {
  if (!url) return '';
  return url
    .trim()
    .replace(/\/rest\/v1\/?$/i, '')
    .replace(/\/+$/, '');
};

const supabaseUrl = normalizeSupabaseUrl(rawUrl);
const supabaseAnonKey = rawAnonKey;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
