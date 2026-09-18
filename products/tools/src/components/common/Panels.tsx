import React from 'react';
import { AlertTriangle, CheckCircle2, Copy, FileText, Trash2, Sparkles } from 'lucide-react';
import { CopyButton, DownloadButton, ResetButton } from './ActionButtons';

interface InputPanelProps {
  title?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  onClear?: () => void;
  onSample?: () => void;
  sampleLabel?: string;
  clearLabel?: string;
  extraActions?: React.ReactNode;
  footerInfo?: React.ReactNode;
  heightClass?: string;
  className?: string;
  error?: string | null;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  title = 'Input',
  value,
  onChange,
  placeholder = 'Paste or type content here...',
  readOnly = false,
  onClear,
  onSample,
  sampleLabel = 'Sample',
  clearLabel = 'Clear',
  extraActions,
  footerInfo,
  heightClass = 'min-h-[260px] h-[320px]',
  className = '',
  error,
}) => {
  const chars = value.length;
  const lines = value ? value.split('\n').length : 0;
  const bytes = new Blob([value]).size;

  return (
    <div className={`flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-50/70 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 gap-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {onSample && (
            <button
              type="button"
              onClick={onSample}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>{sampleLabel}</span>
            </button>
          )}

          {onClear && (
            <button
              type="button"
              onClick={onClear}
              disabled={!value}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-3 h-3" />
              <span>{clearLabel}</span>
            </button>
          )}

          {extraActions}
        </div>
      </div>

      {/* Editor Textarea */}
      <div className="relative flex-1">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          spellCheck={false}
          className={`w-full ${heightClass} p-4 font-mono text-xs sm:text-sm bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none resize-none leading-relaxed`}
        />
      </div>

      {/* Footer Info */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
        <div className="flex items-center gap-3">
          <span>{chars.toLocaleString()} chars</span>
          <span>&bull;</span>
          <span>{lines.toLocaleString()} lines</span>
          <span>&bull;</span>
          <span>{bytes.toLocaleString()} bytes</span>
        </div>
        {footerInfo && <div>{footerInfo}</div>}
      </div>

      {error && <ErrorMessage error={error} />}
    </div>
  );
};

interface OutputPanelProps {
  title?: string;
  value: string;
  downloadFilename?: string;
  downloadMime?: string;
  copyLabel?: string;
  downloadLabel?: string;
  extraActions?: React.ReactNode;
  footerInfo?: React.ReactNode;
  heightClass?: string;
  className?: string;
  placeholder?: string;
  formatBadge?: string;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({
  title = 'Output',
  value,
  downloadFilename = 'output.txt',
  downloadMime = 'text/plain;charset=utf-8',
  copyLabel = 'Copy',
  downloadLabel = 'Download',
  extraActions,
  footerInfo,
  heightClass = 'min-h-[260px] h-[320px]',
  className = '',
  placeholder = 'Converted result will appear here...',
  formatBadge,
}) => {
  const chars = value.length;
  const lines = value ? value.split('\n').length : 0;
  const bytes = new Blob([value]).size;

  return (
    <div className={`flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-50/70 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 gap-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
            {title}
          </span>
          {formatBadge && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              {formatBadge}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {extraActions}
          <CopyButton text={value} label={copyLabel} disabled={!value} />
          <DownloadButton
            content={value}
            filename={downloadFilename}
            mimeType={downloadMime}
            label={downloadLabel}
            disabled={!value}
          />
        </div>
      </div>

      {/* Editor View */}
      <div className="relative flex-1">
        <textarea
          value={value}
          readOnly
          placeholder={placeholder}
          spellCheck={false}
          className={`w-full ${heightClass} p-4 font-mono text-xs sm:text-sm bg-slate-50/40 dark:bg-slate-950/40 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none resize-none leading-relaxed`}
        />
      </div>

      {/* Footer Info */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
        <div className="flex items-center gap-3">
          <span>{chars.toLocaleString()} chars</span>
          <span>&bull;</span>
          <span>{lines.toLocaleString()} lines</span>
          <span>&bull;</span>
          <span>{bytes.toLocaleString()} bytes</span>
        </div>
        {footerInfo && <div>{footerInfo}</div>}
      </div>
    </div>
  );
};

interface ErrorMessageProps {
  error: string;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, className = '' }) => {
  return (
    <div
      className={`flex items-start gap-2.5 p-3.5 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60 rounded-xl text-xs font-mono leading-relaxed ${className}`}
    >
      <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
      <div className="flex-1 break-words">{error}</div>
    </div>
  );
};

interface FormatSelectorProps {
  label?: string;
  value: string;
  options: { value: string; label: string; badge?: string }[];
  onChange: (val: string) => void;
  className?: string;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({
  label,
  value,
  options,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {label && (
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
          {label}:
        </span>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-sm"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label} {opt.badge ? `(${opt.badge})` : ''}
          </option>
        ))}
      </select>
    </div>
  );
};

interface StatBadgeProps {
  label: string;
  value: string | number;
  highlight?: boolean;
}

export const StatBadge: React.FC<StatBadgeProps> = ({ label, value, highlight = false }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center px-4 py-2.5 rounded-xl border text-center transition-all ${
        highlight
          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-200'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm'
      }`}
    >
      <span className="text-xs text-slate-400 font-medium">{label}</span>
      <span className="text-base sm:text-lg font-black font-mono tracking-tight mt-0.5">
        {value}
      </span>
    </div>
  );
};
