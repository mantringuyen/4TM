import React, { useState, useMemo } from 'react';
import { Language } from '../../../types';
import {
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  FileText,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface PromptStructureAnalyzerToolProps {
  language: Language;
}

const SAMPLE_PROMPT = `You are an expert Senior Python and SQL Data Engineer.

Your task is to analyze user queries, detect potential bugs or anti-patterns, and provide clear code fixes with Big-O complexity explanations.

Constraints:
1. Always output valid JSON conforming to the schema.
2. Do not include markdown code block backticks inside the raw json output.
3. Keep explanations under 200 words.

Input Context:
Query: "SELECT * FROM users WHERE status = NULL;"

Example Output:
{
  "status": "error",
  "issue": "Comparison with NULL using = instead of IS NULL",
  "fix": "SELECT * FROM users WHERE status IS NULL;"
}`;

export const PromptStructureAnalyzerTool: React.FC<PromptStructureAnalyzerToolProps> = ({
  language,
}) => {
  const [promptText, setPromptText] = useState<string>(SAMPLE_PROMPT);
  const [copied, setCopied] = useState(false);

  const analysis = useMemo(() => {
    const raw = promptText.trim();
    if (!raw) {
      return {
        wordCount: 0,
        charCount: 0,
        estTokens: 0,
        signals: [],
        strengths: [],
        improvements: [],
      };
    }

    const wordCount = raw.split(/\s+/).length;
    const charCount = raw.length;
    const estTokens = Math.ceil(charCount / 3.8);

    // Detect structural signals
    const hasRole = /you are a|as a|role:|act as|system prompt/i.test(raw);
    const hasTask = /task:|goal:|objective:|your task is|instruction|analyze|generate|create|build/i.test(raw);
    const hasConstraints = /constraint|rule|do not|never|always|guideline|limit|must not/i.test(raw);
    const hasExamples = /example|few-shot|sample|input:|output:|for instance/i.test(raw);
    const hasOutputFormat = /json|schema|format:|xml|markdown|table|csv|yaml|structured/i.test(raw);

    const signals = [
      {
        id: 'role',
        label: { en: 'Persona / System Role', vi: 'Vai trò / Persona hệ thống' },
        detected: hasRole,
        detail: {
          en: hasRole ? 'Explicit persona detected' : 'Implicit or missing role definition',
          vi: hasRole ? 'Đã định nghĩa vai trò rõ ràng' : 'Chưa định nghĩa rõ vai trò',
        },
      },
      {
        id: 'task',
        label: { en: 'Core Task & Objective', vi: 'Nhiệm vụ & Mục tiêu cốt lõi' },
        detected: hasTask,
        detail: {
          en: hasTask ? 'Actionable objective specified' : 'Goal could be more directive',
          vi: hasTask ? 'Mục tiêu hành động rõ ràng' : 'Nhiệm vụ cần cụ thể hơn',
        },
      },
      {
        id: 'constraints',
        label: { en: 'Boundaries & Constraints', vi: 'Ràng buộc & Giới hạn phủ định' },
        detected: hasConstraints,
        detail: {
          en: hasConstraints ? 'Negative rules / limits defined' : 'Missing negative boundaries',
          vi: hasConstraints ? 'Đã có quy tắc giới hạn / phủ định' : 'Thiếu rào chắn giới hạn',
        },
      },
      {
        id: 'examples',
        label: { en: 'Few-Shot Input/Output Samples', vi: 'Ví dụ mẫu Few-Shot' },
        detected: hasExamples,
        detail: {
          en: hasExamples ? 'Exemplar patterns provided' : 'No few-shot demonstrations',
          vi: hasExamples ? 'Đã có ví dụ mẫu minh họa' : 'Chưa có ví dụ mẫu cụ thể',
        },
      },
      {
        id: 'schema',
        label: { en: 'Structured Output Format', vi: 'Quy chuẩn định dạng đầu ra' },
        detected: hasOutputFormat,
        detail: {
          en: hasOutputFormat ? 'Explicit schema / format requested' : 'Output format unspecified',
          vi: hasOutputFormat ? 'Đã yêu cầu định dạng rõ ràng' : 'Chưa chỉ định định dạng',
        },
      },
    ];

    const strengths: { en: string; vi: string }[] = [];
    const improvements: { en: string; vi: string }[] = [];

    if (hasRole) {
      strengths.push({
        en: 'Establishes domain expertise and tone using an explicit system persona.',
        vi: 'Thiết lập phạm vi chuyên môn và văn phong với vai trò hệ thống rõ ràng.',
      });
    } else {
      improvements.push({
        en: 'Define a specific persona (e.g. "You are a Senior SQL & Python Data Engineer").',
        vi: 'Bổ sung vai trò cụ thể (ví dụ: "Bạn là Kỹ sư Dữ liệu SQL & Python Cao cấp").',
      });
    }

    if (hasTask) {
      strengths.push({
        en: 'Provides a direct actionable instruction for the model.',
        vi: 'Chỉ định hành động và mục tiêu xử lý cụ thể cho mô hình.',
      });
    }

    if (hasConstraints) {
      strengths.push({
        en: 'Constrains model freedom with negative rules to minimize hallucination.',
        vi: 'Giới hạn tự do của mô hình với quy tắc phủ định giúp giảm thiểu ảo giác.',
      });
    } else {
      improvements.push({
        en: 'Add negative constraints (e.g. "Do not assume missing columns", "Never invent data").',
        vi: 'Bổ sung ràng buộc phủ định (ví dụ: "Không tự suy đoán dữ liệu thiếu", "Không bịa đặt").',
      });
    }

    if (hasExamples) {
      strengths.push({
        en: 'Includes few-shot demonstrations to anchor output formatting consistency.',
        vi: 'Có ví dụ mẫu (Few-shot) giúp cố định phong cách và cấu trúc đầu ra chuẩn xác.',
      });
    } else {
      improvements.push({
        en: 'Include 1-2 input/output examples to drastically improve adherence.',
        vi: 'Thêm 1-2 ví dụ mẫu input/output để tăng tối đa độ tin cậy của kết quả.',
      });
    }

    if (hasOutputFormat) {
      strengths.push({
        en: 'Specifies explicit target format (JSON / Markdown / Schema).',
        vi: 'Chỉ định định dạng đầu ra có cấu trúc rõ ràng (JSON / Markdown / Schema).',
      });
    } else {
      improvements.push({
        en: 'Specify the exact output schema or format required.',
        vi: 'Quy định định dạng đầu ra chính xác (ví dụ: JSON Schema hợp lệ).',
      });
    }

    return {
      wordCount,
      charCount,
      estTokens,
      signals,
      strengths,
      improvements,
    };
  }, [promptText]);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setPromptText(SAMPLE_PROMPT);
  };

  const handleClear = () => {
    setPromptText('');
  };

  return (
    <div className="space-y-6">
      {/* Prompt Input Area */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>{language === 'vi' ? 'Nội dung Prompt kỹ thuật' : 'LLM System / User Prompt'}</span>
          </label>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500">
            <span>{analysis.wordCount} words</span>
            <span>•</span>
            <span title="Approximate token count based on standard ~3.8 chars/token heuristic. Actual counts vary by tokenizer (e.g. tiktoken cl100k vs o200k vs SentencePiece).">
              ~{analysis.estTokens} tokens (approx.)
            </span>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!promptText.trim()}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer disabled:opacity-50"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (language === 'vi' ? 'Đã sao chép' : 'Copied') : (language === 'vi' ? 'Sao chép' : 'Copy')}</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              title={language === 'vi' ? 'Nạp lại mẫu' : 'Reset sample'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Mẫu chuẩn' : 'Sample'}</span>
            </button>
            {promptText && (
              <button
                type="button"
                onClick={handleClear}
                className="px-2 py-1 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
              >
                {language === 'vi' ? 'Xóa' : 'Clear'}
              </button>
            )}
          </div>
        </div>

        <textarea
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          rows={9}
          placeholder={language === 'vi' ? 'Dán nội dung Prompt vào đây để phân tích cấu trúc...' : 'Paste prompt instructions here to inspect structural quality signals...'}
          className="w-full font-mono text-xs sm:text-sm p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
        />
      </div>

      {/* Structural Quality Signals (Checklist) */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-500" />
          <span>{language === 'vi' ? 'Tín hiệu chất lượng cấu trúc phát hiện được' : 'Structural Quality Signals'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {analysis.signals.map((sig) => (
            <div
              key={sig.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                sig.detected
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono">{sig.label[language]}</span>
                {sig.detected ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                )}
              </div>
              <p className="text-[11px] mt-1 opacity-80">{sig.detail[language]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Potential Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Detected Strengths */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>{language === 'vi' ? 'Điểm mạnh nhận diện được' : 'Detected Strengths'}</span>
          </div>

          {analysis.strengths.length > 0 ? (
            <ul className="space-y-2">
              {analysis.strengths.map((str, idx) => (
                <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{str[language]}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400 italic">
              {language === 'vi' ? 'Chưa nhận diện điểm mạnh rõ ràng.' : 'No structural strengths detected yet.'}
            </p>
          )}
        </div>

        {/* Potential Improvements */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            <span>{language === 'vi' ? 'Khuyến nghị cải thiện' : 'Potential Improvements'}</span>
          </div>

          {analysis.improvements.length > 0 ? (
            <ul className="space-y-2">
              {analysis.improvements.map((imp, idx) => (
                <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <span className="text-amber-500 font-bold shrink-0">•</span>
                  <span>{imp[language]}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>
                {language === 'vi'
                  ? 'Tuyệt vời! Prompt có đầy đủ 5 trụ cột cấu trúc kỹ thuật.'
                  : 'Well-structured! Prompt satisfies all core prompt engineering signals.'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
