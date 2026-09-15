import React, { useState } from 'react';
import { 
  Terminal, 
  Sparkles, 
  FolderPlus, 
  FileCode2, 
  Save, 
  Play, 
  Layers, 
  Database, 
  Layout, 
  Palette, 
  Code2,
  BarChart3,
  FileSpreadsheet
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { CodeEditor } from './CodeEditor';
import { PowerBiWorkspace } from './PowerBiWorkspace';

export const PlaygroundView: React.FC = () => {
  const { dict } = useLanguage();
  const [selectedLang, setSelectedLang] = useState<'python' | 'excel' | 'sql' | 'powerbi' | 'html' | 'css' | 'javascript'>('python');

  const templates: Record<string, string> = {
    python: `# 4TM Python Sandbox (Powered by Pyodide WASM)
import math

def calculate_primes(limit):
    primes = []
    for num in range(2, limit + 1):
        if all(num % i != 0 for i in range(2, int(math.isqrt(num)) + 1)):
            primes.append(num)
    return primes

result = calculate_primes(50)
print("Primes up to 50:", result)
print("Total found:", len(result))
`,
    excel: `// 4TM Microsoft Excel Formula Sandbox
// Sample grid: A1:A5 = [1200, 2400, 3100, 1800, 4500], B1:B5 = ["East", "West", "East", "North", "East"]

=XLOOKUP(MAX(A1:A5), A1:A5, B1:B5, "Not Found")
`,
    sql: `-- 4TM SQLite Sandbox (In-browser WASM Database)
-- The "students" and "orders" tables are already pre-seeded!

SELECT 
    s.name, 
    s.course, 
    s.grade, 
    COALESCE(SUM(o.amount), 0) AS total_spent
FROM students s
LEFT JOIN orders o ON s.name = o.customer_name
GROUP BY s.name
ORDER BY s.grade DESC;
`,
    powerbi: `// 4TM Microsoft Power BI DAX Studio
// Model tables available: Sales, Customers, Products, Calendar

Total Revenue = SUM(Sales[Revenue])
Total Profit = SUM(Sales[Profit])
Profit Margin = DIVIDE([Total Profit], [Total Revenue], 0)
North Region Sales = CALCULATE(SUM(Sales[Revenue]), Sales[Region] = "North")
`,
    html: `<!-- 4TM HTML5 Sandbox -->
<div style="font-family: system-ui, sans-serif; padding: 24px; background: #0f172a; color: #f8fafc; border-radius: 12px;">
  <h1 style="color: #38bdf8; margin-top: 0;">Hello from 4TM Sandbox!</h1>
  <p style="color: #94a3b8;">This HTML renders in a secure isolated iframe directly in your browser.</p>
  <button style="padding: 10px 20px; background: #6366f1; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
    Interactive Button
  </button>
</div>
`,
    css: `/* 4TM CSS & HTML Sandbox */
<style>
  .card-container {
    display: flex;
    gap: 16px;
    padding: 24px;
    background: #020617;
    font-family: sans-serif;
  }
  .card {
    flex: 1;
    background: #1e293b;
    color: #e2e8f0;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #334155;
    transition: transform 0.2s ease;
  }
</style>

<div class="card-container">
  <div class="card">
    <h3 style="color:#38bdf8; margin-top:0;">Card 1</h3>
    <p>Modern flexbox column.</p>
  </div>
  <div class="card">
    <h3 style="color:#a855f7; margin-top:0;">Card 2</h3>
    <p>Responsive design sandbox.</p>
  </div>
</div>
`,
    javascript: `// 4TM JavaScript ES6+ Engine
const students = [
  { name: 'Alice', scores: [88, 92, 95] },
  { name: 'Bob', scores: [70, 65, 80] },
  { name: 'Charlie', scores: [90, 85, 98] },
];

const summaries = students.map(s => {
  const avg = s.scores.reduce((a, b) => a + b, 0) / s.scores.length;
  return {
    name: s.name,
    average: Math.round(avg * 10) / 10,
    status: avg >= 80 ? 'Distinction' : 'Pass'
  };
});

console.log("Performance Report:", JSON.stringify(summaries, null, 2));
`
  };

  const languages = [
    { id: 'python', name: 'Python 3', icon: Terminal, color: 'text-amber-400' },
    { id: 'excel', name: 'Excel Formulas', icon: FileSpreadsheet, color: 'text-emerald-400' },
    { id: 'sql', name: 'SQLite SQL', icon: Database, color: 'text-sky-400' },
    { id: 'powerbi', name: 'Power BI & DAX', icon: BarChart3, color: 'text-amber-400' },
    { id: 'html', name: 'HTML5', icon: Layout, color: 'text-orange-400' },
    { id: 'css', name: 'CSS3', icon: Palette, color: 'text-blue-400' },
    { id: 'javascript', name: 'JavaScript', icon: Code2, color: 'text-yellow-400' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-none transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 dark:border-blue-500/30">
              <Terminal className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase font-bold text-blue-600 dark:text-blue-400">
              {dict.playground.title}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{dict.playground.title}</h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{dict.playground.subtitle}</p>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-inner">
          {languages.map(lang => {
            const Icon = lang.icon;
            const active = selectedLang === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id as any)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                  active
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md border border-slate-200 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${lang.color}`} />
                <span>{lang.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor or Power BI Workspace */}
      {selectedLang === 'powerbi' ? (
        <PowerBiWorkspace
          initialDax={templates.powerbi}
          height="620px"
        />
      ) : (
        <CodeEditor
          initialCode={templates[selectedLang]}
          language={selectedLang}
          mode="playground"
        />
      )}
    </div>
  );
};
