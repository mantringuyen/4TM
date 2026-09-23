import React, { useState, useMemo } from 'react';
import { Language } from '../../../types';
import {
  Code,
  Copy,
  Check,
  Sparkles,
  Zap,
  Clock,
  Layers,
  Info,
  Database,
  TrendingUp,
} from 'lucide-react';

interface PythonComplexityInspectorToolProps {
  language: Language;
}

const COMPLEXITY_PRESETS = [
  {
    name: 'O(n^2) Nested Loop (Quadratic)',
    code: `def find_pairs_with_sum(numbers, target):
    pairs = []
    for i in range(len(numbers)):
        for j in range(i + 1, len(numbers)):
            if numbers[i] + numbers[j] == target:
                pairs.append((numbers[i], numbers[j]))
    return pairs`,
  },
  {
    name: 'O(n) Hash Set Optimization (Linear)',
    code: `def find_pairs_optimized(numbers, target):
    seen = set()
    pairs = []
    for num in numbers:
        complement = target - num
        if complement in seen:
            pairs.append((complement, num))
        seen.add(num)
    return pairs`,
  },
  {
    name: 'O(log n) Binary Search (Logarithmic)',
    code: `def binary_search(sorted_arr, target):
    low, high = 0, len(sorted_arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if sorted_arr[mid] == target:
            return mid
        elif sorted_arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
  },
  {
    name: 'O(n log n) Merge / Timsort Pattern',
    code: `def sort_and_process(records):
    # Python uses Timsort (hybrid merge/insertion sort)
    sorted_records = sorted(records, key=lambda r: r['score'])
    return [r['id'] for r in sorted_records]`,
  },
];

export const PythonComplexityInspectorTool: React.FC<PythonComplexityInspectorToolProps> = ({
  language,
}) => {
  const [code, setCode] = useState(COMPLEXITY_PRESETS[0].code);
  const [copied, setCopied] = useState(false);

  const analysis = useMemo(() => {
    const raw = code;
    let avgTime = 'O(n)';
    let worstTime = 'O(n)';
    let spaceComplexity = 'O(1)';
    let implementationNote = {
      en: 'Standard linear scan through elements.',
      vi: 'Duyệt tuyến tính tuần tự qua từng phần tử.',
    };

    const loopCount = (raw.match(/for |while /g) || []).length;
    const hasNested = /for [^\n]+\n\s+for |while [^\n]+\n\s+while /i.test(raw);
    const hasBinarySearch = /\/\/\s*2|low\s*<=\s*high/i.test(raw);
    const hasSort = /sorted\(|\.sort\(/i.test(raw);
    const hasSetOrDict = /set\(|\{|\.add\(|seen|dict\(/i.test(raw);
    const hasRecursion = /def (\w+)\(.*\):[\s\S]*\1\(/i.test(raw);

    if (hasSort) {
      avgTime = 'O(n log n)';
      worstTime = 'O(n log n)';
      spaceComplexity = 'O(n)';
      implementationNote = {
        en: "Python built-in sorted() and list.sort() use Timsort. Best case is O(n) on already sorted data; worst and average cases are strictly O(n log n) with O(n) temporary buffer space.",
        vi: 'Hàm sorted() và .sort() của Python sử dụng thuật toán Timsort. Trường hợp tốt nhất là O(n) trên dữ liệu đã xếp; trung bình và xấu nhất là O(n log n) với bộ nhớ đệm O(n).',
      };
    } else if (hasBinarySearch) {
      avgTime = 'O(log n)';
      worstTime = 'O(log n)';
      spaceComplexity = 'O(1)';
      implementationNote = {
        en: 'Halves the active search window at each step. Requires a pre-sorted array with O(1) random memory access.',
        vi: 'Thu hẹp một nửa không gian tìm kiếm sau mỗi bước. Bắt buộc mảng đầu vào đã sắp xếp và hỗ trợ truy cập ngẫu nhiên O(1).',
      };
    } else if (hasNested || loopCount >= 2) {
      avgTime = 'O(n²)';
      worstTime = 'O(n²)';
      spaceComplexity = 'O(1) to O(n)';
      implementationNote = {
        en: 'Nested loops iterate over pairs of elements (Quadratic). Scales poorly for large inputs (N > 10,000 items).',
        vi: 'Vòng lặp lồng nhau duyệt qua từng cặp phần tử. Hiệu năng giảm rất nhanh khi N > 10.000 phần tử.',
      };
    } else if (hasSetOrDict) {
      avgTime = 'O(n)';
      worstTime = 'O(n²) in pathological hash collisions';
      spaceComplexity = 'O(n)';
      implementationNote = {
        en: 'Dict / Set lookups are O(1) average case via hash tables, yielding O(n) total for N items. In rare pathological hash collision attacks, individual lookups degrade to O(n), giving O(n²) worst case.',
        vi: 'Tra cứu Set / Dict đạt O(1) trung bình nhờ bảng băm (Hash Table). Tuy nhiên trong trường hợp xấu nhất do xung đột hàm băm (Hash Collision), tra cứu có thể suy giảm thành O(n), dẫn đến tổng thời gian O(n²).',
      };
    }

    return {
      avgTime,
      worstTime,
      spaceComplexity,
      implementationNote,
    };
  }, [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Code Input & Presets */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <Code className="w-4 h-4 text-blue-500" />
            <span>{language === 'vi' ? 'Đoạn mã Python cần ước lượng Big-O' : 'Python Function Code'}</span>
          </label>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-500">{language === 'vi' ? 'Thuật toán mẫu:' : 'Presets:'}</span>
            <div className="flex flex-wrap gap-1">
              {COMPLEXITY_PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setCode(p.code)}
                  className="px-2 py-0.5 rounded-lg text-[11px] font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={7}
          className="w-full font-mono text-xs sm:text-sm p-3.5 rounded-xl bg-slate-900 text-blue-300 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
        />

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>{language === 'vi' ? 'Ước tính độ phức tạp thời gian (Time) & bộ nhớ (Auxiliary Space)' : 'Estimates Time & Auxiliary Space Complexity with edge-case nuances'}</span>
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

      {/* Complexity Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Average Time Complexity */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              {language === 'vi' ? 'Thời gian (Trung bình)' : 'Time (Average Case)'}
            </span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">{analysis.avgTime}</p>
        </div>

        {/* Worst Time Complexity */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              {language === 'vi' ? 'Thời gian (Xấu nhất)' : 'Time (Worst Case)'}
            </span>
            <Clock className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100">{analysis.worstTime}</p>
        </div>

        {/* Auxiliary Space Complexity */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              {language === 'vi' ? 'Bộ nhớ (Auxiliary Space)' : 'Auxiliary Space'}
            </span>
            <Database className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">{analysis.spaceComplexity}</p>
        </div>
      </div>

      {/* Nuances and Implementation Details */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300">
          <Info className="w-4 h-4 text-blue-500" />
          <span>{language === 'vi' ? 'Chi tiết thuật toán & Cơ chế CPython' : 'Algorithmic Nuances & CPython Internals'}</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
          {analysis.implementationNote[language]}
        </p>
      </div>
    </div>
  );
};
