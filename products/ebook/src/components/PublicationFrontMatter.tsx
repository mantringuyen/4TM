import React from 'react';
import { Book, Language, ReaderPaperTheme } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { BookCover } from './BookCover';
import {
  BookOpen,
  Clock,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Layers,
  ChevronRight,
} from 'lucide-react';

export interface PublicationFrontMatterProps {
  book: Book;
  language: Language;
  paperTheme: ReaderPaperTheme;
  onStartChapter: (chapterIndex: number) => void;
  onBackToOverview: () => void;
  savedChapterIndex?: number;
}

export const PublicationFrontMatter: React.FC<PublicationFrontMatterProps> = ({
  book,
  language,
  paperTheme,
  onStartChapter,
  onBackToOverview,
  savedChapterIndex = 0,
}) => {
  const dict = TRANSLATIONS[language];

  return (
    <div className="space-y-16 pb-16 select-text w-full min-w-0">
      {/* 1. Publication Cover Presentation Spread */}
      <section
        aria-label="Book Cover Plate"
        className="flex flex-col items-center justify-center pt-4 pb-8 border-b border-black/10 dark:border-white/10"
      >
        <div className="transform hover:scale-[1.02] transition-transform duration-300">
          <BookCover book={book} size="hero" className="mx-auto" />
        </div>
        <div className="text-center mt-6 space-y-1">
          <div className="text-[10px] font-mono tracking-widest uppercase opacity-50">
            4TM PRESS DIGITAL TECHNICAL PUBLICATION
          </div>
          <div className="text-xs font-mono opacity-70">
            Edition: First Edition • Published {book.publishedDate}
          </div>
        </div>
      </section>

      {/* 2. Formal Title Page (Frontispiece & Imprint) */}
      <section
        aria-label="Title Page"
        className="text-center max-w-2xl mx-auto space-y-6 pt-4 pb-12 border-b border-black/10 dark:border-white/10"
      >
        {/* Publisher Hallmark */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 text-xs font-mono font-bold tracking-widest uppercase opacity-75">
          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
          <span>4TM PRESS</span>
          <span className="opacity-40">|</span>
          <span>{book.categoryId.toUpperCase()} SERIES</span>
        </div>

        {/* Big Publication Title */}
        <h1 className="text-3xl sm:text-5xl font-black font-reader tracking-tight leading-tight">
          {book.title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl font-reader italic opacity-85 leading-relaxed">
          {book.subtitle[language]}
        </p>

        {/* Author Byline */}
        <div className="pt-4 space-y-1 font-mono">
          <div className="text-sm font-bold opacity-90">{book.author}</div>
          <div className="text-xs opacity-60">{book.role}</div>
        </div>

        {/* Technical Level & Spec */}
        <div className="pt-2 flex items-center justify-center gap-4 text-xs font-mono opacity-75">
          <span className="px-2.5 py-0.5 rounded border border-black/10 dark:border-white/10">
            {book.bookType}
          </span>
          <span>•</span>
          <span>{book.level} Level</span>
          <span>•</span>
          <span>{book.estimatedReadTime}</span>
        </div>

        {/* Begin Reading CTA */}
        <div className="pt-6">
          <button
            type="button"
            id="frontmatter-begin-btn"
            onClick={() => onStartChapter(savedChapterIndex)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
          >
            <span>
              {savedChapterIndex > 0
                ? `${dict.bookDetail.continueReading} ${savedChapterIndex + 1}`
                : `${dict.bookDetail.startReading}`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 3. About This Publication & Prerequisites */}
      <section className="max-w-2xl mx-auto space-y-6 pt-2 pb-10 border-b border-black/10 dark:border-white/10">
        <h2 className="text-xl sm:text-2xl font-black font-reader tracking-tight">
          {dict.bookDetail.aboutThisBook}
        </h2>
        <p className="text-sm sm:text-base font-reader leading-relaxed opacity-90">
          {book.description[language]}
        </p>

        {/* Prerequisites */}
        {book.prerequisites && book.prerequisites[language] && book.prerequisites[language].length > 0 && (
          <div className="p-4 sm:p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] space-y-2.5">
            <div className="text-xs font-mono font-bold uppercase tracking-wider opacity-70">
              {dict.bookDetail.prerequisites}
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm list-none p-0 m-0 opacity-85">
              {book.prerequisites[language].map((prereq, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <span>{prereq}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 4. Key Engineering Outcomes */}
      {book.outcomes && book.outcomes[language] && book.outcomes[language].length > 0 && (
        <section className="max-w-2xl mx-auto space-y-6 pt-2 pb-10 border-b border-black/10 dark:border-white/10">
          <h2 className="text-xl sm:text-2xl font-black font-reader tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span>{dict.bookDetail.learningOutcomes}</span>
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {book.outcomes[language].map((outcome, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.015] dark:bg-white/[0.015] flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  {idx + 1}
                </div>
                <div className="text-xs sm:text-sm font-sans font-medium leading-relaxed opacity-90">
                  {outcome}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Complete Publication Table of Contents */}
      <section className="max-w-2xl mx-auto space-y-6 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black font-reader tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <span>{dict.bookDetail.tableOfContents}</span>
          </h2>
          <span className="text-xs font-mono opacity-60">
            {book.chapters.length} {dict.card.chapters}
          </span>
        </div>

        <div className="space-y-3">
          {book.chapters.map((chapter, idx) => (
            <div
              key={chapter.id}
              onClick={() => onStartChapter(idx)}
              className="p-4 sm:p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:border-blue-500/40 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs font-mono opacity-60 group-hover:text-blue-500 transition-colors">
                    <span className="font-bold">
                      {language === 'vi' ? 'CHƯƠNG' : 'CHAPTER'} {chapter.number}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{chapter.readTimeMinutes} {dict.card.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-reader group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {chapter.title[language]}
                  </h3>

                  <p className="text-xs sm:text-sm opacity-75 font-sans line-clamp-2 leading-relaxed">
                    {chapter.summary[language]}
                  </p>

                  {/* Sections list inside chapter */}
                  {chapter.sections.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {chapter.sections.map((sec, secIdx) => (
                        <span
                          key={sec.id}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 opacity-70"
                        >
                          § {chapter.number}.{secIdx + 1} {sec.title[language]}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center shrink-0 mt-1 transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Imprint Colophon Notice at Bottom of Front Matter */}
        <div className="pt-8 text-center text-xs font-mono opacity-50 space-y-1">
          <div>4TM Open Technical Library • CC-BY-NC 4.0</div>
          <div>Published under 4TM Software Engineering Foundation</div>
        </div>
      </section>
    </div>
  );
};
