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
  BarChart3,
  Calendar,
  Workflow,
  Layers,
  Table,
  Sparkles,
  GitCompare,
  Scissors,
  FileCode,
  Cpu,
  ShieldAlert,
  AlignLeft,
  RefreshCw,
  Sliders,
  Globe,
  HelpCircle,
  AlertCircle,
  AlertTriangle,
  Send,
} from 'lucide-react';

// Lazy-loaded Phase 1 & Existing Workspaces
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

// Lazy-loaded Excel Workspaces
const ExcelFormulaExplainerTool = React.lazy(() =>
  import('./workspaces/excel/ExcelFormulaExplainerTool').then((m) => ({ default: m.ExcelFormulaExplainerTool }))
);
const ExcelFormulaBuilderTool = React.lazy(() =>
  import('./workspaces/excel/ExcelFormulaBuilderTool').then((m) => ({ default: m.ExcelFormulaBuilderTool }))
);
const ExcelFormulaDebuggerTool = React.lazy(() =>
  import('./workspaces/excel/ExcelFormulaDebuggerTool').then((m) => ({ default: m.ExcelFormulaDebuggerTool }))
);

// Lazy-loaded Power BI Workspaces
const DaxExplainerTool = React.lazy(() =>
  import('./workspaces/powerbi/DaxExplainerTool').then((m) => ({ default: m.DaxExplainerTool }))
);
const DaxTimeIntelligenceBuilderTool = React.lazy(() =>
  import('./workspaces/powerbi/DaxTimeIntelligenceBuilderTool').then((m) => ({ default: m.DaxTimeIntelligenceBuilderTool }))
);
const PowerQueryMExplainerTool = React.lazy(() =>
  import('./workspaces/powerbi/PowerQueryMExplainerTool').then((m) => ({ default: m.PowerQueryMExplainerTool }))
);

// Lazy-loaded SQL Workspaces
const SqlJoinVisualizerTool = React.lazy(() =>
  import('./workspaces/sql/SqlJoinVisualizerTool').then((m) => ({ default: m.SqlJoinVisualizerTool }))
);
const SqlNullTesterTool = React.lazy(() =>
  import('./workspaces/sql/SqlNullTesterTool').then((m) => ({ default: m.SqlNullTesterTool }))
);
const SqlQueryExplainerTool = React.lazy(() =>
  import('./workspaces/sql/SqlQueryExplainerTool').then((m) => ({ default: m.SqlQueryExplainerTool }))
);

// Lazy-loaded Python Workspaces
const PythonErrorExplainerTool = React.lazy(() =>
  import('./workspaces/python/PythonErrorExplainerTool').then((m) => ({ default: m.PythonErrorExplainerTool }))
);
const PythonStructureVisualizerTool = React.lazy(() =>
  import('./workspaces/python/PythonStructureVisualizerTool').then((m) => ({ default: m.PythonStructureVisualizerTool }))
);
const PythonComplexityInspectorTool = React.lazy(() =>
  import('./workspaces/python/PythonComplexityInspectorTool').then((m) => ({ default: m.PythonComplexityInspectorTool }))
);
const PandasExpressionExplorerTool = React.lazy(() =>
  import('./workspaces/python/PandasExpressionExplorerTool').then((m) => ({ default: m.PandasExpressionExplorerTool }))
);

// Lazy-loaded AI Workspaces
const PromptStructureAnalyzerTool = React.lazy(() =>
  import('./workspaces/ai/PromptStructureAnalyzerTool').then((m) => ({ default: m.PromptStructureAnalyzerTool }))
);
const PromptDiffTool = React.lazy(() =>
  import('./workspaces/ai/PromptDiffTool').then((m) => ({ default: m.PromptDiffTool }))
);
const RagChunkingPlaygroundTool = React.lazy(() =>
  import('./workspaces/ai/RagChunkingPlaygroundTool').then((m) => ({ default: m.RagChunkingPlaygroundTool }))
);
const JsonSchemaPromptBuilderTool = React.lazy(() =>
  import('./workspaces/ai/JsonSchemaPromptBuilderTool').then((m) => ({ default: m.JsonSchemaPromptBuilderTool }))
);
const ReActTraceVisualizerTool = React.lazy(() =>
  import('./workspaces/ai/ReActTraceVisualizerTool').then((m) => ({ default: m.ReActTraceVisualizerTool }))
);
const PromptDefensePlaygroundTool = React.lazy(() =>
  import('./workspaces/ai/PromptDefensePlaygroundTool').then((m) => ({ default: m.PromptDefensePlaygroundTool }))
);

