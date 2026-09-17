import React from 'react';
import { Game, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { ArrowLeft, Gamepad2, ShieldCheck, Zap, Sparkles } from 'lucide-react';
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

  const renderGameArena = () => {
    switch (game.id) {
      case 'binary-search':
        return <BinarySearchGame language={language} />;
      case 'syntax-memory':
        return <SyntaxMemoryGame language={language} />;
      case 'sorting-visualizer':
        return <SortingVisualizerGame language={language} />;
      case 'regex-door':
        return <RegexDoorGame language={language} />;
      default:
        return <div>Game coming soon</div>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Top navigation */}
      <button
        type="button"
        id="game-back-btn"
        onClick={onBackToCatalog}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-rose-400 transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{dict.playView.backToCatalog}</span>
      </button>

      {/* Arena Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold uppercase mb-1">
            <span>{game.genre[language]}</span>
            <span>&bull;</span>
            <span>{game.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {game.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700">
            {game.difficulty}
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700">
            Est: {game.playEstimate}
          </span>
        </div>
      </div>

      {/* Main Game Arena */}
      <div className="mb-10">{renderGameArena()}</div>

      {/* Instructions & Controls Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>{dict.playView.howToPlay}</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">{game.objective[language]}</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>{dict.playView.controls}</span>
          </h3>
          <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
            {game.controls[language].map((ctrl, idx) => (
              <li key={idx}>{ctrl}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
