import React, { useState } from 'react';
import { Language } from '../../../types';
import {
  AlertTriangle,
  Code,
  Copy,
  Check,
  Sparkles,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface SqlNullTesterToolProps {
  language: Language;
}

export const SqlNullTesterTool: React.FC<SqlNullTesterToolProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'truth_table' | 'not_in_trap' | 'comparison' | 'aggregates'>('not_in_trap');
  const [valA, setValA] = useState<'TRUE' | 'FALSE' | 'NULL'>('TRUE');
  const [valB, setValB] = useState<'TRUE' | 'FALSE' | 'NULL'>('NULL');
  const [copied, setCopied] = useState(false);

  // Compute 3-valued logic truth table outputs
  const andResult = (a: string, b: string): string => {
    if (a === 'FALSE' || b === 'FALSE') return 'FALSE';
    if (a === 'TRUE' && b === 'TRUE') return 'TRUE';
    return 'UNKNOWN (NULL)';
  };

  const orResult = (a: string, b: string): string => {
    if (a === 'TRUE' || b === 'TRUE') return 'TRUE';
    if (a === 'FALSE' && b === 'FALSE') return 'FALSE';
    return 'UNKNOWN (NULL)';
  };

  const notResult = (a: string): string => {
    if (a === 'TRUE') return 'FALSE';
    if (a === 'FALSE') return 'TRUE';
    return 'UNKNOWN (NULL)';
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('not_in_trap')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'not_in_trap'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          {language === 'vi' ? 'Cạm bẫy NOT IN vs NULL' : 'The NOT IN NULL Trap'}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('truth_table')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'truth_table'
              ? 'bg-cyan-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          {language === 'vi' ? 'Bảng chân trị 3 giá trị (3VL)' : 'Three-Valued Logic (3VL)'}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('comparison')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'comparison'
              ? 'bg-cyan-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          {language === 'vi' ? 'So sánh = NULL vs IS NULL' : '= NULL vs IS NULL'}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('aggregates')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'aggregates'
              ? 'bg-cyan-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          {language === 'vi' ? 'Hàm tổng hợp COUNT(*) vs COUNT(col)' : 'COUNT(*) vs COUNT(col)'}
        </button>
      </div>

      {/* Trap 1: NOT IN vs NULL */}
      {activeTab === 'not_in_trap' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-900 dark:text-rose-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-rose-700 dark:text-rose-400">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{language === 'vi' ? 'Tại sao NOT IN (..., NULL) trả về 0 dòng?' : 'Why NOT IN (..., NULL) Returns 0 Rows'}</span>
            </div>
            <p className="leading-relaxed">
              {language === 'vi'
                ? 'Khi bạn viết `WHERE id NOT IN (1, 2, NULL)`, SQL mở rộng thành: `WHERE (id != 1) AND (id != 2) AND (id != NULL)`. Vì bất kỳ phép so sánh nào với NULL (`id != NULL`) cũng đều sinh ra `UNKNOWN (NULL)`, và mệnh đề WHERE chỉ chấp nhận TRUE, toàn bộ kết quả trả về là RỖNG (0 bản ghi)!'
                : '`WHERE id NOT IN (1, 2, NULL)` expands into `WHERE (id != 1) AND (id != 2) AND (id != NULL)`. Since `id != NULL` yields UNKNOWN/NULL, the entire AND chain resolves to UNKNOWN, and WHERE excludes every single row!'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Flawed Query */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-rose-500/40 space-y-2 text-xs font-mono">
              <span className="text-rose-400 font-bold">❌ Dangerous Query (NOT IN)</span>
              <pre className="text-slate-300">
{`SELECT * 
FROM customers 
WHERE customer_id NOT IN (
    SELECT manager_id 
    FROM employees -- If any manager_id is NULL, 0 rows returned!
);`}
              </pre>
            </div>

            {/* Correct Query */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-2 text-xs font-mono">
              <span className="text-emerald-400 font-bold">✅ Safe Query (NOT EXISTS)</span>
              <pre className="text-slate-300">
{`SELECT * 
FROM customers c
WHERE NOT EXISTS (
    SELECT 1 
    FROM employees e 
    WHERE e.manager_id = c.customer_id
);`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* 3VL Truth Table */}
      {activeTab === 'truth_table' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500">
              {language === 'vi' ? 'Thử nghiệm logic 3 giá trị thời gian thực' : 'Interactive Three-Valued Logic Evaluator'}
            </h3>

            <div className="flex flex-wrap items-center gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Input A</label>
                <select
                  value={valA}
                  onChange={(e) => setValA(e.target.value as any)}
                  className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold font-mono"
                >
                  <option value="TRUE">TRUE</option>
                  <option value="FALSE">FALSE</option>
                  <option value="NULL">NULL (UNKNOWN)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Input B</label>
                <select
                  value={valB}
                  onChange={(e) => setValB(e.target.value as any)}
                  className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold font-mono"
                >
                  <option value="TRUE">TRUE</option>
                  <option value="FALSE">FALSE</option>
                  <option value="NULL">NULL (UNKNOWN)</option>
                </select>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400">A AND B</span>
                <p className="text-sm font-bold font-mono text-cyan-600 dark:text-cyan-400">
                  {andResult(valA, valB)}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400">A OR B</span>
                <p className="text-sm font-bold font-mono text-cyan-600 dark:text-cyan-400">
                  {orResult(valA, valB)}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400">NOT A</span>
                <p className="text-sm font-bold font-mono text-cyan-600 dark:text-cyan-400">
                  {notResult(valA)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison: = NULL vs IS NULL, IS NOT NULL, COALESCE */}
      {activeTab === 'comparison' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {language === 'vi' ? 'Toán tử kiểm tra NULL: IS NULL, IS NOT NULL & COALESCE' : 'Testing and Handling NULLs: IS NULL, IS NOT NULL & COALESCE'}
          </h3>
          <p>
            {language === 'vi'
              ? 'Trong chuẩn ANSI SQL, NULL không phải là một giá trị cụ thể, mà đại diện cho "sự vắng mặt của giá trị" hoặc "chưa xác định". Do đó, hai ẩn số chưa xác định không thể kết luận là bằng nhau (`NULL = NULL` -> UNKNOWN, không phải TRUE).'
              : 'In ANSI SQL, NULL is not a distinct value, but represents an unknown or absent state. Therefore, comparing two unknowns (`NULL = NULL`) yields UNKNOWN rather than TRUE.'}
          </p>
          <div className="p-3.5 rounded-xl bg-slate-900 text-cyan-400 font-mono text-xs space-y-2">
            <div>
              <span className="text-rose-400 font-bold">-- ❌ Lỗi phổ biến (Equality with NULL always yields UNKNOWN):</span>
              <p className="text-slate-300">SELECT * FROM users WHERE email = NULL; -- 0 rows returned</p>
              <p className="text-slate-300">SELECT * FROM users WHERE email != NULL; -- 0 rows returned</p>
            </div>
            <div className="pt-2 border-t border-slate-800">
              <span className="text-emerald-400 font-bold">-- ✅ Cú pháp chuẩn ANSI (IS NULL & IS NOT NULL):</span>
              <p className="text-slate-300">SELECT * FROM users WHERE email IS NULL;</p>
              <p className="text-slate-300">SELECT * FROM users WHERE email IS NOT NULL;</p>
            </div>
            <div className="pt-2 border-t border-slate-800">
              <span className="text-cyan-400 font-bold">-- 🛡️ Thay thế giá trị NULL với COALESCE():</span>
              <p className="text-slate-300">{`SELECT 
    id, 
    COALESCE(phone_number, alternative_phone, 'N/A') AS contact_phone
FROM users;`}</p>
              <p className="text-slate-400 text-[11px] mt-1 italic">
                {language === 'vi'
                  ? 'COALESCE() trả về giá trị đầu tiên khác NULL từ trái sang phải.'
                  : 'COALESCE() evaluates arguments in order and returns the first non-NULL value.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Aggregates: COUNT(*) vs COUNT(col) */}
      {activeTab === 'aggregates' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {language === 'vi' ? 'Khác biệt giữa COUNT(*) và COUNT(cột)' : 'Differences in SQL Aggregate Functions'}
          </h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong className="text-slate-900 dark:text-white">COUNT(*): </strong>
              {language === 'vi' ? 'Đếm tổng số dòng vật lý trong bảng, bất kể cột nào có chứa NULL hay không.' : 'Counts the total number of physical rows in the dataset, including NULLs.'}
            </li>
            <li>
              <strong className="text-slate-900 dark:text-white">COUNT(cột_cụ_thể): </strong>
              {language === 'vi' ? 'Chỉ đếm các dòng có giá trị khác NULL (bỏ qua toàn bộ NULL).' : 'Counts only non-NULL entries in that specific column.'}
            </li>
            <li>
              <strong className="text-slate-900 dark:text-white">SUM(cột), AVG(cột): </strong>
              {language === 'vi' ? 'Tự động bỏ qua các giá trị NULL khi tính toán mẫu số.' : 'Automatically ignores NULL values during arithmetic calculations.'}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
