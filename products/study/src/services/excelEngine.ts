/**
 * Browser-based Excel Spreadsheet & Formula Evaluation Engine
 * 
 * Provides in-browser formula evaluation, cell grid manipulation,
 * statistical/lookup calculations, dynamic arrays, and tabular formatting.
 */

export interface ExcelCell {
  value: any;
  formula?: string;
  type: 'number' | 'text' | 'date' | 'boolean' | 'error';
  format?: string;
}

export interface ExcelSheet {
  name: string;
  headers: string[];
  rows: (string | number | boolean | null)[][];
}

// Built-in Standard Datasets for Excel Practice & Challenges
export const sampleExcelWorkbooks: Record<string, ExcelSheet> = {
  SalesData: {
    name: 'SalesData',
    headers: ['OrderID', 'Region', 'Rep', 'Item', 'Units', 'UnitCost', 'TotalRevenue', 'Status'],
    rows: [
      [101, 'East', 'Sarah', 'Pencil', 95, 1.99, 189.05, 'Completed'],
      [102, 'Central', 'David', 'Binder', 50, 4.99, 249.50, 'Completed'],
      [103, 'Central', 'Rachel', 'Pencil', 36, 1.99, 71.64, 'Pending'],
      [104, 'West', 'Michael', 'Pen', 27, 19.99, 539.73, 'Completed'],
      [105, 'East', 'Sarah', 'Pencil', 56, 2.99, 167.44, 'Completed'],
      [106, 'Central', 'David', 'Desk', 5, 125.00, 625.00, 'Pending'],
      [107, 'West', 'Michael', 'Binder', 60, 4.99, 299.40, 'Completed'],
      [108, 'East', 'Rachel', 'Pen', 80, 8.99, 719.20, 'Completed'],
      [109, 'Central', 'Sarah', 'Pencil', 90, 1.99, 179.10, 'Completed'],
      [110, 'West', 'Michael', 'Desk', 3, 275.00, 825.00, 'Pending'],
    ],
  },
  Employees: {
    name: 'Employees',
    headers: ['EmpID', 'FullName', 'Department', 'Salary', 'Rating', 'HireYear', 'Status'],
    rows: [
      [1001, 'Nguyen Van An', 'Engineering', 45000, 4.8, 2021, 'Active'],
      [1002, 'Tran Thi Binh', 'Marketing', 32000, 4.2, 2022, 'Active'],
      [1003, 'Le Hoang Cuong', 'Finance', 38000, 3.9, 2020, 'Active'],
      [1004, 'Pham Minh Duc', 'Engineering', 52000, 4.9, 2019, 'Active'],
      [1005, 'Hoang Thu Giang', 'Sales', 29000, 4.5, 2023, 'Active'],
      [1006, 'Vuong Quoc Hai', 'Marketing', 34000, 3.7, 2022, 'On Leave'],
      [1007, 'Dang Mai Linh', 'Finance', 41000, 4.6, 2021, 'Active'],
      [1008, 'Bui Tien Nam', 'Engineering', 48000, 4.7, 2020, 'Active'],
    ],
  },
  GradeBook: {
    name: 'GradeBook',
    headers: ['StudentID', 'StudentName', 'Midterm', 'FinalExam', 'Assignments', 'TotalScore', 'Grade'],
    rows: [
      ['S01', 'Alice Johnson', 85, 90, 95, 89.5, 'A'],
      ['S02', 'Bob Smith', 72, 68, 80, 72.4, 'C'],
      ['S03', 'Charlie Brown', 90, 94, 98, 93.6, 'A'],
      ['S04', 'Diana Miller', 78, 82, 85, 81.3, 'B'],
      ['S05', 'Ethan Davis', 65, 70, 75, 69.5, 'D'],
      ['S06', 'Fiona White', 92, 88, 94, 90.8, 'A'],
    ],
  },
  FinancialModel: {
    name: 'FinancialModel',
    headers: ['Year', 'Revenue', 'COGS', 'GrossProfit', 'OperatingExpenses', 'EBIT', 'NetIncome'],
    rows: [
      [2023, 500000, 200000, 300000, 120000, 180000, 144000],
      [2024, 650000, 250000, 400000, 150000, 250000, 200000],
      [2025, 820000, 310000, 510000, 180000, 330000, 264000],
      [2026, 1050000, 390000, 660000, 220000, 440000, 352000],
    ],
  },
};

export interface ExcelExecutionResult {
  isSuccess: boolean;
  rawResult?: any;
  formattedOutput: string;
  executionTimeMs: number;
  tableData?: { headers: string[]; rows: any[][] };
  error?: string;
}

/**
 * Parses and evaluates an Excel formula string or code block
 */
