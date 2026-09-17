import { Category, Subject, Book } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cs',
    name: {
      en: 'Computer Science',
      vi: 'Khoa Học Máy Tính',
    },
    description: {
      en: 'Foundations of computation, algorithms, data structures, and core programming languages.',
      vi: 'Nền tảng tính toán, thuật toán, cấu trúc dữ liệu và ngôn ngữ lập trình cốt lõi.',
    },
    icon: 'Cpu',
  },
  {
    id: 'architecture',
    name: {
      en: 'Software Architecture',
      vi: 'Kiến Trúc Phần Mềm',
    },
    description: {
      en: 'System design, microservices, cloud patterns, and high-throughput distributed systems.',
      vi: 'Thiết kế hệ thống, microservices, mẫu kiến trúc cloud và hệ thống phân tán chịu tải cao.',
    },
    icon: 'Layers',
  },
  {
    id: 'data',
    name: {
      en: 'Data & Database Systems',
      vi: 'Hệ Thống Dữ Liệu & Cơ Sở Dữ Liệu',
    },
    description: {
      en: 'Relational storage engines, distributed key-value databases, and query optimization.',
      vi: 'Engine lưu trữ quan hệ, cơ sở dữ liệu phân tán và tối ưu hóa truy vấn chuyên sâu.',
    },
    icon: 'Database',
  },
];

export const SUBJECTS: Subject[] = [
  {
    id: 'programming',
    categoryId: 'cs',
    name: {
      en: 'Programming',
      vi: 'Lập Trình & Ngôn Ngữ',
    },
    description: {
      en: 'Core language mechanics, idioms, standard libraries, and runtime models.',
      vi: 'Cơ chế ngôn ngữ cốt lõi, thành ngữ lập trình, thư viện tiêu chuẩn và mô hình runtime.',
    },
  },
  {
    id: 'systems',
    categoryId: 'architecture',
    name: {
      en: 'Distributed Systems',
      vi: 'Hệ Thống Phân Tán',
    },
    description: {
      en: 'Consensus protocols, replication, fault-tolerance, and latency mitigation.',
      vi: 'Giao thức đồng thuận, nhân bản dữ liệu, khả năng chịu lỗi và giảm thiểu độ trễ.',
    },
  },
  {
    id: 'storage',
    categoryId: 'data',
    name: {
      en: 'Database Internals',
      vi: 'Kiến Trúc Cơ Sở Dữ Liệu',
    },
    description: {
      en: 'B-Trees, LSM-Trees, write-ahead logging, and ACID isolation guarantees.',
      vi: 'B-Trees, LSM-Trees, Write-Ahead Logging và các cấp độ cô lập giao dịch ACID.',
    },
  },
];

