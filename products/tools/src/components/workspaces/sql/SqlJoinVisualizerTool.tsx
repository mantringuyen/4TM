import React, { useState, useMemo } from 'react';
import { Language } from '../../../types';
import {
  Database,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Layers,
  Table,
  CheckCircle2,
} from 'lucide-react';

interface SqlJoinVisualizerToolProps {
  language: Language;
}

type JoinType = 'inner' | 'left' | 'right' | 'full' | 'cross' | 'left_anti';

interface Employee {
  id: number;
  name: string;
  dept_id: number | null;
}

interface Department {
  id: number;
  name: string;
  location: string;
}

const SAMPLE_EMPLOYEES: Employee[] = [
  { id: 1, name: 'Alice Smith', dept_id: 10 },
  { id: 2, name: 'Bob Johnson', dept_id: 20 },
  { id: 3, name: 'Charlie Lee', dept_id: 10 },
  { id: 4, name: 'Diana Ross', dept_id: 99 }, // Dept 99 does not exist in Dept table
  { id: 5, name: 'Evan Wright', dept_id: null }, // No department assigned
];

const SAMPLE_DEPARTMENTS: Department[] = [
  { id: 10, name: 'Engineering', location: 'Floor 4' },
  { id: 20, name: 'Marketing', location: 'Floor 2' },
  { id: 30, name: 'Human Resources', location: 'Floor 1' }, // No employees currently
];