export function evaluateExcelFormula(code: string, activeSheetName: string = 'SalesData'): ExcelExecutionResult {
  const startTime = performance.now();
  const trimmed = (code || '').trim();

  if (!trimmed) {
    return {
      isSuccess: false,
      formattedOutput: 'Error: Empty formula or instruction.',
      executionTimeMs: 0,
      error: 'Please enter a valid Excel formula (e.g., =SUM(E2:E11) or =XLOOKUP(...))',
    };
  }

  try {
    const sheet = sampleExcelWorkbooks[activeSheetName] || sampleExcelWorkbooks.SalesData;
    
    // Check if input is multi-line formula/script or single formula
    const lines = trimmed.split('\n').map(l => l.trim()).filter(l => l.length > 0 && !l.startsWith('#') && !l.startsWith('//'));
    
    if (lines.length === 0) {
      return {
        isSuccess: true,
        formattedOutput: 'Excel Formula Evaluator Ready.',
        executionTimeMs: Math.round(performance.now() - startTime),
      };
    }

    const lastLine = lines[lines.length - 1];
    const formula = lastLine.startsWith('=') ? lastLine.substring(1).trim() : lastLine;

    // Helper functions for formula evaluation
    const context = createEvaluationContext(sheet);
    const result = evaluateParsedExpression(formula, context, sheet);

    const execTime = Math.max(1, Math.round(performance.now() - startTime));

    // Format output
    let formatted = '';
    let tableData: { headers: string[]; rows: any[][] } | undefined = undefined;

    if (Array.isArray(result)) {
      // Dynamic array result (e.g. FILTER, UNIQUE, SORT)
      if (result.length > 0 && Array.isArray(result[0])) {
        tableData = {
          headers: sheet.headers,
          rows: result,
        };
        formatted = formatArrayTable(result, sheet.headers);
      } else {
        formatted = `[Spill Array Result (${result.length} items)]:\n` + result.map((r, i) => `  [${i + 1}] ${formatCellValue(r)}`).join('\n');
      }
    } else if (typeof result === 'object' && result !== null && result.type === 'table') {
      tableData = {
        headers: result.headers || [],
        rows: result.rows || [],
      };
      formatted = formatArrayTable(result.rows, result.headers);
    } else {
      formatted = `Computed Formula Result:\n=========================\n${formatCellValue(result)}\n\n(Formula evaluated successfully on ${sheet.name} dataset)`;
    }

    return {
      isSuccess: true,
      rawResult: result,
      formattedOutput: formatted,
      executionTimeMs: execTime,
      tableData,
    };
  } catch (err: any) {
    const execTime = Math.max(1, Math.round(performance.now() - startTime));
    const errMsg = err.message || String(err);
    return {
      isSuccess: false,
      formattedOutput: `Excel Formula Error: ${errMsg}`,
      executionTimeMs: execTime,
      error: errMsg,
    };
  }
}

function formatCellValue(val: any): string {
  if (val === null || val === undefined) return '#N/A';
  if (typeof val === 'number') {
    if (Number.isInteger(val)) return val.toLocaleString();
    return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  }
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  return String(val);
}

function formatArrayTable(rows: any[][], headers?: string[]): string {
  if (!rows || rows.length === 0) return '(0 rows returned)';
  
  const colCount = Math.max(...rows.map(r => r.length), headers ? headers.length : 0);
  const colWidths: number[] = new Array(colCount).fill(10);

  if (headers) {
    headers.forEach((h, i) => {
      colWidths[i] = Math.max(colWidths[i] || 10, String(h).length);
    });
  }

  rows.forEach(row => {
    row.forEach((cell, i) => {
      colWidths[i] = Math.max(colWidths[i] || 10, formatCellValue(cell).length);
    });
  });

  const lines: string[] = [];
  if (headers && headers.length > 0) {
    const headerStr = headers.map((h, i) => String(h).padEnd(colWidths[i])).join(' | ');
    lines.push(headerStr);
    lines.push(colWidths.map(w => '-'.repeat(w)).join('-+-'));
  }

  rows.forEach(row => {
    const rowStr = row.map((cell, i) => formatCellValue(cell).padEnd(colWidths[i] || 10)).join(' | ');
    lines.push(rowStr);
  });

  return lines.join('\n');
}

/**
 * Creates evaluation environment and built-in function catalog
 */
