/**
 * 4TM Digital Ecosystem — Product Accent Color Tokens (V1)
 *
 * Centralized, authoritative color tokens defining the subtle product identity
 * for 4TM Root and each subdomain product:
 * - 4TM Ecosystem: Deep Navy #0B1E3B (accent: #1E40AF)
 * - Study: Indigo #6366F1
 * - Ebook: Forest Teal #0D9488
 * - Games: Ruby / Dark Red #BE123C
 * - Apps: Burnt Orange #B45309
 * - Tools: Slate Gray #475569
 *
 * Rules:
 * - Product Accent is a subtle shell/badge identity, NOT a full-page theme.
 * - Does NOT replace Study course colors or semantic states.
 */

export type ProductId = 'ecosystem' | 'hub' | 'study' | 'ebook' | 'games' | 'apps' | 'tools';

export interface ProductAccentToken {
  id: ProductId;
  name: string;
  badgeLabel: string;
  family: string;
  primary: string;         // Primary accent hex
  lightTint: string;       // Light-mode 10% tint background
  lightText: string;       // High-contrast light-mode text (WCAG AAA >= 7:1)
  darkHighlight: string;   // High-contrast dark-mode text/highlight (WCAG AA >= 4.5:1)
  classes: {
    badge: string;         // Tailwind classes for sub-brand badge
    activeNav: string;     // Active nav indicator classes
    cta: string;           // Product-level primary action button classes
    ring: string;          // Focus/interaction ring classes
  };
}

export const PRODUCT_ACCENTS: Record<string, ProductAccentToken> = {
  ecosystem: {
    id: 'ecosystem',
    name: '4TM Ecosystem',
    badgeLabel: 'ecosystem',
    family: 'Navy / Blue',
    primary: '#1E40AF',
    lightTint: '#EFF6FF',
    lightText: '#1E3A8A',
    darkHighlight: '#60A5FA',
    classes: {
      badge: 'bg-blue-500/10 dark:bg-blue-500/15 border-blue-500/20 dark:border-blue-500/30 text-blue-700 dark:text-blue-400',
      activeNav: 'border-blue-600 text-blue-600 dark:text-blue-400',
      cta: 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20',
      ring: 'focus:ring-blue-500/30 focus:border-blue-500',
    },
  },
  hub: {
    id: 'hub',
    name: '4TM Ecosystem',
    badgeLabel: 'ecosystem',
    family: 'Navy / Blue',
    primary: '#1E40AF',
    lightTint: '#EFF6FF',
    lightText: '#1E3A8A',
    darkHighlight: '#60A5FA',
    classes: {
      badge: 'bg-blue-500/10 dark:bg-blue-500/15 border-blue-500/20 dark:border-blue-500/30 text-blue-700 dark:text-blue-400',
      activeNav: 'border-blue-600 text-blue-600 dark:text-blue-400',
      cta: 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20',
      ring: 'focus:ring-blue-500/30 focus:border-blue-500',
    },
  },
  study: {
    id: 'study',
    name: 'Study — 4TM',
    badgeLabel: 'study',
    family: 'Indigo',
    primary: '#6366F1',
    lightTint: '#EEF2FF',
    lightText: '#3730A3',
    darkHighlight: '#A5B4FC',
    classes: {
      badge: 'bg-indigo-500/10 dark:bg-indigo-500/15 border-indigo-500/20 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400',
      activeNav: 'border-indigo-600 text-indigo-600 dark:text-indigo-400',
      cta: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20',
      ring: 'focus:ring-indigo-500/30 focus:border-indigo-500',
    },
  },
  ebook: {
    id: 'ebook',
    name: 'Ebook — 4TM',
    badgeLabel: 'ebook',
    family: 'Forest Teal',
    primary: '#0D9488',
    lightTint: '#F0FDFA',
    lightText: '#115E59',
    darkHighlight: '#5EEAD4',
    classes: {
      badge: 'bg-teal-500/10 dark:bg-teal-500/15 border-teal-500/20 dark:border-teal-500/30 text-teal-700 dark:text-teal-300',
      activeNav: 'border-teal-600 text-teal-600 dark:text-teal-400',
      cta: 'bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-600/20',
      ring: 'focus:ring-teal-500/30 focus:border-teal-500',
    },
  },
  games: {
    id: 'games',
    name: 'Games — 4TM',
    badgeLabel: 'games',
    family: 'Ruby / Dark Red',
    primary: '#BE123C',
    lightTint: '#FFF1F2',
    lightText: '#881337',
    darkHighlight: '#FDA4AF',
    classes: {
      badge: 'bg-rose-500/10 dark:bg-rose-500/15 border-rose-500/20 dark:border-rose-500/30 text-rose-700 dark:text-rose-300',
      activeNav: 'border-rose-600 text-rose-600 dark:text-rose-400',
      cta: 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20',
      ring: 'focus:ring-rose-500/30 focus:border-rose-500',
    },
  },
  apps: {
    id: 'apps',
    name: 'Apps — 4TM',
    badgeLabel: 'apps',
    family: 'Burnt Orange',
    primary: '#B45309',
    lightTint: '#FFFBEB',
    lightText: '#78350F',
    darkHighlight: '#FCD34D',
    classes: {
      badge: 'bg-amber-600/10 dark:bg-amber-500/15 border-amber-600/25 dark:border-amber-500/30 text-amber-800 dark:text-amber-300',
      activeNav: 'border-amber-600 text-amber-600 dark:text-amber-400',
      cta: 'bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/20',
      ring: 'focus:ring-amber-500/30 focus:border-amber-500',
    },
  },
  tools: {
    id: 'tools',
    name: 'Tools — 4TM',
    badgeLabel: 'tools',
    family: 'Slate Gray',
    primary: '#475569',
    lightTint: '#F1F5F9',
    lightText: '#0F172A',
    darkHighlight: '#CBD5E1',
    classes: {
      badge: 'bg-slate-500/10 dark:bg-slate-500/15 border-slate-500/20 dark:border-slate-500/30 text-slate-700 dark:text-slate-300',
      activeNav: 'border-slate-600 text-slate-700 dark:text-slate-300',
      cta: 'bg-slate-800 hover:bg-slate-700 dark:bg-slate-200 dark:hover:bg-white text-white dark:text-slate-900 shadow-md shadow-slate-900/20',
      ring: 'focus:ring-slate-500/30 focus:border-slate-500',
    },
  },
};

/**
 * Safely resolves the ProductAccentToken for any product string or hostname
 */
export function getProductAccent(identifier?: string): ProductAccentToken {
  if (!identifier || !identifier.trim()) {
    return PRODUCT_ACCENTS.ecosystem;
  }
  const key = identifier.trim().toLowerCase();
  return PRODUCT_ACCENTS[key] || PRODUCT_ACCENTS.ecosystem;
}
