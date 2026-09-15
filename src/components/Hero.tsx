import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { ArrowRight, Terminal, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const { dict } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-12 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Subtle radial glow adhering to Study design */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative text-center space-y-6 max-w-3xl mx-auto">
        {/* Badge matching Study */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/20 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{dict.hero.badge}</span>
        </div>

        {/* Primary Ecosystem Title */}
        <h1 className="text-4xl sm:text-6xl font-black text-[#0B1E3B] dark:text-slate-100 tracking-tight leading-[1.1]">
          {dict.hero.title}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 dark:from-blue-400 dark:via-sky-300 dark:to-cyan-300">
            {dict.hero.highlight}
          </span>
        </h1>

        {/* Subtitle / Intro */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          {dict.hero.description}
        </p>

        {/* Action Buttons matching Study buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href="#products"
            className="px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm flex items-center gap-2.5 shadow-xl shadow-blue-600/30 transition-all transform active:scale-95 cursor-pointer"
          >
            <span>{dict.hero.exploreBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="https://study.4tm.io.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <span>{dict.hero.launchBtn}</span>
          </a>
        </div>

        {/* 4 Pillars in Study's font-mono style */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs font-mono text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            {dict.hero.statPillars}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-sky-500 dark:text-sky-400" />
            {dict.hero.statExecution}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            {dict.hero.statIdentity}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            {dict.hero.statStandards}
          </span>
        </div>
      </div>
    </section>
  );
};