function createEvaluationContext(sheet: ExcelSheet) {
  // Column letter to index helper: A->0, B->1, etc.
  const colToIndex = (col: string): number => {
    let index = 0;
    const clean = col.toUpperCase().replace(/\$/g, '');
    for (let i = 0; i < clean.length; i++) {
      index = index * 26 + (clean.charCodeAt(i) - 64);
    }
    return index - 1;
  };

  // Cell reference getter: A2 -> row 0, col 0 in data
  const getCell = (ref: string): any => {
    const match = ref.match(/^(\$?)([A-Z]+)(\$?)([0-9]+)$/i);
    if (!match) return null;
    const colStr = match[2];
    const rowNum = parseInt(match[4], 10);
    const colIdx = colToIndex(colStr);
    const rowIdx = rowNum - 2; // header is row 1, data starts row 2

    if (rowIdx < 0 || rowIdx >= sheet.rows.length) return null;
    const row = sheet.rows[rowIdx];
    return row ? row[colIdx] : null;
  };

  // Range reference getter: A2:A11 -> array of values
  const getRange = (ref: string): any[] => {
    const parts = ref.split(':');
    if (parts.length === 1) {
      const val = getCell(parts[0]);
      return val !== null ? [val] : [];
    }

    const start = parts[0].trim();
    const end = parts[1].trim();
    const match1 = start.match(/^(\$?)([A-Z]+)(\$?)([0-9]+)$/i);
    const match2 = end.match(/^(\$?)([A-Z]+)(\$?)([0-9]+)$/i);

    if (!match1 || !match2) return [];

    const startCol = colToIndex(match1[2]);
    const startRow = parseInt(match1[4], 10) - 2;
    const endCol = colToIndex(match2[2]);
    const endRow = parseInt(match2[4], 10) - 2;

    const values: any[] = [];
    const minRow = Math.max(0, Math.min(startRow, endRow));
    const maxRow = Math.min(sheet.rows.length - 1, Math.max(startRow, endRow));
    const minCol = Math.max(0, Math.min(startCol, endCol));
    const maxCol = Math.max(startCol, endCol);

    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        const row = sheet.rows[r];
        if (row && row[c] !== undefined) {
          values.push(row[c]);
        }
      }
    }
    return values;
  };

  // Get full 2D range matrix
  const getRange2D = (ref: string): any[][] => {
    const parts = ref.split(':');
    if (parts.length < 2) {
      const v = getCell(ref);
      return [[v]];
    }

    const start = parts[0].trim();
    const end = parts[1].trim();
    const match1 = start.match(/^(\$?)([A-Z]+)(\$?)([0-9]+)$/i);
    const match2 = end.match(/^(\$?)([A-Z]+)(\$?)([0-9]+)$/i);
    if (!match1 || !match2) return [];

    const startCol = colToIndex(match1[2]);
    const startRow = parseInt(match1[4], 10) - 2;
    const endCol = colToIndex(match2[2]);
    const endRow = parseInt(match2[4], 10) - 2;

    const minRow = Math.max(0, Math.min(startRow, endRow));
    const maxRow = Math.min(sheet.rows.length - 1, Math.max(startRow, endRow));
    const minCol = Math.max(0, Math.min(startCol, endCol));
    const maxCol = Math.max(startCol, endCol);

    const matrix: any[][] = [];
    for (let r = minRow; r <= maxRow; r++) {
      const rowArr: any[] = [];
      for (let c = minCol; c <= maxCol; c++) {
        rowArr.push(sheet.rows[r]?.[c] ?? null);
      }
      matrix.push(rowArr);
    }
    return matrix;
  };

  return {
    getCell,
    getRange,
    getRange2D,
    sheet,
  };
}

/**
 * Expression evaluator for Excel formulas
 */
