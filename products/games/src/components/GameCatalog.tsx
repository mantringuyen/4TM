import React, { useState, useMemo } from 'react';
import { Game, GameCategory, Language, getGameTitle, isPublicGameStatus } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { Search, Gamepad2, Play, Clock, Star, Globe, Smartphone, RotateCcw, Layers } from 'lucide-react';

export interface GameCatalogProps {
  games: Game[];
  language: Language;
  onSelectGame: (game: Game) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const GameCatalog: React.FC<GameCatalogProps> = ({
  games,
  language,
  onSelectGame,
  searchQuery: propSearchQuery,
  onSearchChange,
}) => {
  const dict = TRANSLATIONS[language];
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const searchQuery = propSearchQuery !== undefined ? propSearchQuery : internalSearchQuery;
  const setSearchQuery = onSearchChange || setInternalSearchQuery;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Programmatically enforce game visibility rule:
  // ONLY status === 'in-development' OR status === 'planned' are visible.
  // Internal, temporary, test, prototype, archived, and unknown statuses are strictly excluded.
  const publicGames = useMemo(() => {
    return games.filter((g) => isPublicGameStatus(g.status));
  }, [games]);

  const filteredGames = useMemo(() => {
    return publicGames.filter((g) => {
      // Category filter
      if (selectedCategory !== 'all' && g.category !== selectedCategory) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'all' && g.status !== selectedStatus) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleText = getGameTitle(g, language).toLowerCase();
        const matchesTitle = titleText.includes(q);
        const matchesDesc =
          g.description.en.toLowerCase().includes(q) || g.description.vi.toLowerCase().includes(q);
        const matchesTags = g.techTags.some((t) => t.toLowerCase().includes(q));
        const matchesGenre =
          g.genre.en.toLowerCase().includes(q) || g.genre.vi.toLowerCase().includes(q);

        if (!matchesTitle && !matchesDesc && !matchesTags && !matchesGenre) {
          return false;
        }
      }
      return true;
    });
  }, [publicGames, selectedCategory, selectedStatus, searchQuery, language]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 text-xs font-bold font-mono uppercase tracking-wider mb-4 border border-rose-500/20 dark:border-rose-500/30">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>{dict.hero.eyebrow}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
          {dict.hero.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {dict.hero.description}
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-4 mb-10">
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
          <input
            id="games-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={dict.hero.searchPlaceholder}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-xs"
          />
        </div>

        {/* Filters Row: Categories & Status */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {/* Category Filter Pills */}
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {dict.hero.allCategories}
          </button>

          {(['puzzle', 'algorithms', 'memory', 'visualizer', 'syntax'] as GameCategory[]).map(
            (cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {dict.categories[cat]}
              </button>
            )
          )}

          <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1 hidden sm:block" />

          {/* Status Filter Selector */}
          <select
            id="status-filter-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
          >
            <option value="all">{dict.status.filterAll}</option>
            <option value="in-development">{dict.status.inDevelopment}</option>
            <option value="planned">{dict.status.planned}</option>
          </select>
        </div>
      </div>

      {/* Games Grid or Empty State */}
      {filteredGames.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-xl mx-auto space-y-4">
          <div className="inline-flex p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            {dict.catalog.emptyTitle}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {dict.catalog.emptyDesc}
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{dict.catalog.resetFilters}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGames.map((game) => {
            const titleText = getGameTitle(game, language);

            const statusLabel =
              game.status === 'in-development'
                ? dict.status.inDevelopment
                : game.status === 'planned'
                ? dict.status.planned
                : game.status;

            const statusBadgeClass =
              game.status === 'in-development'
                ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25'
                : 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/25';

            return (
              <div
                key={game.id}
                id={`game-card-${game.id}`}
                onClick={() => onSelectGame(game)}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 hover:border-rose-500/50 hover:shadow-xl hover:shadow-rose-950/10 transition-all duration-200 cursor-pointer shadow-xs"
              >
                <div>
                  {/* Public Status Badge & Rating Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border uppercase flex items-center gap-1.5 ${statusBadgeClass}`}
                      >
                        {game.status === 'in-development' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        )}
                        <span>{statusLabel}</span>
                      </span>

                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                        {game.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{game.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{game.playEstimate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Genre */}
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors mb-1 leading-snug">
                    {titleText}
                  </h2>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    {game.genre[language]}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {game.description[language]}
                  </p>

                  {/* Tech Tags & Supported Platforms */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex flex-wrap gap-1.5">
                      {game.techTags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                      {game.platforms?.web !== false && (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <Globe className="w-3 h-3" />
                          <span>Web</span>
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <Smartphone className="w-3 h-3" />
                        <span>Mobile</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Play Action */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 capitalize">
                    {dict.card.difficulty}: {game.difficulty}
                  </span>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold bg-rose-600 group-hover:bg-rose-500 text-white shadow-md shadow-rose-600/20 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{dict.card.playNow}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
