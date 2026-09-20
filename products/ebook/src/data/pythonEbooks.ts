import { Book } from '../types';
import { PYTHON_HANDBOOK } from './pythonHandbook';

const RAW_PYTHON_EBOOKS: Book[] = [
  // 1. Python Handbook (Overridden below with Phase 2 flagship edition)
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
            keyIdea: {
              en: 'Python resolves identifiers using the LEGB hierarchy (Local -> Enclosing -> Global -> Built-in). UnboundLocalError occurs when a name is assigned anywhere inside a function without explicit global/nonlocal declaration.',
              vi: 'Python tìm kiếm định danh theo phân cấp LEGB (Local -> Enclosing -> Global -> Built-in). Lỗi UnboundLocalError phát sinh khi biến có lệnh gán trong hàm nhưng thiếu khai báo global/nonlocal rõ ràng.',
            },
            content: {
              en: 'The LEGB rule dictates the search hierarchy when Python looks up variable names: 1) Local (L): Variables defined inside the current function or lambda, 2) Enclosing (E): Variables in outer enclosing functions (closures), 3) Global (G): Module top-level variables, and 4) Built-in (B): Preloaded Python names (`len`, `ValueError`, `range`). When Python compiles a function body, any variable that is assigned to (with `=`, `+=`, etc.) is tagged as a Local variable for the ENTIRE function scope unless explicitly declared `global` or `nonlocal`. Attempting to read that variable before the assignment line triggers `UnboundLocalError`.',
              vi: 'Quy tắc LEGB định nghĩa thứ tự ưu tiên khi Python tìm kiếm tên biến: 1) Local (L): Biến cục bộ trong hàm hoặc lambda hiện tại, 2) Enclosing (E): Biến ở các hàm bao ngoài (closure), 3) Global (G): Biến cấp cao nhất của module, và 4) Built-in (B): Các tên được nạp sẵn (`len`, `ValueError`, `range`). Khi Python biên dịch thân hàm, bất kỳ biến nào có lệnh gán (`=`, `+=`, v.v.) đều bị đánh dấu là biến Cục bộ (Local) cho TOÀN BỘ phạm vi hàm đó, trừ khi khai báo rõ `global` hoặc `nonlocal`. Đọc biến đó trước dòng gán sẽ gây lỗi `UnboundLocalError`.',
            },
            codeBlock: {
              language: 'python',
              filename: 'legb_scope.py',
              explanation: {
                en: 'Demonstrates all four LEGB layers and how nonlocal mutates enclosing closures safely.',
                vi: 'Minh họa trọn vẹn 4 tầng LEGB và cách nonlocal thay đổi trạng thái closure an toàn.',
              },
              code: `x = "GLOBAL"  # G in LEGB

def outer():
    x = "ENCLOSING"  # E in LEGB
    
    def inner():
        nonlocal x   # Modifies Enclosing scope!
        x = "MUTATED_ENCLOSING"
        y = "LOCAL"  # L in LEGB
        print(f"L: {y}, E: {x}, B len: {len([1, 2])}") # len is B in LEGB
        
    inner()
    print("Outer x after inner mutation:", x) # Prints MUTATED_ENCLOSING

outer()`,
            },
            comparisonTable: {
              headers: [
                { en: 'Scope Layer', vi: 'Tầng Phạm Vi' },
                { en: 'Lookup Priority', vi: 'Độ Ưu Tiên' },
                { en: 'Modification Keyword', vi: 'Từ Khóa Biến Đổi' },
                { en: 'Lifecycle', vi: 'Vòng Đời' },
              ],
              rows: [
                {
                  en: ['Local (L)', '1st (Immediate check)', 'None needed (direct assignment)', 'Created on function call, destroyed on return'],
                  vi: ['Local (L)', 'Thứ 1 (Kiểm tra ngay)', 'Không cần (gán trực tiếp)', 'Tạo khi gọi hàm, hủy khi return'],
                },
                {
                  en: ['Enclosing (E)', '2nd (Closure outer functions)', 'nonlocal', 'Persists as long as inner closure is held in memory'],
                  vi: ['Enclosing (E)', 'Thứ 2 (Hàm ngoài của closure)', 'nonlocal', 'Tồn tại chừng nào closure còn được tham chiếu'],
                },
                {
                  en: ['Global (G)', '3rd (Module-level namespace)', 'global', 'Persists for interpreter process runtime'],
                  vi: ['Global (G)', 'Thứ 3 (Namespace cấp module)', 'global', 'Tồn tại suốt vòng đời tiến trình interpreter'],
                },
                {
                  en: ['Built-in (B)', '4th (builtins module)', 'Read-only / monkeypatch', 'Always available in Python runtime environment'],
                  vi: ['Built-in (B)', 'Thứ 4 (Module builtins)', 'Chỉ đọc / monkeypatch', 'Luôn sẵn sàng trong môi trường runtime'],
                },
              ],
            },
            diagram: {
              title: {
                en: 'LEGB Variable Lookup Waterfall',
                vi: 'Thác Tìm Kiếm Định Danh LEGB',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Local (L)', vi: 'Local (L)' },
                  description: {
                    en: 'Search local function namespace (fast LOAD_FAST bytecode lookup).',
                    vi: 'Tìm trong namespace cục bộ của hàm (chỉ thị LOAD_FAST siêu tốc).',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Enclosing (E)', vi: 'Enclosing (E)' },
                  description: {
                    en: 'Inspect nested outer enclosing functions (LOAD_DEREF cell objects).',
                    vi: 'Duyệt các hàm bao ngoài lồng nhau (đối tượng cell LOAD_DEREF).',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Global (G)', vi: 'Global (G)' },
                  description: {
                    en: 'Inspect current module globals dict (LOAD_GLOBAL lookup).',
                    vi: 'Tra cứu trong từ điển globals của module hiện tại (LOAD_GLOBAL).',
                  },
                },
                {
                  number: 4,
                  label: { en: 'Built-in (B)', vi: 'Built-in (B)' },
                  description: {
                    en: 'Fall back to builtins dict (len, range, Exception). Raises NameError if missing.',
                    vi: 'Cuối cùng tìm trong dict builtins. Báo NameError nếu vẫn không thấy.',
                  },
                },
              ],
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
            practicalScenario: {
              en: 'In asynchronous task workers or web request middleware, developers often write closure state counters or token refresh helpers. Forgetting `nonlocal token` inside the refresher causes Python to create an isolated local `token` variable, leaving the outer API client with expired authentication credentials indefinitely.',
              vi: 'Trong các worker xử lý bất đồng bộ hoặc middleware web, lập trình viên thường viết closure đếm trạng thái hoặc hàm làm mới token. Quên từ khóa `nonlocal token` trong hàm làm mới khiến Python tạo biến cục bộ độc lập, khiến client API bên ngoài bị giữ nguyên token hết hạn mãi mãi.',
            },
            bestPractices: {
              en: [
                'Minimize use of global variables; prefer dependency injection or class attributes.',
                'Use nonlocal only for clean, tightly scoped state machines and decorators.',
                'Avoid shadowing built-in names (never name variables list, dict, id, or str).',
              ],
              vi: [
                'Hạn chế tối đa biến global; ưu tiên truyền tham số hoặc dùng thuộc tính lớp.',
                'Chỉ dùng nonlocal cho các máy trạng thái cục bộ nhỏ và hàm decorator.',
                'Tuyệt đối không đặt tên biến trùng với built-in (tránh đặt tên list, dict, id, str).',
              ],
            },
            keyTakeaways: {
              en: [
                'LEGB defines variable resolution: Local -> Enclosing -> Global -> Built-in.',
                'Assignment inside a function designates that name as Local at compile time.',
                'nonlocal mutates outer closures; global mutates module-level variables.',
              ],
              vi: [
                'LEGB quyết định phân giải biến: Local -> Enclosing -> Global -> Built-in.',
                'Lệnh gán trong hàm tự động biến tên đó thành biến Local ngay từ lúc biên dịch.',
                'nonlocal thay đổi biến của hàm ngoài; global thay đổi biến cấp module.',
              ],
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
              en: 'MRO (Method Resolution Order) & C3 Linearization',
              vi: 'MRO (Method Resolution Order) & Thuật Toán C3 Linearization',
            },
            keyIdea: {
              en: 'MRO resolves multiple inheritance ambiguity deterministically using the C3 Linearization algorithm, governing how super() navigates parent class hierarchies without duplicate visits.',
              vi: 'MRO giải quyết sự mơ hồ trong đa kế thừa một cách tất định bằng thuật toán C3 Linearization, điều phối cách super() duyệt qua cây lớp cha mà không bị lặp lại.',
            },
            content: {
              en: 'Method Resolution Order (MRO) is the deterministic order Python uses to search for methods and attributes in a class hierarchy during multiple inheritance. Python uses the C3 Linearization algorithm to calculate MRO, ensuring three key guarantees: 1) Subclasses are always checked before their base classes, 2) Multiple inheritance parents are searched in the order specified in class definition, and 3) Monotonicity is maintained across inheritance graphs. Developers inspect MRO using `Class.__mro__` or `Class.mro()`. In diamond inheritance patterns, C3 guarantees that the common root ancestor (e.g. `object` or `Base`) is only evaluated once at the very end of the resolution chain.',
              vi: 'Method Resolution Order (MRO) là thứ tự tìm kiếm phương thức và thuộc tính trong hệ thống đa kế thừa của Python. Python áp dụng thuật toán C3 Linearization để tính toán MRO, đảm bảo 3 nguyên tắc: 1) Lớp con luôn được kiểm tra trước lớp cha, 2) Các lớp cha trong đa kế thừa được duyệt đúng theo thứ tự khai báo, và 3) Tính đơn điệu (monotonicity) được giữ nguyên trên toàn cây kế thừa. Bạn có thể xem MRO qua `Class.__mro__`. Trong mô hình kế thừa hình thoi (diamond problem), thuật toán C3 bảo đảm rằng lớp tổ tiên chung (như `object` hoặc `Base`) chỉ được gọi đúng 1 lần duy nhất ở cuối chuỗi phân giải.',
            },
            codeBlock: {
              language: 'python',
              filename: 'mro_c3_demo.py',
              explanation: {
                en: 'Demonstrates cooperative multiple inheritance using super() following the exact C3 MRO sequence.',
                vi: 'Minh họa mô hình đa kế thừa hợp tác với super() tuân thủ chuẩn xác chuỗi thứ tự C3 MRO.',
              },
              code: `class Base:
    def speak(self) -> str:
        return "Base"

class A(Base):
    def speak(self) -> str:
        return f"A -> {super().speak()}"

class B(Base):
    def speak(self) -> str:
        return f"B -> {super().speak()}"

class Child(A, B):  # Multiple inheritance diamond
    def speak(self) -> str:
        return f"Child -> {super().speak()}"

c = Child()
print("Call chain:", c.speak())
# Output: Child -> A -> B -> Base

print("\\nComputed C3 Linearization:")
for idx, cls in enumerate(Child.__mro__, start=1):
    print(f"{idx}. {cls.__name__}")
# 1. Child -> 2. A -> 3. B -> 4. Base -> 5. object`,
            },
            comparisonTable: {
              headers: [
                { en: 'Inheritance Concept', vi: 'Khái Niệm Kế Thừa' },
                { en: 'Direct Class Call (Base.method(self))', vi: 'Gọi Trực Tiếp Lớp Cha' },
                { en: 'Cooperative super() Call', vi: 'Gọi Hợp Tác Qua super()' },
              ],
              rows: [
                {
                  en: ['Diamond Problem Handling', 'Calls Base method multiple times (duplicate work)', 'Calls Base method exactly once via MRO'],
                  vi: ['Xử lý Kế thừa Hình thoi', 'Gọi hàm Base nhiều lần (gây lặp việc)', 'Gọi hàm Base đúng 1 lần theo thứ tự MRO'],
                },
                {
                  en: ['Coupling', 'Hardcodes parent class name into method body', 'Decoupled; resolved dynamically at runtime'],
                  vi: ['Độ Phụ Thuộc', 'Hardcode tên lớp cha vào thân hàm', 'Tách biệt; phân giải động lúc thực thi'],
                },
                {
                  en: ['Mixin Compatibility', 'Breaks when mixed into new class hierarchies', 'Seamlessly integrates with Mixin chains'],
                  vi: ['Tương Thích Mixin', 'Bị gãy khi ghép vào cây kế thừa mới', 'Tích hợp mượt mà với các chuỗi Mixin'],
                },
              ],
            },
            diagram: {
              title: {
                en: 'C3 Linearization Diamond Resolution Pipeline',
                vi: 'Luồng Phân Giải Kế Thừa Hình Thoi C3',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Child Class Dispatch', vi: 'Khởi Điểm Lớp Con (Child)' },
                  description: {
                    en: 'c.speak() begins in Child. super() delegates to first parent in MRO.',
                    vi: 'c.speak() bắt đầu từ Child. super() chuyển quyền gọi sang lớp cha đầu tiên.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'First Branch (A)', vi: 'Nhánh Thứ Nhất (A)' },
                  description: {
                    en: 'A.speak() executes its logic, then super() delegates to next sibling (B).',
                    vi: 'A.speak() chạy logic của mình, rồi super() chuyển sang lớp anh em kế tiếp (B).',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Second Branch (B)', vi: 'Nhánh Thứ Hai (B)' },
                  description: {
                    en: 'B.speak() executes, then super() delegates to common ancestor (Base).',
                    vi: 'B.speak() chạy, rồi super() chuyển lên tổ tiên chung (Base).',
                  },
                },
                {
                  number: 4,
                  label: { en: 'Root Resolution (Base)', vi: 'Điểm Dừng Tổ Tiên (Base)' },
                  description: {
                    en: 'Base.speak() returns value back down the call chain without duplicate calls.',
                    vi: 'Base.speak() trả kết quả ngược lại theo chuỗi gọi mà không bị lặp.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Mixing explicit Parent.method(self) calls with super() in the same inheritance tree',
                  vi: 'Trộn lẫn việc gọi tường minh Parent.method(self) với super() trong cùng một cây lớp',
                },
                why: {
                  en: 'Direct Parent calls bypass MRO tracking, causing base class initializers or methods to execute multiple times, leading to data corruption.',
                  vi: 'Gọi trực tiếp Parent sẽ bỏ qua cơ chế theo dõi của MRO, khiến hàm khởi tạo của lớp cha bị gọi lặp lại nhiều lần gây sai lệch dữ liệu.',
                },
                solution: {
                  en: 'Consistently use super().__init__() throughout every class in the inheritance hierarchy.',
                  vi: 'Luôn nhất quán sử dụng super().__init__() trên tất cả các lớp trong hệ thống kế thừa.',
                },
                codeIncorrect: `class A(Base):
    def __init__(self):
        Base.__init__(self) # Antipattern: Bypasses cooperative MRO!`,
                codeCorrect: `class A(Base):
    def __init__(self):
        super().__init__() # Cooperative MRO forwarding`,
              },
            ],
            practicalScenario: {
              en: 'In Django or FastAPI web frameworks, Mixin classes (e.g. `AuthRequiredMixin`, `JSONResponseMixin`, `LoggingMixin`) rely entirely on cooperative `super()` dispatch. If any intermediate class in the MRO forgets to call `super().dispatch()`, the entire authentication or logging chain silently breaks.',
              vi: 'Trong các framework web như Django hoặc FastAPI, các lớp Mixin (như `AuthRequiredMixin`, `JSONResponseMixin`, `LoggingMixin`) phụ thuộc hoàn toàn vào cơ chế chuyển tiếp `super()`. Nếu bất kỳ lớp trung gian nào quên gọi `super().dispatch()`, toàn bộ chuỗi kiểm tra xác thực hoặc ghi log sẽ bị ngắt âm thầm.',
            },
            bestPractices: {
              en: [
                'Always use super() instead of hardcoded base class names for cooperative inheritance.',
                'Inspect Class.__mro__ whenever designing multiple inheritance or mixin hierarchies.',
                'Ensure all method signatures in a cooperative hierarchy accept **kwargs to accommodate varied arguments.',
              ],
              vi: [
                'Luôn dùng super() thay vì ghi cứng tên lớp cha để đảm bảo tính kế thừa hợp tác.',
                'Kiểm tra Class.__mro__ mỗi khi thiết kế đa kế thừa hoặc hệ thống mixin.',
                'Đảm bảo các chữ ký phương thức trong chuỗi kế thừa chấp nhận **kwargs để linh hoạt tham số.',
              ],
            },
            keyTakeaways: {
              en: [
                'C3 Linearization guarantees single traversal of diamond root classes.',
                'super() does NOT call direct parent; it calls the next class in MRO.',
                'Subclasses always precede superclasses in the resolution order.',
              ],
              vi: [
                'Thuật toán C3 Linearization đảm bảo duyệt qua lớp gốc hình thoi đúng một lần.',
                'super() KHÔNG PHẢI gọi cha trực tiếp; nó gọi lớp kế tiếp trong chuỗi MRO.',
                'Lớp con luôn đứng trước lớp cha trong thứ tự phân giải.',
              ],
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
            keyIdea: {
              en: 'Replace manual index-based iteration with enumerate(), zip(strict=True), and star unpacking (*rest) to write idiomatic, boundary-safe, and highly readable Python loops.',
              vi: 'Thay thế vòng lặp dựa trên chỉ mục thủ công bằng enumerate(), zip(strict=True) và star unpacking (*rest) để viết code Pythonic, an toàn biên giới hạn và dễ đọc.',
            },
            content: {
              en: 'Avoid manual C-style indexing loops (`for i in range(len(lst)):`) in Python. Such indexing incurs repeated bounds checking, obscuring the underlying collection iteration logic. Use `enumerate()` when element indices are needed, `zip(..., strict=True)` for parallel lockstep iteration over multiple iterables, and extended star unpacking (`*rest`) to extract arbitrary elements from tuples and lists cleanly without fragile slice calculations.',
              vi: 'Tránh viết vòng lặp kiểu C-style thủ công (`for i in range(len(lst)):`) trong Python. Việc truy cập chỉ mục lặp lại vừa làm chậm do liên tục kiểm tra biên giới hạn, vừa làm rối logic xử lý tập hợp. Hãy dùng `enumerate()` khi cần chỉ số, dùng `zip(..., strict=True)` để lặp song song nhiều danh sách với kiểm tra đồng độ dài, và dùng star unpacking mở rộng (`*rest`) để bóc tách dữ liệu tinh gọn mà không phải tính toán cắt mảng slice dễ nhầm lẫn.',
            },
            codeBlock: {
              language: 'python',
              filename: 'unpacking_tips.py',
              explanation: {
                en: 'Demonstrates extended star unpacking, strict zip iteration, and index tracking with enumerate.',
                vi: 'Minh họa star unpacking mở rộng, hàm zip chế độ strict và theo dõi số thứ tự qua enumerate.',
              },
              code: `# Example 1 — Extended Star Unpacking
record = ["USR-102", "Alice", 98.5, "Active", "Engineering"]
user_id, name, *details, dept = record
print(f"ID: {user_id}, Name: {name}, Dept: {dept}")
print(f"Captured Details: {details}") # [98.5, 'Active']

# Example 2 — Parallel Iteration with strict zip (Python 3.10+)
names = ["Alice", "Bob", "Charlie"]
scores = [95, 88, 92]
for idx, (name, score) in enumerate(zip(names, scores, strict=True), start=1):
    print(f"#{idx} {name}: {score} pts")`,
            },
            comparisonTable: {
              headers: [
                { en: 'Iteration Pattern', vi: 'Mẫu Lặp Dữ Liệu' },
                { en: 'Idiomatic Quality', vi: 'Chuẩn Pythonic' },
                { en: 'Safety / Failure Mode', vi: 'Độ An Toàn / Nguy Cơ Lỗi' },
                { en: 'Recommended Use Case', vi: 'Tình Huống Khuyên Dùng' },
              ],
              rows: [
                {
                  en: ['range(len(items))', 'Antipattern (C-style)', 'IndexError risks; costly double-lookup', 'Legacy C porting only (discouraged)'],
                  vi: ['range(len(items))', 'Phản mẫu (C-style)', 'Nguy cơ IndexError; tra cứu 2 lần tốn kém', 'Chuyển mã C cũ (khuyên bỏ)'],
                },
                {
                  en: ['enumerate(items, start=1)', 'Highly Pythonic', 'Safe; zero index out of range errors', 'Display lists, logs, numbered reports'],
                  vi: ['enumerate(items, start=1)', 'Rất Pythonic', 'An toàn; tuyệt đối không lỗi vượt biên', 'Hiển thị danh sách, log, báo cáo'],
                },
                {
                  en: ['zip(a, b, strict=True)', 'Highly Pythonic', 'Raises ValueError if length mismatch occurs', 'Synchronized multi-column processing'],
                  vi: ['zip(a, b, strict=True)', 'Rất Pythonic', 'Báo ValueError nếu 2 mảng lệch độ dài', 'Xử lý đồng bộ nhiều cột dữ liệu'],
                },
              ],
            },
            diagram: {
              title: {
                en: 'Extended Star Unpacking Mechanics',
                vi: 'Cơ Chế Bóc Tách Với Star Unpacking',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Head Extraction', vi: 'Tách Phần Đầu' },
                  description: {
                    en: 'user_id binds to items[0], name binds to items[1].',
                    vi: 'user_id nhận items[0], name nhận items[1].',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Middle Slurp (*details)', vi: 'Gom Phần Giữa (*details)' },
                  description: {
                    en: 'Star operator collects arbitrary middle slice items[2:-1] into a fresh list.',
                    vi: 'Toán tử sao gom toàn bộ lát cắt ở giữa items[2:-1] vào một list mới.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Tail Extraction', vi: 'Tách Phần Đuôi' },
                  description: {
                    en: 'dept binds to items[-1], preserving semantic field mapping cleanly.',
                    vi: 'dept nhận giá trị cuối cùng items[-1], giữ nguyên ý nghĩa các trường.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Using default zip(a, b) without strict=True on uneven datasets',
                  vi: 'Dùng hàm zip(a, b) mặc định không có strict=True khi 2 tập dữ liệu không đều',
                },
                why: {
                  en: 'Standard zip() silently truncates evaluation to the shortest iterable, silently dropping excess data without any warning or exception.',
                  vi: 'Hàm zip() thông thường sẽ âm thầm cắt ngắn theo mảng ngắn hơn, vô tình nuốt mất các phần tử dư mà không hề có cảnh báo.',
                },
                solution: {
                  en: 'Always pass strict=True to zip() in Python 3.10+, or use itertools.zip_longest() if padding with default values is intended.',
                  vi: 'Luôn truyền strict=True vào zip() từ Python 3.10+, hoặc dùng itertools.zip_longest() nếu muốn bù giá trị mặc định.',
                },
                codeIncorrect: `names = ["Alice", "Bob", "Charlie"]
ages = [25, 30]
# Charlie is silently discarded!
for n, a in zip(names, ages):
    process(n, a)`,
                codeCorrect: `names = ["Alice", "Bob", "Charlie"]
ages = [25, 30]
# Raises ValueError immediately if data is corrupted!
for n, a in zip(names, ages, strict=True):
    process(n, a)`,
              },
            ],
            practicalScenario: {
              en: 'When parsing legacy CSV or TSV log files with variable middle columns (such as variable HTTP headers or trace spans), star unpacking (`timestamp, method, *headers, status = row.split(",")`) extracts exact boundaries in one single statement without error-prone conditional length branches.',
              vi: 'Khi bóc tách file log định dạng CSV hoặc TSV có số cột ở giữa thay đổi (như các header HTTP hoặc dấu vết trace), star unpacking (`timestamp, method, *headers, status = row.split(",")`) trích xuất chính xác 2 đầu chỉ trong một dòng lệnh duy nhất mà không cần viết các câu lệnh if phức tạp.',
            },
            bestPractices: {
              en: [
                'Pass strict=True to zip() in Python 3.10+ to raise ValueError if iterables have unequal lengths.',
                'Use enumerate(iterable, start=1) for 1-based human indexing instead of adding manual +1 counter variables.',
                'Use single star unpacking (*rest) on left-hand assignment expressions to discard unwanted middle columns.',
              ],
              vi: [
                'Truyền strict=True vào zip() từ Python 3.10+ để báo lỗi nếu độ dài hai danh sách không bằng nhau.',
                'Dùng enumerate(iterable, start=1) khi cần đánh số thứ tự từ 1 thay vì tự cộng tay biến đếm +1.',
                'Dùng star unpacking (*rest) ở biểu thức gán bên trái để loại bỏ các cột không cần thiết ở giữa.',
              ],
            },
            keyTakeaways: {
              en: [
                'Direct iteration over iterables is faster and safer than index-based range(len()).',
                'zip(strict=True) guards against silent data loss from mismatched streams.',
                'Extended star unpacking provides declarative tuple/list pattern matching.',
              ],
              vi: [
                'Lặp trực tiếp qua đối tượng iterable nhanh và an toàn hơn truy cập chỉ mục range(len()).',
                'zip(strict=True) bảo vệ mã nguồn khỏi mất mát dữ liệu âm thầm khi mảng lệch độ dài.',
                'Extended star unpacking mang lại khả năng bóc tách cấu trúc rõ ràng, chuẩn xác.',
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
              en: 'Assignment Expressions (Walrus Operator :=)',
              vi: 'Biểu Thức Gán Với Toán Tử Walrus (:=)',
            },
            keyIdea: {
              en: 'The walrus operator (:=) embeds variable assignment within expressions, eliminating duplicate function evaluations, redundant regex calls, and verbose while-read loops.',
              vi: 'Toán tử walrus (:=) nhúng phép gán biến trực tiếp vào biểu thức, loại bỏ việc tính toán hàm lặp lại, gọi regex thừa và các vòng lặp while-read dài dòng.',
            },
            content: {
              en: 'Introduced in PEP 572 (Python 3.8), assignment expressions (`:=`) allow you to assign values to variables inside expressions while returning that value immediately. This eliminates duplicate costly function evaluations inside `while` stream loops, `if` conditionals, and list filtering comprehensions. In list comprehensions, it avoids the common antipattern of evaluating an expensive filter function once in the `if` clause and a second time in the projection clause.',
              vi: 'Được giới thiệu trong PEP 572 (Python 3.8), toán tử walrus (`:=`) cho phép vừa gán giá trị vừa trả về kết quả ngay trong một biểu thức. Giúp loại bỏ việc tính toán lặp lại các hàm tốn kém trong vòng lặp `while`, câu lệnh `if` và list comprehension. Trong list comprehension, nó triệt tiêu hoàn toàn thói quen xấu gọi hàm lọc đắt đỏ 1 lần ở mệnh đề `if` rồi lại gọi lại lần nữa ở mệnh đề sinh giá trị.',
            },
            whenToUse: {
              use: {
                en: [
                  'Reading chunked streams in while loops: while (chunk := file.read(8192)):',
                  'Filtering and transforming in list comprehensions without double function evaluation',
                  'Regex match branches: if (match := pattern.search(line)):',
                ],
                vi: [
                  'Đọc stream theo từng chunk trong while loop: while (chunk := file.read(8192)):',
                  'Vừa lọc vừa biến đổi trong list comprehension mà không phải gọi lại hàm tốn kém',
                  'Nhánh so khớp regex: if (match := pattern.search(line)):',
                ],
              },
              avoid: {
                en: [
                  'Avoid overusing walrus operators in simple top-level statements where plain = is much cleaner and more readable',
                ],
                vi: [
                  'Tránh lạm dụng toán tử walrus ở các câu lệnh gán đơn giản nơi dấu = rõ ràng và dễ đọc hơn nhiều',
                ],
              },
            },
            codeBlock: {
              language: 'python',
              filename: 'walrus_idioms.py',
              explanation: {
                en: 'Extracts usernames from unstructured text lines using walrus assignment within a list comprehension.',
                vi: 'Trích xuất username từ các dòng văn bản bằng phép gán walrus ngay trong list comprehension.',
              },
              code: `import re

# Practical Example: Regex Pattern Extraction Pipeline
data_lines = [
    "USER: alice_99",
    "INVALID LINE",
    "USER: bob_2025",
    "INFO: Server booted",
    "USER: carol_dev"
]
pattern = re.compile(r"^USER:\\s*(\\w+)$")

# Walrus assigns 'm' inside comprehension filter; m is re-used in projection!
usernames = [
    m.group(1)
    for line in data_lines
    if (m := pattern.match(line)) is not None
]
print("Extracted users in single pass:", usernames)
# ['alice_99', 'bob_2025', 'carol_dev']`,
            },
            comparisonTable: {
              headers: [
                { en: 'Syntax Approach', vi: 'Cách Tiếp Cận' },
                { en: 'Evaluations Count', vi: 'Số Lần Tính Toán' },
                { en: 'Code Length & Scope', vi: 'Độ Dài Mã & Phạm Vi' },
                { en: 'Performance Impact', vi: 'Tác Động Hiệu Năng' },
              ],
              rows: [
                {
                  en: ['Double Call [f(x) for x in data if f(x)]', '2x evaluations per item', 'Short but slow; recalculates f(x)', '50% slower on expensive operations'],
                  vi: ['Gọi 2 lần [f(x) for x in data if f(x)]', '2 lần tính cho mỗi phần tử', 'Ngắn nhưng chậm; tính lại f(x)', 'Chậm hơn 50% với hàm nặng'],
                },
                {
                  en: ['Two-line loop with intermediate temp', '1x evaluation', 'Verbose 4-5 line boilerplate', 'Optimal CPU, lower visual density'],
                  vi: ['Vòng lặp 2 dòng với biến tạm', '1 lần tính', 'Dài dòng 4-5 dòng lệnh', 'CPU tối ưu, code kém súc tích'],
                },
                {
                  en: ['Walrus [(y) for x in data if (y := f(x))]', '1x evaluation', 'Single compact, readable line', 'Optimal CPU, concise expression'],
                  vi: ['Walrus [(y) for x in data if (y := f(x))]', '1 lần tính', 'Một dòng lệnh gọn gàng, trong sáng', 'CPU tối ưu, biểu thức tinh gọn'],
                },
              ],
            },
            diagram: {
              title: {
                en: 'Walrus In-Expression Assignment Lifecycle',
                vi: 'Vòng Đời Gán Biến Với Toán Tử Walrus',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Evaluate Expression', vi: 'Tính Toán Biểu Thức' },
                  description: {
                    en: 'pattern.match(line) is executed exactly once.',
                    vi: 'pattern.match(line) được thực thi đúng 1 lần duy nhất.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Bind Name (m)', vi: 'Gán Tên Biến (m)' },
                  description: {
                    en: 'Result is bound to name `m` in the current scope immediately.',
                    vi: 'Kết quả được gán ngay vào biến `m` trong phạm vi hiện tại.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Test Condition & Yield', vi: 'Kiểm Tra Điều Kiện & Xuất Giá Trị' },
                  description: {
                    en: 'Condition checks if m is not None; projection clause extracts m.group(1) without re-evaluation.',
                    vi: 'Điều kiện kiểm tra m khác None; mệnh đề trước dùng luôn m.group(1) không cần tính lại.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Forgetting parentheses around walrus expressions in conditionals: if x := func():',
                  vi: 'Quên đóng mở ngoặc đơn quanh biểu thức walrus trong câu lệnh điều kiện: if x := func():',
                },
                why: {
                  en: 'Python syntax requires explicit parentheses around assignment expressions inside statements like if or while to avoid operator precedence confusion.',
                  vi: 'Cú pháp Python bắt buộc phải có ngoặc đơn bao quanh biểu thức gán walrus trong các câu lệnh như if hoặc while để tránh nhầm lẫn thứ tự ưu tiên toán tử.',
                },
                solution: {
                  en: 'Always wrap the assignment expression in parentheses: if (x := func()):',
                  vi: 'Luôn bọc biểu thức gán trong cặp ngoặc đơn: if (x := func()):',
                },
                codeIncorrect: `if data := read_stream(): # SyntaxError in some Python sub-expressions
    process(data)`,
                codeCorrect: `if (data := read_stream()): # Valid and clear syntax
    process(data)`,
              },
            ],
            practicalScenario: {
              en: 'When consuming streaming network responses (e.g. streaming LLM tokens or socket buffer reads), `while (chunk := sock.recv(4096)):` eliminates the clunky pre-loop initial read followed by identical duplicate read statements at the bottom of the loop body.',
              vi: 'Khi đọc luồng phản hồi từ mạng (như stream token của LLM hoặc socket buffer), cú pháp `while (chunk := sock.recv(4096)):` loại bỏ hoàn toàn việc phải đọc mồi một dòng trước vòng lặp rồi lặp lại lệnh đọc đó ở cuối thân vòng lặp.',
            },
            bestPractices: {
              en: [
                'Use walrus expressions when reducing repetitive, expensive operations.',
                'Do not use walrus operators if they make the expression convoluted or difficult for teammates to read.',
                'Be aware that variables assigned by := leak into the enclosing function scope.',
              ],
              vi: [
                'Dùng biểu thức walrus khi cần giảm thiểu các thao tác tính toán lặp lại tốn kém.',
                'Không dùng walrus nếu nó làm câu lệnh trở nên rối rắm, khó đọc với đồng nghiệp.',
                'Lưu ý rằng biến được gán bởi := sẽ tồn tại trong toàn bộ phạm vi hàm bao ngoài.',
              ],
            },
            keyTakeaways: {
              en: [
                'Walrus (:=) assigns variables inside expressions without breaking expression flow.',
                'Saves 50% CPU in comprehension filtering pipelines involving functions.',
                'Parentheses are required around walrus assignments in conditional headers.',
              ],
              vi: [
                'Toán tử Walrus (:=) gán biến ngay trong biểu thức mà không ngắt mạch luồng tính toán.',
                'Tiết kiệm 50% CPU trong các chuỗi comprehension có lọc dữ liệu qua hàm.',
                'Cần bao bọc cặp ngoặc đơn quanh phép gán walrus ở đầu câu lệnh điều kiện.',
              ],
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
            keyIdea: {
              en: 'Use Python 3.9+ union operators (| and |=) for clean dictionary merging, and convert lists to sets for O(1) hash-based membership verification across large datasets.',
              vi: 'Sử dụng toán tử hợp (| và |=) từ Python 3.9+ để gộp từ điển tinh gọn, và chuyển list sang set để kiểm tra tồn tại O(1) qua bảng băm trên các tập dữ liệu lớn.',
            },
            content: {
              en: 'Python 3.9+ introduced dictionary union operators `|` (merge into new dictionary) and `|=` (update in-place). This replaces verbose `{**a, **b}` idioms with expressive syntax where right-hand values consistently override left-hand keys. Furthermore, for high-frequency membership verification, Python `set` and `dict` lookups operate in average O(1) time complexity via hash tables, compared to O(N) linear search in Python `list`. Converting lists to sets before performing repeated `in` loops in microservices yields massive orders-of-magnitude speedups.',
              vi: 'Python 3.9+ hỗ trợ toán tử hợp dict `|` (gộp thành dict mới) và `|=` (cập nhật tại chỗ). Cú pháp này thay thế mẫu `{**a, **b}` dài dòng bằng cú pháp trực quan, trong đó các key bên phải luôn đè lên key trùng bên trái. Hơn nữa, để kiểm tra sự tồn tại (membership testing) tần suất cao, `set` và `dict` trong Python chạy với độ phức tạp trung bình O(1) nhờ bảng băm, so với O(N) tìm kiếm quét tuyến tính ở `list`. Chuyển list sang set trước khi kiểm tra `in` lặp đi lặp lại giúp tăng tốc độ lên hàng trăm lần.',
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
              explanation: {
                en: 'Demonstrates cascading configuration merging with dict union and O(1) set membership lookups.',
                vi: 'Minh họa gộp cấu hình nhiều tầng bằng toán tử hợp dict và tra cứu phần tử O(1) qua tập hợp set.',
              },
              code: `# Example 1 — Cascading Configuration Layers with |
default_cfg = {"host": "localhost", "port": 8080, "debug": False, "timeout": 30}
env_cfg = {"port": 9000, "debug": True}
override_cfg = {"timeout": 60}

# Clean non-destructive cascading merge
final_cfg = default_cfg | env_cfg | override_cfg
print("Merged Config:", final_cfg)
# {'host': 'localhost', 'port': 9000, 'debug': True, 'timeout': 60}

# Example 2 — O(1) Set Membership vs O(N) List Scan
allowed_roles = {"ADMIN", "STAFF", "OPERATOR"} # Set: O(1) average lookup
user_role = "ADMIN"
if user_role in allowed_roles:
    print("Access granted via O(1) hash check")`,
            },
            diagram: {
              title: {
                en: 'Dict Union and Set Hashing Mechanics',
                vi: 'Cơ Chế Hợp Từ Điển & Bảng Băm Của Set',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Base Mapping Copy', vi: 'Sao Chép Ánh Xạ Gốc' },
                  description: {
                    en: 'dict_a keys and values populate initial hash table buckets.',
                    vi: 'Các cặp key-value của dict_a được đưa vào các bucket bảng băm ban đầu.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Right-Side Overwrite', vi: 'Ghi Đè Từ Dict Phải' },
                  description: {
                    en: 'dict_b items are evaluated; matching keys update existing values, novel keys insert.',
                    vi: 'dict_b được duyệt; key trùng thì cập nhật giá trị mới, key lạ thì thêm vào.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Immutable Set Hash Index', vi: 'Chỉ Mục Băm Của Set' },
                  description: {
                    en: 'Set elements compute hash(item); membership check tests bucket index directly in O(1) steps.',
                    vi: 'Phần tử set tính hash(item); kiểm tra in nhảy thẳng vào bucket tương ứng O(1).',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Performing repeated membership tests: if item in large_list: inside a loop',
                  vi: 'Kiểm tra sự tồn tại liên tục: if item in large_list: bên trong vòng lặp',
                },
                why: {
                  en: 'Checking `item in list` requires traversing the list from index 0 to N. Inside an M-item loop, this turns O(M) processing into accidental O(M * N) quadratic stagnation.',
                  vi: 'Kiểm tra `item in list` phải duyệt tuần tự từ phần tử 0 đến N. Nằm trong vòng lặp M phần tử, nó biến độ phức tạp O(M) thành O(M * N) gây treo nghẽn hệ thống.',
                },
                solution: {
                  en: 'Pre-convert the list to a set once before entering the loop: lookup_set = set(large_list).',
                  vi: 'Chuyển list sang set một lần duy nhất trước khi vào vòng lặp: lookup_set = set(large_list).',
                },
                codeIncorrect: `banned_users = ["u1", "u2", "u3", ...] # 50,000 items in list
for req in incoming_requests: # 100,000 requests
    if req.user_id in banned_users: # O(N) scan every time! (5B operations)
        reject(req)`,
                codeCorrect: `banned_set = set(banned_users) # 1x conversion to hash table
for req in incoming_requests:
    if req.user_id in banned_set: # O(1) instant lookup!
        reject(req)`,
              },
            ],
            practicalScenario: {
              en: 'In microservice API gateways, request validation against forbidden IP blacklists or token revocation registries must execute under 2 milliseconds. Using set lookups (`ip in blacklist_set`) ensures constant-time O(1) response latency regardless of whether the blacklist has 10 or 1,000,000 addresses.',
              vi: 'Trong gateway API của hệ thống microservice, việc xác thực request với danh sách đen IP hoặc blacklist token phải hoàn thành dưới 2 mili giây. Dùng tra cứu set (`ip in blacklist_set`) bảo đảm độ trễ O(1) tức thì dù blacklist có 10 hay 1.000.000 địa chỉ.',
            },
            bestPractices: {
              en: [
                'Use dict union | when merging configuration dicts to keep base dicts pure and unmutated.',
                'Use |= when mutating existing state dictionaries in-place to avoid allocating new memory.',
                'Always prefer sets or dictionaries over lists when performing more than 2-3 membership checks.',
              ],
              vi: [
                'Dùng phép hợp dict | khi gộp cấu hình để giữ nguyên vẹn các dict thành phần ban đầu.',
                'Dùng |= khi muốn cập nhật trực tiếp dict trạng thái hiện tại để tiết kiệm bộ nhớ.',
                'Luôn ưu tiên set hoặc dict thay cho list khi cần kiểm tra sự tồn tại từ 2-3 lần trở lên.',
              ],
            },
            keyTakeaways: {
              en: [
                'Dictionary union (|) provides non-destructive, right-precedence merging.',
                'Set and dict membership checks (in) run in O(1) average time via hash tables.',
                'Converting list to set before nested loops eliminates accidental quadratic latency.',
              ],
              vi: [
                'Toán tử hợp dict (|) mang lại khả năng gộp dữ liệu không hủy hoại, ưu tiên vế phải.',
                'Kiểm tra sự tồn tại trong set và dict (in) đạt tốc độ O(1) trung bình nhờ bảng băm.',
                'Chuyển list sang set trước vòng lặp lồng nhau triệt tiêu nguy cơ tắc nghẽn O(N^2).',
              ],
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
            keyIdea: {
              en: 'Default arguments in Python evaluate once at function definition time and are stored in function.__defaults__. Supplying a mutable object directly in the signature creates unintended shared state across all future invocations.',
              vi: 'Tham số mặc định trong Python được tính toán đúng một lần khi định nghĩa hàm và lưu vào function.__defaults__. Đặt đối tượng khả biến trực tiếp vào chữ ký hàm sẽ tạo ra trạng thái dùng chung ngoài ý muốn qua mọi lần gọi sau đó.',
            },
            content: {
              en: 'In Python, default argument expressions in function signatures are evaluated ONCE when the function definition is executed at module import time, NOT on subsequent function invocations. If a default argument is mutable (such as `list`, `dict`, or `set`), that single object instance is stored in `function.__defaults__` tuple and shared across ALL invocations where the argument is omitted. To provide an optional mutable container safely, always follow the Sentinel Pattern: use `None` as the default argument value in the signature, and initialize a fresh mutable instance inside the function body if the argument is `None`.',
              vi: 'Trong Python, biểu thức tham số mặc định ở khai báo hàm được tính toán MỘT LẦN duy nhất khi câu lệnh định nghĩa hàm thực thi lúc nạp module, KHÔNG PHẢI ở mỗi lần gọi hàm sau đó. Nếu tham số mặc định là đối tượng khả biến (như `list`, `dict`, `set`), đối tượng duy nhất đó được lưu vào tuple `function.__defaults__` và dùng chung cho TẤT CẢ các lần gọi hàm bỏ qua tham số đó. Để cấp container khả biến an toàn, hãy luôn tuân thủ Mẫu Sentinel: đặt `None` làm giá trị mặc định ở chữ ký, và khởi tạo đối tượng mới bên trong thân hàm nếu biến nhận giá trị `None`.',
            },
            codeBlock: {
              language: 'python',
              filename: 'mutable_defaults.py',
              explanation: {
                en: 'Demonstrates internal storage of mutable defaults in __defaults__ tuple vs safe None sentinel isolation.',
                vi: 'Minh họa cơ chế lưu ngầm tham số mutable trong tuple __defaults__ và cách cô lập an toàn bằng sentinel None.',
              },
              code: `# Bug demonstration: inspect underlying __defaults__
def add_item_buggy(val: int, accumulator: list = []) -> list:
    accumulator.append(val)
    return accumulator

print(add_item_buggy(1)) # [1]
print(add_item_buggy(2)) # [1, 2] - Leaked state!
print("Underlying __defaults__:", add_item_buggy.__defaults__)
# Underlying __defaults__: ([1, 2],)

# Idiomatic Solution: None Sentinel Pattern
def add_item_safe(val: int, accumulator: list | None = None) -> list:
    if accumulator is None:
        accumulator = [] # Fresh list per invocation
    accumulator.append(val)
    return accumulator

print(add_item_safe(1)) # [1]
print(add_item_safe(2)) # [2] - Pristine isolation!`,
            },
            comparisonTable: {
              headers: [
                { en: 'Approach', vi: 'Cách Tiếp Cận' },
                { en: 'Allocation Moment', vi: 'Thời Điểm Khởi Tạo' },
                { en: 'Multi-Call State Isolation', vi: 'Cô Lập Trạng Thái Qua Các Lần Gọi' },
                { en: 'Thread Safety', vi: 'An Toàn Đa Luồng' },
              ],
              rows: [
                {
                  en: ['Mutable Default (items=[])', 'Module import time (1x)', 'Shared (Dirty state across calls)', 'Dangerous race conditions'],
                  vi: ['Default khả biến (items=[])', 'Lúc import module (1 lần)', 'Dùng chung (Nhiễm bẩn dữ liệu)', 'Nguy cơ Race condition'],
                },
                {
                  en: ['None Sentinel (items=None)', 'Function invocation time', 'Completely isolated per call', 'Safe independent instances'],
                  vi: ['Sentinel None (items=None)', 'Mỗi khi gọi hàm', 'Hoàn toàn độc lập qua các lần gọi', 'An toàn với các thể hiện riêng'],
                },
              ],
            },
            diagram: {
              title: {
                en: 'Default Argument Memory Lifecycle',
                vi: 'Vòng Đời Bộ Nhớ Của Tham Số Mặc Định',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Module Load', vi: 'Nạp Module' },
                  description: {
                    en: 'Python compiler encounters def func(x=[]). Allocates single list at memory address 0x100.',
                    vi: 'Compiler gặp câu lệnh def func(x=[]). Cấp phát 1 list duy nhất tại ô nhớ 0x100.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Store in __defaults__', vi: 'Lưu Vào __defaults__' },
                  description: {
                    en: 'Address 0x100 is pinned into func.__defaults__ tuple metadata permanently.',
                    vi: 'Địa chỉ 0x100 được ghim cố định vào metadata tuple func.__defaults__.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Invocation Contamination', vi: 'Nhiễm Bẩn Khi Gọi' },
                  description: {
                    en: 'Each omitted call mutates object at 0x100 in-place, leaking history across callers.',
                    vi: 'Mỗi lần gọi hàm không truyền tham số sẽ sửa trực tiếp ô nhớ 0x100, làm rò rỉ dữ liệu.',
                  },
                },
              ],
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
            practicalScenario: {
              en: 'In REST API endpoints, accepting `tags: list = []` or `metadata: dict = {}` in a request handler causes every user request that omits tags to append to the exact same list in server memory, leaking sensitive user data and tags across completely unrelated accounts.',
              vi: 'Trong handler của endpoint REST API, khai báo `tags: list = []` hoặc `metadata: dict = {}` khiến mọi request người dùng không gửi tags đều bị ghi đè vào chung một list trong bộ nhớ server, làm lộ dữ liệu nhạy cảm giữa các tài khoản hoàn toàn khác nhau.',
            },
            bestPractices: {
              en: [
                'Never use mutable objects (list, dict, set, custom classes) as default parameter values.',
                'Use None as the universal sentinel default, typed as Optional[T] or T | None.',
                'If None is a valid input payload, create a custom unique sentinel object: _SENTINEL = object().',
              ],
              vi: [
                'Không bao giờ đặt đối tượng khả biến (list, dict, set, class) làm tham số mặc định.',
                'Luôn dùng None làm sentinel mặc định phổ thông, khai báo kiểu T | None.',
                'Nếu None cũng là giá trị hợp lệ của input, hãy tạo object sentinel riêng biệt: _SENTINEL = object().',
              ],
            },
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
            keyIdea: {
              en: 'Python closures capture variables by reference, not by value. Functions created in loops resolve closed-over variables at invocation time, causing every function to see the loops final terminal value.',
              vi: 'Closure trong Python bắt giữ biến theo tham chiếu, không phải theo giá trị. Các hàm tạo trong vòng lặp chỉ tra cứu biến khi được gọi thực thi, khiến mọi hàm đều thấy giá trị ở vòng lặp kết thúc cuối cùng.',
            },
            content: {
              en: 'Python closures bind variables by *reference* to a memory cell (`__closure__`), not by snapshot value. When nested functions or lambdas are created inside a loop, they capture the variable symbol in the enclosing scope. By the time the functions are eventually invoked later, the loop has completed its iterations, and all closures resolve the exact same shared cell to its final terminal iteration value. To capture the current iteration value at creation time, bind it immediately as a default argument (`lambda i=i: ...`) or use `functools.partial`.',
              vi: 'Closure trong Python liên kết các biến theo *tham chiếu* tới ô nhớ (`__closure__`), chứ không chụp lại giá trị tại thời điểm tạo. Khi hàm lồng nhau hoặc lambda được tạo trong vòng lặp, chúng cùng trỏ tới một ký hiệu biến ở scope ngoài. Khi các hàm này được kích hoạt sau đó, vòng lặp đã chạy xong và tất cả closure đều truy xuất vào cùng một ô nhớ chứa giá trị kết thúc của vòng lặp. Để cố định giá trị hiện tại ngay lúc tạo, hãy dùng tham số mặc định (`lambda i=i: ...`) hoặc sử dụng `functools.partial`.',
            },
            codeBlock: {
              language: 'python',
              filename: 'late_binding_closure.py',
              explanation: {
                en: 'Demonstrates late-binding closure bug and inspection of __closure__ cells vs early-binding solutions.',
                vi: 'Minh họa lỗi late-binding, soi ô nhớ __closure__ và hai giải pháp liên kết sớm chuẩn xác.',
              },
              code: `# Bug: All closures share the same cell reference
funcs = []
for i in range(3):
    funcs.append(lambda: i * 10)

print("Buggy output:", [f() for f in funcs]) # [20, 20, 20]!
print("Underlying closure cell:", funcs[0].__closure__[0].cell_contents) # 2

# Solution A: Default Argument Capture (Idiomatic & Fast)
funcs_early = [lambda i=i: i * 10 for i in range(3)]
print("Default arg fix:", [f() for f in funcs_early]) # [0, 10, 20]

# Solution B: functools.partial (Explicit & Highly Readable)
from functools import partial
def multiply(val, factor):
    return val * factor

funcs_partial = [partial(multiply, factor=i) for i in range(3)]
print("Partial fix:", [f(10) for f in funcs_partial]) # [0, 10, 20]`,
            },
            comparisonTable: {
              headers: [
                { en: 'Pattern', vi: 'Mẫu Thiết Kế' },
                { en: 'Binding Mechanism', vi: 'Cơ Chế Liên Kết' },
                { en: 'Value Evaluated At', vi: 'Thời Điểm Đánh Giá Giá Trị' },
                { en: 'Output for 0..2', vi: 'Kết Quả với 0..2' },
              ],
              rows: [
                {
                  en: ['Standard lambda: i', 'Late reference via cell', 'Invocation time (post-loop)', '[2, 2, 2] (Defective)'],
                  vi: ['Lambda thường: lambda: i', 'Tham chiếu trễ qua cell', 'Lúc gọi hàm (sau vòng lặp)', '[2, 2, 2] (Lỗi)'],
                },
                {
                  en: ['Default arg: lambda i=i: i', 'Early evaluation into __defaults__', 'Function definition time', '[0, 1, 2] (Correct)'],
                  vi: ['Tham số mặc định: lambda i=i: i', 'Đánh giá sớm vào __defaults__', 'Lúc định nghĩa hàm', '[0, 1, 2] (Đúng)'],
                },
                {
                  en: ['functools.partial(fn, i)', 'Freezes argument in partial object', 'Instantiation time', '[0, 1, 2] (Correct & Pure)'],
                  vi: ['functools.partial(fn, i)', 'Đóng băng tham số trong partial', 'Lúc khởi tạo đối tượng', '[0, 1, 2] (Đúng & Tinh khiết)'],
                },
              ],
            },
            diagram: {
              title: {
                en: 'Closure Variable Cell Resolution Flow',
                vi: 'Luồng Phân Giải Ô Nhớ Của Closure',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Iteration Cycle', vi: 'Vòng Lặp Chạy' },
                  description: {
                    en: 'Loop iterates i from 0 -> 1 -> 2. Variable i occupies single enclosing cell 0x500.',
                    vi: 'Vòng lặp tăng i từ 0 -> 1 -> 2. Biến i nằm tại ô nhớ bao ngoài 0x500.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Cell Retention', vi: 'Giữ Ô Nhớ' },
                  description: {
                    en: 'All 3 lambdas hold references to cell 0x500; value inside cell overwrites until final state (2).',
                    vi: 'Cả 3 hàm lambda đều trỏ vào cell 0x500; giá trị trong cell bị ghi đè tới số 2 cuối cùng.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Deferred Invocation', vi: 'Kích Hoạt Sau Đó' },
                  description: {
                    en: 'When invoked, each lambda dereferences cell 0x500, simultaneously reading 2.',
                    vi: 'Khi được gọi, mỗi lambda giải phóng tham chiếu ô 0x500, đồng loạt đọc ra số 2.',
                  },
                },
              ],
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
            practicalScenario: {
              en: 'In UI frameworks (Tkinter, PyQt) or web event dispatchers, attaching click handlers in a loop (`button.on_click = lambda: submit(item_id)`) causes every button on the page to submit the ID of the last item in the list. Using `lambda item_id=item_id: submit(item_id)` ensures each button fires for its respective item.',
              vi: 'Trong lập trình giao diện UI (Tkinter, PyQt) hoặc bộ điều phối sự kiện web, việc gắn hàm click trong vòng lặp (`button.on_click = lambda: submit(item_id)`) sẽ khiến mọi nút trên màn hình đều gửi đi ID của phần tử cuối cùng. Sử dụng `lambda item_id=item_id: submit(item_id)` đảm bảo mỗi nút bấm kích hoạt đúng phần tử tương ứng của nó.',
            },
            bestPractices: {
              en: [
                'Use default argument assignment (x=x) inside loops to snapshot loop variables cleanly.',
                'Use functools.partial for complex callbacks where explicit signatures improve readability.',
                'Inspect __closure__ metadata during debugging when encountering unexpected shared state.',
              ],
              vi: [
                'Dùng phép gán tham số mặc định (x=x) trong vòng lặp để chụp lại giá trị biến ngay lập tức.',
                'Dùng functools.partial cho các callback phức tạp nhằm tăng tính minh bạch của chữ ký hàm.',
                'Soi metadata __closure__ khi gỡ lỗi để phát hiện trạng thái dùng chung ô nhớ bất thường.',
              ],
            },
            keyTakeaways: {
              en: [
                'Closures capture variable names and cells, never instantaneous scalar values.',
                'Late-binding resolves values at execution time, not at closure definition time.',
                'Early binding via default arguments or partial objects guarantees parameter isolation.',
              ],
              vi: [
                'Closure bắt giữ tên biến và ô nhớ (cell), không chụp lại giá trị vô hướng tại chỗ.',
                'Late-binding phân giải giá trị lúc thực thi, không phải lúc định nghĩa closure.',
                'Liên kết sớm qua tham số mặc định hoặc partial đảm bảo cô lập giá trị tuyệt đối.',
              ],
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
              en: 'Container Clones vs Reference Sharing',
              vi: 'Sao Chép Vỏ Container vs Chia Sẻ Tham Chiếu',
            },
            keyIdea: {
              en: 'Shallow copies (list.copy(), dict.copy(), copy.copy()) create a new outer shell but reuse inner item pointers. Mutating a nested mutable object corrupts the original data structure.',
              vi: 'Sao chép nông (list.copy(), dict.copy(), copy.copy()) tạo một vỏ container mới nhưng tái sử dụng con trỏ tới các phần tử con bên trong. Biến đổi đối tượng con lồng nhau sẽ làm hỏng dữ liệu gốc.',
            },
            content: {
              en: 'In Python, shallow copy operations (`list.copy()`, `dict.copy()`, `copy.copy()`, or slicing `lst[:]`) create a new outer container object, but populate it with references to the original inner items. If the container holds nested mutable structures (lists, dicts, custom model objects), modifying any nested object via the clone alters the original object as well. To duplicate nested data structures independently down to their terminal leaf values, use `copy.deepcopy()`.',
              vi: 'Trong Python, phép sao chép nông (`list.copy()`, `dict.copy()`, `copy.copy()`, hoặc cắt lát `lst[:]`) tạo ra một vỏ container ngoài mới, nhưng lại điền vào đó các tham chiếu trỏ tới đối tượng gốc bên trong. Nếu container chứa các cấu trúc khả biến lồng nhau (list, dict, object mô hình), sửa đổi bất kỳ phần tử con nào qua bản sao cũng sẽ làm biến dạng đối tượng gốc. Để sao chép hoàn toàn độc lập tới tận các giá trị lá sâu nhất, hãy dùng `copy.deepcopy()`.',
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
            codeBlock: {
              language: 'python',
              filename: 'shallow_deep_copy.py',
              explanation: {
                en: 'Demonstrates accidental mutation via shallow copy vs total tree isolation with copy.deepcopy().',
                vi: 'Minh họa lỗi sửa nhầm dữ liệu gốc qua shallow copy và sự cô lập toàn diện với copy.deepcopy().',
              },
              code: `import copy

# Original nested structure
orig = {"user": "Alice", "preferences": {"theme": "dark", "notifications": True}}

# Shallow Copy: creates new outer dict, but shares preferences dict!
shallow = orig.copy()
shallow["preferences"]["theme"] = "light"

print("Original theme after shallow edit:", orig["preferences"]["theme"])
# Output: 'light' (Dirty mutation leaked!)

# Deep Copy: recursively clones all nested objects
deep = copy.deepcopy(orig)
deep["preferences"]["theme"] = "cyberpunk"

print("Original theme after deep edit:", orig["preferences"]["theme"])
# Output: 'light' (Original remains untouched!)
print("Deep clone theme:", deep["preferences"]["theme"])
# Output: 'cyberpunk'`,
            },
            diagram: {
              title: {
                en: 'Shallow vs Deep Copy Memory Graphs',
                vi: 'Sơ Đồ Bộ Nhớ Giữa Shallow Copy và Deep Copy',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Outer Allocation', vi: 'Cấp Phát Vỏ Ngoài' },
                  description: {
                    en: 'Both shallow and deep copies allocate a fresh root dictionary with a distinct id().',
                    vi: 'Cả shallow và deep copy đều cấp phát dict gốc mới với id() hoàn toàn khác.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Shallow Pointer Re-use', vi: 'Tái Sử Dụng Con Trỏ Nông' },
                  description: {
                    en: 'Shallow copy assigns dict["preferences"] -> 0x900 (pointing to original sub-dict in memory).',
                    vi: 'Shallow copy gán dict["preferences"] -> 0x900 (trỏ thẳng vào sub-dict gốc trong RAM).',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Deep Recursive Cloner', vi: 'Sao Chép Đệ Quy Sâu' },
                  description: {
                    en: 'Deep copy traverses children, instantiating new child dict 0x901 and updating references recursively.',
                    vi: 'Deep copy duyệt qua các con, khởi tạo dict con mới 0x901 và cập nhật tham chiếu đệ quy.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Using nested list multiplication [[0] * 3] * 3 to create a 2D matrix',
                  vi: 'Dùng phép nhân list lồng nhau [[0] * 3] * 3 để tạo ma trận 2 chiều',
                },
                why: {
                  en: 'The outer multiplication repeats the exact same inner list reference 3 times. Changing matrix[0][0] modifies all 3 rows simultaneously!',
                  vi: 'Phép nhân mảng ngoài sao chép tham chiếu của cùng 1 hàng con 3 lần. Sửa matrix[0][0] sẽ làm biến đổi cả 3 hàng cùng lúc!',
                },
                solution: {
                  en: 'Use a list comprehension to allocate fresh rows: [[0 for _ in range(3)] for _ in range(3)].',
                  vi: 'Dùng list comprehension để cấp phát từng hàng độc lập: [[0 for _ in range(3)] for _ in range(3)].',
                },
                codeIncorrect: `grid = [[0] * 3] * 3 # 3 rows sharing 1 list!
grid[0][0] = 99
print(grid) # [[99, 0, 0], [99, 0, 0], [99, 0, 0]]`,
                codeCorrect: `grid = [[0] * 3 for _ in range(3)] # 3 distinct list allocations
grid[0][0] = 99
print(grid) # [[99, 0, 0], [0, 0, 0], [0, 0, 0]]`,
              },
            ],
            practicalScenario: {
              en: 'In transaction processing or rule simulation engines, taking a shallow snapshot of a user shopping cart before applying experimental coupon discounts mutates the live customer cart if line items or tax sub-dictionaries are modified in-flight. Deep copying guarantees speculative modifications remain completely quarantined.',
              vi: 'Trong hệ thống xử lý giao dịch hoặc mô phỏng quy tắc giá, việc chụp ảnh giỏ hàng bằng shallow copy trước khi áp dụng mã giảm giá thử nghiệm sẽ làm thay đổi luôn giỏ hàng thật của khách nếu các sub-dict thuế hoặc chi tiết đơn hàng bị sửa. Deep copy đảm bảo các tính toán giả định được cách ly an toàn 100%.',
            },
            bestPractices: {
              en: [
                'Use shallow copy (a.copy()) only when collections are guaranteed to contain 1D primitive scalars (numbers, strings).',
                'Use copy.deepcopy() whenever manipulating nested dictionaries, lists, or custom dataclasses.',
                'Beware that deepcopy is slower on gigantic object graphs; consider immutable data structures if performance is critical.',
              ],
              vi: [
                'Chỉ dùng shallow copy (a.copy()) khi danh sách chắc chắn là dữ liệu 1 chiều nguyên thủy (số, chuỗi).',
                'Dùng copy.deepcopy() khi thao tác trên từ điển lồng nhau, danh sách nhiều cấp hoặc dataclass.',
                'Lưu ý deepcopy có chi phí hiệu năng trên cây đối tượng khổng lồ; cân nhắc cấu trúc bất biến nếu cần tốc độ.',
              ],
            },
            keyTakeaways: {
              en: [
                'Shallow copy clones only the top-level collection shell; children are shared pointers.',
                'Multiplying lists of lists ([[0]] * N) creates N aliases to a single memory address.',
                'copy.deepcopy() walks the entire object graph, memoizing cycles and cloning every level.',
              ],
              vi: [
                'Shallow copy chỉ nhân bản vỏ container tầng trên cùng; các phần tử con vẫn dùng chung con trỏ.',
                'Nhân bản list con ([[0]] * N) tạo ra N bí danh cùng trỏ vào một địa chỉ ô nhớ duy nhất.',
                'copy.deepcopy() duyệt toàn bộ đồ thị đối tượng, xử lý vòng lặp và sao chép từng cấp độc lập.',
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
            keyIdea: {
              en: 'Leverage Python 3.10+ pipe unions (int | str) for clean type signatures, and typing.Protocol for compile-time duck-typing without rigid inheritance coupling.',
              vi: 'Tận dụng toán tử hợp thanh đứng (int | str) từ Python 3.10+ cho chữ ký kiểu rõ ràng, và typing.Protocol cho mô hình duck-typing tĩnh tại thời điểm biên dịch mà không bị ràng buộc kế thừa cứng nhắc.',
            },
            content: {
              en: 'Modern Python (3.10+) eliminates verbose imports from `typing` by supporting the native pipe union operator (`int | str` instead of `Union[int, str]`, and `T | None` instead of `Optional[T]`). For interface definition, `typing.Protocol` enables static structural subtyping (compile-time duck typing). Unlike classical Abstract Base Classes (`abc.ABC`), implementers do not need to import or inherit from the Protocol class; MyPy and Pyright automatically certify compliance as long as the concrete class implements the requisite method signatures.',
              vi: 'Python hiện đại (3.10+) loại bỏ sự rườm rà khi phải import từ thư viện `typing` bằng việc hỗ trợ trực tiếp toán tử thanh đứng (`int | str` thay cho `Union[int, str]`, và `T | None` thay cho `Optional[T]`). Để định nghĩa interface, `typing.Protocol` đem lại mô hình phụ kiểu cấu trúc tĩnh (structural subtyping / duck-typing lúc biên dịch). Khác với lớp trừu tượng kinh điển (`abc.ABC`), các lớp triển khai không cần kế thừa từ Protocol; MyPy và Pyright sẽ tự động công nhận tính tương thích miễn là lớp đó có đủ các phương thức tương ứng.',
            },
            comparisonTable: {
              headers: [
                { en: 'Abstraction Mechanism', vi: 'Cơ Chế Trừu Tượng' },
                { en: 'Coupling Type', vi: 'Mức Độ Ghép Nối' },
                { en: 'Inheritance Required?', vi: 'Cần Kế Thừa Trực Tiếp?' },
                { en: 'Third-Party Interop', vi: 'Tương Thích Thư Viện Ngoài' },
              ],
              rows: [
                {
                  en: ['Nominal Subtyping (abc.ABC)', 'Rigid Nominal', 'Yes (Explicit subclassing)', 'Poor (Cannot subclass 3rd party classes)'],
                  vi: ['Phụ kiểu định danh (abc.ABC)', 'Ràng buộc cứng', 'Có (Phải kế thừa rõ ràng)', 'Kém (Không sửa được class của bên thứ ba)'],
                },
                {
                  en: ['Structural Subtyping (typing.Protocol)', 'Flexible Structural', 'No (Zero inheritance needed)', 'Excellent (Validates any matching object)'],
                  vi: ['Phụ kiểu cấu trúc (typing.Protocol)', 'Linh hoạt cấu trúc', 'Không (Không cần kế thừa)', 'Tuyệt vời (Khớp mọi object có cùng hàm)'],
                },
              ],
            },
            codeBlock: {
              language: 'python',
              filename: 'typing_protocols.py',
              explanation: {
                en: 'Defines a structural protocol and passes an uncoupled third-party class that satisfies the interface.',
                vi: 'Định nghĩa một protocol cấu trúc và truyền một đối tượng không kế thừa nhưng vẫn thỏa mãn interface.',
              },
              code: `from typing import Protocol, runtime_checkable

@runtime_checkable
class Renderable(Protocol):
    """Structural interface: Any object with a .render() -> str method."""
    def render(self) -> str: ...

class HTMLWidget:
    """Zero inheritance from Renderable! Completely decoupled."""
    def __init__(self, content: str):
        self.content = content

    def render(self) -> str:
        return f"<div class='card'>{self.content}</div>"

def display(item: Renderable) -> str:
    # Static type checker guarantees item has .render() -> str
    return item.render()

widget = HTMLWidget("Hello World")
print(display(widget))
print("Is instance check:", isinstance(widget, Renderable)) # True!`,
            },
            diagram: {
              title: {
                en: 'Nominal vs Structural Subtyping Verification',
                vi: 'Cơ Chế Kiểm Tra Kiểu Định Danh vs Kiểu Cấu Trúc',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Interface Contract', vi: 'Hợp Đồng Giao Diện' },
                  description: {
                    en: 'Protocol declares required shape: render() -> str.',
                    vi: 'Protocol khai báo cấu trúc cần có: render() -> str.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Independent Implementation', vi: 'Triển Khai Độc Lập' },
                  description: {
                    en: 'Third-party library author creates HTMLWidget with render() without knowing Renderable exists.',
                    vi: 'Thư viện bên ngoài tạo HTMLWidget có hàm render() mà không hề biết tới Renderable.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Compile-Time Certification', vi: 'Xác Thực Lúc Biên Dịch' },
                  description: {
                    en: 'Static type checker (MyPy) matches methods structurally and passes verification with 0 errors.',
                    vi: 'Bộ kiểm tra kiểu tĩnh (MyPy) so khớp cấu trúc phương thức và thông qua với 0 lỗi.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Forcing third-party or library classes into ABC hierarchies with manual wrapper classes',
                  vi: 'Ép các lớp thư viện bên ngoài vào cây kế thừa ABC bằng các wrapper class thủ công',
                },
                why: {
                  en: 'ABC requires subclasses to declare explicit inheritance, creating boilerplate adapter code.',
                  vi: 'ABC bắt buộc các lớp con phải khai báo kế thừa tường minh, tạo ra hàng loạt adapter trung gian thừa thãi.',
                },
                solution: {
                  en: 'Replace ABC with typing.Protocol to allow any class matching the signature to pass static verification.',
                  vi: 'Thay ABC bằng typing.Protocol để cho phép mọi class có cùng chữ ký phương thức được chấp nhận ngay.',
                },
                codeIncorrect: `from abc import ABC, abstractmethod
class Writer(ABC):
    @abstractmethod
    def write(self, data: str) -> None: ...

# Cannot pass io.StringIO directly without writing an adapter wrapper!`,
                codeCorrect: `from typing import Protocol
class Writer(Protocol):
    def write(self, data: str) -> int: ...

# Standard library io.StringIO or any file-like object passes statically!`,
              },
            ],
            practicalScenario: {
              en: 'In pluggable microservice plugins or multi-cloud storage drivers, defining `StorageBackend(Protocol)` lets you accept AWS S3, Google Cloud Storage, or local disk drivers interchangeably without forcing all drivers to share a common base class or vendor lock-in dependency.',
              vi: 'Trong kiến trúc plugin microservice hoặc trình điều khiển lưu trữ đa đám mây, việc định nghĩa `StorageBackend(Protocol)` cho phép chấp nhận AWS S3, GCS hoặc ổ đĩa cục bộ thay thế lẫn nhau mà không bắt các driver phải kế thừa chung một lớp cơ sở hay phụ thuộc vào SDK của nhau.',
            },
            bestPractices: {
              en: [
                'Use pipe unions: x: int | str | None instead of typing.Union[int, str, None].',
                'Decorate protocols with @runtime_checkable if you need runtime isinstance() support.',
                'Keep Protocols focused and minimal (Single Responsibility Principle), typically 1-3 methods.',
              ],
              vi: [
                'Dùng toán tử union: x: int | str | None thay cho typing.Union[int, str, None].',
                'Gắn decorator @runtime_checkable cho protocol nếu cần hỗ trợ hàm isinstance() lúc chạy.',
                'Giữ Protocol tinh gọn theo nguyên lý Single Responsibility, thường chỉ từ 1 đến 3 phương thức.',
              ],
            },
            keyTakeaways: {
              en: [
                'Python 3.10+ pipe syntax (|) simplifies union and optional type annotations.',
                'typing.Protocol implements static structural typing without subclass coupling.',
                '@runtime_checkable allows isinstance checks against protocol shapes at runtime.',
              ],
              vi: [
                'Cú pháp thanh đứng (|) trong Python 3.10+ đơn giản hóa khai báo kiểu union và optional.',
                'typing.Protocol hiện thực hóa phụ kiểu cấu trúc tĩnh mà không cần ghép nối lớp con.',
                '@runtime_checkable cho phép dùng lệnh isinstance để kiểm tra cấu trúc lúc chạy.',
              ],
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
            keyIdea: {
              en: 'Design a unified domain exception hierarchy inheriting from a project-wide BaseAppError, and always preserve root causes using explicit exception chaining (raise SubError from err).',
              vi: 'Thiết kế cây phân cấp ngoại lệ nghiệp vụ thống nhất kế thừa từ BaseAppError chung của dự án, và luôn bảo toàn nguyên nhân gốc bằng kỹ thuật exception chaining tường minh (raise SubError from err).',
            },
            content: {
              en: 'In production systems, never catch or raise generic `Exception`. Catching generic `Exception` inadvertently suppresses catastrophic operational signals like syntax errors, keyboard interrupts, and memory failures. Define a single base `BaseAppError` for your service, and derive semantic subclasses (`EntityNotFoundError`, `ValidationFailedError`, `PermissionDeniedError`) from it. When translating lower-level third-party exceptions (such as database drivers or network socket timeouts), always use explicit exception chaining (`raise DomainError(...) from original_err`) so Python preserves the complete diagnostic causal graph in `__cause__`.',
              vi: 'Trong hệ thống production, không bao giờ bắt hoặc raise `Exception` chung chung. Bắt `Exception` bừa bãi sẽ vô tình nuốt mất các lỗi hệ thống nghiêm trọng như lỗi cú pháp, ngắt bàn phím và cạn kiệt bộ nhớ. Hãy định nghĩa một lớp gốc `BaseAppError` cho toàn bộ service, và kế thừa các lớp con mang ngữ nghĩa nghiệp vụ (`EntityNotFoundError`, `ValidationFailedError`, `PermissionDeniedError`). Khi chuyển đổi ngoại lệ cấp thấp của bên thứ ba (như database driver hoặc timeout socket mạng), luôn dùng cú pháp exception chaining (`raise DomainError(...) from original_err`) để Python lưu giữ toàn bộ đồ thị nguyên nhân gốc rễ trong `__cause__`.',
            },
            comparisonTable: {
              headers: [
                { en: 'Error Pattern', vi: 'Mẫu Bắt / Ném Lỗi' },
                { en: 'Root Traceback Preserved?', vi: 'Bảo Tồn Traceback Gốc?' },
                { en: 'API Client Cleanliness', vi: 'Độ Tinh Gọn Cho API Client' },
                { en: 'Production Suitability', vi: 'Phù Hợp Cho Production' },
              ],
              rows: [
                {
                  en: ['Bare except: or catch Exception', 'No (Trace swallowed/obscured)', 'Terrible (500 internal crash)', 'Dangerous antipattern'],
                  vi: ['except: trần hoặc bắt Exception', 'Không (Trace bị nuốt mất)', 'Tồi tệ (Lỗi crash 500 mơ hồ)', 'Phản mẫu cực kỳ nguy hiểm'],
                },
                {
                  en: ['Re-raise without chaining (raise AppError)', 'No (__context__ gets confused)', 'Moderate', 'Sub-optimal debugging'],
                  vi: ['Raise lại không chain (raise AppError)', 'Không (__context__ bị lẫn lộn)', 'Trung bình', 'Khó debug vết lỗi'],
                },
                {
                  en: ['Explicit Chaining (raise AppError from err)', 'Yes (Full causal chain in __cause__)', 'Excellent (Maps directly to JSON error)', 'Production Industry Standard'],
                  vi: ['Chaining tường minh (raise AppError from err)', 'Có (Đủ vết nguyên nhân trong __cause__)', 'Tuyệt vời (Khớp chuẩn mã lỗi JSON)', 'Tiêu chuẩn vàng production'],
                },
              ],
            },
            codeBlock: {
              language: 'python',
              filename: 'exception_hierarchy.py',
              explanation: {
                en: 'Structured domain exception tree with HTTP status mapping and cause preservation.',
                vi: 'Cây ngoại lệ nghiệp vụ có cấu trúc ánh xạ mã trạng thái HTTP và giữ nguyên vết lỗi gốc.',
              },
              code: `class BaseAppError(Exception):
    """Base exception for all domain business errors."""
    def __init__(self, message: str, code: str, http_status: int = 500):
        super().__init__(message)
        self.code = code
        self.http_status = http_status

class UserNotFoundError(BaseAppError):
    def __init__(self, user_id: str):
        super().__init__(
            message=f"User with identifier '{user_id}' does not exist.",
            code="USER_NOT_FOUND",
            http_status=404
        )

# Catch low-level driver timeout and chain into domain error
try:
    # Simulated database socket timeout
    raise ConnectionResetError("Connection reset by database peer")
except ConnectionResetError as driver_err:
    # Explicit chaining: sets __cause__ attribute on UserNotFoundError
    raise UserNotFoundError("USR-992") from driver_err`,
            },
            diagram: {
              title: {
                en: 'Explicit Exception Chaining Traceback Graph',
                vi: 'Đồ Thị Traceback Của Kỹ Thuật Exception Chaining',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Low-Level Fault', vi: 'Lỗi Tầng Thấp' },
                  description: {
                    en: 'Database client library throws raw ConnectionResetError at socket layer.',
                    vi: 'Thư viện database bắn lỗi ConnectionResetError ở tầng socket mạng.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Explicit from err', vi: 'Liên Kết from err' },
                  description: {
                    en: 'Service layer catches low-level error and raises DomainError from driver_err.',
                    vi: 'Tầng nghiệp vụ bắt lỗi cấp thấp và ném DomainError kèm from driver_err.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Duo-Trace Output', vi: 'Xuất Vết Lỗi Kép' },
                  description: {
                    en: 'Logs print: "The above exception was the direct cause of the following exception:", showing both stacktraces.',
                    vi: 'Log in rõ ràng: "Ngoại lệ trên là nguyên nhân trực tiếp gây ra ngoại lệ sau:", hiển thị trọn vẹn cả 2 stacktrace.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Writing except Exception: pass or logging error without re-raising',
                  vi: 'Viết except Exception: pass hoặc chỉ ghi log mà không raise lại lỗi',
                },
                why: {
                  en: 'Silently swallowing exceptions hides catastrophic logic defects, corrupted database states, and partial writes.',
                  vi: 'Âm thầm nuốt ngoại lệ sẽ che giấu các lỗi logic tai hại, làm hỏng dữ liệu trong database và dữ liệu ghi dở dang.',
                },
                solution: {
                  en: 'Always catch specific exception types, log with exc_info=True, and bubble up domain errors appropriately.',
                  vi: 'Luôn bắt kiểu ngoại lệ cụ thể, ghi log kèm exc_info=True và ném tiếp lỗi nghiệp vụ phù hợp.',
                },
                codeIncorrect: `try:
    process_payment(order)
except Exception: # Fatal antipattern!
    pass # Silent failure: money lost!`,
                codeCorrect: `try:
    process_payment(order)
except PaymentGatewayError as err:
    logger.exception("Payment failed for order: %s", order.id)
    raise OrderCheckoutError(order.id) from err`,
              },
            ],
            practicalScenario: {
              en: 'In high-scale web APIs (FastAPI / Django), an unhandled generic error yields an opaque HTTP 500. By deriving all business failures from `BaseAppError`, a single global exception handler can catch `BaseAppError` and convert it into a clean, uniform JSON response (`{"error": err.code, "message": str(err)}`) with the designated status code.',
              vi: 'Trong các API quy mô lớn (FastAPI / Django), lỗi không bắt được sẽ biến thành mã HTTP 500 tối nghĩa. Nhờ gom tất cả lỗi nghiệp vụ vào `BaseAppError`, một exception handler toàn cục duy nhất có thể bắt `BaseAppError` và chuyển đổi thành phản hồi JSON sạch sẽ, chuẩn mực (`{"error": err.code, "message": str(err)}`) kèm mã HTTP tương ứng.',
            },
            bestPractices: {
              en: [
                'Create a centralized error.py module containing the root BaseAppError and all sub-errors.',
                'Use raise CustomError from err to link low-level driver bugs to high-level domain failures.',
                'Use raise CustomError from None only when deliberately hiding internal implementation details from end users.',
              ],
              vi: [
                'Tạo một module error.py tập trung chứa BaseAppError gốc và toàn bộ các lớp lỗi con.',
                'Dùng raise CustomError from err để xâu chuỗi lỗi driver cấp thấp vào lỗi nghiệp vụ cấp cao.',
                'Chỉ dùng raise CustomError from None khi chủ động muốn giấu chi tiết kỹ thuật nội bộ trước người dùng cuối.',
              ],
            },
            keyTakeaways: {
              en: [
                'Never catch bare Exception in business logic; specify exact exception types.',
                'Hierarchical domain errors simplify global API response formatting.',
                'Exception chaining (from err) preserves root causes in debugging tracebacks.',
              ],
              vi: [
                'Không bao giờ bắt Exception chung trong logic nghiệp vụ; luôn chỉ định kiểu lỗi cụ thể.',
                'Hệ thống ngoại lệ có phân cấp giúp đơn giản hóa việc format mã lỗi phản hồi của API.',
                'Exception chaining (from err) bảo tồn trọn vẹn nguyên nhân gốc rễ khi gỡ lỗi.',
              ],
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
            keyIdea: {
              en: 'Couple argparse or Click command line parsing with the Rich library to transform plain textual console dumps into styled tables, live status spinners, and human-readable panels.',
              vi: 'Kết hợp bộ phân tích tham số argparse hoặc Click với thư viện Rich để biến những dòng text console đơn điệu thành các bảng dữ liệu định dạng màu sắc, spinner hiển thị trạng thái và panel chuyên nghiệp.',
            },
            content: {
              en: 'Traditional Python CLI scripts output unformatted stdout strings via `print()`, which quickly become unreadable during long-running batch operations or system audits. Combining `argparse` with `rich.console.Console`, `rich.table.Table`, and `rich.progress.Progress` gives users formatted tables with auto-wrapping, ANSI truecolor themes, and real-time terminal spinners that gracefully degrade when piped into non-TTY files.',
              vi: 'Các kịch bản dòng lệnh Python truyền thống thường dùng `print()` để đẩy văn bản thô ra stdout, gây rối mắt khi chạy các tác vụ hàng loạt hoặc kiểm toán hệ thống kéo dài. Kết hợp `argparse` với `rich.console.Console`, `rich.table.Table` và `rich.progress.Progress` mang lại cho người dùng các bảng biểu tự động căn lề, màu sắc ANSI truecolor và hiệu ứng tải tiến trình mượt mà, đồng thời tự động tắt định dạng khi được pipe ra file không phải TTY.',
            },
            comparisonTable: {
              headers: [
                { en: 'Output Tooling', vi: 'Công Cụ Đầu Ra' },
                { en: 'Color & Formatting', vi: 'Màu Sắc & Định Dạng' },
                { en: 'Progress Indicators', vi: 'Hiển Thị Tiến Trình' },
                { en: 'Piping Behavior', vi: 'Hành Vi Khi Pipe Ra File' },
              ],
              rows: [
                {
                  en: ['Standard print() / sys.stdout', 'Raw plaintext only', 'Manual print dots/newlines', 'Outputs raw text cleanly'],
                  vi: ['print() tiêu chuẩn / sys.stdout', 'Chỉ văn bản thuần túy', 'In dấu chấm/xuống dòng thủ công', 'Xuất text thuần sạch'],
                },
                {
                  en: ['Rich (rich.console)', 'Full 24-bit TrueColor, tables, Markdown', 'Live spinners, smooth progress bars', 'Auto-detects non-TTY and strips colors safely'],
                  vi: ['Rich (rich.console)', 'Đầy đủ TrueColor 24-bit, bảng, Markdown', 'Spinner trực tiếp, thanh tiến trình mượt', 'Tự nhận diện non-TTY để bỏ mã màu an toàn'],
                },
              ],
            },
            codeBlock: {
              language: 'python',
              filename: 'cli_app.py',
              explanation: {
                en: 'Parses CLI arguments and renders a beautifully styled audit report table with Rich Console.',
                vi: 'Xử lý tham số dòng lệnh và hiển thị báo cáo kiểm toán được thiết kế bảng biểu đẹp mắt với Rich Console.',
              },
              code: `import argparse
from rich.console import Console
from rich.table import Table
from rich.panel import Panel

console = Console()

def run_audit(target: str, verbose: bool) -> None:
    console.print(Panel(f"[bold cyan]Auditing Cluster Target:[/bold cyan] {target}", expand=False))
    
    table = Table(title="Production Service Health", show_lines=True)
    table.add_column("Service ID", style="dim", width=12)
    table.add_column("Endpoint", style="bold")
    table.add_column("Latency (ms)", justify="right")
    table.add_column("Status", justify="center")

    table.add_row("auth-svc", "https://auth.internal", "14.2", "[green]HEALTHY[/green]")
    table.add_row("billing-svc", "https://pay.internal", "88.5", "[yellow]DEGRADED[/yellow]")
    table.add_row("event-bus", "amqp://mq.internal:5672", "3.1", "[green]HEALTHY[/green]")

    console.print(table)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="4TM Production Cluster Auditor")
    parser.add_argument("--target", default="cluster-prod-01", help="Target cluster namespace")
    parser.add_argument("-v", "--verbose", action="store_true", help="Enable verbose debug metrics")
    args = parser.parse_args()
    run_audit(args.target, args.verbose)`,
            },
            diagram: {
              title: {
                en: 'Rich CLI Execution & Output Pipeline',
                vi: 'Quy Trình Xử Lý & Hiển Thị Đầu Ra Của Rich CLI',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Argparse Ingestion', vi: 'Tiếp Nhận Tham Số' },
                  description: {
                    en: 'User executes binary with CLI flags; argparse validates values, types, and help messages.',
                    vi: 'Người dùng chạy lệnh kèm cờ tham số; argparse xác thực giá trị, kiểu dữ liệu và hướng dẫn.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'TTY Inspection', vi: 'Kiểm Tra TTY' },
                  description: {
                    en: 'Rich console queries sys.stdout.isatty() to choose ANSI escape sequences or raw text fallback.',
                    vi: 'Rich console kiểm tra sys.stdout.isatty() để chọn hiển thị mã ANSI hay tự động tắt mã màu khi chuyển tiếp.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Terminal Rendering', vi: 'Render Giao Diện Terminal' },
                  description: {
                    en: 'Table layouts compute column widths based on current terminal window columns dynamically.',
                    vi: 'Bố cục bảng tự động tính toán độ rộng các cột dựa trên kích thước cửa sổ terminal hiện hành.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Hardcoding raw ANSI escape codes like \\033[92m into print statements',
                  vi: 'Ghi cứng các chuỗi mã thoát ANSI như \\033[92m trực tiếp vào lệnh print',
                },
                why: {
                  en: 'Raw ANSI strings break on Windows cmd.exe and pollute log files or piped output with unreadable escape junk.',
                  vi: 'Mã ANSI viết cứng bị lỗi trên Windows cmd.exe và làm bẩn file log hoặc output dẫn hướng với các ký tự rác.',
                },
                solution: {
                  en: 'Use rich.console.Console markup tags ([green], [bold]), which automatically strip when output is redirected.',
                  vi: 'Dùng thẻ markup của Rich ([green], [bold]), thư viện sẽ tự động loại bỏ mã màu khi đầu ra được chuyển tiếp vào file.',
                },
                codeIncorrect: `print("\\033[92mSUCCESS: Database connected!\\033[0m") # Corrupts output when piped!`,
                codeCorrect: `from rich.console import Console
console = Console()
console.print("[green]SUCCESS:[/green] Database connected!") # Safe everywhere!`,
              },
            ],
            practicalScenario: {
              en: 'In automated deployment scripts, running `deploy-app --env=staging` benefits greatly from a live spinner `with console.status("Rolling out pods..."):`. Operators get immediate visual assurance that the process is not frozen, without spamming dozens of repetitive log lines.',
              vi: 'Trong các kịch bản triển khai tự động, lệnh `deploy-app --env=staging` hưởng lợi lớn từ con quay trạng thái `with console.status("Đang triển khai pods..."):`. Kỹ sư vận hành biết ngay ứng dụng vẫn đang chạy ổn định mà không bị ngập trong hàng chục dòng log lặp đi lặp lại.',
            },
            bestPractices: {
              en: [
                'Always create a shared Console(record=True) instance if you plan to export terminal screens to HTML/SVG.',
                'Use Rich tables with show_lines=True for multi-line log entries to keep columns distinct.',
                'Integrate Rich with Python logging via rich.logging.RichHandler for unified log styling.',
              ],
              vi: [
                'Luôn tạo đối tượng Console(record=True) dùng chung nếu dự định xuất màn hình terminal ra HTML/SVG.',
                'Dùng bảng Rich với show_lines=True cho các bản ghi nhiều dòng để phân cách rõ ràng các hàng.',
                'Tích hợp Rich vào module logging chuẩn qua rich.logging.RichHandler để đồng bộ giao diện log.',
              ],
            },
            keyTakeaways: {
              en: [
                'Rich provides modern terminal UI widgets (tables, panels, spinners) with zero manual escape code pain.',
                'Rich automatically handles TTY detection, stripping colors cleanly when output is piped to files.',
                'Combining argparse with Rich delivers professional, polished CLI tooling for production teams.',
              ],
              vi: [
                'Rich cung cấp các thành phần UI terminal hiện đại (bảng, panel, spinner) không cần xử lý mã thoát thủ công.',
                'Rich tự động nhận diện TTY và lược bỏ màu sắc khi kết quả được chuyển tiếp ra file hoặc đường ống pipe.',
                'Kết hợp argparse và Rich tạo nên các công cụ CLI chuẩn mực và chuyên nghiệp cho đội ngũ kỹ thuật.',
              ],
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
            keyIdea: {
              en: 'Declare executable terminal entry points declaratively under [project.scripts] in pyproject.toml (PEP 621) to turn standard Python functions into system-level CLI binaries upon pip install.',
              vi: 'Khai báo entry point dòng lệnh trực tiếp trong mục [project.scripts] của pyproject.toml (PEP 621) để biến các hàm Python thông thường thành file nhị phân CLI thực thi trong hệ thống sau khi cài bằng pip.',
            },
            content: {
              en: 'Modern Python packaging replaces outdated `setup.py` scripts with declarative `pyproject.toml` standards (PEP 517/518/621). By declaring console entry points under `[project.scripts]`, installers (like `pip` or `uv`) create platform-specific launcher stubs in the active environment `$PATH` (e.g., `.venv/bin/my-cli` or Windows `.venv\\Scripts\\my-cli.exe`). When installed in editable mode (`pip install -e .`), local code changes immediately reflect in the command line without re-installation.',
              vi: 'Quy chuẩn đóng gói Python hiện đại thay thế các file `setup.py` cũ kỹ bằng chuẩn khai báo `pyproject.toml` (PEP 517/518/621). Bằng việc khai báo entry point dòng lệnh trong mục `[project.scripts]`, các trình cài đặt (như `pip` hoặc `uv`) sẽ tự động tạo các launcher thực thi phù hợp cho từng hệ điều hành trong thư mục `$PATH` của môi trường ảo (ví dụ: `.venv/bin/my-cli` trên Linux/macOS hoặc `.venv\\Scripts\\my-cli.exe` trên Windows). Khi cài ở chế độ editable (`pip install -e .`), mọi thay đổi mã nguồn lập tức có hiệu lực trên terminal mà không cần cài đặt lại.',
            },
            comparisonTable: {
              headers: [
                { en: 'Packaging Approach', vi: 'Phương Pháp Đóng Gói' },
                { en: 'Configuration Format', vi: 'Định Dạng Cấu Hình' },
                { en: 'Security & Execution', vi: 'Bảo Mật & Thực Thi' },
                { en: 'Standard Compliance', vi: 'Tiêu Chuẩn Công Nhận' },
              ],
              rows: [
                {
                  en: ['Legacy setup.py', 'Imperative Python code', 'Arbitrary code execution during build', 'Deprecated by PyPA'],
                  vi: ['setup.py truyền thống', 'Mã nguồn Python động', 'Chạy mã bất kỳ khi build (rủi ro bảo mật)', 'PyPA đã khuyến cáo ngưng dùng'],
                },
                {
                  en: ['pyproject.toml (PEP 621)', 'Declarative TOML file', 'Static metadata parsing (Safe)', 'Official modern Python standard'],
                  vi: ['pyproject.toml (PEP 621)', 'File TOML tĩnh', 'Phân tích cú pháp tĩnh an toàn', 'Tiêu chuẩn hiện đại chính thức'],
                },
              ],
            },
            codeBlock: {
              language: 'toml',
              filename: 'pyproject.toml',
              explanation: {
                en: 'Modern PEP 621 compliant configuration registering a CLI script entry point.',
                vi: 'Cấu hình chuẩn PEP 621 khai báo script CLI để hệ thống tự động sinh file thực thi.',
              },
              code: `[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "fortm-audit"
version = "1.0.0"
description = "Production infrastructure auditing utility"
readme = "README.md"
requires-python = ">=3.10"
dependencies = [
    "rich>=13.7.0",
    "pydantic>=2.5.0",
    "httpx>=0.27.0"
]

[project.scripts]
# Command name on terminal = "module.path:callable_function"
fortm-audit = "fortm_audit.cli:main"`,
            },
            diagram: {
              title: {
                en: 'Editable Installation & PATH Binary Linking',
                vi: 'Quy Trình Cài Đặt Editable & Liên Kết Nhị Phân PATH',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Developer Runs pip install -e .', vi: 'Chạy pip install -e .' },
                  description: {
                    en: 'Installer parses pyproject.toml [project.scripts] to find command mappings.',
                    vi: 'Trình cài đặt đọc [project.scripts] trong pyproject.toml để lấy danh sách lệnh.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Launcher Script Generation', vi: 'Sinh File Launcher' },
                  description: {
                    en: 'Pip generates .venv/bin/fortm-audit script with shebang pointing to venv Python interpreter.',
                    vi: 'Pip tạo file .venv/bin/fortm-audit với shebang trỏ thẳng vào Python của môi trường ảo.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Immediate PATH Execution', vi: 'Thực Thi Qua PATH' },
                  description: {
                    en: 'Typing fortm-audit executes fortm_audit.cli.main() directly from anywhere in the shell.',
                    vi: 'Gõ fortm-audit trong terminal sẽ gọi trực tiếp hàm fortm_audit.cli.main() từ bất kỳ đâu.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Forgetting the colon syntax (module.path:function) in project.scripts',
                  vi: 'Quên cú pháp dấu hai chấm (module.path:function) trong project.scripts',
                },
                why: {
                  en: 'Pip expects module_path:function_name. Using a dot like module.path.main will cause build/runtime errors.',
                  vi: 'Pip quy định định dạng module_path:tên_hàm. Nếu dùng dấu chấm module.path.main sẽ gây lỗi build hoặc không chạy được.',
                },
                solution: {
                  en: 'Always use a colon to separate the importable module path from the entrypoint callable.',
                  vi: 'Luôn dùng dấu hai chấm để ngăn cách đường dẫn module và hàm khởi chạy.',
                },
                codeIncorrect: `[project.scripts]
my-cli = "my_package.cli.main" # Syntax error during packaging!`,
                codeCorrect: `[project.scripts]
my-cli = "my_package.cli:main" # Correct separator!`,
              },
            ],
            practicalScenario: {
              en: 'When shipping internal platform engineering CLIs to hundreds of developers, using `pyproject.toml` allows distributing the tool through an internal artifact registry (Artifactory / AWS CodeArtifact). Developers simply run `pipx install company-cli` and receive an isolated, globally accessible command line application.',
              vi: 'Khi phát hành công cụ CLI cho hàng trăm lập trình viên nội bộ, chuẩn `pyproject.toml` cho phép phân phối qua kho artifact nội bộ (Artifactory / AWS CodeArtifact). Các lập trình viên chỉ cần gõ `pipx install company-cli` là có ngay ứng dụng dòng lệnh dùng toàn cục với môi trường độc lập an toàn.',
            },
            bestPractices: {
              en: [
                'Always use pip install -e . during active development for instantaneous live hot-reloads.',
                'Use modern lightweight build backends like hatchling or flit_core instead of setuptools.',
                'Ensure the target callable function accepts no required arguments and returns an int exit code.',
              ],
              vi: [
                'Luôn dùng pip install -e . trong quá trình phát triển để kiểm thử thay đổi mã tức thì.',
                'Dùng các build backend hiện đại và nhẹ nhàng như hatchling hoặc flit_core thay vì setuptools.',
                'Đảm bảo hàm entrypoint không đòi hỏi tham số bắt buộc và trả về mã thoát int (0 nếu thành công).',
              ],
            },
            keyTakeaways: {
              en: [
                '[project.scripts] in pyproject.toml provides clean declarative CLI registration.',
                'Editable installations create symlinks/shim scripts directly in the active PATH.',
                'Separate packaging metadata from application logic for clean distributions.',
              ],
              vi: [
                'Mục [project.scripts] trong pyproject.toml giúp đăng ký lệnh CLI khai báo chuẩn mực.',
                'Cài đặt ở chế độ editable tạo symlink/script shim trực tiếp trong biến môi trường PATH.',
                'Tách biệt thông số đóng gói khỏi logic ứng dụng để phân phối mã nguồn trong sạch.',
              ],
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
            keyIdea: {
              en: 'Because Python treats functions as first-class objects, the Strategy pattern does not require heavyweight Gang-of-Four class hierarchies. Pass plain callable functions or closures directly as pluggable strategies.',
              vi: 'Do Python coi hàm là đối tượng hạng nhất (first-class), mẫu thiết kế Strategy không cần các cây kế thừa class cồng kềnh kiểu Gang of Four. Hãy truyền trực tiếp các hàm hoặc closure có thể gọi làm chiến lược cắm rút.',
            },
            content: {
              en: 'In traditional languages like Java or C++, the Strategy pattern requires an abstract `Strategy` interface and multiple concrete subclass implementations (`VIPStrategy`, `BlackFridayStrategy`). In Python, functions can be assigned to variables, passed as arguments, and stored in dictionaries. By defining a typing alias (`Callable[[Decimal], Decimal]`), you can swap discounting or routing algorithms dynamically at runtime with minimal syntax overhead.',
              vi: 'Trong các ngôn ngữ truyền thống như Java hay C++, Strategy pattern đòi hỏi một interface `Strategy` trừu tượng cùng hàng loạt class con triển khai (`VIPStrategy`, `BlackFridayStrategy`). Trong Python, các hàm có thể gán vào biến, truyền qua tham số và lưu trong từ điển. Bằng cách định nghĩa type alias (`Callable[[Decimal], Decimal]`), bạn có thể hoán đổi các thuật toán tính giá hoặc định tuyến linh hoạt lúc chạy với lượng mã nguồn tối thiểu.',
            },
            comparisonTable: {
              headers: [
                { en: 'Implementation Style', vi: 'Phong Cách Triển Khai' },
                { en: 'Boilerplate Overhead', vi: 'Mức Độ Mã Thừa' },
                { en: 'Runtime State Storage', vi: 'Lưu Trạng Thái Lúc Chạy' },
                { en: 'Python Idiomatic Score', vi: 'Độ Chuẩn Pythonic' },
              ],
              rows: [
                {
                  en: ['GoF Class Hierarchy', 'High (Abstract class + Subclasses + Interfaces)', 'Inside object instance attributes (self)', 'Verbose (C++/Java legacy)'],
                  vi: ['Cây class kinh điển GoF', 'Cao (Lớp trừu tượng + lớp con + interface)', 'Bên trong thuộc tính đối tượng (self)', 'Dài dòng (Tư duy C++/Java cũ)'],
                },
                {
                  en: ['First-Class Callables', 'Zero (Plain def functions or lambdas)', 'Via function closures or functools.partial', 'Idiomatic & Elegant'],
                  vi: ['Hàm First-Class Callables', 'Gần như bằng 0 (Hàm def hoặc lambda)', 'Qua closure hoặc functools.partial', 'Chuẩn mực & Tinh tế'],
                },
              ],
            },
            codeBlock: {
              language: 'python',
              filename: 'strategy_pattern.py',
              explanation: {
                en: 'Defines functional strategies with type annotations and swaps rules dynamically via a strategy lookup table.',
                vi: 'Định nghĩa các chiến lược dạng hàm với type annotation và hoán đổi quy tắc động qua bảng tra cứu.',
              },
              code: `from decimal import Decimal
from typing import Callable

# Strategy signature: accepts gross total, returns discounted net total
DiscountStrategy = Callable[[Decimal], Decimal]

def vip_discount(total: Decimal) -> Decimal:
    """VIP members receive a 20% discount on order gross."""
    return total * Decimal("0.80")

def loyalty_tier_discount(points: int) -> DiscountStrategy:
    """Closure factory returning a parameterized strategy function."""
    rate = Decimal(min(points * 0.001, 0.30)) # Max 30% discount
    return lambda total: total * (Decimal("1.0") - rate)

def compute_order_total(gross: Decimal, strategy: DiscountStrategy) -> Decimal:
    return strategy(gross).quantize(Decimal("0.01"))

# Dispatching strategies dynamically
base_price = Decimal("200.00")
print("VIP Price:", compute_order_total(base_price, vip_discount))

# Instantiating parameterized closure strategy
custom_strategy = loyalty_tier_discount(points=150)
print("Loyalty Price:", compute_order_total(base_price, custom_strategy))`,
            },
            diagram: {
              title: {
                en: 'Functional Strategy Dispatch Workflow',
                vi: 'Quy Trình Điều Phối Chiến Lược Dạng Hàm',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Callable Strategy Definition', vi: 'Định Nghĩa Hàm Chiến Lược' },
                  description: {
                    en: 'Algorithms are implemented as clean stateless def functions conforming to DiscountStrategy signature.',
                    vi: 'Thuật toán được hiện thực dưới dạng các hàm def không trạng thái tuân thủ chữ ký DiscountStrategy.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Context Parameter Injection', vi: 'Truyền Tham Số Chiến Lược' },
                  description: {
                    en: 'compute_order_total receives raw price and the strategy callable without class instantiation.',
                    vi: 'Hàm xử lý đơn hàng nhận giá gốc và hàm chiến lược mà không cần khởi tạo instance lớp.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Direct Function Invocation', vi: 'Thực Thi Trực Tiếp' },
                  description: {
                    en: 'Context calls strategy(gross) directly, completely decoupled from specific algorithm internals.',
                    vi: 'Ngữ cảnh gọi trực tiếp strategy(gross), tách biệt hoàn toàn khỏi chi tiết bên trong của thuật toán.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Creating separate files and classes with single run() methods for trivial algorithms',
                  vi: 'Tạo riêng file và class với phương thức run() duy nhất cho các thuật toán đơn giản',
                },
                why: {
                  en: 'Introduces unnecessary OOP overhead for logic that has no internal mutable state.',
                  vi: 'Tạo ra chi phí OOP không cần thiết cho những logic không hề có trạng thái nội bộ thay đổi.',
                },
                solution: {
                  en: 'Use plain functions or closures; only upgrade to a class if the strategy must maintain complex mutable caches.',
                  vi: 'Hãy dùng hàm thuần hoặc closure; chỉ nâng lên class khi chiến lược cần lưu bộ nhớ cache phức tạp.',
                },
                codeIncorrect: `class TenPercentStrategy: # Unneeded boilerplate!
    def calculate(self, price: float) -> float:
        return price * 0.90`,
                codeCorrect: `def ten_percent_strategy(price: float) -> float:
    return price * 0.90 # Clean, direct, and pythonic`,
              },
            ],
            practicalScenario: {
              en: 'In payment processing gateways, supporting multiple pricing fee schedules (Stripe domestic vs international vs crypto) is cleanly implemented by storing functions in a registry dictionary `REGISTRY: dict[str, FeeStrategy] = {"stripe": stripe_fee, "crypto": crypto_fee}`. Swapping providers requires just querying the dictionary.',
              vi: 'Trong cổng xử lý thanh toán, hỗ trợ nhiều bảng phí (Stripe nội địa, quốc tế, crypto) được tổ chức tinh gọn bằng từ điển đăng ký `REGISTRY: dict[str, FeeStrategy] = {"stripe": stripe_fee, "crypto": crypto_fee}`. Thay đổi đối tác thanh toán chỉ là thao tác tra cứu hàm từ từ điển.',
            },
            bestPractices: {
              en: [
                'Always define a typing.Callable alias to document the expected arguments and return types.',
                'Use factory functions (closures) when a strategy requires dynamic initialization parameters.',
                'Store strategies in dictionaries or enum maps for clean O(1) runtime dispatching.',
              ],
              vi: [
                'Luôn định nghĩa alias typing.Callable để ghi rõ tham số đầu vào và kiểu dữ liệu trả về.',
                'Dùng hàm factory (closure) khi chiến lược cần tham số cấu hình khởi tạo động.',
                'Lưu trữ các chiến lược trong từ điển hoặc enum để điều phối O(1) lúc chạy cực kỳ gọn gàng.',
              ],
            },
            keyTakeaways: {
              en: [
                'Python functions are first-class objects suitable for lightweight Strategy patterns.',
                'typing.Callable allows full static type checking for functional strategies.',
                'Closures easily encapsulate configuration parameters without boilerplate classes.',
              ],
              vi: [
                'Hàm Python là đối tượng hạng nhất, hoàn hảo cho mẫu thiết kế Strategy tinh gọn.',
                'typing.Callable cho phép kiểm tra kiểu tĩnh đầy đủ cho các chiến lược dạng hàm.',
                'Closure dễ dàng đóng gói tham số cấu hình mà không cần các class cồng kềnh.',
              ],
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
            keyIdea: {
              en: 'Decouple core business domain logic from database persistence details by defining a generic Protocol-based Repository interface, enabling seamless testing with in-memory doubles.',
              vi: 'Tách rời logic nghiệp vụ cốt lõi khỏi chi tiết lưu trữ cơ sở dữ liệu bằng cách định nghĩa interface Repository khái quát qua Protocol, cho phép viết test dễ dàng với bộ nhớ giả lập in-memory.',
            },
            content: {
              en: 'In complex enterprise Python applications, allowing business service layers or route handlers to directly write raw SQL or ORM queries (such as SQLAlchemy or Django ORM models) creates tight architectural coupling. If the database engine changes or during unit testing, isolating domain logic becomes difficult. The Repository pattern establishes a collection-like abstraction interface in memory. Service layers interact purely with the Repository Protocol, while concrete adapter classes encapsulate database sessions, SQL queries, and transaction commits.',
              vi: 'Trong các ứng dụng doanh nghiệp Python phức tạp, việc để tầng service nghiệp vụ hoặc route handler truy vấn trực tiếp SQL thô hoặc model ORM (như SQLAlchemy hay Django ORM) tạo ra sự ràng buộc kiến trúc quá chặt chẽ. Khi cần đổi database hoặc viết unit test, việc cô lập nghiệp vụ trở nên vô cùng khó khăn. Repository pattern tạo ra một lớp trừu tượng giống như một tập hợp đối tượng trong bộ nhớ. Tầng nghiệp vụ chỉ giao tiếp với Repository Protocol, trong khi các lớp adapter cụ thể sẽ quản lý session database, câu lệnh SQL và commit giao dịch.',
            },
            comparisonTable: {
              headers: [
                { en: 'Architectural Style', vi: 'Kiến Trúc Truy Cập Dữ Liệu' },
                { en: 'Testability', vi: 'Khả Năng Kiểm Thử' },
                { en: 'Database Coupling', vi: 'Mức Độ Phụ Thuộc DB' },
                { en: 'Refactoring Friction', vi: 'Độ Khó Khi Tái Cấu Trúc' },
              ],
              rows: [
                {
                  en: ['Direct ORM in Handlers', 'Slow (Requires live Postgres DB in CI)', 'Extreme (Models bleed into view layer)', 'High (Modifying DB breaks API endpoints)'],
                  vi: ['Gọi ORM trực tiếp tại Handler', 'Chậm (Bắt buộc chạy Postgres thật trong CI)', 'Rất cao (Model tràn vào tầng view)', 'Cao (Đổi DB làm hỏng API endpoint)'],
                },
                {
                  en: ['Repository Pattern + Protocol', 'Instantaneous (Sub-millisecond in-memory fakes)', 'Zero (Domain logic never touches raw DB)', 'Low (Swap Postgres for DynamoDB via 1 adapter)'],
                  vi: ['Repository Pattern + Protocol', 'Tức thì (Test in-memory dưới mili-giây)', 'Bằng 0 (Domain hoàn toàn không chạm DB thật)', 'Thấp (Đổi Postgres sang DynamoDB chỉ sửa 1 adapter)'],
                },
              ],
            },
            codeBlock: {
              language: 'python',
              filename: 'repository_pattern.py',
              explanation: {
                en: 'Implements generic Repository Protocol with type variables and provides an in-memory test double alongside domain services.',
                vi: 'Triển khai Repository Protocol tổng quát với TypeVar và tạo lớp giả lập in-memory phục vụ kiểm thử nhanh chóng.',
              },
              code: `from dataclasses import dataclass
from typing import Protocol, TypeVar, Generic

@dataclass
class User:
    id: str
    email: str
    is_active: bool = True

T = TypeVar("T")

class BaseRepository(Protocol[T]):
    """Generic repository protocol for CRUD domain persistence."""
    def get_by_id(self, entity_id: str) -> T | None: ...
    def save(self, entity: T) -> None: ...
    def delete(self, entity_id: str) -> bool: ...

class InMemoryUserRepository:
    """Zero-dependency in-memory implementation for rapid unit tests."""
    def __init__(self) -> None:
        self._storage: dict[str, User] = {}

    def get_by_id(self, entity_id: str) -> User | None:
        return self._storage.get(entity_id)

    def save(self, entity: User) -> None:
        self._storage[entity.id] = entity

    def delete(self, entity_id: str) -> bool:
        return self._storage.pop(entity_id, None) is not None

# Domain Service interacts ONLY with the protocol contract
class UserRegistrationService:
    def __init__(self, repo: BaseRepository[User]):
        self.repo = repo

    def register_user(self, user_id: str, email: str) -> User:
        if self.repo.get_by_id(user_id):
            raise ValueError(f"User {user_id} already exists.")
        user = User(id=user_id, email=email)
        self.repo.save(user)
        return user

# Unit test runs in < 1ms without spinning up Docker or databases
test_repo = InMemoryUserRepository()
service = UserRegistrationService(repo=test_repo)
created = service.register_user("usr-1", "alice@example.com")
print("Registered:", created)`,
            },
            diagram: {
              title: {
                en: 'Hexagonal Domain & Repository Layering',
                vi: 'Mô Hình Phân Lớp Lục Giác Domain và Repository',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Domain Business Service', vi: 'Dịch Vụ Nghiệp Vụ' },
                  description: {
                    en: 'Domain services execute business rules, validating invariants independently of any storage technology.',
                    vi: 'Tầng nghiệp vụ thực thi quy tắc logic, kiểm tra tính hợp lệ mà không quan tâm công nghệ lưu trữ.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Repository Protocol Boundary', vi: 'Ranh Giới Repository Protocol' },
                  description: {
                    en: 'Service depends strictly on BaseRepository[T] contract, maintaining clean dependency inversion.',
                    vi: 'Service phụ thuộc hoàn toàn vào hợp đồng BaseRepository[T], đảo ngược phụ thuộc theo chuẩn SOLID.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Swappable Storage Adapters', vi: 'Adapter Lưu Trữ Cắm Rút' },
                  description: {
                    en: 'PostgresSQLAlchemyRepo runs in production, while InMemoryUserRepo runs instantaneously during CI test suites.',
                    vi: 'PostgresSQLAlchemyRepo chạy trên môi trường production, còn InMemoryUserRepo chạy tức thì trong CI test.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Returning raw SQLAlchemy or ORM query objects (.filter(), .query) from Repository methods',
                  vi: 'Trả về các đối tượng truy vấn dở dang của SQLAlchemy hoặc ORM (.filter(), .query) từ phương thức Repository',
                },
                why: {
                  en: 'Leaking lazy queries into callers defeats the repository purpose, coupling callers to active database sessions.',
                  vi: 'Để lọt truy vấn lazy ra ngoài sẽ phá vỡ mục đích của Repository, buộc tầng gọi phải phụ thuộc vào session database đang mở.',
                },
                solution: {
                  en: 'Always execute queries inside the repository and return materialized domain dataclasses, pydantic models, or domain entities.',
                  vi: 'Luôn thực thi dứt điểm câu truy vấn bên trong repository và trả về dataclass nghiệp vụ, pydantic model hoặc entity cụ thể.',
                },
                codeIncorrect: `def get_active_users(self):
    return self.session.query(UserModel).filter_by(active=True) # Leaks lazy query!`,
                codeCorrect: `def get_active_users(self) -> list[User]:
    records = self.session.query(UserModel).filter_by(active=True).all()
    return [User(id=r.id, email=r.email) for r in records] # Fully materialized domain entities`,
              },
            ],
            practicalScenario: {
              en: 'In continuous integration (CI) pipelines, running a 5,000-case test suite against a real PostgreSQL container can take 15 minutes. Replacing database access with an in-memory repository mock allows the entire test suite to execute in under 3 seconds with zero external dependencies.',
              vi: 'Trong quy trình CI, việc chạy 5.000 test case trên container PostgreSQL thật có thể mất 15 phút. Thay thế bằng mock repository in-memory cho phép toàn bộ bộ test hoàn thành chỉ trong chưa đầy 3 giây mà không cần cài đặt thêm bất kỳ dịch vụ nào bên ngoài.',
            },
            bestPractices: {
              en: [
                'Use Generic[T] and typing.Protocol to define standard CRUD repository interfaces.',
                'Keep Repositories focused on persistence; do not mix HTTP status codes or validation rules inside them.',
                'Use Unit of Work pattern alongside Repositories when coordinating multi-entity transactional commits.',
              ],
              vi: [
                'Dùng Generic[T] và typing.Protocol để định nghĩa interface repository CRUD chuẩn.',
                'Giữ Repository thuần túy cho việc đọc ghi dữ liệu; không nhồi nhét mã HTTP hoặc logic kiểm tra form vào đây.',
                'Kết hợp mẫu thiết kế Unit of Work cùng Repository khi cần điều phối giao dịch commit nhiều bảng cùng lúc.',
              ],
            },
            keyTakeaways: {
              en: [
                'The Repository pattern isolates core business logic from database drivers and ORMs.',
                'In-memory repository implementations enable ultra-fast unit testing in CI environments.',
                'Repositories should return materialized domain models, never leaking open ORM sessions.',
              ],
              vi: [
                'Repository pattern cách ly logic nghiệp vụ cốt lõi khỏi database driver và ORM.',
                'Triển khai in-memory cho repository giúp chạy unit test siêu tốc trong môi trường CI.',
                'Repository luôn trả về domain model đã nạp đủ dữ liệu, không làm lộ session ORM chưa đóng.',
              ],
            },
          },
        ],
      },
    ],
  },
];

export const PYTHON_EBOOKS: Book[] = [
  PYTHON_HANDBOOK,
  ...RAW_PYTHON_EBOOKS.slice(1),
];
