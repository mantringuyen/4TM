import React, { useState, useMemo } from 'react';
import { Language } from '../../../types';
import {
  Code,
  Copy,
  Check,
  Sparkles,
  AlertTriangle,
  Search,
} from 'lucide-react';

interface RegexPlaygroundToolProps {
  language: Language;
}

const REGEX_PRESETS = [
  { name: 'Email Address', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', flags: 'g' },
  { name: 'ISO Date (YYYY-MM-DD)', pattern: '\\b\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])\\b', flags: 'g' },
  { name: 'URL (HTTP/HTTPS)', pattern: 'https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)', flags: 'gi' },
  { name: 'UUID v4', pattern: '[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}', flags: 'gi' },
];

const SAMPLE_TEXT = `Contact our engineering team at support@4tm.io.vn or dev.lead@company.com.
System deployed on 2026-03-23 for release v4.2.
Reference ID: 550e8400-e29b-41d4-a716-446655440000
Website: https://4tm.io.vn/tools`;

export const RegexPlaygroundTool: React.FC<RegexPlaygroundToolProps> = ({ language }) => {
  const [pattern, setPattern] = useState(REGEX_PRESETS[0].pattern);
  const [flags, setFlags] = useState(REGEX_PRESETS[0].flags);
  const [testText, setTestText] = useState(SAMPLE_TEXT);

  const { matches, error } = useMemo(() => {
    try {
      const regex = new RegExp(pattern, flags);
      const matchArr: { match: string; index: number }[] = [];
      let m;

      if (flags.includes('g')) {
        while ((m = regex.exec(testText)) !== null) {
          matchArr.push({ match: m[0], index: m.index });
          if (!m[0]) break; // avoid infinite loop
        }
      } else {
        m = regex.exec(testText);
        if (m) matchArr.push({ match: m[0], index: m.index });
      }

      return { matches: matchArr, error: null };
    } catch (e: any) {
      return { matches: [], error: e.message };
    }
  }, [pattern, flags, testText]);

  return (
    <div className="space-y-6">
      {/* Pattern Bar */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <Search className="w-4 h-4 text-emerald-500" />
            <span>Regular Expression Pattern</span>
          </label>
          <div className="flex flex-wrap gap-1 text-[11px]">
            {REGEX_PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => {
                  setPattern(p.pattern);
                  setFlags(p.flags);
                }}
                className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-emerald-500"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-slate-400 text-lg">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="flex-1 font-mono text-sm p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 font-bold"
            placeholder="[a-zA-Z0-9]+"
          />
          <span className="font-mono text-slate-400 text-lg">/</span>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            className="w-16 font-mono text-sm p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-center"
            placeholder="gim"
          />
        </div>
      </div>

      {/* Test String and Match Visualizer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
          <label className="text-xs font-mono font-bold uppercase text-slate-400">
            Test String
          </label>
          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            rows={8}
            className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-900 dark:text-slate-100"
          />
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400">
              Matches Found ({matches.length})
            </label>
          </div>

          {error ? (
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500 text-xs font-mono">
              Syntax Error: {error}
            </div>
          ) : (
            <div className="space-y-1.5 max-h-[190px] overflow-y-auto">
              {matches.map((m, i) => (
                <div
                  key={i}
                  className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-800 dark:text-emerald-300 flex items-center justify-between"
                >
                  <span className="font-bold">{m.match}</span>
                  <span className="text-[10px] text-slate-400">index: {m.index}</span>
                </div>
              ))}
              {matches.length === 0 && (
                <p className="text-xs text-slate-400 italic">No matches in current test string.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
