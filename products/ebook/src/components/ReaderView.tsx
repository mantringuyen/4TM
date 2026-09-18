import React, { useState, useEffect, useMemo } from 'react';
import {
  Book,
  Chapter,
  Language,
  ReaderSettings,
  ReaderFontSize,
  ReaderWidth,
  ReaderPaperTheme,
} from '../types';
import { DOMAINS, TOPICS, EBOOK_FIELD } from '../data/ebooks';
import { TRANSLATIONS } from '../i18n/translations';
import {
  KeyIdeaBlock,
  WhenToUseBlock,
  CommonMistakesBlock,
  ComparisonTableBlock,
  ProcessDiagramBlock,
  BestPracticesBlock,
  PracticalScenarioBlock,
  RelatedConceptsBlock,
} from './EditorialPrimitives';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  Menu,
  X,
  Copy,
  Check,
  Type,
  Maximize2,
  Minimize2,
  Palette,
  BookOpen,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export interface ReaderViewProps {
  book: Book;
  currentChapterIndex: number;
  language: Language;
  onNavigateChapter: (idx: number) => void;
  onBackToBook: () => void;
  bookmarks: string[];
  onToggleBookmark: (chapterId: string) => void;
}

// Helper: Format inline text with backticks into styled <code> elements
function renderFormattedText(text: string) {
  if (!text.includes('`')) return text;

  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      const codeContent = part.slice(1, -1);
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded text-[0.88em] font-mono font-semibold bg-black/5 dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-black/5 dark:border-white/5 mx-0.5 break-words [overflow-wrap:anywhere]"
        >
          {codeContent}
        </code>
      );
    }
    return part;
  });
}

