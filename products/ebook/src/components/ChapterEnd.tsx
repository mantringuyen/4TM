import React from 'react';
import { Chapter, Book, Language, ReaderPaperTheme } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { getReaderThemeTokens } from '../theme/readerTheme';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

export interface ChapterEndProps {
  book: Book;
  currentChapter: Chapter;
  currentChapterIndex: number;
  totalChapters: number;
  language: Language;
  paperTheme: ReaderPaperTheme;
  onNavigateChapter: (index: number) => void;
  onBackToBook: () => void;
  onOpenFrontMatter?: () => void;
}

export const ChapterEnd: React.FC<ChapterEndProps> = ({
  book,
  currentChapter,
  currentChapterIndex,
  totalChapters,
  language,
  paperTheme,
  onNavigateChapter,
  onBackToBook,
  onOpenFrontMatter,
}) => {
  const dict = TRANSLATIONS[language];
  const tokens = getReaderThemeTokens(paperTheme);
  const isLastChapter = currentChapterIndex === totalChapters - 1;
  const nextChapter = !isLastChapter ? book.chapters[currentChapterIndex + 1] : null;
  const prevChapter = currentChapterIndex > 0 ? book.chapters[currentChapterIndex - 1] : null;

  return (
    <footer className={`mt-16 pt-10 border-t ${tokens.borderSubtle} space-y-8 select-text w-full min-w-0 ${tokens.textPrimary}`}>
      {/* Editorial Chapter Colophon */}
      <div className={`flex items-center justify-between text-xs font-mono ${tokens.textMuted} pb-2`}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
          <span className="uppercase tracking-wider">
            {language === 'vi' ? 'Hết Chương' : 'End of Chapter'} {currentChapter.number}
          </span>
        </div>
        <span>
          {language === 'vi' ? 'Chương' : 'Chapter'} {currentChapter.number} / {totalChapters}
        </span>
      </div>

      {/* Page Turn / Continue Reading Spread */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Previous Chapter or Front Matter */}
        {prevChapter ? (
          <button
            type="button"
            id="reader-prev-chapter-card"
            onClick={() => {
              onNavigateChapter(currentChapterIndex - 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`p-4 sm:p-5 rounded-2xl border ${tokens.borderSubtle} ${tokens.cardSurface} hover:border-teal-500/50 hover:${tokens.highlightSurface} text-left transition-all cursor-pointer flex items-center gap-3.5 group`}
          >
            <div className={`w-9 h-9 rounded-xl ${tokens.innerSurface} border ${tokens.borderSubtle} flex items-center justify-center shrink-0 group-hover:${tokens.accentBg} group-hover:${tokens.accentText} transition-colors`}>
              <ChevronLeft className="w-5 h-5 opacity-75 group-hover:opacity-100" />
            </div>
            <div className="min-w-0 flex-1">
              <div className={`text-[10px] font-mono uppercase tracking-wider ${tokens.textMuted}`}>
                {dict.reader.prevChapter}
              </div>
              <div className={`text-xs sm:text-sm font-bold font-reader truncate ${tokens.textPrimary}`}>
                Ch {prevChapter.number}: {prevChapter.title[language]}
              </div>
            </div>
          </button>
        ) : onOpenFrontMatter ? (
          <button
            type="button"
            id="reader-back-to-frontmatter"
            onClick={onOpenFrontMatter}
            className={`p-4 sm:p-5 rounded-2xl border ${tokens.borderSubtle} ${tokens.cardSurface} hover:border-teal-500/50 hover:${tokens.highlightSurface} text-left transition-all cursor-pointer flex items-center gap-3.5 group`}
          >
            <div className={`w-9 h-9 rounded-xl ${tokens.innerSurface} border ${tokens.borderSubtle} flex items-center justify-center shrink-0 group-hover:${tokens.accentBg} group-hover:${tokens.accentText} transition-colors`}>
              <BookOpen className="w-4 h-4 opacity-75 group-hover:opacity-100" />
            </div>
            <div className="min-w-0 flex-1">
              <div className={`text-[10px] font-mono uppercase tracking-wider ${tokens.textMuted}`}>
                {language === 'vi' ? 'Đầu sách' : 'Front Matter'}
              </div>
              <div className={`text-xs sm:text-sm font-bold font-reader truncate ${tokens.textPrimary}`}>
                {language === 'vi' ? 'Trang bìa & Mục lục' : 'Title Page & Table of Contents'}
              </div>
            </div>
          </button>
        ) : (
          <div />
        )}

        {/* Next Chapter or Book Completion */}
        {nextChapter ? (
          <button
            type="button"
            id="reader-next-chapter-card"
            onClick={() => {
              onNavigateChapter(currentChapterIndex + 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-4 sm:p-5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white text-right transition-all cursor-pointer flex items-center justify-end gap-3.5 shadow-md shadow-teal-600/20 group"
          >
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-teal-100">
                {dict.reader.nextChapter} • {nextChapter.readTimeMinutes} {dict.card.readTime}
              </div>
              <div className="text-xs sm:text-sm font-bold font-reader truncate text-white">
                Ch {nextChapter.number}: {nextChapter.title[language]}
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
              <ChevronRight className="w-5 h-5 text-white" />
            </div>
          </button>
        ) : (
          <button
            type="button"
            id="reader-finish-publication-card"
            onClick={onBackToBook}
            className="p-4 sm:p-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-right transition-all cursor-pointer flex items-center justify-end gap-3.5 shadow-md shadow-emerald-600/20 group"
          >
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-100">
                {language === 'vi' ? 'HOÀN THÀNH TÀI LIỆU' : 'PUBLICATION COMPLETE'}
              </div>
              <div className="text-xs sm:text-sm font-bold font-reader truncate text-white">
                {dict.reader.finishBook}
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
          </button>
        )}
      </div>

      {/* Return to Book Overview Button */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onBackToBook}
          className={`text-xs font-mono font-bold ${tokens.textMuted} hover:${tokens.accentText} transition-colors cursor-pointer inline-flex items-center gap-1.5`}
        >
          <span>&larr;</span>
          <span>{dict.reader.backToBook}:</span>
          <span className="font-sans italic">{book.title}</span>
        </button>
      </div>
    </footer>
  );
};
