import React, { useState, useEffect } from 'react';
import { Sparkles, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import {
  shouldDisplayAds,
  fetchSystemSettings,
  subscribeSystemSettings,
  getLocalCachedSettings,
  SystemSettingsState,
} from './systemSettings';
import { SupabaseClient } from '@supabase/supabase-js';

export interface AdSlotProps {
  product: 'root' | 'study' | 'ebook' | 'tools' | 'games' | 'apps' | string;
  user?: { id?: string; email?: string; ad_free?: boolean; role?: string } | null;
  supabaseClient?: SupabaseClient | null;
  className?: string;
}

interface SponsoredCampaign {
  id: string;
  badge: string;
  title: string;
  description: string;
  ctaText: string;
  href: string;
  accentColor: string;
  targetProduct: string;
}

const CAMPAIGNS: SponsoredCampaign[] = [
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
    accentColor: 'from-emerald-600 to-teal-600',
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
];

export const AdSlot: React.FC<AdSlotProps> = ({
  product,
  user,
  supabaseClient,
  className = '',
}) => {
  const [settings, setSettings] = useState<SystemSettingsState>(() => getLocalCachedSettings());
  const [activeCampaignIndex, setActiveCampaignIndex] = useState(0);

  useEffect(() => {
    // Initial fetch from Supabase
    fetchSystemSettings(supabaseClient).then((s) => setSettings(s));

    // Subscribe to live changes
    const unsubscribe = subscribeSystemSettings((s) => setSettings(s));
    return () => unsubscribe();
  }, [supabaseClient]);

  // Determine campaign based on current product (pick an ecosystem sister product)
  useEffect(() => {
    const relevant = CAMPAIGNS.filter((c) => c.targetProduct !== product);
    if (relevant.length > 0) {
      const idx = Math.floor(Math.random() * relevant.length);
      const selected = CAMPAIGNS.indexOf(relevant[idx]);
      setActiveCampaignIndex(selected >= 0 ? selected : 0);
    }
  }, [product]);

  // Check if ads should be shown
  const isVisible = shouldDisplayAds(product, user, settings);

  if (!isVisible) {
    return null;
  }

  const campaign = CAMPAIGNS[activeCampaignIndex] || CAMPAIGNS[0];

  return (
    <aside
      id={`ad-slot-${product}`}
      aria-label="Advertisement"
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 transition-all duration-300 ${className}`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900/90 dark:via-slate-900/60 dark:to-slate-900/90 border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-sm">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-36 h-36 rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-3.5 min-w-0">
            {/* Ad Badge / Icon */}
            <div className="shrink-0 mt-0.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            {/* Copy */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300/60 dark:border-slate-700/80">
                  Sponsored • {campaign.badge}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 hidden sm:inline">
                  Verified 4TM Ecosystem Partner
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                {campaign.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2 sm:line-clamp-1">
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
      </div>
    </aside>
  );
};