function evaluateParsedExpression(expr: string, context: any, sheet: ExcelSheet): any {
  let clean = expr.trim();

  // If starts with =, strip it
  if (clean.startsWith('=')) clean = clean.substring(1).trim();

  // 1. Function Call Pattern: FUNCNAME(...)
  const fnMatch = clean.match(/^([A-Z_]+)\s*\((.*)\)$/is);
  if (fnMatch) {
    const funcName = fnMatch[1].toUpperCase();
    const rawArgs = splitArguments(fnMatch[2]);

    switch (funcName) {
      // -------------------------------------------------------------
      // STATISTICAL & AGGREGATION FUNCTIONS
      // -------------------------------------------------------------
      case 'SUM': {
        const nums = resolveNumericList(rawArgs, context);
        return nums.reduce((a, b) => a + b, 0);
      }
      case 'AVERAGE': {
        const nums = resolveNumericList(rawArgs, context);
        if (nums.length === 0) return 0;
        return nums.reduce((a, b) => a + b, 0) / nums.length;
      }
      case 'MIN': {
        const nums = resolveNumericList(rawArgs, context);
        return nums.length > 0 ? Math.min(...nums) : 0;
      }
      case 'MAX': {
        const nums = resolveNumericList(rawArgs, context);
        return nums.length > 0 ? Math.max(...nums) : 0;
      }
      case 'COUNT': {
        const vals = resolveValueList(rawArgs, context);
        return vals.filter(v => typeof v === 'number' && !isNaN(v)).length;
      }
      case 'COUNTA': {
        const vals = resolveValueList(rawArgs, context);
        return vals.filter(v => v !== null && v !== undefined && v !== '').length;
      }
      case 'COUNTBLANK': {
        const vals = resolveValueList(rawArgs, context);
        return vals.filter(v => v === null || v === undefined || v === '').length;
      }
      case 'ROUND': {
        const val = evaluateParsedExpression(rawArgs[0], context, sheet);
        const decimals = rawArgs[1] ? evaluateParsedExpression(rawArgs[1], context, sheet) : 0;
        const factor = Math.pow(10, decimals);
        return Math.round(Number(val) * factor) / factor;
      }
      case 'ROUNDUP': {
        const val = evaluateParsedExpression(rawArgs[0], context, sheet);
        const decimals = rawArgs[1] ? evaluateParsedExpression(rawArgs[1], context, sheet) : 0;
        const factor = Math.pow(10, decimals);
        return Math.ceil(Number(val) * factor) / factor;
      }
      case 'ROUNDDOWN': {
        const val = evaluateParsedExpression(rawArgs[0], context, sheet);
        const decimals = rawArgs[1] ? evaluateParsedExpression(rawArgs[1], context, sheet) : 0;
        const factor = Math.pow(10, decimals);
        return Math.floor(Number(val) * factor) / factor;
      }

      // -------------------------------------------------------------
      // CONDITIONAL AGGREGATIONS
      // -------------------------------------------------------------
      case 'COUNTIF': {
        const range = resolveRangeValues(rawArgs[0], context);
        const criteria = resolveLiteralOrExpression(rawArgs[1], context, sheet);
        return range.filter(v => testCriteria(v, criteria)).length;
      }
      case 'COUNTIFS': {
        // COUNTIFS(range1, crit1, range2, crit2, ...)
        const range1 = resolveRangeValues(rawArgs[0], context);
        const crit1 = resolveLiteralOrExpression(rawArgs[1], context, sheet);
        const range2 = rawArgs[2] ? resolveRangeValues(rawArgs[2], context) : null;
        const crit2 = rawArgs[3] ? resolveLiteralOrExpression(rawArgs[3], context, sheet) : null;

        let count = 0;
        for (let i = 0; i < range1.length; i++) {
          const pass1 = testCriteria(range1[i], crit1);
          const pass2 = range2 && crit2 ? testCriteria(range2[i], crit2) : true;
          if (pass1 && pass2) count++;
        }
        return count;
      }
      case 'SUMIF': {
        // SUMIF(range, criteria, [sum_range])
        const range = resolveRangeValues(rawArgs[0], context);
        const criteria = resolveLiteralOrExpression(rawArgs[1], context, sheet);
        const sumRange = rawArgs[2] ? resolveRangeValues(rawArgs[2], context) : range;

        let sum = 0;
        for (let i = 0; i < range.length; i++) {
          if (testCriteria(range[i], criteria)) {
            sum += Number(sumRange[i] || 0);
          }
        }
        return sum;
      }
      case 'SUMIFS': {
        // SUMIFS(sum_range, crit_range1, crit1, [crit_range2, crit2, ...])
        const sumRange = resolveRangeValues(rawArgs[0], context);
        const critRange1 = resolveRangeValues(rawArgs[1], context);
        const crit1 = resolveLiteralOrExpression(rawArgs[2], context, sheet);
        const critRange2 = rawArgs[3] ? resolveRangeValues(rawArgs[3], context) : null;
        const crit2 = rawArgs[4] ? resolveLiteralOrExpression(rawArgs[4], context, sheet) : null;

        let sum = 0;
        for (let i = 0; i < sumRange.length; i++) {
          const pass1 = testCriteria(critRange1[i], crit1);
          const pass2 = critRange2 && crit2 ? testCriteria(critRange2[i], crit2) : true;
          if (pass1 && pass2) {
            sum += Number(sumRange[i] || 0);
          }
        }
        return sum;
      }
      case 'AVERAGEIF': {
        const range = resolveRangeValues(rawArgs[0], context);
        const criteria = resolveLiteralOrExpression(rawArgs[1], context, sheet);
        const avgRange = rawArgs[2] ? resolveRangeValues(rawArgs[2], context) : range;

        let sum = 0;
        let count = 0;
        for (let i = 0; i < range.length; i++) {
          if (testCriteria(range[i], criteria)) {
            sum += Number(avgRange[i] || 0);
            count++;
          }
        }
        return count > 0 ? sum / count : 0;
      }
      case 'AVERAGEIFS': {
        const avgRange = resolveRangeValues(rawArgs[0], context);
        const critRange1 = resolveRangeValues(rawArgs[1], context);
        const crit1 = resolveLiteralOrExpression(rawArgs[2], context, sheet);
        let sum = 0;
        let count = 0;
        for (let i = 0; i < avgRange.length; i++) {
          if (testCriteria(critRange1[i], crit1)) {
            sum += Number(avgRange[i] || 0);
            count++;
          }
        }
        return count > 0 ? sum / count : 0;
      }

      // -------------------------------------------------------------
      // LOGICAL FUNCTIONS
      // -------------------------------------------------------------
      case 'IF': {
        const condition = evaluateParsedExpression(rawArgs[0], context, sheet);
        if (condition) {
          return rawArgs[1] !== undefined ? evaluateParsedExpression(rawArgs[1], context, sheet) : true;
        } else {
          return rawArgs[2] !== undefined ? evaluateParsedExpression(rawArgs[2], context, sheet) : false;
        }
      }
      case 'IFS': {
        // IFS(c1, v1, c2, v2, ...)
        for (let i = 0; i < rawArgs.length; i += 2) {
          const cond = evaluateParsedExpression(rawArgs[i], context, sheet);
          if (cond) {
            return evaluateParsedExpression(rawArgs[i + 1], context, sheet);
          }
        }
        return '#N/A';
      }
      case 'AND': {
        for (const arg of rawArgs) {
          if (!evaluateParsedExpression(arg, context, sheet)) return false;
        }
        return true;
      }
      case 'OR': {
        for (const arg of rawArgs) {
          if (evaluateParsedExpression(arg, context, sheet)) return true;
        }
        return false;
      }
      case 'NOT': {
        return !evaluateParsedExpression(rawArgs[0], context, sheet);
      }
      case 'IFERROR': {
        try {
          const val = evaluateParsedExpression(rawArgs[0], context, sheet);
          return val;
        } catch {
          return rawArgs[1] !== undefined ? evaluateParsedExpression(rawArgs[1], context, sheet) : '';
        }
      }

      // -------------------------------------------------------------
      // LOOKUP & REFERENCE FUNCTIONS
      // -------------------------------------------------------------
      case 'VLOOKUP': {
        // VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
        const lookupVal = evaluateParsedExpression(rawArgs[0], context, sheet);
        const matrix = context.getRange2D(rawArgs[1]);
        const colIdx = parseInt(rawArgs[2], 10) - 1;

        for (const row of matrix) {
          if (String(row[0]).toLowerCase() === String(lookupVal).toLowerCase() || row[0] == lookupVal) {
            return row[colIdx] !== undefined ? row[colIdx] : '#REF!';
          }
        }
        return '#N/A';
      }
      case 'XLOOKUP': {
        // XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode])
        const lookupVal = evaluateParsedExpression(rawArgs[0], context, sheet);
        const lookupArr = resolveRangeValues(rawArgs[1], context);
        const returnArr = resolveRangeValues(rawArgs[2], context);
        const ifNotFound = rawArgs[3] ? evaluateParsedExpression(rawArgs[3], context, sheet) : '#N/A';

        for (let i = 0; i < lookupArr.length; i++) {
          if (String(lookupArr[i]).toLowerCase() === String(lookupVal).toLowerCase() || lookupArr[i] == lookupVal) {
            return returnArr[i] !== undefined ? returnArr[i] : null;
          }
        }
        return ifNotFound;
      }
      case 'INDEX': {
        // INDEX(array, row_num, [col_num])
        const rangeStr = rawArgs[0];
        const rowNum = parseInt(evaluateParsedExpression(rawArgs[1], context, sheet), 10);
        const colNum = rawArgs[2] ? parseInt(evaluateParsedExpression(rawArgs[2], context, sheet), 10) : 1;

        const matrix = context.getRange2D(rangeStr);
        if (rowNum < 1 || rowNum > matrix.length) return '#REF!';
        const r = matrix[rowNum - 1];
        if (colNum < 1 || colNum > r.length) return '#REF!';
        return r[colNum - 1];
      }
      case 'MATCH': {
        // MATCH(lookup_value, lookup_array, [match_type])
        const lookupVal = evaluateParsedExpression(rawArgs[0], context, sheet);
        const lookupArr = resolveRangeValues(rawArgs[1], context);

        for (let i = 0; i < lookupArr.length; i++) {
          if (String(lookupArr[i]).toLowerCase() === String(lookupVal).toLowerCase() || lookupArr[i] == lookupVal) {
            return i + 1; // 1-indexed in Excel
          }
        }
        return '#N/A';
      }
      case 'XMATCH': {
        const lookupVal = evaluateParsedExpression(rawArgs[0], context, sheet);
        const lookupArr = resolveRangeValues(rawArgs[1], context);
        for (let i = 0; i < lookupArr.length; i++) {
          if (String(lookupArr[i]).toLowerCase() === String(lookupVal).toLowerCase() || lookupArr[i] == lookupVal) {
            return i + 1;
          }
        }
        return '#N/A';
      }

      // -------------------------------------------------------------
      // TEXT MANIPULATION FUNCTIONS
      // -------------------------------------------------------------
      case 'TRIM': {
        const s = String(evaluateParsedExpression(rawArgs[0], context, sheet) || '');
        return s.trim().replace(/\s+/g, ' ');
      }
      case 'UPPER': {
        return String(evaluateParsedExpression(rawArgs[0], context, sheet) || '').toUpperCase();
      }
      case 'LOWER': {
        return String(evaluateParsedExpression(rawArgs[0], context, sheet) || '').toLowerCase();
      }
      case 'PROPER': {
        const s = String(evaluateParsedExpression(rawArgs[0], context, sheet) || '');
        return s.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
      }
      case 'LEFT': {
        const s = String(evaluateParsedExpression(rawArgs[0], context, sheet) || '');
        const n = rawArgs[1] ? parseInt(evaluateParsedExpression(rawArgs[1], context, sheet), 10) : 1;
        return s.substring(0, n);
      }
      case 'RIGHT': {
        const s = String(evaluateParsedExpression(rawArgs[0], context, sheet) || '');
        const n = rawArgs[1] ? parseInt(evaluateParsedExpression(rawArgs[1], context, sheet), 10) : 1;
        return s.substring(Math.max(0, s.length - n));
      }
      case 'MID': {
        const s = String(evaluateParsedExpression(rawArgs[0], context, sheet) || '');
        const start = parseInt(evaluateParsedExpression(rawArgs[1], context, sheet), 10) - 1;
        const len = parseInt(evaluateParsedExpression(rawArgs[2], context, sheet), 10);
        return s.substring(start, start + len);
      }
      case 'LEN': {
        return String(evaluateParsedExpression(rawArgs[0], context, sheet) || '').length;
      }
      case 'CONCAT':
      case 'CONCATENATE': {
        return rawArgs.map(a => String(evaluateParsedExpression(a, context, sheet) ?? '')).join('');
      }
      case 'TEXTJOIN': {
        // TEXTJOIN(delimiter, ignore_empty, text1, text2, ...)
        const delim = String(evaluateParsedExpression(rawArgs[0], context, sheet));
        const ignoreEmpty = Boolean(evaluateParsedExpression(rawArgs[1], context, sheet));
        const vals: string[] = [];

        for (let i = 2; i < rawArgs.length; i++) {
          const resolved = resolveValueList([rawArgs[i]], context);
          for (const v of resolved) {
            const s = String(v ?? '');
            if (!ignoreEmpty || s.trim().length > 0) {
              vals.push(s);
            }
          }
        }
        return vals.join(delim);
      }

      // -------------------------------------------------------------
      // DATE & TIME FUNCTIONS
      // -------------------------------------------------------------
      case 'TODAY': {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      }
      case 'YEAR': {
        const val = String(evaluateParsedExpression(rawArgs[0], context, sheet));
        const d = new Date(val);
        return isNaN(d.getFullYear()) ? 2026 : d.getFullYear();
      }
      case 'MONTH': {
        const val = String(evaluateParsedExpression(rawArgs[0], context, sheet));
        const d = new Date(val);
        return isNaN(d.getMonth()) ? 1 : d.getMonth() + 1;
      }
      case 'DAY': {
        const val = String(evaluateParsedExpression(rawArgs[0], context, sheet));
        const d = new Date(val);
        return isNaN(d.getDate()) ? 1 : d.getDate();
      }

      // -------------------------------------------------------------
      // MODERN DYNAMIC ARRAYS
      // -------------------------------------------------------------
      case 'UNIQUE': {
        const arr = resolveRangeValues(rawArgs[0], context);
        return Array.from(new Set(arr));
      }
      case 'SORT': {
        const arr = resolveRangeValues(rawArgs[0], context);
        const isAsc = rawArgs[2] !== undefined ? evaluateParsedExpression(rawArgs[2], context, sheet) >= 0 : true;
        const copy = [...arr];
        copy.sort((a, b) => {
          if (typeof a === 'number' && typeof b === 'number') return isAsc ? a - b : b - a;
          return isAsc ? String(a).localeCompare(String(b)) : String(b).localeCompare(String(a));
        });
        return copy;
      }
      case 'FILTER': {
        // FILTER(array, include, [if_empty])
        const arrayStr = rawArgs[0];
        const includeStr = rawArgs[1];
        const ifEmpty = rawArgs[2] ? evaluateParsedExpression(rawArgs[2], context, sheet) : 'No results';

        const matrix = context.getRange2D(arrayStr);
        // Extract condition from includeStr (e.g. B2:B11="East" or D2:D11>50)
        const condMatch = includeStr.match(/^([A-Z0-9$:]+)\s*(=|<>|>|<|>=|<=)\s*(.*)$/i);
        if (!condMatch) return matrix;

        const condRange = resolveRangeValues(condMatch[1], context);
        const op = condMatch[2];
        const targetVal = resolveLiteralOrExpression(condMatch[3], context, sheet);

        const filteredRows: any[][] = [];
        for (let i = 0; i < matrix.length; i++) {
          const cellVal = condRange[i];
          let pass = false;
          if (op === '=') pass = String(cellVal).toLowerCase() === String(targetVal).toLowerCase() || cellVal == targetVal;
          else if (op === '<>') pass = String(cellVal).toLowerCase() !== String(targetVal).toLowerCase() && cellVal != targetVal;
          else if (op === '>') pass = Number(cellVal) > Number(targetVal);
          else if (op === '<') pass = Number(cellVal) < Number(targetVal);
          else if (op === '>=') pass = Number(cellVal) >= Number(targetVal);
          else if (op === '<=') pass = Number(cellVal) <= Number(targetVal);

          if (pass) filteredRows.push(matrix[i]);
        }

        return filteredRows.length > 0 ? filteredRows : ifEmpty;
      }
      case 'SEQUENCE': {
        const rows = parseInt(evaluateParsedExpression(rawArgs[0], context, sheet), 10) || 1;
        const cols = rawArgs[1] ? parseInt(evaluateParsedExpression(rawArgs[1], context, sheet), 10) || 1 : 1;
        const start = rawArgs[2] ? parseInt(evaluateParsedExpression(rawArgs[2], context, sheet), 10) || 1 : 1;
        const step = rawArgs[3] ? parseInt(evaluateParsedExpression(rawArgs[3], context, sheet), 10) || 1 : 1;

        const seq: number[] = [];
        let curr = start;
        for (let i = 0; i < rows * cols; i++) {
          seq.push(curr);
          curr += step;
        }
        return seq;
      }

      // -------------------------------------------------------------
      // FINANCIAL MODELING FUNCTIONS
      // -------------------------------------------------------------
      case 'PMT': {
        // PMT(rate, nper, pv, [fv], [type])
        const rate = Number(evaluateParsedExpression(rawArgs[0], context, sheet));
        const nper = Number(evaluateParsedExpression(rawArgs[1], context, sheet));
        const pv = Number(evaluateParsedExpression(rawArgs[2], context, sheet));
        if (rate === 0) return -(pv / nper);
        const pmt = (rate * pv * Math.pow(1 + rate, nper)) / (Math.pow(1 + rate, nper) - 1);
        return -Math.round(pmt * 100) / 100;
      }
      case 'FV': {
        // FV(rate, nper, pmt, [pv], [type])
        const rate = Number(evaluateParsedExpression(rawArgs[0], context, sheet));
        const nper = Number(evaluateParsedExpression(rawArgs[1], context, sheet));
        const pmt = Number(evaluateParsedExpression(rawArgs[2], context, sheet));
        const pv = rawArgs[3] ? Number(evaluateParsedExpression(rawArgs[3], context, sheet)) : 0;
        const fv = -(pv * Math.pow(1 + rate, nper) + (pmt * (Math.pow(1 + rate, nper) - 1)) / rate);
        return Math.round(fv * 100) / 100;
      }

      default:
        throw new Error(`Unsupported or unknown Excel function: ${funcName}`);
    }
  }

  // 2. Simple String Literals: "hello"
  if ((clean.startsWith('"') && clean.endsWith('"')) || (clean.startsWith("'") && clean.endsWith("'"))) {
    return clean.substring(1, clean.length - 1);
  }

  // 3. Simple Numbers: 123, 45.6
  if (/^-?\d+(\.\d+)?$/.test(clean)) {
    return parseFloat(clean);
  }

  // 4. Booleans: TRUE / FALSE
  if (clean.toUpperCase() === 'TRUE') return true;
  if (clean.toUpperCase() === 'FALSE') return false;

  // 5. Binary Comparisons: A > B, A = B, etc.
  const compMatch = clean.match(/^(.+?)\s*(>=|<=|<>|>|<|=)\s*(.+)$/);
  if (compMatch) {
    const left = evaluateParsedExpression(compMatch[1], context, sheet);
    const op = compMatch[2];
    const right = evaluateParsedExpression(compMatch[3], context, sheet);

    if (op === '=') return left == right || String(left).toLowerCase() === String(right).toLowerCase();
    if (op === '<>') return left != right && String(left).toLowerCase() !== String(right).toLowerCase();
    if (op === '>') return Number(left) > Number(right);
    if (op === '<') return Number(left) < Number(right);
    if (op === '>=') return Number(left) >= Number(right);
    if (op === '<=') return Number(left) <= Number(right);
  }

  // 6. Basic Arithmetic: A + B, A * B, A / B, A - B, A & B (Concatenation)
  if (clean.includes('&')) {
    const parts = clean.split('&');
    return parts.map(p => String(evaluateParsedExpression(p, context, sheet) ?? '')).join('');
  }

  // Check addition/subtraction
  let parenDepth = 0;
  for (let i = clean.length - 1; i >= 0; i--) {
    const char = clean[i];
    if (char === ')') parenDepth++;
    else if (char === '(') parenDepth--;
    else if (parenDepth === 0) {
      if (char === '+' || (char === '-' && i > 0 && !['*', '/', '+', '-', '('].includes(clean[i - 1]))) {
        const left = evaluateParsedExpression(clean.substring(0, i), context, sheet);
        const right = evaluateParsedExpression(clean.substring(i + 1), context, sheet);
        return char === '+' ? Number(left) + Number(right) : Number(left) - Number(right);
      }
    }
  }

  // Check multiplication/division
  parenDepth = 0;
  for (let i = clean.length - 1; i >= 0; i--) {
    const char = clean[i];
    if (char === ')') parenDepth++;
    else if (char === '(') parenDepth--;
    else if (parenDepth === 0) {
      if (char === '*' || char === '/') {
        const left = evaluateParsedExpression(clean.substring(0, i), context, sheet);
        const right = evaluateParsedExpression(clean.substring(i + 1), context, sheet);
        return char === '*' ? Number(left) * Number(right) : Number(left) / (Number(right) || 1);
      }
    }
  }

  // 7. Cell Range: A1:B10
  if (clean.includes(':')) {
    return context.getRange(clean);
  }

  // 8. Single Cell Reference: A1, $B$2
  if (/^(\$?[A-Z]+\$?[0-9]+)$/i.test(clean)) {
    const val = context.getCell(clean);
    return val !== null ? val : '#REF!';
  }

  return clean;
}

