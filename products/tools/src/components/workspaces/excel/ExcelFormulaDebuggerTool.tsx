import React, { useState, useMemo } from 'react';
import { Language } from '../../../types';
import {
  AlertTriangle,
  CheckCircle2,
  Code,
  Copy,
  Check,
  Sparkles,
  Wrench,
  ArrowRight,
} from 'lucide-react';

interface ExcelFormulaDebuggerToolProps {
  language: Language;
}

interface BrokenFormulaSample {
  name: string;
  broken: string;
}

const BUGGY_SAMPLES: BrokenFormulaSample[] = [
  {
    name: 'Unclosed Parenthesis & Missing Comma',
    broken: '=IF(A1>10 "High", "Low"',
  },
  {
    name: 'VLOOKUP Index Out of Bounds',
    broken: '=VLOOKUP(A2, B:D, 5, FALSE)',
  },
  {
    name: 'SUMIFS Unequal Range Dimensions',
    broken: '=SUMIFS(A1:A100, B1:B50, ">0")',
  },
  {
    name: 'Comma vs Semicolon Delimiter Conflict',
    broken: '=SUM(A1;A10)',
  },
  {
    name: 'INDEX / MATCH Missing Match Type',
    broken: '=INDEX(A:A, MATCH(B1, C:C))',
  },
];

