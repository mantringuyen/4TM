import React, { useState, useEffect, useMemo } from 'react';
import {
  Book,
  BookMetadata,
  Chapter,
  Language,
  ReaderSettings,
  ReaderFontSize,
  ReaderWidth,
  ReaderPaperTheme,
} from '../types';
import { DOMAINS, TOPICS, EBOOK_FIELD } from '../data/ebooks';
import { TRANSLATIONS } from '../i18n/translations';
import { BookCover } from './BookCover';
import { ChapterOpener } from './ChapterOpener';
import { ChapterEnd } from './ChapterEnd';
import { PublicationFrontMatter } from './PublicationFrontMatter';
import {
  renderInlineText,
  KeyIdeaBlock,
  WhenToUseBlock,
  CommonMistakesBlock,
  ComparisonTableBlock,
  ProcessDiagramBlock,
  BestPracticesBlock,
  PracticalScenarioBlock,
  RelatedConceptsBlock,
  DeepDiveBlock,
  SelfReviewBlock,
  ChapterSummaryBlock,
  DefinitionCardBlock,
  TipInsightBlock,
  GuideStepWorkflowBlock,
  TroubleshootingMatrixBlock,
  ErrorDiagnosisBlock,
  BestPracticeComparisonBlock,
  PatternRecipeBlock,
  EditorialChecklistBlock,
} from './EditorialPrimitives';
import { getPublicationTemplate } from '../data/publicationRegistry';
import { getReaderThemeTokens } from '../theme/readerTheme';
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Menu,
  X,
  Copy,
  Check,
  Palette,
  BookOpen,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldCheck,
  CheckCircle2,
  Clock,
  BookMarked,
  FileText,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';

export interface ReaderViewProps {
  book: Book | BookMetadata;
  currentChapterIndex: number;
  language: Language;
  onNavigateChapter: (idx: number) => void;
  onBackToBook: () => void;
  bookmarks: string[];
  onToggleBookmark: (chapterId: string) => void;
  isLoading?: boolean;
  loadError?: boolean;
  onRetry?: () => void;
}

