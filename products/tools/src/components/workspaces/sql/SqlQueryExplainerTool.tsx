import React, { useState, useMemo } from 'react';
import { Language } from '../../../types';
import {
  Database,
  Copy,
  Check,
  Sparkles,
  Layers,
  ArrowRight,
  HelpCircle,
  Cpu,
  Info,
} from 'lucide-react';

interface SqlQueryExplainerToolProps {
  language: Language;
}

const SQL_PRESETS = [
  {
    name: 'GROUP BY & HAVING Aggregation',
    query: `SELECT 
    d.name AS dept_name,
    COUNT(e.id) AS total_employees,
    AVG(e.salary) AS avg_salary
FROM departments d
INNER JOIN employees e ON d.id = e.dept_id
WHERE e.status = 'active'
GROUP BY d.name
HAVING COUNT(e.id) >= 5
ORDER BY avg_salary DESC
LIMIT 10;`,
  },
  {
    name: 'Window Function Ranking',
    query: `SELECT 
    id, name, department, salary,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rank_in_dept
FROM employees;`,
  },
];

const LOGICAL_EXECUTION_STAGES = [
  {
    step: 1,
    clause: 'FROM / JOIN',
    title: { en: 'Table Sourcing & Joins', vi: 'Xác định nguồn bảng & Phép nối quan hệ' },
    desc: {
      en: 'Loads raw tables and performs JOIN operations to build the base working dataset.',
      vi: 'Nạp các bảng dữ liệu gốc và thực hiện phép JOIN để xây dựng tập dữ liệu cơ sở.',
    },
  },
  {
    step: 2,
    clause: 'WHERE',
    title: { en: 'Row-Level Filtering', vi: 'Lọc điều kiện từng dòng (Row Filter)' },
    desc: {
      en: 'Filters individual rows BEFORE grouping. Column aliases defined in SELECT cannot be referenced here because SELECT has not been evaluated yet.',
      vi: 'Lọc các dòng đơn lẻ TRƯỚC KHI gom nhóm. Không thể dùng alias được đặt ở mệnh đề SELECT vì SELECT chưa được xử lý tại bước này.',
    },
  },
  {
    step: 3,
    clause: 'GROUP BY',
    title: { en: 'Row Aggregation & Bucketing', vi: 'Gom nhóm bản ghi' },
    desc: {
      en: 'Collapses rows sharing identical group keys into single aggregated buckets.',
      vi: 'Gom các dòng có cùng khóa nhóm thành từng nhóm duy nhất.',
    },
  },
  {
    step: 4,
    clause: 'HAVING',
    title: { en: 'Group-Level Filtering', vi: 'Lọc điều kiện trên nhóm (Group Filter)' },
    desc: {
      en: 'Filters groups AFTER aggregation using aggregate functions like COUNT(), SUM(), AVG().',
      vi: 'Lọc các nhóm SAU KHI đã gom nhóm bằng các hàm tổng hợp như COUNT, SUM, AVG.',
    },
  },
  {
    step: 5,
    clause: 'SELECT',
    title: { en: 'Column Projection & Aliases', vi: 'Chiếu cột & Đặt tên định danh (Aliases)' },
    desc: {
      en: 'Selects the specific columns, computes expressions, and applies aliases.',
      vi: 'Trích xuất danh sách cột kết quả, tính toán biểu thức và gán alias.',
    },
  },
  {
    step: 6,
    clause: 'DISTINCT',
    title: { en: 'Deduplication', vi: 'Loại bỏ trùng lặp' },
    desc: {
      en: 'Removes duplicate rows from the projected columns.',
      vi: 'Loại bỏ các dòng kết quả có giá trị trùng lặp hoàn toàn.',
    },
  },
  {
    step: 7,
    clause: 'ORDER BY',
    title: { en: 'Sorting', vi: 'Sắp xếp thứ tự' },
    desc: {
      en: 'Sorts the final rows in ascending (ASC) or descending (DESC) order. Can reference column aliases created in SELECT.',
      vi: 'Sắp xếp các dòng kết quả tăng dần hoặc giảm dần. Có thể sử dụng các alias đã tạo ở SELECT.',
    },
  },
  {
    step: 8,
    clause: 'LIMIT / OFFSET',
    title: { en: 'Pagination & Row Count', vi: 'Phân trang & Giới hạn số lượng' },
    desc: {
      en: 'Restricts the maximum number of rows returned to the client application.',
      vi: 'Giới hạn số dòng tối đa và vị trí bắt đầu lấy trả về cho client.',
    },
  },
];

