import { Chapter } from '../../types';

export const PART_1_CHAPTERS: Chapter[] = [
  // Chapter 1: The Python Execution Model & Bytecode
  {
    id: 'py-hb-ch-1',
    number: 1,
    partNumber: 1,
    partTitle: {
      en: 'Python Execution & Object Model',
      vi: 'Mô Hình Thực Thi & Đối Tượng Python',
    },
    slug: 'python-execution-model',
    title: {
      en: 'The Python Execution Model & Bytecode',
      vi: 'Mô Hình Thực Thi Python & Bytecode',
    },
    summary: {
      en: 'CPython virtual machine architecture, lexical analysis, AST parsing, bytecode compilation, and the frame evaluation loop.',
      vi: 'Kiến trúc máy ảo CPython, phân tích từ vựng, cây cú pháp AST, biên dịch bytecode và vòng lặp đánh giá khung thực thi.',
    },
    readTimeMinutes: 18,
    sections: [
      {
        id: 'py-hb-1-1',
        title: {
          en: 'Source Code to AST Parsing Pipeline',
          vi: 'Quy Trình Phân Tích Từ Mã Nguồn Đến AST',
        },
        content: {
          en: 'Python source code (`.py`) is not executed line-by-line as raw text. The CPython runtime translates source text through a deterministic compiler front-end: 1) The **Tokenizer** splits raw source bytes into semantic tokens (keywords, identifiers, literals, indentation markers). 2) The **Parser** (PEG-based since Python 3.9) validates syntax against the language grammar and builds an in-memory **Abstract Syntax Tree (AST)**. Understanding the AST allows developers to write static analysis linters, code rewrite transformers, and security scanners via the built-in `ast` module.',
          vi: 'Mã nguồn Python (`.py`) không được thực thi từng dòng chữ thô như nhiều người lầm tưởng. CPython chuyển đổi văn bản nguồn qua một pipeline biên dịch xác định: 1) **Tokenizer** tách các byte mã nguồn thành token ngữ nghĩa (từ khóa, định danh, hằng số, dấu thụt lề). 2) **Parser** (dựa trên thuật toán PEG từ Python 3.9) kiểm tra cú pháp và tạo **Cây Cú Pháp Trừu Tượng (AST)**. Nắm vững AST giúp lập trình viên tự viết các công cụ linter, công cụ biến đổi mã nguồn và quét bảo mật thông qua mô-đun `ast` tích hợp sẵn.',
        },
        keyIdea: {
          en: 'Python parses source code into an Abstract Syntax Tree (AST) before generating bytecode. Syntax errors occur during parse-time, before any code executes.',
          vi: 'Python phân tích cú pháp mã nguồn thành Cây AST trước khi sinh bytecode. Lỗi cú pháp (SyntaxError) phát sinh lúc parse, trước khi bất kỳ dòng lệnh nào được chạy.',
        },
        diagram: {
          title: {
            en: 'CPython 4-Stage Execution Pipeline',
            vi: 'Quy Trình 4 Giai Đoạn Thực Thi Của CPython',
          },
          steps: [
            {
              number: 1,
              label: { en: 'Lexical Tokenizing', vi: 'Tách Token Từ Vựng' },
              description: {
                en: 'Source text is split into tokens (INDENT, DEDENT, NAME, NUMBER, OP).',
                vi: 'Văn bản nguồn được tách thành các token (INDENT, DEDENT, NAME, NUMBER, OP).',
              },
            },
            {
              number: 2,
              label: { en: 'PEG Parsing to AST', vi: 'Phân Tích Cú Pháp Thành AST' },
              description: {
                en: 'Grammar rules build an in-memory Abstract Syntax Tree representation.',
                vi: 'Bộ quy tắc ngữ pháp dựng cây cú pháp trừu tượng AST trên bộ nhớ.',
              },
            },
            {
              number: 3,
              label: { en: 'Bytecode Compilation', vi: 'Biên Dịch Ra Bytecode' },
              description: {
                en: 'AST is emitted into PyCodeObject structures containing opcodes (.pyc).',
                vi: 'AST được biên dịch thành cấu trúc PyCodeObject chứa các opcode (.pyc).',
              },
            },
            {
              number: 4,
              label: { en: 'ceval.c VM Evaluation', vi: 'Vòng Lặp Máy Ảo ceval.c' },
              description: {
                en: 'Stack-based virtual machine evaluates opcodes using CPU register frames.',
                vi: 'Máy ảo dựa trên stack thực thi tuần tự các opcode trong khung frame.',
              },
            },
          ],
        },
        codeBlock: {
          language: 'python',
          filename: 'ast_inspection.py',
          code: `import ast

source_code = """
def calculate_tax(amount: float, rate: float = 0.08) -> float:
    return amount * (1.0 + rate)
"""

# Parse source code into an Abstract Syntax Tree
tree = ast.parse(source_code)

# Dump human-readable AST representation
print(ast.dump(tree, indent=2))`,
          explanation: {
            en: '`ast.parse()` transforms Python source into typed AST nodes (FunctionDef, Return, BinOp, Mult), showing the compiler structure before bytecode emission.',
            vi: '`ast.parse()` biến mã nguồn thành các node cây AST (FunctionDef, Return, BinOp, Mult), thể hiện cấu trúc trước khi sinh ra mã bytecode.',
          },
        },
        keyTakeaways: {
          en: [
            'Python uses a modern PEG parser to construct an Abstract Syntax Tree (AST)',
            'Syntax errors are caught during AST generation before any code runs',
            'The `ast` module enables meta-programming, security auditing, and static analysis',
          ],
          vi: [
            'Python dùng bộ phân tích PEG hiện đại để dựng Cây Cú Pháp Trừu Tượng (AST)',
            'Lỗi cú pháp được phát hiện ở bước sinh AST trước khi code bắt đầu thực thi',
            'Mô-đun `ast` cho phép lập trình meta, kiểm toán bảo mật và phân tích mã tĩnh',
          ],
        },
      },
      {
        id: 'py-hb-1-2',
        title: {
          en: 'Bytecode Compilation & Code Objects',
          vi: 'Biên Dịch Bytecode & Đối Tượng Code Object',
        },
        content: {
          en: 'Once the AST is validated, the CPython compiler produces a **`PyCodeObject`**. A code object contains immutable bytecode instructions (opcodes), variable names, constant pools, and line number mappings. When a module is imported, CPython writes this compiled code object to a `.pyc` file inside the `__pycache__` directory. If the source file timestamp is unmodified, subsequent runs bypass parsing and compilation entirely, loading the pre-compiled `.pyc` bytecode directly into memory for fast startup.',
          vi: 'Khi cây AST hợp lệ, trình biên dịch CPython sinh ra đối tượng **`PyCodeObject`**. Một code object chứa tập chỉ thị bytecode bất biến (các opcode), danh sách tên biến, hằng số và bảng ánh xạ số dòng. Khi một module được import, CPython ghi đối tượng này thành file `.pyc` trong thư mục `__pycache__`. Nếu thời gian sửa đổi của file gốc không đổi, các lần chạy sau sẽ bỏ qua bước phân tích và nạp trực tiếp `.pyc` vào bộ nhớ để khởi động nhanh.',
        },
        keyIdea: {
          en: 'Bytecode is platform-independent intermediate machine code executed by CPython. It is cached in `__pycache__/*.pyc` to eliminate re-compilation overhead.',
          vi: 'Bytecode là mã máy trung gian độc lập nền tảng được máy ảo CPython thực thi. Nó được lưu đệm trong `__pycache__/*.pyc` để tránh biên dịch lại.',
        },
        comparisonTable: {
          headers: [
            { en: 'Execution Model', vi: 'Mô Hình Thực Thi' },
            { en: 'Compilation Step', vi: 'Bước Biên Dịch' },
            { en: 'Runtime Target', vi: 'Đối Tượng Runtime' },
            { en: 'Performance Trade-off', vi: 'Đánh Đổi Hiệu Năng' },
          ],
          rows: [
            {
              en: ['CPython (Standard)', 'Source -> Bytecode (.pyc)', 'Stack-based C Virtual Machine', 'Fast startup, moderate loop throughput'],
              vi: ['CPython (Chuẩn)', 'Source -> Bytecode (.pyc)', 'Máy ảo C dựa trên Stack', 'Khởi động nhanh, thông lượng vòng lặp trung bình'],
            },
            {
              en: ['PyPy (JIT)', 'Source -> Bytecode -> Native Machine Code', 'Tracing Just-In-Time Compiler', 'Slower warmup, up to 4x faster execution for pure Python'],
              vi: ['PyPy (JIT)', 'Source -> Bytecode -> Native Code', 'Trình biên dịch Tracing JIT', 'Khởi động chậm hơn, tốc độ chạy nhanh gấp 4 lần'],
            },
            {
              en: ['Cython / C Extensions', 'Python/C -> C Source -> Shared Object (.so)', 'Direct Native Hardware CPU', 'Maximum bare-metal throughput, requires C compilation'],
              vi: ['Cython / C Extension', 'Python/C -> C Source -> .so / .pyd', 'Phần cứng CPU trực tiếp', 'Tốc độ tối đa bare-metal, cần công cụ biên dịch C'],
            },
          ],
        },
        codeBlock: {
          language: 'python',
          filename: 'inspect_code_object.py',
          code: `def process_transaction(account_id: str, amount: float) -> str:
    fee = 1.50
    final_amount = amount + fee
    return f"Account {account_id}: Total \${final_amount:.2f}"

code = process_transaction.__code__

print("Bytecode instructions (raw bytes):", code.co_code[:12])
print("Constants pool (co_consts):", code.co_consts)
print("Variable names (co_varnames):", code.co_varnames)
print("Argument count (co_argcount):", code.co_argcount)`,
          explanation: {
            en: '`__code__` exposes the underlying `PyCodeObject` structure, including `co_varnames` (local variables) and `co_consts` (literal constants).',
            vi: '`__code__` cho phép xem cấu trúc `PyCodeObject`, gồm `co_varnames` (biến cục bộ) và `co_consts` (hằng số cố định).',
          },
        },
      },
      {
        id: 'py-hb-1-3',
        title: {
          en: 'CPython Virtual Machine & Frame Stack',
          vi: 'Máy Ảo CPython & Ngăn Xếp Frame',
        },
        content: {
          en: 'The CPython virtual machine is a **stack-based interpreter**. Every function invocation creates an execution **Frame (`PyFrameObject`)** on the runtime call stack. Each frame manages three key memory segments: 1) The **Value Stack** where intermediate operands are pushed and popped, 2) The **Fast Locals array** indexed by integers for `LOAD_FAST` variable reads, and 3) The **Block Stack** for exception handling and loop context. The core evaluation loop in `Python/ceval.c` iterates through opcodes, reading from and writing to these stacks.',
          vi: 'Máy ảo CPython là một **trình thông dịch dựa trên ngăn xếp (stack-based interpreter)**. Mỗi khi một hàm được gọi, một **Khung Thực Thi (`PyFrameObject`)** được tạo trên call stack của runtime. Mỗi frame quản lý 3 vùng bộ nhớ chính: 1) **Value Stack** chứa các toán hạng được đẩy vào/lấy ra khi tính toán, 2) Mảng **Fast Locals** được đánh chỉ số nguyên giúp lệnh `LOAD_FAST` đọc biến cực nhanh, và 3) **Block Stack** quản lý ngữ cảnh bắt lỗi và vòng lặp. Vòng lặp trung tâm trong file C `Python/ceval.c` duyệt qua từng opcode để thực thi.',
        },
        deepDive: {
          badge: { en: 'CPython Internals', vi: 'Bản Chất CPython' },
          title: {
            en: 'Why LOAD_FAST is dramatically faster than LOAD_GLOBAL',
            vi: 'Tại sao lệnh LOAD_FAST nhanh hơn nhiều so với LOAD_GLOBAL',
          },
          content: {
            en: 'When a function accesses a local variable, CPython generates `LOAD_FAST index`. This accesses an array offset in C with `O(1)` pointer indexing. In contrast, accessing a global or built-in variable triggers `LOAD_GLOBAL`, which performs hash table dictionary lookups across `f_globals` and `f_builtins`. Inside tight computation loops, caching a global function or math constant in a local parameter provides measurable performance speedups.',
            vi: 'Khi truy cập biến cục bộ trong hàm, CPython dùng chỉ thị `LOAD_FAST index`. Lệnh này đọc trực tiếp vị trí phần tử trong mảng C với độ phức tạp `O(1)`. Ngược lại, truy cập biến toàn cục kích hoạt `LOAD_GLOBAL`, phải tìm kiếm qua dictionary băm trong `f_globals` và `f_builtins`. Trong các vòng lặp tính toán nặng, việc gán hàm global vào biến local giúp tăng tốc độ rõ rệt.',
          },
          codeBlock: {
            language: 'python',
            filename: 'fast_locals_demo.py',
            code: `import math
import time

# Unoptimized: LOAD_GLOBAL on math.sqrt in every iteration
def compute_slow(numbers: list[float]) -> list[float]:
    return [math.sqrt(x) for x in numbers]

# Optimized: Local parameter binding transforms LOAD_GLOBAL into LOAD_FAST
def compute_fast(numbers: list[float], _sqrt=math.sqrt) -> list[float]:
    return [_sqrt(x) for x in numbers]`,
            explanation: {
              en: 'Passing `math.sqrt` as a default parameter `_sqrt` binds it to the function locals array, allowing CPython to use `LOAD_FAST` instead of resolving `math` and `sqrt` via dictionary lookups on every loop pass.',
              vi: 'Truyền `math.sqrt` làm tham số mặc định `_sqrt` giúp gắn nó vào mảng biến cục bộ, giúp CPython dùng `LOAD_FAST` thay vì phải tra cứu dictionary mỗi lần lặp.',
            },
          },
        },
      },
      {
        id: 'py-hb-1-4',
        title: {
          en: 'Disassembling & Inspecting Bytecode with dis',
          vi: 'Duyệt & Kiểm Tra Bytecode Lúc Chạy Với Mô-đun dis',
        },
        content: {
          en: 'The standard library module `dis` is the definitive diagnostic tool for disassembling Python functions and code objects into human-readable bytecode instructions. Reading disassembled output demystifies how Python operators translate into VM actions: additions become `BINARY_OP`, dictionary lookups become `BINARY_SUBSCR`, and method calls trigger `CALL` opcodes (or `PRECALL`/`CALL` in Python 3.11+).',
          vi: 'Mô-đun `dis` trong thư viện chuẩn là công cụ chẩn đoán đắc lực để dịch ngược hàm và code object Python thành danh sách các opcode dễ đọc. Đọc bytecode giúp bạn hiểu rõ cách toán tử hoạt động: phép cộng thành `BINARY_OP`, truy cập key dict thành `BINARY_SUBSCR` và gọi phương thức thành chỉ thị `CALL`.',
        },
        codeBlock: {
          language: 'python',
          filename: 'disassemble_example.py',
          code: `import dis

def add_elements(a: int, b: int) -> int:
    result = a + b
    return result

print("=== Bytecode Disassembly ===")
dis.dis(add_elements)`,
          explanation: {
            en: 'Output displays instruction offsets, line numbers, opcodes (`LOAD_FAST`, `BINARY_OP`, `STORE_FAST`, `RETURN_VALUE`), and arguments.',
            vi: 'Kết quả hiển thị vị trí offset, số dòng nguồn, tên opcode (`LOAD_FAST`, `BINARY_OP`, `STORE_FAST`, `RETURN_VALUE`) và tham số đi kèm.',
          },
        },
        bestPractices: {
          en: [
            'Use `dis.dis()` to verify optimization hypotheses before writing complex micro-optimizations',
            'Avoid modifying bytecode at runtime; treat code objects as read-only invariants',
            'Leverage Python 3.11+ specializing adaptive interpreter for automatic runtime opcode optimization',
          ],
          vi: [
            'Sử dụng `dis.dis()` để kiểm chứng giả thuyết hiệu năng trước khi tối ưu hóa vi mô',
            'Không nên chỉnh sửa bytecode lúc runtime; hãy coi code object là bất biến',
            'Tận dụng trình thông dịch thích ứng (Specializing Adaptive Interpreter) từ Python 3.11+ để tự động tối ưu hóa opcode',
          ],
        },
      },
    ],
    chapterSummary: {
      mentalModels: {
        en: [
          'Python compiles to bytecode first; it never interprets raw source text directly',
          'CPython is a stack-based virtual machine operating on execution frames (PyFrameObject)',
          'Local variables live in an indexed array accessed via O(1) LOAD_FAST instructions',
        ],
        vi: [
          'Python luôn biên dịch sang bytecode trước; không bao giờ đọc chuỗi text thô lúc chạy',
          'CPython là máy ảo dựa trên stack thao tác qua các khung thực thi (PyFrameObject)',
          'Biến cục bộ nằm trong mảng đánh chỉ số, truy xuất O(1) qua chỉ thị LOAD_FAST',
        ],
      },
      rules: {
        en: [
          'Syntax errors occur at AST parse time before any bytecode is executed',
          'Imported modules write pre-compiled .pyc files to __pycache__ for fast subsequent startup',
          'Prefer local variables over global lookups inside high-frequency performance loops',
        ],
        vi: [
          'Lỗi cú pháp SyntaxError xuất hiện ở bước dựng AST trước khi bất kỳ dòng mã nào chạy',
          'Các module đã import sẽ lưu bytecode .pyc vào __pycache__ để khởi động nhanh lần sau',
          'Ưu tiên dùng biến cục bộ thay vì biến toàn cục trong các vòng lặp cần hiệu năng cao',
        ],
      },
      commonTraps: {
        en: [
          'Assuming Python is purely interpreted line-by-line without an upfront compilation phase',
          'Relying on globals inside critical loops causing repeated LOAD_GLOBAL dictionary lookups',
        ],
        vi: [
          'Lầm tưởng Python là ngôn ngữ thông dịch đọc từng dòng mà không qua biên dịch trước',
          'Lạm dụng biến toàn cục trong vòng lặp gây tốn chi phí tra cứu dictionary liên tục',
        ],
      },
      takeaway: {
        en: 'CPython combines an AST compiler front-end with a fast stack-based evaluation virtual machine. Understanding bytecode and frame storage equips developers to write mechanically sympathetic, high-performance Python.',
        vi: 'CPython kết hợp trình biên dịch AST ở đầu vào với máy ảo thông dịch dựa trên stack. Việc hiểu sâu bytecode và bộ nhớ frame giúp lập trình viên viết code Python tối ưu và chuẩn xác.',
      },
    },
    selfReview: [
      {
        question: {
          en: 'Why does Python raise a SyntaxError immediately without executing prior valid print statements?',
          vi: 'Tại sao Python báo lỗi SyntaxError ngay lập tức mà không chạy các lệnh print hợp lệ đứng trước?',
        },
        hint: {
          en: 'Consider the distinction between parse time and execution time in the CPython pipeline.',
          vi: 'Hãy nghĩ về sự khác biệt giữa thời điểm phân tích cú pháp (parse time) và thời điểm thực thi (runtime).',
        },
        answer: {
          en: 'Before CPython executes any instruction, it passes the entire file through the Lexer and PEG Parser to construct an Abstract Syntax Tree (AST). If any syntax violation is detected anywhere in the file, AST creation aborts with a SyntaxError, and zero bytecode is emitted or executed.',
          vi: 'Trước khi CPython chạy bất kỳ chỉ thị nào, nó phải nạp toàn bộ file qua bộ tách Token và Parser PEG để dựng cây AST. Nếu có bất kỳ lỗi cú pháp nào trong file, quá trình dựng AST bị hủy ngay lập tức và không có mã bytecode nào được sinh ra hay thực thi.',
        },
      },
      {
        question: {
          en: 'What is stored inside a .pyc file in the __pycache__ directory?',
          vi: 'Bên trong file .pyc nằm trong thư mục __pycache__ chứa những gì?',
        },
        hint: {
          en: 'It contains a serialized data structure along with metadata headers.',
          vi: 'Nó chứa một cấu trúc dữ liệu đã được tuần tự hóa (marshal) cùng các header siêu dữ liệu.',
        },
        answer: {
          en: 'A `.pyc` file contains a 16-byte header (magic number representing Python version, bit flags, source file modification timestamp, and source size) followed by the marshaled `PyCodeObject` structure containing compiled bytecode, constants pool, and variable names.',
          vi: 'File `.pyc` chứa 16-byte header (magic number xác định phiên bản Python, cờ hiệu, timestamp ngày sửa file gốc và dung lượng file) tiếp theo là đối tượng `PyCodeObject` đã được marshal chứa bytecode, mảng hằng số và danh sách biến.',
        },
      },
      {
        question: {
          en: 'Why is accessing a local variable with LOAD_FAST faster than accessing a global with LOAD_GLOBAL?',
          vi: 'Tại sao truy cập biến cục bộ bằng LOAD_FAST lại nhanh hơn biến toàn cục LOAD_GLOBAL?',
        },
        hint: {
          en: 'Think about C pointer array indexing versus hash table dictionary lookups.',
          vi: 'Hãy so sánh giữa việc truy cập mảng con trỏ C bằng chỉ số nguyên với việc tra cứu bảng băm dictionary.',
        },
        answer: {
          en: '`LOAD_FAST` uses a static integer index to retrieve the object pointer directly from the execution frame C array in `O(1)` time without string hashing. In contrast, `LOAD_GLOBAL` must perform string hash calculations and search up to two dictionaries (`f_globals` and `f_builtins`).',
          vi: '`LOAD_FAST` dùng chỉ số nguyên tĩnh để lấy trực tiếp con trỏ đối tượng từ mảng C trong frame với thời gian `O(1)` mà không cần băm chuỗi. Ngược lại, `LOAD_GLOBAL` phải tính mã băm tên biến và tra cứu qua 2 dictionary (`f_globals` và `f_builtins`).',
        },
      },
    ],
  },

  // Chapter 2: Names, Objects, Identity & Mutability
  {
    id: 'py-hb-ch-2',
    number: 2,
    partNumber: 1,
    partTitle: {
      en: 'Python Execution & Object Model',
      vi: 'Mô Hình Thực Thi & Đối Tượng Python',
    },
    slug: 'names-objects-mutability',
    title: {
      en: 'Names, Objects, Identity & Mutability',
      vi: 'Tên, Đối Tượng, Định Danh & Tính Khả Biến',
    },
    summary: {
      en: 'Variables as memory labels, value equality versus identity, mutable vs immutable internals, shallow copies, deep copies, and default argument traps.',
      vi: 'Bản chất biến là nhãn dán bộ nhớ, so sánh giá trị so với định danh, đối tượng khả biến và bất biến, sao chép nông, sao chép sâu và bẫy tham số mặc định.',
    },
    readTimeMinutes: 20,
    sections: [
      {
        id: 'py-hb-2-1',
        title: {
          en: 'The "Names as Labels" Mental Model',
          vi: 'Mô Hình Tâm Trí: "Biến Là Nhãn Dán Bộ Nhớ"',
        },
        content: {
          en: 'In languages like C or C++, a variable represents a named memory box that physically holds a value. In Python, **variables are NOT boxes**. Variables are named references (sticky labels) bound to objects residing in heap memory. When you execute `a = [1, 2, 3]`, Python creates a list object in heap memory and attaches the label `a` to it. Executing `b = a` attaches a second label `b` to the **exact same list object**. Every object possesses three fundamental properties: 1) **Identity** (`id()`), 2) **Type** (`type()`), and 3) **Value**.',
          vi: 'Trong các ngôn ngữ như C hay C++, biến là một chiếc hộp bộ nhớ vật lý chứa giá trị bên trong. Trong Python, **biến KHÔNG PHẢI là những chiếc hộp**. Bản chất biến là các nhãn tên (references) được gắn vào các đối tượng nằm trong bộ nhớ heap. Khi bạn viết `a = [1, 2, 3]`, Python tạo một đối tượng list trên heap rồi dán nhãn `a` vào đó. Khi viết `b = a`, Python dán thêm nhãn `b` vào **cùng đối tượng list đó**. Mọi đối tượng trong Python đều có 3 thuộc tính cốt lõi: 1) **Định danh** (`id()`), 2) **Kiểu dữ liệu** (`type()`), và 3) **Giá trị**.',
        },
        keyIdea: {
          en: 'Python variables are named references bound to objects in heap memory. Assignment (`b = a`) shares the object reference; it does not clone data.',
          vi: 'Biến trong Python là con trỏ tham chiếu gắn vào đối tượng trong heap. Phép gán (`b = a`) chia sẻ tham chiếu đối tượng chứ không nhân bản dữ liệu.',
        },
        diagram: {
          title: {
            en: 'Python Name Binding vs C Box Model',
            vi: 'Mô Hình Gán Nhãn Python So Với Hộp Bộ Nhớ C',
          },
          steps: [
            {
              number: 1,
              label: { en: 'Heap Object Allocation', vi: 'Cấp Phát Đối Tượng Trên Heap' },
              description: {
                en: 'Python allocates PyObject structure (ob_refcnt, ob_type, ob_val) in heap.',
                vi: 'Python cấp phát cấu trúc PyObject (ob_refcnt, ob_type, ob_val) trên bộ nhớ heap.',
              },
            },
            {
              number: 2,
              label: { en: 'Name Binding (a = obj)', vi: 'Gán Nhãn Tên (a = obj)' },
              description: {
                en: 'Namespace dictionary maps string key "a" to target heap object memory pointer.',
                vi: 'Dictionary namespace ánh xạ chuỗi "a" tới con trỏ đối tượng trên heap.',
              },
            },
            {
              number: 3,
              label: { en: 'Aliased Reference (b = a)', vi: 'Tham Chiếu Bí Danh (b = a)' },
              description: {
                en: 'Label "b" is bound to the identical pointer. Reference count increments.',
                vi: 'Nhãn "b" được gắn vào cùng con trỏ đối tượng. Bộ đếm tham chiếu tăng lên.',
              },
            },
          ],
        },
        codeBlock: {
          language: 'python',
          filename: 'object_identity.py',
          code: `a = [10, 20, 30]
b = a  # Both labels point to the same memory object

print("Address of a:", hex(id(a)))
print("Address of b:", hex(id(b)))
print("Are they identical (is)?", a is b)  # True

# Mutating via label 'b' reflects in 'a'
b.append(99)
print("State of a:", a)  # [10, 20, 30, 99]`,
          explanation: {
            en: '`id()` returns the object memory address in CPython. `is` checks memory address equivalence, proving `a` and `b` reference the same memory allocation.',
            vi: '`id()` trả về địa chỉ bộ nhớ trong CPython. Toán tử `is` kiểm tra trùng khớp địa chỉ bộ nhớ, chứng minh `a` và `b` cùng trỏ vào một vùng nhớ.',
          },
        },
      },
      {
        id: 'py-hb-2-2',
        title: {
          en: 'Value Equality (==) vs. Object Identity (is)',
          vi: 'So Sánh Giá Trị (==) vs. Định Danh Đối Tượng (is)',
        },
        content: {
          en: 'A core pillar of Python mastery is distinguishing between **Value Equality** (`==`) and **Identity** (`is`): 1) `a == b` invokes the `__eq__` magic method to evaluate whether two objects contain equivalent values. 2) `a is b` compares raw memory addresses (`id(a) == id(b)`), checking if both variables point to the exact same object in heap memory. Python interns small integers (`-5` to `256`) and short string identifiers in memory pools, but relying on `is` for value comparisons is a critical defect.',
          vi: 'Một nguyên lý cốt lõi cần phân biệt rõ trong Python là **So sánh giá trị** (`==`) và **So sánh định danh** (`is`): 1) `a == b` gọi phương thức `__eq__` để kiểm tra hai đối tượng có giá trị tương đương nhau hay không. 2) `a is b` so sánh trực tiếp địa chỉ bộ nhớ (`id(a) == id(b)`), xác định xem hai biến có cùng trỏ tới một đối tượng trên heap hay không. CPython có cơ chế intern các số nguyên nhỏ (`-5` đến `256`) và chuỗi ngắn, nhưng lạm dụng `is` để so sánh giá trị là một lỗi nguy hiểm.',
        },
        comparisonTable: {
          headers: [
            { en: 'Comparison', vi: 'Toán Tử' },
            { en: 'Underlying Mechanism', vi: 'Bản Chất Dưới Máy' },
            { en: 'Correct Use Case', vi: 'Trường Hợp Dùng Đúng' },
            { en: 'Anti-Pattern Risk', vi: 'Rủi Ro Anti-Pattern' },
          ],
          rows: [
            {
              en: ['a == b (Equality)', 'Invokes a.__eq__(b)', 'Comparing contents of strings, numbers, dicts, lists', 'Comparing with singleton `None`'],
              vi: ['a == b (Giá Trị)', 'Gọi phương thức a.__eq__(b)', 'So sánh nội dung chuỗi, số học, dict, list', 'So sánh với singleton `None`'],
            },
            {
              en: ['a is b (Identity)', 'Compares memory pointers id(a) == id(b)', 'Checking singletons (`None`, `True`, `False`, `Ellipsis`)', 'Using for integer/string value comparisons'],
              vi: ['a is b (Định Danh)', 'So sánh địa chỉ id(a) == id(b)', 'Kiểm tra biến singleton (`None`, `True`, `False`)', 'Dùng so sánh giá trị số hoặc chuỗi'],
            },
          ],
        },
        commonMistakes: [
          {
            mistake: {
              en: 'Using `is` to check integer or string value equality (e.g., `if count is 1000:`)',
              vi: 'Dùng toán tử `is` để so sánh số nguyên hoặc chuỗi (ví dụ: `if count is 1000:`)',
            },
            why: {
              en: 'CPython only interns small integers between -5 and 256. Integers outside this range allocate distinct memory addresses, causing `is` to evaluate to False.',
              vi: 'CPython chỉ lưu đệm sẵn các số nguyên nhỏ từ -5 đến 256. Các số ngoài khoảng này sẽ cấp phát vùng nhớ riêng, khiến phép so sánh `is` trả về False.',
            },
            solution: {
              en: 'Always use `==` for values; restrict `is` exclusively to singletons like `None`.',
              vi: 'Luôn dùng `==` khi so sánh giá trị; chỉ dùng `is` cho các đối tượng singleton như `None`.',
            },
            codeIncorrect: `status_code = 500
if status_code is 500:  # Unreliable across interpreters!
    handle_error()`,
            codeCorrect: `status_code = 500
if status_code == 500:  # Robust value equality
    handle_error()

if user_input is None:  # Correct identity check for singleton
    handle_empty()`,
          },
        ],
      },
      {
        id: 'py-hb-2-3',
        title: {
          en: 'Mutability, Immutability & Re-binding',
          vi: 'Tính Khả Biến, Bất Biến & Cơ Chế Gán Lại',
        },
        content: {
          en: 'Python types are strictly divided into **Immutable** (numbers, `str`, `tuple`, `frozenset`, `bytes`) and **Mutable** (`list`, `dict`, `set`, `bytearray`, custom class instances). When modifying an immutable object (e.g. `s += "!"`), Python does not change the bytes in place; it allocates an entirely new object and re-binds the variable label. For mutable objects, in-place methods (`list.append()`, `dict.update()`) alter internal state without modifying the memory address.',
          vi: 'Kiểu dữ liệu trong Python chia làm 2 nhóm rõ rệt: **Bất biến (Immutable)** (`int`, `float`, `str`, `tuple`, `frozenset`, `bytes`) và **Khả biến (Mutable)** (`list`, `dict`, `set`, `bytearray`, instance class). Khi bạn chỉnh sửa đối tượng bất biến (ví dụ `s += "!"`), Python không ghi đè lên bộ nhớ cũ mà cấp phát một đối tượng hoàn toàn mới và gán lại nhãn biến. Với đối tượng khả biến, các phương thức sửa tại chỗ (`append()`, `update()`) thay đổi trực tiếp nội dung mà không đổi địa chỉ id.',
        },
        codeBlock: {
          language: 'python',
          filename: 'mutability_demo.py',
          code: `# 1. Immutable Re-binding
num = 42
initial_id = id(num)
num += 1  # Allocates a new int object 43
print("Int re-bound to new object:", id(num) != initial_id)  # True

# 2. In-Place Mutable Modification
data = [1, 2]
initial_list_id = id(data)
data.append(3)  # Modifies internal memory buffer in-place
print("List ID preserved:", id(data) == initial_list_id)  # True

# 3. Edge Case: Immutable tuple containing a mutable list
container = (1, [10, 20])
container[1].append(30)  # Mutates inner list without changing tuple container identity
print("Mutated inner tuple contents:", container)  # (1, [10, 20, 30])`,
          explanation: {
            en: 'Demonstrates how immutability protects container references, while inner mutable elements remain modifiable in-place.',
            vi: 'Minh họa cách tính bất biến bảo vệ tham chiếu của tuple, trong khi các phần tử khả biến bên trong vẫn có thể bị thay đổi.',
          },
        },
      },
      {
        id: 'py-hb-2-4',
        title: {
          en: 'Shallow Copies vs. Deep Copies',
          vi: 'Bản Sao Nông (Shallow Copy) vs. Bản Sao Sâu (Deep Copy)',
        },
        content: {
          en: 'When duplicating data structures, developers must choose the correct copy depth: 1) **Shallow Copy** (`list.copy()`, `dict.copy()`, `copy.copy()`, or slicing `data[:]`) creates a new outer container but populates it with references to the original inner objects. 2) **Deep Copy** (`copy.deepcopy()`) recursively traverses nested objects and constructs independent copies of every mutable child object, preventing accidental cross-talk side effects.',
          vi: 'Khi cần sao chép dữ liệu, lập trình viên cần chọn đúng độ sâu sao chép: 1) **Bản sao nông (Shallow Copy)** (`list.copy()`, `dict.copy()`, `copy.copy()` hoặc lát cắt `data[:]`) tạo một container ngoài mới nhưng giữ nguyên tham chiếu tới các đối tượng con bên trong. 2) **Bản sao sâu (Deep Copy)** (`copy.deepcopy()`) duyệt đệ quy qua toàn bộ cấu trúc lồng nhau và nhân bản độc lập từng phần tử con, loại bỏ hoàn toàn nguy cơ biến này làm đổi dữ liệu biến kia.',
        },
        codeBlock: {
          language: 'python',
          filename: 'copy_mechanics.py',
          code: `import copy

original = {"user": "Alice", "preferences": {"theme": "dark", "fontSize": 14}}

# Shallow Copy: Outer dict is new, inner dict is SHARED
shallow = original.copy()
shallow["preferences"]["theme"] = "light"
print("Original mutated by shallow copy!", original["preferences"]["theme"])  # light

# Deep Copy: Full recursive clone
deep = copy.deepcopy(original)
deep["preferences"]["theme"] = "sepia"
print("Original preserved after deep copy:", original["preferences"]["theme"])  # light`,
          explanation: {
            en: 'Modifying nested mutable dictionaries inside a shallow copy inadvertently mutates the original parent object.',
            vi: 'Sửa dictionary lồng nhau trong bản sao nông sẽ vô tình làm thay đổi luôn dữ liệu của đối tượng gốc ban đầu.',
          },
        },
      },
      {
        id: 'py-hb-2-5',
        title: {
          en: 'The Mutable Default Argument Reference Trap',
          vi: 'Cạm Bẫy Tham Số Mặc Định Khả Biến Trong Hàm',
        },
        content: {
          en: 'One of the most famous traps in Python engineering is using a mutable object (like a `list` or `dict`) as a default parameter in function definitions. In Python, default parameter expressions are evaluated **EXACTLY ONCE when the function definition is executed** (at module load time), NOT each time the function is called. As a result, all invocations that rely on the default argument share the exact same mutable object instance across requests.',
          vi: 'Một trong những bẫy phổ biến nhất trong Python là dùng đối tượng khả biến (như `list` hoặc `dict`) làm giá trị mặc định cho tham số hàm. Trong Python, biểu thức tham số mặc định được thực thi **ĐÚNG MỘT LẦN khi hàm được định nghĩa** (lúc nạp module), chứ KHÔNG PHẢI mỗi khi hàm được gọi. Kết quả là mọi lần gọi hàm không truyền tham số đều dùng chung một instance đối tượng duy nhất, gây rò rỉ dữ liệu giữa các lần gọi.',
        },
        commonMistakes: [
          {
            mistake: {
              en: 'Defining `def add_item(item, target_list=[])` with a mutable list default',
              vi: 'Khai báo `def add_item(item, target_list=[])` với giá trị mặc định là list rỗng',
            },
            why: {
              en: 'The default list is instantiated once at function definition time. Subsequent calls accumulate mutated items across independent invocations.',
              vi: 'List mặc định được tạo một lần duy nhất khi hàm định nghĩa. Các lần gọi tiếp theo sẽ dồn dữ liệu của nhau vào chung một list.',
            },
            solution: {
              en: 'Use `None` as the sentinel default value and initialize a fresh list inside the function body.',
              vi: 'Dùng `None` làm giá trị mặc định và khởi tạo list mới bên trong thân hàm.',
            },
            codeIncorrect: `def append_record(record: dict, registry: list = []):
    registry.append(record)
    return registry

print(append_record({"id": 1}))  # [{'id': 1}]
print(append_record({"id": 2}))  # [{'id': 1}, {'id': 2}] -> Bug!`,
            codeCorrect: `from typing import Optional

def append_record(record: dict, registry: Optional[list] = None) -> list:
    if registry is None:
        registry = []  # Fresh instance per invocation
    registry.append(record)
    return registry

print(append_record({"id": 1}))  # [{'id': 1}]
print(append_record({"id": 2}))  # [{'id': 2}] -> Clean!`,
          },
        ],
        keyTakeaways: {
          en: [
            'Python variables are named references, not physical storage boxes',
            'Use `==` for value comparison and `is` strictly for singletons like `None`',
            'Never use mutable objects as default arguments; use `None` sentinel pattern',
          ],
          vi: [
            'Biến trong Python là nhãn tham chiếu, không phải hộp chứa vật lý',
            'Dùng `==` để so sánh giá trị và `is` chỉ dành riêng cho singleton như `None`',
            'Tuyệt đối không dùng đối tượng khả biến làm tham số mặc định; hãy dùng mẫu `None` sentinel',
          ],
        },
      },
    ],
    chapterSummary: {
      mentalModels: {
        en: [
          'Variables are sticky name tags attached to objects residing in heap memory',
          'Assignment (a = b) creates an alias pointing to the existing memory address',
          'Default function arguments are evaluated once at module load, not per invocation',
        ],
        vi: [
          'Biến là các nhãn tên dán vào đối tượng nằm trong bộ nhớ heap',
          'Phép gán (a = b) tạo ra bí danh trỏ cùng vào địa chỉ bộ nhớ hiện có',
          'Tham số mặc định của hàm được tính toán 1 lần lúc nạp module, không phải mỗi lần gọi',
        ],
      },
      rules: {
        en: [
          'Check singletons using `is None` and `is not None`',
          'Use `copy.deepcopy()` whenever modifying nested mutable collections',
          'Adopt the sentinel pattern (`arg: Optional[list] = None`) for mutable parameters',
        ],
        vi: [
          'Kiểm tra giá trị rỗng bằng `is None` và `is not None`',
          'Dùng `copy.deepcopy()` khi cần sao chép cấu trúc dữ liệu lồng nhau',
          'Áp dụng mẫu sentinel (`arg: Optional[list] = None`) cho tham số có thể thay đổi',
        ],
      },
      commonTraps: {
        en: [
          'Relying on integer caching for equality checks using `is`',
          'Modifying an aliased mutable list expecting the original to stay unchanged',
          'Accumulating state across requests via mutable default arguments',
        ],
        vi: [
          'Dùng toán tử `is` để so sánh số lớn gây lỗi không lường trước',
          'Sửa đổi list bí danh và mong đợi đối tượng gốc không bị ảnh hưởng',
          'Lưu dồn trạng thái giữa các request do dùng list/dict làm tham số mặc định',
        ],
      },
      takeaway: {
        en: 'Mastering Python begins with the reference model: everything is an object, names are labels, and mutability dictates whether mutations propagate through aliased pointers.',
        vi: 'Làm chủ Python bắt đầu từ mô hình tham chiếu: mọi thứ đều là đối tượng, biến là nhãn dán, và tính khả biến quyết định việc thay đổi có lan truyền qua các biến bí danh hay không.',
      },
    },
    selfReview: [
      {
        question: {
          en: 'What is the output of `a = [1]; b = a; b += [2]; print(a)` versus `a = (1,); b = a; b += (2,); print(a)`?',
          vi: 'Kết quả in ra của `a = [1]; b = a; b += [2]; print(a)` và `a = (1,); b = a; b += (2,); print(a)` là gì?',
        },
        hint: {
          en: 'Consider the difference in `+=` implementation between mutable lists (`__iadd__`) and immutable tuples.',
          vi: 'Xem xét cách toán tử `+=` hoạt động trên list khả biến (`__iadd__`) so với tuple bất biến.',
        },
        answer: {
          en: 'For the list, `a` outputs `[1, 2]` because `list.__iadd__` mutates the list in-place. For the tuple, `a` outputs `(1,)` because tuples are immutable, so `b += (2,)` creates a new tuple and re-binds `b`, leaving `a` referencing the original tuple.',
          vi: 'Với list, `a` in ra `[1, 2]` vì `list.__iadd__` sửa trực tiếp tại chỗ. Với tuple, `a` in ra `(1,)` vì tuple là bất biến nên `b += (2,)` tạo một tuple mới và gán lại cho `b`, còn `a` vẫn trỏ vào tuple ban đầu.',
        },
      },
      {
        question: {
          en: 'Why is `x is None` preferred over `x == None`?',
          vi: 'Tại sao nên dùng `x is None` thay vì `x == None`?',
        },
        hint: {
          en: 'Consider custom classes that override the `__eq__` operator.',
          vi: 'Hãy nghĩ đến trường hợp class tùy chỉnh ghi đè phương thức so sánh `__eq__`.',
        },
        answer: {
          en: '`None` is a singleton in Python. `is None` compiles to a fast single pointer comparison opcode (`POP_JUMP_IF_NONE` or `IS_OP`). In contrast, `== None` calls the `__eq__` method, which can be overridden by a custom class to return misleading truthy values.',
          vi: '`None` là một singleton duy nhất trong bộ nhớ. `is None` thực thi bằng một lệnh so sánh con trỏ trực tiếp rất nhanh. Ngược lại, `== None` phải gọi phương thức `__eq__`, có thể bị class con ghi đè trả về kết quả sai lệch.',
        },
      },
    ],
  },

  // Chapter 3: Modules, Packages & The Import System
  {
    id: 'py-hb-ch-3',
    number: 3,
    partNumber: 1,
    partTitle: {
      en: 'Python Execution & Object Model',
      vi: 'Mô Hình Thực Thi & Đối Tượng Python',
    },
    slug: 'modules-packages-imports',
    title: {
      en: 'Modules, Packages & The Import System',
      vi: 'Modules, Packages & Hệ Thống Import',
    },
    summary: {
      en: 'Module namespaces, sys.path resolution algorithms, sys.modules caching, PEP 420 namespace packages, and resolving circular import cycles.',
      vi: 'Namespace của module, thuật toán phân giải sys.path, cache sys.modules, namespace packages PEP 420 và xử lý triệt để phụ thuộc vòng circular imports.',
    },
    readTimeMinutes: 16,
    sections: [
      {
        id: 'py-hb-3-1',
        title: {
          en: 'Module Namespaces & Symbol Binding',
          vi: 'Namespace Của Module & Gán Symbol',
        },
        content: {
          en: 'Every Python `.py` file is a self-contained module with its own global namespace (`__dict__`). When Python executes a module, top-level assignments, function definitions, and class statements populate this dictionary. Importing a module does not pollute your local scope with private variables unless explicitly requested. The special variable `__name__` evaluates to `"__main__"` when run directly from the command line, enabling the standard `if __name__ == "__main__":` entrypoint idiom.',
          vi: 'Mỗi file `.py` trong Python là một module độc lập sở hữu namespace toàn cục riêng (`__dict__`). Khi Python chạy module, các phép gán cấp cao, định nghĩa hàm và class sẽ nạp vào dictionary này. Việc import một module không làm lẫn lộn phạm vi cục bộ của bạn. Biến đặc biệt `__name__` nhận giá trị `"__main__"` khi file được chạy trực tiếp từ dòng lệnh, tạo nên cấu trúc điểm khởi chạy chuẩn `if __name__ == "__main__":`.',
        },
        codeBlock: {
          language: 'python',
          filename: 'module_entrypoint.py',
          code: `def initialize_database() -> None:
    print("Database connection pool established.")

def run_server() -> None:
    initialize_database()
    print("API Gateway listening on :8080")

# Idiomatic Entrypoint Check
if __name__ == "__main__":
    run_server()`,
          explanation: {
            en: 'Allows the script to be executed as a standalone CLI application while remaining safely importable by automated test suites without triggering side effects.',
            vi: 'Cho phép file vừa chạy được như ứng dụng dòng lệnh độc lập, vừa có thể được import vào các bài test mà không tự động chạy server.',
          },
        },
      },
      {
        id: 'py-hb-3-2',
        title: {
          en: 'sys.path Resolution Order & sys.modules Cache',
          vi: 'Thứ Tự Tìm Kiếm sys.path & Bộ Nhớ Cache sys.modules',
        },
        content: {
          en: 'When Python encounters an `import foo` statement, it executes a deterministic 3-step lookup: 1) **Cache Inspection**: It inspects `sys.modules` to check if `foo` is already loaded. If cached, it binds the reference immediately in `O(1)` time. 2) **Path Search**: If not cached, Python searches through directory paths in `sys.path` sequentially (current script directory, `PYTHONPATH` environment paths, and standard library/site-packages). 3) **Execution & Caching**: It compiles source bytecode, creates a new `types.ModuleType` object, executes top-level statements, and records the instance in `sys.modules`.',
          vi: 'Khi Python gặp câu lệnh `import foo`, nó thực hiện thuật toán tìm kiếm 3 bước xác định: 1) **Kiểm tra cache**: Soi `sys.modules` xem `foo` đã được nạp vào bộ nhớ chưa. Nếu có, nó gán tham chiếu ngay lập tức `O(1)`. 2) **Duyệt đường dẫn**: Nếu chưa có, Python duyệt tuần tự qua các thư mục trong `sys.path` (thư mục chứa file chạy, biến môi trường `PYTHONPATH`, thư viện chuẩn và site-packages). 3) **Thực thi & Lưu cache**: Biên dịch bytecode, tạo đối tượng `types.ModuleType`, chạy các lệnh top-level và lưu vào `sys.modules`.',
        },
        diagram: {
          title: {
            en: 'Python Module Import Lifecycle',
            vi: 'Vòng Đời Nạp Module Trong Python',
          },
          steps: [
            {
              number: 1,
              label: { en: 'Cache Check in sys.modules', vi: 'Kiểm Tra Cache sys.modules' },
              description: {
                en: 'Returns existing module instance immediately if already loaded.',
                vi: 'Trả về ngay instance module nếu đã từng được import trước đó.',
              },
            },
            {
              number: 2,
              label: { en: 'Finders & Loaders on sys.path', vi: 'Trình Tìm Kiếm Trên sys.path' },
              description: {
                en: 'Iterates sys.meta_path finders to locate source file or C extension.',
                vi: 'Duyệt các finder để xác định vị trí file .py hoặc C extension.',
              },
            },
            {
              number: 3,
              label: { en: 'Execution & Registration', vi: 'Thực Thi & Đăng Ký Cache' },
              description: {
                en: 'Executes module top-level code and caches result in sys.modules dictionary.',
                vi: 'Chạy mã cấp cao của module và lưu kết quả vào dictionary sys.modules.',
              },
            },
          ],
        },
      },
      {
        id: 'py-hb-3-3',
        title: {
          en: 'Packages, __init__.py & PEP 420 Namespace Packages',
          vi: 'Packages, __init__.py & Namespace Packages PEP 420',
        },
        content: {
          en: 'A directory containing an `__init__.py` file is treated as a **Regular Python Package**. The `__init__.py` file initializes the package namespace and defines exported symbols via `__all__ = ["SymbolA", "SymbolB"]`. Starting with Python 3.3 (PEP 420), directories without `__init__.py` are recognized as **Implicit Namespace Packages**, allowing a single logical package to be split across multiple distinct directory paths or independent wheel distributions.',
          vi: 'Một thư mục chứa file `__init__.py` được coi là **Package Python Chuẩn**. File `__init__.py` dùng để khởi tạo namespace cho package và quy định các symbol được xuất khẩu thông qua danh sách `__all__ = ["SymbolA", "SymbolB"]`. Từ Python 3.3 (PEP 420), các thư mục không có `__init__.py` được nhận diện là **Namespace Package Ngầm Định**, cho phép chia nhỏ một package logic trên nhiều thư mục hoặc package wheel độc lập.',
        },
        codeBlock: {
          language: 'python',
          filename: 'pkg_init_export.py',
          code: `# my_package/__init__.py
from .auth import Authenticator
from .client import APIClient

# Explicitly define public API surface for 'from my_package import *'
__all__ = ["Authenticator", "APIClient"]
__version__ = "2.4.0"`,
          explanation: {
            en: '`__all__` provides an explicit contract for public exports, shielding internal helper modules from unauthorized imports.',
            vi: '`__all__` tạo ra bản hợp đồng rõ ràng cho các API công khai, ẩn đi các module phụ trợ nội bộ.',
          },
        },
      },
      {
        id: 'py-hb-3-4',
        title: {
          en: 'Circular Imports: Root Cause & Architectural Remedies',
          vi: 'Phụ Thuộc Vòng (Circular Imports): Nguyên Nhân & Giải Pháp',
        },
        content: {
          en: 'A **Circular Import** occurs when Module A imports Module B at the top-level while Module B simultaneously imports Module A. When Module A is being executed, it halts midway to load Module B. If Module B attempts to access a function or class from Module A that has not yet been executed, Python raises an `AttributeError` or `ImportError: cannot import name`.',
          vi: 'Lỗi **Phụ thuộc vòng (Circular Import)** xảy ra khi Module A import Module B ở cấp top-level trong khi Module B cũng import Module A. Khi Module A đang chạy dở thì chuyển sang nạp B. Nếu B cố truy cập một hàm hay class của A mà A chưa kịp chạy đến, Python sẽ báo lỗi `AttributeError` hoặc `ImportError: cannot import name`.',
        },
        commonMistakes: [
          {
            mistake: {
              en: 'Tight top-level coupling between domain models and service layers causing circular imports',
              vi: 'Ghép nối chặt chẽ cấp top-level giữa tầng model và tầng service gây lỗi import vòng',
            },
            why: {
              en: 'Modules are executed sequentially from top to bottom. Accessing incomplete module definitions causes runtime lookup failures.',
              vi: 'Các module được thực thi tuần tự từ trên xuống dưới. Truy cập symbol khi module chưa chạy xong sẽ thất bại.',
            },
            solution: {
              en: 'Refactor shared types into an independent `types.py` module, use `from typing import TYPE_CHECKING` with string annotations, or defer imports inside functions.',
              vi: 'Tách kiểu dữ liệu chung sang module `types.py` riêng biệt, dùng `if TYPE_CHECKING:` kèm type hints dạng chuỗi hoặc dời import vào trong hàm.',
            },
            codeIncorrect: `# models.py
from services import calculate_user_tax # services.py imports User from models!
class User:
    def get_tax(self):
        return calculate_user_tax(self)`,
            codeCorrect: `# models.py (Clean architecture using TYPE_CHECKING)
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from services import TaxService

class User:
    def get_tax(self, service: "TaxService") -> float:
        return service.calculate_tax(self)`,
          },
        ],
        keyTakeaways: {
          en: [
            'Modules are executed once and cached in `sys.modules`',
            '`sys.path` determines directory search priority for imports',
            'Eliminate circular imports by extracting shared contracts and using `TYPE_CHECKING` guards',
          ],
          vi: [
            'Module chỉ chạy một lần duy nhất và được lưu cache trong `sys.modules`',
            '`sys.path` quyết định thứ tự ưu tiên tìm kiếm thư mục',
            'Triệt tiêu circular import bằng cách tách module dùng chung và dùng khối `if TYPE_CHECKING:`',
          ],
        },
      },
    ],
    chapterSummary: {
      mentalModels: {
        en: [
          'A module is a runtime singleton object backed by a namespace dictionary',
          'Import resolution is a cache-first algorithm (sys.modules -> sys.path -> compilation)',
          'Package hierarchies map filesystem directories to dotted namespace trees',
        ],
        vi: [
          'Module là một đối tượng singleton lúc runtime quản lý bởi namespace dictionary',
          'Quy trình import ưu tiên cache trước (sys.modules -> sys.path -> biên dịch)',
          'Hệ thống package ánh xạ thư mục ổ đĩa thành cây namespace phân cấp bằng dấu chấm',
        ],
      },
      rules: {
        en: [
          'Use absolute imports for clean, unambiguous package references across large projects',
          'Guard executable entry points with `if __name__ == "__main__":`',
          'Use `if TYPE_CHECKING:` to break cyclic dependencies required only for static type hints',
        ],
        vi: [
          'Sử dụng import tuyệt đối để đường dẫn rõ ràng, tránh nhầm lẫn trong dự án lớn',
          'Bảo vệ điểm khởi chạy bằng khối `if __name__ == "__main__":`',
          'Dùng `if TYPE_CHECKING:` để giải quyết phụ thuộc vòng chỉ dùng cho gợi ý kiểu tĩnh',
        ],
      },
      commonTraps: {
        en: [
          'Mutating `sys.path` dynamically at runtime rather than configuring proper virtualenvs',
          'Using wildcard imports (`from module import *`) polluting namespaces with undocumented symbols',
        ],
        vi: [
          'Chỉnh sửa `sys.path` tùy tiện lúc runtime thay vì cấu hình môi trường ảo chuẩn',
          'Dùng import sao (`from module import *`) làm tràn ngập namespace với các biến lạ',
        ],
      },
      takeaway: {
        en: 'Understanding Python import mechanics turns elusive path and circular dependency bugs into predictable, cleanly architected package boundaries.',
        vi: 'Nắm vững cơ chế import giúp biến các lỗi đường dẫn và phụ thuộc vòng khó hiểu thành ranh giới kiến trúc package sạch sẽ và dễ bảo trì.',
      },
    },
    selfReview: [
      {
        question: {
          en: 'What happens if a module is imported 100 times across various files during a single application execution?',
          vi: 'Điều gì xảy ra nếu một module được import 100 lần ở nhiều file khác nhau trong một lần chạy ứng dụng?',
        },
        hint: {
          en: 'Think about `sys.modules` caching behavior.',
          vi: 'Hãy nghĩ về cơ chế lưu cache trong `sys.modules`.',
        },
        answer: {
          en: 'The module code executes exactly ONCE during the first import. The resulting module object is cached in `sys.modules`. All subsequent 99 imports perform an `O(1)` dictionary lookup in `sys.modules` and bind the cached instance immediately without re-executing any code.',
          vi: 'Mã nguồn của module chỉ chạy đúng MỘT LẦN ở lần import đầu tiên. Đối tượng module được lưu vào `sys.modules`. Cả 99 lần import sau chỉ tra cứu `O(1)` trong `sys.modules` và gán lại tham chiếu chứ không chạy lại mã.',
        },
      },
      {
        question: {
          en: 'How does `if TYPE_CHECKING:` help resolve circular imports?',
          vi: 'Tại sao `if TYPE_CHECKING:` giúp loại bỏ lỗi circular import?',
        },
        hint: {
          en: 'What is the boolean value of `TYPE_CHECKING` at runtime versus during static analysis with mypy or pyright?',
          vi: 'Giá trị boolean của `TYPE_CHECKING` lúc runtime so với lúc chạy công cụ phân tích tĩnh như mypy là gì?',
        },
        answer: {
          en: '`typing.TYPE_CHECKING` evaluates to `False` at runtime, completely skipping the enclosed import statement during normal execution. However, static type checkers like Mypy and IDEs treat it as `True`, allowing full type annotations without incurring runtime import cycles.',
          vi: '`typing.TYPE_CHECKING` có giá trị `False` lúc runtime, bỏ qua hoàn toàn câu lệnh import khi chạy thật. Tuy nhiên, các công cụ phân tích tĩnh như Mypy và IDE coi nó là `True`, cho phép kiểm tra kiểu đầy đủ mà không gây lỗi vòng lặp import.',
        },
      },
    ],
  },
];
