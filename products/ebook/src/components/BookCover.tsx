import React from 'react';
import { Book, BookType } from '../types';
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
  book: Book;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

// Topic visual themes configuration
interface TopicCoverConfig {
  gradient: string;
  accentBorder: string;
  tagBg: string;
  textColor: string;
  badgeBg: string;
  badgeText: string;
  pattern: string;
  icon: React.ElementType;
  bgSymbol: string;
}

const TOPIC_COVER_CONFIGS: Record<string, TopicCoverConfig> = {
  python: {
    gradient: 'from-slate-900 via-blue-950 to-indigo-950',
    accentBorder: 'border-blue-500/40',
    tagBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    textColor: 'text-blue-100',
    badgeBg: 'bg-blue-500/20 text-blue-200',
    pattern: 'bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:12px_12px] opacity-20',
    icon: Terminal,
    bgSymbol: 'def main():',
  },
  sql: {
    gradient: 'from-slate-900 via-cyan-950 to-sky-950',
    accentBorder: 'border-cyan-500/40',
    tagBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    textColor: 'text-cyan-100',
    badgeBg: 'bg-cyan-500/20 text-cyan-200',
    pattern: 'bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:10px_10px] opacity-20',
    icon: Database,
    bgSymbol: 'SELECT * FROM',
  },
  html: {
    gradient: 'from-slate-900 via-purple-950 to-indigo-950',
    accentBorder: 'border-purple-500/40',
    tagBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    textColor: 'text-purple-100',
    badgeBg: 'bg-purple-500/20 text-purple-200',
    pattern: 'bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:12px_12px] opacity-20',
    icon: FileCode,
    bgSymbol: '<html>',
  },
  css: {
    gradient: 'from-slate-900 via-violet-950 to-fuchsia-950',
    accentBorder: 'border-fuchsia-500/40',
    tagBg: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
    textColor: 'text-fuchsia-100',
    badgeBg: 'bg-fuchsia-500/20 text-fuchsia-200',
    pattern: 'bg-[radial-gradient(#d946ef_1px,transparent_1px)] [background-size:12px_12px] opacity-20',
    icon: Layout,
    bgSymbol: ':root { }',
  },
  javascript: {
    gradient: 'from-slate-900 via-amber-950 to-stone-900',
    accentBorder: 'border-amber-500/40',
    tagBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    textColor: 'text-amber-100',
    badgeBg: 'bg-amber-500/20 text-amber-200',
    pattern: 'bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:10px_10px] opacity-20',
    icon: Code2,
    bgSymbol: 'async () =>',
  },
  excel: {
    gradient: 'from-slate-900 via-emerald-950 to-teal-950',
    accentBorder: 'border-emerald-500/40',
    tagBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    textColor: 'text-emerald-100',
    badgeBg: 'bg-emerald-500/20 text-emerald-200',
    pattern: 'bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:12px_12px] opacity-20',
    icon: Table,
    bgSymbol: '=SUM(A1:Z99)',
  },
  powerbi: {
    gradient: 'from-slate-900 via-orange-950 to-amber-950',
    accentBorder: 'border-orange-500/40',
    tagBg: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    textColor: 'text-orange-100',
    badgeBg: 'bg-orange-500/20 text-orange-200',
    pattern: 'bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:12px_12px] opacity-20',
    icon: BarChart3,
    bgSymbol: 'DAX CALCULATE',
  },
  ai: {
    gradient: 'from-slate-950 via-violet-950 to-indigo-950',
    accentBorder: 'border-violet-500/40',
    tagBg: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    textColor: 'text-violet-100',
    badgeBg: 'bg-violet-500/20 text-violet-200',
    pattern: 'bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:10px_10px] opacity-20',
    icon: Sparkles,
    bgSymbol: 'NEURAL NET v3.6',
  },
};

