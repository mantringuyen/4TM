export interface DiffLine {
  lineNum: number;
  type: 'unchanged' | 'removed' | 'added' | 'modified';
  oldContent?: string;
  newContent?: string;
  content: string;
}

export interface SuggestedFix {
  title: string;
  explanation: string;
  lineNumber?: number;
  fixedCode: string;
  diffLines: DiffLine[];
  originalCode: string;
}

export interface CodeErrorDetail {
  errorType: string;
  message: string;
  simpleExplanation?: string;
  whatToCheck?: string;
  lineNumber?: number;
  columnNumber?: number;
  rawTraceback?: string;
  suggestedFix?: SuggestedFix | null;
}

/**
 * Computes a line-by-line diff between original and fixed code
 */
export const computeDiff = (originalCode: string, fixedCode: string): DiffLine[] => {
  const origLines = originalCode.split('\n');
  const fixLines = fixedCode.split('\n');
  const maxLen = Math.max(origLines.length, fixLines.length);
  const diff: DiffLine[] = [];

  for (let i = 0; i < maxLen; i++) {
    const oldLine = origLines[i];
    const newLine = fixLines[i];

    if (oldLine === undefined) {
      diff.push({
        lineNum: i + 1,
        type: 'added',
        newContent: newLine,
        content: `+ ${newLine}`,
      });
    } else if (newLine === undefined) {
      diff.push({
        lineNum: i + 1,
        type: 'removed',
        oldContent: oldLine,
        content: `- ${oldLine}`,
      });
    } else if (oldLine !== newLine) {
      diff.push({
        lineNum: i + 1,
        type: 'modified',
        oldContent: oldLine,
        newContent: newLine,
        content: oldLine,
      });
    } else {
      diff.push({
        lineNum: i + 1,
        type: 'unchanged',
        content: `  ${oldLine}`,
      });
    }
  }

  return diff;
};

/**
 * Calculates Levenshtein distance for fuzzy matching
 */
const levenshtein = (a: string, b: string): number => {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
};

/**
 * Extracts line number, error type, and message from runtime error output
 */
