import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { ToolItem, ToolCategory, ToolId, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { ToolHeader } from './common/ToolHeader';
import {
  Search,
  Wrench,
  Binary,
  FileJson,
  ShieldCheck,
  KeyRound,
  Fingerprint,
  Clock,
  FileSpreadsheet,
  Type,
  Database,
  Palette,
  QrCode,
  Loader2,
  X,
} from 'lucide-react';

// Lazy-loaded Phase 1 Workspaces
const DataConverterTool = React.lazy(() =>
  import('./workspaces/DataConverterTool').then((m) => ({ default: m.DataConverterTool }))
);
const TextCaseTool = React.lazy(() =>
  import('./workspaces/TextCaseTool').then((m) => ({ default: m.TextCaseTool }))
);
const SqlFormatterTool = React.lazy(() =>
  import('./workspaces/SqlFormatterTool').then((m) => ({ default: m.SqlFormatterTool }))
);
const EncoderDecoderTool = React.lazy(() =>
  import('./workspaces/EncoderDecoderTool').then((m) => ({ default: m.EncoderDecoderTool }))
);
const CssGeneratorTool = React.lazy(() =>
  import('./workspaces/CssGeneratorTool').then((m) => ({ default: m.CssGeneratorTool }))
);
const QrGeneratorTool = React.lazy(() =>
  import('./workspaces/QrGeneratorTool').then((m) => ({ default: m.QrGeneratorTool }))
);

// Lazy-loaded Existing Workspaces
const Base64Tool = React.lazy(() =>
  import('./workspaces/Base64Tool').then((m) => ({ default: m.Base64Tool }))
);
const JsonTool = React.lazy(() =>
  import('./workspaces/JsonTool').then((m) => ({ default: m.JsonTool }))
);
const HasherTool = React.lazy(() =>
  import('./workspaces/HasherTool').then((m) => ({ default: m.HasherTool }))
);
const JwtTool = React.lazy(() =>
  import('./workspaces/JwtTool').then((m) => ({ default: m.JwtTool }))
);
const UuidTool = React.lazy(() =>
  import('./workspaces/UuidTool').then((m) => ({ default: m.UuidTool }))
);
const TimestampTool = React.lazy(() =>
  import('./workspaces/TimestampTool').then((m) => ({ default: m.TimestampTool }))
);

export interface WorkbenchProps {
  tools: ToolItem[];
  language: Language;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const Workbench: React.FC<WorkbenchProps> = ({
  tools,
  language,
  searchQuery: propSearchQuery,
  onSearchChange,
}) => {
  const dict = TRANSLATIONS[language];

  // Initialize tool based on current URL path using slug
  const getToolIdFromUrl = (): ToolId => {
    if (typeof window !== 'undefined') {
      const cleanPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
      if (cleanPath) {
        const matched = tools.find((t) => t.slug === cleanPath || t.id === cleanPath);
        if (matched) return matched.id;
      }
    }
    return 'data-converter';
  };

  const [activeToolId, setActiveToolId] = useState<ToolId>(getToolIdFromUrl);
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const searchQuery = propSearchQuery !== undefined ? propSearchQuery : internalSearchQuery;
  const setSearchQuery = onSearchChange || setInternalSearchQuery;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Handle browser back / forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setActiveToolId(getToolIdFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [tools]);

  const activeTool = useMemo(() => {
    return tools.find((t) => t.id === activeToolId) || tools[0];
  }, [tools, activeToolId]);

  // Sync document title and meta description for SEO
  useEffect(() => {
    if (activeTool && typeof document !== 'undefined') {
      document.title = `${activeTool.seoTitle[language]} | 4TM Tools`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', activeTool.description[language]);
      }
    }
  }, [activeTool, language]);

  const handleSelectTool = (id: ToolId) => {
    setActiveToolId(id);
    const targetTool = tools.find((t) => t.id === id);
    if (targetTool && typeof window !== 'undefined') {
      const newPath = `/${targetTool.slug}`;
      if (window.location.pathname !== newPath) {
        window.history.pushState(null, '', newPath);
      }
    }
  };

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = tool.name.toLowerCase().includes(q);
        const matchesTagline =
          tool.tagline.en.toLowerCase().includes(q) || tool.tagline.vi.toLowerCase().includes(q);
        const matchesKw = tool.keywords.some((k) => k.toLowerCase().includes(q));
        if (!matchesName && !matchesTagline && !matchesKw) return false;
      }
      return true;
    });
  }, [tools, selectedCategory, searchQuery]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(tools.map((t) => t.category)));
    return ['all', ...cats];
  }, [tools]);

  const renderToolWorkspace = () => {
    switch (activeTool.id) {
      // Phase 1 Tools
      case 'data-converter':
        return <DataConverterTool language={language} />;
      case 'text-case-converter':
        return <TextCaseTool language={language} />;
      case 'sql-formatter':
        return <SqlFormatterTool language={language} />;
      case 'encoder-decoder':
        return <EncoderDecoderTool language={language} />;
      case 'css-generator':
        return <CssGeneratorTool language={language} />;
      case 'qr-generator':
        return <QrGeneratorTool language={language} />;

      // Existing Tools
      case 'base64':
        return <Base64Tool language={language} />;
      case 'json':
        return <JsonTool language={language} />;
      case 'hasher':
        return <HasherTool language={language} />;
      case 'jwt':
        return <JwtTool language={language} />;
      case 'uuid':
        return <UuidTool language={language} />;
      case 'timestamp':
        return <TimestampTool language={language} />;

      default:
        return <div className="p-8 text-center text-slate-500">Tool workspace unavailable</div>;
    }
  };

  const getToolIcon = (id: ToolId) => {
    switch (id) {
      case 'data-converter':
        return <FileSpreadsheet className="w-4 h-4 text-emerald-500" />;
      case 'text-case-converter':
        return <Type className="w-4 h-4 text-teal-500" />;
      case 'sql-formatter':
        return <Database className="w-4 h-4 text-cyan-500" />;
      case 'encoder-decoder':
        return <Binary className="w-4 h-4 text-indigo-500" />;
      case 'css-generator':
        return <Palette className="w-4 h-4 text-purple-500" />;
      case 'qr-generator':
        return <QrCode className="w-4 h-4 text-pink-500" />;
      case 'base64':
        return <Binary className="w-4 h-4" />;
      case 'json':
        return <FileJson className="w-4 h-4" />;
      case 'hasher':
        return <ShieldCheck className="w-4 h-4" />;
      case 'jwt':
        return <KeyRound className="w-4 h-4" />;
      case 'uuid':
        return <Fingerprint className="w-4 h-4" />;
      case 'timestamp':
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div id="workbench" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono uppercase tracking-wider mb-4 border border-emerald-500/20">
          <Wrench className="w-3.5 h-3.5" />
          <span>{dict.hero.eyebrow}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
          {dict.hero.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {dict.hero.description}
        </p>
      </div>

      {/* Tool Selection Tabs & Search Bar */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-3xl mx-auto">
          {/* Search Input */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="tools-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSearchQuery('');
              }}
              placeholder={dict.hero.searchPlaceholder}
              className="w-full pl-11 pr-10 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                id="tools-search-clear-btn"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                aria-label={language === 'vi' ? 'Xóa tìm kiếm' : 'Clear search'}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat === 'all' ? (language === 'vi' ? 'Tất cả' : 'All') : dict.categories[cat as ToolCategory] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Tool Selector Grid */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {filteredTools.map((tool) => (
            <button
              key={tool.id}
              type="button"
              id={`tool-tab-${tool.id}`}
              onClick={() => handleSelectTool(tool.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold inline-flex items-center gap-2 transition-all cursor-pointer ${
                activeToolId === tool.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 ring-2 ring-emerald-500/40'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {getToolIcon(tool.id)}
              <span>{tool.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Tool Main Workbench Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none text-slate-900 dark:text-white">
        {/* Active Tool Header */}
        <ToolHeader tool={activeTool} language={language} />

        {/* Render the Active Interactive Workspace with Suspense */}
        <div className="mt-4">
          <Suspense
            fallback={
              <div className="p-12 flex flex-col items-center justify-center gap-3 text-slate-400">
                <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
                <span className="text-xs font-mono">Loading workspace...</span>
              </div>
            }
          >
            {renderToolWorkspace()}
          </Suspense>
        </div>
      </div>
    </div>
  );
};
