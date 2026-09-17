import React, { useState } from 'react';
import { Copy, Check, KeyRound, AlertTriangle } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';

// Safe demo mock JWT token for testing UI
const SAMPLE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzR0bV9kZXYiLCJlbWFpbCI6ImFkbWluQDR0bS5pby52biIsInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNzA0MDY3MjAwLCJleHAiOjE3NjcyNDgwMDB9.abcdef1234567890sample';

export const JwtTool: React.FC<{ language: Language }> = ({ language }) => {
  const dict = TRANSLATIONS[language].common;
  const [token, setToken] = useState(SAMPLE_JWT);
  const [copied, setCopied] = useState<string | null>(null);

  let headerObj: any = null;
  let payloadObj: any = null;
  let signatureStr = '';
  let error = '';

  try {
    const parts = token.trim().split('.');
    if (parts.length === 3) {
      headerObj = JSON.parse(decodeURIComponent(escape(atob(parts[0]))));
      payloadObj = JSON.parse(decodeURIComponent(escape(atob(parts[1]))));
      signatureStr = parts[2];
    } else {
      error = 'JWT must consist of three dot-separated Base64Url segments.';
    }
  } catch (err: any) {
    error = 'Failed to parse token segments: ' + err.message;
  }

  const copySection = (key: string, data: any) => {
    navigator.clipboard.writeText(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatTimestamp = (ts?: number) => {
    if (!ts) return null;
    const date = new Date(ts * 1000);
    const isExpired = date.getTime() < Date.now();
    return {
      iso: date.toISOString(),
      local: date.toLocaleString(),
      isExpired,
    };
  };

  const expInfo = payloadObj?.exp ? formatTimestamp(payloadObj.exp) : null;
  const iatInfo = payloadObj?.iat ? formatTimestamp(payloadObj.iat) : null;

  return (
    <div className="space-y-4">
      {/* Token Input Box */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
          <span>Encoded Token (Header.Payload.Signature)</span>
          <button
            type="button"
            onClick={() => setToken(SAMPLE_JWT)}
            className="hover:text-purple-500 cursor-pointer"
          >
            {dict.sample}
          </button>
        </div>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          rows={3}
          className="w-full p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white resize-y"
          placeholder="Paste JWT token here..."
        />
        {error && (
          <p className="text-[11px] text-rose-500 font-mono">{error}</p>
        )}
      </div>

      {/* Decoded Sections */}
      {!error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Header */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-rose-500 font-bold">
              <span>HEADER: Algorithm & Token Type</span>
              <button
                type="button"
                onClick={() => copySection('header', headerObj)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                {copied === 'header' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 font-mono text-xs text-rose-600 dark:text-rose-400 overflow-x-auto">
              <code>{JSON.stringify(headerObj, null, 2)}</code>
            </pre>
          </div>

          {/* Payload */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-purple-600 dark:text-purple-400 font-bold">
              <span>PAYLOAD: Data Claims</span>
              <button
                type="button"
                onClick={() => copySection('payload', payloadObj)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                {copied === 'payload' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 font-mono text-xs text-purple-600 dark:text-purple-400 overflow-x-auto">
              <code>{JSON.stringify(payloadObj, null, 2)}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Claims Breakdown Details */}
      {expInfo && (
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="space-y-0.5">
            <span className="text-slate-400">Expiration (exp):</span>
            <div className="text-slate-800 dark:text-slate-200 font-bold">{expInfo.local}</div>
          </div>

          <div>
            {expInfo.isExpired ? (
              <span className="px-3 py-1 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold border border-rose-500/20">
                TOKEN EXPIRED
              </span>
            ) : (
              <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                ACTIVE / VALID TIMEFRAME
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