const DEFAULT_COVER_CONFIG: TopicCoverConfig = {
  gradient: 'from-slate-900 via-slate-800 to-indigo-950',
  accentBorder: 'border-slate-500/40',
  tagBg: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  textColor: 'text-slate-100',
  badgeBg: 'bg-slate-500/20 text-slate-200',
  pattern: 'bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:12px_12px] opacity-20',
  icon: BookOpen,
  bgSymbol: '4TM EBOOK',
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

  // Sizing definitions
  const sizeClasses = {
    sm: 'w-24 sm:w-28 h-36 sm:h-40 text-[10px]',
    md: 'w-36 sm:w-44 h-52 sm:h-60 text-xs',
    lg: 'w-52 sm:w-64 h-76 sm:h-92 text-sm',
  }[size];

  const paddingClasses = {
    sm: 'p-2 sm:p-2.5',
    md: 'p-3.5 sm:p-4',
    lg: 'p-5 sm:p-6',
  }[size];

  const titleSizeClasses = {
    sm: 'text-[11px] sm:text-xs leading-tight font-black line-clamp-2',
    md: 'text-sm sm:text-base leading-snug font-black line-clamp-3',
    lg: 'text-lg sm:text-2xl leading-tight font-black line-clamp-3',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`relative shrink-0 rounded-r-xl rounded-l-xs overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border ${config.accentBorder} bg-gradient-to-br ${config.gradient} ${sizeClasses} ${className} group/cover select-none cursor-pointer`}
      style={{
        boxShadow:
          size === 'lg'
            ? '-6px 10px 24px -4px rgba(0,0,0,0.5), inset 2px 0 3px rgba(255,255,255,0.15)'
            : '-4px 6px 16px -2px rgba(0,0,0,0.4), inset 2px 0 2px rgba(255,255,255,0.1)',
      }}
    >
      {/* 3D Spine Ridge Overlay on left edge */}
      <div className="absolute left-0 top-0 bottom-0 w-2.5 sm:w-3.5 bg-gradient-to-r from-black/40 via-black/20 to-transparent z-20 border-r border-white/10" />
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/20 z-20" />

      {/* Decorative Grid Pattern */}
      <div className={`absolute inset-0 z-0 ${config.pattern}`} />

      {/* Subtle Background Watermark Code Symbol */}
      <div className="absolute right-[-10%] bottom-[15%] z-0 text-white/[0.04] font-mono font-black text-4xl sm:text-6xl whitespace-nowrap pointer-events-none transform -rotate-12">
        {config.bgSymbol}
      </div>

      {/* Cover Content Container */}
      <div className={`relative z-10 flex flex-col justify-between h-full pl-3.5 sm:pl-5 pr-2.5 sm:pr-3 py-2.5 sm:py-3.5 ${paddingClasses}`}>
        {/* Top Header: Imprint & Topic Badge */}
        <div>
          <div className="flex items-center justify-between gap-1 text-[8px] sm:text-[9px] font-mono font-bold text-white/50 tracking-widest uppercase mb-1.5">
            <span>4TM PRESS</span>
            <span className="flex items-center gap-1 text-white/70">
              <TopicIcon className="w-2.5 h-2.5" />
            </span>
          </div>

          <div className="h-0.5 w-full bg-gradient-to-r from-white/30 via-white/10 to-transparent mb-2 sm:mb-3" />
        </div>

        {/* Centerpiece: Book Title & Subtitle */}
        <div className="my-auto py-1">
          <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-mono font-bold uppercase mb-1.5 border border-white/10 bg-black/30 backdrop-blur-xs text-white/90">
            <TypeIcon className="w-2.5 h-2.5" />
            <span className="truncate max-w-[100px]">{book.bookType}</span>
          </div>

          <h3 className={`${titleSizeClasses} text-white tracking-tight drop-shadow-xs mb-1`}>
            {book.title}
          </h3>

          {size !== 'sm' && (
            <p className="text-[10px] sm:text-xs text-white/70 font-medium line-clamp-2 leading-tight">
              {book.subtitle.en}
            </p>
          )}
        </div>

        {/* Bottom Footer: Author & Level Stamp */}
        <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-white/60">
          <span className="truncate font-semibold">{book.author}</span>
          <span className="uppercase px-1 py-0.2 rounded bg-white/10 text-white/80 shrink-0">
            {book.level.slice(0, 3)}
          </span>
        </div>
      </div>

      {/* Glossy Cover Reflection Highlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.12] pointer-events-none z-10" />
    </div>
  );
};
