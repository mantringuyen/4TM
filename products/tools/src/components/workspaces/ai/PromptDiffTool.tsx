import React, { useState, useMemo } from 'react';
import { Language } from '../../../types';
import {
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  GitCompare,
  Sliders,
  RotateCcw,
} from 'lucide-react';

interface PromptDiffToolProps {
  language: Language;
}

const V1_PROMPT = `You are a helpful assistant. Write python code to calculate summary metrics from sales data. Return as python dictionary.`;
const V2_PROMPT = `You are a Senior Data Engineer.

Task:
Write robust, vectorized Python code using Pandas to calculate revenue, average order value, and profit margins.

Constraints:
1. Do not use iterative for-loops over dataframe rows.
2. Return code strictly enclosed in markdown block.
3. Handle missing/null values defensively with .fillna(0).`;

export const PromptDiffTool: React.FC<PromptDiffToolProps> = ({ language }) => {
  const [promptA, setPromptA] = useState(V1_PROMPT);
  const [promptB, setPromptB] = useState(V2_PROMPT);
  const [copiedA, setCopiedA] = useState(false);
  const [copiedB, setCopiedB] = useState(false);

  const diffAnalysis = useMemo(() => {
    const wordsA = promptA.trim().split(/\s+/).filter(Boolean);
    const wordsB = promptB.trim().split(/\s+/).filter(Boolean);

    const tokenA = Math.ceil(promptA.length / 3.8);
    const tokenB = Math.ceil(promptB.length / 3.8);

    const deltaTokens = tokenB - tokenA;
    const deltaWords = wordsB.length - wordsA.length;

    // Simple line-by-line diff
    const linesA = promptA.split('\n');
    const linesB = promptB.split('\n');

    const maxLines = Math.max(linesA.length, linesB.length);
    const lineDiffs: { type: 'same' | 'added' | 'removed' | 'modified'; textA: string; textB: string }[] = [];

    for (let i = 0; i < maxLines; i++) {
      const a = linesA[i] !== undefined ? linesA[i] : '';
      const b = linesB[i] !== undefined ? linesB[i] : '';

      if (a === b) {
        lineDiffs.push({ type: 'same', textA: a, textB: b });
      } else if (!a && b) {
        lineDiffs.push({ type: 'added', textA: '', textB: b });
      } else if (a && !b) {
        lineDiffs.push({ type: 'removed', textA: a, textB: '' });
      } else {
        lineDiffs.push({ type: 'modified', textA: a, textB: b });
      }
    }

    return {
      wordsA: wordsA.length,
      wordsB: wordsB.length,
      tokenA,
      tokenB,
      deltaTokens,
      deltaWords,
      lineDiffs,
    };
  }, [promptA, promptB]);

  const handleCopyA = () => {
    navigator.clipboard.writeText(promptA);
    setCopiedA(true);
    setTimeout(() => setCopiedA(false), 2000);
  };

  const handleCopyB = () => {
    navigator.clipboard.writeText(promptB);
    setCopiedB(true);
    setTimeout(() => setCopiedB(false), 2000);
  };

  const handleReset = () => {
    setPromptA(V1_PROMPT);
    setPromptB(V2_PROMPT);
  };

  return (
    <div className="space-y-6">
      {/* Metric Delta Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-[11px] font-mono font-bold uppercase text-slate-500">
            {language === 'vi' ? 'Phiên bản A (Gốc)' : 'Version A (Baseline)'}
          </span>
          <p className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200">
            {diffAnalysis.wordsA} words / ~{diffAnalysis.tokenA} tokens
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-[11px] font-mono font-bold uppercase text-purple-600 dark:text-purple-400">
            {language === 'vi' ? 'Phiên bản B (Tối ưu)' : 'Version B (Candidate)'}
          </span>
          <p className="text-sm font-bold font-mono text-purple-600 dark:text-purple-400">
            {diffAnalysis.wordsB} words / ~{diffAnalysis.tokenB} tokens
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-[11px] font-mono font-bold uppercase text-slate-500">
            {language === 'vi' ? 'Độ chênh lệch Token (Δ)' : 'Token Delta (Δ)'}
          </span>
          <p
            className={`text-sm font-bold font-mono ${
              diffAnalysis.deltaTokens >= 0
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-rose-500'
            }`}
          >
            {diffAnalysis.deltaTokens >= 0 ? `+${diffAnalysis.deltaTokens}` : diffAnalysis.deltaTokens}{' '}
            tokens ({diffAnalysis.deltaWords >= 0 ? `+${diffAnalysis.deltaWords}` : diffAnalysis.deltaWords} words)
          </p>
        </div>
      </div>

      {/* Side-by-Side Editors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Version A */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold font-mono uppercase text-slate-600 dark:text-slate-400">
              Prompt A (Baseline)
            </label>
            <button
              type="button"
              onClick={handleCopyA}
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-500 cursor-pointer"
            >
              {copiedA ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedA ? (language === 'vi' ? 'Đã sao chép' : 'Copied') : (language === 'vi' ? 'Sao chép A' : 'Copy A')}</span>
            </button>
          </div>
          <textarea
            value={promptA}
            onChange={(e) => setPromptA(e.target.value)}
            rows={8}
            className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Version B */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold font-mono uppercase text-purple-600 dark:text-purple-400">
              Prompt B (Candidate)
            </label>
            <button
              type="button"
              onClick={handleCopyB}
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-purple-500 cursor-pointer"
            >
              {copiedB ? <Check className="w-3.5 h-3.5 text-purple-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedB ? (language === 'vi' ? 'Đã sao chép' : 'Copied') : (language === 'vi' ? 'Sao chép B' : 'Copy B')}</span>
            </button>
          </div>
          <textarea
            value={promptB}
            onChange={(e) => setPromptB(e.target.value)}
            rows={8}
            className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800/80 text-xs font-mono text-slate-900 dark:text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Visual Line-by-Line Diff Inspector */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-purple-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-700 dark:text-slate-300">
              {language === 'vi' ? 'Trực quan hóa khác biệt từng dòng (Line-by-Line Diff)' : 'Visual Line Diff'}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="text-[11px] font-mono text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
          >
            {language === 'vi' ? 'Đặt lại mẫu' : 'Reset Sample'}
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden font-mono text-xs">
          {diffAnalysis.lineDiffs.map((line, idx) => (
            <div
              key={idx}
              className={`flex items-start px-3 py-1.5 border-b border-slate-100 dark:border-slate-800/60 last:border-b-0 ${
                line.type === 'added'
                  ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                  : line.type === 'removed'
                  ? 'bg-rose-500/10 text-rose-800 dark:text-rose-300'
                  : line.type === 'modified'
                  ? 'bg-amber-500/10 text-amber-800 dark:text-amber-300'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <span className="w-8 shrink-0 text-slate-400 select-none text-[11px]">
                {idx + 1}
              </span>
              <span className="w-6 shrink-0 font-bold select-none">
                {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : line.type === 'modified' ? '~' : ' '}
              </span>
              <div className="flex-1 overflow-x-auto whitespace-pre-wrap break-all">
                {line.type === 'removed'
                  ? line.textA
                  : line.type === 'added'
                  ? line.textB
                  : line.type === 'modified'
                  ? `[A]: ${line.textA}\n[B]: ${line.textB}`
                  : line.textB}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
