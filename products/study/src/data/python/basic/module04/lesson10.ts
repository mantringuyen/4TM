import { Lesson } from '../../../../types';

export const lesson10: Lesson = {
  id: 'py_lesson_10',
  moduleId: 'py_mod_4',
  levelId: 'basic',
  courseId: 'python',
  order: 10,
  topicId: 'python_functions_args_kwargs',
  title: {
    en: 'Dynamic Arguments (*args, **kwargs), Keyword-Only & Default Arguments',
    vi: 'Đối Số Động (*args, **kwargs), Tham Số Chỉ Từ Khóa & Giá Trị Mặc Định'
  },
  summary: {
    en: 'Master flexible function signatures in Python: arbitrary positional arguments (*args), arbitrary keyword arguments (**kwargs), positional-only (/) and keyword-only (*) delimiters, argument unpacking, and default parameters.',
    vi: 'Làm chủ chữ ký hàm linh hoạt trong Python: đối số vị trí tùy biến (*args), đối số từ khóa tùy biến (**kwargs), dấu phân cách chỉ vị trí (/) và chỉ từ khóa (*), giải nén đối số và tham số mặc định.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Python functions provide exceptional flexibility through default arguments, variable-length arguments (`*args`, `**kwargs`), and parameter boundary markers (`/`, `*`). Understanding these patterns allows you to build robust, extensible APIs.',
      vi: 'Hàm trong Python mang lại sự linh hoạt tuyệt vời nhờ tham số mặc định, hệ thống đối số biến thiên độ dài (`*args`, `**kwargs`) và các ký hiệu phân định tham số (`/`, `*`). Nắm vững các cấu trúc này giúp bạn xây dựng API mạnh mẽ và dễ mở rộng.'
    },
    conceptExplanation: {
      en: '1. Arbitrary Variable-Length Arguments:\n- `*args`: Collects excess positional arguments into a `tuple`.\n- `**kwargs`: Collects excess keyword arguments into a `dict`.\n\n2. Parameter Boundary Markers (PEP 570 & PEP 3102):\n- `/` (Positional-only marker): All parameters before `/` must be passed by position, never by keyword name.\n- `*` (Keyword-only marker): All parameters after `*` must be passed explicitly by keyword name.\n\n3. Argument Unpacking:\n- Passing `*list_or_tuple` in a function call unpacks elements as positional arguments.\n- Passing `**dict` in a function call unpacks key-value pairs as keyword arguments.\n\n4. Default Arguments Best Practice:\n- Never use mutable defaults (e.g. `def append_to(item, target=[])`). Always use `target=None` and initialize inside the function.',
      vi: '1. Đối Số Đa Dạng Biến Thiên Độ Dài:\n- `*args`: Thu gom các đối số vị trí dư thừa vào một `tuple`.\n- `**kwargs`: Thu gom các đối số từ khóa dư thừa vào một `dict`.\n\n2. Ký Hiệu Phân Giới Tham Số (PEP 570 & PEP 3102):\n- `/` (Chỉ vị trí): Mọi tham số đứng trước `/` bắt buộc truyền theo vị trí, không được gọi theo tên.\n- `*` (Chỉ từ khóa): Mọi tham số đứng sau `*` bắt buộc truyền kèm tên từ khóa.\n\n3. Giải Nén Đối Số (Argument Unpacking):\n- Truyền `*list_hoặc_tuple` khi gọi hàm sẽ giải nén các phần tử thành đối số vị trí.\n- Truyền `**dict` khi gọi hàm sẽ giải nén các cặp key-value thành đối số từ khóa.\n\n4. Thực Hành Chuẩn Với Tham Số Mặc Định:\n- Không dùng kiểu dữ liệu khả biến làm giá trị mặc định (vd: `def append_to(item, target=[])`). Luôn dùng `target=None` và khởi tạo bên trong hàm.'
    },
    syntax: `# Flexible function signature with markers
def configure_service(
    service_id: str,        # Standard parameter
    /,                      # Positional-only boundary
    timeout: int = 30,      # Positional or keyword with default
    *tags: str,             # *args collects extra positional items
    retries: int = 3,       # Keyword-only parameter
    **metadata: any         # **kwargs collects extra keyword dict
) -> dict:
    return {
        "id": service_id,
        "timeout": timeout,
        "tags": list(tags),
        "retries": retries,
        "extra": metadata
    }

# Argument unpacking
params = ["web_srv", 45, "prod", "api"]
opts = {"retries": 5, "region": "ap-southeast-1"}
# Unpack tuple and dict
config = configure_service(*params, **opts)`,
    examples: [
      {
        title: {
          en: 'Dynamic SQL Query Builder with *args and **kwargs',
          vi: 'Trình Tạo Truy Vấn SQL Động Với *args & **kwargs'
        },
        code: `def build_query(table: str, *columns: str, limit: int = 100, **filters: any) -> str:
    col_str = ", ".join(columns) if columns else "*"
    query = f"SELECT {col_str} FROM {table}"
    
    if filters:
        conditions = [f"{k} = '{v}'" if isinstance(v, str) else f"{k} = {v}" for k, v in filters.items()]
        query += " WHERE " + " AND ".join(conditions)
        
    query += f" LIMIT {limit};"
    return query

print(build_query("users", "id", "email", "created_at", status="active", role="admin", limit=25))
print(build_query("logs", limit=50))`,
        language: 'python',
        explanation: {
          en: '`*columns` captures columns as a tuple, while `**filters` collects WHERE clauses into a dictionary dynamically.',
          vi: '`*columns` gom các cột vào tuple, còn `**filters` gom các điều kiện WHERE vào dict để sinh câu truy vấn SQL.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Passing positional arguments after keyword arguments in a function call.',
          vi: 'Truyền đối số vị trí đứng sau đối số từ khóa khi gọi hàm.'
        },
        correction: {
          en: 'Positional arguments must always precede keyword arguments in function call syntax.',
          vi: 'Đối số vị trí luôn luôn phải đứng trước đối số từ khóa khi gọi hàm.'
        },
        code: `# SyntaxError: positional argument follows keyword argument\n# func(a=1, 2)\n# Correct:\nfunc(2, a=1)`
      },
      {
        mistake: {
          en: 'Using mutable default arguments like def add_item(item, items=[]): items.append(item).',
          vi: 'Dùng danh sách hoặc dict rỗng làm tham số mặc định khiến dữ liệu bị lưu vết qua các lần gọi.'
        },
        correction: {
          en: 'Use None as default and instantiate a new list inside the body: if items is None: items = [].',
          vi: 'Dùng None làm mặc định và khởi tạo list mới trong thân hàm: if items is None: items = [].'
        },
        code: `def add_item(item, items=None):\n    if items is None:\n        items = []\n    items.append(item)\n    return items`
      }
    ],
    tips: [
      {
        en: 'Use `*` alone in parameter lists `def fn(a, *, b):` to mandate keyword-only calling for `b`.',
        vi: 'Dùng dấu `*` đứng một mình trong danh sách tham số `def fn(a, *, b):` để bắt buộc người dùng truyền `b` kèm tên từ khóa.'
      },
      {
        en: 'Unpacking with `*` and `**` is great for forwarding arguments to wrapped functions: `return target_fn(*args, **kwargs)`.',
        vi: 'Giải nén bằng `*` và `**` rất hữu ích khi chuyển tiếp toàn bộ đối số sang một hàm khác: `return target_fn(*args, **kwargs)`.'
      }
    ]
  },
  exercisePool: [
    {
      id: 'py_10_ex1',
      type: 'write_code',
      title: {
        en: 'Exercise 1: Flexible Math Aggregator (*args)',
        vi: 'Bài tập 1: Bộ Tổng Hợp Số Học Linh Hoạt (*args)'
      },
      instruction: {
        en: 'Write `aggregate_numbers(op: str, *numbers: float) -> float` where `op` is `"sum"`, `"avg"`, or `"max"`. If `numbers` is empty, return `0.0`. Round `"avg"` to 2 decimal places.',
        vi: 'Viết hàm `aggregate_numbers(op: str, *numbers: float) -> float` trong đó `op` là `"sum"`, `"avg"`, hoặc `"max"`. Nếu `numbers` rỗng, trả về `0.0`. Làm tròn `"avg"` 2 chữ số thập phân.'
      },
      starterCode: `def aggregate_numbers(op: str, *numbers: float) -> float:
    # TODO: Process dynamic *numbers based on op
    pass`,
      solutionCode: `def aggregate_numbers(op: str, *numbers: float) -> float:
    if not numbers:
        return 0.0
    if op == "sum":
        return float(sum(numbers))
    elif op == "avg":
        return round(sum(numbers) / len(numbers), 2)
    elif op == "max":
        return float(max(numbers))
    return 0.0`,
      hint: {
        en: 'Check `if not numbers:` first, then branch on `op`.',
        vi: 'Kiểm tra `if not numbers:` trước, sau đó rẽ nhánh theo `op`.'
      },
      explanation: {
        en: '`*numbers` bundles any count of passed numbers into a tuple.',
        vi: '`*numbers` gom tất cả các đối số truyền vào thành một tuple.'
      }
    },
    {
      id: 'py_10_ex2',
      type: 'write_code',
      title: {
        en: 'Exercise 2: Config Dict Formatter (**kwargs)',
        vi: 'Bài tập 2: Định Dạng Cấu Hình Bằng **kwargs'
      },
      instruction: {
        en: 'Write `format_config(prefix: str, **settings: any) -> list[str]` that returns a list of formatted strings `"PREFIX: KEY=VALUE"` sorted alphabetically by key.',
        vi: 'Viết hàm `format_config(prefix: str, **settings: any) -> list[str]` trả về danh sách chuỗi `"PREFIX: KEY=VALUE"` được sắp xếp theo bảng chữ cái của key.'
      },
      starterCode: `def format_config(prefix: str, **settings: any) -> list[str]:
    # TODO: Format settings into sorted strings
    pass`,
      solutionCode: `def format_config(prefix: str, **settings: any) -> list[str]:
    result = []
    for k in sorted(settings.keys()):
        result.append(f"{prefix}: {k}={settings[k]}")
    return result`,
      hint: {
        en: 'Sort the dictionary keys with `sorted(settings.keys())` then build the formatted string.',
        vi: 'Sắp xếp các key bằng `sorted(settings.keys())` rồi ghép chuỗi định dạng.'
      },
      explanation: {
        en: '`**settings` unpacks all arbitrary keyword pairs into a dictionary.',
        vi: '`**settings` gom mọi cặp key-value truyền vào thành một dictionary.'
      }
    }
  ],
  challenge: {
    id: 'py_10_challenge',
    title: {
      en: 'Enterprise Request Router & Middleware Dispatcher',
      vi: 'Bộ Định Tuyến Request & Điều Phối Middleware Doanh Nghiệp'
    },
    description: {
      en: 'Implement `dispatch_request(endpoint: str, *, method: str = "GET", auth_token: str | None = None, **params: any) -> dict` that validates `endpoint`, mandates `method` and `auth_token` as keyword-only, and formats all extra query parameters into a standardized response dictionary.',
      vi: 'Xây dựng hàm `dispatch_request(endpoint: str, *, method: str = "GET", auth_token: str | None = None, **params: any) -> dict` kiểm tra endpoint, bắt buộc method và auth_token chỉ truyền qua keyword, và đóng gói các query params vào dict chuẩn hóa.'
    },
    requirements: [
      {
        en: 'Enforce keyword-only parameters with bare * syntax',
        vi: 'Bắt buộc các tham số chỉ nhận từ khóa bằng cú pháp dấu *'
      },
      {
        en: 'Collect arbitrary extra parameters with **params dictionary',
        vi: 'Gom các tham số bổ sung tùy ý bằng dictionary **params'
      },
      {
        en: 'Return standardized payload with auth status, uppercase method, and param count',
        vi: 'Trả về dữ liệu chuẩn hóa gồm trạng thái xác thực, method in hoa, và số lượng params'
      }
    ],
    starterCode: `def dispatch_request(endpoint: str, *, method: str = "GET", auth_token: str | None = None, **params: any) -> dict:
    # TODO: Implement request dispatcher
    pass`,
    solutionCode: `def dispatch_request(endpoint: str, *, method: str = "GET", auth_token: str | None = None, **params: any) -> dict:
    return {
        "status": "OK" if auth_token else "UNAUTHORIZED",
        "route": endpoint,
        "method": method.upper(),
        "authenticated": auth_token is not None,
        "query_params": params,
        "param_count": len(params)
    }`,
    hints: [
      {
        en: 'Use bare * in function definition to mandate keyword-only arguments.',
        vi: 'Dùng dấu * đứng riêng khi định nghĩa hàm để bắt buộc đối số chỉ từ khóa.'
      }
    ],
    solutionExplanation: {
      en: 'Demonstrates modern flexible function parameter signatures combining positional, keyword-only, and variable kwargs.',
      vi: 'Minh họa chữ ký hàm hiện đại linh hoạt kết hợp tham số vị trí, chỉ từ khóa và kwargs tùy ý.'
    }
  },
  quizQuestionPool: [
    {
      id: 'py_10_q1',
      type: 'single_choice',
      topicId: 'python_functions_args_kwargs',
      difficulty: 'easy',
      question: {
        en: 'What data type does `*args` collect inside a function?',
        vi: '`*args` gom các đối số truyền vào thành kiểu dữ liệu nào trong hàm?'
      },
      options: [
        { en: 'List', vi: 'List' },
        { en: 'Tuple', vi: 'Tuple' },
        { en: 'Dictionary', vi: 'Dictionary' },
        { en: 'Set', vi: 'Set' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`*args` packages excess positional arguments into an immutable `tuple`.',
        vi: '`*args` đóng gói các đối số vị trí dư thừa vào một `tuple` bất biến.'
      }
    },
    {
      id: 'py_10_q2',
      type: 'single_choice',
      topicId: 'python_functions_args_kwargs',
      difficulty: 'easy',
      question: {
        en: 'What data type does `**kwargs` collect inside a function?',
        vi: '`**kwargs` gom các đối số truyền vào thành kiểu dữ liệu nào trong hàm?'
      },
      options: [
        { en: 'Dictionary', vi: 'Dictionary' },
        { en: 'Tuple', vi: 'Tuple' },
        { en: 'List', vi: 'List' },
        { en: 'Generator', vi: 'Generator' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`**kwargs` packages arbitrary named keyword arguments into a standard `dict`.',
        vi: '`**kwargs` đóng gói các đối số từ khóa tùy ý thành một `dict`.'
      }
    },
    {
      id: 'py_10_q3',
      type: 'single_choice',
      topicId: 'python_functions_args_kwargs',
      difficulty: 'medium',
      question: {
        en: 'What is the purpose of the bare `*` delimiter in `def func(a, *, b):`?',
        vi: 'Dấu `*` đứng riêng trong `def func(a, *, b):` có ý nghĩa gì?'
      },
      options: [
        { en: 'It makes all preceding parameters optional', vi: 'Làm cho các tham số phía trước trở thành tùy chọn' },
        { en: 'It enforces that all subsequent parameters (like `b`) must be passed as keyword arguments', vi: 'Bắt buộc tất cả các tham số phía sau (như `b`) phải được truyền kèm tên từ khóa' },
        { en: 'It enables pointer dereferencing in Python', vi: 'Bật cơ chế con trỏ trong Python' },
        { en: 'It multiplies parameter `a` and `b`', vi: 'Nhân 2 tham số a và b' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'A bare `*` defines a keyword-only boundary; all parameters to its right MUST be passed with `key=value`.',
        vi: 'Dấu `*` đứng riêng định nghĩa ranh giới chỉ từ khóa; mọi tham số bên phải BẮT BUỘC phải truyền theo `key=value`.'
      }
    },
    {
      id: 'py_10_q4',
      type: 'single_choice',
      topicId: 'python_functions_args_kwargs',
      difficulty: 'medium',
      question: {
        en: 'What is the purpose of the `/` delimiter in `def func(a, b, /):`?',
        vi: 'Ký tự `/` trong `def func(a, b, /):` có ý nghĩa gì?'
      },
      options: [
        { en: 'It performs integer division on parameters', vi: 'Thực hiện phép chia lấy nguyên' },
        { en: 'It enforces that all preceding parameters (like `a` and `b`) must be passed positionally, never by keyword', vi: 'Bắt buộc các tham số phía trước phải truyền theo vị trí, không được truyền theo tên từ khóa' },
        { en: 'It makes the function return a path object', vi: 'Biến hàm thành đối tượng đường dẫn' },
        { en: 'It ignores the first parameter', vi: 'Bỏ qua tham số đầu tiên' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Introduced in PEP 570 (Python 3.8), `/` enforces positional-only parameters before it.',
        vi: 'Được giới thiệu trong PEP 570 (Python 3.8), `/` bắt buộc các tham số đứng trước nó chỉ được truyền theo vị trí.'
      }
    },
    {
      id: 'py_10_q5',
      type: 'single_choice',
      topicId: 'python_functions_args_kwargs',
      difficulty: 'medium',
      question: {
        en: 'Why is `def append_item(val, target=[]):` considered a dangerous anti-pattern?',
        vi: 'Tại sao `def append_item(val, target=[]):` được coi là một anti-pattern nguy hiểm?'
      },
      options: [
        { en: 'Python will crash with a SyntaxError', vi: 'Python sẽ báo lỗi cú pháp SyntaxError' },
        { en: 'Default argument expressions are evaluated once at function definition time, so the list persists and mutates across repeated calls', vi: 'Giá trị mặc định chỉ được khởi tạo 1 lần lúc định nghĩa hàm, nên danh sách bị lưu vết và thay đổi qua các lần gọi sau' },
        { en: 'Empty lists cannot hold elements in Python', vi: 'List rỗng không thể chứa phần tử trong Python' },
        { en: 'It slows down function execution by 10x', vi: 'Làm chậm tốc độ thực thi hàm 10 lần' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Mutable default arguments are shared across all calls that use the default. Use `target=None` and initialize inside.',
        vi: 'Tham số mặc định khả biến được chia sẻ chung cho mọi lần gọi hàm không truyền đối số. Hãy dùng `target=None` và khởi tạo bên trong.'
      }
    },
    {
      id: 'py_10_q6',
      type: 'single_choice',
      topicId: 'python_functions_args_kwargs',
      difficulty: 'easy',
      question: {
        en: 'Given `nums = [1, 2, 3]`, how do you pass its items as individual positional arguments to `func`?',
        vi: 'Cho `nums = [1, 2, 3]`, làm thế nào để truyền từng phần tử vào hàm `func` dưới dạng các đối số vị trí riêng biệt?'
      },
      options: [
        { en: '`func(nums)`', vi: '`func(nums)`' },
        { en: '`func(*nums)`', vi: '`func(*nums)`' },
        { en: '`func(**nums)`', vi: '`func(**nums)`' },
        { en: '`func.unpack(nums)`', vi: '`func.unpack(nums)`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'The single asterisk `*` unpacks an iterable into separate positional arguments.',
        vi: 'Dấu sao đơn `*` giải nén một iterable thành các đối số vị trí riêng biệt.'
      }
    },
    {
      id: 'py_10_q7',
      type: 'single_choice',
      topicId: 'python_functions_args_kwargs',
      difficulty: 'easy',
      question: {
        en: 'Given `config = {"timeout": 30, "retries": 3}`, how do you unpack it into keyword arguments for `connect()`?',
        vi: 'Cho `config = {"timeout": 30, "retries": 3}`, làm thế nào để giải nén thành các đối số từ khóa cho hàm `connect()`?'
      },
      options: [
        { en: '`connect(*config)`', vi: '`connect(*config)`' },
        { en: '`connect(**config)`', vi: '`connect(**config)`' },
        { en: '`connect(config.items())`', vi: '`connect(config.items())`' },
        { en: '`connect(&config)`', vi: '`connect(&config)`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'The double asterisk `**` unpacks a dictionary into named keyword arguments.',
        vi: 'Dấu hai sao `**` giải nén một dictionary thành các đối số có tên từ khóa.'
      }
    },
    {
      id: 'py_10_q8',
      type: 'single_choice',
      topicId: 'python_functions_args_kwargs',
      difficulty: 'medium',
      question: {
        en: 'What is the required order of parameters in a Python function definition?',
        vi: 'Thứ tự bắt buộc của các tham số khi định nghĩa hàm trong Python là gì?'
      },
      options: [
        { en: '`*args`, standard, default, `**kwargs`', vi: '`*args`, chuẩn, mặc định, `**kwargs`' },
        { en: 'Standard positional, default parameters, `*args`, keyword-only parameters, `**kwargs`', vi: 'Tham số vị trí chuẩn, tham số có giá trị mặc định, `*args`, tham số chỉ từ khóa, `**kwargs`' },
        { en: '`**kwargs`, `*args`, default, standard', vi: '`**kwargs`, `*args`, mặc định, chuẩn' },
        { en: 'Keyword-only, `**kwargs`, `*args`, standard', vi: 'Chỉ từ khóa, `**kwargs`, `*args`, chuẩn' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Python syntax requires positional parameters first, then defaults, then `*args`, followed by keyword-only parameters, and finally `**kwargs`.',
        vi: 'Cú pháp Python yêu cầu tham số vị trí đứng đầu, tiếp theo là giá trị mặc định, rồi `*args`, sau đó là tham số chỉ từ khóa, và cuối cùng là `**kwargs`.'
      }
    },
    {
      id: 'py_10_q9',
      type: 'single_choice',
      topicId: 'python_functions_args_kwargs',
      difficulty: 'medium',
      question: {
        en: 'What happens if you call `def greet(name, /): pass` with `greet(name="Alice")`?',
        vi: 'Điều gì xảy ra nếu bạn gọi `def greet(name, /): pass` bằng `greet(name="Alice")`?'
      },
      options: [
        { en: 'It executes normally and returns "Alice"', vi: 'Hàm chạy bình thường và trả về "Alice"' },
        { en: 'It raises a `TypeError` because `name` is positional-only', vi: 'Gây lỗi `TypeError` vì `name` là tham số chỉ vị trí' },
        { en: 'It prints a warning to stderr', vi: 'In cảnh báo ra stderr' },
        { en: 'It converts `name` to a dictionary', vi: 'Chuyển `name` thành dictionary' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'The `/` delimiter enforces positional-only calling; passing positional-only parameters by keyword raises a `TypeError`.',
        vi: 'Ký hiệu `/` bắt buộc truyền theo vị trí; truyền theo tên từ khóa sẽ gây lỗi `TypeError`.'
      }
    },
    {
      id: 'py_10_q10',
      type: 'single_choice',
      topicId: 'python_functions_args_kwargs',
      difficulty: 'easy',
      question: {
        en: 'Can a function have multiple `*args` or `**kwargs` parameters in its definition?',
        vi: 'Một hàm có thể có nhiều tham số `*args` hoặc `**kwargs` trong định nghĩa không?'
      },
      options: [
        { en: 'Yes, up to 3 of each', vi: 'Có, tối đa 3 tham số mỗi loại' },
        { en: 'No, a function can have at most one `*args` and at most one `**kwargs`', vi: 'Không, một hàm chỉ được có tối đa một `*args` và một `**kwargs`' },
        { en: 'Yes, if they have different names', vi: 'Có, nếu chúng có tên khác nhau' },
        { en: 'Only in async functions', vi: 'Chỉ trong hàm bất đồng bộ' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Python syntax permits at most one `*args` collector and at most one `**kwargs` collector per function definition.',
        vi: 'Cú pháp Python chỉ cho phép tối đa một bộ gom `*args` và tối đa một bộ gom `**kwargs` trên mỗi định nghĩa hàm.'
      }
    }
  ]
};
