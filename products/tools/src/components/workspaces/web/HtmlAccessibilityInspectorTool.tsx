import React, { useState, useMemo } from 'react';
import { Language } from '../../../types';
import {
  ShieldCheck,
  AlertTriangle,
  Code,
  Sparkles,
  Layers,
} from 'lucide-react';

interface HtmlAccessibilityInspectorToolProps {
  language: Language;
}

const SAMPLE_HTML = `<button onclick="submitForm()">Submit</button>
<img src="/avatar.jpg">
<input type="text" placeholder="Your name">
<div onclick="navigate()">Clickable Div</div>
<a href="#">Read More</a>`;

export const HtmlAccessibilityInspectorTool: React.FC<HtmlAccessibilityInspectorToolProps> = ({
  language,
}) => {
  const [html, setHtml] = useState(SAMPLE_HTML);

  const audit = useMemo(() => {
    const raw = html;
    const issues: { rule: string; desc: { en: string; vi: string }; severity: 'critical' | 'warning' }[] = [];

    if (/<img(?![^>]*\balt=)[^>]*>/i.test(raw)) {
      issues.push({
        rule: 'img-alt-missing',
        desc: {
          en: 'Image element <img> is missing an `alt` attribute for screen readers.',
          vi: 'Thẻ <img> thiếu thuộc tính `alt` mô tả hình ảnh cho người khiếm thị.',
        },
        severity: 'critical',
      });
    }

    if (/<input(?![^>]*\baria-label=)[^>]*placeholder=[^>]*>/i.test(raw) && !raw.includes('<label')) {
      issues.push({
        rule: 'input-missing-label',
        desc: {
          en: 'Form input relies solely on placeholder instead of an associated <label> or aria-label.',
          vi: 'Ô nhập liệu chỉ dựa vào placeholder mà thiếu thẻ <label> hoặc aria-label.',
        },
        severity: 'warning',
      });
    }

    if (/<div[^>]*onclick/i.test(raw)) {
      issues.push({
        rule: 'non-interactive-element-click',
        desc: {
          en: 'Non-interactive <div> element has an onclick listener. Use a native <button> or add role="button" and tabindex="0".',
          vi: 'Thẻ <div> không có tính tương tác gắn onclick. Nên dùng thẻ <button> chuẩn.',
        },
        severity: 'critical',
      });
    }

    if (/<a[^>]*href=["']#["']/i.test(raw)) {
      issues.push({
        rule: 'empty-anchor-href',
        desc: {
          en: 'Anchor tag <a> with href="#" is an anti-pattern. If triggering an action, use <button>.',
          vi: 'Thẻ <a> dùng href="#" không chuẩn. Nếu kích hoạt hành động, hãy dùng <button>.',
        },
        severity: 'warning',
      });
    }

    return issues;
  }, [html]);

  return (
    <div className="space-y-6">
      {/* HTML Input Area */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
          <Code className="w-4 h-4 text-sky-500" />
          <span>HTML Code Snippet</span>
        </label>
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          rows={6}
          className="w-full p-3 rounded-xl bg-slate-900 text-sky-300 font-mono text-xs border border-slate-800"
        />
      </div>

      {/* Audit Checklist */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
          WCAG 2.1 Accessibility Audit Results
        </h3>

        {audit.length > 0 ? (
          <div className="space-y-2">
            {audit.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                  item.severity === 'critical'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
                }`}
              >
                <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${item.severity === 'critical' ? 'text-rose-500' : 'text-amber-500'}`} />
                <div>
                  <span className="font-bold font-mono text-[11px] uppercase">[{item.rule}]: </span>
                  <span>{item.desc[language]}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Passed accessibility heuristics! Clean semantic markup.</span>
          </div>
        )}
      </div>
    </div>
  );
};
