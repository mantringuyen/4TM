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
  CodeBlock,
  DefinitionSectionDetails,
  TipSectionDetails,
  GuideSectionDetails,
  ErrorSectionDetails,
  PracticeSectionDetails,
  PatternSectionDetails,
  GuideStepItem,
  TroubleshootingItem,
  PatternVariationItem,
} from '../types';
import { getReaderThemeTokens } from '../theme/readerTheme';
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
  CheckSquare,
  Square,
  Zap,
  BookOpen,
  Sparkles,
  Code2,
  ListChecks,
  FileText,
  Copy,
  Check,
  Binary,
  Flame,
} from 'lucide-react';

interface EditorialProps {
  language: Language;
  theme: ReaderPaperTheme;
  chapterNumber?: number;
  itemIndex?: number;
}

// Format inline code snippets wrapped in backticks
export function renderInlineText(text: string, theme: ReaderPaperTheme = 'default') {
  if (!text || !text.includes('`')) return text;

  const tokens = getReaderThemeTokens(theme);
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      const codeContent = part.slice(1, -1);
      return (
        <code
          key={index}
          className={`px-1.5 py-0.5 rounded text-[0.88em] font-mono font-semibold ${tokens.inlineCodeBg} ${tokens.inlineCodeText} border ${tokens.inlineCodeBorder} mx-0.5 break-words [overflow-wrap:anywhere]`}
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
  const tokens = getReaderThemeTokens(theme);

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
        {renderInlineText(idea[language], theme)}
      </p>
    </aside>
  );
};

