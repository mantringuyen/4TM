import React, { useState, useMemo } from 'react';
import { Language } from '../../../types';
import {
  Code,
  Copy,
  Check,
  Search,
  Sparkles,
  Layers,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface JsonPathExplorerToolProps {
  language: Language;
}

const SAMPLE_DATA = {
  store: {
    name: '4TM Tech Hub',
    book: [
      { category: 'reference', author: 'Nigel Rees', title: 'Sayings of the Century', price: 8.95 },
      { category: 'fiction', author: 'Evelyn Waugh', title: 'Sword of Honour', price: 12.99 },
      { category: 'fiction', author: 'Herman Melville', title: 'Moby Dick', isbn: '0-553-21311-3', price: 8.99 },
      { category: 'fiction', author: 'J. R. R. Tolkien', title: 'The Lord of the Rings', isbn: '0-395-19395-8', price: 22.99 },
    ],
    bicycle: { color: 'red', price: 19.95 },
  },
};

export const JsonPathExplorerTool: React.FC<JsonPathExplorerToolProps> = ({ language }) => {
  const [jsonStr, setJsonStr] = useState(JSON.stringify(SAMPLE_DATA, null, 2));
  const [query, setQuery] = useState('$.store.book[*].title');
  const [copied, setCopied] = useState(false);

  // Evaluate query
  const { results, error, matchCount } = useMemo(() => {
    try {
      const obj = JSON.parse(jsonStr);
      const q = query.trim();

      if (!q || q === '$') {
        return { results: obj, error: null, matchCount: 1 };
      }

      // Safe recursive JSONPath parser
      // Supports: $, ., .., [*], [n], [start:end], [?(@.field op val)]
      const cleanQ = q.startsWith('$.') ? q.slice(2) : q.startsWith('$') ? q.slice(1) : q;
      
      // Tokenize path segments
      // Handles dots and bracket notation
      const tokens: string[] = [];
      let buffer = '';
      let inBracket = false;

      for (let i = 0; i < cleanQ.length; i++) {
        const char = cleanQ[i];
        if (char === '[' && !inBracket) {
          if (buffer) {
            tokens.push(buffer);
            buffer = '';
          }
          inBracket = true;
        } else if (char === ']' && inBracket) {
          tokens.push(`[${buffer}]`);
          buffer = '';
          inBracket = false;
        } else if (char === '.' && !inBracket) {
          if (buffer) {
            tokens.push(buffer);
            buffer = '';
          }
        } else {
          buffer += char;
        }
      }
      if (buffer) {
        tokens.push(buffer);
      }

      let current: any = [obj];

      for (const token of tokens) {
        if (!token) continue;
        const next: any[] = [];

        // Array slice or index or filter: [0], [*], [0:2], [?(@.price < 10)]
        if (token.startsWith('[') && token.endsWith(']')) {
          const inner = token.slice(1, -1).trim();

          if (inner === '*') {
            for (const item of current) {
              if (Array.isArray(item)) {
                next.push(...item);
              } else if (item && typeof item === 'object') {
                next.push(...Object.values(item));
              }
            }
          } else if (inner.includes(':')) {
            const [sStr, eStr] = inner.split(':');
            const start = sStr ? parseInt(sStr, 10) : 0;
            const end = eStr ? parseInt(eStr, 10) : undefined;
            for (const item of current) {
              if (Array.isArray(item)) {
                next.push(...item.slice(start, end));
              }
            }
          } else if (inner.startsWith('?(@.')) {
            // Predicate filter: ?(@.field op value)
            const filterMatch = inner.match(/^\?\(@\.([a-zA-Z0-9_]+)\s*([<>=!]+)\s*([0-9.]+|'[^']*'|"[^"]*")\)$/);
            if (filterMatch) {
              const [, field, op, rawVal] = filterMatch;
              const targetVal = rawVal.startsWith("'") || rawVal.startsWith('"')
                ? rawVal.slice(1, -1)
                : parseFloat(rawVal);

              for (const item of current) {
                if (Array.isArray(item)) {
                  for (const sub of item) {
                    if (sub && typeof sub === 'object' && field in sub) {
                      const actual = sub[field];
                      let pass = false;
                      if (op === '<') pass = actual < targetVal;
                      else if (op === '<=') pass = actual <= targetVal;
                      else if (op === '>') pass = actual > targetVal;
                      else if (op === '>=') pass = actual >= targetVal;
                      else if (op === '==' || op === '=') pass = actual == targetVal;
                      else if (op === '!=' || op === '!==') pass = actual != targetVal;

                      if (pass) next.push(sub);
                    }
                  }
                }
              }
            } else {
              // Default fallback
              next.push(...current);
            }
          } else if (!isNaN(Number(inner))) {
            const idx = parseInt(inner, 10);
            for (const item of current) {
              if (Array.isArray(item)) {
                const targetIdx = idx < 0 ? item.length + idx : idx;
                if (item[targetIdx] !== undefined) {
                  next.push(item[targetIdx]);
                }
              }
            }
          }
        } else {
          // Property lookup: token
          for (const item of current) {
            if (item && typeof item === 'object') {
              if (token in item) {
                next.push(item[token]);
              }
            }
          }
        }

        current = next;
      }

      const finalResult = current.length === 1 && !q.includes('*') && !q.includes(':') && !q.includes('?(')
        ? current[0]
        : current;

      const count = Array.isArray(finalResult) ? finalResult.length : finalResult !== undefined ? 1 : 0;

      return { results: finalResult, error: null, matchCount: count };
    } catch (e: any) {
      return { results: null, error: e.message || 'Invalid JSON syntax', matchCount: 0 };
    }
  }, [jsonStr, query]);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(results, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setJsonStr(JSON.stringify(SAMPLE_DATA, null, 2));
    setQuery('$.store.book[*].title');
  };

  return (
    <div className="space-y-6">
      {/* JSONPath Query Bar */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <Search className="w-4 h-4 text-emerald-500" />
            <span>{language === 'vi' ? 'Biểu thức truy vấn JSONPath' : 'JSONPath Expression'}</span>
          </label>
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
            <span className="text-slate-500">{language === 'vi' ? 'Mẫu ví dụ:' : 'Presets:'}</span>
            <button
              type="button"
              onClick={() => setQuery('$.store.book[*].title')}
              className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
            >
              book[*].title
            </button>
            <button
              type="button"
              onClick={() => setQuery('$.store.book[?(@.price < 10)]')}
              className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
            >
              book[?(@.price &lt; 10)]
            </button>
            <button
              type="button"
              onClick={() => setQuery('$.store.book[0:2]')}
              className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
            >
              book[0:2]
            </button>
            <button
              type="button"
              onClick={() => setQuery('$.store.bicycle')}
              className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
            >
              bicycle
            </button>
          </div>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full font-mono text-sm p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="$.store.book[*].author"
        />
      </div>

      {/* Side-by-Side: Input JSON vs Filtered Matches */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Source JSON */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold uppercase text-slate-500">
              {language === 'vi' ? 'Tài liệu JSON nguồn' : 'Source JSON Document'}
            </label>
            <button
              type="button"
              onClick={handleReset}
              className="text-[11px] font-mono text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
            >
              {language === 'vi' ? 'Đặt lại dữ liệu gốc' : 'Reset Sample'}
            </button>
          </div>
          <textarea
            value={jsonStr}
            onChange={(e) => setJsonStr(e.target.value)}
            rows={12}
            className="w-full p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Matched Result */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="text-xs font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400">
                {language === 'vi' ? 'Kết quả trích xuất' : 'Extracted Nodes'}
              </label>
              <span className="text-[11px] font-mono text-slate-500">
                ({matchCount} {matchCount === 1 ? 'match' : 'matches'})
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-500 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (language === 'vi' ? 'Đã sao chép' : 'Copied') : (language === 'vi' ? 'Sao chép' : 'Copy')}</span>
            </button>
          </div>

          {error ? (
            <div className="p-3.5 rounded-xl bg-rose-500/10 text-rose-500 text-xs font-mono border border-rose-500/20">
              Error: {error}
            </div>
          ) : (
            <pre className="p-3.5 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto h-[260px] border border-slate-800">
              {JSON.stringify(results, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};