// Splits arguments respecting nested parentheses and quotes
function splitArguments(argStr: string): string[] {
  const args: string[] = [];
  let current = '';
  let parenDepth = 0;
  let inQuotes = false;
  let quoteChar = '';

  for (let i = 0; i < argStr.length; i++) {
    const c = argStr[i];
    if ((c === '"' || c === "'") && (i === 0 || argStr[i - 1] !== '\\')) {
      if (!inQuotes) {
        inQuotes = true;
        quoteChar = c;
      } else if (c === quoteChar) {
        inQuotes = false;
      }
    }

    if (!inQuotes) {
      if (c === '(') parenDepth++;
      else if (c === ')') parenDepth--;
      else if (c === ',' && parenDepth === 0) {
        args.push(current.trim());
        current = '';
        continue;
      }
    }
    current += c;
  }
  if (current.trim()) {
    args.push(current.trim());
  }
  return args;
}

function resolveNumericList(rawArgs: string[], context: any): number[] {
  const nums: number[] = [];
  for (const arg of rawArgs) {
    if (arg.includes(':')) {
      const range = context.getRange(arg);
      range.forEach((v: any) => {
        if (typeof v === 'number' && !isNaN(v)) nums.push(v);
      });
    } else {
      const val = evaluateParsedExpression(arg, context, context.sheet);
      if (typeof val === 'number' && !isNaN(val)) nums.push(val);
      else if (Array.isArray(val)) {
        val.forEach(v => {
          if (typeof v === 'number' && !isNaN(v)) nums.push(v);
        });
      }
    }
  }
  return nums;
}

