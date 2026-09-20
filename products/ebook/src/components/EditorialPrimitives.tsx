import React, { useState } from 'react';
import {
  Language,
  ReaderPaperTheme,
  CommonMistakeItem,
  ComparisonMatrix,
  ProcessDiagram,
  DeepDiveItem,
  SelfReviewItem,
  ChapterSummary,
} from '../types';
import {
  Lightbulb,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Table,
  Workflow,
  Target,
  ShieldCheck,
  Compass,
  ExternalLink,
  ArrowRight,
  Info,
  Layers,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Cpu,
  BookmarkCheck,
} from 'lucide-react';

interface EditorialProps {
  language: Language;
  theme: ReaderPaperTheme;
  chapterNumber?: number;
  itemIndex?: number;
}

// Format inline code snippets wrapped in backticks
export function renderInlineText(text: string) {
  if (!text || !text.includes('`')) return text;

  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      const codeContent = part.slice(1, -1);
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded text-[0.88em] font-mono font-semibold bg-black/5 dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-black/5 dark:border-white/5 mx-0.5 break-words [overflow-wrap:anywhere]"
        >
          {codeContent}
        </code>
      );
    }
    return part;
  });
}

// 1. KEY IDEA / PRINCIPLE BLOCK (Editorial Callout)
export const KeyIdeaBlock: React.FC<{
  idea: { en: string; vi: string };
} & EditorialProps> = ({ idea, language, theme }) => {
  const isDark = theme === 'dark' || theme === 'midnight';
  const isSepia = theme === 'sepia';

  const containerBg = isSepia
    ? 'bg-[#F5E6CA] border-[#E0CFAB]'
    : isDark
    ? 'bg-amber-950/20 border-amber-900/40 text-amber-100'
    : 'bg-amber-50/80 border-amber-200 text-amber-950';

  const titleColor = isSepia
    ? 'text-[#8A5108]'
    : isDark
    ? 'text-amber-400'
    : 'text-amber-800';

  return (
    <aside
      aria-label="Key Principle"
      className={`my-8 p-5 sm:p-6 rounded-2xl border ${containerBg} shadow-xs`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className={`w-4 h-4 ${titleColor} shrink-0`} />
        <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${titleColor}`}>
          {language === 'en' ? 'Core Principle' : 'Nguyên Lý Cốt Lõi'}
        </span>
      </div>
      <p className="text-sm sm:text-base font-reader font-medium leading-relaxed m-0 [overflow-wrap:anywhere]">
        {renderInlineText(idea[language])}
      </p>
    </aside>
  );
};

// 2. WHEN TO USE & WHEN TO AVOID (Editorial Trade-off Matrix)
export const WhenToUseBlock: React.FC<{
  whenToUse: {
    use: { en: string[]; vi: string[] };
    avoid?: { en: string[]; vi: string[] };
  };
} & EditorialProps> = ({ whenToUse, language, theme }) => {
  const isDark = theme === 'dark' || theme === 'midnight';
  const isSepia = theme === 'sepia';

  const cardBg = isSepia
    ? 'bg-[#F2E3C6] border-[#DFCAB0]'
    : isDark
    ? 'bg-slate-900/80 border-slate-800'
    : 'bg-slate-50 border-slate-200/90';

  return (
    <section
      aria-label="Usage Guidance"
      className={`my-8 p-5 sm:p-6 rounded-2xl border ${cardBg} space-y-5 shadow-xs`}
    >
      {/* Use Cases */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 m-0">
            {language === 'en' ? 'When to Apply This Pattern' : 'Khi Nào Nên Áp Dụng Pattern Này'}
          </h4>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm list-none p-0 m-0 font-sans">
          {whenToUse.use[language].map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
              <span className="flex-1 [overflow-wrap:anywhere] leading-relaxed">
                {renderInlineText(item)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Avoid Cases */}
      {whenToUse.avoid && whenToUse.avoid[language].length > 0 && (
        <div className="pt-4 border-t border-black/5 dark:border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 m-0">
              {language === 'en' ? 'When to Avoid & Architectural Trade-offs' : 'Khi Nào Tránh & Đánh Đổi Kiến Trúc'}
            </h4>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm list-none p-0 m-0 font-sans">
            {whenToUse.avoid[language].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-2" />
                <span className="flex-1 [overflow-wrap:anywhere] leading-relaxed">
                  {renderInlineText(item)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

// 3. COMMON MISTAKE BLOCK (Publication Pitfalls)
export const CommonMistakesBlock: React.FC<{
  mistakes: CommonMistakeItem[];
} & EditorialProps> = ({ mistakes, language, theme }) => {
  const isDark = theme === 'dark' || theme === 'midnight';
  const isSepia = theme === 'sepia';

  const boxBg = isSepia
    ? 'bg-[#F7EAD0] border-[#E2D1AC]'
    : isDark
    ? 'bg-rose-950/20 border-rose-900/30'
    : 'bg-rose-50/50 border-rose-200/80';

  return (
    <section aria-label="Common Pitfalls" className="my-8 space-y-4">
      <div className="flex items-center gap-2 pb-1 border-b border-black/10 dark:border-white/10">
        <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 m-0">
          {language === 'en' ? 'Critical Pitfalls & Anti-Patterns' : 'Sai Lầm Thường Gặp & Anti-Patterns'}
        </h4>
      </div>

      <div className="space-y-4">
        {mistakes.map((item, idx) => (
          <div key={idx} className={`p-4 sm:p-5 rounded-2xl border ${boxBg} space-y-3`}>
            <div>
              <div className="text-xs font-bold text-rose-700 dark:text-rose-400 font-mono uppercase tracking-wide mb-1">
                {language === 'en' ? 'Pitfall' : 'Lỗi'} #{idx + 1}: {item.mistake[language]}
              </div>
              <p className="text-xs sm:text-sm font-sans text-slate-700 dark:text-slate-300 m-0 leading-relaxed [overflow-wrap:anywhere]">
                <strong className="text-slate-900 dark:text-white">
                  {language === 'en' ? 'Root Cause: ' : 'Nguyên nhân: '}
                </strong>
                {renderInlineText(item.why[language])}
              </p>
            </div>

            {/* Code Incorrect vs Correct Split */}
            {(item.codeIncorrect || item.codeCorrect) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {item.codeIncorrect && (
                  <div className="rounded-xl overflow-hidden border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-slate-950 p-3">
                    <div className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 uppercase mb-1.5 flex items-center gap-1">
                      <XCircle className="w-3 h-3" />
                      <span>{language === 'en' ? 'Anti-Pattern (Avoid)' : 'Không Nên Dùng'}</span>
                    </div>
                    <pre className="text-xs font-mono text-rose-800 dark:text-rose-300 overflow-x-auto m-0 leading-relaxed">
                      <code>{item.codeIncorrect}</code>
                    </pre>
                  </div>
                )}
                {item.codeCorrect && (
                  <div className="rounded-xl overflow-hidden border border-emerald-200 dark:border-emerald-900/50 bg-white dark:bg-slate-950 p-3">
                    <div className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase mb-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{language === 'en' ? 'Production Solution' : 'Giải Pháp Chuẩn'}</span>
                    </div>
                    <pre className="text-xs font-mono text-emerald-800 dark:text-emerald-300 overflow-x-auto m-0 leading-relaxed">
                      <code>{item.codeCorrect}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}

            <div className="text-xs font-sans text-emerald-800 dark:text-emerald-300 font-medium pt-1">
              <strong>{language === 'en' ? 'Prescribed Fix: ' : 'Cách sửa: '}</strong>
              {renderInlineText(item.solution[language])}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// 4. COMPARISON MATRIX TABLE (Publication Table Pattern: Table X.Y — ...)
export const ComparisonTableBlock: React.FC<{
  matrix: ComparisonMatrix;
} & EditorialProps> = ({ matrix, language, theme, chapterNumber = 1, itemIndex = 1 }) => {
  const isDark = theme === 'dark' || theme === 'midnight';
  const isSepia = theme === 'sepia';

  const tableBorder = isSepia
    ? 'border-[#DFCAB0]'
    : isDark
    ? 'border-slate-800'
    : 'border-slate-200';

  const headerBg = isSepia
    ? 'bg-[#EBDABF] text-[#423321]'
    : isDark
    ? 'bg-slate-900 text-slate-200'
    : 'bg-slate-100 text-slate-800';

  return (
    <figure className="my-8 space-y-2.5 w-full min-w-0">
      {/* Table Caption Heading */}
      <figcaption className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
        <span className="font-bold text-blue-600 dark:text-blue-400">
          Table {chapterNumber}.{itemIndex}
        </span>
        <span>—</span>
        <span className="font-semibold text-slate-900 dark:text-white">
          {language === 'en' ? 'Comparative Technical Analysis' : 'Bảng Phân Tích Kỹ Thuật So Sánh'}
        </span>
      </figcaption>

      {/* Publication Table Container */}
      <div className={`overflow-x-auto rounded-xl border ${tableBorder} shadow-xs`}>
        <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
          <thead>
            <tr className={headerBg}>
              {matrix.headers.map((h, idx) => (
                <th
                  key={idx}
                  className="p-3 sm:p-3.5 font-bold font-mono border-b border-inherit uppercase tracking-wider text-[11px]"
                >
                  {h[language]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {matrix.rows.map((row, rIdx) => (
              <tr
                key={rIdx}
                className={`transition-colors ${
                  rIdx % 2 === 1 ? 'bg-black/[0.015] dark:bg-white/[0.015]' : ''
                } hover:bg-black/5 dark:hover:bg-white/5`}
              >
                {row[language].map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className={`p-3 sm:p-3.5 ${
                      cIdx === 0
                        ? 'font-bold font-mono text-blue-600 dark:text-blue-400 whitespace-nowrap'
                        : ''
                    } [overflow-wrap:anywhere]`}
                  >
                    {renderInlineText(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
};

// 5. PROCESS DIAGRAM BLOCK (Publication Figure Pattern: Figure X.Y — ...)
export const ProcessDiagramBlock: React.FC<{
  diagram: ProcessDiagram;
} & EditorialProps> = ({ diagram, language, theme, chapterNumber = 1, itemIndex = 1 }) => {
  const isDark = theme === 'dark' || theme === 'midnight';
  const isSepia = theme === 'sepia';

  const cardBg = isSepia
    ? 'bg-[#F2E3C6] border-[#DFCAB0]'
    : isDark
    ? 'bg-slate-900 border-slate-800'
    : 'bg-slate-50 border-slate-200';

  return (
    <figure className="my-8 space-y-2.5 w-full min-w-0">
      {/* Figure Title Caption */}
      <figcaption className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
        <span className="font-bold text-blue-600 dark:text-blue-400">
          Figure {chapterNumber}.{itemIndex}
        </span>
        <span>—</span>
        <span className="font-semibold text-slate-900 dark:text-white">
          {diagram.title[language]}
        </span>
      </figcaption>

      {/* Diagram Content Canvas */}
      <div className={`p-5 sm:p-6 rounded-2xl border ${cardBg} space-y-4 shadow-xs`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {diagram.steps.map((step) => (
            <div
              key={step.number}
              className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950/80 space-y-1.5 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono text-xs font-extrabold flex items-center justify-center">
                  {step.number}
                </span>
                <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest">
                  Step {step.number}
                </span>
              </div>
              <h5 className="text-xs font-bold font-sans text-slate-900 dark:text-white m-0 [overflow-wrap:anywhere]">
                {step.label[language]}
              </h5>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 m-0 leading-relaxed [overflow-wrap:anywhere]">
                {renderInlineText(step.description[language])}
              </p>
            </div>
          ))}
        </div>

        {/* Figure Note underneath */}
        <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center gap-1.5 text-[11px] font-mono opacity-60">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Execution sequential order from left to right.</span>
        </div>
      </div>
    </figure>
  );
};

// 6. PRACTICAL SCENARIO & BEST PRACTICES
export const BestPracticesBlock: React.FC<{
  practices: { en: string[]; vi: string[] };
} & EditorialProps> = ({ practices, language, theme }) => {
  return (
    <aside
      aria-label="Best Practices"
      className="my-8 p-5 sm:p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-3"
    >
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 m-0">
          {language === 'en' ? 'Engineering Best Practices' : 'Quy Tắc Thực Hành Kỹ Thuật'}
        </h4>
      </div>

      <ul className="space-y-2 text-xs sm:text-sm list-none p-0 m-0 font-sans">
        {practices[language].map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span className="text-slate-800 dark:text-slate-200 [overflow-wrap:anywhere] leading-relaxed">
              {renderInlineText(item)}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export const PracticalScenarioBlock: React.FC<{
  scenario: { en: string; vi: string };
} & EditorialProps> = ({ scenario, language, theme }) => {
  return (
    <aside
      aria-label="Production Scenario"
      className="my-8 p-5 sm:p-6 rounded-2xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-2"
    >
      <div className="flex items-center gap-2">
        <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 m-0">
          {language === 'en' ? 'Real-World Production Case' : 'Trường Hợp Ứng Dụng Trong Thực Tế'}
        </h4>
      </div>
      <p className="text-xs sm:text-sm font-sans text-slate-800 dark:text-slate-200 leading-relaxed m-0 [overflow-wrap:anywhere]">
        {renderInlineText(scenario[language])}
      </p>
    </aside>
  );
};

// 7. RELATED CONCEPTS & STUDY LINK
export const RelatedConceptsBlock: React.FC<{
  concepts: { en: string[]; vi: string[] };
  studyLink?: { topicSlug: string; label: { en: string; vi: string } };
} & EditorialProps> = ({ concepts, studyLink, language, theme }) => {
  return (
    <div className="my-8 pt-6 border-t border-black/10 dark:border-white/10 space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 m-0">
            {language === 'en' ? 'Related Technical Concepts' : 'Khái Niệm Liên Quan'}
          </h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {concepts[language].map((item, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-xl bg-black/5 dark:bg-white/10 text-xs font-mono text-slate-700 dark:text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {studyLink && (
        <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/30 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-700 dark:text-slate-300 font-sans">
            <span className="font-bold text-blue-600 dark:text-blue-400 mr-1">
              {language === 'en' ? 'Practice in 4TM Study:' : 'Luyện tập tại 4TM Study:'}
            </span>
            <span>{studyLink.label[language]}</span>
          </div>
          <a
            href={`https://study.4tm.io.vn`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shrink-0 transition-colors"
          >
            <span>{language === 'en' ? 'Open Study' : 'Mở Study'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </div>
  );
};

// 8. TECHNICAL DEEP DIVE BLOCK (Architectural & Runtime Mechanics)
export const DeepDiveBlock: React.FC<{
  deepDive: DeepDiveItem;
} & EditorialProps> = ({ deepDive, language, theme }) => {
  const isDark = theme === 'dark' || theme === 'midnight';
  const isSepia = theme === 'sepia';

  const containerBg = isSepia
    ? 'bg-[#F2E5D0] border-[#DFCBB0]'
    : isDark
    ? 'bg-slate-900/90 border-slate-700/80'
    : 'bg-slate-900 text-slate-100 border-slate-800';

  const textColor = isSepia
    ? 'text-[#3c3021]'
    : isDark
    ? 'text-slate-200'
    : 'text-slate-200';

  return (
    <section
      aria-label="Technical Deep Dive"
      className={`my-8 p-5 sm:p-7 rounded-2xl border ${containerBg} shadow-sm space-y-4`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 dark:border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold block">
              {deepDive.badge ? deepDive.badge[language] : language === 'en' ? 'Deep Dive • Architecture & Runtime' : 'Phân Tích Sâu • Kiến Trúc & Runtime'}
            </span>
            <h4 className="text-sm sm:text-base font-bold font-reader text-white m-0">
              {deepDive.title[language]}
            </h4>
          </div>
        </div>
      </div>

      <div className={`text-xs sm:text-sm font-sans leading-relaxed ${textColor} space-y-3 [overflow-wrap:anywhere]`}>
        <p className="m-0 leading-relaxed">
          {renderInlineText(deepDive.content[language])}
        </p>

        {deepDive.codeBlock && (
          <div className="mt-3 rounded-xl overflow-hidden border border-white/10 bg-black/50 p-3 sm:p-4">
            {deepDive.codeBlock.filename && (
              <div className="text-[11px] font-mono text-slate-400 mb-2 pb-1 border-b border-white/5">
                {deepDive.codeBlock.filename}
              </div>
            )}
            <pre className="text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed m-0">
              <code>{deepDive.codeBlock.code}</code>
            </pre>
            {deepDive.codeBlock.explanation && (
              <div className="mt-2 text-[11px] text-slate-400 font-sans">
                {deepDive.codeBlock.explanation[language]}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

// 9. CHAPTER SELF-REVIEW DIAGNOSTIC BLOCK (Textbook Checkpoints)
export const SelfReviewBlock: React.FC<{
  questions: SelfReviewItem[];
} & EditorialProps> = ({ questions, language, theme }) => {
  const [openIndexes, setOpenIndexes] = useState<Record<number, boolean>>({});

  const toggleAnswer = (idx: number) => {
    setOpenIndexes((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const isDark = theme === 'dark' || theme === 'midnight';
  const isSepia = theme === 'sepia';

  const cardBg = isSepia
    ? 'bg-[#F4E6CB] border-[#DFC9AA]'
    : isDark
    ? 'bg-slate-900/60 border-slate-800'
    : 'bg-white border-slate-200';

  return (
    <section aria-label="Self-Review Checkpoints" className="my-10 space-y-4 pt-4 border-t border-black/10 dark:border-white/10">
      <div className="flex items-center gap-2">
        <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 m-0">
          {language === 'en' ? 'Chapter Diagnostic Self-Review' : 'Câu Hỏi Tự Đánh Giá Kiến Thức Chương'}
        </h3>
      </div>

      <div className="space-y-3">
        {questions.map((item, idx) => {
          const isOpen = !!openIndexes[idx];
          return (
            <div
              key={idx}
              className={`rounded-2xl border ${cardBg} overflow-hidden transition-all`}
            >
              <button
                type="button"
                onClick={() => toggleAnswer(idx)}
                className="w-full text-left p-4 sm:p-4.5 flex items-start justify-between gap-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-md bg-blue-600/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="space-y-1">
                    <div className="text-xs sm:text-sm font-semibold font-reader text-slate-900 dark:text-white">
                      {renderInlineText(item.question[language])}
                    </div>
                    {item.hint && (
                      <div className="text-[11px] font-sans text-slate-500 italic">
                        {language === 'en' ? 'Hint: ' : 'Gợi ý: '} {item.hint[language]}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 pt-1 text-xs sm:text-sm font-sans text-slate-700 dark:text-slate-300 border-t border-black/5 dark:border-white/5 bg-black/[0.015] dark:bg-white/[0.015] space-y-2">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {language === 'en' ? 'Comprehensive Explanation' : 'Giải Thích Chi Tiết'}
                  </div>
                  <p className="m-0 leading-relaxed [overflow-wrap:anywhere]">
                    {renderInlineText(item.answer[language])}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

// 10. CHAPTER SUMMARY BLOCK (Editorial Synthesis)
export const ChapterSummaryBlock: React.FC<{
  summary: ChapterSummary;
} & EditorialProps> = ({ summary, language, theme }) => {
  const isDark = theme === 'dark' || theme === 'midnight';
  const isSepia = theme === 'sepia';

  const cardBg = isSepia
    ? 'bg-[#EFE0C4] border-[#DECAB0]'
    : isDark
    ? 'bg-slate-900 border-slate-800'
    : 'bg-slate-50 border-slate-200';

  return (
    <section aria-label="Chapter Synthesis" className={`my-10 p-5 sm:p-7 rounded-2xl border ${cardBg} space-y-6`}>
      <div className="flex items-center gap-2 pb-3 border-b border-black/10 dark:border-white/10">
        <BookmarkCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest opacity-60 block">
            {language === 'en' ? 'Chapter Synthesis' : 'Tổng Hợp Cốt Lõi Chương'}
          </span>
          <h3 className="text-base sm:text-lg font-bold font-reader text-slate-900 dark:text-white m-0">
            {language === 'en' ? 'Core Mental Models & Production Rules' : 'Mô Hình Tâm Trí & Quy Tắc Thực Chiến'}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Mental Models */}
        <div className="space-y-2.5">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {language === 'en' ? 'Mental Models' : 'Mô Hình Tư Duy'}
          </div>
          <ul className="space-y-2 list-none p-0 m-0 text-xs sm:text-sm font-sans">
            {summary.mentalModels[language].map((model, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-800 dark:text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2" />
                <span className="leading-relaxed [overflow-wrap:anywhere]">{renderInlineText(model)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Essential Rules */}
        <div className="space-y-2.5">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            {language === 'en' ? 'Essential Rules' : 'Quy Tắc Bất Biến'}
          </div>
          <ul className="space-y-2 list-none p-0 m-0 text-xs sm:text-sm font-sans">
            {summary.rules[language].map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-1" />
                <span className="leading-relaxed [overflow-wrap:anywhere]">{renderInlineText(rule)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Common Traps */}
      {summary.commonTraps[language].length > 0 && (
        <div className="pt-4 border-t border-black/10 dark:border-white/10 space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            {language === 'en' ? 'Common Traps to Avoid' : 'Cạm Bẫy Cần Tránh'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
            {summary.commonTraps[language].map((trap, idx) => (
              <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] text-slate-700 dark:text-slate-300">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed [overflow-wrap:anywhere]">{renderInlineText(trap)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final Takeaway */}
      <div className="pt-3 border-t border-black/10 dark:border-white/10 p-3.5 rounded-xl bg-blue-600/5 dark:bg-blue-500/10 border border-blue-500/20 text-xs sm:text-sm font-sans font-medium text-slate-900 dark:text-white">
        <span className="font-bold text-blue-600 dark:text-blue-400 mr-1.5">
          {language === 'en' ? 'Key Takeaway:' : 'Ghi Nhớ Quan Trọng:'}
        </span>
        <span>{renderInlineText(summary.takeaway[language])}</span>
      </div>
    </section>
  );
};

