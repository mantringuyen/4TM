import { Lesson } from '../../../../types';

export const lesson09: Lesson = {
  id: 'py_lesson_9',
  moduleId: 'py_mod_4',
  levelId: 'basic',
  courseId: 'python',
  order: 9,
  topicId: 'python_functions_defining_returns',
  title: {
    en: 'Defining Functions, Parameters, Return Values & Docstrings',
    vi: 'Định Nghĩa Hàm, Tham Số, Giá Trị Trả Về & Docstrings'
  },
  summary: {
    en: 'Master modular function creation in Python: definition with def, positional and keyword parameters, default arguments, return values and multiple tuple returns, docstrings (PEP 257), and type annotations.',
    vi: 'Làm chủ tạo hàm trong Python: định nghĩa với def, tham số vị trí và từ khóa, giá trị mặc định, trả về giá trị & nhiều giá trị qua tuple, docstrings (PEP 257) và chú thích kiểu dữ liệu.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Functions are the primary building blocks for reusable, maintainable code in Python. They allow encapsulating logic, accepting inputs, executing computations, and returning results.',
      vi: 'Hàm là khối xây dựng cơ bản để tái sử dụng mã nguồn và duy trì cấu trúc trong Python. Hàm cho phép đóng gói logic, nhận dữ liệu đầu vào, thực hiện tính toán và trả về kết quả.'
    },
    conceptExplanation: {
      en: '1. Defining Functions & Invocation:\n- Defined with the `def` keyword followed by the function name, parentheses for parameters, and a colon.\n- Indented code inside forms the function body.\n\n2. Parameters & Default Arguments:\n- Positional parameters must be passed in order.\n- Keyword parameters can be passed in any order by specifying `name=value`.\n- Default parameters provide fallback values when arguments are omitted.\n- The Mutable Default Trap: Never use mutable objects (`[]`, `{}`) as default values! Use `None` as the default and initialize inside the function.\n\n3. Return Values:\n- The `return` statement exits the function and passes data back to the caller.\n- Without an explicit `return`, Python functions return `None`.\n- Returning multiple values with commas (e.g. `return min_val, max_val`) automatically packs them into a `tuple`.\n\n4. Docstrings & Type Hints:\n- Triple-quoted strings `"""Docstring"""` right below the `def` line document the purpose, arguments, and return types (PEP 257).\n- Accessible via `help(fn)` or `fn.__doc__`.',
      vi: '1. Định nghĩa và Gọi Hàm:\n- Sử dụng từ khóa `def` theo sau là tên hàm, dấu ngoặc đơn chứa tham số và dấu hai chấm.\n- Các dòng lệnh thụt lề bên trong là thân hàm.\n\n2. Tham Số & Giá Trị Mặc Định:\n- Tham số theo vị trí (positional) bắt buộc truyền đúng thứ tự.\n- Tham số từ khóa (keyword) có thể truyền theo bất kỳ thứ tự nào bằng cách chỉ định `tên=giá_trị`.\n- Giá trị mặc định cung cấp dữ liệu dự phòng khi người dùng không truyền đối số.\n- Cạm bẫy Mutable Default: Tuyệt đối không dùng list hoặc dict rỗng làm giá trị mặc định! Hãy dùng `None` và khởi tạo bên trong thân hàm.\n\n3. Giá Trị Trả Về (Return Values):\n- Lệnh `return` kết thúc hàm và trả kết quả về nơi gọi.\n- Nếu không có lệnh `return`, hàm sẽ ngầm định trả về `None`.\n- Trả về nhiều giá trị qua dấu phẩy (ví dụ `return min_val, max_val`) thực chất là đóng gói vào một `tuple`.\n\n4. Docstrings & Chú Thích Kiểu:\n- Chuỗi ba dấu nháy `"""Docstring"""` ngay dưới dòng `def` dùng để tài liệu hóa mục đích, tham số và giá trị trả về của hàm (PEP 257).\n- Có thể đọc qua lệnh `help(fn)` hoặc thuộc tính `fn.__doc__`.'
    },
    syntax: `# Standard function with type hints and docstring
def calculate_metrics(values: list[float], scale: float = 1.0) -> tuple[float, float]:
    """Calculate the minimum and maximum scaled metrics.
    
    Args:
        values: List of numeric values.
        scale: Multiplier scale factor (default 1.0).
        
    Returns:
        Tuple containing (min_scaled, max_scaled).
    """
    if not values:
        return 0.0, 0.0
    scaled = [v * scale for v in values]
    return min(scaled), max(scaled)

# Calling with positional and keyword arguments
low, high = calculate_metrics([10.5, 20.0, 5.2], scale=1.5)`,
    examples: [
      {
        title: {
          en: 'Safe User Profile Creator',
          vi: 'Hàm Tạo Hồ Sơ Người Dùng An Toàn'
        },
        code: `def create_user_profile(username: str, email: str, roles: list[str] | None = None) -> dict:
    """Create a normalized user profile dictionary safely avoiding mutable defaults."""
    if roles is None:
        roles = ["viewer"]
    return {
        "username": username.strip().lower(),
        "email": email.strip().lower(),
        "roles": roles,
        "is_active": True
    }

user1 = create_user_profile("Alice", "alice@example.com")
user2 = create_user_profile("Bob", "bob@example.com", ["admin", "editor"])
print(user1)
print(user2)`,
        language: 'python',
        explanation: {
          en: 'Using `roles: list[str] | None = None` ensures each invocation receives an independent list instance.',
          vi: 'Dùng `roles: list[str] | None = None` đảm bảo mỗi lần gọi hàm nhận một đối tượng danh sách độc lập.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Using mutable default arguments: `def add_log(msg, log_list=[])`.',
          vi: 'Sử dụng danh sách rỗng làm giá trị mặc định: `def add_log(msg, log_list=[])`.'
        },
        correction: {
          en: 'Default arguments are evaluated once when the function is defined. Use None and create the list inside the function.',
          vi: 'Giá trị mặc định chỉ được tính 1 lần duy nhất khi nạp hàm. Hãy gán mặc định None và tạo list mới trong thân hàm.'
        },
        code: `def add_log(msg: str, log_list: list | None = None) -> list:\n    if log_list is None:\n        log_list = []\n    log_list.append(msg)\n    return log_list`
      },
      {
        mistake: {
          en: 'Forgetting that functions without a return statement return None.',
          vi: 'Quên rằng các hàm không có câu lệnh return sẽ trả về None.'
        },
        correction: {
          en: 'Ensure you explicitly return calculated values instead of just printing them inside the function.',
          vi: 'Đảm bảo dùng lệnh return để trả giá trị đã tính toán về nơi gọi thay vì chỉ in ra màn hình.'
        },
        code: `def add(a, b):\n    return a + b  # Correct\n    # print(a + b)  # Would return None`
      }
    ],
    tips: [
      {
        en: 'Follow PEP 257 docstring conventions to make your code self-documenting and IDE-friendly.',
        vi: 'Tuân thủ quy chuẩn docstring PEP 257 giúp mã nguồn tự giải thích và hỗ trợ gợi ý tốt trên IDE.'
      },
      {
        en: 'Functions should ideally do one thing well with a clear, concise name following snake_case.',
        vi: 'Mỗi hàm chỉ nên thực hiện một nhiệm vụ duy nhất và có tên rõ ràng theo quy chuẩn snake_case.'
      }
    ]
  },
  exercisePool: [
    {
      id: 'py_9_ex1',
      type: 'write_code',
      title: {
        en: 'Exercise 1: Temperature Converter with Multiple Returns',
        vi: 'Bài tập 1: Bộ Chuyển Đổi Nhiệt Độ Trả Về Nhiều Giá Trị'
      },
      instruction: {
        en: 'Write `convert_celsius(celsius: float) -> tuple[float, float]` that returns a tuple of `(fahrenheit, kelvin)`. Formulas: `F = (C * 9/5) + 32`, `K = C + 273.15`. Round results to 2 decimal places.',
        vi: 'Viết hàm `convert_celsius(celsius: float) -> tuple[float, float]` trả về một tuple gồm `(fahrenheit, kelvin)`. Công thức: `F = (C * 9/5) + 32`, `K = C + 273.15`. Làm tròn 2 chữ số thập phân.'
      },
      starterCode: `def convert_celsius(celsius: float) -> tuple[float, float]:
    # TODO: Calculate fahrenheit and kelvin, return as tuple
    pass`,
      solutionCode: `def convert_celsius(celsius: float) -> tuple[float, float]:
    f = round((celsius * 9/5) + 32, 2)
    k = round(celsius + 273.15, 2)
    return f, k`,
      hint: {
        en: 'Use `return round(f, 2), round(k, 2)`.',
        vi: 'Dùng `return round(f, 2), round(k, 2)`.'
      },
      explanation: {
        en: 'Comma-separated return values create and return a tuple in a clean, Pythonic manner.',
        vi: 'Trả về các giá trị phân tách bằng dấu phẩy sẽ tự động tạo tuple ngắn gọn và chuẩn Python.'
      }
    },
    {
      id: 'py_9_ex2',
      type: 'write_code',
      title: {
        en: 'Exercise 2: Safe Log Message Formatter',
        vi: 'Bài tập 2: Định Dạng Bản Tin Nhật Ký An Toàn'
      },
      instruction: {
        en: 'Write `format_log(message: str, level: str = "INFO", tags: list[str] | None = None) -> str` that formats a log string as `"[LEVEL] MESSAGE (tags: tag1, tag2)"` or `"[LEVEL] MESSAGE"` if tags is None or empty. Uppercase the level.',
        vi: 'Viết hàm `format_log(message: str, level: str = "INFO", tags: list[str] | None = None) -> str` định dạng chuỗi nhật ký thành `"[LEVEL] MESSAGE (tags: tag1, tag2)"` hoặc `"[LEVEL] MESSAGE"` nếu tags là None hoặc rỗng. Level viết hoa.'
      },
      starterCode: `def format_log(message: str, level: str = "INFO", tags: list[str] | None = None) -> str:
    # TODO: Safely format log with default parameters
    pass`,
      solutionCode: `def format_log(message: str, level: str = "INFO", tags: list[str] | None = None) -> str:
    lvl = level.upper()
    if tags:
        tag_str = ", ".join(tags)
        return f"[{lvl}] {message} (tags: {tag_str})"
    return f"[{lvl}] {message}"`,
      hint: {
        en: 'Check `if tags:` and use `", ".join(tags)`.',
        vi: 'Kiểm tra `if tags:` và dùng `", ".join(tags)`.'
      },
      explanation: {
        en: 'Default parameters combined with None guards prevent shared state bugs across multiple function calls.',
        vi: 'Tham số mặc định kết hợp kiểm tra None giúp tránh lỗi chia sẻ trạng thái qua các lần gọi hàm.'
      }
    }
  ],
  challenge: {
    id: 'py_9_challenge',
    title: {
      en: 'Challenge: Summary Statistics Engine',
      vi: 'Thử thách: Động Cơ Thống Kê Tổng Hợp Dữ Liệu'
    },
    description: {
      en: 'Write `summarize_dataset(data: list[float], outliers_threshold: float | None = None) -> dict` that returns a summary dict containing: `count` (int), `mean` (float, rounded to 2 decimals), `min` (float), `max` (float), and `outliers` (list of floats exceeding `mean + outliers_threshold` or below `mean - outliers_threshold`). If data is empty, return `{"count": 0, "mean": 0.0, "min": 0.0, "max": 0.0, "outliers": []}`.',
      vi: 'Viết hàm `summarize_dataset(data: list[float], outliers_threshold: float | None = None) -> dict` trả về dict thống kê gồm: `count` (int), `mean` (float, làm tròn 2 số thập phân), `min` (float), `max` (float), và `outliers` (danh sách các số lệch khỏi mean quá khoảng `outliers_threshold`). Nếu data rỗng, trả về dict mặc định.'
    },
    requirements: [
      {
        en: 'Handle empty dataset gracefully without ZeroDivisionError',
        vi: 'Xử lý mảng rỗng an toàn không gây lỗi chia cho 0'
      },
      {
        en: 'Calculate mean, min, max accurately',
        vi: 'Tính trung bình, giá trị nhỏ nhất và lớn nhất chính xác'
      },
      {
        en: 'Identify outliers when threshold is provided',
        vi: 'Lọc phần tử ngoại lai khi có chỉ định ngưỡng threshold'
      }
    ],
    starterCode: `def summarize_dataset(data: list[float], outliers_threshold: float | None = None) -> dict:
    # TODO: Calculate summary statistics
    pass`,
    solutionCode: `def summarize_dataset(data: list[float], outliers_threshold: float | None = None) -> dict:
    if not data:
        return {"count": 0, "mean": 0.0, "min": 0.0, "max": 0.0, "outliers": []}
    
    count = len(data)
    mean = round(sum(data) / count, 2)
    min_val = float(min(data))
    max_val = float(max(data))
    
    outliers = []
    if outliers_threshold is not None:
        for x in data:
            if abs(x - mean) > outliers_threshold:
                outliers.append(x)
                
    return {
        "count": count,
        "mean": mean,
        "min": min_val,
        "max": max_val,
        "outliers": outliers
    }`,
    hints: [
      {
        en: 'Check `if not data:` first, then compute `mean = sum(data) / len(data)`.',
        vi: 'Kiểm tra `if not data:` trước tiên, sau đó tính `mean = sum(data) / len(data)`.'
      }
    ],
    solutionExplanation: {
      en: 'Handles edge cases, computes statistical aggregates, and filters outliers based on distance from the mean.',
      vi: 'Xử lý trường hợp biên, tính toán các chỉ số thống kê và lọc các giá trị dị biệt theo khoảng cách tới giá trị trung bình.'
    }
  },
  quizQuestionPool: [
    {
      id: 'py_9_q1',
      type: 'single_choice',
      question: {
        en: 'What is the default return value of a Python function that does not have an explicit `return` statement?',
        vi: 'Giá trị trả về mặc định của một hàm Python không chứa câu lệnh `return` là gì?'
      },
      options: [
        { en: 'None', vi: 'None' },
        { en: '0', vi: '0' },
        { en: 'False', vi: 'False' },
        { en: 'An empty string ""', vi: 'Chuỗi rỗng ""' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Python functions implicitly return `None` when control flow reaches the end of the body without an explicit return.',
        vi: 'Hàm Python tự động trả về `None` khi kết thúc thân hàm mà không có lệnh return rõ ràng.'
      },
      topicId: 'python_functions_defining_returns',
      difficulty: 'easy'
    },
    {
      id: 'py_9_q2',
      type: 'single_choice',
      question: {
        en: 'Why should you avoid using a mutable default argument like `def add_item(item, basket=[])`?',
        vi: 'Tại sao nên tránh dùng tham số mặc định là đối tượng mutable như `def add_item(item, basket=[])`?'
      },
      options: [
        { en: 'The default list is created once at function definition time and shared across all invocations', vi: 'Danh sách mặc định chỉ được tạo một lần khi định nghĩa hàm và bị dùng chung qua tất cả các lần gọi' },
        { en: 'Python raises a SyntaxError at compile time', vi: 'Python sẽ báo lỗi cú pháp SyntaxError' },
        { en: 'Mutable default arguments make functions run 10x slower', vi: 'Nó làm hàm chạy chậm hơn 10 lần' },
        { en: 'Lists cannot be passed as function arguments in Python', vi: 'List không thể được truyền làm đối số trong Python' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Default argument expressions are evaluated once when the function definition is executed, leading to unintended shared state.',
        vi: 'Biểu thức tham số mặc định chỉ được tính một lần lúc định nghĩa hàm, dẫn đến lỗi lưu trạng thái dùng chung ngoài ý muốn.'
      },
      topicId: 'python_functions_defining_returns',
      difficulty: 'medium'
    },
    {
      id: 'py_9_q3',
      type: 'single_choice',
      question: {
        en: 'How does Python handle returning multiple values separated by commas: `return x, y, z`?',
        vi: 'Python xử lý việc trả về nhiều giá trị phân tách bởi dấu phẩy `return x, y, z` như thế nào?'
      },
      options: [
        { en: 'It packs the values into a single tuple `(x, y, z)`', vi: 'Nó đóng gói các giá trị thành một tuple duy nhất `(x, y, z)`' },
        { en: 'It converts them into a list `[x, y, z]`', vi: 'Nó chuyển đổi chúng thành danh sách `[x, y, z]`' },
        { en: 'It returns only the last value `z`', vi: 'Nó chỉ trả về giá trị cuối cùng `z`' },
        { en: 'It is a syntax error', vi: 'Đó là một lỗi cú pháp' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'In Python, comma-separated values without enclosing brackets are automatically packed into a tuple.',
        vi: 'Trong Python, các giá trị ngăn cách bởi dấu phẩy không có ngoặc bao quanh sẽ tự động được đóng gói thành tuple.'
      },
      topicId: 'python_functions_defining_returns',
      difficulty: 'easy'
    },
    {
      id: 'py_9_q4',
      type: 'single_choice',
      question: {
        en: 'Which Python standard specification defines guidelines for formatting docstrings?',
        vi: 'Quy chuẩn tiêu chuẩn nào của Python quy định cách viết và định dạng docstring?'
      },
      options: [
        { en: 'PEP 257', vi: 'PEP 257' },
        { en: 'PEP 8', vi: 'PEP 8' },
        { en: 'PEP 484', vi: 'PEP 484' },
        { en: 'PEP 20', vi: 'PEP 20' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'PEP 257 specifies docstring conventions, whereas PEP 8 specifies general code styling.',
        vi: 'PEP 257 quy định quy chuẩn cho docstrings, trong khi PEP 8 quy định phong cách viết code chung.'
      },
      topicId: 'python_functions_defining_returns',
      difficulty: 'medium'
    },
    {
      id: 'py_9_q5',
      type: 'single_choice',
      question: {
        en: 'How can you access the docstring of a function `my_func` programmatically in Python?',
        vi: 'Làm thế nào để truy cập chuỗi docstring của hàm `my_func` bằng mã lệnh trong Python?'
      },
      options: [
        { en: 'my_func.__doc__', vi: 'my_func.__doc__' },
        { en: 'my_func.doc', vi: 'my_func.doc' },
        { en: 'my_func.get_documentation()', vi: 'my_func.get_documentation()' },
        { en: 'my_func.__help__', vi: 'my_func.__help__' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The `__doc__` dunder attribute stores the docstring associated with a function, class, or module.',
        vi: 'Thuộc tính đặc biệt `__doc__` lưu trữ chuỗi docstring gắn với hàm, lớp hoặc module.'
      },
      topicId: 'python_functions_defining_returns',
      difficulty: 'easy'
    }
  ]
};
export default lesson09;
