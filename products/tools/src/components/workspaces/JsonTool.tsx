import React, { useState } from 'react';
import { Copy, Check, Minimize2, Maximize2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';

const SAMPLE_JSON = `{
  "product": "Tools — 4TM",
  "domain": "tools.4tm.io.vn",
  "ecosystem": {
    "auth": "SSO Broker (Cloudflare + Supabase)",
    "capabilities": ["JSON Prettifier", "Base64", "SHA-256", "JWT Inspector"],
    "isProductionReady": true,
    "version": 2
  }
}`;

export const JsonTool: React.FC<{ language: Language }> = ({ language }) => {
  const dict = TRANSLATIONS[language].common;
  const [input, setInput] = useState(SAMPLE_JSON);
  const [indent, setIndent] = useState<number>(2);
  const [copied, setCopied] = useState(false);

  let formatted = '';
  let isValid = false;
  let errorMessage = '';

  try {
    const parsed = JSON.parse(input);
    formatted = JSON.stringify(parsed, null, indent);
    isValid = true;
  } catch (err: any) {
    isValid = false;
    errorMessage = err.message;
  }

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
    } catch {}
  };

  const handleFormat = () => {
    if (isValid) {
      setInput(formatted);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(isValid ? formatted : input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          {isValid ? (
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Valid JSON</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-rose-500 text-xs font-mono font-bold">
              <AlertCircle className="w-4 h-4" />
              <span>Invalid JSON</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Indent Selector */}
          <div className="flex items-center gap-1 text-xs font-mono">
            <span className="text-slate-400">Indent:</span>
            {[2, 4].map((spaces) => (
              <button
                key={spaces}
                type="button"
                onClick={() => setIndent(spaces)}
                className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer ${
                  indent === spaces
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500'
                }`}
              >
                {spaces} spaces
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleFormat}
            disabled={!isValid}
            className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Prettify</span>
          </button>

          <button
            type="button"
            onClick={handleMinify}
            disabled={!isValid}
            className="px-3 py-1 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-200 font-bold text-xs inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Minify</span>
          </button>
        </div>
      </div>

      {/* Editor & Viewer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Editor */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>Input JSON ({input.length} chars)</span>
            <button
              type="button"
              onClick={() => setInput(SAMPLE_JSON)}
              className="hover:text-emerald-500 cursor-pointer"
            >
              {dict.sample}
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            className="w-full p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white resize-y"
          />
          {errorMessage && (
            <p className="text-[11px] text-rose-500 font-mono">{errorMessage}</p>
          )}
        </div>

        {/* Output Prettified */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>Formatted Output</span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? dict.copied : dict.copy}</span>
            </button>
          </div>
          <pre className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto min-h-64 max-h-96">
            <code>{isValid ? formatted : '// Fix JSON syntax errors in input'}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
