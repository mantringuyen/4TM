import React, { useState, useMemo } from 'react';
import { Language } from '../../../types';
import {
  Code,
  Sparkles,
  Layers,
  Check,
} from 'lucide-react';

interface CssSpecificityCalculatorToolProps {
  language: Language;
}

export const CssSpecificityCalculatorTool: React.FC<CssSpecificityCalculatorToolProps> = ({
  language,
}) => {
  const [selectorA, setSelectorA] = useState('nav.main-nav ul#menu li.active a:hover');
  const [selectorB, setSelectorB] = useState('header nav div > a.btn-primary');

  const calcSpecificity = (sel: string) => {
    let ids = 0;
    let classes = 0;
    let elements = 0;

    // Match IDs (#id)
    const idMatches = sel.match(/#[a-zA-Z0-9_-]+/g) || [];
    ids = idMatches.length;

    // Match Classes (.class), Attributes ([attr]), Pseudo-classes (:hover)
    const classMatches = sel.match(/\.[a-zA-Z0-9_-]+|\[[^\]]+\]|:[a-zA-Z0-9_-]+/g) || [];
    classes = classMatches.length;

    // Remove already matched IDs and classes to count elements
    let clean = sel.replace(/#[a-zA-Z0-9_-]+/g, '').replace(/\.[a-zA-Z0-9_-]+|\[[^\]]+\]|:[a-zA-Z0-9_-]+/g, '');
    const elementMatches = clean.match(/[a-zA-Z0-9_-]+/g) || [];
    elements = elementMatches.length;

    const score = ids * 100 + classes * 10 + elements;
    return { ids, classes, elements, score, tuple: `(${ids}, ${classes}, ${elements})` };
  };

  const specA = useMemo(() => calcSpecificity(selectorA), [selectorA]);
  const specB = useMemo(() => calcSpecificity(selectorB), [selectorB]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Selector A */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <label className="text-xs font-mono font-bold uppercase text-slate-400">
            CSS Selector A
          </label>
          <input
            type="text"
            value={selectorA}
            onChange={(e) => setSelectorA(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs text-sky-600 dark:text-sky-400 font-bold"
          />

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-mono text-slate-500">Specificity Matrix:</span>
            <span className="text-lg font-mono font-bold text-sky-600 dark:text-sky-400">
              {specA.tuple}
            </span>
          </div>
        </div>

        {/* Selector B */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <label className="text-xs font-mono font-bold uppercase text-slate-400">
            CSS Selector B
          </label>
          <input
            type="text"
            value={selectorB}
            onChange={(e) => setSelectorB(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs text-sky-600 dark:text-sky-400 font-bold"
          />

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-mono text-slate-500">Specificity Matrix:</span>
            <span className="text-lg font-mono font-bold text-sky-600 dark:text-sky-400">
              {specB.tuple}
            </span>
          </div>
        </div>
      </div>

      {/* Winner Determination */}
      <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-xs text-sky-900 dark:text-sky-200 flex items-center justify-between">
        <span className="font-bold">
          {specA.score > specB.score
            ? '🏆 Selector A wins the cascade with higher specificity!'
            : specB.score > specA.score
            ? '🏆 Selector B wins the cascade with higher specificity!'
            : '⚖️ Tie! The selector declared last in the stylesheet will take precedence.'}
        </span>
      </div>
    </div>
  );
};
