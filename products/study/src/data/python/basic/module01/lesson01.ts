import { Lesson } from '../../../../types';

export const lesson01: Lesson = {
  id: 'py_lesson_1',
  moduleId: 'py_mod_1',
  levelId: 'basic',
  courseId: 'python',
  order: 1,
  topicId: 'python_foundations',
  title: {
    en: 'Python Environment, Execution Model & Clean Syntax (PEP 8)',
    vi: 'Môi Trường Python, Mô Hình Thực Thi & Cú Pháp Chuẩn PEP 8'
  },
  summary: {
    en: 'Master Python execution architecture, interpreter vs bytecode compilation, the interactive REPL, indentation rules, and PEP 8 style standards.',
    vi: 'Làm chủ kiến trúc thực thi Python, biên dịch bytecode, môi trường tương tác REPL, quy tắc thụt lề và chuẩn phong cách PEP 8.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Python is an interpreted, high-level, dynamically typed language created by Guido van Rossum in 1991. Its core philosophy—codified in PEP 20 (The Zen of Python)—prioritizes code readability, explicit logic, and expressive simplicity.',
      vi: 'Python là ngôn ngữ thông dịch, bậc cao, định kiểu động do Guido van Rossum tạo ra năm 1991. Triết lý cốt lõi—được quy định trong PEP 20 (The Zen of Python)—ưu tiên tính rõ ràng, minh bạch và dễ đọc.'
    },
    conceptExplanation: {
      en: '1. Execution Lifecycle: When you run a Python script, CPython (the reference implementation) parses the source code into an Abstract Syntax Tree (AST), compiles it into intermediate bytecode (`.pyc` files stored in `__pycache__`), and executes that bytecode inside the Python Virtual Machine (PVM).\n\n2. The REPL (Read-Eval-Print Loop): Python provides an immediate interactive shell for testing snippets, evaluating expressions, and inspecting objects.\n\n3. Significant Whitespace & Indentation: Unlike languages that use curly braces `{}` or `begin/end`, Python enforces code block scoping purely through consistent 4-space indentation.\n\n4. PEP 8 Python Style Guide: Standard conventions include 4 spaces per indentation level (no tabs), snake_case for functions and variables, UPPER_CASE for constants, PascalCase for classes, and explicit docstrings for documentation.',
      vi: '1. Vòng đời thực thi: Khi chạy tập lệnh Python, CPython (bản cài đặt chuẩn) phân tích mã nguồn thành cây cú pháp trừu tượng AST, biên dịch thành bytecode trung gian (lưu trong thư mục `__pycache__` dưới dạng file `.pyc`) và thực thi bytecode trong Máy ảo Python (PVM).\n\n2. Môi trường REPL: Python cung cấp môi trường dòng lệnh tương tác giúp đánh giá nhanh biểu thức, kiểm tra hàm và đối tượng.\n\n3. Quy tắc thụt lề (Indentation): Python không dùng dấu ngoặc nhọn `{}` để phân chia khối lệnh mà dùng thụt lề 4 dấu cách bắt buộc.\n\n4. Chuẩn PEP 8: Quy ước chuẩn mực gồm thụt lề 4 space, đặt tên hàm/biến theo snake_case, hằng số theo UPPER_CASE, lớp theo PascalCase và viết docstrings rõ ràng.'
    },
    syntax: `# Standard script structure
import sys

# Constants in UPPER_CASE (PEP 8)
APP_VERSION = "3.12.0"

def calculate_greeting(user_name: str) -> str:
    """Format a personalized welcome message."""
    # Indented 4 spaces
    cleaned_name = user_name.strip().title()
    return f"Welcome to Python, {cleaned_name}!"

# Entry point execution
if __name__ == "__main__":
    result = calculate_greeting("developer")
    print(result)
    print("Python Interpreter:", sys.version.split()[0])`,
    examples: [
      {
        title: {
          en: 'Execution & Indentation Anatomy',
          vi: 'Cấu Trúc Thực Thi & Thụt Lề Chuẩn'
        },
        code: `def evaluate_environment(memory_limit_mb: int) -> str:
    # 4 spaces indentation
    if memory_limit_mb < 512:
        status = "Minimal Runtime"
    elif memory_limit_mb <= 2048:
        status = "Standard Container"
    else:
        status = "High Performance Server"
    
    return f"System Allocated: {status} ({memory_limit_mb}MB)"

print(evaluate_environment(1024))`,
        language: 'python',
        explanation: {
          en: 'Python uses clean indentation blocks to define scope and evaluates logic sequentially through the PVM.',
          vi: 'Python dùng khối thụt lề 4 dấu cách để xác định phạm vi hàm và rẽ nhánh điều kiện.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Mixing tabs and spaces for indentation, triggering IndentationError or TabError.',
          vi: 'Trộn lẫn phím Tab và phím Space khi thụt lề, gây ra lỗi IndentationError hoặc TabError.'
        },
        correction: {
          en: 'Configure your editor to insert 4 spaces whenever pressing Tab, adhering strictly to PEP 8.',
          vi: 'Cấu hình trình soạn thảo tự động chuyển Tab thành 4 dấu cách theo chuẩn PEP 8.'
        },
        code: `def valid_function():\n    # Use exactly 4 spaces\n    return True`
      },
      {
        mistake: {
          en: 'Writing non-PEP 8 camelCase variable and function names.',
          vi: 'Đặt tên biến và hàm theo kiểu camelCase thay vì snake_case.'
        },
        correction: {
          en: 'Use snake_case for variables and functions (e.g., user_account_balance).',
          vi: 'Dùng snake_case cho biến và hàm (ví dụ: user_account_balance).'
        },
        code: `# Good PEP 8\nuser_full_name = "Jane Doe"\n\n# Avoid\n# userFullName = "Jane Doe"`
      }
    ],
    tips: [
      {
        en: 'Type `import this` in any Python REPL to display Tim Peters\' The Zen of Python.',
        vi: 'Gõ `import this` trong môi trường Python REPL để đọc 19 triết lý thiết kế The Zen of Python.'
      },
      {
        en: 'Bytecode caching in `__pycache__` speeds up subsequent module loading without recompilation.',
        vi: 'Bộ nhớ đệm bytecode trong `__pycache__` giúp nạp module nhanh hơn mà không cần biên dịch lại từ đầu.'
      }
    ]
  },
  exercisePool: [
    {
      id: 'py_1_ex1',
      type: 'write_code',
      title: {
        en: 'Exercise 1: Standard Environment Formatter',
        vi: 'Bài tập 1: Định Dạng Môi Trường Chuẩn'
      },
      instruction: {
        en: 'Write a function `format_runtime_info(app_name, version, environment)` that trims leading/trailing spaces from `app_name`, forces `environment` to uppercase, and returns a formatted string `"[APP_NAME vVERSION] - ENVIRONMENT"`.',
        vi: 'Viết hàm `format_runtime_info(app_name, version, environment)` loại bỏ khoảng trắng thừa của `app_name`, chuyển `environment` thành chữ hoa và trả về chuỗi `"[APP_NAME vVERSION] - ENVIRONMENT"`.'
      },
      starterCode: `def format_runtime_info(app_name: str, version: str, environment: str) -> str:
    # TODO: Implement formatted runtime string
    pass`,
      solutionCode: `def format_runtime_info(app_name: str, version: str, environment: str) -> str:
    clean_app = app_name.strip()
    clean_env = environment.strip().upper()
    return f"[{clean_app} v{version.strip()}] - {clean_env}"`,
      hint: {
        en: 'Use .strip() to eliminate accidental whitespace and .upper() on environment.',
        vi: 'Dùng .strip() để xóa khoảng trắng thừa và .upper() cho environment.'
      },
      explanation: {
        en: 'Safely formats environment metadata into standardized log tags.',
        vi: 'Định dạng dữ liệu môi trường thành thẻ nhật ký log chuẩn hóa.'
      }
    },
    {
      id: 'py_1_ex2',
      type: 'write_code',
      title: {
        en: 'Exercise 2: PEP 8 Code Block Validator',
        vi: 'Bài tập 2: Kiểm Tra Cấu Trúc Khối Lệnh'
      },
      instruction: {
        en: 'Write a function `validate_block_indentation(lines: list[str]) -> bool` that verifies every non-empty line after a line ending with a colon `:` is indented by at least 4 spaces.',
        vi: 'Viết hàm `validate_block_indentation(lines: list[str]) -> bool` kiểm tra xem mọi dòng có nội dung ngay sau dòng kết thúc bằng dấu `:` có được thụt lề ít nhất 4 dấu cách hay không.'
      },
      starterCode: `def validate_block_indentation(lines: list[str]) -> bool:
    # TODO: Check indentation rule after colon lines
    pass`,
      solutionCode: `def validate_block_indentation(lines: list[str]) -> bool:
    expect_indent = False
    for line in lines:
        if not line.strip():
            continue
        if expect_indent:
            if not line.startswith("    "):
                return False
            expect_indent = False
        if line.rstrip().endswith(":"):
            expect_indent = True
    return True`,
      hint: {
        en: 'Track a boolean flag whenever a line ends with a colon `:`.',
        vi: 'Dùng một cờ boolean đánh dấu khi dòng kết thúc bằng dấu hai chấm `:`. '
      },
      explanation: {
        en: 'Validates Python indentation structure sequentially.',
        vi: 'Xác thực cấu trúc thụt lề của khối lệnh Python một cách tuần tự.'
      }
    }
  ],
  challenge: {
    id: 'py_1_challenge',
    title: {
      en: 'Challenge: PEP 8 Linter Engine',
      vi: 'Thử thách: Công Cụ Kiểm Tra Chuẩn PEP 8'
    },
    description: {
      en: 'Implement `audit_pep8_compliance(code_lines: list[str]) -> dict` that inspects a list of Python code lines and returns a dictionary with keys: `total_lines` (int), `tab_violations` (number of lines containing `\\t`), and `long_lines` (number of lines exceeding 79 characters).',
      vi: 'Hiện thực hàm `audit_pep8_compliance(code_lines: list[str]) -> dict` kiểm tra danh sách các dòng mã và trả về dictionary gồm: `total_lines` (tổng số dòng), `tab_violations` (số dòng chứa ký tự tab `\\t`) và `long_lines` (số dòng dài hơn 79 ký tự).'
    },
    requirements: [
      {
        en: 'Count total lines inspected accurately',
        vi: 'Đếm chính xác tổng số dòng được kiểm tra'
      },
      {
        en: 'Detect presence of tab characters (\\t)',
        vi: 'Phát hiện sự xuất hiện của ký tự tab (\\t)'
      },
      {
        en: 'Identify lines exceeding 79 character limit',
        vi: 'Nhận diện các dòng vượt quá giới hạn 79 ký tự'
      }
    ],
    starterCode: `def audit_pep8_compliance(code_lines: list[str]) -> dict:
    # TODO: Audit lines for PEP 8 rules
    pass`,
    solutionCode: `def audit_pep8_compliance(code_lines: list[str]) -> dict:
    tab_count = sum(1 for line in code_lines if "\\t" in line)
    long_count = sum(1 for line in code_lines if len(line) > 79)
    return {
        "total_lines": len(code_lines),
        "tab_violations": tab_count,
        "long_lines": long_count
    }`,
    hints: [
      {
        en: 'Iterate through code_lines and count lines containing "\\t" and len(line) > 79.',
        vi: 'Duyệt qua code_lines và đếm các dòng chứa "\\t" hoặc có len(line) > 79.'
      }
    ],
    solutionExplanation: {
      en: 'Audits source lines for PEP 8 styling violations including indentation and line limits.',
      vi: 'Kiểm tra quy chuẩn PEP 8 về thụt lề và giới hạn độ dài dòng mã.'
    }
  },
  quizQuestionPool: [
    {
      id: 'py_1_q1',
      type: 'single_choice',
      question: {
        en: 'What is the primary intermediate compilation artifact produced by CPython before execution by the PVM?',
        vi: 'Tệp trung gian chính do trình thông dịch CPython tạo ra trước khi PVM thực thi là gì?'
      },
      options: [
        { en: 'Machine Assembly (.asm)', vi: 'Mã hợp ngữ (.asm)' },
        { en: 'Intermediate Bytecode (.pyc)', vi: 'Bytecode trung gian (.pyc)' },
        { en: 'Binary ELF Executable (.bin)', vi: 'Tệp thực thi nhị phân (.bin)' },
        { en: 'Transpiled C Source Code (.c)', vi: 'Mã nguồn C chuyển đổi (.c)' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'CPython compiles human-readable Python code into intermediate bytecode instructions, saved in .pyc files inside the __pycache__ directory.',
        vi: 'CPython biên dịch mã nguồn Python thành các chỉ lệnh bytecode trung gian lưu trong thư mục __pycache__ dưới dạng tệp .pyc.'
      },
      topicId: 'python_foundations',
      difficulty: 'easy'
    },
    {
      id: 'py_1_q2',
      type: 'single_choice',
      question: {
        en: 'According to PEP 8, how many spaces should be used per indentation level in Python?',
        vi: 'Theo chuẩn PEP 8, mỗi cấp thụt lề trong Python nên dùng bao nhiêu dấu cách?'
      },
      options: [
        { en: '2 spaces', vi: '2 dấu cách' },
        { en: '4 spaces', vi: '4 dấu cách' },
        { en: '1 tab character', vi: '1 ký tự tab' },
        { en: '8 spaces', vi: '8 dấu cách' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'PEP 8 mandates using 4 spaces per indentation level and strictly avoiding raw tab characters.',
        vi: 'Chuẩn PEP 8 quy định dùng 4 dấu cách cho mỗi cấp thụt lề và không dùng phím tab trực tiếp.'
      },
      topicId: 'python_foundations',
      difficulty: 'easy'
    },
    {
      id: 'py_1_q3',
      type: 'single_choice',
      question: {
        en: 'What does the acronym REPL stand for in Python development?',
        vi: 'Từ viết tắt REPL trong Python có nghĩa là gì?'
      },
      options: [
        { en: 'Run-Execute-Parse-Loop', vi: 'Run-Execute-Parse-Loop' },
        { en: 'Read-Eval-Print Loop', vi: 'Read-Eval-Print Loop' },
        { en: 'Remote-Environment-Python-Loader', vi: 'Remote-Environment-Python-Loader' },
        { en: 'Runtime-Error-Protection-Layer', vi: 'Runtime-Error-Protection-Layer' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'REPL stands for Read-Eval-Print Loop, the interactive shell where code expressions are read, evaluated, printed, and looped continuously.',
        vi: 'REPL là viết tắt của Read-Eval-Print Loop, môi trường shell tương tác nhận lệnh, tính toán, in kết quả và lặp lại.'
      },
      topicId: 'python_foundations',
      difficulty: 'easy'
    },
    {
      id: 'py_1_q4',
      type: 'single_choice',
      question: {
        en: 'Which naming convention is recommended by PEP 8 for functions and variables?',
        vi: 'Quy ước đặt tên nào được PEP 8 khuyến nghị cho hàm và biến số?'
      },
      options: [
        { en: 'camelCase', vi: 'camelCase' },
        { en: 'snake_case', vi: 'snake_case' },
        { en: 'PascalCase', vi: 'PascalCase' },
        { en: 'kebab-case', vi: 'kebab-case' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'PEP 8 specifies snake_case (lowercase letters with underscores) for functions and variables.',
        vi: 'PEP 8 quy định dùng snake_case (chữ thường nối bằng dấu gạch dưới) cho hàm và biến số.'
      },
      topicId: 'python_foundations',
      difficulty: 'easy'
    },
    {
      id: 'py_1_q5',
      type: 'single_choice',
      question: {
        en: 'What is the maximum recommended line length for code according to PEP 8?',
        vi: 'Độ dài tối đa của một dòng mã được PEP 8 khuyến nghị là bao nhiêu ký tự?'
      },
      options: [
        { en: '60 characters', vi: '60 ký tự' },
        { en: '79 characters', vi: '79 ký tự' },
        { en: '100 characters', vi: '100 ký tự' },
        { en: '120 characters', vi: '120 ký tự' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'PEP 8 recommends limiting all lines to a maximum of 79 characters for optimal readability across diff tools and editors.',
        vi: 'PEP 8 khuyến nghị giới hạn mỗi dòng tối đa 79 ký tự để đảm bảo tính dễ đọc trên mọi công cụ.'
      },
      topicId: 'python_foundations',
      difficulty: 'easy'
    },
    {
      id: 'py_1_q6',
      type: 'single_choice',
      question: {
        en: 'Which command displays the Zen of Python guiding principles inside any interactive session?',
        vi: 'Lệnh nào hiển thị các triết lý thiết kế The Zen of Python trong phiên làm việc tương tác?'
      },
      options: [
        { en: 'import zen', vi: 'import zen' },
        { en: 'import this', vi: 'import this' },
        { en: 'python.help("zen")', vi: 'python.help("zen")' },
        { en: 'help(philosophy)', vi: 'help(philosophy)' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Running `import this` executes the Easter egg displaying Tim Peters\' 19 aphorisms on Python design.',
        vi: 'Chạy `import this` sẽ hiển thị 19 triết lý thiết kế của Python do Tim Peters đúc kết.'
      },
      topicId: 'python_foundations',
      difficulty: 'easy'
    },
    {
      id: 'py_1_q7',
      type: 'single_choice',
      question: {
        en: 'What error is raised if Python encounters inconsistent mixing of tabs and spaces for indentation?',
        vi: 'Lỗi nào được kích hoạt nếu Python phát hiện việc trộn lẫn tab và dấu cách khi thụt lề?'
      },
      options: [
        { en: 'SyntaxWarning', vi: 'SyntaxWarning' },
        { en: 'TabError', vi: 'TabError' },
        { en: 'AlignmentError', vi: 'AlignmentError' },
        { en: 'TypeError', vi: 'TypeError' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Python 3 raises a TabError (a subclass of IndentationError) when tabs and spaces are mixed within the same block.',
        vi: 'Python 3 kích hoạt lỗi TabError (lớp con của IndentationError) khi trộn lẫn tab và dấu cách trong cùng một khối mã.'
      },
      topicId: 'python_foundations',
      difficulty: 'easy'
    },
    {
      id: 'py_1_q8',
      type: 'single_choice',
      question: {
        en: 'What is the purpose of the `__pycache__` directory generated in Python projects?',
        vi: 'Mục đích của thư mục `__pycache__` được tự động tạo trong các dự án Python là gì?'
      },
      options: [
        { en: 'It stores project logs and crash reports', vi: 'Lưu trữ nhật ký dự án và báo cáo lỗi' },
        { en: 'It caches compiled bytecode (.pyc) to speed up module imports', vi: 'Lưu trữ bytecode đã biên dịch (.pyc) để tăng tốc nạp module' },
        { en: 'It holds temporary virtual environment files', vi: 'Chứa các tệp môi trường ảo tạm thời' },
        { en: 'It archives encrypted user passwords', vi: 'Lưu trữ mật khẩu người dùng mã hóa' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '__pycache__ stores compiled bytecode (.pyc) files so Python does not need to recompile unchanged modules on subsequent imports.',
        vi: '__pycache__ lưu trữ tệp bytecode (.pyc) để Python không cần biên dịch lại các module không đổi trong những lần chạy sau.'
      },
      topicId: 'python_foundations',
      difficulty: 'easy'
    },
    {
      id: 'py_1_q9',
      type: 'single_choice',
      question: {
        en: 'What convention should be used for naming constant values in Python according to PEP 8?',
        vi: 'Quy ước nào được dùng để đặt tên cho các giá trị hằng số trong Python theo PEP 8?'
      },
      options: [
        { en: 'const_variable', vi: 'const_variable' },
        { en: 'ALL_CAPS_WITH_UNDERSCORES', vi: 'ALL_CAPS_WITH_UNDERSCORES' },
        { en: 'kConstantName', vi: 'kConstantName' },
        { en: '__constant__', vi: '__constant__' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Constants should be written in ALL_CAPS with underscores (e.g., MAX_CONNECTIONS, API_TIMEOUT).',
        vi: 'Hằng số nên được viết bằng chữ IN HOA có dấu gạch dưới (ví dụ: MAX_CONNECTIONS, API_TIMEOUT).'
      },
      topicId: 'python_foundations',
      difficulty: 'easy'
    },
    {
      id: 'py_1_q10',
      type: 'single_choice',
      question: {
        en: 'What happens when `if __name__ == "__main__":` is executed when a file is imported as a module rather than run directly?',
        vi: 'Điều gì xảy ra với khối `if __name__ == "__main__":` khi một tệp được nạp như một module thay vì chạy trực tiếp?'
      },
      options: [
        { en: 'The code inside the block executes automatically', vi: 'Mã bên trong khối lệnh vẫn tự động chạy' },
        { en: 'The code inside the block is skipped because __name__ equals the module name', vi: 'Mã bên trong khối lệnh bị bỏ qua vì __name__ mang tên của module' },
        { en: 'Python raises an ImportError', vi: 'Python kích hoạt lỗi ImportError' },
        { en: 'The module is re-compiled twice', vi: 'Module bị biên dịch lại 2 lần' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'When imported, `__name__` is set to the module name rather than `"__main__"`, preventing top-level execution code from running unexpectedly.',
        vi: 'Khi được nạp dưới dạng module, biến `__name__` mang tên của module thay vì `"__main__"`, giúp ngăn khối mã kiểm thử chạy ngoài ý muốn.'
      },
      topicId: 'python_foundations',
      difficulty: 'easy'
    }
  ]
};
export default lesson01;
