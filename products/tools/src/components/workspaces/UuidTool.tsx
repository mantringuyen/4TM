import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Fingerprint } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';

export const UuidTool: React.FC<{ language: Language }> = ({ language }) => {
  const dict = TRANSLATIONS[language].common;
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [uuids, setUuids] = useState<string[]>(() => generateList(5, false, true));
  const [copied, setCopied] = useState(false);

  function generateList(num: number, isUpper: boolean, hasHyphens: boolean): string[] {
    const list: string[] = [];
    for (let i = 0; i < num; i++) {
      let id = crypto.randomUUID();
      if (!hasHyphens) id = id.replace(/-/g, '');
      if (isUpper) id = id.toUpperCase();
      list.push(id);
    }
    return list;
  }

  const handleGenerate = () => {
    setUuids(generateList(count, uppercase, hyphens));
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Options Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {/* Count Slider */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-slate-500 dark:text-slate-400">Count:</span>
          <input
            type="range"
            min={1}
            max={20}
            value={count}
            onChange={(e) => {
              const val = Number(e.target.value);
              setCount(val);
              setUuids(generateList(val, uppercase, hyphens));
            }}
            className="w-24 accent-cyan-500 cursor-pointer"
          />
          <span className="font-bold text-slate-800 dark:text-slate-200">{count}</span>
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => {
                const val = e.target.checked;
                setUppercase(val);
                setUuids(generateList(count, val, hyphens));
              }}
              className="accent-cyan-500"
            />
            <span>Uppercase</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={hyphens}
              onChange={(e) => {
                const val = e.target.checked;
                setHyphens(val);
                setUuids(generateList(count, uppercase, val));
              }}
              className="accent-cyan-500"
            />
            <span>Hyphens</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleGenerate}
            className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Generate New</span>
          </button>

          <button
            type="button"
            onClick={handleCopyAll}
            className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-200 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? dict.copied : 'Copy All'}</span>
          </button>
        </div>
      </div>

      {/* UUID List Display */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
        {uuids.map((id, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-200 select-all border border-slate-100 dark:border-slate-850"
          >
            <span>{id}</span>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(id)}
              className="text-slate-400 hover:text-cyan-500 p-1 cursor-pointer"
              title="Copy UUID"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
