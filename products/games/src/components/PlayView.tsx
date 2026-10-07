import React from 'react';
import { Game, Language, getGameTitle } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { ArrowLeft, ShieldCheck, Zap, Globe, Smartphone, Clock, Sparkles } from 'lucide-react';
import { BlockPuzzleGame } from './games/BlockPuzzleGame';
import { BinarySearchGame } from './games/BinarySearchGame';
import { SyntaxMemoryGame } from './games/SyntaxMemoryGame';
import { SortingVisualizerGame } from './games/SortingVisualizerGame';
import { RegexDoorGame } from './games/RegexDoorGame';

export interface PlayViewProps {
  game: Game;
  language: Language;
  onBackToCatalog: () => void;
}

export const PlayView: React.FC<PlayViewProps> = ({ game, language, onBackToCatalog }) => {
  const dict = TRANSLATIONS[language];
  const titleText = getGameTitle(game, language);

  const renderGameArena = () => {
    switch (game.id) {
      case 'block-puzzle':
        return <BlockPuzzleGame language={language} />;
      case 'binary-search':
        return <BinarySearchGame language={language} />;
      case 'syntax-memory':
        return <SyntaxMemoryGame language={language} />;
      case 'sorting-visualizer':
        return <SortingVisualizerGame language={language} />;
      case 'regex-door':
        return <RegexDoorGame language={language} />;
      default:
        return (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="inline-flex p-4 rounded-full bg-blue-500/10 text-blue-500">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {dict.status.planned} — {dict.platforms.comingSoon}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              {game.description[language]}
            </p>
          </div>
        );
    }
  };

  const statusLabel =
    game.status === 'in-development'
      ? dict.status.inDevelopment
      : game.status === 'planned'
      ? dict.status.planned
      : game.status;

  const statusBadgeClass =
    game.status === 'in-development'
      ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30'
      : 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30';

  return (
    <div className="flex-1 flex flex-col w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Top navigation */}
      <button
        type="button"
        id="game-back-btn"
        onClick={onBackToCatalog}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{dict.playView.backToCatalog}</span>
      </button>

      {/* Arena Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-2">
            <span className={`px-2.5 py-0.5 rounded-full border font-bold uppercase ${statusBadgeClass}`}>
              {statusLabel}
            </span>
            <span className="text-rose-700 dark:text-rose-400 font-bold uppercase">
              {game.genre[language]}
            </span>
            <span className="text-slate-400">&bull;</span>
            <span className="text-slate-500 dark:text-slate-400">{game.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {titleText}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono border border-slate-200 dark:border-slate-700">
            {dict.card.difficulty}: {game.difficulty}
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono border border-slate-200 dark:border-slate-700">
            {dict.card.estimate}: {game.playEstimate}
          </span>
        </div>
      </div>

      {/* Supported Platforms Bar */}
      <div className="mb-8 p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-mono font-bold uppercase text-slate-500 text-[11px]">
          {dict.platforms.title}:
        </span>
        <div className="flex flex-wrap items-center gap-3 font-semibold">
          {game.platforms?.web !== false && (
            <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              <Globe className="w-3.5 h-3.5" />
              <span>{dict.platforms.web}</span>
            </span>
          )}

          <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <Smartphone className="w-3.5 h-3.5" />
            <span>App Store ({dict.platforms.comingSoon})</span>
          </span>

          <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Google Play ({dict.platforms.comingSoon})</span>
          </span>
        </div>
      </div>

      {/* Main Game Arena */}
      <div className="mb-10">{renderGameArena()}</div>

      {/* Instructions & Controls Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>{dict.playView.howToPlay}</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{game.objective[language]}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>{dict.playView.controls}</span>
          </h3>
          <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
            {game.controls[language].map((ctrl, idx) => (
              <li key={idx}>{ctrl}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
