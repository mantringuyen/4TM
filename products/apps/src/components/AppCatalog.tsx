import React, { useState, useMemo } from 'react';
import { AppItem, AppCategory, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { Search, LayoutGrid, Sparkles, ExternalLink, Heart, ArrowRight } from 'lucide-react';

export interface AppCatalogProps {
  apps: AppItem[];
  language: Language;
  onSelectApp: (app: AppItem) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const AppCatalog: React.FC<AppCatalogProps> = ({
  apps,
  language,
  onSelectApp,
  favorites,
  onToggleFavorite,
}) => {
  const dict = TRANSLATIONS[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      if (selectedCategory !== 'all' && app.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = app.name.toLowerCase().includes(q);
        const matchesTagline =
          app.tagline.en.toLowerCase().includes(q) || app.tagline.vi.toLowerCase().includes(q);
        const matchesSpecs = app.techSpecs.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesTagline && !matchesSpecs) return false;
      }
      return true;
    });
  }, [apps, selectedCategory, searchQuery]);

  return (
    <div id="directory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold font-mono uppercase tracking-wider mb-4 border border-indigo-500/20">
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>{dict.hero.eyebrow}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
          {dict.hero.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {dict.hero.description}
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-4 mb-10">
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="apps-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={dict.hero.searchPlaceholder}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {dict.hero.allCategories}
          </button>

          {(['productivity', 'devtools', 'learning', 'creative'] as AppCategory[]).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {dict.categories[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* App Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredApps.map((app) => {
          const isFav = favorites.includes(app.id);

          return (
            <div
              key={app.id}
              id={`app-card-${app.id}`}
              onClick={() => onSelectApp(app)}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-200 cursor-pointer text-slate-900 dark:text-white"
            >
              <div>
                {/* Header: Badge & Favorite Button */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700">
                      {app.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      v{app.version}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(app.id);
                    }}
                    className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                      isFav
                        ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800 text-rose-500'
                        : 'border-transparent text-slate-400 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Name & Tagline */}
                <h3 className="text-xl sm:text-2xl font-black group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">
                  {app.name}
                </h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
                  {app.tagline[language]}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {app.description[language]}
                </p>

                {/* Tech Specs */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {app.techSpecs.map((spec) => (
                    <span
                      key={spec}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-750"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 capitalize">
                  {dict.categories[app.category]}
                </span>

                <div className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                  <span>{dict.card.openApp}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
