import React, { useState, useMemo } from 'react';
import { Language } from '../../../types';
import {
  Code,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Layers,
  Table,
  Filter,
} from 'lucide-react';

interface PowerQueryMExplainerToolProps {
  language: Language;
}

const M_PRESETS = [
  {
    name: 'Unpivot Columns & Rename',
    code: `let
    Source = Excel.CurrentWorkbook(){[Name="SalesRaw"]}[Content],
    #"Changed Type" = Table.TransformColumnTypes(Source,{{"Region", type text}, {"2024", type number}, {"2025", type number}, {"2026", type number}}),
    #"Unpivoted Other Columns" = Table.UnpivotOtherColumns(#"Changed Type", {"Region"}, "Year", "SalesAmount"),
    #"Filtered Positive" = Table.SelectRows(#"Unpivoted Other Columns", each [SalesAmount] > 0)
in
    #"Filtered Positive"`,
  },
  {
    name: 'Merge & Expand Related Table',
    code: `let
    Source = OData.Feed("https://services.odata.org/V4/Northwind/Northwind.svc/"),
    Orders_table = Source{[Name="Orders",Signature="table"]}[Data],
    #"Merged Customers" = Table.NestedJoin(Orders_table, {"CustomerID"}, Customers, {"CustomerID"}, "CustomerData", JoinKind.LeftOuter),
    #"Expanded CustomerData" = Table.ExpandTableColumn(#"Merged Customers", "CustomerData", {"CompanyName", "Country"}, {"Company", "Country"})
in
    #"Expanded CustomerData"`,
  },
];

export const PowerQueryMExplainerTool: React.FC<PowerQueryMExplainerToolProps> = ({ language }) => {
  const [mCode, setMCode] = useState(M_PRESETS[0].code);
  const [copied, setCopied] = useState(false);

  const steps = useMemo(() => {
    const lines = mCode.split('\n');
    const parsedSteps: { stepName: string; expression: string; explanation: { en: string; vi: string } }[] = [];

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('let') || trimmed.startsWith('in') || !trimmed) return;

      const equalIdx = trimmed.indexOf('=');
      if (equalIdx > 0) {
        const stepName = trimmed.substring(0, equalIdx).replace(/^[#"]+|["#,]+$/g, '').trim();
        const expression = trimmed.substring(equalIdx + 1).replace(/,$/, '').trim();

        let explanation = {
          en: 'Evaluates transformation step in data pipeline.',
          vi: 'Thực thi bước biến đổi dữ liệu trong chuỗi xử lý.',
        };

        if (expression.includes('Table.UnpivotOtherColumns')) {
          explanation = {
            en: 'Transforms wide monthly/yearly columns into standardized tall Key-Value rows (Unpivot) for normalized Star Schema analytics.',
            vi: 'Chuyển đổi dữ liệu từ dạng bảng ngang (rộng) sang dạng bảng dọc (chuẩn hóa) để nạp vào mô hình Star Schema.',
          };
        } else if (expression.includes('Table.TransformColumnTypes')) {
          explanation = {
            en: 'Enforces strict data types (Text, Number, Date) on table columns to ensure query folding and fast storage.',
            vi: 'Quy định kiểu dữ liệu nghiêm ngặt (Văn bản, Số, Ngày tháng) cho từng cột.',
          };
        } else if (expression.includes('Table.SelectRows')) {
          explanation = {
            en: 'Filters rows based on a boolean predicate (filters out zero/negative or null values).',
            vi: 'Lọc các dòng trong bảng thỏa mãn điều kiện logic chỉ định.',
          };
        } else if (expression.includes('Table.NestedJoin')) {
          explanation = {
            en: 'Performs a relational join (e.g. Left Outer Join) between two tables in memory or via Query Folding on SQL.',
            vi: 'Thực hiện phép nối bảng quan hệ (Left Outer Join) giữa 2 bảng.',
          };
        } else if (expression.includes('Table.ExpandTableColumn')) {
          explanation = {
            en: 'Unpacks specific columns from the nested table object into the current table schema.',
            vi: 'Mở rộng các cột chỉ định từ bảng con được gộp vào bảng hiện tại.',
          };
        }

        parsedSteps.push({
          stepName,
          expression,
          explanation,
        });
      }
    });

    return parsedSteps;
  }, [mCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(mCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Code Input & Presets */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <Code className="w-4 h-4 text-amber-500" />
            <span>{language === 'vi' ? 'Nhập mã Power Query M Script' : 'Power Query M Formula Code'}</span>
          </label>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-500">{language === 'vi' ? 'Mẫu kịch bản M:' : 'Sample Recipes:'}</span>
            <div className="flex flex-wrap gap-1">
              {M_PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setMCode(p.code)}
                  className="px-2 py-0.5 rounded-lg text-[11px] font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors cursor-pointer"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <textarea
          value={mCode}
          onChange={(e) => setMCode(e.target.value)}
          rows={7}
          className="w-full font-mono text-xs sm:text-sm p-3.5 rounded-xl bg-slate-900 text-amber-400 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{language === 'vi' ? 'Phân giải tuần tự các bước trong khối let...in' : 'Step-by-step pipeline parsing of let...in blocks'}</span>
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

      {/* Step-by-Step Execution Pipeline */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400 flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-500" />
          <span>{language === 'vi' ? 'Quy trình xử lý tuần tự (ETL Pipeline)' : 'Step-by-Step ETL Transformation Pipeline'}</span>
        </h3>

        <div className="space-y-3">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white font-mono">
                    #{`"${s.stepName}"`}
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 text-amber-300 font-mono text-xs overflow-x-auto">
                {s.expression}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {s.explanation[language]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
