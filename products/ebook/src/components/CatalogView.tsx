import React, { useState, useMemo } from 'react';
import { Book, BookMetadata, Category, Subject, Language } from '../types';
import { DOMAINS, TOPICS } from '../data/ebooks';
import { TRANSLATIONS } from '../i18n/translations';
import { BookCard } from './BookCard';
import {
  Search,
  BookOpen,
  X,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';

export interface CatalogViewProps {
  books: (Book | BookMetadata)[];
  categories: Category[];
  subjects: Subject[];
  language: Language;
  onSelectBook: (book: Book | BookMetadata) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  books,
  language,
  onSelectBook,
  searchQuery: propSearchQuery,
  onSearchChange,
}) => {
  const dict = TRANSLATIONS[language];

  // Secondary taxonomy filter states
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedBookType, setSelectedBookType] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const searchQuery = propSearchQuery !== undefined ? propSearchQuery : internalSearchQuery;
  const setSearchQuery = onSearchChange || setInternalSearchQuery;

  // Check if any filter or search query is active
  const hasActiveFilters = useMemo(() => {
    return (
      selectedTopic !== 'all' ||
      selectedBookType !== 'all' ||
      selectedLevel !== 'all' ||
      selectedDomain !== 'all' ||
      searchQuery.trim().length > 0
    );
  }, [selectedTopic, selectedBookType, selectedLevel, selectedDomain, searchQuery]);

  // Unique level options from books
  const levelOptions = useMemo(() => {
    return Array.from(new Set(books.map((b) => b.level)));
  }, [books]);

  // Filtered books algorithm
  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      // Primary Topic filter
      if (selectedTopic !== 'all' && b.categoryId !== selectedTopic) {
        return false;
      }

      // Secondary Domain filter
      if (selectedDomain !== 'all') {
        const bookDomainIds = b.domainIds || [b.categoryId];
        if (!bookDomainIds.includes(selectedDomain)) {
          return false;
        }
      }

      // Secondary Book Type filter
      if (selectedBookType !== 'all' && b.bookType !== selectedBookType) {
        return false;
      }

      // Secondary Level filter
      if (selectedLevel !== 'all' && b.level !== selectedLevel) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = b.title.toLowerCase().includes(q);
        const matchesSubtitle =
          b.subtitle.en.toLowerCase().includes(q) || b.subtitle.vi.toLowerCase().includes(q);
        const matchesDesc =
          b.description.en.toLowerCase().includes(q) || b.description.vi.toLowerCase().includes(q);
        const matchesTags = b.tags.some((t) => t.toLowerCase().includes(q));
        const matchesBookType = b.bookType.toLowerCase().includes(q);
        const matchesAuthor = b.author.toLowerCase().includes(q);
        if (
          !matchesTitle &&
          !matchesSubtitle &&
          !matchesDesc &&
          !matchesTags &&
          !matchesBookType &&
          !matchesAuthor
        ) {
          return false;
        }
      }

      return true;
    });
  }, [books, selectedTopic, selectedDomain, selectedBookType, selectedLevel, searchQuery]);

  const handleResetFilters = () => {
    setSelectedTopic('all');
    setSelectedDomain('all');
    setSelectedBookType('all');
    setSelectedLevel('all');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* 1. Page Title & Intro */}
      <header className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-2">
          {dict.hero.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {dict.hero.description}
        </p>
      </header>

      {/* 2. Controls: Search Bar & Compact Filter Dropdowns */}
      <section aria-label="Library Search and Filters" className="space-y-3.5 mb-8 max-w-4xl mx-auto">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="ebook-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={dict.nav.searchPlaceholder}
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-xs transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Compact Dropdown Menus Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {/* Dropdown 1: Topic */}
          <div className="relative">
            <select
              id="filter-dropdown-topic"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className={`w-full appearance-none pl-3 pr-8 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 truncate ${
                selectedTopic !== 'all'
                  ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80'
              }`}
            >
              <option value="all">{dict.filter.allTopics || 'All Topics'}</option>
              {TOPICS.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name[language]}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-slate-400" />
          </div>

          {/* Dropdown 2: Book Type */}
          <div className="relative">
            <select
              id="filter-dropdown-booktype"
              value={selectedBookType}
              onChange={(e) => setSelectedBookType(e.target.value)}
              className={`w-full appearance-none pl-3 pr-8 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 truncate ${
                selectedBookType !== 'all'
                  ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80'
              }`}
            >
              <option value="all">{dict.filter.allBookTypes || 'All Types'}</option>
              {Object.entries(dict.filter.bookTypes || {}).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-slate-400" />
          </div>

          {/* Dropdown 3: Level */}
          <div className="relative">
            <select
              id="filter-dropdown-level"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className={`w-full appearance-none pl-3 pr-8 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 truncate ${
                selectedLevel !== 'all'
                  ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80'
              }`}
            >
              <option value="all">{dict.filter.all || 'All Levels'}</option>
              {levelOptions.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-slate-400" />
          </div>

          {/* Dropdown 4: Domain */}
          <div className="relative">
            <select
              id="filter-dropdown-domain"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className={`w-full appearance-none pl-3 pr-8 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 truncate ${
                selectedDomain !== 'all'
                  ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80'
              }`}
            >
              <option value="all">{dict.filter.allDomains || 'All Domains'}</option>
              {DOMAINS.map((domain) => (
                <option key={domain.id} value={domain.id}>
                  {domain.name[language]}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-slate-400" />
          </div>
        </div>

        {/* Active Filter Chips Bar */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-1.5">
              {selectedTopic !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 font-mono text-[11px] font-bold border border-teal-500/20">
                  <span>Topic: {TOPICS.find((t) => t.id === selectedTopic)?.name[language]}</span>
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-teal-800"
                    onClick={() => setSelectedTopic('all')}
                  />
                </span>
              )}

              {selectedBookType !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px] font-semibold">
                  <span>Type: {dict.filter.bookTypes?.[selectedBookType as any] || selectedBookType}</span>
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-slate-900"
                    onClick={() => setSelectedBookType('all')}
                  />
                </span>
              )}

              {selectedLevel !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px] font-semibold">
                  <span>Level: {selectedLevel}</span>
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-slate-900"
                    onClick={() => setSelectedLevel('all')}
                  />
                </span>
              )}

              {selectedDomain !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px] font-semibold">
                  <span>Domain: {DOMAINS.find((d) => d.id === selectedDomain)?.name[language]}</span>
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-slate-900"
                    onClick={() => setSelectedDomain('all')}
                  />
                </span>
              )}

              {searchQuery.trim() && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px] font-semibold">
                  <span>&quot;{searchQuery}&quot;</span>
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-slate-900"
                    onClick={() => setSearchQuery('')}
                  />
                </span>
              )}
            </div>

            <button
              type="button"
              id="reset-all-filters-btn"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-teal-600 dark:text-teal-400 hover:underline cursor-pointer font-bold text-[11px]"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{dict.filter.clearFilters}</span>
            </button>
          </div>
        )}
      </section>

      {/* 3. Main Digital Library Book Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              language={language}
              onSelectBook={onSelectBook}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md mx-auto shadow-xs">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
            {dict.filter.noResults}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            {dict.filter.tryDifferentSearch}
          </p>
          <button
            type="button"
            id="empty-state-reset-btn"
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white cursor-pointer hover:bg-teal-500 shadow-md shadow-teal-600/20"
          >
            {dict.filter.clearFilters}
          </button>
        </div>
      )}
    </div>
  );
};
