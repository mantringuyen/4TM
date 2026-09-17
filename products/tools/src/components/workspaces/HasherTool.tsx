import React, { useState, useEffect } from 'react';
import { Copy, Check, ShieldCheck } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';

export const HasherTool: React.FC<{ language: Language }> = ({ language }) => {
  const dict = TRANSLATIONS[language].common;
  const [input, setInput] = useState('4TM-Ecosystem-2026');
  const [sha256, setSha256] = useState('');
  const [sha512, setSha512] = useState('');
  const [sha1, setSha1] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const computeHashes = async (text: string) => {
    if (!text) {
      setSha256('');
      setSha512('');
      setSha1('');
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    // SHA-256
    const hash256Buffer = await crypto.subtle.digest('SHA-256', data);
    const hash256Hex = Array.from(new Uint8Array(hash256Buffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    setSha256(hash256Hex);

    // SHA-512
    const hash512Buffer = await crypto.subtle.digest('SHA-512', data);
    const hash512Hex = Array.from(new Uint8Array(hash512Buffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    setSha512(hash512Hex);

    // SHA-1
    const hash1Buffer = await crypto.subtle.digest('SHA-1', data);
    const hash1Hex = Array.from(new Uint8Array(hash1Buffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    setSha1(hash1Hex);
  };

  useEffect(() => {
    computeHashes(input);
  }, [input]);

  const copyDigest = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Plain Text Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
          <span>Input String / Secret</span>
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
          rows={3}
          className="w-full p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 dark:text-white resize-y"
          placeholder="Enter text to hash..."
        />
      </div>

      {/* Calculated Hashes */}
      <div className="space-y-3">
        {/* SHA-256 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-amber-600 dark:text-amber-400">SHA-256 (32 bytes / 256 bits)</span>
            <button
              type="button"
              onClick={() => copyDigest('sha256', sha256)}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-amber-500 font-bold cursor-pointer"
            >
              {copiedKey === 'sha256' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'sha256' ? dict.copied : dict.copy}</span>
            </button>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-200 break-all select-all">
            {sha256 || '...'}
          </div>
        </div>

        {/* SHA-512 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">SHA-512 (64 bytes / 512 bits)</span>
            <button
              type="button"
              onClick={() => copyDigest('sha512', sha512)}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-indigo-500 font-bold cursor-pointer"
            >
              {copiedKey === 'sha512' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'sha512' ? dict.copied : dict.copy}</span>
            </button>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-200 break-all select-all">
            {sha512 || '...'}
          </div>
        </div>

        {/* SHA-1 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-slate-600 dark:text-slate-400">SHA-1 (Legacy Git Object Hash)</span>
            <button
              type="button"
              onClick={() => copyDigest('sha1', sha1)}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold cursor-pointer"
            >
              {copiedKey === 'sha1' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'sha1' ? dict.copied : dict.copy}</span>
            </button>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-200 break-all select-all">
            {sha1 || '...'}
          </div>
        </div>
      </div>
    </div>
  );
};
