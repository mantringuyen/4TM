import React, { useState, useMemo } from 'react';
import { Language } from '../../../types';
import {
  Code,
  Copy,
  Check,
  Sparkles,
  Layers,
  ArrowRight,
  Filter,
  RefreshCw,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface DaxExplainerToolProps {
  language: Language;
}

interface DaxPreset {
  name: string;
  category: string;
  code: string;
}

const DAX_PRESETS: DaxPreset[] = [
  {
    name: 'CALCULATE with Boolean Filter',
    category: 'Filter Context',
    code: `Total Sales Y2026 = 
CALCULATE(
    [Total Sales],
    'Date'[Year] = 2026,
    'Product'[Category] = "Electronics"
)`,
  },
  {
    name: 'CALCULATE with ALL Modifier',
    category: 'Context Modifiers',
    code: `% Sales Over All Products = 
DIVIDE(
    [Total Sales],
    CALCULATE([Total Sales], ALL('Product')),
    0
)`,
  },
  {
    name: 'SUMX Row Context & Transition',
    category: 'Iterators',
    code: `Weighted Profit = 
SUMX(
    FILTER(Sales, Sales[Qty] > 0),
    Sales[Qty] * (Sales[UnitPrice] - RELATED('Product'[CostPrice]))
)`,
  },
  {
    name: 'KEEPFILTERS Explicit Intersection',
    category: 'Context Modifiers',
    code: `Target Segment Sales = 
CALCULATE(
    [Total Sales],
    KEEPFILTERS('Customer'[Segment] = "VIP")
)`,
  },
];

export const DaxExplainerTool: React.FC<DaxExplainerToolProps> = ({ language }) => {
  const [daxCode, setDaxCode] = useState<string>(DAX_PRESETS[0].code);
  const [copied, setCopied] = useState(false);

  const analysis = useMemo(() => {
    const raw = daxCode.trim();
    const hasCalculate = /CALCULATE\s*\(/i.test(raw);
    const hasAll = /ALL\s*\(/i.test(raw);
    const hasKeepFilters = /KEEPFILTERS\s*\(/i.test(raw);
    const hasDivide = /DIVIDE\s*\(/i.test(raw);
    const hasFilter = /FILTER\s*\(/i.test(raw);
    const hasIterator = /SUMX|AVERAGEX|COUNTX|MINX|MAXX/i.test(raw);
    const hasRelated = /RELATED\s*\(/i.test(raw);

    const steps: { title: string; desc: { en: string; vi: string }; icon: 'calc' | 'filter' | 'context' | 'divide' }[] = [];

    if (hasCalculate) {
      steps.push({
        title: '1. Filter Context Modification (CALCULATE)',
        desc: {
          en: 'CALCULATE evaluates the specified filter arguments and modifies the initial filter context before evaluating the base measure.',
          vi: 'CALCULATE đánh giá các tham số lọc và biến đổi bối cảnh lọc (filter context) trước khi tính toán biểu thức gốc.',
        },
        icon: 'calc',
      });
    }

    if (hasAll) {
      steps.push({
        title: 'Context Removal (ALL)',
        desc: {
          en: 'ALL() removes any existing external filter on the specified table or columns, ignoring slicers and visual row/column headers.',
          vi: 'Hàm ALL() xóa bỏ toàn bộ bộ lọc bên ngoài đang áp dụng lên bảng/cột, bỏ qua slicer và tiêu đề hàng/cột của biểu đồ.',
        },
        icon: 'filter',
      });
    }

    if (hasKeepFilters) {
      steps.push({
        title: 'Preserve Visual Context (KEEPFILTERS)',
        desc: {
          en: 'KEEPFILTERS ensures the filter argument intersects with rather than overrides existing visual filters.',
          vi: 'KEEPFILTERS đảm bảo điều kiện lọc giao nhau (intersect) chứ không ghi đè lên bộ lọc hiện có của biểu đồ.',
        },
        icon: 'filter',
      });
    }

    if (hasIterator) {
      steps.push({
        title: 'Row Context Iteration (X-Functions)',
        desc: {
          en: 'Iterates row-by-row over the input table. If a measure is referenced inside, automatic Context Transition occurs (row context becomes filter context).',
          vi: 'Hàm lặp duyệt qua từng hàng của bảng. Nếu gọi measure bên trong, sẽ tự động diễn ra Chuyển đổi ngữ cảnh (Context Transition).',
        },
        icon: 'context',
      });
    }

    if (hasDivide) {
      steps.push({
        title: 'Safe Division (DIVIDE)',
        desc: {
          en: 'Guards against division-by-zero errors and automatically returns BLANK() or specified alternate result.',
          vi: 'Bảo vệ chống lỗi chia cho 0, tự động trả về BLANK() hoặc giá trị thay thế đã chỉ định.',
        },
        icon: 'divide',
      });
    }

    return {
      hasCalculate,
      hasAll,
      hasKeepFilters,
      hasIterator,
      hasRelated,
      steps,
    };
  }, [daxCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(daxCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* DAX Input & Presets */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <Code className="w-4 h-4 text-amber-500" />
            <span>{language === 'vi' ? 'Nhập biểu thức DAX Measure' : 'DAX Measure Code'}</span>
          </label>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-500">{language === 'vi' ? 'Mẫu DAX chuẩn:' : 'DAX Patterns:'}</span>
            <div className="flex flex-wrap gap-1">
              {DAX_PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setDaxCode(p.code)}
                  className="px-2 py-0.5 rounded-lg text-[11px] font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors cursor-pointer"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <textarea
          value={daxCode}
          onChange={(e) => setDaxCode(e.target.value)}
          rows={7}
          className="w-full font-mono text-xs sm:text-sm p-3.5 rounded-xl bg-slate-900 text-amber-400 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{language === 'vi' ? 'Phân tích tự động Filter Context, Row Context, Context Transition' : 'Analyzes Filter Context, Row Context & Context Transitions'}</span>
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (language === 'vi' ? 'Đã sao chép' : 'Copied!') : (language === 'vi' ? 'Sao chép mã' : 'Copy Code')}</span>
          </button>
        </div>
      </div>

      {/* Execution Flow Steps */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400 flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-500" />
          <span>{language === 'vi' ? 'Trình tự đánh giá & Chuyển đổi ngữ cảnh DAX' : 'Evaluation Order & Context Transitions'}</span>
        </h3>

        <div className="space-y-3">
          {analysis.steps.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 pl-7 leading-relaxed">
                {step.desc[language]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Core DAX Concept Badges */}
      <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs space-y-2">
        <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-bold font-mono">
          <HelpCircle className="w-4 h-4 text-amber-500" />
          <span>{language === 'vi' ? 'Nguyên lý cốt lõi: DAX khác biệt hoàn toàn với Excel Formula' : 'DAX Architectural Rule vs Excel Formulas:'}</span>
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px] sm:text-xs">
          {language === 'vi'
            ? 'Khác với công thức Excel hoạt động trên địa chỉ ô cụ thể (như A1, $B$10), DAX hoàn toàn không có khái niệm tọa độ ô mà tính toán dựa trên các cột và bảng trong mô hình dữ liệu. Row Context chỉ duyệt từng dòng của bảng (trong SUMX, FILTER) mà không tự động lọc bảng khác. Khi gọi một Measure bên trong Row Context, DAX tự động bao bọc bằng CALCULATE() và kích hoạt Context Transition để biến các giá trị dòng hiện tại thành Filter Context.'
            : 'Unlike Excel formulas which operate on explicit cell grid coordinates ($A$1, B2:C10), DAX does not have cell coordinates; it evaluates entirely over columnar tables, relationships, and dynamic Filter Context. Row Context iterates rows without filtering other tables. Calling a measure inside row context triggers Context Transition (an implicit CALCULATE) turning row attributes into active filter context.'}
        </p>
      </div>
    </div>
  );
};
