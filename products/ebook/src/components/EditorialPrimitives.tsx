import React from 'react';
import {
  Language,
  ReaderPaperTheme,
  CommonMistakeItem,
  ComparisonMatrix,
  ProcessDiagram,
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
} from 'lucide-react';

interface EditorialProps {
  language: Language;
  theme: ReaderPaperTheme;
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

// 1. KEY IDEA BLOCK
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
    <div className={`my-6 p-5 sm:p-6 rounded-2xl border ${containerBg} shadow-xs`}>
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className={`w-5 h-5 ${titleColor} shrink-0`} />
        <span className={`text-xs font-mono font-bold uppercase tracking-wider ${titleColor}`}>
          {language === 'en' ? 'Key Principle' : 'Nguyên Lý Cốt Lõi'}
        </span>
      </div>
      <p className="text-sm sm:text-base font-medium leading-relaxed m-0 leading-relaxed [overflow-wrap:anywhere]">
        {renderInlineText(idea[language])}
      </p>
    </div>
  );
};

// 2. WHEN TO USE & WHEN TO AVOID BLOCK
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
    <div className={`my-6 p-5 sm:p-6 rounded-2xl border ${cardBg} space-y-4 shadow-xs`}>
      {/* Use Cases */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 m-0">
            {language === 'en' ? 'When to Use This Pattern' : 'Khi Nào Nên Sử Dụng Pattern Này'}
          </h4>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm list-none p-0 m-0">
          {whenToUse.use[language].map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
              <span className="flex-1 [overflow-wrap:anywhere]">{renderInlineText(item)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Avoid Cases */}
      {whenToUse.avoid && whenToUse.avoid[language].length > 0 && (
        <div className="pt-3 border-t border-black/5 dark:border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 m-0">
              {language === 'en' ? 'When to Avoid / Trade-offs' : 'Khi Nào Không Nên Dùng & Đánh Đổi'}
            </h4>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm list-none p-0 m-0">
            {whenToUse.avoid[language].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-2" />
                <span className="flex-1 [overflow-wrap:anywhere]">{renderInlineText(item)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// 3. COMMON MISTAKE BLOCK
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
    <div className="my-6 space-y-4">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 m-0">
          {language === 'en' ? 'Common Pitfalls & Fixes' : 'Sai Lầm Thường Gặp & Cách Khắc Phục'}
        </h4>
      </div>

      <div className="space-y-4">
        {mistakes.map((item, idx) => (
          <div key={idx} className={`p-4 sm:p-5 rounded-2xl border ${boxBg} space-y-3`}>
            <div>
              <div className="text-xs font-bold text-rose-700 dark:text-rose-400 font-mono uppercase tracking-wide mb-1">
                {language === 'en' ? 'Mistake' : 'Lỗi Thường Gặp'}: {item.mistake[language]}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 m-0 leading-relaxed [overflow-wrap:anywhere]">
                <strong className="text-slate-900 dark:text-white">
                  {language === 'en' ? 'Why it happens: ' : 'Nguyên nhân: '}
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
                      <span>{language === 'en' ? 'Incorrect' : 'Không Nên'}</span>
                    </div>
                    <pre className="text-xs font-mono text-rose-800 dark:text-rose-300 overflow-x-auto m-0">
                      <code>{item.codeIncorrect}</code>
                    </pre>
                  </div>
                )}
                {item.codeCorrect && (
                  <div className="rounded-xl overflow-hidden border border-emerald-200 dark:border-emerald-900/50 bg-white dark:bg-slate-950 p-3">
                    <div className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase mb-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{language === 'en' ? 'Correct Approach' : 'Cách Giải Quyết Đúng'}</span>
                    </div>
                    <pre className="text-xs font-mono text-emerald-800 dark:text-emerald-300 overflow-x-auto m-0">
                      <code>{item.codeCorrect}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}

            <div className="text-xs text-emerald-800 dark:text-emerald-300 font-medium pt-1">
              <strong>{language === 'en' ? 'Recommended Solution: ' : 'Giải pháp đề xuất: '}</strong>
              {renderInlineText(item.solution[language])}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. COMPARISON MATRIX TABLE
export const ComparisonTableBlock: React.FC<{
  matrix: ComparisonMatrix;
} & EditorialProps> = ({ matrix, language, theme }) => {
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
    <div className="my-6 space-y-3">
      <div className="flex items-center gap-2">
        <Table className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white m-0">
          {language === 'en' ? 'Comparative Technical Analysis' : 'Bảng So Sánh Chi Tiết'}
        </h4>
      </div>

      <div className={`overflow-x-auto rounded-2xl border ${tableBorder}`}>
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className={headerBg}>
              {matrix.headers.map((h, idx) => (
                <th key={idx} className="p-3 sm:p-3.5 font-bold font-mono border-b border-inherit uppercase tracking-wider">
                  {h[language]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {matrix.rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                {row[language].map((cell, cIdx) => (
                  <td key={cIdx} className={`p-3 sm:p-3.5 ${cIdx === 0 ? 'font-bold font-mono text-blue-600 dark:text-blue-400' : ''} [overflow-wrap:anywhere]`}>
                    {renderInlineText(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 5. PROCESS DIAGRAM / FLOW BLOCK
export const ProcessDiagramBlock: React.FC<{
  diagram: ProcessDiagram;
} & EditorialProps> = ({ diagram, language, theme }) => {
  const isDark = theme === 'dark' || theme === 'midnight';
  const isSepia = theme === 'sepia';

  const cardBg = isSepia
    ? 'bg-[#F2E3C6] border-[#DFCAB0]'
    : isDark
    ? 'bg-slate-900 border-slate-800'
    : 'bg-slate-50 border-slate-200';

  return (
    <div className={`my-6 p-5 sm:p-6 rounded-2xl border ${cardBg} space-y-4 shadow-xs`}>
      <div className="flex items-center gap-2 mb-2">
        <Workflow className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white m-0">
          {diagram.title[language]}
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {diagram.steps.map((step) => (
          <div
            key={step.number}
            className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950/80 space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono text-xs font-extrabold flex items-center justify-center">
                {step.number}
              </span>
              <span className="text-[10px] font-mono opacity-50 uppercase">Step</span>
            </div>
            <h5 className="text-xs font-bold text-slate-900 dark:text-white m-0 [overflow-wrap:anywhere]">
              {step.label[language]}
            </h5>
            <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 m-0 leading-relaxed [overflow-wrap:anywhere]">
              {renderInlineText(step.description[language])}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// 6. PRACTICAL SCENARIO & BEST PRACTICES
export const BestPracticesBlock: React.FC<{
  practices: { en: string[]; vi: string[] };
} & EditorialProps> = ({ practices, language, theme }) => {
  return (
    <div className="my-6 p-5 sm:p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-3">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 m-0">
          {language === 'en' ? 'Industry Best Practices' : 'Khuyến Nghị Thực Tế Best Practices'}
        </h4>
      </div>

      <ul className="space-y-2 text-xs sm:text-sm list-none p-0 m-0">
        {practices[language].map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span className="text-slate-800 dark:text-slate-200 [overflow-wrap:anywhere]">
              {renderInlineText(item)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const PracticalScenarioBlock: React.FC<{
  scenario: { en: string; vi: string };
} & EditorialProps> = ({ scenario, language, theme }) => {
  return (
    <div className="my-6 p-5 sm:p-6 rounded-2xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-2">
      <div className="flex items-center gap-2">
        <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 m-0">
          {language === 'en' ? 'Real-World Production Scenario' : 'Kịch Bản Thực Tế Trong Production'}
        </h4>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed m-0 [overflow-wrap:anywhere]">
        {renderInlineText(scenario[language])}
      </p>
    </div>
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
          <div className="text-xs text-slate-700 dark:text-slate-300">
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
