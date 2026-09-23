import React, { useState, useMemo } from 'react';
import { Language } from '../../../types';
import {
  Table,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Code,
  Filter,
  Layers,
  Database,
  Sliders,
  RotateCcw,
} from 'lucide-react';

interface PandasExpressionExplorerToolProps {
  language: Language;
}

type DatasetKey = 'sales' | 'employees' | 'traffic';
type OperationType = 'filter' | 'groupby' | 'mutate' | 'slicing';

interface SalesRow {
  order_id: string;
  customer: string;
  region: string;
  category: string;
  revenue: number;
  cost: number;
  units: number;
}

interface EmpRow {
  emp_id: number;
  name: string;
  department: string;
  salary: number;
  performance: number;
  years: number;
}

interface TrafficRow {
  session_id: string;
  device: string;
  country: string;
  duration_sec: number;
  conversions: number;
  bounced: boolean;
}

const SAMPLE_SALES: SalesRow[] = [
  { order_id: 'ORD-101', customer: 'Acme Corp', region: 'North', category: 'Software', revenue: 4500, cost: 1200, units: 3 },
  { order_id: 'ORD-102', customer: 'Global Tech', region: 'West', category: 'Hardware', revenue: 12800, cost: 9100, units: 14 },
  { order_id: 'ORD-103', customer: 'Starlight Retail', region: 'South', category: 'Cloud', revenue: 3200, cost: 950, units: 2 },
  { order_id: 'ORD-104', customer: 'NextGen AI', region: 'North', category: 'Software', revenue: 21500, cost: 5400, units: 10 },
  { order_id: 'ORD-105', customer: 'Apex Logistics', region: 'West', category: 'Hardware', revenue: 8900, cost: 6200, units: 8 },
  { order_id: 'ORD-106', customer: 'Zenith Health', region: 'East', category: 'Cloud', revenue: 15400, cost: 4100, units: 6 },
];

const SAMPLE_EMPLOYEES: EmpRow[] = [
  { emp_id: 101, name: 'Alex Rivera', department: 'Engineering', salary: 95000, performance: 4.8, years: 4 },
  { emp_id: 102, name: 'Sarah Chen', department: 'Marketing', salary: 72000, performance: 4.2, years: 2 },
  { emp_id: 103, name: 'David Kim', department: 'Engineering', salary: 115000, performance: 4.9, years: 6 },
  { emp_id: 104, name: 'Elena Rostova', department: 'Sales', salary: 68000, performance: 3.9, years: 1 },
  { emp_id: 105, name: 'Marcus Brody', department: 'Finance', salary: 88000, performance: 4.5, years: 5 },
  { emp_id: 106, name: 'Linh Nguyen', department: 'Engineering', salary: 102000, performance: 4.7, years: 3 },
];

const SAMPLE_TRAFFIC: TrafficRow[] = [
  { session_id: 'SES-01', device: 'Mobile', country: 'Vietnam', duration_sec: 240, conversions: 2, bounced: false },
  { session_id: 'SES-02', device: 'Desktop', country: 'USA', duration_sec: 45, conversions: 0, bounced: true },
  { session_id: 'SES-03', device: 'Desktop', country: 'Vietnam', duration_sec: 380, conversions: 1, bounced: false },
  { session_id: 'SES-04', device: 'Tablet', country: 'Japan', duration_sec: 120, conversions: 0, bounced: false },
  { session_id: 'SES-05', device: 'Mobile', country: 'Singapore', duration_sec: 510, conversions: 3, bounced: false },
  { session_id: 'SES-06', device: 'Desktop', country: 'USA', duration_sec: 30, conversions: 0, bounced: true },
];

