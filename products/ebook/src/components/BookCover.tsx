import React from 'react';
import { Book, BookMetadata, BookType } from '../types';
import {
  Code2,
  Database,
  FileCode,
  Layout,
  Table,
  BarChart3,
  Cpu,
  BookOpen,
  Terminal,
  Layers,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  Workflow,
  BookMarked,
  Binary,
} from 'lucide-react';

export interface BookCoverProps {
  book: Book | BookMetadata;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  onClick?: () => void;
}

// Topic-specific technical motifs configuration
interface TopicCoverConfig {
  gradient: string;
  accentBorder: string;
  accentLine: string;
  tagBg: string;
  textColor: string;
  badgeBg: string;
  icon: React.ElementType;
  topicCode: string;
  renderMotif: (size: string) => React.ReactNode;
}

const TOPIC_COVER_CONFIGS: Record<string, TopicCoverConfig> = {
  python: {
    gradient: 'from-[#0B1528] via-[#0F1E36] to-[#1E293B]',
    accentBorder: 'border-sky-500/40',
    accentLine: 'bg-sky-400',
    tagBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    textColor: 'text-sky-100',
    badgeBg: 'bg-sky-500/20 text-sky-200',
    icon: Terminal,
    topicCode: 'PY-3.12',
    renderMotif: () => (
      <svg className="w-full h-full opacity-25" viewBox="0 0 160 120" fill="none">
        {/* Python AST & Indentation Hierarchy Motif */}
        <path d="M20 20 H70 V45 H40 V70 H90 V95 H30" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
        <rect x="65" y="15" width="35" height="12" rx="3" fill="#0284c7" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="1" />
        <text x="70" y="24" fill="#e0f2fe" fontSize="6" fontFamily="monospace">class Main:</text>
        <rect x="35" y="40" width="40" height="12" rx="3" fill="#0284c7" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="1" />
        <text x="40" y="49" fill="#e0f2fe" fontSize="6" fontFamily="monospace">def __init__():</text>
        <rect x="85" y="65" width="45" height="12" rx="3" fill="#0369a1" fillOpacity="0.5" stroke="#38bdf8" strokeWidth="1" />
        <text x="90" y="74" fill="#e0f2fe" fontSize="6" fontFamily="monospace">yield item</text>
        <circle cx="20" cy="20" r="3" fill="#38bdf8" />
        <circle cx="40" cy="45" r="3" fill="#38bdf8" />
        <circle cx="90" cy="70" r="3" fill="#38bdf8" />
        <circle cx="30" cy="95" r="3" fill="#38bdf8" />
      </svg>
    ),
  },
  sql: {
    gradient: 'from-[#061826] via-[#0B253A] to-[#16384C]',
    accentBorder: 'border-cyan-500/40',
    accentLine: 'bg-cyan-400',
    tagBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    textColor: 'text-cyan-100',
    badgeBg: 'bg-cyan-500/20 text-cyan-200',
    icon: Database,
    topicCode: 'SQL-ANSI',
    renderMotif: () => (
      <svg className="w-full h-full opacity-25" viewBox="0 0 160 120" fill="none">
        {/* Relational Schema & B-Tree Node Motif */}
        <rect x="15" y="15" width="55" height="35" rx="2" stroke="#22d3ee" strokeWidth="1" fill="#0e7490" fillOpacity="0.3" />
        <line x1="15" y1="26" x2="70" y2="26" stroke="#22d3ee" strokeWidth="0.75" />
        <text x="20" y="23" fill="#cffafe" fontSize="6" fontFamily="monospace" fontWeight="bold">PRIMARY (id)</text>
        <text x="20" y="34" fill="#a5f3fc" fontSize="5" fontFamily="monospace">index_scan</text>
        <text x="20" y="43" fill="#a5f3fc" fontSize="5" fontFamily="monospace">foreign_key</text>

        <rect x="90" y="55" width="55" height="35" rx="2" stroke="#22d3ee" strokeWidth="1" fill="#0e7490" fillOpacity="0.3" />
        <line x1="90" y1="66" x2="145" y2="66" stroke="#22d3ee" strokeWidth="0.75" />
        <text x="95" y="63" fill="#cffafe" fontSize="6" fontFamily="monospace" fontWeight="bold">JOIN_TARGET</text>
        <text x="95" y="74" fill="#a5f3fc" fontSize="5" fontFamily="monospace">hash_match</text>
        <text x="95" y="83" fill="#a5f3fc" fontSize="5" fontFamily="monospace">partition_by</text>

        {/* Foreign Key Connector Line */}
        <path d="M70 35 C85 35, 80 75, 90 75" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="2 2" />
        <circle cx="70" cy="35" r="2" fill="#22d3ee" />
        <polygon points="90,75 85,72 85,78" fill="#22d3ee" />
      </svg>
    ),
  },
  html: {
    gradient: 'from-[#1A0B2E] via-[#240E3F] to-[#1E1B4B]',
    accentBorder: 'border-purple-500/40',
    accentLine: 'bg-purple-400',
    tagBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    textColor: 'text-purple-100',
    badgeBg: 'bg-purple-500/20 text-purple-200',
    icon: FileCode,
    topicCode: 'HTML-5',
    renderMotif: () => (
      <svg className="w-full h-full opacity-25" viewBox="0 0 160 120" fill="none">
        {/* DOM Tree Structure Motif */}
        <circle cx="80" cy="18" r="10" stroke="#c084fc" strokeWidth="1" fill="#7e22ce" fillOpacity="0.4" />
        <text x="72" y="21" fill="#f3e8ff" fontSize="6" fontFamily="monospace">&lt;html&gt;</text>
        <line x1="72" y1="28" x2="45" y2="50" stroke="#c084fc" strokeWidth="1" />
        <line x1="88" y1="28" x2="115" y2="50" stroke="#c084fc" strokeWidth="1" />
        <rect x="25" y="50" width="40" height="15" rx="3" stroke="#c084fc" strokeWidth="1" fill="#6b21a8" fillOpacity="0.4" />
        <text x="32" y="60" fill="#f3e8ff" fontSize="6" fontFamily="monospace">&lt;head&gt;</text>
        <rect x="95" y="50" width="40" height="15" rx="3" stroke="#c084fc" strokeWidth="1" fill="#6b21a8" fillOpacity="0.4" />
        <text x="102" y="60" fill="#f3e8ff" fontSize="6" fontFamily="monospace">&lt;body&gt;</text>
        <line x1="115" y1="65" x2="115" y2="85" stroke="#c084fc" strokeWidth="1" strokeDasharray="2 2" />
        <rect x="95" y="85" width="40" height="15" rx="3" stroke="#c084fc" strokeWidth="1" fill="#581c87" fillOpacity="0.4" />
        <text x="104" y="95" fill="#f3e8ff" fontSize="6" fontFamily="monospace">&lt;main&gt;</text>
      </svg>
    ),
  },
  css: {
    gradient: 'from-[#1C0826] via-[#2A0C38] to-[#3B0764]',
    accentBorder: 'border-fuchsia-500/40',
    accentLine: 'bg-fuchsia-400',
    tagBg: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
    textColor: 'text-fuchsia-100',
    badgeBg: 'bg-fuchsia-500/20 text-fuchsia-200',
    icon: Layout,
    topicCode: 'CSS-SPEC',
    renderMotif: () => (
      <svg className="w-full h-full opacity-25" viewBox="0 0 160 120" fill="none">
        {/* CSS Box Model & Grid Matrix Motif */}
        <rect x="15" y="15" width="130" height="85" rx="4" stroke="#e879f9" strokeWidth="1" strokeDasharray="3 3" />
        <text x="22" y="24" fill="#fae8ff" fontSize="5" fontFamily="monospace">margin: auto</text>
        <rect x="30" y="28" width="100" height="60" rx="3" stroke="#e879f9" strokeWidth="1" fill="#a21caf" fillOpacity="0.2" />
        <text x="36" y="37" fill="#fae8ff" fontSize="5" fontFamily="monospace">border: 1px solid</text>
        <rect x="45" y="42" width="70" height="34" rx="2" stroke="#e879f9" strokeWidth="1.2" fill="#86198f" fillOpacity="0.4" />
        <text x="52" y="58" fill="#ffffff" fontSize="7" fontFamily="monospace" fontWeight="bold">display: grid</text>
        <text x="52" y="67" fill="#f5d0fe" fontSize="5" fontFamily="monospace">grid-template</text>
      </svg>
    ),
  },
  javascript: {
    gradient: 'from-[#1F1704] via-[#2E2006] to-[#1C1917]',
    accentBorder: 'border-amber-500/40',
    accentLine: 'bg-amber-400',
    tagBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    textColor: 'text-amber-100',
    badgeBg: 'bg-amber-500/20 text-amber-200',
    icon: Code2,
    topicCode: 'ECMA-ES6+',
    renderMotif: () => (
      <svg className="w-full h-full opacity-25" viewBox="0 0 160 120" fill="none">
        {/* JS Event Loop & Microtask Queue Motif */}
        <circle cx="80" cy="55" r="32" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M80 23 A32 32 0 0 1 112 55" stroke="#fbbf24" strokeWidth="2" />
        <polygon points="112,55 116,48 108,48" fill="#fbbf24" />
        <rect x="62" y="47" width="36" height="16" rx="2" fill="#78350f" fillOpacity="0.6" stroke="#fbbf24" strokeWidth="1" />
        <text x="66" y="57" fill="#fef3c7" fontSize="5.5" fontFamily="monospace" fontWeight="bold">EventLoop</text>
        {/* Microtask Box */}
        <rect x="15" y="88" width="45" height="18" rx="2" stroke="#fbbf24" strokeWidth="0.75" fill="#451a03" fillOpacity="0.5" />
        <text x="18" y="99" fill="#fde68a" fontSize="5" fontFamily="monospace">Promise.queue</text>
        {/* Macro Queue */}
        <rect x="100" y="88" width="45" height="18" rx="2" stroke="#fbbf24" strokeWidth="0.75" fill="#451a03" fillOpacity="0.5" />
        <text x="103" y="99" fill="#fde68a" fontSize="5" fontFamily="monospace">macrotasks</text>
      </svg>
    ),
  },
  excel: {
    gradient: 'from-[#041A13] via-[#07261D] to-[#134E4A]',
    accentBorder: 'border-emerald-500/40',
    accentLine: 'bg-emerald-400',
    tagBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    textColor: 'text-emerald-100',
    badgeBg: 'bg-emerald-500/20 text-emerald-200',
    icon: Table,
    topicCode: 'XLSX-CORE',
    renderMotif: () => (
      <svg className="w-full h-full opacity-25" viewBox="0 0 160 120" fill="none">
        {/* Spreadsheet Matrix Grid & Formula Vectors Motif */}
        <rect x="15" y="15" width="130" height="85" rx="2" stroke="#34d399" strokeWidth="1" />
        <line x1="15" y1="32" x2="145" y2="32" stroke="#34d399" strokeWidth="1" />
        <line x1="45" y1="15" x2="45" y2="100" stroke="#34d399" strokeWidth="0.75" />
        <line x1="80" y1="15" x2="80" y2="100" stroke="#34d399" strokeWidth="0.75" />
        <line x1="115" y1="15" x2="115" y2="100" stroke="#34d399" strokeWidth="0.75" />
        <text x="25" y="26" fill="#a7f3d0" fontSize="7" fontFamily="monospace" fontWeight="bold">A</text>
        <text x="60" y="26" fill="#a7f3d0" fontSize="7" fontFamily="monospace" fontWeight="bold">B</text>
        <text x="95" y="26" fill="#a7f3d0" fontSize="7" fontFamily="monospace" fontWeight="bold">C</text>
        <text x="127" y="26" fill="#a7f3d0" fontSize="7" fontFamily="monospace" fontWeight="bold">D</text>
        {/* Active Selected Cell */}
        <rect x="46" y="33" width="33" height="20" fill="#059669" fillOpacity="0.4" stroke="#6ee7b7" strokeWidth="1.5" />
        <text x="50" y="45" fill="#ffffff" fontSize="5" fontFamily="monospace">=XLOOKUP</text>
      </svg>
    ),
  },
  powerbi: {
    gradient: 'from-[#1E0F02] via-[#2E1805] to-[#451A03]',
    accentBorder: 'border-amber-500/40',
    accentLine: 'bg-amber-500',
    tagBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    textColor: 'text-amber-100',
    badgeBg: 'bg-amber-500/20 text-amber-200',
    icon: BarChart3,
    topicCode: 'DAX-BI',
    renderMotif: () => (
      <svg className="w-full h-full opacity-25" viewBox="0 0 160 120" fill="none">
        {/* Power BI Star Schema & Metric Relationships Motif */}
        {/* Center Fact Table */}
        <rect x="60" y="45" width="40" height="30" rx="3" stroke="#f59e0b" strokeWidth="1.2" fill="#78350f" fillOpacity="0.5" />
        <text x="65" y="58" fill="#fef3c7" fontSize="6" fontFamily="monospace" fontWeight="bold">FACT_SALES</text>
        <text x="65" y="67" fill="#fde68a" fontSize="4.5" fontFamily="monospace">DAX Measures</text>
        {/* Dimension Tables */}
        <rect x="15" y="20" width="30" height="20" rx="2" stroke="#f59e0b" strokeWidth="0.75" fill="#451a03" fillOpacity="0.5" />
        <text x="18" y="32" fill="#fef3c7" fontSize="4.5" fontFamily="monospace">DimDate</text>
        <rect x="115" y="20" width="30" height="20" rx="2" stroke="#f59e0b" strokeWidth="0.75" fill="#451a03" fillOpacity="0.5" />
        <text x="118" y="32" fill="#fef3c7" fontSize="4.5" fontFamily="monospace">DimCustomer</text>
        <rect x="60" y="90" width="40" height="18" rx="2" stroke="#f59e0b" strokeWidth="0.75" fill="#451a03" fillOpacity="0.5" />
        <text x="66" y="101" fill="#fef3c7" fontSize="4.5" fontFamily="monospace">DimProduct</text>
        {/* Connectors */}
        <line x1="45" y1="35" x2="60" y2="52" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="115" y1="35" x2="100" y2="52" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="80" y1="75" x2="80" y2="90" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    ),
  },
  ai: {
    gradient: 'from-[#110B29] via-[#1E1145] to-[#2E1065]',
    accentBorder: 'border-violet-500/40',
    accentLine: 'bg-violet-400',
    tagBg: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    textColor: 'text-violet-100',
    badgeBg: 'bg-violet-500/20 text-violet-200',
    icon: Sparkles,
    topicCode: 'AI-EMBED',
    renderMotif: () => (
      <svg className="w-full h-full opacity-25" viewBox="0 0 160 120" fill="none">
        {/* Matrix Attention & Vector Embedding Space Motif */}
        <rect x="20" y="20" width="50" height="50" rx="2" stroke="#a78bfa" strokeWidth="1" fill="#4c1d95" fillOpacity="0.3" />
        {/* Heatmap Attention Grid */}
        <rect x="25" y="25" width="10" height="10" fill="#c4b5fd" fillOpacity="0.7" />
        <rect x="37" y="25" width="10" height="10" fill="#8b5cf6" fillOpacity="0.3" />
        <rect x="49" y="25" width="10" height="10" fill="#a78bfa" fillOpacity="0.5" />
        <rect x="25" y="37" width="10" height="10" fill="#8b5cf6" fillOpacity="0.4" />
        <rect x="37" y="37" width="10" height="10" fill="#ddd6fe" fillOpacity="0.9" />
        <rect x="49" y="37" width="10" height="10" fill="#7c3aed" fillOpacity="0.2" />
        <text x="24" y="64" fill="#ede9fe" fontSize="5" fontFamily="monospace">Q x K^T / sqrt(d)</text>
        {/* Token Vector Latent Space Nodes */}
        <circle cx="110" cy="35" r="4" fill="#a78bfa" />
        <circle cx="130" cy="50" r="5" fill="#c4b5fd" />
        <circle cx="105" cy="75" r="3.5" fill="#8b5cf6" />
        <line x1="110" y1="35" x2="130" y2="50" stroke="#a78bfa" strokeWidth="0.75" />
        <line x1="130" y1="50" x2="105" y2="75" stroke="#a78bfa" strokeWidth="0.75" />
        <line x1="110" y1="35" x2="105" y2="75" stroke="#a78bfa" strokeWidth="0.75" strokeDasharray="2 2" />
        <text x="96" y="92" fill="#c4b5fd" fontSize="5" fontFamily="monospace">vector_dim[1536]</text>
      </svg>
    ),
  },
};

