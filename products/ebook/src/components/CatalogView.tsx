import React, { useState, useMemo } from 'react';
import { Book, Category, Subject, Language, BookType } from '../types';
import { DOMAINS, TOPICS, EBOOK_FIELD } from '../data/ebooks';
import { TRANSLATIONS } from '../i18n/translations';
import {
  Search,
  BookOpen,
  Clock,
  ArrowRight,
  Code,
  Layout,
  Database,
  Sparkles,
  ChevronRight,
  RotateCcw,
  BookMarked,
  FileCode,
  Table,
  BarChart,
  Palette,
} from 'lucide-react';

export interface CatalogViewProps {
  books: Book[];
  categories: Category[];
  subjects: Subject[];
  language: Language;
  onSelectBook: (book: Book) => void;
}

const OFFICIAL_BOOK_TYPES: BookType[] = [
  'Handbook',
  'Definitions',
  'Tips',
  'Practical Guides',
  'Common Errors',
  'Best Practices',
  'Patterns / Recipes',
];

// Helper to get Lucide icon component by name
function getDomainIcon(iconName: string) {
  switch (iconName) {
    case 'Code':
      return Code;
    case 'Layout':
      return Layout;
    case 'Database':
      return Database;
    case 'Sparkles':
      return Sparkles;
    default:
      return BookOpen;
  }
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

  // Taxonomy states
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedBookType, setSelectedBookType] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // When domain changes, filter available topics
  const availableTopics = useMemo(() => {
    if (selectedDomain === 'all') {
      return TOPICS;
    }
    return TOPICS.filter((t) => t.domainIds.includes(selectedDomain));
  }, [selectedDomain]);

  // If currently selected topic does not belong to the selected domain, reset to all
  const handleDomainSelect = (domainId: string) => {
    setSelectedDomain(domainId);
    if (domainId !== 'all') {
      const topicBelongs = TOPICS.some(
        (t) => t.id === selectedTopic && t.domainIds.includes(domainId)
      );
      if (!topicBelongs) {
        setSelectedTopic('all');
      }
    }
  };

  // Filtered books
  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      // Domain filter
      if (selectedDomain !== 'all') {
        const bookDomainIds = b.domainIds || [b.categoryId];
        if (!bookDomainIds.includes(selectedDomain)) {
          return false;
        }
      }

      // Topic filter
      if (selectedTopic !== 'all' && b.categoryId !== selectedTopic) {
        return false;
      }

      // Book Type filter
      if (selectedBookType !== 'all' && b.bookType !== selectedBookType) {
        return false;
      }

      // Level filter
      if (selectedLevel !== 'all' && b.level !== selectedLevel) {
        return false;
      }

      // Search query
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
  }, [books, selectedDomain, selectedTopic, selectedBookType, selectedLevel, searchQuery]);

  const activeDomainObj = DOMAINS.find((d) => d.id === selectedDomain);
  const activeTopicObj = TOPICS.find((t) => t.id === selectedTopic);

  const hasActiveFilters =
    selectedDomain !== 'all' ||
    selectedTopic !== 'all' ||
    selectedBookType !== 'all' ||
    selectedLevel !== 'all' ||
    searchQuery.trim().length > 0;

  const handleResetFilters = () => {
    setSelectedDomain('all');
    setSelectedTopic('all');
    setSelectedBookType('all');
    setSelectedLevel('all');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <header className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
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
      </header>

      {/* Hierarchical Filter Navigation Section */}
      <section aria-label="Taxonomy Filters" className="space-y-5 mb-10">
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

        {/* Level 1: Domain Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <button
            type="button"
            id="domain-filter-all"
            onClick={() => handleDomainSelect('all')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedDomain === 'all'
                ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{dict.filter.allDomains}</span>
          </button>

          {DOMAINS.map((domain) => {
            const Icon = getDomainIcon(domain.icon);
            const isSelected = selectedDomain === domain.id;
            return (
              <button
                key={domain.id}
                id={`domain-filter-${domain.id}`}
                type="button"
                onClick={() => handleDomainSelect(domain.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/20'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{domain.name[language]}</span>
              </button>
            );
          })}
        </div>

        {/* Level 2: Topic Chips (Filtered by Selected Domain) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
          <button
            type="button"
            id="topic-filter-all"
            onClick={() => setSelectedTopic('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedTopic === 'all'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            {dict.filter.allTopics}
          </button>

          {availableTopics.map((topic) => {
            const isSelected = selectedTopic === topic.id;
            const TopicIcon = getTopicIcon(topic.icon);
            return (
              <button
                key={topic.id}
                id={`topic-filter-${topic.id}`}
                type="button"
                onClick={() => setSelectedTopic(topic.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <TopicIcon className="w-3 h-3" />
                <span>{topic.name[language]}</span>
              </button>
            );
          })}
        </div>

        {/* Level 3: Book Types & Level Filters */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
          <button
            type="button"
            id="booktype-filter-all"
            onClick={() => setSelectedBookType('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedBookType === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            {dict.filter.allBookTypes}
          </button>

          {OFFICIAL_BOOK_TYPES.map((bt) => (
            <button
              key={bt}
              id={`booktype-filter-${bt.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              type="button"
              onClick={() => setSelectedBookType(bt)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedBookType === bt
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {dict.filter.bookTypes?.[bt] || bt}
            </button>
          ))}

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block mx-1" />

          {/* Level Filter */}
          {['all', 'Foundational', 'Intermediate', 'Advanced'].map((lvl) => (
            <button
              key={lvl}
              id={`level-filter-${lvl.toLowerCase()}`}
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

        {/* Active Taxonomy Breadcrumbs & Quick Reset Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 px-2 text-xs font-mono text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800/60">
          <nav aria-label="Taxonomy Breadcrumb" className="flex flex-wrap items-center gap-1.5">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {EBOOK_FIELD.name[language]}
            </span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className={selectedDomain !== 'all' ? 'font-bold text-blue-600 dark:text-blue-400' : ''}>
              {activeDomainObj ? activeDomainObj.name[language] : dict.filter.allDomains}
            </span>
            {activeTopicObj && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {activeTopicObj.name[language]}
                </span>
              </>
            )}
            {selectedBookType !== 'all' && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {dict.filter.bookTypes?.[selectedBookType as BookType] || selectedBookType}
                </span>
              </>
            )}
            <span className="ml-1 text-slate-400">
              ({filteredBooks.length} / {books.length} {dict.card.readTime === 'read' ? 'books' : 'cuốn'})
            </span>
          </nav>

          {hasActiveFilters && (
            <button
              type="button"
              id="reset-all-filters-btn"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-bold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{dict.filter.clearFilters}</span>
            </button>
          )}
        </div>
      </section>

      {/* Book Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredBooks.map((book) => {
            // Find topic and domain labels
            const topic = TOPICS.find((t) => t.id === book.categoryId);
            const domain = DOMAINS.find((d) =>
              book.domainIds ? book.domainIds.includes(d.id) : d.topics.includes(book.categoryId)
            );

            return (
              <article
                key={book.id}
                id={`book-card-${book.id}`}
                onClick={() => onSelectBook(book)}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 hover:border-blue-500/50 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div>
                  {/* Eyebrow & Compact Contextual Badge */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 uppercase">
                        {topic ? topic.name[language] : book.bookType}
                      </span>
                      <span className="text-[10px] font-mono font-medium text-slate-400">
                        {dict.filter.bookTypes?.[book.bookType] || book.bookType}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono shrink-0">
                      <Clock className="w-3 h-3" />
                      <span>{book.estimatedReadTime}</span>
                    </div>
                  </div>

                  {/* Title and Subtitle */}
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1.5 leading-snug">
                    {book.title}
                  </h2>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
                    {book.subtitle[language]}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                    {book.description[language]}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {book.chaptersCount} {dict.card.chapters} &bull; {book.level}
                  </span>

                  <span className="inline-flex items-center gap-1 font-bold text-xs text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                    <span>{dict.card.startReading}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            );
          })}
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
            id="empty-state-reset-btn"
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white cursor-pointer hover:bg-blue-500"
          >
            {dict.filter.clearFilters}
          </button>
        </div>
      )}
    </div>
  );
};
