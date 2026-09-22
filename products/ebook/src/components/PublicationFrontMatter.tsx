import React from 'react';
import { Book, Language, ReaderPaperTheme } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { BookCover } from './BookCover';
import { getReaderThemeTokens } from '../theme/readerTheme';
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
  const tokens = getReaderThemeTokens(paperTheme);

  return (
    <div className={`space-y-16 pb-16 select-text w-full min-w-0 ${tokens.textPrimary}`}>
      {/* 1. Publication Cover Presentation Spread */}
      <section
        aria-label="Book Cover Plate"
        className={`flex flex-col items-center justify-center pt-4 pb-8 border-b ${tokens.borderSubtle}`}
      >
        <div className="transform hover:scale-[1.02] transition-transform duration-300">
          <BookCover book={book} size="hero" className="mx-auto" />
        </div>
        <div className="text-center mt-6 space-y-1">
          <div className={`text-[10px] font-mono tracking-widest uppercase ${tokens.textMuted}`}>
            4TM PRESS DIGITAL TECHNICAL PUBLICATION
          </div>
          <div className={`text-xs font-mono ${tokens.textMuted}`}>
            Edition: First Edition • Published {book.publishedDate}
          </div>
        </div>
      </section>

      {/* 2. Formal Title Page (Frontispiece & Imprint) */}
      <section
        aria-label="Title Page"
        className={`text-center max-w-2xl mx-auto space-y-6 pt-4 pb-12 border-b ${tokens.borderSubtle}`}
      >
        {/* Publisher Hallmark */}
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${tokens.borderSubtle} text-xs font-mono font-bold tracking-widest uppercase ${tokens.textSecondary}`}>
          <span className="w-2 h-2 rounded-full bg-teal-600" />
          <span>4TM PRESS</span>
          <span className="opacity-40">|</span>
          <span>{book.categoryId.toUpperCase()} SERIES</span>
        </div>

        {/* Big Publication Title */}
        <h1 className={`text-3xl sm:text-5xl font-black font-reader tracking-tight leading-tight ${tokens.textPrimary}`}>
          {book.title}
        </h1>

        {/* Subtitle */}
        <p className={`text-base sm:text-xl font-reader italic leading-relaxed ${tokens.textSecondary}`}>
          {book.subtitle[language]}
        </p>

        {/* Author Byline */}
        <div className="pt-4 space-y-1 font-mono">
          <div className={`text-sm font-bold ${tokens.textPrimary}`}>{book.author}</div>
          <div className={`text-xs ${tokens.textMuted}`}>{book.role}</div>
        </div>

        {/* Technical Level & Spec */}
        <div className={`pt-2 flex items-center justify-center gap-4 text-xs font-mono ${tokens.textMuted}`}>
          <span className={`px-2.5 py-0.5 rounded border ${tokens.borderSubtle}`}>
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-lg shadow-teal-600/25 transition-all cursor-pointer"
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
      <section className={`max-w-2xl mx-auto space-y-6 pt-2 pb-10 border-b ${tokens.borderSubtle}`}>
        <h2 className={`text-xl sm:text-2xl font-black font-reader tracking-tight ${tokens.textPrimary}`}>
          {dict.bookDetail.aboutThisBook}
        </h2>
        <p className={`text-sm sm:text-base font-reader leading-relaxed ${tokens.textSecondary}`}>
          {book.description[language]}
        </p>

        {/* Prerequisites */}
        {book.prerequisites && book.prerequisites[language] && book.prerequisites[language].length > 0 && (
          <div className={`p-4 sm:p-5 rounded-2xl border ${tokens.borderSubtle} ${tokens.cardSurface} space-y-2.5`}>
            <div className={`text-xs font-mono font-bold uppercase tracking-wider ${tokens.textMuted}`}>
              {dict.bookDetail.prerequisites}
            </div>
            <ul className={`space-y-1.5 text-xs sm:text-sm list-none p-0 m-0 ${tokens.textSecondary}`}>
              {book.prerequisites[language].map((prereq, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                  <span>{prereq}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 4. Key Engineering Outcomes */}
      {book.outcomes && book.outcomes[language] && book.outcomes[language].length > 0 && (
        <section className={`max-w-2xl mx-auto space-y-6 pt-2 pb-10 border-b ${tokens.borderSubtle}`}>
          <h2 className={`text-xl sm:text-2xl font-black font-reader tracking-tight flex items-center gap-2 ${tokens.textPrimary}`}>
            <Sparkles className="w-5 h-5 text-teal-600" />
            <span>{dict.bookDetail.learningOutcomes}</span>
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {book.outcomes[language].map((outcome, idx) => (
              <div
                key={idx}
                className={`p-3.5 sm:p-4 rounded-xl border ${tokens.borderSubtle} ${tokens.cardSurface} flex items-start gap-3`}
              >
                <div className={`w-5 h-5 rounded-full ${tokens.accentBg} ${tokens.accentText} font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold`}>
                  {idx + 1}
                </div>
                <div className={`text-xs sm:text-sm font-sans font-medium leading-relaxed ${tokens.textPrimary}`}>
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
          <h2 className={`text-xl sm:text-2xl font-black font-reader tracking-tight flex items-center gap-2 ${tokens.textPrimary}`}>
            <BookOpen className="w-5 h-5 text-teal-600" />
            <span>{dict.bookDetail.tableOfContents}</span>
          </h2>
          <span className={`text-xs font-mono ${tokens.textMuted}`}>
            {book.chapters.length} {dict.card.chapters}
          </span>
        </div>

        <div className="space-y-3">
          {book.chapters.map((chapter, idx) => (
            <div
              key={chapter.id}
              onClick={() => onStartChapter(idx)}
              className={`p-4 sm:p-5 rounded-2xl border ${tokens.borderSubtle} ${tokens.cardSurface} hover:border-teal-500/50 hover:${tokens.highlightSurface} transition-all cursor-pointer group`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className={`flex items-center gap-2 text-xs font-mono ${tokens.textMuted} group-hover:${tokens.accentText} transition-colors`}>
                    <span className="font-bold">
                      {language === 'vi' ? 'CHƯƠNG' : 'CHAPTER'} {chapter.number}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{chapter.readTimeMinutes} {dict.card.readTime}</span>
                    </span>
                  </div>

                  <h3 className={`text-base sm:text-lg font-bold font-reader group-hover:${tokens.accentText} transition-colors ${tokens.textPrimary}`}>
                    {chapter.title[language]}
                  </h3>

                  <p className={`text-xs sm:text-sm ${tokens.textSecondary} font-sans line-clamp-2 leading-relaxed`}>
                    {chapter.summary[language]}
                  </p>

                  {/* Sections list inside chapter */}
                  {chapter.sections.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {chapter.sections.map((sec, secIdx) => (
                        <span
                          key={sec.id}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded ${tokens.innerSurface} border ${tokens.borderSubtle} ${tokens.textMuted}`}
                        >
                          § {chapter.number}.{secIdx + 1} {sec.title[language]}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className={`w-8 h-8 rounded-full ${tokens.highlightSurface} group-hover:bg-teal-600 group-hover:text-white flex items-center justify-center shrink-0 mt-1 transition-all`}>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Imprint Colophon Notice at Bottom of Front Matter */}
        <div className={`pt-8 text-center text-xs font-mono ${tokens.textMuted} space-y-1`}>
          <div>4TM Open Technical Library • CC-BY-NC 4.0</div>
          <div>Published under 4TM Software Engineering Foundation</div>
        </div>
      </section>
    </div>
  );
};
