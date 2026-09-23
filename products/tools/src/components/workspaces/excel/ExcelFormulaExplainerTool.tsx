import React, { useState, useMemo } from 'react';
import { Language } from '../../../types';
import {
  Code,
  Copy,
  Check,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Layers,
  ArrowRight,
  Info,
} from 'lucide-react';

interface ExcelFormulaExplainerToolProps {
  language: Language;
}

interface FormulaPreset {
  name: string;
  formula: string;
  category: string;
}

const PRESETS: FormulaPreset[] = [
  {
    name: 'XLOOKUP Exact with Fallback',
    formula: '=XLOOKUP(A2, Products!$A$2:$A$100, Products!$C$2:$C$100, "Item Not Found", 0)',
    category: 'Lookup',
  },
  {
    name: 'Nested INDEX / MATCH',
    formula: '=INDEX(Employees!$E$2:$E$500, MATCH(1, (Employees!$A$2:$A$500=B2)*(Employees!$B$2:$B$500=C2), 0))',
    category: 'Lookup',
  },
  {
    name: 'SUMIFS Multi-Condition',
    formula: '=SUMIFS(Sales[Amount], Sales[Region], "North", Sales[Date], ">=2026-01-01", Sales[Status], "<>Cancelled")',
    category: 'Math & Stats',
  },
  {
    name: 'Dynamic Nested IF / IFS',
    formula: '=IFS(Score>=90, "Distinction", Score>=75, "Merit", Score>=50, "Pass", TRUE, "Needs Improvement")',
    category: 'Logic',
  },
  {
    name: 'DATEDIF Age / Seniority',
    formula: '=DATEDIF(BirthDate, TODAY(), "Y") & " years, " & DATEDIF(BirthDate, TODAY(), "YM") & " months"',
    category: 'Date & Time',
  },
  {
    name: 'TEXTJOIN Unique Filter',
    formula: '=TEXTJOIN(", ", TRUE, UNIQUE(FILTER(Customers[City], Customers[Country]="Vietnam")))',
    category: 'Modern Dynamic Array',
  },
];

interface FunctionDoc {
  name: string;
  purpose: { en: string; vi: string };
  syntax: string;
  arguments: { name: string; desc: { en: string; vi: string }; optional?: boolean }[];
  pitfalls: { en: string; vi: string }[];
}

