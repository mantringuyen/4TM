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
              en: 'Python is an interpreted language that compiles source code (`.py`) into intermediate bytecode (`.pyc`) before runtime execution. When you run a script, CPython performs three main steps: 1) Parsing source code into an Abstract Syntax Tree (AST), 2) Compiling AST nodes into CPython bytecode instructions, and 3) Executing opcodes within a stack-based virtual machine loop (`ceval.c`). Understanding bytecode helps developers optimize hot execution paths and debug low-level runtime behavior.',
              vi: 'Python là ngôn ngữ thông dịch nhưng thực chất sẽ biên dịch mã nguồn (`.py`) thành bytecode trung gian (`.pyc`) trước khi thực thi. Khi bạn chạy kịch bản, CPython trải qua 3 bước chính: 1) Phân tích mã nguồn thành Cây Cú Pháp Trừu Tượng (AST), 2) Biên dịch AST thành các chỉ thị bytecode của CPython, và 3) Thực thi các opcode trong vòng lặp máy ảo dựa trên stack (`ceval.c`). Việc hiểu bytecode giúp nhà phát triển tối ưu hóa mã nguồn và debug các hành vi runtime chuyên sâu.',
            },
            keyIdea: {
              en: 'CPython does not execute raw text files line-by-line; it compiles source code into intermediate bytecode opcodes evaluated by a C-based evaluation loop.',
              vi: 'CPython không đọc từng dòng chữ thô để chạy; nó biên dịch toàn bộ mã thành các opcode bytecode trung gian và đánh giá qua vòng lặp bằng C.',
            },
            diagram: {
              title: {
                en: 'CPython Source to Execution Pipeline',
                vi: 'Quy Trình Xử Lý Từ Mã Nguồn Đến Thực Thi Của CPython',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Lexing & AST Parsing', vi: 'Phân Tích Cú Pháp AST' },
                  description: {
                    en: 'Source code .py is converted into tokens and built into an Abstract Syntax Tree (AST).',
                    vi: 'Mã nguồn .py được chuyển thành các token và dựng thành Cây Cú Pháp Trừu Tượng (AST).',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Bytecode Compilation', vi: 'Biên Dịch Bytecode' },
                  description: {
                    en: 'AST is compiled into CPython bytecode instructions (.pyc opcodes stored in __pycache__).',
                    vi: 'AST được chuyển đổi thành chỉ thị bytecode CPython (các opcode .pyc lưu trong __pycache__).',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Virtual Machine Loop', vi: 'Vòng Lặp Máy Ảo CPython' },
                  description: {
                    en: 'ceval.c stack-based evaluation loop executes opcodes on target CPU.',
                    vi: 'Vòng lặp ceval.c dựa trên stack của máy ảo CPython thực thi từng opcode trên CPU.',
                  },
                },
              ],
            },
            codeBlock: {
              language: 'python',
              filename: 'inspect_bytecode.py',
              code: `import dis

def calculate_total(price: float, tax: float) -> float:
    return price * (1 + tax)

# Disassemble function into CPython bytecode instructions
print("=== Bytecode Disassembly ===")
dis.dis(calculate_total)

# Inspect underlying code object attributes
code_obj = calculate_total.__code__
print("\\nConstants:", code_obj.co_consts)
print("Variable names:", code_obj.co_varnames)`,
              explanation: {
                en: '`dis.dis()` inspects CPython opcodes (LOAD_FAST, BINARY_OP, RETURN_VALUE) and memory attributes like `co_consts`.',
                vi: 'Hàm `dis.dis()` soi các opcode CPython (LOAD_FAST, BINARY_OP, RETURN_VALUE) và các thuộc tính bộ nhớ như `co_consts`.',
              },
            },
            practicalScenario: {
              en: 'In high-throughput microservices, inspecting bytecode reveals unnecessary global variable lookups (`LOAD_GLOBAL` vs `LOAD_FAST`). Converting frequently accessed globals into local function parameters speeds up evaluation inside critical loops.',
              vi: 'Trong các dịch vụ cần xử lý hiệu năng cao, việc soi bytecode giúp phát hiện các truy xuất biến toàn cục không cần thiết (`LOAD_GLOBAL` so với `LOAD_FAST`). Chuyển biến global thành tham số local giúp tăng tốc độ thực thi đáng kể trong vòng lặp.',
            },
            keyTakeaways: {
              en: [
                'Python is compiled to bytecode (.pyc) before VM interpretation',
                'CPython uses a stack-based virtual machine evaluation loop (ceval.c)',
                'Local variables (LOAD_FAST) execute faster than global lookups (LOAD_GLOBAL)',
              ],
              vi: [
                'Python được biên dịch sang bytecode (.pyc) trước khi thông dịch trên VM',
                'CPython vận hành theo cơ chế máy ảo dựa trên stack với vòng lặp ceval.c',
                'Biến cục bộ (LOAD_FAST) truy cập nhanh hơn biến toàn cục (LOAD_GLOBAL)',
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
              en: 'Name Binding, Mutability and Object Model',
              vi: 'Ràng Buộc Tên (Name Binding), Tính Khả Biến Và Mô Hình Đối Tượng',
            },
            content: {
              en: 'In Python, variables are NOT "boxes that store values". Instead, variables are named references (labels) bound to objects residing in memory heap. Every object in Python possesses three core properties: 1) Identity (`id()`), 2) Type (`type()`), and 3) Value. Objects are classified into Immutable (int, float, bool, str, tuple, frozenset) and Mutable (list, dict, set). Modifying an immutable object creates a new object in memory, whereas modifying a mutable object alters its contents in-place without changing its memory identity.',
              vi: 'Trong Python, biến KHÔNG PHẢI là "những chiếc hộp chứa giá trị". Bản chất biến là các nhãn tên (named references) được gắn nối tới các đối tượng nằm trong bộ nhớ heap. Mỗi đối tượng trong Python sở hữu 3 thuộc tính cốt lõi: 1) Định danh (`id()`), 2) Kiểu dữ liệu (`type()`), và 3) Giá trị. Đối tượng chia làm 2 loại: Bất biến (int, float, bool, str, tuple, frozenset) và Khả biến (list, dict, set). Chỉnh sửa đối tượng bất biến sẽ tạo ra một đối tượng mới hoàn toàn trong bộ nhớ, còn chỉnh sửa đối tượng khả biến sẽ thay đổi nội dung tại chỗ mà không làm đổi định danh id.',
            },
            keyIdea: {
              en: 'Variables in Python are named pointers bound to objects in heap memory. Assignment (`a = b`) copies the reference pointer, not the underlying object data.',
              vi: 'Biến trong Python là con trỏ nhãn tên gắn vào đối tượng trong bộ nhớ. Phép gán (`a = b`) chia sẻ tham chiếu con trỏ chứ không sao chép dữ liệu bên trong.',
            },
            comparisonTable: {
              headers: [
                { en: 'Type Category', vi: 'Phân Loại Kiểu' },
                { en: 'Built-in Data Types', vi: 'Các Kiểu Tích Hợp' },
                { en: 'Memory Behavior on Edit', vi: 'Hành Vi Bộ Nhớ Khi Sửa' },
                { en: 'Hashable (Dict Key)?', vi: 'Hashable (Làm Key Dict)?' },
              ],
              rows: [
                {
                  en: ['Immutable Primitives', 'int, float, bool, str', 'Creates new object (id changes)', 'Yes'],
                  vi: ['Nguyên Thủy Bất Biến', 'int, float, bool, str', 'Tạo đối tượng mới (id thay đổi)', 'Có'],
                },
                {
                  en: ['Immutable Collections', 'tuple, frozenset', 'Cannot add/remove items', 'Yes (if items hashable)'],
                  vi: ['Tập Hợp Bất Biến', 'tuple, frozenset', 'Không thể thêm/xóa phần tử', 'Có (nếu phần tử con hashable)'],
                },
                {
                  en: ['Mutable Collections', 'list, dict, set', 'In-place modification (same id)', 'No (Unhashable)'],
                  vi: ['Tập Hợp Khả Biến', 'list, dict, set', 'Sửa đổi tại chỗ (giữ nguyên id)', 'Không (Unhashable)'],
                },
              ],
            },
            codeBlock: {
              language: 'python',
              filename: 'object_model_demo.py',
              code: `# Example 1 — Basic: Immutable Name Binding
x = 100
initial_id = id(x)
x += 1  # Creates a NEW int object 101!
print("Int re-bound:", id(x) != initial_id)  # True

# Example 2 — Practical: Shared Reference Mutation
list_a = [1, 2, 3]
list_b = list_a  # Both variables point to SAME list object
list_b.append(99)
print("list_a mutated:", list_a)  # [1, 2, 3, 99]
print("Identical IDs:", id(list_a) == id(list_b))  # True

# Example 3 — Edge Case: Tuple containing a mutable list
mixed_tuple = (10, [20, 30])
print("Initial tuple:", mixed_tuple)
mixed_tuple[1].append(40)  # Mutates inner list in-place!
print("Tuple with mutated list:", mixed_tuple)  # (10, [20, 30, 40])`,
              explanation: {
                en: 'Demonstrates immutable object re-binding, shared reference mutation in lists, and edge case of mutating a list nested inside an immutable tuple.',
                vi: 'Minh họa phép gán re-bind đối tượng bất biến, tham chiếu dùng chung ở list và trường hợp đặc biệt: thay đổi list bên trong một tuple bất biến.',
              },
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Assuming a = b creates an independent copy of a list or dictionary',
                  vi: 'Nghĩ rằng a = b sẽ tạo ra bản sao độc lập của list hoặc dict',
                },
                why: {
                  en: 'Assignment only copies the memory reference address, causing unexpected side effects when modifying list_b.',
                  vi: 'Phép gán chỉ sao chép địa chỉ tham chiếu bộ nhớ, khiến thay đổi trên list_b làm ảnh hưởng cả list_a.',
                },
                solution: {
                  en: 'Use explicit copy methods like `list_b = list_a.copy()` or `copy.deepcopy()` for nested structures.',
                  vi: 'Sử dụng phương thức sao chép rõ ràng như `list_b = list_a.copy()` hoặc `copy.deepcopy()` cho cấu trúc lồng nhau.',
                },
                codeIncorrect: `a = [1, 2, 3]
b = a
b.append(4)  # Mutates 'a' too!`,
                codeCorrect: `a = [1, 2, 3]
b = a.copy() # Independent copy
b.append(4)  # 'a' remains [1, 2, 3]`,
              },
            ],
            keyTakeaways: {
              en: [
                'Variables are references bound to objects in heap memory',
                'Immutable objects cannot be changed in-place; reassignment creates new objects',
                'Mutable objects allow in-place modification, affecting all shared references',
              ],
              vi: [
                'Biến là các con trỏ tham chiếu gắn tới đối tượng trong bộ nhớ heap',
                'Đối tượng bất biến không thể sửa tại chỗ; phép gán tạo ra đối tượng mới',
                'Đối tượng khả biến cho phép sửa tại chỗ, ảnh hưởng tới mọi biến dùng chung tham chiếu',
              ],
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
              en: 'Import Resolution Pipeline & sys.modules Cache',
              vi: 'Quy Trình Phân Giải Import & Cache sys.modules',
            },
            content: {
              en: 'When Python encounters an `import foo` statement, it executes a multi-stage lookup algorithm: 1) Checks `sys.modules` dictionary cache to see if `foo` was already imported. If cached, it binds the reference immediately. 2) If not cached, Python searches through directory paths listed in `sys.path` (current directory, `PYTHONPATH`, and standard library paths). 3) Once located, Python compiles the file to bytecode, creates a new module object namespace, executes the module top-level statements, and stores the module instance in `sys.modules`. Absolute imports specify the full package path from project root, preventing naming collisions.',
              vi: 'Khi Python gặp câu lệnh `import foo`, nó thực thi thuật toán tìm kiếm qua các bước: 1) Kiểm tra dictionary cache `sys.modules` xem `foo` đã được import trước đó chưa. Nếu đã có, nó gán tham chiếu ngay. 2) Nếu chưa có, Python tìm kiếm qua danh sách đường dẫn trong `sys.path` (thư mục hiện tại, `PYTHONPATH` và thư viện chuẩn). 3) Khi tìm thấy, Python biên dịch file sang bytecode, tạo một namespace đối tượng module mới, thực thi các câu lệnh cấp cao của module và lưu đối tượng vào `sys.modules`. Import tuyệt đối chỉ định đầy đủ đường dẫn package từ root, giúp tránh xung đột tên.',
            },
            diagram: {
              title: {
                en: 'Python Module Import Resolution Flow',
                vi: 'Quy Trình Phân Giải Import Module Trong Python',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Cache Lookup in sys.modules', vi: 'Tra Cứu Cache sys.modules' },
                  description: {
                    en: 'Python checks if module is already loaded in memory cache.',
                    vi: 'Python kiểm tra xem module đã được nạp vào cache bộ nhớ chưa.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Path Search via sys.path', vi: 'Tìm Kiếm Đường Dẫn sys.path' },
                  description: {
                    en: 'Searches directories in sys.path sequentially for target .py file or package.',
                    vi: 'Duyệt tuần tự các thư mục trong sys.path để tìm file .py hoặc package chỉ định.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Execution & Namespace Binding', vi: 'Thực Thi & Gán Namespace' },
                  description: {
                    en: 'Executes module top-level code, stores instance in sys.modules, and binds module name.',
                    vi: 'Thực thi mã cấp cao của module, lưu vào sys.modules và gắn tên module vào scope hiện tại.',
                  },
                },
              ],
            },
            whenToUse: {
              use: {
                en: ['Use Absolute Imports for clear, unambiguous package references across large codebases'],
                vi: ['Dùng Import Tuyệt Đối cho các dự án lớn để đường dẫn rõ ràng, không bị lẫn lộn'],
              },
              avoid: {
                en: ['Avoid modifying sys.path at runtime; configure PYTHONPATH or virtualenv entrypoints instead'],
                vi: ['Tránh sửa đổi sys.path lúc runtime; hãy cấu hình PYTHONPATH hoặc venv chuẩn xác'],
              },
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Circular import dependencies where Module A imports Module B at top-level while B imports A',
                  vi: 'Lỗi phụ thuộc vòng (Circular Import) khi Module A import B ở top-level còn B lại import A',
                },
                why: {
                  en: 'When B tries to access a symbol from A before A has finished top-level execution, Python raises AttributeError or ImportError.',
                  vi: 'Khi B truy cập symbol từ A trong khi A chưa thực thi xong cấp top-level, Python sẽ báo lỗi AttributeError hoặc ImportError.',
                },
                solution: {
                  en: 'Refactor shared dependencies into a separate module, or delay imports inside functions.',
                  vi: 'Tách phần phụ thuộc dùng chung sang module độc lập thứ 3, hoặc chuyển câu lệnh import vào bên trong hàm.',
                },
                codeIncorrect: `# module_a.py
import module_b
def func_a():
    return module_b.func_b()`,
                codeCorrect: `# module_a.py (Deferred import solution)
def func_a():
    import module_b
    return module_b.func_b()`,
              },
            ],
            keyTakeaways: {
              en: [
                'sys.modules caches loaded modules; modules are executed ONCE per process lifetime',
                'sys.path determines directory search order for imported modules',
                'Absolute imports prevent naming ambiguity in complex applications',
              ],
              vi: [
                'sys.modules lưu cache module đã nạp; mỗi module chỉ chạy top-level MỘT LẦN duy nhất',
                'sys.path quyết định thứ tự tìm kiếm thư mục cho module',
                'Import tuyệt đối giúp ngăn ngừa xung đột tên trong ứng dụng phức tạp',
              ],
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
              en: 'GIL (Global Interpreter Lock) & Concurrency Models',
              vi: 'GIL (Global Interpreter Lock) & Các Mô Hình Đồng Thời',
            },
            content: {
              en: 'The Global Interpreter Lock (GIL) is a mutual exclusion lock used by CPython to ensure that only one native thread executes Python bytecode at a time per process. The GIL exists because CPython internal memory management is not thread-safe (reference counting `ob_refcnt` is susceptible to race conditions). While the GIL limits CPU-bound multithreading across multiple CPU cores, I/O-bound operations (network requests, disk access) release the GIL while waiting. For CPU-heavy parallel processing, developers use `multiprocessing` or process pools.',
              vi: 'Global Interpreter Lock (GIL) là một khóa mutex trong CPython đảm bảo chỉ có duy nhất một native thread được thực thi CPython bytecode tại một thời điểm trong mỗi tiến trình. GIL tồn tại vì cơ chế quản lý bộ nhớ nội bộ của CPython không thread-safe (đếm tham chiếu `ob_refcnt` dễ gặp race condition). Dù GIL hạn chế đa luồng xử lý CPU-bound trên nhiều core, các tác vụ I/O-bound (truy vấn mạng, đọc đĩa) sẽ nhả GIL khi chờ đợi. Với các bài toán nặng về tính toán CPU, nhà phát triển sử dụng module `multiprocessing` để tạo nhiều process riêng biệt.',
            },
            keyIdea: {
              en: 'The GIL prevents CPython threads from running CPU-bound bytecodes in parallel. Choose multiprocessing for CPU-bound tasks and threading/asyncio for I/O-bound tasks.',
              vi: 'GIL ngăn thread CPython chạy song song các công việc tính toán nặng trên CPU. Hãy chọn multiprocessing cho CPU-bound và threading/asyncio cho I/O-bound.',
            },
            comparisonTable: {
              headers: [
                { en: 'Concurrency Mechanism', vi: 'Cơ Chế Đồng Thời' },
                { en: 'Bypasses GIL?', vi: 'Vượt Qua GIL?' },
                { en: 'Memory Model', vi: 'Mô Hình Bộ Nhớ' },
                { en: 'Optimal Workload', vi: 'Tác Vụ Tối Ưu' },
              ],
              rows: [
                {
                  en: ['threading', 'No', 'Shared process memory', 'I/O-bound (web requests, file I/O)'],
                  vi: ['threading', 'Không', 'Bộ nhớ dùng chung', 'I/O-bound (gọi API, đọc file)'],
                },
                {
                  en: ['multiprocessing', 'Yes (Separate processes)', 'Isolated memory (IPC required)', 'CPU-bound (data processing, ML)'],
                  vi: ['multiprocessing', 'Có (Tiến trình riêng)', 'Bộ nhớ cô lập (Cần IPC)', 'CPU-bound (tính toán, xử lý dữ liệu)'],
                },
                {
                  en: ['asyncio', 'No (Single-threaded event loop)', 'Single thread memory', 'High-concurrency I/O networking'],
                  vi: ['asyncio', 'Không (Event loop đơn luồng)', 'Bộ nhớ đơn luồng', 'I/O mạng hàng ngàn kết nối'],
                },
              ],
            },
          },
          {
            id: 'py-def-1-2',
            title: {
              en: 'LEGB Scope Resolution Rule',
              vi: 'Quy Tắc Phân Giải Phạm Vi LEGB',
            },
            content: {
              en: 'The LEGB rule dictates the search hierarchy when Python looks up variable names: 1) Local (L): Variables defined inside the current function/lambda, 2) Enclosing (E): Variables in outer enclosing functions (closures), 3) Global (G): Module top-level variables, and 4) Built-in (B): Preloaded Python names (`len`, `ValueError`, `range`). Understanding LEGB prevents `UnboundLocalError` when modifying global or enclosing variables.',
              vi: 'Quy tắc LEGB định nghĩa thứ tự ưu tiên khi Python tìm kiếm tên biến: 1) Local (L): Biến cục bộ trong hàm hiện tại, 2) Enclosing (E): Biến ở các hàm bao ngoài (closure), 3) Global (G): Biến cấp cao nhất của module, và 4) Built-in (B): Các tên được nạp sẵn (`len`, `ValueError`, `range`). Nắm vững LEGB giúp tránh lỗi `UnboundLocalError` khi chỉnh sửa biến global hoặc enclosing.',
            },
            codeBlock: {
              language: 'python',
              filename: 'legb_scope.py',
              code: `x = "GLOBAL"  # G in LEGB

def outer():
    x = "ENCLOSING"  # E in LEGB
    
    def inner():
        nonlocal x   # Modifies Enclosing scope!
        x = "MUTATED_ENCLOSING"
        y = "LOCAL"  # L in LEGB
        print(y, x, len([1, 2])) # len is B in LEGB
        
    inner()
    print("Outer x:", x) # Prints MUTATED_ENCLOSING

outer()`,
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'UnboundLocalError when referencing a global variable and assigning to it inside a function without global keyword',
                  vi: 'Lỗi UnboundLocalError khi gán biến trùng tên với global trong hàm mà không dùng từ khóa global',
                },
                why: {
                  en: 'Python compiles any variable assigned inside a function body as a Local variable for the ENTIRE function scope.',
                  vi: 'Python mặc định coi bất kỳ biến nào có lệnh gán trong hàm là biến Cục bộ (Local) cho TOÀN BỘ phạm vi hàm đó.',
                },
                solution: {
                  en: 'Declare `global x` or `nonlocal x` explicitly before assignment if mutating outer variables.',
                  vi: 'Khai báo `global x` hoặc `nonlocal x` trước khi gán nếu muốn thay đổi biến ở scope ngoài.',
                },
                codeIncorrect: `counter = 0
def increment():
    print(counter) # UnboundLocalError!
    counter += 1`,
                codeCorrect: `counter = 0
def increment():
    global counter
    print(counter)
    counter += 1`,
              },
            ],
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
              en: 'MRO (Method Resolution Order) & C3 Linearization',
              vi: 'MRO (Method Resolution Order) & Thuật Toán C3 Linearization',
            },
            content: {
              en: 'Method Resolution Order (MRO) is the deterministic order Python uses to search for methods and attributes in a class hierarchy during multiple inheritance. Python uses the C3 Linearization algorithm to calculate MRO, ensuring three key guarantees: 1) Subclasses are always checked before their base classes, 2) Multiple inheritance parents are searched in the order specified in class definition, and 3) Monotonicity is maintained across inheritance graphs. Developers inspect MRO using `Class.__mro__` or `Class.mro()`.',
              vi: 'Method Resolution Order (MRO) là thứ tự tìm kiếm phương thức và thuộc tính trong hệ thống đa kế thừa của Python. Python áp dụng thuật toán C3 Linearization để tính toán MRO, đảm bảo 3 nguyên tắc: 1) Lớp con luôn được kiểm tra trước lớp cha, 2) Các lớp cha trong đa kế thừa được duyệt đúng theo thứ tự khai báo, và 3) Tính đơn điệu (monotonicity) được giữ nguyên trên toàn cây kế thừa. Bạn có thể xem MRO qua `Class.__mro__`.',
            },
            keyIdea: {
              en: 'MRO resolves multiple inheritance ambiguity and governs how `super()` delegates method calls up the inheritance chain.',
              vi: 'MRO giải quyết sự mơ hồ trong đa kế thừa và điều phối cách `super()` chuyển tiếp lời gọi phương thức lên lớp cha.',
            },
            codeBlock: {
              language: 'python',
              filename: 'mro_c3_demo.py',
              code: `class Base:
    def speak(self): return "Base"

class A(Base):
    def speak(self): return f"A -> {super().speak()}"

class B(Base):
    def speak(self): return f"B -> {super().speak()}"

class Child(A, B): # Multiple inheritance
    def speak(self): return f"Child -> {super().speak()}"

c = Child()
print(c.speak()) # Child -> A -> B -> Base
print("\\nCalculated MRO:")
for cls in Child.__mro__:
    print(f"- {cls.__name__}")`,
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
              en: 'Star Unpacking & Idiomatic Iteration Idioms',
              vi: 'Kỹ Thuật Star Unpacking & Vòng Lặp Pythonic',
            },
            content: {
              en: 'Avoid manual C-style indexing loops (`for i in range(len(lst)):`) in Python. Use `enumerate()` when element indices are needed, `zip()` for parallel iteration over multiple iterables, and extended star unpacking (`*rest`) to extract arbitrary elements from tuples and lists cleanly.',
              vi: 'Tránh viết vòng lặp kiểu C-style thủ công (`for i in range(len(lst)):`) trong Python. Hãy dùng `enumerate()` khi cần chỉ số, dùng `zip()` để lặp song song nhiều danh sách, và dùng star unpacking mở rộng (`*rest`) để bóc tách dữ liệu tinh gọn.',
            },
            codeBlock: {
              language: 'python',
              filename: 'unpacking_tips.py',
              code: `# Example 1 — Extended Star Unpacking
record = ["USR-102", "Alice", 98.5, "Active", "Engineering"]
user_id, name, *details, dept = record
print(f"ID: {user_id}, Name: {name}, Dept: {dept}")
print(f"Captured Details: {details}") # [98.5, 'Active']

# Example 2 — Parallel Iteration with zip
names = ["Alice", "Bob", "Charlie"]
scores = [95, 88, 92]
for name, score in zip(names, scores, strict=True):
    print(f"{name}: {score}")`,
            },
            bestPractices: {
              en: [
                'Pass strict=True to zip() in Python 3.10+ to raise ValueError if iterables have unequal lengths',
                'Use enumerate(iterable, start=1) for 1-based human indexing',
              ],
              vi: [
                'Truyền strict=True vào zip() từ Python 3.10+ để báo lỗi nếu độ dài hai danh sách không bằng nhau',
                'Dùng enumerate(iterable, start=1) khi cần đánh số thứ tự từ 1',
              ],
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
              en: 'Walrus Operator (:=) Patterns & Syntax Rules',
              vi: 'Các Mẫu Thiết Kế & Quy Tắc Cú Pháp Của Toán Tử Walrus (:=)',
            },
            content: {
              en: 'Introduced in PEP 572 (Python 3.8), assignment expressions (`:=`) allow you to assign values to variables inside expressions. This eliminates duplicate costly function evaluations inside `while` stream loops, `if` conditionals, and list filtering comprehensions.',
              vi: 'Được giới thiệu trong PEP 572 (Python 3.8), toán tử walrus (`:=`) cho phép vừa gán giá trị vừa trả về kết quả ngay trong một biểu thức. Giúp loại bỏ việc tính toán lặp lại các hàm tốn kém trong vòng lặp `while`, câu lệnh `if` và list comprehension.',
            },
            whenToUse: {
              use: {
                en: [
                  'Reading chunked streams in while loops: while (chunk := file.read(8192)):',
                  'Filtering and transforming in list comprehensions without double function evaluation',
                ],
                vi: [
                  'Đọc stream theo từng chunk trong while loop: while (chunk := file.read(8192)):',
                  'Vừa lọc vừa biến đổi trong list comprehension mà không phải gọi lại hàm tốn kém',
                ],
              },
              avoid: {
                en: [
                  'Avoid overusing walrus operators in simple assignments where plain = is cleaner',
                ],
                vi: [
                  'Tránh lạm dụng toán tử walrus ở phép gán đơn giản khiến code khó đọc',
                ],
              },
            },
            codeBlock: {
              language: 'python',
              filename: 'walrus_idioms.py',
              code: `import re

# Practical Example: Regex Pattern Extraction Pipeline
data_lines = ["USER: alice_99", "INVALID LINE", "USER: bob_2025"]
pattern = re.compile(r"^USER:\\s*(\\w+)$")

# Walrus assigns 'match' inside comprehension filter!
usernames = [
    m.group(1)
    for line in data_lines
    if (m := pattern.match(line)) is not None
]
print("Extracted users:", usernames) # ['alice_99', 'bob_2025']`,
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
              en: 'Non-Destructive Dict Union (|) & Set Lookups',
              vi: 'Gộp Dict Không Biến Đổi Dữ Liệu (|) & Tra Cứu Tập Hợp',
            },
            content: {
              en: 'Python 3.9+ introduced dictionary union operators `|` (merge) and `|=` (update in-place). For high-speed membership testing, Python `set` and `dict` lookups operate in average O(1) time complexity using hash tables, compared to O(N) linear search in Python `list`. Converting lists to sets before performing repeated `in` checks yields massive performance gains.',
              vi: 'Python 3.9+ hỗ trợ toán tử hợp dict `|` (gộp mới) và `|=` (cập nhật tại chỗ). Để kiểm tra sự tồn tại (membership test) tốc độ cao, `set` và `dict` trong Python chạy với độ phức tạp trung bình O(1) nhờ bảng băm (hash table), so với O(N) tìm kiếm tuyến tính ở `list`. Chuyển list sang set trước khi kiểm tra `in` lặp đi lặp lại giúp tăng tốc độ vượt trội.',
            },
            comparisonTable: {
              headers: [
                { en: 'Merge Syntax', vi: 'Cú Pháp Gộp' },
                { en: 'Python Version', vi: 'Phiên Bản Python' },
                { en: 'Mutates Target?', vi: 'Thay Đổi Dict Gốc?' },
                { en: 'Behavior', vi: 'Hành Vi' },
              ],
              rows: [
                {
                  en: ['dict_a | dict_b', '3.9+', 'No (Returns new dict)', 'Right-hand side keys override left-hand keys'],
                  vi: ['dict_a | dict_b', '3.9+', 'Không (Trả về dict mới)', 'Key bên phải đè lên key trùng bên trái'],
                },
                {
                  en: ['dict_a |= dict_b', '3.9+', 'Yes (In-place update)', 'Updates dict_a in-place with dict_b items'],
                  vi: ['dict_a |= dict_b', '3.9+', 'Có (Cập nhật tại chỗ)', 'Cập nhật trực tiếp vào dict_a'],
                },
                {
                  en: ['{**dict_a, **dict_b}', '3.5+', 'No', 'Unpacks keys into new dictionary literal'],
                  vi: ['{**dict_a, **dict_b}', '3.5+', 'Không', 'Unpack key vào dict mới'],
                },
              ],
            },
            codeBlock: {
              language: 'python',
              filename: 'dict_merge_perf.py',
              code: `# Example: Merging Configuration Layers
default_cfg = {"host": "localhost", "port": 8080, "debug": False}
env_cfg = {"port": 9000, "debug": True}

# Clean non-destructive merge using |
final_cfg = default_cfg | env_cfg
print("Merged Config:", final_cfg)
# {'host': 'localhost', 'port': 9000, 'debug': True}`,
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
              en: 'Definition Time Evaluation & The Sentinel Pattern',
              vi: 'Đánh Giá Thời Điểm Định Nghĩa & Mẫu Sentinel',
            },
            content: {
              en: 'In Python, default argument expressions in function signatures are evaluated ONCE when the function definition is executed, NOT on subsequent function invocations. If a default argument is mutable (such as `list`, `dict`, or `set`), that single object instance is stored in `function.__defaults__` and shared across ALL calls to that function.',
              vi: 'Trong Python, biểu thức tham số mặc định ở khai báo hàm được tính toán MỘT LẦN duy nhất khi câu lệnh định nghĩa hàm thực thi, KHÔNG PHẢI ở mỗi lần gọi hàm sau đó. Nếu tham số mặc định là đối tượng khả biến (như `list`, `dict`, `set`), đối tượng duy nhất đó được lưu vào `function.__defaults__` và dùng chung cho TẤT CẢ các lần gọi hàm.',
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Using def append_to_list(val, target=[]) which retains items across separate calls',
                  vi: 'Dùng def append_to_list(val, target=[]) khiến dữ liệu bị cộng dồn qua các lần gọi độc lập',
                },
                why: {
                  en: 'The target list [] is instantiated once at function compile time and stored in __defaults__.',
                  vi: 'List target [] được khởi tạo đúng 1 lần khi định nghĩa hàm và lưu vào __defaults__.',
                },
                solution: {
                  en: 'Use None as the sentinel default value and instantiate a fresh list inside the function body.',
                  vi: 'Dùng None làm giá trị mặc định dạng sentinel và khởi tạo list mới bên trong thân hàm.',
                },
                codeIncorrect: `def add_item(val, items=[]): # DANGEROUS!
    items.append(val)
    return items

print(add_item(1)) # [1]
print(add_item(2)) # [1, 2] - State leak!`,
                codeCorrect: `def add_item(val, items=None): # SAFE SENTINEL
    if items is None:
        items = []
    items.append(val)
    return items

print(add_item(1)) # [1]
print(add_item(2)) # [2] - Isolated!`,
              },
            ],
            keyTakeaways: {
              en: [
                'Default arguments evaluate once at module load time into function.__defaults__',
                'Never use mutable objects (list, dict, set) directly in function signatures',
                'Always use None sentinel pattern for optional mutable parameters',
              ],
              vi: [
                'Tham số mặc định được tính toán 1 lần khi nạp module vào function.__defaults__',
                'Không bao giờ dùng đối tượng khả biến (list, dict, set) làm default trong chữ ký hàm',
                'Luôn dùng mẫu None sentinel cho tham số khả biến tùy chọn',
              ],
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
              en: 'Late-Binding Variable Reference Resolution',
              vi: 'Cơ Chế Phân Giải Tham Chiếu Trễ Trong Closure',
            },
            content: {
              en: 'Python closures bind variables by *reference*, not by value. When function closures or lambdas are created inside a loop, they capture the variable name in the enclosing scope. By the time the closures are executed later, the loop has completed, and all closures resolve the variable to its final iteration value.',
              vi: 'Closure trong Python ghi nhớ biến theo *tham chiếu* (reference) chứ không theo giá trị. Khi các hàm closure hoặc lambda được tạo trong vòng lặp, chúng lưu lại tên biến ở phạm vi chứa ngoài. Đến khi các hàm này thực thi sau đó, vòng lặp đã chạy xong và tất cả closure đều đọc ra giá trị ở vòng lặp cuối cùng.',
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Creating a list of functions inside a loop [lambda: i for i in range(5)] where all functions return 4',
                  vi: 'Tạo danh sách hàm trong vòng lặp [lambda: i for i in range(5)] khiến tất cả hàm đều trả về 4',
                },
                why: {
                  en: 'The closures look up variable i in enclosing scope at invocation time, after the loop ended at 4.',
                  vi: 'Các closure truy xuất biến i ở scope ngoài lúc được gọi, khi vòng lặp đã dừng ở giá trị 4.',
                },
                solution: {
                  en: 'Bind the current iteration value immediately using default argument trick (lambda i=i: i) or functools.partial.',
                  vi: 'Đóng gói giá trị hiện tại ngay lập tức qua mẹo tham số mặc định (lambda i=i: i) hoặc dùng functools.partial.',
                },
                codeIncorrect: `handlers = [lambda: i for i in range(3)]
print([h() for h in handlers]) # [2, 2, 2]`,
                codeCorrect: `handlers = [lambda i=i: i for i in range(3)]
print([h() for h in handlers]) # [0, 1, 2]`,
              },
            ],
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
              en: 'Container Clones vs Reference Sharing',
              vi: 'Sao Chép Vỏ Container vs Chia Sẻ Tham Chiếu',
            },
            content: {
              en: 'In Python, shallow copy operations (`list.copy()`, `dict.copy()`, or `copy.copy()`) create a new outer container object, but copy references to the inner nested items. Modifying a nested mutable object inside a shallow copy will mutate the original container structure as well. To duplicate nested structures independently, use `copy.deepcopy()`.',
              vi: 'Trong Python, phép sao chép nông (`list.copy()`, `dict.copy()`, hay `copy.copy()`) tạo ra một vỏ container outer mới, nhưng lại sao chép tham chiếu tới các đối tượng con bên trong. Việc thay đổi đối tượng con khả biến trong bản sao nông sẽ làm biến đổi cả dữ liệu gốc. Để sao chép hoàn toàn độc lập tất cả các cấp lồng nhau, hãy dùng `copy.deepcopy()`.',
            },
            comparisonTable: {
              headers: [
                { en: 'Copy Technique', vi: 'Kỹ Thuật Copy' },
                { en: 'Outer Container ID', vi: 'ID Container Ngoài' },
                { en: 'Nested Items ID', vi: 'ID Phần Tử Con' },
                { en: 'Use Case', vi: 'Trường Hợp Dùng' },
              ],
              rows: [
                {
                  en: ['Assignment (b = a)', 'Same ID', 'Same ID', 'Creating variable aliases'],
                  vi: ['Phép gán (b = a)', 'Cùng ID', 'Cùng ID', 'Tạo tên bí danh cho biến'],
                },
                {
                  en: ['Shallow Copy (a.copy())', 'New ID', 'Same ID (Shared)', 'Flat 1D collections'],
                  vi: ['Sao chép nông (a.copy())', 'ID Mới', 'Cùng ID (Dùng chung)', 'Danh sách phẳng 1 chiều'],
                },
                {
                  en: ['Deep Copy (copy.deepcopy(a))', 'New ID', 'New ID (Cloned)', 'Nested multi-level dicts/lists'],
                  vi: ['Sao chép sâu (copy.deepcopy)', 'ID Mới', 'ID Mới (Sao chép hết)', 'Cấu trúc lồng nhau nhiều cấp'],
                },
              ],
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
              en: 'Modern Union Syntax & Protocols',
              vi: 'Cú Pháp Union Hiện Đại & Protocols',
            },
            content: {
              en: 'Modern Python (3.10+) simplifies type annotations using pipe union operators (`int | str`) instead of `typing.Union`. For duck-typing static analysis, use `typing.Protocol` (structural subtyping) instead of heavy Abstract Base Classes (ABC). Classes satisfying a Protocol interface do not need to explicitly inherit from it.',
              vi: 'Python hiện đại (3.10+) đơn giản hóa khai báo kiểu với toán tử union thanh đứng (`int | str`) thay cho `typing.Union`. Với mô hình duck-typing tĩnh, hãy dùng `typing.Protocol` (structural subtyping) thay cho lớp trừu tượng ABC cồng kềnh. Các lớp đáp ứng đúng interface của Protocol không cần phải kế thừa trực tiếp từ nó.',
            },
            codeBlock: {
              language: 'python',
              filename: 'typing_protocols.py',
              code: `from typing import Protocol

class Renderable(Protocol):
    def render(self) -> str: ...

class HTMLWidget:
    def render(self) -> str:
        return "<div>Widget</div>"

def display(item: Renderable) -> None:
    print(item.render())

# HTMLWidget automatically satisfies Renderable protocol!
display(HTMLWidget())`,
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
              en: 'Structured App Error Base & Exception Chaining',
              vi: 'Lớp Lỗi Khởi Tạo Dành Cho App & Exception Chaining',
            },
            content: {
              en: 'In production systems, never catch or raise generic `Exception`. Define a single base `AppError` exception class for your application, and derive specific domain errors (`NotFoundError`, `ValidationError`, `AuthError`) from it. Use exception chaining (`raise CustomError() from err`) to preserve original traceback causes (`__cause__`).',
              vi: 'Trong hệ thống production, không bao giờ bắt hoặc raise `Exception` chung chung. Hãy định nghĩa một lớp lỗi gốc `AppError` cho ứng dụng và kế thừa các lỗi nghiệp vụ cụ thể (`NotFoundError`, `ValidationError`, `AuthError`). Dùng exception chaining (`raise CustomError() from err`) để giữ nguyên vết traceback nguyên bản (`__cause__`).',
            },
            codeBlock: {
              language: 'python',
              filename: 'exception_hierarchy.py',
              code: `class BaseAppError(Exception):
    """Base exception for all application errors."""
    def __init__(self, message: str, code: str):
        super().__init__(message)
        self.code = code

class UserNotFoundError(BaseAppError):
    def __init__(self, user_id: str):
        super().__init__(f"User {user_id} not found", "USER_NOT_FOUND")

try:
    raise ValueError("DB Connection Timeout")
except ValueError as err:
    raise UserNotFoundError("USR-101") from err`,
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
              en: 'Global Terminal Command Linking with pyproject.toml',
              vi: 'Đăng Ký Lệnh Terminal Toàn Cục Với pyproject.toml',
            },
            content: {
              en: 'Modern Python packaging uses `pyproject.toml` (PEP 621) to define build metadata and CLI script entry points under `[project.scripts]`. Running `pip install -e .` links executable entry points directly into virtual environment PATH binaries.',
              vi: 'Đóng gói Python hiện đại sử dụng file `pyproject.toml` (PEP 621) để khai báo metadata và CLI script entrypoint trong mục `[project.scripts]`. Chạy `pip install -e .` sẽ tự liên kết file thực thi trực tiếp vào thư mục PATH của môi trường ảo.',
            },
            codeBlock: {
              language: 'toml',
              filename: 'pyproject.toml',
              code: `[build-system]
requires = ["flit_core >=3.2,<4"]
build-backend = "flit_core.buildapi"

[project]
name = "4tm-cli"
version = "1.0.0"
description = "4TM Production CLI Audit Tool"
dependencies = ["rich>=13.0.0"]

[project.scripts]
my-cli = "my_package.cli:main"`,
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
              en: 'In Python, because functions are first-class objects, you do not need heavy abstract class hierarchies to implement the Strategy pattern. You can pass plain callable functions or lambda signatures directly as strategy parameters.',
              vi: 'Trong Python, do hàm là đối tượng First-class, bạn không cần tạo cả hệ thống lớp trừu tượng cồng kềnh cho Strategy pattern. Bạn chỉ cần truyền trực tiếp các hàm hoặc lambda làm tham số chiến lược.',
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
              en: 'Use the Repository pattern to decouple core business logic from underlying database persistence engines (SQLAlchemy, Redis, Mongo, or mock in-memory stores).',
              vi: 'Sử dụng Repository pattern để tách biệt logic nghiệp vụ khỏi engine cơ sở dữ liệu bên dưới (SQLAlchemy, Redis, Mongo hoặc mock in-memory).',
            },
            codeBlock: {
              language: 'python',
              filename: 'repository_pattern.py',
              code: `from typing import Protocol

class UserRepository(Protocol):
    def get_by_id(self, user_id: str) -> dict | None: ...
    def save(self, user_data: dict) -> None: ...

class InMemoryUserRepo:
    def __init__(self):
        self._db = {}
    def get_by_id(self, user_id: str) -> dict | None:
        return self._db.get(user_id)
    def save(self, user_data: dict) -> None:
        self._db[user_data["id"]] = user_data`,
            },
          },
        ],
      },
    ],
  },
];
