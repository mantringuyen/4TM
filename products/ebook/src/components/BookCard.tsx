import React from 'react';
import { Book, BookMetadata, Language } from '../types';
import { BookCover } from './BookCover';
import { TRANSLATIONS } from '../i18n/translations';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';

export interface BookCardProps {
  book: Book | BookMetadata;
  language: Language;
  onSelectBook: (book: Book | BookMetadata) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  language,
  onSelectBook,
}) => {
  const dict = TRANSLATIONS[language];

  return (
    <article
      id={`book-card-${book.id}`}
      onClick={() => onSelectBook(book)}
      className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-4 sm:p-5 hover:border-blue-500/60 dark:hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div>
        {/* Dominant Visual Book Cover */}
        <div className="flex justify-center mb-4 pt-1">
          <BookCover
            book={book}
            size="md"
            className="transform group-hover:-translate-y-1.5 transition-transform duration-300 shadow-md group-hover:shadow-xl"
          />
        </div>

        {/* Book Type Badge */}
        <div className="mb-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded border border-blue-200/50 dark:border-blue-800/50">
            {dict.filter.bookTypes?.[book.bookType] || book.bookType}
          </span>
        </div>

        {/* Book Title */}
        <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-1.5 line-clamp-2">
          {book.title}
        </h2>

        {/* Short Description */}
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {book.description[language]}
        </p>
      </div>

      {/* Card Footer: Chapters, Reading Time & Read Action */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs mt-auto">
        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1">
          <span>{book.chaptersCount} {dict.card.chapters}</span>
          <span>&bull;</span>
          <span>{book.estimatedReadTime}</span>
        </span>

        <span className="inline-flex items-center gap-1 font-bold text-xs text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
          <span>{dict.card.startReading}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
};