export const SqlJoinVisualizerTool: React.FC<SqlJoinVisualizerToolProps> = ({ language }) => {
  const [joinType, setJoinType] = useState<JoinType>('inner');
  const [copied, setCopied] = useState(false);

  // Compute resulting joined rows based on joinType
  const joinedResult = useMemo(() => {
    switch (joinType) {
      case 'inner': {
        const rows: any[] = [];
        SAMPLE_EMPLOYEES.forEach((emp) => {
          const dept = SAMPLE_DEPARTMENTS.find((d) => d.id === emp.dept_id);
          if (dept) {
            rows.push({
              emp_id: emp.id,
              emp_name: emp.name,
              dept_id: emp.dept_id,
              dept_name: dept.name,
              location: dept.location,
              matched: true,
            });
          }
        });
        return rows;
      }

      case 'left': {
        const rows: any[] = [];
        SAMPLE_EMPLOYEES.forEach((emp) => {
          const dept = SAMPLE_DEPARTMENTS.find((d) => d.id === emp.dept_id);
          rows.push({
            emp_id: emp.id,
            emp_name: emp.name,
            dept_id: emp.dept_id,
            dept_name: dept ? dept.name : 'NULL',
            location: dept ? dept.location : 'NULL',
            matched: !!dept,
          });
        });
        return rows;
      }

      case 'right': {
        const rows: any[] = [];
        SAMPLE_DEPARTMENTS.forEach((dept) => {
          const matchingEmps = SAMPLE_EMPLOYEES.filter((e) => e.dept_id === dept.id);
          if (matchingEmps.length > 0) {
            matchingEmps.forEach((emp) => {
              rows.push({
                emp_id: emp.id,
                emp_name: emp.name,
                dept_id: dept.id,
                dept_name: dept.name,
                location: dept.location,
                matched: true,
              });
            });
          } else {
            rows.push({
              emp_id: 'NULL',
              emp_name: 'NULL',
              dept_id: dept.id,
              dept_name: dept.name,
              location: dept.location,
              matched: false,
            });
          }
        });
        return rows;
      }

      case 'full': {
        const rows: any[] = [];
        // First all left and matching right
        SAMPLE_EMPLOYEES.forEach((emp) => {
          const dept = SAMPLE_DEPARTMENTS.find((d) => d.id === emp.dept_id);
          rows.push({
            emp_id: emp.id,
            emp_name: emp.name,
            dept_id: emp.dept_id || 'NULL',
            dept_name: dept ? dept.name : 'NULL',
            location: dept ? dept.location : 'NULL',
            matched: !!dept,
          });
        });
        // Then departments that had no employees
        SAMPLE_DEPARTMENTS.forEach((dept) => {
          const hasEmp = SAMPLE_EMPLOYEES.some((e) => e.dept_id === dept.id);
          if (!hasEmp) {
            rows.push({
              emp_id: 'NULL',
              emp_name: 'NULL',
              dept_id: dept.id,
              dept_name: dept.name,
              location: dept.location,
              matched: false,
            });
          }
        });
        return rows;
      }

      case 'left_anti': {
        const rows: any[] = [];
        SAMPLE_EMPLOYEES.forEach((emp) => {
          const dept = SAMPLE_DEPARTMENTS.find((d) => d.id === emp.dept_id);
          if (!dept) {
            rows.push({
              emp_id: emp.id,
              emp_name: emp.name,
              dept_id: emp.dept_id || 'NULL',
              dept_name: 'NULL',
              location: 'NULL',
              matched: false,
            });
          }
        });
        return rows;
      }

      case 'cross': {
        const rows: any[] = [];
        SAMPLE_EMPLOYEES.slice(0, 2).forEach((emp) => {
          SAMPLE_DEPARTMENTS.slice(0, 2).forEach((dept) => {
            rows.push({
              emp_id: emp.id,
              emp_name: emp.name,
              dept_id: dept.id,
              dept_name: dept.name,
              location: dept.location,
              matched: emp.dept_id === dept.id,
            });
          });
        });
        return rows;
      }
    }
  }, [joinType]);

  const getJoinQuery = () => {
    switch (joinType) {
      case 'inner':
        return `SELECT e.id AS emp_id, e.name AS emp_name, d.name AS dept_name, d.location
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id;`;
      case 'left':
        return `SELECT e.id AS emp_id, e.name AS emp_name, d.name AS dept_name, d.location
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id;`;
      case 'right':
        return `SELECT e.id AS emp_id, e.name AS emp_name, d.name AS dept_name, d.location
FROM employees e
RIGHT JOIN departments d ON e.dept_id = d.id;`;
      case 'full':
        return `SELECT e.id AS emp_id, e.name AS emp_name, d.name AS dept_name, d.location
FROM employees e
FULL OUTER JOIN departments d ON e.dept_id = d.id;`;
      case 'left_anti':
        return `SELECT e.id AS emp_id, e.name AS emp_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id
WHERE d.id IS NULL;`;
      case 'cross':
        return `SELECT e.name AS emp_name, d.name AS dept_name
FROM employees e
CROSS JOIN departments d;`;
    }
  };

  const getExplanation = () => {
    switch (joinType) {
      case 'inner':
        return {
          title: language === 'vi' ? 'INNER JOIN (Chỉ lấy phần giao nhau)' : 'INNER JOIN (Intersection Only)',
          desc:
            language === 'vi'
              ? 'Chỉ giữ lại các hàng có giá trị khóa dept_id khớp chính xác giữa cả 2 bảng. Nhân viên không có phòng ban (NULL hoặc 99) và phòng ban chưa có nhân viên (HR) đều bị loại bỏ.'
              : 'Keeps only rows where the join condition matches in both tables. Employees with missing/invalid departments and empty departments are excluded.',
        };
      case 'left':
        return {
          title: language === 'vi' ? 'LEFT JOIN (Giữ toàn bộ bảng Trái)' : 'LEFT JOIN (Keep All Left Rows)',
          desc:
            language === 'vi'
              ? 'Giữ lại 100% nhân viên ở bảng Trái. Nếu nhân viên không thuộc phòng ban hợp lệ nào, các cột của bảng Phải sẽ được điền giá trị NULL.'
              : 'Preserves all records from the left table (employees). If an employee has no matching department, department attributes are padded with NULL.',
        };
      case 'right':
        return {
          title: language === 'vi' ? 'RIGHT JOIN (Giữ toàn bộ bảng Phải)' : 'RIGHT JOIN (Keep All Right Rows)',
          desc:
            language === 'vi'
              ? 'Giữ lại toàn bộ các phòng ban ở bảng Phải, kể cả phòng ban chưa có nhân viên (Human Resources) với các cột nhân viên được điền NULL.'
              : 'Preserves all records from the right table (departments), including empty departments padded with NULL employee attributes.',
        };
      case 'full':
        return {
          title: language === 'vi' ? 'FULL OUTER JOIN (Lấy toàn bộ 2 bảng)' : 'FULL OUTER JOIN (Complete Union)',
          desc:
            language === 'vi'
              ? 'Kết hợp toàn bộ nhân viên và toàn bộ phòng ban. Bất kỳ phía nào không có bản ghi khớp sẽ được điền NULL.'
              : 'Includes all rows from both tables. When either side has no match, the missing columns contain NULL.',
        };
      case 'left_anti':
        return {
          title: language === 'vi' ? 'LEFT ANTI JOIN (Tìm bản ghi không khớp)' : 'LEFT ANTI JOIN (Orphan Records)',
          desc:
            language === 'vi'
              ? 'Tìm các nhân viên "mồ côi" không thuộc bất kỳ phòng ban hợp lệ nào trong hệ thống (dùng LEFT JOIN kết hợp WHERE d.id IS NULL).'
              : 'Identifies orphan records in the left table that have no corresponding match in the right table.',
        };
      case 'cross':
        return {
          title: language === 'vi' ? 'CROSS JOIN (Tích đề-các Cartesian Product)' : 'CROSS JOIN (Cartesian Product)',
          desc:
            language === 'vi'
              ? 'Tạo ra tích Descartes kết hợp mỗi dòng của bảng nhân viên với tất cả các dòng của bảng phòng ban (N x M dòng).'
              : 'Produces the Cartesian product of both tables, pairing each row from the first table with every row of the second.',
        };
    }
  };

  const currentExp = getExplanation();

  const handleCopy = () => {
    navigator.clipboard.writeText(getJoinQuery());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Join Type Selector Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => setJoinType('inner')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            joinType === 'inner'
              ? 'bg-cyan-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          INNER JOIN
        </button>
        <button
          type="button"
          onClick={() => setJoinType('left')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            joinType === 'left'
              ? 'bg-cyan-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          LEFT JOIN
        </button>
        <button
          type="button"
          onClick={() => setJoinType('right')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            joinType === 'right'
              ? 'bg-cyan-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          RIGHT JOIN
        </button>
        <button
          type="button"
          onClick={() => setJoinType('full')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            joinType === 'full'
              ? 'bg-cyan-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          FULL OUTER JOIN
        </button>
        <button
          type="button"
          onClick={() => setJoinType('left_anti')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            joinType === 'left_anti'
              ? 'bg-cyan-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          LEFT ANTI JOIN
        </button>
        <button
          type="button"
          onClick={() => setJoinType('cross')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            joinType === 'cross'
              ? 'bg-cyan-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          CROSS JOIN
        </button>
      </div>

      {/* Explanation Banner */}
      <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-slate-800 dark:text-slate-200 space-y-1">
        <h3 className="font-bold text-sm text-cyan-800 dark:text-cyan-300">
          {currentExp.title}
        </h3>
        <p className="leading-relaxed">{currentExp.desc}</p>
      </div>

      {/* Side-by-Side Source Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Table: Employees */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-500">
            <span>TABLE: employees (Left)</span>
            <span>{SAMPLE_EMPLOYEES.length} rows</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-mono">
                  <th className="py-1.5 px-2">id</th>
                  <th className="py-1.5 px-2">name</th>
                  <th className="py-1.5 px-2">dept_id (FK)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800 font-mono">
                {SAMPLE_EMPLOYEES.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-100 dark:hover:bg-slate-800/60">
                    <td className="py-1.5 px-2 text-slate-500">{e.id}</td>
                    <td className="py-1.5 px-2 font-sans font-medium text-slate-800 dark:text-slate-200">{e.name}</td>
                    <td className="py-1.5 px-2 text-cyan-600 dark:text-cyan-400 font-bold">{e.dept_id ?? 'NULL'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Table: Departments */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-500">
            <span>TABLE: departments (Right)</span>
            <span>{SAMPLE_DEPARTMENTS.length} rows</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-mono">
                  <th className="py-1.5 px-2">id (PK)</th>
                  <th className="py-1.5 px-2">name</th>
                  <th className="py-1.5 px-2">location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800 font-mono">
                {SAMPLE_DEPARTMENTS.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-100 dark:hover:bg-slate-800/60">
                    <td className="py-1.5 px-2 text-cyan-600 dark:text-cyan-400 font-bold">{d.id}</td>
                    <td className="py-1.5 px-2 font-sans font-medium text-slate-800 dark:text-slate-200">{d.name}</td>
                    <td className="py-1.5 px-2 text-slate-500">{d.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Resulting Joined Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Table className="w-4 h-4 text-cyan-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-700 dark:text-slate-300">
              {language === 'vi' ? 'Kết quả truy vấn (Result Set)' : 'Resulting Joined Rows'}
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-600 font-bold">
              {joinedResult.length} rows returned
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-xs transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (language === 'vi' ? 'Đã chép SQL' : 'Copied!') : (language === 'vi' ? 'Sao chép SQL' : 'Copy SQL')}</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono bg-slate-50 dark:bg-slate-800/60">
                <th className="py-2 px-3">emp_id</th>
                <th className="py-2 px-3">emp_name</th>
                <th className="py-2 px-3">dept_name</th>
                <th className="py-2 px-3">location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              {joinedResult.map((r, i) => (
                <tr
                  key={i}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                    r.dept_name === 'NULL' || r.emp_name === 'NULL'
                      ? 'bg-amber-500/5 text-amber-700 dark:text-amber-400'
                      : ''
                  }`}
                >
                  <td className="py-2 px-3">{r.emp_id}</td>
                  <td className="py-2 px-3 font-sans font-medium">{r.emp_name}</td>
                  <td className="py-2 px-3 font-bold">{r.dept_name}</td>
                  <td className="py-2 px-3">{r.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Live SQL Preview */}
        <pre className="p-3.5 rounded-xl bg-slate-900 text-cyan-300 font-mono text-xs overflow-x-auto mt-2">
          {getJoinQuery()}
        </pre>
      </div>
    </div>
  );
};