export const parseErrorDetails = (
  rawError: string,
  language: string,
  code: string,
  langPref: 'en' | 'vi' = 'en'
): CodeErrorDetail => {
  const lang = language.toLowerCase();
  const isVi = langPref === 'vi';
  let errorType = 'RuntimeError';
  let message = rawError.trim();
  let lineNumber: number | undefined;
  let columnNumber: number | undefined;
  let rawTraceback = rawError.trim();

  const lines = code.split('\n');

  // --- 1. PYTHON ERROR PARSING ---
  if (lang === 'python') {
    // Strip JavaScript Pyodide PythonError wrapper if present
    const cleanRaw = rawError.replace(/^PythonError:\s*/i, '').trim();
    rawTraceback = cleanRaw;

    const errorLines = cleanRaw.split('\n');
    let detectedType = '';
    let detectedMsg = '';

    // Scan from bottom to top for exact Python Exception type line
    for (let i = errorLines.length - 1; i >= 0; i--) {
      const eline = errorLines[i].trim();
      const match = eline.match(/^([A-Z][a-zA-Z0-9_]*(?:Error|Exception|Warning)):\s*(.*)/);
      if (match && match[1] !== 'PythonError') {
        detectedType = match[1];
        detectedMsg = match[2].trim();
        break;
      }
    }

    if (!detectedType) {
      // Fallback search anywhere in string
      const typeMatch = cleanRaw.match(
        /\b(SyntaxError|IndentationError|TabError|NameError|TypeError|IndexError|KeyError|ZeroDivisionError|ValueError|AttributeError|ImportError|ModuleNotFoundError|UnboundLocalError|RecursionError|MemoryError|AssertionError|Exception)\b:?\s*(.*)/
      );
      if (typeMatch) {
        detectedType = typeMatch[1];
        detectedMsg = typeMatch[2] ? typeMatch[2].split('\n')[0].trim() : '';
      }
    }

    if (detectedType) {
      errorType = detectedType;
      message = detectedMsg || detectedType;
    } else {
      errorType = 'SyntaxError';
    }

    // Line number detection in Python tracebacks
    const lineMatch = cleanRaw.match(/File "<(?:exec|unknown|string)>", line (\d+)/i) 
      || cleanRaw.match(/line (\d+)/i)
      || cleanRaw.match(/line (\d+), in/i);

    if (lineMatch) {
      const parsedLine = parseInt(lineMatch[1], 10);
      if (!isNaN(parsedLine) && parsedLine >= 1 && parsedLine <= lines.length) {
        lineNumber = parsedLine;
      }
    }

    // Fallback line search for Python syntax issues
    if (!lineNumber && errorType === 'SyntaxError') {
      // Look for line with missing colon or unclosed brackets
      for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();
        if (
          /^(if|elif|else|for|while|def|class|try|except|finally|with)\b/.test(trimmed) &&
          !trimmed.endsWith(':') &&
          !trimmed.startsWith('#')
        ) {
          lineNumber = i + 1;
          break;
        }
      }
    }
  }

  // --- 2. SQL ERROR PARSING ---
  else if (lang === 'sql') {
    errorType = 'SQLiteError';
    if (rawError.toLowerCase().includes('syntax error')) {
      errorType = 'SQLSyntaxError';
    } else if (rawError.toLowerCase().includes('no such table')) {
      errorType = 'TableNotFoundError';
    } else if (rawError.toLowerCase().includes('no such column')) {
      errorType = 'ColumnNotFoundError';
    } else if (rawError.toLowerCase().includes('constraint failed')) {
      errorType = 'ConstraintError';
    }

    const cleanMsg = rawError.replace(/^Error:\s*/i, '').trim();
    message = cleanMsg;

    // Detect line number from keyword in error message
    const nearMatch = cleanMsg.match(/near "([^"]+)":/i);
    const tableMatch = cleanMsg.match(/no such table:\s*([^\s,;]+)/i);
    const colMatch = cleanMsg.match(/no such column:\s*([^\s,;]+)/i);
    const targetToken = nearMatch?.[1] || tableMatch?.[1] || colMatch?.[1];

    if (targetToken) {
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].toLowerCase().includes(targetToken.toLowerCase())) {
          lineNumber = i + 1;
          break;
        }
      }
    }

    if (!lineNumber) {
      // Look for common SQL typo line
      for (let i = 0; i < lines.length; i++) {
        if (/\b(FORM|SELCT|WHER|GRPUP|OERDER)\b/i.test(lines[i])) {
          lineNumber = i + 1;
          break;
        }
      }
    }
  }

  // --- 3. JAVASCRIPT ERROR PARSING ---
  else if (lang === 'javascript' || lang === 'js') {
    const jsTypeMatch = rawError.match(
      /\b(SyntaxError|ReferenceError|TypeError|RangeError|URIError|EvalError|Error)\b:?\s*(.*)/
    );
    if (jsTypeMatch) {
      errorType = jsTypeMatch[1];
      message = jsTypeMatch[2] ? jsTypeMatch[2].trim() : rawError;
    }

    // Line number from stack or message: "<anonymous>:3:15" or "at line 3"
    const lineColMatch = rawError.match(/:(\d+):(\d+)/) || rawError.match(/line (\d+)/i);
    if (lineColMatch) {
      const parsed = parseInt(lineColMatch[1], 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= lines.length) {
        lineNumber = parsed;
        if (lineColMatch[2]) {
          columnNumber = parseInt(lineColMatch[2], 10);
        }
      }
    }

    if (!lineNumber) {
      // Find undefined variable usage line
      const refMatch = message.match(/([a-zA-Z0-9_$]+) is not defined/);
      if (refMatch) {
        const varName = refMatch[1];
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes(varName)) {
            lineNumber = i + 1;
            break;
          }
        }
      }
    }
  }

  // --- 4. HTML / CSS VALIDATION ---
  else if (lang === 'html' || lang === 'css') {
    errorType = lang === 'html' ? 'HTMLValidationError' : 'CSSValidationError';
    message = rawError;
  }

  // Derive beginner-friendly explanation and "what to check"
  let simpleExplanation = message;
  let whatToCheck = '';

  if (lang === 'python') {
    switch (errorType) {
      case 'SyntaxError':
        // Check for specific missing colon
        let hasMissingColon = false;
        let colonLine = lineNumber;
        for (let i = 0; i < lines.length; i++) {
          const t = lines[i].trim();
          if (/^(if|elif|else|for|while|def|class|try|except|finally|with)\b/.test(t) && !t.endsWith(':') && !t.startsWith('#')) {
            hasMissingColon = true;
            colonLine = i + 1;
            break;
          }
        }

        if (hasMissingColon && colonLine) {
          simpleExplanation = isVi 
            ? `SyntaxError — Có thể bạn đang thiếu dấu : ở dòng ${colonLine}.`
            : `SyntaxError — You may be missing a colon on line ${colonLine}.`;
          whatToCheck = isVi
            ? 'Kiểm tra xem câu lệnh điều kiện (if/elif/else), vòng lặp (for/while) hoặc định nghĩa hàm (def) đã kết thúc bằng dấu hai chấm (:) chưa.'
            : 'Check that statements (if, elif, else, for, while, def) end with a colon (:).';
        } else {
          simpleExplanation = isVi
            ? `SyntaxError — Python phát hiện lỗi cú pháp khiến chương trình không thể chạy được.`
            : `SyntaxError — Python encountered a syntax issue that prevents running the code.`;
          whatToCheck = isVi
            ? 'Kiểm tra xem có thiếu dấu hai chấm (:) sau if/for/def, đóng mở ngoặc đơn () hoặc thiếu dấu ngoặc kép/đơn (" hoặc \') hay không.'
            : 'Check for missing colons (:) after if/for/def, matching parentheses (), or unclosed quotes (" or \').';
        }
        break;

      case 'IndentationError':
      case 'TabError':
        simpleExplanation = isVi
          ? `IndentationError — Thụt lề ở dòng ${lineNumber || 'chỉ định'} chưa chính xác hoặc không đồng nhất.`
          : `IndentationError — Code indentation is inconsistent on line ${lineNumber || 'indicated'}.`;
        whatToCheck = isVi
          ? 'Đảm bảo dùng 4 khoảng trắng bên trong các khối lệnh (như trong if, for, def) và không trộn lẫn phím Tab với phím cách.'
          : 'Ensure 4 spaces are used for inside blocks (such as inside if, for, def) and no mixing of tabs and spaces.';
        break;

      case 'NameError':
        const nameMatch = message.match(/name '([^']+)' is not defined/);
        const undefName = nameMatch ? nameMatch[1] : '';
        simpleExplanation = isVi
          ? (undefName 
              ? `NameError — Tên '${undefName}' chưa được định nghĩa hoặc bị viết sai chính tả.`
              : 'NameError — Bạn đang gọi một biến hoặc hàm chưa từng được khai báo hoặc gán giá trị.')
          : (undefName 
              ? `NameError — '${undefName}' is not defined.`
              : 'NameError — You are trying to use a variable or function name that has not been defined yet.');
        whatToCheck = isVi
          ? (undefName 
              ? `Kiểm tra lỗi chính tả tên '${undefName}', hoặc khai báo và gán giá trị trước khi sử dụng.`
              : 'Kiểm tra lỗi chính tả tên biến, hoặc khai báo và gán giá trị cho biến trước khi sử dụng.')
          : (undefName 
              ? `Check for typos in '${undefName}', or define/assign the variable before using it.`
              : 'Check for typos in the variable name, or define/assign the variable before using it.');
        break;

      case 'TypeError':
        simpleExplanation = isVi
          ? 'TypeError — Thao tác hoặc hàm được áp dụng cho một kiểu dữ liệu không tương thích.'
          : 'TypeError — An operation or function was applied to an inappropriate data type.';
        whatToCheck = isVi
          ? 'Kiểm tra xem bạn có đang nối chuỗi (str) với số (int/float) mà chưa ép kiểu (ví dụ dùng str(x)) hay không.'
          : 'Check if you are trying to combine text (str) with numbers (int/float) without converting (e.g. str(x)).';
        break;

      case 'ZeroDivisionError':
        simpleExplanation = isVi
          ? 'ZeroDivisionError — Không thể thực hiện phép chia cho số 0.'
          : 'ZeroDivisionError — Attempted to divide a number by zero, which is mathematically undefined.';
        whatToCheck = isVi
          ? 'Kiểm tra số chia trong phép chia (/) hoặc chia lấy dư (%) để đảm bảo số chia khác 0.'
          : 'Check the divisor in your division (/) or modulo (%) operation to make sure it is greater than 0.';
        break;

      case 'IndexError':
        simpleExplanation = isVi
          ? 'IndexError — Truy cập chỉ mục (index) vượt quá độ dài của danh sách hoặc chuỗi.'
          : 'IndexError — Attempted to access an index that is out of the bounds of the list or string.';
        whatToCheck = isVi
          ? 'Lưu ý Python đếm chỉ mục từ 0. Kiểm tra độ dài với len() trước khi truy cập phần tử.'
          : 'Remember Python uses 0-based indexing. Check list length with len() before accessing index.';
        break;

      case 'KeyError':
        simpleExplanation = isVi
          ? 'KeyError — Truy cập một khóa (key) không tồn tại trong từ điển (dict).'
          : 'KeyError — Attempted to access a dictionary key that does not exist.';
        whatToCheck = isVi
          ? 'Kiểm tra chính tả tên khóa (key) hoặc dùng dict.get(key) để truy xuất an toàn.'
          : 'Check if the key name is spelled correctly or use dict.get(key) for safe access.';
        break;

      case 'ValueError':
        simpleExplanation = isVi
          ? 'ValueError — Hàm nhận tham số đúng kiểu dữ liệu nhưng giá trị không phù hợp để xử lý.'
          : 'ValueError — A function received an argument that has the right type but an inappropriate value.';
        whatToCheck = isVi
          ? 'Kiểm tra dữ liệu đầu vào khi ép kiểu (ví dụ int("abc") sẽ lỗi vì "abc" không phải là chữ số).'
          : 'Check conversion inputs (e.g., int("abc") fails because "abc" is not a valid number).';
        break;

      default:
        simpleExplanation = isVi
          ? `${errorType} — Phát hiện lỗi khi thực thi mã nguồn.`
          : message;
        whatToCheck = isVi
          ? `Xem lại dòng ${lineNumber || 'được báo lỗi'} và kiểm tra các tham số, biến số đầu vào.`
          : 'Review line ' + (lineNumber || 'indicated in code') + ' and verify input parameters and variables.';
        break;
    }
  } else if (lang === 'sql') {
    if (errorType.includes('Syntax')) {
      simpleExplanation = isVi
        ? 'SQLSyntaxError — Cấu trúc câu lệnh SQL không hợp lệ hoặc sai từ khóa cú pháp.'
        : 'SQLSyntaxError — SQL statement structure is invalid or has a syntax keyword error.';
      whatToCheck = isVi
        ? 'Kiểm tra chính tả các mệnh đề SELECT, FROM, WHERE và dấu phẩy ngăn cách giữa các cột.'
        : 'Check SELECT, FROM, WHERE clauses spelling and commas between selected columns.';
    } else if (errorType.includes('Table')) {
      simpleExplanation = isVi
        ? 'TableNotFoundError — Bảng được chỉ định trong FROM hoặc JOIN không tồn tại trong cơ sở dữ liệu.'
        : 'TableNotFoundError — The table specified in FROM or JOIN does not exist in the database.';
      whatToCheck = isVi
        ? 'Kiểm tra lại chính tả tên bảng theo đúng lược đồ cơ sở dữ liệu.'
        : 'Verify the table name spelling against the database schema.';
    } else if (errorType.includes('Column')) {
      simpleExplanation = isVi
        ? 'ColumnNotFoundError — Tên cột được truy vấn không tồn tại trong bảng tương ứng.'
        : 'ColumnNotFoundError — The column name queried does not exist in the referenced table.';
      whatToCheck = isVi
        ? 'Kiểm tra lỗi chính tả tên cột, bí danh (alias) hoặc tiền tố bảng.'
        : 'Check column names and aliases for typos or missing table prefixes.';
    }
  } else if (lang === 'javascript' || lang === 'js') {
    if (errorType === 'ReferenceError') {
      simpleExplanation = isVi
        ? 'ReferenceError — Biến hoặc hàm được sử dụng trước khi được khai báo.'
        : 'ReferenceError — A variable or function was referenced before declaration.';
      whatToCheck = isVi
        ? 'Kiểm tra khai báo biến (let/const) và chính tả của các định danh.'
        : 'Check variable declaration (let/const) and spelling of identifiers.';
    } else if (errorType === 'TypeError') {
      simpleExplanation = isVi
        ? 'TypeError — Giá trị không đúng kiểu dữ liệu mong đợi (ví dụ gọi biến như một hàm).'
        : 'TypeError — A value was not of the expected type (e.g., calling non-function as a function).';
      whatToCheck = isVi
        ? 'Kiểm tra biến có đúng là hàm hoặc đối tượng cần gọi hay không.'
        : 'Verify the variable holds the type of object or function you are trying to call.';
    }
  } else if (lang === 'html' || lang === 'css') {
    simpleExplanation = isVi
      ? (lang === 'html' ? 'HTMLValidationError — Thẻ HTML chưa được đóng đúng cách.' : 'CSSValidationError — Cú pháp CSS thiếu dấu ngoặc nhọn hoặc chấm phẩy.')
      : message;
    whatToCheck = isVi
      ? (lang === 'html' ? 'Đảm bảo mọi thẻ mở đều có thẻ đóng tương ứng (ví dụ: <p>...</p>).' : 'Đảm bảo mọi khối quy tắc CSS đều có dấu đóng "}" và kết thúc thuộc tính bằng dấu ";".')
      : 'Verify closing tags and syntax delimiters.';
  }

  return {
    errorType,
    message,
    simpleExplanation,
    whatToCheck,
    lineNumber,
    columnNumber,
    rawTraceback: rawTraceback || rawError,
  };
};

