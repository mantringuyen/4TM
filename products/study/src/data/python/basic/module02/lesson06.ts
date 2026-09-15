import { Lesson } from '../../../../types';

export const lesson06: Lesson = {
  id: 'py_lesson_6',
  moduleId: 'py_mod_2',
  levelId: 'basic',
  courseId: 'python',
  order: 6,
  topicId: 'python_booleans_logic_operators',
  title: {
    en: 'Booleans, Truthiness & Comparison/Logical Operators',
    vi: 'Kiểu Boolean, Giá Trị Truthy/Falsy & Toán Tử So Sánh/Logic'
  },
  summary: {
    en: 'Master boolean logic, the complete truthy/falsy table, comparison operators (==, !=, <, >), logical operators (and, or, not), short-circuit evaluation, and identity is vs ==.',
    vi: 'Làm chủ kiểu logic boolean, bảng truthy/falsy, toán tử so sánh (==, !=, <, >), toán tử logic (and, or, not), cơ chế short-circuit và phân biệt is với ==.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'In Python, booleans (`True` and `False`) are subclasses of integers (1 and 0). Python evaluates every object in a boolean context based on its truthiness, enabling clean, idiomatic conditional checks.',
      vi: 'Trong Python, kiểu boolean (`True` và `False`) là lớp con của số nguyên (1 và 0). Python đánh giá mọi đối tượng theo giá trị chân lý (truthiness), giúp viết điều kiện ngắn gọn và tự nhiên.'
    },
    conceptExplanation: {
      en: '1. Truthy & Falsy Rules:\n- Built-in Falsy Objects: `False`, `None`, numeric zeroes (`0`, `0.0`, `0j`), empty collections/sequences (`""`, `[]`, `()`, `{}` , `set()`, `range(0)`).\n- Everything else is Truthy (e.g. `[0]` has length 1 so it is Truthy; `"False"` is Truthy).\n\n2. Comparison Operators:\n- `==` (value equality), `!=` (inequality), `<`, `<=`, `>`, `>=`\n- Chained Comparisons: `0 < x <= 100` evaluates as `0 < x and x <= 100`.\n\n3. Logical Operators & Short-Circuiting:\n- `and`: Returns the first falsy operand, or the last operand if all are truthy.\n- `or`: Returns the first truthy operand, or the last operand if all are falsy.\n- `not`: Inverts boolean state (`not True -> False`).\n\n4. Equality `==` vs Identity `is`:\n- `==` checks whether two objects share identical *values*.\n- `is` checks whether two variables point to the *exact same memory object* (`id(a) == id(b)`). Always use `is None` or `is not None`.',
      vi: '1. Quy tắc Truthy & Falsy:\n- Các đối tượng Falsy: `False`, `None`, số 0 (`0`, `0.0`), các tập hợp/chuỗi rỗng (`""`, `[]`, `()`, `{}`, `set()`, `range(0)`).\n- Mọi đối tượng khác đều là Truthy (ví dụ: `[0]` có độ dài 1 nên là Truthy; `"False"` là chuỗi có ký tự nên là Truthy).\n\n2. Toán tử so sánh:\n- `==` (so sánh bằng giá trị), `!=` (khác), `<`, `<=`, `>`, `>=`\n- So sánh chuỗi nối tiếp: `0 < x <= 100` tương đương `0 < x and x <= 100`.\n\n3. Toán tử logic & Cơ chế ngắt sớm (Short-Circuit):\n- `and`: Trả về giá trị falsy đầu tiên gặp, hoặc giá trị cuối cùng nếu tất cả đều truthy.\n- `or`: Trả về giá trị truthy đầu tiên gặp, hoặc giá trị cuối cùng nếu tất cả đều falsy.\n- `not`: Đảo ngược trạng thái boolean (`not True -> False`).\n\n4. So sánh bằng `==` vs So sánh danh tính `is`:\n- `==` kiểm tra xem hai đối tượng có cùng *giá trị* hay không.\n- `is` kiểm tra xem hai biến có cùng trỏ tới *địa chỉ ô nhớ* hay không (`id(a) == id(b)`). Luôn dùng `is None` hoặc `is not None`.'
    },
    syntax: `# Truthiness in conditionals
items = []
if not items:
    print("List is empty!")

# Short-circuit fallback defaults
user_input = ""
display_name = user_input or "Guest_User"  # "Guest_User"

# Identity comparison
current_user = None
if current_user is None:
    print("Unauthenticated session")

# Chained comparisons
score = 85
is_valid_grade = 0 <= score <= 100  # True`,
    examples: [
      {
        title: {
          en: 'Security Permission & Configuration Resolver',
          vi: 'Bộ Phân Quyền & Giải Quyết Cấu Hình Dự Phòng'
        },
        code: `def check_access(user: dict, required_role: str) -> bool:
    # Safe short-circuit dictionary navigation
    is_active = user.get("is_active") is True
    roles = user.get("roles") or []
    is_admin = "admin" in roles
    has_role = required_role in roles
    
    return is_active and (is_admin or has_role)

alice = {"is_active": True, "roles": ["editor"]}
bob = {"is_active": False, "roles": ["admin"]}

print("Alice access to editor:", check_access(alice, "editor"))  # True
print("Bob access to editor:", check_access(bob, "editor"))      # False (inactive)`,
        language: 'python',
        explanation: {
          en: 'Short-circuit evaluations prevent NoneType errors and evaluate security rules cleanly.',
          vi: 'Toán tử logic ngắt sớm giúp tránh lỗi khi truy cập dict và xử lý bảo mật chính xác.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Using `is` to compare literals or computed values: `if x is 1000:`.',
          vi: 'Dùng `is` để so sánh số nguyên hoặc chuỗi tính toán: `if x is 1000:`. '
        },
        correction: {
          en: 'Use `==` for values and numbers; reserve `is` exclusively for singletons like `None`.',
          vi: 'Dùng `==` cho so sánh giá trị số/chuỗi; chỉ dùng `is` cho singleton như `None`.'
        },
        code: `# Bug:\n# if x is 1000:\n# Correct:\nif x == 1000:\n    pass\nif obj is None:\n    pass`
      },
      {
        mistake: {
          en: 'Writing `if len(my_list) == 0:` instead of idiomatic Python `if not my_list:`.',
          vi: 'Viết `if len(my_list) == 0:` thay vì dùng chuẩn Python `if not my_list:`.'
        },
        correction: {
          en: 'PEP 8 recommends relying directly on container truthiness: `if not items:` is cleaner and faster.',
          vi: 'PEP 8 khuyến khích tận dụng truthiness của danh sách: `if not items:` nhanh và trực quan hơn.'
        },
        code: `items = []\nif not items: # Idiomatic PEP 8\n    print("Empty")`
      }
    ],
    tips: [
      {
        en: 'The expression `x or default` is a Python idiom for providing fallback values when `x` is empty or None.',
        vi: 'Biểu thức `x or default` là kỹ thuật quen thuộc trong Python để gán giá trị mặc định khi `x` rỗng hoặc None.'
      },
      {
        en: 'Booleans are integers: `True + True == 2` and `False * 100 == 0`.',
        vi: 'Boolean kế thừa từ int: `True + True == 2` và `False * 100 == 0`.'
      }
    ]
  },
  exercisePool: [
    {
      id: 'py_12_ex1',
      type: 'write_code',
      title: {
        en: 'Exercise 1: Config Fallback Resolver',
        vi: 'Bài tập 1: Bộ Xử Lý Cấu Hình Dự Phòng'
      },
      instruction: {
        en: 'Write `resolve_timeout(env_val: str, file_val: str, default_val: int = 30) -> int` that returns the first truthy integer among `env_val`, `file_val`, or `default_val`. Strings containing digits should be parsed to int; empty/None values should fall back.',
        vi: 'Viết hàm `resolve_timeout(env_val: str, file_val: str, default_val: int = 30) -> int` trả về số nguyên hợp lệ đầu tiên từ `env_val`, `file_val` hoặc `default_val`.'
      },
      starterCode: `def resolve_timeout(env_val: str, file_val: str, default_val: int = 30) -> int:
    # TODO: Resolve first truthy integer config
    pass`,
      solutionCode: `def resolve_timeout(env_val: str, file_val: str, default_val: int = 30) -> int:
    if env_val and env_val.strip().isdigit():
        return int(env_val.strip())
    if file_val and file_val.strip().isdigit():
        return int(file_val.strip())
    return default_val`,
      hint: {
        en: 'Check if string is not empty and .isdigit() before casting with int().',
        vi: 'Kiểm tra chuỗi không rỗng và .isdigit() trước khi ép kiểu bằng int().'
      },
      explanation: {
        en: 'Evaluates inputs in priority sequence with short-circuit guards.',
        vi: 'Đánh giá đầu vào theo thứ tự ưu tiên với các bộ kiểm tra ngắt sớm.'
      }
    },
    {
      id: 'py_12_ex2',
      type: 'write_code',
      title: {
        en: 'Exercise 2: Multi-Criteria Loan Eligibility Evaluator',
        vi: 'Bài tập 2: Đánh Giá Đủ Điều Kiện Vay Vốn'
      },
      instruction: {
        en: 'Write `is_loan_eligible(credit_score: int, annual_income: float, has_bankruptcies: bool, co_signer: bool) -> bool` where eligibility requires: `credit_score >= 650` and `annual_income >= 40000` and `not has_bankruptcies`. Alternatively, if `credit_score >= 580` and `co_signer is True` and `not has_bankruptcies`, the loan is also approved.',
        vi: 'Viết hàm `is_loan_eligible(credit_score: int, annual_income: float, has_bankruptcies: bool, co_signer: bool) -> bool` trả về True nếu: (`credit_score >= 650` và `annual_income >= 40000` và `not has_bankruptcies`) hoặc (`credit_score >= 580` và `co_signer is True` và `not has_bankruptcies`).'
      },
      starterCode: `def is_loan_eligible(credit_score: int, annual_income: float, has_bankruptcies: bool, co_signer: bool) -> bool:
    # TODO: Evaluate loan criteria with compound boolean logic
    pass`,
      solutionCode: `def is_loan_eligible(credit_score: int, annual_income: float, has_bankruptcies: bool, co_signer: bool) -> bool:
    if has_bankruptcies:
        return False
    standard_ok = (credit_score >= 650) and (annual_income >= 40000)
    cosigner_ok = (credit_score >= 580) and co_signer
    return standard_ok or cosigner_ok`,
      hint: {
        en: 'Rule out bankruptcies first, then combine standard and co-signer criteria with `or`.',
        vi: 'Loại trừ phá sản trước, sau đó kết hợp tiêu chuẩn và người bảo lãnh bằng `or`.'
      },
      explanation: {
        en: 'Compound boolean logic branches cleanly to evaluate risk parameters.',
        vi: 'Logic boolean phức hợp rẽ nhánh rõ ràng để đánh giá rủi ro tài chính.'
      }
    }
  ],
  challenge: {
    id: 'py_12_challenge',
    title: {
      en: 'Challenge: Filter Rule Evaluator Engine',
      vi: 'Thử thách: Động Cơ Đánh Giá Quy Tắc Lọc Dữ Liệu'
    },
    description: {
      en: 'Write `evaluate_filter_rules(record: dict, rules: list[dict]) -> bool` where each rule dictionary has `{"field": str, "op": str, "value": any}`. Supported `op` operators are: `">="`, `"<="`, `"=="`, `"!="`, `"in"`, and `"is_truthy"`. For `"is_truthy"`, check `bool(record.get(field))`. All rules in the list must evaluate to True for the record to pass (AND logic). If rules list is empty, return True.',
      vi: 'Viết hàm `evaluate_filter_rules(record: dict, rules: list[dict]) -> bool` với mỗi quy tắc gồm `{"field": str, "op": str, "value": any}`. Các toán tử `op` hỗ trợ: `">="`, `"<="`, `"=="`, `"!="`, `"in"`, và `"is_truthy"`. Mọi quy tắc trong danh sách đều phải thỏa mãn (logic AND) để trả về True. Nếu rules rỗng trả về True.'
    },
    requirements: [
      {
        en: 'Support comparison, equality, inclusion, and truthiness operators',
        vi: 'Hỗ trợ toán tử so sánh, bằng nhau, tập hợp con và truthiness'
      },
      {
        en: 'Enforce AND logic requiring all rule evaluations to be True',
        vi: 'Áp dụng logic AND yêu cầu tất cả các quy tắc phải thỏa mãn'
      },
      {
        en: 'Short-circuit return False immediately upon any failed rule',
        vi: 'Ngắt sớm trả về False ngay khi gặp quy tắc không thỏa mãn'
      }
    ],
    starterCode: `def evaluate_filter_rules(record: dict, rules: list[dict]) -> bool:
    # TODO: Evaluate dynamic rules against record
    pass`,
    solutionCode: `def evaluate_filter_rules(record: dict, rules: list[dict]) -> bool:
    for rule in rules:
        field = rule["field"]
        op = rule["op"]
        expected = rule.get("value")
        val = record.get(field)
        
        if op == "is_truthy":
            if not bool(val):
                return False
        elif op == "==":
            if val != expected:
                return False
        elif op == "!=":
            if val == expected:
                return False
        elif op == ">=":
            if val is None or val < expected:
                return False
        elif op == "<=":
            if val is None or val > expected:
                return False
        elif op == "in":
            if expected is None or val not in expected:
                return False
    return True`,
    hints: [
      {
        en: 'Iterate through rules and return False early on any failed condition; return True if all pass.',
        vi: 'Duyệt qua từng quy tắc và ngắt sớm trả về False nếu có điều kiện không thỏa mãn; trả về True nếu qua hết.'
      }
    ],
    solutionExplanation: {
      en: 'Applies dynamic comparison predicates against record properties using short-circuit loops.',
      vi: 'Áp dụng vị từ so sánh linh hoạt lên các thuộc tính bản ghi bằng vòng lặp ngắt sớm.'
    }
  },
  quizQuestionPool: [
    {
      id: 'py_12_q1',
      type: 'single_choice',
      question: {
        en: 'Which of the following values is TRUTHY in Python?',
        vi: 'Giá trị nào sau đây mang giá trị TRUTHY trong Python?'
      },
      options: [
        { en: '[0] (a list containing the number 0)', vi: '[0] (danh sách chứa số 0)' },
        { en: '[] (an empty list)', vi: '[] (danh sách rỗng)' },
        { en: '0.0 (a float zero)', vi: '0.0 (số thực 0)' },
        { en: 'None', vi: 'None' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`[0]` is a non-empty list of length 1, so it evaluates to `True`. Empty containers like `[]` or zeroes like `0.0` are falsy.',
        vi: '`[0]` là danh sách không rỗng có độ dài 1 nên là `True`. Các tập hợp rỗng `[]` hay số `0.0` đều mang giá trị falsy.'
      },
      topicId: 'python_booleans_logic_operators',
      difficulty: 'easy'
    },
    {
      id: 'py_12_q2',
      type: 'single_choice',
      question: {
        en: 'What is the return value of the expression `"" or "default"` in Python?',
        vi: 'Kết quả trả về của biểu thức `"" or "default"` trong Python là gì?'
      },
      options: [
        { en: '"default"', vi: '"default"' },
        { en: '""', vi: '""' },
        { en: 'True', vi: 'True' },
        { en: 'False', vi: 'False' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The `or` operator evaluates left-to-right and returns the first truthy operand, which is `"default"`.',
        vi: 'Toán tử `or` đánh giá từ trái sang phải và trả về giá trị truthy đầu tiên tìm thấy, ở đây là `"default"`.'
      },
      topicId: 'python_booleans_logic_operators',
      difficulty: 'easy'
    },
    {
      id: 'py_12_q3',
      type: 'single_choice',
      question: {
        en: 'What does the chained comparison `10 < 20 <= 20` evaluate to?',
        vi: 'Biểu thức so sánh chuỗi `10 < 20 <= 20` trả về giá trị gì?'
      },
      options: [
        { en: 'True', vi: 'True' },
        { en: 'False', vi: 'False' },
        { en: 'TypeError', vi: 'TypeError' },
        { en: '20', vi: '20' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Python chains comparisons as `(10 < 20) and (20 <= 20)`, which evaluates to `True and True -> True`.',
        vi: 'Python hiểu biểu thức so sánh chuỗi là `(10 < 20) and (20 <= 20)`, tương đương `True and True -> True`.'
      },
      topicId: 'python_booleans_logic_operators',
      difficulty: 'easy'
    },
    {
      id: 'py_12_q4',
      type: 'single_choice',
      question: {
        en: 'What is the key difference between `a == b` and `a is b` in Python?',
        vi: 'Điểm khác biệt cốt lõi giữa `a == b` và `a is b` trong Python là gì?'
      },
      options: [
        { en: '`==` compares values/contents; `is` checks memory object identity (same id())', vi: '`==` so sánh giá trị/nội dung; `is` kiểm tra cùng đối tượng trong bộ nhớ (cùng id())' },
        { en: '`==` is for numbers; `is` is for strings', vi: '`==` dành cho số; `is` dành cho chuỗi' },
        { en: 'There is no difference in Python 3', vi: 'Không có sự khác biệt nào trong Python 3' },
        { en: '`is` is slower than `==`', vi: '`is` chạy chậm hơn `==`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`==` calls the `__eq__` method to check value equivalence, while `is` compares memory pointer addresses (`id(a) == id(b)`).',
        vi: '`==` gọi phương thức `__eq__` để kiểm tra độ bằng nhau về giá trị, còn `is` so sánh trực tiếp địa chỉ ô nhớ (`id(a) == id(b)`).'
      },
      topicId: 'python_booleans_logic_operators',
      difficulty: 'easy'
    },
    {
      id: 'py_12_q5',
      type: 'single_choice',
      question: {
        en: 'What is the result of evaluating `not (5 > 3 and 2 < 1)`?',
        vi: 'Kết quả của biểu thức `not (5 > 3 and 2 < 1)` là gì?'
      },
      options: [
        { en: 'True', vi: 'True' },
        { en: 'False', vi: 'False' },
        { en: 'None', vi: 'None' },
        { en: 'TypeError', vi: 'TypeError' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`5 > 3` is True, `2 < 1` is False. `True and False` is False. `not False` is True.',
        vi: '`5 > 3` là True, `2 < 1` là False. `True and False` là False. `not False` cho kết quả True.'
      },
      topicId: 'python_booleans_logic_operators',
      difficulty: 'easy'
    },
    {
      id: 'py_12_q6',
      type: 'single_choice',
      question: {
        en: 'What does the expression `"apple" and 42 and [1, 2]` return in Python?',
        vi: 'Biểu thức `"apple" and 42 and [1, 2]` trả về giá trị gì trong Python?'
      },
      options: [
        { en: '[1, 2]', vi: '[1, 2]' },
        { en: 'True', vi: 'True' },
        { en: '"apple"', vi: '"apple"' },
        { en: '42', vi: '42' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'When all operands in an `and` chain are truthy, Python returns the last evaluated operand (`[1, 2]`).',
        vi: 'Khi tất cả các vế trong chuỗi `and` đều là truthy, Python trả về toán hạng cuối cùng được đánh giá (`[1, 2]`).'
      },
      topicId: 'python_booleans_logic_operators',
      difficulty: 'easy'
    },
    {
      id: 'py_12_q7',
      type: 'single_choice',
      question: {
        en: 'How should you test whether variable `result` is `None` according to PEP 8?',
        vi: 'Theo chuẩn PEP 8, bạn nên kiểm tra biến `result` có bằng `None` theo cách nào?'
      },
      options: [
        { en: 'if result is None:', vi: 'if result is None:' },
        { en: 'if result == None:', vi: 'if result == None:' },
        { en: 'if result.is_none():', vi: 'if result.is_none():' },
        { en: 'if None in result:', vi: 'if None in result:' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'PEP 8 mandates using the identity operator `is` (or `is not`) when comparing against the singleton `None`.',
        vi: 'PEP 8 quy định luôn dùng toán tử danh tính `is` (hoặc `is not`) khi so sánh với đối tượng singleton `None`.'
      },
      topicId: 'python_booleans_logic_operators',
      difficulty: 'easy'
    },
    {
      id: 'py_12_q8',
      type: 'single_choice',
      question: {
        en: 'What is the boolean value of `bool({})` vs `bool({"key": False})`?',
        vi: 'Giá trị boolean của `bool({})` và `bool({"key": False})` là gì?'
      },
      options: [
        { en: 'False and True', vi: 'False và True' },
        { en: 'False and False', vi: 'False và False' },
        { en: 'True and False', vi: 'True và False' },
        { en: 'True and True', vi: 'True và True' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`{}` is an empty dict (falsy). `{"key": False}` has 1 key-value entry (length 1), making it truthy despite the value being False.',
        vi: '`{}` là dict rỗng (falsy). `{"key": False}` có 1 cặp key-value (độ dài 1) nên là truthy dù giá trị bên trong là False.'
      },
      topicId: 'python_booleans_logic_operators',
      difficulty: 'easy'
    },
    {
      id: 'py_12_q9',
      type: 'single_choice',
      question: {
        en: 'What does short-circuit evaluation mean for the `or` operator in Python?',
        vi: 'Cơ chế ngắt sớm (short-circuit) có ý nghĩa gì đối với toán tử `or` trong Python?'
      },
      options: [
        { en: 'If the left operand is truthy, the right operand is never executed', vi: 'Nếu toán hạng bên trái là truthy, toán hạng bên phải sẽ không bao giờ được thực thi' },
        { en: 'Both sides are always executed simultaneously', vi: 'Cả hai vế luôn luôn được tính toán đồng thời' },
        { en: 'It throws an error if both sides are True', vi: 'Nó sẽ báo lỗi nếu cả hai vế đều là True' },
        { en: 'It converts the expression into binary bitwise OR', vi: 'Nó chuyển biểu thức thành phép toán bitwise OR nhị phân' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Short-circuiting stops evaluation immediately once the truth value of the overall expression is determined.',
        vi: 'Cơ chế ngắt sớm dừng tính toán ngay khi xác định được giá trị logic cuối cùng của biểu thức.'
      },
      topicId: 'python_booleans_logic_operators',
      difficulty: 'easy'
    },
    {
      id: 'py_12_q10',
      type: 'single_choice',
      question: {
        en: 'What is the mathematical integer evaluation of `(True + True + True) * False`?',
        vi: 'Kết quả tính toán số học của biểu thức `(True + True + True) * False` là gì?'
      },
      options: [
        { en: '0', vi: '0' },
        { en: '3', vi: '3' },
        { en: 'TypeError', vi: 'TypeError' },
        { en: 'False', vi: 'False' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`True` acts as 1 and `False` acts as 0 in arithmetic contexts: `(1 + 1 + 1) * 0 = 3 * 0 = 0`.',
        vi: '`True` có giá trị 1 và `False` có giá trị 0 trong ngữ cảnh số học: `(1 + 1 + 1) * 0 = 3 * 0 = 0`.'
      },
      topicId: 'python_booleans_logic_operators',
      difficulty: 'easy'
    }
  ]
};
export default lesson06;
