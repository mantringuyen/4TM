import React, { useState, useEffect } from 'react';
import { Copy, Check, Clock, RefreshCw } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';

export const TimestampTool: React.FC<{ language: Language }> = ({ language }) => {
  const dict = TRANSLATIONS[language].common;
  const [timestampSeconds, setTimestampSeconds] = useState<number>(() =>
    Math.floor(Date.now() / 1000)
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const now = () => setTimestampSeconds(Math.floor(Date.now() / 1000));

  const date = new Date(timestampSeconds * 1000);
  const iso = isNaN(date.getTime()) ? 'Invalid Date' : date.toISOString();
  const utc = isNaN(date.getTime()) ? 'Invalid Date' : date.toUTCString();
  const local = isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();

  const copyVal = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Epoch Input Controller */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 flex-1 min-w-[200px]">
          <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
            Epoch (Seconds):
          </span>
          <input
            type="number"
            value={timestampSeconds}
            onChange={(e) => setTimestampSeconds(Number(e.target.value))}
            className="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <button
          type="button"
          onClick={now}
          className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset to Now</span>
        </button>
      </div>

      {/* Date Representations */}
      <div className="space-y-3">
        {/* ISO 8601 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs font-mono">
          <div>
            <span className="text-slate-400">ISO-8601 (Standard)</span>
            <div className="text-slate-900 dark:text-white font-bold text-sm mt-0.5">{iso}</div>
          </div>
          <button
            type="button"
            onClick={() => copyVal('iso', iso)}
            className="text-slate-400 hover:text-rose-500 p-1.5 cursor-pointer"
          >
            {copiedKey === 'iso' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* UTC String */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs font-mono">
          <div>
            <span className="text-slate-400">UTC Formatted</span>
            <div className="text-slate-900 dark:text-white font-bold text-sm mt-0.5">{utc}</div>
          </div>
          <button
            type="button"
            onClick={() => copyVal('utc', utc)}
            className="text-slate-400 hover:text-rose-500 p-1.5 cursor-pointer"
          >
            {copiedKey === 'utc' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Local String */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs font-mono">
          <div>
            <span className="text-slate-400">Local Browser Timezone</span>
            <div className="text-slate-900 dark:text-white font-bold text-sm mt-0.5">{local}</div>
          </div>
          <button
            type="button"
            onClick={() => copyVal('local', local)}
            className="text-slate-400 hover:text-rose-500 p-1.5 cursor-pointer"
          >
            {copiedKey === 'local' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
