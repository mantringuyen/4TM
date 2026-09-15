import { CodeExecutionResult } from '../types';
import { parseErrorDetails, analyzeAndFixError } from './codeFixer';
import { evaluateDaxExpression } from './daxEngine';
import { evaluateExcelFormula } from './excelEngine';

declare global {
  interface Window {
    loadPyodide?: (config: { indexURL: string }) => Promise<any>;
    pyodideInstance?: any;
    initSqlJs?: (config: { locateFile: (file: string) => string }) => Promise<any>;
    SQL?: any;
  }
}

let pyodideLoadingPromise: Promise<any> | null = null;
let sqlLoadingPromise: Promise<any> | null = null;
let sqlDbInstance: any = null;

// Dynamically load external WASM scripts only when needed
const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (e) => reject(new Error(`Failed to load engine script: ${src}`));
    document.head.appendChild(script);
  });
};

/**
 * Initializes Pyodide WebAssembly Python 3.11 engine
 */
export const getPyodide = async (): Promise<any> => {
  if (window.pyodideInstance) {
    return window.pyodideInstance;
  }
  if (!pyodideLoadingPromise) {
    pyodideLoadingPromise = (async () => {
      await loadScript('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js');
      if (typeof window.loadPyodide !== 'function') {
        throw new Error('Pyodide loader was not found on window object.');
      }
      const pyodide = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
      });
      window.pyodideInstance = pyodide;
      return pyodide;
    })();
  }
  return pyodideLoadingPromise;
};

/**
 * Initializes SQLite WebAssembly engine (sql.js)
 */
