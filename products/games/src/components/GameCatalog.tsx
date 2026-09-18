import React, { useState, useMemo } from 'react';
import { Game, GameCategory, GameDifficulty, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { Search, Gamepad2, Play, Sparkles, Clock, Star, Flame } from 'lucide-react';

export interface GameCatalogProps {
  games: Game[];
  language: Language;
  onSelectGame: (game: Game) => void;
}

export const GameCatalog: React.FC<GameCatalogProps> = ({ games, language, onSelectGame }) => {
  const dict = TRANSLATIONS[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredGames = useMemo(() => {
    return games.filter((g) => {
      if (selectedCategory !== 'all' && g.category !== selectedCategory) {
        return false;
      }
      if (selectedDifficulty !== 'all' && g.difficulty !== selectedDifficulty) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = g.title.toLowerCase().includes(q);
        const matchesDesc =
          g.description.en.toLowerCase().includes(q) || g.description.vi.toLowerCase().includes(q);
        const matchesTags = g.techTags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesTags) return false;
      }
      return true;
    });
  }, [games, selectedCategory, selectedDifficulty, searchQuery]);

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

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            {dict.hero.allCategories}
          </button>

          {(['algorithms', 'memory', 'visualizer', 'syntax'] as GameCategory[]).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {dict.categories[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            id={`game-card-${game.id}`}
            onClick={() => onSelectGame(game)}
            className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 hover:border-rose-500/50 hover:shadow-xl hover:shadow-rose-950/10 transition-all duration-200 cursor-pointer shadow-xs"
          >
            <div>
              {/* Badge & Rating Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-bold text-rose-700 dark:text-rose-400 border border-slate-200 dark:border-slate-700">
                  {game.badge}
                </span>

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
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors mb-1">
                {game.title}
              </h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
                {game.genre[language]}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {game.description[language]}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {game.techTags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                  >
                    {t}
                  </span>
                ))}
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
        ))}
      </div>
    </div>
  );
};
