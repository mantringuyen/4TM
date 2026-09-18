import React from 'react';
import { Book, Language } from '../types';
import { BookCover } from './BookCover';
import { TRANSLATIONS } from '../i18n/translations';
import { TOPICS, DOMAINS } from '../data/ebooks';
import { Clock, BookOpen, ArrowRight, Layers, Sparkles } from 'lucide-react';

export interface BookCardProps {
  book: Book;
  language: Language;
  onSelectBook: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  language,
  onSelectBook,
}) => {
  const dict = TRANSLATIONS[language];
  const topic = TOPICS.find((t) => t.id === book.categoryId);

  return (
    <article
      id={`book-card-${book.id}`}
      onClick={() => onSelectBook(book)}
      className="group relative flex flex-col sm:flex-row items-stretch gap-4 sm:gap-5 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 p-4 sm:p-5 hover:border-blue-500/60 dark:hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Visual Book Cover Plate */}
      <div className="flex justify-center sm:justify-start shrink-0 pt-1 sm:pt-0">
        <BookCover
          book={book}
          size="md"
          className="transform group-hover:-translate-y-1 group-hover:rotate-1 transition-transform duration-300 shadow-md"
        />
      </div>

      {/* Book Metadata & Description Content */}
      <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
        <div>
          {/* Top Metadata Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 uppercase border border-blue-500/20">
                {topic ? topic.name[language] : book.categoryId}
              </span>

              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                {dict.filter.bookTypes?.[book.bookType] || book.bookType}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono shrink-0">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{book.estimatedReadTime}</span>
              </span>
            </div>
          </div>

          {/* Book Title */}
          <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-1 line-clamp-2">
            {book.title}
          </h2>

          {/* Subtitle */}
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 line-clamp-2">
            {book.subtitle[language]}
          </p>

          {/* Short Description */}
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-3">
            {book.description[language]}
          </p>
        </div>

        {/* Card Footer Action */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs mt-auto">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-blue-500" />
            <span>{book.chaptersCount} {dict.card.chapters}</span>
            <span>&bull;</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{book.level}</span>
          </span>

          <span className="inline-flex items-center gap-1.5 font-extrabold text-xs text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
            <span>{dict.card.startReading}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
