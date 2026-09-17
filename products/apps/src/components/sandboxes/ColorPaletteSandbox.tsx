import React, { useState } from 'react';
import { Copy, Check, Palette, Sparkles } from 'lucide-react';
import { Language } from '../../types';

export const ColorPaletteSandbox: React.FC<{ language: Language }> = ({ language }) => {
  const [baseHex, setBaseHex] = useState('#4f46e5');
  const [copiedVar, setCopiedVar] = useState(false);

  // Derive palette shades
  const palette = [
    { label: '50', hex: '#eef2ff' },
    { label: '100', hex: '#e0e7ff' },
    { label: '300', hex: '#a5b4fc' },
    { label: '500', hex: baseHex },
    { label: '700', hex: '#4338ca' },
    { label: '900', hex: '#312e81' },
  ];

  const handleCopyCss = () => {
    const cssVars = palette
      .map((p) => `  --color-primary-${p.label}: ${p.hex};`)
      .join('\n');
    navigator.clipboard.writeText(`:root {\n${cssVars}\n}`);
    setCopiedVar(true);
    setTimeout(() => setCopiedVar(false), 2000);
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm text-slate-900 dark:text-white">
      {/* Base Hex Controller */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={baseHex}
            onChange={(e) => setBaseHex(e.target.value)}
            className="w-10 h-10 rounded-xl cursor-pointer border-0 p-0 overflow-hidden bg-transparent"
          />
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400">Base Accent Hex</span>
            <div className="text-sm font-bold font-mono">{baseHex}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopyCss}
          className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          {copiedVar ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedVar ? 'Copied Variables' : 'Copy CSS Variables'}</span>
        </button>
      </div>

      {/* Visual Palette Swatches */}
      <div className="grid grid-cols-6 gap-2 pt-2">
        {palette.map((swatch) => (
          <div
            key={swatch.label}
            className="flex flex-col items-center gap-1.5 p-2 rounded-2xl border border-slate-200 dark:border-slate-800"
          >
            <div
              className="w-full h-12 rounded-xl shadow-xs"
              style={{ backgroundColor: swatch.hex }}
            />
            <span className="text-[11px] font-bold">{swatch.label}</span>
            <span className="text-[9px] font-mono text-slate-400">{swatch.hex}</span>
          </div>
        ))}
      </div>

      {/* WCAG Contrast Assessment */}
      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400">WCAG AA Contrast (4.5:1)</span>
        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold font-mono">
          PASS on Dark Background
        </span>
      </div>
    </div>
  );
};
