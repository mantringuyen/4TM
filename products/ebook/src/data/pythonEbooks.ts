import { Book } from '../types';

export const PYTHON_EBOOKS: Book[] = [
  // 1. Python Handbook
  {
    id: 'python-handbook',
    slug: 'python-handbook',
    title: 'Python Handbook',
    subtitle: {
      en: 'Core Language Mechanics, Standard Library & Modern Syntax',
      vi: 'Cơ Chế Ngôn Ngữ Cốt Lõi, Thư Viện Chuẩn & Cú Pháp Hiện Đại',
    },
    bookType: 'Handbook',
    categoryId: 'python',
    subjectId: 'programming',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '40 mins',
    chaptersCount: 3,
    publishedDate: '2025-02-10',
    accentColor: 'from-blue-500 to-indigo-700',
    tags: ['Python 3.12+', 'Language Fundamentals', 'Standard Library', 'Core Runtime'],
    description: {
      en: 'Comprehensive reference manual covering Python bytecode execution, dynamic typing, core primitives, and built-in datatypes.',
      vi: 'Sách hướng dẫn toàn diện về cơ chế thực thi bytecode, định kiểu động, các kiểu dữ liệu nguyên thủy và cấu trúc dữ liệu tích hợp trong Python.',
    },
    prerequisites: {
      en: ['Basic programming knowledge'],
      vi: ['Kiến thức lập trình cơ bản'],
    },
    outcomes: {
      en: [
        'Understand Python interpreter lifecycle and bytecode compilation',
        'Leverage built-in data structures efficiently',
        'Write modular Python code using standard packages',
      ],
      vi: [
        'Nắm vững vòng đời trình thông dịch và biên dịch bytecode của Python',
        'Sử dụng tối ưu các cấu trúc dữ liệu tích hợp sẵn',
        'Viết mã Python mô-đun hóa sử dụng thư viện chuẩn',
      ],
    },
    chapters: [
      {
        id: 'py-hb-ch-1',
        number: 1,
        slug: 'python-execution-model',
        title: {
          en: 'The Python Execution Model & Bytecode',
          vi: 'Mô Hình Thực Thi Python & Bytecode',
        },
        summary: {
          en: 'How Python source code compiles to bytecode and executes on the CPython virtual machine.',
          vi: 'Cách mã nguồn Python được biên dịch sang bytecode và chạy trên máy ảo CPython.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'py-hb-1-1',
            title: {
              en: 'CPython VM & Compilation Steps',
              vi: 'Trình Thông Dịch CPython & Các Bước Biên Dịch',
            },
            content: {
              en: 'When running a script, Python compiles `.py` files into `.pyc` bytecode instructions. The CPython Virtual Machine uses a stack-based evaluation loop (`ceval.c`) to execute these instructions.',
              vi: 'Khi chạy kịch bản, Python biên dịch file `.py` thành các lệnh bytecode trong file `.pyc`. Máy ảo CPython sử dụng vòng lặp dựa trên stack (`ceval.c`) để thực thi các lệnh này.',
            },
            codeBlock: {
              language: 'python',
              filename: 'inspect_bytecode.py',
              code: `import dis

def calculate_total(price: float, tax: float) -> float:
    return price * (1 + tax)

# Disassemble function into CPython bytecode instructions
dis.dis(calculate_total)`,
              explanation: {
                en: '`dis.dis()` prints raw CPython opcodes like BINARY_OP and RETURN_VALUE.',
                vi: 'Hàm `dis.dis()` hiển thị các opcode CPython nguyên bản như BINARY_OP và RETURN_VALUE.',
              },
            },
            keyTakeaways: {
              en: [
                'Python is compiled to bytecode before interpretation',
                'CPython uses a stack-based virtual machine',
              ],
              vi: [
                'Python được biên dịch sang bytecode trước khi thông dịch',
                'CPython vận hành theo cơ chế máy ảo dựa trên stack',
              ],
            },
          },
        ],
      },
      {
        id: 'py-hb-ch-2',
        number: 2,
        slug: 'python-primitives-and-containers',
        title: {
          en: 'Primitive Types & Built-In Containers',
          vi: 'Kiểu Dữ Liệu Nguyên Thủy & Cấu Trúc Chứa',
        },
        summary: {
          en: 'In-depth reference for int, float, str, list, tuple, dict, and set behaviors.',
          vi: 'Tài liệu tra cứu chi tiết về int, float, str, list, tuple, dict và set.',
        },
        readTimeMinutes: 14,
        sections: [
          {
            id: 'py-hb-2-1',
            title: {
              en: 'Mutability and Memory Allocation',
              vi: 'Tính Khả Biến Và Phân Bổ Bộ Nhớ',
            },
            content: {
              en: 'In Python, everything is an object. Immutable primitives (int, str, tuple) cannot be altered after creation, whereas mutable objects (list, dict, set) allow in-place modification.',
              vi: 'Trong Python, tất cả mọi thứ đều là đối tượng. Các kiểu bất biến (int, str, tuple) không thể thay đổi sau khi tạo, trong khi các đối tượng khả biến (list, dict, set) cho phép chỉnh sửa tại chỗ.',
            },
            codeBlock: {
              language: 'python',
              filename: 'mutability.py',
              code: `a = [1, 2, 3]
b = a  # Shared reference
b.append(4)
print(a)  # [1, 2, 3, 4] - mutated in place!`,
            },
          },
        ],
      },
      {
        id: 'py-hb-ch-3',
        number: 3,
        slug: 'python-modules-packages',
        title: {
          en: 'Modules, Imports & Namespace Resolution',
          vi: 'Modules, Imports & Quy Tắc Phân Giải Namespace',
        },
        summary: {
          en: 'How sys.path, sys.modules, and package imports resolve symbols at runtime.',
          vi: 'Cách sys.path, sys.modules và package import tìm kiếm symbol lúc runtime.',
        },
        readTimeMinutes: 14,
        sections: [
          {
            id: 'py-hb-3-1',
            title: {
              en: 'Absolute vs Relative Imports',
              vi: 'Import Tuyệt Đối vs Import Tương Đối',
            },
            content: {
              en: 'Absolute imports specify the full path from the project root directory, avoiding ambiguity. Relative imports use leading dots (`.`) to import relative to the current module location.',
              vi: 'Import tuyệt đối chỉ rõ đường dẫn từ thư mục gốc dự án, tránh mơ hồ. Import tương đối dùng dấu chấm (`.`) để import theo vị trí module hiện tại.',
            },
          },
        ],
      },
    ],
  },

  // 2. Python Definitions
  {
    id: 'python-definitions',
    slug: 'python-definitions',
    title: 'Python Definitions',
    subtitle: {
      en: 'Essential Terminology, Keyword Glossary & Concept Definitions',
      vi: 'Thuật Ngữ Cốt Lõi, Từ Khóa & Định Nghĩa Trọng Tâm Trong Python',
    },
    bookType: 'Definitions',
    categoryId: 'python',
    subjectId: 'programming',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '25 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-12',
    accentColor: 'from-cyan-500 to-blue-700',
    tags: ['Definitions', 'Glossary', 'Terminology', 'Reference'],
    description: {
      en: 'Clear reference definitions for Python core terms: GIL, Duck Typing, LEGB Scope, Dunder Methods, and Memory Pointers.',
      vi: 'Từ điển giải thích chuẩn xác các thuật ngữ Python: GIL, Duck Typing, Phạm vi LEGB, Dunder Methods và Tham chiếu bộ nhớ.',
    },
    prerequisites: {
      en: ['Basic familiarity with Python syntax'],
      vi: ['Làm quen cơ bản với cú pháp Python'],
    },
    outcomes: {
      en: ['Master essential Python terminology for technical interviews and code reviews'],
      vi: ['Làm chủ các thuật ngữ Python quan trọng phục vụ phỏng vấn và code review'],
    },
    chapters: [
      {
        id: 'py-def-ch-1',
        number: 1,
        slug: 'core-runtime-definitions',
        title: {
          en: 'Core Runtime & Scope Definitions',
          vi: 'Định Nghĩa Core Runtime & Scope',
        },
        summary: {
          en: 'GIL, LEGB Scope Rule, Duck Typing, and First-Class Functions.',
          vi: 'GIL, Quy tắc LEGB Scope, Duck Typing và First-Class Functions.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'py-def-1-1',
            title: {
              en: 'GIL (Global Interpreter Lock)',
              vi: 'GIL (Global Interpreter Lock)',
            },
            content: {
              en: 'GIL is a mutex that protects access to Python objects, preventing multiple native threads from executing CPython bytecodes in parallel on multiple CPU cores.',
              vi: 'GIL (Global Interpreter Lock) là một khóa mutex bảo vệ quyền truy cập đối tượng Python, ngăn nhiều native thread thực thi CPython bytecode cùng lúc trên nhiều lõi CPU.',
            },
          },
          {
            id: 'py-def-1-2',
            title: {
              en: 'LEGB Scope Rule',
              vi: 'Quy Tắc Phạm Vi LEGB',
            },
            content: {
              en: 'LEGB defines the variable lookup hierarchy: Local → Enclosing → Global → Built-in.',
              vi: 'LEGB định nghĩa thứ tự tìm kiếm biến: Local (Cục bộ) → Enclosing (Bao quanh) → Global (Toàn cục) → Built-in (Tích hợp sẵn).',
            },
          },
        ],
      },
      {
        id: 'py-def-ch-2',
        number: 2,
        slug: 'object-model-definitions',
        title: {
          en: 'Object Model & Type Terminology',
          vi: 'Mô Hình Đối Tượng & Thuật Ngữ Kiểu',
        },
        summary: {
          en: 'Dunder Methods, MRO (Method Resolution Order), and Garbage Collection.',
          vi: 'Dunder Methods, MRO (Thứ tự phân giải phương thức) và Garbage Collection.',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'py-def-2-1',
            title: {
              en: 'MRO (Method Resolution Order)',
              vi: 'MRO (Method Resolution Order)',
            },
            content: {
              en: 'MRO determines the order in which Python searches parent classes for a method during inheritance, calculated using C3 Linearization order.',
              vi: 'MRO quyết định thứ tự Python tìm kiếm phương thức ở các lớp cha khi kế thừa, được xác định qua cơ chế C3 Linearization.',
            },
          },
        ],
      },
    ],
  },

  // 3. Python Tips
  {
    id: 'python-tips',
    slug: 'python-tips',
    title: 'Python Tips',
    subtitle: {
      en: 'Idiomatic Patterns & Modern High-Performance Techniques',
      vi: 'Kỹ Thuật Viết Code Python Tối Ưu & Chuẩn Idiomatic Hiện Đại',
    },
    bookType: 'Tips',
    categoryId: 'python',
    subjectId: 'programming',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '35 mins',
    chaptersCount: 3,
    publishedDate: '2025-01-15',
    accentColor: 'from-emerald-500 to-teal-700',
    tags: ['Python 3.12+', 'Idioms', 'Performance', 'Clean Code'],
    description: {
      en: 'Practical tips, unpacking tricks, walrus operator usage, and context managers for writing clean Python code.',
      vi: 'Các mẹo thực chiến, kỹ thuật unpacking, sử dụng toán tử walrus và context manager giúp viết code Python sạch đẹp.',
    },
    prerequisites: {
      en: ['Basic knowledge of Python syntax'],
      vi: ['Kiến thức cú pháp Python cơ bản'],
    },
    outcomes: {
      en: [
        'Master list & dict comprehensions without memory blowups',
        'Leverage walrus operators (:=) and match statements effectively',
      ],
      vi: [
        'Làm chủ list & dict comprehensions mà không gây quá tải bộ nhớ',
        'Sử dụng toán tử gán walrus (:=) và cú pháp match hiệu quả',
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
          en: 'Eliminate index lookups and simplify complex multi-value data extraction with star unpacking.',
          vi: 'Loại bỏ việc truy cập mảng qua chỉ số và đơn giản hóa bóc tách dữ liệu với star unpacking.',
        },
        readTimeMinutes: 10,
        sections: [
          {
            id: 'pt-1-1',
            title: {
              en: 'Star Unpacking for Sequences',
              vi: 'Kỹ Thuật Star Unpacking Dãy Số',
            },
            content: {
              en: 'Use the starred operator `*` to capture head, middle, or tail sequences cleanly in single line assignments.',
              vi: 'Sử dụng toán tử dấu sao `*` để gom phần tử đầu, giữa hoặc cuối danh sách trong một dòng lệnh.',
            },
            codeBlock: {
              language: 'python',
              filename: 'unpack.py',
              code: `first, *middle, last = [10, 20, 30, 40, 50]
print(first, middle, last)  # 10 [20, 30, 40] 50`,
            },
          },
        ],
      },
      {
        id: 'pt-ch-2',
        number: 2,
        slug: 'walrus-operator-tips',
        title: {
          en: 'Assignment Expressions (Walrus Operator :=)',
          vi: 'Biểu Thức Gán Với Toán Tử Walrus (:=)',
        },
        summary: {
          en: 'Avoid redundant function calls in while loops and list comprehensions.',
          vi: 'Tránh gọi lặp hàm tốn kém trong vòng lặp while và comprehension.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'pt-2-1',
            title: {
              en: 'Filter and Compute Simultaneously',
              vi: 'Vừa Tính Toán Vừa Lọc Dữ Liệu',
            },
            content: {
              en: 'Assign values to variables inside conditional checks to streamline parsing pipelines.',
              vi: 'Gán giá trị vào biến ngay trong câu lệnh điều kiện để tinh gọn quy trình parse dữ liệu.',
            },
            codeBlock: {
              language: 'python',
              filename: 'walrus.py',
              code: `results = [
    data for raw in stream
    if (data := process(raw)) is not None
]`,
            },
          },
        ],
      },
      {
        id: 'pt-ch-3',
        number: 3,
        slug: 'dict-merge-and-lookup',
        title: {
          en: 'Dictionary Merge & High-Speed Lookups',
          vi: 'Gộp Từ Điển & Tra Cứu Tốc Độ Cao',
        },
        summary: {
          en: 'Use modern union operators (|) and set operations for fast evaluation.',
          vi: 'Sử dụng toán tử hợp (|) và phép toán tập hợp để xử lý nhanh.',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'pt-3-1',
            title: {
              en: 'Non-Destructive Dict Union',
              vi: 'Gộp Từ Điển Không Biến Đổi Data Gốc',
            },
            content: {
              en: 'Python 3.9+ introduced the `|` operator for non-destructive dictionary merges.',
              vi: 'Python 3.9+ hỗ trợ toán tử `|` để gộp hai từ điển mà không biến đổi dữ liệu ban đầu.',
            },
          },
        ],
      },
    ],
  },

  // 4. Python Common Errors
  {
    id: 'python-common-errors',
    slug: 'python-common-errors',
    title: 'Python Common Errors',
    subtitle: {
      en: 'Subtle Pitfalls, Gotchas, and Architectural Anti-Patterns',
      vi: 'Những Cạm Bẫy Ẩn, Sai Lầm Phổ Biến & Cách Phòng Tránh',
    },
    bookType: 'Common Errors',
    categoryId: 'python',
    subjectId: 'programming',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '35 mins',
    chaptersCount: 3,
    publishedDate: '2025-01-20',
    accentColor: 'from-amber-500 to-rose-700',
    tags: ['Pitfalls', 'Debugging', 'Memory', 'Closures'],
    description: {
      en: 'Analysis of deceptive bugs in Python: mutable default arguments, late-binding closures, and shallow copy reference leaks.',
      vi: 'Phân tích chi tiết các lỗi tiềm ẩn nguy hiểm trong Python: tham số mặc định khả biến, closure late-binding và sao chép nông.',
    },
    prerequisites: {
      en: ['Understanding of functions and references in Python'],
      vi: ['Hiểu về hàm và cơ chế tham chiếu trong Python'],
    },
    outcomes: {
      en: [
        'Prevent state contamination from mutable default arguments',
        'Master closure scope bindings inside loops',
      ],
      vi: [
        'Ngăn chặn nhiễm bẩn trạng thái từ tham số mặc định dạng mutable',
        'Khắc phục triệt để lỗi late-binding trong vòng lặp tạo hàm',
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
              en: 'Definition Time vs Call Time Evaluation',
              vi: 'Thời Điểm Định Nghĩa vs Thời Điểm Gọi Hàm',
            },
            content: {
              en: 'Default argument expressions are evaluated ONCE when the function is defined, NOT on invocation. Use `None` sentinel pattern instead.',
              vi: 'Biểu thức tham số mặc định được tính toán MỘT LẦN duy nhất khi định nghĩa hàm. Hãy sử dụng mẫu `None` sentinel để khắc phục.',
            },
            codeBlock: {
              language: 'python',
              filename: 'mutable_fix.py',
              code: `# SAFE IDIOM:
def add_entry(item: str, target_list: list | None = None):
    if target_list is None:
        target_list = []
    target_list.append(item)
    return target_list`,
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
        readTimeMinutes: 11,
        sections: [
          {
            id: 'pce-2-1',
            title: {
              en: 'Binding by Variable Name vs Value',
              vi: 'Liên Kết Biến Theo Tên vs Giá Trị',
            },
            content: {
              en: 'Python closures capture variable names in enclosing scopes, looking up their current values when invoked later.',
              vi: 'Closure trong Python ghi nhớ tên biến ở phạm vi ngoài và chỉ truy xuất giá trị thực khi hàm được gọi sau đó.',
            },
          },
        ],
      },
      {
        id: 'pce-ch-3',
        number: 3,
        slug: 'shallow-vs-deep-copy-pitfalls',
        title: {
          en: 'Shallow vs Deep Copy Leaks',
          vi: 'Rò Rỉ Dữ Liệu Từ Shallow Copy',
        },
        summary: {
          en: 'Understand how list.copy() shares nested object references.',
          vi: 'Hiểu cách list.copy() chia sẻ tham chiếu đến đối tượng con bên trong.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'pce-3-1',
            title: {
              en: 'Deep copy for Nested Structures',
              vi: 'Dùng copy.deepcopy cho Cấu Trúc Đa Chiều',
            },
            content: {
              en: 'Shallow copies clone top-level containers but share references to nested lists/dicts. Use `copy.deepcopy()` for independent mutations.',
              vi: 'Shallow copy chỉ tạo vỏ mới nhưng giữ nguyên tham chiếu đối tượng bên trong. Dùng `copy.deepcopy()` khi cần biến đổi hoàn toàn độc lập.',
            },
          },
        ],
      },
    ],
  },

  // 5. Python Best Practices
  {
    id: 'python-best-practices',
    slug: 'python-best-practices',
    title: 'Python Best Practices',
    subtitle: {
      en: 'Type Hints, PEP 8 Standards, and Production Clean Code',
      vi: 'Type Hints, Chuẩn PEP 8 & Mã Nguồn Chuẩn Doanh Nghiệp',
    },
    bookType: 'Best Practices',
    categoryId: 'python',
    subjectId: 'programming',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '30 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-01',
    accentColor: 'from-purple-600 to-indigo-800',
    tags: ['PEP 8', 'Type Safety', 'Clean Code', 'Refactoring'],
    description: {
      en: 'Engineering guidelines for writing maintainable Python codebases with strict type hints, Ruff linting, and solid Exception handling.',
      vi: 'Quy chuẩn kỹ thuật để viết mã nguồn Python dễ bảo trì với type hints nghiêm ngặt, ruff linter và xử lý exception chuẩn hóa.',
    },
    prerequisites: {
      en: ['Intermediate Python understanding'],
      vi: ['Hiểu biết Python cấp độ trung cấp'],
    },
    outcomes: {
      en: ['Enforce strict MyPy type checking across projects', 'Implement custom exception hierarchies'],
      vi: ['Áp dụng kiểm tra kiểu MyPy nghiêm ngặt', 'Hiện thực hệ thống ngoại lệ tùy chỉnh có cấu trúc'],
    },
    chapters: [
      {
        id: 'pbp-ch-1',
        number: 1,
        slug: 'strict-static-typing',
        title: {
          en: 'Strict Type Annotations & MyPy Verification',
          vi: 'Khai Báo Kiểu Nghiêm Ngặt & Kiểm Tra Với MyPy',
        },
        summary: {
          en: 'Leverage Python 3.10+ union types (|), Generics, and TypeGuard.',
          vi: 'Tận dụng toán tử union (|), Generics và TypeGuard trong Python 3.10+.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'pbp-1-1',
            title: {
              en: 'Modern Union Syntax & Generics',
              vi: 'Cú Pháp Union Hiện Đại & Generics',
            },
            content: {
              en: 'Replace verbose `Optional[Union[int, str]]` with concise `int | str | None`. Use `TypeGuard` for narrowing custom types.',
              vi: 'Thay thế `Optional[Union[int, str]]` bằng cú pháp gọn `int | str | None`. Dùng `TypeGuard` để thu hẹp kiểu dữ liệu tùy chỉnh.',
            },
            codeBlock: {
              language: 'python',
              filename: 'typing_best_practice.py',
              code: `from typing import TypeGuard

def is_str_list(val: list[object]) -> TypeGuard[list[str]]:
    return all(isinstance(x, str) for x in val)`,
            },
          },
        ],
      },
      {
        id: 'pbp-ch-2',
        number: 2,
        slug: 'exception-design',
        title: {
          en: 'Domain Exception Hierarchy Design',
          vi: 'Thiết Kế Hệ Thống Ngoại Lệ Nghiệp Vụ',
        },
        summary: {
          en: 'Never raise bare Exception; build structured domain error hierarchies.',
          vi: 'Không bao giờ raise Exception chung chung; hãy thiết kế lớp lỗi nghiệp vụ có cấu trúc.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'pbp-2-1',
            title: {
              en: 'Root App Exception Base Class',
              vi: 'Lớp Lỗi Khởi Tạo Dành Cho Ứng Dụng',
            },
            content: {
              en: 'Create a base `AppError` class for all custom exceptions to facilitate catch-all error logging in API middleware.',
              vi: 'Tạo lớp gốc `AppError` cho tất cả ngoại lệ tự định nghĩa để middleware API dễ dàng log lỗi.',
            },
          },
        ],
      },
    ],
  },

  // 6. Python Practical Guides
  {
    id: 'python-practical-guides',
    slug: 'python-practical-guides',
    title: 'Build a Python CLI Tool',
    subtitle: {
      en: 'Step-by-Step Practical Guide to Building a Production CLI Application',
      vi: 'Hướng Dẫn Thực Hành Từng Bước Xây Dựng Ứng Dụng CLI Với Python',
    },
    bookType: 'Practical Guides',
    categoryId: 'python',
    subjectId: 'programming',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '40 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-15',
    accentColor: 'from-emerald-600 to-teal-800',
    tags: ['CLI', 'Argparse', 'Rich', 'Packaging', 'Guide'],
    description: {
      en: 'A step-by-step practical guide to building, formatting, and distributing a command-line tool with Rich output and pyproject.toml.',
      vi: 'Hướng dẫn thực hành từng bước thiết kế, định dạng giao diện dòng lệnh với thư viện Rich và đóng gói phân phối bằng pyproject.toml.',
    },
    prerequisites: {
      en: ['Python functions and file I/O skills'],
      vi: ['Kỹ năng tạo hàm và đọc ghi file trong Python'],
    },
    outcomes: {
      en: ['Build interactive terminal applications with Rich formatting', 'Publish CLI entry points using pyproject.toml'],
      vi: ['Xây dựng ứng dụng terminal tương tác đẹp mắt với Rich', 'Đăng ký CLI entry point qua pyproject.toml'],
    },
    chapters: [
      {
        id: 'ppg-ch-1',
        number: 1,
        slug: 'cli-argument-parsing-and-ui',
        title: {
          en: 'Argument Parsing & Terminal UI Formatting',
          vi: 'Phân Tích Tham Số & Định Dạng Giao Diện Terminal',
        },
        summary: {
          en: 'Parse arguments with argparse/Click and add tables using Rich.',
          vi: 'Xử lý tham số truyền vào với argparse/Click và hiển thị bảng với Rich.',
        },
        readTimeMinutes: 20,
        sections: [
          {
            id: 'ppg-1-1',
            title: {
              en: 'Interactive Rich Terminal Output',
              vi: 'Hiển Thị Giao Diện Interactive Với Rich',
            },
            content: {
              en: 'Combine `argparse` with `rich.console.Console` and `rich.table.Table` to create colorful, responsive CLI apps.',
              vi: 'Kết hợp `argparse` cùng `rich.console.Console` và `rich.table.Table` để tạo giao diện dòng lệnh sinh động.',
            },
            codeBlock: {
              language: 'python',
              filename: 'cli_app.py',
              code: `import argparse
from rich.console import Console
from rich.table import Table

console = Console()

def main():
    parser = argparse.ArgumentParser(description="4TM Audit CLI")
    parser.add_argument("--status", choices=["active", "failed"])
    args = parser.parse_args()

    table = Table(title="System Audit Results")
    table.add_column("Service", style="cyan")
    table.add_column("Status", style="green")
    table.add_row("Auth Engine", args.status or "active")
    console.print(table)`,
            },
          },
        ],
      },
      {
        id: 'ppg-ch-2',
        number: 2,
        slug: 'distributing-cli-binaries',
        title: {
          en: 'Packaging & Entry Point Configuration',
          vi: 'Đóng Gói & Đăng Ký Entry Point Trong System',
        },
        summary: {
          en: 'Configure project.scripts in pyproject.toml for pip installation.',
          vi: 'Cấu hình project.scripts trong pyproject.toml để cài đặt qua pip.',
        },
        readTimeMinutes: 20,
        sections: [
          {
            id: 'ppg-2-1',
            title: {
              en: 'Global Terminal Command Linking',
              vi: 'Đăng Ký Lệnh Chạy Toàn Cục Trực Tiếp Trên Terminal',
            },
            content: {
              en: 'Define script entry points in `pyproject.toml` so `pip install -e .` creates executable binary symlinks in your PATH.',
              vi: 'Định nghĩa entry point trong `pyproject.toml` để lệnh `pip install -e .` tự tạo file thực thi trong hệ thống PATH.',
            },
          },
        ],
      },
    ],
  },

  // 7. Python Patterns / Recipes
  {
    id: 'python-patterns',
    slug: 'python-patterns',
    title: 'Python Problem-Solving Patterns',
    subtitle: {
      en: 'Reusable Design Patterns, Architectural Blueprint Recipes & Solved Formats',
      vi: 'Các Mẫu Thiết Kế Tái Sử Dụng & Pattern Giải Quyết Bài Toán Lập Trình',
    },
    bookType: 'Patterns / Recipes',
    categoryId: 'python',
    subjectId: 'programming',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '35 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-18',
    accentColor: 'from-blue-600 to-indigo-900',
    tags: ['Design Patterns', 'Factory', 'Observer', 'Strategy', 'Recipes'],
    description: {
      en: 'A collection of Pythonic design patterns: Strategy, Factory, Observer, and Repository recipes tailored for backend development.',
      vi: 'Tuyển tập các mẫu thiết kế Pythonic: Strategy, Factory, Observer và Repository pattern ứng dụng trong phát triển backend.',
    },
    prerequisites: {
      en: ['Object-Oriented Programming principles in Python'],
      vi: ['Nguyên lý lập trình hướng đối tượng trong Python'],
    },
    outcomes: {
      en: ['Implement flexible Strategy and Factory design patterns', 'Decouple domain logic with Repository pattern'],
      vi: ['Hiện thực pattern Strategy và Factory linh hoạt', 'Tách biệt logic nghiệp vụ bằng Repository pattern'],
    },
    chapters: [
      {
        id: 'ppat-ch-1',
        number: 1,
        slug: 'behavioral-patterns',
        title: {
          en: 'Strategy & Observer Patterns in Python',
          vi: 'Pattern Strategy & Observer Trong Python',
        },
        summary: {
          en: 'Swap logic implementations dynamically using first-class functions.',
          vi: 'Thay đổi chiến lược xử lý linh hoạt lúc runtime nhờ tận dụng First-Class Functions.',
        },
        readTimeMinutes: 18,
        sections: [
          {
            id: 'ppat-1-1',
            title: {
              en: 'Lightweight Functional Strategy Pattern',
              vi: 'Pattern Strategy Dạng Hàm Tinh Gọn',
            },
            content: {
              en: 'In Python, you do not need abstract class hierarchies for the Strategy pattern; pass plain callable functions as strategy parameters directly.',
              vi: 'Trong Python, bạn không cần tạo cả hệ thống lớp trừu tượng cho Strategy pattern; chỉ cần truyền trực tiếp các hàm làm tham số.',
            },
            codeBlock: {
              language: 'python',
              filename: 'strategy_pattern.py',
              code: `from typing import Callable

DiscountStrategy = Callable[[float], float]

def vip_discount(price: float) -> float:
    return price * 0.8

def standard_discount(price: float) -> float:
    return price * 0.95

def compute_checkout(price: float, strategy: DiscountStrategy) -> float:
    return strategy(price)`,
            },
          },
        ],
      },
      {
        id: 'ppat-ch-2',
        number: 2,
        slug: 'creational-structural-patterns',
        title: {
          en: 'Factory & Repository Recipes',
          vi: 'Công Thức Factory & Repository Pattern',
        },
        summary: {
          en: 'Isolate data persistence logic and instantiate domain objects cleanly.',
          vi: 'Tách biệt logic lưu trữ dữ liệu và khởi tạo đối tượng nghiệp vụ sạch sẽ.',
        },
        readTimeMinutes: 17,
        sections: [
          {
            id: 'ppat-2-1',
            title: {
              en: 'Generic Abstract Repository Pattern',
              vi: 'Pattern Repository Khái Quát Cho Lớp Persistence',
            },
            content: {
              en: 'Use the Repository pattern to decouple application business logic from underlying database clients (SQLAlchemy, Redis, or Mongo).',
              vi: 'Sử dụng Repository pattern để tách biệt logic nghiệp vụ khỏi client cơ sở dữ liệu bên dưới.',
            },
          },
        ],
      },
    ],
  },
];
