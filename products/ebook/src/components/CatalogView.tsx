import React, { useState, useMemo } from 'react';
import { Book, Category, Subject, Language } from '../types';
import { DOMAINS, TOPICS } from '../data/ebooks';
import { TRANSLATIONS } from '../i18n/translations';
import { BookCard } from './BookCard';
import { FilterDrawer } from './FilterDrawer';
import {
  Search,
  BookOpen,
  SlidersHorizontal,
  X,
  RotateCcw,
  Code,
  FileCode,
  Layout,
  Palette,
  Database,
  Table,
  BarChart,
  Sparkles,
  BookMarked,
} from 'lucide-react';

export interface CatalogViewProps {
  books: Book[];
  categories: Category[];
  subjects: Subject[];
  language: Language;
  onSelectBook: (book: Book) => void;
}

function getTopicIcon(iconName: string) {
  switch (iconName) {
    case 'Code':
      return Code;
    case 'FileCode':
      return FileCode;
    case 'Layout':
      return Layout;
    case 'Palette':
      return Palette;
    case 'Database':
      return Database;
    case 'Table':
      return Table;
    case 'BarChart':
      return BarChart;
    case 'Sparkles':
      return Sparkles;
    default:
      return BookMarked;
  }
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  books,
  language,
  onSelectBook,
}) => {
  const dict = TRANSLATIONS[language];

  // Primary topic navigation state
  const [selectedTopic, setSelectedTopic] = useState<string>('all');

  // Secondary taxonomy drawer states
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedBookType, setSelectedBookType] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Count active secondary filters (Domain, Book Type, Level)
  const activeSecondaryFilterCount = useMemo(() => {
    let count = 0;
    if (selectedDomain !== 'all') count++;
    if (selectedBookType !== 'all') count++;
    if (selectedLevel !== 'all') count++;
    return count;
  }, [selectedDomain, selectedBookType, selectedLevel]);

  // Check if any secondary filter or search query is active
  const hasActiveSecondaryFilters = useMemo(() => {
    return (
      selectedDomain !== 'all' ||
      selectedBookType !== 'all' ||
      selectedLevel !== 'all' ||
      searchQuery.trim().length > 0
    );
  }, [selectedDomain, selectedBookType, selectedLevel, searchQuery]);

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

  const handleResetSecondaryFilters = () => {
    setSelectedDomain('all');
    setSelectedBookType('all');
    setSelectedLevel('all');
    setSearchQuery('');
  };

  const handleResetAllFilters = () => {
    setSelectedTopic('all');
    setSelectedDomain('all');
    setSelectedBookType('all');
    setSelectedLevel('all');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* 1. Header Introduction */}
      <header className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-2">
          {dict.hero.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {dict.hero.description}
        </p>
      </header>

      {/* 2. Primary Controls: Search + Filter Drawer Trigger */}
      <section aria-label="Library Search and Controls" className="space-y-4 mb-6">
        <div className="flex items-center gap-2 sm:gap-3 max-w-2xl mx-auto">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="ebook-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={dict.nav.searchPlaceholder}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs transition-all"
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

          {/* Secondary Filter Toggle Drawer Button */}
          <button
            type="button"
            id="toggle-filter-drawer-btn"
            onClick={() => setIsFilterDrawerOpen(true)}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeSecondaryFilterCount > 0
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 shadow-xs ring-2 ring-blue-500/20'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-blue-500" />
            <span>{language === 'vi' ? 'Bộ Lọc' : 'Filters'}</span>
            {activeSecondaryFilterCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[10px] font-mono">
                {activeSecondaryFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* 3. ONE Primary Navigation: Compact Topic Shelf */}
        <div className="flex items-center justify-center overflow-x-auto py-1 px-1 scrollbar-none">
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 max-w-full">
            <button
              type="button"
              id="topic-nav-all"
              onClick={() => setSelectedTopic('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedTopic === 'all'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs ring-1 ring-slate-200 dark:ring-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {dict.filter.allTopics}
            </button>

            {TOPICS.map((topic) => {
              const isSelected = selectedTopic === topic.id;
              const TopicIcon = getTopicIcon(topic.icon);
              return (
                <button
                  key={topic.id}
                  id={`topic-nav-${topic.id}`}
                  type="button"
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <TopicIcon className="w-3.5 h-3.5" />
                  <span>{topic.name[language]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Active Filter Chips Bar (ONLY rendered when secondary filters or search are active) */}
        {hasActiveSecondaryFilters && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 max-w-2xl mx-auto text-xs text-slate-500 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-1.5">
              {selectedDomain !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-[11px] font-bold border border-blue-500/20">
                  <span>{DOMAINS.find((d) => d.id === selectedDomain)?.name[language]}</span>
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-blue-800"
                    onClick={() => setSelectedDomain('all')}
                  />
                </span>
              )}

              {selectedBookType !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px] font-semibold">
                  <span>{dict.filter.bookTypes?.[selectedBookType as any] || selectedBookType}</span>
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-slate-900"
                    onClick={() => setSelectedBookType('all')}
                  />
                </span>
              )}

              {selectedLevel !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px] font-semibold">
                  <span>{selectedLevel}</span>
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-slate-900"
                    onClick={() => setSelectedLevel('all')}
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
              id="reset-secondary-filters-btn"
              onClick={handleResetSecondaryFilters}
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-bold text-[11px]"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{dict.filter.clearFilters}</span>
            </button>
          </div>
        )}
      </section>

      {/* 5. Main Visual Book Library Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
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
            onClick={handleResetAllFilters}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white cursor-pointer hover:bg-blue-500 shadow-md shadow-blue-600/20"
          >
            {dict.filter.clearFilters}
          </button>
        </div>
      )}

      {/* Filter Drawer Modal */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        language={language}
        selectedDomain={selectedDomain}
        onSelectDomain={setSelectedDomain}
        selectedBookType={selectedBookType}
        onSelectBookType={setSelectedBookType}
        selectedLevel={selectedLevel}
        onSelectLevel={setSelectedLevel}
        onResetFilters={handleResetAllFilters}
        activeFilterCount={activeSecondaryFilterCount}
      />
    </div>
  );
};
