import React from 'react';
import { Game, Language, getGameTitle } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import {
  ArrowLeft,
  Play,
  Star,
  Clock,
  Globe,
  Smartphone,
  Gamepad2,
  Sparkles,
  Layers,
  Cpu,
  CheckCircle2,
} from 'lucide-react';

export interface BlockPuzzleDetailsProps {
  game: Game;
  language: Language;
  onPlay: () => void;
  onBackToCatalog: () => void;
}

export const BlockPuzzleDetails: React.FC<BlockPuzzleDetailsProps> = ({
  game,
  language,
  onPlay,
  onBackToCatalog,
}) => {
  const dict = TRANSLATIONS[language];
  const titleText = getGameTitle(game, language);

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
    <div className="flex-1 min-h-0 flex flex-col w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-8 lg:py-10">
      {/* Top navigation */}
      <button
        type="button"
        id="details-back-btn"
        onClick={onBackToCatalog}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors mb-3 sm:mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{dict.playView.backToCatalog}</span>
      </button>

      {/* Hero Overview Header */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 mb-6 sm:mb-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className={`px-2.5 py-0.5 rounded-full border font-bold uppercase flex items-center gap-1.5 ${statusBadgeClass}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>{statusLabel}</span>
            </span>
            <span className="text-rose-700 dark:text-rose-400 font-bold uppercase">
              {game.genre[language]}
            </span>
            <span className="text-slate-400 hidden sm:inline">&bull;</span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold border border-slate-200 dark:border-slate-700">
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
            <div className="hidden sm:block px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              {dict.card.difficulty}: {game.difficulty}
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
          {titleText}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mb-6">
          {game.description[language]}
        </p>

        {/* Primary Play CTA */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="button"
            id="block-puzzle-play-now-btn"
            onClick={onPlay}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm sm:text-base font-black bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/25 hover:shadow-rose-600/35 transition-all cursor-pointer transform active:scale-95"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>{language === 'vi' ? 'Chơi Ngay Trực Tuyến' : 'Play Online Now'}</span>
          </button>

          <div className="flex flex-wrap gap-1.5 items-center">
            {game.techTags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-mono border border-slate-200 dark:border-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Details Grid: Mission, Controls, Tech, Platforms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Objective & Mission */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-rose-600 dark:text-rose-400 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <h3>{dict.playView.howToPlay}</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {game.objective[language]}
          </p>
        </div>

        {/* Controls & Inputs */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-rose-600 dark:text-rose-400 font-bold text-sm">
            <Gamepad2 className="w-4 h-4" />
            <h3>{dict.playView.controls}</h3>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {game.controls[language].map((control, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <span>{control}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Architecture & Asset Streaming */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-rose-600 dark:text-rose-400 font-bold text-sm">
            <Cpu className="w-4 h-4" />
            <h3>{language === 'vi' ? 'Kiến Trúc & Công Nghệ' : 'Architecture & Game Engine'}</h3>
          </div>
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">{language === 'vi' ? 'Công Nghệ Game' : 'Engine'}:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">Godot 4.3 Web (WASM / WebGL 2)</span>
            </div>
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">{language === 'vi' ? 'Kho Tài Nguyên R2' : 'CDN Storage'}:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Cloudflare R2 Production</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">{language === 'vi' ? 'Đường Dẫn Dữ Liệu' : 'Asset Base'}:</span>
              <span className="font-bold text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                https://games-data.4tm.io.vn/block-puzzle/
              </span>
            </div>
          </div>
        </div>

        {/* Supported Platforms */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-rose-600 dark:text-rose-400 font-bold text-sm">
            <Layers className="w-4 h-4" />
            <h3>{dict.platforms.title}</h3>
          </div>
          <div className="flex flex-col gap-2 pt-1 text-xs">
            <div className="inline-flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>{dict.platforms.web}</span>
              </div>
              <span className="text-[11px] font-mono uppercase font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full">
                {language === 'vi' ? 'Khả Dụng Ngay' : 'Instant Play'}
              </span>
            </div>

            <div className="inline-flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 font-semibold">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                <span>iOS App Store & Google Play</span>
              </div>
              <span className="text-[11px] font-mono uppercase bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                {dict.platforms.comingSoon}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