export const EBOOKS: Book[] = [
  // 1. Python Tips
  {
    id: 'python-tips',
    slug: 'python-tips',
    title: 'Python Tips',
    subtitle: {
      en: 'Idiomatic Patterns & Modern High-Performance Techniques',
      vi: 'Kỹ Thuật Viết Code Python Tối Ưu & Chuẩn Idiomatic Hiện Đại',
    },
    categoryId: 'cs',
    subjectId: 'programming',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '45 mins',
    chaptersCount: 4,
    publishedDate: '2025-01-15',
    accentColor: 'from-emerald-500 to-teal-700',
    tags: ['Python 3.12+', 'Idioms', 'Performance', 'Clean Code'],
    description: {
      en: 'A concise, high-signal manual compiling practical tips, memory optimizations, and clean syntax idioms for writing modern Pythonic code.',
      vi: 'Cẩm nang cô đọng tổng hợp các mẹo thực chiến, kỹ thuật tối ưu bộ nhớ và cú pháp tinh gọn để viết mã nguồn Python chuẩn mực, hiệu suất cao.',
    },
    prerequisites: {
      en: ['Basic knowledge of Python syntax (variables, functions, control flow)'],
      vi: ['Kiến thức cú pháp Python cơ bản (biến, hàm, rẽ nhánh)'],
    },
    outcomes: {
      en: [
        'Master list & dict comprehensions without memory blowups',
        'Leverage walrus operators (:=) and match statements effectively',
        'Optimize iterations using itertools, zip, and enumerate',
      ],
      vi: [
        'Làm chủ list & dict comprehensions mà không gây quá tải bộ nhớ',
        'Sử dụng toán tử gán walrus (:=) và cú pháp match hiệu quả',
        'Tối ưu hóa vòng lặp với itertools, zip và enumerate',
      ],
    },
    chapters: [
      {
        id: 'pt-ch-1',
        number: 1,
        slug: 'idiomatic-iteration-unpacking',
        title: {
          en: 'Idiomatic Iterations & Advanced Unpacking',
          vi: 'Vòng Lặp Chuẩn Idiomatic & Kỹ Thuật Unpacking Nâng Cao',
        },
        summary: {
          en: 'Eliminate index lookups and simplify complex multi-value data extraction with star unpacking and zip.',
          vi: 'Loại bỏ việc truy cập mảng qua chỉ số và đơn giản hóa bóc tách dữ liệu đa tầng với star unpacking.',
        },
        readTimeMinutes: 10,
        sections: [
          {
            id: 'pt-1-1',
            title: {
              en: '1. Star Unpacking for Variable Length Sequences',
              vi: '1. Kỹ Thuật Star Unpacking Với Dãy Có Độ Dài Bất Kỳ',
            },
            content: {
              en: 'Instead of slicing lists manually with `items[0]` and `items[1:]`, modern Python provides the extended iterable unpacking operator `*` to capture head, middle, or tail sequences cleanly.',
              vi: 'Thay vì cắt mảng thủ công bằng `items[0]` và `items[1:]`, Python hiện đại cung cấp toán tử extended unpacking `*` để trích xuất phần tử đầu, giữa hoặc cuối danh sách một cách rõ ràng.',
            },
            codeBlock: {
              language: 'python',
              filename: 'unpacking.py',
              code: `# Extract head, middle elements, and tail cleanly
first, *middle, last = [10, 20, 30, 40, 50]
print(first)   # 10
print(middle)  # [20, 30, 40]
print(last)    # 50

# Unpacking nested HTTP responses
status_code, *headers, (body_type, raw_payload) = response_tuple`,
              explanation: {
                en: 'The starred target captures all elements not assigned to specific variable names as a new list.',
                vi: 'Biến có dấu sao `*` sẽ tự động gom tất cả phần tử còn lại thành một danh sách mới.',
              },
            },
            keyTakeaways: {
              en: [
                'Avoid manual indices like items[len(items)-1]',
                'Only one starred variable is permitted per assignment statement',
              ],
              vi: [
                'Tránh truy cập chỉ số thủ công qua độ dài mảng',
                'Mỗi biểu thức gán chỉ được phép chứa một biến star unpacking',
              ],
            },
          },
          {
            id: 'pt-1-2',
            title: {
              en: '2. Paired Traversal with zip(strict=True)',
              vi: '2. Duyệt Cặp An Toàn Với zip(strict=True)',
            },
            content: {
              en: 'When pairing two related collections, `zip()` silently truncates to the shortest iterable by default. In Python 3.10+, always use `strict=True` to catch mismatched length bugs at runtime immediately.',
              vi: 'Khi ghép đôi hai tập hợp, `zip()` mặc định sẽ âm thầm cắt ngắn theo danh sách ngắn hơn. Kể từ Python 3.10+, hãy luôn truyền `strict=True` để bắt lỗi lệch dữ liệu ngay lập tức.',
            },
            codeBlock: {
              language: 'python',
              filename: 'safe_zip.py',
              code: `user_ids = [101, 102, 103]
emails = ["alice@4tm.io.vn", "bob@4tm.io.vn"]

# Raises ValueError: zip() argument 2 is shorter than argument 1
for uid, email in zip(user_ids, emails, strict=True):
    dispatch_welcome_email(uid, email)`,
            },
          },
        ],
      },
      {
        id: 'pt-ch-2',
        number: 2,
        slug: 'dictionary-set-comprehensions',
        title: {
          en: 'High-Performance Dictionary & Set Comprehensions',
          vi: 'Tối Ưu Hiệu Suất Với Dictionary & Set Comprehensions',
        },
        summary: {
          en: 'Construct lookup tables and deduplicated indices in a single C-speed bytecode pass.',
          vi: 'Tạo bảng tra cứu và tập chỉ số không trùng lặp trong một lượt bytecode tốc độ C.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'pt-2-1',
            title: {
              en: 'Inverted Lookups and Key Merging',
              vi: 'Tra Cứu Ngược và Hợp Nhất Từ Điển',
            },
            content: {
              en: 'Use dictionary comprehensions to build fast O(1) reverse lookup maps. Combine with the union operator `|` introduced in Python 3.9 for non-destructive dictionary merges.',
              vi: 'Sử dụng dictionary comprehension để tạo bảng tra cứu ngược O(1). Kết hợp toán tử hợp `|` để gộp từ điển nhanh chóng mà không làm biến đổi dữ liệu gốc.',
            },
            codeBlock: {
              language: 'python',
              filename: 'dict_merge.py',
              code: `# Inverted lookup map
id_to_username = {1: "nam", 2: "linh", 3: "tuan"}
username_to_id = {name: uid for uid, name in id_to_username.items()}

# Modern dictionary merge (Python 3.9+)
default_config = {"timeout": 30, "retries": 3, "debug": False}
env_overrides = {"debug": True, "host": "0.0.0.0"}
active_config = default_config | env_overrides`,
            },
          },
        ],
      },
      {
        id: 'pt-ch-3',
        number: 3,
        slug: 'walrus-operator-efficiency',
        title: {
          en: 'Assignment Expressions with the Walrus Operator (:=)',
          vi: 'Biểu Thức Gán Với Toán Tử Walrus (:=)',
        },
        summary: {
          en: 'Avoid redundant function calls in while loops, list filters, and regex matches.',
          vi: 'Tránh gọi lặp hàm tốn kém trong vòng lặp while, bộ lọc danh sách và regex matches.',
        },
        readTimeMinutes: 11,
        sections: [
          {
            id: 'pt-3-1',
            title: {
              en: 'Compute and Filter in a Single Expression',
              vi: 'Tính Toán Và Lọc Trong Cùng Một Biểu Thức',
            },
            content: {
              en: 'The walrus operator `:=` assigns values to variables as part of a larger expression. This eliminates the classic dilemma between calling an expensive function twice or breaking list comprehensions into bulky multi-line loops.',
              vi: 'Toán tử walrus `:=` cho phép vừa gán giá trị vừa kiểm tra điều kiện, giúp giải quyết triệt để việc phải gọi hai lần hàm tính toán nặng.',
            },
            codeBlock: {
              language: 'python',
              filename: 'walrus_demo.py',
              code: `# Filter and transform without calling parse_payload twice
clean_events = [
    parsed
    for raw in incoming_stream
    if (parsed := parse_payload(raw)) is not None
]

# Clean chunk reading loop
while (chunk := socket_stream.read(4096)):
    process_network_chunk(chunk)`,
            },
          },
        ],
      },
      {
        id: 'pt-ch-4',
        number: 4,
        slug: 'context-managers-resource-safety',
        title: {
          en: 'Custom Context Managers & Resource Safety',
          vi: 'Quản Lý Tài Nguyên An Toàn Với Context Managers Tự Định Nghĩa',
        },
        summary: {
          en: 'Ensure locks, database connections, and temporary state are always safely released.',
          vi: 'Đảm bảo khóa lock, kết nối cơ sở dữ liệu và trạng thái tạm luôn được thu hồi an toàn.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'pt-4-1',
            title: {
              en: 'Simplifying with contextlib.contextmanager',
              vi: 'Đơn Giản Hóa Bằng contextlib.contextmanager',
            },
            content: {
              en: 'You do not need to create a full class with `__enter__` and `__exit__` for simple teardown logic. The `@contextmanager` generator decorator provides a clean, readable syntax.',
              vi: 'Không cần tạo một lớp đầy đủ với `__enter__` và `__exit__` cho tác vụ dọn dẹp đơn giản. Decorator `@contextmanager` cung cấp cú pháp generator rất trực quan.',
            },
            codeBlock: {
              language: 'python',
              filename: 'timer_context.py',
              code: `from contextlib import contextmanager
import time

@contextmanager
def execution_timer(task_label: str):
    start = time.perf_counter()
    try:
        yield
    finally:
        elapsed = (time.perf_counter() - start) * 1000
        print(f"[{task_label}] Finished in {elapsed:.2f}ms")

# Usage
with execution_timer("Matrix Inversion"):
    compute_heavy_linear_algebra()`,
            },
          },
        ],
      },
    ],
  },

  // 2. Python Common Errors
  {
    id: 'python-common-errors',
    slug: 'python-common-errors',
    title: 'Python Common Errors',
    subtitle: {
      en: 'Subtle Pitfalls, Gotchas, and Architectural Anti-Patterns',
      vi: 'Những Cạm Bẫy Ẩn, Sai Lầm Phổ Biến & Cách Phòng Tránh',
    },
    categoryId: 'cs',
    subjectId: 'programming',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '50 mins',
    chaptersCount: 4,
    publishedDate: '2025-01-20',
    accentColor: 'from-amber-500 to-rose-700',
    tags: ['Pitfalls', 'Debugging', 'Memory', 'Closures'],
    description: {
      en: 'An exhaustive analysis of deceptive bugs in Python: mutable default arguments, late-binding closures, exception masking, and shallow copy reference leaks.',
      vi: 'Phân tích chi tiết các lỗi tiềm ẩn nguy hiểm trong Python: tham số mặc định khả biến, closure late-binding, nuốt ngoại lệ và rò rỉ tham chiếu khi sao chép mảng.',
    },
    prerequisites: {
      en: ['Understanding of functions, objects, and references in Python'],
      vi: ['Hiểu về hàm, đối tượng và cơ chế tham chiếu trong Python'],
    },
    outcomes: {
      en: [
        'Prevent state contamination from mutable default arguments',
        'Master closure scope bindings inside loops',
        'Avoid masking critical tracebacks with bare except clauses',
      ],
      vi: [
        'Ngăn chặn nhiễm bẩn trạng thái từ tham số mặc định dạng mutable',
        'Khắc phục triệt để lỗi late-binding trong vòng lặp tạo hàm',
        'Xử lý ngoại lệ chuẩn xác, không làm mất stack trace',
      ],
    },
    chapters: [
      {
        id: 'pce-ch-1',
        number: 1,
        slug: 'mutable-default-arguments',
        title: {
          en: 'The Mutable Default Argument Trap',
          vi: 'Cạm Bẫy Tham Số Mặc Định Khả Biến (Mutable Defaults)',
        },
        summary: {
          en: 'Why def append_item(x, target=[]) creates a shared global list across calls.',
          vi: 'Tại sao def append_item(x, target=[]) lại tạo danh sách dùng chung qua mọi lần gọi hàm.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'pce-1-1',
            title: {
              en: 'Evaluation at Definition Time vs Call Time',
              vi: 'Thời Điểm Đánh Giá Lúc Định Nghĩa vs Thời Điểm Gọi Hàm',
            },
            content: {
              en: 'In Python, default parameter expressions are evaluated once when the function definition is executed, NOT each time the function is invoked. Using `[]` or `{}` binds a persistent reference into `func.__defaults__`.',
              vi: 'Trong Python, biểu thức tham số mặc định được tính toán MỘT LẦN DUY NHẤT lúc định nghĩa hàm, chứ không phải mỗi khi hàm được gọi. Dùng `[]` hay `{}` sẽ lưu tham chiếu dùng chung vào `func.__defaults__`.',
            },
            codeBlock: {
              language: 'python',
              filename: 'mutable_bug.py',
              code: `# ANTI-PATTERN: target persists across all callers!
def add_audit_log(entry: str, history: list = []):
    history.append(entry)
    return history

print(add_audit_log("User logged in"))  # ['User logged in']
print(add_audit_log("Password changed")) # ['User logged in', 'Password changed']!

# IDIOMATIC FIX: Use None sentinel
def add_audit_log_safe(entry: str, history: list | None = None):
    if history is None:
        history = []
    history.append(entry)
    return history`,
            },
          },
        ],
      },
      {
        id: 'pce-ch-2',
        number: 2,
        slug: 'late-binding-closures',
        title: {
          en: 'Late-Binding Closures in Loops',
          vi: 'Lỗi Đóng Gói Trễ (Late-Binding Closures) Trong Vòng Lặp',
        },
        summary: {
          en: 'Why lambdas created in loops always print the final index value.',
          vi: 'Tại sao các hàm lambda tạo trong vòng lặp luôn nhận giá trị của vòng lặp cuối cùng.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'pce-2-1',
            title: {
              en: 'Variable Lookup by Name, Not by Value',
              vi: 'Truy Cứu Biến Theo Tên Thay Vì Theo Giá Trị',
            },
            content: {
              en: "Python closures bind to variable names in the enclosing scope, not the value of the variable at the moment the lambda was created. When the lambda executes later, it looks up whatever value currently resides in the parent variable.",
              vi: 'Closure trong Python liên kết với tên biến ở phạm vi bao quanh chứ không chụp giá trị tại thời điểm tạo hàm. Khi hàm chạy, nó sẽ đọc giá trị hiện tại của biến đó.',
            },
            codeBlock: {
              language: 'python',
              filename: 'late_binding.py',
              code: `# BUG: All functions return 4 * 2 = 8!
multipliers = [lambda x: x * i for i in range(5)]
print([m(2) for m in multipliers]) # [8, 8, 8, 8, 8]

# FIX: Force early binding using default parameter capture
fixed_multipliers = [lambda x, i=i: x * i for i in range(5)]
print([m(2) for m in fixed_multipliers]) # [0, 2, 4, 6, 8]`,
            },
          },
        ],
      },
      {
        id: 'pce-ch-3',
        number: 3,
        slug: 'shallow-vs-deep-copy',
        title: {
          en: 'Shallow vs Deep Copy Reference Leaks',
          vi: 'Sự Khác Biệt Giữa Shallow Copy Và Deep Copy',
        },
        summary: {
          en: 'Understand how list.copy() and slices share nested object memory.',
          vi: 'Hiểu cách list.copy() và lát cắt sao chép nông vẫn chia sẻ đối tượng con bên trong.',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'pce-3-1',
            title: {
              en: 'Mutating Nested Containers',
              vi: 'Biến Đổi Phần Tử Con Trong Danh Sách Đa Chiều',
            },
            content: {
              en: 'A shallow copy constructs a new collection, but inserts references to the identical child objects found in the original. Modifying inner nested structures mutates both instances.',
              vi: 'Shallow copy tạo ra vỏ ngoài mới nhưng các phần tử lồng bên trong vẫn trỏ cùng ô nhớ với bản gốc. Sửa phần tử con sẽ làm biến đổi cả hai danh sách.',
            },
            codeBlock: {
              language: 'python',
              filename: 'copy_demo.py',
              code: `import copy

original = [{"task": "deploy", "done": False}]
shallow = original.copy()

# Mutating nested dict affects BOTH!
shallow[0]["done"] = True
print(original[0]["done"]) # True!

# Deep copy clones the entire recursive tree
independent = copy.deepcopy(original)
independent[0]["done"] = False
print(original[0]["done"]) # True (independent)`,
            },
          },
        ],
      },
      {
        id: 'pce-ch-4',
        number: 4,
        slug: 'exception-anti-patterns',
        title: {
          en: 'Exception Anti-Patterns & Traceback Preservation',
          vi: 'Sai Lầm Xử Lý Ngoại Lệ & Giữ Trọn Vẹn Stack Trace',
        },
        summary: {
          en: 'Avoid bare except clauses and use raise from to link causal chains.',
          vi: 'Tránh dùng except trơ trọi và sử dụng cú pháp raise from để chuỗi lỗi rõ ràng.',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'pce-4-1',
            title: {
              en: 'Explicit Exception Chaining with "raise from"',
              vi: 'Nối Chuỗi Ngoại Lệ Tường Minh Với "raise from"',
            },
            content: {
              en: 'When translating low-level library exceptions into domain errors, always use `raise CustomDomainError() from err` so debugging tools retain the original root cause.',
              vi: 'Khi chuyển đổi ngoại lệ cấp thấp thành lỗi nghiệp vụ, hãy luôn dùng `raise CustomDomainError() from err` để giữ nguyên nguyên nhân gốc rễ phục vụ điều tra lỗi.',
            },
            codeBlock: {
              language: 'python',
              filename: 'exception_chaining.py',
              code: `class DatabaseQueryTimeout(Exception):
    pass

def fetch_user_record(uid: int):
    try:
        return raw_socket.query(f"SELECT * FROM users WHERE id={uid}")
    except TimeoutError as err:
        # Connects the cause explicitly in the traceback
        raise DatabaseQueryTimeout(f"Query timed out for user {uid}") from err`,
            },
          },
        ],
      },
    ],
  },

  // 3. Python Concepts
  {
    id: 'python-concepts',
    slug: 'python-concepts',
    title: 'Python Concepts',
    subtitle: {
      en: 'The Data Model, Dunder Protocols, Memory & Event Loop',
      vi: 'Mô Hình Dữ Liệu, Dunder Methods, Quản Lý Bộ Nhớ & Event Loop',
    },
    categoryId: 'cs',
    subjectId: 'programming',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '65 mins',
    chaptersCount: 4,
    publishedDate: '2025-01-25',
    accentColor: 'from-blue-600 to-indigo-800',
    tags: ['Data Model', 'Metaprogramming', 'AsyncIO', 'Memory'],
    description: {
      en: 'Deep-dive into Python’s fundamental runtime mechanics: how the Python Data Model powers operator overloading, the lifecycle of iterators/generators, and asyncio event loops.',
      vi: 'Khám phá sâu cơ chế runtime của Python: mô hình Data Model điều khiển nạp chồng toán tử, vòng đời của generator/iterator và cách hoạt động của asyncio event loop.',
    },
    prerequisites: {
      en: ['Intermediate Python experience (OOP, basic decorators, functions)'],
      vi: ['Kinh nghiệm Python trung cấp (OOP, decorators cơ bản, hàm)'],
    },
    outcomes: {
      en: [
        'Harness special dunder methods (__getitem__, __enter__, __repr__)',
        'Understand memory efficiency with generators and yield statements',
        'Demystify single-threaded cooperative multitasking with asyncio',
      ],
      vi: [
        'Làm chủ các dunder method (__getitem__, __enter__, __repr__)',
        'Tiết kiệm bộ nhớ với cơ chế stream của generator và yield',
        'Nắm vững đa nhiệm đơn luồng cooperative với asyncio',
      ],
    },
    chapters: [
      {
        id: 'pc-ch-1',
        number: 1,
        slug: 'python-data-model',
        title: {
          en: 'The Python Data Model & Special Methods',
          vi: 'Mô Hình Python Data Model & Các Phương Thức Đặc Biệt',
        },
        summary: {
          en: 'How the language runtime delegates core behavior to double-underscore methods.',
          vi: 'Cách runtime của Python ánh xạ hành vi cú pháp thành các phương thức gạch dưới kép.',
        },
        readTimeMinutes: 16,
        sections: [
          {
            id: 'pc-1-1',
            title: {
              en: 'Building First-Class Sequence Objects',
              vi: 'Tạo Đối Tượng Chuỗi Chuẩn Mực (Sequence Protocol)',
            },
            content: {
              en: 'By implementing just `__len__` and `__getitem__`, your custom class immediately gains indexing, slicing, iteration, and membership checking with `in` automatically.',
              vi: 'Chỉ cần hiện thực hai phương thức `__len__` và `__getitem__`, lớp của bạn sẽ tự động hỗ trợ đánh chỉ số, cắt lát, duyệt qua vòng for và toán tử `in`.',
            },
            codeBlock: {
              language: 'python',
              filename: 'deck.py',
              code: `import collections

Card = collections.namedtuple('Card', ['rank', 'suit'])

class FrenchDeck:
    ranks = [str(n) for n in range(2, 11)] + list('JQKA')
    suits = ['spades', 'diamonds', 'clubs', 'hearts']

    def __init__(self):
        self._cards = [Card(rank, suit) for suit in self.suits for rank in self.ranks]

    def __len__(self):
        return len(self._cards)

    def __getitem__(self, position):
        return self._cards[position]

deck = FrenchDeck()
print(len(deck))       # 52
print(deck[0])         # Card(rank='2', suit='spades')
print(Card('Q', 'hearts') in deck) # True!`,
            },
          },
        ],
      },
      {
        id: 'pc-ch-2',
        number: 2,
        slug: 'generators-iterators-memory',
        title: {
          en: 'Generators, Iterators & Memory Streaming',
          vi: 'Generators, Iterators & Xử Lý Dữ Liệu Dạng Luồng',
        },
        summary: {
          en: 'Process multi-gigabyte datasets with constant O(1) memory consumption.',
          vi: 'Xử lý tập dữ liệu nhiều gigabyte với mức tiêu thụ bộ nhớ O(1) không đổi.',
        },
        readTimeMinutes: 16,
        sections: [
          {
            id: 'pc-2-1',
            title: {
              en: 'Pipelined Generator Expressions',
              vi: 'Đường Ống Xử Lý Dữ Liệu Bằng Generator Expressions',
            },
            content: {
              en: 'Unlike list comprehensions that load the entire dataset into RAM at once, generator expressions evaluate lazily on-demand, enabling pipeline processing of large files.',
              vi: 'Khác với list comprehension tải toàn bộ dữ liệu vào RAM, generator tính toán từng phần tử khi được yêu cầu, cho phép tạo đường ống xử lý file khổng lồ.',
            },
            codeBlock: {
              language: 'python',
              filename: 'stream_logs.py',
              code: `def stream_log_lines(file_path: str):
    with open(file_path, "r", encoding="utf-8") as f:
        for line in f:
            yield line

# Pipeline: stream -> filter 500 errors -> extract IP
raw_lines = stream_log_lines("/var/log/nginx/access.log")
error_lines = (line for line in raw_lines if " 500 " in line)
client_ips = (line.split()[0] for line in error_lines)

# Memory remains ~15MB even on a 50GB file!
for ip in client_ips:
    alert_security_team(ip)`,
            },
          },
        ],
      },
      {
        id: 'pc-ch-3',
        number: 3,
        slug: 'asyncio-and-event-loop',
        title: {
          en: 'AsyncIO Internals & The Cooperative Event Loop',
          vi: 'Bản Chất AsyncIO & Cơ Chế Cooperative Event Loop',
        },
        summary: {
          en: 'How coroutines yield execution at I/O boundaries without OS thread overhead.',
          vi: 'Cách coroutine nhường quyền điều khiển khi chờ I/O mà không tốn chi phí luồng của OS.',
        },
        readTimeMinutes: 17,
        sections: [
          {
            id: 'pc-3-1',
            title: {
              en: 'Task Scheduling and TaskGroup (Python 3.11+)',
              vi: 'Điều Phối Tác Vụ Và TaskGroup Chuẩn Mực (Python 3.11+)',
            },
            content: {
              en: 'Python 3.11 introduced `asyncio.TaskGroup`, implementing structured concurrency to guarantee that if one subtask crashes, all other sister tasks are cleanly cancelled.',
              vi: 'Python 3.11 giới thiệu `asyncio.TaskGroup`, hiện thực lập trình bất đồng bộ có cấu trúc để đảm bảo nếu một task con bị lỗi, các task song song khác sẽ được hủy an toàn.',
            },
            codeBlock: {
              language: 'python',
              filename: 'structured_async.py',
              code: `import asyncio

async def query_service(endpoint: str) -> dict:
    await asyncio.sleep(0.05) # Simulating I/O
    return {"endpoint": endpoint, "status": "ok"}

async def fetch_all_telemetry():
    # Structured concurrency with TaskGroup
    async with asyncio.TaskGroup() as tg:
        t1 = tg.create_task(query_service("/metrics"))
        t2 = tg.create_task(query_service("/health"))
        t3 = tg.create_task(query_service("/cluster"))

    # Both results are guaranteed complete here
    return [t1.result(), t2.result(), t3.result()]`,
            },
          },
        ],
      },
      {
        id: 'pc-ch-4',
        number: 4,
        slug: 'metaclasses-and-class-creation',
        title: {
          en: 'Metaclasses & Class Construction Hooks',
          vi: 'Metaclasses & Can Thiệp Quá Trình Tạo Lớp',
        },
        summary: {
          en: 'Understand how __init_subclass__ replaces complex metaclasses in modern frameworks.',
          vi: 'Hiểu cách __init_subclass__ thay thế metaclass phức tạp trong các framework hiện đại.',
        },
        readTimeMinutes: 16,
        sections: [
          {
            id: 'pc-4-1',
            title: {
              en: 'Automatic Plugin Registration with __init_subclass__',
              vi: 'Tự Động Đăng Ký Plugin Bằng __init_subclass__',
            },
            content: {
              en: 'Introduced in Python 3.6, `__init_subclass__` provides an elegant, readable alternative to writing custom metaclasses when registering subclasses into an ecosystem registry.',
              vi: 'Được giới thiệu từ Python 3.6, `__init_subclass__` giúp tự động đăng ký các lớp con vào hệ thống registry mà không cần viết metaclass rườm rà.',
            },
            codeBlock: {
              language: 'python',
              filename: 'plugin_registry.py',
              code: `class Connector:
    registry: dict[str, type["Connector"]] = {}

    def __init_subclass__(cls, connector_type: str, **kwargs):
        super().__init_subclass__(**kwargs)
        cls.registry[connector_type] = cls

class PostgresConnector(Connector, connector_type="postgresql"):
    pass

class RedisConnector(Connector, connector_type="redis"):
    pass

print(Connector.registry)
# {'postgresql': <class 'PostgresConnector'>, 'redis': <class 'RedisConnector'>}`,
            },
          },
        ],
      },
    ],
  },

  // 4. Python Guides
  {
    id: 'python-guides',
    slug: 'python-guides',
    title: 'Python Guides',
    subtitle: {
      en: 'Production Packaging, Modern Typing, & Strict Pytest Architecture',
      vi: 'Đóng Gói Dự Án Chuẩn Sản Xuất, Type Hints Hiện Đại & Kiểm Thử Pytest',
    },
    categoryId: 'cs',
    subjectId: 'programming',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Advanced',
    estimatedReadTime: '60 mins',
    chaptersCount: 4,
    publishedDate: '2025-02-01',
    accentColor: 'from-violet-600 to-purple-900',
    tags: ['Packaging', 'Type Hints', 'Pytest', 'pyproject.toml'],
    description: {
      en: 'Comprehensive blueprints for engineering enterprise-grade Python software: modern pyproject.toml configuration, static type safety with strict MyPy, and robust test suites.',
      vi: 'Hướng dẫn toàn diện để xây dựng phần mềm Python cấp doanh nghiệp: cấu hình pyproject.toml chuẩn hóa, type safety nghiêm ngặt với MyPy và kiểm thử tin cậy cùng Pytest.',
    },
    prerequisites: {
      en: ['Experience deploying Python applications or maintaining packages'],
      vi: ['Kinh nghiệm triển khai ứng dụng Python hoặc phát triển thư viện'],
    },
    outcomes: {
      en: [
        'Configure standardized pyproject.toml builds without setup.py',
        'Apply generic types, Protocols, and TypeGuards for airtight static safety',
        'Structure isolated, fixture-driven unit and integration test suites',
      ],
      vi: [
        'Cấu hình đóng gói chuẩn pyproject.toml thay thế setup.py cũ',
        'Áp dụng generic types, Protocol và TypeGuard tăng cường kiểm tra kiểu',
        'Tổ chức hệ thống kiểm thử đơn vị và tích hợp sạch sẽ với fixtures',
      ],
    },
    chapters: [
      {
        id: 'pg-ch-1',
        number: 1,
        slug: 'modern-pyproject-toml',
        title: {
          en: 'Modern Packaging with pyproject.toml',
          vi: 'Đóng Gói Dự Án Chuẩn Hóa Với pyproject.toml',
        },
        summary: {
          en: 'Eliminate legacy setup.py in favor of PEP 517 / PEP 621 declarative configuration.',
          vi: 'Loại bỏ file setup.py cũ để chuyển sang cấu hình khai báo chuẩn PEP 517 / PEP 621.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'pg-1-1',
            title: {
              en: 'Declarative Package Metadata',
              vi: 'Khai Báo Metadata Dự Án Rõ Ràng',
            },
            content: {
              en: 'Modern Python tooling consolidates build systems, dependencies, linters (Ruff, Flake8), and test runners into a single, unified `pyproject.toml` file.',
              vi: 'Hệ sinh thái Python hiện đại gom toàn bộ cấu hình build, dependencies, linter và test runner vào một file duy nhất `pyproject.toml`.',
            },
            codeBlock: {
              language: 'toml',
              filename: 'pyproject.toml',
              code: `[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "fourtm-core"
version = "1.0.0"
description = "High-performance ecosystem runtime primitives"
readme = "README.md"
requires-python = ">=3.11"
dependencies = [
    "pydantic>=2.7.0",
    "httpx>=0.27.0",
]

[project.scripts]
fourtm = "fourtm.cli:main"`,
            },
          },
        ],
      },
      {
        id: 'pg-ch-2',
        number: 2,
        slug: 'type-hints-and-protocols',
        title: {
          en: 'Strict Type Hints, Protocols & Structural Subtyping',
          vi: 'Hệ Thống Type Hints Nghiêm Ngặt & Structural Subtyping Với Protocol',
        },
        summary: {
          en: 'Static duck-typing with typing.Protocol to decouple interfaces from implementations.',
          vi: 'Hiện thực static duck-typing bằng typing.Protocol giúp tách biệt giao diện và mã cài đặt.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'pg-2-1',
            title: {
              en: 'Decoupling Interfaces with Protocol',
              vi: 'Tách Biệt Interface Khỏi Lớp Cụ Thể Bằng Protocol',
            },
            content: {
              en: 'Instead of forcing classes to inherit from an abstract base class, `typing.Protocol` checks compatibility structurally at static analysis time, allowing third-party classes to satisfy your interface seamlessly.',
              vi: 'Thay vì ép các lớp phải kế thừa từ abstract base class, `typing.Protocol` kiểm tra sự tương thích cấu trúc lúc kiểm tra tĩnh, giúp code linh hoạt hơn rất nhiều.',
            },
            codeBlock: {
              language: 'python',
              filename: 'storage_protocol.py',
              code: `from typing import Protocol, runtime_checkable

@runtime_checkable
class PersistentStorage(Protocol):
    def read_bytes(self, key: str) -> bytes: ...
    def write_bytes(self, key: str, payload: bytes) -> None: ...

# Any object with these two methods automatically matches
class S3Store:
    def read_bytes(self, key: str) -> bytes:
        return b"file data"
    def write_bytes(self, key: str, payload: bytes) -> None:
        pass

def backup_data(store: PersistentStorage):
    store.write_bytes("backup.tar", b"...")`,
            },
          },
        ],
      },
      {
        id: 'pg-ch-3',
        number: 3,
        slug: 'enterprise-pytest-patterns',
        title: {
          en: 'Enterprise Test Automation with Pytest',
          vi: 'Tự Động Hóa Kiểm Thử Doanh Nghiệp Với Pytest',
        },
        summary: {
          en: 'Scoped fixtures, database rollback transactions, and parameterized test matrices.',
          vi: 'Fixtures theo phạm vi, giao dịch rollback cơ sở dữ liệu và ma trận kiểm thử tham số hóa.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'pg-3-1',
            title: {
              en: 'Parameterized Edge Case Testing',
              vi: 'Kiểm Thử Hàng Loạt Trường Hợp Biên Với @pytest.mark.parametrize',
            },
            content: {
              en: 'Verify dozens of input variations, edge cases, and failure modes in a single concise test function with `@pytest.mark.parametrize`.',
              vi: 'Kiểm tra hàng chục tổ hợp đầu vào và trường hợp biên trong một hàm test duy nhất bằng decorator `@pytest.mark.parametrize`.',
            },
            codeBlock: {
              language: 'python',
              filename: 'test_token_exchange.py',
              code: `import pytest

@pytest.mark.parametrize("ticket,expected_valid", [
    ("valid_ticket_123", True),
    ("", False),
    ("expired_ticket_456", False),
    ("tampered_state_789", False),
])
def test_ticket_verification_matrix(ticket, expected_valid):
    result = verify_incoming_sso_ticket(ticket)
    assert result.is_valid == expected_valid`,
            },
          },
        ],
      },
      {
        id: 'pg-ch-4',
        number: 4,
        slug: 'concurrency-performance-profiling',
        title: {
          en: 'Performance Profiling & Memory Leak Detection',
          vi: 'Đo Lường Hiệu Năng & Phát Hiện Rò Rỉ Bộ Nhớ',
        },
        summary: {
          en: 'Use cProfile, memory_profiler, and tracemalloc to isolate bottlenecks.',
          vi: 'Sử dụng cProfile, tracemalloc để tìm chính xác điểm nghẽn và rò rỉ RAM.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'pg-4-1',
            title: {
              en: 'Tracking Allocation Spikes with tracemalloc',
              vi: 'Theo Dõi Đột Biến Phân Bổ RAM Bằng tracemalloc',
            },
            content: {
              en: 'Python’s standard library module `tracemalloc` allows you to take memory snapshots before and after high-throughput operations to pinpoint exact file and line numbers creating uncollected objects.',
              vi: 'Module `tracemalloc` trong thư viện chuẩn cho phép chụp ảnh trạng thái bộ nhớ trước và sau khi xử lý tác vụ nặng để chỉ ra chính xác dòng code gây tốn RAM.',
            },
            codeBlock: {
              language: 'python',
              filename: 'profile_memory.py',
              code: `import tracemalloc

tracemalloc.start()
snapshot_start = tracemalloc.take_snapshot()

# Run suspected memory-heavy operation
records = generate_large_report_in_memory()

snapshot_end = tracemalloc.take_snapshot()
top_stats = snapshot_end.compare_to(snapshot_start, 'lineno')

for stat in top_stats[:5]:
    print(stat)`,
            },
          },
        ],
      },
    ],
  },
];
