import { Lesson } from '../../../../types';

export const lesson07: Lesson = {
  id: 'py_lesson_7',
  moduleId: 'py_mod_3',
  levelId: 'basic',
  courseId: 'python',
  order: 7,
  topicId: 'python_conditionals_match_case',
  title: {
    en: 'Conditional Branching (if/elif/else) & Match-Case',
    vi: 'Rẽ Nhánh Điều Kiện (if/elif/else) & Cấu Trúc Match-Case'
  },
  summary: {
    en: 'Master conditional logic execution using if/elif/else, ternary expressions (a if cond else b), and Python 3.10+ structural pattern matching (match/case with guards).',
    vi: 'Làm chủ rẽ nhánh điều kiện với if/elif/else, toán tử 3 ngôi (a if cond else b) và cấu trúc khớp mẫu hiện đại match/case (Python 3.10+).'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Control flow determines how a program branches based on runtime conditions. Python features traditional `if/elif/else` blocks, concise inline ternary expressions, and structural pattern matching (`match-case`) introduced in Python 3.10.',
      vi: 'Điều khiển luồng quyết định cách chương trình rẽ nhánh theo điều kiện runtime. Python hỗ trợ khối lệnh `if/elif/else`, toán tử 3 ngôi ngắn gọn và cấu trúc khớp mẫu `match-case` mạnh mẽ từ Python 3.10.'
    },
    conceptExplanation: {
      en: '1. If/Elif/Else Blocks:\n- Evaluates boolean conditions top-to-bottom and executes the first matching block.\n- An optional `else` block catches all remaining cases.\n\n2. Inline Ternary Expressions:\n- Syntax: `value_if_true if condition else value_if_false`\n- Useful for concise variable initialization without multi-line if blocks.\n\n3. Structural Pattern Matching (`match-case`, Python 3.10+):\n- Replaces cumbersome if/elif trees when inspecting complex data structures.\n- Exact values: `case 200: ...`\n- Multiple values: `case 400 | 404 | 500: ...`\n- Structural unpacking: `case [x, y]: ...` or `case {"role": "admin", "name": n}: ...`\n- Pattern Guards: `case [x, y] if x > 0: ...`\n- Wildcard default: `case _: ...`',
      vi: '1. Khối lệnh If/Elif/Else:\n- Đánh giá các điều kiện từ trên xuống dưới và thực thi khối lệnh khớp đầu tiên.\n- Khối `else` tùy chọn xử lý tất cả các trường hợp còn lại.\n\n2. Toán tử ba ngôi (Ternary Expression):\n- Cú pháp: `giá_trị_nếu_đúng if điều_kiện else giá_trị_nếu_sai`\n- Giúp gán giá trị biến ngắn gọn trên 1 dòng.\n\n3. Khớp mẫu cấu trúc (`match-case`, Python 3.10+):\n- Thay thế chuỗi if/elif dài dòng khi xử lý dữ liệu phức tạp.\n- Giá trị đơn: `case 200: ...`\n- Nhiều giá trị: `case 400 | 404 | 500: ...`\n- Phân rã cấu trúc: `case [x, y]: ...` hoặc `case {"role": "admin", "name": n}: ...`\n- Điều kiện bảo vệ (Guards): `case [x, y] if x > 0: ...`\n- Trường hợp mặc định: `case _: ...`'
    },
    syntax: `# Standard branching & ternary
status_code = 404
label = "Not Found" if status_code == 404 else "Other"

# Python 3.10+ Match-Case
def handle_command(command):
    match command:
        case "start" | "go":
            return "Engine started"
        case "stop":
            return "Engine stopped"
        case ["move", ("north" | "south" | "east" | "west") as direction]:
            return f"Moving {direction}"
        case {"action": "alert", "level": lvl} if lvl >= 3:
            return f"High critical alert: Level {lvl}"
        case _:
            return "Unknown command"`,
    examples: [
      {
        title: {
          en: 'HTTP Response & Command Dispatcher',
          vi: 'Bộ Điều Hướng Phản Hồi HTTP & Lệnh Hệ Thống'
        },
        code: `def dispatch_response(status: int, payload: any) -> str:
    match (status, payload):
        case (200, list() as items):
            return f"OK: {len(items)} items returned"
        case (200, str() as msg):
            return f"OK: {msg}"
        case (401 | 403, _):
            return "Auth Error: Access Denied"
        case (500, dict() as err) if "trace" in err:
            return f"Server Error: {err['trace']}"
        case _:
            return f"Unhandled Status {status}"

print(dispatch_response(200, ["item1", "item2"]))
print(dispatch_response(401, None))
print(dispatch_response(500, {"trace": "DB timeout"}))`,
        language: 'python',
        explanation: {
          en: 'Structural pattern matching inspects both the status code and the shape of the payload simultaneously.',
          vi: 'Cấu trúc match-case kiểm tra đồng thời cả mã trạng thái HTTP và cấu trúc kiểu dữ liệu của payload.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Missing colon `:` at the end of `if`, `elif`, `else`, `match`, or `case` lines.',
          vi: 'Quên dấu hai chấm `:` ở cuối dòng lệnh `if`, `elif`, `else`, `match` hoặc `case`.'
        },
        correction: {
          en: 'Every header statement introducing an indented block in Python must terminate with a colon.',
          vi: 'Mọi dòng khai báo mở đầu khối lệnh thụt lề trong Python đều bắt buộc kết thúc bằng dấu hai chấm.'
        },
        code: `if score >= 90:\n    grade = "A"\nelse:\n    grade = "B"`
      },
      {
        mistake: {
          en: 'Using `match` without a wildcard `case _:` catch-all causing unhandled variations to fall through silently.',
          vi: 'Dùng `match` mà không có nhánh mặc định `case _:` khiến các giá trị lạ bị bỏ qua không xử lý.'
        },
        correction: {
          en: 'Include a `case _:` wildcard at the end of match blocks to handle unexpected patterns safely.',
          vi: 'Luôn thêm `case _:` ở cuối khối match để xử lý an toàn mọi trường hợp ngoài dự tính.'
        },
        code: `match code:\n    case 200:\n        return "OK"\n    case _:\n        return "Default"`
      }
    ],
    tips: [
      {
        en: 'Use ternary expressions only for simple one-line values to maintain PEP 8 readability.',
        vi: 'Chỉ dùng toán tử 3 ngôi cho các biểu thức đơn giản trên một dòng để giữ mã nguồn dễ đọc.'
      },
      {
        en: 'In match-case, pattern guards `if <condition>` allow fine-grained validation on unpacked variables.',
        vi: 'Trong match-case, mệnh đề guard `if <điều_kiện>` cho phép kiểm tra chi tiết các biến sau khi phân rã.'
      }
    ]
  },
  exercisePool: [
    {
      id: 'py_14_ex1',
      type: 'write_code',
      title: {
        en: 'Exercise 1: HTTP Status Classifier',
        vi: 'Bài tập 1: Phân Loại Mã Trạng Thái HTTP'
      },
      instruction: {
        en: 'Write `classify_http_status(status: int) -> str` using `match-case` that returns: `"Success"` for 200 to 299, `"Client Error"` for 400 to 499, `"Server Error"` for 500 to 599, and `"Other"` for anything else.',
        vi: 'Viết hàm `classify_http_status(status: int) -> str` sử dụng `match-case` trả về: `"Success"` cho mã 200-299, `"Client Error"` cho mã 400-499, `"Server Error"` cho mã 500-599 và `"Other"` cho các mã còn lại.'
      },
      starterCode: `def classify_http_status(status: int) -> str:
    # TODO: Classify HTTP status using match-case guards
    pass`,
      solutionCode: `def classify_http_status(status: int) -> str:
    match status:
        case s if 200 <= s <= 299:
            return "Success"
        case s if 400 <= s <= 499:
            return "Client Error"
        case s if 500 <= s <= 599:
            return "Server Error"
        case _:
            return "Other"`,
      hint: {
        en: 'Use pattern guards like `case s if 200 <= s <= 299:`.',
        vi: 'Dùng mệnh đề guard như `case s if 200 <= s <= 299:`.'
      },
      explanation: {
        en: 'Pattern guards cleanly evaluate numeric ranges within each case branch.',
        vi: 'Mệnh đề guard cho phép đánh giá khoảng số trực tiếp trong từng nhánh case.'
      }
    },
    {
      id: 'py_14_ex2',
      type: 'write_code',
      title: {
        en: 'Exercise 2: AST Expression Evaluator',
        vi: 'Bài tập 2: Đánh Giá Cây Biểu Thức AST'
      },
      instruction: {
        en: 'Write `evaluate_ast(node: tuple) -> float` that uses structural pattern matching to evaluate tuples:\n- `("num", val)` -> float(val)\n- `("add", left, right)` -> evaluate_ast(left) + evaluate_ast(right)\n- `("sub", left, right)` -> evaluate_ast(left) - evaluate_ast(right)\n- `("mul", left, right)` -> evaluate_ast(left) * evaluate_ast(right)\n- `("div", left, right)` -> evaluate_ast(left) / evaluate_ast(right)\n- `_` -> 0.0',
        vi: 'Viết hàm `evaluate_ast(node: tuple) -> float` dùng match-case phân rã tuple để tính toán các biểu thức số học AST lồng nhau.'
      },
      starterCode: `def evaluate_ast(node: tuple) -> float:
    # TODO: Evaluate AST tuple with pattern matching
    pass`,
      solutionCode: `def evaluate_ast(node: tuple) -> float:
    match node:
        case ("num", val):
            return float(val)
        case ("add", left, right):
            return evaluate_ast(left) + evaluate_ast(right)
        case ("sub", left, right):
            return evaluate_ast(left) - evaluate_ast(right)
        case ("mul", left, right):
            return evaluate_ast(left) * evaluate_ast(right)
        case ("div", left, right):
            return evaluate_ast(left) / evaluate_ast(right)
        case _:
            return 0.0`,
      hint: {
        en: 'Recursively call evaluate_ast on left and right sub-trees inside match cases.',
        vi: 'Gọi đệ quy evaluate_ast cho các cây con left và right trong từng nhánh match case.'
      },
      explanation: {
        en: 'Pattern matching decomposes complex hierarchical AST expressions recursively with exceptional clarity.',
        vi: 'Pattern matching giải nén cây biểu thức AST đệ quy một cách trong sáng và trực quan.'
      }
    }
  ],
  challenge: {
    id: 'py_14_challenge',
    title: {
      en: 'Challenge: Event Payload Router Engine',
      vi: 'Thử thách: Động Cơ Định Tuyến Gói Tin Sự Kiện'
    },
    description: {
      en: 'Write `route_event(event: dict) -> dict` that routes event dictionaries based on pattern matching:\n- `{"type": "click", "target": str(t)}`: returns `{"status": "handled", "action": f"clicked_{t}"}`\n- `{"type": "keypress", "key": "Enter"}`: returns `{"status": "handled", "action": "submit"}`\n- `{"type": "keypress", "key": "Escape"}`: returns `{"status": "handled", "action": "dismiss"}`\n- `{"type": "scroll", "offset_y": int(y)}` if `y > 1000`: returns `{"status": "handled", "action": "trigger_infinite_load"}`\n- Any other structure: returns `{"status": "ignored", "action": "noop"}`',
      vi: 'Viết hàm `route_event(event: dict) -> dict` định tuyến các sự kiện dạng dictionary bằng cấu trúc pattern matching hiện đại.'
    },
    requirements: [
      {
        en: 'Match dictionary payloads with exact keys and types',
        vi: 'Khớp cấu trúc dictionary với đúng khóa và kiểu dữ liệu'
      },
      {
        en: 'Implement guard conditions on scroll offset',
        vi: 'Cài đặt điều kiện guard cho độ cuộn trang scroll offset'
      },
      {
        en: 'Provide wildcard fallback returning ignored status',
        vi: 'Cung cấp nhánh mặc định trả về trạng thái ignored'
      }
    ],
    starterCode: `def route_event(event: dict) -> dict:
    # TODO: Route event using structural dict matching
    pass`,
    solutionCode: `def route_event(event: dict) -> dict:
    match event:
        case {"type": "click", "target": str(t)}:
            return {"status": "handled", "action": f"clicked_{t}"}
        case {"type": "keypress", "key": "Enter"}:
            return {"status": "handled", "action": "submit"}
        case {"type": "keypress", "key": "Escape"}:
            return {"status": "handled", "action": "dismiss"}
        case {"type": "scroll", "offset_y": int(y)} if y > 1000:
            return {"status": "handled", "action": "trigger_infinite_load"}
        case _:
            return {"status": "ignored", "action": "noop"}`,
    hints: [
      {
        en: 'Use dict pattern matching syntax like case {"type": "click", "target": str(t)}:.',
        vi: 'Dùng cú pháp khớp dictionary như case {"type": "click", "target": str(t)}:.'
      }
    ],
    solutionExplanation: {
      en: 'Inspects dictionary structure, extracts string/numeric fields, and validates numeric thresholds with pattern guards.',
      vi: 'Kiểm tra cấu trúc dictionary, trích xuất chuỗi/số và xác thực ngưỡng số với mệnh đề guard.'
    }
  },
  quizQuestionPool: [
    {
      id: 'py_14_q1',
      type: 'single_choice',
      question: {
        en: 'In which version of Python was structural pattern matching (`match-case`) introduced?',
        vi: 'Cấu trúc khớp mẫu (`match-case`) được giới thiệu lần đầu trong phiên bản Python nào?'
      },
      options: [
        { en: 'Python 3.10', vi: 'Python 3.10' },
        { en: 'Python 3.8', vi: 'Python 3.8' },
        { en: 'Python 3.6', vi: 'Python 3.6' },
        { en: 'Python 2.7', vi: 'Python 2.7' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'PEP 634 introduced structural pattern matching in Python 3.10.',
        vi: 'PEP 634 chính thức đưa cấu trúc match-case vào từ phiên bản Python 3.10.'
      },
      topicId: 'python_conditionals_match_case',
      difficulty: 'easy'
    },
    {
      id: 'py_14_q2',
      type: 'single_choice',
      question: {
        en: 'What is the correct syntax for an inline ternary conditional assignment in Python?',
        vi: 'Cú pháp gán điều kiện 3 ngôi đúng trên một dòng trong Python là gì?'
      },
      options: [
        { en: 'x = a if condition else b', vi: 'x = a if condition else b' },
        { en: 'x = condition ? a : b', vi: 'x = condition ? a : b' },
        { en: 'x = if condition then a else b', vi: 'x = if condition then a else b' },
        { en: 'x = (condition) -> a || b', vi: 'x = (condition) -> a || b' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Python uses the ternary expression format `true_value if condition else false_value`.',
        vi: 'Python dùng cú pháp toán tử 3 ngôi `giá_trị_đúng if điều_kiện else giá_trị_sai`.'
      },
      topicId: 'python_conditionals_match_case',
      difficulty: 'easy'
    },
    {
      id: 'py_14_q3',
      type: 'single_choice',
      question: {
        en: 'In a `match-case` statement, what does `case _:` represent?',
        vi: 'Trong câu lệnh `match-case`, nhánh `case _:` đại diện cho điều gì?'
      },
      options: [
        { en: 'The default wildcard fallback matching any value', vi: 'Nhánh mặc định khớp với bất kỳ giá trị nào' },
        { en: 'A syntax error', vi: 'Một lỗi cú pháp' },
        { en: 'A case that matches only empty strings', vi: 'Nhánh chỉ khớp với chuỗi rỗng' },
        { en: 'A private case statement', vi: 'Một câu lệnh case riêng tư' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The underscore `_` acts as a wildcard catch-all in pattern matching, similar to `default:` in switch statements.',
        vi: 'Dấu gạch dưới `_` đóng vai trò wildcard bắt tất cả các trường hợp còn lại, tương tự `default:` trong switch.'
      },
      topicId: 'python_conditionals_match_case',
      difficulty: 'easy'
    },
    {
      id: 'py_14_q4',
      type: 'single_choice',
      question: {
        en: 'What is a "guard" in a Python `match-case` block?',
        vi: '"Guard" trong khối `match-case` của Python là gì?'
      },
      options: [
        { en: 'An additional `if` condition attached to a case: `case x if x > 0:`', vi: 'Một điều kiện `if` bổ sung gắn kèm nhánh case: `case x if x > 0:`' },
        { en: 'A security lock that prevents memory leaks', vi: 'Một khóa bảo mật chống rò rỉ bộ nhớ' },
        { en: 'A try/except block wrapping the match statement', vi: 'Một khối try/except bọc câu lệnh match' },
        { en: 'A decorator for pattern functions', vi: 'Một decorator cho hàm khớp mẫu' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'A guard adds an extra boolean filter to a pattern: the case only matches if both the pattern structure and the guard condition evaluate to True.',
        vi: 'Mệnh đề guard bổ sung điều kiện lọc boolean: case chỉ khớp khi cả cấu trúc mẫu và điều kiện guard đều là True.'
      },
      topicId: 'python_conditionals_match_case',
      difficulty: 'medium'
    },
    {
      id: 'py_14_q5',
      type: 'single_choice',
      question: {
        en: 'How can multiple alternative literal values be matched in a single case statement?',
        vi: 'Làm thế nào để khớp nhiều giá trị thay thế trong một nhánh case duy nhất?'
      },
      options: [
        { en: 'case 400 | 404 | 500:', vi: 'case 400 | 404 | 500:' },
        { en: 'case 400, 404, 500:', vi: 'case 400, 404, 500:' },
        { en: 'case 400 or 404 or 500:', vi: 'case 400 or 404 or 500:' },
        { en: 'case [400, 404, 500]:', vi: 'case [400, 404, 500]:' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The pipe `|` operator specifies OR alternatives within match patterns.',
        vi: 'Ký tự gạch đứng `|` dùng để biểu thị các phương án thay thế HOẶC trong mẫu match.'
      },
      topicId: 'python_conditionals_match_case',
      difficulty: 'easy'
    },
    {
      id: 'py_14_q6',
      type: 'single_choice',
      question: {
        en: 'What happens in an `if/elif/else` chain if multiple `elif` conditions evaluate to True?',
        vi: 'Điều gì xảy ra trong chuỗi `if/elif/else` nếu có nhiều điều kiện `elif` cùng thỏa mãn True?'
      },
      options: [
        { en: 'Only the very first matching condition is executed; subsequent elifs are skipped', vi: 'Chỉ có khối lệnh khớp đầu tiên được thực thi; các nhánh sau bị bỏ qua' },
        { en: 'All matching conditions are executed sequentially', vi: 'Tất cả các khối lệnh thỏa mãn đều được thực thi tuần tự' },
        { en: 'Python raises an AmbiguousConditionError', vi: 'Python báo lỗi AmbiguousConditionError' },
        { en: 'Only the last condition is executed', vi: 'Chỉ có khối lệnh cuối cùng được thực thi' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Python executes only the first block whose condition is truthy and immediately exits the if/elif structure.',
        vi: 'Python chỉ thực thi khối lệnh đầu tiên có điều kiện truthy rồi thoát khỏi cấu trúc if/elif ngay lập tức.'
      },
      topicId: 'python_conditionals_match_case',
      difficulty: 'easy'
    },
    {
      id: 'py_14_q7',
      type: 'single_choice',
      question: {
        en: 'What pattern matches any two-element sequence where the first element is "point"?',
        vi: 'Mẫu nào khớp với bất kỳ chuỗi 2 phần tử nào có phần tử đầu tiên là "point"?'
      },
      options: [
        { en: 'case ("point", val): or case ["point", val]:', vi: 'case ("point", val): hoặc case ["point", val]:' },
        { en: 'case "point" in [2]:', vi: 'case "point" in [2]:' },
        { en: 'case len(2) == "point":', vi: 'case len(2) == "point":' },
        { en: 'case ("point", ...):', vi: 'case ("point", ...):' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Sequence patterns `["point", val]` or `("point", val)` unpack a 2-element sequence and bind the 2nd element to `val`.',
        vi: 'Mẫu phân rã chuỗi `["point", val]` hoặc `("point", val)` giải nén chuỗi 2 phần tử và gán phần tử thứ hai vào biến `val`.'
      },
      topicId: 'python_conditionals_match_case',
      difficulty: 'medium'
    },
    {
      id: 'py_14_q8',
      type: 'single_choice',
      question: {
        en: 'What is the value of `x = 10 if False else (20 if True else 30)`?',
        vi: 'Giá trị của biểu thức `x = 10 if False else (20 if True else 30)` là gì?'
      },
      options: [
        { en: '20', vi: '20' },
        { en: '10', vi: '10' },
        { en: '30', vi: '30' },
        { en: 'False', vi: 'False' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The first condition is False so it evaluates the else branch: `20 if True else 30` which resolves to 20.',
        vi: 'Điều kiện đầu là False nên chuyển sang nhánh else: `20 if True else 30`, kết quả trả về là 20.'
      },
      topicId: 'python_conditionals_match_case',
      difficulty: 'easy'
    },
    {
      id: 'py_14_q9',
      type: 'single_choice',
      question: {
        en: 'What keyword can capture a subpattern match into a variable inside `match-case`?',
        vi: 'Từ khóa nào dùng để gán một phần mẫu con khớp vào một biến trong `match-case`?'
      },
      options: [
        { en: 'as (e.g. case [1, (2 | 3) as sub_val]:)', vi: 'as (ví dụ: case [1, (2 | 3) as sub_val]:)' },
        { en: 'into', vi: 'into' },
        { en: 'let', vi: 'let' },
        { en: 'bind', vi: 'bind' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The `as` keyword binds the matched subpattern to a variable name.',
        vi: 'Từ khóa `as` liên kết phần mẫu con vừa khớp vào một tên biến cụ thể.'
      },
      topicId: 'python_conditionals_match_case',
      difficulty: 'medium'
    },
    {
      id: 'py_14_q10',
      type: 'single_choice',
      question: {
        en: 'Is `elif` mandatory in a Python conditional block?',
        vi: 'Nhánh `elif` có bắt buộc phải có trong khối điều kiện Python không?'
      },
      options: [
        { en: 'No, both `elif` and `else` are optional', vi: 'Không, cả `elif` và `else` đều là tùy chọn không bắt buộc' },
        { en: 'Yes, every `if` must have an `elif`', vi: 'Có, mỗi câu lệnh `if` đều phải có `elif`' },
        { en: 'Yes, if there is no `else`', vi: 'Có, nếu không có `else`' },
        { en: 'Only when nesting is used', vi: 'Chỉ khi dùng điều kiện lồng nhau' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'An `if` statement can exist alone without any `elif` or `else` clauses.',
        vi: 'Câu lệnh `if` có thể đứng độc lập mà không cần bất kỳ mệnh đề `elif` hay `else` nào kèm theo.'
      },
      topicId: 'python_conditionals_match_case',
      difficulty: 'easy'
    }
  ]
};
export default lesson07;
