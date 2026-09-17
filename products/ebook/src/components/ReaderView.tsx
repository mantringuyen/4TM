import React, { useState, useEffect } from 'react';
import { Book, Chapter, Language, ReaderSettings, ReaderFontSize, ReaderWidth, ReaderPaperTheme } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
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

  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    sm: 'text-sm leading-relaxed',
    md: 'text-base leading-relaxed sm:text-lg sm:leading-loose',
    lg: 'text-lg leading-loose sm:text-xl sm:leading-loose',
    xl: 'text-xl leading-loose sm:text-2xl sm:leading-loose',
  };

  // Max width container classes
  const widthClasses: Record<ReaderWidth, string> = {
    compact: 'max-w-[65ch]',
    standard: 'max-w-[75ch]',
    wide: 'max-w-[95ch]',
  };

  // Theme container classes
  const themeClasses: Record<ReaderPaperTheme, { bg: string; text: string; cardBg: string; border: string }> = {
    default: {
      bg: 'bg-white dark:bg-slate-950',
      text: 'text-slate-900 dark:text-slate-100',
      cardBg: 'bg-slate-50 dark:bg-slate-900',
      border: 'border-slate-200 dark:border-slate-800',
    },
    sepia: {
      bg: 'bg-[#FBF0D9] dark:bg-[#282218]',
      text: 'text-[#433422] dark:text-[#EADBC8]',
      cardBg: 'bg-[#F3E5C8] dark:bg-[#342C20]',
      border: 'border-[#E2D2B0] dark:border-[#4B3F2E]',
    },
    dark: {
      bg: 'bg-[#18181B]',
      text: 'text-zinc-100',
      cardBg: 'bg-zinc-900',
      border: 'border-zinc-800',
    },
    midnight: {
      bg: 'bg-[#0B0F19]',
      text: 'text-slate-100',
      cardBg: 'bg-[#111827]',
      border: 'border-slate-800',
    },
  };

  const currentTheme = themeClasses[settings.paperTheme];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${currentTheme.bg} ${currentTheme.text}`}>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-blue-600 dark:bg-blue-400 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Sticky Reader Toolbar */}
      <div
        className={`sticky top-0 z-30 w-full border-b backdrop-blur-md transition-colors ${
          settings.paperTheme === 'default'
            ? 'bg-white/90 dark:bg-slate-950/90 border-slate-200 dark:border-slate-800'
            : `${currentTheme.bg}/90 ${currentTheme.border}`
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Back & TOC drawer toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBackToBook}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              title={dict.reader.backToBook}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{dict.reader.backToBook}</span>
            </button>

            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <Menu className="w-4 h-4" />
              <span>{dict.reader.toc}</span>
            </button>
          </div>

          {/* Center: Book & Chapter indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs font-mono truncate max-w-sm">
            <span className="text-slate-400 truncate">{book.title}</span>
            <span className="text-slate-300 dark:text-slate-700">&bull;</span>
            <span className="font-bold text-blue-600 dark:text-blue-400 truncate">
              Ch {chapter.number}: {chapter.title[language]}
            </span>
          </div>

          {/* Right: Font size, Width, Theme, Bookmark */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Font Size Selector */}
            <div className="flex items-center p-0.5 rounded-xl border border-black/10 dark:border-white/10 text-xs">
              {(['sm', 'md', 'lg', 'xl'] as ReaderFontSize[]).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSettings((s) => ({ ...s, fontSize: size }))}
                  className={`px-1.5 py-0.5 rounded-md font-mono text-[11px] font-bold cursor-pointer transition-colors ${
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
              onClick={() => onToggleBookmark(chapter.id)}
              className={`p-1.5 rounded-xl border border-black/10 dark:border-white/10 transition-colors cursor-pointer ${
                isBookmarked
                  ? 'text-amber-500 bg-amber-500/10 border-amber-500/20'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title={isBookmarked ? dict.reader.chapterBookmarked : dict.reader.bookmarkChapter}
            >
              {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Reading Container */}
      <div className="flex">
        {/* Collapsible Sidebar Table of Contents */}
        {sidebarOpen && (
          <aside
            className={`fixed inset-y-0 left-0 z-40 w-80 shadow-2xl p-6 overflow-y-auto border-r transition-all ${
              settings.paperTheme === 'default'
                ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                : `${currentTheme.bg} ${currentTheme.border}`
            }`}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/10 dark:border-white/10">
              <span className="text-xs font-mono font-bold uppercase tracking-wider">
                {dict.reader.toc}
              </span>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
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
                      setSidebarOpen(false);
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
                    <div>{ch.title[language]}</div>
                  </button>
                );
              })}
            </div>
          </aside>
        )}

        {/* Reading Article */}
        <main className={`mx-auto px-4 sm:px-6 py-12 sm:py-16 ${widthClasses[settings.width]}`}>
          {/* Chapter Metadata */}
          <div className="mb-10 pb-6 border-b border-black/10 dark:border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
              <span>Chapter {chapter.number}</span>
              <span>&bull;</span>
              <span>{chapter.readTimeMinutes} {dict.card.readTime}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-reader tracking-tight mb-4">
              {chapter.title[language]}
            </h1>

            <p className="text-sm sm:text-base opacity-75 italic">
              {chapter.summary[language]}
            </p>
          </div>

          {/* Chapter Sections */}
          <div className="space-y-12">
            {chapter.sections.map((section) => (
              <section key={section.id} id={section.id} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold font-reader tracking-tight">
                  {section.title[language]}
                </h2>

                <p className={`font-reader text-justify leading-relaxed ${fontSizeClasses[settings.fontSize]}`}>
                  {section.content[language]}
                </p>

                {/* Code Block if present */}
                {section.codeBlock && (
                  <div className="my-6 rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 text-slate-100 shadow-lg">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400">
                      <span>{section.codeBlock.filename || section.codeBlock.language}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(section.codeBlock!.code, section.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-[11px]"
                      >
                        {copiedCodeId === section.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>{dict.reader.copied}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>{dict.reader.copyCode}</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-emerald-400 dark:text-emerald-300">
                      <code>{section.codeBlock.code}</code>
                    </pre>

                    {section.codeBlock.explanation && (
                      <div className="px-4 py-2.5 bg-slate-900/60 border-t border-slate-800/80 text-xs text-slate-400 font-sans">
                        {section.codeBlock.explanation[language]}
                      </div>
                    )}
                  </div>
                )}

                {/* Key takeaways callout */}
                {section.keyTakeaways && (
                  <div
                    className={`p-5 rounded-2xl border ${currentTheme.cardBg} ${currentTheme.border} space-y-2`}
                  >
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-500">
                      Engineering Takeaways
                    </span>
                    <ul className="space-y-1 text-xs list-disc list-inside opacity-80">
                      {section.keyTakeaways[language].map((takeaway, idx) => (
                        <li key={idx}>{takeaway}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Chapter Navigation Footer */}
          <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-4">
            {currentChapterIndex > 0 ? (
              <button
                type="button"
                onClick={() => {
                  onNavigateChapter(currentChapterIndex - 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{dict.reader.prevChapter}</span>
              </button>
            ) : (
              <div />
            )}

            {currentChapterIndex < book.chapters.length - 1 ? (
              <button
                type="button"
                onClick={() => {
                  onNavigateChapter(currentChapterIndex + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold shadow-sm transition-colors cursor-pointer"
              >
                <span>{dict.reader.nextChapter}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onBackToBook}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-sm transition-colors cursor-pointer"
              >
                <span>{dict.reader.finishBook}</span>
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