// Helper: Syntax highlight code lines cleanly according to active theme
function renderHighlightedCodeLines(code: string, theme: ReaderPaperTheme) {
  const lines = code.split('\n');

  // Token regexes
  const commentRegex = /^(\s*)(\/\/.*|#.*|\/\*.*\*\/|--.*)/;
  const isDarkTheme = theme === 'dark' || theme === 'midnight';
  const isSepia = theme === 'sepia';

  const commentClass = isSepia
    ? 'text-[#7C6C58] italic'
    : isDarkTheme
    ? 'text-zinc-500 italic'
    : 'text-slate-500 italic';

  return lines.map((line, idx) => {
    const commentMatch = line.match(commentRegex);
    return (
      <div key={idx} className="table-row">
        <span className="table-cell select-none pr-3 sm:pr-4 text-right opacity-30 font-mono text-xs shrink-0">
          {idx + 1}
        </span>
        <span
          className={`table-cell whitespace-pre font-mono text-xs sm:text-sm ${
            commentMatch ? commentClass : ''
          }`}
        >
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
  isLoading = false,
  loadError = false,
  onRetry,
}) => {
  const dict = TRANSLATIONS[language];
  const chapter = book.chapters[currentChapterIndex] || book.chapters[0];

  // Mode: Front Matter (Title page, colophon, TOC) vs Chapter reading
  const [viewingFrontMatter, setViewingFrontMatter] = useState(false);

  // Sidebar visibility (Desktop Zen Mode; Mobile Drawer)
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
  const tokens = getReaderThemeTokens(settings.paperTheme);

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

  // Real Typography font size classes for Newsreader
  const fontSizeClasses: Record<ReaderFontSize, string> = {
    sm: 'text-sm sm:text-base leading-[1.7]',
    md: 'text-base sm:text-lg leading-[1.75]',
    lg: 'text-lg sm:text-xl leading-[1.8]',
    xl: 'text-xl sm:text-2xl leading-[1.85]',
  };

  // Max width container classes (comfortable editorial measure: 60 - 75ch)
  const widthClasses: Record<ReaderWidth, string> = {
    compact: 'max-w-[62ch]',
    standard: 'max-w-[70ch]',
    wide: 'max-w-[78ch]',
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const completionPct = Math.round(((currentChapterIndex + 1) / book.chapters.length) * 100);

  return (
    <div
      className={`min-h-screen transition-colors duration-200 w-full max-w-full ${tokens.pageBg} ${tokens.textPrimary}`}
    >
      {/* Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-1 bg-teal-600 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Minimal Publication Running Header */}
      <header
        className={`sticky top-0 z-30 w-full border-b backdrop-blur-md transition-colors ${tokens.pageBg}/95 ${tokens.borderSubtle}`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-2 sm:gap-3 w-full min-w-0 box-border">
          {/* Left: Back to Book Overview & Sidebar Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              id="reader-back-to-book-btn"
              onClick={onBackToBook}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold ${tokens.textMuted} hover:${tokens.accentText} hover:${tokens.highlightSurface} transition-colors cursor-pointer`}
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
              className={`lg:hidden inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold ${tokens.textSecondary} hover:${tokens.highlightSurface} transition-colors cursor-pointer`}
            >
              <Menu className="w-4 h-4" />
              <span>{dict.reader.toc}</span>
            </button>

            {/* Desktop Zen Mode / Sidebar Toggle */}
            <button
              type="button"
              id="desktop-sidebar-toggle-btn"
              onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
              className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${tokens.textSecondary} hover:${tokens.highlightSurface} transition-colors cursor-pointer`}
              title={desktopSidebarOpen ? 'Hide Table of Contents (Zen Mode)' : 'Show Table of Contents'}
            >
              {desktopSidebarOpen ? (
                <>
                  <PanelLeftClose className={`w-4 h-4 ${tokens.textMuted}`} />
                  <span>Zen Mode</span>
                </>
              ) : (
                <>
                  <PanelLeftOpen className={`w-4 h-4 ${tokens.accentText}`} />
                  <span>{dict.reader.toc}</span>
                </>
              )}
            </button>
          </div>

          {/* Center: Running Book Title & Folio */}
          <div className="hidden md:flex items-center gap-2 text-xs font-mono truncate max-w-sm min-w-0">
            <span className={`${tokens.textMuted} truncate`}>{book.title}</span>
            <span className="opacity-40">&bull;</span>
            <span className={`font-bold ${tokens.accentText} truncate`}>
              {viewingFrontMatter
                ? language === 'vi'
                  ? 'Đầu sách & Mục lục'
                  : 'Front Matter'
                : `Ch ${chapter.number}: ${chapter.title[language]}`}
            </span>
          </div>

          {/* Right: Customization Controls (Type size, Paper theme, Bookmark) */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Real Typography Font Size Selector */}
            <div className={`flex items-center p-0.5 rounded-xl border ${tokens.borderSubtle} text-xs gap-0.5 ${tokens.innerSurface}`}>
              <button
                type="button"
                id="fontsize-btn-sm"
                onClick={() => setSettings((s) => ({ ...s, fontSize: 'sm' }))}
                className={`px-2 py-0.5 rounded-md font-sans text-xs font-bold cursor-pointer transition-colors ${
                  settings.fontSize === 'sm'
                    ? 'bg-teal-600 text-white'
                    : `${tokens.textMuted} hover:${tokens.textPrimary}`
                }`}
                title="Font Size: Small (A-)"
              >
                A-
              </button>
              <button
                type="button"
                id="fontsize-btn-md"
                onClick={() => setSettings((s) => ({ ...s, fontSize: 'md' }))}
                className={`px-2 py-0.5 rounded-md font-sans text-xs font-bold cursor-pointer transition-colors ${
                  settings.fontSize === 'md'
                    ? 'bg-teal-600 text-white'
                    : `${tokens.textMuted} hover:${tokens.textPrimary}`
                }`}
                title="Font Size: Regular (A)"
              >
                A
              </button>
              <button
                type="button"
                id="fontsize-btn-lg"
                onClick={() => setSettings((s) => ({ ...s, fontSize: 'lg' }))}
                className={`px-2 py-0.5 rounded-md font-sans text-xs font-bold cursor-pointer transition-colors ${
                  settings.fontSize === 'lg'
                    ? 'bg-teal-600 text-white'
                    : `${tokens.textMuted} hover:${tokens.textPrimary}`
                }`}
                title="Font Size: Large (A+)"
              >
                A+
              </button>
            </div>

            {/* Paper Theme Selector */}
            <button
              type="button"
              id="paper-theme-toggle-btn"
              onClick={() => {
                const themes: ReaderPaperTheme[] = ['default', 'sepia', 'dark', 'midnight'];
                const nextIdx = (themes.indexOf(settings.paperTheme) + 1) % themes.length;
                setSettings((s) => ({ ...s, paperTheme: themes[nextIdx] }));
              }}
              className={`p-1.5 rounded-xl border ${tokens.borderSubtle} ${tokens.textMuted} hover:${tokens.textPrimary} hover:${tokens.highlightSurface} cursor-pointer transition-colors`}
              title={`${dict.reader.theme}: ${dict.themes[settings.paperTheme]}`}
            >
              <Palette className="w-3.5 h-3.5" />
            </button>

            {/* Bookmark Chapter */}
            {!viewingFrontMatter && (
              <button
                type="button"
                id="bookmark-chapter-btn"
                onClick={() => onToggleBookmark(chapter.id)}
                className={`p-1.5 rounded-xl border ${tokens.borderSubtle} transition-colors cursor-pointer ${
                  isBookmarked
                    ? 'text-amber-500 bg-amber-500/10 border-amber-500/20'
                    : `${tokens.textMuted} hover:${tokens.textPrimary} hover:${tokens.highlightSurface}`
                }`}
                title={isBookmarked ? dict.reader.chapterBookmarked : dict.reader.bookmarkChapter}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-3.5 h-3.5 text-amber-500" />
                ) : (
                  <Bookmark className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Publication Container */}
      <div className="w-full max-w-7xl mx-auto flex min-w-0">
        {/* DESKTOP Publication Table of Contents Rail */}
        {desktopSidebarOpen && (
          <aside
            aria-label="Publication Table of Contents"
            className={`hidden lg:block w-80 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-5 border-r transition-all ${tokens.borderSubtle} ${tokens.cardSurface}`}
          >
            {/* Publication Miniature Header in Sidebar */}
            <div
              className={`p-3.5 rounded-2xl border mb-5 ${tokens.innerSurface} ${tokens.borderSubtle}`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${tokens.accentBg} ${tokens.accentText} border ${tokens.accentBorder}`}>
                  {book.bookType}
                </span>
                <span className={`text-[9px] font-mono ${tokens.textMuted}`}>
                  {book.chaptersCount} Chs
                </span>
              </div>
              <h2 className={`text-xs font-bold leading-tight mb-1 line-clamp-2 ${tokens.textPrimary}`}>{book.title}</h2>
              <div className={`text-[10px] ${tokens.textMuted} font-mono mb-2`}>{book.author}</div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className={`flex justify-between text-[9px] font-mono ${tokens.textMuted}`}>
                  <span>Reading Folio</span>
                  <span>{completionPct}%</span>
                </div>
                <div className={`h-1 w-full rounded-full ${tokens.highlightSurface} overflow-hidden`}>
                  <div
                    className="h-full bg-teal-600 rounded-full transition-all"
                    style={{ width: `${completionPct}%` }}
                  />
                </div>
              </div>
            </div>

            <div className={`text-[10px] font-mono font-bold uppercase tracking-widest ${tokens.textMuted} mb-2 px-1`}>
              {dict.reader.toc}
            </div>

            {/* Publication TOC Sequence: Front Matter + Chapters */}
            <nav className="space-y-1">
              {/* Item 0: Front Matter */}
              <button
                type="button"
                id="desktop-toc-frontmatter"
                onClick={() => {
                  setViewingFrontMatter(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full text-left p-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  viewingFrontMatter
                    ? 'bg-teal-600 text-white font-bold shadow-xs'
                    : `hover:${tokens.highlightSurface} ${tokens.textSecondary}`
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookMarked className="w-3.5 h-3.5 shrink-0 opacity-75" />
                  <span className="font-mono text-[11px]">
                    {language === 'vi' ? 'Đầu Sách (Bìa & Mục Lục)' : 'Front Matter (Title & TOC)'}
                  </span>
                </div>
              </button>

              <div className={`h-px ${tokens.borderSubtle} border-t my-2`} />

              {/* Chapter Items */}
              {book.chapters.map((ch, idx) => {
                const isActive = !viewingFrontMatter && idx === currentChapterIndex;
                const isChBookmarked = bookmarks.includes(ch.id);

                return (
                  <button
                    key={ch.id}
                    type="button"
                    id={`desktop-toc-ch-${idx}`}
                    onClick={() => {
                      setViewingFrontMatter(false);
                      onNavigateChapter(idx);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-start justify-between gap-2 ${
                      isActive
                        ? 'bg-teal-600 text-white font-bold shadow-xs'
                        : `hover:${tokens.highlightSurface} ${tokens.textSecondary}`
                    }`}
                  >
                    <div>
                      <div className={`font-mono text-[9px] mb-0.5 ${isActive ? 'text-teal-100' : tokens.textMuted}`}>
                        Ch {ch.number} &bull; {ch.readTimeMinutes} min
                      </div>
                      <div className={`line-clamp-2 leading-snug ${isActive ? 'text-white' : tokens.textPrimary}`}>{ch.title[language]}</div>
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
              className={`relative w-80 max-w-[85vw] h-full shadow-2xl p-5 overflow-y-auto border-r transition-all z-10 box-border ${tokens.cardSurface} ${tokens.borderSubtle}`}
            >
              <div className={`flex items-center justify-between pb-3 mb-3 border-b ${tokens.borderSubtle}`}>
                <div>
                  <div className={`text-[10px] font-mono uppercase tracking-wider ${tokens.accentText} font-bold`}>
                    {book.bookType}
                  </div>
                  <span className={`text-xs font-mono font-bold uppercase tracking-wider ${tokens.textPrimary}`}>
                    {dict.reader.toc}
                  </span>
                </div>
                <button
                  type="button"
                  id="close-mobile-toc-btn"
                  onClick={() => setMobileDrawerOpen(false)}
                  className={`p-1 rounded-lg ${tokens.textMuted} hover:${tokens.textPrimary} cursor-pointer`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                {/* Mobile Front Matter Entry */}
                <button
                  type="button"
                  onClick={() => {
                    setViewingFrontMatter(true);
                    setMobileDrawerOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-2 ${
                    viewingFrontMatter
                      ? 'bg-teal-600 text-white font-bold shadow-xs'
                      : `hover:${tokens.highlightSurface} ${tokens.textSecondary}`
                  }`}
                >
                  <BookMarked className="w-3.5 h-3.5 shrink-0 opacity-75" />
                  <span className="font-mono text-[11px]">
                    {language === 'vi' ? 'Đầu Sách (Bìa & Mục Lục)' : 'Front Matter (Title & TOC)'}
                  </span>
                </button>

                <div className={`h-px ${tokens.borderSubtle} border-t my-2`} />

                {book.chapters.map((ch, idx) => {
                  const isActive = !viewingFrontMatter && idx === currentChapterIndex;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => {
                        setViewingFrontMatter(false);
                        onNavigateChapter(idx);
                        setMobileDrawerOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                        isActive
                          ? 'bg-teal-600 text-white font-bold shadow-xs'
                          : `hover:${tokens.highlightSurface} ${tokens.textSecondary}`
                      }`}
                    >
                      <div className={`font-mono text-[9px] mb-0.5 ${isActive ? 'text-teal-100' : tokens.textMuted}`}>
                        Chapter {ch.number} &bull; {ch.readTimeMinutes} min
                      </div>
                      <div className={`break-words [overflow-wrap:anywhere] ${isActive ? 'text-white' : tokens.textPrimary}`}>{ch.title[language]}</div>
                    </button>
                  );
                })}
              </div>
            </aside>
          </div>
        )}

        {/* FOCUSED EDITORIAL READING COLUMN */}
        <main
          className={`flex-1 min-w-0 w-full max-w-full mx-auto px-4 sm:px-8 py-8 sm:py-12 transition-all box-border ${
            widthClasses[settings.width]
          }`}
        >
          {loadError ? (
            <div className="py-16 text-center space-y-6 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h2 className={`text-lg font-bold font-reader ${tokens.textPrimary}`}>{dict.reader.loadError}</h2>
                <p className={`text-xs ${tokens.textMuted} leading-relaxed`}>
                  {dict.reader.loadErrorDesc}
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-2">
                {onRetry && (
                  <button
                    type="button"
                    id="reader-retry-btn"
                    onClick={onRetry}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-sm transition-all cursor-pointer"
                  >
                    {dict.reader.retry}
                  </button>
                )}
                <button
                  type="button"
                  id="reader-error-back-btn"
                  onClick={onBackToBook}
                  className={`px-4 py-2.5 rounded-xl text-xs font-medium border ${tokens.borderSubtle} hover:${tokens.highlightSurface} transition-all cursor-pointer`}
                >
                  {dict.reader.backToBook}
                </button>
              </div>
            </div>
          ) : isLoading || !('sections' in chapter) ? (
            <div className="py-12 space-y-8 animate-pulse max-w-xl mx-auto">
              <div className="space-y-3">
                <div className={`h-3 w-24 ${tokens.highlightSurface} rounded font-mono`} />
                <div className={`h-8 w-3/4 ${tokens.highlightSurface} rounded-lg`} />
                <div className={`h-4 w-full ${tokens.highlightSurface} rounded`} />
              </div>
              <div className="space-y-4 pt-6">
                <div className={`h-4 w-full ${tokens.highlightSurface} rounded`} />
                <div className={`h-4 w-5/6 ${tokens.highlightSurface} rounded`} />
                <div className={`h-4 w-4/6 ${tokens.highlightSurface} rounded`} />
              </div>
              <div className={`h-40 w-full ${tokens.cardSurface} rounded-2xl border ${tokens.borderSubtle} p-6 space-y-3`}>
                <div className={`h-4 w-1/3 ${tokens.highlightSurface} rounded`} />
                <div className={`h-3 w-full ${tokens.highlightSurface} rounded`} />
                <div className={`h-3 w-4/5 ${tokens.highlightSurface} rounded`} />
              </div>
              <div className={`flex items-center justify-center gap-2 text-xs ${tokens.textMuted} font-mono pt-4`}>
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping" />
                <span>{dict.reader.loadingContent}</span>
              </div>
            </div>
          ) : viewingFrontMatter ? (
            /* FRONT MATTER DISPLAY SPREAD */
            <PublicationFrontMatter
              book={book as Book}
              language={language}
              paperTheme={settings.paperTheme}
              savedChapterIndex={currentChapterIndex}
              onStartChapter={(chIdx) => {
                setViewingFrontMatter(false);
                onNavigateChapter(chIdx);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBackToOverview={onBackToBook}
            />
          ) : (
            /* TECHNICAL PUBLICATION CHAPTER SPREAD */
            <article className="w-full max-w-full min-w-0">
              {/* CHAPTER OPENER */}
              <ChapterOpener
                book={book as Book}
                chapter={chapter}
                chapterIndex={currentChapterIndex}
                totalChapters={book.chapters.length}
                language={language}
                paperTheme={settings.paperTheme}
                isBookmarked={isBookmarked}
                onToggleBookmark={() => onToggleBookmark(chapter.id)}
                onScrollToSection={scrollToSection}
              />

              {/* CHAPTER SECTIONS */}
              <div className="space-y-14 pt-2 w-full max-w-full min-w-0 select-text">
                {chapter.sections.map((section, sIdx) => (
                  <section
                    key={section.id}
                    id={`section-${section.id}`}
                    className="space-y-6 w-full max-w-full min-w-0"
                  >
                    {/* Section Editorial Heading */}
                    <div className="space-y-1">
                      <div className={`text-[10px] font-mono tracking-widest uppercase ${tokens.textMuted}`}>
                        § {chapter.number}.{sIdx + 1}
                      </div>
                      <h2 className={`text-xl sm:text-2xl lg:text-3xl font-black font-reader tracking-tight leading-snug ${tokens.textPrimary}`}>
                        {section.title[language]}
                      </h2>
                    </div>

                    {/* Section Body Prose in Newsreader */}
                    {section.content && section.content[language] && (
                      <div
                        className={`font-reader text-left break-words [overflow-wrap:anywhere] min-w-0 w-full max-w-full ${tokens.textPrimary} opacity-95 ${
                          fontSizeClasses[settings.fontSize]
                        }`}
                      >
                        {renderInlineText(section.content[language], settings.paperTheme)}
                      </div>
                    )}

                    {/* DEFINITION BLOCK (Definitions Publication Type) */}
                    {section.definitionDetails && (
                      <DefinitionCardBlock
                        details={section.definitionDetails}
                        language={language}
                        theme={settings.paperTheme}
                      />
                    )}

                    {/* TIP INSIGHT BLOCK (Tips Publication Type) */}
                    {section.tipDetails && (
                      <TipInsightBlock
                        details={section.tipDetails}
                        language={language}
                        theme={settings.paperTheme}
                      />
                    )}

                    {/* GUIDE WORKFLOW BLOCK (Practical Guides Publication Type) */}
                    {section.guideDetails && (
                      <GuideStepWorkflowBlock
                        details={section.guideDetails}
                        language={language}
                        theme={settings.paperTheme}
                      />
                    )}

                    {/* TROUBLESHOOTING MATRIX */}
                    {section.troubleshooting && (
                      <TroubleshootingMatrixBlock
                        items={section.troubleshooting}
                        language={language}
                        theme={settings.paperTheme}
                      />
                    )}

                    {/* ERROR DIAGNOSIS BLOCK (Common Errors Publication Type) */}
                    {section.errorDetails && (
                      <ErrorDiagnosisBlock
                        details={section.errorDetails}
                        language={language}
                        theme={settings.paperTheme}
                      />
                    )}

                    {/* BEST PRACTICE COMPARISON BLOCK (Best Practices Publication Type) */}
                    {section.practiceDetails && (
                      <BestPracticeComparisonBlock
                        details={section.practiceDetails}
                        language={language}
                        theme={settings.paperTheme}
                      />
                    )}

                    {/* PATTERN RECIPE BLOCK (Patterns / Recipes Publication Type) */}
                    {section.patternDetails && (
                      <PatternRecipeBlock
                        details={section.patternDetails}
                        language={language}
                        theme={settings.paperTheme}
                      />
                    )}

                    {/* EDITORIAL CHECKLIST */}
                    {section.checklist && (
                      <EditorialChecklistBlock
                        title={section.checklist.title}
                        items={section.checklist.items}
                        language={language}
                        theme={settings.paperTheme}
                      />
                    )}

                    {/* KEY IDEA CALLOUT */}
                    {section.keyIdea && (
                      <KeyIdeaBlock
                        idea={section.keyIdea}
                        language={language}
                        theme={settings.paperTheme}
                      />
                    )}

                    {/* WHEN TO USE / AVOID */}
                    {section.whenToUse && (
                      <WhenToUseBlock
                        whenToUse={section.whenToUse}
                        language={language}
                        theme={settings.paperTheme}
                      />
                    )}

                    {/* PUBLICATION COMPARISON TABLE */}
                    {section.comparisonTable && (
                      <ComparisonTableBlock
                        matrix={section.comparisonTable}
                        language={language}
                        theme={settings.paperTheme}
                        chapterNumber={chapter.number}
                        itemIndex={sIdx + 1}
                      />
                    )}

                    {/* PUBLICATION PROCESS DIAGRAM (Figure X.Y) */}
                    {section.diagram && (
                      <ProcessDiagramBlock
                        diagram={section.diagram}
                        language={language}
                        theme={settings.paperTheme}
                        chapterNumber={chapter.number}
                        itemIndex={sIdx + 1}
                      />
                    )}

                    {/* TECHNICAL DEEP DIVE */}
                    {section.deepDive && (
                      <DeepDiveBlock
                        deepDive={section.deepDive}
                        language={language}
                        theme={settings.paperTheme}
                      />
                    )}

                    {/* COMMON MISTAKES & ANTI-PATTERNS */}
                    {section.commonMistakes && (
                      <CommonMistakesBlock
                        mistakes={section.commonMistakes}
                        language={language}
                        theme={settings.paperTheme}
                      />
                    )}

                    {/* PUBLICATION CODE EXAMPLE (Example X.Y) */}
                    {section.codeBlock && (
                      <div
                        className={`my-8 rounded-2xl overflow-hidden border shadow-xs w-full max-w-full min-w-0 box-border ${tokens.codeBorder} ${tokens.codeBg}`}
                      >
                        {/* Example Caption Header */}
                        <div
                          className={`flex items-center justify-between px-3.5 sm:px-4 py-2.5 border-b ${tokens.codeBorder} ${tokens.codeHeaderBg} ${tokens.codeHeaderText} text-xs font-mono min-w-0`}
                        >
                          <div className="flex items-center gap-2 truncate mr-2 min-w-0">
                            <span className={`font-bold ${tokens.accentText} shrink-0`}>
                              Example {chapter.number}.{sIdx + 1}
                            </span>
                            <span className="opacity-40">&mdash;</span>
                            <span className="font-semibold truncate">
                              {section.codeBlock.filename || `${section.codeBlock.language.toUpperCase()} Source`}
                            </span>
                          </div>

                          <button
                            type="button"
                            id={`copy-code-btn-${section.id}`}
                            onClick={() => handleCopy(section.codeBlock!.code, section.id)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${tokens.highlightSurface} hover:opacity-80 transition-colors cursor-pointer text-[11px] font-semibold shrink-0`}
                          >
                            {copiedCodeId === section.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                                <span className="text-emerald-600">
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

                        {/* Code Pre Area with Linenumbers */}
                        <pre
                          className={`p-3.5 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed select-text w-full max-w-full min-w-0 box-border ${tokens.codePreBg} ${tokens.codePreText}`}
                        >
                          <code className="table min-w-full">
                            {renderHighlightedCodeLines(section.codeBlock.code, settings.paperTheme)}
                          </code>
                        </pre>

                        {/* Code Explanation Footer */}
                        {section.codeBlock.explanation && (
                          <div
                            className={`px-3.5 sm:px-4 py-3 border-t text-xs font-sans leading-relaxed ${tokens.codeBorder} ${tokens.codeExplanationBg} ${tokens.textSecondary} break-words [overflow-wrap:anywhere] min-w-0 w-full max-w-full`}
                          >
                            <div className={`font-mono font-bold text-[10px] uppercase tracking-wider ${tokens.textMuted} mb-1`}>
                              {language === 'vi' ? 'Giải thích mã nguồn:' : 'Code Explanation:'}
                            </div>
                            {section.codeBlock.explanation[language]}
                          </div>
                        )}
                      </div>
                    )}

                    {/* PRACTICAL SCENARIO */}
                    {section.practicalScenario && (
                      <PracticalScenarioBlock
                        scenario={section.practicalScenario}
                        language={language}
                        theme={settings.paperTheme}
                      />
                    )}

                    {/* BEST PRACTICES */}
                    {section.bestPractices && (
                      <BestPracticesBlock
                        practices={section.bestPractices}
                        language={language}
                        theme={settings.paperTheme}
                      />
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

                    {/* KEY ENGINEERING TAKEAWAYS */}
                    {section.keyTakeaways && (
                      <div
                        className={`p-4 sm:p-6 rounded-2xl border ${tokens.calloutBg} ${tokens.calloutBorder} space-y-3 shadow-xs min-w-0 w-full max-w-full overflow-hidden box-border`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <ShieldCheck className={`w-4 h-4 ${tokens.accentText} shrink-0`} />
                          <span className={`text-xs font-mono font-bold uppercase tracking-wider ${tokens.accentText} truncate`}>
                            {language === 'vi' ? 'Điểm Kỹ Thuật Trọng Tâm' : 'Engineering Takeaways'}
                          </span>
                        </div>
                        <ul className="space-y-2 text-xs sm:text-sm list-none p-0 m-0 leading-relaxed min-w-0 w-full">
                          {section.keyTakeaways[language].map((takeaway, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 min-w-0 w-full">
                              <CheckCircle2 className={`w-4 h-4 ${tokens.accentText} shrink-0 mt-0.5`} />
                              <span className={`min-w-0 break-words [overflow-wrap:anywhere] flex-1 font-reader ${tokens.textPrimary}`}>
                                {renderInlineText(takeaway, settings.paperTheme)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* CHAPTER SUMMARY SYNTHESIS */}
              {chapter.chapterSummary && (
                <ChapterSummaryBlock
                  summary={chapter.chapterSummary}
                  language={language}
                  theme={settings.paperTheme}
                />
              )}

              {/* CHAPTER SELF-REVIEW DIAGNOSTIC */}
              {chapter.selfReview && chapter.selfReview.length > 0 && (
                <SelfReviewBlock
                  questions={chapter.selfReview}
                  language={language}
                  theme={settings.paperTheme}
                />
              )}

              {/* CHAPTER END SPREAD */}
              <ChapterEnd
                book={book as Book}
                currentChapter={chapter}
                currentChapterIndex={currentChapterIndex}
                totalChapters={book.chapters.length}
                language={language}
                paperTheme={settings.paperTheme}
                onNavigateChapter={(idx) => {
                  onNavigateChapter(idx);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onBackToBook={onBackToBook}
                onOpenFrontMatter={() => {
                  setViewingFrontMatter(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </article>
          )}
        </main>
      </div>
    </div>
  );
};