export const SqlQueryExplainerTool: React.FC<SqlQueryExplainerToolProps> = ({ language }) => {
  const [query, setQuery] = useState(SQL_PRESETS[0].query);
  const [copied, setCopied] = useState(false);

  const matchedStages = useMemo(() => {
    const upper = query.toUpperCase();
    return LOGICAL_EXECUTION_STAGES.filter((stage) => {
      if (stage.clause.includes('FROM')) return upper.includes('FROM');
      if (stage.clause.includes('WHERE')) return upper.includes('WHERE');
      if (stage.clause.includes('GROUP BY')) return upper.includes('GROUP BY');
      if (stage.clause.includes('HAVING')) return upper.includes('HAVING');
      if (stage.clause.includes('SELECT')) return upper.includes('SELECT');
      if (stage.clause.includes('DISTINCT')) return upper.includes('DISTINCT');
      if (stage.clause.includes('ORDER BY')) return upper.includes('ORDER BY');
      if (stage.clause.includes('LIMIT')) return upper.includes('LIMIT') || upper.includes('TOP') || upper.includes('FETCH');
      return true;
    });
  }, [query]);

  const handleCopy = () => {
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Logical vs Physical Execution Distinction Banner */}
      <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 text-xs text-cyan-950 dark:text-cyan-200 flex items-start gap-3">
        <Cpu className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">
            {language === 'vi'
              ? 'Phân biệt: Trình tự xử lý Logic vs Kế hoạch thực thi Vật lý (Execution Plan)'
              : 'Important Distinction: Logical Processing Order vs. Physical Execution Plan'}
          </p>
          <p className="text-cyan-800 dark:text-cyan-300 leading-relaxed">
            {language === 'vi'
              ? 'Thứ tự logic dưới đây (FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY) quy định ngữ nghĩa và phạm vi hiển thị biến/alias. Trình tối ưu hóa của database engine (Cost-Based Optimizer) có thể tổ chức lại các thao tác vật lý (như Filter Pushdown, Index Seek, Hash Joins) nhằm tối ưu tốc độ miễn là kết quả logic không đổi.'
              : 'The logical order below defines SQL semantics and scope visibility (e.g. why aliases in SELECT are invalid in WHERE). The physical database engine (Cost-Based Optimizer) may reorder internal operations (e.g. index scans, filter pushdown, hash join trees) for maximum performance while preserving logical correctness.'}
          </p>
        </div>
      </div>

      {/* SQL Input & Presets */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <Database className="w-4 h-4 text-cyan-500" />
            <span>{language === 'vi' ? 'Nhập câu truy vấn SQL' : 'SQL Query Statement'}</span>
          </label>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-500">{language === 'vi' ? 'Mẫu câu lệnh:' : 'Presets:'}</span>
            <div className="flex flex-wrap gap-1">
              {SQL_PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setQuery(p.query)}
                  className="px-2 py-0.5 rounded-lg text-[11px] font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 transition-colors cursor-pointer"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={7}
          className="w-full font-mono text-xs sm:text-sm p-3.5 rounded-xl bg-slate-900 text-cyan-300 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>{language === 'vi' ? 'Trình tự thực thi logic SQL: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY' : 'SQL Logical Execution Order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY'}</span>
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (language === 'vi' ? 'Đã sao chép' : 'Copied!') : (language === 'vi' ? 'Sao chép SQL' : 'Copy SQL')}</span>
          </button>
        </div>
      </div>

      {/* Logical Execution Flow Chart */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-500" />
          <span>{language === 'vi' ? 'Trình tự thực thi logic của câu lệnh' : 'Logical Execution Stages'}</span>
        </h3>

        <div className="space-y-3">
          {matchedStages.map((stage, idx) => (
            <div
              key={stage.step}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="font-mono font-bold text-xs sm:text-sm px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400">
                    {stage.clause}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {stage.title[language]}
                  </h4>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 pl-8 leading-relaxed">
                {stage.desc[language]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Logical vs Physical Architecture Notice */}
      <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 text-xs space-y-2">
        <div className="flex items-center gap-1.5 text-cyan-800 dark:text-cyan-300 font-bold font-mono">
          <Info className="w-4 h-4 text-cyan-500" />
          <span>
            {language === 'vi'
              ? 'Lưu ý kỹ thuật: Thứ tự logic vs Kế hoạch thực thi vật lý (Physical Execution Plan)'
              : 'Technical Notice: Logical Processing Order vs Physical Execution Plan'}
          </span>
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px] sm:text-xs">
          {language === 'vi'
            ? 'Công cụ này mô phỏng Trình tự xử lý Logic theo chuẩn ANSI SQL (giúp giải thích vì sao WHERE không dùng được alias của SELECT, hay vì sao HAVING chạy sau GROUP BY). Đây không phải là kế hoạch thực thi vật lý (EXPLAIN / EXPLAIN ANALYZE) của một RDBMS cụ thể, vì các bộ tối ưu hóa chi phí (Cost-Based Optimizers) có thể đẩy điều kiện lọc xuống sớm (Predicate Pushdown) hoặc sắp xếp lại thứ tự Join dựa trên chỉ mục (Index) và thống kê dữ liệu thực tế.'
            : 'This tool models the standard ANSI SQL Logical Processing Order, explaining variable scoping, alias availability, and aggregation phases. It is not an engine-specific physical execution plan (e.g. EXPLAIN ANALYZE), as physical database cost-based optimizers frequently reorder operations via Predicate Pushdown, Hash Joins, and Index Scans based on statistical distributions.'}
        </p>
      </div>
    </div>
  );
};