// 2. WHEN TO USE & WHEN TO AVOID (Editorial Trade-off Matrix)
export const WhenToUseBlock: React.FC<{
  whenToUse: any;
} & EditorialProps> = ({ whenToUse, language, theme }) => {
  const tokens = getReaderThemeTokens(theme);
  const isDark = theme === 'dark' || theme === 'midnight';
  const isSepia = theme === 'sepia';

  const cardBg = isSepia
    ? 'bg-[#F2E3C6] border-[#DFCAB0]'
    : isDark
    ? 'bg-slate-900/80 border-slate-800'
    : 'bg-slate-50 border-slate-200/90';

  const greenHeading = isDark ? 'text-emerald-400' : isSepia ? 'text-[#1F5E30]' : 'text-emerald-700';
  const roseHeading = isDark ? 'text-rose-400' : isSepia ? 'text-[#9C2B2B]' : 'text-rose-700';

  return (
    <section
      aria-label="Usage Guidance"
      className={`my-8 p-5 sm:p-6 rounded-2xl border ${cardBg} space-y-5 shadow-xs`}
    >
      {/* Use Cases */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className={`w-4 h-4 ${greenHeading} shrink-0`} />
          <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${greenHeading} m-0`}>
            {language === 'en' ? 'When to Apply This Pattern' : 'Khi Nào Nên Áp Dụng Pattern Này'}
          </h4>
        </div>
        <ul className={`space-y-2 text-xs sm:text-sm list-none p-0 m-0 font-sans ${tokens.textSecondary}`}>
          {whenToUse.use[language].map((item: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
              <span className="flex-1 [overflow-wrap:anywhere] leading-relaxed">
                {renderInlineText(item, theme)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Avoid Cases */}
      {whenToUse.avoid && whenToUse.avoid[language].length > 0 && (
        <div className={`pt-4 border-t ${tokens.borderSubtle}`}>
          <div className="flex items-center gap-2 mb-3">
            <XCircle className={`w-4 h-4 ${roseHeading} shrink-0`} />
            <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${roseHeading} m-0`}>
              {language === 'en' ? 'When to Avoid & Architectural Trade-offs' : 'Khi Nào Tránh & Đánh Đổi Kiến Trúc'}
            </h4>
          </div>
          <ul className={`space-y-2 text-xs sm:text-sm list-none p-0 m-0 font-sans ${tokens.textSecondary}`}>
            {whenToUse.avoid[language].map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-2" />
                <span className="flex-1 [overflow-wrap:anywhere] leading-relaxed">
                  {renderInlineText(item, theme)}
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
  const tokens = getReaderThemeTokens(theme);

  const boxBg = isSepia
    ? 'bg-[#F7EAD0] border-[#E2D1AC]'
    : isDark
    ? 'bg-rose-950/20 border-rose-900/30'
    : 'bg-rose-50/50 border-rose-200/80';

  const headingText = isDark ? 'text-rose-400' : isSepia ? 'text-[#8C2A2A]' : 'text-rose-700';

  const codeBoxIncorrect = isSepia
    ? 'bg-[#FAF4EA] border-[#E8D4BE] text-[#7A2B2B]'
    : isDark
    ? 'bg-zinc-950 border-rose-900/50 text-rose-300'
    : 'bg-white border-rose-200 text-rose-800';

  const codeBoxCorrect = isSepia
    ? 'bg-[#FAF4EA] border-[#D6E6D2] text-[#1E5C2A]'
    : isDark
    ? 'bg-zinc-950 border-emerald-900/50 text-emerald-300'
    : 'bg-white border-emerald-200 text-emerald-800';

  return (
    <section aria-label="Common Pitfalls" className="my-8 space-y-4">
      <div className={`flex items-center gap-2 pb-1 border-b ${tokens.borderSubtle}`}>
        <AlertTriangle className={`w-4 h-4 ${headingText} shrink-0`} />
        <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${headingText} m-0`}>
          {language === 'en' ? 'Critical Pitfalls & Anti-Patterns' : 'Sai Lầm Thường Gặp & Anti-Patterns'}
        </h4>
      </div>

      <div className="space-y-4">
        {mistakes.map((item, idx) => (
          <div key={idx} className={`p-4 sm:p-5 rounded-2xl border ${boxBg} space-y-3`}>
            <div>
              <div className={`text-xs font-bold ${headingText} font-mono uppercase tracking-wide mb-1`}>
                {language === 'en' ? 'Pitfall' : 'Lỗi'} #{idx + 1}: {item.mistake[language]}
              </div>
              <p className={`text-xs sm:text-sm font-sans ${tokens.textSecondary} m-0 leading-relaxed [overflow-wrap:anywhere]`}>
                <strong className={tokens.textPrimary}>
                  {language === 'en' ? 'Root Cause: ' : 'Nguyên nhân: '}
                </strong>
                {renderInlineText(item.why[language], theme)}
              </p>
            </div>

            {/* Code Incorrect vs Correct Split */}
            {(item.codeIncorrect || item.codeCorrect) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {item.codeIncorrect && (
                  <div className={`rounded-xl overflow-hidden border p-3 ${codeBoxIncorrect}`}>
                    <div className="text-[10px] font-mono font-bold uppercase mb-1.5 flex items-center gap-1">
                      <XCircle className="w-3 h-3" />
                      <span>{language === 'en' ? 'Anti-Pattern (Avoid)' : 'Không Nên Dùng'}</span>
                    </div>
                    <pre className="text-xs font-mono overflow-x-auto m-0 leading-relaxed">
                      <code>{item.codeIncorrect}</code>
                    </pre>
                  </div>
                )}
                {item.codeCorrect && (
                  <div className={`rounded-xl overflow-hidden border p-3 ${codeBoxCorrect}`}>
                    <div className="text-[10px] font-mono font-bold uppercase mb-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{language === 'en' ? 'Production Solution' : 'Giải Pháp Chuẩn'}</span>
                    </div>
                    <pre className="text-xs font-mono overflow-x-auto m-0 leading-relaxed">
                      <code>{item.codeCorrect}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}

            <div className={`text-xs font-sans font-medium pt-1 ${isDark ? 'text-emerald-300' : isSepia ? 'text-[#1F5E30]' : 'text-emerald-800'}`}>
              <strong>{language === 'en' ? 'Prescribed Fix: ' : 'Cách sửa: '}</strong>
              {renderInlineText(item.solution[language], theme)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// 4. COMPARISON MATRIX TABLE (Publication Table Pattern)
export const ComparisonTableBlock: React.FC<{
  matrix: ComparisonMatrix;
} & EditorialProps> = ({ matrix, language, theme, chapterNumber = 1, itemIndex = 1 }) => {
  const isDark = theme === 'dark' || theme === 'midnight';
  const isSepia = theme === 'sepia';
  const tokens = getReaderThemeTokens(theme);

  const tableBorder = isSepia
    ? 'border-[#DFCAB0]'
    : isDark
    ? 'border-zinc-800'
    : 'border-slate-200';

  const headerBg = isSepia
    ? 'bg-[#EBDABF] text-[#423321]'
    : isDark
    ? 'bg-zinc-900 text-zinc-200'
    : 'bg-slate-100 text-slate-800';

  const rowAltBg = isSepia ? 'bg-black/[0.02]' : isDark ? 'bg-white/[0.02]' : 'bg-black/[0.015]';
  const rowHoverBg = isSepia ? 'hover:bg-black/5' : isDark ? 'hover:bg-white/5' : 'hover:bg-black/5';

  return (
    <figure className="my-8 space-y-2.5 w-full min-w-0">
      {/* Table Caption Heading */}
      <figcaption className={`flex items-center gap-2 text-xs font-mono ${tokens.textMuted}`}>
        <span className={`font-bold ${tokens.accentText}`}>
          Table {chapterNumber}.{itemIndex}
        </span>
        <span>—</span>
        <span className={`font-semibold ${tokens.textPrimary}`}>
          {language === 'en' ? 'Comparative Technical Analysis' : 'Bảng Phân Tích Kỹ Thuật So Sánh'}
        </span>
      </figcaption>

      {/* Publication Table Container */}
      <div className={`overflow-x-auto rounded-xl border ${tableBorder} shadow-xs`}>
        <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
          <thead>
            <tr className={headerBg}>
              {(Array.isArray(matrix.headers) ? matrix.headers : (matrix.headers as any)[language] || []).map((h: any, idx: number) => (
                <th
                  key={idx}
                  className="p-3 sm:p-3.5 font-bold font-mono border-b border-inherit uppercase tracking-wider text-[11px]"
                >
                  {typeof h === 'string' ? h : h[language]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`divide-y ${tokens.borderSubtle}`}>
            {matrix.rows.map((row, rIdx) => (
              <tr
                key={rIdx}
                className={`transition-colors ${rIdx % 2 === 1 ? rowAltBg : ''} ${rowHoverBg}`}
              >
                {row[language].map((cell: string, cIdx: number) => (
                  <td
                    key={cIdx}
                    className={`p-3 sm:p-3.5 ${
                      cIdx === 0
                        ? `font-bold font-mono ${tokens.accentText} whitespace-nowrap`
                        : tokens.textSecondary
                    } [overflow-wrap:anywhere]`}
                  >
                    {renderInlineText(cell, theme)}
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

// 5. PROCESS DIAGRAM BLOCK (Publication Figure Pattern)
export const ProcessDiagramBlock: React.FC<{
  diagram: ProcessDiagram;
} & EditorialProps> = ({ diagram, language, theme, chapterNumber = 1, itemIndex = 1 }) => {
  const isDark = theme === 'dark' || theme === 'midnight';
  const isSepia = theme === 'sepia';
  const tokens = getReaderThemeTokens(theme);

  const cardBg = isSepia
    ? 'bg-[#F2E3C6] border-[#DFCAB0]'
    : isDark
    ? 'bg-zinc-900 border-zinc-800'
    : 'bg-slate-50 border-slate-200';

  const stepCardBg = isSepia
    ? 'bg-[#FAF5EC] border-[#DECBB2]'
    : isDark
    ? 'bg-zinc-950/80 border-zinc-800'
    : 'bg-white border-slate-200';

  return (
    <figure className="my-8 space-y-2.5 w-full min-w-0">
      {/* Figure Title Caption */}
      <figcaption className={`flex items-center gap-2 text-xs font-mono ${tokens.textMuted}`}>
        <span className={`font-bold ${tokens.accentText}`}>
          Figure {chapterNumber}.{itemIndex}
        </span>
        <span>—</span>
        <span className={`font-semibold ${tokens.textPrimary}`}>
          {diagram.title[language]}
        </span>
      </figcaption>

      {/* Diagram Content Canvas */}
      <div className={`p-5 sm:p-6 rounded-2xl border ${cardBg} space-y-4 shadow-xs`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {diagram.steps.map((step) => (
            <div
              key={step.number || step.stepNumber}
              className={`p-4 rounded-xl border ${stepCardBg} space-y-1.5 relative overflow-hidden`}
            >
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-mono text-xs font-extrabold flex items-center justify-center">
                  {step.number || step.stepNumber}
                </span>
                <span className={`text-[10px] font-mono uppercase tracking-widest ${tokens.textMuted}`}>
                  Step {step.number || step.stepNumber}
                </span>
              </div>
              <h5 className={`text-xs font-bold font-sans ${tokens.textPrimary} m-0 [overflow-wrap:anywhere]`}>
                {(step.label || step.title)?.[language]}
              </h5>
              <p className={`text-[11px] sm:text-xs ${tokens.textSecondary} m-0 leading-relaxed [overflow-wrap:anywhere]`}>
                {renderInlineText(step.description[language], theme)}
              </p>
            </div>
          ))}
        </div>

        {/* Figure Note underneath */}
        <div className={`pt-2 border-t ${tokens.borderSubtle} flex items-center gap-1.5 text-[11px] font-mono ${tokens.textMuted}`}>
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
  const isDark = theme === 'dark' || theme === 'midnight';
  const isSepia = theme === 'sepia';
  const tokens = getReaderThemeTokens(theme);

  const containerBg = isSepia
    ? 'border-[#C8DFC4] bg-[#EDF5EC]/70 text-[#1F3D24]'
    : isDark
    ? 'border-emerald-900/40 bg-emerald-950/20 text-emerald-100'
    : 'border-emerald-200 bg-emerald-50/50 text-emerald-950';

  const headingColor = isDark ? 'text-emerald-300' : isSepia ? 'text-[#1F5E30]' : 'text-emerald-800';

  return (
    <aside
      aria-label="Best Practices"
      className={`my-8 p-5 sm:p-6 rounded-2xl border ${containerBg} space-y-3`}
    >
      <div className="flex items-center gap-2">
        <ShieldCheck className={`w-5 h-5 ${headingColor} shrink-0`} />
        <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${headingColor} m-0`}>
          {language === 'en' ? 'Engineering Best Practices' : 'Quy Tắc Thực Hành Kỹ Thuật'}
        </h4>
      </div>

      <ul className={`space-y-2 text-xs sm:text-sm list-none p-0 m-0 font-sans ${tokens.textSecondary}`}>
        {practices[language].map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span className="[overflow-wrap:anywhere] leading-relaxed">
              {renderInlineText(item, theme)}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export const PracticalScenarioBlock: React.FC<{
  scenario: any;
} & EditorialProps> = ({ scenario, language, theme }) => {
  const isDark = theme === 'dark' || theme === 'midnight';
  const isSepia = theme === 'sepia';
  const tokens = getReaderThemeTokens(theme);

  const containerBg = isSepia
    ? 'border-[#DFCAB0] bg-[#F4E8D4] text-[#332616]'
    : isDark
    ? 'border-teal-900/40 bg-teal-950/20 text-teal-100'
    : 'border-teal-200 bg-teal-50/50 text-teal-950';

  const headingColor = isDark ? 'text-teal-300' : isSepia ? 'text-[#8C531B]' : 'text-teal-800';

  return (
    <aside
      aria-label="Production Scenario"
      className={`my-8 p-5 sm:p-6 rounded-2xl border ${containerBg} space-y-2`}
    >
      <div className="flex items-center gap-2">
        <Target className={`w-5 h-5 ${headingColor} shrink-0`} />
        <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${headingColor} m-0`}>
          {language === 'en' ? 'Real-World Production Case' : 'Trường Hợp Ứng Dụng Trong Thực Tế'}
        </h4>
      </div>
      <p className={`text-xs sm:text-sm font-sans leading-relaxed m-0 ${tokens.textSecondary} [overflow-wrap:anywhere]`}>
        {renderInlineText(typeof scenario === 'string' ? scenario : scenario[language] || scenario.description?.[language], theme)}
      </p>
    </aside>
  );
};

// 7. RELATED CONCEPTS & STUDY LINK
export const RelatedConceptsBlock: React.FC<{
  concepts: any;
  studyLink?: { topicSlug: string; label: { en: string; vi: string } };
} & EditorialProps> = ({ concepts, studyLink, language, theme }) => {
  const tokens = getReaderThemeTokens(theme);

  return (
    <div className={`my-8 pt-6 border-t ${tokens.borderSubtle} space-y-4`}>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Compass className={`w-4 h-4 ${tokens.accentText} shrink-0`} />
          <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${tokens.textPrimary} m-0`}>
            {language === 'en' ? 'Related Technical Concepts' : 'Khái Niệm Liên Quan'}
          </h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {(concepts[language] || []).map((item: string, idx: number) => (
            <span
              key={idx}
              className={`px-3 py-1 rounded-xl ${tokens.highlightSurface} text-xs font-mono ${tokens.textSecondary} border ${tokens.borderSubtle}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {studyLink && (
        <div className={`p-4 rounded-xl border ${tokens.borderBase} ${tokens.cardSurface} flex items-center justify-between gap-4`}>
          <div className={`text-xs ${tokens.textSecondary} font-sans`}>
            <span className={`font-bold ${tokens.accentText} mr-1`}>
              {language === 'en' ? 'Practice in 4TM Study:' : 'Luyện tập tại 4TM Study:'}
            </span>
            <span>{studyLink.label[language]}</span>
          </div>
          <a
            href="https://study.4tm.io.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shrink-0 transition-colors"
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
  const tokens = getReaderThemeTokens(theme);

  const containerBg = isSepia
    ? 'bg-[#F2E5D0] border-[#DFCBB0]'
    : isDark
    ? 'bg-zinc-900/90 border-zinc-800'
    : 'bg-slate-50 border-slate-200';

  const headingText = isSepia
    ? 'text-[#2C2216]'
    : isDark
    ? 'text-zinc-100'
    : 'text-slate-900';

  const badgeText = isSepia
    ? 'text-[#8C531B]'
    : isDark
    ? 'text-teal-400'
    : 'text-teal-700';

  const iconBg = isSepia
    ? 'bg-[#E5D4B8] text-[#8C531B]'
    : isDark
    ? 'bg-teal-500/20 text-teal-400'
    : 'bg-teal-100 text-teal-700';

  return (
    <section
      aria-label="Technical Deep Dive"
      className={`my-8 p-5 sm:p-7 rounded-2xl border ${containerBg} shadow-xs space-y-4`}
    >
      <div className={`flex items-center justify-between gap-3 border-b ${tokens.borderSubtle} pb-3`}>
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${iconBg}`}>
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <span className={`text-[10px] font-mono uppercase tracking-widest ${badgeText} font-bold block`}>
              {deepDive.badge ? deepDive.badge[language] : language === 'en' ? 'Deep Dive • Architecture & Runtime' : 'Phân Tích Sâu • Kiến Trúc & Runtime'}
            </span>
            <h4 className={`text-sm sm:text-base font-bold font-reader ${headingText} m-0`}>
              {deepDive.title[language]}
            </h4>
          </div>
        </div>
      </div>

      <div className={`text-xs sm:text-sm font-sans leading-relaxed ${tokens.textSecondary} space-y-3 [overflow-wrap:anywhere]`}>
        <p className="m-0 leading-relaxed">
          {renderInlineText(deepDive.content[language], theme)}
        </p>

        {deepDive.codeBlock && (
          <div className={`mt-3 rounded-xl overflow-hidden border ${tokens.codeBorder} ${tokens.codePreBg} p-3 sm:p-4`}>
            {deepDive.codeBlock.filename && (
              <div className="text-[11px] font-mono text-slate-400 mb-2 pb-1 border-b border-white/10">
                {deepDive.codeBlock.filename}
              </div>
            )}
            <pre className={`text-xs font-mono ${tokens.codePreText} overflow-x-auto leading-relaxed m-0`}>
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
  const tokens = getReaderThemeTokens(theme);

  const toggleAnswer = (idx: number) => {
    setOpenIndexes((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <section aria-label="Self-Review Checkpoints" className={`my-10 space-y-4 pt-4 border-t ${tokens.borderSubtle}`}>
      <div className="flex items-center gap-2">
        <HelpCircle className={`w-4 h-4 ${tokens.accentText} shrink-0`} />
        <h3 className={`text-xs font-mono font-bold uppercase tracking-wider ${tokens.textPrimary} m-0`}>
          {language === 'en' ? 'Chapter Diagnostic Self-Review' : 'Câu Hỏi Tự Đánh Giá Kiến Thức Chương'}
        </h3>
      </div>

      <div className="space-y-3">
        {questions.map((item, idx) => {
          const isOpen = !!openIndexes[idx];
          return (
            <div
              key={idx}
              className={`rounded-2xl border ${tokens.borderBase} ${tokens.cardSurface} overflow-hidden transition-all`}
            >
              <button
                type="button"
                onClick={() => toggleAnswer(idx)}
                className={`w-full text-left p-4 sm:p-4.5 flex items-start justify-between gap-3 hover:${tokens.highlightSurface} cursor-pointer`}
              >
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-md bg-teal-600/10 text-teal-600 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="space-y-1">
                    <div className={`text-xs sm:text-sm font-semibold font-reader ${tokens.textPrimary}`}>
                      {renderInlineText(item.question[language], theme)}
                    </div>
                    {item.hint && (
                      <div className={`text-[11px] font-sans ${tokens.textMuted} italic`}>
                        {language === 'en' ? 'Hint: ' : 'Gợi ý: '} {item.hint[language]}
                      </div>
                    )}
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full ${tokens.highlightSurface} flex items-center justify-center shrink-0 mt-0.5`}>
                  {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </div>
              </button>

              {isOpen && (
                <div className={`px-4 pb-4 sm:px-4.5 sm:pb-4.5 pt-1 text-xs sm:text-sm font-sans ${tokens.textSecondary} border-t ${tokens.borderSubtle} ${tokens.innerSurface} space-y-2`}>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600">
                    {language === 'en' ? 'Comprehensive Explanation' : 'Giải Thích Chi Tiết'}
                  </div>
                  <p className="m-0 leading-relaxed [overflow-wrap:anywhere]">
                    {renderInlineText(item.answer[language], theme)}
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
  const tokens = getReaderThemeTokens(theme);

  return (
    <section aria-label="Chapter Synthesis" className={`my-10 p-5 sm:p-7 rounded-2xl border ${tokens.borderBase} ${tokens.cardSurface} space-y-6`}>
      <div className={`flex items-center gap-2 pb-3 border-b ${tokens.borderSubtle}`}>
        <BookmarkCheck className={`w-5 h-5 ${tokens.accentText} shrink-0`} />
        <div>
          <span className={`text-[10px] font-mono uppercase tracking-widest ${tokens.textMuted} block`}>
            {language === 'en' ? 'Chapter Synthesis' : 'Tổng Hợp Cốt Lõi Chương'}
          </span>
          <h3 className={`text-base sm:text-lg font-bold font-reader ${tokens.textPrimary} m-0`}>
            {language === 'en' ? 'Core Mental Models & Production Rules' : 'Mô Hình Tâm Trí & Quy Tắc Thực Chiến'}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Mental Models */}
        <div className="space-y-2.5">
          <div className={`text-xs font-mono font-bold uppercase tracking-wider ${tokens.accentText}`}>
            {language === 'en' ? 'Mental Models' : 'Mô Hình Tư Duy'}
          </div>
          <ul className="space-y-2 list-none p-0 m-0 text-xs sm:text-sm font-sans">
            {summary.mentalModels[language].map((model, idx) => (
              <li key={idx} className={`flex items-start gap-2 ${tokens.textSecondary}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-2" />
                <span className="leading-relaxed [overflow-wrap:anywhere]">{renderInlineText(model, theme)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Essential Rules */}
        <div className="space-y-2.5">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">
            {language === 'en' ? 'Essential Rules' : 'Quy Tắc Bất Biến'}
          </div>
          <ul className="space-y-2 list-none p-0 m-0 text-xs sm:text-sm font-sans">
            {summary.rules[language].map((rule, idx) => (
              <li key={idx} className={`flex items-start gap-2 ${tokens.textSecondary}`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-1" />
                <span className="leading-relaxed [overflow-wrap:anywhere]">{renderInlineText(rule, theme)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Common Traps */}
      {summary.commonTraps && summary.commonTraps[language]?.length > 0 && (
        <div className={`pt-4 border-t ${tokens.borderSubtle} space-y-2`}>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600">
            {language === 'en' ? 'Common Traps to Avoid' : 'Cạm Bẫy Cần Tránh'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
            {summary.commonTraps[language].map((trap, idx) => (
              <div key={idx} className={`flex items-start gap-2 p-2 rounded-lg ${tokens.innerSurface} border ${tokens.borderSubtle} ${tokens.textSecondary}`}>
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed [overflow-wrap:anywhere]">{renderInlineText(trap, theme)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final Takeaway */}
      <div className={`pt-3 border-t ${tokens.borderSubtle} p-3.5 rounded-xl ${tokens.accentBg} border ${tokens.accentBorder} text-xs sm:text-sm font-sans font-medium ${tokens.textPrimary}`}>
        <span className={`font-bold ${tokens.accentText} mr-1.5`}>
          {language === 'en' ? 'Key Takeaway:' : 'Ghi Nhớ Quan Trọng:'}
        </span>
        <span>{renderInlineText(summary.takeaway[language], theme)}</span>
      </div>
    </section>
  );
};

// 11. EDITORIAL CHECKLIST BLOCK (Interactive Verification Checkpoint)
export const EditorialChecklistBlock: React.FC<{
  title?: { en: string; vi: string };
  items: { en: string[]; vi: string[] };
} & EditorialProps> = ({ title, items, language, theme }) => {
  const [checkedState, setCheckedState] = useState<Record<number, boolean>>({});
  const tokens = getReaderThemeTokens(theme);

  const toggleItem = (index: number) => {
    setCheckedState((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const defaultTitle = language === 'en' ? 'Production Verification Checklist' : 'Danh Sách Kiểm Tra & Nghiệm Thu';

  return (
    <section aria-label="Editorial Checklist" className={`my-8 p-5 sm:p-6 rounded-2xl border ${tokens.borderBase} ${tokens.cardSurface} shadow-xs`}>
      <div className={`flex items-center gap-2 mb-4 pb-3 border-b ${tokens.borderSubtle}`}>
        <ListChecks className="w-4 h-4 text-emerald-600 shrink-0" />
        <h3 className={`text-xs font-mono font-bold uppercase tracking-wider ${tokens.textPrimary} m-0`}>
          {title ? title[language] : defaultTitle}
        </h3>
      </div>

      <ul className="space-y-2.5 list-none p-0 m-0 text-xs sm:text-sm font-sans">
        {items[language].map((item, idx) => {
          const isChecked = !!checkedState[idx];
          return (
            <li
              key={idx}
              onClick={() => toggleItem(idx)}
              className={`flex items-start gap-3 p-2.5 rounded-xl ${tokens.innerSurface} border ${tokens.borderSubtle} hover:${tokens.highlightSurface} cursor-pointer transition-colors select-none`}
            >
              <button
                type="button"
                className="mt-0.5 text-emerald-600 shrink-0"
                aria-label={isChecked ? 'Checked' : 'Unchecked'}
              >
                {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 opacity-50" />}
              </button>
              <span className={`leading-relaxed [overflow-wrap:anywhere] ${isChecked ? `line-through opacity-60 ${tokens.textMuted}` : `${tokens.textPrimary} font-medium`}`}>
                {renderInlineText(item, theme)}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

// 12. DEFINITIONS CARD BLOCK (Definitions Publication Type)
export const DefinitionCardBlock: React.FC<{
  details: DefinitionSectionDetails;
} & EditorialProps> = ({ details, language, theme }) => {
  const tokens = getReaderThemeTokens(theme);
  const isDark = theme === 'dark' || theme === 'midnight';
  const isSepia = theme === 'sepia';

  const mentalModelBg = isSepia
    ? 'bg-[#EBE0C8] border-[#DFCAB0] text-[#2C2216]'
    : isDark
    ? 'bg-teal-950/30 border-teal-900/50 text-teal-100'
    : 'bg-teal-50/60 border-teal-200/60 text-teal-950';

  return (
    <section aria-label="Formal Concept Definition" className={`my-8 p-5 sm:p-7 rounded-2xl border ${tokens.borderBase} ${tokens.cardSurface} space-y-6 shadow-xs`}>
      {/* Concept Header */}
      <div className={`flex flex-wrap items-center justify-between gap-2 pb-3 border-b ${tokens.borderSubtle}`}>
        <div className="flex items-center gap-2">
          <Layers className={`w-4 h-4 ${tokens.accentText} shrink-0`} />
          <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${tokens.accentText}`}>
            {language === 'en' ? 'Core Concept Definition' : 'Định Nghĩa Khái Niệm Cốt Lõi'}
          </span>
        </div>
        {details.term && (
          <span className={`px-2.5 py-0.5 rounded-full font-mono text-xs font-bold ${tokens.accentBg} ${tokens.accentText} border ${tokens.accentBorder}`}>
            {details.term[language]}
          </span>
        )}
      </div>

      {/* Formal Specification Definition */}
      {details.formalDefinition && (
        <div className={`relative pl-4 sm:pl-5 border-l-3 ${tokens.borderAccent} py-1`}>
          <div className={`text-[10px] font-mono font-bold uppercase tracking-widest ${tokens.textMuted} mb-1`}>
            {language === 'en' ? 'Formal Specification' : 'Quy Cách Chuẩn Xác'}
          </div>
          <p className={`text-sm sm:text-base font-reader font-medium leading-relaxed ${tokens.textPrimary} m-0 [overflow-wrap:anywhere]`}>
            {renderInlineText(details.formalDefinition[language], theme)}
          </p>
        </div>
      )}

      {/* Mental Model Visual Box */}
      {details.mentalModel && (
        <div className={`p-4 rounded-xl border ${mentalModelBg} space-y-1.5`}>
          <div className={`flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider ${tokens.accentText}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Mental Model' : 'Mô Hình Tư Duy'}</span>
          </div>
          <p className="text-xs sm:text-sm font-sans leading-relaxed m-0 [overflow-wrap:anywhere]">
            {renderInlineText(details.mentalModel[language], theme)}
          </p>
        </div>
      )}

      {/* Why It Matters */}
      {details.whyItMatters && (
        <div className={`space-y-1 text-xs sm:text-sm font-sans ${tokens.textSecondary}`}>
          <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tokens.textMuted}`}>
            {language === 'en' ? 'Why It Matters in Production' : 'Tầm Quan Trọng Trong Thực Tế'}
          </div>
          <p className="m-0 leading-relaxed [overflow-wrap:anywhere]">
            {renderInlineText(details.whyItMatters[language], theme)}
          </p>
        </div>
      )}

      {/* Common Misconception Debunked */}
      {details.commonMisconception && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-rose-600">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Common Misconception' : 'Hiểu Lầm Phổ Biến'}</span>
          </div>
          <p className={`text-xs sm:text-sm font-sans ${tokens.textSecondary} m-0 [overflow-wrap:anywhere]`}>
            {renderInlineText(details.commonMisconception[language], theme)}
          </p>
        </div>
      )}

      {/* Minimal Code Example */}
      {details.minimalExample && (
        <div className="space-y-1.5">
          <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tokens.accentText}`}>
            {language === 'en' ? 'Minimal Specification Example' : 'Ví Dụ Minh Họa Chuẩn'}
          </div>
          <div className={`rounded-xl overflow-hidden border ${tokens.codeBorder} ${tokens.codePreBg} ${tokens.codePreText} font-mono text-xs p-3.5`}>
            <pre className="m-0 overflow-x-auto">
              <code>{details.minimalExample.code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Quick Reference Points */}
      {details.quickReference && details.quickReference[language]?.length > 0 && (
        <div className={`pt-3 border-t ${tokens.borderSubtle} space-y-2`}>
          <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tokens.textMuted}`}>
            {language === 'en' ? 'Quick Reference Matrix' : 'Bảng Tra Cứu Nhanh'}
          </div>
          <div className="flex flex-wrap gap-2">
            {details.quickReference[language].map((refItem: string, idx: number) => (
              <span
                key={idx}
                className={`px-2.5 py-1 rounded-lg ${tokens.innerSurface} border ${tokens.borderSubtle} text-xs font-mono font-medium ${tokens.textPrimary}`}
              >
                {refItem}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

// 13. TIP INSIGHT BLOCK (Tips Publication Type)
export const TipInsightBlock: React.FC<{
  details: TipSectionDetails;
} & EditorialProps> = ({ details, language, theme }) => {
  const isDark = theme === 'dark' || theme === 'midnight';
  const isSepia = theme === 'sepia';
  const tokens = getReaderThemeTokens(theme);

  const cardBg = isSepia
    ? 'bg-[#F7EDD9] border-[#E2CFB4] text-[#2C2216]'
    : isDark
    ? 'bg-amber-950/20 border-amber-900/40 text-amber-100'
    : 'bg-amber-50/70 border-amber-200/90 text-amber-950';

  const insightBoxBg = isSepia
    ? 'bg-[#FAF4E8] border-amber-300/40 text-[#2C2216]'
    : isDark
    ? 'bg-zinc-950/80 border-amber-700/40 text-zinc-100'
    : 'bg-white border-amber-200 text-slate-900';

  return (
    <aside aria-label="Practical Tip and Insight" className={`my-8 p-5 sm:p-6 rounded-2xl border ${cardBg} space-y-5 shadow-xs`}>
      {/* Tip Header & Situation */}
      <div className={`space-y-1.5 pb-3 border-b ${tokens.borderSubtle}`}>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700">
            {language === 'en' ? 'Actionable Technique' : 'Kỹ Thuật Thực Chiến'}
          </span>
        </div>
        {details.problemSituation && (
          <div className={`text-xs font-sans ${tokens.textMuted} italic`}>
            <span className="font-bold not-italic mr-1">{language === 'en' ? 'Context:' : 'Bối Cảnh:'}</span>
            {renderInlineText(details.problemSituation[language], theme)}
          </div>
        )}
      </div>

      {/* Quick Actionable Insight */}
      {details.quickInsight && (
        <div className={`p-3.5 rounded-xl border ${insightBoxBg}`}>
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 mb-1">
            {language === 'en' ? 'Core Insight' : 'Bản Chất Vấn Đề'}
          </div>
          <p className="text-xs sm:text-sm font-reader font-semibold leading-relaxed m-0 [overflow-wrap:anywhere]">
            {renderInlineText(details.quickInsight[language], theme)}
          </p>
        </div>
      )}

      {/* Recommended Idiomatic Pattern */}
      {details.recommendedPattern && (
        <div className="space-y-1 text-xs sm:text-sm font-sans">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600">
            {language === 'en' ? 'Recommended Idiom' : 'Mẫu Code Khuyến Nghị'}
          </div>
          <p className={`m-0 leading-relaxed ${tokens.textSecondary} [overflow-wrap:anywhere]`}>
            {renderInlineText(details.recommendedPattern[language], theme)}
          </p>
        </div>
      )}

      {/* Why It Works (Runtime Under the Hood) */}
      {details.whyItWorks && (
        <div className={`space-y-1 text-xs sm:text-sm font-sans ${tokens.textSecondary}`}>
          <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tokens.textMuted}`}>
            {language === 'en' ? 'Why It Works (Mechanics)' : 'Cơ Chế Hoạt Động'}
          </div>
          <p className="m-0 leading-relaxed [overflow-wrap:anywhere]">
            {renderInlineText(details.whyItWorks[language], theme)}
          </p>
        </div>
      )}

      {/* Working Code Example */}
      {details.workingExample && (
        <div className="space-y-1.5">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700">
            {language === 'en' ? 'Working Code Technique' : 'Mã Minh Họa Kỹ Thuật'}
          </div>
          <div className={`rounded-xl overflow-hidden border ${tokens.codeBorder} ${tokens.codePreBg} ${tokens.codePreText} font-mono text-xs p-3.5`}>
            <pre className="m-0 overflow-x-auto">
              <code>{details.workingExample.code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Pitfall / Limitation */}
      {details.pitfallOrLimitation && (
        <div className={`p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-sans ${tokens.textSecondary}`}>
          <span className="font-bold text-rose-600 mr-1 font-mono uppercase text-[10px]">
            {language === 'en' ? 'Limitation:' : 'Hạn Chế:'}
          </span>
          {renderInlineText(details.pitfallOrLimitation[language], theme)}
        </div>
      )}

      {/* Quick Takeaway Rule */}
      {details.quickTakeaway && (
        <div className={`pt-2 border-t ${tokens.borderSubtle} text-xs font-sans font-medium text-amber-800`}>
          <span className="font-bold mr-1">{language === 'en' ? 'Takeaway:' : 'Ghi nhớ:'}</span>
          {renderInlineText(details.quickTakeaway[language], theme)}
        </div>
      )}
    </aside>
  );
};

// 14. GUIDE STEP WORKFLOW BLOCK (Practical Guides Publication Type)
export const GuideStepWorkflowBlock: React.FC<{
  details: GuideSectionDetails;
} & EditorialProps> = ({ details, language, theme }) => {
  const isDark = theme === 'dark' || theme === 'midnight';
  const isSepia = theme === 'sepia';
  const tokens = getReaderThemeTokens(theme);

  const cardBg = isSepia
    ? 'bg-[#F5E8D1] border-[#DFCBAE]'
    : isDark
    ? 'bg-zinc-900/80 border-zinc-800'
    : 'bg-white border-slate-200';

  const goalBg = isSepia
    ? 'bg-[#EDF5EC]/70 border-emerald-700/30 text-[#1F3D24]'
    : isDark
    ? 'bg-emerald-950/30 border-emerald-900/40 text-emerald-100'
    : 'bg-emerald-50/70 border-emerald-200 text-emerald-950';

  return (
    <section aria-label="Step-by-Step Procedure" className="my-8 space-y-6">
      {/* Goal & Target Outcome */}
      {details.goal && (
        <div className={`p-4 rounded-2xl border ${goalBg} space-y-1`}>
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600">
            <Target className="w-4 h-4" />
            <span>{language === 'en' ? 'Target Objective' : 'Mục Tiêu Đạt Được'}</span>
          </div>
          <p className="text-sm font-sans font-medium m-0 [overflow-wrap:anywhere]">
            {renderInlineText(details.goal[language], theme)}
          </p>
        </div>
      )}

      {/* Prerequisites & Tooling */}
      {details.prerequisites && details.prerequisites[language]?.length > 0 && (
        <div className={`p-4 rounded-2xl ${tokens.innerSurface} border ${tokens.borderSubtle} space-y-2`}>
          <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tokens.textMuted}`}>
            {language === 'en' ? 'Prerequisites & Setup' : 'Yêu Cầu Tiền Đề & Thiết Lập'}
          </div>
          <ul className={`space-y-1.5 list-none p-0 m-0 text-xs sm:text-sm font-sans ${tokens.textSecondary}`}>
            {details.prerequisites[language].map((prereq: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{renderInlineText(prereq, theme)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Procedural Steps */}
      {details.steps && details.steps.length > 0 && (
        <div className="space-y-4">
          <div className={`text-xs font-mono font-bold uppercase tracking-wider ${tokens.textPrimary} flex items-center gap-2`}>
            <Workflow className="w-4 h-4 text-emerald-600" />
            <span>{language === 'en' ? 'Step-by-Step Procedure' : 'Quy Trình Thực Hiện Từng Bước'}</span>
          </div>

          <div className="space-y-3">
            {details.steps.map((step, idx) => (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl border ${cardBg} space-y-3 transition-all`}
              >
                {/* Step Header */}
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    {step.stepNumber || idx + 1}
                  </span>
                  <div className="space-y-1 flex-1">
                    <h4 className={`text-sm sm:text-base font-bold ${tokens.textPrimary} m-0 font-reader`}>
                      {step.title[language]}
                    </h4>
                    <p className={`text-xs sm:text-sm ${tokens.textSecondary} leading-relaxed m-0 font-sans [overflow-wrap:anywhere]`}>
                      {renderInlineText(step.instruction[language], theme)}
                    </p>
                  </div>
                </div>

                {/* Optional Step Code Block */}
                {step.codeBlock && (
                  <div className="pt-2">
                    <div className={`rounded-xl overflow-hidden border ${tokens.codeBorder} ${tokens.codePreBg} ${tokens.codePreText} font-mono text-xs p-3`}>
                      <pre className="m-0 overflow-x-auto">
                        <code>{step.codeBlock.code}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {/* Optional Expected Output */}
                {step.expectedOutput && (
                  <div className={`p-2.5 rounded-xl ${tokens.innerSurface} border ${tokens.borderSubtle} text-xs font-mono text-emerald-600`}>
                    <span className="opacity-70 mr-1 font-bold">{language === 'en' ? 'Output:' : 'Kết quả:'}</span>
                    {step.expectedOutput[language]}
                  </div>
                )}

                {/* Optional Warning / Tip */}
                {step.warningOrNote && (
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-sans text-amber-800">
                    <span className="font-bold mr-1">{language === 'en' ? 'Note:' : 'Lưu ý:'}</span>
                    {renderInlineText(step.warningOrNote[language], theme)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Verification Checkpoint */}
      {details.verification && (
        <div className={`p-4 rounded-2xl ${tokens.accentBg} border ${tokens.accentBorder} space-y-1 text-xs sm:text-sm font-sans`}>
          <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tokens.accentText} flex items-center gap-1.5`}>
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Verification & Acceptance' : 'Tiêu Chí Nghiệm Thu'}</span>
          </div>
          <p className={`m-0 ${tokens.textPrimary} [overflow-wrap:anywhere]`}>
            {renderInlineText(details.verification[language], theme)}
          </p>
        </div>
      )}
    </section>
  );
};

// 15. TROUBLESHOOTING MATRIX BLOCK (Practical Guides)
export const TroubleshootingMatrixBlock: React.FC<{
  items: TroubleshootingItem[];
} & EditorialProps> = ({ items, language, theme }) => {
  const isDark = theme === 'dark' || theme === 'midnight';
  const isSepia = theme === 'sepia';
  const tokens = getReaderThemeTokens(theme);

  const cardBg = isSepia
    ? 'bg-[#F3E5CD] border-[#DEC9AB]'
    : isDark
    ? 'bg-zinc-900/80 border-zinc-800'
    : 'bg-white border-slate-200';

  const fixBg = isSepia
    ? 'bg-[#EDF5EC]/80 border-emerald-600/30 text-[#1F3D24]'
    : isDark
    ? 'bg-emerald-950/30 border-emerald-900/40 text-emerald-200'
    : 'bg-emerald-50/80 border-emerald-200 text-emerald-900';

  return (
    <section aria-label="Troubleshooting Matrix" className="my-8 space-y-4">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <h3 className={`text-xs font-mono font-bold uppercase tracking-wider ${tokens.textPrimary} m-0`}>
          {language === 'en' ? 'Troubleshooting & Diagnostic Matrix' : 'Ma Trận Chẩn Đoán & Sửa Sự Cố'}
        </h3>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className={`p-4 rounded-2xl border ${cardBg} space-y-2 text-xs sm:text-sm font-sans`}>
            {/* Symptom */}
            <div className="font-bold text-rose-600 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-2" />
              <span>{renderInlineText(item.symptom[language], theme)}</span>
            </div>

            {/* Cause */}
            <div className={`pl-3.5 ${tokens.textMuted} text-xs`}>
              <span className="font-mono font-bold uppercase mr-1 opacity-70">{language === 'en' ? 'Cause:' : 'Nguyên nhân:'}</span>
              {renderInlineText(item.cause[language], theme)}
            </div>

            {/* Fix */}
            <div className={`pl-3.5 font-medium p-2 rounded-xl border ${fixBg}`}>
              <span className="font-mono font-bold uppercase mr-1">{language === 'en' ? 'Prescribed Fix:' : 'Cách xử lý:'}</span>
              {renderInlineText(item.fix[language], theme)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// 16. ERROR DIAGNOSIS BLOCK (Common Errors Publication Type)
export const ErrorDiagnosisBlock: React.FC<{
  details: ErrorSectionDetails;
} & EditorialProps> = ({ details, language, theme }) => {
  const isDark = theme === 'dark' || theme === 'midnight';
  const isSepia = theme === 'sepia';
  const tokens = getReaderThemeTokens(theme);

  const cardBg = isSepia
    ? 'bg-[#F6E8D5] border-[#DFC9B2] text-[#2C2216]'
    : isDark
    ? 'bg-rose-950/20 border-rose-900/40 text-zinc-200'
    : 'bg-rose-50/70 border-rose-200/90 text-slate-900';

  const rootCauseBg = isSepia
    ? 'bg-[#FAF3E8] border-rose-300/40 text-[#2C2216]'
    : isDark
    ? 'bg-zinc-950/80 border-rose-900/50 text-zinc-100'
    : 'bg-white border-rose-200 text-slate-900';

  return (
    <section aria-label="Error Diagnosis and Fix" className={`my-8 p-5 sm:p-7 rounded-2xl border ${cardBg} space-y-6 shadow-xs`}>
      {/* Error Signature */}
      <div className={`flex flex-wrap items-center justify-between gap-2 pb-3 border-b ${tokens.borderSubtle}`}>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-700">
            {language === 'en' ? 'Diagnostic Case Study' : 'Chẩn Đoán Lỗi Thực Tế'}
          </span>
        </div>
        {details.errorSignature && (
          <span className="px-2.5 py-0.5 rounded-full font-mono text-xs font-bold bg-rose-500/10 text-rose-700 border border-rose-500/20">
            {details.errorSignature[language]}
          </span>
        )}
      </div>

      {/* Observed Symptoms */}
      {details.symptoms && details.symptoms[language]?.length > 0 && (
        <div className="space-y-1.5">
          <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tokens.textMuted}`}>
            {language === 'en' ? 'Observed Symptoms' : 'Triệu Chứng Xuất Hiện'}
          </div>
          <ul className={`space-y-1 list-none p-0 m-0 text-xs sm:text-sm font-sans ${tokens.textSecondary}`}>
            {details.symptoms[language].map((symptom: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-2" />
                <span>{renderInlineText(symptom, theme)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Minimal Reproduction Code */}
      {details.minimalReproduction && (
        <div className="space-y-1.5">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-600">
            {language === 'en' ? 'Minimal Bug Reproduction' : 'Mã Tái Hiện Lỗi'}
          </div>
          <div className={`rounded-xl overflow-hidden border ${tokens.codeBorder} ${tokens.codePreBg} ${tokens.codePreText} font-mono text-xs p-3`}>
            <pre className="m-0 overflow-x-auto">
              <code>{details.minimalReproduction.code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Why It Happens (Root Cause Spec) */}
      {details.whyItHappens && (
        <div className={`p-4 rounded-xl border ${rootCauseBg} space-y-1`}>
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-700">
            {language === 'en' ? 'Root Cause Analysis' : 'Phân Tích Nguyên Nhân Gốc'}
          </div>
          <p className="text-xs sm:text-sm font-reader leading-relaxed m-0 [overflow-wrap:anywhere]">
            {renderInlineText(details.whyItHappens[language], theme)}
          </p>
        </div>
      )}

      {/* Correct Verified Fix */}
      {details.correctFix && (
        <div className="space-y-1.5">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Verified Prescribed Fix' : 'Giải Pháp Sửa Chuẩn'}</span>
          </div>
          <div className={`rounded-xl overflow-hidden border ${tokens.codeBorder} ${tokens.codePreBg} ${tokens.codePreText} font-mono text-xs p-3`}>
            <pre className="m-0 overflow-x-auto">
              <code>{details.correctFix.code}</code>
            </pre>
          </div>
          {details.fixExplanation && (
            <p className={`text-xs ${tokens.textMuted} italic m-0 pt-1`}>
              {renderInlineText(details.fixExplanation[language], theme)}
            </p>
          )}
        </div>
      )}

      {/* Prevention Rules */}
      {details.preventionRules && details.preventionRules[language]?.length > 0 && (
        <div className={`pt-3 border-t ${tokens.borderSubtle} space-y-2`}>
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600">
            {language === 'en' ? 'Prevention & Defensive Rules' : 'Quy Tắc Phòng Ngừa Dài Lâu'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
            {details.preventionRules[language].map((rule: string, idx: number) => (
              <div key={idx} className={`flex items-start gap-2 p-2 rounded-xl ${tokens.innerSurface} border ${tokens.borderSubtle} ${tokens.textSecondary}`}>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{renderInlineText(rule, theme)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

// 17. BEST PRACTICE COMPARISON BLOCK (Best Practices Publication Type)
export const BestPracticeComparisonBlock: React.FC<{
  details: PracticeSectionDetails;
} & EditorialProps> = ({ details, language, theme }) => {
  const tokens = getReaderThemeTokens(theme);

  return (
    <section aria-label="Engineering Best Practice" className={`my-8 p-5 sm:p-7 rounded-2xl border ${tokens.borderBase} ${tokens.cardSurface} space-y-6 shadow-xs`}>
      {/* Header */}
      <div className={`flex items-center gap-2 pb-3 border-b ${tokens.borderSubtle}`}>
        <ShieldCheck className={`w-4 h-4 ${tokens.accentText} shrink-0`} />
        <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${tokens.accentText}`}>
          {language === 'en' ? 'Production Standard & Trade-offs' : 'Tiêu Chuẩn Sản Xuất & Đánh Đổi'}
        </span>
      </div>

      {/* Recommended Practice & Context */}
      {details.recommendedPractice && (
        <div className="space-y-1">
          <h4 className={`text-base sm:text-lg font-bold font-reader ${tokens.textPrimary} m-0`}>
            {renderInlineText(details.recommendedPractice[language], theme)}
          </h4>
          {details.context && (
            <p className={`text-xs sm:text-sm font-sans ${tokens.textMuted} leading-relaxed m-0 [overflow-wrap:anywhere]`}>
              {renderInlineText(details.context[language], theme)}
            </p>
          )}
        </div>
      )}

      {/* Why It Matters */}
      {details.whyItMatters && (
        <div className={`p-3.5 rounded-xl ${tokens.accentBg} border ${tokens.accentBorder} space-y-1`}>
          <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tokens.accentText}`}>
            {language === 'en' ? 'Architectural Justification' : 'Cơ Sở Kiến Trúc & Hiệu Năng'}
          </div>
          <p className={`text-xs sm:text-sm font-sans ${tokens.textPrimary} m-0 [overflow-wrap:anywhere]`}>
            {renderInlineText(details.whyItMatters[language], theme)}
          </p>
        </div>
      )}

      {/* Comparative Code Blocks: Good vs Risky */}
      {(details.goodExample || details.riskyExample) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Risky Example */}
          {details.riskyExample && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-600">
                <XCircle className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Anti-Pattern (Avoid)' : 'Cách Làm Rủi Ro (Tránh)'}</span>
              </div>
              <div className={`rounded-xl overflow-hidden border ${tokens.codeBorder} ${tokens.codePreBg} ${tokens.codePreText} font-mono text-xs p-3`}>
                <pre className="m-0 overflow-x-auto">
                  <code>{details.riskyExample.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Good Example */}
          {details.goodExample && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Recommended (Use)' : 'Chuẩn Khuyến Nghị (Nên Dùng)'}</span>
              </div>
              <div className={`rounded-xl overflow-hidden border ${tokens.codeBorder} ${tokens.codePreBg} ${tokens.codePreText} font-mono text-xs p-3`}>
                <pre className="m-0 overflow-x-auto">
                  <code>{details.goodExample.code}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Trade-offs & Costs */}
      {details.tradeOffs && details.tradeOffs[language]?.length > 0 && (
        <div className="space-y-2">
          <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tokens.textMuted}`}>
            {language === 'en' ? 'Explicit Trade-Offs & Costs' : 'Đánh Đổi & Chi Phí'}
          </div>
          <ul className={`space-y-1 list-none p-0 m-0 text-xs sm:text-sm font-sans ${tokens.textSecondary}`}>
            {details.tradeOffs[language].map((to: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="opacity-60 font-mono">•</span>
                <span>{renderInlineText(to, theme)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Exceptions */}
      {details.exceptions && details.exceptions[language]?.length > 0 && (
        <div className={`p-3 rounded-xl ${tokens.innerSurface} border ${tokens.borderSubtle} text-xs font-sans ${tokens.textSecondary}`}>
          <span className={`font-bold font-mono uppercase text-[10px] mr-1 ${tokens.textMuted}`}>
            {language === 'en' ? 'Permitted Exceptions:' : 'Ngoại lệ:'}
          </span>
          {details.exceptions[language].join('; ')}
        </div>
      )}
    </section>
  );
};

// 18. PATTERN RECIPE BLOCK (Patterns / Recipes Publication Type)
export const PatternRecipeBlock: React.FC<{
  details: PatternSectionDetails;
} & EditorialProps> = ({ details, language, theme }) => {
  const tokens = getReaderThemeTokens(theme);

  return (
    <section aria-label="Architecture Pattern Recipe" className={`my-8 p-5 sm:p-7 rounded-2xl border ${tokens.borderBase} ${tokens.cardSurface} space-y-6 shadow-xs`}>
      {/* Header */}
      <div className={`flex items-center gap-2 pb-3 border-b ${tokens.borderSubtle}`}>
        <Binary className={`w-4 h-4 ${tokens.accentText} shrink-0`} />
        <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${tokens.accentText}`}>
          {language === 'en' ? 'Architectural Pattern Recipe' : 'Mẫu Kiến Trúc & Công Thức Thiết Kế'}
        </span>
      </div>

      {/* Problem & Context */}
      <div className="space-y-2">
        {details.problem && (
          <div className="space-y-1">
            <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tokens.textMuted}`}>
              {language === 'en' ? 'Target Problem' : 'Vấn Đề Cần Giải Quyết'}
            </div>
            <p className={`text-sm font-reader font-medium leading-relaxed ${tokens.textPrimary} m-0 [overflow-wrap:anywhere]`}>
              {renderInlineText(details.problem[language], theme)}
            </p>
          </div>
        )}

        {details.solutionOverview && (
          <div className={`p-3.5 rounded-xl ${tokens.accentBg} border ${tokens.accentBorder}`}>
            <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tokens.accentText} mb-1`}>
              {language === 'en' ? 'Pattern Blueprint' : 'Bản Thiết Kế Giải Pháp'}
            </div>
            <p className={`text-xs sm:text-sm font-sans ${tokens.textPrimary} leading-relaxed m-0 [overflow-wrap:anywhere]`}>
              {renderInlineText(details.solutionOverview[language], theme)}
            </p>
          </div>
        )}
      </div>

      {/* Implementation Code */}
      {details.implementation && (
        <div className="space-y-1.5">
          <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${tokens.textMuted}`}>
            {language === 'en' ? 'Canonical Implementation' : 'Triển Khai Mẫu Chuẩn Mực'}
          </div>
          <div className={`rounded-xl overflow-hidden border ${tokens.codeBorder} ${tokens.codePreBg} ${tokens.codePreText} font-mono text-xs p-3.5`}>
            <pre className="m-0 overflow-x-auto">
              <code>{details.implementation.code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Variations */}
      {details.variations && details.variations.length > 0 && (
        <div className="space-y-3">
          <div className={`text-xs font-mono font-bold uppercase tracking-wider ${tokens.textPrimary}`}>
            {language === 'en' ? 'Production Variations' : 'Các Biến Thể Thực Tế'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {details.variations.map((variation, idx) => (
              <div key={idx} className={`p-3.5 rounded-xl ${tokens.innerSurface} border ${tokens.borderSubtle} space-y-1.5`}>
                <div className={`font-bold text-xs font-reader ${tokens.textPrimary}`}>
                  {variation.name[language]}
                </div>
                <p className={`text-xs font-sans ${tokens.textSecondary} m-0 [overflow-wrap:anywhere]`}>
                  {renderInlineText(variation.description[language], theme)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gotchas & When Not to Use */}
      {(details.gotchas || details.whenNotToUse) && (
        <div className={`pt-3 border-t ${tokens.borderSubtle} grid grid-cols-1 sm:grid-cols-2 gap-3`}>
          {details.gotchas && details.gotchas[language]?.length > 0 && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-sans space-y-1">
              <div className="font-mono font-bold uppercase text-[10px] text-amber-700">
                {language === 'en' ? 'Gotchas & Edge Cases' : 'Cạm Bẫy Cần Lưu Ý'}
              </div>
              <ul className={`space-y-1 list-none p-0 m-0 ${tokens.textSecondary}`}>
                {details.gotchas[language].map((g: string, i: number) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="opacity-60">•</span>
                    <span>{renderInlineText(g, theme)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {details.whenNotToUse && details.whenNotToUse[language]?.length > 0 && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-sans space-y-1">
              <div className="font-mono font-bold uppercase text-[10px] text-rose-700">
                {language === 'en' ? 'When NOT to Use' : 'Khi Nào KHÔNG Nên Dùng'}
              </div>
              <ul className={`space-y-1 list-none p-0 m-0 ${tokens.textSecondary}`}>
                {details.whenNotToUse[language].map((w: string, i: number) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="opacity-60">•</span>
                    <span>{renderInlineText(w, theme)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
