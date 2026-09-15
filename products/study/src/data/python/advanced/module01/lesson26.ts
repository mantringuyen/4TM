import { Lesson } from '../../../../types';

export const lesson26: Lesson = {
  id: 'py_lesson_26',
  moduleId: 'py_mod_11',
  levelId: 'advanced',
  courseId: 'python',
  order: 26,
  topicId: 'python_functional_programming_lambdas_functools',
  title: {
    en: 'Functional Programming: First-Class Functions, Lambdas, Closures & functools',
    vi: 'Lập Trình Hàm Nâng Cao: First-Class Functions, Lambdas, Closures & functools'
  },
  summary: {
    en: 'Master functional programming paradigms in Python: anonymous lambda expressions, lexical scope closures, function composition, higher-order functions (map, filter, reduce), and the standard functools toolkit (lru_cache, cache, partial, wraps, singledispatch).',
    vi: 'Làm chủ tư duy lập trình hàm nâng cao trong Python: biểu thức ẩn danh lambda, bao đóng lexical closures, kết hợp hàm, hàm bậc cao (map, filter, reduce) và bộ công cụ functools chuẩn (lru_cache, cache, partial, wraps, singledispatch).'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'In Python, functions are first-class citizens: they can be passed as arguments, assigned to variables, returned from other functions, and store lexical scope via closures. Mastering functional patterns and the `functools` module enables writing clean, declarative, and high-performance pipeline transformations.',
      vi: 'Trong Python, hàm là các đối tượng first-class: chúng có thể được truyền làm đối số, gán vào biến, trả về từ hàm khác và ghi nhớ phạm vi bao đóng (closure). Làm chủ các mẫu lập trình hàm và module `functools` giúp bạn viết các luồng xử lý dữ liệu khai báo, ngắn gọn và đạt hiệu năng cao.'
    },
    conceptExplanation: {
      en: '1. First-Class Functions & Closures:\n- A closure occurs when an inner function retains access to variables in its enclosing lexical scope even after the outer function has finished executing.\n- `__closure__` attribute holds cells referencing enclosed values.\n\n2. Anonymous Functions with `lambda`:\n- Syntax: `lambda arg1, arg2: expression`\n- Single-expression limitation ensures concise key functions (e.g. `sorted(data, key=lambda x: x["score"])`) without cluttering namespace.\n\n3. The `functools` Standard Power Tools:\n- `functools.partial(func, *args, **kwargs)`: Pre-binds fixed arguments, generating a new specialized callable.\n- `functools.lru_cache(maxsize=128)` & `@functools.cache`: Memoization decorators that cache function return values based on hashable arguments to optimize expensive operations.\n- `functools.reduce(function, iterable, [initializer])`: Cumulatively applies a binary function across a sequence.\n- `functools.singledispatch`: Implements polymorphism / function overloading based on the type of the first argument.',
      vi: '1. First-Class Functions & Bao Đóng (Closures):\n- Closure xuất hiện khi một hàm lồng bên trong vẫn duy trì quyền truy cập vào các biến thuộc phạm vi lexical bên ngoài ngay cả khi hàm ngoài đã thực thi xong.\n- Thuộc tính `__closure__` lưu trữ các cell tham chiếu đến giá trị được bao đóng.\n\n2. Hàm Ẩn Danh Với `lambda`:\n- Cú pháp: `lambda arg1, arg2: biểu_thức`\n- Giới hạn trong 1 biểu thức duy nhất, lý tưởng làm hàm khóa tạm thời (vd: `sorted(data, key=lambda x: x["score"])`).\n\n3. Bộ Công Cụ Tiêu Chuẩn `functools`:\n- `functools.partial(func, *args, **kwargs)`: Đóng băng các tham số cố định, tạo ra một hàm chuyên biệt mới.\n- `functools.lru_cache(maxsize=128)` & `@functools.cache`: Memoization decorator tự động lưu cache kết quả dựa trên tham số đầu vào để tối ưu các hàm tính toán nặng.\n- `functools.reduce(function, iterable, [initializer])`: Áp dụng hàm 2 tham số lũy tích trên toàn bộ chuỗi dữ liệu.\n- `functools.singledispatch`: Cung cấp nạp chồng hàm (function overloading) đa hình dựa trên kiểu dữ liệu của đối số đầu tiên.'
    },
    syntax: `from functools import lru_cache, partial, reduce, singledispatch

# 1. Closure Factory
def make_multiplier(factor: float):
    def multiplier(number: float) -> float:
        return number * factor
    return multiplier

double = make_multiplier(2.0)
print(double(5.0))  # 10.0

# 2. functools.partial specialized callable
def power(base: float, exponent: float) -> float:
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)

# 3. Memoization with lru_cache
@lru_cache(maxsize=256)
def fibonacci(n: int) -> int:
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# 4. Sequence aggregation with reduce
numbers = [1, 2, 3, 4, 5]
product = reduce(lambda acc, x: acc * x, numbers, 1)  # 120`,
    examples: [
      {
        title: {
          en: 'Functional Data Pipeline & Memoized Price Indexer',
          vi: 'Luồng Xử Lý Dữ Liệu Hàm & Tra Cứu Chỉ Số Giá Có Cache'
        },
        code: `from functools import lru_cache, partial

products = [
    {"name": "Server A", "category": "hardware", "cost": 1200},
    {"name": "Cloud Storage", "category": "saas", "cost": 300},
    {"name": "Server B", "category": "hardware", "cost": 2400}
]

# Higher-order pipeline filter & sort
is_hardware = lambda p: p["category"] == "hardware"
hardware_items = list(filter(is_hardware, products))
sorted_hardware = sorted(hardware_items, key=lambda p: p["cost"], reverse=True)

@lru_cache(maxsize=64)
def compute_depreciation(cost: float, years: int, rate: float = 0.15) -> float:
    return round(cost * ((1 - rate) ** years), 2)

print("Top Hardware:", sorted_hardware[0]["name"])
print("5-Year Value:", compute_depreciation(sorted_hardware[0]["cost"], 5))`,
        language: 'python',
        explanation: {
          en: 'Applies functional filtering and sorting alongside lru_cache memoization for idempotent financial projections.',
          vi: 'Kết hợp lọc, sắp xếp theo phong cách functional với memoization lru_cache để tính toán dự báo tài chính nhanh chóng.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Late binding closure bug inside loops: `funcs = [lambda: i for i in range(3)]` (all functions return 2).',
          vi: 'Lỗi late-binding closure trong vòng lặp: `funcs = [lambda: i for i in range(3)]` (tất cả các hàm đều trả về giá trị cuối cùng là 2).'
        },
        correction: {
          en: 'Bind the loop variable eagerly using a default parameter: `funcs = [lambda i=i: i for i in range(3)]` or use `functools.partial`.',
          vi: 'Đóng băng giá trị biến lặp ngay lập tức bằng tham số mặc định: `funcs = [lambda i=i: i for i in range(3)]` hoặc dùng `functools.partial`.'
        },
        code: `# Bug:\n# funcs = [lambda: i for i in range(3)]\n# Fix with default arg:\nfuncs = [lambda i=i: i for i in range(3)]\nassert [f() for f in funcs] == [0, 1, 2]`
      },
      {
        mistake: {
          en: 'Using `lru_cache` on functions that receive unhashable arguments like mutable lists or dictionaries (raises TypeError: unhashable type).',
          vi: 'Dùng `lru_cache` trên các hàm nhận tham số không băm được (unhashable) như list hoặc dict khả biến gây lỗi TypeError.'
        },
        correction: {
          en: 'Pass immutable tuples or frozensets to cached functions instead of mutable lists/dicts.',
          vi: 'Truyền tuple bất biến hoặc frozenset vào hàm có cache thay vì list/dict.'
        },
        code: `# Raises TypeError: @lru_cache def process(items: list): ...\n# Correct:\n@lru_cache\ndef process(items: tuple[str, ...]):\n    pass`
      }
    ],
    tips: [
      {
        en: 'In Python 3.9+, use `@functools.cache` for an unbounded memory cache when you do not need an LRU eviction policy.',
        vi: 'Từ Python 3.9+, dùng `@functools.cache` cho bộ nhớ cache vô hạn khi không cần chính sách loại bỏ LRU giới hạn dung lượng.'
      },
      {
        en: '`functools.wraps` should always be applied to decorator wrappers to preserve the decorated function’s name, docstring, and annotations.',
        vi: 'Luôn gắn `@functools.wraps` lên wrapper của decorator để bảo toàn tên hàm gốc, docstring và type annotations.'
      }
    ]
  },
  exercisePool: [
    {
      id: 'py_25_ex1',
      type: 'write_code',
      title: {
        en: 'Exercise 1: Configurable Formatter with Closure',
        vi: 'Bài tập 1: Hàm Định Dạng Với Closure'
      },
      instruction: {
        en: 'Write `create_tag_wrapper(tag: str) -> callable` that returns a function taking `content: str` and returning `f"<{tag}>{content}</{tag}>"`.',
        vi: 'Viết hàm `create_tag_wrapper(tag: str) -> callable` trả về một hàm nhận vào `content: str` và trả về `f"<{tag}>{content}</{tag}>"`.'
      },
      starterCode: `def create_tag_wrapper(tag: str):
    # TODO: Return closure wrapping content in HTML tag
    pass`,
      solutionCode: `def create_tag_wrapper(tag: str):
    def wrapper(content: str) -> str:
        return f"<{tag}>{content}</{tag}>"
    return wrapper`,
      hint: {
        en: 'Define an inner `wrapper(content: str)` function and return it.',
        vi: 'Định nghĩa một hàm bên trong `wrapper(content: str)` và trả về hàm đó.'
      },
      explanation: {
        en: 'The returned `wrapper` captures `tag` in its lexical scope closure.',
        vi: 'Hàm `wrapper` được trả về sẽ lưu trữ biến `tag` trong bao đóng lexical scope.'
      }
    },
    {
      id: 'py_25_ex2',
      type: 'write_code',
      title: {
        en: 'Exercise 2: Sequence Reducer & Cumulative Computation',
        vi: 'Bài tập 2: Tích Lũy Chuỗi Bằng functools.reduce'
      },
      instruction: {
        en: 'Write `compute_total_volume(boxes: list[dict]) -> int` using `functools.reduce` to compute the sum of volumes of all boxes, where each box has `"length"`, `"width"`, `"height"`. Return 0 if list is empty.',
        vi: 'Viết hàm `compute_total_volume(boxes: list[dict]) -> int` sử dụng `functools.reduce` để tính tổng thể tích của tất cả các hộp, mỗi hộp có `"length"`, `"width"`, `"height"`. Trả về 0 nếu danh sách rỗng.'
      },
      starterCode: `from functools import reduce

def compute_total_volume(boxes: list[dict]) -> int:
    # TODO: Use reduce to accumulate total box volumes
    pass`,
      solutionCode: `from functools import reduce

def compute_total_volume(boxes: list[dict]) -> int:
    if not boxes:
        return 0
    return reduce(
        lambda acc, b: acc + (b["length"] * b["width"] * b["height"]),
        boxes,
        0
    )`,
      hint: {
        en: 'Use `reduce(lambda acc, b: acc + (b["length"] * b["width"] * b["height"]), boxes, 0)`.',
        vi: 'Dùng `reduce(lambda acc, b: acc + (b["length"] * b["width"] * b["height"]), boxes, 0)`.'
      },
      explanation: {
        en: '`reduce` iterates through elements accumulating state with an initial value of 0.',
        vi: '`reduce` duyệt qua các phần tử để tích lũy trạng thái với giá trị khởi tạo là 0.'
      }
    }
  ],
  challenge: {
    id: 'py_25_challenge',
    title: {
      en: 'Higher-Order Pipeline Composer & Memoized Transformer',
      vi: 'Bộ Kết Hợp Luồng Xử Lý Hàm Bậc Cao & Memoization'
    },
    description: {
      en: 'Implement `compose_pipeline(*functions) -> callable` that accepts any number of single-argument unary functions `f1, f2, ..., fn` and returns a new function that applies them sequentially from left to right: `compose_pipeline(f, g, h)(x) == h(g(f(x)))`. If no functions are provided, return identity `lambda x: x`.',
      vi: 'Xây dựng hàm `compose_pipeline(*functions) -> callable` nhận vào số lượng bất kỳ các hàm một tham số `f1, f2, ..., fn` và trả về một hàm mới áp dụng lần lượt từ trái sang phải: `compose_pipeline(f, g, h)(x) == h(g(f(x)))`. Nếu không truyền hàm nào, trả về hàm đồng nhất `lambda x: x`.'
    },
    requirements: [
      {
        en: 'Accept variable number of unary functions using *functions',
        vi: 'Nhận số lượng tùy ý các hàm đơn tham số bằng cú pháp *functions'
      },
      {
        en: 'Return identity function if no functions are passed',
        vi: 'Trả về hàm đồng nhất nếu không truyền hàm nào'
      },
      {
        en: 'Chain and evaluate functions sequentially using functools.reduce',
        vi: 'Xâu chuỗi và thực thi các hàm tuần tự bằng functools.reduce'
      }
    ],
    hints: [
      {
        en: 'Use functools.reduce to pass output of each function to the next in sequence.',
        vi: 'Dùng functools.reduce để truyền kết quả của từng hàm cho hàm tiếp theo.'
      }
    ],
    starterCode: `from functools import reduce

def compose_pipeline(*functions):
    # TODO: Compose functions left-to-right
    pass`,
    solutionCode: `from functools import reduce

def compose_pipeline(*functions):
    if not functions:
        return lambda x: x
    return lambda initial: reduce(lambda val, fn: fn(val), functions, initial)`,
    solutionExplanation: {
      en: 'Functional pipelines chain unary transforms cleanly using reduce without mutating external state.',
      vi: 'Pipeline hàm xâu chuỗi các phép biến đổi một tham số rõ ràng bằng reduce mà không làm biến đổi trạng thái bên ngoài.'
    }
  },
  quizQuestionPool: [
    {
      id: 'py_25_q1',
      type: 'single_choice',
      topicId: 'python_functional_programming',
      difficulty: 'easy',
      question: {
        en: 'What defines a "first-class function" in Python?',
        vi: 'Khái niệm "first-class function" trong Python có nghĩa là gì?'
      },
      options: [
        { en: 'Functions must be defined before classes', vi: 'Hàm phải được khai báo trước class' },
        { en: 'Functions can be assigned to variables, passed as arguments to other functions, and returned from functions like any other object', vi: 'Hàm có thể được gán vào biến, truyền làm đối số cho hàm khác và trả về từ hàm như bất kỳ đối tượng nào khác' },
        { en: 'Functions only run in the main thread', vi: 'Hàm chỉ chạy trên luồng chính' },
        { en: 'Functions that cannot accept parameters', vi: 'Hàm không thể nhận tham số' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'First-class status means functions are treated as standard values/objects.',
        vi: 'First-class có nghĩa là hàm được đối xử như một giá trị/đối tượng thông thường trong ngôn ngữ.'
      }
    },
    {
      id: 'py_25_q2',
      type: 'single_choice',
      topicId: 'python_functional_programming',
      difficulty: 'easy',
      question: {
        en: 'What is a closure in Python?',
        vi: 'Bao đóng (closure) trong Python là gì?'
      },
      options: [
        { en: 'A syntax error when a function is missing a return statement', vi: 'Lỗi cú pháp khi hàm thiếu lệnh return' },
        { en: 'A nested function that retains access to variables in its outer enclosing scope even after the outer function has completed execution', vi: 'Một hàm lồng nhau vẫn duy trì quyền truy cập vào các biến thuộc phạm vi bao ngoài ngay cả khi hàm ngoài đã kết thúc thực thi' },
        { en: 'A method to close file descriptors', vi: 'Một phương thức để đóng kết nối file' },
        { en: 'An anonymous lambda that accepts zero arguments', vi: 'Một hàm lambda ẩn danh không nhận tham số' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Closures capture and preserve their lexical enclosing variables in `__closure__` cells.',
        vi: 'Closure bắt giữ và bảo toàn các biến trong phạm vi lexical thông qua thuộc tính `__closure__`.'
      }
    },
    {
      id: 'py_25_q3',
      type: 'single_choice',
      topicId: 'python_functional_programming',
      difficulty: 'medium',
      question: {
        en: 'What is the syntax limitation of Python `lambda` expressions?',
        vi: 'Giới hạn cú pháp lớn nhất của biểu thức `lambda` trong Python là gì?'
      },
      options: [
        { en: 'They cannot return numbers', vi: 'Không thể trả về số' },
        { en: 'They can only contain a single expression whose evaluated value is implicitly returned; statements like `if/else` blocks, `while`, or `try` are not allowed', vi: 'Chỉ có thể chứa duy nhất một biểu thức và giá trị của biểu thức đó được tự động trả về; không được chứa các câu lệnh như khối `if/else`, `while` hay `try`' },
        { en: 'They cannot be used inside lists', vi: 'Không thể dùng trong list' },
        { en: 'They require an explicit `return` keyword', vi: 'Bắt buộc phải có từ khóa `return`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Lambdas are restricted to a single expression without multi-statement blocks or explicit `return` keywords.',
        vi: 'Lambda bị giới hạn trong 1 biểu thức duy nhất, không hỗ trợ khối nhiều câu lệnh hay từ khóa `return` rõ ràng.'
      }
    },
    {
      id: 'py_25_q4',
      type: 'single_choice',
      topicId: 'python_functional_programming',
      difficulty: 'easy',
      question: {
        en: 'What does `functools.partial(func, *args, **kwargs)` do?',
        vi: 'Hàm `functools.partial(func, *args, **kwargs)` có tác dụng gì?'
      },
      options: [
        { en: 'Executes half of the function', vi: 'Thực thi một nửa hàm' },
        { en: 'Returns a new callable object that freezes a subset of the original function\'s arguments and keywords', vi: 'Trả về một đối tượng callable mới đóng băng trước một phần đối số và tham số của hàm gốc' },
        { en: 'Deletes optional arguments', vi: 'Xóa các tham số tùy chọn' },
        { en: 'Measures execution time', vi: 'Đo lường thời gian thực thi' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`partial` creates partial application wrappers with pre-bound arguments.',
        vi: '`partial` tạo ra wrapper áp dụng từng phần với các tham số đã được liên kết sẵn.'
      }
    },
    {
      id: 'py_25_q5',
      type: 'single_choice',
      topicId: 'python_functional_programming',
      difficulty: 'medium',
      question: {
        en: 'How does `@functools.lru_cache(maxsize=128)` optimize repetitive function calls?',
        vi: 'Decorator `@functools.lru_cache(maxsize=128)` tối ưu hóa các lệnh gọi hàm lặp lại như thế nào?'
      },
      options: [
        { en: 'By compiling Python to C machine code', vi: 'Bằng cách biên dịch Python sang mã máy C' },
        { en: 'By memoizing returned results in an internal hash table using arguments as lookup keys, evicting the least-recently used entries when reaching maxsize', vi: 'Bằng cách memoize kết quả trả về trong bảng băm sử dụng đối số làm khóa tra cứu, tự động giải phóng phần tử ít dùng nhất (LRU) khi đạt dung lượng tối đa' },
        { en: 'By parallelizing execution across CPU cores', vi: 'Bằng cách chạy song song trên các lõi CPU' },
        { en: 'By ignoring exceptions', vi: 'Bằng cách bỏ qua ngoại lệ' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'LRU (Least Recently Used) cache caches results of pure functions for repeated identical arguments.',
        vi: 'LRU cache lưu kết quả của các hàm thuần túy khi nhận các tham số đầu vào giống nhau.'
      }
    },
    {
      id: 'py_25_q6',
      type: 'single_choice',
      topicId: 'python_functional_programming',
      difficulty: 'medium',
      question: {
        en: 'What happens if you pass a mutable list as an argument to a function decorated with `@lru_cache`?',
        vi: 'Điều gì xảy ra nếu bạn truyền một list khả biến vào hàm được gắn decorator `@lru_cache`?'
      },
      options: [
        { en: 'The list is automatically converted to a string', vi: 'List tự động chuyển thành chuỗi' },
        { en: 'Python raises `TypeError: unhashable type: \'list\'` because cache keys must be hashable', vi: 'Python ném lỗi `TypeError: unhashable type: \'list\'` vì khóa của cache bắt buộc phải băm được (hashable)' },
        { en: 'The cache ignores the argument', vi: 'Cache bỏ qua tham số đó' },
        { en: 'The function runs without caching', vi: 'Hàm chạy mà không cache' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Cache keys rely on dictionary hashing (`__hash__`), so all arguments must be immutable.',
        vi: 'Khóa của cache dựa trên cơ chế băm dict (`__hash__`), do đó toàn bộ tham số phải là kiểu dữ liệu bất biến.'
      }
    },
    {
      id: 'py_25_q7',
      type: 'single_choice',
      topicId: 'python_functional_programming',
      difficulty: 'medium',
      question: {
        en: 'What does `functools.reduce(lambda acc, x: acc + x, [10, 20, 30], 5)` evaluate to?',
        vi: 'Biểu thức `functools.reduce(lambda acc, x: acc + x, [10, 20, 30], 5)` trả về giá trị bao nhiêu?'
      },
      options: [
        { en: '`60`', vi: '`60`' },
        { en: '`65`', vi: '`65`' },
        { en: '`50`', vi: '`50`' },
        { en: '`[15, 25, 35]`', vi: '`[15, 25, 35]`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'It starts with initial accumulator value 5: 5 + 10 = 15; 15 + 20 = 35; 35 + 30 = 65.',
        vi: 'Bắt đầu với giá trị khởi tạo là 5: 5 + 10 = 15; 15 + 20 = 35; 35 + 30 = 65.'
      }
    },
    {
      id: 'py_25_q8',
      type: 'single_choice',
      topicId: 'python_functional_programming',
      difficulty: 'medium',
      question: {
        en: 'Why is `funcs = [lambda: i for i in range(3)]` a classic Python closure gotcha?',
        vi: 'Tại sao `funcs = [lambda: i for i in range(3)]` là một bẫy kinh điển trong lập trình closure Python?'
      },
      options: [
        { en: 'The list syntax is invalid', vi: 'Cú pháp list không hợp lệ' },
        { en: 'Python closures bind variables by reference (late binding), so all lambdas lookup `i` when called and see its final loop value (2)', vi: 'Closure trong Python liên kết biến theo tham chiếu (late binding), do đó tất cả các lambda khi được gọi mới tra cứu biến `i` và chỉ thấy giá trị cuối cùng của vòng lặp là 2' },
        { en: 'Lambdas cannot be placed in lists', vi: 'Lambda không thể đặt trong list' },
        { en: '`range` cannot be used in comprehensions', vi: '`range` không thể dùng trong comprehension' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Python closures look up variable names at execution time (late binding), not at definition time.',
        vi: 'Closure trong Python tra cứu tên biến tại thời điểm thực thi (late binding), chứ không phải lúc định nghĩa.'
      }
    },
    {
      id: 'py_25_q9',
      type: 'single_choice',
      topicId: 'python_functional_programming',
      difficulty: 'medium',
      question: {
        en: 'What is the purpose of `@functools.wraps(fn)` inside a decorator?',
        vi: 'Mục đích của `@functools.wraps(fn)` bên trong một decorator là gì?'
      },
      options: [
        { en: 'To make the decorated function asynchronous', vi: 'Biến hàm được decorate thành hàm bất đồng bộ' },
        { en: 'To copy the original function\'s name, docstring, and annotations to the wrapper function to preserve metadata introspection', vi: 'Sao chép tên hàm, docstring và annotations của hàm gốc sang hàm wrapper để bảo toàn metadata khi introspection' },
        { en: 'To catch all unhandled exceptions', vi: 'Bắt tất cả các ngoại lệ chưa xử lý' },
        { en: 'To enforce type checking at runtime', vi: 'Bắt buộc kiểm tra kiểu dữ liệu khi runtime' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`@wraps` preserves identity and introspection metadata (`__name__`, `__doc__`, `__annotations__`).',
        vi: '`@wraps` bảo toàn định danh và metadata (`__name__`, `__doc__`, `__annotations__`) của hàm gốc.'
      }
    },
    {
      id: 'py_25_q10',
      type: 'single_choice',
      topicId: 'python_functional_programming',
      difficulty: 'medium',
      question: {
        en: 'Which decorator enables generic single-dispatch function overloading based on the type of the first argument in Python?',
        vi: 'Decorator nào cho phép nạp chồng hàm dạng single-dispatch dựa trên kiểu của tham số đầu tiên trong Python?'
      },
      options: [
        { en: '`@functools.overload`', vi: '`@functools.overload`' },
        { en: '`@functools.singledispatch`', vi: '`@functools.singledispatch`' },
        { en: '`@functools.polymorphic`', vi: '`@functools.polymorphic`' },
        { en: '`@functools.dispatch_all`', vi: '`@functools.dispatch_all`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`@functools.singledispatch` transforms a function into a generic function capable of dispatching to specialized implementations based on type.',
        vi: '`@functools.singledispatch` biến một hàm thành hàm generic có khả năng điều phối sang các bản cài đặt chuyên biệt theo kiểu dữ liệu.'
      }
    }
  ]
};
