import React, { useState, useMemo } from 'react';
import { Book, Category, Subject, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { Search, BookOpen, Clock, Layers, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export interface CatalogViewProps {
  books: Book[];
  categories: Category[];
  subjects: Subject[];
  language: Language;
  onSelectBook: (book: Book) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  books,
  categories,
  subjects,
  language,
  onSelectBook,
}) => {
  const dict = TRANSLATIONS[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      // Category match
      if (selectedCategory !== 'all' && b.categoryId !== selectedCategory) {
        return false;
      }
      // Level match
      if (selectedLevel !== 'all' && b.level !== selectedLevel) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = b.title.toLowerCase().includes(q);
        const matchesSubtitle =
          b.subtitle.en.toLowerCase().includes(q) || b.subtitle.vi.toLowerCase().includes(q);
        const matchesDesc =
          b.description.en.toLowerCase().includes(q) || b.description.vi.toLowerCase().includes(q);
        const matchesTags = b.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSubtitle && !matchesDesc && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [books, selectedCategory, selectedLevel, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold font-mono uppercase tracking-wider mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{dict.hero.eyebrow}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
          {dict.hero.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {dict.hero.description}
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4 mb-8">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="ebook-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={dict.nav.searchPlaceholder}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs transition-all"
          />
        </div>

        {/* Category & Level Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {/* All Categories */}
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            {dict.hero.allCategories}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {cat.name[language]}
            </button>
          ))}

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block mx-1" />

          {/* Level Filter */}
          {['all', 'Foundational', 'Intermediate', 'Advanced'].map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setSelectedLevel(lvl)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedLevel === lvl
                  ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {lvl === 'all' ? dict.filter.all : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Book Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              id={`book-card-${book.id}`}
              onClick={() => onSelectBook(book)}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 sm:p-7 hover:border-blue-500/50 hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {book.level}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{book.estimatedReadTime}</span>
                  </div>
                </div>

                {/* Title and Subtitle */}
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1.5">
                  {book.title}
                </h2>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                  {book.subtitle[language]}
                </p>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-5">
                  {book.description[language]}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 dark:text-slate-500 font-mono">
                  {book.chaptersCount} {dict.card.chapters}
                </span>

                <span className="inline-flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                  <span>{dict.card.startReading}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-xl mx-auto">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
            {dict.filter.noResults}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            {dict.filter.tryDifferentSearch}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedLevel('all');
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white cursor-pointer hover:bg-blue-500"
          >
            {dict.filter.clearFilters}
          </button>
        </div>
      )}
    </div>
  );
};
