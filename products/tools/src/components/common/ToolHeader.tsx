import React from 'react';
import { ToolItem, Language } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { ShieldCheck, BookOpen } from 'lucide-react';

interface ToolHeaderProps {
  tool: ToolItem;
  language: Language;
}

export const ToolHeader: React.FC<ToolHeaderProps> = ({ tool, language }) => {
  const dict = TRANSLATIONS[language];

  return (
    <header className="pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            {dict.categories[tool.category] || tool.category}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {tool.badge}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
            <ShieldCheck className="w-3 h-3" />
            <span>{dict.hero.privacyPromise}</span>
          </span>
        </div>

        {/* 4TM Study Relations */}
        {tool.studyRelation && tool.studyRelation.length > 0 && tool.studyRelation[0] !== 'None' && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
            <span className="font-medium">{dict.common.studyRelationLabel}</span>
            <div className="flex items-center gap-1">
              {tool.studyRelation.map((course) => (
                <span
                  key={course}
                  className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-mono text-[11px] font-semibold border border-emerald-200 dark:border-emerald-800/50"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
        {tool.name}
      </h1>

      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-4xl leading-relaxed">
        {tool.description[language]}
      </p>

      {/* Keywords */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {tool.keywords.map((kw) => (
          <span
            key={kw}
            className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/60 text-[11px] font-mono text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800"
          >
            #{kw}
          </span>
        ))}
      </div>
    </header>
  );
};