const DEFAULT_COVER_CONFIG: TopicCoverConfig = {
  gradient: 'from-[#0B1528] via-[#111827] to-[#1E293B]',
  accentBorder: 'border-slate-500/40',
  accentLine: 'bg-blue-500',
  tagBg: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  textColor: 'text-slate-100',
  badgeBg: 'bg-slate-500/20 text-slate-200',
  icon: BookOpen,
  topicCode: '4TM-ENG',
  renderMotif: () => (
    <div className="w-full h-full bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:12px_12px] opacity-20" />
  ),
};

// Book type icon helper
function getBookTypeIcon(bookType: BookType): React.ElementType {
  switch (bookType) {
    case 'Handbook':
      return BookMarked;
    case 'Definitions':
      return Layers;
    case 'Tips':
      return Lightbulb;
    case 'Practical Guides':
      return Workflow;
    case 'Common Errors':
      return AlertTriangle;
    case 'Best Practices':
      return ShieldCheck;
    case 'Patterns / Recipes':
      return Binary;
    default:
      return BookOpen;
  }
}

export const BookCover: React.FC<BookCoverProps> = ({
  book,
  size = 'md',
  className = '',
  onClick,
}) => {
  const config = TOPIC_COVER_CONFIGS[book.categoryId] || DEFAULT_COVER_CONFIG;
  const TopicIcon = config.icon;
  const TypeIcon = getBookTypeIcon(book.bookType);

  // Sizing definitions with authentic book aspect ratio (~1:1.45)
  const sizeClasses = {
    sm: 'w-24 sm:w-28 h-36 sm:h-40 text-[10px]',
    md: 'w-36 sm:w-44 h-52 sm:h-64 text-xs',
    lg: 'w-52 sm:w-64 h-76 sm:h-96 text-sm',
    hero: 'w-64 sm:w-76 h-96 sm:h-[430px] text-sm',
  }[size];

  const paddingClasses = {
    sm: 'p-2 sm:p-2.5',
    md: 'p-3.5 sm:p-4',
    lg: 'p-5 sm:p-6',
    hero: 'p-6 sm:p-7',
  }[size];

  const titleSizeClasses = {
    sm: 'text-[11px] sm:text-xs leading-tight font-black font-reader line-clamp-2',
    md: 'text-sm sm:text-base leading-snug font-black font-reader line-clamp-3',
    lg: 'text-lg sm:text-2xl leading-tight font-black font-reader line-clamp-3',
    hero: 'text-xl sm:text-3xl leading-tight font-black font-reader line-clamp-3',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`relative shrink-0 rounded-r-2xl rounded-l-xs overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border ${config.accentBorder} bg-gradient-to-br ${config.gradient} ${sizeClasses} ${className} group/cover select-none cursor-pointer`}
      style={{
        boxShadow:
          size === 'lg' || size === 'hero'
            ? '-8px 14px 32px -4px rgba(0,0,0,0.6), inset 3px 0 4px rgba(255,255,255,0.2)'
            : '-4px 8px 18px -2px rgba(0,0,0,0.45), inset 2px 0 2px rgba(255,255,255,0.12)',
      }}
    >
      {/* 3D Book Spine & Crease Depth */}
      <div className="absolute left-0 top-0 bottom-0 w-2.5 sm:w-4 bg-gradient-to-r from-black/60 via-black/25 to-transparent z-20 border-r border-white/10" />
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/20 z-20" />

      {/* Publication Architectural Motif Canvas */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {config.renderMotif(size)}
      </div>

      {/* Publication Accent Line along top */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${config.accentLine} z-20 opacity-90`} />

      {/* Cover Editorial Content */}
      <div className={`relative z-10 flex flex-col justify-between h-full pl-4 sm:pl-6 pr-3 sm:pr-4 py-3 sm:py-4 ${paddingClasses}`}>
        {/* Top Header: Imprint, Series & Topic Code */}
        <div>
          <div className="flex items-center justify-between gap-1 text-[8px] sm:text-[9px] font-mono font-bold text-white/60 tracking-widest uppercase mb-1">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
              <span>4TM PRESS</span>
            </span>
            <span className="px-1.5 py-0.2 rounded bg-white/10 text-white/80 text-[8px] font-mono">
              {config.topicCode}
            </span>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-white/30 via-white/15 to-transparent mb-2 sm:mb-3" />
        </div>

        {/* Center: Book Type Badge, Book Title & Subtitle */}
        <div className="my-auto py-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-mono font-bold uppercase mb-2 border border-white/15 bg-black/40 backdrop-blur-xs text-white/95">
            <TypeIcon className="w-2.5 h-2.5 text-white/80" />
            <span className="truncate max-w-[120px]">{book.bookType}</span>
          </div>

          <h3 className={`${titleSizeClasses} text-white tracking-tight drop-shadow-sm mb-1.5`}>
            {book.title}
          </h3>

          {size !== 'sm' && (
            <p className="text-[10px] sm:text-xs text-white/75 font-sans font-medium line-clamp-2 leading-snug">
              {book.subtitle.en}
            </p>
          )}
        </div>

        {/* Bottom Footer: Author, Role & Technical Level Foil Stamp */}
        <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-white/70">
          <div className="truncate mr-2 min-w-0">
            <div className="font-bold text-white/90 truncate">{book.author}</div>
            <div className="text-[7.5px] sm:text-[8px] opacity-60 truncate">{book.role}</div>
          </div>
          <span className="uppercase px-1.5 py-0.5 rounded border border-white/20 bg-white/10 text-white/90 font-bold shrink-0">
            {book.level}
          </span>
        </div>
      </div>

      {/* Subtle Book Jacket Sheen / Reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.1] pointer-events-none z-10" />
    </div>
  );
};
