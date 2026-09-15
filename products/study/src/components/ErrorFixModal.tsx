import React from 'react';
import { 
  Wand2, 
  Check, 
  X, 
  ArrowRight, 
  Sparkles, 
  AlertCircle,
  FileCode,
  CheckCircle2
} from 'lucide-react';
import { SuggestedFix } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface ErrorFixModalProps {
  suggestedFix: SuggestedFix;
  language: string;
  onApplyFix: (fixedCode: string) => void;
  onClose: () => void;
}

export const ErrorFixModal: React.FC<ErrorFixModalProps> = ({
  suggestedFix,
  language,
  onApplyFix,
  onClose,
}) => {
  const { dict } = useLanguage();

  return (
    <div 
      id="fix-preview-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/70 dark:bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        id="fix-preview-modal"
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 transition-colors"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase font-bold text-blue-600 dark:text-blue-400">
                  {dict.editor.fixModalBadge || 'Suggested Correction'}
                </span>
                {suggestedFix.lineNumber && (
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px] font-bold border border-slate-200 dark:border-slate-700">
                    Line {suggestedFix.lineNumber}
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                {suggestedFix.title}
              </h3>
            </div>
          </div>

          <button
            id="close-fix-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Explanation Card */}
        <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-500/20 text-slate-800 dark:text-slate-200 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed text-blue-950 dark:text-blue-200">
            {suggestedFix.explanation}
          </p>
        </div>

        {/* Diff Inspection View */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-semibold">
              <FileCode className="w-3.5 h-3.5" />
              {dict.editor.diffReviewTitle || 'Preview Changes (Diff)'}
            </span>
            <span className="text-[11px] text-slate-400">
              {dict.editor.diffNotice || 'Review before applying to your code'}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 font-mono text-xs overflow-hidden max-h-60 overflow-y-auto">
            {suggestedFix.diffLines.map((line, idx) => {
              if (line.type === 'added') {
                return (
                  <div key={idx} className="flex bg-emerald-500/15 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 border-l-4 border-emerald-500 px-3 py-1">
                    <span className="w-8 text-right pr-3 select-none text-emerald-600 dark:text-emerald-500 font-bold shrink-0">{line.lineNum}</span>
                    <span className="select-none font-bold mr-2 text-emerald-600 dark:text-emerald-400">+</span>
                    <span className="whitespace-pre overflow-x-auto">{line.newContent}</span>
                  </div>
                );
              }
              if (line.type === 'removed') {
                return (
                  <div key={idx} className="flex bg-rose-500/15 dark:bg-rose-950/40 text-rose-900 dark:text-rose-300 border-l-4 border-rose-500 px-3 py-1">
                    <span className="w-8 text-right pr-3 select-none text-rose-600 dark:text-rose-500 font-bold shrink-0">{line.lineNum}</span>
                    <span className="select-none font-bold mr-2 text-rose-600 dark:text-rose-400">-</span>
                    <span className="whitespace-pre line-through opacity-80 overflow-x-auto">{line.oldContent}</span>
                  </div>
                );
              }
              if (line.type === 'modified') {
                return (
                  <div key={idx} className="space-y-0.5 border-l-4 border-amber-500">
                    <div className="flex bg-rose-500/10 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 px-3 py-0.5">
                      <span className="w-8 text-right pr-3 select-none text-rose-500 font-bold shrink-0">{line.lineNum}</span>
                      <span className="select-none font-bold mr-2 text-rose-500">-</span>
                      <span className="whitespace-pre line-through opacity-80 overflow-x-auto">{line.oldContent}</span>
                    </div>
                    <div className="flex bg-emerald-500/15 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 px-3 py-0.5">
                      <span className="w-8 text-right pr-3 select-none text-emerald-600 dark:text-emerald-500 font-bold shrink-0">{line.lineNum}</span>
                      <span className="select-none font-bold mr-2 text-emerald-600 dark:text-emerald-400">+</span>
                      <span className="whitespace-pre font-semibold overflow-x-auto">{line.newContent}</span>
                    </div>
                  </div>
                );
              }
              return (
                <div key={idx} className="flex text-slate-600 dark:text-slate-400 px-3 py-1 border-l-4 border-transparent hover:bg-slate-100 dark:hover:bg-slate-900/50">
                  <span className="w-8 text-right pr-3 select-none text-slate-400 dark:text-slate-600 shrink-0">{line.lineNum}</span>
                  <span className="select-none mr-2 opacity-30"> </span>
                  <span className="whitespace-pre overflow-x-auto">{line.content.replace(/^  /, '')}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Safety Note & Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800">
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {dict.editor.fixSafetyNote || 'Your code will not be modified unless you click Apply Fix.'}
          </p>

          <div className="flex items-center gap-2.5 justify-end">
            <button
              id="cancel-fix-btn"
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              {dict.editor.cancelFix || 'Cancel'}
            </button>

            <button
              id="apply-fix-btn"
              type="button"
              onClick={() => onApplyFix(suggestedFix.fixedCode)}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{dict.editor.applyFix || 'Apply Fix'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
