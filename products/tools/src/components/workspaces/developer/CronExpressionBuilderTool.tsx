import React, { useState } from 'react';
import { Language } from '../../../types';
import {
  Clock,
  Copy,
  Check,
  Sparkles,
  Layers,
} from 'lucide-react';

interface CronExpressionBuilderToolProps {
  language: Language;
}

export const CronExpressionBuilderTool: React.FC<CronExpressionBuilderToolProps> = ({ language }) => {
  const [minute, setMinute] = useState('0');
  const [hour, setHour] = useState('12');
  const [dayOfMonth, setDayOfMonth] = useState('*');
  const [month, setMonth] = useState('*');
  const [dayOfWeek, setDayOfWeek] = useState('1-5');
  const [copied, setCopied] = useState(false);

  const cronExpr = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

  const getHumanReadable = () => {
    return language === 'vi'
      ? `Chạy vào lúc ${hour}:${minute.padStart(2, '0')} vào các ngày trong tuần (Thứ Hai đến Thứ Sáu) hàng tháng.`
      : `Runs at ${hour}:${minute.padStart(2, '0')}, every Monday through Friday, every month.`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(cronExpr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 5 Field Inputs */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500">
          Standard 5-Field Unix Cron Parameters
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="space-y-1">
            <label className="font-mono font-bold text-slate-700 dark:text-slate-300">Minute (0-59)</label>
            <input
              type="text"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-center font-bold"
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono font-bold text-slate-700 dark:text-slate-300">Hour (0-23)</label>
            <input
              type="text"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-center font-bold"
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono font-bold text-slate-700 dark:text-slate-300">Day of Month (1-31)</label>
            <input
              type="text"
              value={dayOfMonth}
              onChange={(e) => setDayOfMonth(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-center font-bold"
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono font-bold text-slate-700 dark:text-slate-300">Month (1-12)</label>
            <input
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-center font-bold"
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono font-bold text-slate-700 dark:text-slate-300">Day of Week (0-6 Sun-Sat)</label>
            <input
              type="text"
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-center font-bold"
            />
          </div>
        </div>
      </div>

      {/* Output Display */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-500" />
            <span>Generated Cron Expression</span>
          </span>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Expression'}</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-lg font-bold text-center tracking-widest border border-slate-800">
          {cronExpr}
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 text-center">
          {getHumanReadable()}
        </p>
      </div>
    </div>
  );
};