const EXCEL_FUNCTIONS: Record<string, FunctionDoc> = {
  XLOOKUP: {
    name: 'XLOOKUP',
    purpose: {
      en: 'Modern lookup function that searches a range/array and returns the matching item from another array without requiring sorted data or left-to-right ordering.',
      vi: 'Hàm tra cứu hiện đại tìm kiếm trong một mảng và trả về phần tử tương ứng từ mảng khác mà không cần sắp xếp hay giới hạn chiều tra cứu.',
    },
    syntax: 'XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])',
    arguments: [
      { name: 'lookup_value', desc: { en: 'The value to search for', vi: 'Giá trị cần tìm' } },
      { name: 'lookup_array', desc: { en: 'The range/array to search in', vi: 'Dải ô/mảng để tìm kiếm' } },
      { name: 'return_array', desc: { en: 'The range/array to return data from', vi: 'Dải ô/mảng chứa kết quả cần lấy' } },
      { name: 'if_not_found', desc: { en: 'Text or value returned if no match is found (avoids #N/A)', vi: 'Giá trị trả về nếu không tìm thấy (tránh lỗi #N/A)' }, optional: true },
      { name: 'match_mode', desc: { en: '0=Exact, -1=Exact or next smaller, 1=Exact or next larger, 2=Wildcard', vi: '0=Chính xác, -1=Nhỏ hơn gần nhất, 1=Lớn hơn gần nhất, 2=Ký tự đại diện' }, optional: true },
    ],
    pitfalls: [
      { en: 'Lookup and return arrays must have identical length, otherwise #VALUE! error occurs.', vi: 'Dải tra cứu và dải kết quả phải có cùng số dòng/cột, nếu không sẽ báo lỗi #VALUE!.' },
      { en: 'Make sure ranges use absolute references ($A$2:$A$100) if copying the formula downwards.', vi: 'Hãy khóa địa chỉ tuyệt đối ($A$2:$A$100) nếu bạn kéo công thức xuống dưới.' },
    ],
  },
  INDEX: {
    name: 'INDEX',
    purpose: {
      en: 'Returns a value or reference of the cell at the intersection of a particular row and column in a given range.',
      vi: 'Trả về giá trị hoặc tham chiếu của ô tại giao điểm của hàng và cột xác định trong một vùng.',
    },
    syntax: 'INDEX(array, row_num, [column_num])',
    arguments: [
      { name: 'array', desc: { en: 'Range of cells or table column', vi: 'Vùng ô hoặc cột bảng cần lấy giá trị' } },
      { name: 'row_num', desc: { en: 'Row position in the array to return', vi: 'Vị trí hàng trong mảng' } },
      { name: 'column_num', desc: { en: 'Column position in the array (optional for 1D arrays)', vi: 'Vị trí cột trong mảng (tùy chọn)' }, optional: true },
    ],
    pitfalls: [
      { en: 'If row_num exceeds array bounds, it throws #REF! error.', vi: 'Nếu row_num vượt quá số hàng của mảng, Excel sẽ báo lỗi #REF!.' },
    ],
  },
  MATCH: {
    name: 'MATCH',
    purpose: {
      en: 'Searches for a specified item in a range of cells and returns the relative position of that item.',
      vi: 'Tìm kiếm một giá trị trong một vùng ô và trả về vị trí tương đối của giá trị đó.',
    },
    syntax: 'MATCH(lookup_value, lookup_array, [match_type])',
    arguments: [
      { name: 'lookup_value', desc: { en: 'The value you want to match', vi: 'Giá trị muốn so khớp' } },
      { name: 'lookup_array', desc: { en: 'A 1D range of cells containing possible lookup values', vi: 'Vùng 1 chiều chứa các giá trị tra cứu' } },
      { name: 'match_type', desc: { en: '0=Exact match, 1=Less than (sorted ASC), -1=Greater than (sorted DESC)', vi: '0=Khớp chính xác, 1=Nhỏ hơn (tăng dần), -1=Lớn hơn (giảm dần)' }, optional: true },
    ],
    pitfalls: [
      { en: 'Always supply 0 for match_type when looking for exact text matches, or it defaults to 1 requiring sorted arrays.', vi: 'Luôn chỉ định 0 cho match_type khi tìm chính xác, nếu không mặc định là 1 và yêu cầu dữ liệu phải sắp xếp tăng dần.' },
    ],
  },
  SUMIFS: {
    name: 'SUMIFS',
    purpose: {
      en: 'Adds all of its arguments that meet multiple criteria across different ranges.',
      vi: 'Tính tổng các giá trị trong một dải ô thỏa mãn đồng thời nhiều điều kiện.',
    },
    syntax: 'SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)',
    arguments: [
      { name: 'sum_range', desc: { en: 'The range of cells to sum', vi: 'Dải ô cần tính tổng' } },
      { name: 'criteria_range1', desc: { en: 'The first range to evaluate', vi: 'Dải ô điều kiện 1' } },
      { name: 'criteria1', desc: { en: 'The condition to match (e.g. ">100", "North")', vi: 'Điều kiện cần so sánh (ví dụ: ">100", "North")' } },
    ],
    pitfalls: [
      { en: 'Unlike SUMIF, SUMIFS has sum_range as the FIRST argument.', vi: 'Khác với SUMIF, hàm SUMIFS đặt sum_range ở vị trí ĐẦU TIÊN.' },
      { en: 'All criteria ranges must have the same dimension as sum_range, or #VALUE! is returned.', vi: 'Tất cả các dải điều kiện phải có cùng kích thước với sum_range, nếu không sẽ lỗi #VALUE!.' },
    ],
  },
  IFS: {
    name: 'IFS',
    purpose: {
      en: 'Checks whether one or more conditions are met and returns a value that corresponds to the first TRUE condition.',
      vi: 'Kiểm tra nhiều điều kiện tuần tự và trả về giá trị ứng với điều kiện TRUE đầu tiên.',
    },
    syntax: 'IFS(logical_test1, value_if_true1, [logical_test2, value_if_true2], ...)',
    arguments: [
      { name: 'logical_test1', desc: { en: 'First logical condition', vi: 'Điều kiện logic 1' } },
      { name: 'value_if_true1', desc: { en: 'Result if test 1 is TRUE', vi: 'Kết quả trả về nếu điều kiện 1 TRUE' } },
    ],
    pitfalls: [
      { en: 'Use TRUE as the final condition to specify a default/else fallback, otherwise #N/A will be returned if no condition is met.', vi: 'Dùng TRUE ở điều kiện cuối cùng để tạo giá trị mặc định, tránh lỗi #N/A khi không điều kiện nào khớp.' },
    ],
  },
  FILTER: {
    name: 'FILTER',
    purpose: {
      en: 'Filters a range of data based on criteria you define, returning a dynamic array that automatically spills.',
      vi: 'Lọc một vùng dữ liệu dựa trên điều kiện và trả về mảng động tự động tràn (spill).',
    },
    syntax: 'FILTER(array, include, [if_empty])',
    arguments: [
      { name: 'array', desc: { en: 'The array or range to filter', vi: 'Mảng hoặc vùng ô cần lọc' } },
      { name: 'include', desc: { en: 'A boolean array where TRUE rows/cols are included', vi: 'Mảng logic TRUE/FALSE chỉ định hàng nào được lấy' } },
      { name: 'if_empty', desc: { en: 'Value returned if no items match the filter', vi: 'Giá trị trả về nếu không có hàng nào khớp' }, optional: true },
    ],
    pitfalls: [
      { en: 'Ensure there is sufficient empty space below and to the right of the cell, otherwise #SPILL! error occurs.', vi: 'Đảm bảo có đủ ô trống phía dưới và bên phải, nếu không sẽ gặp lỗi #SPILL!.' },
    ],
  },
  TEXTSPLIT: {
    name: 'TEXTSPLIT',
    purpose: {
      en: 'Splits text strings by using column and row delimiters into an array across columns and rows.',
      vi: 'Tách chuỗi văn bản bằng các ký tự phân cách cột và hàng thành một mảng tự động tràn (spill).',
    },
    syntax: 'TEXTSPLIT(text, col_delimiter, [row_delimiter], [ignore_empty], [match_mode], [pad_with])',
    arguments: [
      { name: 'text', desc: { en: 'The text to split', vi: 'Chuỗi văn bản cần tách' } },
      { name: 'col_delimiter', desc: { en: 'Text character to split text across columns', vi: 'Ký tự phân cách để tách sang các cột kế tiếp' } },
      { name: 'row_delimiter', desc: { en: 'Text character to split text down rows', vi: 'Ký tự phân cách để tách xuống các hàng kế tiếp' }, optional: true },
      { name: 'ignore_empty', desc: { en: 'TRUE to ignore consecutive delimiters', vi: 'TRUE để bỏ qua các ký tự phân cách liên tiếp' }, optional: true },
    ],
    pitfalls: [
      { en: 'Available only in Excel 365 and Excel for the Web; requires dynamic array support.', vi: 'Chỉ hỗ trợ trong Excel 365 và Excel cho Web; yêu cầu tính năng mảng động.' },
      { en: 'Spill range must be clear of existing content or it returns #SPILL! error.', vi: 'Vùng tràn phải không bị ô nào che khuất nội dung, nếu không trả về lỗi #SPILL!.' },
    ],
  },
  EOMONTH: {
    name: 'EOMONTH',
    purpose: {
      en: 'Returns the serial number for the last day of the month that is the indicated number of months before or after start_date.',
      vi: 'Trả về ngày cuối cùng của tháng trước hoặc sau ngày bắt đầu một số tháng xác định.',
    },
    syntax: 'EOMONTH(start_date, months)',
    arguments: [
      { name: 'start_date', desc: { en: 'A date representing the starting date', vi: 'Ngày bắt đầu hợp lệ trong Excel' } },
      { name: 'months', desc: { en: 'Number of months before (negative) or after (positive)', vi: 'Số tháng trước (âm) hoặc sau (dương) ngày bắt đầu' } },
    ],
    pitfalls: [
      { en: 'If start_date is not a valid date string or serial number, returns #VALUE!.', vi: 'Nếu start_date không phải là ngày hợp lệ hoặc số sê-ri ngày, hàm trả về lỗi #VALUE!.' },
      { en: 'Output is an Excel date serial number; ensure the cell is formatted as Date.', vi: 'Kết quả trả về là số sê-ri; cần định dạng ô theo kiểu Date (Ngày/Tháng/Năm).' },
    ],
  },
  VLOOKUP: {
    name: 'VLOOKUP',
    purpose: {
      en: 'Looks for a value in the leftmost column of a table, and then returns a value in the same row from a column you specify.',
      vi: 'Tìm một giá trị ở cột đầu tiên bên trái của bảng và trả về giá trị cùng hàng ở cột chỉ định.',
    },
    syntax: 'VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])',
    arguments: [
      { name: 'lookup_value', desc: { en: 'The value to find in the first column', vi: 'Giá trị cần tìm ở cột đầu tiên' } },
      { name: 'table_array', desc: { en: 'The range of cells that contains the data', vi: 'Bảng dữ liệu chứa cột tra cứu và cột kết quả' } },
      { name: 'col_index_num', desc: { en: 'The column number in table_array from which to return a value', vi: 'Số thứ tự cột trong bảng để lấy giá trị' } },
      { name: 'range_lookup', desc: { en: 'TRUE for approximate match, FALSE for exact match', vi: 'TRUE tìm xấp xỉ, FALSE tìm chính xác tuyệt đối' }, optional: true },
    ],
    pitfalls: [
      { en: 'Cannot look to the left. If lookup value is not in column 1, use XLOOKUP or INDEX/MATCH.', vi: 'Không tra cứu được sang trái. Nếu giá trị tra cứu không ở cột 1, hãy dùng XLOOKUP hoặc INDEX/MATCH.' },
      { en: 'Always provide FALSE (or 0) for exact text matches.', vi: 'Luôn cung cấp tham số FALSE (hoặc 0) khi tra cứu văn bản chính xác.' },
    ],
  },
};