// Helper: Syntax highlight code lines cleanly according to active theme
function renderHighlightedCodeLines(code: string, theme: ReaderPaperTheme) {
  const lines = code.split('\n');

  // Token regexes
  const commentRegex = /^(\s*)(\/\/.*|#.*|\/\*.*\*\/|--.*)/;
  const keywordRegex = /\b(const|let|var|function|def|class|import|export|from|return|if|else|for|while|try|catch|async|await|SELECT|FROM|WHERE|JOIN|GROUP BY|ORDER BY|INSERT|UPDATE|DELETE|CREATE|TABLE|PRIMARY KEY|FOREIGN KEY|int|string|boolean|void|interface|type)\b/g;
  const stringRegex = /(["'`])(?:(?=(\\?))\2.)*?\1/g;
  const numberRegex = /\b(\d+(\.\d+)?)\b/g;

  // Theme color styles
  const isDarkTheme = theme === 'dark' || theme === 'midnight';
  const isSepia = theme === 'sepia';

  const commentClass = isSepia
    ? 'text-[#7C6C58] italic'
    : isDarkTheme
    ? 'text-zinc-500 dark:text-zinc-400 italic'
    : 'text-slate-500 italic';

  const keywordClass = isSepia
    ? 'text-[#8B3A1B] font-bold'
    : isDarkTheme
    ? 'text-indigo-400 font-bold'
    : 'text-indigo-600 font-bold';

  const stringClass = isSepia
    ? 'text-[#2B6D38]'
    : isDarkTheme
    ? 'text-emerald-400'
    : 'text-emerald-700';

  const numberClass = isSepia
    ? 'text-[#A85918]'
    : isDarkTheme
    ? 'text-amber-300'
    : 'text-amber-700';

  return lines.map((line, idx) => {
    // Check if entire line is comment
    const commentMatch = line.match(commentRegex);
    if (commentMatch) {
      return (
        <div key={idx} className="table-row">
          <span className="table-cell select-none pr-3 sm:pr-4 text-right opacity-30 font-mono text-xs shrink-0">
            {idx + 1}
          </span>
          <span className={`table-cell whitespace-pre font-mono text-xs sm:text-sm ${commentClass}`}>
            {line}
          </span>
        </div>
      );
    }

    // Tokenize line
    return (
      <div key={idx} className="table-row">
        <span className="table-cell select-none pr-3 sm:pr-4 text-right opacity-30 font-mono text-xs shrink-0">
          {idx + 1}
        </span>
        <span className="table-cell whitespace-pre font-mono text-xs sm:text-sm">
          {line}
        </span>
      </div>
    );
  });
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  book,
  currentChapterIndex,
  language,
  onNavigateChapter,
  onBackToBook,
  bookmarks,
  onToggleBookmark,
}) => {
  const dict = TRANSLATIONS[language];
  const chapter = book.chapters[currentChapterIndex] || book.chapters[0];

  // Sidebar visibility (Desktop can toggle Zen mode; Mobile uses drawer)
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Reader customization state
  const [settings, setSettings] = useState<ReaderSettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('4tm_ebook_reader_settings');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return {
      fontSize: 'md',
      width: 'standard',
      paperTheme: 'default',
    };
  });

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    localStorage.setItem('4tm_ebook_reader_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => {
      setCopiedCodeId(null);
    }, 2000);
  };

  const isBookmarked = bookmarks.includes(chapter.id);

  // Typography font size classes
  const fontSizeClasses: Record<ReaderFontSize, string> = {
    sm: 'text-sm sm:text-base leading-relaxed',
    md: 'text-base sm:text-lg leading-relaxed sm:leading-loose',
    lg: 'text-lg sm:text-xl leading-loose',
    xl: 'text-xl sm:text-2xl leading-loose',
  };

  // Max width container classes
  const widthClasses: Record<ReaderWidth, string> = {
    compact: 'max-w-[65ch]',
    standard: 'max-w-[75ch]',
    wide: 'max-w-[90ch]',
  };

  // Theme container classes (Guarantees light mode has crisp light code blocks)
  const themeClasses: Record<
    ReaderPaperTheme,
    {
      bg: string;
      text: string;
      cardBg: string;
      border: string;
      codeBg: string;
      codeBorder: string;
      codeHeaderBg: string;
      codeHeaderText: string;
      codePreBg: string;
      codePreText: string;
      codeExplanationBg: string;
      calloutBg: string;
      calloutBorder: string;
    }
  > = {
    default: {
      bg: 'bg-white dark:bg-slate-950',
      text: 'text-slate-900 dark:text-slate-100',
      cardBg: 'bg-slate-50 dark:bg-slate-900',
      border: 'border-slate-200 dark:border-slate-800',
      // CODE BLOCK: Light background in light mode, dark background in dark mode
      codeBg: 'bg-slate-50 dark:bg-slate-900',
      codeBorder: 'border-slate-200 dark:border-slate-800',
      codeHeaderBg: 'bg-slate-100 dark:bg-slate-800/90',
      codeHeaderText: 'text-slate-600 dark:text-slate-300',
      codePreBg: 'bg-white dark:bg-slate-950',
      codePreText: 'text-slate-900 dark:text-slate-100',
      codeExplanationBg: 'bg-slate-50 dark:bg-slate-900/60',
      calloutBg: 'bg-blue-50/70 dark:bg-blue-950/20',
      calloutBorder: 'border-blue-200/80 dark:border-blue-900/40',
    },
    sepia: {
      bg: 'bg-[#FBF0D9] dark:bg-[#282218]',
      text: 'text-[#433422] dark:text-[#EADBC8]',
      cardBg: 'bg-[#F3E5C8] dark:bg-[#342C20]',
      border: 'border-[#E2D2B0] dark:border-[#4B3F2E]',
      codeBg: 'bg-[#F5EAD4] dark:bg-[#2F271D]',
      codeBorder: 'border-[#E2D2B0] dark:border-[#4B3F2E]',
      codeHeaderBg: 'bg-[#EBDABF] dark:bg-[#272017]',
      codeHeaderText: 'text-[#55432D] dark:text-[#CBB8A2]',
      codePreBg: 'bg-[#FAF0DC] dark:bg-[#1F1912]',
      codePreText: 'text-[#2E2419] dark:text-[#EFE5D6]',
      codeExplanationBg: 'bg-[#F5EAD4] dark:bg-[#2F271D]',
      calloutBg: 'bg-[#F2E3C6] dark:bg-[#332A1D]',
      calloutBorder: 'border-[#DFCAB0] dark:border-[#4A3D2C]',
    },
    dark: {
      bg: 'bg-[#18181B]',
      text: 'text-zinc-100',
      cardBg: 'bg-zinc-900',
      border: 'border-zinc-800',
      codeBg: 'bg-zinc-900',
      codeBorder: 'border-zinc-800',
      codeHeaderBg: 'bg-zinc-800/90',
      codeHeaderText: 'text-zinc-300',
      codePreBg: 'bg-zinc-950',
      codePreText: 'text-zinc-100',
      codeExplanationBg: 'bg-zinc-900',
      calloutBg: 'bg-zinc-900/90',
      calloutBorder: 'border-zinc-700/60',
    },
    midnight: {
      bg: 'bg-[#0B0F19]',
      text: 'text-slate-100',
      cardBg: 'bg-[#111827]',
      border: 'border-slate-800',
      codeBg: 'bg-[#111827]',
      codeBorder: 'border-slate-800',
      codeHeaderBg: 'bg-[#172239]',
      codeHeaderText: 'text-slate-300',
      codePreBg: 'bg-[#080D17]',
      codePreText: 'text-slate-100',
      codeExplanationBg: 'bg-[#111827]',
      calloutBg: 'bg-[#131D33]',
      calloutBorder: 'border-slate-800',
    },
  };

  const currentTheme = themeClasses[settings.paperTheme];

  // Taxonomy tags
  const topic = TOPICS.find((t) => t.id === book.categoryId);
  const domain = DOMAINS.find((d) =>
    book.domainIds ? book.domainIds.includes(d.id) : d.topics.includes(book.categoryId)
  );

  const completionPct = Math.round(((currentChapterIndex + 1) / book.chapters.length) * 100);

  return (
    <div className={`min-h-screen transition-colors duration-200 w-full max-w-full ${currentTheme.bg} ${currentTheme.text}`}>
      {/* Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-1 bg-blue-600 dark:bg-blue-400 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Sticky Reader Toolbar */}
      <header
        className={`sticky top-0 z-30 w-full border-b backdrop-blur-md transition-colors ${
          settings.paperTheme === 'default'
            ? 'bg-white/95 dark:bg-slate-950/95 border-slate-200 dark:border-slate-800'
            : `${currentTheme.bg}/95 ${currentTheme.border}`
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-2 sm:gap-3 w-full min-w-0 box-border">
          {/* Left: Back to Book Overview & Sidebar Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              id="reader-back-to-book-btn"
              onClick={onBackToBook}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              title={dict.reader.backToBook}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{dict.reader.backToBook}</span>
            </button>

            {/* Mobile TOC Drawer Trigger */}
            <button
              type="button"
              id="mobile-toc-toggle-btn"
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <Menu className="w-4 h-4" />
              <span>{dict.reader.toc}</span>
            </button>

            {/* Desktop Zen Mode / Sidebar Toggle */}
            <button
              type="button"
              id="desktop-sidebar-toggle-btn"
              onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              title={desktopSidebarOpen ? 'Hide Table of Contents' : 'Show Table of Contents'}
            >
              {desktopSidebarOpen ? (
                <>
                  <PanelLeftClose className="w-4 h-4 text-slate-400" />
                  <span>Zen Mode</span>
                </>
              ) : (
                <>
                  <PanelLeftOpen className="w-4 h-4 text-blue-500" />
                  <span>{dict.reader.toc}</span>
                </>
              )}
            </button>
          </div>

          {/* Center: Book & Chapter indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs font-mono truncate max-w-sm min-w-0">
            <span className="text-slate-400 truncate">{book.title}</span>
            <span className="text-slate-300 dark:text-slate-700">&bull;</span>
            <span className="font-bold text-blue-600 dark:text-blue-400 truncate">
              Ch {chapter.number}: {chapter.title[language]}
            </span>
          </div>

          {/* Right: Customization Controls (Font size, Width, Theme, Bookmark) */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Font Size Selector */}
            <div className="flex items-center p-0.5 rounded-xl border border-black/10 dark:border-white/10 text-xs">
              {(['sm', 'md', 'lg', 'xl'] as ReaderFontSize[]).map((size) => (
                <button
                  key={size}
                  type="button"
                  id={`fontsize-btn-${size}`}
                  onClick={() => setSettings((s) => ({ ...s, fontSize: size }))}
                  className={`px-1.5 py-0.5 rounded-md font-mono text-[10px] sm:text-[11px] font-bold cursor-pointer transition-colors ${
                    settings.fontSize === size
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Reading Width Selector */}
            <button
              type="button"
              id="reading-width-toggle-btn"
              onClick={() => {
                const widths: ReaderWidth[] = ['compact', 'standard', 'wide'];
                const nextIdx = (widths.indexOf(settings.width) + 1) % widths.length;
                setSettings((s) => ({ ...s, width: widths[nextIdx] }));
              }}
              className="p-1.5 rounded-xl border border-black/10 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              title={`${dict.reader.width}: ${settings.width}`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>

            {/* Paper Theme Selector */}
            <button
              type="button"
              id="paper-theme-toggle-btn"
              onClick={() => {
                const themes: ReaderPaperTheme[] = ['default', 'sepia', 'dark', 'midnight'];
                const nextIdx = (themes.indexOf(settings.paperTheme) + 1) % themes.length;
                setSettings((s) => ({ ...s, paperTheme: themes[nextIdx] }));
              }}
              className="p-1.5 rounded-xl border border-black/10 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              title={`${dict.reader.theme}: ${dict.themes[settings.paperTheme]}`}
            >
              <Palette className="w-3.5 h-3.5" />
            </button>

            {/* Bookmark Chapter */}
            <button
              type="button"
              id="bookmark-chapter-btn"
              onClick={() => onToggleBookmark(chapter.id)}
              className={`p-1.5 rounded-xl border border-black/10 dark:border-white/10 transition-colors cursor-pointer ${
                isBookmarked
                  ? 'text-amber-500 bg-amber-500/10 border-amber-500/20'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title={isBookmarked ? dict.reader.chapterBookmarked : dict.reader.bookmarkChapter}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-3.5 h-3.5 text-amber-500" />
              ) : (
                <Bookmark className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto flex min-w-0">
        {/* DESKTOP Persistent Sticky Left Table of Contents Rail */}
        {desktopSidebarOpen && (
          <aside
            aria-label="Publication Table of Contents"
            className={`hidden lg:block w-80 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-6 border-r transition-all ${currentTheme.border}`}
          >
            {/* Book Info Card in Sidebar */}
            <div className={`p-4 rounded-2xl border mb-6 ${currentTheme.cardBg} ${currentTheme.border}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  {book.bookType}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {book.chaptersCount} Chs
                </span>
              </div>
              <h2 className="text-sm font-bold leading-tight mb-1">{book.title}</h2>
              <div className="text-[11px] opacity-70 font-mono mb-3">{book.author}</div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono opacity-75">
                  <span>Reading Progress</span>
                  <span>{completionPct}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 dark:bg-blue-400 rounded-full transition-all"
                    style={{ width: `${completionPct}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-[11px] font-mono font-bold uppercase tracking-wider opacity-60 mb-3 px-1">
              {dict.reader.toc}
            </div>

            {/* Chapter Items */}
            <nav className="space-y-1.5">
              {book.chapters.map((ch, idx) => {
                const isActive = idx === currentChapterIndex;
                const isChBookmarked = bookmarks.includes(ch.id);

                return (
                  <button
                    key={ch.id}
                    type="button"
                    id={`desktop-toc-ch-${idx}`}
                    onClick={() => {
                      onNavigateChapter(idx);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left p-3 rounded-xl text-xs transition-all cursor-pointer flex items-start justify-between gap-2 ${
                      isActive
                        ? 'bg-blue-600 text-white font-bold shadow-xs'
                        : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div>
                      <div className="font-mono text-[10px] mb-0.5 opacity-75">
                        Chapter {ch.number} &bull; {ch.readTimeMinutes} min
                      </div>
                      <div className="line-clamp-2 leading-snug">{ch.title[language]}</div>
                    </div>

                    {isChBookmarked && (
                      <BookmarkCheck
                        className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          isActive ? 'text-white' : 'text-amber-500'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </aside>
        )}

        {/* MOBILE Slide-over Drawer Table of Contents */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileDrawerOpen(false)}
            />

            {/* Drawer */}
            <aside
              className={`relative w-80 max-w-[85vw] h-full shadow-2xl p-6 overflow-y-auto border-r transition-all z-10 box-border ${
                settings.paperTheme === 'default'
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                  : `${currentTheme.bg} ${currentTheme.border}`
              }`}
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/10 dark:border-white/10">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-blue-500 font-bold">
                    {book.bookType}
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    {dict.reader.toc}
                  </span>
                </div>
                <button
                  type="button"
                  id="close-mobile-toc-btn"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {book.chapters.map((ch, idx) => {
                  const isActive = idx === currentChapterIndex;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => {
                        onNavigateChapter(idx);
                        setMobileDrawerOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full text-left p-3 rounded-xl text-xs transition-all cursor-pointer ${
                        isActive
                          ? 'bg-blue-600 text-white font-bold shadow-xs'
                          : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="font-mono text-[10px] mb-0.5 opacity-75">
                        Chapter {ch.number} &bull; {ch.readTimeMinutes} min
                      </div>
                      <div className="break-words [overflow-wrap:anywhere]">{ch.title[language]}</div>
                    </button>
                  );
                })}
              </div>
            </aside>
          </div>
        )}

        {/* FOCUSED READING COLUMN */}
        <main
          className={`flex-1 min-w-0 w-full max-w-full mx-auto px-4 sm:px-8 py-8 sm:py-14 transition-all box-border ${
            widthClasses[settings.width]
          }`}
        >
          {/* DIGITAL BOOK COVER / FRONTISPIECE PLATE */}
          <div
            className={`p-5 sm:p-8 rounded-3xl border mb-10 sm:mb-12 relative overflow-hidden w-full max-w-full min-w-0 box-border ${currentTheme.cardBg} ${currentTheme.border}`}
          >
            {/* Book Spine accent ribbon */}
            <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-b from-blue-600 to-indigo-700" />

            <div className="pl-3 sm:pl-4 min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-2 min-w-0">
                <span className="break-words">{EBOOK_FIELD.name[language]}</span>
                {domain && (
                  <>
                    <span>&rsaquo;</span>
                    <span className="break-words">{domain.name[language]}</span>
                  </>
                )}
                {topic && (
                  <>
                    <span>&rsaquo;</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400 break-words">
                      {topic.name[language]}
                    </span>
                  </>
                )}
                <span>&bull;</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300 break-words">
                  {book.bookType}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-1 break-words [overflow-wrap:anywhere]">
                {book.title}
              </h2>
              <p className="text-xs sm:text-sm opacity-75 font-medium mb-3 break-words [overflow-wrap:anywhere]">
                {book.subtitle[language]}
              </p>
              <div className="text-[11px] font-mono opacity-60 break-words [overflow-wrap:anywhere]">
                Author: {book.author} &bull; {book.role} &bull; Edition {book.publishedDate}
              </div>
            </div>
          </div>

          {/* CHAPTER TITLE & ABSTRACT */}
          <article className="space-y-8 w-full max-w-full min-w-0">
            <header className="pb-8 border-b border-black/10 dark:border-white/10 w-full max-w-full min-w-0">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">
                <span>Chapter {chapter.number} of {book.chapters.length}</span>
                <span>&bull;</span>
                <span>{chapter.readTimeMinutes} {dict.card.readTime}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-reader tracking-tight mb-4 leading-tight break-words [overflow-wrap:anywhere] min-w-0">
                {chapter.title[language]}
              </h1>

              {/* Abstract Quote Box */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border-l-4 border-l-blue-600 ${currentTheme.calloutBg} ${currentTheme.calloutBorder} text-sm sm:text-base italic leading-relaxed break-words [overflow-wrap:anywhere] w-full max-w-full min-w-0 box-border`}
              >
                {chapter.summary[language]}
              </div>
            </header>

            {/* CHAPTER SECTIONS */}
            <div className="space-y-12 pt-2 w-full max-w-full min-w-0">
              {chapter.sections.map((section, sIdx) => (
                <section key={section.id} id={section.id} className="space-y-5 w-full max-w-full min-w-0">
                  <h2 className="text-lg sm:text-2xl font-black font-reader tracking-tight flex items-baseline gap-2 min-w-0">
                    <span className="text-blue-600 dark:text-blue-400 font-mono text-sm sm:text-base font-bold shrink-0">
                      {chapter.number}.{sIdx + 1}
                    </span>
                    <span className="min-w-0 break-words [overflow-wrap:anywhere] flex-1">{section.title[language]}</span>
                  </h2>

                  {/* Prose Content */}
                  <div
                    className={`font-reader text-justify leading-relaxed break-words [overflow-wrap:anywhere] min-w-0 w-full max-w-full ${
                      fontSizeClasses[settings.fontSize]
                    }`}
                  >
                    {renderFormattedText(section.content[language])}
                  </div>

                  {/* KEY IDEA BLOCK */}
                  {section.keyIdea && (
                    <KeyIdeaBlock idea={section.keyIdea} language={language} theme={settings.paperTheme} />
                  )}

                  {/* WHEN TO USE BLOCK */}
                  {section.whenToUse && (
                    <WhenToUseBlock whenToUse={section.whenToUse} language={language} theme={settings.paperTheme} />
                  )}

                  {/* COMPARISON TABLE */}
                  {section.comparisonTable && (
                    <ComparisonTableBlock matrix={section.comparisonTable} language={language} theme={settings.paperTheme} />
                  )}

                  {/* PROCESS DIAGRAM */}
                  {section.diagram && (
                    <ProcessDiagramBlock diagram={section.diagram} language={language} theme={settings.paperTheme} />
                  )}

                  {/* COMMON MISTAKES BLOCK */}
                  {section.commonMistakes && (
                    <CommonMistakesBlock mistakes={section.commonMistakes} language={language} theme={settings.paperTheme} />
                  )}

                  {/* CODE BLOCK (Strictly follows theme settings; Light in Light mode, Dark in Dark mode) */}
                  {section.codeBlock && (
                    <div
                      className={`my-6 rounded-2xl overflow-hidden border shadow-xs w-full max-w-full min-w-0 box-border ${currentTheme.codeBorder} ${currentTheme.codeBg}`}
                    >
                      {/* Code Header */}
                      <div
                        className={`flex items-center justify-between px-3.5 sm:px-4 py-2.5 border-b ${currentTheme.codeBorder} ${currentTheme.codeHeaderBg} ${currentTheme.codeHeaderText} text-xs font-mono min-w-0`}
                      >
                        <span className="font-semibold truncate mr-2 min-w-0">
                          {section.codeBlock.filename || section.codeBlock.language}
                        </span>

                        <button
                          type="button"
                          id={`copy-code-btn-${section.id}`}
                          onClick={() => handleCopy(section.codeBlock!.code, section.id)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors cursor-pointer text-[11px] font-semibold shrink-0"
                        >
                          {copiedCodeId === section.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                              <span className="text-emerald-600 dark:text-emerald-400">
                                {dict.reader.copied}
                              </span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 opacity-75" />
                              <span>{dict.reader.copyCode}</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Code Pre/Code Area */}
                      <pre
                        className={`p-3.5 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed select-text w-full max-w-full min-w-0 box-border ${currentTheme.codePreBg} ${currentTheme.codePreText}`}
                      >
                        <code className="table min-w-full">
                          {renderHighlightedCodeLines(section.codeBlock.code, settings.paperTheme)}
                        </code>
                      </pre>

                      {/* Code Explanation Footer */}
                      {section.codeBlock.explanation && (
                        <div
                          className={`px-3.5 sm:px-4 py-2.5 border-t text-xs font-sans leading-relaxed ${currentTheme.codeBorder} ${currentTheme.codeExplanationBg} opacity-80 break-words [overflow-wrap:anywhere] min-w-0 w-full max-w-full`}
                        >
                          {section.codeBlock.explanation[language]}
                        </div>
                      )}
                    </div>
                  )}

                  {/* PRACTICAL SCENARIO */}
                  {section.practicalScenario && (
                    <PracticalScenarioBlock scenario={section.practicalScenario} language={language} theme={settings.paperTheme} />
                  )}

                  {/* BEST PRACTICES */}
                  {section.bestPractices && (
                    <BestPracticesBlock practices={section.bestPractices} language={language} theme={settings.paperTheme} />
                  )}

                  {/* RELATED CONCEPTS & STUDY LINK */}
                  {section.relatedConcepts && (
                    <RelatedConceptsBlock
                      concepts={section.relatedConcepts}
                      studyLink={section.studyLink}
                      language={language}
                      theme={settings.paperTheme}
                    />
                  )}

                  {/* KEY ENGINEERING TAKEAWAYS CALLOUT */}
                  {section.keyTakeaways && (
                    <div
                      className={`p-4 sm:p-6 rounded-2xl border ${currentTheme.calloutBg} ${currentTheme.calloutBorder} space-y-3 shadow-xs min-w-0 w-full max-w-full overflow-hidden box-border`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 truncate">
                          Engineering Takeaways
                        </span>
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm list-none p-0 m-0 leading-relaxed opacity-90 min-w-0 w-full">
                        {section.keyTakeaways[language].map((takeaway, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 min-w-0 w-full">
                            <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                            <span className="min-w-0 break-words [overflow-wrap:anywhere] flex-1">{renderFormattedText(takeaway)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* CHAPTER NAVIGATION FOOTER */}
            <footer className="mt-16 pt-8 border-t border-black/10 dark:border-white/10 space-y-6 w-full max-w-full min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full min-w-0">
                {/* Previous Chapter Card */}
                {currentChapterIndex > 0 ? (
                  <button
                    type="button"
                    id="reader-prev-chapter-btn"
                    onClick={() => {
                      onNavigateChapter(currentChapterIndex - 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 min-w-0 w-full box-border ${currentTheme.cardBg} ${currentTheme.border} hover:border-blue-500/50 hover:shadow-sm`}
                  >
                    <ChevronLeft className="w-5 h-5 text-blue-500 shrink-0" />
                    <div className="overflow-hidden min-w-0 flex-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider opacity-60">
                        {dict.reader.prevChapter}
                      </div>
                      <div className="text-xs sm:text-sm font-bold truncate">
                        Ch {book.chapters[currentChapterIndex - 1].number}:{' '}
                        {book.chapters[currentChapterIndex - 1].title[language]}
                      </div>
                    </div>
                  </button>
                ) : (
                  <div />
                )}

                {/* Next Chapter Card */}
                {currentChapterIndex < book.chapters.length - 1 ? (
                  <button
                    type="button"
                    id="reader-next-chapter-btn"
                    onClick={() => {
                      onNavigateChapter(currentChapterIndex + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-right transition-all cursor-pointer flex items-center justify-end gap-3 shadow-md shadow-blue-600/20 min-w-0 w-full box-border"
                  >
                    <div className="overflow-hidden min-w-0 flex-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-blue-100">
                        {dict.reader.nextChapter}
                      </div>
                      <div className="text-xs sm:text-sm font-bold truncate">
                        Ch {book.chapters[currentChapterIndex + 1].number}:{' '}
                        {book.chapters[currentChapterIndex + 1].title[language]}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white shrink-0" />
                  </button>
                ) : (
                  <button
                    type="button"
                    id="reader-finish-book-btn"
                    onClick={onBackToBook}
                    className="p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-right transition-all cursor-pointer flex items-center justify-end gap-3 shadow-md shadow-emerald-600/20 min-w-0 w-full box-border"
                  >
                    <div className="overflow-hidden min-w-0 flex-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-100">
                        Completed
                      </div>
                      <div className="text-xs sm:text-sm font-bold truncate">
                        {dict.reader.finishBook}
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                  </button>
                )}
              </div>

              {/* Bottom Back Button */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={onBackToBook}
                  className="text-xs font-mono font-bold text-slate-400 hover:text-blue-500 transition-colors cursor-pointer"
                >
                  &larr; {dict.reader.backToBook} ({book.title})
                </button>
              </div>
            </footer>
          </article>
        </main>
      </div>
    </div>
  );
};
