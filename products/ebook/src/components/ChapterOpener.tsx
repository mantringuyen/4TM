import React from 'react';
import { Chapter, Book, Language, ReaderPaperTheme } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { Clock, BookOpen, Bookmark, CheckCircle, ChevronDown } from 'lucide-react';

export interface ChapterOpenerProps {
  book: Book;
  chapter: Chapter;
  chapterIndex: number;
  totalChapters: number;
  language: Language;
  paperTheme: ReaderPaperTheme;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
  onScrollToSection?: (sectionId: string) => void;
}

export const ChapterOpener: React.FC<ChapterOpenerProps> = ({
  book,
  chapter,
  chapterIndex,
  totalChapters,
  language,
  paperTheme,
  isBookmarked = false,
  onToggleBookmark,
  onScrollToSection,
}) => {
  const dict = TRANSLATIONS[language];
  const chapterNumberFormatted = String(chapter.number).padStart(2, '0');

  // Theme-adaptive styles for chapter opener
  const themeStyles = {
    default: {
      eyebrow: 'text-blue-600',
      rule: 'border-slate-300',
      abstractBg: 'bg-slate-50 border-l-4 border-l-blue-600 text-slate-700',
      metaText: 'text-slate-500',
      numeral: 'text-slate-900/15',
    },
    sepia: {
      eyebrow: 'text-amber-800',
      rule: 'border-[#dfd3bc]',
      abstractBg: 'bg-[#ede3d1] border-l-4 border-l-amber-700 text-[#433422]',
      metaText: 'text-[#7d6b55]',
      numeral: 'text-[#433422]/15',
    },
    dark: {
      eyebrow: 'text-blue-400',
      rule: 'border-slate-800',
      abstractBg: 'bg-slate-900 border-l-4 border-l-blue-500 text-slate-300',
      metaText: 'text-slate-400',
      numeral: 'text-slate-100/10',
    },
    midnight: {
      eyebrow: 'text-indigo-400',
      rule: 'border-indigo-950/60',
      abstractBg: 'bg-[#0a0f1d] border-l-4 border-l-indigo-500 text-slate-300',
      metaText: 'text-slate-400',
      numeral: 'text-indigo-200/10',
    },
  }[paperTheme];

  return (
    <header className="relative mb-12 sm:mb-16 pt-2 select-text w-full min-w-0">
      {/* Editorial Running Imprint & Folio */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-black/10 dark:border-white/10 text-xs font-mono mb-8 sm:mb-12 opacity-75">
        <div className="flex items-center gap-2 tracking-widest uppercase font-bold text-[10px] sm:text-xs">
          <span className="w-2 h-2 rounded-xs bg-blue-600 dark:bg-blue-400" />
          <span>4TM TECHNICAL PUBLICATIONS</span>
          <span className="opacity-40">•</span>
          <span className="truncate max-w-[200px] sm:max-w-[320px] font-normal">{book.title}</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-medium">
          <span>
            {language === 'vi' ? 'Chương' : 'Chapter'} {chapter.number} / {totalChapters}
          </span>
          {onToggleBookmark && (
            <button
              type="button"
              onClick={onToggleBookmark}
              className="inline-flex items-center gap-1.5 hover:text-blue-500 transition-colors cursor-pointer"
              title={isBookmarked ? dict.reader.chapterBookmarked : dict.reader.bookmarkChapter}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current text-blue-500' : ''}`} />
              <span className="hidden sm:inline">
                {isBookmarked ? dict.reader.chapterBookmarked : dict.reader.bookmarkChapter}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Chapter Opener Layout */}
      <div className="relative">
        {/* Giant Editorial Watermark Numeral in Background */}
        <div
          aria-hidden="true"
          className={`absolute right-0 -top-8 sm:-top-14 select-none font-reader font-black text-7xl sm:text-9xl tracking-tighter ${themeStyles.numeral} pointer-events-none z-0`}
        >
          {chapterNumberFormatted}
        </div>

        {/* Chapter Super-heading */}
        <div className="relative z-10 flex items-center gap-3 mb-3 sm:mb-4">
          <span
            className={`text-xs sm:text-sm font-mono font-bold tracking-widest uppercase ${themeStyles.eyebrow}`}
          >
            {language === 'vi' ? 'CHƯƠNG' : 'CHAPTER'} {chapterNumberFormatted}
          </span>
          <span className="h-px flex-1 bg-current opacity-20 max-w-[80px]" />
          <span className={`text-xs font-mono ${themeStyles.metaText}`}>
            {book.bookType}
          </span>
        </div>

        {/* Chapter Title in Editorial Serif */}
        <h1 className="relative z-10 text-3xl sm:text-5xl font-black font-reader tracking-tight leading-[1.15] mb-4 sm:mb-6">
          {chapter.title[language]}
        </h1>

        {/* Chapter Reading Metadata Strip */}
        <div
          className={`relative z-10 flex flex-wrap items-center gap-4 text-xs font-mono ${themeStyles.metaText} mb-6 sm:mb-8`}
        >
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 opacity-75" />
            <span>{chapter.readTimeMinutes} {dict.card.readTime}</span>
          </span>

          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 opacity-75" />
            <span>
              {chapter.sections.length} {language === 'vi' ? 'phần mục' : 'sections'}
            </span>
          </span>

          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{book.level}</span>
          </span>
        </div>

        {/* Chapter Abstract / Editorial Prologue */}
        <div
          className={`relative z-10 p-4 sm:p-6 rounded-r-2xl text-sm sm:text-base font-reader italic leading-relaxed ${themeStyles.abstractBg} mb-8 sm:mb-10 shadow-xs`}
        >
          <div className="text-[10px] font-mono not-italic uppercase tracking-wider font-bold mb-1 opacity-70">
            {language === 'vi' ? 'TÓM TẮT CHƯƠNG' : 'CHAPTER SYNOPSIS'}
          </div>
          <p className="m-0">{chapter.summary[language]}</p>
        </div>

        {/* Chapter Outline / Mini Table of Contents for this Chapter */}
        {chapter.sections.length > 1 && (
          <div className="relative z-10 mb-8 p-3.5 sm:p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider opacity-60 mb-2.5 flex items-center justify-between">
              <span>{language === 'vi' ? 'Các mục trong chương này' : 'Sections in this chapter'}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
              {chapter.sections.map((sec, idx) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => onScrollToSection && onScrollToSection(`section-${sec.id}`)}
                  className="flex items-start gap-2 p-1.5 rounded text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <span className="font-mono text-[10px] opacity-60 group-hover:text-blue-500 shrink-0 mt-0.5">
                    {chapter.number}.{idx + 1}
                  </span>
                  <span className="font-medium group-hover:text-blue-500 line-clamp-1">
                    {sec.title[language]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Editorial Divider / Rule */}
        <div className="flex items-center gap-3 pt-2">
          <div className="h-0.5 w-12 bg-blue-600 dark:bg-blue-400" />
          <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
          <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">
            § {chapter.number}.0
          </span>
        </div>
      </div>
    </header>
  );
};
