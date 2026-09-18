import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { InputPanel, OutputPanel, FormatSelector, ErrorMessage } from '../common/Panels';
import { ResetButton } from '../common/ActionButtons';
import { Code2, Minimize2, Wand2, Sparkles, Database } from 'lucide-react';
import { format as formatSql, SqlLanguage } from 'sql-formatter';

interface SqlFormatterToolProps {
  language: Language;
}

type Dialect = 'postgresql' | 'mysql' | 'sqlite' | 'transactsql';

const SAMPLES: Record<Dialect, string> = {
  postgresql: `WITH active_orders AS (
  SELECT o.id, o.customer_id, o.total_amount, o.created_at,
         ROW_NUMBER() OVER (PARTITION BY o.customer_id ORDER BY o.created_at DESC) as rn
  FROM orders o
  WHERE o.status = 'completed' AND o.created_at >= NOW() - INTERVAL '30 days'
)
SELECT c.name as customer_name, c.email, ao.total_amount, ao.created_at
FROM customers c
INNER JOIN active_orders ao ON c.id = ao.customer_id
WHERE ao.rn = 1
GROUP BY c.id, c.name, c.email, ao.total_amount, ao.created_at
HAVING ao.total_amount > 150.00
ORDER BY ao.total_amount DESC
LIMIT 50;`,

  mysql: `SELECT u.id, u.username, u.email,
       COUNT(DISTINCT p.id) AS total_posts,
       COALESCE(SUM(v.vote_count), 0) AS karma_score
FROM users u
LEFT JOIN posts p ON u.id = p.user_id AND p.is_deleted = 0
LEFT JOIN (
    SELECT post_id, COUNT(*) AS vote_count
    FROM post_votes
    WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    GROUP BY post_id
) v ON p.id = v.post_id
WHERE u.status = 'active'
GROUP BY u.id, u.username, u.email
HAVING total_posts >= 5
ORDER BY karma_score DESC
LIMIT 20 OFFSET 0;`,

  sqlite: `CREATE TABLE IF NOT EXISTS student_grades (
    student_id INTEGER NOT NULL,
    course_code TEXT NOT NULL,
    score REAL CHECK(score >= 0.0 AND score <= 100.0),
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id, course_code)
);

INSERT INTO student_grades (student_id, course_code, score)
VALUES (101, '4TM-SQL-01', 94.5), (102, '4TM-PY-02', 88.0);

SELECT s.name, g.course_code, g.score
FROM students s
JOIN student_grades g ON s.id = g.student_id
WHERE g.score >= 80.0
ORDER BY g.score DESC;`,

  transactsql: `SELECT TOP 100
    e.EmployeeID,
    e.FirstName + ' ' + e.LastName AS FullName,
    d.DepartmentName,
    DENSE_RANK() OVER (PARTITION BY e.DepartmentID ORDER BY e.Salary DESC) AS SalaryRank
FROM HumanResources.Employee e
INNER JOIN HumanResources.Department d ON e.DepartmentID = d.DepartmentID
WHERE e.CurrentFlag = 1
OPTION (RECOMPILE);`,
};

// Token-aware Client-side SQL Minifier
function minifySql(sql: string): string {
  let result = '';
  let i = 0;
  const n = sql.length;
  let lastWasSpace = true;

  while (i < n) {
    const char = sql[i];
    const next = i + 1 < n ? sql[i + 1] : '';

    // 1. Single-line comment: -- (only outside strings)
    if (char === '-' && next === '-') {
      i += 2;
      while (i < n && sql[i] !== '\n' && sql[i] !== '\r') {
        i++;
      }
      continue;
    }

    // 2. Block comment: /* ... */ (only outside strings)
    if (char === '/' && next === '*') {
      i += 2;
      while (i < n) {
        if (sql[i] === '*' && i + 1 < n && sql[i + 1] === '/') {
          i += 2;
          break;
        }
        i++;
      }
      continue;
    }

    // 3. Single-quoted String Literal: '...'
    if (char === "'") {
      result += "'";
      i++;
      while (i < n) {
        const c = sql[i];
        if (c === "'") {
          result += "'";
          i++;
          // Check for escaped quote: ''
          if (i < n && sql[i] === "'") {
            result += "'";
            i++;
            continue;
          }
          break; // End of string
        } else if (c === '\\') {
          // Escaped character like \'
          result += c;
          i++;
          if (i < n) {
            result += sql[i];
            i++;
          }
        } else {
          result += c;
          i++;
        }
      }
      lastWasSpace = false;
      continue;
    }

    // 4. Double-quoted identifier: "..."
    if (char === '"') {
      result += '"';
      i++;
      while (i < n) {
        const c = sql[i];
        if (c === '"') {
          result += '"';
          i++;
          if (i < n && sql[i] === '"') {
            result += '"';
            i++;
            continue;
          }
          break;
        } else if (c === '\\') {
          result += c;
          i++;
          if (i < n) {
            result += sql[i];
            i++;
          }
        } else {
          result += c;
          i++;
        }
      }
      lastWasSpace = false;
      continue;
    }

    // 5. Backtick identifier: `...`
    if (char === '`') {
      result += '`';
      i++;
      while (i < n) {
        const c = sql[i];
        if (c === '`') {
          result += '`';
          i++;
          if (i < n && sql[i] === '`') {
            result += '`';
            i++;
            continue;
          }
          break;
        } else {
          result += c;
          i++;
        }
      }
      lastWasSpace = false;
      continue;
    }

    // 6. Whitespace outside strings
    if (/\s/.test(char)) {
      if (!lastWasSpace && result.length > 0) {
        result += ' ';
        lastWasSpace = true;
      }
      i++;
      continue;
    }

    // 7. Punctuation cleanup (remove space before commas, semicolons, closing parens)
    if (lastWasSpace && (char === ',' || char === ';' || char === ')')) {
      if (result.endsWith(' ')) {
        result = result.slice(0, -1);
      }
    }

    result += char;
    lastWasSpace = (char === '(');
    i++;
  }

  return result.trim();
}

