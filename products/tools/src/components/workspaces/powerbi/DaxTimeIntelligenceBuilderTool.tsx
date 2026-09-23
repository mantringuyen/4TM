import React, { useState } from 'react';
import { Language } from '../../../types';
import {
  Calendar,
  Copy,
  Check,
  Sparkles,
  Layers,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Info,
} from 'lucide-react';

interface DaxTimeIntelligenceBuilderToolProps {
  language: Language;
}

type PatternType = 'ytd' | 'mtd' | 'prior_year' | 'yoy_growth' | 'rolling_avg';

export const DaxTimeIntelligenceBuilderTool: React.FC<DaxTimeIntelligenceBuilderToolProps> = ({
  language,
}) => {
  const [pattern, setPattern] = useState<PatternType>('ytd');
  const [measureName, setMeasureName] = useState('Total Sales');
  const [dateTable, setDateTable] = useState("'Date'");
  const [dateColumn, setDateColumn] = useState("'Date'[Date]");
  const [rollingMonths, setRollingMonths] = useState('3');
  const [copied, setCopied] = useState(false);

  const generateMeasure = (): { name: string; code: string; explanation: string; checklist: string[] } => {
    switch (pattern) {
      case 'ytd': {
        const name = `${measureName} YTD`;
        const code = `${name} = 
CALCULATE(
    [${measureName}],
    DATESYTD(${dateColumn})
)`;
        return {
          name,
          code,
          explanation:
            language === 'vi'
              ? `Tính tổng lũy kế từ đầu năm đến ngày được chọn hiện tại bằng cách áp dụng hàm DATESYTD lên cột ngày chuẩn.`
              : `Calculates cumulative Year-to-Date total up to the latest date in the current filter context using DATESYTD.`,
          checklist: [
            language === 'vi' ? 'Bảng Date phải là bảng ngày liên tục (không gián đoạn)' : 'Date table must contain contiguous dates without gaps',
            language === 'vi' ? 'Đã đánh dấu Mark as Date Table trong Power BI' : 'Marked as Date Table in Power BI Data Model',
          ],
        };
      }

      case 'mtd': {
        const name = `${measureName} MTD`;
        const code = `${name} = 
CALCULATE(
    [${measureName}],
    DATESMTD(${dateColumn})
)`;
        return {
          name,
          code,
          explanation:
            language === 'vi'
              ? `Tính tổng lũy kế từ ngày 1 của tháng đến ngày hiện tại.`
              : `Calculates cumulative Month-to-Date total starting from day 1 of the selected month.`,
          checklist: [
            language === 'vi' ? 'Sử dụng hàm DATESMTD chuẩn' : 'Uses standard DATESMTD time intelligence',
            language === 'vi' ? 'Bảng ngày có quan hệ 1-Nhiều với bảng dữ liệu fact' : '1-to-many relationship from Date table to Fact table',
          ],
        };
      }

      case 'prior_year': {
        const name = `${measureName} PY`;
        const code = `${name} = 
CALCULATE(
    [${measureName}],
    SAMEPERIODLASTYEAR(${dateColumn})
)`;
        return {
          name,
          code,
          explanation:
            language === 'vi'
              ? `Dịch chuyển toàn bộ khoảng thời gian được lọc lùi về đúng 1 năm trước (SAMEPERIODLASTYEAR).`
              : `Shifts the active date selection backward by exactly one calendar year.`,
          checklist: [
            language === 'vi' ? 'Tự động xử lý năm nhuận (29/02)' : 'Handles leap years (Feb 29) gracefully',
            language === 'vi' ? 'Yêu cầu bảng Date có đủ dữ liệu năm trước' : 'Requires prior year date records present in Date table',
          ],
        };
      }

      case 'yoy_growth': {
        const name = `${measureName} YoY %`;
        const code = `${name} = 
VAR CurrentSales = [${measureName}]
VAR PriorYearSales = 
    CALCULATE(
        [${measureName}],
        SAMEPERIODLASTYEAR(${dateColumn})
    )
RETURN
    DIVIDE(
        CurrentSales - PriorYearSales,
        PriorYearSales,
        BLANK()
    )`;
        return {
          name,
          code,
          explanation:
            language === 'vi'
              ? `Tính tỷ lệ tăng trưởng phần trăm so với cùng kỳ năm trước với biến VAR và hàm DIVIDE chống lỗi chia 0.`
              : `Calculates Year-over-Year percentage growth using variables and safe division with DIVIDE.`,
          checklist: [
            language === 'vi' ? 'Định dạng thành kiểu Percentage (%) trong Power BI' : 'Format measure as Percentage (%) in Power BI',
            language === 'vi' ? 'DIVIDE tự động trả về BLANK() khi năm trước chưa có doanh số' : 'DIVIDE safely handles division by zero or missing baseline',
          ],
        };
      }

      case 'rolling_avg': {
        const name = `${measureName} Rolling ${rollingMonths}M Avg`;
        const code = `${name} = 
CALCULATE(
    AVERAGEX(
        VALUES(${dateTable}[YearMonth]),
        [${measureName}]
    ),
    DATESINPERIOD(
        ${dateColumn},
        MAX(${dateColumn}),
        -${rollingMonths},
        MONTH
    )
)`;
        return {
          name,
          code,
          explanation:
            language === 'vi'
              ? `Tính trung bình trượt ${rollingMonths} tháng gần nhất bằng DATESINPERIOD lùi từ ngày lớn nhất trong bối cảnh lọc.`
              : `Calculates a rolling ${rollingMonths}-month moving average using DATESINPERIOD backwards from the maximum active date.`,
          checklist: [
            language === 'vi' ? 'Tạo đường xu hướng mượt mà cho đồ thị' : 'Smooths volatility for trend line charts',
            language === 'vi' ? `Yêu cầu cột ${dateTable}[YearMonth] có mặt trong mô hình` : `Requires ${dateTable}[YearMonth] granularity column`,
          ],
        };
      }
    }
  };

  const { name, code, explanation, checklist } = generateMeasure();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Date Table Modeling Prerequisites Notice */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">
            {language === 'vi' ? 'Yêu cầu tiên quyết về mô hình dữ liệu (Date Table):' : 'Data Model Prerequisite (Dedicated Date Dimension):'}
          </p>
          <p className="text-amber-800 dark:text-amber-300">
            {language === 'vi'
              ? 'Các hàm Time Intelligence trong DAX yêu cầu một bảng ngày chuẩn chuyên biệt (Date table) với các ngày liên tục không bị ngắt quãng và đã được chọn "Mark as Date Table" trong Power BI.'
              : 'DAX Time Intelligence functions require a dedicated Date table with unbroken contiguous dates marked as "Mark as Date Table" in Power BI.'}
          </p>
        </div>
      </div>

      {/* Pattern Selector */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => setPattern('ytd')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            pattern === 'ytd'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Year-to-Date (YTD)
        </button>
        <button
          type="button"
          onClick={() => setPattern('mtd')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            pattern === 'mtd'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Month-to-Date (MTD)
        </button>
        <button
          type="button"
          onClick={() => setPattern('prior_year')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            pattern === 'prior_year'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Same Period Last Year (PY)
        </button>
        <button
          type="button"
          onClick={() => setPattern('yoy_growth')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            pattern === 'yoy_growth'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          YoY Growth &amp; %
        </button>
        <button
          type="button"
          onClick={() => setPattern('rolling_avg')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            pattern === 'rolling_avg'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Rolling Moving Average
        </button>
      </div>

      {/* Model Parameter Form */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {language === 'vi' ? 'Tên Base Measure gốc' : 'Base Measure Name'}
            </label>
            <input
              type="text"
              value={measureName}
              onChange={(e) => setMeasureName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {language === 'vi' ? 'Bảng ngày (Date Table)' : 'Date Table Name'}
            </label>
            <input
              type="text"
              value={dateTable}
              onChange={(e) => setDateTable(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {language === 'vi' ? 'Cột ngày chuẩn (Date Column)' : 'Date Column Reference'}
            </label>
            <input
              type="text"
              value={dateColumn}
              onChange={(e) => setDateColumn(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
            />
          </div>

          {pattern === 'rolling_avg' && (
            <div className="space-y-1 sm:col-span-3">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'vi' ? 'Số tháng trượt (Months)' : 'Rolling Months'}
              </label>
              <input
                type="number"
                min="1"
                max="36"
                value={rollingMonths}
                onChange={(e) => setRollingMonths(e.target.value)}
                className="w-full max-w-xs p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
              />
            </div>
          )}
        </div>
      </div>

      {/* Generated DAX Measure Code Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{name}</span>
          </span>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-xs transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (language === 'vi' ? 'Đã sao chép' : 'Copied!') : (language === 'vi' ? 'Sao chép Measure' : 'Copy Measure')}</span>
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-slate-900 text-amber-400 font-mono text-xs sm:text-sm font-semibold overflow-x-auto border border-slate-800">
          {code}
        </pre>

        {/* Explanation & Checklist */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <span className="font-bold text-slate-900 dark:text-white">{language === 'vi' ? 'Cơ chế hoạt động: ' : 'Logic: '}</span>
            {explanation}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {checklist.map((c, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20"
              >
                ✓ {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
