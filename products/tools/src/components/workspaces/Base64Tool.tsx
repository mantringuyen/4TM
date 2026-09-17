import React, { useState } from 'react';
import { Copy, Check, RotateCcw, ArrowRightLeft } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';

export const Base64Tool: React.FC<{ language: Language }> = ({ language }) => {
  const dict = TRANSLATIONS[language].common;
  const [input, setInput] = useState('Hello 4TM Ecosystem! Welcome to developer utilities.');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [format, setFormat] = useState<'base64' | 'url'>('base64');
  const [copied, setCopied] = useState(false);

  let output = '';
  let error = '';

  try {
    if (mode === 'encode') {
      if (format === 'base64') {
        output = btoa(unescape(encodeURIComponent(input)));
      } else {
        output = encodeURIComponent(input);
      }
    } else {
      if (format === 'base64') {
        output = decodeURIComponent(escape(atob(input)));
      } else {
        output = decodeURIComponent(input);
      }
    }
  } catch (err: any) {
    error = 'Invalid string for requested decoding format.';
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    if (output && !error) {
      setInput(output);
      setMode(mode === 'encode' ? 'decode' : 'encode');
    }
  };

  return (
    <div className="space-y-4">
      {/* Options Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
          <button
            type="button"
            onClick={() => setMode('encode')}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              mode === 'encode'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Encode
          </button>
          <button
            type="button"
            onClick={() => setMode('decode')}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              mode === 'decode'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Decode
          </button>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
          <button
            type="button"
            onClick={() => setFormat('base64')}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              format === 'base64'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Base64
          </button>
          <button
            type="button"
            onClick={() => setFormat('url')}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              format === 'url'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            URL Component
          </button>
        </div>

        <button
          type="button"
          onClick={handleSwap}
          className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
          title="Swap input & output"
        >
          <ArrowRightLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Input / Output Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Column */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>{dict.input} ({input.length} {dict.characters})</span>
            <button
              type="button"
              onClick={() => setInput('')}
              className="hover:text-rose-500 cursor-pointer"
            >
              {dict.clear}
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            className="w-full p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white resize-y"
            placeholder="Type or paste plain text or Base64 here..."
          />
        </div>

        {/* Output Column */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>{dict.output} ({output.length} {dict.characters})</span>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!output || !!error}
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer disabled:opacity-50"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? dict.copied : dict.copy}</span>
            </button>
          </div>
          <div className="relative">
            <textarea
              readOnly
              value={error ? error : output}
              rows={8}
              className={`w-full p-3.5 rounded-2xl font-mono text-xs border resize-y focus:outline-none ${
                error
                  ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900 text-rose-600 dark:text-rose-400'
                  : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
