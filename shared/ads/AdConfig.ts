import { SupabaseClient } from '@supabase/supabase-js';

export type AdProviderType = 'partner_banner' | 'house' | 'adsense' | 'custom' | 'none';

export type AdProductKey = 'root' | 'study' | 'ebook' | 'tools' | 'games' | 'apps' | string;

export interface SponsoredCampaign {
  id: string;
  badge: string;
  title: string;
  description: string;
  ctaText: string;
  href: string;
  accentColor: string;
  targetProduct: string;
}

export interface AdSlotProps {
  product: AdProductKey;
  user?: { id?: string; email?: string; ad_free?: boolean; role?: string } | null;
  supabaseClient?: SupabaseClient | null;
  className?: string;
  adSlotId?: string;
  adFormat?: 'auto' | 'horizontal' | 'rectangle';
  showDevPlaceholder?: boolean;
  view?: string;
  isLoading?: boolean;
  isAuthChecking?: boolean;
  isSsoProcessing?: boolean;
  isError?: boolean;
  isEmptyResult?: boolean;
  isModalOpen?: boolean;
  isValidRoute?: boolean;
  isContentReady?: boolean;
}

export interface AdSystemConfig {
  adsenseClientId?: string;
  defaultBottomSlotId?: string;
  isDev?: boolean;
}

export const DEFAULT_CAMPAIGNS: SponsoredCampaign[] = [
  {
    id: 'campaign-study-pro',
    badge: '4TM Study',
    title: 'Interactive Python & Full-Stack tracks with browser WASM',
    description: 'Master algorithms, systems programming, and database architecture with real-time browser execution.',
    ctaText: 'Start Learning',
    href: 'https://study.4tm.io.vn',
    accentColor: 'from-blue-600 to-indigo-600',
    targetProduct: 'study',
  },
  {
    id: 'campaign-ebook-library',
    badge: '4TM Ebook',
    title: '54 curated engineering handbooks & cheat sheets',
    description: 'Deep-dive technical guides with code samples, takeaways, and zero-distraction reader mode.',
    ctaText: 'Browse Catalog',
    href: 'https://ebook.4tm.io.vn',
    accentColor: 'from-teal-600 to-emerald-600',
    targetProduct: 'ebook',
  },
  {
    id: 'campaign-tools-suite',
    badge: '4TM Tools',
    title: 'High-speed offline-first developer workbench',
    description: 'Data converters, SQL formatters, JWT decoders, and regex analyzers with zero telemetry.',
    ctaText: 'Open Tools',
    href: 'https://tools.4tm.io.vn',
    accentColor: 'from-amber-600 to-orange-600',
    targetProduct: 'tools',
  },
  {
    id: 'campaign-root-ecosystem',
    badge: '4TM Ecosystem',
    title: 'Integrated developer education & engineering workbench',
    description: 'Explore interconnected tracks across Study, Ebooks, Tools, and interactive software modules.',
    ctaText: 'Explore Ecosystem',
    href: 'https://4tm.io.vn',
    accentColor: 'from-sky-600 to-blue-600',
    targetProduct: 'root',
  },
];

/**
 * Standard bottom ad slot reserved dimensions to prevent Cumulative Layout Shift (CLS)
 */
export const BOTTOM_AD_DIMENSIONS = {
  mobileMinHeight: 'min-h-[96px]',
  desktopMinHeight: 'min-h-[104px]',
  containerClass: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 sm:my-8',
};
