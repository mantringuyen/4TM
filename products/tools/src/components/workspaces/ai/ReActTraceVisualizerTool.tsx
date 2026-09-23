import React, { useState } from 'react';
import { Language } from '../../../types';
import {
  Sparkles,
  Layers,
  ArrowRight,
  Search,
  CheckCircle2,
  Terminal,
  Cpu,
} from 'lucide-react';

interface ReActTraceVisualizerToolProps {
  language: Language;
}

interface ReActStep {
  thought: string;
  action: string;
  actionInput: string;
  observation: string;
}

const SAMPLE_TRACE: ReActStep[] = [
  {
    thought: 'The user is asking for the total sales in Vietnam for Q1 2026. I need to query the analytics database.',
    action: 'sql_db_query',
    actionInput: 'SELECT SUM(amount) FROM sales WHERE country = "Vietnam" AND date >= "2026-01-01" AND date <= "2026-03-31";',
    observation: '[{"SUM(amount)": 485200.0}]',
  },
  {
    thought: 'The database returned total sales of $485,200. Now I need to calculate the growth percentage compared to Q1 2025 ($410,000).',
    action: 'calculator_engine',
    actionInput: '(485200 - 410000) / 410000 * 100',
    observation: '18.3414634146',
  },
  {
    thought: 'I now have all necessary metrics. I will summarize the final answer for the user.',
    action: 'Final Answer',
    actionInput: 'Total Vietnam sales in Q1 2026 reached $485,200, representing an 18.34% year-over-year increase.',
    observation: 'Task completed successfully.',
  },
];

export const ReActTraceVisualizerTool: React.FC<ReActTraceVisualizerToolProps> = ({
  language,
}) => {
  const [steps] = useState<ReActStep[]>(SAMPLE_TRACE);

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-900 dark:text-purple-200 space-y-1">
        <h3 className="font-bold text-sm text-purple-700 dark:text-purple-300">
          {language === 'vi' ? 'Mô hình Tác tử ReAct (Reasoning + Acting)' : 'ReAct (Reason + Act) Agent Execution Loop'}
        </h3>
        <p className="leading-relaxed">
          {language === 'vi'
            ? 'Vòng lặp ReAct phối hợp chặt chẽ giữa Suy nghĩ (Thought) → Gọi công cụ thực thi (Action) → Thu nhận kết quả thực tế (Observation) để giải quyết các tác vụ đa bước tin cậy.'
            : 'ReAct agent loops interleave reasoning traces with domain-specific tool actions, observing grounded runtime outputs until achieving the goal.'}
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
                Step {idx + 1}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Action: {step.action}
              </span>
            </div>

            {/* Thought */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-amber-500">
                💭 Thought (Suy ngẫm)
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic pl-3 border-l-2 border-amber-400">
                "{step.thought}"
              </p>
            </div>

            {/* Action & Input */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-blue-500">
                ⚙️ Action &amp; Payload (Hành động)
              </span>
              <pre className="p-2.5 rounded-lg bg-slate-900 text-blue-300 font-mono text-xs overflow-x-auto">
                {step.action}({step.actionInput})
              </pre>
            </div>

            {/* Observation */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-500">
                👁️ Observation (Quan sát phản hồi)
              </span>
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-mono text-xs">
                {step.observation}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
