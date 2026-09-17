import React, { useState } from 'react';
import { Send, Copy, Check, Terminal, Radio } from 'lucide-react';
import { Language } from '../../types';

export const ApiStudioSandbox: React.FC<{ language: Language }> = ({ language }) => {
  const [method, setMethod] = useState<'GET' | 'POST' | 'OPTIONS'>('GET');
  const [url, setUrl] = useState('https://4tm.io.vn/api/health');
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseBody, setResponseBody] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);

  const handleSend = async () => {
    setIsLoading(true);
    setResponseStatus(null);
    setResponseBody('');
    const startTime = performance.now();

    try {
      const res = await fetch(url, {
        method,
      });
      const duration = Math.round(performance.now() - startTime);
      setResponseStatus(res.status);
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        setResponseBody(JSON.stringify(json, null, 2) + `\n\n// Completed in ${duration}ms`);
      } catch {
        setResponseBody(text || `HTTP ${res.status} ${res.statusText}`);
      }
    } catch (err: any) {
      setResponseStatus(500);
      setResponseBody(`Fetch failed or blocked by CORS: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const curlCommand = `curl -X ${method} "${url}" -H "Accept: application/json"`;

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm text-slate-900 dark:text-white">
      {/* Endpoint URL composer */}
      <div className="flex flex-col sm:flex-row items-stretch gap-2">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as any)}
          className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 focus:outline-none"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="OPTIONS">OPTIONS</option>
        </select>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
          className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <button
          type="button"
          disabled={isLoading}
          onClick={handleSend}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs inline-flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{isLoading ? 'Sending...' : 'Send'}</span>
        </button>
      </div>

      {/* cURL Snippet */}
      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400">
        <div className="truncate mr-2">
          <code>{curlCommand}</code>
        </div>
        <button
          type="button"
          onClick={handleCopyCurl}
          className="px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-200 font-bold shrink-0 cursor-pointer"
        >
          {copiedCurl ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Response Box */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Response Body:</span>
          {responseStatus !== null && (
            <span
              className={`font-bold ${
                responseStatus >= 200 && responseStatus < 300
                  ? 'text-emerald-500'
                  : 'text-rose-500'
              }`}
            >
              Status: HTTP {responseStatus}
            </span>
          )}
        </div>

        <pre className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto min-h-28 max-h-52">
          <code>{responseBody || '// Click Send to dispatch request to the endpoint'}</code>
        </pre>
      </div>
    </div>
  );
};
