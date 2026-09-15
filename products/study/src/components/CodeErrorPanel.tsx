import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Wand2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  CornerDownRight, 
  Bug,
  Info,
  HelpCircle,
  Code2
} from 'lucide-react';
import { CodeErrorDetail, CodeExecutionResult } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface CodeErrorPanelProps {
  result: CodeExecutionResult;
  language: string;
  onOpenFix: () => void;
  onJumpToLine?: (lineNumber: number) => void;
}

export const CodeErrorPanel: React.FC<CodeErrorPanelProps> = ({
  result,
  language,
  onOpenFix,
  onJumpToLine,
}) => {
  const { dict } = useLanguage();
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const errorDetail: CodeErrorDetail | undefined = result.errorDetail;
  const errorType = errorDetail?.errorType || 'RuntimeError';
  const errorMessage = errorDetail?.message || result.error || 'Execution encountered an error.';
  const simpleExplanation = errorDetail?.simpleExplanation || result.simpleExplanation;
  const whatToCheck = errorDetail?.whatToCheck || result.whatToCheck;
  const lineNumber = errorDetail?.lineNumber;
  const hasSuggestedFix = Boolean(errorDetail?.suggestedFix);
  const rawTrace = result.detailedError || errorDetail?.rawTraceback || result.error;

  // Determine badge styling based on error type
  const getBadgeStyle = (type: string) => {
    const lower = type.toLowerCase();
    if (lower.includes('syntax') || lower.includes('indentation')) {
      return 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30';
    }
    if (lower.includes('name') || lower.includes('reference') || lower.includes('table') || lower.includes('column')) {
      return 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30';
    }
    if (lower.includes('type') || lower.includes('value') || lower.includes('zero')) {
      return 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30';
    }
    return 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30';
  };

  return (
    <div 
      id="code-runner-error-panel"
      className="space-y-3.5 rounded-2xl bg-white dark:bg-slate-900/95 border border-rose-200 dark:border-rose-500/30 p-4 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200 transition-colors"
    >
      {/* Top Banner: Error Type + Line Number + Fix Button */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-rose-100 dark:border-rose-900/40 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Error Type Badge */}
          <span 
            id="error-type-badge"
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase border flex items-center gap-1.5 shadow-sm ${getBadgeStyle(errorType)}`}
          >
            <Bug className="w-3.5 h-3.5" />
            <span>{errorType}</span>
          </span>

          {/* Line Number Badge (if available) */}
          {lineNumber && (
            <button
              id="error-line-jump-btn"
              type="button"
              onClick={() => onJumpToLine && onJumpToLine(lineNumber)}
              title="Jump to line in editor"
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-xs font-semibold border border-slate-200 dark:border-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <CornerDownRight className="w-3 h-3 text-rose-500" />
              <span>{(dict.editor.line || 'Line')} {lineNumber}</span>
            </button>
          )}
        </div>

        {/* Action Fix Button */}
        {hasSuggestedFix ? (
          <button
            id="error-fix-btn"
            type="button"
            onClick={onOpenFix}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/25 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{dict.editor.fixButton || 'Fix'}</span>
          </button>
        ) : (
          <button
            id="error-fix-btn-fallback"
            type="button"
            onClick={onOpenFix}
            className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>{dict.editor.fixButton || 'Fix'}</span>
          </button>
        )}
      </div>

      {/* Beginner-Friendly Explanation & What It Means */}
      <div className="space-y-2">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5 min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-semibold text-rose-950 dark:text-rose-200 break-words font-mono">
              {errorMessage}
            </p>
            {simpleExplanation && simpleExplanation !== errorMessage && (
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {simpleExplanation}
              </p>
            )}
          </div>
        </div>

        {/* What to check guidance */}
        {whatToCheck && (
          <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{dict.editor.whatToCheck || 'What to check:'}</span>
            </div>
            <p className="leading-relaxed pl-5">{whatToCheck}</p>
          </div>
        )}
      </div>

      {/* Suggested Fix Hint summary if available */}
      {errorDetail?.suggestedFix && (
        <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-500/20 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="text-blue-950 dark:text-blue-200 font-medium truncate">
              {errorDetail.suggestedFix.title}
            </span>
          </div>
          <button
            onClick={onOpenFix}
            className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0 cursor-pointer"
          >
            {dict.editor.previewFixAction || 'Preview Fix →'}
          </button>
        </div>
      )}

      {/* Standard Output if captured before error */}
      {result.output && (
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs">
          <span className="text-[10px] uppercase font-mono text-slate-500 block mb-0.5">
            {dict.editor.stdoutLabel || 'Stdout before failure:'}
          </span>
          <pre className="font-mono text-xs whitespace-pre-wrap">{result.output}</pre>
        </div>
      )}

      {/* Technical Traceback Collapsible (Details Toggle) */}
      <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          id="toggle-technical-trace-btn"
          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
        >
          {showTechnicalDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          <span>{showTechnicalDetails ? (dict.editor.hideDetails || 'Hide Details') : (dict.editor.showDetails || 'Details')}</span>
        </button>

        {showTechnicalDetails && (
          <div 
            id="technical-error-details-box"
            className="mt-2.5 p-3.5 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800 space-y-2.5 animate-in fade-in"
          >
            {/* Structured Technical Metadata */}
            <div className="space-y-1 text-[12px] border-b border-slate-800/80 pb-2.5">
              <div>
                <span className="text-slate-400 font-semibold">Error Type:</span>{' '}
                <span className="text-rose-400 font-bold">{errorType}</span>
              </div>
              {errorMessage && (
                <div>
                  <span className="text-slate-400 font-semibold">Message:</span>{' '}
                  <span className="text-amber-300 font-medium">{errorMessage}</span>
                </div>
              )}
              {lineNumber !== undefined && (
                <div>
                  <span className="text-slate-400 font-semibold">Line:</span>{' '}
                  <span className="text-cyan-300 font-bold">{lineNumber}</span>
                </div>
              )}
            </div>

            {/* Technical Traceback */}
            {rawTrace && (
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
                  Traceback:
                </span>
                <pre className="whitespace-pre-wrap break-words text-rose-300/90 text-[11px] leading-relaxed">
                  {rawTrace}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