export const getSqlDb = async (): Promise<any> => {
  if (sqlDbInstance) {
    return sqlDbInstance;
  }
  if (!sqlLoadingPromise) {
    sqlLoadingPromise = (async () => {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/sql-wasm.js');
      if (typeof window.initSqlJs !== 'function') {
        throw new Error('SQL.js loader was not found on window object.');
      }
      const SQL = await window.initSqlJs({
        locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/${file}`,
      });
      window.SQL = SQL;
      const db = new SQL.Database();
      // Seed default sample tables for practical SQL learning & challenges
      db.run(`
        CREATE TABLE IF NOT EXISTS students (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          course TEXT NOT NULL,
          score INTEGER NOT NULL,
          grade INTEGER DEFAULT 0,
          city TEXT,
          email TEXT
        );
        INSERT INTO students (id, name, course, score, grade, city, email) VALUES
          (1, 'Alice Smith', 'Python', 92, 92, 'Hanoi', 'alice@example.com'),
          (2, 'Bob Johnson', 'SQL', 85, 85, 'Da Nang', 'bob@example.com'),
          (3, 'Charlie Lee', 'Python', 78, 78, 'Ho Chi Minh', 'charlie@example.com'),
          (4, 'Diana Evans', 'JavaScript', 95, 95, 'Can Tho', 'diana@example.com'),
          (5, 'Ethan Miller', 'SQL', 88, 88, 'Hue', 'ethan@example.com'),
          (6, 'Fiona Clark', 'JavaScript', 82, 82, 'Hanoi', 'fiona@example.com'),
          (7, 'George King', 'Python', 68, 68, 'Da Nang', 'george@example.com'),
          (8, 'Hannah Scott', 'SQL', 91, 91, 'Ho Chi Minh', 'hannah@example.com');

        CREATE TABLE IF NOT EXISTS orders (
          order_id INTEGER PRIMARY KEY,
          id INTEGER,
          customer_name TEXT,
          product TEXT,
          amount REAL,
          order_date TEXT,
          status TEXT DEFAULT 'completed'
        );
        INSERT INTO orders (order_id, id, customer_name, product, amount, order_date, status) VALUES
          (101, 101, 'Alice Smith', 'Python Course', 49.99, '2026-08-01', 'completed'),
          (102, 102, 'Bob Johnson', 'SQL Pro Pack', 39.50, '2026-08-05', 'completed'),
          (103, 103, 'Charlie Lee', 'Frontend Bundle', 79.00, '2026-08-10', 'completed'),
          (104, 104, 'Diana Evans', 'Algorithms Masterclass', 99.00, '2026-08-15', 'pending'),
          (105, 105, 'Alice Smith', 'Data Science Addon', 29.00, '2026-08-18', 'completed'),
          (106, 106, 'Ethan Miller', 'Cloud Architect Pack', 120.00, '2026-08-20', 'completed');

        CREATE TABLE IF NOT EXISTS departments (
          dept_id INTEGER PRIMARY KEY,
          dept_name TEXT NOT NULL UNIQUE,
          location TEXT NOT NULL,
          city TEXT DEFAULT 'Hanoi'
        );
        INSERT INTO departments (dept_id, dept_name, location, city) VALUES
          (1, 'Engineering', 'Building A', 'Hanoi'),
          (2, 'Marketing', 'Building B', 'Da Nang'),
          (3, 'Finance', 'Building C', 'Ho Chi Minh'),
          (4, 'Human Resources', 'Building A', 'Hanoi');

        CREATE TABLE IF NOT EXISTS employees (
          emp_id INTEGER PRIMARY KEY,
          id INTEGER,
          emp_name TEXT NOT NULL,
          name TEXT,
          dept_id INTEGER,
          salary REAL NOT NULL,
          bonus REAL DEFAULT 0,
          city TEXT DEFAULT 'Hanoi',
          manager_id INTEGER,
          hire_date TEXT NOT NULL,
          FOREIGN KEY(dept_id) REFERENCES departments(dept_id)
        );
        INSERT INTO employees (emp_id, id, emp_name, name, dept_id, salary, bonus, city, manager_id, hire_date) VALUES
          (1, 1, 'Sarah Connor', 'Sarah Connor', 1, 95000, 5000, 'Hanoi', NULL, '2023-01-15'),
          (2, 2, 'John Doe', 'John Doe', 1, 72000, 3000, 'Hanoi', 1, '2024-03-01'),
          (3, 3, 'Jane Smith', 'Jane Smith', 2, 68000, 2500, 'Da Nang', NULL, '2023-06-10'),
          (4, 4, 'Mike Vance', 'Mike Vance', 2, 54000, 1500, 'Da Nang', 3, '2025-01-12'),
          (5, 5, 'Emily Blunt', 'Emily Blunt', 3, 88000, 4000, 'Ho Chi Minh', NULL, '2022-11-20'),
          (6, 6, 'Lucas Troy', 'Lucas Troy', NULL, 48000, 1000, 'Can Tho', 1, '2025-05-01');
      `);
      sqlDbInstance = db;
      return db;
    })();
  }
  return sqlLoadingPromise;
};

/**
 * Parses raw interpreter/compiler errors and produces a beginner-friendly diagnosis
 */
export const diagnoseError = (rawError: string, language: string): { simple: string; detailed: string } => {
  const cleanError = rawError.trim();
  let simple = 'An unexpected runtime issue occurred during execution.';

  if (language === 'python') {
    if (cleanError.includes('NameError:')) {
      const match = cleanError.match(/name '([^']+)' is not defined/);
      simple = match 
        ? `You tried to use the variable or function '${match[1]}', but it hasn't been defined or assigned a value yet.`
        : `A variable or function name is used before definition.`;
    } else if (cleanError.includes('SyntaxError:')) {
      if (cleanError.includes('unexpected EOF while parsing') || cleanError.includes('was never closed')) {
        simple = `Syntax error: A parenthesis '(', bracket '[', brace '{', or quote was opened but never closed.`;
      } else if (cleanError.includes('invalid syntax')) {
        simple = `Syntax error: Check for missing colons ':', misspelled keywords, or misplaced operators.`;
      } else {
        simple = `Python syntax rule violation. Check commas, quotes, colons, and indentation.`;
      }
    } else if (cleanError.includes('IndentationError:')) {
      simple = `Indentation error: Python requires consistent 4-space indentation for blocks under if, for, while, and def statements.`;
    } else if (cleanError.includes('TypeError:')) {
      simple = `Type mismatch: You performed an operation on incompatible types (e.g. adding a string to an integer, or calling a non-function).`;
    } else if (cleanError.includes('IndexError:')) {
      simple = `Index out of range: You tried to access an element at an index that exceeds the size of the list.`;
    } else if (cleanError.includes('KeyError:')) {
      simple = `Dictionary key not found: You tried to access a key that does not exist in the dictionary.`;
    } else if (cleanError.includes('ZeroDivisionError:')) {
      simple = `Division by zero: Mathematical division by 0 is invalid.`;
    }
  } else if (language === 'sql') {
    if (cleanError.includes('no such table')) {
      simple = `Table not found: Check that the table name is spelled correctly. Sample tables available: 'students', 'orders'.`;
    } else if (cleanError.includes('no such column')) {
      simple = `Column not found: Check the column name spelling in your SELECT, WHERE, or GROUP BY clause.`;
    } else if (cleanError.includes('syntax error')) {
      simple = `SQL syntax error: Verify SQL keywords order (SELECT ... FROM ... WHERE ... GROUP BY ... ORDER BY).`;
    }
  } else if (language === 'javascript') {
    if (cleanError.includes('is not defined')) {
      simple = `Variable or function is referenced before being declared.`;
    } else if (cleanError.includes('is not a function')) {
      simple = `Attempted to invoke a value as a function that is not callable.`;
    } else if (cleanError.includes('Unexpected token')) {
      simple = `JavaScript syntax error: Missing closing bracket, quote, or semicolon.`;
    }
  }

  return {
    simple,
    detailed: cleanError,
  };
};

/**
 * Universal safe in-browser multi-language execution runner
 */
export const executeCode = async (code: string, language: string): Promise<CodeExecutionResult> => {
  const startTime = performance.now();
  const lang = language.toLowerCase();

  // 1. PYTHON (Pyodide WebAssembly)
  if (lang === 'python') {
    try {
      const pyodide = await getPyodide();
      
      // Capture stdout and stderr cleanly
      await pyodide.runPythonAsync(`
import sys
import io
sys_stdout_backup = sys.stdout
sys_stderr_backup = sys.stderr
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
      `);

      let runError: any = null;
      try {
        await pyodide.runPythonAsync(code);
      } catch (err: any) {
        runError = err;
      }

      // Extract captured output
      const stdout = await pyodide.runPythonAsync(`sys.stdout.getvalue()`);
      const stderr = await pyodide.runPythonAsync(`sys.stderr.getvalue()`);

      // Restore system io
      await pyodide.runPythonAsync(`
sys.stdout = sys_stdout_backup
sys.stderr = sys_stderr_backup
      `);

      const executionTimeMs = Math.round(performance.now() - startTime);

      if (runError) {
        const rawErrString = (runError.message || String(runError)).replace(/^PythonError:\s*/i, '').trim();
        const { simple, detailed } = diagnoseError(rawErrString, 'python');
        const parsedDetail = parseErrorDetails(rawErrString, 'python', code);
        const suggestedFix = analyzeAndFixError(code, 'python', parsedDetail);
        parsedDetail.suggestedFix = suggestedFix;

        return {
          isSuccess: false,
          output: stdout || '',
          error: parsedDetail.message || rawErrString,
          simpleExplanation: simple,
          detailedError: detailed || rawErrString,
          executionTimeMs,
          errorDetail: parsedDetail,
        };
      }

      return {
        isSuccess: true,
        output: (stdout + (stderr ? `\n[Warnings]: ${stderr}` : '')).trimEnd() || '[Code executed with no output]',
        executionTimeMs,
      };
    } catch (engineErr: any) {
      const msg = engineErr.message || String(engineErr);
      const parsedDetail = parseErrorDetails(msg, 'python', code);
      return {
        isSuccess: false,
        output: '',
        error: msg,
        simpleExplanation: 'Python engine setup issue.',
        detailedError: msg,
        executionTimeMs: Math.round(performance.now() - startTime),
        errorDetail: parsedDetail,
      };
    }
  }

  // 2. SQL (SQLite WebAssembly via sql.js)
  if (lang === 'sql') {
    try {
      const db = await getSqlDb();
      const results = db.exec(code);
      const executionTimeMs = Math.round(performance.now() - startTime);

      if (!results || results.length === 0) {
        return {
          isSuccess: true,
          output: 'Query executed successfully. (0 rows returned or DDL/DML statement completed)',
          executionTimeMs,
        };
      }

      // Format tabular output
      const formattedTables = results.map((res: any, idx: number) => {
        const columns: string[] = res.columns;
        const values: any[][] = res.values;
        
        // Calculate max width per column
        const colWidths = columns.map((col, i) => {
          const maxValLen = values.reduce((max, row) => Math.max(max, String(row[i] ?? 'NULL').length), 0);
          return Math.max(col.length, maxValLen);
        });

        const headerLine = columns.map((col, i) => col.padEnd(colWidths[i])).join(' | ');
        const separatorLine = colWidths.map(w => '-'.repeat(w)).join('-+-');
        const rowsLines = values.map(row => 
          row.map((val, i) => String(val ?? 'NULL').padEnd(colWidths[i])).join(' | ')
        );

        return [
          idx > 0 ? `\n--- Result Set ${idx + 1} ---` : '',
          headerLine,
          separatorLine,
          ...rowsLines,
          `\n(${values.length} row${values.length === 1 ? '' : 's'} returned)`
        ].filter(Boolean).join('\n');
      });

      return {
        isSuccess: true,
        output: formattedTables.join('\n\n'),
        executionTimeMs,
      };
    } catch (sqlErr: any) {
      const rawMsg = sqlErr.message || String(sqlErr);
      const { simple, detailed } = diagnoseError(rawMsg, 'sql');
      const parsedDetail = parseErrorDetails(rawMsg, 'sql', code);
      const suggestedFix = analyzeAndFixError(code, 'sql', parsedDetail);
      parsedDetail.suggestedFix = suggestedFix;

      return {
        isSuccess: false,
        output: '',
        error: rawMsg,
        simpleExplanation: simple,
        detailedError: detailed,
        executionTimeMs: Math.round(performance.now() - startTime),
        errorDetail: parsedDetail,
      };
    }
  }

  // 3. JAVASCRIPT (Isolated sandbox with safe console capturing)
  if (lang === 'javascript' || lang === 'js') {
    try {
      const logs: string[] = [];
      const customConsole = {
        log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ')),
        error: (...args: any[]) => logs.push('[Error] ' + args.map(a => String(a)).join(' ')),
        warn: (...args: any[]) => logs.push('[Warn] ' + args.map(a => String(a)).join(' ')),
        info: (...args: any[]) => logs.push(args.map(a => String(a)).join(' ')),
      };

      // Mask sensitive globals and browser APIs to enforce strict sandbox execution
      const maskedGlobals = [
        'console',
        'window',
        'document',
        'localStorage',
        'sessionStorage',
        'fetch',
        'globalThis',
        'self',
        'top',
        'parent',
        'XMLHttpRequest',
        'WebSocket',
        'Worker',
        'SharedWorker',
        'navigator',
        'indexedDB',
        'caches',
        'location',
        'history',
        'alert',
        'prompt',
        'confirm',
        'open',
        'importScripts'
      ];

      const sandboxFn = new Function(
        ...maskedGlobals,
        `
        "use strict";
        try {
          ${code}
        } catch(e) {
          throw e;
        }
      `
      );

      // Pass customConsole for console, and null for all protected globals
      const sandboxArgs = [customConsole, ...Array(maskedGlobals.length - 1).fill(null)];
      sandboxFn(...sandboxArgs);
      const executionTimeMs = Math.round(performance.now() - startTime);

      return {
        isSuccess: true,
        output: logs.join('\n') || '[Code executed with no console output]',
        executionTimeMs,
      };
    } catch (jsErr: any) {
      const rawMsg = jsErr.message || String(jsErr);
      const { simple, detailed } = diagnoseError(rawMsg, 'javascript');
      const parsedDetail = parseErrorDetails(rawMsg, 'javascript', code);
      const suggestedFix = analyzeAndFixError(code, 'javascript', parsedDetail);
      parsedDetail.suggestedFix = suggestedFix;

      return {
        isSuccess: false,
        output: '',
        error: rawMsg,
        simpleExplanation: simple,
        detailedError: detailed,
        executionTimeMs: Math.round(performance.now() - startTime),
        errorDetail: parsedDetail,
      };
    }
  }

  // 4. HTML / CSS (Interactive markup execution with optional lint warnings)
  if (lang === 'html' || lang === 'css') {
    const executionTimeMs = Math.round(performance.now() - startTime);

    // Validate HTML unclosed tags
    if (lang === 'html') {
      const tags = ['div', 'p', 'h1', 'h2', 'h3', 'button', 'span', 'section', 'article', 'ul', 'ol', 'li'];
      let unclosedTag: string | null = null;
      for (const tag of tags) {
        const openCount = (code.match(new RegExp(`<${tag}(\\s+[^>]*)?>`, 'gi')) || []).length;
        const closeCount = (code.match(new RegExp(`</${tag}>`, 'gi')) || []).length;
        if (openCount > closeCount) {
          unclosedTag = tag;
          break;
        }
      }

      if (unclosedTag) {
        const rawMsg = `HTML element <${unclosedTag}> is opened but missing closing tag </${unclosedTag}>.`;
        const parsedDetail = parseErrorDetails(rawMsg, 'html', code);
        const suggestedFix = analyzeAndFixError(code, 'html', parsedDetail);
        parsedDetail.suggestedFix = suggestedFix;

        // Return as warning or error detail
        return {
          isSuccess: false,
          output: 'HTML Markup Validation Issue Detected.',
          error: rawMsg,
          simpleExplanation: `An unclosed <${unclosedTag}> tag was detected in your HTML. Adding </${unclosedTag}> ensures proper browser DOM rendering.`,
          detailedError: rawMsg,
          executionTimeMs,
          errorDetail: parsedDetail,
        };
      }
    }

    // Validate CSS unclosed braces
    if (lang === 'css') {
      const openBraces = (code.match(/\{/g) || []).length;
      const closeBraces = (code.match(/\}/g) || []).length;
      if (openBraces > closeBraces) {
        const rawMsg = 'CSS rule block is missing closing brace "}".';
        const parsedDetail = parseErrorDetails(rawMsg, 'css', code);
        const suggestedFix = analyzeAndFixError(code, 'css', parsedDetail);
        parsedDetail.suggestedFix = suggestedFix;

        return {
          isSuccess: false,
          output: 'CSS Syntax Issue Detected.',
          error: rawMsg,
          simpleExplanation: 'A CSS rule was started with "{" but never closed with "}".',
          detailedError: rawMsg,
          executionTimeMs,
          errorDetail: parsedDetail,
        };
      }
    }

    return {
      isSuccess: true,
      output: 'Rendered in sandboxed preview frame.',
      executionTimeMs,
    };
  }

  // 5. POWER BI / DAX / POWER QUERY (In-browser tabular evaluator engine)
  if (lang === 'powerbi' || lang === 'dax' || lang === 'powerquery') {
    try {
      const daxRes = evaluateDaxExpression(code);
      if (daxRes.isSuccess) {
        return {
          isSuccess: true,
          output: daxRes.formattedOutput,
          executionTimeMs: daxRes.executionTimeMs,
        };
      } else {
        const rawMsg = daxRes.error || 'DAX Evaluation failed.';
        const parsedDetail = parseErrorDetails(rawMsg, 'sql', code);
        return {
          isSuccess: false,
          output: '',
          error: rawMsg,
          simpleExplanation: 'DAX formula error. Ensure table and column names exist and parentheses match.',
          detailedError: rawMsg,
          executionTimeMs: daxRes.executionTimeMs,
          errorDetail: parsedDetail,
        };
      }
    } catch (daxErr: any) {
      const msg = daxErr.message || String(daxErr);
      return {
        isSuccess: false,
        output: '',
        error: msg,
        simpleExplanation: 'DAX expression parsing failed.',
        detailedError: msg,
        executionTimeMs: Math.round(performance.now() - startTime),
      };
    }
  }

  // 6. MICROSOFT EXCEL / FORMULAS (In-browser reactive spreadsheet formula engine)
  if (lang === 'excel' || lang === 'xlsx' || lang === 'formula') {
    try {
      const excelRes = evaluateExcelFormula(code);
      if (excelRes.isSuccess) {
        return {
          isSuccess: true,
          output: excelRes.formattedOutput,
          executionTimeMs: excelRes.executionTimeMs,
        };
      } else {
        const rawMsg = excelRes.error || 'Excel formula evaluation failed.';
        const parsedDetail = parseErrorDetails(rawMsg, 'sql', code);
        return {
          isSuccess: false,
          output: '',
          error: rawMsg,
          simpleExplanation: 'Excel formula syntax or argument error. Check function name, parenthesis balancing, and arguments.',
          detailedError: rawMsg,
          executionTimeMs: excelRes.executionTimeMs,
          errorDetail: parsedDetail,
        };
      }
    } catch (exErr: any) {
      const msg = exErr.message || String(exErr);
      return {
        isSuccess: false,
        output: '',
        error: msg,
        simpleExplanation: 'Excel formula evaluation failed.',
        detailedError: msg,
        executionTimeMs: Math.round(performance.now() - startTime),
      };
    }
  }

  return {
    isSuccess: false,
    output: '',
    error: `Unsupported execution runtime: ${language}`,
    simpleExplanation: `Execution for ${language} is not configured yet.`,
    detailedError: `No runner registered for language: ${language}`,
    executionTimeMs: 0,
  };
};