export interface FixOptions {
  mode?: 'exercise' | 'challenge' | 'playground' | 'learn';
}

/**
 * Intelligent analyzer that constructs the smallest, safest code correction
 */
export const analyzeAndFixError = (
  code: string,
  language: string,
  errorDetail: CodeErrorDetail,
  options?: FixOptions
): SuggestedFix | null => {
  const lang = language.toLowerCase();
  const lines = code.split('\n');
  const isChallenge = options?.mode === 'challenge';
  const targetLineIdx = errorDetail.lineNumber ? errorDetail.lineNumber - 1 : -1;

  // ==========================================
  // 1. PYTHON CORRECTIONS
  // ==========================================
  if (lang === 'python') {
    const codeFixedLines = [...lines];

    // Case 1.1: Missing colon in block statements (if, for, while, def, class, etc.)
    for (let i = 0; i < codeFixedLines.length; i++) {
      const line = codeFixedLines[i];
      const trimmed = line.trim();
      if (
        /^(if|elif|else|for|while|def|class|try|except|finally|with)\b/.test(trimmed) &&
        !trimmed.endsWith(':') &&
        !trimmed.startsWith('#')
      ) {
        codeFixedLines[i] = line + ':';
        const fixedCode = codeFixedLines.join('\n');
        return {
          title: 'Add Missing Colon (":")',
          explanation: `Python block statements (such as '${trimmed.split(' ')[0]}') require a colon ':' at the end of the line.`,
          lineNumber: i + 1,
          fixedCode,
          originalCode: code,
          diffLines: computeDiff(code, fixedCode),
        };
      }
    }

    // Case 1.2: Unclosed string literal / missing quote
    if (errorDetail.errorType === 'SyntaxError' || errorDetail.message.includes('string literal') || errorDetail.message.includes('EOL')) {
      const lineIdxToCheck = targetLineIdx >= 0 ? targetLineIdx : codeFixedLines.findIndex(l => {
        const doubleCount = (l.match(/"/g) || []).length;
        const singleCount = (l.match(/'/g) || []).length;
        return (doubleCount % 2 !== 0) || (singleCount % 2 !== 0);
      });

      if (lineIdxToCheck >= 0 && lineIdxToCheck < codeFixedLines.length) {
        const line = codeFixedLines[lineIdxToCheck];
        const doubleCount = (line.match(/"/g) || []).length;
        const singleCount = (line.match(/'/g) || []).length;

        if (doubleCount % 2 !== 0) {
          // If ends with closing parenthesis like `print("hello)` -> `print("hello")`
          if (line.endsWith(')')) {
            codeFixedLines[lineIdxToCheck] = line.slice(0, -1) + '")';
          } else {
            codeFixedLines[lineIdxToCheck] = line + '"';
          }
          const fixedCode = codeFixedLines.join('\n');
          return {
            title: 'Close Unterminated Double Quote (\")',
            explanation: 'Added missing closing quotation mark to complete the string literal.',
            lineNumber: lineIdxToCheck + 1,
            fixedCode,
            originalCode: code,
            diffLines: computeDiff(code, fixedCode),
          };
        } else if (singleCount % 2 !== 0) {
          if (line.endsWith(')')) {
            codeFixedLines[lineIdxToCheck] = line.slice(0, -1) + "')";
          } else {
            codeFixedLines[lineIdxToCheck] = line + "'";
          }
          const fixedCode = codeFixedLines.join('\n');
          return {
            title: "Close Unterminated Single Quote (')",
            explanation: 'Added missing closing single quote to complete the string literal.',
            lineNumber: lineIdxToCheck + 1,
            fixedCode,
            originalCode: code,
            diffLines: computeDiff(code, fixedCode),
          };
        }
      }
    }

    // Case 1.3: Unclosed parentheses / brackets / braces
    let openParens = 0;
    let openBrackets = 0;
    let openBraces = 0;
    for (const l of lines) {
      openParens += (l.match(/\(/g) || []).length - (l.match(/\)/g) || []).length;
      openBrackets += (l.match(/\[/g) || []).length - (l.match(/\]/g) || []).length;
      openBraces += (l.match(/\{/g) || []).length - (l.match(/\}/g) || []).length;
    }

    if (openParens > 0 || openBrackets > 0 || openBraces > 0) {
      const lastLineIdx = targetLineIdx >= 0 ? targetLineIdx : codeFixedLines.length - 1;
      let suffix = '';
      if (openBraces > 0) suffix += '}'.repeat(openBraces);
      if (openBrackets > 0) suffix += ']'.repeat(openBrackets);
      if (openParens > 0) suffix += ')'.repeat(openParens);

      codeFixedLines[lastLineIdx] = codeFixedLines[lastLineIdx] + suffix;
      const fixedCode = codeFixedLines.join('\n');
      return {
        title: `Close Unclosed Delimiter (${suffix})`,
        explanation: `Appended the missing closing bracket/parenthesis '${suffix}' to balance the expression.`,
        lineNumber: lastLineIdx + 1,
        fixedCode,
        originalCode: code,
        diffLines: computeDiff(code, fixedCode),
      };
    }

    // Case 1.4: NameError (e.g. `prnt` -> `print`, `lenght` -> `len` or variable name typo)
    if (errorDetail.errorType === 'NameError') {
      const undefinedNameMatch = errorDetail.message.match(/name '([^']+)' is not defined/);
      if (undefinedNameMatch) {
        const undefinedName = undefinedNameMatch[1];
        
        // Check built-in python typos
        const commonBuiltinFixes: Record<string, string> = {
          'prnt': 'print',
          'prnit': 'print',
          'pritn': 'print',
          'pint': 'print',
          'rang': 'range',
          'raneg': 'range',
          'lenght': 'len',
          'lengt': 'len',
          'strng': 'str',
          'integ': 'int',
          'flot': 'float',
          'tru': 'True',
          'flse': 'False',
          'ture': 'True',
          'flase': 'False',
          'none': 'None',
        };

        if (commonBuiltinFixes[undefinedName.toLowerCase()]) {
          const replacement = commonBuiltinFixes[undefinedName.toLowerCase()];
          const regex = new RegExp(`\\b${undefinedName}\\b`, 'g');
          const fixedCode = code.replace(regex, replacement);
          return {
            title: `Fix Typo: '${undefinedName}' → '${replacement}'`,
            explanation: `Corrected the misspelled Python keyword/function name to '${replacement}'.`,
            lineNumber: targetLineIdx >= 0 ? targetLineIdx + 1 : undefined,
            fixedCode,
            originalCode: code,
            diffLines: computeDiff(code, fixedCode),
          };
        }

        // Fuzzy match against defined identifiers in the same code
        const definedVars = Array.from(code.matchAll(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g)).map(m => m[1]);
        let bestMatch: string | null = null;
        let lowestDist = 3; // Max tolerance 2 edits

        for (const v of definedVars) {
          if (v !== undefinedName) {
            const dist = levenshtein(undefinedName, v);
            if (dist < lowestDist) {
              lowestDist = dist;
              bestMatch = v;
            }
          }
        }

        if (bestMatch) {
          const regex = new RegExp(`\\b${undefinedName}\\b`, 'g');
          const fixedCode = code.replace(regex, bestMatch);
          return {
            title: `Fix Variable Name: '${undefinedName}' → '${bestMatch}'`,
            explanation: `Matched undefined variable '${undefinedName}' to declared variable '${bestMatch}'.`,
            lineNumber: targetLineIdx >= 0 ? targetLineIdx + 1 : undefined,
            fixedCode,
            originalCode: code,
            diffLines: computeDiff(code, fixedCode),
          };
        }

        // Default: Initialize variable before first usage
        const lineIdx = targetLineIdx >= 0 ? targetLineIdx : 0;
        const indentMatch = codeFixedLines[lineIdx].match(/^(\s*)/);
        const indent = indentMatch ? indentMatch[1] : '';
        codeFixedLines.splice(lineIdx, 0, `${indent}${undefinedName} = 0  # Initialized variable`);
        const fixedCode = codeFixedLines.join('\n');
        return {
          title: `Initialize Variable '${undefinedName}'`,
          explanation: `Defined '${undefinedName}' before it was referenced in execution.`,
          lineNumber: lineIdx + 1,
          fixedCode,
          originalCode: code,
          diffLines: computeDiff(code, fixedCode),
        };
      }
    }

    // Case 1.5: IndentationError (e.g. missing 4 spaces inside function or loop)
    if (errorDetail.errorType === 'IndentationError') {
      const lineIdx = targetLineIdx >= 0 ? targetLineIdx : 1;
      if (lineIdx < codeFixedLines.length) {
        const line = codeFixedLines[lineIdx];
        if (!line.startsWith('    ') && !line.startsWith('\t')) {
          codeFixedLines[lineIdx] = '    ' + line;
          const fixedCode = codeFixedLines.join('\n');
          return {
            title: 'Fix Block Indentation (Add 4 Spaces)',
            explanation: 'Python requires code inside conditional/loop/function blocks to be indented by 4 spaces.',
            lineNumber: lineIdx + 1,
            fixedCode,
            originalCode: code,
            diffLines: computeDiff(code, fixedCode),
          };
        }
      }
    }

    // Case 1.6: TypeError with string + int concatenation: `str(x)`
    if (errorDetail.errorType === 'TypeError' && errorDetail.message.includes('can only concatenate str')) {
      const concatMatch = code.match(/["'][^"']*["']\s*\+\s*([a-zA-Z_][a-zA-Z0-9_]*)/);
      if (concatMatch) {
        const varName = concatMatch[1];
        const fixedCode = code.replace(`+ ${varName}`, `+ str(${varName})`);
        return {
          title: `Cast Value to String: str(${varName})`,
          explanation: 'In Python, numbers must be converted to strings using str(...) before concatenating with other strings.',
          lineNumber: targetLineIdx >= 0 ? targetLineIdx + 1 : undefined,
          fixedCode,
          originalCode: code,
          diffLines: computeDiff(code, fixedCode),
        };
      }
    }

    // Case 1.7: Python 2 style print statement `print "hello"` -> `print("hello")`
    const py2PrintMatch = code.match(/^(\s*)print\s+([^(].*)$/m);
    if (py2PrintMatch) {
      const fixedCode = code.replace(/^(\s*)print\s+([^(].*)$/gm, '$1print($2)');
      return {
        title: 'Use Python 3 Function Syntax: print(...)',
        explanation: 'In Python 3, print is a function and requires parentheses around arguments.',
        fixedCode,
        originalCode: code,
        diffLines: computeDiff(code, fixedCode),
      };
    }
  }

  // ==========================================
  // 2. SQL CORRECTIONS
  // ==========================================
  if (lang === 'sql') {
    let fixedCode = code;

    // Case 2.1: Keyword typos
    const sqlKeywordTypos: Record<string, string> = {
      '\\bFORM\\b': 'FROM',
      '\\bSELCT\\b': 'SELECT',
      '\\bSELETC\\b': 'SELECT',
      '\\bWHER\\b': 'WHERE',
      '\\bWHERRE\\b': 'WHERE',
      '\\bGRPUP\\s+BY\\b': 'GROUP BY',
      '\\bGROPU\\s+BY\\b': 'GROUP BY',
      '\\bOERDER\\s+BY\\b': 'ORDER BY',
      '\\bODER\\s+BY\\b': 'ORDER BY',
      '\\bHAVNG\\b': 'HAVING',
      '\\bVALUS\\b': 'VALUES',
      '\\bINSER\\s+INTO\\b': 'INSERT INTO',
    };

    for (const [pattern, replacement] of Object.entries(sqlKeywordTypos)) {
      const regex = new RegExp(pattern, 'gi');
      if (regex.test(fixedCode)) {
        fixedCode = fixedCode.replace(regex, replacement);
        return {
          title: `Correct SQL Keyword: '${replacement}'`,
          explanation: `Fixed misspelled SQL keyword to standard '${replacement}'.`,
          lineNumber: targetLineIdx >= 0 ? targetLineIdx + 1 : undefined,
          fixedCode,
          originalCode: code,
          diffLines: computeDiff(code, fixedCode),
        };
      }
    }

    // Case 2.2: Missing table name / typo in table name (e.g. `studentss` -> `students`)
    if (errorDetail.message.includes('no such table')) {
      const match = errorDetail.message.match(/no such table:\s*([^\s,;]+)/i);
      const wrongTable = match ? match[1] : '';
      const knownTables = ['students', 'orders'];
      let bestMatch: string | null = null;
      let minDistance = 3;

      for (const tbl of knownTables) {
        const d = levenshtein(wrongTable.toLowerCase(), tbl.toLowerCase());
        if (d < minDistance) {
          minDistance = d;
          bestMatch = tbl;
        }
      }

      if (bestMatch && wrongTable) {
        const regex = new RegExp(`\\b${wrongTable}\\b`, 'gi');
        fixedCode = fixedCode.replace(regex, bestMatch);
        return {
          title: `Fix Table Name: '${wrongTable}' → '${bestMatch}'`,
          explanation: `Corrected table name spelling to match database table '${bestMatch}'.`,
          lineNumber: targetLineIdx >= 0 ? targetLineIdx + 1 : undefined,
          fixedCode,
          originalCode: code,
          diffLines: computeDiff(code, fixedCode),
        };
      }
    }

    // Case 2.3: Column typo (e.g. `grad` -> `grade`, `cours` -> `course`)
    if (errorDetail.message.includes('no such column')) {
      const match = errorDetail.message.match(/no such column:\s*([^\s,;]+)/i);
      const wrongCol = match ? match[1] : '';
      const knownCols = ['id', 'name', 'course', 'grade', 'city', 'order_id', 'customer_name', 'product', 'amount', 'order_date'];
      let bestMatch: string | null = null;
      let minDistance = 3;

      for (const col of knownCols) {
        const d = levenshtein(wrongCol.toLowerCase(), col.toLowerCase());
        if (d < minDistance) {
          minDistance = d;
          bestMatch = col;
        }
      }

      if (bestMatch && wrongCol) {
        const regex = new RegExp(`\\b${wrongCol}\\b`, 'gi');
        fixedCode = fixedCode.replace(regex, bestMatch);
        return {
          title: `Fix Column Name: '${wrongCol}' → '${bestMatch}'`,
          explanation: `Corrected column name to '${bestMatch}'.`,
          lineNumber: targetLineIdx >= 0 ? targetLineIdx + 1 : undefined,
          fixedCode,
          originalCode: code,
          diffLines: computeDiff(code, fixedCode),
        };
      }
    }

    // Case 2.4: Unclosed quotes in SQL string literal
    const singleQuoteCount = (code.match(/'/g) || []).length;
    if (singleQuoteCount % 2 !== 0) {
      const linesArr = code.split('\n');
      for (let i = 0; i < linesArr.length; i++) {
        if ((linesArr[i].match(/'/g) || []).length % 2 !== 0) {
          linesArr[i] = linesArr[i] + "'";
          const fix = linesArr.join('\n');
          return {
            title: "Close SQL String Literal (')",
            explanation: 'Added missing closing single quote in SQL condition or value.',
            lineNumber: i + 1,
            fixedCode: fix,
            originalCode: code,
            diffLines: computeDiff(code, fix),
          };
        }
      }
    }
  }

  // ==========================================
  // 3. JAVASCRIPT CORRECTIONS
  // ==========================================
  if (lang === 'javascript' || lang === 'js') {
    let fixedCode = code;

    // Case 3.1: Common JS typos (conosle -> console, fucntion -> function, cosnt -> const)
    const jsTypos: Record<string, string> = {
      '\\bconosle\\.log\\b': 'console.log',
      '\\bconsol\\.log\\b': 'console.log',
      '\\bcosnole\\.log\\b': 'console.log',
      '\\bfucntion\\b': 'function',
      '\\bfunctoin\\b': 'function',
      '\\bcosnt\\b': 'const',
      '\\blte\\b': 'let',
      '\\breturnn\\b': 'return',
      '\\bdoucment\\b': 'document',
      '\\blenght\\b': 'length',
    };

    for (const [pattern, replacement] of Object.entries(jsTypos)) {
      const regex = new RegExp(pattern, 'g');
      if (regex.test(fixedCode)) {
        fixedCode = fixedCode.replace(regex, replacement);
        return {
          title: `Fix Typo: '${replacement}'`,
          explanation: `Corrected misspelled JavaScript keyword or method name to '${replacement}'.`,
          lineNumber: targetLineIdx >= 0 ? targetLineIdx + 1 : undefined,
          fixedCode,
          originalCode: code,
          diffLines: computeDiff(code, fixedCode),
        };
      }
    }

    // Case 3.2: ReferenceError - Undefined variable declaration
    if (errorDetail.errorType === 'ReferenceError') {
      const match = errorDetail.message.match(/([a-zA-Z0-9_$]+) is not defined/);
      if (match) {
        const varName = match[1];
        const linesArr = [...lines];
        const lineIdx = targetLineIdx >= 0 ? targetLineIdx : 0;
        linesArr.splice(lineIdx, 0, `let ${varName} = 0; // Declared missing variable`);
        const fix = linesArr.join('\n');
        return {
          title: `Declare Variable '${varName}'`,
          explanation: `Added 'let ${varName} = 0;' before it is referenced in code.`,
          lineNumber: lineIdx + 1,
          fixedCode: fix,
          originalCode: code,
          diffLines: computeDiff(code, fix),
        };
      }
    }

    // Case 3.3: Missing closing brace '}' or parenthesis ')'
    let openBraces = 0;
    let openParens = 0;
    for (const l of lines) {
      openBraces += (l.match(/\{/g) || []).length - (l.match(/\}/g) || []).length;
      openParens += (l.match(/\(/g) || []).length - (l.match(/\)/g) || []).length;
    }

    if (openBraces > 0 || openParens > 0) {
      let suffix = '';
      if (openParens > 0) suffix += ')'.repeat(openParens);
      if (openBraces > 0) suffix += '\n' + '}'.repeat(openBraces);
      fixedCode = code.trimEnd() + suffix;
      return {
        title: 'Close Block / Function Scope',
        explanation: 'Appended missing closing brace/parenthesis to complete the block.',
        fixedCode,
        originalCode: code,
        diffLines: computeDiff(code, fixedCode),
      };
    }
  }

  // ==========================================
  // 4. HTML / CSS CORRECTIONS
  // ==========================================
  if (lang === 'html') {
    // Check for unclosed basic tags: <div>, <p>, <h1>-<h6>, <button>, <span>
    const tags = ['div', 'p', 'h1', 'h2', 'h3', 'button', 'span', 'section', 'article', 'ul', 'ol', 'li'];
    for (const tag of tags) {
      const openCount = (code.match(new RegExp(`<${tag}(\\s+[^>]*)?>`, 'gi')) || []).length;
      const closeCount = (code.match(new RegExp(`</${tag}>`, 'gi')) || []).length;
      if (openCount > closeCount) {
        const missing = openCount - closeCount;
        const suffix = `</${tag}>`.repeat(missing);
        const fixedCode = code.trimEnd() + '\n' + suffix;
        return {
          title: `Close Tag: <${tag}>`,
          explanation: `Added missing closing tag '</${tag}>' to maintain valid HTML tree structure.`,
          fixedCode,
          originalCode: code,
          diffLines: computeDiff(code, fixedCode),
        };
      }
    }
  }

  if (lang === 'css') {
    // Check for unclosed braces
    const openBraces = (code.match(/\{/g) || []).length;
    const closeBraces = (code.match(/\}/g) || []).length;
    if (openBraces > closeBraces) {
      const fixedCode = code.trimEnd() + '\n}';
      return {
        title: 'Close CSS Rule Block ("}")',
        explanation: 'Appended missing closing curly brace for the CSS rule.',
        fixedCode,
        originalCode: code,
        diffLines: computeDiff(code, fixedCode),
      };
    }
  }

  // Fallback: Check if there is any trailing semicolon, unclosed quote or single syntax error
  return null;
};