export const PandasExpressionExplorerTool: React.FC<PandasExpressionExplorerToolProps> = ({
  language,
}) => {
  const [dataset, setDataset] = useState<DatasetKey>('sales');
  const [operation, setOperation] = useState<OperationType>('filter');
  const [copied, setCopied] = useState(false);

  // Filter controls
  const [salesRegion, setSalesRegion] = useState<string>('All');
  const [minRevenue, setMinRevenue] = useState<number>(5000);

  // GroupBy controls
  const [groupCol, setGroupCol] = useState<'region' | 'category'>('region');
  const [aggFunc, setAggFunc] = useState<'sum' | 'mean' | 'count'>('sum');

  // Slicing controls
  const [sliceStart, setSliceStart] = useState<number>(0);
  const [sliceStop, setSliceStop] = useState<number>(3);

  // Computed results and snippets
  const computation = useMemo(() => {
    let rows: Record<string, any>[] = [];
    let pythonCode = '';
    let sqlEquivalent = '';
    let daxEquivalent = '';
    let explanation = { en: '', vi: '' };

    if (dataset === 'sales') {
      if (operation === 'filter') {
        const filtered = SAMPLE_SALES.filter((r) => {
          const regionMatch = salesRegion === 'All' || r.region === salesRegion;
          const revMatch = r.revenue >= minRevenue;
          return regionMatch && revMatch;
        });
        rows = filtered;

        const regionClause = salesRegion !== 'All' ? `df['region'] == '${salesRegion}'` : '';
        const revClause = `df['revenue'] >= ${minRevenue}`;
        const combined = regionClause ? `${regionClause} & (${revClause})` : revClause;

        pythonCode = `# Filter DataFrame using boolean indexing\nfiltered_df = df[${combined}]\n\n# Or using readable .query() syntax\nfiltered_df = df.query("${salesRegion !== 'All' ? `region == '${salesRegion}' and ` : ''}revenue >= ${minRevenue}")`;
        sqlEquivalent = `SELECT * \nFROM sales \nWHERE ${salesRegion !== 'All' ? `region = '${salesRegion}' AND ` : ''}revenue >= ${minRevenue};`;
        daxEquivalent = `FilteredSales = \nCALCULATETABLE(\n    Sales,\n    ${salesRegion !== 'All' ? `Sales[Region] = "${salesRegion}",\n    ` : ''}Sales[Revenue] >= ${minRevenue}\n)`;
        explanation = {
          en: `Filters rows where revenue is at least $${minRevenue}${salesRegion !== 'All' ? ` in region ${salesRegion}` : ''}. In Pandas, always enclose individual boolean conditions with parentheses when using & or |.`,
          vi: `Lọc các hàng có doanh thu tối thiểu $${minRevenue}${salesRegion !== 'All' ? ` tại khu vực ${salesRegion}` : ''}. Trong Pandas, luôn bọc từng điều kiện logic trong dấu ngoặc đơn khi kết hợp & hoặc |.`,
        };
      } else if (operation === 'groupby') {
        const groups: Record<string, { total_rev: number; total_cost: number; count: number }> = {};
        SAMPLE_SALES.forEach((r) => {
          const key = r[groupCol];
          if (!groups[key]) groups[key] = { total_rev: 0, total_cost: 0, count: 0 };
          groups[key].total_rev += r.revenue;
          groups[key].total_cost += r.cost;
          groups[key].count += 1;
        });

        rows = Object.entries(groups).map(([k, v]) => ({
          [groupCol]: k,
          revenue_sum: v.total_rev,
          cost_sum: v.total_cost,
          order_count: v.count,
        }));

        pythonCode = `# GroupBy with Named Aggregation\nsummary_df = df.groupby('${groupCol}').agg(\n    total_revenue=('revenue', '${aggFunc}'),\n    total_cost=('cost', '${aggFunc}'),\n    order_count=('order_id', 'count')\n).reset_index()`;
        sqlEquivalent = `SELECT \n    ${groupCol},\n    ${aggFunc.toUpperCase()}(revenue) AS total_revenue,\n    ${aggFunc.toUpperCase()}(cost) AS total_cost,\n    COUNT(order_id) AS order_count\nFROM sales\nGROUP BY ${groupCol};`;
        daxEquivalent = `SalesSummary = \nSUMMARIZE(\n    Sales,\n    Sales[${groupCol.charAt(0).toUpperCase() + groupCol.slice(1)}],\n    "Total Revenue", ${aggFunc === 'mean' ? 'AVERAGE' : 'SUM'}(Sales[Revenue]),\n    "Order Count", COUNTROWS(Sales)\n)`;
        explanation = {
          en: `Groups orders by ${groupCol} and computes aggregations. .reset_index() converts the grouped index back into standard DataFrame columns.`,
          vi: `Gom nhóm theo cột ${groupCol} và tính toán tổng hợp. Phương thức .reset_index() đưa chỉ mục gom nhóm trở lại thành cột dữ liệu chuẩn.`,
        };
      } else if (operation === 'mutate') {
        rows = SAMPLE_SALES.map((r) => {
          const profit = r.revenue - r.cost;
          const margin = ((profit / r.revenue) * 100).toFixed(1);
          return {
            ...r,
            profit,
            margin_pct: `${margin}%`,
          };
        });

        pythonCode = `# Vectorized Column Operations (Fast C-level execution)\ndf['profit'] = df['revenue'] - df['cost']\ndf['margin_pct'] = (df['profit'] / df['revenue']) * 100\n\n# Categorical tier with numpy.select\nimport numpy as np\nconditions = [df['revenue'] >= 15000, df['revenue'] >= 5000]\nchoices = ['High Tier', 'Mid Tier']\ndf['segment'] = np.select(conditions, choices, default='Standard Tier')`;
        sqlEquivalent = `SELECT \n    *,\n    (revenue - cost) AS profit,\n    ROUND(((revenue - cost) / revenue) * 100, 1) AS margin_pct\nFROM sales;`;
        daxEquivalent = `Profit = Sales[Revenue] - Sales[Cost]\n\nMargin % = DIVIDE(Sales[Profit], Sales[Revenue], 0)`;
        explanation = {
          en: 'Calculates profit and margin using vectorized Pandas operations without using slow row-by-row iterrows() loops.',
          vi: 'Tính toán lợi nhuận và biên lợi nhuận bằng toán tử vector hóa, tránh dùng vòng lặp iterrows() làm chậm hiệu năng.',
        };
      } else {
        // slicing
        rows = SAMPLE_SALES.slice(sliceStart, sliceStop);
        pythonCode = `# Slicing rows with .iloc[] (integer position)\nsliced_df = df.iloc[${sliceStart}:${sliceStop}]\n\n# Or top N rows with .head()\ntop_df = df.sort_values(by='revenue', ascending=False).head(${sliceStop})`;
        sqlEquivalent = `SELECT * \nFROM sales \nORDER BY revenue DESC \nLIMIT ${sliceStop} OFFSET ${sliceStart};`;
        daxEquivalent = `TopSales = \nTOPN(${sliceStop}, Sales, Sales[Revenue], DESC)`;
        explanation = {
          en: `.iloc[${sliceStart}:${sliceStop}] retrieves rows by integer index based on Python's half-open interval [start, stop).`,
          vi: `.iloc[${sliceStart}:${sliceStop}] trích xuất các hàng theo chỉ số nguyên dựa trên quy ước nửa mở [start, stop) của Python.`,
        };
      }
    } else {
      // Default / other datasets
      rows = SAMPLE_EMPLOYEES.map((r) => ({ ...r }));
      pythonCode = `# Filtering high-performing engineers\neng_df = df[(df['department'] == 'Engineering') & (df['performance'] >= 4.5)]`;
      sqlEquivalent = `SELECT * FROM employees WHERE department = 'Engineering' AND performance >= 4.5;`;
      daxEquivalent = `HighPerformers = CALCULATETABLE(Employees, Employees[Department] = "Engineering", Employees[Performance] >= 4.5)`;
      explanation = {
        en: 'Filters DataFrame based on multi-attribute criteria.',
        vi: 'Lọc DataFrame theo nhiều thuộc tính kết hợp.',
      };
    }

    return { rows, pythonCode, sqlEquivalent, daxEquivalent, explanation };
  }, [dataset, operation, salesRegion, minRevenue, groupCol, aggFunc, sliceStart, sliceStop]);

  const handleCopy = () => {
    navigator.clipboard.writeText(computation.pythonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Operation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => setOperation('filter')}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            operation === 'filter'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          {language === 'vi' ? 'Lọc dữ liệu (Boolean & .query)' : 'Filtering (Boolean & .query)'}
        </button>
        <button
          type="button"
          onClick={() => setOperation('groupby')}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            operation === 'groupby'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          {language === 'vi' ? 'Gom nhóm & Tổng hợp (.groupby)' : 'Aggregation (.groupby)'}
        </button>
        <button
          type="button"
          onClick={() => setOperation('mutate')}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            operation === 'mutate'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          {language === 'vi' ? 'Tạo cột mới (Vectorization)' : 'New Columns (Vectorized)'}
        </button>
        <button
          type="button"
          onClick={() => setOperation('slicing')}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            operation === 'slicing'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          {language === 'vi' ? 'Cắt lát (.iloc & .head)' : 'Slicing (.iloc & .head)'}
        </button>
      </div>

      {/* Interactive Controls Bar */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-500">
              {language === 'vi' ? 'Tập dữ liệu mẫu:' : 'Sample Dataset:'}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setDataset('sales')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                  dataset === 'sales'
                    ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                sales_df
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            <span>{computation.rows.length} rows returned</span>
          </div>
        </div>

        {/* Dynamic Controls based on operation */}
        {operation === 'filter' && (
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <div className="flex items-center gap-2">
              <label className="text-xs font-mono text-slate-600 dark:text-slate-300">
                Region ==
              </label>
              <select
                value={salesRegion}
                onChange={(e) => setSalesRegion(e.target.value)}
                className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
              >
                <option value="All">All Regions</option>
                <option value="North">North</option>
                <option value="West">West</option>
                <option value="South">South</option>
                <option value="East">East</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-mono text-slate-600 dark:text-slate-300">
                revenue &gt;= ${minRevenue}
              </label>
              <input
                type="range"
                min={0}
                max={20000}
                step={1000}
                value={minRevenue}
                onChange={(e) => setMinRevenue(Number(e.target.value))}
                className="w-32 accent-blue-600"
              />
            </div>
          </div>
        )}

        {operation === 'groupby' && (
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <div className="flex items-center gap-2">
              <label className="text-xs font-mono text-slate-600 dark:text-slate-300">
                groupby([
              </label>
              <select
                value={groupCol}
                onChange={(e) => setGroupCol(e.target.value as any)}
                className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
              >
                <option value="region">'region'</option>
                <option value="category">'category'</option>
              </select>
              <span className="text-xs font-mono text-slate-600 dark:text-slate-300">])</span>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-mono text-slate-600 dark:text-slate-300">
                .agg(
              </label>
              <select
                value={aggFunc}
                onChange={(e) => setAggFunc(e.target.value as any)}
                className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
              >
                <option value="sum">'sum'</option>
                <option value="mean">'mean'</option>
                <option value="count">'count'</option>
              </select>
              <span className="text-xs font-mono text-slate-600 dark:text-slate-300">)</span>
            </div>
          </div>
        )}

        {operation === 'slicing' && (
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <div className="flex items-center gap-2">
              <label className="text-xs font-mono text-slate-600 dark:text-slate-300">
                .iloc[{sliceStart} :
              </label>
              <input
                type="number"
                min={0}
                max={5}
                value={sliceStop}
                onChange={(e) => setSliceStop(Math.max(1, Number(e.target.value)))}
                className="w-16 p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
              />
              <span className="text-xs font-mono text-slate-600 dark:text-slate-300">]</span>
            </div>
          </div>
        )}
      </div>

      {/* Live Table Preview */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Table className="w-4 h-4 text-blue-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-700 dark:text-slate-300">
              {language === 'vi' ? 'Bảng kết quả chuyển đổi (Live DataFrame Result)' : 'Live DataFrame Result'}
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono bg-slate-50 dark:bg-slate-800/60">
                {computation.rows.length > 0 &&
                  Object.keys(computation.rows[0]).map((col) => (
                    <th key={col} className="py-2 px-3">
                      {col}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              {computation.rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  {Object.values(row).map((val, cIdx) => (
                    <td key={cIdx} className="py-2 px-3 text-slate-700 dark:text-slate-200">
                      {typeof val === 'number' ? val.toLocaleString() : String(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generated Code Snippet */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5 text-blue-500" />
            <span>Python Pandas Code</span>
          </span>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (language === 'vi' ? 'Đã sao chép' : 'Copied!') : (language === 'vi' ? 'Sao chép code' : 'Copy Code')}</span>
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-slate-900 text-blue-300 font-mono text-xs overflow-x-auto border border-slate-800">
          {computation.pythonCode}
        </pre>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
          {computation.explanation[language]}
        </p>
      </div>

      {/* Cross-Domain Bridge: SQL & Power BI DAX Equivalents */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
          <Database className="w-3.5 h-3.5 text-blue-500" />
          <span>
            {language === 'vi'
              ? 'Tương đương về mặt khái niệm (Conceptual Equivalence):'
              : 'Conceptual Semantic Equivalence Across Stacks:'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* SQL Equivalent */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
              <Database className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Tương đương trong SQL' : 'SQL Equivalent'}</span>
            </div>
            <pre className="p-3 rounded-xl bg-slate-900 text-cyan-300 font-mono text-xs overflow-x-auto border border-slate-800">
              {computation.sqlEquivalent}
            </pre>
          </div>

          {/* Power BI DAX Equivalent */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
              <Layers className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Tương đương trong Power BI / DAX' : 'Power BI DAX Equivalent'}</span>
            </div>
            <pre className="p-3 rounded-xl bg-slate-900 text-amber-300 font-mono text-xs overflow-x-auto border border-slate-800">
              {computation.daxEquivalent}
            </pre>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 dark:text-slate-500 italic">
          {language === 'vi'
            ? '* Lưu ý: Các biểu thức SQL và DAX trên thể hiện cùng một thao tác xử lý dữ liệu về mặt khái niệm; cú pháp và cơ chế thực thi (In-memory DataFrame vs RDBMS relational algebra vs DAX VertiPaq engine) có sự khác biệt bản chất.'
            : '* Note: SQL and DAX snippets illustrate identical conceptual analytical operations. Physical execution semantics differ fundamentally between Pandas in-memory arrays, relational SQL query engines, and DAX columnar VertiPaq models.'}
        </p>
      </div>
    </div>
  );
};
