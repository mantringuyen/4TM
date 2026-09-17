import React, { useState, useMemo } from 'react';
import { ToolItem, ToolCategory, ToolId, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { Search, Wrench, Binary, FileJson, ShieldCheck, KeyRound, Fingerprint, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { Base64Tool } from './workspaces/Base64Tool';
import { JsonTool } from './workspaces/JsonTool';
import { HasherTool } from './workspaces/HasherTool';
import { JwtTool } from './workspaces/JwtTool';
import { UuidTool } from './workspaces/UuidTool';
import { TimestampTool } from './workspaces/TimestampTool';

export interface WorkbenchProps {
  tools: ToolItem[];
  language: Language;
}

export const Workbench: React.FC<WorkbenchProps> = ({ tools, language }) => {
  const dict = TRANSLATIONS[language];
  const [activeToolId, setActiveToolId] = useState<ToolId>('base64');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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

  const activeTool = tools.find((t) => t.id === activeToolId) || tools[0];

  const renderToolWorkspace = () => {
    switch (activeTool.id) {
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
        return <div>Tool workspace unavailable</div>;
    }
  };

  const getToolIcon = (id: ToolId) => {
    switch (id) {
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
    <div id="workbench" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono uppercase tracking-wider mb-4 border border-emerald-500/20">
          <Wrench className="w-3.5 h-3.5" />
          <span>{dict.hero.eyebrow}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
          {dict.hero.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {dict.hero.description}
        </p>
      </div>

      {/* Tool Selection Tabs & Search Bar */}
      <div className="space-y-4 mb-8">
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="tools-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={dict.hero.searchPlaceholder}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>

        {/* Quick Tool Selector Grid */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {filteredTools.map((tool) => (
            <button
              key={tool.id}
              type="button"
              id={`tool-tab-${tool.id}`}
              onClick={() => setActiveToolId(tool.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold inline-flex items-center gap-2 transition-all cursor-pointer ${
                activeToolId === tool.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
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
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400 mb-1">
              <span>{dict.categories[activeTool.category]}</span>
              <span>&bull;</span>
              <span>{activeTool.badge}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">{activeTool.name}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {activeTool.tagline[language]}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {activeTool.keywords.map((kw) => (
              <span
                key={kw}
                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-750"
              >
                #{kw}
              </span>
            ))}
          </div>
        </div>

        {/* Render the Active Interactive Workspace */}
        <div>{renderToolWorkspace()}</div>
      </div>
    </div>
  );
};