export const SqlFormatterTool: React.FC<SqlFormatterToolProps> = ({ language }) => {
  const dict = TRANSLATIONS[language];
  const [dialect, setDialect] = useState<Dialect>('postgresql');
  const [mode, setMode] = useState<'format' | 'minify'>('format');
  const [indentOption, setIndentOption] = useState<'2' | '4' | 'tab'>('2');
  const [keywordCase, setKeywordCase] = useState<'upper' | 'lower' | 'preserve'>('upper');
  const [inputSql, setInputSql] = useState<string>(SAMPLES.postgresql);
  const [outputSql, setOutputSql] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const dialectOptions = [
    { value: 'postgresql', label: 'PostgreSQL' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'sqlite', label: 'SQLite' },
    { value: 'transactsql', label: 'SQL Server (T-SQL)' },
  ];

  // Formatting and Minification Effect
  useEffect(() => {
    setError(null);
    if (!inputSql.trim()) {
      setOutputSql('');
      return;
    }

    try {
      if (mode === 'minify') {
        const minified = minifySql(inputSql);
        setOutputSql(minified);
      } else {
        const formatted = formatSql(inputSql, {
          language: dialect as SqlLanguage,
          tabWidth: indentOption === 'tab' ? 2 : parseInt(indentOption, 10),
          useTabs: indentOption === 'tab',
          keywordCase: keywordCase,
          linesBetweenQueries: 2,
        });
        setOutputSql(formatted);
      }
    } catch (err: any) {
      setError(err?.message || 'SQL formatting syntax error');
      setOutputSql('');
    }
  }, [inputSql, dialect, mode, indentOption, keywordCase]);

  const handleDialectChange = (newDialect: Dialect) => {
    setDialect(newDialect);
    // Optionally load that dialect's sample if current query matches previous sample
    if (Object.values(SAMPLES).includes(inputSql)) {
      setInputSql(SAMPLES[newDialect]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-3">
          {/* Dialect Selector */}
          <FormatSelector
            label="Dialect"
            value={dialect}
            options={dialectOptions}
            onChange={(val) => handleDialectChange(val as Dialect)}
          />

          {/* Mode: Format vs Minify */}
          <div className="flex items-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setMode('format')}
              className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === 'format'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Wand2 className="w-3 h-3" />
              <span>{dict.common.format}</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('minify')}
              className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === 'minify'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Minimize2 className="w-3 h-3" />
              <span>{dict.common.minify}</span>
            </button>
          </div>

          {/* Indentation (only in format mode) */}
          {mode === 'format' && (
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-300">Indent:</span>
              <select
                value={indentOption}
                onChange={(e) => setIndentOption(e.target.value as any)}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="2">2 spaces</option>
                <option value="4">4 spaces</option>
                <option value="tab">Tabs</option>
              </select>
            </div>
          )}

          {/* Keyword Casing (only in format mode) */}
          {mode === 'format' && (
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-300">Keywords:</span>
              <select
                value={keywordCase}
                onChange={(e) => setKeywordCase(e.target.value as any)}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="upper">UPPERCASE</option>
                <option value="lower">lowercase</option>
                <option value="preserve">Preserve</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <ResetButton
            onReset={() => {
              setDialect('postgresql');
              setMode('format');
              setIndentOption('2');
              setKeywordCase('upper');
              setInputSql(SAMPLES.postgresql);
            }}
            label={dict.common.reset}
          />
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InputPanel
          title="Raw SQL Query"
          value={inputSql}
          onChange={setInputSql}
          onClear={() => setInputSql('')}
          onSample={() => setInputSql(SAMPLES[dialect])}
          sampleLabel={dict.common.sample}
          clearLabel={dict.common.clear}
          error={error}
        />

        <OutputPanel
          title={mode === 'format' ? 'Formatted SQL' : 'Minified SQL'}
          value={outputSql}
          downloadFilename={`query-${dialect}.${mode === 'minify' ? 'min.sql' : 'sql'}`}
          downloadMime="application/sql"
          copyLabel={dict.common.copy}
          downloadLabel={dict.common.download}
          formatBadge={`${dialect.toUpperCase()} • ${mode.toUpperCase()}`}
          extraActions={
            <button
              type="button"
              onClick={() => setInputSql(outputSql)}
              disabled={!outputSql}
              className="px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Use as Input
            </button>
          }
        />
      </div>

      {/* Dialect Disclaimer & 4TM Study SQL Link */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            <strong>Syntax Guarantee:</strong> Formats SQL using standard dialect-specific grammar trees without dialect cross-transpilation. Safe for complex subqueries, CTEs, and window functions.
          </span>
        </div>
        <span className="text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
          Zero Server Upload
        </span>
      </div>
    </div>
  );
};
