import React from 'react';
import { Book, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { DOMAINS, TOPICS, EBOOK_FIELD } from '../data/ebooks';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Bookmark,
  Sparkles,
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

  // Resolve taxonomy entities
  const topic = TOPICS.find((t) => t.id === book.categoryId);
  const domain = DOMAINS.find((d) =>
    book.domainIds ? book.domainIds.includes(d.id) : d.topics.includes(book.categoryId)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <button
          type="button"
          id="book-back-to-library-btn"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{dict.bookDetail.backToLibrary}</span>
        </button>

        {/* Taxonomy Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400"
        >
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {EBOOK_FIELD.name[language]}
          </span>
          {domain && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span>{domain.name[language]}</span>
            </>
          )}
          {topic && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {topic.name[language]}
              </span>
            </>
          )}
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
            {dict.filter.bookTypes?.[book.bookType] || book.bookType}
          </span>
        </nav>
      </div>

      {/* Book Cover Presentation Plate */}
      <section
        aria-label="Book Cover"
        className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mb-10 shadow-sm"
      >
        {/* Left Book Spine Visual Indicator */}
        <div className="absolute left-0 top-0 bottom-0 w-3 sm:w-4 bg-gradient-to-b from-blue-600 via-indigo-600 to-blue-800 shadow-inner" />

        <div className="pl-6 sm:pl-10 pr-6 sm:pr-10 py-8 sm:py-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold font-mono uppercase tracking-wider">
              {book.level}
            </span>
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>
                {book.estimatedReadTime} {dict.card.readTime}
              </span>
            </span>
            <span className="text-xs text-slate-400 font-mono">
              &bull; {book.chaptersCount} {dict.card.chapters}
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              &bull; {dict.bookDetail.published}: {book.publishedDate}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            {book.title}
          </h1>
          <p className="text-base sm:text-lg font-medium text-slate-500 dark:text-slate-400 mb-6 max-w-2xl">
            {book.subtitle[language]}
          </p>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-3xl">
            {book.description[language]}
          </p>

          {/* Action & Author Section */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100 dark:border-slate-800/80">
            <button
              type="button"
              id="book-start-reading-btn"
              onClick={() => onStartReading(savedChapterIndex)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-extrabold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              <span>
                {savedChapterIndex > 0
                  ? `${dict.bookDetail.continueReading} ${savedChapterIndex + 1}`
                  : dict.bookDetail.startReading}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span className="font-semibold text-slate-700 dark:text-slate-300">{book.author}</span>
              <span>&bull;</span>
              <span>{book.role}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Table of Contents */}
        <section aria-label="Table of Contents" className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <span>{dict.bookDetail.tableOfContents}</span>
          </h2>

          <div className="space-y-3">
            {book.chapters.map((chapter, idx) => (
              <div
                key={chapter.id}
                id={`toc-chapter-item-${idx}`}
                onClick={() => onStartReading(idx)}
                className="group p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/50 hover:shadow-md transition-all cursor-pointer flex items-start justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                      CH {chapter.number}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      &bull; {chapter.readTimeMinutes} min
                    </span>
                    {idx === savedChapterIndex && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <Bookmark className="w-3 h-3" />
                        <span>Saved</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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

        {/* Sidebar: Prerequisites & Outcomes */}
        <aside aria-label="Book metadata" className="space-y-6">
          {/* Prerequisites */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              {dict.bookDetail.prerequisites}
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 list-none p-0 m-0">
              {book.prerequisites[language].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outcomes */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              {dict.bookDetail.learningOutcomes}
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 list-none p-0 m-0">
              {book.outcomes[language].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Book Tags */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Indexing Tags</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