export const ExcelFormulaDebuggerTool: React.FC<ExcelFormulaDebuggerToolProps> = ({ language }) => {
  const [inputFormula, setInputFormula] = useState<string>('=IF(A1>10 "High", "Low"');
  const [copied, setCopied] = useState(false);

  const diagnosis = useMemo(() => {
    const raw = inputFormula.trim();
    const clean = raw.startsWith('=') ? raw.substring(1).trim() : raw;
    const errors: { title: { en: string; vi: string }; desc: { en: string; vi: string }; severity: 'error' | 'warning' }[] = [];
    let fixedFormula = raw.startsWith('=') ? raw : '=' + raw;

    // 1. Check parenthesis balance
    let openCount = 0;
    for (const char of clean) {
      if (char === '(') openCount++;
      if (char === ')') openCount--;
    }
    if (openCount > 0) {
      errors.push({
        title: { en: 'Unclosed Parentheses', vi: 'Thiếu dấu ngoặc đóng' },
        desc: {
          en: `Formula has ${openCount} unclosed opening parenthesis '('.`,
          vi: `Công thức đang thiếu ${openCount} dấu đóng ngoặc đơn ')'.`,
        },
        severity: 'error',
      });
      fixedFormula = fixedFormula + ')'.repeat(openCount);
    } else if (openCount < 0) {
      errors.push({
        title: { en: 'Extra Closing Parentheses', vi: 'Thừa dấu ngoặc đóng' },
        desc: {
          en: `Formula has ${Math.abs(openCount)} extra closing parenthesis ')'.`,
          vi: `Công thức đang thừa ${Math.abs(openCount)} dấu đóng ngoặc đơn.`,
        },
        severity: 'error',
      });
    }

    // 2. Missing comma after condition in IF
    if (/IF\([^,"]+["'][^,]+["']/i.test(clean)) {
      errors.push({
        title: { en: 'Missing Argument Separator (Comma)', vi: 'Thiếu dấu phẩy phân cách tham số' },
        desc: {
          en: 'Arguments inside function must be separated by commas (e.g. IF(condition, value_true, value_false)).',
          vi: 'Các tham số trong hàm phải ngăn cách bởi dấu phẩy (ví dụ: IF(điều_kiện, giá_trị_đúng, giá_trị_sai)).',
        },
        severity: 'error',
      });
      fixedFormula = fixedFormula.replace(/IF\(([^,"]+)\s+(["'][^,]+["'])/i, 'IF($1, $2');
    }

    // 3. Check VLOOKUP bounds
    const vlookupMatch = clean.match(/VLOOKUP\(\s*[^,]+\s*,\s*([A-Za-z]+):([A-Za-z]+)\s*,\s*(\d+)/i);
    if (vlookupMatch) {
      const colStart = vlookupMatch[1].toUpperCase().charCodeAt(0);
      const colEnd = vlookupMatch[2].toUpperCase().charCodeAt(0);
      const span = colEnd - colStart + 1;
      const targetIdx = parseInt(vlookupMatch[3], 10);
      if (targetIdx > span) {
        errors.push({
          title: { en: 'Column Index Exceeds Table Range (#REF!)', vi: 'Chỉ số cột vượt quá số cột của bảng (#REF!)' },
          desc: {
            en: `The table range only has ${span} column(s) (${vlookupMatch[1]}:${vlookupMatch[2]}), but requested index is ${targetIdx}. This triggers #REF!.`,
            vi: `Vùng bảng chỉ có ${span} cột (${vlookupMatch[1]}:${vlookupMatch[2]}), nhưng bạn yêu cầu lấy cột số ${targetIdx}. Sẽ gây lỗi #REF!.`,
          },
          severity: 'error',
        });
        fixedFormula = fixedFormula.replace(new RegExp(`,\\s*${targetIdx}\\s*,`), `, ${span},`);
      }
    }

    // 4. Unequal ranges in SUMIFS / COUNTIFS
    if (/SUMIFS\([^,]+,\s*[A-Z]+\d+:[A-Z]+(\d+),\s*[^,]+,\s*[A-Z]+\d+:[A-Z]+(\d+)/i.test(clean)) {
      const nums = clean.match(/:[A-Z]+(\d+)/gi);
      if (nums && nums.length >= 2) {
        const row1 = nums[0].replace(/[^0-9]/g, '');
        const row2 = nums[1].replace(/[^0-9]/g, '');
        if (row1 !== row2) {
          errors.push({
            title: { en: 'Range Dimension Mismatch (#VALUE!)', vi: 'Kích thước các dải ô không đồng nhất (#VALUE!)' },
            desc: {
              en: 'Criteria range and sum range must have identical start and end rows in SUMIFS.',
              vi: 'Dải ô tính tổng và các dải điều kiện trong SUMIFS bắt buộc phải có cùng số dòng từ đầu đến cuối.',
            },
            severity: 'error',
          });
        }
      }
    }

    // 5. Regional delimiter conflict (semicolon in SUM)
    if (/;\s*[A-Z]/i.test(clean) && !clean.includes(',')) {
      errors.push({
        title: { en: 'European Regional Delimiter Detected', vi: 'Xung đột dấu chấm phẩy phân cách vùng' },
        desc: {
          en: 'Found semicolon (;) as argument separator. If using standard US Excel settings, replace with comma (,). If using ranges, use colon (:).',
          vi: 'Phát hiện dấu chấm phẩy (;). Với chuẩn Excel quốc tế nên dùng dấu phẩy (,) hoặc dấu hai chấm (:) cho dải ô liên tục.',
        },
        severity: 'warning',
      });
      fixedFormula = fixedFormula.replace(/;/g, ':');
    }

    // 6. Missing match type in MATCH
    if (/MATCH\([^,]+,[^,)]+\)/i.test(clean)) {
      errors.push({
        title: { en: 'Missing Exact Match Parameter in MATCH()', vi: 'Thiếu tham số khớp chính xác trong MATCH()' },
        desc: {
          en: 'MATCH() without 3rd parameter defaults to approximate match (1). Add 0 for exact text lookup.',
          vi: 'Hàm MATCH() thiếu tham số thứ 3 sẽ mặc định tìm kiếm xấp xỉ (1). Cần thêm số 0 để tìm chính xác.',
        },
        severity: 'warning',
      });
      fixedFormula = fixedFormula.replace(/(MATCH\([^,]+,[^,)]+)\)/i, '$1, 0)');
    }

    return {
      errors,
      fixedFormula,
      isClean: errors.length === 0,
    };
  }, [inputFormula]);

  const handleApplyFix = () => {
    setInputFormula(diagnosis.fixedFormula);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(diagnosis.fixedFormula);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Input Box & Buggy Presets */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <Wrench className="w-4 h-4 text-rose-500" />
            <span>{language === 'vi' ? 'Công thức cần chẩn đoán lỗi' : 'Formula to Debug'}</span>
          </label>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-500">{language === 'vi' ? 'Mẫu lỗi phổ biến:' : 'Sample Bugs:'}</span>
            <div className="flex flex-wrap gap-1">
              {BUGGY_SAMPLES.map((s) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setInputFormula(s.broken)}
                  className="px-2 py-0.5 rounded-lg text-[11px] font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <input
          type="text"
          value={inputFormula}
          onChange={(e) => setInputFormula(e.target.value)}
          className="w-full font-mono text-sm p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500 font-semibold"
          placeholder="=VLOOKUP(A2, B:D, 5, FALSE)"
        />
      </div>

      {/* Diagnostics List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400">
          {language === 'vi' ? 'Kết quả chẩn đoán tĩnh' : 'Diagnostic Audit'}
        </h3>

        {diagnosis.isClean ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-800 dark:text-emerald-300 text-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <p className="font-bold text-sm">
                {language === 'vi' ? 'Không phát hiện lỗi cú pháp nghiêm trọng!' : 'No syntax errors detected!'}
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                {language === 'vi'
                  ? 'Dấu ngoặc cân bằng, tham số phân tách đúng quy chuẩn Excel.'
                  : 'Parentheses are balanced and argument separators adhere to Excel specifications.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {diagnosis.errors.map((err, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
                  err.severity === 'error'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
                }`}
              >
                <AlertTriangle
                  className={`w-5 h-5 shrink-0 mt-0.5 ${
                    err.severity === 'error' ? 'text-rose-500' : 'text-amber-500'
                  }`}
                />
                <div className="space-y-0.5">
                  <p className="font-bold text-sm">{err.title[language]}</p>
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                    {err.desc[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Suggested Fixed Formula */}
      {!diagnosis.isClean && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>{language === 'vi' ? 'Công thức đề xuất sửa đổi (Auto-Fix)' : 'Suggested Corrected Formula'}</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleApplyFix}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              >
                {language === 'vi' ? 'Áp dụng sửa ngay' : 'Apply Fix'}
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (language === 'vi' ? 'Đã sao chép' : 'Copied!') : (language === 'vi' ? 'Sao chép' : 'Copy')}</span>
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-sm sm:text-base font-bold overflow-x-auto border border-slate-800 shadow-inner">
            {diagnosis.fixedFormula}
          </div>
        </div>
      )}
    </div>
  );
};
