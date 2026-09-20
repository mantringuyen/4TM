import React, { useState } from 'react';
import { Book, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { DOMAINS, TOPICS, EBOOK_FIELD } from '../data/ebooks';
import { getPublicationTemplate } from '../data/publicationRegistry';
import { BookCover } from './BookCover';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Info,
  GraduationCap,
  Sparkles,
  Layers,
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
  const template = getPublicationTemplate(book.bookType);

  // Resolve taxonomy entities
  const topic = TOPICS.find((t) => t.id === book.categoryId);
  const domain = DOMAINS.find((d) =>
    book.domainIds ? book.domainIds.includes(d.id) : d.topics.includes(book.categoryId)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Back to Catalog */}
      <button
        type="button"
        id="book-back-to-library-btn"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 cursor-pointer transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{dict.bookDetail.backToLibrary}</span>
      </button>

      {/* 1. Publication Hero Section */}
      <section
        aria-label="Publication Presentation"
        className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xs"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-10">
          {/* Cover */}
          <div className="shrink-0 flex justify-center">
            <BookCover
              book={book}
              size="lg"
              className="shadow-2xl transform md:rotate-1 hover:rotate-0 transition-transform duration-300"
            />
          </div>

          {/* Core Info & CTA */}
          <div className="flex-1 min-w-0 text-center md:text-left">
            {/* Type & Level Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                {dict.filter.bookTypes?.[book.bookType] || book.bookType}
              </span>
              <span className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                {book.level}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2 leading-tight">
              {book.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              {book.subtitle[language]}
            </p>

            {/* Concise Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              {book.description[language]}
            </p>

            {/* Key Metrics */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 mb-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                <span>{book.chaptersCount} {dict.card.chapters}</span>
              </span>

              <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>{book.estimatedReadTime}</span>
              </span>

              <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                <span>{book.author}</span>
              </span>
            </div>

            {/* Primary Action Button */}
            <div className="flex justify-center md:justify-start">
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
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Outcomes / What You'll Learn */}
      {book.learningOutcomes && book.learningOutcomes.length > 0 && (
        <section className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>{dict.bookDetail.learningOutcomes}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {book.learningOutcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{outcome[language]}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Table of Contents */}
      <section className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span>{dict.bookDetail.tableOfContents}</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">
            {book.chapters.length} {dict.card.chapters}
          </span>
        </div>

        <div className="space-y-2">
          {book.chapters.map((ch, idx) => (
            <div
              key={ch.id}
              onClick={() => onStartReading(idx)}
              className="group p-3.5 sm:p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 hover:border-blue-500/50 hover:bg-blue-50/40 dark:hover:bg-blue-950/30 transition-all cursor-pointer flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase mb-0.5">
                  Chapter {ch.number} &bull; {ch.readTimeMinutes} min
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                  {ch.title[language]}
                </h3>
              </div>

              <div className="shrink-0 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Secondary Expandable Taxonomy Details */}
      <section className="pt-2">
        <button
          type="button"
          id="toggle-book-details-btn"
          onClick={() => setDetailsExpanded(!detailsExpanded)}
          className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-500" />
            <span>{dict.bookDetail.aboutThisBook}</span>
          </span>
          {detailsExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {detailsExpanded && (
          <div className="mt-3 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">{dict.bookDetail.fieldLabel}</div>
                <div className="font-bold text-slate-800 dark:text-slate-200">{EBOOK_FIELD.name[language]}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">{dict.bookDetail.domainLabel}</div>
                <div className="font-bold text-slate-800 dark:text-slate-200">{domain ? domain.name[language] : 'General'}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">{dict.bookDetail.topicLabel}</div>
                <div className="font-bold text-blue-600 dark:text-blue-400">{topic ? topic.name[language] : 'General'}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">{dict.bookDetail.authorRole}</div>
                <div className="font-bold text-slate-800 dark:text-slate-200">{book.role}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  {language === 'vi' ? 'Định dạng xuất bản:' : 'Publication Type:'}
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{template.name[language]}</span>
              </div>
              <div className="text-slate-500 dark:text-slate-400 italic">
                {template.editorialStructure.recommendedReadingMode[language]}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
