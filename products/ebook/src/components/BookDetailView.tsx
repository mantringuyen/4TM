import React, { useState } from 'react';
import { Book, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { DOMAINS, TOPICS, EBOOK_FIELD } from '../data/ebooks';
import { BookCover } from './BookCover';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Info,
  Layers,
  GraduationCap,
  Sparkles,
  BookMarked,
} from 'lucide-react';

export interface BookDetailViewProps {
  book: Book;
  language: Language;
  onBack: () => void;
  onStartReading: (chapterIndex: number) => void;
  savedChapterIndex?: number;
}

export const BookDetailView: React.FC<BookDetailViewProps> = ({
  book,
  language,
  onBack,
  onStartReading,
  savedChapterIndex = 0,
}) => {
  const dict = TRANSLATIONS[language];
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  // Resolve taxonomy entities
  const topic = TOPICS.find((t) => t.id === book.categoryId);
  const domain = DOMAINS.find((d) =>
    book.domainIds ? book.domainIds.includes(d.id) : d.topics.includes(book.categoryId)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Top Bar: Back Action & Book Type Badge */}
      <div className="flex items-center justify-between mb-8">
        <button
          type="button"
          id="book-back-to-library-btn"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{dict.bookDetail.backToLibrary}</span>
        </button>

        <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
          {dict.filter.bookTypes?.[book.bookType] || book.bookType}
        </span>
      </div>

      {/* DIGITAL BOOK HERO PLATE */}
      <section
        aria-label="Digital Book Presentation"
        className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 mb-10 shadow-xs"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
          {/* Left: 3D Visual Book Cover */}
          <div className="shrink-0 flex justify-center">
            <BookCover
              book={book}
              size="lg"
              className="shadow-2xl transform md:rotate-1 hover:rotate-0 transition-transform duration-300"
            />
          </div>

          {/* Right: Book Details & CTA */}
          <div className="flex-1 min-w-0 text-center md:text-left">
            {/* Topic & Category Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              <BookMarked className="w-3.5 h-3.5" />
              <span>{topic ? topic.name[language] : EBOOK_FIELD.name[language]}</span>
              <span>&bull;</span>
              <span>{book.level}</span>
            </div>

            {/* Book Title */}
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2 leading-tight">
              {book.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              {book.subtitle[language]}
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              {book.description[language]}
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 mb-8 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>{book.estimatedReadTime}</span>
              </span>

              <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl">
                <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                <span>{book.chaptersCount} {dict.card.chapters}</span>
              </span>

              <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl">
                <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                <span>{book.level}</span>
              </span>
            </div>

            {/* Actions: Start Reading & Toggle Details */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <button
                type="button"
                id="book-start-reading-btn"
                onClick={() => onStartReading(savedChapterIndex)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
              >
                <span>
                  {savedChapterIndex > 0
                    ? `${dict.bookDetail.continueReading} ${savedChapterIndex + 1}`
                    : dict.bookDetail.startReading}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                id="toggle-book-details-btn"
                onClick={() => setDetailsExpanded(!detailsExpanded)}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
              >
                <Info className="w-3.5 h-3.5 text-blue-500" />
                <span>
                  {detailsExpanded
                    ? dict.bookDetail.hideDetailsToggle
                    : dict.bookDetail.bookDetailsToggle}
                </span>
                {detailsExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5 opacity-60" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* EXPANDABLE SECONDARY METADATA PANEL */}
        {detailsExpanded && (
          <div className="mt-8 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 space-y-6 animate-fadeIn">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-500" />
              <span>{dict.bookDetail.aboutThisBook}</span>
            </h3>

            {/* Grid Taxonomy Fields */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase mb-0.5">
                  {dict.bookDetail.fieldLabel}
                </div>
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  {EBOOK_FIELD.name[language]}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase mb-0.5">
                  {dict.bookDetail.domainLabel}
                </div>
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  {domain ? domain.name[language] : 'General'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase mb-0.5">
                  {dict.bookDetail.topicLabel}
                </div>
                <div className="font-bold text-blue-600 dark:text-blue-400">
                  {topic ? topic.name[language] : 'General'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase mb-0.5">
                  {dict.bookDetail.typeLabel}
                </div>
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  {book.bookType}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase mb-0.5">
                  {dict.bookDetail.levelLabel}
                </div>
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  {book.level}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase mb-0.5">
                  {dict.bookDetail.authorRole}
                </div>
                <div className="font-bold text-slate-800 dark:text-slate-200 truncate">
                  {book.author}
                </div>
                <div className="text-[10px] text-slate-400 truncate">{book.role}</div>
              </div>
            </div>

            {/* Prerequisites & Outcomes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                  <span>{dict.bookDetail.prerequisites}</span>
                </div>
                <ul className="space-y-1.5 list-none p-0 m-0 text-slate-600 dark:text-slate-400">
                  {book.prerequisites[language].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{dict.bookDetail.learningOutcomes}</span>
                </div>
                <ul className="space-y-1.5 list-none p-0 m-0 text-slate-600 dark:text-slate-400">
                  {book.outcomes[language].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Indexing Tags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-mono text-slate-400 mr-1 uppercase">
                {dict.bookDetail.indexingTags}:
              </span>
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* EDITORIAL TABLE OF CONTENTS */}
      <section aria-label="Table of Contents" className="space-y-4">
        <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-500" />
          <span>{dict.bookDetail.tableOfContents}</span>
        </h2>

        <div className="space-y-3">
          {book.chapters.map((chapter, idx) => (
            <div
              key={chapter.id}
              id={`toc-chapter-item-${idx}`}
              onClick={() => onStartReading(idx)}
              className="group p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/60 hover:shadow-md transition-all cursor-pointer flex items-start justify-between gap-4"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                    Chapter {chapter.number}
                  </span>
                  <span className="text-slate-400 font-mono">
                    &bull; {chapter.readTimeMinutes} min
                  </span>
                  {idx === savedChapterIndex && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Bookmark className="w-3 h-3" />
                      <span>Saved</span>
                    </span>
                  )}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {chapter.title[language]}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {chapter.summary[language]}
                </p>
              </div>

              <div className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 p-2 shrink-0 self-center">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
