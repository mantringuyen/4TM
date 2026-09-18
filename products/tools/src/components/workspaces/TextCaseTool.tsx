import React, { useState, useMemo } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { InputPanel, OutputPanel, StatBadge } from '../common/Panels';
import { CopyButton, DownloadButton, ResetButton } from '../common/ActionButtons';
import {
  Type,
  AlignLeft,
  ArrowDownAZ,
  ArrowUpAZ,
  Check,
  Clock,
  Filter,
  Layers,
  Scissors,
  Sparkles,
} from 'lucide-react';

interface TextCaseToolProps {
  language: Language;
}

type CaseType =
  | 'original'
  | 'upper'
  | 'lower'
  | 'title'
  | 'sentence'
  | 'pascal'
  | 'camel'
  | 'snake'
  | 'kebab'
  | 'constant';

const SAMPLE_TEXT = `Welcome to 4TM Tools. This is a comprehensive developer and student utility suite.
We build browser-first, privacy-respecting software with zero server leaks.
Try converting this paragraph into various cases like camelCase, snake_case, or Title Case!
4TM Study courses include Python, SQL, HTML, CSS, JavaScript, and Power BI.`;

export const TextCaseTool: React.FC<TextCaseToolProps> = ({ language }) => {
  const dict = TRANSLATIONS[language];
  const [inputText, setInputText] = useState<string>(SAMPLE_TEXT);
  const [activeCase, setActiveCase] = useState<CaseType>('title');
  const [outputTextOverride, setOutputTextOverride] = useState<string | null>(null);

  // Text Statistics Calculations
  const stats = useMemo(() => {
    const text = inputText;
    const charCount = text.length;
    const charNoSpacesCount = text.replace(/\s/g, '').length;
    const trimmed = text.trim();
    const wordList = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
    const wordCount = wordList.length;
    const lineCount = text ? text.split('\n').length : 0;
    // Average reading speed: 200 words per minute (0 min read for empty input)
    const readingTimeMinutes = wordCount === 0 ? 0 : Math.max(1, Math.ceil(wordCount / 200));

    return {
      charCount,
      charNoSpacesCount,
      wordCount,
      lineCount,
      readingTimeMinutes,
    };
  }, [inputText]);

  // Case Conversion Logic
  const transformedText = useMemo(() => {
    if (outputTextOverride !== null) return outputTextOverride;
    if (!inputText) return '';

    const toWords = (str: string): string[] => {
      return str
        .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase split
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        .replace(/[_\-./\\]+/g, ' ')
        .trim()
        .split(/\s+/)
        .filter(Boolean);
    };

    switch (activeCase) {
      case 'original':
        return inputText;

      case 'upper':
        return inputText.toUpperCase();

      case 'lower':
        return inputText.toLowerCase();

      case 'title':
        return inputText.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
        );

      case 'sentence':
        return inputText
          .toLowerCase()
          .replace(/(^[\s]*\p{L}|[.!?]\s*\p{L})/gmu, (c) => c.toUpperCase());

      case 'pascal': {
        const words = toWords(inputText);
        return words
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join('');
      }

      case 'camel': {
        const words = toWords(inputText);
        if (words.length === 0) return '';
        return (
          words[0].toLowerCase() +
          words
            .slice(1)
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join('')
        );
      }

      case 'snake': {
        const words = toWords(inputText);
        return words.map((w) => w.toLowerCase()).join('_');
      }

      case 'kebab': {
        const words = toWords(inputText);
        return words.map((w) => w.toLowerCase()).join('-');
      }

      case 'constant': {
        const words = toWords(inputText);
        return words.map((w) => w.toUpperCase()).join('_');
      }

      default:
        return inputText;
    }
  }, [inputText, activeCase, outputTextOverride]);

  // Utility Actions
  const handleTrimWhitespace = () => {
    const cleaned = inputText
      .split('\n')
      .map((l) => l.trim())
      .join('\n');
    setOutputTextOverride(cleaned);
  };

  const handleRemoveBlankLines = () => {
    const cleaned = inputText
      .split('\n')
      .filter((l) => l.trim().length > 0)
      .join('\n');
    setOutputTextOverride(cleaned);
  };

  const handleRemoveDuplicates = () => {
    const lines = inputText.split('\n');
    const seen = new Set<string>();
    const uniqueLines = lines.filter((l) => {
      if (seen.has(l)) return false;
      seen.add(l);
      return true;
    });
    setOutputTextOverride(uniqueLines.join('\n'));
  };

  const handleSortLinesAsc = () => {
    const lines = inputText.split('\n');
    lines.sort((a, b) => a.localeCompare(b));
    setOutputTextOverride(lines.join('\n'));
  };

  const handleSortLinesDesc = () => {
    const lines = inputText.split('\n');
    lines.sort((a, b) => b.localeCompare(a));
    setOutputTextOverride(lines.join('\n'));
  };

  const handleReverseText = () => {
    setOutputTextOverride(inputText.split('').reverse().join(''));
  };

  const handleSelectCase = (c: CaseType) => {
    setOutputTextOverride(null);
    setActiveCase(c);
  };

  const caseButtons: { id: CaseType; label: string; preview: string }[] = [
    { id: 'upper', label: 'UPPERCASE', preview: 'HELLO WORLD' },
    { id: 'lower', label: 'lowercase', preview: 'hello world' },
    { id: 'title', label: 'Title Case', preview: 'Hello World' },
    { id: 'sentence', label: 'Sentence case', preview: 'Hello world.' },
    { id: 'pascal', label: 'PascalCase', preview: 'HelloWorld' },
    { id: 'camel', label: 'camelCase', preview: 'helloWorld' },
    { id: 'snake', label: 'snake_case', preview: 'hello_world' },
    { id: 'kebab', label: 'kebab-case', preview: 'hello-world' },
    { id: 'constant', label: 'CONSTANT_CASE', preview: 'HELLO_WORLD' },
  ];

  return (
    <div className="space-y-6">
      {/* Live Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <StatBadge label={dict.common.words} value={stats.wordCount.toLocaleString()} highlight={true} />
        <StatBadge label={dict.common.characters} value={stats.charCount.toLocaleString()} />
        <StatBadge label="Chars (No Space)" value={stats.charNoSpacesCount.toLocaleString()} />
        <StatBadge label={dict.common.lines} value={stats.lineCount.toLocaleString()} />
        <StatBadge label="Est. Reading Time" value={`~${stats.readingTimeMinutes} ${dict.common.readingTime}`} />
      </div>

      {/* Case Selectors */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Case Conversions
          </span>
          <span className="text-[11px] text-slate-400 font-mono">Instant Live Preview</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {caseButtons.map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => handleSelectCase(btn.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                activeCase === btn.id && outputTextOverride === null
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 ring-2 ring-emerald-500/50'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <span>{btn.label}</span>
              <span className="text-[10px] opacity-70 font-mono font-normal">({btn.preview})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Text String Utility Action Buttons */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            String Cleaners & Utilities
          </span>
          <span className="text-[11px] text-slate-400 font-mono">Lines & Spacing Tools</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleTrimWhitespace}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shadow-sm"
          >
            <Scissors className="w-3.5 h-3.5 text-emerald-500" />
            <span>Trim Whitespace</span>
          </button>

          <button
            type="button"
            onClick={handleRemoveBlankLines}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shadow-sm"
          >
            <Filter className="w-3.5 h-3.5 text-emerald-500" />
            <span>Remove Blank Lines</span>
          </button>

          <button
            type="button"
            onClick={handleRemoveDuplicates}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shadow-sm"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-500" />
            <span>Remove Duplicate Lines</span>
          </button>

          <button
            type="button"
            onClick={handleSortLinesAsc}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shadow-sm"
          >
            <ArrowDownAZ className="w-3.5 h-3.5 text-blue-500" />
            <span>Sort Lines (A &rarr; Z)</span>
          </button>

          <button
            type="button"
            onClick={handleSortLinesDesc}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shadow-sm"
          >
            <ArrowUpAZ className="w-3.5 h-3.5 text-blue-500" />
            <span>Sort Lines (Z &rarr; A)</span>
          </button>

          <button
            type="button"
            onClick={handleReverseText}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shadow-sm"
          >
            <Type className="w-3.5 h-3.5 text-purple-500" />
            <span>Reverse Characters</span>
          </button>
        </div>
      </div>

      {/* Editor Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InputPanel
          title="Original Text"
          value={inputText}
          onChange={(val) => {
            setInputText(val);
            setOutputTextOverride(null);
          }}
          onClear={() => {
            setInputText('');
            setOutputTextOverride(null);
          }}
          onSample={() => {
            setInputText(SAMPLE_TEXT);
            setOutputTextOverride(null);
          }}
          sampleLabel={dict.common.sample}
          clearLabel={dict.common.clear}
        />

        <OutputPanel
          title="Converted Text"
          value={transformedText}
          downloadFilename="transformed-text.txt"
          copyLabel={dict.common.copy}
          downloadLabel={dict.common.download}
          formatBadge={outputTextOverride ? 'Custom Filter' : activeCase.toUpperCase()}
          extraActions={
            <button
              type="button"
              onClick={() => {
                setInputText(transformedText);
                setOutputTextOverride(null);
              }}
              disabled={!transformedText}
              className="px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              title="Replace original input with current output"
            >
              Use as Input
            </button>
          }
        />
      </div>
    </div>
  );
};
