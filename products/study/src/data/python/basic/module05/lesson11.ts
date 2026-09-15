import { Lesson } from '../../../../types';

export const lesson11: Lesson = {
  id: 'py_lesson_11',
  moduleId: 'py_mod_5',
  levelId: 'basic',
  courseId: 'python',
  order: 11,
  topicId: 'python_scope_namespaces_legb',
  title: {
    en: 'Variable Scope, Namespaces & LEGB',
    vi: 'Phạm Vi Biến, Không Gian Tên & Quy Tắc LEGB'
  },
  summary: {
    en: 'Master variable visibility scopes across Python: the LEGB lookup hierarchy (Local, Enclosing, Global, Built-in), the global keyword, the nonlocal keyword, and namespace inspection.',
    vi: 'Làm chủ phạm vi truy cập biến trong Python: thứ tự tra cứu LEGB (Local, Enclosing, Global, Built-in), từ khóa global, nonlocal và kiểm tra không gian tên.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'A namespace is a mapping from variable names to runtime objects. Python resolves variable references using the LEGB rule (Local -> Enclosing -> Global -> Built-in), determining where names are bound, modified, or masked.',
      vi: 'Không gian tên (namespace) là ánh xạ từ tên biến tới các đối tượng ô nhớ. Python tìm kiếm tên biến theo quy tắc LEGB (Local -> Enclosing -> Global -> Built-in), quyết định nơi biến được liên kết, sửa đổi hoặc che khuất.'
    },
    conceptExplanation: {
      en: '1. The LEGB Hierarchy:\n- **L (Local)**: Names assigned inside the current executing function body.\n- **E (Enclosing)**: Names in the local scope of enclosing/outer functions (closures).\n- **G (Global / Module)**: Names assigned at the top-level of the current `.py` module file.\n- **B (Built-in)**: Pre-assigned built-in names provided by Python (e.g. `len`, `range`, `print`, `ValueError`).\n\n2. Modifying Outer Scopes:\n- `global var_name`: Allows modifying a module-level global variable from inside a function.\n- `nonlocal var_name`: Allows modifying a variable in the nearest enclosing outer function scope (used in closures).\n\n3. Shadowing & UnboundLocalError:\n- If you assign to a variable anywhere in a function, Python marks it as Local for the *entire* function. Accessing it before assignment raises `UnboundLocalError`.',
      vi: '1. Cấu trúc phân cấp LEGB:\n- **L (Local - Cục bộ)**: Tên biến được gán trong thân hàm đang chạy.\n- **E (Enclosing - Bao ngoài)**: Tên biến trong phạm vi hàm cha bao ngoài (closure).\n- **G (Global - Toàn cục)**: Tên biến ở cấp cao nhất của tệp module `.py` hiện tại.\n- **B (Built-in - Tích hợp)**: Các tên có sẵn do Python cung cấp (ví dụ `len`, `range`, `print`, `ValueError`).\n\n2. Sửa đổi phạm vi bên ngoài:\n- `global var_name`: Cho phép sửa biến toàn cục của module từ bên trong hàm.\n- `nonlocal var_name`: Cho phép sửa biến ở phạm vi hàm bao ngoài gần nhất (dùng trong closure).\n\n3. Che khuất biến (Shadowing) & Lỗi UnboundLocalError:\n- Nếu bạn gán giá trị cho một biến ở bất kỳ đâu trong hàm, Python xem biến đó là Local cho *toàn bộ* hàm. Đọc biến trước khi gán sẽ báo lỗi `UnboundLocalError`.'
    },
    syntax: `# Global level
CONFIG_ENV = "production"
counter = 0

def outer_service():
    service_id = "srv_auth_01"  # Enclosing scope
    
    def inner_handler():
        nonlocal service_id
        global counter
        service_id = "srv_auth_02"  # Mutates enclosing
        counter += 1                 # Mutates module global
        return f"{service_id} (req #{counter})"
        
    return inner_handler()`,
    examples: [
      {
        title: {
          en: 'Stateful Closure Counter with Nonlocal Scope',
          vi: 'Bộ Đếm Trạng Thái Closure Dùng Phạm Vi Nonlocal'
        },
        code: `def create_rate_limiter(max_calls: int):
    # Enclosing scope variable
    calls_made = 0
    
    def attempt_request(client_id: str) -> dict:
        nonlocal calls_made
        if calls_made >= max_calls:
            return {"allowed": False, "client": client_id, "error": "Rate limit exceeded"}
        calls_made += 1
        return {"allowed": True, "client": client_id, "remaining": max_calls - calls_made}
        
    return attempt_request

limiter = create_rate_limiter(max_calls=2)
print(limiter("client_A"))  # allowed: True, remaining: 1
print(limiter("client_A"))  # allowed: True, remaining: 0
print(limiter("client_A"))  # allowed: False`,
        language: 'python',
        explanation: {
          en: 'The `nonlocal` keyword allows the inner closure to persist and mutate `calls_made` across multiple independent invocations.',
          vi: 'Từ khóa `nonlocal` cho phép hàm closure bên trong duy trì và cập nhật biến `calls_made` qua nhiều lần gọi độc lập.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'UnboundLocalError: assigning to a variable inside a function after reading it without declaring global/nonlocal.',
          vi: 'Lỗi UnboundLocalError: gán giá trị cho biến trong hàm sau khi đã đọc nó mà không khai báo global/nonlocal.'
        },
        correction: {
          en: 'Declare `global var_name` or `nonlocal var_name` at the top of the function before modifying.',
          vi: 'Khai báo `global var_name` hoặc `nonlocal var_name` ở đầu thân hàm trước khi chỉnh sửa.'
        },
        code: `count = 0\ndef increment():\n    global count\n    count += 1\n    return count`
      },
      {
        mistake: {
          en: 'Overwriting built-in function names like `list = [1, 2]` or `str = "text"`.',
          vi: 'Đặt tên biến trùng với tên hàm tích hợp sẵn như `list = [1, 2]` hoặc `str = "text"`.'
        },
        correction: {
          en: 'Never use built-in names (list, dict, str, id, max, min) for your own variables.',
          vi: 'Tuyệt đối không dùng tên built-in (list, dict, str, id, max, min) để đặt tên biến của bạn.'
        },
        code: `# Avoid: list = [1, 2]\n# Good PEP 8:\nitems_list = [1, 2]`
      }
    ],
    tips: [
      {
        en: 'Use `globals()` and `locals()` to inspect dictionary representations of active namespaces during debugging.',
        vi: 'Dùng hàm `globals()` và `locals()` để xem từ điển chứa các biến trong không gian tên hiện tại khi debug.'
      },
      {
        en: 'Prefer passing values as explicit function arguments and return values rather than mutating globals.',
        vi: 'Nên truyền dữ liệu qua tham số và giá trị trả về của hàm thay vì chỉnh sửa biến toàn cục (global).'
      }
    ]
  },
  exercisePool: [
    {
      id: 'py_23_ex1',
      type: 'write_code',
      title: {
        en: 'Exercise 1: Stateful Accumulator Closure (nonlocal)',
        vi: 'Bài tập 1: Bộ Tích Lũy Trạng Thái Closure (nonlocal)'
      },
      instruction: {
        en: 'Write `create_accumulator(initial_total: float = 0.0)` returning a function `add(amount: float) -> float` that adds `amount` to the enclosing running total and returns the updated running total.',
        vi: 'Viết hàm `create_accumulator(initial_total: float = 0.0)` trả về một hàm con `add(amount: float) -> float` cộng dồn `amount` vào biến bao ngoài và trả về tổng tích lũy mới.'
      },
      starterCode: `def create_accumulator(initial_total: float = 0.0):
    # TODO: Implement stateful closure using nonlocal
    pass`,
      solutionCode: `def create_accumulator(initial_total: float = 0.0):
    total = initial_total
    def add(amount: float) -> float:
        nonlocal total
        total += amount
        return total
    return add`,
      hint: {
        en: 'Declare nonlocal total inside the inner add function before total += amount.',
        vi: 'Khai báo nonlocal total bên trong hàm con add trước khi thực hiện total += amount.'
      },
      explanation: {
        en: 'Using nonlocal allows the nested closure to maintain mutable state between invocations.',
        vi: 'Dùng nonlocal cho phép hàm closure lồng nhau duy trì trạng thái biến đổi qua các lần gọi.'
      }
    },
    {
      id: 'py_23_ex2',
      type: 'write_code',
      title: {
        en: 'Exercise 2: Scope Chain Diagnostic Analyzer',
        vi: 'Bài tập 2: Phân Tích Thứ Tự Phân Giải Phạm Vi Biến'
      },
      instruction: {
        en: 'Write `resolve_scope_variable(local_dict: dict, enclosing_dict: dict, global_dict: dict, var_name: str) -> str` that mimics the LEGB rule and returns `"local"`, `"enclosing"`, `"global"`, or `"not_found"` depending on where `var_name` is first discovered.',
        vi: 'Viết hàm `resolve_scope_variable(local_dict: dict, enclosing_dict: dict, global_dict: dict, var_name: str) -> str` mô phỏng quy tắc LEGB và trả về `"local"`, `"enclosing"`, `"global"` hoặc `"not_found"`.'
      },
      starterCode: `def resolve_scope_variable(local_dict: dict, enclosing_dict: dict, global_dict: dict, var_name: str) -> str:
    # TODO: Check dictionaries in LEGB order
    pass`,
      solutionCode: `def resolve_scope_variable(local_dict: dict, enclosing_dict: dict, global_dict: dict, var_name: str) -> str:
    if var_name in local_dict:
        return "local"
    if var_name in enclosing_dict:
        return "enclosing"
    if var_name in global_dict:
        return "global"
    return "not_found"`,
      hint: {
        en: 'Check local_dict first, then enclosing_dict, then global_dict.',
        vi: 'Kiểm tra local_dict trước, sau đó enclosing_dict, rồi đến global_dict.'
      },
      explanation: {
        en: 'Evaluates dictionary membership strictly according to LEGB precedence.',
        vi: 'Đánh giá sự tồn tại của biến theo đúng thứ tự ưu tiên LEGB.'
      }
    }
  ],
  challenge: {
    id: 'py_23_challenge',
    title: {
      en: 'Challenge: Scoped Session Environment Sandbox',
      vi: 'Thử thách: Hộp Cát Môi Trường Phiên Có Phạm Vi'
    },
    description: {
      en: 'Write a class `ScopedEnvironment` that manages nested variable scopes. It should support:\n- `__init__(self, parent=None)`\n- `set(self, name: str, value: any)`: sets variable in current local scope\n- `get(self, name: str) -> any`: resolves name by searching local scope, then parent scopes recursively. If not found in any scope, returns `None`.\n- `create_child(self)`: returns a new `ScopedEnvironment` instance with self as its parent.',
      vi: 'Viết lớp `ScopedEnvironment` quản lý các phạm vi biến lồng nhau:\n- `__init__(self, parent=None)`\n- `set(self, name, value)`: gán biến ở phạm vi hiện tại\n- `get(self, name)`: tìm biến ở phạm vi hiện tại, nếu không có tìm ngược lên parent. Trả về `None` nếu không thấy.\n- `create_child(self)`: tạo một `ScopedEnvironment` mới có parent là chính nó.'
    },
    requirements: [
      {
        en: 'Store local variables in self.bindings dictionary',
        vi: 'Lưu trữ các biến cục bộ trong từ điển self.bindings'
      },
      {
        en: 'Recursively search parent environments in get()',
        vi: 'Tìm kiếm đệ quy qua các môi trường cha trong hàm get()'
      },
      {
        en: 'Support child environment creation linking parent reference',
        vi: 'Hỗ trợ tạo môi trường con liên kết với tham chiếu môi trường cha'
      }
    ],
    starterCode: `class ScopedEnvironment:
    # TODO: Implement hierarchical scope environment
    pass`,
    solutionCode: `class ScopedEnvironment:
    def __init__(self, parent=None):
        self.parent = parent
        self.bindings = {}
        
    def set(self, name: str, value: any):
        self.bindings[name] = value
        
    def get(self, name: str) -> any:
        if name in self.bindings:
            return self.bindings[name]
        if self.parent is not None:
            return self.parent.get(name)
        return None
        
    def create_child(self):
        return ScopedEnvironment(parent=self)`,
    hints: [
      {
        en: 'Store local variables in self.bindings dictionary and delegate get to self.parent.get(name) if not found locally.',
        vi: 'Lưu biến cục bộ trong dict self.bindings và gọi self.parent.get(name) nếu không tìm thấy tại chỗ.'
      }
    ],
    solutionExplanation: {
      en: 'Implements a classic tree-based lexical scoping model where child scopes shadow or fall through to parents.',
      vi: 'Cài đặt mô hình phạm vi lexical dạng cây kinh điển, nơi scope con che khuất hoặc tra ngược lên scope cha.'
    }
  },
  quizQuestionPool: [
    {
      id: 'py_23_q1',
      type: 'single_choice',
      question: {
        en: 'What does the acronym LEGB stand for in Python scope resolution?',
        vi: 'Từ viết tắt LEGB đại diện cho quy tắc tìm kiếm phạm vi nào trong Python?'
      },
      options: [
        { en: 'Local, Enclosing, Global, Built-in', vi: 'Local (Cục bộ), Enclosing (Bao ngoài), Global (Toàn cục), Built-in (Tích hợp)' },
        { en: 'Logical, Execution, Global, Binary', vi: 'Logical, Execution, Global, Binary' },
        { en: 'Lexical, Environment, Garbage, Base', vi: 'Lexical, Environment, Garbage, Base' },
        { en: 'Loop, Exception, Guard, Branch', vi: 'Loop, Exception, Guard, Branch' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'LEGB defines the search order: Local first, then Enclosing (outer functions), Global (module level), and Built-in.',
        vi: 'LEGB xác định thứ tự tra cứu: Local trước, đến Enclosing (hàm bao ngoài), Global (cấp module), và cuối cùng là Built-in.'
      },
      topicId: 'python_scope_namespaces_legb',
      difficulty: 'easy'
    },
    {
      id: 'py_23_q2',
      type: 'single_choice',
      question: {
        en: 'What keyword allows modifying a variable in an outer enclosing function scope from within an inner nested function?',
        vi: 'Từ khóa nào cho phép chỉnh sửa biến ở hàm bao ngoài từ bên trong một hàm lồng nhau?'
      },
      options: [
        { en: 'nonlocal', vi: 'nonlocal' },
        { en: 'global', vi: 'global' },
        { en: 'outer', vi: 'outer' },
        { en: 'parent', vi: 'parent' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`nonlocal` binds an identifier to the nearest enclosing function scope.',
        vi: 'Từ khóa `nonlocal` liên kết tên biến tới phạm vi hàm bao ngoài gần nhất.'
      },
      topicId: 'python_scope_namespaces_legb',
      difficulty: 'easy'
    },
    {
      id: 'py_23_q3',
      type: 'single_choice',
      question: {
        en: 'What error occurs when accessing a local variable before its assignment inside a function?',
        vi: 'Lỗi nào xuất hiện khi truy cập một biến cục bộ trước khi gán giá trị cho nó trong hàm?'
      },
      options: [
        { en: 'UnboundLocalError', vi: 'UnboundLocalError' },
        { en: 'NullReferenceError', vi: 'NullReferenceError' },
        { en: 'ScopeResolutionError', vi: 'ScopeResolutionError' },
        { en: 'AttributeError', vi: 'AttributeError' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Python detects variable assignments at compile time; accessing a local variable before that assignment raises `UnboundLocalError`.',
        vi: 'Python phát hiện phép gán biến lúc biên dịch; việc đọc biến cục bộ trước khi gán sẽ kích hoạt lỗi `UnboundLocalError`.'
      },
      topicId: 'python_scope_namespaces_legb',
      difficulty: 'medium'
    },
    {
      id: 'py_23_q4',
      type: 'single_choice',
      question: {
        en: 'What does the `global` keyword do when used inside a function?',
        vi: 'Từ khóa `global` có tác dụng gì khi được dùng bên trong một hàm?'
      },
      options: [
        { en: 'Declares that a variable name refers to the module-level global namespace for both reading and writing', vi: 'Khai báo rằng tên biến trỏ tới không gian tên toàn cục cấp module cho cả việc đọc và ghi' },
        { en: 'Shares the variable across all processes on the operating system', vi: 'Chia sẻ biến qua mọi tiến trình trên hệ điều hành' },
        { en: 'Makes the variable accessible in JavaScript', vi: 'Làm cho biến có thể truy cập được trong JavaScript' },
        { en: 'Prevents the variable from ever being modified', vi: 'Ngăn không cho biến bị thay đổi giá trị' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`global` instructs Python that assignments to that variable should modify the module-level global namespace.',
        vi: '`global` thông báo cho Python biết các phép gán biến đó sẽ cập nhật không gian tên toàn cục cấp module.'
      },
      topicId: 'python_scope_namespaces_legb',
      difficulty: 'easy'
    },
    {
      id: 'py_23_q5',
      type: 'single_choice',
      question: {
        en: 'What happens if you define a variable named `len = 10` in your module?',
        vi: 'Điều gì xảy ra nếu bạn đặt tên một biến là `len = 10` trong module của mình?'
      },
      options: [
        { en: 'It shadows the built-in `len()` function in the current module scope, breaking subsequent `len(...)` calls', vi: 'Nó che khuất hàm `len()` tích hợp sẵn trong phạm vi module hiện tại, làm hỏng các lệnh gọi `len(...)` sau đó' },
        { en: 'Python raises a BuiltinOverrideError immediately', vi: 'Python báo lỗi BuiltinOverrideError ngay lập tức' },
        { en: 'The built-in len function is permanently deleted from Python', vi: 'Hàm len có sẵn bị xóa vĩnh viễn khỏi Python' },
        { en: 'Nothing, Python knows when you mean function vs variable', vi: 'Không có gì, Python tự phân biệt được khi nào gọi hàm hay đọc biến' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Assigning to a name in Global scope shadows any matching name in the Built-in scope because Global is checked earlier in LEGB.',
        vi: 'Gán biến trong phạm vi Global sẽ che khuất hàm cùng tên trong Built-in vì Global được tra cứu trước trong LEGB.'
      },
      topicId: 'python_scope_namespaces_legb',
      difficulty: 'medium'
    },
    {
      id: 'py_23_q6',
      type: 'single_choice',
      question: {
        en: 'What built-in function returns a dictionary of the current local namespace variables?',
        vi: 'Hàm tích hợp sẵn nào trả về một dictionary chứa các biến trong không gian tên cục bộ hiện tại?'
      },
      options: [
        { en: 'locals()', vi: 'locals()' },
        { en: 'vars_local()', vi: 'vars_local()' },
        { en: 'scope.get_local()', vi: 'scope.get_local()' },
        { en: 'get_namespace()', vi: 'get_namespace()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`locals()` returns a dictionary representing the local symbol table.',
        vi: '`locals()` trả về một dictionary đại diện cho bảng ký hiệu biến cục bộ.'
      },
      topicId: 'python_scope_namespaces_legb',
      difficulty: 'easy'
    },
    {
      id: 'py_23_q7',
      type: 'single_choice',
      question: {
        en: 'Can the `nonlocal` keyword bind to a variable in the global module scope if no enclosing function exists?',
        vi: 'Từ khóa `nonlocal` có thể liên kết tới biến ở phạm vi module global nếu không có hàm bao ngoài không?'
      },
      options: [
        { en: 'No, `nonlocal` requires an enclosing function and raises SyntaxError if none is found', vi: 'Không, `nonlocal` bắt buộc phải có hàm bao ngoài và sẽ báo lỗi SyntaxError nếu không tìm thấy' },
        { en: 'Yes, it automatically falls back to global', vi: 'Có, nó tự động chuyển về global' },
        { en: 'Yes, but it gives a warning', vi: 'Có, nhưng hiện cảnh báo' },
        { en: 'Only if declared at module level', vi: 'Chỉ khi khai báo ở cấp module' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`nonlocal` only searches enclosing nested functions; it never binds to global or built-in scopes.',
        vi: '`nonlocal` chỉ tìm kiếm trong các hàm lồng bao ngoài; nó không bao giờ liên kết tới phạm vi global hay built-in.'
      },
      topicId: 'python_scope_namespaces_legb',
      difficulty: 'medium'
    },
    {
      id: 'py_23_q8',
      type: 'single_choice',
      question: {
        en: 'When a function only reads a global variable without assigning to it, is the `global` keyword required?',
        vi: 'Khi một hàm chỉ đọc giá trị biến toàn cục mà không gán lại giá trị cho nó, có bắt buộc phải dùng từ khóa `global` không?'
      },
      options: [
        { en: 'No, reading global variables works automatically via the LEGB lookup rule', vi: 'Không, việc đọc biến toàn cục tự động hoạt động nhờ quy tắc tra cứu LEGB' },
        { en: 'Yes, Python forbids reading globals without declaration', vi: 'Có, Python cấm đọc biến toàn cục nếu không khai báo' },
        { en: 'Only for numeric variables', vi: 'Chỉ bắt buộc với biến số' },
        { en: 'Only inside classes', vi: 'Chỉ bắt buộc bên trong class' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Reading variables automatically falls through LEGB to the Global scope; `global` is only needed when mutating or rebinding.',
        vi: 'Việc đọc biến tự động tra cứu theo LEGB tới Global; từ khóa `global` chỉ cần thiết khi bạn muốn gán lại giá trị cho biến.'
      },
      topicId: 'python_scope_namespaces_legb',
      difficulty: 'easy'
    },
    {
      id: 'py_23_q9',
      type: 'single_choice',
      question: {
        en: 'What scope does a variable defined inside an `if` block belong to in Python?',
        vi: 'Một biến được khai báo bên trong khối lệnh `if` thuộc phạm vi nào trong Python?'
      },
      options: [
        { en: 'The enclosing function or module scope (Python does NOT have block scope for if/for/while)', vi: 'Phạm vi hàm hoặc module chứa nó (Python KHÔNG có block scope cho if/for/while)' },
        { en: 'A private block scope isolated inside the if statement', vi: 'Phạm vi block riêng biệt bị cô lập trong khối if' },
        { en: 'Built-in scope', vi: 'Phạm vi Built-in' },
        { en: 'Temporary heap scope', vi: 'Phạm vi heap tạm thời' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Unlike C/Java/JS, Python does not create a new scope for `if`, `for`, or `while` blocks. Variables remain in the enclosing function or module scope.',
        vi: 'Khác với C/Java/JS, Python không tạo scope mới cho các khối `if`, `for`, hay `while`. Biến nằm trực tiếp trong phạm vi hàm hoặc module bao quanh.'
      },
      topicId: 'python_scope_namespaces_legb',
      difficulty: 'medium'
    },
    {
      id: 'py_23_q10',
      type: 'single_choice',
      question: {
        en: 'What module provides direct access to all built-in identifiers like `open`, `print`, and exceptions?',
        vi: 'Module nào cung cấp quyền truy cập trực tiếp tới tất cả định danh built-in như `open`, `print` và các exception?'
      },
      options: [
        { en: 'builtins', vi: 'builtins' },
        { en: 'sys.builtin', vi: 'sys.builtin' },
        { en: '__main__', vi: '__main__' },
        { en: 'core', vi: 'core' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The `builtins` module contains all built-in functions, constants, and exception types.',
        vi: 'Module `builtins` chứa toàn bộ các hàm tích hợp sẵn, hằng số và các kiểu ngoại lệ của Python.'
      },
      topicId: 'python_scope_namespaces_legb',
      difficulty: 'easy'
    }
  ]
};
export default lesson11;
