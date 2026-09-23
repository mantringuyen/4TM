import React, { useState, useMemo } from 'react';
import { Language } from '../../../types';
import {
  AlertTriangle,
  Code,
  Copy,
  Check,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface PythonErrorExplainerToolProps {
  language: Language;
}

interface ErrorPreset {
  name: string;
  traceback: string;
}

const ERROR_PRESETS: ErrorPreset[] = [
  {
    name: 'TypeError: str + int concatenation',
    traceback: `Traceback (most recent call last):
  File "main.py", line 4, in <module>
    message = "Your total score is: " + score
TypeError: can only concatenate str (not "int") to str`,
  },
  {
    name: 'ValueError: invalid literal for int()',
    traceback: `Traceback (most recent call last):
  File "parser.py", line 18, in parse_age
    age = int("twenty")
ValueError: invalid literal for int() with base 10: 'twenty'`,
  },
  {
    name: 'KeyError in Dictionary Lookup',
    traceback: `Traceback (most recent call last):
  File "auth.py", line 12, in get_user_role
    role = user_payload["permissions"]["role"]
KeyError: 'role'`,
  },
  {
    name: 'IndexError: list index out of range',
    traceback: `Traceback (most recent call last):
  File "pipeline.py", line 8, in process_batch
    first_item = items[0]
IndexError: list index out of range`,
  },
  {
    name: 'AttributeError: NoneType has no attribute',
    traceback: `Traceback (most recent call last):
  File "db.py", line 25, in find_user
    user = query_database(user_id)
    user.send_welcome_email()
AttributeError: 'NoneType' object has no attribute 'send_welcome_email'`,
  },
  {
    name: 'NameError: name is not defined',
    traceback: `Traceback (most recent call last):
  File "calc.py", line 7, in compute_total
    total = price * quantity + discount_rate
NameError: name 'discount_rate' is not defined`,
  },
  {
    name: 'ImportError / ModuleNotFoundError',
    traceback: `Traceback (most recent call last):
  File "app.py", line 2, in <module>
    import pandas as pd
ModuleNotFoundError: No module named 'pandas'`,
  },
  {
    name: 'SyntaxError: invalid syntax',
    traceback: `  File "server.py", line 14
    if user_role == "admin"
                          ^
SyntaxError: expected ':'`,
  },
];

export const PythonErrorExplainerTool: React.FC<PythonErrorExplainerToolProps> = ({ language }) => {
  const [traceback, setTraceback] = useState(ERROR_PRESETS[0].traceback);
  const [copied, setCopied] = useState(false);

  const analysis = useMemo(() => {
    const raw = traceback.trim();
    let errorType = 'Unknown Python Exception';
    let errorMessage = '';
    let location = 'main.py';
    let lineNum = '1';

    const matchLine = raw.match(/File "([^"]+)", line (\d+)/i);
    if (matchLine) {
      location = matchLine[1];
      lineNum = matchLine[2];
    }

    const matchErr = raw.match(/([A-Za-z]+Error|Exception|KeyError):\s*(.+)/);
    if (matchErr) {
      errorType = matchErr[1];
      errorMessage = matchErr[2];
    }

    let rootCause = {
      en: 'A runtime exception was thrown during script execution.',
      vi: 'Một ngoại lệ thời gian chạy đã phát sinh trong quá trình thực thi mã.',
    };
    let fixExample = `# Use explicit type casting or defensive checks`;
    let preventionTip = {
      en: 'Always validate data types before arithmetic or string operations.',
      vi: 'Luôn kiểm tra kiểu dữ liệu hoặc giá trị None trước khi thao tác.',
    };

    if (errorType.includes('TypeError')) {
      rootCause = {
        en: 'You are attempting to concatenate or add incompatible data types (e.g. adding an integer to a string) without converting it first.',
        vi: 'Bạn đang cố gắng cộng hoặc ghép hai kiểu dữ liệu không tương thích (ví dụ ghép số nguyên với chuỗi ký tự) mà chưa ép kiểu.',
      };
      fixExample = `# ❌ Faulty code:
# message = "Your total score is: " + score

# ✅ Correct modern f-string approach (Recommended):
message = f"Your total score is: {score}"

# ✅ Or explicit casting:
message = "Your total score is: " + str(score)`;
      preventionTip = {
        en: 'Use Python 3.6+ f-strings (f"...{var}...") for readable, safe string interpolation.',
        vi: 'Ưu tiên sử dụng f-string (f"...{var}...") để nội suy chuỗi tự động ép kiểu an toàn.',
      };
    } else if (errorType.includes('KeyError')) {
      rootCause = {
        en: `The dictionary key does not exist in the current object. Direct indexing dict["key"] throws KeyError when the key is missing.`,
        vi: `Khóa tìm kiếm không tồn tại trong từ điển (dictionary). Truy cập trực tiếp dict["key"] sẽ ném ra lỗi KeyError nếu khóa bị thiếu.`,
      };
      fixExample = `# ❌ Risky:
# role = user_payload["permissions"]["role"]

# ✅ Safe lookup with .get() fallback:
permissions = user_payload.get("permissions", {})
role = permissions.get("role", "guest")`;
      preventionTip = {
        en: 'Use dict.get(key, default_value) to safely retrieve dictionary values without throwing exceptions.',
        vi: 'Sử dụng dict.get(key, giá_trị_mặc_định) để tra cứu an toàn mà không làm sập chương trình.',
      };
    } else if (errorType.includes('IndexError')) {
      rootCause = {
        en: 'Attempted to access an index that is outside the bounds of the list or array (e.g. accessing items[0] on an empty list []).',
        vi: 'Bạn đang truy cập vào chỉ số index vượt quá độ dài danh sách (ví dụ truy cập items[0] khi danh sách đang rỗng []).',
      };
      fixExample = `# ❌ Risky:
# first_item = items[0]

# ✅ Safe check:
if items:
    first_item = items[0]
else:
    first_item = None`;
      preventionTip = {
        en: 'Check `if items:` before indexing into sequence containers.',
        vi: 'Kiểm tra độ dài danh sách `if items:` trước khi lấy phần tử theo index.',
      };
    } else if (errorType.includes('AttributeError')) {
      rootCause = {
        en: `The variable is currently None (NoneType) instead of the expected class instance or object.`,
        vi: `Biến hiện tại đang mang giá trị None (NoneType) thay vì đối tượng lớp như kỳ vọng.`,
      };
      fixExample = `# ❌ Risky:
# user = query_database(user_id)
# user.send_welcome_email()

# ✅ Safe guard:
user = query_database(user_id)
if user is not None:
    user.send_welcome_email()
else:
    print(f"User {user_id} not found in database")`;
      preventionTip = {
        en: 'Always verify return values from database queries or API calls before invoking methods on them.',
        vi: 'Luôn kiểm tra `if obj is not None:` trước khi gọi phương thức của đối tượng.',
      };
    } else if (errorType.includes('ValueError')) {
      rootCause = {
        en: 'A function received an argument that has the right type but an inappropriate or unparseable value (e.g. attempting to convert non-numeric string "twenty" into an integer).',
        vi: 'Hàm nhận được tham số đúng kiểu dữ liệu nhưng giá trị không phù hợp để xử lý (ví dụ chuyển chuỗi chữ "twenty" thành số nguyên int).',
      };
      fixExample = `# ❌ Risky:
# age = int(user_input)

# ✅ Defensive parsing with try-except:
try:
    age = int(user_input.strip())
except (ValueError, AttributeError):
    age = None
    print("Invalid numeric input provided")`;
      preventionTip = {
        en: 'Wrap type-casting of untrusted user/file input inside try...except ValueError blocks.',
        vi: 'Bọc các phép ép kiểu dữ liệu người dùng/tệp tin trong khối try...except ValueError.',
      };
    } else if (errorType.includes('NameError')) {
      rootCause = {
        en: 'A local or global variable or function name was referenced before it was defined or imported.',
        vi: 'Một biến hoặc hàm được gọi trước khi được khai báo, định nghĩa hoặc import.',
      };
      fixExample = `# ❌ Misspelled or out-of-scope variable:
# total = price * quantity + discount_rate

# ✅ Ensure variable is initialized beforehand:
discount_rate = 0.05
total = price * quantity * (1 - discount_rate)`;
      preventionTip = {
        en: 'Verify spelling and ensure variables are defined in the correct enclosing scope before use.',
        vi: 'Kiểm tra chính tả tên biến và đảm bảo biến đã được khởi tạo trong phạm vi (scope) trước khi gọi.',
      };
    } else if (errorType.includes('ImportError') || errorType.includes('ModuleNotFoundError')) {
      rootCause = {
        en: 'Python cannot locate the requested module in the current virtual environment (sys.path).',
        vi: 'Python không tìm thấy thư viện hoặc module yêu cầu trong môi trường ảo hiện tại (sys.path).',
      };
      fixExample = `# 1. Install missing dependency via terminal:
pip install pandas

# 2. Or verify active virtual environment:
which python
source .venv/bin/activate`;
      preventionTip = {
        en: 'Always run scripts within the active virtual environment (.venv) where project dependencies are installed.',
        vi: 'Luôn kích hoạt môi trường ảo (.venv) trước khi chạy lệnh để tránh xung đột thư viện.',
      };
    } else if (errorType.includes('SyntaxError')) {
      rootCause = {
        en: 'The Python interpreter encountered invalid syntax before executing the code (e.g. missing colon, mismatched brackets, or misplaced reserved keywords).',
        vi: 'Trình thông dịch phát hiện cú pháp không hợp lệ trước khi chạy mã (ví dụ thiếu dấu hai chấm :, ngoặc không cân xứng hoặc dùng sai từ khóa).',
      };
      fixExample = `# ❌ Missing colon:
# if user_role == "admin"
#     grant_access()

# ✅ Correct syntax with colon:
if user_role == "admin":
    grant_access()`;
      preventionTip = {
        en: 'Use an editor with a Python language server (LSP / Ruff / Flake8) to catch syntax issues instantly.',
        vi: 'Sử dụng linter (Ruff, Flake8) hoặc LSP trong IDE để phát hiện lỗi cú pháp ngay khi gõ phím.',
      };
    } else if (errorType.includes('ZeroDivisionError')) {
      rootCause = {
        en: 'Division by zero occurred because the divisor expression evaluated to 0.',
        vi: 'Xảy ra phép chia cho số 0 do mẫu số có giá trị bằng 0.',
      };
      fixExample = `# ❌ Risky:
# ctr = clicks / impressions

# ✅ Safe division:
ctr = (clicks / impressions) if impressions > 0 else 0.0`;
      preventionTip = {
        en: 'Use conditional ternary expressions or math safeguards before division.',
        vi: 'Dùng biểu thức điều kiện kiểm tra mẫu số lớn hơn 0 trước khi chia.',
      };
    }

    return {
      errorType,
      errorMessage,
      location,
      lineNum,
      rootCause,
      fixExample,
      preventionTip,
    };
  }, [traceback]);

  const handleCopyFix = () => {
    navigator.clipboard.writeText(analysis.fixExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Traceback Input & Presets */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <span>{language === 'vi' ? 'Dán mã lỗi / Traceback Python' : 'Paste Python Error / Traceback'}</span>
          </label>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-500">{language === 'vi' ? 'Mẫu lỗi:' : 'Presets:'}</span>
            <div className="flex flex-wrap gap-1">
              {ERROR_PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setTraceback(p.traceback)}
                  className="px-2 py-0.5 rounded-lg text-[11px] font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <textarea
          value={traceback}
          onChange={(e) => setTraceback(e.target.value)}
          rows={5}
          className="w-full font-mono text-xs p-3.5 rounded-xl bg-slate-900 text-rose-300 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
        />
      </div>

      {/* Diagnostic Disclaimer Notice */}
      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
        <Sparkles className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {language === 'vi' ? 'Khuyến cáo phân tích chẩn đoán:' : 'Diagnostic Opinion Notice:'}{' '}
          </span>
          <span>
            {language === 'vi'
              ? 'Phân tích được suy luận từ cấu trúc chuỗi Traceback tĩnh và mẫu lỗi thường gặp. Đây là gợi ý chẩn đoán kỹ thuật có giá trị tham khảo định hướng, không phải là kết luận tuyệt đối cho mọi biến thể runtime.'
              : 'Diagnostics are inferred from static traceback syntax and common failure heuristics. This analysis should be treated as an engineering recommendation rather than guaranteed runtime truth.'}
          </span>
        </div>
      </div>

      {/* Structured Diagnostic Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 space-y-1">
          <span className="text-[11px] font-mono font-bold uppercase text-rose-600 dark:text-rose-400">
            {language === 'vi' ? 'Loại ngoại lệ (Error Type)' : 'Exception Type'}
          </span>
          <p className="text-sm font-bold font-mono text-rose-900 dark:text-rose-200 truncate">
            {analysis.errorType}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-[11px] font-mono font-bold uppercase text-slate-400">
            {language === 'vi' ? 'Vị trí tệp & Dòng' : 'File & Line Number'}
          </span>
          <p className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200">
            {analysis.location} : line {analysis.lineNum}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-[11px] font-mono font-bold uppercase text-slate-400">
            {language === 'vi' ? 'Mức độ nghiêm trọng' : 'Severity'}
          </span>
          <p className="text-sm font-bold text-amber-600 dark:text-amber-400">
            Fatal Uncaught Exception
          </p>
        </div>
      </div>

      {/* Root Cause & Fix Section */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
            {language === 'vi' ? '1. Nguyên nhân gốc rễ (Root Cause)' : '1. Root Cause Analysis'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-1">
            {analysis.rootCause[language]}
          </p>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>{language === 'vi' ? '2. Hướng dẫn sửa đổi & Mã mẫu chuẩn (Recommended Fix)' : '2. Actionable Fix & Code Example'}</span>
            </h3>

            <button
              type="button"
              onClick={handleCopyFix}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (language === 'vi' ? 'Đã sao chép' : 'Copied!') : (language === 'vi' ? 'Sao chép mã sửa' : 'Copy Fix')}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs sm:text-sm font-semibold overflow-x-auto border border-slate-800">
            {analysis.fixExample}
          </pre>
        </div>

        {/* Prevention Tip */}
        <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
          <div>
            <span className="font-bold font-mono uppercase text-[11px]">
              {language === 'vi' ? 'Quy tắc lập trình phòng vệ:' : 'Defensive Coding Tip:'}{' '}
            </span>
            <span>{analysis.preventionTip[language]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
