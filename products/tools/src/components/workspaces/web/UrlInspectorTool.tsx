import React, { useState, useMemo } from 'react';
import { Language } from '../../../types';
import {
  Globe,
  Copy,
  Check,
  Sparkles,
  Layers,
} from 'lucide-react';

interface UrlInspectorToolProps {
  language: Language;
}

export const UrlInspectorTool: React.FC<UrlInspectorToolProps> = ({ language }) => {
  const [inputUrl, setInputUrl] = useState('https://tools.4tm.io.vn/explorer?category=developer&tab=jsonpath&utm_source=docs#output');
  const [copied, setCopied] = useState(false);

  const parsed = useMemo(() => {
    try {
      const u = new URL(inputUrl);
      const params: { key: string; value: string }[] = [];
      u.searchParams.forEach((val, key) => {
        params.push({ key, value: val });
      });

      return {
        protocol: u.protocol,
        host: u.host,
        hostname: u.hostname,
        port: u.port || '(default)',
        pathname: u.pathname,
        hash: u.hash,
        params,
        error: null,
      };
    } catch (e: any) {
      return { error: 'Invalid URL format' };
    }
  }, [inputUrl]);

  return (
    <div className="space-y-6">
      {/* URL Input */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-sky-500" />
          <span>Full URL String</span>
        </label>
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-xs text-sky-600 dark:text-sky-400 font-bold"
        />
      </div>

      {/* Breakdown Cards */}
      {!parsed.error ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Protocol</span>
              <p className="text-xs font-bold font-mono text-slate-900 dark:text-slate-100">{parsed.protocol}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Hostname</span>
              <p className="text-xs font-bold font-mono text-sky-600 dark:text-sky-400">{parsed.hostname}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Pathname</span>
              <p className="text-xs font-bold font-mono text-slate-900 dark:text-slate-100">{parsed.pathname}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Hash Anchor</span>
              <p className="text-xs font-bold font-mono text-slate-900 dark:text-slate-100">{parsed.hash || '(none)'}</p>
            </div>
          </div>

          {/* Search Parameters Table */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
              Query Parameters ({parsed.params?.length || 0})
            </h3>

            {parsed.params && parsed.params.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 font-mono text-slate-400">
                      <th className="py-2 px-3">Key</th>
                      <th className="py-2 px-3">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                    {parsed.params.map((p, i) => (
                      <tr key={i}>
                        <td className="py-2 px-3 text-sky-600 dark:text-sky-400 font-bold">{p.key}</td>
                        <td className="py-2 px-3 text-slate-700 dark:text-slate-300">{p.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No query parameters found in URL.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-rose-500/10 text-rose-500 text-xs font-mono">
          {parsed.error}
        </div>
      )}
    </div>
  );
};