const STANDARD_EXCEL_FUNCTIONS = new Set([
  'SUM', 'AVERAGE', 'COUNT', 'COUNTA', 'COUNTBLANK', 'MAX', 'MIN', 'ROUND', 'ROUNDUP', 'ROUNDDOWN',
  'INT', 'MOD', 'ABS', 'IF', 'AND', 'OR', 'NOT', 'IFERROR', 'IFNA', 'CONCAT', 'CONCATENATE',
  'TEXTJOIN', 'LEFT', 'RIGHT', 'MID', 'LEN', 'TRIM', 'UPPER', 'LOWER', 'PROPER', 'SUBSTITUTE',
  'REPLACE', 'FIND', 'SEARCH', 'DATE', 'DAY', 'MONTH', 'YEAR', 'TODAY', 'NOW', 'DATEDIF',
  'EDATE', 'WORKDAY', 'NETWORKDAYS', 'LOOKUP', 'HLOOKUP', 'CHOOSE', 'SWITCH', 'UNIQUE', 'SORT',
  'SORTBY', 'SEQUENCE', 'RANDARRAY', 'CHOOSEROWS', 'CHOOSECOLS', 'TAKE', 'DROP', 'TOCOL', 'TOROW'
]);

export const ExcelFormulaExplainerTool: React.FC<ExcelFormulaExplainerToolProps> = ({ language }) => {
  const [formula, setFormula] = useState<string>(
    '=XLOOKUP(A2, Products!$A$2:$A$100, Products!$C$2:$C$100, "Item Not Found", 0)'
  );
  const [copied, setCopied] = useState(false);

  const parsedAnalysis = useMemo(() => {
    const raw = formula.trim();
    const clean = raw.startsWith('=') ? raw.substring(1).trim() : raw;

    // Detect functions used
    const detectedFuncs: string[] = [];
    const words = clean.match(/[A-Z0-9_.]+(?=\()/gi) || [];
    words.forEach((w: string) => {
      const upper = w.toUpperCase();
      if (!detectedFuncs.includes(upper)) {
        detectedFuncs.push(upper);
      }
    });

    // Detect references ($A$1, Sheet1!A1:B10, Table[Col])
    const sheetRefs = clean.match(/[A-Za-z0-9_]+!\$?[A-Za-z]+\$?\d+(?::\$?[A-Za-z]+\$?\d+)?/g) || [];
    const tableRefs = clean.match(/[A-Za-z0-9_]+\[[A-Za-z0-9_ ,@]+\]/g) || [];
    const cellRefs = clean.match(/(?<![!A-Za-z0-9_])\$?[A-Z]+\$?\d+(?::\$?[A-Z]+\$?\d+)?/g) || [];

    // Check potential issues
    const issues: { type: 'warning' | 'info'; text: { en: string; vi: string } }[] = [];
    
    // Check balanced parentheses
    let openCount = 0;
    for (const char of clean) {
      if (char === '(') openCount++;
      if (char === ')') openCount--;
    }
    if (openCount !== 0) {
      issues.push({
        type: 'warning',
        text: {
          en: `Parentheses mismatch: ${Math.abs(openCount)} unclosed/extra parentheses.`,
          vi: `Lỗi đóng mở ngoặc: thừa/thiếu ${Math.abs(openCount)} dấu ngoặc đơn.`,
        },
      });
    }

    if (clean.includes('VLOOKUP') && !clean.includes('FALSE') && !clean.includes(', 0') && !clean.includes(',0')) {
      issues.push({
        type: 'warning',
        text: {
          en: 'VLOOKUP without FALSE/0 defaults to approximate match. Use exact match mode (FALSE/0) to prevent incorrect lookups.',
          vi: 'Hàm VLOOKUP thiếu tham số FALSE/0 sẽ mặc định tìm kiếm xấp xỉ. Nên thêm FALSE/0 để tránh lấy sai dữ liệu.',
        },
      });
    }

    if (clean.includes('SUMIF(') || clean.includes('COUNTIF(')) {
      issues.push({
        type: 'info',
        text: {
          en: 'Consider using SUMIFS / COUNTIFS instead of single-condition versions for greater scalability and consistency.',
          vi: 'Nên cân nhắc dùng SUMIFS / COUNTIFS thay vì bản đơn để dễ mở rộng nhiều điều kiện hơn.',
        },
      });
    }

    return {
      clean,
      detectedFuncs,
      sheetRefs,
      tableRefs,
      cellRefs: Array.from(new Set(cellRefs)),
      issues,
    };
  }, [formula]);

  const handleCopyExplanation = () => {
    const text = `Formula: ${formula}\nFunctions Used: ${parsedAnalysis.detectedFuncs.join(', ')}\n\nAnalysis:\n${
      language === 'vi' ? 'Công thức tra cứu/tính toán phân tích bởi 4TM Tools' : 'Analyzed with 4TM Developer & Data Toolkit'
    }`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Formula Input & Presets */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <Code className="w-4 h-4 text-emerald-500" />
            <span>{language === 'vi' ? 'Nhập công thức Excel' : 'Excel Formula Input'}</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500">{language === 'vi' ? 'Mẫu ví dụ:' : 'Presets:'}</span>
            <div className="flex flex-wrap gap-1">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setFormula(p.formula)}
                  className="px-2 py-0.5 rounded-lg text-[11px] font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
            rows={3}
            className="w-full font-mono text-sm p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
            placeholder="=XLOOKUP(A2, B:B, C:C, ...)"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span className="flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>{language === 'vi' ? 'Hỗ trợ hàm hiện đại (XLOOKUP, FILTER, UNIQUE) và hàm cổ điển (VLOOKUP, INDEX/MATCH).' : 'Supports modern dynamic arrays (XLOOKUP, FILTER, UNIQUE) and classic formulas.'}</span>
          </span>
          <button
            type="button"
            onClick={handleCopyExplanation}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (language === 'vi' ? 'Đã sao chép' : 'Copied') : (language === 'vi' ? 'Sao chép giải thích' : 'Copy Explanation')}</span>
          </button>
        </div>
      </div>

      {/* Warnings & Diagnostics */}
      {parsedAnalysis.issues.length > 0 && (
        <div className="space-y-2">
          {parsedAnalysis.issues.map((issue, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl flex items-start gap-3 text-xs ${
                issue.type === 'warning'
                  ? 'bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300'
                  : 'bg-blue-500/10 border border-blue-500/30 text-blue-800 dark:text-blue-300'
              }`}
            >
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
              <div>
                <p className="font-semibold">{issue.text[language]}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Structural Breakdown & Evaluation Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Identified Functions */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            <Layers className="w-3.5 h-3.5 text-emerald-500" />
            <span>{language === 'vi' ? 'Hàm sử dụng' : 'Functions Detected'}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {parsedAnalysis.detectedFuncs.length > 0 ? (
              parsedAnalysis.detectedFuncs.map((fn) => (
                <span
                  key={fn}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                >
                  {fn}()
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400">{language === 'vi' ? 'Chưa nhận diện hàm' : 'No functions detected'}</span>
            )}
          </div>
        </div>

        {/* References */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            <Code className="w-3.5 h-3.5 text-cyan-500" />
            <span>{language === 'vi' ? 'Tham chiếu dải ô' : 'Range References'}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {parsedAnalysis.cellRefs.length > 0 || parsedAnalysis.sheetRefs.length > 0 ? (
              [...parsedAnalysis.sheetRefs, ...parsedAnalysis.cellRefs].map((ref, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {ref}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400">{language === 'vi' ? 'Không có tham chiếu ngoài' : 'No explicit cell ranges'}</span>
            )}
          </div>
        </div>

        {/* Evaluation Summary */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>{language === 'vi' ? 'Kiểu công thức' : 'Formula Paradigm'}</span>
          </div>
          <div className="pt-1">
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {parsedAnalysis.clean.includes('FILTER') || parsedAnalysis.clean.includes('UNIQUE') || parsedAnalysis.clean.includes('SORT')
                ? (language === 'vi' ? '⚡ Mảng động tự tràn (Dynamic Array / Spill)' : '⚡ Dynamic Array / Spill Formula')
                : (language === 'vi' ? '📄 Công thức chuẩn ô đơn lẻ (Standard Scalar)' : '📄 Standard Scalar Formula')}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              {language === 'vi' ? 'Tối ưu cho Excel 365 / Excel 2021+' : 'Optimized for Excel 365 & 2021+'}
            </p>
          </div>
        </div>
      </div>

      {/* Function Deep-Dive Documentation & Argument Breakdown */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-500" />
          <span>{language === 'vi' ? 'Chi tiết hàm & Cơ chế thực thi' : 'Function Details & Execution Logic'}</span>
        </h3>

        <div className="space-y-4">
          {parsedAnalysis.detectedFuncs.map((fn) => {
            const doc = EXCEL_FUNCTIONS[fn];
            const isStandard = STANDARD_EXCEL_FUNCTIONS.has(fn);

            if (!doc) {
              return (
                <div key={fn} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">{fn}()</span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider ${
                        isStandard
                          ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {isStandard
                        ? language === 'vi'
                          ? 'Hỗ trợ một phần (Hàm chuẩn)'
                          : 'Partially supported (Standard)'
                        : language === 'vi'
                        ? 'Chưa hỗ trợ (Tùy biến/UDF)'
                        : 'Not supported (Custom/UDF)'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {isStandard
                      ? language === 'vi'
                        ? 'Hàm tích hợp tiêu chuẩn của Microsoft Excel. Đã nhận diện cú pháp gọi hàm.'
                        : 'Standard built-in Microsoft Excel function. Recognized by the formula engine.'
                      : language === 'vi'
                      ? 'Hàm này không có trong thư viện tích hợp của Excel hoặc là hàm tự tạo (VBA UDF / Add-in).'
                      : 'This function is not part of native standard Excel functions or is a custom user-defined function (VBA UDF / Add-in).'}
                  </p>
                </div>
              );
            }

            return (
              <div
                key={fn}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm">
                      {doc.name}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{doc.syntax}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {language === 'vi' ? 'Hỗ trợ đầy đủ' : 'Supported'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {doc.purpose[language]}
                </p>

                {/* Arguments */}
                <div className="space-y-1.5 pt-2">
                  <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    {language === 'vi' ? 'Tham số:' : 'Parameters:'}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {doc.arguments.map((arg) => (
                      <div
                        key={arg.name}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-xs space-y-0.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                            {arg.name}
                          </span>
                          {arg.optional && (
                            <span className="text-[10px] text-slate-400 font-mono">optional</span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {arg.desc[language]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pitfalls */}
                {doc.pitfalls.length > 0 && (
                  <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs space-y-1 mt-2">
                    <span className="font-bold text-amber-700 dark:text-amber-400 font-mono text-[11px] uppercase">
                      ⚠️ {language === 'vi' ? 'Lưu ý khi dùng:' : 'Best Practice & Pitfalls:'}
                    </span>
                    {doc.pitfalls.map((p, pIdx) => (
                      <p key={pIdx} className="text-amber-800/90 dark:text-amber-300 text-[11px]">
                        • {p[language]}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
