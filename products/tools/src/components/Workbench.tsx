import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSEO, SchemaGenerators } from '@shared';
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
  RotateCcw,
  ChevronDown,
  Sliders,
  Globe,
  HelpCircle,
  AlertCircle,
  AlertTriangle,
  Send,
  ArrowRight,
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
  onResultCountChange?: (count: number) => void;
  onRouteValidityChange?: (isValid: boolean) => void;
  onWorkspaceLoadingChange?: (isLoading: boolean) => void;
}

function WorkspaceSuspenseFallback({
  onLoadingChange,
}: {
  onLoadingChange?: (isLoading: boolean) => void;
}) {
  useEffect(() => {
    onLoadingChange?.(true);
    return () => onLoadingChange?.(false);
  }, [onLoadingChange]);

  return (
    <div className="p-12 flex flex-col items-center justify-center gap-3 text-slate-400">
      <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
      <span className="text-xs font-mono">Loading workspace...</span>
    </div>
  );
}

export const Workbench: React.FC<WorkbenchProps> = ({
  tools,
  language,
  searchQuery: propSearchQuery,
  onSearchChange,
  onResultCountChange,
  onRouteValidityChange,
  onWorkspaceLoadingChange,
}) => {
  const dict = TRANSLATIONS[language];

  // Resolve tool and route validity based on current URL path using slug (handles /, /slug, /tools/slug)
  const LEGACY_TOOL_ALIASES: Record<string, ToolId> = {
    'css-generator': 'css-layout-generator',
    jwt: 'jwt-debugger',
    hasher: 'crypto-hasher',
    uuid: 'uuid-generator',
    timestamp: 'unix-timestamp',
  };

  const resolveToolRoute = (): { toolId: ToolId; isValidRoute: boolean } => {
    if (typeof window !== 'undefined') {
      const cleanPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
      if (!cleanPath || cleanPath === 'index.html' || cleanPath === 'tools') {
        return { toolId: 'excel-formula-explainer', isValidRoute: true };
      }
      const segments = cleanPath.split('/');
      if (segments.length === 1 || (segments.length === 2 && segments[0] === 'tools')) {
        const candidate = segments[segments.length - 1];
        const normalizedCandidate = LEGACY_TOOL_ALIASES[candidate] || candidate;
        const matched = tools.find(
          (t) =>
            t.slug === normalizedCandidate ||
            t.id === normalizedCandidate ||
            t.slug === cleanPath ||
            t.id === cleanPath
        );
        if (matched) {
          return { toolId: matched.id, isValidRoute: true };
        }
      }
      return { toolId: 'excel-formula-explainer', isValidRoute: false };
    }
    return { toolId: 'excel-formula-explainer', isValidRoute: true };
  };

  const initialResolved = resolveToolRoute();
  const [activeToolId, setActiveToolId] = useState<ToolId>(initialResolved.toolId);
  const [isValidRoute, setIsValidRoute] = useState<boolean>(initialResolved.isValidRoute);
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const searchQuery = propSearchQuery !== undefined ? propSearchQuery : internalSearchQuery;
  const setSearchQuery = onSearchChange || setInternalSearchQuery;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    onRouteValidityChange?.(isValidRoute);
  }, [isValidRoute, onRouteValidityChange]);

  // Handle browser back / forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const resolved = resolveToolRoute();
      setActiveToolId(resolved.toolId);
      setIsValidRoute(resolved.isValidRoute);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [tools]);

  const activeTool = useMemo(() => {
    return tools.find((t) => t.id === activeToolId) || tools[0];
  }, [tools, activeToolId]);

  // Sync document title, meta description, canonical URL, and JSON-LD for SEO
  useSEO({
    title: !isValidRoute
      ? '404 — Tool Not Found | 4TM Tools'
      : activeTool
      ? `${activeTool.seoTitle[language]} | 4TM Tools`
      : '4TM Tools — Technical Utilities & Developer Tooling Suite',
    description: activeTool ? activeTool.description[language] : 'Technical Utilities & Developer Tooling Suite — 36 in-browser developer tools.',
    canonicalUrl: activeTool && isValidRoute ? `https://tools.4tm.io.vn/${activeTool.slug}` : 'https://tools.4tm.io.vn/',
    language,
    noindex: !isValidRoute,
    jsonLd: activeTool
      ? [
          SchemaGenerators.softwareApplication({
            id: activeTool.id,
            name: activeTool.name[language],
            description: activeTool.description[language],
            category: 'DeveloperApplication',
            url: `https://tools.4tm.io.vn/${activeTool.slug}`,
          }),
          SchemaGenerators.website('https://tools.4tm.io.vn', '4TM Tools', 'Technical Utilities & Developer Tooling Suite'),
        ]
      : [
          SchemaGenerators.website('https://tools.4tm.io.vn', '4TM Tools', 'Technical Utilities & Developer Tooling Suite'),
        ],
  });

  const handleSelectTool = (id: ToolId) => {
    setActiveToolId(id);
    setIsValidRoute(true);
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
        const q = searchQuery.toLowerCase().trim();
        const matchesName = tool.name.toLowerCase().includes(q);
        const matchesTagline =
          tool.tagline.en.toLowerCase().includes(q) || tool.tagline.vi.toLowerCase().includes(q);
        const matchesDesc =
          tool.description.en.toLowerCase().includes(q) || tool.description.vi.toLowerCase().includes(q);
        const matchesKw = tool.keywords.some((k) => k.toLowerCase().includes(q));
        const matchesSlug = tool.slug.toLowerCase().includes(q);
        const matchesCat = tool.category.toLowerCase().includes(q);
        if (!matchesName && !matchesTagline && !matchesDesc && !matchesKw && !matchesSlug && !matchesCat) {
          return false;
        }
      }
      return true;
    });
  }, [tools, selectedCategory, searchQuery]);

  useEffect(() => {
    onResultCountChange?.(filteredTools.length);
  }, [filteredTools.length, onResultCountChange]);

  const categories = useMemo(() => {
    const desiredOrder = ['all', 'excel', 'powerbi', 'sql', 'python', 'ai', 'developer', 'web'];
    const presentCats = Array.from(new Set(tools.map((t) => t.category)));
    return desiredOrder.filter((c) => c === 'all' || presentCats.includes(c as ToolCategory));
  }, [tools]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: tools.length };
    tools.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, [tools]);

  const hasActiveFilters = selectedCategory !== 'all' || searchQuery.trim().length > 0;

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
  };

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

      {/* Tool Selection & Discovery Filter Area */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-4xl mx-auto">
          {/* Search Input */}
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="tools-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSearchQuery('');
              }}
              placeholder={dict.filter?.searchPlaceholder || dict.hero.searchPlaceholder}
              className="w-full pl-11 pr-10 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
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

          {/* Mobile Category Dropdown (< 640px) */}
          <div className="relative w-full sm:hidden">
            <select
              id="tools-mobile-category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-2xl border text-xs font-semibold cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                selectedCategory !== 'all'
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
              }`}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all'
                    ? `${language === 'vi' ? 'Tất cả danh mục' : 'All Categories'} (${categoryCounts.all || 36})`
                    : `${dict.categories[cat as ToolCategory] || cat} (${categoryCounts[cat] || 0})`}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-slate-400" />
          </div>

          {/* Desktop Category Filter Pills (>= 640px) */}
          <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                id={`tools-category-pill-${cat}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <span>{cat === 'all' ? (language === 'vi' ? 'Tất cả' : 'All') : dict.categories[cat as ToolCategory] || cat}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                  selectedCategory === cat
                    ? 'bg-slate-800 dark:bg-slate-200 text-slate-200 dark:text-slate-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>
                  {categoryCounts[cat] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Filter Chips & Result Counter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 max-w-4xl mx-auto pt-1 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-2">
            {/* Result count */}
            <span className="font-mono text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              {filteredTools.length === 1
                ? dict.filter?.showingToolsCountSingle?.replace('{total}', String(tools.length)) ||
                  `Showing 1 of ${tools.length} tools`
                : dict.filter?.showingToolsCount
                    ?.replace('{count}', String(filteredTools.length))
                    ?.replace('{total}', String(tools.length)) ||
                  `Showing ${filteredTools.length} of ${tools.length} tools`}
            </span>

            {/* Active Category Chip */}
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-bold border border-emerald-500/20">
                <span>
                  {dict.filter?.activeCategory || 'Category'}:{' '}
                  {dict.categories[selectedCategory as ToolCategory] || selectedCategory}
                </span>
                <X
                  className="w-3 h-3 cursor-pointer hover:text-emerald-800 dark:hover:text-emerald-200"
                  onClick={() => setSelectedCategory('all')}
                  aria-label="Remove category filter"
                />
              </span>
            )}

            {/* Active Search Query Chip */}
            {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px] font-semibold">
                <span>&quot;{searchQuery}&quot;</span>
                <X
                  className="w-3 h-3 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  onClick={() => setSearchQuery('')}
                  aria-label="Remove search filter"
                />
              </span>
            )}
          </div>

          {/* Reset All Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"
              id="tools-reset-filters-btn"
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer font-bold text-[11px]"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{dict.filter?.clearFilters || 'Clear Filters'}</span>
            </button>
          )}
        </div>

        {/* Tool Cards Grid or Empty State */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 max-w-6xl mx-auto">
            {filteredTools.map((tool) => {
              const isActive = activeToolId === tool.id;
              const categoryName = dict.categories[tool.category] || tool.category;
              const tagline =
                tool.tagline[language] ||
                tool.tagline.en ||
                tool.description[language] ||
                tool.description.en;

              return (
                <div
                  key={tool.id}
                  id={`tool-card-${tool.id}`}
                  onClick={() => {
                    handleSelectTool(tool.id);
                    document.getElementById('active-tool-workbench')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`group p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer text-left ${
                    isActive
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-500/80 dark:border-emerald-500/70 shadow-md ring-1 ring-emerald-500/40'
                      : 'bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-850/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
                  }`}
                >
                  <div className="space-y-2.5">
                    {/* Header row: Icon, Category Badge & Active Indicator */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`p-2 rounded-xl border shrink-0 transition-colors ${
                            isActive
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 group-hover:border-emerald-500/40 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                          }`}
                        >
                          {getToolIcon(tool.id)}
                        </div>
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 truncate">
                          {categoryName}
                        </span>
                      </div>

                      {isActive && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wide bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {dict.filter?.inUse || (language === 'vi' ? 'Đang mở' : 'In Use')}
                        </span>
                      )}
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3
                        className={`text-sm sm:text-base font-bold transition-colors ${
                          isActive
                            ? 'text-emerald-800 dark:text-emerald-300'
                            : 'text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                        }`}
                      >
                        {tool.name}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {tagline}
                      </p>
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      {tool.studyRelation && tool.studyRelation.length > 0 && tool.studyRelation[0] !== 'None' && (
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">
                          {language === 'vi' ? 'Học phần:' : 'Course:'} {tool.studyRelation.join(', ')}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      id={`tool-tab-${tool.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectTool(tool.id);
                        document.getElementById('active-tool-workbench')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`inline-flex items-center gap-1 font-bold text-xs shrink-0 transition-transform cursor-pointer ${
                        isActive
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-slate-600 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5'
                      }`}
                    >
                      <span>
                        {isActive
                          ? dict.filter?.inUse || (language === 'vi' ? 'Đang mở' : 'In Use')
                          : dict.filter?.openTool || (language === 'vi' ? 'Mở công cụ' : 'Open Tool')}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-10 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md mx-auto shadow-xs">
            <Wrench className="w-9 h-9 text-slate-400 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
              {dict.filter?.noToolsFound || 'No tools match your criteria'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              {dict.filter?.noToolsFoundDesc || 'Try adjusting your search terms or selecting a different category.'}
            </p>
            <button
              type="button"
              id="tools-empty-reset-btn"
              onClick={handleClearFilters}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white cursor-pointer hover:bg-emerald-500 shadow-md shadow-emerald-600/20"
            >
              {dict.filter?.clearFilters || 'Clear Filters'}
            </button>
          </div>
        )}
      </div>

      {/* Active Tool Main Workbench Container */}
      <div id="active-tool-workbench" className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none text-slate-900 dark:text-white">
        {/* Active Tool Header */}
        <ToolHeader tool={activeTool} language={language} />

        {/* Render the Active Interactive Workspace with Suspense */}
        <div className="mt-6">
          <Suspense
            fallback={
              <WorkspaceSuspenseFallback onLoadingChange={onWorkspaceLoadingChange} />
            }
          >
            {renderToolWorkspace()}
          </Suspense>
        </div>
      </div>
    </div>
  );
};
