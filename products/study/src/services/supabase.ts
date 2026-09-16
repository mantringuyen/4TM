import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseConfig, createSupabaseClient } from '@shared';

// Access environment variables directly through import.meta.env or @shared config or runtime global
const sharedConfig = getSupabaseConfig();
const windowEnv = typeof window !== 'undefined' ? (window as any).__ENV__ || {} : {};
const rawUrl = (
  import.meta.env.VITE_SUPABASE_URL ||
  windowEnv.VITE_SUPABASE_URL ||
  sharedConfig.url ||
  ''
).trim();
const rawAnonKey = (
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  windowEnv.VITE_SUPABASE_ANON_KEY ||
  sharedConfig.anonKey ||
  ''
).trim();

/**
 * Safely normalizes the Supabase URL by trimming whitespace, stripping accidental
 * `/rest/v1` subpaths (case-insensitive), and removing trailing slashes.
 */
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

if (!isSupabaseConfigured) {
  if (!supabaseUrl) {
    console.error('Supabase configuration error: VITE_SUPABASE_URL is missing or empty.');
  }
  if (!supabaseAnonKey) {
    console.error('Supabase configuration error: VITE_SUPABASE_ANON_KEY is missing or empty.');
  }
} else if (rawUrl !== supabaseUrl) {
  console.warn(
    `Notice: VITE_SUPABASE_URL contained unexpected subpaths or trailing slashes ("${rawUrl}"). Normalized to: "${supabaseUrl}"`
  );
}

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

