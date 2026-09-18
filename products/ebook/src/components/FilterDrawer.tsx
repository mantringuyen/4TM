import React from 'react';
import { BookType, Language } from '../types';
import { DOMAINS } from '../data/ebooks';
import { TRANSLATIONS } from '../i18n/translations';
import {
  X,
  RotateCcw,
  SlidersHorizontal,
  Check,
  Layers,
  BookMarked,
  GraduationCap,
  Sparkles,
  Code,
  Layout,
  Database,
} from 'lucide-react';

export interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  selectedDomain: string;
  onSelectDomain: (domainId: string) => void;
  selectedBookType: string;
  onSelectBookType: (type: string) => void;
  selectedLevel: string;
  onSelectLevel: (level: string) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
}

const OFFICIAL_BOOK_TYPES: BookType[] = [
  'Handbook',
  'Definitions',
  'Tips',
  'Practical Guides',
  'Common Errors',
  'Best Practices',
  'Patterns / Recipes',
];

function getDomainIcon(iconName: string) {
  switch (iconName) {
    case 'Code':
      return Code;
    case 'Layout':
      return Layout;
    case 'Database':
      return Database;
    case 'Sparkles':
      return Sparkles;
    default:
      return Layers;
  }
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  language,
  selectedDomain,
  onSelectDomain,
  selectedBookType,
  onSelectBookType,
  selectedLevel,
  onSelectLevel,
  onResetFilters,
  activeFilterCount,
}) => {
  if (!isOpen) return null;

  const dict = TRANSLATIONS[language];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
      {/* Backdrop click to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col z-10 border-l border-slate-200 dark:border-slate-800 animate-slideLeft">
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-black text-slate-900 dark:text-white">
              {language === 'vi' ? 'Bộ Lọc Chuyên Sâu' : 'Advanced Filters'}
            </h2>
            {activeFilterCount > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-600 text-white">
                {activeFilterCount}
              </span>
            )}
          </div>

          <button
            type="button"
            id="close-filter-drawer-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Section 1: Domain Selection */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-500" />
              <span>{dict.filter.domain}</span>
            </label>

            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                id="drawer-domain-all"
                onClick={() => onSelectDomain('all')}
                className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  selectedDomain === 'all'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <span>{dict.filter.allDomains}</span>
                {selectedDomain === 'all' && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
              </button>

              {DOMAINS.map((domain) => {
                const Icon = getDomainIcon(domain.icon);
                const isSelected = selectedDomain === domain.id;
                return (
                  <button
                    key={domain.id}
                    id={`drawer-domain-${domain.id}`}
                    type="button"
                    onClick={() => onSelectDomain(domain.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span>{domain.name[language]}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Book Type Chips */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <BookMarked className="w-3.5 h-3.5 text-blue-500" />
              <span>{dict.filter.bookType}</span>
            </label>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                id="drawer-booktype-all"
                onClick={() => onSelectBookType('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  selectedBookType === 'all'
                    ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                }`}
              >
                {dict.filter.allBookTypes}
              </button>

              {OFFICIAL_BOOK_TYPES.map((bt) => {
                const isSelected = selectedBookType === bt;
                return (
                  <button
                    key={bt}
                    id={`drawer-booktype-${bt.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    type="button"
                    onClick={() => onSelectBookType(bt)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {dict.filter.bookTypes?.[bt] || bt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Level Selection */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
              <span>{dict.filter.level}</span>
            </label>

            <div className="grid grid-cols-2 gap-2">
              {['all', 'Foundational', 'Intermediate', 'Advanced'].map((lvl) => {
                const isSelected = selectedLevel === lvl;
                return (
                  <button
                    key={lvl}
                    id={`drawer-level-${lvl.toLowerCase()}`}
                    type="button"
                    onClick={() => onSelectLevel(lvl)}
                    className={`p-2.5 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {lvl === 'all' ? dict.filter.all : lvl}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between gap-3">
          <button
            type="button"
            id="drawer-reset-btn"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{dict.filter.clearFilters}</span>
          </button>

          <button
            type="button"
            id="drawer-apply-btn"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-colors cursor-pointer text-center"
          >
            {language === 'vi' ? 'Áp Dụng Bộ Lọc' : 'Apply Filters'}
          </button>
        </div>
      </div>
    </div>
  );
};