// Lazy-loaded Developer & Web Workspaces
const JsonPathExplorerTool = React.lazy(() =>
  import('./workspaces/developer/JsonPathExplorerTool').then((m) => ({ default: m.JsonPathExplorerTool }))
);
const RegexPlaygroundTool = React.lazy(() =>
  import('./workspaces/developer/RegexPlaygroundTool').then((m) => ({ default: m.RegexPlaygroundTool }))
);
const CronExpressionBuilderTool = React.lazy(() =>
  import('./workspaces/developer/CronExpressionBuilderTool').then((m) => ({ default: m.CronExpressionBuilderTool }))
);
const HttpRequestBuilderTool = React.lazy(() =>
  import('./workspaces/developer/HttpRequestBuilderTool').then((m) => ({ default: m.HttpRequestBuilderTool }))
);
const CssSpecificityCalculatorTool = React.lazy(() =>
  import('./workspaces/web/CssSpecificityCalculatorTool').then((m) => ({ default: m.CssSpecificityCalculatorTool }))
);
const HtmlAccessibilityInspectorTool = React.lazy(() =>
  import('./workspaces/web/HtmlAccessibilityInspectorTool').then((m) => ({ default: m.HtmlAccessibilityInspectorTool }))
);
const UrlInspectorTool = React.lazy(() =>
  import('./workspaces/web/UrlInspectorTool').then((m) => ({ default: m.UrlInspectorTool }))
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

  // Initialize tool based on current URL path using slug (handles /slug, /tools/slug, etc.)
  const getToolIdFromUrl = (): ToolId => {
    if (typeof window !== 'undefined') {
      const cleanPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
      if (cleanPath) {
        const segments = cleanPath.split('/');
        const candidate = segments[segments.length - 1];
        const matched = tools.find(
          (t) =>
            t.slug === candidate ||
            t.id === candidate ||
            t.slug === cleanPath ||
            t.id === cleanPath
        );
        if (matched) return matched.id;
      }
    }
    return 'excel-formula-explainer';
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
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', `${activeTool.seoTitle[language]} | 4TM Tools`);
      }
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', activeTool.description[language]);
      }
    }
  }, [activeTool, language]);

  const handleSelectTool = (id: ToolId) => {
    setActiveToolId(id);
    const targetTool = tools.find((t) => t.id === id);
    if (targetTool && typeof window !== 'undefined') {
      const isPrefixed = window.location.pathname.startsWith('/tools');
      const newPath = isPrefixed ? `/tools/${targetTool.slug}` : `/${targetTool.slug}`;
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
    const desiredOrder = ['all', 'excel', 'powerbi', 'sql', 'python', 'ai', 'developer', 'web'];
    const presentCats = Array.from(new Set(tools.map((t) => t.category)));
    return desiredOrder.filter((c) => c === 'all' || presentCats.includes(c as ToolCategory));
  }, [tools]);

  const renderToolWorkspace = () => {
    switch (activeTool.id) {
      // Excel Tools
      case 'excel-formula-explainer':
        return <ExcelFormulaExplainerTool language={language} />;
      case 'excel-formula-builder':
        return <ExcelFormulaBuilderTool language={language} />;
      case 'excel-formula-debugger':
        return <ExcelFormulaDebuggerTool language={language} />;

      // Power BI Tools
      case 'dax-explainer':
        return <DaxExplainerTool language={language} />;
      case 'dax-time-intelligence':
        return <DaxTimeIntelligenceBuilderTool language={language} />;
      case 'powerquery-m-explainer':
        return <PowerQueryMExplainerTool language={language} />;

      // SQL Tools
      case 'sql-join-visualizer':
        return <SqlJoinVisualizerTool language={language} />;
      case 'sql-null-tester':
        return <SqlNullTesterTool language={language} />;
      case 'sql-query-explainer':
        return <SqlQueryExplainerTool language={language} />;
      case 'sql-formatter':
        return <SqlFormatterTool language={language} />;

      // Python Tools
      case 'python-error-explainer':
        return <PythonErrorExplainerTool language={language} />;
      case 'python-structure-visualizer':
        return <PythonStructureVisualizerTool language={language} />;
      case 'python-complexity-inspector':
        return <PythonComplexityInspectorTool language={language} />;
      case 'pandas-expression-explorer':
        return <PandasExpressionExplorerTool language={language} />;

      // AI Tools
      case 'prompt-structure-analyzer':
        return <PromptStructureAnalyzerTool language={language} />;
      case 'prompt-diff':
        return <PromptDiffTool language={language} />;
      case 'rag-chunking-playground':
        return <RagChunkingPlaygroundTool language={language} />;
      case 'json-schema-prompt-builder':
        return <JsonSchemaPromptBuilderTool language={language} />;
      case 'react-trace-visualizer':
        return <ReActTraceVisualizerTool language={language} />;
      case 'prompt-defense-playground':
        return <PromptDefensePlaygroundTool language={language} />;

      // Developer Tools
      case 'data-converter':
        return <DataConverterTool language={language} />;
      case 'jsonpath-explorer':
        return <JsonPathExplorerTool language={language} />;
      case 'regex-playground':
        return <RegexPlaygroundTool language={language} />;
      case 'jwt-debugger':
      case 'jwt':
        return <JwtTool language={language} />;
      case 'http-request-builder':
        return <HttpRequestBuilderTool language={language} />;
      case 'cron-builder':
        return <CronExpressionBuilderTool language={language} />;
      case 'encoder-decoder':
        return <EncoderDecoderTool language={language} />;
      case 'crypto-hasher':
      case 'hasher':
        return <HasherTool language={language} />;
      case 'uuid-generator':
      case 'uuid':
        return <UuidTool language={language} />;
      case 'unix-timestamp':
      case 'timestamp':
        return <TimestampTool language={language} />;
      case 'text-case-converter':
        return <TextCaseTool language={language} />;
      case 'base64':
        return <Base64Tool language={language} />;
      case 'json':
        return <JsonTool language={language} />;

      // Web Tools
      case 'css-specificity-calculator':
        return <CssSpecificityCalculatorTool language={language} />;
      case 'html-accessibility-inspector':
        return <HtmlAccessibilityInspectorTool language={language} />;
      case 'url-inspector':
        return <UrlInspectorTool language={language} />;
      case 'css-layout-generator':
        return <CssGeneratorTool language={language} />;
      case 'qr-generator':
        return <QrGeneratorTool language={language} />;

      default:
        return <div className="p-8 text-center text-slate-500">Tool workspace unavailable</div>;
    }
  };

  const getToolIcon = (id: ToolId) => {
    switch (id) {
      // Excel
      case 'excel-formula-explainer':
      case 'excel-formula-builder':
      case 'excel-formula-debugger':
        return <FileSpreadsheet className="w-4 h-4 text-emerald-500" />;

      // Power BI
      case 'dax-explainer':
      case 'dax-time-intelligence':
        return <BarChart3 className="w-4 h-4 text-amber-500" />;
      case 'powerquery-m-explainer':
        return <Workflow className="w-4 h-4 text-amber-500" />;

      // SQL
      case 'sql-join-visualizer':
      case 'sql-null-tester':
      case 'sql-query-explainer':
      case 'sql-formatter':
        return <Database className="w-4 h-4 text-cyan-500" />;

      // Python
      case 'python-error-explainer':
      case 'python-structure-visualizer':
      case 'python-complexity-inspector':
      case 'pandas-expression-explorer':
        return <Layers className="w-4 h-4 text-blue-500" />;

      // AI
      case 'prompt-structure-analyzer':
      case 'prompt-diff':
      case 'rag-chunking-playground':
      case 'json-schema-prompt-builder':
      case 'react-trace-visualizer':
      case 'prompt-defense-playground':
        return <Sparkles className="w-4 h-4 text-purple-500" />;

      // Developer
      case 'data-converter':
        return <RefreshCw className="w-4 h-4 text-emerald-500" />;
      case 'jsonpath-explorer':
        return <Search className="w-4 h-4 text-emerald-500" />;
      case 'regex-playground':
        return <Sliders className="w-4 h-4 text-emerald-500" />;
      case 'jwt-debugger':
      case 'jwt':
        return <KeyRound className="w-4 h-4 text-emerald-500" />;
      case 'http-request-builder':
        return <Send className="w-4 h-4 text-emerald-500" />;
      case 'cron-builder':
        return <Clock className="w-4 h-4 text-emerald-500" />;
      case 'encoder-decoder':
        return <Binary className="w-4 h-4 text-emerald-500" />;
      case 'crypto-hasher':
      case 'hasher':
        return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
      case 'uuid-generator':
      case 'uuid':
        return <Fingerprint className="w-4 h-4 text-emerald-500" />;
      case 'unix-timestamp':
      case 'timestamp':
        return <Clock className="w-4 h-4 text-emerald-500" />;
      case 'text-case-converter':
        return <Type className="w-4 h-4 text-emerald-500" />;

      // Web
      case 'css-specificity-calculator':
        return <Sliders className="w-4 h-4 text-sky-500" />;
      case 'html-accessibility-inspector':
        return <ShieldCheck className="w-4 h-4 text-sky-500" />;
      case 'url-inspector':
        return <Globe className="w-4 h-4 text-sky-500" />;
      case 'css-layout-generator':
        return <Palette className="w-4 h-4 text-sky-500" />;
      case 'qr-generator':
        return <QrCode className="w-4 h-4 text-sky-500" />;

      default:
        return <Wrench className="w-4 h-4 text-slate-400" />;
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
        <div className="mt-6">
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