function resolveValueList(rawArgs: string[], context: any): any[] {
  const vals: any[] = [];
  for (const arg of rawArgs) {
    if (arg.includes(':')) {
      vals.push(...context.getRange(arg));
    } else {
      const v = evaluateParsedExpression(arg, context, context.sheet);
      if (Array.isArray(v)) vals.push(...v);
      else vals.push(v);
    }
  }
  return vals;
}

function resolveRangeValues(arg: string, context: any): any[] {
  if (!arg) return [];
  if (arg.includes(':')) {
    return context.getRange(arg);
  }
  const v = evaluateParsedExpression(arg, context, context.sheet);
  return Array.isArray(v) ? v : [v];
}

function resolveLiteralOrExpression(arg: string, context: any, sheet: ExcelSheet): any {
  if (!arg) return '';
  const trimmed = arg.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.substring(1, trimmed.length - 1);
  }
  return evaluateParsedExpression(trimmed, context, sheet);
}

function testCriteria(val: any, crit: any): boolean {
  if (crit === null || crit === undefined) return false;
  const critStr = String(crit).trim();

  // Operator criteria: ">50", "<=100", "<>Active", etc.
  const match = critStr.match(/^(>=|<=|<>|>|<|=)(.*)$/);
  if (match) {
    const op = match[1];
    const target = match[2].trim();
    const numVal = Number(val);
    const numTarget = Number(target);

    if (!isNaN(numVal) && !isNaN(numTarget)) {
      if (op === '>') return numVal > numTarget;
      if (op === '<') return numVal < numTarget;
      if (op === '>=') return numVal >= numTarget;
      if (op === '<=') return numVal <= numTarget;
      if (op === '=') return numVal === numTarget;
      if (op === '<>') return numVal !== numTarget;
    }

    if (op === '=') return String(val).toLowerCase() === target.toLowerCase();
    if (op === '<>') return String(val).toLowerCase() !== target.toLowerCase();
  }

  // Exact match
  return String(val).toLowerCase() === critStr.toLowerCase() || val == crit;
}
