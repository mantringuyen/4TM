import React, { useState } from 'react';
import { ToolItem, Language } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { ShieldCheck, BookOpen, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface ToolHeaderProps {
  tool: ToolItem;
  language: Language;
}

export const ToolHeader: React.FC<ToolHeaderProps> = ({ tool, language }) => {
  const dict = TRANSLATIONS[language];
  const [showHelp, setShowHelp] = useState(false);

  const categoryName = dict.categories[tool.category] || tool.category;

  return (
    <header className="pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
      {/* Clean Unboxed Metadata Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3 font-mono">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
            {categoryName}
          </span>
          <span aria-hidden="true">·</span>
          <span>{tool.badge}</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>{dict.hero.privacyPromise}</span>
          </span>
        </div>

        {/* 4TM Study Relations & Optional Help Toggle */}
        <div className="flex items-center gap-3">
          {tool.studyRelation && tool.studyRelation.length > 0 && tool.studyRelation[0] !== 'None' && (
            <a
              href="https://study.4tm.io.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              title="View matching 4TM Study module"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
              <span>{dict.common.studyRelationLabel}:</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {tool.studyRelation.join(', ')}
              </span>
            </a>
          )}

          <button
            type="button"
            onClick={() => setShowHelp(!showHelp)}
            className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-xs"
            aria-expanded={showHelp}
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>{showHelp ? (language === 'vi' ? 'Đóng gợi ý' : 'Hide Guide') : (language === 'vi' ? 'Hướng dẫn' : 'Quick Guide')}</span>
            {showHelp ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
        {tool.name}
      </h1>

      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-4xl leading-relaxed">
        {tool.description[language]}
      </p>

      {/* Expandable Quick Help Banner */}
      {showHelp && (
        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 space-y-2">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 font-mono uppercase tracking-wide">
            <HelpCircle className="w-4 h-4 text-emerald-500" />
            <span>{language === 'vi' ? 'Cách sử dụng hiệu quả:' : 'How to get the most out of this tool:'}</span>
          </div>
          <p className="leading-relaxed">
            {language === 'vi'
              ? 'Tất cả quá trình tính toán, phân tích cú pháp và mã hóa đều diễn ra 100% cục bộ trên trình duyệt của bạn (WebAssembly / JavaScript Client-side). Không có dữ liệu nào được gửi về máy chủ từ xa.'
              : 'All transformations, syntax parsing, and compilations run 100% client-side in your browser sandbox. No input data, queries, or tokens leave your device.'}
          </p>
          <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px] text-slate-500 dark:text-slate-400">
            <span>Keywords:</span>
            {tool.keywords.map((kw) => (
              <span key={kw} className="underline decoration-slate-300 dark:decoration-slate-700">
                #{kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
