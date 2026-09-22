import { BookMetadata } from '../types';

export const BOOK_METADATA_CATALOG: BookMetadata[] = [
  {
    "id": "python-handbook",
    "slug": "python-handbook",
    "title": "Python Handbook",
    "subtitle": {
      "en": "Language Mechanics, Data Models, VM Architecture & Modern Engineering",
      "vi": "Cơ Chế Ngôn Ngữ, Data Models, Kiến Trúc Máy Ảo & Kỹ Thuật Python Hiện Đại"
    },
    "bookType": "Handbook",
    "fieldId": "computer-science",
    "domainId": "backend-systems",
    "domainIds": [
      "programming"
    ],
    "topicId": "python",
    "categoryId": "python",
    "subjectId": "programming",
    "author": "4TM Technical Board",
    "role": "Language & Runtime Engineering Committee",
    "level": "Comprehensive",
    "estimatedReadTime": "5.5 hours",
    "chaptersCount": 17,
    "edition": "2nd Revised Editorial Edition",
    "isbn": "978-0-4TM-PY2025-1",
    "publishedDate": "2025-02-15",
    "publishedYear": 2025,
    "accentColor": "from-blue-600 to-indigo-800",
    "tags": [
      "Python 3.12+",
      "CPython VM",
      "Data Model",
      "Bytecode",
      "Decorators",
      "Asyncio",
      "Typing Protocols"
    ],
    "description": {
      "en": "The definitive technical publication on Python internals, memory representations, object model dunders, scoping rules, and high-performance concurrent architectures.",
      "vi": "Ấn phẩm kỹ thuật chuẩn mực và chuyên sâu về bản chất CPython, cơ chế bộ nhớ, mô hình đối tượng data model, quy tắc phạm vi biến và kiến trúc lập trình đồng thời hiệu năng cao."
    },
    "prerequisites": {
      "en": [
        "Basic programming familiarity in Python or another high-level language",
        "Fundamental understanding of data structures (arrays, hash maps)"
      ],
      "vi": [
        "Kiến thức lập trình cơ bản với Python hoặc một ngôn ngữ bậc cao khác",
        "Hiểu biết cơ bản về cấu trúc dữ liệu (mảng, bảng băm)"
      ]
    },
    "outcomes": {
      "en": [
        "Understand the 4-stage CPython compilation and stack execution pipeline",
        "Master the Python reference model, mutability nuances, and copy depths",
        "Design robust APIs using LEGB scoping, keyword-only parameters, and closures",
        "Harness advanced dunders, descriptors, and slots for memory optimization",
        "Architect concurrent applications choosing between threads, multiprocessing, and asyncio",
        "Write enterprise-grade typed codebases using structural subtyping and protocols"
      ],
      "vi": [
        "Hiểu sâu quy trình 4 giai đoạn biên dịch và thực thi trên stack của máy ảo CPython",
        "Làm chủ mô hình tham chiếu bộ nhớ, tính khả biến và các cấp độ sao chép",
        "Thiết kế API chuẩn mực với quy tắc LEGB, tham số keyword-only và closure",
        "Tận dụng dunder methods, descriptors và __slots__ để tối ưu hóa bộ nhớ RAM",
        "Xây dựng ứng dụng đồng thời với lựa chọn chính xác giữa threading, multiprocessing và asyncio",
        "Viết mã nguồn chuẩn doanh nghiệp với gợi ý kiểu hiện đại và duck typing cấu trúc"
      ]
    },
    "parts": [
      {
        "partNumber": 1,
        "title": {
          "en": "Python Execution & Object Model",
          "vi": "Mô Hình Thực Thi & Đối Tượng Python"
        },
        "description": {
          "en": "CPython parser, bytecode compilation, execution stack frames, and the names-as-labels reference model.",
          "vi": "Parser CPython, biên dịch bytecode, ngăn xếp frame thực thi và mô hình biến là nhãn tham chiếu."
        },
        "chapters": [
          {
            "id": "py-hb-ch-1",
            "number": 1,
            "partNumber": 1,
            "partTitle": {
              "en": "Python Execution & Object Model",
              "vi": "Mô Hình Thực Thi & Đối Tượng Python"
            },
            "slug": "python-execution-model",
            "title": {
              "en": "The Python Execution Model & Bytecode",
              "vi": "Mô Hình Thực Thi Python & Bytecode"
            },
            "summary": {
              "en": "CPython virtual machine architecture, lexical analysis, AST parsing, bytecode compilation, and the frame evaluation loop.",
              "vi": "Kiến trúc máy ảo CPython, phân tích từ vựng, cây cú pháp AST, biên dịch bytecode và vòng lặp đánh giá khung thực thi."
            },
            "readTimeMinutes": 18,
            "sections": [
              {
                "id": "py-hb-1-1",
                "title": {
                  "en": "Source Code to AST Parsing Pipeline",
                  "vi": "Quy Trình Phân Tích Từ Mã Nguồn Đến AST"
                },
                "content": {
                  "en": "Python source code (`.py`) is not executed line-by-line as raw text. The CPython runtime translates source text through a deterministic compiler front-end: 1) The **Tokenizer** splits raw source bytes into semantic tokens (keywords, identifiers, literals, indentation markers). 2) The **Parser** (PEG-based since Python 3.9) validates syntax against the language grammar and builds an in-memory **Abstract Syntax Tree (AST)**. Understanding the AST allows developers to write static analysis linters, code rewrite transformers, and security scanners via the built-in `ast` module.",
                  "vi": "Mã nguồn Python (`.py`) không được thực thi từng dòng chữ thô như nhiều người lầm tưởng. CPython chuyển đổi văn bản nguồn qua một pipeline biên dịch xác định: 1) **Tokenizer** tách các byte mã nguồn thành token ngữ nghĩa (từ khóa, định danh, hằng số, dấu thụt lề). 2) **Parser** (dựa trên thuật toán PEG từ Python 3.9) kiểm tra cú pháp và tạo **Cây Cú Pháp Trừu Tượng (AST)**. Nắm vững AST giúp lập trình viên tự viết các công cụ linter, công cụ biến đổi mã nguồn và quét bảo mật thông qua mô-đun `ast` tích hợp sẵn."
                },
                "keyIdea": {
                  "en": "Python parses source code into an Abstract Syntax Tree (AST) before generating bytecode. Syntax errors occur during parse-time, before any code executes.",
                  "vi": "Python phân tích cú pháp mã nguồn thành Cây AST trước khi sinh bytecode. Lỗi cú pháp (SyntaxError) phát sinh lúc parse, trước khi bất kỳ dòng lệnh nào được chạy."
                },
                "diagram": {
                  "title": {
                    "en": "CPython 4-Stage Execution Pipeline",
                    "vi": "Quy Trình 4 Giai Đoạn Thực Thi Của CPython"
                  },
                  "steps": [
                    {
                      "number": 1,
                      "label": {
                        "en": "Lexical Tokenizing",
                        "vi": "Tách Token Từ Vựng"
                      },
                      "description": {
                        "en": "Source text is split into tokens (INDENT, DEDENT, NAME, NUMBER, OP).",
                        "vi": "Văn bản nguồn được tách thành các token (INDENT, DEDENT, NAME, NUMBER, OP)."
                      }
                    },
                    {
                      "number": 2,
                      "label": {
                        "en": "PEG Parsing to AST",
                        "vi": "Phân Tích Cú Pháp Thành AST"
                      },
                      "description": {
                        "en": "Grammar rules build an in-memory Abstract Syntax Tree representation.",
                        "vi": "Bộ quy tắc ngữ pháp dựng cây cú pháp trừu tượng AST trên bộ nhớ."
                      }
                    },
                    {
                      "number": 3,
                      "label": {
                        "en": "Bytecode Compilation",
                        "vi": "Biên Dịch Ra Bytecode"
                      },
                      "description": {
                        "en": "AST is emitted into PyCodeObject structures containing opcodes (.pyc).",
                        "vi": "AST được biên dịch thành cấu trúc PyCodeObject chứa các opcode (.pyc)."
                      }
                    },
                    {
                      "number": 4,
                      "label": {
                        "en": "ceval.c VM Evaluation",
                        "vi": "Vòng Lặp Máy Ảo ceval.c"
                      },
                      "description": {
                        "en": "Stack-based virtual machine evaluates opcodes using CPU register frames.",
                        "vi": "Máy ảo dựa trên stack thực thi tuần tự các opcode trong khung frame."
                      }
                    }
                  ]
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "ast_inspection.py",
                  "code": "import ast\n\nsource_code = \"\"\"\ndef calculate_tax(amount: float, rate: float = 0.08) -> float:\n    return amount * (1.0 + rate)\n\"\"\"\n\n# Parse source code into an Abstract Syntax Tree\ntree = ast.parse(source_code)\n\n# Dump human-readable AST representation\nprint(ast.dump(tree, indent=2))",
                  "explanation": {
                    "en": "`ast.parse()` transforms Python source into typed AST nodes (FunctionDef, Return, BinOp, Mult), showing the compiler structure before bytecode emission.",
                    "vi": "`ast.parse()` biến mã nguồn thành các node cây AST (FunctionDef, Return, BinOp, Mult), thể hiện cấu trúc trước khi sinh ra mã bytecode."
                  }
                },
                "keyTakeaways": {
                  "en": [
                    "Python uses a modern PEG parser to construct an Abstract Syntax Tree (AST)",
                    "Syntax errors are caught during AST generation before any code runs",
                    "The `ast` module enables meta-programming, security auditing, and static analysis"
                  ],
                  "vi": [
                    "Python dùng bộ phân tích PEG hiện đại để dựng Cây Cú Pháp Trừu Tượng (AST)",
                    "Lỗi cú pháp được phát hiện ở bước sinh AST trước khi code bắt đầu thực thi",
                    "Mô-đun `ast` cho phép lập trình meta, kiểm toán bảo mật và phân tích mã tĩnh"
                  ]
                }
              },
              {
                "id": "py-hb-1-2",
                "title": {
                  "en": "Bytecode Compilation & Code Objects",
                  "vi": "Biên Dịch Bytecode & Đối Tượng Code Object"
                },
                "content": {
                  "en": "Once the AST is validated, the CPython compiler produces a **`PyCodeObject`**. A code object contains immutable bytecode instructions (opcodes), variable names, constant pools, and line number mappings. When a module is imported, CPython writes this compiled code object to a `.pyc` file inside the `__pycache__` directory. If the source file timestamp is unmodified, subsequent runs bypass parsing and compilation entirely, loading the pre-compiled `.pyc` bytecode directly into memory for fast startup.",
                  "vi": "Khi cây AST hợp lệ, trình biên dịch CPython sinh ra đối tượng **`PyCodeObject`**. Một code object chứa tập chỉ thị bytecode bất biến (các opcode), danh sách tên biến, hằng số và bảng ánh xạ số dòng. Khi một module được import, CPython ghi đối tượng này thành file `.pyc` trong thư mục `__pycache__`. Nếu thời gian sửa đổi của file gốc không đổi, các lần chạy sau sẽ bỏ qua bước phân tích và nạp trực tiếp `.pyc` vào bộ nhớ để khởi động nhanh."
                },
                "keyIdea": {
                  "en": "Bytecode is platform-independent intermediate machine code executed by CPython. It is cached in `__pycache__/*.pyc` to eliminate re-compilation overhead.",
                  "vi": "Bytecode là mã máy trung gian độc lập nền tảng được máy ảo CPython thực thi. Nó được lưu đệm trong `__pycache__/*.pyc` để tránh biên dịch lại."
                },
                "comparisonTable": {
                  "headers": [
                    {
                      "en": "Execution Model",
                      "vi": "Mô Hình Thực Thi"
                    },
                    {
                      "en": "Compilation Step",
                      "vi": "Bước Biên Dịch"
                    },
                    {
                      "en": "Runtime Target",
                      "vi": "Đối Tượng Runtime"
                    },
                    {
                      "en": "Performance Trade-off",
                      "vi": "Đánh Đổi Hiệu Năng"
                    }
                  ],
                  "rows": [
                    {
                      "en": [
                        "CPython (Standard)",
                        "Source -> Bytecode (.pyc)",
                        "Stack-based C Virtual Machine",
                        "Fast startup, moderate loop throughput"
                      ],
                      "vi": [
                        "CPython (Chuẩn)",
                        "Source -> Bytecode (.pyc)",
                        "Máy ảo C dựa trên Stack",
                        "Khởi động nhanh, thông lượng vòng lặp trung bình"
                      ]
                    },
                    {
                      "en": [
                        "PyPy (JIT)",
                        "Source -> Bytecode -> Native Machine Code",
                        "Tracing Just-In-Time Compiler",
                        "Slower warmup, up to 4x faster execution for pure Python"
                      ],
                      "vi": [
                        "PyPy (JIT)",
                        "Source -> Bytecode -> Native Code",
                        "Trình biên dịch Tracing JIT",
                        "Khởi động chậm hơn, tốc độ chạy nhanh gấp 4 lần"
                      ]
                    },
                    {
                      "en": [
                        "Cython / C Extensions",
                        "Python/C -> C Source -> Shared Object (.so)",
                        "Direct Native Hardware CPU",
                        "Maximum bare-metal throughput, requires C compilation"
                      ],
                      "vi": [
                        "Cython / C Extension",
                        "Python/C -> C Source -> .so / .pyd",
                        "Phần cứng CPU trực tiếp",
                        "Tốc độ tối đa bare-metal, cần công cụ biên dịch C"
                      ]
                    }
                  ]
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "inspect_code_object.py",
                  "code": "def process_transaction(account_id: str, amount: float) -> str:\n    fee = 1.50\n    final_amount = amount + fee\n    return f\"Account {account_id}: Total ${final_amount:.2f}\"\n\ncode = process_transaction.__code__\n\nprint(\"Bytecode instructions (raw bytes):\", code.co_code[:12])\nprint(\"Constants pool (co_consts):\", code.co_consts)\nprint(\"Variable names (co_varnames):\", code.co_varnames)\nprint(\"Argument count (co_argcount):\", code.co_argcount)",
                  "explanation": {
                    "en": "`__code__` exposes the underlying `PyCodeObject` structure, including `co_varnames` (local variables) and `co_consts` (literal constants).",
                    "vi": "`__code__` cho phép xem cấu trúc `PyCodeObject`, gồm `co_varnames` (biến cục bộ) và `co_consts` (hằng số cố định)."
                  }
                }
              },
              {
                "id": "py-hb-1-3",
                "title": {
                  "en": "CPython Virtual Machine & Frame Stack",
                  "vi": "Máy Ảo CPython & Ngăn Xếp Frame"
                },
                "content": {
                  "en": "The CPython virtual machine is a **stack-based interpreter**. Every function invocation creates an execution **Frame (`PyFrameObject`)** on the runtime call stack. Each frame manages three key memory segments: 1) The **Value Stack** where intermediate operands are pushed and popped, 2) The **Fast Locals array** indexed by integers for `LOAD_FAST` variable reads, and 3) The **Block Stack** for exception handling and loop context. The core evaluation loop in `Python/ceval.c` iterates through opcodes, reading from and writing to these stacks.",
                  "vi": "Máy ảo CPython là một **trình thông dịch dựa trên ngăn xếp (stack-based interpreter)**. Mỗi khi một hàm được gọi, một **Khung Thực Thi (`PyFrameObject`)** được tạo trên call stack của runtime. Mỗi frame quản lý 3 vùng bộ nhớ chính: 1) **Value Stack** chứa các toán hạng được đẩy vào/lấy ra khi tính toán, 2) Mảng **Fast Locals** được đánh chỉ số nguyên giúp lệnh `LOAD_FAST` đọc biến cực nhanh, và 3) **Block Stack** quản lý ngữ cảnh bắt lỗi và vòng lặp. Vòng lặp trung tâm trong file C `Python/ceval.c` duyệt qua từng opcode để thực thi."
                },
                "deepDive": {
                  "badge": {
                    "en": "CPython Internals",
                    "vi": "Bản Chất CPython"
                  },
                  "title": {
                    "en": "Why LOAD_FAST is dramatically faster than LOAD_GLOBAL",
                    "vi": "Tại sao lệnh LOAD_FAST nhanh hơn nhiều so với LOAD_GLOBAL"
                  },
                  "content": {
                    "en": "When a function accesses a local variable, CPython generates `LOAD_FAST index`. This accesses an array offset in C with `O(1)` pointer indexing. In contrast, accessing a global or built-in variable triggers `LOAD_GLOBAL`, which performs hash table dictionary lookups across `f_globals` and `f_builtins`. Inside tight computation loops, caching a global function or math constant in a local parameter provides measurable performance speedups.",
                    "vi": "Khi truy cập biến cục bộ trong hàm, CPython dùng chỉ thị `LOAD_FAST index`. Lệnh này đọc trực tiếp vị trí phần tử trong mảng C với độ phức tạp `O(1)`. Ngược lại, truy cập biến toàn cục kích hoạt `LOAD_GLOBAL`, phải tìm kiếm qua dictionary băm trong `f_globals` và `f_builtins`. Trong các vòng lặp tính toán nặng, việc gán hàm global vào biến local giúp tăng tốc độ rõ rệt."
                  },
                  "codeBlock": {
                    "language": "python",
                    "filename": "fast_locals_demo.py",
                    "code": "import math\nimport time\n\n# Unoptimized: LOAD_GLOBAL on math.sqrt in every iteration\ndef compute_slow(numbers: list[float]) -> list[float]:\n    return [math.sqrt(x) for x in numbers]\n\n# Optimized: Local parameter binding transforms LOAD_GLOBAL into LOAD_FAST\ndef compute_fast(numbers: list[float], _sqrt=math.sqrt) -> list[float]:\n    return [_sqrt(x) for x in numbers]",
                    "explanation": {
                      "en": "Passing `math.sqrt` as a default parameter `_sqrt` binds it to the function locals array, allowing CPython to use `LOAD_FAST` instead of resolving `math` and `sqrt` via dictionary lookups on every loop pass.",
                      "vi": "Truyền `math.sqrt` làm tham số mặc định `_sqrt` giúp gắn nó vào mảng biến cục bộ, giúp CPython dùng `LOAD_FAST` thay vì phải tra cứu dictionary mỗi lần lặp."
                    }
                  }
                }
              },
              {
                "id": "py-hb-1-4",
                "title": {
                  "en": "Disassembling & Inspecting Bytecode with dis",
                  "vi": "Duyệt & Kiểm Tra Bytecode Lúc Chạy Với Mô-đun dis"
                },
                "content": {
                  "en": "The standard library module `dis` is the definitive diagnostic tool for disassembling Python functions and code objects into human-readable bytecode instructions. Reading disassembled output demystifies how Python operators translate into VM actions: additions become `BINARY_OP`, dictionary lookups become `BINARY_SUBSCR`, and method calls trigger `CALL` opcodes (or `PRECALL`/`CALL` in Python 3.11+).",
                  "vi": "Mô-đun `dis` trong thư viện chuẩn là công cụ chẩn đoán đắc lực để dịch ngược hàm và code object Python thành danh sách các opcode dễ đọc. Đọc bytecode giúp bạn hiểu rõ cách toán tử hoạt động: phép cộng thành `BINARY_OP`, truy cập key dict thành `BINARY_SUBSCR` và gọi phương thức thành chỉ thị `CALL`."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "disassemble_example.py",
                  "code": "import dis\n\ndef add_elements(a: int, b: int) -> int:\n    result = a + b\n    return result\n\nprint(\"=== Bytecode Disassembly ===\")\ndis.dis(add_elements)",
                  "explanation": {
                    "en": "Output displays instruction offsets, line numbers, opcodes (`LOAD_FAST`, `BINARY_OP`, `STORE_FAST`, `RETURN_VALUE`), and arguments.",
                    "vi": "Kết quả hiển thị vị trí offset, số dòng nguồn, tên opcode (`LOAD_FAST`, `BINARY_OP`, `STORE_FAST`, `RETURN_VALUE`) và tham số đi kèm."
                  }
                },
                "bestPractices": {
                  "en": [
                    "Use `dis.dis()` to verify optimization hypotheses before writing complex micro-optimizations",
                    "Avoid modifying bytecode at runtime; treat code objects as read-only invariants",
                    "Leverage Python 3.11+ specializing adaptive interpreter for automatic runtime opcode optimization"
                  ],
                  "vi": [
                    "Sử dụng `dis.dis()` để kiểm chứng giả thuyết hiệu năng trước khi tối ưu hóa vi mô",
                    "Không nên chỉnh sửa bytecode lúc runtime; hãy coi code object là bất biến",
                    "Tận dụng trình thông dịch thích ứng (Specializing Adaptive Interpreter) từ Python 3.11+ để tự động tối ưu hóa opcode"
                  ]
                }
              }
            ],
            "chapterSummary": {
              "mentalModels": {
                "en": [
                  "Python compiles to bytecode first; it never interprets raw source text directly",
                  "CPython is a stack-based virtual machine operating on execution frames (PyFrameObject)",
                  "Local variables live in an indexed array accessed via O(1) LOAD_FAST instructions"
                ],
                "vi": [
                  "Python luôn biên dịch sang bytecode trước; không bao giờ đọc chuỗi text thô lúc chạy",
                  "CPython là máy ảo dựa trên stack thao tác qua các khung thực thi (PyFrameObject)",
                  "Biến cục bộ nằm trong mảng đánh chỉ số, truy xuất O(1) qua chỉ thị LOAD_FAST"
                ]
              },
              "rules": {
                "en": [
                  "Syntax errors occur at AST parse time before any bytecode is executed",
                  "Imported modules write pre-compiled .pyc files to __pycache__ for fast subsequent startup",
                  "Prefer local variables over global lookups inside high-frequency performance loops"
                ],
                "vi": [
                  "Lỗi cú pháp SyntaxError xuất hiện ở bước dựng AST trước khi bất kỳ dòng mã nào chạy",
                  "Các module đã import sẽ lưu bytecode .pyc vào __pycache__ để khởi động nhanh lần sau",
                  "Ưu tiên dùng biến cục bộ thay vì biến toàn cục trong các vòng lặp cần hiệu năng cao"
                ]
              },
              "commonTraps": {
                "en": [
                  "Assuming Python is purely interpreted line-by-line without an upfront compilation phase",
                  "Relying on globals inside critical loops causing repeated LOAD_GLOBAL dictionary lookups"
                ],
                "vi": [
                  "Lầm tưởng Python là ngôn ngữ thông dịch đọc từng dòng mà không qua biên dịch trước",
                  "Lạm dụng biến toàn cục trong vòng lặp gây tốn chi phí tra cứu dictionary liên tục"
                ]
              },
              "takeaway": {
                "en": "CPython combines an AST compiler front-end with a fast stack-based evaluation virtual machine. Understanding bytecode and frame storage equips developers to write mechanically sympathetic, high-performance Python.",
                "vi": "CPython kết hợp trình biên dịch AST ở đầu vào với máy ảo thông dịch dựa trên stack. Việc hiểu sâu bytecode và bộ nhớ frame giúp lập trình viên viết code Python tối ưu và chuẩn xác."
              }
            },
            "selfReview": [
              {
                "question": {
                  "en": "Why does Python raise a SyntaxError immediately without executing prior valid print statements?",
                  "vi": "Tại sao Python báo lỗi SyntaxError ngay lập tức mà không chạy các lệnh print hợp lệ đứng trước?"
                },
                "hint": {
                  "en": "Consider the distinction between parse time and execution time in the CPython pipeline.",
                  "vi": "Hãy nghĩ về sự khác biệt giữa thời điểm phân tích cú pháp (parse time) và thời điểm thực thi (runtime)."
                },
                "answer": {
                  "en": "Before CPython executes any instruction, it passes the entire file through the Lexer and PEG Parser to construct an Abstract Syntax Tree (AST). If any syntax violation is detected anywhere in the file, AST creation aborts with a SyntaxError, and zero bytecode is emitted or executed.",
                  "vi": "Trước khi CPython chạy bất kỳ chỉ thị nào, nó phải nạp toàn bộ file qua bộ tách Token và Parser PEG để dựng cây AST. Nếu có bất kỳ lỗi cú pháp nào trong file, quá trình dựng AST bị hủy ngay lập tức và không có mã bytecode nào được sinh ra hay thực thi."
                }
              },
              {
                "question": {
                  "en": "What is stored inside a .pyc file in the __pycache__ directory?",
                  "vi": "Bên trong file .pyc nằm trong thư mục __pycache__ chứa những gì?"
                },
                "hint": {
                  "en": "It contains a serialized data structure along with metadata headers.",
                  "vi": "Nó chứa một cấu trúc dữ liệu đã được tuần tự hóa (marshal) cùng các header siêu dữ liệu."
                },
                "answer": {
                  "en": "A `.pyc` file contains a 16-byte header (magic number representing Python version, bit flags, source file modification timestamp, and source size) followed by the marshaled `PyCodeObject` structure containing compiled bytecode, constants pool, and variable names.",
                  "vi": "File `.pyc` chứa 16-byte header (magic number xác định phiên bản Python, cờ hiệu, timestamp ngày sửa file gốc và dung lượng file) tiếp theo là đối tượng `PyCodeObject` đã được marshal chứa bytecode, mảng hằng số và danh sách biến."
                }
              },
              {
                "question": {
                  "en": "Why is accessing a local variable with LOAD_FAST faster than accessing a global with LOAD_GLOBAL?",
                  "vi": "Tại sao truy cập biến cục bộ bằng LOAD_FAST lại nhanh hơn biến toàn cục LOAD_GLOBAL?"
                },
                "hint": {
                  "en": "Think about C pointer array indexing versus hash table dictionary lookups.",
                  "vi": "Hãy so sánh giữa việc truy cập mảng con trỏ C bằng chỉ số nguyên với việc tra cứu bảng băm dictionary."
                },
                "answer": {
                  "en": "`LOAD_FAST` uses a static integer index to retrieve the object pointer directly from the execution frame C array in `O(1)` time without string hashing. In contrast, `LOAD_GLOBAL` must perform string hash calculations and search up to two dictionaries (`f_globals` and `f_builtins`).",
                  "vi": "`LOAD_FAST` dùng chỉ số nguyên tĩnh để lấy trực tiếp con trỏ đối tượng từ mảng C trong frame với thời gian `O(1)` mà không cần băm chuỗi. Ngược lại, `LOAD_GLOBAL` phải tính mã băm tên biến và tra cứu qua 2 dictionary (`f_globals` và `f_builtins`)."
                }
              }
            ]
          },
          {
            "id": "py-hb-ch-2",
            "number": 2,
            "partNumber": 1,
            "partTitle": {
              "en": "Python Execution & Object Model",
              "vi": "Mô Hình Thực Thi & Đối Tượng Python"
            },
            "slug": "names-objects-mutability",
            "title": {
              "en": "Names, Objects, Identity & Mutability",
              "vi": "Tên, Đối Tượng, Định Danh & Tính Khả Biến"
            },
            "summary": {
              "en": "Variables as memory labels, value equality versus identity, mutable vs immutable internals, shallow copies, deep copies, and default argument traps.",
              "vi": "Bản chất biến là nhãn dán bộ nhớ, so sánh giá trị so với định danh, đối tượng khả biến và bất biến, sao chép nông, sao chép sâu và bẫy tham số mặc định."
            },
            "readTimeMinutes": 20,
            "sections": [
              {
                "id": "py-hb-2-1",
                "title": {
                  "en": "The \"Names as Labels\" Mental Model",
                  "vi": "Mô Hình Tâm Trí: \"Biến Là Nhãn Dán Bộ Nhớ\""
                },
                "content": {
                  "en": "In languages like C or C++, a variable represents a named memory box that physically holds a value. In Python, **variables are NOT boxes**. Variables are named references (sticky labels) bound to objects residing in heap memory. When you execute `a = [1, 2, 3]`, Python creates a list object in heap memory and attaches the label `a` to it. Executing `b = a` attaches a second label `b` to the **exact same list object**. Every object possesses three fundamental properties: 1) **Identity** (`id()`), 2) **Type** (`type()`), and 3) **Value**.",
                  "vi": "Trong các ngôn ngữ như C hay C++, biến là một chiếc hộp bộ nhớ vật lý chứa giá trị bên trong. Trong Python, **biến KHÔNG PHẢI là những chiếc hộp**. Bản chất biến là các nhãn tên (references) được gắn vào các đối tượng nằm trong bộ nhớ heap. Khi bạn viết `a = [1, 2, 3]`, Python tạo một đối tượng list trên heap rồi dán nhãn `a` vào đó. Khi viết `b = a`, Python dán thêm nhãn `b` vào **cùng đối tượng list đó**. Mọi đối tượng trong Python đều có 3 thuộc tính cốt lõi: 1) **Định danh** (`id()`), 2) **Kiểu dữ liệu** (`type()`), và 3) **Giá trị**."
                },
                "keyIdea": {
                  "en": "Python variables are named references bound to objects in heap memory. Assignment (`b = a`) shares the object reference; it does not clone data.",
                  "vi": "Biến trong Python là con trỏ tham chiếu gắn vào đối tượng trong heap. Phép gán (`b = a`) chia sẻ tham chiếu đối tượng chứ không nhân bản dữ liệu."
                },
                "diagram": {
                  "title": {
                    "en": "Python Name Binding vs C Box Model",
                    "vi": "Mô Hình Gán Nhãn Python So Với Hộp Bộ Nhớ C"
                  },
                  "steps": [
                    {
                      "number": 1,
                      "label": {
                        "en": "Heap Object Allocation",
                        "vi": "Cấp Phát Đối Tượng Trên Heap"
                      },
                      "description": {
                        "en": "Python allocates PyObject structure (ob_refcnt, ob_type, ob_val) in heap.",
                        "vi": "Python cấp phát cấu trúc PyObject (ob_refcnt, ob_type, ob_val) trên bộ nhớ heap."
                      }
                    },
                    {
                      "number": 2,
                      "label": {
                        "en": "Name Binding (a = obj)",
                        "vi": "Gán Nhãn Tên (a = obj)"
                      },
                      "description": {
                        "en": "Namespace dictionary maps string key \"a\" to target heap object memory pointer.",
                        "vi": "Dictionary namespace ánh xạ chuỗi \"a\" tới con trỏ đối tượng trên heap."
                      }
                    },
                    {
                      "number": 3,
                      "label": {
                        "en": "Aliased Reference (b = a)",
                        "vi": "Tham Chiếu Bí Danh (b = a)"
                      },
                      "description": {
                        "en": "Label \"b\" is bound to the identical pointer. Reference count increments.",
                        "vi": "Nhãn \"b\" được gắn vào cùng con trỏ đối tượng. Bộ đếm tham chiếu tăng lên."
                      }
                    }
                  ]
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "object_identity.py",
                  "code": "a = [10, 20, 30]\nb = a  # Both labels point to the same memory object\n\nprint(\"Address of a:\", hex(id(a)))\nprint(\"Address of b:\", hex(id(b)))\nprint(\"Are they identical (is)?\", a is b)  # True\n\n# Mutating via label 'b' reflects in 'a'\nb.append(99)\nprint(\"State of a:\", a)  # [10, 20, 30, 99]",
                  "explanation": {
                    "en": "`id()` returns the object memory address in CPython. `is` checks memory address equivalence, proving `a` and `b` reference the same memory allocation.",
                    "vi": "`id()` trả về địa chỉ bộ nhớ trong CPython. Toán tử `is` kiểm tra trùng khớp địa chỉ bộ nhớ, chứng minh `a` và `b` cùng trỏ vào một vùng nhớ."
                  }
                }
              },
              {
                "id": "py-hb-2-2",
                "title": {
                  "en": "Value Equality (==) vs. Object Identity (is)",
                  "vi": "So Sánh Giá Trị (==) vs. Định Danh Đối Tượng (is)"
                },
                "content": {
                  "en": "A core pillar of Python mastery is distinguishing between **Value Equality** (`==`) and **Identity** (`is`): 1) `a == b` invokes the `__eq__` magic method to evaluate whether two objects contain equivalent values. 2) `a is b` compares raw memory addresses (`id(a) == id(b)`), checking if both variables point to the exact same object in heap memory. Python interns small integers (`-5` to `256`) and short string identifiers in memory pools, but relying on `is` for value comparisons is a critical defect.",
                  "vi": "Một nguyên lý cốt lõi cần phân biệt rõ trong Python là **So sánh giá trị** (`==`) và **So sánh định danh** (`is`): 1) `a == b` gọi phương thức `__eq__` để kiểm tra hai đối tượng có giá trị tương đương nhau hay không. 2) `a is b` so sánh trực tiếp địa chỉ bộ nhớ (`id(a) == id(b)`), xác định xem hai biến có cùng trỏ tới một đối tượng trên heap hay không. CPython có cơ chế intern các số nguyên nhỏ (`-5` đến `256`) và chuỗi ngắn, nhưng lạm dụng `is` để so sánh giá trị là một lỗi nguy hiểm."
                },
                "comparisonTable": {
                  "headers": [
                    {
                      "en": "Comparison",
                      "vi": "Toán Tử"
                    },
                    {
                      "en": "Underlying Mechanism",
                      "vi": "Bản Chất Dưới Máy"
                    },
                    {
                      "en": "Correct Use Case",
                      "vi": "Trường Hợp Dùng Đúng"
                    },
                    {
                      "en": "Anti-Pattern Risk",
                      "vi": "Rủi Ro Anti-Pattern"
                    }
                  ],
                  "rows": [
                    {
                      "en": [
                        "a == b (Equality)",
                        "Invokes a.__eq__(b)",
                        "Comparing contents of strings, numbers, dicts, lists",
                        "Comparing with singleton `None`"
                      ],
                      "vi": [
                        "a == b (Giá Trị)",
                        "Gọi phương thức a.__eq__(b)",
                        "So sánh nội dung chuỗi, số học, dict, list",
                        "So sánh với singleton `None`"
                      ]
                    },
                    {
                      "en": [
                        "a is b (Identity)",
                        "Compares memory pointers id(a) == id(b)",
                        "Checking singletons (`None`, `True`, `False`, `Ellipsis`)",
                        "Using for integer/string value comparisons"
                      ],
                      "vi": [
                        "a is b (Định Danh)",
                        "So sánh địa chỉ id(a) == id(b)",
                        "Kiểm tra biến singleton (`None`, `True`, `False`)",
                        "Dùng so sánh giá trị số hoặc chuỗi"
                      ]
                    }
                  ]
                },
                "commonMistakes": [
                  {
                    "mistake": {
                      "en": "Using `is` to check integer or string value equality (e.g., `if count is 1000:`)",
                      "vi": "Dùng toán tử `is` để so sánh số nguyên hoặc chuỗi (ví dụ: `if count is 1000:`)"
                    },
                    "why": {
                      "en": "CPython only interns small integers between -5 and 256. Integers outside this range allocate distinct memory addresses, causing `is` to evaluate to False.",
                      "vi": "CPython chỉ lưu đệm sẵn các số nguyên nhỏ từ -5 đến 256. Các số ngoài khoảng này sẽ cấp phát vùng nhớ riêng, khiến phép so sánh `is` trả về False."
                    },
                    "solution": {
                      "en": "Always use `==` for values; restrict `is` exclusively to singletons like `None`.",
                      "vi": "Luôn dùng `==` khi so sánh giá trị; chỉ dùng `is` cho các đối tượng singleton như `None`."
                    },
                    "codeIncorrect": "status_code = 500\nif status_code is 500:  # Unreliable across interpreters!\n    handle_error()",
                    "codeCorrect": "status_code = 500\nif status_code == 500:  # Robust value equality\n    handle_error()\n\nif user_input is None:  # Correct identity check for singleton\n    handle_empty()"
                  }
                ]
              },
              {
                "id": "py-hb-2-3",
                "title": {
                  "en": "Mutability, Immutability & Re-binding",
                  "vi": "Tính Khả Biến, Bất Biến & Cơ Chế Gán Lại"
                },
                "content": {
                  "en": "Python types are strictly divided into **Immutable** (numbers, `str`, `tuple`, `frozenset`, `bytes`) and **Mutable** (`list`, `dict`, `set`, `bytearray`, custom class instances). When modifying an immutable object (e.g. `s += \"!\"`), Python does not change the bytes in place; it allocates an entirely new object and re-binds the variable label. For mutable objects, in-place methods (`list.append()`, `dict.update()`) alter internal state without modifying the memory address.",
                  "vi": "Kiểu dữ liệu trong Python chia làm 2 nhóm rõ rệt: **Bất biến (Immutable)** (`int`, `float`, `str`, `tuple`, `frozenset`, `bytes`) và **Khả biến (Mutable)** (`list`, `dict`, `set`, `bytearray`, instance class). Khi bạn chỉnh sửa đối tượng bất biến (ví dụ `s += \"!\"`), Python không ghi đè lên bộ nhớ cũ mà cấp phát một đối tượng hoàn toàn mới và gán lại nhãn biến. Với đối tượng khả biến, các phương thức sửa tại chỗ (`append()`, `update()`) thay đổi trực tiếp nội dung mà không đổi địa chỉ id."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "mutability_demo.py",
                  "code": "# 1. Immutable Re-binding\nnum = 42\ninitial_id = id(num)\nnum += 1  # Allocates a new int object 43\nprint(\"Int re-bound to new object:\", id(num) != initial_id)  # True\n\n# 2. In-Place Mutable Modification\ndata = [1, 2]\ninitial_list_id = id(data)\ndata.append(3)  # Modifies internal memory buffer in-place\nprint(\"List ID preserved:\", id(data) == initial_list_id)  # True\n\n# 3. Edge Case: Immutable tuple containing a mutable list\ncontainer = (1, [10, 20])\ncontainer[1].append(30)  # Mutates inner list without changing tuple container identity\nprint(\"Mutated inner tuple contents:\", container)  # (1, [10, 20, 30])",
                  "explanation": {
                    "en": "Demonstrates how immutability protects container references, while inner mutable elements remain modifiable in-place.",
                    "vi": "Minh họa cách tính bất biến bảo vệ tham chiếu của tuple, trong khi các phần tử khả biến bên trong vẫn có thể bị thay đổi."
                  }
                }
              },
              {
                "id": "py-hb-2-4",
                "title": {
                  "en": "Shallow Copies vs. Deep Copies",
                  "vi": "Bản Sao Nông (Shallow Copy) vs. Bản Sao Sâu (Deep Copy)"
                },
                "content": {
                  "en": "When duplicating data structures, developers must choose the correct copy depth: 1) **Shallow Copy** (`list.copy()`, `dict.copy()`, `copy.copy()`, or slicing `data[:]`) creates a new outer container but populates it with references to the original inner objects. 2) **Deep Copy** (`copy.deepcopy()`) recursively traverses nested objects and constructs independent copies of every mutable child object, preventing accidental cross-talk side effects.",
                  "vi": "Khi cần sao chép dữ liệu, lập trình viên cần chọn đúng độ sâu sao chép: 1) **Bản sao nông (Shallow Copy)** (`list.copy()`, `dict.copy()`, `copy.copy()` hoặc lát cắt `data[:]`) tạo một container ngoài mới nhưng giữ nguyên tham chiếu tới các đối tượng con bên trong. 2) **Bản sao sâu (Deep Copy)** (`copy.deepcopy()`) duyệt đệ quy qua toàn bộ cấu trúc lồng nhau và nhân bản độc lập từng phần tử con, loại bỏ hoàn toàn nguy cơ biến này làm đổi dữ liệu biến kia."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "copy_mechanics.py",
                  "code": "import copy\n\noriginal = {\"user\": \"Alice\", \"preferences\": {\"theme\": \"dark\", \"fontSize\": 14}}\n\n# Shallow Copy: Outer dict is new, inner dict is SHARED\nshallow = original.copy()\nshallow[\"preferences\"][\"theme\"] = \"light\"\nprint(\"Original mutated by shallow copy!\", original[\"preferences\"][\"theme\"])  # light\n\n# Deep Copy: Full recursive clone\ndeep = copy.deepcopy(original)\ndeep[\"preferences\"][\"theme\"] = \"sepia\"\nprint(\"Original preserved after deep copy:\", original[\"preferences\"][\"theme\"])  # light",
                  "explanation": {
                    "en": "Modifying nested mutable dictionaries inside a shallow copy inadvertently mutates the original parent object.",
                    "vi": "Sửa dictionary lồng nhau trong bản sao nông sẽ vô tình làm thay đổi luôn dữ liệu của đối tượng gốc ban đầu."
                  }
                }
              },
              {
                "id": "py-hb-2-5",
                "title": {
                  "en": "The Mutable Default Argument Reference Trap",
                  "vi": "Cạm Bẫy Tham Số Mặc Định Khả Biến Trong Hàm"
                },
                "content": {
                  "en": "One of the most famous traps in Python engineering is using a mutable object (like a `list` or `dict`) as a default parameter in function definitions. In Python, default parameter expressions are evaluated **EXACTLY ONCE when the function definition is executed** (at module load time), NOT each time the function is called. As a result, all invocations that rely on the default argument share the exact same mutable object instance across requests.",
                  "vi": "Một trong những bẫy phổ biến nhất trong Python là dùng đối tượng khả biến (như `list` hoặc `dict`) làm giá trị mặc định cho tham số hàm. Trong Python, biểu thức tham số mặc định được thực thi **ĐÚNG MỘT LẦN khi hàm được định nghĩa** (lúc nạp module), chứ KHÔNG PHẢI mỗi khi hàm được gọi. Kết quả là mọi lần gọi hàm không truyền tham số đều dùng chung một instance đối tượng duy nhất, gây rò rỉ dữ liệu giữa các lần gọi."
                },
                "commonMistakes": [
                  {
                    "mistake": {
                      "en": "Defining `def add_item(item, target_list=[])` with a mutable list default",
                      "vi": "Khai báo `def add_item(item, target_list=[])` với giá trị mặc định là list rỗng"
                    },
                    "why": {
                      "en": "The default list is instantiated once at function definition time. Subsequent calls accumulate mutated items across independent invocations.",
                      "vi": "List mặc định được tạo một lần duy nhất khi hàm định nghĩa. Các lần gọi tiếp theo sẽ dồn dữ liệu của nhau vào chung một list."
                    },
                    "solution": {
                      "en": "Use `None` as the sentinel default value and initialize a fresh list inside the function body.",
                      "vi": "Dùng `None` làm giá trị mặc định và khởi tạo list mới bên trong thân hàm."
                    },
                    "codeIncorrect": "def append_record(record: dict, registry: list = []):\n    registry.append(record)\n    return registry\n\nprint(append_record({\"id\": 1}))  # [{'id': 1}]\nprint(append_record({\"id\": 2}))  # [{'id': 1}, {'id': 2}] -> Bug!",
                    "codeCorrect": "from typing import Optional\n\ndef append_record(record: dict, registry: Optional[list] = None) -> list:\n    if registry is None:\n        registry = []  # Fresh instance per invocation\n    registry.append(record)\n    return registry\n\nprint(append_record({\"id\": 1}))  # [{'id': 1}]\nprint(append_record({\"id\": 2}))  # [{'id': 2}] -> Clean!"
                  }
                ],
                "keyTakeaways": {
                  "en": [
                    "Python variables are named references, not physical storage boxes",
                    "Use `==` for value comparison and `is` strictly for singletons like `None`",
                    "Never use mutable objects as default arguments; use `None` sentinel pattern"
                  ],
                  "vi": [
                    "Biến trong Python là nhãn tham chiếu, không phải hộp chứa vật lý",
                    "Dùng `==` để so sánh giá trị và `is` chỉ dành riêng cho singleton như `None`",
                    "Tuyệt đối không dùng đối tượng khả biến làm tham số mặc định; hãy dùng mẫu `None` sentinel"
                  ]
                }
              }
            ],
            "chapterSummary": {
              "mentalModels": {
                "en": [
                  "Variables are sticky name tags attached to objects residing in heap memory",
                  "Assignment (a = b) creates an alias pointing to the existing memory address",
                  "Default function arguments are evaluated once at module load, not per invocation"
                ],
                "vi": [
                  "Biến là các nhãn tên dán vào đối tượng nằm trong bộ nhớ heap",
                  "Phép gán (a = b) tạo ra bí danh trỏ cùng vào địa chỉ bộ nhớ hiện có",
                  "Tham số mặc định của hàm được tính toán 1 lần lúc nạp module, không phải mỗi lần gọi"
                ]
              },
              "rules": {
                "en": [
                  "Check singletons using `is None` and `is not None`",
                  "Use `copy.deepcopy()` whenever modifying nested mutable collections",
                  "Adopt the sentinel pattern (`arg: Optional[list] = None`) for mutable parameters"
                ],
                "vi": [
                  "Kiểm tra giá trị rỗng bằng `is None` và `is not None`",
                  "Dùng `copy.deepcopy()` khi cần sao chép cấu trúc dữ liệu lồng nhau",
                  "Áp dụng mẫu sentinel (`arg: Optional[list] = None`) cho tham số có thể thay đổi"
                ]
              },
              "commonTraps": {
                "en": [
                  "Relying on integer caching for equality checks using `is`",
                  "Modifying an aliased mutable list expecting the original to stay unchanged",
                  "Accumulating state across requests via mutable default arguments"
                ],
                "vi": [
                  "Dùng toán tử `is` để so sánh số lớn gây lỗi không lường trước",
                  "Sửa đổi list bí danh và mong đợi đối tượng gốc không bị ảnh hưởng",
                  "Lưu dồn trạng thái giữa các request do dùng list/dict làm tham số mặc định"
                ]
              },
              "takeaway": {
                "en": "Mastering Python begins with the reference model: everything is an object, names are labels, and mutability dictates whether mutations propagate through aliased pointers.",
                "vi": "Làm chủ Python bắt đầu từ mô hình tham chiếu: mọi thứ đều là đối tượng, biến là nhãn dán, và tính khả biến quyết định việc thay đổi có lan truyền qua các biến bí danh hay không."
              }
            },
            "selfReview": [
              {
                "question": {
                  "en": "What is the output of `a = [1]; b = a; b += [2]; print(a)` versus `a = (1,); b = a; b += (2,); print(a)`?",
                  "vi": "Kết quả in ra của `a = [1]; b = a; b += [2]; print(a)` và `a = (1,); b = a; b += (2,); print(a)` là gì?"
                },
                "hint": {
                  "en": "Consider the difference in `+=` implementation between mutable lists (`__iadd__`) and immutable tuples.",
                  "vi": "Xem xét cách toán tử `+=` hoạt động trên list khả biến (`__iadd__`) so với tuple bất biến."
                },
                "answer": {
                  "en": "For the list, `a` outputs `[1, 2]` because `list.__iadd__` mutates the list in-place. For the tuple, `a` outputs `(1,)` because tuples are immutable, so `b += (2,)` creates a new tuple and re-binds `b`, leaving `a` referencing the original tuple.",
                  "vi": "Với list, `a` in ra `[1, 2]` vì `list.__iadd__` sửa trực tiếp tại chỗ. Với tuple, `a` in ra `(1,)` vì tuple là bất biến nên `b += (2,)` tạo một tuple mới và gán lại cho `b`, còn `a` vẫn trỏ vào tuple ban đầu."
                }
              },
              {
                "question": {
                  "en": "Why is `x is None` preferred over `x == None`?",
                  "vi": "Tại sao nên dùng `x is None` thay vì `x == None`?"
                },
                "hint": {
                  "en": "Consider custom classes that override the `__eq__` operator.",
                  "vi": "Hãy nghĩ đến trường hợp class tùy chỉnh ghi đè phương thức so sánh `__eq__`."
                },
                "answer": {
                  "en": "`None` is a singleton in Python. `is None` compiles to a fast single pointer comparison opcode (`POP_JUMP_IF_NONE` or `IS_OP`). In contrast, `== None` calls the `__eq__` method, which can be overridden by a custom class to return misleading truthy values.",
                  "vi": "`None` là một singleton duy nhất trong bộ nhớ. `is None` thực thi bằng một lệnh so sánh con trỏ trực tiếp rất nhanh. Ngược lại, `== None` phải gọi phương thức `__eq__`, có thể bị class con ghi đè trả về kết quả sai lệch."
                }
              }
            ]
          },
          {
            "id": "py-hb-ch-3",
            "number": 3,
            "partNumber": 1,
            "partTitle": {
              "en": "Python Execution & Object Model",
              "vi": "Mô Hình Thực Thi & Đối Tượng Python"
            },
            "slug": "modules-packages-imports",
            "title": {
              "en": "Modules, Packages & The Import System",
              "vi": "Modules, Packages & Hệ Thống Import"
            },
            "summary": {
              "en": "Module namespaces, sys.path resolution algorithms, sys.modules caching, PEP 420 namespace packages, and resolving circular import cycles.",
              "vi": "Namespace của module, thuật toán phân giải sys.path, cache sys.modules, namespace packages PEP 420 và xử lý triệt để phụ thuộc vòng circular imports."
            },
            "readTimeMinutes": 16,
            "sections": [
              {
                "id": "py-hb-3-1",
                "title": {
                  "en": "Module Namespaces & Symbol Binding",
                  "vi": "Namespace Của Module & Gán Symbol"
                },
                "content": {
                  "en": "Every Python `.py` file is a self-contained module with its own global namespace (`__dict__`). When Python executes a module, top-level assignments, function definitions, and class statements populate this dictionary. Importing a module does not pollute your local scope with private variables unless explicitly requested. The special variable `__name__` evaluates to `\"__main__\"` when run directly from the command line, enabling the standard `if __name__ == \"__main__\":` entrypoint idiom.",
                  "vi": "Mỗi file `.py` trong Python là một module độc lập sở hữu namespace toàn cục riêng (`__dict__`). Khi Python chạy module, các phép gán cấp cao, định nghĩa hàm và class sẽ nạp vào dictionary này. Việc import một module không làm lẫn lộn phạm vi cục bộ của bạn. Biến đặc biệt `__name__` nhận giá trị `\"__main__\"` khi file được chạy trực tiếp từ dòng lệnh, tạo nên cấu trúc điểm khởi chạy chuẩn `if __name__ == \"__main__\":`."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "module_entrypoint.py",
                  "code": "def initialize_database() -> None:\n    print(\"Database connection pool established.\")\n\ndef run_server() -> None:\n    initialize_database()\n    print(\"API Gateway listening on :8080\")\n\n# Idiomatic Entrypoint Check\nif __name__ == \"__main__\":\n    run_server()",
                  "explanation": {
                    "en": "Allows the script to be executed as a standalone CLI application while remaining safely importable by automated test suites without triggering side effects.",
                    "vi": "Cho phép file vừa chạy được như ứng dụng dòng lệnh độc lập, vừa có thể được import vào các bài test mà không tự động chạy server."
                  }
                }
              },
              {
                "id": "py-hb-3-2",
                "title": {
                  "en": "sys.path Resolution Order & sys.modules Cache",
                  "vi": "Thứ Tự Tìm Kiếm sys.path & Bộ Nhớ Cache sys.modules"
                },
                "content": {
                  "en": "When Python encounters an `import foo` statement, it executes a deterministic 3-step lookup: 1) **Cache Inspection**: It inspects `sys.modules` to check if `foo` is already loaded. If cached, it binds the reference immediately in `O(1)` time. 2) **Path Search**: If not cached, Python searches through directory paths in `sys.path` sequentially (current script directory, `PYTHONPATH` environment paths, and standard library/site-packages). 3) **Execution & Caching**: It compiles source bytecode, creates a new `types.ModuleType` object, executes top-level statements, and records the instance in `sys.modules`.",
                  "vi": "Khi Python gặp câu lệnh `import foo`, nó thực hiện thuật toán tìm kiếm 3 bước xác định: 1) **Kiểm tra cache**: Soi `sys.modules` xem `foo` đã được nạp vào bộ nhớ chưa. Nếu có, nó gán tham chiếu ngay lập tức `O(1)`. 2) **Duyệt đường dẫn**: Nếu chưa có, Python duyệt tuần tự qua các thư mục trong `sys.path` (thư mục chứa file chạy, biến môi trường `PYTHONPATH`, thư viện chuẩn và site-packages). 3) **Thực thi & Lưu cache**: Biên dịch bytecode, tạo đối tượng `types.ModuleType`, chạy các lệnh top-level và lưu vào `sys.modules`."
                },
                "diagram": {
                  "title": {
                    "en": "Python Module Import Lifecycle",
                    "vi": "Vòng Đời Nạp Module Trong Python"
                  },
                  "steps": [
                    {
                      "number": 1,
                      "label": {
                        "en": "Cache Check in sys.modules",
                        "vi": "Kiểm Tra Cache sys.modules"
                      },
                      "description": {
                        "en": "Returns existing module instance immediately if already loaded.",
                        "vi": "Trả về ngay instance module nếu đã từng được import trước đó."
                      }
                    },
                    {
                      "number": 2,
                      "label": {
                        "en": "Finders & Loaders on sys.path",
                        "vi": "Trình Tìm Kiếm Trên sys.path"
                      },
                      "description": {
                        "en": "Iterates sys.meta_path finders to locate source file or C extension.",
                        "vi": "Duyệt các finder để xác định vị trí file .py hoặc C extension."
                      }
                    },
                    {
                      "number": 3,
                      "label": {
                        "en": "Execution & Registration",
                        "vi": "Thực Thi & Đăng Ký Cache"
                      },
                      "description": {
                        "en": "Executes module top-level code and caches result in sys.modules dictionary.",
                        "vi": "Chạy mã cấp cao của module và lưu kết quả vào dictionary sys.modules."
                      }
                    }
                  ]
                }
              },
              {
                "id": "py-hb-3-3",
                "title": {
                  "en": "Packages, __init__.py & PEP 420 Namespace Packages",
                  "vi": "Packages, __init__.py & Namespace Packages PEP 420"
                },
                "content": {
                  "en": "A directory containing an `__init__.py` file is treated as a **Regular Python Package**. The `__init__.py` file initializes the package namespace and defines exported symbols via `__all__ = [\"SymbolA\", \"SymbolB\"]`. Starting with Python 3.3 (PEP 420), directories without `__init__.py` are recognized as **Implicit Namespace Packages**, allowing a single logical package to be split across multiple distinct directory paths or independent wheel distributions.",
                  "vi": "Một thư mục chứa file `__init__.py` được coi là **Package Python Chuẩn**. File `__init__.py` dùng để khởi tạo namespace cho package và quy định các symbol được xuất khẩu thông qua danh sách `__all__ = [\"SymbolA\", \"SymbolB\"]`. Từ Python 3.3 (PEP 420), các thư mục không có `__init__.py` được nhận diện là **Namespace Package Ngầm Định**, cho phép chia nhỏ một package logic trên nhiều thư mục hoặc package wheel độc lập."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "pkg_init_export.py",
                  "code": "# my_package/__init__.py\nfrom .auth import Authenticator\nfrom .client import APIClient\n\n# Explicitly define public API surface for 'from my_package import *'\n__all__ = [\"Authenticator\", \"APIClient\"]\n__version__ = \"2.4.0\"",
                  "explanation": {
                    "en": "`__all__` provides an explicit contract for public exports, shielding internal helper modules from unauthorized imports.",
                    "vi": "`__all__` tạo ra bản hợp đồng rõ ràng cho các API công khai, ẩn đi các module phụ trợ nội bộ."
                  }
                }
              },
              {
                "id": "py-hb-3-4",
                "title": {
                  "en": "Circular Imports: Root Cause & Architectural Remedies",
                  "vi": "Phụ Thuộc Vòng (Circular Imports): Nguyên Nhân & Giải Pháp"
                },
                "content": {
                  "en": "A **Circular Import** occurs when Module A imports Module B at the top-level while Module B simultaneously imports Module A. When Module A is being executed, it halts midway to load Module B. If Module B attempts to access a function or class from Module A that has not yet been executed, Python raises an `AttributeError` or `ImportError: cannot import name`.",
                  "vi": "Lỗi **Phụ thuộc vòng (Circular Import)** xảy ra khi Module A import Module B ở cấp top-level trong khi Module B cũng import Module A. Khi Module A đang chạy dở thì chuyển sang nạp B. Nếu B cố truy cập một hàm hay class của A mà A chưa kịp chạy đến, Python sẽ báo lỗi `AttributeError` hoặc `ImportError: cannot import name`."
                },
                "commonMistakes": [
                  {
                    "mistake": {
                      "en": "Tight top-level coupling between domain models and service layers causing circular imports",
                      "vi": "Ghép nối chặt chẽ cấp top-level giữa tầng model và tầng service gây lỗi import vòng"
                    },
                    "why": {
                      "en": "Modules are executed sequentially from top to bottom. Accessing incomplete module definitions causes runtime lookup failures.",
                      "vi": "Các module được thực thi tuần tự từ trên xuống dưới. Truy cập symbol khi module chưa chạy xong sẽ thất bại."
                    },
                    "solution": {
                      "en": "Refactor shared types into an independent `types.py` module, use `from typing import TYPE_CHECKING` with string annotations, or defer imports inside functions.",
                      "vi": "Tách kiểu dữ liệu chung sang module `types.py` riêng biệt, dùng `if TYPE_CHECKING:` kèm type hints dạng chuỗi hoặc dời import vào trong hàm."
                    },
                    "codeIncorrect": "# models.py\nfrom services import calculate_user_tax # services.py imports User from models!\nclass User:\n    def get_tax(self):\n        return calculate_user_tax(self)",
                    "codeCorrect": "# models.py (Clean architecture using TYPE_CHECKING)\nfrom typing import TYPE_CHECKING\n\nif TYPE_CHECKING:\n    from services import TaxService\n\nclass User:\n    def get_tax(self, service: \"TaxService\") -> float:\n        return service.calculate_tax(self)"
                  }
                ],
                "keyTakeaways": {
                  "en": [
                    "Modules are executed once and cached in `sys.modules`",
                    "`sys.path` determines directory search priority for imports",
                    "Eliminate circular imports by extracting shared contracts and using `TYPE_CHECKING` guards"
                  ],
                  "vi": [
                    "Module chỉ chạy một lần duy nhất và được lưu cache trong `sys.modules`",
                    "`sys.path` quyết định thứ tự ưu tiên tìm kiếm thư mục",
                    "Triệt tiêu circular import bằng cách tách module dùng chung và dùng khối `if TYPE_CHECKING:`"
                  ]
                }
              }
            ],
            "chapterSummary": {
              "mentalModels": {
                "en": [
                  "A module is a runtime singleton object backed by a namespace dictionary",
                  "Import resolution is a cache-first algorithm (sys.modules -> sys.path -> compilation)",
                  "Package hierarchies map filesystem directories to dotted namespace trees"
                ],
                "vi": [
                  "Module là một đối tượng singleton lúc runtime quản lý bởi namespace dictionary",
                  "Quy trình import ưu tiên cache trước (sys.modules -> sys.path -> biên dịch)",
                  "Hệ thống package ánh xạ thư mục ổ đĩa thành cây namespace phân cấp bằng dấu chấm"
                ]
              },
              "rules": {
                "en": [
                  "Use absolute imports for clean, unambiguous package references across large projects",
                  "Guard executable entry points with `if __name__ == \"__main__\":`",
                  "Use `if TYPE_CHECKING:` to break cyclic dependencies required only for static type hints"
                ],
                "vi": [
                  "Sử dụng import tuyệt đối để đường dẫn rõ ràng, tránh nhầm lẫn trong dự án lớn",
                  "Bảo vệ điểm khởi chạy bằng khối `if __name__ == \"__main__\":`",
                  "Dùng `if TYPE_CHECKING:` để giải quyết phụ thuộc vòng chỉ dùng cho gợi ý kiểu tĩnh"
                ]
              },
              "commonTraps": {
                "en": [
                  "Mutating `sys.path` dynamically at runtime rather than configuring proper virtualenvs",
                  "Using wildcard imports (`from module import *`) polluting namespaces with undocumented symbols"
                ],
                "vi": [
                  "Chỉnh sửa `sys.path` tùy tiện lúc runtime thay vì cấu hình môi trường ảo chuẩn",
                  "Dùng import sao (`from module import *`) làm tràn ngập namespace với các biến lạ"
                ]
              },
              "takeaway": {
                "en": "Understanding Python import mechanics turns elusive path and circular dependency bugs into predictable, cleanly architected package boundaries.",
                "vi": "Nắm vững cơ chế import giúp biến các lỗi đường dẫn và phụ thuộc vòng khó hiểu thành ranh giới kiến trúc package sạch sẽ và dễ bảo trì."
              }
            },
            "selfReview": [
              {
                "question": {
                  "en": "What happens if a module is imported 100 times across various files during a single application execution?",
                  "vi": "Điều gì xảy ra nếu một module được import 100 lần ở nhiều file khác nhau trong một lần chạy ứng dụng?"
                },
                "hint": {
                  "en": "Think about `sys.modules` caching behavior.",
                  "vi": "Hãy nghĩ về cơ chế lưu cache trong `sys.modules`."
                },
                "answer": {
                  "en": "The module code executes exactly ONCE during the first import. The resulting module object is cached in `sys.modules`. All subsequent 99 imports perform an `O(1)` dictionary lookup in `sys.modules` and bind the cached instance immediately without re-executing any code.",
                  "vi": "Mã nguồn của module chỉ chạy đúng MỘT LẦN ở lần import đầu tiên. Đối tượng module được lưu vào `sys.modules`. Cả 99 lần import sau chỉ tra cứu `O(1)` trong `sys.modules` và gán lại tham chiếu chứ không chạy lại mã."
                }
              },
              {
                "question": {
                  "en": "How does `if TYPE_CHECKING:` help resolve circular imports?",
                  "vi": "Tại sao `if TYPE_CHECKING:` giúp loại bỏ lỗi circular import?"
                },
                "hint": {
                  "en": "What is the boolean value of `TYPE_CHECKING` at runtime versus during static analysis with mypy or pyright?",
                  "vi": "Giá trị boolean của `TYPE_CHECKING` lúc runtime so với lúc chạy công cụ phân tích tĩnh như mypy là gì?"
                },
                "answer": {
                  "en": "`typing.TYPE_CHECKING` evaluates to `False` at runtime, completely skipping the enclosed import statement during normal execution. However, static type checkers like Mypy and IDEs treat it as `True`, allowing full type annotations without incurring runtime import cycles.",
                  "vi": "`typing.TYPE_CHECKING` có giá trị `False` lúc runtime, bỏ qua hoàn toàn câu lệnh import khi chạy thật. Tuy nhiên, các công cụ phân tích tĩnh như Mypy và IDE coi nó là `True`, cho phép kiểm tra kiểu đầy đủ mà không gây lỗi vòng lặp import."
                }
              }
            ]
          }
        ]
      },
      {
        "partNumber": 2,
        "title": {
          "en": "Core Data Structures & Iteration",
          "vi": "Cấu Trúc Dữ Liệu Cốt Lõi & Lặp Dữ Liệu"
        },
        "description": {
          "en": "Dynamic arrays, compact hash tables, IEEE floats, Unicode boundaries, and lazy generators.",
          "vi": "Mảng động, bảng băm compact, số thực IEEE, ranh giới Unicode và generator đánh giá lười."
        },
        "chapters": [
          {
            "id": "py-hb-ch-4",
            "number": 4,
            "partNumber": 2,
            "partTitle": {
              "en": "Core Data Structures",
              "vi": "Cấu Trúc Dữ Liệu Cốt Lõi"
            },
            "slug": "numbers-strings-encodings",
            "title": {
              "en": "Numbers, Strings & Encodings",
              "vi": "Số Học, Chuỗi & Mã Hóa Ký Tự"
            },
            "summary": {
              "en": "Arbitrary precision integers, IEEE 754 floating-point nuances, string immutability, f-string parsing, Unicode code points, and the bytes/str boundary.",
              "vi": "Số nguyên chính xác tùy ý, sai số số thực IEEE 754, tính bất biến của chuỗi, cơ chế f-string, mã điểm Unicode và ranh giới giữa bytes và str."
            },
            "readTimeMinutes": 19,
            "sections": [
              {
                "id": "py-hb-4-1",
                "title": {
                  "en": "Integers (Arbitrary Precision) & IEEE 754 Floats",
                  "vi": "Số Nguyên (Chính Xác Tùy Ý) & Số Thực Chuẩn IEEE 754"
                },
                "content": {
                  "en": "In Python 3, integers have **arbitrary precision** (bignums), meaning they never overflow beyond memory constraints. Internally, CPython stores integers as an array of 30-bit digits (`digit` arrays in `longintrepr.h`). In contrast, Python `float` values are standard 64-bit IEEE 754 double-precision floating-point numbers. Because decimal fractions like `0.1` cannot be represented precisely in binary floating-point, expressions like `0.1 + 0.2 == 0.3` evaluate to `False`. For financial and mission-critical accounting, developers must use the standard library `decimal.Decimal` module.",
                  "vi": "Trong Python 3, số nguyên có **độ chính xác tùy ý (arbitrary precision)**, không bao giờ bị tràn số (overflow) trừ khi hết RAM. Dưới tầng CPython, số nguyên được lưu dưới dạng mảng các chữ số 30-bit (`longintrepr.h`). Ngược lại, kiểu `float` trong Python là số thực 64-bit chuẩn IEEE 754 double precision. Do các số thập phân như `0.1` không thể biểu diễn chính xác tuyệt đối ở hệ nhị phân, phép tính `0.1 + 0.2 == 0.3` sẽ trả về `False`. Trong tài chính và kế toán, lập trình viên bắt buộc phải sử dụng mô-đun `decimal.Decimal`."
                },
                "comparisonTable": {
                  "headers": [
                    {
                      "en": "Type",
                      "vi": "Kiểu Số"
                    },
                    {
                      "en": "Internal Representation",
                      "vi": "Biểu Diễn Nội Bộ"
                    },
                    {
                      "en": "Precision Limit",
                      "vi": "Giới Hạn Độ Chính Xác"
                    },
                    {
                      "en": "Primary Use Case",
                      "vi": "Ứng Dụng Chính"
                    }
                  ],
                  "rows": [
                    {
                      "en": [
                        "int",
                        "Variable-length digit array in C",
                        "Unlimited (bounded only by RAM)",
                        "Exact counts, cryptography, indices"
                      ],
                      "vi": [
                        "int",
                        "Mảng chữ số biến độ dài bằng C",
                        "Không giới hạn (chỉ phụ thuộc RAM)",
                        "Đếm số lượng, mật mã học, chỉ số"
                      ]
                    },
                    {
                      "en": [
                        "float",
                        "64-bit C double (IEEE 754)",
                        "53 bits of mantissa (~15-17 decimal digits)",
                        "Scientific computing, 3D graphics, ML"
                      ],
                      "vi": [
                        "float",
                        "C double 64-bit (IEEE 754)",
                        "53-bit mantissa (~15-17 chữ số thập phân)",
                        "Tính toán khoa học, đồ họa 3D, Machine Learning"
                      ]
                    },
                    {
                      "en": [
                        "decimal.Decimal",
                        "Exact base-10 fixed/floating point",
                        "User-configurable precision (e.g. 28+ digits)",
                        "Banking, billing, currency calculations"
                      ],
                      "vi": [
                        "decimal.Decimal",
                        "Số thực hệ cơ số 10 chính xác tuyệt đối",
                        "Tùy chỉnh độ dài (mặc định 28 chữ số)",
                        "Ngân hàng, hóa đơn, thanh toán tiền tệ"
                      ]
                    }
                  ]
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "floating_point_math.py",
                  "code": "import math\nfrom decimal import Decimal\n\n# 1. Float Imprecision\nval = 0.1 + 0.2\nprint(\"Float sum:\", val)  # 0.30000000000000004\nprint(\"Naive equality (val == 0.3):\", val == 0.3)  # False\nprint(\"Tolerant equality (math.isclose):\", math.isclose(val, 0.3))  # True\n\n# 2. Financial Precision with Decimal\nprice = Decimal(\"0.10\")\ntax = Decimal(\"0.20\")\ntotal = price + tax\nprint(\"Exact Decimal total:\", total)  # 0.30\nprint(\"Exact equality (total == Decimal('0.30')):\", total == Decimal(\"0.30\"))  # True",
                  "explanation": {
                    "en": "Demonstrates IEEE 754 floating-point tolerance with `math.isclose` versus exact base-10 calculation with `Decimal`.",
                    "vi": "Minh họa cách so sánh số thực có dung sai bằng `math.isclose` và tính toán chính xác tuyệt đối với `Decimal`."
                  }
                }
              },
              {
                "id": "py-hb-4-2",
                "title": {
                  "en": "Strings as Immutable Sequences & F-Strings Internals",
                  "vi": "Chuỗi Ký Tự Bất Biến & Cơ Chế Hoạt Động F-Strings"
                },
                "content": {
                  "en": "Python strings (`str`) are immutable sequences of Unicode characters. Because strings cannot be mutated in place, string concatenation in tight loops using `+=` repeatedly allocates new memory buffers, degrading performance to `O(N^2)`. Modern Python code relies on '' .join(list_of_strings) or formatted string literals (**f-strings**, PEP 498). F-strings are evaluated at runtime by compiling formatting expressions directly into optimized bytecode opcodes (`FORMAT_VALUE` and `BUILD_STRING`), making them significantly faster than legacy `%` formatting or `str.format()`.",
                  "vi": "Chuỗi trong Python (`str`) là dãy ký tự Unicode bất biến. Do chuỗi không thể sửa tại chỗ, việc cộng dồn chuỗi trong vòng lặp bằng `+=` sẽ liên tục cấp phát vùng nhớ mới, làm giảm hiệu năng xuống `O(N^2)`. Lập trình Python hiện đại ưu tiên dùng '' .join(danh_sach) hoặc **f-strings** (PEP 498). F-string được biên dịch trực tiếp thành các opcode tối ưu (`FORMAT_VALUE` và `BUILD_STRING`), nhanh hơn rõ rệt so với định dạng `%` cũ hoặc hàm `str.format()`."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "fstring_features.py",
                  "code": "user_name = \"alexander\"\nbalance = 12450.75\nratio = 0.8492\n\n# 1. Formatting specifiers and alignment\nprint(f\"User: {user_name.capitalize():>12}\")\nprint(f\"Currency: ${balance:,.2f}\")\nprint(f\"Percentage: {ratio:.1%}\")\n\n# 2. Debug specifier (=) introduced in Python 3.8\ndelta = 45.2\nprint(f\"{delta=}\")  # Outputs: delta=45.2",
                  "explanation": {
                    "en": "F-strings support inline expressions, formatting specifiers (`:,.2f`), and the debugging operator (`{var=}`).",
                    "vi": "F-strings hỗ trợ nhúng biểu thức, định dạng số (`:,.2f`) và toán tử debug nhanh (`{var=}`)."
                  }
                }
              },
              {
                "id": "py-hb-4-3",
                "title": {
                  "en": "Unicode, UTF-8 & The bytes vs. str Boundary",
                  "vi": "Unicode, UTF-8 & Ranh Giới Giữa bytes và str"
                },
                "content": {
                  "en": "One of the most critical architectural principles in modern Python is the **Unicode Sandwich**. Python strictly separates human-readable text (`str`) from raw binary data (`bytes`): 1) Text (`str`) represents abstract Unicode code points inside the application. 2) Binary (`bytes`) represents raw 8-bit byte sequences stored on disk or transmitted over networks. Converting `bytes` to `str` requires explicit decoding (`bytes.decode('utf-8')`), and converting `str` to `bytes` requires explicit encoding (`str.encode('utf-8')`).",
                  "vi": "Một nguyên lý kiến trúc sống còn trong Python hiện đại là **Mô hình Bánh mì kẹp Unicode (Unicode Sandwich)**. Python phân định rạch ròi giữa văn bản (`str`) và dữ liệu nhị phân thô (`bytes`): 1) Văn bản (`str`) là tập các mã điểm Unicode trừu tượng chạy bên trong ứng dụng. 2) Dữ liệu nhị phân (`bytes`) là dãy byte 8-bit lưu trên ổ cứng hoặc truyền qua mạng. Chuyển từ `bytes` sang `str` phải qua giải mã (`bytes.decode('utf-8')`), và ngược lại phải mã hóa (`str.encode('utf-8')`)."
                },
                "diagram": {
                  "title": {
                    "en": "The Unicode Sandwich Architecture",
                    "vi": "Kiến Trúc Bánh Mì Kẹp Unicode Trong Python"
                  },
                  "steps": [
                    {
                      "number": 1,
                      "label": {
                        "en": "Ingress (Decode Bytes)",
                        "vi": "Đầu Vào (Decode Bytes)"
                      },
                      "description": {
                        "en": "Raw incoming bytes from network or disk are immediately decoded to UTF-8 str.",
                        "vi": "Dữ liệu byte thô từ mạng hoặc ổ cứng được decode ngay sang chuỗi str UTF-8."
                      }
                    },
                    {
                      "number": 2,
                      "label": {
                        "en": "Application Core (str)",
                        "vi": "Lõi Ứng Dụng (str)"
                      },
                      "description": {
                        "en": "100% of internal business logic and text processing operates purely on str.",
                        "vi": "Toàn bộ logic nghiệp vụ xử lý văn bản hoàn toàn trên kiểu chuỗi str."
                      }
                    },
                    {
                      "number": 3,
                      "label": {
                        "en": "Egress (Encode Bytes)",
                        "vi": "Đầu Ra (Encode Bytes)"
                      },
                      "description": {
                        "en": "Outgoing text is explicitly encoded to UTF-8 bytes before wire transmission.",
                        "vi": "Văn bản được encode sang UTF-8 bytes trước khi truyền ra ngoài mạng."
                      }
                    }
                  ]
                },
                "keyTakeaways": {
                  "en": [
                    "Python integers have arbitrary precision; floats are standard IEEE 754 doubles",
                    "Use `decimal.Decimal` for financial calculations where decimal rounding errors are impermissible",
                    "Enforce the Unicode Sandwich: decode bytes at input boundaries and encode str at output boundaries"
                  ],
                  "vi": [
                    "Số nguyên Python có độ chính xác vô hạn; float là số thực IEEE 754 64-bit chuẩn",
                    "Dùng `decimal.Decimal` cho bài toán tài chính để tránh hoàn toàn sai số làm tròn thập phân",
                    "Tuân thủ mô hình Unicode Sandwich: decode byte ngay ở đầu vào và encode chuỗi ở đầu ra"
                  ]
                }
              }
            ],
            "chapterSummary": {
              "mentalModels": {
                "en": [
                  "Strings are immutable sequences of Unicode code points",
                  "Floats represent binary fractions with inevitable representation limits",
                  "The Unicode Sandwich cleanly insulates application logic from wire encoding formats"
                ],
                "vi": [
                  "Chuỗi là dãy các điểm mã Unicode bất biến trong bộ nhớ",
                  "Số thực float biểu diễn dưới dạng nhị phân với sai số làm tròn tự nhiên",
                  "Mô hình Unicode Sandwich cách ly logic ứng dụng khỏi định dạng mã hóa nhị phân"
                ]
              },
              "rules": {
                "en": [
                  "Never use `==` directly on floats; use `math.isclose(a, b)` with a tolerance threshold",
                  "Prefer f-strings over `%` and `.format()` for speed and clarity",
                  "Always specify `encoding=\"utf-8\"` explicitly when opening text files"
                ],
                "vi": [
                  "Không so sánh trực tiếp số float bằng `==`; hãy dùng hàm `math.isclose(a, b)`",
                  "Ưu tiên f-strings thay cho `%` và `.format()` vì tốc độ nhanh và cú pháp trực quan",
                  "Luôn khai báo rõ `encoding=\"utf-8\"` khi mở file văn bản bằng `open()`"
                ]
              },
              "commonTraps": {
                "en": [
                  "Using floats for currency calculations causing 1-cent accounting discrepancies",
                  "Concatenating large strings in tight loops with `+=` causing O(N^2) buffer re-allocations"
                ],
                "vi": [
                  "Dùng float tính toán tiền tệ gây lệch số dư do sai số làm tròn",
                  "Cộng chuỗi lớn trong vòng lặp bằng `+=` khiến bộ nhớ bị cấp phát lại liên tục O(N^2)"
                ]
              },
              "takeaway": {
                "en": "A solid grasp of numbers and Unicode encodings eliminates insidious calculation glitches and character corruption across distributed systems.",
                "vi": "Nắm vững bản chất số học và mã hóa Unicode giúp loại bỏ triệt để các lỗi tính toán tiền tệ và lỗi font ký tự trong các hệ thống phân tán."
              }
            },
            "selfReview": [
              {
                "question": {
                  "en": "Why is '' .join(chunks) asymptotically faster than `s += chunk` inside a loop?",
                  "vi": "Tại sao dùng '' .join(chunks) nhanh hơn hẳn phép cộng chuỗi `s += chunk` trong vòng lặp?"
                },
                "hint": {
                  "en": "Think about string immutability and memory buffer re-allocation.",
                  "vi": "Hãy nghĩ về tính bất biến của chuỗi và việc cấp phát lại buffer bộ nhớ."
                },
                "answer": {
                  "en": "Strings are immutable. In each loop iteration, `s += chunk` allocates a new memory buffer of size `len(s) + len(chunk)` and copies all previous characters, yielding `O(N^2)` complexity. In contrast, '' .join(chunks) calculates the total required memory upfront in a single pass, allocating the exact buffer once in `O(N)` time.",
                  "vi": "Chuỗi trong Python là bất biến. Mỗi lần lặp `s += chunk`, Python phải cấp phát vùng nhớ mới và sao chép lại toàn bộ chuỗi cũ, độ phức tạp là `O(N^2)`. Ngược lại, '' .join(chunks) tính toán tổng độ dài chuỗi trước rồi cấp phát bộ nhớ đúng một lần duy nhất với độ phức tạp `O(N)`."
                }
              }
            ]
          },
          {
            "id": "py-hb-ch-5",
            "number": 5,
            "partNumber": 2,
            "partTitle": {
              "en": "Core Data Structures",
              "vi": "Cấu Trúc Dữ Liệu Cốt Lõi"
            },
            "slug": "lists-tuples-sequences",
            "title": {
              "en": "Lists, Tuples & Sequences",
              "vi": "Lists, Tuples & Cấu Trúc Dãy Tuần Tự"
            },
            "summary": {
              "en": "Dynamic array growth patterns, list over-allocation algorithms, tuple immutability benefits, sequence slicing internals, and extended iterable unpacking.",
              "vi": "Thuật toán mở rộng mảng động của list, cơ chế cấp phát thừa bộ nhớ, lợi thế của tuple bất biến, bản chất cắt lát sequence và kỹ thuật unpacking nâng cao."
            },
            "readTimeMinutes": 18,
            "sections": [
              {
                "id": "py-hb-5-1",
                "title": {
                  "en": "Dynamic Arrays: List Memory & Over-Allocation",
                  "vi": "Mảng Động: Cơ Chế Cấp Phát Bộ Nhớ & Over-Allocation Của List"
                },
                "content": {
                  "en": "Under the hood, a Python `list` is NOT a linked list; it is a **dynamic array of pointers** (`PyListObject` storing `PyObject** ob_item`). When items are added via `append()`, CPython does not allocate space for a single extra item each time. Instead, it uses an **over-allocation algorithm** (growth factor roughly `~1.125x` to `~1.25x`) defined in `listobject.c`. This geometric resizing strategy guarantees that appending elements achieves **amortized O(1)** constant time complexity.",
                  "vi": "Dưới tầng CPython, kiểu `list` KHÔNG PHẢI là danh sách liên kết (linked list); nó là một **mảng động chứa các con trỏ** (`PyListObject` quản lý mảng con trỏ `PyObject** ob_item`). Khi gọi `append()`, CPython không cấp phát thêm từng ô nhớ đơn lẻ mà áp dụng thuật toán **cấp phát thừa (over-allocation)** với hệ số tăng trưởng khoảng `~1.125x` đến `~1.25x` trong file `listobject.c`. Chiến lược này đảm bảo thao tác thêm phần tử đạt độ phức tạp **O(1) trung bình (amortized)**."
                },
                "diagram": {
                  "title": {
                    "en": "List Dynamic Resizing & Over-Allocation",
                    "vi": "Cơ Chế Mở Rộng Kích Thước Mảng Động Của List"
                  },
                  "steps": [
                    {
                      "number": 1,
                      "label": {
                        "en": "Capacity Exhausted",
                        "vi": "Hết Dung Lượng Bộ Nhớ Đệm"
                      },
                      "description": {
                        "en": "Current items reach allocated slot limit (size == allocated).",
                        "vi": "Số phần tử hiện tại chạm ngưỡng ô nhớ đã cấp phát (size == allocated)."
                      }
                    },
                    {
                      "number": 2,
                      "label": {
                        "en": "Over-Allocation Formula",
                        "vi": "Tính Toán Bộ Nhớ Thừa"
                      },
                      "description": {
                        "en": "CPython calculates new_allocated = (size + (size >> 3) + 6) & ~3.",
                        "vi": "CPython tính dung lượng mới theo công thức nhân thêm khoảng 12.5% ô nhớ dự phòng."
                      }
                    },
                    {
                      "number": 3,
                      "label": {
                        "en": "Realloc & Pointer Transfer",
                        "vi": "Tái Cấp Phát & Chuyển Con Trỏ"
                      },
                      "description": {
                        "en": "C realloc() expands heap memory buffer; future appends execute in O(1).",
                        "vi": "Hàm realloc() trong C mở rộng bộ nhớ; các lệnh append tiếp theo chạy tức thì O(1)."
                      }
                    }
                  ]
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "list_growth_inspection.py",
                  "code": "import sys\n\n# Track list memory size as elements are appended\ndata = []\nprev_bytes = sys.getsizeof(data)\nprint(f\"Empty list initial memory: {prev_bytes} bytes\")\n\nfor i in range(25):\n    data.append(i)\n    current_bytes = sys.getsizeof(data)\n    if current_bytes != prev_bytes:\n        print(f\"Length {len(data):2d} -> Memory expanded to {current_bytes:4d} bytes (Capacity jump!)\")\n        prev_bytes = current_bytes",
                  "explanation": {
                    "en": "`sys.getsizeof()` illustrates discrete jump steps where CPython over-allocates buffer slots to maintain amortized O(1) append speed.",
                    "vi": "`sys.getsizeof()` cho thấy các bước nhảy bậc thang khi CPython cấp phát trước bộ nhớ để giữ tốc độ append luôn đạt O(1)."
                  }
                }
              },
              {
                "id": "py-hb-5-2",
                "title": {
                  "en": "Tuples: Immutability, Memory Efficiency & Struct Records",
                  "vi": "Tuples: Tính Bất Biến, Tiết Kiệm Bộ Nhớ & Bản Ghi Cấu Trúc"
                },
                "content": {
                  "en": "A `tuple` is an immutable sequence of object references. Because tuples cannot change size after creation, CPython allocates the exact amount of memory needed with zero over-allocation overhead. Furthermore, CPython utilizes a **freelist optimization** for small tuples, recycling deallocated tuple wrappers without invoking general OS malloc/free routines. Tuples containing only hashable elements are themselves hashable and can serve as dictionary keys.",
                  "vi": "`tuple` là dãy tham chiếu đối tượng bất biến. Vì không thể thay đổi kích thước sau khi tạo, CPython cấp phát chính xác dung lượng bộ nhớ cần thiết mà không tốn chi phí over-allocation. Ngoài ra, CPython còn có cơ chế **freelist** lưu lại các tuple nhỏ đã giải phóng để tái sử dụng ngay mà không cần gọi hệ điều hành cấp phát bộ nhớ. Tuple chứa các phần tử hashable thì bản thân nó cũng hashable và có thể dùng làm key cho dictionary."
                },
                "comparisonTable": {
                  "headers": [
                    {
                      "en": "Feature",
                      "vi": "Đặc Điểm"
                    },
                    {
                      "en": "List",
                      "vi": "List"
                    },
                    {
                      "en": "Tuple",
                      "vi": "Tuple"
                    },
                    {
                      "en": "collections.deque",
                      "vi": "collections.deque"
                    }
                  ],
                  "rows": [
                    {
                      "en": [
                        "Mutability",
                        "Mutable (in-place append, pop, sort)",
                        "Immutable (fixed upon creation)",
                        "Mutable (double-ended queue)"
                      ],
                      "vi": [
                        "Tính khả biến",
                        "Khả biến (thêm, xóa, sắp xếp tại chỗ)",
                        "Bất biến (cố định sau khi tạo)",
                        "Khả biến (hàng đợi hai đầu)"
                      ]
                    },
                    {
                      "en": [
                        "Memory Footprint",
                        "Higher (due to over-allocation buffer)",
                        "Minimal (exact allocation, no slack)",
                        "Slightly higher (linked block chunks)"
                      ],
                      "vi": [
                        "Dung lượng bộ nhớ",
                        "Lớn hơn (do có ô nhớ dự phòng)",
                        "Tối ưu nhất (vừa khít, không lãng phí)",
                        "Trung bình (các khối danh sách liên kết)"
                      ]
                    },
                    {
                      "en": [
                        "Append / Prepend Time",
                        "Append: O(1), Prepend (insert 0): O(N)",
                        "Not supported (creates new tuple)",
                        "Append: O(1), Prepend (appendleft): O(1)"
                      ],
                      "vi": [
                        "Tốc độ thêm đầu/cuối",
                        "Thêm cuối: O(1), Thêm đầu: O(N)",
                        "Không hỗ trợ (phải tạo tuple mới)",
                        "Thêm cuối: O(1), Thêm đầu: O(1)"
                      ]
                    },
                    {
                      "en": [
                        "Dict Key Capability",
                        "No (Unhashable)",
                        "Yes (if all elements are hashable)",
                        "No (Unhashable)"
                      ],
                      "vi": [
                        "Làm Key Dictionary",
                        "Không (Unhashable)",
                        "Có (nếu mọi phần tử con hashable)",
                        "Không (Unhashable)"
                      ]
                    }
                  ]
                }
              },
              {
                "id": "py-hb-5-3",
                "title": {
                  "en": "Slicing & Extended Iterable Unpacking",
                  "vi": "Cắt Lát Sequence & Unpacking Mở Rộng"
                },
                "content": {
                  "en": "Python sequence slicing (`sequence[start:stop:step]`) constructs a new shallow copy of the specified subsequence. Negative indices count backward from the end (`-1` represents the last element). Extended iterable unpacking (PEP 3132) uses the `*rest` star operator to capture variable-length sub-sequences cleanly without manual indexing.",
                  "vi": "Kỹ thuật cắt lát (`sequence[start:stop:step]`) tạo ra một bản sao nông mới của đoạn dữ liệu chỉ định. Chỉ số âm đếm ngược từ cuối dãy (`-1` là phần tử cuối cùng). Cú pháp unpacking mở rộng (PEP 3132) dùng toán tử sao `*rest` để gom các phần tử còn lại vào list một cách ngắn gọn mà không cần tính chỉ số thủ công."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "unpacking_and_slicing.py",
                  "code": "# 1. Slicing with Steps\nitems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\nprint(\"Even numbers (step 2):\", items[::2])       # [0, 2, 4, 6, 8]\nprint(\"Reversed list:\", items[::-1])              # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]\n\n# 2. Extended Unpacking (Star Operator)\nfirst, *middle, last = items\nprint(\"First:\", first)    # 0\nprint(\"Middle:\", middle)  # [1, 2, 3, 4, 5, 6, 7, 8]\nprint(\"Last:\", last)      # 9",
                  "explanation": {
                    "en": "`*middle` captures intermediate items as a new list while binding `first` and `last` cleanly.",
                    "vi": "Toán tử `*middle` gom toàn bộ các phần tử ở giữa thành một list mới trong khi gán biến `first` và `last` rành mạch."
                  }
                },
                "commonMistakes": [
                  {
                    "mistake": {
                      "en": "Creating a 2D matrix using list multiplication `matrix = [[0] * 3] * 3`",
                      "vi": "Tạo ma trận 2 chiều bằng phép nhân `matrix = [[0] * 3] * 3`"
                    },
                    "why": {
                      "en": "Outer multiplication duplicates the reference to the SAME inner list row 3 times. Mutating `matrix[0][0]` changes all 3 rows.",
                      "vi": "Phép nhân ngoài sao chép tham chiếu của CÙNG MỘT dòng list 3 lần. Sửa `matrix[0][0]` sẽ làm thay đổi cả 3 hàng."
                    },
                    "solution": {
                      "en": "Use a list comprehension to instantiate distinct independent inner row lists.",
                      "vi": "Dùng list comprehension để khởi tạo các dòng danh sách hoàn toàn độc lập."
                    },
                    "codeIncorrect": "grid = [[0] * 3] * 3\ngrid[0][0] = 99\nprint(grid) # [[99, 0, 0], [99, 0, 0], [99, 0, 0]] -> Bug!",
                    "codeCorrect": "grid = [[0] * 3 for _ in range(3)]\ngrid[0][0] = 99\nprint(grid) # [[99, 0, 0], [0, 0, 0], [0, 0, 0]] -> Clean!"
                  }
                ],
                "keyTakeaways": {
                  "en": [
                    "Lists are dynamic pointer arrays using geometric over-allocation for O(1) appends",
                    "Tuples are immutable, memory-efficient records suitable for fixed data and dict keys",
                    "Use `collections.deque` when high-throughput FIFO queue operations (insert at 0) are required"
                  ],
                  "vi": [
                    "List là mảng động chứa con trỏ, tự động cấp phát thừa để đạt tốc độ append O(1)",
                    "Tuple là cấu trúc bất biến, tiết kiệm RAM, phù hợp cho dữ liệu cố định và làm dict key",
                    "Dùng `collections.deque` khi cần thao tác hàng đợi FIFO hiệu năng cao (thêm/xóa ở đầu)"
                  ]
                }
              }
            ],
            "chapterSummary": {
              "mentalModels": {
                "en": [
                  "Lists are contiguous pointer buffers resized geometrically to amortize allocation overhead",
                  "Tuples represent immutable structural records with zero memory slack",
                  "Sequence slicing allocates a new shallow copy container"
                ],
                "vi": [
                  "List là bộ đệm con trỏ liền kề được mở rộng hình học để giảm thiểu số lần cấp phát lại",
                  "Tuple là bản ghi cấu trúc bất biến không tốn dung lượng bộ nhớ dư thừa",
                  "Cắt lát sequence luôn sinh ra một đối tượng container bản sao nông mới"
                ]
              },
              "rules": {
                "en": [
                  "Use `collections.deque` instead of `list.insert(0, val)` or `list.pop(0)` which run in O(N)",
                  "Initialize multi-dimensional lists with comprehensions (`[[0] * C for _ in range(R)]`)",
                  "Prefer tuples for composite dictionary keys (`dict[(x, y)] = value`)"
                ],
                "vi": [
                  "Dùng `collections.deque` thay cho `list.insert(0, val)` vốn có độ phức tạp O(N)",
                  "Khởi tạo mảng nhiều chiều bằng comprehension (`[[0] * C for _ in range(R)]`)",
                  "Ưu tiên dùng tuple làm khóa phức hợp cho dictionary (`dict[(x, y)] = value`)"
                ]
              },
              "commonTraps": {
                "en": [
                  "Multiplying list containing nested mutable objects (`[[0]] * 5`) duplicating references",
                  "Modifying a list while iterating over it, resulting in skipped elements"
                ],
                "vi": [
                  "Nhân bản list chứa đối tượng khả biến (`[[0]] * 5`) gây trùng lặp tham chiếu",
                  "Vừa duyệt for vừa xóa phần tử trong list làm nhảy cóc qua phần tử tiếp theo"
                ]
              },
              "takeaway": {
                "en": "Choosing between lists, tuples, and deques based on memory layout and algorithmic complexity ensures high performance and prevents reference duplication bugs.",
                "vi": "Việc lựa chọn đúng giữa list, tuple và deque dựa trên bố cục bộ nhớ và độ phức tạp thuật toán đảm bảo ứng dụng chạy mượt mà và không dính lỗi tham chiếu."
              }
            },
            "selfReview": [
              {
                "question": {
                  "en": "Why does inserting an element at index 0 of a list (`list.insert(0, x)`) take O(N) time while appending takes O(1)?",
                  "vi": "Tại sao chèn phần tử vào đầu list (`list.insert(0, x)`) tốn O(N) trong khi chèn vào cuối list lại tốn O(1)?"
                },
                "hint": {
                  "en": "Consider the contiguous memory layout of dynamic pointer arrays.",
                  "vi": "Hãy nghĩ về cách mảng con trỏ được xếp liền kề nhau trong bộ nhớ."
                },
                "answer": {
                  "en": "Python lists are contiguous arrays of pointers in memory. Inserting at index 0 requires shifting every existing pointer one position to the right via `memmove()`, costing `O(N)` operations. Appending places the pointer into the next pre-allocated empty slot at the end in `O(1)` time.",
                  "vi": "List trong Python là mảng các con trỏ nằm liên tiếp nhau trong RAM. Chèn vào vị trí 0 buộc CPython phải dịch chuyển toàn bộ N con trỏ hiện có sang phải bằng lệnh `memmove()`, tốn `O(N)`. Còn append chỉ việc ghi vào ô nhớ trống đã cấp phát sẵn ở cuối mảng trong `O(1)`."
                }
              }
            ]
          },
          {
            "id": "py-hb-ch-6",
            "number": 6,
            "partNumber": 2,
            "partTitle": {
              "en": "Core Data Structures",
              "vi": "Cấu Trúc Dữ Liệu Cốt Lõi"
            },
            "slug": "dictionaries-and-sets",
            "title": {
              "en": "Dictionaries & Sets",
              "vi": "Dictionaries & Tập Hợp Sets"
            },
            "summary": {
              "en": "Hash table mechanics, compact dict memory layout in Python 3.6+, the hashability contract (__hash__ and __eq__), collision resolution, and set Venn operations.",
              "vi": "Cơ chế bảng băm hash table, cấu trúc compact dict từ Python 3.6+, quy ước hashable (__hash__ và __eq__), xử lý xung đột băm và các phép toán tập hợp."
            },
            "readTimeMinutes": 20,
            "sections": [
              {
                "id": "py-hb-6-1",
                "title": {
                  "en": "The Hash Table Mental Model & Compact Dictionaries",
                  "vi": "Mô Hình Bảng Băm & Cấu Trúc Compact Dictionary"
                },
                "content": {
                  "en": "Python dictionaries (`dict`) and sets (`set`) are backed by **hash tables**, providing average **O(1) lookups, insertions, and deletions**. Since Python 3.6 (PEP 468), CPython uses a **Compact Dictionary layout** that reduced memory consumption by ~25% and preserves key insertion order by default. The layout splits storage into two tables: 1) A sparse `indices` array storing integer offsets, and 2) A dense `entries` array packing `[hash, key_ptr, value_ptr]` sequentially in insertion order.",
                  "vi": "Dictionary (`dict`) và Set (`set`) trong Python hoạt động dựa trên **Bảng Băm (Hash Table)**, mang lại tốc độ **tìm kiếm, thêm và xóa trung bình đạt O(1)**. Từ Python 3.6 (PEP 468), CPython chuyển sang **Kiến trúc Compact Dictionary** giúp tiết kiệm ~25% RAM và tự động bảo toàn thứ tự chèn phần tử. Kiến trúc này tách bộ nhớ làm 2 bảng: 1) Mảng `indices` thưa chứa chỉ số nguyên, và 2) Mảng `entries` dày đặc lưu `[hash, con_trỏ_key, con_trỏ_val]` tuần tự theo đúng thứ tự chèn."
                },
                "diagram": {
                  "title": {
                    "en": "CPython Compact Dictionary Architecture",
                    "vi": "Kiến Trúc Bảng Băm Compact Dictionary Trong CPython"
                  },
                  "steps": [
                    {
                      "number": 1,
                      "label": {
                        "en": "Hash & Masking",
                        "vi": "Tính Hash & Masking"
                      },
                      "description": {
                        "en": "hash(key) is computed and masked to index = hash & (table_size - 1).",
                        "vi": "hash(key) được tính và lấy phần dư index = hash & (table_size - 1)."
                      }
                    },
                    {
                      "number": 2,
                      "label": {
                        "en": "Sparse Indices Array",
                        "vi": "Mảng Indices Thưa"
                      },
                      "description": {
                        "en": "indices[index] contains integer index into dense entries array.",
                        "vi": "indices[index] chứa số nguyên trỏ tới vị trí trong mảng entries."
                      }
                    },
                    {
                      "number": 3,
                      "label": {
                        "en": "Dense Entries Array",
                        "vi": "Mảng Entries Dày Đặc"
                      },
                      "description": {
                        "en": "Stores [hash, key, value] sequentially, preserving insertion order.",
                        "vi": "Lưu [hash, key, value] liên tiếp nhau, bảo toàn trọn vẹn thứ tự thêm phần tử."
                      }
                    }
                  ]
                }
              },
              {
                "id": "py-hb-6-2",
                "title": {
                  "en": "The Key Hashability Contract (__hash__ & __eq__)",
                  "vi": "Quy Ước Hashable Của Khóa (__hash__ & __eq__)"
                },
                "content": {
                  "en": "For an object to be used as a dictionary key or set element, it must be **Hashable**. The Hashability contract demands two inviolable rules: 1) The object must provide a `__hash__()` method returning an integer that **NEVER changes during its lifetime**, and 2) It must provide `__eq__()` such that if `a == b`, then `hash(a) == hash(b)` must evaluate to True. Mutable objects like `list` and `dict` implement `__hash__ = None` and raise `TypeError: unhashable type` because mutating contents would alter their bucket location, making them unretrievable.",
                  "vi": "Để một đối tượng có thể làm key trong dictionary hoặc phần tử trong set, nó bắt buộc phải **Hashable**. Quy ước Hashable đặt ra 2 điều kiện bất biến: 1) Đối tượng phải có phương thức `__hash__()` trả về số nguyên **không bao giờ thay đổi trong suốt vòng đời**, và 2) Phải có `__eq__()` sao cho nếu `a == b` thì bắt buộc `hash(a) == hash(b)`. Các kiểu dữ liệu khả biến như `list` và `dict` bị gán `__hash__ = None` và báo lỗi `TypeError: unhashable type` vì nếu cho phép sửa nội dung, mã hash sẽ đổi và làm mất dấu vị trí ô băm."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "custom_hashable_key.py",
                  "code": "class Coordinate:\n    def __init__(self, x: int, y: int):\n        self._x = x\n        self._y = y\n\n    @property\n    def x(self) -> int:\n        return self._x\n\n    @property\n    def y(self) -> int:\n        return self._y\n\n    def __eq__(self, other: object) -> bool:\n        if not isinstance(other, Coordinate):\n            return False\n        return self._x == other._x and self._y == other._y\n\n    def __hash__(self) -> int:\n        # Combine hashes of immutable attributes\n        return hash((self._x, self._y))\n\n# Valid immutable hashable key in dictionary\npoints_map = {Coordinate(10, 20): \"Station Alpha\"}\nprint(\"Lookup result:\", points_map[Coordinate(10, 20)])  # Station Alpha",
                  "explanation": {
                    "en": "Demonstrates implementing `__eq__` and `__hash__` over immutable properties, allowing custom instances to serve as safe dictionary keys.",
                    "vi": "Minh họa cách cài đặt `__eq__` và `__hash__` dựa trên các thuộc tính bất biến, cho phép class tùy chỉnh làm key cho dictionary an toàn."
                  }
                }
              },
              {
                "id": "py-hb-6-3",
                "title": {
                  "en": "Sets: Uniqueness, Venn Operations & Complexity",
                  "vi": "Tập Hợp Sets: Tính Duy Nhất & Các Phép Toán Tập Hợp"
                },
                "content": {
                  "en": "A `set` is an unordered collection of unique, hashable objects. Sets implement standard mathematical Venn operations: Union (`|`), Intersection (`&`), Difference (`-`), and Symmetric Difference (`^`). Because set containment checks (`item in my_set`) execute in average **O(1)** time (compared to `O(N)` linear scanning in a `list`), converting collections to sets is a fundamental optimization for deduplication and relationship membership queries.",
                  "vi": "`set` là tập hợp không trùng lặp chứa các đối tượng hashable. Set hỗ trợ đầy đủ các phép toán biểu đồ Venn: Hợp (`|`), Giao (`&`), Hiệu (`-`) và Hiệu đối xứng (`^`). Vì thao tác kiểm tra phần tử (`item in my_set`) chỉ tốn thời gian trung bình **O(1)** (so với `O(N)` duyệt tuyến tính của `list`), việc chuyển đổi sang set là phương pháp tối ưu kinh điển khi cần khử trùng lặp và kiểm tra tồn tại."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "set_operations.py",
                  "code": "admin_roles = {\"superadmin\", \"billing_manager\", \"editor\"}\nuser_permissions = {\"editor\", \"viewer\", \"commenter\"}\n\n# Venn Set Operations\nprint(\"Overlap (Intersection):\", admin_roles & user_permissions)       # {'editor'}\nprint(\"All combined (Union):\", admin_roles | user_permissions)         # All roles\nprint(\"Admin only (Difference):\", admin_roles - user_permissions)      # {'superadmin', 'billing_manager'}\nprint(\"Exclusive to one (Symmetric Diff):\", admin_roles ^ user_permissions)",
                  "explanation": {
                    "en": "Venn set operations provide concise, highly optimized C-level implementations for membership calculations.",
                    "vi": "Các phép toán tập hợp cung cấp cú pháp ngắn gọn, được tối ưu hóa trực tiếp dưới tầng C."
                  }
                },
                "keyTakeaways": {
                  "en": [
                    "Dictionaries and sets provide O(1) average lookup, insert, and delete performance",
                    "Python 3.7+ guarantees dictionary key insertion order preservation",
                    "Keys must be immutable and fulfill the `__hash__` and `__eq__` contract"
                  ],
                  "vi": [
                    "Dictionary và set cung cấp hiệu năng tìm kiếm, thêm và xóa trung bình O(1)",
                    "Từ Python 3.7+, dictionary luôn bảo toàn thứ tự chèn của các key",
                    "Khóa bắt buộc phải là đối tượng bất biến và thỏa mãn quy ước `__hash__` và `__eq__`"
                  ]
                }
              }
            ],
            "chapterSummary": {
              "mentalModels": {
                "en": [
                  "Hash tables map keys to integer array buckets via mathematical hash algorithms",
                  "Compact dictionaries achieve order preservation by separating indices from dense entry records",
                  "Sets are internally dictionaries where values are dummy null placeholders"
                ],
                "vi": [
                  "Bảng băm ánh xạ khóa tới các ô bucket thông qua thuật toán tính mã băm",
                  "Compact dict bảo toàn thứ tự bằng cách tách mảng chỉ số indices khỏi mảng dữ liệu entries",
                  "Set bản chất là dictionary nhưng giá trị value được gán bằng giá trị rỗng"
                ]
              },
              "rules": {
                "en": [
                  "Never use mutable objects as dictionary keys or set elements",
                  "If you override `__eq__` in a class, you must explicitly implement `__hash__`",
                  "Use `set` containment checks (`item in s`) for O(1) membership validation"
                ],
                "vi": [
                  "Không bao giờ dùng đối tượng khả biến làm key của dictionary hoặc phần tử trong set",
                  "Nếu ghi đè `__eq__` trong class, bắt buộc phải tự cài đặt lại phương thức `__hash__`",
                  "Dùng `item in s` trên set để kiểm tra sự tồn tại với tốc độ O(1)"
                ]
              },
              "commonTraps": {
                "en": [
                  "Using a list for repeated containment checks inside a loop causing O(N^2) total execution",
                  "Mutating an object after inserting it into a set, permanently breaking hash table lookup"
                ],
                "vi": [
                  "Dùng list để kiểm tra tồn tại `in` trong vòng lặp lồng nhau làm tăng độ phức tạp lên O(N^2)",
                  "Thay đổi giá trị thuộc tính của object sau khi đã nhét vào set làm hỏng cơ chế băm"
                ]
              },
              "takeaway": {
                "en": "Hash tables are the central engine of Python performance. Respecting the hashability contract ensures robust caching, lookups, and set algebra.",
                "vi": "Bảng băm là động cơ cốt lõi tạo nên hiệu năng của Python. Tuân thủ quy ước hashable giúp đảm bảo hệ thống cache, tra cứu và xử lý tập hợp luôn chuẩn xác."
              }
            },
            "selfReview": [
              {
                "question": {
                  "en": "Why does Python raise `TypeError: unhashable type: 'list'` when using a list as a dictionary key?",
                  "vi": "Tại sao Python báo lỗi `TypeError: unhashable type: 'list'` khi dùng list làm key trong dictionary?"
                },
                "hint": {
                  "en": "What would happen if the list contents were modified after being inserted into the dictionary?",
                  "vi": "Điều gì sẽ xảy ra nếu nội dung của list bị sửa đổi sau khi đã lưu vào dictionary?"
                },
                "answer": {
                  "en": "Lists are mutable. If a list were allowed as a key and then modified in place via `append()`, its hash code would change, meaning future lookups would search a different bucket and fail to find the key. To preserve hash table integrity, Python sets `list.__hash__ = None`.",
                  "vi": "List là kiểu dữ liệu khả biến. Nếu cho phép list làm key rồi sau đó sửa nội dung bằng `append()`, mã băm của nó sẽ đổi, khiến các lần tra cứu sau tìm sai ô bucket và không tìm thấy key. Để bảo vệ tính toàn vẹn của bảng băm, Python quy định `list.__hash__ = None`."
                }
              }
            ]
          },
          {
            "id": "py-hb-ch-7",
            "number": 7,
            "partNumber": 2,
            "partTitle": {
              "en": "Core Data Structures",
              "vi": "Cấu Trúc Dữ Liệu Cốt Lõi"
            },
            "slug": "comprehensions-iteration-transformation",
            "title": {
              "en": "Comprehensions, Iteration & Transformation",
              "vi": "Comprehensions, Lặp & Chuyển Đổi Dữ Liệu"
            },
            "summary": {
              "en": "List, dict, and set comprehensions, generator expressions for memory conservation, and standard library sequence utilities (zip, enumerate, filter, map, sorted).",
              "vi": "Cú pháp comprehension cho list, dict, set, biểu thức generator tiết kiệm RAM và các hàm tiện ích dãy tuần tự (zip, enumerate, filter, map, sorted)."
            },
            "readTimeMinutes": 17,
            "sections": [
              {
                "id": "py-hb-7-1",
                "title": {
                  "en": "List, Dict & Set Comprehensions",
                  "vi": "Comprehensions Cho List, Dict & Set"
                },
                "content": {
                  "en": "Comprehensions provide concise, declarative syntax for transforming and filtering iterable collections. In Python 3, comprehensions execute in their own isolated function scope, preventing loop variables (e.g., `x`) from leaking into and overwriting surrounding local namespaces. Comprehensions run faster than traditional `for` loops appending to lists because CPython optimizes bytecode construction via specialized `LIST_APPEND` opcodes without repeated Python-level method lookups.",
                  "vi": "Comprehension mang lại cú pháp khai báo ngắn gọn để biến đổi và lọc dữ liệu. Trong Python 3, comprehension chạy trong một scope hàm cách ly riêng, ngăn chặn biến lặp (như `x`) làm ghi đè lên các biến trùng tên ở phạm vi bên ngoài. Comprehension chạy nhanh hơn vòng lặp `for` thủ công vì CPython tối ưu trực tiếp bằng opcode `LIST_APPEND` ở tầng máy ảo mà không cần gọi phương thức append qua thông dịch."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "comprehensions_showcase.py",
                  "code": "# 1. List Comprehension with filtering\nraw_scores = [85, 42, 90, 68, 95, 30]\npassing_scores = [s for s in raw_scores if s >= 70]\n\n# 2. Dict Comprehension (Inverting key-value pairs)\nport_map = {\"http\": 80, \"https\": 443, \"ssh\": 22}\nreverse_map = {port: protocol for protocol, port in port_map.items()}\n\n# 3. Set Comprehension\nnames = [\"Alice\", \"BOB\", \"alice\", \"Charlie\"]\nunique_normalized = {name.lower() for name in names}\nprint(\"Unique lower names:\", unique_normalized)  # {'alice', 'bob', 'charlie'}",
                  "explanation": {
                    "en": "Demonstrates list filtering, dictionary key-value inversion, and set normalization in concise single-line expressions.",
                    "vi": "Minh họa lọc list, đảo ngược key-value của dictionary và chuẩn hóa set chỉ trong một dòng lệnh."
                  }
                }
              },
              {
                "id": "py-hb-7-2",
                "title": {
                  "en": "Generator Expressions: Memory Conservation & Lazy Evaluation",
                  "vi": "Biểu Thức Generator: Tiết Kiệm Bộ Nhớ & Đánh Giá Lười (Lazy)"
                },
                "content": {
                  "en": "While a list comprehension constructs the entire collection in memory immediately (**eager evaluation**), a **Generator Expression** (surrounded by parentheses `(x for x in seq)`) creates a lazy generator iterator that computes values one-at-a-time on demand. When processing large datasets (e.g. gigabytes of logs or database streams), generator expressions consume a constant **O(1) memory footprint**, preventing out-of-memory crashes.",
                  "vi": "Trong khi list comprehension tạo toàn bộ mảng dữ liệu trên RAM ngay lập tức (**đánh giá háo hức - eager**), thì **Biểu thức Generator** (bao bởi dấu ngoặc tròn `(x for x in seq)`) tạo ra một iterator đánh giá lười (lazy evaluation) chỉ sinh giá trị từng phần tử khi được yêu cầu. Khi xử lý tập dữ liệu lớn (như file log nhiều gigabyte hay luồng database), generator expression chỉ tiêu tốn **dung lượng RAM cố định O(1)**, tránh hoàn toàn lỗi tràn bộ nhớ."
                },
                "comparisonTable": {
                  "headers": [
                    {
                      "en": "Pattern",
                      "vi": "Mô Hình"
                    },
                    {
                      "en": "Syntax",
                      "vi": "Cú Pháp"
                    },
                    {
                      "en": "Evaluation Strategy",
                      "vi": "Chiến Lược Đánh Giá"
                    },
                    {
                      "en": "Memory Footprint",
                      "vi": "Dung Lượng RAM"
                    }
                  ],
                  "rows": [
                    {
                      "en": [
                        "List Comprehension",
                        "[f(x) for x in data]",
                        "Eager (creates entire list upfront)",
                        "O(N) — proportional to dataset size"
                      ],
                      "vi": [
                        "List Comprehension",
                        "[f(x) for x in data]",
                        "Eager (tạo toàn bộ list ngay lập tức)",
                        "O(N) — tỷ lệ thuận với số phần tử"
                      ]
                    },
                    {
                      "en": [
                        "Generator Expression",
                        "(f(x) for x in data)",
                        "Lazy (computes 1 item on demand)",
                        "O(1) — constant minimal memory"
                      ],
                      "vi": [
                        "Generator Expression",
                        "(f(x) for x in data)",
                        "Lazy (tính 1 phần tử khi cần)",
                        "O(1) — bộ nhớ cố định cực nhỏ"
                      ]
                    }
                  ]
                }
              },
              {
                "id": "py-hb-7-3",
                "title": {
                  "en": "Built-in Transformation Utilities: zip, enumerate, sorted",
                  "vi": "Các Hàm Tiện Ích Dãy Chuẩn: zip, enumerate, sorted"
                },
                "content": {
                  "en": "Python provides high-performance C-implemented sequence utilities: 1) `enumerate(iterable, start=0)` pairs elements with incremental index counters without manual index tracking. 2) `zip(*iterables, strict=False)` aggregates elements from multiple sequences in parallel (Python 3.10+ adds `strict=True` to raise `ValueError` on length mismatches). 3) `sorted(iterable, key=func, reverse=bool)` implements Timsort, returning a new sorted list without mutating the original container.",
                  "vi": "Python tích hợp sẵn các hàm tiện ích xử lý dãy viết bằng C với hiệu năng cực cao: 1) `enumerate(iterable, start=0)` gắn chỉ số đếm tự động vào từng phần tử. 2) `zip(*iterables, strict=False)` ghép các dãy dữ liệu chạy song song với nhau (từ Python 3.10 có thêm `strict=True` để báo lỗi nếu độ dài các dãy không bằng nhau). 3) `sorted(iterable, key=func, reverse=bool)` áp dụng thuật toán Timsort, trả về list đã sắp xếp mới mà không làm thay đổi dữ liệu gốc."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "builtin_sequence_tools.py",
                  "code": "users = [\"alice\", \"bob\", \"charlie\"]\nscores = [92, 78, 88]\n\n# 1. zip(strict=True) ensuring length parity\npaired_data = list(zip(users, scores, strict=True))\nprint(\"Paired:\", paired_data)\n\n# 2. sorted() with custom key function\nranked = sorted(paired_data, key=lambda item: item[1], reverse=True)\nprint(\"Ranked by score:\", ranked)\n\n# 3. enumerate() for indexed reporting\nfor rank, (name, score) in enumerate(ranked, start=1):\n    print(f\"#{rank}: {name.capitalize()} -> {score} pts\")",
                  "explanation": {
                    "en": "Demonstrates combining `zip`, `sorted(key=...)`, and `enumerate(start=1)` for clean, expressive data pipelines.",
                    "vi": "Minh họa cách kết hợp `zip`, `sorted(key=...)` và `enumerate` tạo thành luồng xử lý dữ liệu chuẩn mực và đẹp mắt."
                  }
                },
                "keyTakeaways": {
                  "en": [
                    "Comprehensions provide fast, scoped data transformation and filtering",
                    "Use generator expressions to process massive streams with O(1) memory overhead",
                    "Use `zip(..., strict=True)` to prevent silent bugs caused by uneven sequence lengths"
                  ],
                  "vi": [
                    "Comprehension giúp chuyển đổi và lọc dữ liệu nhanh, có scope riêng biệt",
                    "Dùng generator expression để xử lý luồng dữ liệu khổng lồ với dung lượng RAM O(1)",
                    "Dùng `zip(..., strict=True)` để phát hiện sớm lỗi khi các danh sách không khớp độ dài"
                  ]
                }
              }
            ],
            "chapterSummary": {
              "mentalModels": {
                "en": [
                  "Comprehensions express mathematical set builder notation for collections",
                  "Generators are lazy pipelines that yield values only when pulled by consumer loops",
                  "Built-in sequence utilities encapsulate common looping patterns in optimized C code"
                ],
                "vi": [
                  "Comprehension biểu diễn toán học cho việc xây dựng và lọc tập hợp",
                  "Generator là đường ống lười chỉ sinh giá trị khi vòng lặp phía ngoài kéo dữ liệu",
                  "Các hàm tiện ích tích hợp sẵn đóng gói các mẫu lặp thông dụng bằng mã C tối ưu"
                ]
              },
              "rules": {
                "en": [
                  "Keep comprehensions readable; avoid nesting more than 2 loops or conditions inside a single line",
                  "Pass generator expressions directly to reducing functions (e.g. `sum(x for x in data)`)",
                  "Always use `enumerate` instead of manual index incrementing (`i += 1`)"
                ],
                "vi": [
                  "Giữ comprehension dễ đọc; tránh lồng quá 2 vòng for hoặc điều kiện phức tạp trên 1 dòng",
                  "Truyền trực tiếp generator expression vào các hàm tính tổng (`sum(x for x in data)`)",
                  "Luôn dùng `enumerate` thay vì phải tự tạo biến đếm chỉ số `i += 1` thủ công"
                ]
              },
              "commonTraps": {
                "en": [
                  "Using a list comprehension when only iterating once, wasting gigabytes of memory",
                  "Forgetting that generators are single-use iterators that cannot be re-iterated once consumed"
                ],
                "vi": [
                  "Dùng list comprehension khi chỉ cần duyệt 1 lần, làm tốn hàng gigabyte RAM vô ích",
                  "Quên rằng generator chỉ duyệt được MỘT LẦN duy nhất và sẽ rỗng ở các lần duyệt sau"
                ]
              },
              "takeaway": {
                "en": "Combining comprehensions, generator expressions, and sequence tools forms the idiomatic foundation of modern, expressive Python programming.",
                "vi": "Kết hợp thuần thục comprehension, generator expression và các hàm tiện ích tạo nên nền tảng lập trình Python hiện đại, chuẩn mực và hiệu quả."
              }
            },
            "selfReview": [
              {
                "question": {
                  "en": "What is the key advantage of passing `sum(x**2 for x in numbers)` over `sum([x**2 for x in numbers])`?",
                  "vi": "Lợi thế then chốt khi viết `sum(x**2 for x in numbers)` so với `sum([x**2 for x in numbers])` là gì?"
                },
                "hint": {
                  "en": "Consider intermediate list allocation in memory.",
                  "vi": "Hãy nghĩ về việc cấp phát một danh sách trung gian trong bộ nhớ RAM."
                },
                "answer": {
                  "en": "The list comprehension `[x**2 ...]` allocates a full list of all squares in memory before computing the sum, requiring `O(N)` memory. The generator expression `(x**2 ...)` yields one square at a time to `sum()`, operating in constant `O(1)` memory regardless of how many millions of items are processed.",
                  "vi": "List comprehension `[x**2 ...]` phải cấp phát toàn bộ mảng số bình phương trên RAM trước khi tính tổng, tốn `O(N)` bộ nhớ. Trong khi đó, generator expression `(x**2 ...)` sinh từng số bình phương một cho hàm `sum()`, tiêu tốn bộ nhớ cố định `O(1)` dù xử lý hàng triệu phần tử."
                }
              }
            ]
          }
        ]
      },
      {
        "partNumber": 3,
        "title": {
          "en": "Functions, Scopes & Functional Core",
          "vi": "Hàm, Phạm Vi Biến & Lõi Hàm Học"
        },
        "description": {
          "en": "LEGB lookup rules, closures, decorators, the iteration protocol, and deterministic context managers.",
          "vi": "Quy tắc LEGB, closure, decorator, giao thức lặp và context manager quản lý tài nguyên tất định."
        },
        "chapters": [
          {
            "id": "py-hb-ch-8",
            "number": 8,
            "partNumber": 3,
            "partTitle": {
              "en": "Functions, Scopes & Functional Core",
              "vi": "Hàm, Phạm Vi Biến & Lõi Hàm Học"
            },
            "slug": "functions-parameters-scoping",
            "title": {
              "en": "Functions, Parameters & Scoping Rules",
              "vi": "Hàm, Tham Số & Quy Tắc Phạm Vi LEGB"
            },
            "summary": {
              "en": "The LEGB variable lookup hierarchy, positional-only (/) and keyword-only (*) arguments, closures and __closure__ cell objects, and global vs nonlocal semantics.",
              "vi": "Hệ thống tra cứu biến LEGB, tham số bắt buộc vị trí (/) và bắt buộc từ khóa (*), closure và đối tượng cell __closure__, ý nghĩa từ khóa global và nonlocal."
            },
            "readTimeMinutes": 19,
            "sections": [
              {
                "id": "py-hb-8-1",
                "title": {
                  "en": "The LEGB Scope Resolution Rule",
                  "vi": "Quy Tắc Phân Giải Phạm Vi Biến LEGB"
                },
                "content": {
                  "en": "When Python encounters a variable name, it searches for the symbol in strict hierarchical order: 1) **L (Local)**: Inside the current executing function frame. 2) **E (Enclosing)**: In enclosing nested function scopes from nearest to outermost. 3) **G (Global)**: At the current module top-level namespace. 4) **B (Built-in)**: In the standard built-in namespace (`builtins.__dict__`). If the symbol is not located in any of these four tiers, Python raises a `NameError`.",
                  "vi": "Khi Python gặp một tên biến, nó tìm kiếm biểu tượng đó theo thứ tự phân cấp nghiêm ngặt gọi là LEGB: 1) **L (Local)**: Trong phạm vi hàm hiện tại. 2) **E (Enclosing)**: Trong các hàm bao bọc bên ngoài từ gần nhất đến xa nhất. 3) **G (Global)**: Tại namespace cấp module hiện hành. 4) **B (Built-in)**: Trong namespace các hàm tích hợp sẵn của Python (`builtins.__dict__`). Nếu duyệt qua cả 4 cấp mà không thấy, Python sẽ báo lỗi `NameError`."
                },
                "diagram": {
                  "title": {
                    "en": "The LEGB Lookup Hierarchy",
                    "vi": "Cây Phân Cấp Tìm Kiếm Biến LEGB Trong Python"
                  },
                  "steps": [
                    {
                      "number": 1,
                      "label": {
                        "en": "L — Local Scope",
                        "vi": "L — Cục Bộ (Local)"
                      },
                      "description": {
                        "en": "Searches local function frame fast locals array.",
                        "vi": "Tìm trong mảng biến cục bộ của hàm đang thực thi."
                      }
                    },
                    {
                      "number": 2,
                      "label": {
                        "en": "E — Enclosing Scope",
                        "vi": "E — Bao Ngoài (Enclosing)"
                      },
                      "description": {
                        "en": "Searches closure cells in surrounding outer functions.",
                        "vi": "Tìm trong các cell closure của các hàm bao ngoài."
                      }
                    },
                    {
                      "number": 3,
                      "label": {
                        "en": "G — Global Scope",
                        "vi": "G — Toàn Cục (Global)"
                      },
                      "description": {
                        "en": "Searches current module __dict__ namespace.",
                        "vi": "Tìm trong dictionary namespace của module hiện tại."
                      }
                    },
                    {
                      "number": 4,
                      "label": {
                        "en": "B — Built-in Scope",
                        "vi": "B — Tích Hợp (Built-in)"
                      },
                      "description": {
                        "en": "Searches builtins namespace (len, range, print, exceptions).",
                        "vi": "Tìm trong namespace mặc định của ngôn ngữ (len, range, print)."
                      }
                    }
                  ]
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "legb_resolution.py",
                  "code": "level = \"GLOBAL\"\n\ndef outer_function():\n    level = \"ENCLOSING\"\n\n    def inner_function():\n        level = \"LOCAL\"\n        print(\"Resolved tier:\", level)  # Resolves 'LOCAL' first\n\n    inner_function()\n\nouter_function()",
                  "explanation": {
                    "en": "Demonstrates Python resolving the innermost variable binding first before searching enclosing scopes.",
                    "vi": "Minh họa Python luôn ưu tiên biến ở phạm vi cục bộ gần nhất trước khi tìm ra ngoài."
                  }
                }
              },
              {
                "id": "py-hb-8-2",
                "title": {
                  "en": "Positional-Only (/) & Keyword-Only (*) Parameters",
                  "vi": "Tham Số Bắt Buộc Vị Trí (/) & Bắt Buộc Từ Khóa (*)"
                },
                "content": {
                  "en": "Modern Python (PEP 570 and PEP 3102) allows API authors to strictly control parameter calling conventions: 1) Parameters before `/` are **Positional-Only** (callers cannot pass them by name, allowing library maintainers to rename parameters later without breaking callers). 2) Parameters after `*` are **Keyword-Only** (callers must explicitly pass `name=value`, preventing ambiguous boolean arguments).",
                  "vi": "Python hiện đại (PEP 570 và PEP 3102) cho phép thiết kế API chuẩn mực bằng cách kiểm soát cách gọi tham số: 1) Các tham số đứng trước dấu `/` là **Bắt buộc vị trí (Positional-Only)** (không thể gọi bằng tên, giúp tác giả thư viện thoải mái đổi tên biến sau này mà không làm hỏng code người dùng). 2) Các tham số đứng sau dấu `*` là **Bắt buộc từ khóa (Keyword-Only)** (bắt buộc phải truyền `key=value`, tránh việc truyền các cờ boolean mơ hồ khó hiểu)."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "parameter_design.py",
                  "code": "def query_users(\n    endpoint: str,          # Positional or keyword\n    /,                      # Preceding arguments are POSITIONAL-ONLY\n    max_results: int = 50,  # Positional or keyword\n    *,                      # Succeeding arguments are KEYWORD-ONLY\n    include_deleted: bool = False,\n    timeout_seconds: float = 5.0\n) -> list:\n    return []\n\n# Valid Calls\nquery_users(\"https://api.internal/v1/users\", 100, include_deleted=True)\nquery_users(\"https://api.internal/v1/users\", max_results=20, timeout_seconds=2.0)\n\n# Invalid Calls (Will raise TypeError):\n# query_users(endpoint=\"...\") -> TypeError: positional-only argument passed as keyword\n# query_users(\"...\", 50, True)  -> TypeError: takes 2 positional arguments but 3 were given",
                  "explanation": {
                    "en": "Shows strict API contracts using `/` to enforce positional arguments and `*` to mandate keyword clarity for boolean flags.",
                    "vi": "Minh họa thiết kế API chuẩn mực với `/` để bắt buộc truyền vị trí và `*` để bắt buộc truyền tên rõ ràng cho các cờ boolean."
                  }
                }
              },
              {
                "id": "py-hb-8-3",
                "title": {
                  "en": "Closures & __closure__ Cell Objects",
                  "vi": "Bản Chất Closure & Đối Tượng Cell __closure__"
                },
                "content": {
                  "en": "A **Closure** is a nested function that retains access to variables from its lexical enclosing scope even after the outer function has finished executing and exited the call stack. CPython implements closures using **Cell Objects** (`PyCellObject`). Free variables referenced by inner functions are wrapped into shared cells attached to `inner_function.__closure__`, keeping the underlying heap objects alive via reference counting.",
                  "vi": "Một **Closure** là một hàm lồng nhau giữ lại quyền truy cập vào các biến từ phạm vi hàm bao ngoài của nó ngay cả khi hàm bao ngoài đã chạy xong và rút khỏi call stack. CPython hiện thực closure bằng các **Đối Tượng Cell (`PyCellObject`)**. Các biến tự do được bọc trong các cell dùng chung gắn vào `inner_function.__closure__`, giữ cho các đối tượng trên heap sống tiếp nhờ bộ đếm tham chiếu."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "closure_inspection.py",
                  "code": "def make_rate_limiter(max_requests: int):\n    # 'max_requests' is captured inside the closure cell\n    count = 0\n\n    def record_request() -> bool:\n        nonlocal count\n        if count < max_requests:\n            count += 1\n            return True\n        return False\n\n    return record_request\n\nlimiter = make_rate_limiter(2)\nprint(\"Request 1:\", limiter())  # True\nprint(\"Request 2:\", limiter())  # True\nprint(\"Request 3:\", limiter())  # False\n\n# Inspect closure cells\nprint(\"Closure cell contents:\", [cell.cell_contents for cell in limiter.__closure__])",
                  "explanation": {
                    "en": "`nonlocal` allows mutating variables in enclosing scopes, while `__closure__` reveals the underlying memory cells maintaining state.",
                    "vi": "Từ khóa `nonlocal` cho phép thay đổi giá trị biến ở hàm bao ngoài, và `__closure__` cho thấy các cell bộ nhớ đang lưu giữ trạng thái."
                  }
                },
                "keyTakeaways": {
                  "en": [
                    "Python resolves symbols using the LEGB (Local, Enclosing, Global, Built-in) rule",
                    "Use `/` for positional-only and `*` for keyword-only parameters to design robust APIs",
                    "Closures capture enclosing variables in heap-allocated `__closure__` cell objects"
                  ],
                  "vi": [
                    "Python tìm kiếm biến theo thứ tự LEGB (Local, Enclosing, Global, Built-in)",
                    "Dùng `/` cho tham số vị trí và `*` cho tham số từ khóa để xây dựng API chuẩn",
                    "Closure lưu giữ biến của hàm bao ngoài trong các đối tượng cell trên bộ nhớ heap"
                  ]
                }
              }
            ],
            "chapterSummary": {
              "mentalModels": {
                "en": [
                  "Variable names are resolved outward across nested lexical lexical dictionaries",
                  "Closures are functions bundled with their enclosing environment cells",
                  "Parameter markers (/ and *) create unambiguous call-site contracts"
                ],
                "vi": [
                  "Tên biến được tra cứu mở rộng dần ra các dictionary namespace bao ngoài",
                  "Closure là hàm đi kèm với các cell môi trường bao ngoài của nó",
                  "Ký hiệu (/ và *) tạo ra hợp đồng gọi hàm rõ ràng và an toàn"
                ]
              },
              "rules": {
                "en": [
                  "Use `nonlocal` when re-binding a variable from an enclosing outer function",
                  "Use keyword-only parameters for boolean flags to eliminate unreadable boolean call sites (`update(True, False)`)",
                  "Avoid shadowing built-in names (e.g., do not name variables `list`, `dict`, `id`, `type`)"
                ],
                "vi": [
                  "Dùng từ khóa `nonlocal` khi cần gán lại giá trị cho biến của hàm bao ngoài",
                  "Dùng tham số keyword-only cho cờ boolean để tránh viết code khó hiểu (`update(True, False)`)",
                  "Tuyệt đối không đặt tên biến trùng với từ khóa tích hợp sẵn (`list`, `dict`, `id`, `type`)"
                ]
              },
              "commonTraps": {
                "en": [
                  "Late-binding closure variable trap inside loops (creating functions that all capture the final loop index)",
                  "Assigning to a global variable inside a function without the `global` keyword causing `UnboundLocalError`"
                ],
                "vi": [
                  "Bẫy biến late-binding trong vòng lặp (tạo các hàm lambda nhưng đều dính giá trị cuối của vòng lặp)",
                  "Gán giá trị cho biến global trong hàm mà quên khai báo `global` gây lỗi `UnboundLocalError`"
                ]
              },
              "takeaway": {
                "en": "Mastering LEGB scoping, parameter contracts, and closure cells forms the bedrock for writing robust functional and decorated Python architectures.",
                "vi": "Nắm vững quy tắc phạm vi LEGB, thiết kế tham số và cơ chế closure là nền tảng cốt lõi để viết code hàm học và decorator chuyên nghiệp trong Python."
              }
            },
            "selfReview": [
              {
                "question": {
                  "en": "Why does `funcs = [lambda: i for i in range(3)]; [f() for f in funcs]` evaluate to `[2, 2, 2]` instead of `[0, 1, 2]`?",
                  "vi": "Tại sao đoạn mã `funcs = [lambda: i for i in range(3)]; [f() for f in funcs]` lại trả về `[2, 2, 2]` thay vì `[0, 1, 2]`?"
                },
                "hint": {
                  "en": "Consider when closure variables are looked up (definition time vs execution time).",
                  "vi": "Hãy nghĩ về thời điểm biến closure được tra cứu (lúc định nghĩa hay lúc thực thi hàm)."
                },
                "answer": {
                  "en": "Python closures use late binding: variables in closures are looked up when the inner function is CALLED, not when it is defined. By the time `f()` is executed, the loop has completed and the shared variable `i` is `2`. To fix this, bind the current value immediately as a default argument: `lambda i=i: i`.",
                  "vi": "Closure trong Python áp dụng cơ chế late-binding: biến trong closure được tra cứu tại thời điểm hàm ĐƯỢC GỌI, chứ không phải lúc định nghĩa. Khi các hàm `f()` chạy thì vòng lặp đã kết thúc và biến `i` đang mang giá trị `2`. Để khắc phục, hãy gán giá trị tại chỗ qua tham số mặc định: `lambda i=i: i`."
                }
              }
            ]
          },
          {
            "id": "py-hb-ch-9",
            "number": 9,
            "partNumber": 3,
            "partTitle": {
              "en": "Functions, Scopes & Functional Core",
              "vi": "Hàm, Phạm Vi Biến & Lõi Hàm Học"
            },
            "slug": "functions-closures-decorators",
            "title": {
              "en": "First-Class Functions & Decorators",
              "vi": "Hàm First-Class & Cơ Chế Decorators"
            },
            "summary": {
              "en": "Functions as first-class objects, decorator transformation mechanics, metadata preservation with functools.wraps, parameterized decorator factories, and class decorators.",
              "vi": "Bản chất hàm là đối tượng hạng nhất, cơ chế biến đổi decorator, bảo toàn metadata bằng functools.wraps, decorator có tham số và class decorator."
            },
            "readTimeMinutes": 20,
            "sections": [
              {
                "id": "py-hb-9-1",
                "title": {
                  "en": "Functions as First-Class Objects & Decorator Syntax",
                  "vi": "Hàm Là Đối Tượng Hạng Nhất & Cú Pháp Decorator"
                },
                "content": {
                  "en": "In Python, functions are **first-class citizens**: they can be assigned to variables, passed as arguments to other functions, and returned from functions dynamically. The `@decorator` syntax is pure syntactic sugar for higher-order function composition. Writing `@my_decorator\ndef my_func(): ...` is 100% equivalent to `my_func = my_decorator(my_func)` evaluated when the module loads.",
                  "vi": "Trong Python, hàm là **đối tượng hạng nhất (first-class citizens)**: chúng có thể được gán vào biến, truyền làm tham số cho hàm khác và trả về từ một hàm như bất kỳ đối tượng nào. Cú pháp `@decorator` thực chất là cú pháp rút gọn cho phép hợp hàm bậc cao. Viết `@my_decorator\ndef my_func(): ...` hoàn toàn tương đương với phép gán `my_func = my_decorator(my_func)` khi nạp module."
                },
                "diagram": {
                  "title": {
                    "en": "Decorator Transformation Pipeline",
                    "vi": "Quy Trình Chuyển Đổi Của Decorator"
                  },
                  "steps": [
                    {
                      "number": 1,
                      "label": {
                        "en": "Function Defined",
                        "vi": "Định Nghĩa Hàm Gốc"
                      },
                      "description": {
                        "en": "Original function object is compiled into memory.",
                        "vi": "Hàm gốc được biên dịch và tạo đối tượng trên bộ nhớ."
                      }
                    },
                    {
                      "number": 2,
                      "label": {
                        "en": "Decorator Interception",
                        "vi": "Decorator Tiếp Nhận"
                      },
                      "description": {
                        "en": "Decorator receives original function as argument.",
                        "vi": "Hàm decorator nhận hàm gốc làm tham số đầu vào."
                      }
                    },
                    {
                      "number": 3,
                      "label": {
                        "en": "Wrapper Replacement",
                        "vi": "Thay Thế Bằng Wrapper"
                      },
                      "description": {
                        "en": "Decorator returns wrapper function; symbol name is re-bound to wrapper.",
                        "vi": "Decorator trả về hàm wrapper; tên hàm ban đầu được gán lại vào wrapper."
                      }
                    }
                  ]
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "basic_timing_decorator.py",
                  "code": "import functools\nimport time\nfrom typing import Callable, Any\n\ndef timer(func: Callable) -> Callable:\n    @functools.wraps(func)  # Preserves __name__, __doc__, and type annotations\n    def wrapper(*args: Any, **kwargs: Any) -> Any:\n        start_time = time.perf_counter()\n        result = func(*args, **kwargs)\n        duration = time.perf_counter() - start_time\n        print(f\"Executed [{func.__name__}] in {duration * 1000:.2f}ms\")\n        return result\n    return wrapper\n\n@timer\ndef process_batch(items: list[int]) -> int:\n    \"\"\"Calculates sum of squared integers.\"\"\"\n    return sum(x**2 for x in items)\n\ntotal = process_batch([1, 2, 3, 4, 5])\nprint(\"Function name preserved:\", process_batch.__name__)  # 'process_batch'\nprint(\"Docstring preserved:\", process_batch.__doc__)        # 'Calculates sum...'",
                  "explanation": {
                    "en": "Demonstrates implementing a timing decorator and using `functools.wraps` to preserve critical function introspection metadata.",
                    "vi": "Minh họa cách viết decorator đo thời gian chạy và dùng `functools.wraps` để bảo toàn metadata phản chiếu của hàm gốc."
                  }
                }
              },
              {
                "id": "py-hb-9-2",
                "title": {
                  "en": "Parameterized Decorators (Decorator Factories)",
                  "vi": "Decorator Có Tham Số (Decorator Factory)"
                },
                "content": {
                  "en": "When a decorator needs custom configuration arguments (such as `@retry(max_attempts=3, backoff=2.0)`), you must implement a **3-tier Decorator Factory**. The outer function accepts the configuration arguments and returns the actual decorator function, which in turn accepts the target function and returns the final wrapper.",
                  "vi": "Khi decorator cần nhận các tham số tùy chỉnh (như `@retry(max_attempts=3, backoff=2.0)`), bạn phải xây dựng **Decorator Factory gồm 3 tầng lồng nhau**. Tầng ngoài cùng nhận tham số cấu hình và trả về hàm decorator thực sự; tầng này nhận hàm cần bọc và trả về hàm wrapper cuối cùng."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "retry_decorator_factory.py",
                  "code": "import functools\nimport time\nfrom typing import Callable, Type\n\ndef retry(max_attempts: int = 3, delay: float = 0.5, exceptions: tuple[Type[Exception], ...] = (Exception,)):\n    \"\"\"Decorator factory that retries flaky network/database calls.\"\"\"\n    def decorator(func: Callable) -> Callable:\n        @functools.wraps(func)\n        def wrapper(*args, **kwargs):\n            last_err = None\n            for attempt in range(1, max_attempts + 1):\n                try:\n                    return func(*args, **kwargs)\n                except exceptions as e:\n                    last_err = e\n                    if attempt < max_attempts:\n                        time.sleep(delay)\n            raise last_err\n        return wrapper\n    return decorator\n\n@retry(max_attempts=3, delay=0.1, exceptions=(ConnectionError, TimeoutError))\ndef fetch_user_data(user_id: str) -> dict:\n    # Simulates network request\n    return {\"id\": user_id, \"status\": \"active\"}",
                  "explanation": {
                    "en": "A 3-tier closure factory that encapsulates retry policies cleanly without polluting business code.",
                    "vi": "Cấu trúc closure 3 tầng đóng gói cơ chế retry một cách sạch sẽ mà không làm rối mã nghiệp vụ."
                  }
                },
                "keyTakeaways": {
                  "en": [
                    "Decorators wrap and transform functions at module load time",
                    "Always apply `@functools.wraps(func)` inside wrappers to preserve introspection metadata",
                    "Parameterized decorators require a 3-tier factory returning a decorator function"
                  ],
                  "vi": [
                    "Decorator bọc và biến đổi hàm ngay tại thời điểm nạp module",
                    "Luôn gắn `@functools.wraps(func)` trong wrapper để bảo toàn thông tin metadata phản chiếu",
                    "Decorator có tham số yêu cầu cấu trúc factory 3 tầng trả về hàm decorator"
                  ]
                }
              }
            ],
            "chapterSummary": {
              "mentalModels": {
                "en": [
                  "Decorators are higher-order function transformers that re-bind function symbols",
                  "Wrapper functions intercept calls, execute pre/post logic, and forward return values"
                ],
                "vi": [
                  "Decorator là bộ biến đổi hàm bậc cao gán lại biểu tượng hàm cho wrapper mới",
                  "Hàm wrapper chặn trước và sau khi gọi hàm gốc, chuyển tiếp giá trị trả về"
                ]
              },
              "rules": {
                "en": [
                  "Never forget `@functools.wraps(func)` to prevent breaking docstrings and debugger inspection",
                  "Always accept `*args, **kwargs` in wrapper functions to support arbitrary call signatures"
                ],
                "vi": [
                  "Không bao giờ quên `@functools.wraps(func)` để tránh làm mất docstring và làm hỏng debugger",
                  "Luôn nhận `*args, **kwargs` trong wrapper để tương thích với mọi dạng chữ ký hàm"
                ]
              },
              "commonTraps": {
                "en": [
                  "Assuming decorator code inside the outer function runs per request (it runs once at module import)",
                  "Forgetting to return the inner wrapper from the decorator function"
                ],
                "vi": [
                  "Lầm tưởng mã ở tầng ngoài decorator chạy mỗi khi gọi hàm (thực tế chỉ chạy 1 lần khi import)",
                  "Quên câu lệnh `return wrapper` ở cuối hàm decorator"
                ]
              },
              "takeaway": {
                "en": "Decorators are the premier abstraction for cross-cutting concerns (logging, authentication, caching, retries) in idiomatic Python.",
                "vi": "Decorator là giải pháp trừu tượng hóa hàng đầu cho các tác vụ cắt ngang (logging, xác thực, cache, retry) trong lập trình Python chuẩn mực."
              }
            },
            "selfReview": [
              {
                "question": {
                  "en": "What happens if you omit `@functools.wraps(func)` in a decorator wrapper?",
                  "vi": "Điều gì xảy ra nếu bạn không sử dụng `@functools.wraps(func)` trong hàm wrapper của decorator?"
                },
                "hint": {
                  "en": "Consider `__name__`, `__doc__`, and `__annotations__` attributes.",
                  "vi": "Hãy nghĩ về các thuộc tính phản chiếu như `__name__`, `__doc__` và `__annotations__`."
                },
                "answer": {
                  "en": "Without `@functools.wraps(func)`, the decorated function permanently assumes the identity of the wrapper function. Its `__name__` becomes `\"wrapper\"`, `__doc__` is erased or replaced by the wrapper docstring, and type signature introspection in tools like Sphinx, FastAPI, and debuggers breaks.",
                  "vi": "Nếu thiếu `@functools.wraps(func)`, hàm được bọc sẽ mang danh tính của hàm wrapper. Thuộc tính `__name__` bị đổi thành `\"wrapper\"`, `__doc__` bị mất hoặc ghi đè, làm hỏng các công cụ tự động sinh tài liệu như Sphinx, FastAPI và công cụ debug."
                }
              }
            ]
          },
          {
            "id": "py-hb-ch-10",
            "number": 10,
            "partNumber": 3,
            "partTitle": {
              "en": "Functions, Scopes & Functional Core",
              "vi": "Hàm, Phạm Vi Biến & Lõi Hàm Học"
            },
            "slug": "iterators-generators-protocol",
            "title": {
              "en": "Iterators, Generators & The Iteration Protocol",
              "vi": "Iterators, Generators & Giao Thức Lặp"
            },
            "summary": {
              "en": "The iteration protocol (__iter__ and __next__), generator frame pausing and resumption mechanics, StopIteration signaling, and subgenerator delegation with yield from.",
              "vi": "Giao thức lặp (__iter__ và __next__), cơ chế tạm dừng và tiếp tục frame của generator, tín hiệu StopIteration và ủy quyền generator con với yield from."
            },
            "readTimeMinutes": 21,
            "sections": [
              {
                "id": "py-hb-10-1",
                "title": {
                  "en": "The Iteration Protocol: __iter__ & __next__",
                  "vi": "Giao Thức Lặp: Phương Thức __iter__ & __next__"
                },
                "content": {
                  "en": "Iteration is the backbone of Python data processing. The **Iteration Protocol** establishes two distinct contracts: 1) An **Iterable** is an object providing an `__iter__()` method that returns an Iterator. 2) An **Iterator** is a stateful object providing a `__next__()` method that returns the next sequential item or raises a `StopIteration` exception when the stream is exhausted. Iterators also implement `__iter__()` returning `self`, allowing them to be consumed directly in `for` loops.",
                  "vi": "Vòng lặp là xương sống trong xử lý dữ liệu của Python. **Giao thức lặp (Iteration Protocol)** quy định 2 hợp đồng phân biệt: 1) **Iterable** là đối tượng có phương thức `__iter__()` trả về một Iterator. 2) **Iterator** là đối tượng lưu trạng thái có phương thức `__next__()` trả về phần tử tiếp theo hoặc phát ra exception `StopIteration` khi luồng dữ liệu kết thúc. Bản thân Iterator cũng có phương thức `__iter__()` trả về chính nó (`self`), giúp nó chạy trực tiếp trong vòng lặp `for`."
                },
                "diagram": {
                  "title": {
                    "en": "Python Iteration Protocol State Machine",
                    "vi": "Máy Trạng Thái Của Giao Thức Lặp Trong Python"
                  },
                  "steps": [
                    {
                      "number": 1,
                      "label": {
                        "en": "Request Iterator",
                        "vi": "Lấy Iterator"
                      },
                      "description": {
                        "en": "for item in obj calls iterator = iter(obj) -> obj.__iter__().",
                        "vi": "Vòng for gọi iterator = iter(obj) để nhận đối tượng iterator."
                      }
                    },
                    {
                      "number": 2,
                      "label": {
                        "en": "Fetch Next Item",
                        "vi": "Lấy Phần Tử Tiếp Theo"
                      },
                      "description": {
                        "en": "VM calls next(iterator) -> iterator.__next__() returning value.",
                        "vi": "Máy ảo gọi next(iterator) để lấy giá trị tiếp theo."
                      }
                    },
                    {
                      "number": 3,
                      "label": {
                        "en": "StopIteration Exit",
                        "vi": "Kết Thúc Bằng StopIteration"
                      },
                      "description": {
                        "en": "When stream ends, __next__() raises StopIteration; loop catches and terminates cleanly.",
                        "vi": "Khi hết dữ liệu, __next__() bắn StopIteration; vòng for bắt lỗi và dừng mượt mà."
                      }
                    }
                  ]
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "custom_iterator.py",
                  "code": "class Countdown:\n    def __init__(self, start: int):\n        self.current = start\n\n    def __iter__(self):\n        return self\n\n    def __next__(self) -> int:\n        if self.current <= 0:\n            raise StopIteration\n        value = self.current\n        self.current -= 1\n        return value\n\n# Consuming custom iterator\nfor num in Countdown(3):\n    print(f\"T-minus {num}\")",
                  "explanation": {
                    "en": "Demonstrates implementing `__iter__` and `__next__` to create a custom stateful iterator that signals termination via `StopIteration`.",
                    "vi": "Minh họa cài đặt `__iter__` và `__next__` để tạo iterator lưu trạng thái tùy chỉnh kết thúc bằng `StopIteration`."
                  }
                }
              },
              {
                "id": "py-hb-10-2",
                "title": {
                  "en": "Generator Functions: Frame Pausing & yield Mechanics",
                  "vi": "Hàm Generator: Cơ Chế Đóng Băng Frame & Lệnh yield"
                },
                "content": {
                  "en": "A **Generator Function** is any function containing the `yield` keyword. When invoked, it does NOT execute the function body immediately; instead, it returns a `generator` object. When `next()` is called on the generator, CPython executes the frame until it reaches a `yield` statement. The VM yields the value, freezes the execution frame (preserving all local variable registers and instruction pointers on the heap), and transfers control back to the caller.",
                  "vi": "Một **Hàm Generator** là bất kỳ hàm nào chứa từ khóa `yield`. Khi được gọi, nó KHÔNG chạy mã trong thân hàm ngay mà trả về một đối tượng `generator`. Khi gọi `next()` trên generator, CPython thực thi frame cho đến khi gặp lệnh `yield`. Máy ảo trả về giá trị, đóng băng khung thực thi (lưu toàn bộ biến cục bộ và con trỏ chỉ thị trên heap) rồi nhường quyền điều khiển lại cho caller."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "streaming_log_reader.py",
                  "code": "from typing import Iterator\n\ndef stream_large_log(file_path: str) -> Iterator[str]:\n    \"\"\"Yields log lines matching 'ERROR' one-by-one with O(1) memory.\"\"\"\n    with open(file_path, \"r\", encoding=\"utf-8\") as file:\n        for line in file:\n            if \"ERROR\" in line:\n                yield line.strip()\n\n# Lazy consumption over multi-gigabyte file\n# for err in stream_large_log(\"production.log\"):\n#     alert_sre_team(err)",
                  "explanation": {
                    "en": "Generators turn unbounded file streams into lazy memory-safe pipelines.",
                    "vi": "Generator biến các file log nhiều gigabyte thành đường ống xử lý an toàn bộ nhớ."
                  }
                }
              },
              {
                "id": "py-hb-10-3",
                "title": {
                  "en": "Subgenerator Delegation with yield from",
                  "vi": "Ủy Quyền Generator Con Với yield from"
                },
                "content": {
                  "en": "The `yield from <iterable>` syntax (PEP 380) establishes a transparent bi-directional communication channel between a caller and a nested subgenerator. It automatically yields all values from the subgenerator, forwards incoming values sent via `.send()`, forwards exceptions thrown via `.throw()`, and captures the subgenerator return value (`return result`) directly into an assignment expression.",
                  "vi": "Cú pháp `yield from <iterable>` (PEP 380) thiết lập kênh giao tiếp hai chiều trong suốt giữa caller và generator con lồng bên trong. Nó tự động yield toàn bộ giá trị từ generator con, chuyển tiếp các giá trị gửi vào qua `.send()`, chuyển tiếp ngoại lệ qua `.throw()` và bắt giá trị `return` của generator con trực tiếp vào biến."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "yield_from_chaining.py",
                  "code": "def flatten_tree(node):\n    if isinstance(node, list):\n        for child in node:\n            yield from flatten_tree(child)  # Delegate to nested subgenerator\n    else:\n        yield node\n\nnested_tree = [1, [2, [3, 4], 5], [6, 7]]\nprint(\"Flattened tree:\", list(flatten_tree(nested_tree)))  # [1, 2, 3, 4, 5, 6, 7]",
                  "explanation": {
                    "en": "Demonstrates elegant recursive flattening using `yield from` subgenerator delegation.",
                    "vi": "Minh họa cách làm phẳng cây đệ quy thanh lịch bằng cơ chế ủy quyền `yield from`."
                  }
                },
                "keyTakeaways": {
                  "en": [
                    "The iteration protocol requires `__iter__()` on Iterables and `__next__()` on Iterators",
                    "`yield` pauses the function frame on the heap, resuming seamlessly on the next call",
                    "Use `yield from` to delegate iteration cleanly to nested subgenerators"
                  ],
                  "vi": [
                    "Giao thức lặp yêu cầu `__iter__()` trên Iterable và `__next__()` trên Iterator",
                    "`yield` đóng băng frame hàm trên heap và tiếp tục chạy mượt mà ở lần gọi kế tiếp",
                    "Dùng `yield from` để ủy quyền duyệt dữ liệu cho các generator con lồng nhau"
                  ]
                }
              }
            ],
            "chapterSummary": {
              "mentalModels": {
                "en": [
                  "Iterators are unidirectional stateful streams driven by pull requests (next())",
                  "Generators are resumable stack frames preserved in heap memory across yields"
                ],
                "vi": [
                  "Iterator là luồng dữ liệu 1 chiều có lưu trạng thái hoạt động theo cơ chế kéo (pull)",
                  "Generator là các stack frame có thể đóng băng và phục hồi nằm trên bộ nhớ heap"
                ]
              },
              "rules": {
                "en": [
                  "Always signal the end of a custom iterator stream by raising `StopIteration`",
                  "Use generators whenever transforming large or infinite sequence streams"
                ],
                "vi": [
                  "Luôn báo hiệu kết thúc luồng dữ liệu của iterator tùy chỉnh bằng lỗi `StopIteration`",
                  "Dùng generator bất cứ khi nào xử lý chuỗi dữ liệu lớn hoặc vô hạn"
                ]
              },
              "commonTraps": {
                "en": [
                  "Attempting to re-iterate a generator that has already been exhausted",
                  "Catching StopIteration inside a generator function without converting it to return (PEP 479)"
                ],
                "vi": [
                  "Cố gắng duyệt lại một generator đã duyệt xong (nó sẽ luôn rỗng)",
                  "Để lộ StopIteration bên trong generator mà không dùng return (vi phạm PEP 479)"
                ]
              },
              "takeaway": {
                "en": "The iteration protocol and generators transform memory-heavy data pipelines into blazing-fast, constant-memory stream processors.",
                "vi": "Giao thức lặp và generator biến các luồng xử lý tốn bộ nhớ thành các đường ống stream tốc độ cao với dung lượng RAM cố định O(1)."
              }
            },
            "selfReview": [
              {
                "question": {
                  "en": "What is the difference between an Iterable and an Iterator in Python?",
                  "vi": "Sự khác biệt giữa Iterable và Iterator trong Python là gì?"
                },
                "hint": {
                  "en": "Check which one possesses state and the `__next__` method.",
                  "vi": "Hãy xem đối tượng nào lưu trạng thái vị trí và sở hữu phương thức `__next__`."
                },
                "answer": {
                  "en": "An Iterable is any collection (like `list`, `dict`, `str`) that implements `__iter__()` returning a new Iterator. An Iterator is a stateful object that implements `__next__()` (advancing through the sequence) and `__iter__()` (returning itself). Iterables can be iterated many times; Iterators are single-pass streams.",
                  "vi": "Iterable là tập hợp (như `list`, `dict`, `str`) có phương thức `__iter__()` trả về một Iterator mới. Iterator là đối tượng lưu vị trí con trỏ có phương thức `__next__()` và `__iter__()` trả về chính nó. Iterable duyệt lại được nhiều lần; Iterator chỉ duyệt được 1 lần."
                }
              }
            ]
          },
          {
            "id": "py-hb-ch-11",
            "number": 11,
            "partNumber": 3,
            "partTitle": {
              "en": "Functions, Scopes & Functional Core",
              "vi": "Hàm, Phạm Vi Biến & Lõi Hàm Học"
            },
            "slug": "context-managers-resources",
            "title": {
              "en": "Context Managers & Resource Management",
              "vi": "Context Managers & Quản Lý Tài Nguyên"
            },
            "summary": {
              "en": "The context manager protocol (__enter__ and __exit__), exception suppression rules, the contextlib.contextmanager generator pattern, and async context managers.",
              "vi": "Giao thức context manager (__enter__ và __exit__), quy tắc triệt tiêu ngoại lệ, mẫu generator contextlib.contextmanager và async context manager."
            },
            "readTimeMinutes": 18,
            "sections": [
              {
                "id": "py-hb-11-1",
                "title": {
                  "en": "The Context Manager Protocol: __enter__ & __exit__",
                  "vi": "Giao Thức Context Manager: __enter__ & __exit__"
                },
                "content": {
                  "en": "The `with` statement guarantees deterministic resource acquisition and release (RAII pattern) even if unhandled exceptions occur. The **Context Manager Protocol** consists of two magic methods: 1) `__enter__()`: Prepares the resource (e.g., opens a file, acquires a thread lock, starts a database transaction) and returns the bound target object. 2) `__exit__(exc_type, exc_val, exc_tb)`: Always executes upon leaving the block, releasing resources. If an exception occurred inside the block, returning `True` from `__exit__` suppresses the exception; returning `False` or `None` allows it to propagate.",
                  "vi": "Câu lệnh `with` đảm bảo việc cấp phát và giải phóng tài nguyên một cách tất định (mẫu RAII) ngay cả khi có lỗi xảy ra. **Giao thức Context Manager** gồm 2 phương thức đặc biệt: 1) `__enter__()`: Chuẩn bị tài nguyên (mở file, khóa thread lock, mở transaction DB) và trả về đối tượng liên kết. 2) `__exit__(exc_type, exc_val, exc_tb)`: Luôn luôn được gọi khi thoát khỏi khối `with` để dọn dẹp tài nguyên. Nếu có ngoại lệ phát sinh trong khối, trả về `True` từ `__exit__` sẽ dập tắt lỗi; trả về `False` hoặc `None` sẽ để lỗi tiếp tục bắn ra ngoài."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "custom_context_manager.py",
                  "code": "import time\nfrom typing import Optional, Type\nfrom types import TracebackType\n\nclass ExecutionBenchmark:\n    def __init__(self, label: str):\n        self.label = label\n        self.start_time: float = 0.0\n\n    def __enter__(self) -> \"ExecutionBenchmark\":\n        self.start_time = time.perf_counter()\n        return self\n\n    def __exit__(\n        self,\n        exc_type: Optional[Type[BaseException]],\n        exc_val: Optional[BaseException],\n        exc_tb: Optional[TracebackType]\n    ) -> bool:\n        duration = time.perf_counter() - self.start_time\n        print(f\"[{self.label}] Elapsed: {duration * 1000:.2f}ms\")\n        if exc_type is not None:\n            print(f\"[{self.label}] Handled exception: {exc_val}\")\n        return False  # Do not suppress exceptions\n\nwith ExecutionBenchmark(\"Matrix Inversion\"):\n    total = sum(i**2 for i in range(100_000))",
                  "explanation": {
                    "en": "Demonstrates implementing `__enter__` and `__exit__` with full type signatures for exception handling and cleanup.",
                    "vi": "Minh họa cách cài đặt `__enter__` và `__exit__` với đầy đủ type annotation để xử lý ngoại lệ và dọn dẹp tài nguyên."
                  }
                }
              },
              {
                "id": "py-hb-11-2",
                "title": {
                  "en": "The contextlib.contextmanager Generator Factory",
                  "vi": "Mẫu Tạo Context Manager Nhanh Bằng contextlib.contextmanager"
                },
                "content": {
                  "en": "Implementing boilerplate classes with `__enter__` and `__exit__` is often verbose. The standard library `@contextlib.contextmanager` decorator converts a simple generator function into a full context manager. Code before the `yield` statement acts as `__enter__`, the yielded value is bound to the `as` target, and code inside a `finally:` block after `yield` executes reliably as `__exit__`.",
                  "vi": "Viết class với `__enter__` và `__exit__` đôi khi dài dòng. Decorator `@contextlib.contextmanager` trong thư viện chuẩn cho phép biến một hàm generator đơn giản thành một context manager hoàn chỉnh. Phần mã trước `yield` đóng vai trò là `__enter__`, giá trị được `yield` sẽ gán vào biến sau `as`, và phần mã trong khối `finally:` sau `yield` sẽ chạy như `__exit__`."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "contextmanager_decorator.py",
                  "code": "import contextlib\nimport os\n\n@contextlib.contextmanager\ndef temporary_working_directory(target_path: str):\n    \"\"\"Safely switches current working directory and restores it on exit.\"\"\"\n    previous_dir = os.getcwd()\n    try:\n        os.chdir(target_path)\n        yield target_path\n    finally:\n        os.chdir(previous_dir)\n\n# Usage ensures directory restoration even if exceptions occur inside block\n# with temporary_working_directory(\"/tmp\"):\n#     process_artifacts()",
                  "explanation": {
                    "en": "The `try...finally` structure guarantees directory restoration regardless of success or failure.",
                    "vi": "Cấu trúc `try...finally` đảm bảo thư mục làm việc luôn được hoàn trả trạng thái cũ dù thành công hay gặp lỗi."
                  }
                },
                "keyTakeaways": {
                  "en": [
                    "Context managers enforce deterministic resource cleanup via `with` blocks",
                    "`__exit__` receives exception details; returning `True` suppresses the error",
                    "Use `@contextlib.contextmanager` to write concise generator-based context managers"
                  ],
                  "vi": [
                    "Context manager đảm bảo dọn dẹp tài nguyên tất định thông qua khối `with`",
                    "`__exit__` nhận thông tin ngoại lệ; trả về `True` sẽ dập tắt lỗi đó",
                    "Dùng `@contextlib.contextmanager` để viết context manager nhanh gọn bằng generator"
                  ]
                }
              }
            ],
            "chapterSummary": {
              "mentalModels": {
                "en": [
                  "Context managers wrap code blocks in deterministic setup and teardown guarantees",
                  "Exceptions inside `with` blocks are routed through `__exit__` before propagating"
                ],
                "vi": [
                  "Context manager bao bọc khối lệnh với cam kết khởi tạo và dọn dẹp chắc chắn",
                  "Ngoại lệ phát sinh trong `with` luôn được chuyển qua `__exit__` trước khi văng ra ngoài"
                ]
              },
              "rules": {
                "en": [
                  "Always use `with` when managing sockets, files, locks, and database transactions",
                  "Always place cleanup code inside `finally:` when using `@contextlib.contextmanager`"
                ],
                "vi": [
                  "Luôn dùng `with` khi thao tác với socket, file, lock thread và transaction cơ sở dữ liệu",
                  "Luôn đặt mã dọn dẹp trong khối `finally:` khi dùng `@contextlib.contextmanager`"
                ]
              },
              "commonTraps": {
                "en": [
                  "Returning `True` from `__exit__` inadvertently swallowing critical unexpected bugs",
                  "Forgetting `try...finally` in generator context managers leading to leaked locks if an error occurs before cleanup"
                ],
                "vi": [
                  "Vô tình trả về `True` trong `__exit__` làm nuốt chửng các lỗi nghiêm trọng mà không biết",
                  "Quên khối `try...finally` trong generator context manager khiến tài nguyên bị rò rỉ nếu phát sinh lỗi"
                ]
              },
              "takeaway": {
                "en": "Context managers eliminate resource leaks and provide clean, declarative lifecycle management across complex applications.",
                "vi": "Context manager loại bỏ triệt để nguy cơ rò rỉ tài nguyên và mang lại cơ chế quản lý vòng đời tường minh cho các hệ thống phần mềm lớn."
              }
            },
            "selfReview": [
              {
                "question": {
                  "en": "How does an `__exit__` method tell Python to suppress an exception raised inside the `with` block?",
                  "vi": "Phương thức `__exit__` làm thế nào để báo cho Python biết là cần dập tắt ngoại lệ phát sinh trong khối `with`?"
                },
                "hint": {
                  "en": "What return value signals error handling completion?",
                  "vi": "Giá trị trả về nào báo hiệu ngoại lệ đã được xử lý xong?"
                },
                "answer": {
                  "en": "An `__exit__` method suppresses an exception by returning a truthy value (specifically `True`). If `__exit__` returns `False`, `None`, or finishes without an explicit return statement, Python automatically re-raises the exception up the call stack.",
                  "vi": "Phương thức `__exit__` dập tắt ngoại lệ bằng cách trả về giá trị chân lý (cụ thể là `True`). Nếu `__exit__` trả về `False`, `None` hoặc không return gì, Python sẽ tự động bắn tiếp ngoại lệ đó lên call stack."
                }
              }
            ]
          }
        ]
      },
      {
        "partNumber": 4,
        "title": {
          "en": "Object-Oriented Architecture & Metaprogramming",
          "vi": "Kiến Trúc Hướng Đối Tượng & Lập Trình Siêu Cấp"
        },
        "description": {
          "en": "Two-phase instantiation, C3 linearization MRO, data model dunders, descriptors, and slots.",
          "vi": "Khởi tạo 2 giai đoạn, thuật toán MRO C3, dunder methods, descriptor và tối ưu __slots__."
        },
        "chapters": [
          {
            "id": "py-hb-ch-12",
            "number": 12,
            "partNumber": 4,
            "partTitle": {
              "en": "Object-Oriented Architecture & Metaprogramming",
              "vi": "Kiến Trúc Hướng Đối Tượng & Lập Trình Siêu Cấp"
            },
            "slug": "classes-instances-type-system",
            "title": {
              "en": "Classes, Instances & The Type System",
              "vi": "Classes, Instances & Hệ Thống Kiểu Đối Tượng"
            },
            "summary": {
              "en": "Classes as runtime objects, the type metaclass, the two-phase instantiation pipeline (__new__ allocator vs __init__ initializer), and method binding mechanics.",
              "vi": "Class là đối tượng runtime, metaclass type, quy trình khởi tạo 2 giai đoạn (__new__ cấp phát bộ nhớ vs __init__ khởi tạo thuộc tính) và cơ chế method binding."
            },
            "readTimeMinutes": 20,
            "sections": [
              {
                "id": "py-hb-12-1",
                "title": {
                  "en": "Classes as First-Class Objects & The type Metaclass",
                  "vi": "Class Là Đối Tượng Hạng Nhất & Metaclass type"
                },
                "content": {
                  "en": "In Python, **classes are themselves objects** residing in heap memory. Just as an instance `p = Point(1, 2)` is an instance of class `Point`, the class `Point` is an instance of the built-in metaclass `type`. When Python executes a `class MyClass:` block, it executes the class body in a temporary namespace dictionary and calls `type(name, bases, dict)` to dynamically construct the class object.",
                  "vi": "Trong Python, **bản thân class cũng là một đối tượng** nằm trên bộ nhớ heap. Giống như một instance `p = Point(1, 2)` là đối tượng của class `Point`, thì class `Point` lại chính là đối tượng của metaclass `type`. Khi Python thực thi khối lệnh `class MyClass:`, nó chạy toàn bộ thân class trong một namespace dictionary tạm rồi gọi `type(name, bases, dict)` để tạo ra đối tượng class một cách linh hoạt."
                },
                "diagram": {
                  "title": {
                    "en": "Python 3-Tier Object & Metaclass Hierarchy",
                    "vi": "Cây Phân Cấp Đối Tượng & Metaclass 3 Tầng Của Python"
                  },
                  "steps": [
                    {
                      "number": 1,
                      "label": {
                        "en": "Metaclass (type)",
                        "vi": "Metaclass (type)"
                      },
                      "description": {
                        "en": "type is the factory that constructs class objects.",
                        "vi": "type là khuôn mẫu mẹ sinh ra các đối tượng class."
                      }
                    },
                    {
                      "number": 2,
                      "label": {
                        "en": "Class (UserClass)",
                        "vi": "Class (UserClass)"
                      },
                      "description": {
                        "en": "UserClass is an instance of type and the factory for user instances.",
                        "vi": "UserClass là một instance của type và là khuôn mẫu tạo ra instance người dùng."
                      }
                    },
                    {
                      "number": 3,
                      "label": {
                        "en": "Instance (obj)",
                        "vi": "Instance (obj)"
                      },
                      "description": {
                        "en": "obj is an instance of UserClass holding instance state __dict__.",
                        "vi": "obj là instance của UserClass, lưu trữ trạng thái trong __dict__."
                      }
                    }
                  ]
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "dynamic_class_creation.py",
                  "code": "# Dynamic class creation using type(name, bases, dict)\ndef greet_method(self) -> str:\n    return f\"Hello, I am {self.name}!\"\n\n# Dynamically construct 'Robot' class at runtime\nRobot = type(\n    \"Robot\",\n    (object,),\n    {\n        \"model\": \"v2.0\",\n        \"greet\": greet_method,\n        \"__init__\": lambda self, name: setattr(self, \"name\", name),\n    }\n)\n\nbot = Robot(\"HAL-9000\")\nprint(\"Instance greeting:\", bot.greet())  # Hello, I am HAL-9000!\nprint(\"Is instance of Robot?\", isinstance(bot, Robot))  # True\nprint(\"Is Robot instance of type?\", isinstance(Robot, type))  # True",
                  "explanation": {
                    "en": "Illustrates how Python `class` statements compile to `type()` metaclass constructor calls under the hood.",
                    "vi": "Minh họa cách câu lệnh `class` trong Python thực chất được dịch thành hàm khởi tạo metaclass `type()`."
                  }
                }
              },
              {
                "id": "py-hb-12-2",
                "title": {
                  "en": "The Two-Phase Instantiation Pipeline: __new__ vs. __init__",
                  "vi": "Quy Trình Khởi Tạo 2 Giai Đoạn: __new__ vs. __init__"
                },
                "content": {
                  "en": "When creating an instance via `obj = MyClass(*args)`, Python executes a **two-phase instantiation pipeline**: 1) `__new__(cls, *args)` is the **Allocator**: it is a static method that allocates the raw memory object in the heap and returns the newly minted instance. 2) `__init__(self, *args)` is the **Initializer**: it receives the instance returned by `__new__` and populates its initial attribute state. Overriding `__new__` is required when subclassing immutable types (like `int`, `str`, `tuple`) or implementing singletons.",
                  "vi": "Khi bạn tạo đối tượng bằng `obj = MyClass(*args)`, Python thực thi **quy trình 2 giai đoạn**: 1) `__new__(cls, *args)` là **Bộ cấp phát (Allocator)**: đây là phương thức static cấp phát vùng nhớ thô trên heap và trả về instance vừa sinh ra. 2) `__init__(self, *args)` là **Bộ khởi tạo (Initializer)**: nhận instance từ `__new__` và thiết lập các thuộc tính ban đầu. Cần ghi đè `__new__` khi kế thừa các kiểu dữ liệu bất biến (như `int`, `str`, `tuple`) hoặc khi cài đặt mẫu Singleton."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "singleton_via_new.py",
                  "code": "class DatabasePool:\n    _instance = None\n\n    def __new__(cls, *args, **kwargs):\n        if cls._instance is None:\n            print(\"[ALLOCATING] Creating new singleton heap allocation...\")\n            cls._instance = super().__new__(cls)\n        return cls._instance\n\n    def __init__(self, dsn: str):\n        self.dsn = dsn\n\n# Both variables reference the identical instance\npool1 = DatabasePool(\"postgres://primary:5432\")\npool2 = DatabasePool(\"postgres://replica:5432\")\nprint(\"Are pools identical?\", pool1 is pool2)  # True",
                  "explanation": {
                    "en": "`__new__` intercepts memory allocation to ensure only a single instance of `DatabasePool` ever exists in the heap.",
                    "vi": "`__new__` can thiệp vào bước cấp phát bộ nhớ để đảm bảo chỉ có duy nhất một instance `DatabasePool` trên heap."
                  }
                }
              },
              {
                "id": "py-hb-12-3",
                "title": {
                  "en": "Instance, Class (@classmethod) & Static (@staticmethod) Methods",
                  "vi": "Phương Thức Instance, Class (@classmethod) & Static (@staticmethod)"
                },
                "content": {
                  "en": "Python distinguishes three types of class methods: 1) **Instance Methods**: Receive `self` bound to the calling instance object. 2) **Class Methods** (`@classmethod`): Receive `cls` bound to the class object itself, widely used as alternative factory constructors (e.g., `User.from_json()`). 3) **Static Methods** (`@staticmethod`): Plain functions bound inside the class namespace without implicit `self` or `cls` parameters.",
                  "vi": "Python phân biệt 3 loại phương thức trong class: 1) **Instance Method**: Nhận tham số `self` gắn với đối tượng gọi hàm. 2) **Class Method** (`@classmethod`): Nhận tham số `cls` gắn với chính đối tượng class, thường dùng làm factory constructor (như `User.from_json()`). 3) **Static Method** (`@staticmethod`): Hàm thuần túy đặt trong namespace của class, không tự động nhận `self` hay `cls`."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "method_types.py",
                  "code": "import json\nfrom datetime import datetime\n\nclass TimestampedRecord:\n    def __init__(self, data: dict, created_at: datetime):\n        self.data = data\n        self.created_at = created_at\n\n    # 1. Alternative constructor factory\n    @classmethod\n    def from_json(cls, json_payload: str) -> \"TimestampedRecord\":\n        parsed = json.loads(json_payload)\n        return cls(data=parsed, created_at=datetime.utcnow())\n\n    # 2. Pure static validation helper\n    @staticmethod\n    def validate_schema(data: dict) -> bool:\n        return \"id\" in data and \"version\" in data",
                  "explanation": {
                    "en": "Shows idiomatically using `@classmethod` for factory constructors and `@staticmethod` for namespace-grouped utilities.",
                    "vi": "Minh họa cách dùng chuẩn mực của `@classmethod` làm constructor phụ và `@staticmethod` cho các hàm tiện ích trong namespace class."
                  }
                },
                "keyTakeaways": {
                  "en": [
                    "Classes are heap objects instantiated by the `type` metaclass",
                    "`__new__` allocates memory; `__init__` initializes instance attributes",
                    "Use `@classmethod` for alternative factory constructors supporting subclass polymorphism"
                  ],
                  "vi": [
                    "Class là đối tượng trên heap được sinh ra từ metaclass `type`",
                    "`__new__` cấp phát bộ nhớ; `__init__` thiết lập giá trị thuộc tính",
                    "Dùng `@classmethod` để tạo các constructor phụ hỗ trợ tính đa hình khi kế thừa"
                  ]
                }
              }
            ],
            "chapterSummary": {
              "mentalModels": {
                "en": [
                  "Python has a uniform object model: functions, classes, and instances are all first-class objects",
                  "Instantiation is a two-step handshake: memory allocation (__new__) followed by attribute initialization (__init__)"
                ],
                "vi": [
                  "Mô hình đối tượng đồng nhất: hàm, class và instance đều là đối tượng hạng nhất",
                  "Khởi tạo instance gồm 2 bước: cấp phát ô nhớ (__new__) rồi gán thuộc tính (__init__)"
                ]
              },
              "rules": {
                "en": [
                  "Always return a new instance from `__new__(cls)` when overriding it",
                  "Prefer `@classmethod` over `@staticmethod` when creating alternative constructors so subclasses inherit correctly"
                ],
                "vi": [
                  "Luôn trả về instance mới từ phương thức `__new__(cls)` khi ghi đè nó",
                  "Ưu tiên dùng `@classmethod` hơn `@staticmethod` cho constructor phụ để class con kế thừa đúng"
                ]
              },
              "commonTraps": {
                "en": [
                  "Modifying mutable class variables via an instance, inadvertently shadowing the class attribute with an instance variable"
                ],
                "vi": [
                  "Gán thuộc tính class biến đổi qua instance làm vô tình tạo ra biến instance che khuất biến class"
                ]
              },
              "takeaway": {
                "en": "Understanding the relationship between instances, classes, and the type metaclass unlocks Python dynamic runtime metaprogramming.",
                "vi": "Hiểu rõ mối liên hệ giữa instance, class và metaclass type mở ra cánh cửa lập trình siêu cấp linh hoạt trong Python."
              }
            },
            "selfReview": [
              {
                "question": {
                  "en": "Why must `__new__` be overridden instead of `__init__` when creating a custom subclass of `tuple` or `str`?",
                  "vi": "Tại sao bắt buộc phải ghi đè `__new__` thay vì `__init__` khi kế thừa class bất biến như `tuple` hay `str`?"
                },
                "hint": {
                  "en": "Consider when immutable objects are sealed in memory.",
                  "vi": "Hãy nghĩ về thời điểm một đối tượng bất biến bị đóng băng dữ liệu trong RAM."
                },
                "answer": {
                  "en": "Tuples and strings are immutable. By the time `__init__` is called, the immutable object has already been allocated and sealed in memory by `__new__`, making attribute or element mutation impossible. Therefore, customizations to immutable data must occur inside `__new__` before memory allocation completes.",
                  "vi": "Tuple và string là kiểu dữ liệu bất biến. Khi phương thức `__init__` chạy thì đối tượng đã được `__new__` cấp phát và đóng băng trong RAM, không thể chỉnh sửa nội dung được nữa. Vì vậy, mọi biến đổi dữ liệu bất biến phải được thực hiện trong `__new__` trước khi chốt vùng nhớ."
                }
              }
            ]
          },
          {
            "id": "py-hb-ch-13",
            "number": 13,
            "partNumber": 4,
            "partTitle": {
              "en": "Object-Oriented Architecture & Metaprogramming",
              "vi": "Kiến Trúc Hướng Đối Tượng & Lập Trình Siêu Cấp"
            },
            "slug": "inheritance-mro-super",
            "title": {
              "en": "Inheritance, MRO & super() Mechanics",
              "vi": "Kế Thừa, MRO & Cơ Chế Hoạt Động Của super()"
            },
            "summary": {
              "en": "Multiple inheritance, the C3 Linearization algorithm for Method Resolution Order (MRO), cooperative super() calls without explicit base class hardcoding, and mixin patterns.",
              "vi": "Đa kế thừa, thuật toán tuyến tính hóa C3 để xác định thứ tự MRO, gọi super() hợp tác không phụ thuộc tên class cha và kiến trúc Mixin."
            },
            "readTimeMinutes": 21,
            "sections": [
              {
                "id": "py-hb-13-1",
                "title": {
                  "en": "Multiple Inheritance & The C3 Linearization Algorithm",
                  "vi": "Đa Kế Thừa & Thuật Toán Tuyến Tính Hóa C3"
                },
                "content": {
                  "en": "Python supports multiple inheritance. When resolving method calls in complex diamond inheritance hierarchies, Python computes a deterministic search order known as the **Method Resolution Order (MRO)** using the **C3 Linearization Algorithm**. C3 guarantees two fundamental invariants: 1) **Local Precedence Order**: Subclasses appear before their parent base classes. 2) **Monotonicity**: If class A precedes class B in one class MRO, A must precede B in all descendant class MROs.",
                  "vi": "Python hỗ trợ đa kế thừa toàn diện. Khi tìm kiếm phương thức trong cấu trúc hình kim cương (diamond inheritance), Python tính toán một danh sách thứ tự tìm kiếm xác định gọi là **Method Resolution Order (MRO)** dựa trên **Thuật Toán Tuyến Tính Hóa C3**. Thuật toán C3 đảm bảo 2 nguyên tắc bất biến: 1) **Thứ tự ưu tiên cục bộ**: Class con luôn đứng trước class cha. 2) **Tính đơn điệu (Monotonicity)**: Nếu class A đứng trước class B trong MRO của một class, thì A bắt buộc phải đứng trước B trong MRO của mọi class con cháu."
                },
                "diagram": {
                  "title": {
                    "en": "Diamond Inheritance & C3 Linearization",
                    "vi": "Đa Kế Thừa Hình Kim Cương & Thuật Toán C3"
                  },
                  "steps": [
                    {
                      "number": 1,
                      "label": {
                        "en": "Base (A)",
                        "vi": "Gốc (A)"
                      },
                      "description": {
                        "en": "Base class A defines core interface contract.",
                        "vi": "Class cha gốc A định nghĩa giao diện chuẩn."
                      }
                    },
                    {
                      "number": 2,
                      "label": {
                        "en": "Branches (B, C)",
                        "vi": "Hai Nhánh (B, C)"
                      },
                      "description": {
                        "en": "Class B(A) and Class C(A) extend base class independently.",
                        "vi": "Class B(A) và C(A) cùng kế thừa độc lập từ A."
                      }
                    },
                    {
                      "number": 3,
                      "label": {
                        "en": "Leaf (D)",
                        "vi": "Đỉnh (D)"
                      },
                      "description": {
                        "en": "Class D(B, C) inherits both branches. MRO resolves to: D -> B -> C -> A -> object.",
                        "vi": "Class D(B, C) kế thừa cả hai. C3 giải MRO: D -> B -> C -> A -> object."
                      }
                    }
                  ]
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "c3_mro_inspection.py",
                  "code": "class A:\n    def ping(self):\n        print(\"A.ping\")\n\nclass B(A):\n    def ping(self):\n        print(\"B.ping\")\n        super().ping()\n\nclass C(A):\n    def ping(self):\n        print(\"C.ping\")\n        super().ping()\n\nclass D(B, C):\n    def ping(self):\n        print(\"D.ping\")\n        super().ping()\n\n# Inspect computed MRO tuple\nprint(\"Class D MRO Order:\")\nfor idx, cls in enumerate(D.__mro__, 1):\n    print(f\"  {idx}. {cls.__name__}\")\n\n# Cooperative execution\nd = D()\nd.ping()",
                  "explanation": {
                    "en": "`D.__mro__` proves `super()` inside B jumps horizontally to C before reaching base class A, executing cooperative diamond dispatch cleanly.",
                    "vi": "`D.__mro__` chứng minh lệnh `super()` trong class B sẽ nhảy ngang sang class C trước khi lên class cha A, tạo luồng thực thi hợp tác hoàn hảo."
                  }
                }
              },
              {
                "id": "py-hb-13-2",
                "title": {
                  "en": "Cooperative super() Calls vs. Hardcoded Parent Calls",
                  "vi": "Gọi super() Hợp Tác vs. Gọi Cứng Tên Class Cha"
                },
                "content": {
                  "en": "A dangerous anti-pattern is calling base methods via explicit class names like `A.__init__(self)`. This bypasses the MRO and causes diamond base classes to be executed multiple times. Zero-argument `super()` (PEP 3135) inspects the runtime MRO of `type(self)` and delegates dynamically to the **next sibling class in the MRO chain**, guaranteeing every base class is visited exactly once.",
                  "vi": "Một anti-pattern nguy hiểm là gọi hàm class cha bằng tên cứng như `A.__init__(self)`. Cách này bỏ qua bảng MRO và khiến class gốc bị chạy lặp lại nhiều lần. Cú pháp `super()` không tham số (PEP 3135) sẽ tự soi MRO của `type(self)` lúc runtime và chuyển tiếp tới **class tiếp theo trong chuỗi MRO**, đảm bảo mỗi class chỉ chạy đúng một lần."
                },
                "commonMistakes": [
                  {
                    "mistake": {
                      "en": "Hardcoding base class initializers `BaseClass.__init__(self)` instead of `super().__init__()` in multiple inheritance",
                      "vi": "Gọi cứng hàm khởi tạo `BaseClass.__init__(self)` thay vì dùng `super().__init__()` trong đa kế thừa"
                    },
                    "why": {
                      "en": "Hardcoded calls skip intermediate classes in the MRO chain and duplicate calls to shared root classes.",
                      "vi": "Gọi cứng sẽ nhảy cóc qua các class trung gian trong chuỗi MRO và làm class cha gốc bị khởi tạo 2 lần."
                    },
                    "solution": {
                      "en": "Always use cooperative zero-argument `super().__init__(**kwargs)` across all classes in an inheritance hierarchy.",
                      "vi": "Luôn dùng `super().__init__(**kwargs)` có tính hợp tác trên toàn bộ các class trong cây kế thừa."
                    },
                    "codeIncorrect": "class Service(BaseLogger, BaseConfig):\n    def __init__(self):\n        BaseLogger.__init__(self)  # Skips cooperative MRO dispatch!\n        BaseConfig.__init__(self)",
                    "codeCorrect": "class Service(BaseLogger, BaseConfig):\n    def __init__(self, **kwargs):\n        super().__init__(**kwargs)  # Clean cooperative MRO chain"
                  }
                ],
                "keyTakeaways": {
                  "en": [
                    "CPython computes Method Resolution Order (MRO) using the C3 Linearization algorithm",
                    "Zero-argument `super()` delegates to the next class in the runtime MRO sequence",
                    "Never hardcode parent class names when calling overridden methods"
                  ],
                  "vi": [
                    "CPython tính thứ tự MRO bằng thuật toán Tuyến tính hóa C3",
                    "Cú pháp `super()` không tham số gọi tới class tiếp theo trong chuỗi MRO runtime",
                    "Tuyệt đối không gọi cứng tên class cha khi ghi đè phương thức"
                  ]
                }
              }
            ],
            "chapterSummary": {
              "mentalModels": {
                "en": [
                  "MRO is a flat, linear search list computed deterministically at class definition time",
                  "super() does not mean \"my direct parent\"; it means \"the next class in this instance MRO\""
                ],
                "vi": [
                  "MRO là danh sách tìm kiếm phẳng, tuyến tính được tính toán khi định nghĩa class",
                  "super() không có nghĩa là \"cha trực tiếp\"; nó có nghĩa là \"class tiếp theo trong chuỗi MRO\""
                ]
              },
              "rules": {
                "en": [
                  "Inspect `cls.__mro__` whenever debugging complex method resolution behaviors",
                  "Forward keyword arguments (`**kwargs`) when designing cooperative multiple inheritance initializers"
                ],
                "vi": [
                  "Soi thuộc tính `cls.__mro__` mỗi khi debug hành vi gọi phương thức trong đa kế thừa",
                  "Luôn chuyển tiếp `**kwargs` khi thiết kế constructor trong hệ thống đa kế thừa hợp tác"
                ]
              },
              "commonTraps": {
                "en": [
                  "Creating inconsistent method resolution orders that raise `TypeError: Cannot create a consistent method resolution order (MRO)`"
                ],
                "vi": [
                  "Khai báo thứ tự kế thừa mâu thuẫn khiến Python báo lỗi không thể tạo bảng MRO nhất quán"
                ]
              },
              "takeaway": {
                "en": "Cooperative multiple inheritance powered by C3 Linearization provides flexible, composable mixin architectures when super() is used consistently.",
                "vi": "Đa kế thừa hợp tác dựa trên thuật toán C3 mang lại kiến trúc Mixin linh hoạt và mạnh mẽ khi áp dụng super() đồng bộ."
              }
            },
            "selfReview": [
              {
                "question": {
                  "en": "What does `super().method()` actually do in Python 3?",
                  "vi": "Lệnh `super().method()` thực chất làm gì trong Python 3?"
                },
                "hint": {
                  "en": "Consider the runtime MRO of the instance.",
                  "vi": "Hãy nghĩ về chuỗi MRO của instance lúc runtime."
                },
                "answer": {
                  "en": "`super()` returns a proxy object that delegates method calls to the NEXT class in the calling instance Method Resolution Order (`__mro__`). It is NOT bound statically to the immediate lexical parent; its target is resolved dynamically based on `type(self)`.",
                  "vi": "`super()` trả về một đối tượng proxy chuyển tiếp lời gọi hàm tới class TIẾP THEO trong chuỗi MRO (`__mro__`) của instance hiện tại. Nó không gắn cố định vào class cha trực tiếp mà được giải quyết động dựa trên `type(self)`."
                }
              }
            ]
          },
          {
            "id": "py-hb-ch-14",
            "number": 14,
            "partNumber": 4,
            "partTitle": {
              "en": "Object-Oriented Architecture & Metaprogramming",
              "vi": "Kiến Trúc Hướng Đối Tượng & Lập Trình Siêu Cấp"
            },
            "slug": "special-dunder-methods-protocols",
            "title": {
              "en": "Special Methods & Data Model Protocols",
              "vi": "Phương Thức Đặc Biệt & Giao Thức Data Model"
            },
            "summary": {
              "en": "Python Data Model, special dunder methods, __repr__ vs __str__ developer contracts, operator overloading, and implementing sequence, mapping, and numeric protocols.",
              "vi": "Mô hình dữ liệu Python Data Model, các dunder method, quy ước __repr__ và __str__, nạp chồng toán tử và cài đặt giao thức sequence, mapping, số học."
            },
            "readTimeMinutes": 20,
            "sections": [
              {
                "id": "py-hb-14-1",
                "title": {
                  "en": "The Python Data Model & Operator Overloading",
                  "vi": "Mô Hình Dữ Liệu Python Data Model & Nạp Chồng Toán Tử"
                },
                "content": {
                  "en": "The **Python Data Model** defines an extensive suite of special double-underscore (\"dunder\") methods that allow user-defined classes to hook into language syntax seamlessly. When you write `len(obj)`, Python invokes `obj.__len__()`; when you write `a + b`, Python invokes `a.__add__(b)` (or falls back to `b.__radd__(a)`). By implementing these protocols, custom domain objects behave as natural first-class language citizens.",
                  "vi": "**Python Data Model** định nghĩa một bộ phương thức đặc biệt có 2 dấu gạch dưới (\"dunder\") cho phép class tự định nghĩa tích hợp mượt mà vào cú pháp ngôn ngữ. Khi bạn gọi `len(obj)`, Python gọi `obj.__len__()`; khi viết `a + b`, Python gọi `a.__add__(b)` (hoặc chuyển sang `b.__radd__(a)` nếu cần). Nhờ cài đặt các giao thức này, đối tượng của bạn sẽ hoạt động tự nhiên như các kiểu dữ liệu gốc."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "vector_math_protocol.py",
                  "code": "import math\n\nclass Vector2D:\n    def __init__(self, x: float, y: float):\n        self.x = float(x)\n        self.y = float(y)\n\n    # 1. Unambiguous developer representation\n    def __repr__(self) -> str:\n        return f\"Vector2D(x={self.x}, y={self.y})\"\n\n    # 2. Human readable string representation\n    def __str__(self) -> str:\n        return f\"({self.x}, {self.y})\"\n\n    # 3. Vector addition: v1 + v2\n    def __add__(self, other: \"Vector2D\") -> \"Vector2D\":\n        if not isinstance(other, Vector2D):\n            return NotImplemented\n        return Vector2D(self.x + other.x, self.y + other.y)\n\n    # 4. Scalar multiplication: v * 3.0\n    def __mul__(self, scalar: float) -> \"Vector2D\":\n        return Vector2D(self.x * scalar, self.y * scalar)\n\n    # 5. Length protocol: abs(v)\n    def __abs__(self) -> float:\n        return math.hypot(self.x, self.y)\n\nv1 = Vector2D(3, 4)\nv2 = Vector2D(1, 2)\nprint(\"Addition:\", v1 + v2)        # (4.0, 6.0)\nprint(\"Magnitude:\", abs(v1))        # 5.0\nprint(\"Developer repr:\", repr(v1))  # Vector2D(x=3.0, y=4.0)",
                  "explanation": {
                    "en": "Demonstrates implementing `__repr__`, `__str__`, `__add__`, `__mul__`, and `__abs__` to build an expressive mathematical vector object.",
                    "vi": "Minh họa cách cài đặt `__repr__`, `__str__`, `__add__`, `__mul__` và `__abs__` để xây dựng đối tượng vector toán học chuẩn mực."
                  }
                }
              },
              {
                "id": "py-hb-14-2",
                "title": {
                  "en": "__repr__ vs. __str__: The Introspection Contract",
                  "vi": "__repr__ vs. __str__: Hợp Đồng Phản Chiếu Thông Tin"
                },
                "content": {
                  "en": "Every professional Python class must implement `__repr__`. The golden contract between `__repr__` and `__str__` is: 1) `__repr__()` is for **Developers and Debuggers**: it should be unambiguous and ideally return a valid Python expression string that can recreate the object (`eval(repr(obj)) == obj`). 2) `__str__()` is for **End Users**: it provides a clean, human-readable summary. If `__str__` is not implemented, Python automatically falls back to `__repr__`.",
                  "vi": "Mọi class Python chuyên nghiệp đều cần cài đặt `__repr__`. Quy ước vàng giữa `__repr__` và `__str__` là: 1) `__repr__()` dành cho **Lập trình viên và Debugger**: phải rõ ràng, không mập mờ và lý tưởng nhất là trả về chuỗi biểu thức Python có thể tái tạo lại đối tượng (`eval(repr(obj)) == obj`). 2) `__str__()` dành cho **Người dùng cuối**: hiển thị thông tin thân thiện. Nếu không cài đặt `__str__`, Python sẽ tự động dùng `__repr__`."
                },
                "keyTakeaways": {
                  "en": [
                    "The Python Data Model standardizes operator overloading and sequence behavior",
                    "Always implement `__repr__` first on all custom classes for diagnostic clarity",
                    "Return `NotImplemented` from binary operators to allow Python to try reflected methods (`__radd__`)"
                  ],
                  "vi": [
                    "Python Data Model chuẩn hóa hành vi nạp chồng toán tử và giao thức sequence",
                    "Luôn ưu tiên cài đặt `__repr__` đầu tiên cho mọi class để dễ debug",
                    "Trả về `NotImplemented` trong các toán tử 2 ngôi để Python thử gọi phương thức đảo (`__radd__`)"
                  ]
                }
              }
            ],
            "chapterSummary": {
              "mentalModels": {
                "en": [
                  "Dunder methods translate Python syntax operators into polymorphic method dispatches",
                  "repr is the unambiguous code representation; str is the user-facing display"
                ],
                "vi": [
                  "Dunder method dịch các toán tử cú pháp của ngôn ngữ thành các lời gọi hàm đa hình",
                  "repr là biểu diễn mã nguồn chuẩn xác; str là định dạng hiển thị cho người dùng"
                ]
              },
              "rules": {
                "en": [
                  "Return `NotImplemented` instead of raising `TypeError` inside binary dunder methods",
                  "Ensure `__repr__` outputs class name and critical state attributes"
                ],
                "vi": [
                  "Trả về `NotImplemented` thay vì tự ném lỗi `TypeError` trong các dunder method toán tử",
                  "Đảm bảo `__repr__` hiển thị tên class và các thuộc tính trạng thái quan trọng"
                ]
              },
              "commonTraps": {
                "en": [
                  "Raising TypeError inside `__add__` which breaks Python fallback to `__radd__` on the right-hand operand"
                ],
                "vi": [
                  "Ném lỗi TypeError trong `__add__` làm chặn đứng cơ chế thử lại bằng `__radd__` của toán hạng bên phải"
                ]
              },
              "takeaway": {
                "en": "By leveraging special dunder methods, custom domain models integrate seamlessly with Python built-in idioms and standard library algorithms.",
                "vi": "Tận dụng dunder methods giúp các domain model tùy chỉnh tích hợp mượt mà vào cú pháp tự nhiên của Python và các thuật toán trong thư viện chuẩn."
              }
            },
            "selfReview": [
              {
                "question": {
                  "en": "Why should a custom operator method return `NotImplemented` rather than raising `TypeError`?",
                  "vi": "Tại sao phương thức nạp chồng toán tử nên trả về `NotImplemented` thay vì ném lỗi `TypeError`?"
                },
                "hint": {
                  "en": "Consider what Python does when the left-hand operand does not know how to handle the right-hand type.",
                  "vi": "Hãy xem Python xử lý thế nào khi toán hạng bên trái không biết cách cộng với kiểu dữ liệu bên phải."
                },
                "answer": {
                  "en": "When `a.__add__(b)` returns `NotImplemented`, Python catches this signal and immediately attempts the reflected operation on the right operand: `b.__radd__(a)`. If you raise `TypeError` directly, the entire operation crashes immediately without giving `b` an opportunity to handle the operation.",
                  "vi": "Khi `a.__add__(b)` trả về `NotImplemented`, Python bắt tín hiệu này và thử gọi phương thức đảo trên toán hạng bên phải: `b.__radd__(a)`. Nếu bạn tự ý ném `TypeError`, chương trình sẽ crash ngay lập tức và không cho đối tượng `b` cơ hội xử lý phép tính."
                }
              }
            ]
          },
          {
            "id": "py-hb-ch-15",
            "number": 15,
            "partNumber": 4,
            "partTitle": {
              "en": "Object-Oriented Architecture & Metaprogramming",
              "vi": "Kiến Trúc Hướng Đối Tượng & Lập Trình Siêu Cấp"
            },
            "slug": "descriptors-properties-attribute-lookup",
            "title": {
              "en": "Descriptors, Properties & Attribute Lookup",
              "vi": "Descriptors, Properties & Tra Cứu Thuộc Tính"
            },
            "summary": {
              "en": "The definitive attribute lookup precedence hierarchy (__getattribute__ vs __getattr__), data vs non-data descriptors, property mechanics, and __slots__ memory optimization.",
              "vi": "Thứ tự ưu tiên tra cứu thuộc tính (__getattribute__ vs __getattr__), data descriptor và non-data descriptor, cơ chế @property và tối ưu bộ nhớ bằng __slots__."
            },
            "readTimeMinutes": 22,
            "sections": [
              {
                "id": "py-hb-15-1",
                "title": {
                  "en": "The Attribute Lookup Precedence Algorithm",
                  "vi": "Thuật Toán Phân Cấp Tra Cứu Thuộc Tính"
                },
                "content": {
                  "en": "When accessing `obj.attr`, CPython follows a strict 5-step lookup precedence: 1) **Data Descriptor**: Searches the class MRO for descriptors implementing `__set__` or `__delete__` (Data Descriptors take absolute precedence over instance dictionaries). 2) **Instance Dictionary**: Searches `obj.__dict__[\"attr\"]`. 3) **Non-Data Descriptor / Class Attribute**: Searches the class MRO for non-data descriptors (like methods or descriptors implementing only `__get__`) and raw class attributes. 4) **__getattr__ Fallback**: If still not found, invokes `obj.__getattr__(\"attr\")`. 5) **AttributeError**: Raises `AttributeError` if all steps fail.",
                  "vi": "Khi bạn truy cập `obj.attr`, CPython thực thi thuật toán tra cứu 5 bước nghiêm ngặt: 1) **Data Descriptor**: Tìm trong MRO của class các descriptor có cài đặt `__set__` hoặc `__delete__` (Data descriptor luôn chiếm quyền ưu tiên cao hơn dictionary của instance). 2) **Instance Dictionary**: Tìm trong `obj.__dict__[\"attr\"]`. 3) **Non-Data Descriptor / Class Attribute**: Tìm trong MRO của class các non-data descriptor (như phương thức hoặc descriptor chỉ có `__get__`) và thuộc tính class. 4) **Dự phòng __getattr__**: Nếu vẫn chưa thấy, gọi phương thức `obj.__getattr__(\"attr\")`. 5) **AttributeError**: Báo lỗi nếu tất cả các bước đều thất bại."
                },
                "diagram": {
                  "title": {
                    "en": "Python Attribute Lookup Hierarchy",
                    "vi": "Cây Phân Cấp Tra Cứu Thuộc Tính Trong Python"
                  },
                  "steps": [
                    {
                      "number": 1,
                      "label": {
                        "en": "Data Descriptor Check",
                        "vi": "Kiểm Tra Data Descriptor"
                      },
                      "description": {
                        "en": "Checks class MRO for descriptor defining __get__ AND (__set__ or __delete__).",
                        "vi": "Tìm trong class MRO xem có descriptor cài đặt __get__ VÀ (__set__ hoặc __delete__)."
                      }
                    },
                    {
                      "number": 2,
                      "label": {
                        "en": "Instance __dict__",
                        "vi": "Kiểm Tra Instance __dict__"
                      },
                      "description": {
                        "en": "Searches instance dictionary obj.__dict__[\"attr\"].",
                        "vi": "Tìm khóa trong dictionary riêng của instance obj.__dict__[\"attr\"]."
                      }
                    },
                    {
                      "number": 3,
                      "label": {
                        "en": "Non-Data / Class Attr",
                        "vi": "Non-Data / Thuộc Tính Class"
                      },
                      "description": {
                        "en": "Searches class MRO for methods or descriptors defining only __get__.",
                        "vi": "Tìm trong class MRO các phương thức hoặc descriptor chỉ có __get__."
                      }
                    },
                    {
                      "number": 4,
                      "label": {
                        "en": "__getattr__ Hook",
                        "vi": "Phương Thức Dự Phòng __getattr__"
                      },
                      "description": {
                        "en": "Invokes fallback __getattr__ hook if attribute was missing.",
                        "vi": "Gọi hàm dự phòng __getattr__ nếu không tìm thấy thuộc tính ở các bước trên."
                      }
                    }
                  ]
                }
              },
              {
                "id": "py-hb-15-2",
                "title": {
                  "en": "Custom Descriptors & The @property Protocol",
                  "vi": "Tự Viết Descriptors & Cơ Chế Hoạt Động Của @property"
                },
                "content": {
                  "en": "A **Descriptor** is any object that implements at least one of `__get__`, `__set__`, or `__delete__`. Descriptors power all advanced Python attribute binding: methods, `@property`, `@classmethod`, `@staticmethod`, and ORM model fields (like Django or SQLAlchemy). Python 3.6 introduced `__set_name__(self, owner, name)`, which automatically captures the attribute name when assigned to a class attribute.",
                  "vi": "Một **Descriptor** là bất kỳ đối tượng nào cài đặt ít nhất một trong các phương thức `__get__`, `__set__` hoặc `__delete__`. Descriptor chính là động cơ đứng sau toàn bộ cơ chế gắn thuộc tính nâng cao của Python: methods, `@property`, `@classmethod`, `@staticmethod` và các trường ORM model. Từ Python 3.6 có thêm `__set_name__(self, owner, name)` giúp tự động ghi nhận tên biến được gán trong class cha."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "typed_field_descriptor.py",
                  "code": "class ValidatedPositiveNumber:\n    def __set_name__(self, owner, name):\n        self.public_name = name\n        self.private_name = f\"_{name}\"\n\n    def __get__(self, instance, owner):\n        if instance is None:\n            return self\n        return getattr(instance, self.private_name, 0.0)\n\n    def __set__(self, instance, value):\n        if not isinstance(value, (int, float)) or value < 0:\n            raise ValueError(f\"'{self.public_name}' must be a positive number! Got {value}\")\n        setattr(instance, self.private_name, float(value))\n\nclass ProductListing:\n    price = ValidatedPositiveNumber()\n    shipping_cost = ValidatedPositiveNumber()\n\n    def __init__(self, title: str, price: float, shipping: float):\n        self.title = title\n        self.price = price\n        self.shipping_cost = shipping\n\np = ProductListing(\"Mechanical Keyboard\", 120.0, 15.0)\nprint(\"Valid price:\", p.price)\n\n# Invalid assignment triggers descriptor validation\ntry:\n    p.price = -45.0\nexcept ValueError as e:\n    print(\"Caught validation failure:\", e)",
                  "explanation": {
                    "en": "Demonstrates a reusable Data Descriptor validating attributes across class instances using `__set_name__`, `__get__`, and `__set__`.",
                    "vi": "Minh họa cách viết Data Descriptor tái sử dụng để kiểm tra tính hợp lệ của dữ liệu bằng `__set_name__`, `__get__` và `__set__`."
                  }
                }
              },
              {
                "id": "py-hb-15-3",
                "title": {
                  "en": "__slots__ Memory Optimization for High-Volume Objects",
                  "vi": "Tối Ưu Hóa Bộ Nhớ Bằng __slots__ Cho Hàng Triệu Đối Tượng"
                },
                "content": {
                  "en": "By default, every Python instance stores its attributes in an internal `__dict__` hash table dictionary, consuming roughly 150-200 bytes of overhead per instance. When instantiating millions of small records, defining `__slots__ = (\"attr1\", \"attr2\")` suppresses `__dict__` creation. CPython allocates a fixed-size compact C struct array of pointers instead, slashing memory consumption by **~60-70%** and improving attribute access speed.",
                  "vi": "Mặc định, mỗi instance trong Python lưu thuộc tính trong một bảng băm `__dict__` riêng, tốn khoảng 150-200 byte overhead cho mỗi object. Khi cần tạo hàng triệu bản ghi, việc khai báo `__slots__ = (\"attr1\", \"attr2\")` sẽ triệt tiêu việc tạo `__dict__`. CPython sẽ thay thế bằng một mảng con trỏ C cố định kích thước, cắt giảm **~60-70%** dung lượng RAM và tăng tốc độ đọc ghi thuộc tính."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "slots_memory_savings.py",
                  "code": "import sys\n\nclass StandardPoint:\n    def __init__(self, x: float, y: float):\n        self.x = x\n        self.y = y\n\nclass SlottedPoint:\n    __slots__ = (\"x\", \"y\")\n    def __init__(self, x: float, y: float):\n        self.x = x\n        self.y = y\n\np_std = StandardPoint(1.0, 2.0)\np_slot = SlottedPoint(1.0, 2.0)\n\n# Memory footprint comparison\nstd_total_size = sys.getsizeof(p_std) + sys.getsizeof(p_std.__dict__)\nslot_total_size = sys.getsizeof(p_slot)\n\nprint(f\"Standard instance memory: {std_total_size} bytes (has __dict__)\")\nprint(f\"Slotted instance memory:  {slot_total_size} bytes (no __dict__)\")\nprint(f\"Memory reduction:         {(1 - slot_total_size / std_total_size):.1%}\")",
                  "explanation": {
                    "en": "Proves `__slots__` eliminates `__dict__` allocation, dramatically reducing memory overhead for high-volume data structures.",
                    "vi": "Chứng minh `__slots__` loại bỏ hoàn toàn `__dict__`, giúp tiết kiệm bộ nhớ vượt trội khi xử lý dữ liệu lớn."
                  }
                },
                "keyTakeaways": {
                  "en": [
                    "Data descriptors take precedence over instance `__dict__` during attribute lookup",
                    "`__getattr__` is called only when an attribute is not found by normal lookup mechanisms",
                    "Use `__slots__` to eliminate `__dict__` overhead and reduce memory consumption by up to 70%"
                  ],
                  "vi": [
                    "Data descriptor luôn có quyền ưu tiên cao hơn `__dict__` của instance khi tra cứu",
                    "`__getattr__` chỉ được gọi khi thuộc tính không tìm thấy qua các bước tra cứu chuẩn",
                    "Dùng `__slots__` để xóa bỏ overhead của `__dict__` và giảm tới 70% dung lượng RAM"
                  ]
                }
              }
            ],
            "chapterSummary": {
              "mentalModels": {
                "en": [
                  "Attribute lookup is a deterministic waterfall: Data Descriptor -> Instance dict -> Non-Data Descriptor -> __getattr__",
                  "Descriptors intercept and virtualize attribute reads, writes, and deletions at the class level"
                ],
                "vi": [
                  "Tra cứu thuộc tính là dòng thác có thứ tự: Data Descriptor -> Instance dict -> Non-Data Descriptor -> __getattr__",
                  "Descriptor can thiệp và trừu tượng hóa các thao tác đọc, ghi, xóa thuộc tính ở cấp class"
                ]
              },
              "rules": {
                "en": [
                  "Always use `__set_name__` in custom descriptors to automatically discover bound attribute names",
                  "Only add `__slots__` after profiling confirms high-volume instance memory pressure"
                ],
                "vi": [
                  "Luôn tận dụng `__set_name__` trong descriptor tùy chỉnh để tự động nhận diện tên thuộc tính",
                  "Chỉ dùng `__slots__` khi profile bộ nhớ chứng minh ứng dụng đang tạo số lượng instance cực lớn"
                ]
              },
              "commonTraps": {
                "en": [
                  "Storing instance data directly on the descriptor instance `self.val`, inadvertently sharing state across all class instances"
                ],
                "vi": [
                  "Lưu dữ liệu instance trực tiếp trên biến `self.val` của descriptor khiến tất cả các instance dùng chung một giá trị"
                ]
              },
              "takeaway": {
                "en": "Descriptors and attribute lookup rules represent the peak of Python object architecture, unlocking elegant validation, lazy properties, and ORM abstractions.",
                "vi": "Descriptor và quy tắc tra cứu thuộc tính là đỉnh cao của kiến trúc hướng đối tượng Python, mở ra khả năng xây dựng hệ thống validation, lazy property và ORM tuyệt vời."
              }
            },
            "selfReview": [
              {
                "question": {
                  "en": "What is the difference between a Data Descriptor and a Non-Data Descriptor in Python?",
                  "vi": "Sự khác biệt giữa Data Descriptor và Non-Data Descriptor trong Python là gì?"
                },
                "hint": {
                  "en": "Look at the methods implemented (`__set__` vs `__get__`) and precedence over `instance.__dict__`.",
                  "vi": "Xem phương thức nào được cài đặt (`__set__` so với `__get__`) và độ ưu tiên so với `instance.__dict__`."
                },
                "answer": {
                  "en": "A Data Descriptor implements `__set__` or `__delete__` (in addition to `__get__`) and takes precedence OVER the instance dictionary `__dict__`. A Non-Data Descriptor implements ONLY `__get__` (like regular methods), so an entry in `instance.__dict__` overrides and shadows the non-data descriptor.",
                  "vi": "Data Descriptor cài đặt phương thức `__set__` hoặc `__delete__` (bên cạnh `__get__`) và có quyền ưu tiên CAO HƠN `__dict__` của instance. Non-Data Descriptor CHỈ cài đặt `__get__` (như các hàm method thông thường), nên nếu instance có thuộc tính trùng tên trong `__dict__` thì nó sẽ ghi đè lên non-data descriptor."
                }
              }
            ]
          }
        ]
      },
      {
        "partNumber": 5,
        "title": {
          "en": "Concurrency, Memory & Modern Python",
          "vi": "Đồng Thời, Bộ Nhớ & Python Hiện Đại"
        },
        "description": {
          "en": "The Global Interpreter Lock (GIL), multiprocessing, asyncio structured concurrency, and typing protocols.",
          "vi": "Khóa toàn cục GIL, multiprocessing, structured concurrency trong asyncio và protocol kiểm tra kiểu."
        },
        "chapters": [
          {
            "id": "py-hb-ch-16",
            "number": 16,
            "partNumber": 5,
            "partTitle": {
              "en": "Concurrency, Memory & Modern Python",
              "vi": "Đồng Thời, Bộ Nhớ & Python Hiện Đại"
            },
            "slug": "concurrency-gil-asyncio",
            "title": {
              "en": "Concurrency, The GIL & Asyncio",
              "vi": "Lập Trình Đồng Thời, Khóa GIL & Asyncio"
            },
            "summary": {
              "en": "CPython Global Interpreter Lock (GIL) mechanics, CPU-bound vs I/O-bound concurrency tradeoffs, multiprocessing memory boundaries, and the asyncio single-threaded cooperative event loop.",
              "vi": "Cơ chế khóa GIL trong CPython, bài toán CPU-bound vs I/O-bound, đa tiến trình multiprocessing và vòng lặp sự kiện hợp tác đơn luồng của asyncio."
            },
            "readTimeMinutes": 23,
            "sections": [
              {
                "id": "py-hb-16-1",
                "title": {
                  "en": "The Global Interpreter Lock (GIL): Why It Exists & How It Works",
                  "vi": "Khóa Toàn Cục GIL: Lý Do Tồn Tại & Cơ Chế Hoạt Động"
                },
                "content": {
                  "en": "The **Global Interpreter Lock (GIL)** is a mutex mechanism used by CPython to prevent multiple native OS threads from executing Python bytecode simultaneously on multiple CPU cores. The GIL exists primarily because CPython memory management is built upon **reference counting (`ob_refcnt`)**; without a global lock, concurrent multi-threaded modifications to reference counters would trigger race conditions and memory corruption. In CPU-bound tasks, multi-threading in Python cannot utilize multiple cores; however, in **I/O-bound tasks** (network sockets, disk I/O, database queries), CPython automatically releases the GIL while waiting for OS system calls, allowing high-throughput concurrent I/O.",
                  "vi": "**Khóa Toàn Cục GIL (Global Interpreter Lock)** là cơ chế khóa mutex trong CPython ngăn không cho nhiều thread của hệ điều hành thực thi bytecode cùng lúc trên nhiều lõi CPU vật lý. GIL tồn tại chủ yếu vì hệ thống quản lý bộ nhớ của CPython dựa trên **bộ đếm tham chiếu (`ob_refcnt`)**; nếu không có khóa toàn cục, các thread chạy song song sẽ tranh chấp thay đổi bộ đếm tham chiếu dẫn đến xung đột dữ liệu và rò rỉ RAM. Với tác vụ nặng CPU (**CPU-bound**), multi-threading trong Python không tận dụng được đa lõi; tuy nhiên với tác vụ chờ mạng/ổ đĩa (**I/O-bound**), CPython tự động nhả khóa GIL trong khi chờ hệ điều hành phản hồi, mang lại thông lượng xử lý I/O đồng thời rất cao."
                },
                "comparisonTable": {
                  "headers": [
                    {
                      "en": "Concurrency Model",
                      "vi": "Mô Hình Đồng Thời"
                    },
                    {
                      "en": "Mechanism",
                      "vi": "Cơ Chế"
                    },
                    {
                      "en": "Best Suited For",
                      "vi": "Phù Hợp Nhất Cho"
                    },
                    {
                      "en": "Memory & Overhead",
                      "vi": "Bộ Nhớ & Chi Phí"
                    }
                  ],
                  "rows": [
                    {
                      "en": [
                        "threading",
                        "Native OS threads sharing process memory (bound by GIL)",
                        "I/O-bound network calls, GUI responsiveness",
                        "Low memory overhead (~8MB stack per thread)"
                      ],
                      "vi": [
                        "threading",
                        "Thread hệ điều hành dùng chung bộ nhớ process (bị chặn bởi GIL)",
                        "Tác vụ I/O mạng, giữ giao diện GUI phản hồi mượt",
                        "Tốn ít RAM (~8MB stack mỗi thread)"
                      ]
                    },
                    {
                      "en": [
                        "multiprocessing",
                        "Independent OS processes with separate memory and independent GILs",
                        "CPU-bound data crunching, image processing, ML inference",
                        "Higher memory (separate process copies, IPC serialization cost)"
                      ],
                      "vi": [
                        "multiprocessing",
                        "Tiến trình OS độc lập với bộ nhớ riêng và từng GIL riêng biệt",
                        "Tính toán CPU nặng, xử lý ảnh, suy luận Machine Learning",
                        "Tốn nhiều RAM hơn (mỗi process một bản sao, chi phí truyền tin IPC)"
                      ]
                    },
                    {
                      "en": [
                        "asyncio",
                        "Single thread cooperative coroutine event loop (async/await)",
                        "Massive concurrent network I/O (10,000+ web connections)",
                        "Ultra-minimal memory overhead (few KB per coroutine)"
                      ],
                      "vi": [
                        "asyncio",
                        "Vòng lặp sự kiện coroutine hợp tác đơn luồng (async/await)",
                        "Kết nối mạng đồng thời cực lớn (10,000+ kết nối song song)",
                        "Dung lượng RAM cực thấp (chỉ vài KB mỗi coroutine)"
                      ]
                    }
                  ]
                }
              },
              {
                "id": "py-hb-16-2",
                "title": {
                  "en": "The Asyncio Event Loop & Cooperative Multitasking",
                  "vi": "Vòng Lặp Sự Kiện Asyncio & Đa Nhiệm Hợp Tác"
                },
                "content": {
                  "en": "The **asyncio** framework implements **cooperative multitasking** within a single thread using an **Event Loop**. A function declared with `async def` is a **coroutine**. When a coroutine reaches `await some_async_io()`, it pauses its execution frame and yields control back to the event loop. The event loop polls OS non-blocking multiplexers (`epoll` on Linux, `kqueue` on macOS) and resumes waiting coroutines as socket buffers become ready, achieving high-density I/O concurrency with minimal context-switch overhead.",
                  "vi": "Thư viện **asyncio** triển khai mô hình **đa nhiệm hợp tác (cooperative multitasking)** trên một luồng duy nhất bằng một **Vòng Lặp Sự Kiện (Event Loop)**. Hàm khai báo bằng `async def` là một **coroutine**. Khi coroutine gặp lệnh `await`, nó tạm dừng khung thực thi và nhường quyền điều khiển lại cho event loop. Event loop giám sát các cổng I/O không khóa (`epoll` trên Linux, `kqueue` trên macOS) và tự động kích hoạt lại coroutine khi dữ liệu sẵn sàng, giúp xử lý hàng vạn kết nối đồng thời với chi phí chuyển ngữ cảnh cực thấp."
                },
                "diagram": {
                  "title": {
                    "en": "Asyncio Event Loop Cooperative Dispatch",
                    "vi": "Quy Trình Điều Phối Hợp Tác Của Asyncio Event Loop"
                  },
                  "steps": [
                    {
                      "number": 1,
                      "label": {
                        "en": "Coroutine Dispatched",
                        "vi": "Điều Phối Coroutine"
                      },
                      "description": {
                        "en": "Event loop runs Coroutine A until it encounters an `await` on non-blocking I/O.",
                        "vi": "Event loop chạy Coroutine A cho đến khi gặp lệnh `await` chờ I/O mạng."
                      }
                    },
                    {
                      "number": 2,
                      "label": {
                        "en": "Control Yielded",
                        "vi": "Nhường Quyền Điều Khiển"
                      },
                      "description": {
                        "en": "Coroutine A yields; Event loop immediately switches to run ready Coroutine B.",
                        "vi": "Coroutine A nhường quyền; Event loop chuyển ngay sang chạy Coroutine B."
                      }
                    },
                    {
                      "number": 3,
                      "label": {
                        "en": "I/O Notification & Resume",
                        "vi": "Báo Hiệu I/O & Tiếp Tục"
                      },
                      "description": {
                        "en": "OS kernel signals socket ready; Event loop resumes Coroutine A with fetched response.",
                        "vi": "Hệ điều hành báo socket đã có dữ liệu; Event loop kích hoạt lại Coroutine A."
                      }
                    }
                  ]
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "asyncio_structured_concurrency.py",
                  "code": "import asyncio\nimport time\n\nasync def fetch_api_endpoint(name: str, delay: float) -> dict:\n    print(f\"[{time.strftime('%X')}] Requesting: {name}...\")\n    await asyncio.sleep(delay)  # Yields control back to event loop\n    print(f\"[{time.strftime('%X')}] Completed: {name}\")\n    return {\"endpoint\": name, \"status\": 200}\n\nasync def main():\n    # Python 3.11+ TaskGroup for structured concurrency\n    start = time.perf_counter()\n    async with asyncio.TaskGroup() as tg:\n        task1 = tg.create_task(fetch_api_endpoint(\"Inventory-Service\", 1.0))\n        task2 = tg.create_task(fetch_api_endpoint(\"Payment-Gateway\", 1.5))\n        task3 = tg.create_task(fetch_api_endpoint(\"Auth-Provider\", 0.5))\n\n    elapsed = time.perf_counter() - start\n    print(f\"All 3 concurrent network requests completed in {elapsed:.2f}s (Total sequential would be 3.0s)\")\n\n# Entrypoint\nasyncio.run(main())",
                  "explanation": {
                    "en": "Demonstrates modern structured concurrency using `asyncio.TaskGroup` introduced in Python 3.11 for error-safe concurrent coroutine execution.",
                    "vi": "Minh họa mô hình structured concurrency hiện đại với `asyncio.TaskGroup` trong Python 3.11 giúp thực thi coroutine an toàn và tự động dọn dẹp lỗi."
                  }
                },
                "keyTakeaways": {
                  "en": [
                    "The GIL prevents multi-threaded CPU parallelization in CPython, but releases during I/O",
                    "Use `multiprocessing` for CPU-bound computations to utilize all physical CPU cores",
                    "Use `asyncio` and `async/await` for high-concurrency network services with minimal memory overhead"
                  ],
                  "vi": [
                    "Khóa GIL chặn đa luồng CPU trong CPython nhưng tự động nhả khóa khi chờ I/O",
                    "Dùng `multiprocessing` cho tác vụ tính toán nặng để tận dụng toàn bộ số nhân CPU",
                    "Dùng `asyncio` và `async/await` cho dịch vụ mạng đồng thời lớn với dung lượng RAM siêu nhỏ"
                  ]
                }
              }
            ],
            "chapterSummary": {
              "mentalModels": {
                "en": [
                  "Threading provides preemptive concurrency for I/O bound tasks with shared memory",
                  "Multiprocessing provides true hardware parallelism by isolating memory into separate processes",
                  "Asyncio provides cooperative concurrency in a single thread by yielding at await points"
                ],
                "vi": [
                  "Threading cung cấp cơ chế phân chia thời gian cho tác vụ I/O dùng chung bộ nhớ",
                  "Multiprocessing mang lại tính song song phần cứng thực sự bằng cách tách riêng từng process",
                  "Asyncio cung cấp đa nhiệm hợp tác trên 1 luồng bằng cách nhường quyền tại các điểm await"
                ]
              },
              "rules": {
                "en": [
                  "Never run blocking synchronous code (e.g. `time.sleep()`, synchronous requests) inside an asyncio event loop",
                  "Always use Python 3.11+ `asyncio.TaskGroup` instead of raw `asyncio.gather` for safe cancellation semantics"
                ],
                "vi": [
                  "Tuyệt đối không chạy mã đồng bộ gây nghẽn (như `time.sleep()`) trong event loop của asyncio",
                  "Ưu tiên dùng `asyncio.TaskGroup` trong Python 3.11+ thay cho `asyncio.gather` để tự động hủy task khi có lỗi"
                ]
              },
              "commonTraps": {
                "en": [
                  "Using threads for CPU-heavy number crunching expecting a speedup (the GIL actually makes it slower due to thread contention)",
                  "Calling an async coroutine without `await`, resulting in unexecuted coroutine objects and runtime warnings"
                ],
                "vi": [
                  "Dùng đa luồng threading cho tính toán nặng CPU rồi thất vọng vì chương trình chạy chậm hơn do tranh chấp GIL",
                  "Gọi hàm async mà quên từ khóa `await` khiến hàm không bao giờ được thực thi"
                ]
              },
              "takeaway": {
                "en": "Choosing the right concurrency model — threads for blocking I/O, processes for CPU parallelism, and asyncio for high-throughput network services — ensures optimal system performance.",
                "vi": "Chọn đúng mô hình đồng thời — threads cho I/O chặn, processes cho tính toán song song CPU và asyncio cho dịch vụ mạng thông lượng lớn — đảm bảo hệ thống đạt hiệu năng tối đa."
              }
            },
            "selfReview": [
              {
                "question": {
                  "en": "Why does running a CPU-intensive loop across 4 threads in CPython often take LONGER to finish than a single-threaded loop?",
                  "vi": "Tại sao chạy vòng lặp tính toán nặng CPU trên 4 thread trong CPython thường tốn NHIỀU THỜI GIAN HƠN là chạy trên 1 thread đơn lẻ?"
                },
                "hint": {
                  "en": "Consider GIL lock acquisition contention and OS thread context switching overhead.",
                  "vi": "Hãy nghĩ về sự tranh chấp giành khóa GIL và chi phí chuyển đổi ngữ cảnh (context switch) của hệ điều hành."
                },
                "answer": {
                  "en": "Because of the GIL, only one thread can execute bytecode at any instant. Running 4 CPU-bound threads forces the OS to constantly context-switch between threads, each fighting to acquire and release the GIL. The thread switching and synchronization lock contention overhead is added on top of the original work, degrading total execution time.",
                  "vi": "Do có khóa GIL, tại một thời điểm chỉ có 1 thread được chạy bytecode. Chạy 4 thread nặng CPU buộc hệ điều hành phải liên tục chuyển ngữ cảnh (context switch) qua lại giữa các thread đang tranh giành khóa GIL. Chi phí quản lý và tranh chấp khóa này cộng dồn vào thời gian chạy, khiến chương trình chậm hơn cả chạy đơn luồng."
                }
              }
            ]
          },
          {
            "id": "py-hb-ch-17",
            "number": 17,
            "partNumber": 5,
            "partTitle": {
              "en": "Concurrency, Memory & Modern Python",
              "vi": "Đồng Thời, Bộ Nhớ & Python Hiện Đại"
            },
            "slug": "type-hints-structural-typing",
            "title": {
              "en": "Modern Type Hints & Structural Subtyping",
              "vi": "Gợi Ý Kiểu Dữ Liệu & Duck Typing Cấu Trúc"
            },
            "summary": {
              "en": "Modern Python typing syntax (PEP 585 & PEP 604), Generics, TypeVar and ParamSpec, runtime inspection vs static analysis, and structural subtyping with typing.Protocol.",
              "vi": "Cú pháp gợi ý kiểu hiện đại (PEP 585 & 604), Generics, TypeVar và ParamSpec, phản chiếu runtime vs kiểm tra tĩnh và duck typing cấu trúc bằng typing.Protocol."
            },
            "readTimeMinutes": 20,
            "sections": [
              {
                "id": "py-hb-17-1",
                "title": {
                  "en": "Modern Typing Syntax (PEP 585 & PEP 604)",
                  "vi": "Cú Pháp Gợi Ý Kiểu Hiện Đại (PEP 585 & PEP 604)"
                },
                "content": {
                  "en": "Modern Python (3.9+ and 3.10+) eliminates legacy `from typing import List, Dict, Union, Optional` boilerplate: 1) **PEP 585** allows standard built-in collections (`list[str]`, `dict[str, int]`, `tuple[int, ...]`) to be used directly as generic types. 2) **PEP 604** introduces the pipe union operator (`int | str` instead of `Union[int, str]`, and `str | None` instead of `Optional[str]`). Type annotations are purely advisory at runtime; CPython never validates types at execution time, leaving verification to static analysis tools like Mypy and Pyright.",
                  "vi": "Python hiện đại (3.9+ và 3.10+) đã loại bỏ hoàn toàn cú pháp rườm rà `from typing import List, Dict, Union, Optional`: 1) **PEP 585** cho phép dùng trực tiếp các kiểu dữ liệu tích hợp sẵn (`list[str]`, `dict[str, int]`, `tuple[int, ...]`) làm kiểu generic. 2) **PEP 604** đưa vào toán tử gạch đứng (`int | str` thay cho `Union[int, str]` và `str | None` thay cho `Optional[str]`). Cần nhớ rằng Type Annotation hoàn toàn không ảnh hưởng tốc độ chạy; CPython không kiểm tra kiểu lúc runtime mà để công việc này cho các công cụ phân tích tĩnh như Mypy và Pyright."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "modern_typing_syntax.py",
                  "code": "from dataclasses import dataclass\nfrom typing import Callable\n\n# Modern built-in generics (PEP 585) & pipe unions (PEP 604)\n@dataclass(frozen=True)\nclass APIResponse:\n    payload: dict[str, list[int]]\n    error_message: str | None = None\n    status_code: int = 200\n\ndef parse_input(\n    raw_data: str | bytes,\n    validator: Callable[[str], bool] | None = None\n) -> dict[str, str | int]:\n    return {\"status\": \"ok\"}",
                  "explanation": {
                    "en": "Shows clean modern typing using native collections (`dict`, `list`) and union pipes (`str | None`).",
                    "vi": "Minh họa cú pháp typing hiện đại với các kiểu dữ liệu gốc (`dict`, `list`) và toán tử hợp (`str | None`)."
                  }
                }
              },
              {
                "id": "py-hb-17-2",
                "title": {
                  "en": "Structural Subtyping (Duck Typing) with typing.Protocol",
                  "vi": "Duck Typing Có Cấu Trúc Bằng typing.Protocol"
                },
                "content": {
                  "en": "Traditional object-oriented programming relies on **Nominal Subtyping** (explicit inheritance: `class Dog(Animal)`). Python is inherently built on **Duck Typing** (\"if it walks like a duck and quacks like a duck, it is a duck\"). **`typing.Protocol`** (PEP 544) brings static type safety to duck typing via **Structural Subtyping**: a class satisfies a Protocol if it implements the required methods and attributes, without needing to explicitly inherit from the Protocol class.",
                  "vi": "Lập trình hướng đối tượng truyền thống dựa trên **Định kiểu theo tên (Nominal Subtyping)** (kế thừa tường minh: `class Dog(Animal)`). Bản chất tự nhiên của Python là **Duck Typing** (\"nếu nó đi như vịt và kêu như vịt, nó là vịt\"). **`typing.Protocol`** (PEP 544) mang lại sự an toàn kiểu dữ liệu tĩnh cho duck typing thông qua **Định Kiểu Theo Cấu Trúc (Structural Subtyping)**: một class thỏa mãn Protocol nếu nó có đủ các phương thức và thuộc tính yêu cầu mà KHÔNG CẦN phải kế thừa từ Protocol đó."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "protocol_duck_typing.py",
                  "code": "from typing import Protocol\n\n# Structural interface contract\nclass Renderable(Protocol):\n    def render_html(self) -> str: ...\n\n# Independent class with NO explicit inheritance from Renderable\nclass MarkdownDocument:\n    def __init__(self, text: str):\n        self.text = text\n\n    def render_html(self) -> str:\n        return f\"<article>{self.text}</article>\"\n\n# Function accepts ANY object that structurally matches Renderable\ndef publish_content(document: Renderable) -> None:\n    html = document.render_html()\n    print(\"Published markup:\", html)\n\n# Type checker accepts this cleanly!\ndoc = MarkdownDocument(\"Python Handbook Architecture\")\npublish_content(doc)",
                  "explanation": {
                    "en": "`MarkdownDocument` satisfies `Renderable` structurally without coupling to an abstract base class, preserving clean loose coupling.",
                    "vi": "`MarkdownDocument` thỏa mãn giao diện `Renderable` một cách tự nhiên mà không cần kế thừa cứng nhắc từ class trừu tượng."
                  }
                },
                "keyTakeaways": {
                  "en": [
                    "Modern Python uses native collections (`list[T]`, `dict[K, V]`) and pipe unions (`T | None`)",
                    "Type hints are analyzed statically by linters (Mypy/Pyright) and have zero runtime overhead",
                    "Use `typing.Protocol` to define structural contracts without rigid class inheritance hierarchies"
                  ],
                  "vi": [
                    "Python hiện đại dùng các kiểu dữ liệu gốc (`list[T]`, `dict[K, V]`) và toán tử gạch đứng (`T | None`)",
                    "Gợi ý kiểu được kiểm tra tĩnh bởi Mypy/Pyright và hoàn toàn không làm chậm tốc độ chạy",
                    "Dùng `typing.Protocol` để định nghĩa hợp đồng cấu trúc mà không cần cấu trúc kế thừa cứng nhắc"
                  ]
                }
              }
            ],
            "chapterSummary": {
              "mentalModels": {
                "en": [
                  "Type annotations are developer contracts verified at build time by static type checkers",
                  "Protocols formalize duck typing into statically verifiable structural contracts"
                ],
                "vi": [
                  "Type annotation là bản cam kết kỹ thuật được kiểm chứng lúc build bởi công cụ phân tích tĩnh",
                  "Protocol chuẩn hóa tư duy duck typing thành các hợp đồng cấu trúc có thể kiểm tra kiểu tĩnh"
                ]
              },
              "rules": {
                "en": [
                  "Enable strict mode in Mypy or Pyright in CI/CD pipelines to catch bugs before deployment",
                  "Prefer `typing.Protocol` over abstract base classes (`abc.ABC`) for library interfaces"
                ],
                "vi": [
                  "Bật chế độ strict trong Mypy hoặc Pyright ở quy trình CI/CD để phát hiện lỗi sớm",
                  "Ưu tiên dùng `typing.Protocol` hơn là Abstract Base Class (`abc.ABC`) khi thiết kế giao diện thư viện"
                ]
              },
              "commonTraps": {
                "en": [
                  "Assuming Python validates type hints at runtime (e.g. expecting `def f(x: int)` to reject strings automatically)"
                ],
                "vi": [
                  "Lầm tưởng Python tự kiểm tra kiểu lúc chạy (nghĩ rằng khai báo `x: int` thì truyền chuỗi sẽ bị chặn ngay)"
                ]
              },
              "takeaway": {
                "en": "Combining modern type annotations with structural protocols elevates Python codebases to enterprise-grade maintainability without sacrificing the dynamic ergonomics of the language.",
                "vi": "Kết hợp gợi ý kiểu hiện đại và protocol cấu trúc nâng tầm các dự án Python lên chuẩn mực kỹ thuật phần mềm doanh nghiệp mà vẫn giữ trọn sự linh hoạt của ngôn ngữ."
              }
            },
            "selfReview": [
              {
                "question": {
                  "en": "Why does Python not raise a TypeError at runtime when passing a string to `def square(x: int) -> int:`?",
                  "vi": "Tại sao Python không báo lỗi TypeError lúc chạy khi truyền chuỗi vào hàm `def square(x: int) -> int:`?"
                },
                "hint": {
                  "en": "Consider the runtime role of `__annotations__` versus static analysis.",
                  "vi": "Hãy nghĩ về vai trò của từ điển `__annotations__` lúc runtime so với công cụ kiểm tra tĩnh."
                },
                "answer": {
                  "en": "In Python, type hints are purely metadata stored in the function `__annotations__` dictionary. The CPython runtime interpreter completely ignores them during bytecode evaluation to ensure maximum execution performance. Type validation must be performed by static type checkers (like Mypy or Pyright) or runtime validation libraries (like Pydantic).",
                  "vi": "Trong Python, type hint đơn thuần là siêu dữ liệu được lưu trong dictionary `__annotations__` của hàm. Máy ảo CPython hoàn toàn bỏ qua các chú thích này khi thực thi bytecode để đảm bảo tốc độ chạy nhanh nhất. Việc kiểm tra kiểu phải do các công cụ phân tích tĩnh (Mypy, Pyright) hoặc thư viện runtime validation (như Pydantic) đảm nhận."
                }
              }
            ]
          }
        ]
      }
    ],
    "chapters": [
      {
        "id": "py-hb-ch-1",
        "number": 1,
        "partNumber": 1,
        "partTitle": {
          "en": "Python Execution & Object Model",
          "vi": "Mô Hình Thực Thi & Đối Tượng Python"
        },
        "slug": "python-execution-model",
        "title": {
          "en": "The Python Execution Model & Bytecode",
          "vi": "Mô Hình Thực Thi Python & Bytecode"
        },
        "summary": {
          "en": "CPython virtual machine architecture, lexical analysis, AST parsing, bytecode compilation, and the frame evaluation loop.",
          "vi": "Kiến trúc máy ảo CPython, phân tích từ vựng, cây cú pháp AST, biên dịch bytecode và vòng lặp đánh giá khung thực thi."
        },
        "readTimeMinutes": 18,
        "sectionsCount": 4
      },
      {
        "id": "py-hb-ch-2",
        "number": 2,
        "partNumber": 1,
        "partTitle": {
          "en": "Python Execution & Object Model",
          "vi": "Mô Hình Thực Thi & Đối Tượng Python"
        },
        "slug": "names-objects-mutability",
        "title": {
          "en": "Names, Objects, Identity & Mutability",
          "vi": "Tên, Đối Tượng, Định Danh & Tính Khả Biến"
        },
        "summary": {
          "en": "Variables as memory labels, value equality versus identity, mutable vs immutable internals, shallow copies, deep copies, and default argument traps.",
          "vi": "Bản chất biến là nhãn dán bộ nhớ, so sánh giá trị so với định danh, đối tượng khả biến và bất biến, sao chép nông, sao chép sâu và bẫy tham số mặc định."
        },
        "readTimeMinutes": 20,
        "sectionsCount": 5
      },
      {
        "id": "py-hb-ch-3",
        "number": 3,
        "partNumber": 1,
        "partTitle": {
          "en": "Python Execution & Object Model",
          "vi": "Mô Hình Thực Thi & Đối Tượng Python"
        },
        "slug": "modules-packages-imports",
        "title": {
          "en": "Modules, Packages & The Import System",
          "vi": "Modules, Packages & Hệ Thống Import"
        },
        "summary": {
          "en": "Module namespaces, sys.path resolution algorithms, sys.modules caching, PEP 420 namespace packages, and resolving circular import cycles.",
          "vi": "Namespace của module, thuật toán phân giải sys.path, cache sys.modules, namespace packages PEP 420 và xử lý triệt để phụ thuộc vòng circular imports."
        },
        "readTimeMinutes": 16,
        "sectionsCount": 4
      },
      {
        "id": "py-hb-ch-4",
        "number": 4,
        "partNumber": 2,
        "partTitle": {
          "en": "Core Data Structures",
          "vi": "Cấu Trúc Dữ Liệu Cốt Lõi"
        },
        "slug": "numbers-strings-encodings",
        "title": {
          "en": "Numbers, Strings & Encodings",
          "vi": "Số Học, Chuỗi & Mã Hóa Ký Tự"
        },
        "summary": {
          "en": "Arbitrary precision integers, IEEE 754 floating-point nuances, string immutability, f-string parsing, Unicode code points, and the bytes/str boundary.",
          "vi": "Số nguyên chính xác tùy ý, sai số số thực IEEE 754, tính bất biến của chuỗi, cơ chế f-string, mã điểm Unicode và ranh giới giữa bytes và str."
        },
        "readTimeMinutes": 19,
        "sectionsCount": 3
      },
      {
        "id": "py-hb-ch-5",
        "number": 5,
        "partNumber": 2,
        "partTitle": {
          "en": "Core Data Structures",
          "vi": "Cấu Trúc Dữ Liệu Cốt Lõi"
        },
        "slug": "lists-tuples-sequences",
        "title": {
          "en": "Lists, Tuples & Sequences",
          "vi": "Lists, Tuples & Cấu Trúc Dãy Tuần Tự"
        },
        "summary": {
          "en": "Dynamic array growth patterns, list over-allocation algorithms, tuple immutability benefits, sequence slicing internals, and extended iterable unpacking.",
          "vi": "Thuật toán mở rộng mảng động của list, cơ chế cấp phát thừa bộ nhớ, lợi thế của tuple bất biến, bản chất cắt lát sequence và kỹ thuật unpacking nâng cao."
        },
        "readTimeMinutes": 18,
        "sectionsCount": 3
      },
      {
        "id": "py-hb-ch-6",
        "number": 6,
        "partNumber": 2,
        "partTitle": {
          "en": "Core Data Structures",
          "vi": "Cấu Trúc Dữ Liệu Cốt Lõi"
        },
        "slug": "dictionaries-and-sets",
        "title": {
          "en": "Dictionaries & Sets",
          "vi": "Dictionaries & Tập Hợp Sets"
        },
        "summary": {
          "en": "Hash table mechanics, compact dict memory layout in Python 3.6+, the hashability contract (__hash__ and __eq__), collision resolution, and set Venn operations.",
          "vi": "Cơ chế bảng băm hash table, cấu trúc compact dict từ Python 3.6+, quy ước hashable (__hash__ và __eq__), xử lý xung đột băm và các phép toán tập hợp."
        },
        "readTimeMinutes": 20,
        "sectionsCount": 3
      },
      {
        "id": "py-hb-ch-7",
        "number": 7,
        "partNumber": 2,
        "partTitle": {
          "en": "Core Data Structures",
          "vi": "Cấu Trúc Dữ Liệu Cốt Lõi"
        },
        "slug": "comprehensions-iteration-transformation",
        "title": {
          "en": "Comprehensions, Iteration & Transformation",
          "vi": "Comprehensions, Lặp & Chuyển Đổi Dữ Liệu"
        },
        "summary": {
          "en": "List, dict, and set comprehensions, generator expressions for memory conservation, and standard library sequence utilities (zip, enumerate, filter, map, sorted).",
          "vi": "Cú pháp comprehension cho list, dict, set, biểu thức generator tiết kiệm RAM và các hàm tiện ích dãy tuần tự (zip, enumerate, filter, map, sorted)."
        },
        "readTimeMinutes": 17,
        "sectionsCount": 3
      },
      {
        "id": "py-hb-ch-8",
        "number": 8,
        "partNumber": 3,
        "partTitle": {
          "en": "Functions, Scopes & Functional Core",
          "vi": "Hàm, Phạm Vi Biến & Lõi Hàm Học"
        },
        "slug": "functions-parameters-scoping",
        "title": {
          "en": "Functions, Parameters & Scoping Rules",
          "vi": "Hàm, Tham Số & Quy Tắc Phạm Vi LEGB"
        },
        "summary": {
          "en": "The LEGB variable lookup hierarchy, positional-only (/) and keyword-only (*) arguments, closures and __closure__ cell objects, and global vs nonlocal semantics.",
          "vi": "Hệ thống tra cứu biến LEGB, tham số bắt buộc vị trí (/) và bắt buộc từ khóa (*), closure và đối tượng cell __closure__, ý nghĩa từ khóa global và nonlocal."
        },
        "readTimeMinutes": 19,
        "sectionsCount": 3
      },
      {
        "id": "py-hb-ch-9",
        "number": 9,
        "partNumber": 3,
        "partTitle": {
          "en": "Functions, Scopes & Functional Core",
          "vi": "Hàm, Phạm Vi Biến & Lõi Hàm Học"
        },
        "slug": "functions-closures-decorators",
        "title": {
          "en": "First-Class Functions & Decorators",
          "vi": "Hàm First-Class & Cơ Chế Decorators"
        },
        "summary": {
          "en": "Functions as first-class objects, decorator transformation mechanics, metadata preservation with functools.wraps, parameterized decorator factories, and class decorators.",
          "vi": "Bản chất hàm là đối tượng hạng nhất, cơ chế biến đổi decorator, bảo toàn metadata bằng functools.wraps, decorator có tham số và class decorator."
        },
        "readTimeMinutes": 20,
        "sectionsCount": 2
      },
      {
        "id": "py-hb-ch-10",
        "number": 10,
        "partNumber": 3,
        "partTitle": {
          "en": "Functions, Scopes & Functional Core",
          "vi": "Hàm, Phạm Vi Biến & Lõi Hàm Học"
        },
        "slug": "iterators-generators-protocol",
        "title": {
          "en": "Iterators, Generators & The Iteration Protocol",
          "vi": "Iterators, Generators & Giao Thức Lặp"
        },
        "summary": {
          "en": "The iteration protocol (__iter__ and __next__), generator frame pausing and resumption mechanics, StopIteration signaling, and subgenerator delegation with yield from.",
          "vi": "Giao thức lặp (__iter__ và __next__), cơ chế tạm dừng và tiếp tục frame của generator, tín hiệu StopIteration và ủy quyền generator con với yield from."
        },
        "readTimeMinutes": 21,
        "sectionsCount": 3
      },
      {
        "id": "py-hb-ch-11",
        "number": 11,
        "partNumber": 3,
        "partTitle": {
          "en": "Functions, Scopes & Functional Core",
          "vi": "Hàm, Phạm Vi Biến & Lõi Hàm Học"
        },
        "slug": "context-managers-resources",
        "title": {
          "en": "Context Managers & Resource Management",
          "vi": "Context Managers & Quản Lý Tài Nguyên"
        },
        "summary": {
          "en": "The context manager protocol (__enter__ and __exit__), exception suppression rules, the contextlib.contextmanager generator pattern, and async context managers.",
          "vi": "Giao thức context manager (__enter__ và __exit__), quy tắc triệt tiêu ngoại lệ, mẫu generator contextlib.contextmanager và async context manager."
        },
        "readTimeMinutes": 18,
        "sectionsCount": 2
      },
      {
        "id": "py-hb-ch-12",
        "number": 12,
        "partNumber": 4,
        "partTitle": {
          "en": "Object-Oriented Architecture & Metaprogramming",
          "vi": "Kiến Trúc Hướng Đối Tượng & Lập Trình Siêu Cấp"
        },
        "slug": "classes-instances-type-system",
        "title": {
          "en": "Classes, Instances & The Type System",
          "vi": "Classes, Instances & Hệ Thống Kiểu Đối Tượng"
        },
        "summary": {
          "en": "Classes as runtime objects, the type metaclass, the two-phase instantiation pipeline (__new__ allocator vs __init__ initializer), and method binding mechanics.",
          "vi": "Class là đối tượng runtime, metaclass type, quy trình khởi tạo 2 giai đoạn (__new__ cấp phát bộ nhớ vs __init__ khởi tạo thuộc tính) và cơ chế method binding."
        },
        "readTimeMinutes": 20,
        "sectionsCount": 3
      },
      {
        "id": "py-hb-ch-13",
        "number": 13,
        "partNumber": 4,
        "partTitle": {
          "en": "Object-Oriented Architecture & Metaprogramming",
          "vi": "Kiến Trúc Hướng Đối Tượng & Lập Trình Siêu Cấp"
        },
        "slug": "inheritance-mro-super",
        "title": {
          "en": "Inheritance, MRO & super() Mechanics",
          "vi": "Kế Thừa, MRO & Cơ Chế Hoạt Động Của super()"
        },
        "summary": {
          "en": "Multiple inheritance, the C3 Linearization algorithm for Method Resolution Order (MRO), cooperative super() calls without explicit base class hardcoding, and mixin patterns.",
          "vi": "Đa kế thừa, thuật toán tuyến tính hóa C3 để xác định thứ tự MRO, gọi super() hợp tác không phụ thuộc tên class cha và kiến trúc Mixin."
        },
        "readTimeMinutes": 21,
        "sectionsCount": 2
      },
      {
        "id": "py-hb-ch-14",
        "number": 14,
        "partNumber": 4,
        "partTitle": {
          "en": "Object-Oriented Architecture & Metaprogramming",
          "vi": "Kiến Trúc Hướng Đối Tượng & Lập Trình Siêu Cấp"
        },
        "slug": "special-dunder-methods-protocols",
        "title": {
          "en": "Special Methods & Data Model Protocols",
          "vi": "Phương Thức Đặc Biệt & Giao Thức Data Model"
        },
        "summary": {
          "en": "Python Data Model, special dunder methods, __repr__ vs __str__ developer contracts, operator overloading, and implementing sequence, mapping, and numeric protocols.",
          "vi": "Mô hình dữ liệu Python Data Model, các dunder method, quy ước __repr__ và __str__, nạp chồng toán tử và cài đặt giao thức sequence, mapping, số học."
        },
        "readTimeMinutes": 20,
        "sectionsCount": 2
      },
      {
        "id": "py-hb-ch-15",
        "number": 15,
        "partNumber": 4,
        "partTitle": {
          "en": "Object-Oriented Architecture & Metaprogramming",
          "vi": "Kiến Trúc Hướng Đối Tượng & Lập Trình Siêu Cấp"
        },
        "slug": "descriptors-properties-attribute-lookup",
        "title": {
          "en": "Descriptors, Properties & Attribute Lookup",
          "vi": "Descriptors, Properties & Tra Cứu Thuộc Tính"
        },
        "summary": {
          "en": "The definitive attribute lookup precedence hierarchy (__getattribute__ vs __getattr__), data vs non-data descriptors, property mechanics, and __slots__ memory optimization.",
          "vi": "Thứ tự ưu tiên tra cứu thuộc tính (__getattribute__ vs __getattr__), data descriptor và non-data descriptor, cơ chế @property và tối ưu bộ nhớ bằng __slots__."
        },
        "readTimeMinutes": 22,
        "sectionsCount": 3
      },
      {
        "id": "py-hb-ch-16",
        "number": 16,
        "partNumber": 5,
        "partTitle": {
          "en": "Concurrency, Memory & Modern Python",
          "vi": "Đồng Thời, Bộ Nhớ & Python Hiện Đại"
        },
        "slug": "concurrency-gil-asyncio",
        "title": {
          "en": "Concurrency, The GIL & Asyncio",
          "vi": "Lập Trình Đồng Thời, Khóa GIL & Asyncio"
        },
        "summary": {
          "en": "CPython Global Interpreter Lock (GIL) mechanics, CPU-bound vs I/O-bound concurrency tradeoffs, multiprocessing memory boundaries, and the asyncio single-threaded cooperative event loop.",
          "vi": "Cơ chế khóa GIL trong CPython, bài toán CPU-bound vs I/O-bound, đa tiến trình multiprocessing và vòng lặp sự kiện hợp tác đơn luồng của asyncio."
        },
        "readTimeMinutes": 23,
        "sectionsCount": 2
      },
      {
        "id": "py-hb-ch-17",
        "number": 17,
        "partNumber": 5,
        "partTitle": {
          "en": "Concurrency, Memory & Modern Python",
          "vi": "Đồng Thời, Bộ Nhớ & Python Hiện Đại"
        },
        "slug": "type-hints-structural-typing",
        "title": {
          "en": "Modern Type Hints & Structural Subtyping",
          "vi": "Gợi Ý Kiểu Dữ Liệu & Duck Typing Cấu Trúc"
        },
        "summary": {
          "en": "Modern Python typing syntax (PEP 585 & PEP 604), Generics, TypeVar and ParamSpec, runtime inspection vs static analysis, and structural subtyping with typing.Protocol.",
          "vi": "Cú pháp gợi ý kiểu hiện đại (PEP 585 & 604), Generics, TypeVar và ParamSpec, phản chiếu runtime vs kiểm tra tĩnh và duck typing cấu trúc bằng typing.Protocol."
        },
        "readTimeMinutes": 20,
        "sectionsCount": 2
      }
    ]
  },
  {
    "id": "python-core-concepts-definitions",
    "slug": "python-core-concepts-definitions",
    "title": "Python Core Concepts — Definitions",
    "subtitle": {
      "en": "Authoritative Reference Models, Memory Layouts & Language Semantics",
      "vi": "Mô Hình Tham Chiếu Chuẩn Xác, Bố Cục Bộ Nhớ & Ngữ Nghĩa Ngôn Ngữ"
    },
    "bookType": "Definitions",
    "fieldId": "computer-science",
    "domainIds": [
      "programming"
    ],
    "topicId": "python",
    "categoryId": "python",
    "subjectId": "programming",
    "author": "4TM Editorial Board",
    "role": "Language Semantics & Architecture Group",
    "level": "Foundational to Intermediate",
    "estimatedReadTime": "35 mins",
    "chaptersCount": 12,
    "publishedDate": "2025-02-20",
    "accentColor": "from-teal-500 to-emerald-700",
    "tags": [
      "Definitions",
      "Python Semantics",
      "Memory Model",
      "Reference",
      "Object Model"
    ],
    "description": {
      "en": "Rigorous technical definitions and conceptual mental models for the 12 core primitives of the Python runtime.",
      "vi": "Định nghĩa kỹ thuật chuẩn xác và mô hình tư duy trực quan cho 12 khái niệm cốt lõi nhất của môi trường thực thi Python."
    },
    "prerequisites": {
      "en": [
        "Basic Python syntax familiarity",
        "Understanding of variables and functions"
      ],
      "vi": [
        "Làm quen cơ bản với cú pháp Python",
        "Hiểu biết về biến và hàm"
      ]
    },
    "outcomes": {
      "en": [
        "Eliminate conceptual ambiguity surrounding Python object identity and reference binding",
        "Understand the exact mechanical contract of Iterables, Iterators, and Generators",
        "Confidently explain MRO, Descriptors, and Hashability in code reviews and interviews"
      ],
      "vi": [
        "Loại bỏ hoàn toàn sự mơ hồ về định danh đối tượng và liên kết tham chiếu trong Python",
        "Nắm vững quy ước hoạt động chính xác của Iterable, Iterator và Generator",
        "Tự tin giải thích MRO, Descriptor và Hashability trong code review và phỏng vấn kỹ thuật"
      ]
    },
    "chapters": [
      {
        "id": "def-ch-1",
        "number": 1,
        "slug": "name-binding",
        "title": {
          "en": "Name Binding (Variables as Labels)",
          "vi": "Name Binding (Biến Là Nhãn Tham Chiếu)"
        },
        "summary": {
          "en": "In Python, variables are names bound to objects in memory, not memory boxes holding values.",
          "vi": "Trong Python, biến là các nhãn tên được gắn vào đối tượng trong bộ nhớ, không phải là các ô nhớ chứa giá trị."
        },
        "readTimeMinutes": 3,
        "sectionsCount": 1
      },
      {
        "id": "def-ch-2",
        "number": 2,
        "slug": "object-identity",
        "title": {
          "en": "Object Identity & Value Equality (`is` vs `==`)",
          "vi": "Định Danh Đối Tượng & Bằng Nhau Về Giá Trị (`is` vs `==`)"
        },
        "summary": {
          "en": "Identity compares memory pointers (`id(a) == id(b)`), whereas equality checks value equivalency (`a.__eq__(b)`).",
          "vi": "Định danh so sánh địa chỉ bộ nhớ (`id(a) == id(b)`), trong khi so sánh bằng kiểm tra tính tương đương về giá trị (`a.__eq__(b)`)."
        },
        "readTimeMinutes": 3,
        "sectionsCount": 1
      },
      {
        "id": "def-ch-3",
        "number": 3,
        "slug": "mutability",
        "title": {
          "en": "Mutability & Immutability",
          "vi": "Tính Khả Biến & Bất Biến (Mutability)"
        },
        "summary": {
          "en": "Mutable objects allow in-place state modification; immutable objects guarantee constant internal state post-creation.",
          "vi": "Đối tượng khả biến cho phép sửa đổi dữ liệu tại chỗ; đối tượng bất biến đảm bảo trạng thái không đổi sau khi tạo."
        },
        "readTimeMinutes": 3,
        "sectionsCount": 1
      },
      {
        "id": "def-ch-4",
        "number": 4,
        "slug": "iterable",
        "title": {
          "en": "Iterable Protocol",
          "vi": "Giao Thức Khả Lặp (Iterable Protocol)"
        },
        "summary": {
          "en": "An object capable of returning its members one at a time via `__iter__()` or `__getitem__()`.",
          "vi": "Đối tượng có khả năng trả về từng phần tử một lần thông qua phương thức `__iter__()` hoặc `__getitem__()`."
        },
        "readTimeMinutes": 3,
        "sectionsCount": 1
      },
      {
        "id": "def-ch-5",
        "number": 5,
        "slug": "iterator",
        "title": {
          "en": "Iterator Protocol",
          "vi": "Giao Thức Bộ Lặp (Iterator Protocol)"
        },
        "summary": {
          "en": "A stateful stream object that produces values on demand via `__next__()` and raises `StopIteration` when exhausted.",
          "vi": "Đối tượng luồng có trạng thái trả về từng giá trị theo yêu cầu qua `__next__()` và báo `StopIteration` khi kết thúc."
        },
        "readTimeMinutes": 3,
        "sectionsCount": 1
      },
      {
        "id": "def-ch-6",
        "number": 6,
        "slug": "generator",
        "title": {
          "en": "Generator Functions & Expressions",
          "vi": "Hàm Generator & Biểu Thức Sinh (Generators)"
        },
        "summary": {
          "en": "Functions containing `yield` that suspend execution and resume on demand to produce an iterator.",
          "vi": "Hàm chứa từ khóa `yield` có thể tạm dừng thực thi và tiếp tục khi có yêu cầu để tạo ra một iterator."
        },
        "readTimeMinutes": 3,
        "sectionsCount": 1
      },
      {
        "id": "def-ch-7",
        "number": 7,
        "slug": "context-manager",
        "title": {
          "en": "Context Manager Protocol (`with` statement)",
          "vi": "Giao Thức Quản Lý Ngữ Cảnh (`with` statement)"
        },
        "summary": {
          "en": "A protocol guaranteeing resource allocation in `__enter__()` and deterministic cleanup in `__exit__()`.",
          "vi": "Giao thức đảm bảo cấp phát tài nguyên trong `__enter__()` và giải phóng chắc chắn trong `__exit__()`."
        },
        "readTimeMinutes": 3,
        "sectionsCount": 1
      },
      {
        "id": "def-ch-8",
        "number": 8,
        "slug": "descriptor",
        "title": {
          "en": "Descriptor Protocol",
          "vi": "Giao Thức Descriptor (Descriptor Protocol)"
        },
        "summary": {
          "en": "Objects defining attribute access behavior via `__get__()`, `__set__()`, or `__delete__()`.",
          "vi": "Đối tượng định nghĩa hành vi truy cập thuộc tính thông qua `__get__()`, `__set__()`, hoặc `__delete__()`."
        },
        "readTimeMinutes": 4,
        "sectionsCount": 1
      },
      {
        "id": "def-ch-9",
        "number": 9,
        "slug": "namespace",
        "title": {
          "en": "Namespaces & LEGB Scope Resolution",
          "vi": "Không Gian Tên & Quy Tắc Phạm Vi LEGB (Namespaces)"
        },
        "summary": {
          "en": "A mapping of names to objects evaluated hierarchically: Local → Enclosing → Global → Built-in.",
          "vi": "Bảng ánh xạ tên biến tới đối tượng được tra cứu theo thứ tự phân cấp: Local → Enclosing → Global → Built-in."
        },
        "readTimeMinutes": 3,
        "sectionsCount": 1
      },
      {
        "id": "def-ch-10",
        "number": 10,
        "slug": "mro",
        "title": {
          "en": "Method Resolution Order (MRO & C3 Linearization)",
          "vi": "Thứ Tự Phân Giải Phương Thức (MRO & Thuật Toán C3)"
        },
        "summary": {
          "en": "The deterministic sequence of classes inspected when looking up methods during multiple inheritance.",
          "vi": "Trình tự xác định các lớp được kiểm tra khi tìm kiếm phương thức trong đa kế thừa."
        },
        "readTimeMinutes": 3,
        "sectionsCount": 1
      },
      {
        "id": "def-ch-11",
        "number": 11,
        "slug": "hashability",
        "title": {
          "en": "Hashability & Dictionary Key Contract",
          "vi": "Tính Băm Được & Quy Ước Key Trong Dictionary (Hashability)"
        },
        "summary": {
          "en": "An object is hashable if its hash code never changes during its lifetime and supports equality comparisons.",
          "vi": "Một đối tượng là hashable nếu mã băm của nó không đổi suốt vòng đời và hỗ trợ so sánh bằng."
        },
        "readTimeMinutes": 3,
        "sectionsCount": 1
      },
      {
        "id": "def-ch-12",
        "number": 12,
        "slug": "duck-typing",
        "title": {
          "en": "Duck Typing & Structural Subtyping",
          "vi": "Kiểu Vịt & Phân Loại Cấu Trúc (Duck Typing)"
        },
        "summary": {
          "en": "\"If it walks like a duck and quacks like a duck, it is a duck\" — dynamic polymorphism based on interfaces.",
          "vi": "\"Nếu nó đi như vịt và kêu như vịt, nó là con vịt\" — tính đa hình động dựa trên giao diện thay vì phân cấp lớp."
        },
        "readTimeMinutes": 3,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "python-engineering-tips",
    "slug": "python-engineering-tips",
    "title": "Python Engineering Tips & Idioms",
    "subtitle": {
      "en": "High-Impact Idioms, Performance Nuances & Defensive Patterns",
      "vi": "Cú Pháp Tối Ưu, Chi Tiết Hiệu Năng & Quy Chuẩn Lập Trình An Toàn"
    },
    "bookType": "Tips",
    "fieldId": "computer-science",
    "domainIds": [
      "programming"
    ],
    "topicId": "python",
    "categoryId": "python",
    "subjectId": "programming",
    "author": "4TM Editorial Board",
    "role": "Software Craftsmanship Group",
    "level": "Practical / Applied",
    "estimatedReadTime": "25 mins",
    "chaptersCount": 12,
    "publishedDate": "2025-02-20",
    "accentColor": "from-amber-500 to-orange-700",
    "tags": [
      "Tips",
      "Pythonic Idioms",
      "Performance",
      "Clean Code",
      "Best Practices"
    ],
    "description": {
      "en": "Twelve high-impact, battle-tested Python engineering tips to write idiomatic, performant, and bug-resistant code.",
      "vi": "Mười hai mẹo kỹ thuật chuẩn xác và đã được kiểm chứng giúp viết mã Python chuẩn idiomatic, hiệu năng cao và hạn chế lỗi tối đa."
    },
    "prerequisites": {
      "en": [
        "Basic Python scripting experience"
      ],
      "vi": [
        "Kinh nghiệm viết script Python cơ bản"
      ]
    },
    "outcomes": {
      "en": [
        "Replace error-prone imperative patterns with idiomatic built-ins like enumerate, zip, and pathlib",
        "Avoid subtle memory leaks, mutable argument traps, and lost decorator metadata",
        "Produce cleaner, highly maintainable codebases for production teams"
      ],
      "vi": [
        "Thay thế các mẫu code rườm rà bằng các hàm built-in chuẩn như enumerate, zip và pathlib",
        "Tránh bẫy tham số mặc định khả biến, rò rỉ bộ nhớ và mất metadata trong decorator",
        "Xây dựng mã nguồn trong sáng, dễ bảo trì cho các dự án sản phẩm thực tế"
      ]
    },
    "chapters": [
      {
        "id": "tip-ch-1",
        "number": 1,
        "slug": "prefer-enumerate-over-manual-counters",
        "title": {
          "en": "1. Prefer enumerate() Over Manual Counters",
          "vi": "1. Sử Dụng enumerate() Thay Vì Biến Đếm Thủ Công"
        },
        "summary": {
          "en": "Eliminate manual counter initialization and off-by-one errors with native C-speed iteration indexing.",
          "vi": "Loại bỏ việc khởi tạo biến đếm thủ công và lỗi lệch chỉ số bằng hàm duyệt có chỉ mục viết bằng C siêu tốc."
        },
        "readTimeMinutes": 2,
        "sectionsCount": 1
      },
      {
        "id": "tip-ch-2",
        "number": 2,
        "slug": "use-dict-get-and-setdefault",
        "title": {
          "en": "2. Use dict.get() and setdefault() Appropriately",
          "vi": "2. Sử Dụng dict.get() và setdefault() Đúng Hoàn Cảnh"
        },
        "summary": {
          "en": "Avoid KeyError exceptions and double-hash lookups by leveraging fallback retrieval and in-place initialization.",
          "vi": "Tránh ngoại lệ KeyError và việc băm tra cứu 2 lần bằng cách tận dụng fallback mặc định và khởi tạo tại chỗ."
        },
        "readTimeMinutes": 2,
        "sectionsCount": 1
      },
      {
        "id": "tip-ch-3",
        "number": 3,
        "slug": "use-zip-with-strict-true",
        "title": {
          "en": "3. Use zip() with strict=True for Parallel Iteration",
          "vi": "3. Dùng zip() Với strict=True Khi Duyệt Song Song"
        },
        "summary": {
          "en": "Prevent silent data truncation bugs when combining multiple sequences of mismatched lengths.",
          "vi": "Ngăn ngừa lỗi mất mát dữ liệu âm thầm khi ghép các chuỗi có độ dài không bằng nhau."
        },
        "readTimeMinutes": 2,
        "sectionsCount": 1
      },
      {
        "id": "tip-ch-4",
        "number": 4,
        "slug": "prefer-comprehensions-for-clarity",
        "title": {
          "en": "4. Prefer Comprehensions for Clarity (Avoid Side-Effects)",
          "vi": "4. Ưu Tiên Comprehension Khi Rõ Ràng (Tránh Tác Dụng Phụ)"
        },
        "summary": {
          "en": "Use list, set, and dict comprehensions for pure transformations, not for executing procedural side-effects.",
          "vi": "Dùng comprehension cho các phép biến đổi dữ liệu thuần túy, không dùng để thực thi các lệnh có tác dụng phụ."
        },
        "readTimeMinutes": 2,
        "sectionsCount": 1
      },
      {
        "id": "tip-ch-5",
        "number": 5,
        "slug": "avoid-mutable-default-arguments",
        "title": {
          "en": "5. Avoid Mutable Default Arguments with None Sentinel",
          "vi": "5. Tránh Tham Số Mặc Định Khả Biến Bằng Sentinel None"
        },
        "summary": {
          "en": "Default argument expressions are evaluated once at function definition time, leading to shared state bugs.",
          "vi": "Biểu thức tham số mặc định chỉ được tính toán 1 lần duy nhất khi định nghĩa hàm, gây rò rỉ dữ liệu giữa các lần gọi."
        },
        "readTimeMinutes": 2,
        "sectionsCount": 1
      },
      {
        "id": "tip-ch-6",
        "number": 6,
        "slug": "use-functools-wraps-in-decorators",
        "title": {
          "en": "6. Use functools.wraps() in Custom Decorators",
          "vi": "6. Luôn Dùng functools.wraps() Trong Decorator"
        },
        "summary": {
          "en": "Preserve function identity, docstrings, and signature metadata for debuggers and auto-documentation tools.",
          "vi": "Bảo tồn tên hàm, docstring và chữ ký hàm cho công cụ debug và tài liệu tự động."
        },
        "readTimeMinutes": 2,
        "sectionsCount": 1
      },
      {
        "id": "tip-ch-7",
        "number": 7,
        "slug": "use-pathlib-for-filesystem-paths",
        "title": {
          "en": "7. Use pathlib.Path for Filesystem Operations",
          "vi": "7. Sử Dụng pathlib.Path Cho Mọi Thao Tác File"
        },
        "summary": {
          "en": "Replace fragile string concatenations and `os.path` calls with object-oriented cross-platform path manipulation.",
          "vi": "Thay thế nối chuỗi thủ công và `os.path` cũ kỹ bằng thao tác hướng đối tượng tương thích mọi hệ điều hành."
        },
        "readTimeMinutes": 2,
        "sectionsCount": 1
      },
      {
        "id": "tip-ch-8",
        "number": 8,
        "slug": "use-contextlib-contextmanager",
        "title": {
          "en": "8. Use contextlib.contextmanager for Lightweight Resources",
          "vi": "8. Dùng contextlib.contextmanager Cho Context Manager Gọn Nhẹ"
        },
        "summary": {
          "en": "Create custom `with` statement handlers in 5 lines using generators instead of boilerplate classes.",
          "vi": "Tạo bộ quản lý ngữ cảnh `with` trong 5 dòng bằng generator thay vì phải viết class phức tạp."
        },
        "readTimeMinutes": 2,
        "sectionsCount": 1
      },
      {
        "id": "tip-ch-9",
        "number": 9,
        "slug": "use-dataclasses-with-slots-and-frozen",
        "title": {
          "en": "9. Use dataclasses with slots=True and frozen=True",
          "vi": "9. Dùng dataclass Với slots=True và frozen=True"
        },
        "summary": {
          "en": "Boost memory efficiency by 60%+ and ensure thread-safe immutability for data-centric domain models.",
          "vi": "Tiết kiệm hơn 60% bộ nhớ RAM và đảm bảo tính bất biến an toàn đa luồng cho các model dữ liệu."
        },
        "readTimeMinutes": 2,
        "sectionsCount": 1
      },
      {
        "id": "tip-ch-10",
        "number": 10,
        "slug": "explicit-exception-boundaries",
        "title": {
          "en": "10. Use Explicit Exception Boundaries (Never Bare except:)",
          "vi": "10. Bắt Ngoại Lệ Tường Minh (Tuyệt Đối Không Dùng Bare except:)"
        },
        "summary": {
          "en": "Catch specific exception classes to avoid intercepting KeyboardInterrupt and swallowing real bugs.",
          "vi": "Chỉ bắt các lớp ngoại lệ cụ thể để tránh chặn nhầm KeyboardInterrupt và nuốt lỗi hệ thống."
        },
        "readTimeMinutes": 2,
        "sectionsCount": 1
      },
      {
        "id": "tip-ch-11",
        "number": 11,
        "slug": "prefer-generators-for-streaming",
        "title": {
          "en": "11. Prefer Generator Expressions for Streaming Pipelines",
          "vi": "11. Dùng Biểu Thức Generator Để Xử Lý Dữ Liệu Dạng Luồng"
        },
        "summary": {
          "en": "Process millions of records in constant O(1) RAM by chaining lazy generator expressions.",
          "vi": "Xử lý hàng triệu bản ghi với bộ nhớ O(1) không đổi bằng cách kết nối các biểu thức generator lười."
        },
        "readTimeMinutes": 2,
        "sectionsCount": 1
      },
      {
        "id": "tip-ch-12",
        "number": 12,
        "slug": "use-type-hints-for-public-apis",
        "title": {
          "en": "12. Use Type Hints to Clarify Public APIs",
          "vi": "12. Dùng Type Hint Để Làm Rõ Chữ Ký API Công Khai"
        },
        "summary": {
          "en": "Turn functions into self-documenting, IDE-autocomplete friendly contracts validated by mypy.",
          "vi": "Biến hàm thành các hợp đồng tự mô tả, hỗ trợ gợi ý code trong IDE và kiểm tra lỗi tĩnh bằng mypy."
        },
        "readTimeMinutes": 2,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "python-practical-guides-solutions",
    "slug": "python-practical-guides-solutions",
    "title": "Python Practical Guides — From Task to Working Solution",
    "subtitle": {
      "en": "Production-Grade Recipes, Step-by-Step Procedures & Verifications",
      "vi": "Quy Trình Chuẩn Sản Xuất, Từng Bước Triển Khai & Tiêu Chí Kiểm Thử"
    },
    "bookType": "Practical Guides",
    "fieldId": "computer-science",
    "domainIds": [
      "programming"
    ],
    "topicId": "python",
    "categoryId": "python",
    "subjectId": "programming",
    "author": "4TM Editorial Board",
    "role": "Systems & Backend Engineering Group",
    "level": "Intermediate to Advanced",
    "estimatedReadTime": "40 mins",
    "chaptersCount": 6,
    "publishedDate": "2025-02-20",
    "accentColor": "from-blue-600 to-indigo-800",
    "tags": [
      "Practical Guides",
      "Packaging",
      "CLI",
      "Performance",
      "Logging",
      "Type Checking"
    ],
    "description": {
      "en": "Six end-to-end practical implementation guides transforming everyday engineering tasks into robust production solutions.",
      "vi": "Sáu hướng dẫn triển khai thực tế toàn diện giúp chuyển đổi các bài toán kỹ thuật thường gặp thành giải pháp chuẩn sản xuất."
    },
    "prerequisites": {
      "en": [
        "Intermediate Python programming knowledge",
        "Terminal/CLI familiarity"
      ],
      "vi": [
        "Kiến thức lập trình Python trung cấp",
        "Quen thuộc với dòng lệnh terminal"
      ]
    },
    "outcomes": {
      "en": [
        "Standardize project setups with modern PEP 621 pyproject.toml and src/ layouts",
        "Implement atomic JSON writes, streaming file parsers, and POSIX-compliant CLI tools",
        "Deploy structured JSON logging and static type verification across microservices"
      ],
      "vi": [
        "Chuẩn hóa cấu trúc dự án với pyproject.toml (PEP 621) và layout src/ hiện đại",
        "Triển khai ghi file JSON nguyên tử, bộ đọc file dung lượng lớn và công cụ dòng lệnh chuẩn POSIX",
        "Thiết lập hệ thống log JSON có cấu trúc và kiểm tra kiểu tĩnh cho toàn bộ microservice"
      ]
    },
    "chapters": [
      {
        "id": "guide-ch-1",
        "number": 1,
        "slug": "build-modern-python-project-structure",
        "title": {
          "en": "1. Build a Modern Python Project Structure (PEP 621)",
          "vi": "1. Xây Dựng Cấu Trúc Dự Án Python Hiện Đại (PEP 621)"
        },
        "summary": {
          "en": "Set up a professional, clean `src/` layout with declarative `pyproject.toml` configuration and virtual environment isolation.",
          "vi": "Thiết lập cấu trúc layout `src/` chuyên nghiệp với cấu hình `pyproject.toml` chuẩn khai báo và môi trường ảo độc lập."
        },
        "readTimeMinutes": 6,
        "sectionsCount": 1
      },
      {
        "id": "guide-ch-2",
        "number": 2,
        "slug": "safe-json-read-and-write",
        "title": {
          "en": "2. Read & Write JSON Safely in Production",
          "vi": "2. Đọc & Ghi File JSON Chuẩn An Toàn Sản Xuất"
        },
        "summary": {
          "en": "Prevent corrupted half-written files with atomic file replacement and handle large datasets safely.",
          "vi": "Ngăn chặn file bị hỏng do gián đoạn ghi đè bằng kỹ thuật ghi nguyên tử và xử lý an toàn dữ liệu lớn."
        },
        "readTimeMinutes": 6,
        "sectionsCount": 1
      },
      {
        "id": "guide-ch-3",
        "number": 3,
        "slug": "process-large-files-with-generators",
        "title": {
          "en": "3. Process Multi-Gigabyte Files with Generators",
          "vi": "3. Xử Lý File Dung Lượng Lớn Bằng Generator"
        },
        "summary": {
          "en": "Read and transform multi-gigabyte CSV/JSONL files in constant RAM without running out of memory.",
          "vi": "Đọc và xử lý các file CSV/JSONL dung lượng hàng chục GB với bộ nhớ RAM không đổi."
        },
        "readTimeMinutes": 7,
        "sectionsCount": 1
      },
      {
        "id": "guide-ch-4",
        "number": 4,
        "slug": "add-modern-type-checking-and-protocols",
        "title": {
          "en": "4. Add Type Checking with Protocols (mypy)",
          "vi": "4. Kiểm Tra Kiểu Tĩnh Với Protocols (mypy)"
        },
        "summary": {
          "en": "Use structural subtyping with `typing.Protocol` to decouple modules and catch defects before runtime.",
          "vi": "Ứng dụng structural subtyping với `typing.Protocol` để giảm phụ thuộc module và bắt lỗi trước runtime."
        },
        "readTimeMinutes": 7,
        "sectionsCount": 1
      },
      {
        "id": "guide-ch-5",
        "number": 5,
        "slug": "build-reliable-cli-with-argparse",
        "title": {
          "en": "5. Build a Reliable CLI Utility with argparse",
          "vi": "5. Xây Dựng Công Cụ Dòng Lệnh Chuẩn Với argparse"
        },
        "summary": {
          "en": "Construct POSIX-compliant CLI commands with subcommands, standard exit codes, and robust error streams.",
          "vi": "Xây dựng công cụ dòng lệnh chuẩn POSIX với subcommand, mã thoát tiêu chuẩn và luồng xuất lỗi chuyên nghiệp."
        },
        "readTimeMinutes": 7,
        "sectionsCount": 1
      },
      {
        "id": "guide-ch-6",
        "number": 6,
        "slug": "add-structured-json-logging",
        "title": {
          "en": "6. Add Structured JSON Logging & Error Handling",
          "vi": "6. Thiết Lập Hệ Thống Log JSON Có Cấu Trúc"
        },
        "summary": {
          "en": "Emit machine-parsable JSON logs with correlation IDs and set up a top-level unhandled exception hook.",
          "vi": "Xuất log định dạng JSON chuẩn cho máy đọc kèm correlation ID và thiết lập hook bắt lỗi unhandled toàn cục."
        },
        "readTimeMinutes": 7,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "python-common-errors-diagnosis",
    "slug": "python-common-errors-diagnosis",
    "title": "Python Common Errors — Diagnosis & Prevention",
    "subtitle": {
      "en": "Symptom Signatures, Minimal Reproductions & Defensive Guardrails",
      "vi": "Dấu Hiệu Nhận Biết, Tái Hiện Lỗi Tối Giản & Biện Pháp Phòng Ngừa"
    },
    "bookType": "Common Errors",
    "fieldId": "computer-science",
    "domainIds": [
      "programming"
    ],
    "topicId": "python",
    "categoryId": "python",
    "subjectId": "programming",
    "author": "4TM Editorial Board",
    "role": "Reliability & Runtime Diagnostics Group",
    "level": "Practical / All Levels",
    "estimatedReadTime": "30 mins",
    "chaptersCount": 10,
    "publishedDate": "2025-02-20",
    "accentColor": "from-rose-500 to-red-800",
    "tags": [
      "Common Errors",
      "Debugging",
      "Troubleshooting",
      "CPython Diagnostics",
      "Runtime Errors"
    ],
    "description": {
      "en": "Systematic diagnosis, reproduction, root cause analysis, and defensive fixes for the 10 most insidious Python runtime errors.",
      "vi": "Chẩn đoán hệ thống, tái hiện mã lỗi tối giản, phân tích nguyên nhân gốc và giải pháp phòng ngừa cho 10 lỗi runtime phổ biến nhất trong Python."
    },
    "prerequisites": {
      "en": [
        "Basic debugging experience in Python"
      ],
      "vi": [
        "Kinh nghiệm debug cơ bản trong Python"
      ]
    },
    "outcomes": {
      "en": [
        "Instantly recognize exact error signatures and trace them to their root cause in seconds",
        "Fix circular imports, UnboundLocalError, and mutation-during-iteration without guessing",
        "Apply defensive idioms that prevent entire classes of runtime exceptions"
      ],
      "vi": [
        "Nhận diện dấu hiệu lỗi ngay lập tức và truy vết chính xác nguyên nhân gốc chỉ trong vài giây",
        "Sửa dứt điểm lỗi circular import, UnboundLocalError và sửa mảng khi đang duyệt",
        "Áp dụng các mẫu lập trình phòng vệ giúp triệt tiêu hoàn toàn các lớp ngoại lệ runtime"
      ]
    },
    "chapters": [
      {
        "id": "err-ch-1",
        "number": 1,
        "slug": "mutable-default-arguments-leak",
        "title": {
          "en": "1. Mutable Default Arguments (Cross-Call State Leak)",
          "vi": "1. Tham Số Mặc Định Khả Biến (Rò Rỉ Dữ Liệu Giữa Các Lần Gọi)"
        },
        "summary": {
          "en": "Default argument expressions are evaluated once at function definition time, leading to shared state bugs.",
          "vi": "Biểu thức tham số mặc định chỉ được tính toán 1 lần duy nhất khi định nghĩa hàm, gây rò rỉ dữ liệu giữa các lần gọi."
        },
        "readTimeMinutes": 3,
        "sectionsCount": 1
      },
      {
        "id": "err-ch-2",
        "number": 2,
        "slug": "identity-vs-equality-confusion",
        "title": {
          "en": "2. Identity (is) vs Equality (==) Comparison Bugs",
          "vi": "2. Nhầm Lẫn Giữa Toán Tử is Và =="
        },
        "summary": {
          "en": "Using `is` for value comparisons works unpredictably on cached small integers and strings, failing on larger values.",
          "vi": "Dùng `is` để so sánh giá trị hoạt động chập chờn do cơ chế cache số nguyên nhỏ và chuỗi, gây lỗi khi giá trị lớn hơn."
        },
        "readTimeMinutes": 3,
        "sectionsCount": 1
      },
      {
        "id": "err-ch-3",
        "number": 3,
        "slug": "modifying-collection-while-iterating",
        "title": {
          "en": "3. Modifying a Collection While Iterating",
          "vi": "3. Thay Đổi Cấu Trúc Danh Sách Khi Đang Duyệt Vòng Lặp"
        },
        "summary": {
          "en": "Mutating lists or dicts inside a `for` loop skips elements or raises `RuntimeError: dictionary changed size during iteration`.",
          "vi": "Sửa đổi danh sách hoặc từ điển trong vòng lặp làm bỏ sót phần tử hoặc gây lỗi `RuntimeError: dictionary changed size`."
        },
        "readTimeMinutes": 3,
        "sectionsCount": 1
      },
      {
        "id": "err-ch-4",
        "number": 4,
        "slug": "keyerror-direct-dict-access",
        "title": {
          "en": "4. KeyError from Unsafe Direct Dictionary Access",
          "vi": "4. Lỗi KeyError Do Truy Xuất Trực Tiếp Thiếu An Toàn"
        },
        "summary": {
          "en": "Accessing optional dictionary keys directly with `d[k]` crashes when payloads have missing or null properties.",
          "vi": "Truy cập key tùy chọn trực tiếp bằng `d[k]` gây crash khi payload bị thiếu trường dữ liệu."
        },
        "readTimeMinutes": 3,
        "sectionsCount": 1
      },
      {
        "id": "err-ch-5",
        "number": 5,
        "slug": "typeerror-unhashable-or-not-callable",
        "title": {
          "en": "5. TypeError: 'list' object is not callable / unhashable",
          "vi": "5. Lỗi TypeError: 'list' Object Is Not Callable / Unhashable"
        },
        "summary": {
          "en": "Shadowing built-in names like `list` or using mutable containers as dict keys produces confusing TypeErrors.",
          "vi": "Ghi đè tên hàm built-in như `list` hoặc dùng container khả biến làm dict key gây ra lỗi TypeError khó hiểu."
        },
        "readTimeMinutes": 3,
        "sectionsCount": 1
      },
      {
        "id": "err-ch-6",
        "number": 6,
        "slug": "circular-module-import-deadlocks",
        "title": {
          "en": "6. Circular Module Import Deadlocks",
          "vi": "6. Xung Đột Vòng Lặp Import (Circular Imports)"
        },
        "summary": {
          "en": "Mutually dependent top-level imports cause `ImportError: cannot import name ... from partially initialized module`.",
          "vi": "Các module import chéo nhau ở cấp top-level gây lỗi `ImportError: cannot import name ... from partially initialized module`."
        },
        "readTimeMinutes": 3,
        "sectionsCount": 1
      },
      {
        "id": "err-ch-7",
        "number": 7,
        "slug": "unboundlocalerror-referenced-before-assignment",
        "title": {
          "en": "7. UnboundLocalError: Local Variable Referenced Before Assignment",
          "vi": "7. Lỗi UnboundLocalError: Dùng Biến Local Trước Khi Gán"
        },
        "summary": {
          "en": "Assigning to a variable anywhere in a function makes it local across the whole scope, masking outer variables.",
          "vi": "Phép gán biến ở bất kỳ đâu trong hàm sẽ biến nó thành Local cho toàn bộ hàm, che khuất biến bên ngoài."
        },
        "readTimeMinutes": 3,
        "sectionsCount": 1
      },
      {
        "id": "err-ch-8",
        "number": 8,
        "slug": "attributeerror-nonetype-missing-return",
        "title": {
          "en": "8. AttributeError: 'NoneType' Object Has No Attribute",
          "vi": "8. Lỗi AttributeError: 'NoneType' Object Has No Attribute"
        },
        "summary": {
          "en": "Forgetting an explicit `return` statement or calling in-place mutation methods (`list.sort()`) returns `None`.",
          "vi": "Quên câu lệnh `return` hoặc gọi phương thức biến đổi tại chỗ (`list.sort()`) làm hàm trả về `None`."
        },
        "readTimeMinutes": 3,
        "sectionsCount": 1
      },
      {
        "id": "err-ch-9",
        "number": 9,
        "slug": "swallowed-exceptions-bare-except",
        "title": {
          "en": "9. Swallowed Exceptions & Silent Failures with Bare except:",
          "vi": "9. Nuốt Lỗi Âm Thầm Do Dùng Bare except:"
        },
        "summary": {
          "en": "Blanket `try...except:` blocks intercept system exit signals and hide critical logic bugs.",
          "vi": "Khối `try...except:` chung chung chặn nhầm tín hiệu dừng chương trình và giấu nhẹm các lỗi logic nguy hiểm."
        },
        "readTimeMinutes": 3,
        "sectionsCount": 1
      },
      {
        "id": "err-ch-10",
        "number": 10,
        "slug": "blocking-io-in-asyncio",
        "title": {
          "en": "10. Blocking I/O Inside Asyncio Event Loops",
          "vi": "10. Gọi Lệnh I/O Đồng Bộ Gây Nghẽn Asyncio Event Loop"
        },
        "summary": {
          "en": "Calling synchronous blocking functions (`time.sleep()`, `requests.get()`) freezes the entire asynchronous event loop.",
          "vi": "Gọi các hàm I/O đồng bộ (`time.sleep()`, `requests.get()`) làm đóng băng toàn bộ event loop bất đồng bộ."
        },
        "readTimeMinutes": 3,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "python-engineering-best-practices",
    "slug": "python-engineering-best-practices",
    "title": "Python Engineering Best Practices — Standards & Trade-offs",
    "subtitle": {
      "en": "Explicit API Design, Boundary Isolation & Architectural Conventions",
      "vi": "Thiết Kế API Tường Minh, Phân Tách Ranh Giới & Quy Chuẩn Kiến Trúc"
    },
    "bookType": "Best Practices",
    "fieldId": "computer-science",
    "domainIds": [
      "programming"
    ],
    "topicId": "python",
    "categoryId": "python",
    "subjectId": "programming",
    "author": "4TM Editorial Board",
    "role": "Architecture & Engineering Standards Group",
    "level": "Professional / Team Standards",
    "estimatedReadTime": "35 mins",
    "chaptersCount": 8,
    "publishedDate": "2025-02-20",
    "accentColor": "from-emerald-600 to-teal-900",
    "tags": [
      "Best Practices",
      "Architecture",
      "Clean Code",
      "API Design",
      "Production Standards"
    ],
    "description": {
      "en": "Eight fundamental engineering standards for building scalable, testable, and robust Python software in team environments.",
      "vi": "Tám tiêu chuẩn kỹ thuật cốt lõi để xây dựng phần mềm Python có khả năng mở rộng, dễ kiểm thử và ổn định trong môi trường nhóm."
    },
    "prerequisites": {
      "en": [
        "Experience writing multi-module Python applications"
      ],
      "vi": [
        "Kinh nghiệm phát triển ứng dụng Python đa module"
      ]
    },
    "outcomes": {
      "en": [
        "Design clean, side-effect free APIs with explicit contracts and boundary isolation",
        "Establish robust exception hierarchies and structured production observability",
        "Make informed architectural trade-offs between simplicity, maintainability, and raw speed"
      ],
      "vi": [
        "Thiết kế API trong sáng, không tác dụng phụ với hợp đồng rõ ràng và phân tách ranh giới",
        "Xây dựng hệ thống phân cấp ngoại lệ và cơ chế quan sát log chuyên nghiệp cho sản phẩm",
        "Đưa ra các đánh đổi kiến trúc sáng suốt giữa tính đơn giản, khả năng bảo trì và tốc độ"
      ]
    },
    "chapters": [
      {
        "id": "prac-ch-1",
        "number": 1,
        "slug": "explicit-api-design-no-side-effects",
        "title": {
          "en": "1. Explicit API Design: Avoid Hidden Side-Effects",
          "vi": "1. Thiết Kế API Tường Minh: Tránh Tác Dụng Phụ Ẩn"
        },
        "summary": {
          "en": "Design functions that accept inputs, return values, and never mutate caller objects or global state without notice.",
          "vi": "Thiết kế hàm nhận dữ liệu đầu vào, trả về kết quả và không bao giờ tự ý sửa đổi đối tượng truyền vào hoặc biến toàn cục."
        },
        "readTimeMinutes": 4,
        "sectionsCount": 1
      },
      {
        "id": "prac-ch-2",
        "number": 2,
        "slug": "naming-conventions-and-cognitive-load",
        "title": {
          "en": "2. Naming Conventions & Minimizing Cognitive Load",
          "vi": "2. Quy Ước Đặt Tên & Giảm Thiểu Tải Nhận Thức"
        },
        "summary": {
          "en": "Use PEP 8 naming conventions and domain-specific terminology that communicates intent without requiring code inspection.",
          "vi": "Áp dụng quy ước PEP 8 và thuật ngữ nghiệp vụ chuẩn xác giúp thể hiện mục đích của mã nguồn mà không cần đọc chi tiết."
        },
        "readTimeMinutes": 4,
        "sectionsCount": 1
      },
      {
        "id": "prac-ch-3",
        "number": 3,
        "slug": "exception-boundaries-and-domain-errors",
        "title": {
          "en": "3. Exception Boundaries: Custom Domain Exceptions",
          "vi": "3. Phân Tách Ranh Giới Ngoại Lệ: Domain Exception Tùy Biến"
        },
        "summary": {
          "en": "Define domain-specific exception hierarchies and catch technical library errors at subsystem boundaries.",
          "vi": "Định nghĩa cây ngoại lệ nghiệp vụ riêng và chặn các lỗi kỹ thuật tầng thấp tại ranh giới module."
        },
        "readTimeMinutes": 4,
        "sectionsCount": 1
      },
      {
        "id": "prac-ch-4",
        "number": 4,
        "slug": "production-logging-strategy",
        "title": {
          "en": "4. Production Logging: Events, Levels & Payloads",
          "vi": "4. Chiến Lược Ghi Log Sản Xuất: Sự Kiện, Mức Độ & Dữ Liệu"
        },
        "summary": {
          "en": "Log actionable business events with structured key-value context instead of unstructured free-text strings.",
          "vi": "Ghi lại các sự kiện có giá trị với ngữ cảnh dạng key-value có cấu trúc thay vì chuỗi văn bản tự do khó tìm kiếm."
        },
        "readTimeMinutes": 4,
        "sectionsCount": 1
      },
      {
        "id": "prac-ch-5",
        "number": 5,
        "slug": "type-hints-for-public-interfaces",
        "title": {
          "en": "5. Type Annotations for Public Boundaries",
          "vi": "5. Ghi Chú Kiểu Dữ Liệu Cho Các Ranh Giới Công Khai"
        },
        "summary": {
          "en": "Enforce type safety at module boundaries to eliminate null pointer bugs and streamline team refactorings.",
          "vi": "Bắt buộc an toàn kiểu tại ranh giới module để loại bỏ lỗi null pointer và hỗ trợ refactor an toàn."
        },
        "readTimeMinutes": 4,
        "sectionsCount": 1
      },
      {
        "id": "prac-ch-6",
        "number": 6,
        "slug": "testing-at-the-right-boundary",
        "title": {
          "en": "6. Testing at the Right Boundary: Unit vs Integration",
          "vi": "6. Kiểm Thử Đúng Ranh Giới: Unit Test So Với Integration Test"
        },
        "summary": {
          "en": "Test pure business logic with fast in-memory unit tests and verify external network/database I/O with integration suites.",
          "vi": "Kiểm thử logic nghiệp vụ thuần túy bằng unit test siêu tốc và xác thực I/O database/mạng bằng integration test."
        },
        "readTimeMinutes": 4,
        "sectionsCount": 1
      },
      {
        "id": "prac-ch-7",
        "number": 7,
        "slug": "dependency-management-and-pinning",
        "title": {
          "en": "7. Dependency Management & Semantic Version Pinning",
          "vi": "7. Quản Lý Thư Viện Phụ Thuộc & Khóa Phiên Bản (Pinning)"
        },
        "summary": {
          "en": "Pin exact package versions in lockfiles for reproducible production deployments and use range constraints in libraries.",
          "vi": "Khóa chính xác phiên bản trong lockfile cho môi trường production và dùng dải phiên bản linh hoạt cho thư viện."
        },
        "readTimeMinutes": 4,
        "sectionsCount": 1
      },
      {
        "id": "prac-ch-8",
        "number": 8,
        "slug": "explicit-resource-lifecycle-management",
        "title": {
          "en": "8. Explicit Resource Lifecycle & Context Management",
          "vi": "8. Quản Lý Vòng Đời Tài Nguyên & Ngữ Cảnh Tường Minh"
        },
        "summary": {
          "en": "Guarantee deterministic teardown of sockets, database pools, and file handles using context managers.",
          "vi": "Đảm bảo giải phóng socket, connection pool và file handle chắc chắn bằng context manager."
        },
        "readTimeMinutes": 4,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "python-patterns-recipes",
    "slug": "python-patterns-recipes",
    "title": "Python Patterns & Recipes — Reusable Engineering Solutions",
    "subtitle": {
      "en": "Pythonic Design Patterns, Structural Blueprints & Implementation Recipes",
      "vi": "Mẫu Thiết Kế Chuẩn Pythonic, Bản Vẽ Kiến Trúc & Công Thức Thực Thi"
    },
    "bookType": "Patterns / Recipes",
    "fieldId": "computer-science",
    "domainIds": [
      "programming"
    ],
    "topicId": "python",
    "categoryId": "python",
    "subjectId": "programming",
    "author": "4TM Editorial Board",
    "role": "Software Architecture & Design Patterns Group",
    "level": "Intermediate to Advanced",
    "estimatedReadTime": "45 mins",
    "chaptersCount": 8,
    "publishedDate": "2025-02-20",
    "accentColor": "from-violet-600 to-purple-900",
    "tags": [
      "Patterns",
      "Design Patterns",
      "Architecture",
      "Recipes",
      "Concurrency",
      "OOP"
    ],
    "description": {
      "en": "Eight production-grade structural patterns and reusable engineering recipes written in modern Pythonic idioms.",
      "vi": "Tám mẫu thiết kế cấu trúc chuẩn sản xuất và công thức kỹ thuật tái sử dụng được viết theo phong cách Pythonic hiện đại."
    },
    "prerequisites": {
      "en": [
        "Object-oriented Python proficiency",
        "Basic concurrency and architectural knowledge"
      ],
      "vi": [
        "Thành thạo lập trình hướng đối tượng trong Python",
        "Hiểu biết cơ bản về concurrency và kiến trúc"
      ]
    },
    "outcomes": {
      "en": [
        "Implement Strategy, Factory, and Repository patterns cleanly using modern Python features",
        "Build resilient retries with jitter, safe concurrent worker pipelines, and immutable config loaders",
        "Choose the right pattern for each problem without over-engineering or premature abstraction"
      ],
      "vi": [
        "Triển khai các mẫu Strategy, Factory và Repository chuẩn mực bằng tính năng Python hiện đại",
        "Xây dựng cơ chế retry với jitter, pipeline đa luồng an toàn và bộ nạp cấu hình bất biến",
        "Lựa chọn đúng mẫu thiết kế cho từng bài toán mà không làm phức tạp hóa kiến trúc quá mức"
      ]
    },
    "chapters": [
      {
        "id": "pat-ch-1",
        "number": 1,
        "slug": "strategy-pattern-with-callables",
        "title": {
          "en": "1. Strategy Pattern Using Callables & Protocols",
          "vi": "1. Mẫu Strategy Sử Dụng Callable & Protocol"
        },
        "summary": {
          "en": "Swap algorithms dynamically at runtime using Python's first-class functions instead of verbose class hierarchies.",
          "vi": "Thay đổi thuật toán linh hoạt lúc runtime bằng hàm first-class của Python thay vì phải tạo cây class rườm rà."
        },
        "readTimeMinutes": 5,
        "sectionsCount": 1
      },
      {
        "id": "pat-ch-2",
        "number": 2,
        "slug": "factory-pattern-with-registry",
        "title": {
          "en": "2. Factory Pattern with Classmethod & Registry",
          "vi": "2. Mẫu Factory Với Classmethod & Bảng Đăng Ký (Registry)"
        },
        "summary": {
          "en": "Decouple object creation from concrete types using dictionary-driven class registration decorators.",
          "vi": "Tách rời việc khởi tạo đối tượng khỏi các kiểu cụ thể bằng decorator tự đăng ký vào từ điển registry."
        },
        "readTimeMinutes": 5,
        "sectionsCount": 1
      },
      {
        "id": "pat-ch-3",
        "number": 3,
        "slug": "repository-pattern-persistence-isolation",
        "title": {
          "en": "3. Repository Pattern for Persistence Isolation",
          "vi": "3. Mẫu Repository Phân Tách Tầng Lưu Trữ Dữ Liệu"
        },
        "summary": {
          "en": "Isolate database queries and ORMs behind clean domain interfaces for painless unit testing and database switching.",
          "vi": "Cách ly các câu lệnh truy vấn database và ORM phía sau giao diện domain để unit test và đổi database dễ dàng."
        },
        "readTimeMinutes": 6,
        "sectionsCount": 1
      },
      {
        "id": "pat-ch-4",
        "number": 4,
        "slug": "retry-pattern-exponential-backoff-jitter",
        "title": {
          "en": "4. Resilient Retry Pattern with Exponential Backoff & Jitter",
          "vi": "4. Mẫu Retry Phục Hồi Lỗi Với Exponential Backoff & Jitter"
        },
        "summary": {
          "en": "Handle transient network hiccups gracefully without overwhelming downstream services in a thundering herd.",
          "vi": "Xử lý lỗi mạng tạm thời thông minh mà không làm sập dịch vụ đích do hiệu ứng thundering herd."
        },
        "readTimeMinutes": 5,
        "sectionsCount": 1
      },
      {
        "id": "pat-ch-5",
        "number": 5,
        "slug": "custom-context-manager-nested-resources",
        "title": {
          "en": "5. Custom Context Manager for Nested Resources",
          "vi": "5. Mẫu Quản Lý Ngữ Cảnh Cho Tài Nguyên Lồng Nhau"
        },
        "summary": {
          "en": "Coordinate the orderly acquisition and reverse-order release of multiple dependent resources safely.",
          "vi": "Điều phối việc cấp phát tuần tự và giải phóng theo thứ tự ngược lại cho nhiều tài nguyên phụ thuộc nhau."
        },
        "readTimeMinutes": 5,
        "sectionsCount": 1
      },
      {
        "id": "pat-ch-6",
        "number": 6,
        "slug": "producer-consumer-worker-queue",
        "title": {
          "en": "6. Producer–Consumer Pattern with queue.Queue",
          "vi": "6. Mẫu Producer–Consumer Với queue.Queue"
        },
        "summary": {
          "en": "Decouple fast data producers from slow I/O consumers using thread-safe bounded in-memory queues.",
          "vi": "Tách rời bên tạo dữ liệu nhanh và bên xử lý I/O chậm bằng hàng đợi đa luồng an toàn có giới hạn kích thước."
        },
        "readTimeMinutes": 6,
        "sectionsCount": 1
      },
      {
        "id": "pat-ch-7",
        "number": 7,
        "slug": "type-safe-config-with-dataclass",
        "title": {
          "en": "7. Type-Safe Configuration with Immutable Dataclasses",
          "vi": "7. Cấu Hình Type-Safe Với Dataclass Bất Biến"
        },
        "summary": {
          "en": "Parse environment variables into strongly typed, validated, and immutable settings objects at application startup.",
          "vi": "Đọc biến môi trường và chuyển thành đối tượng cấu hình có định kiểu mạnh, kiểm tra hợp lệ và bất biến lúc khởi động."
        },
        "readTimeMinutes": 5,
        "sectionsCount": 1
      },
      {
        "id": "pat-ch-8",
        "number": 8,
        "slug": "adapter-pattern-external-apis",
        "title": {
          "en": "8. Adapter Pattern for Wrapping External 3rd-Party APIs",
          "vi": "8. Mẫu Adapter Bao Bọc API Bên Thứ Ba"
        },
        "summary": {
          "en": "Wrap vendor SDKs inside unified application interfaces so changes to third-party APIs never break your domain logic.",
          "vi": "Bao bọc SDK bên thứ ba trong giao diện ứng dụng thống nhất để thay đổi từ nhà cung cấp không làm hỏng logic hệ thống."
        },
        "readTimeMinutes": 5,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "sql-handbook",
    "slug": "sql-handbook",
    "title": "SQL Handbook",
    "subtitle": {
      "en": "Relational Foundations, Set Algebra, Query Reasoning & Storage Engine Mechanics",
      "vi": "Nền Tảng Mô Hình Quan Hệ, Đại Số Tập Hợp, Lập Luận Truy Vấn & Cơ Chế Storage Engine"
    },
    "bookType": "Handbook",
    "fieldId": "computer-science",
    "domainIds": [
      "data-analytics"
    ],
    "topicId": "sql",
    "categoryId": "sql",
    "subjectId": "storage",
    "author": "4TM Technical Board",
    "role": "Core Database Engineering Group",
    "level": "Comprehensive",
    "estimatedReadTime": "45 mins",
    "chaptersCount": 4,
    "publishedDate": "2025-02-10",
    "accentColor": "from-blue-600 to-indigo-800",
    "tags": [
      "SQL",
      "Relational Model",
      "PostgreSQL",
      "DBMS",
      "Query Reasoning",
      "Indexes",
      "ACID"
    ],
    "description": {
      "en": "Comprehensive reference handbook covering relational algebra, constraints, three-valued NULL logic, JOIN mechanics, aggregation filters, subqueries vs CTEs, and B-Tree indexing.",
      "vi": "Cẩm nang tra cứu toàn diện về đại số quan hệ, ràng buộc schema, logic ba giá trị với NULL, cơ chế JOIN, bộ lọc tổng hợp, subquery so với CTE và tối ưu hóa chỉ mục B-Tree."
    },
    "prerequisites": {
      "en": [
        "Basic relational database concepts and relational table terminology",
        "Fundamental experience executing basic SELECT, INSERT, UPDATE queries"
      ],
      "vi": [
        "Khái niệm cơ bản về cơ sở dữ liệu quan hệ và thuật ngữ bảng dữ liệu",
        "Kinh nghiệm thực thi các câu lệnh SELECT, INSERT, UPDATE căn bản"
      ]
    },
    "outcomes": {
      "en": [
        "Master relational algebra constraints and three-valued logic truth tables",
        "Predict and reason through JOIN algorithms (Hash Join, Merge Join, Nested Loop)",
        "Distinguish logical query processing order from physical execution plans",
        "Design SARGable queries and understand B-Tree index page traversals"
      ],
      "vi": [
        "Làm chủ các ràng buộc đại số quan hệ và bảng chân trị logic 3 giá trị của SQL",
        "Phán đoán và lập luận chính xác các thuật toán JOIN (Hash Join, Merge Join, Nested Loop)",
        "Phân biệt thứ tự xử lý truy vấn logic và kế hoạch thực thi vật lý",
        "Thiết kế truy vấn chuẩn SARGable và hiểu cách bộ nhớ duyệt cây chỉ mục B-Tree"
      ]
    },
    "parts": [
      {
        "partNumber": 1,
        "title": {
          "en": "Relational Model, Constraints & Three-Valued Logic",
          "vi": "Mô Hình Quan Hệ, Ràng Buộc Schema & Logic 3 Giá Trị"
        },
        "description": {
          "en": "Mathematical foundations of relations, keys, referential actions, and NULL semantics.",
          "vi": "Nền tảng toán học của quan hệ, khóa, hành vi tham chiếu và ngữ nghĩa của giá trị NULL."
        },
        "chapterIds": [
          "sql-hb-ch-1"
        ]
      },
      {
        "partNumber": 2,
        "title": {
          "en": "Set Operations, JOIN Algorithms & Logical Query Reasoning",
          "vi": "Phép Toán Tập Hợp, Thuật Toán JOIN & Thứ Tự Xử Lý Truy Vấn"
        },
        "description": {
          "en": "Engine-level JOIN execution plans, aggregation mechanics, and CTEs vs subqueries.",
          "vi": "Kế hoạch thực thi JOIN ở tầng engine, cơ chế tổng hợp và so sánh CTE với subquery."
        },
        "chapterIds": [
          "sql-hb-ch-2",
          "sql-hb-ch-3"
        ]
      },
      {
        "partNumber": 3,
        "title": {
          "en": "Index Traversal, SARGability & ACID Transaction Guarantees",
          "vi": "Cấu Trúc B-Tree, Tính SARGable & Đảm Bảo Giao Dịch ACID"
        },
        "description": {
          "en": "B-Tree leaf scan mechanics, non-SARGable pitfalls, and transaction isolation boundaries.",
          "vi": "Cơ chế quét lá B-Tree, cạm bẫy non-SARGable và ranh giới cô lập giao dịch ACID."
        },
        "chapterIds": [
          "sql-hb-ch-4"
        ]
      }
    ],
    "chapters": [
      {
        "id": "sql-hb-ch-1",
        "number": 1,
        "partNumber": 1,
        "partTitle": {
          "en": "Relational Model, Constraints & Three-Valued Logic",
          "vi": "Mô Hình Quan Hệ, Ràng Buộc Schema & Logic 3 Giá Trị"
        },
        "slug": "relational-model-and-ddl",
        "title": {
          "en": "Relational Model, Schema Constraints & Three-Valued Logic",
          "vi": "Mô Hình Quan Hệ, Ràng Buộc Schema & Logic Ba Giá Trị"
        },
        "summary": {
          "en": "Primary keys, foreign keys, cascading deletion rules, check constraints, and three-valued NULL logic truth tables.",
          "vi": "Khóa chính, khóa ngoại, quy tắc xóa cascade, ràng buộc CHECK và bảng chân trị logic 3 giá trị của NULL."
        },
        "readTimeMinutes": 14,
        "sectionsCount": 1
      },
      {
        "id": "sql-hb-ch-2",
        "number": 2,
        "partNumber": 2,
        "partTitle": {
          "en": "Set Operations, JOIN Algorithms & Logical Query Reasoning",
          "vi": "Phép Toán Tập Hợp, Thuật Toán JOIN & Thứ Tự Xử Lý Truy Vấn"
        },
        "slug": "sql-join-mechanics",
        "title": {
          "en": "Mastering SQL JOIN Types, Set Algebra & Execution Algorithms",
          "vi": "Làm Chủ Các Phép JOIN, Đại Số Tập Hợp & Thuật Toán Thực Thi"
        },
        "summary": {
          "en": "Set-theoretic foundations of INNER, LEFT, RIGHT, FULL OUTER, and CROSS joins with Hash Join, Merge Join, and Nested Loop algorithms.",
          "vi": "Nền tảng tập hợp của INNER, LEFT, RIGHT, FULL OUTER, CROSS JOIN kết hợp phân tích thuật toán Hash Join, Merge Join và Nested Loop."
        },
        "readTimeMinutes": 16,
        "sectionsCount": 1
      },
      {
        "id": "sql-hb-ch-3",
        "number": 3,
        "partNumber": 2,
        "partTitle": {
          "en": "Set Operations, JOIN Algorithms & Logical Query Reasoning",
          "vi": "Phép Toán Tập Hợp, Thuật Toán JOIN & Thứ Tự Xử Lý Truy Vấn"
        },
        "slug": "aggregations-group-by",
        "title": {
          "en": "Logical Query Processing Order, Subqueries & Common Table Expressions",
          "vi": "Thứ Tự Xử Lý Truy Vấn Logic, Truy Vấn Con & Biểu Thức Bảng Chung (CTE)"
        },
        "summary": {
          "en": "The 8-step logical execution sequence, WHERE vs HAVING filtering boundaries, and correlated subqueries compared with CTE optimization.",
          "vi": "Quy trình 8 bước xử lý truy vấn logic, ranh giới lọc giữa WHERE và HAVING, cùng so sánh subquery tương quan với CTE."
        },
        "readTimeMinutes": 18,
        "sectionsCount": 1
      },
      {
        "id": "sql-hb-ch-4",
        "number": 4,
        "partNumber": 3,
        "partTitle": {
          "en": "Index Traversal, SARGability & ACID Transaction Guarantees",
          "vi": "Cấu Trúc B-Tree, Tính SARGable & Đảm Bảo Giao Dịch ACID"
        },
        "slug": "indexes-and-transactions",
        "title": {
          "en": "B-Tree Index Traversals, SARGability & ACID Transaction Boundaries",
          "vi": "Duyệt Chỉ Mục B-Tree, Tính SARGable & Ranh Giới Giao Dịch ACID"
        },
        "summary": {
          "en": "B-Tree leaf page traversal mechanics, left-prefix indexing rules, non-SARGable operator pitfalls, and ACID transaction isolation guarantees.",
          "vi": "Cơ chế duyệt lá cây B-Tree, quy tắc tiền tố bên trái (leftmost prefix), cạm bẫy non-SARGable và các đảm bảo cô lập giao dịch ACID."
        },
        "readTimeMinutes": 19,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "sql-definitions",
    "slug": "sql-definitions",
    "title": "SQL Definitions",
    "subtitle": {
      "en": "Core Relational Models, Isolation Levels & Storage Mechanics",
      "vi": "Mô Hình Quan Hệ Cốt Lõi, Mức Độ Cô Lập & Cơ Chế Lưu Trữ"
    },
    "bookType": "Definitions",
    "fieldId": "computer-science",
    "domainIds": [
      "data-analytics"
    ],
    "topicId": "sql",
    "categoryId": "sql",
    "subjectId": "data-analytics",
    "author": "4TM Editorial Board",
    "role": "Database Architecture & Storage Engine Group",
    "level": "Foundational to Intermediate",
    "estimatedReadTime": "28 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-20",
    "accentColor": "from-cyan-600 to-blue-800",
    "tags": [
      "Definitions",
      "SQL",
      "ACID",
      "MVCC",
      "Transactions",
      "Storage Engines"
    ],
    "description": {
      "en": "Rigorous technical definitions, mental models, and formal mechanics for the core relational primitives, transaction isolation levels, and storage engine internals in modern SQL databases.",
      "vi": "Định nghĩa kỹ thuật chuẩn xác, mô hình tư duy trực quan và cơ chế chính thức cho các thành phần quan hệ cốt lõi, mức độ cô lập giao dịch và cơ chế storage engine trong cơ sở dữ liệu SQL hiện đại."
    },
    "prerequisites": {
      "en": [
        "Basic SQL query knowledge (SELECT, INSERT, UPDATE, DELETE)",
        "Familiarity with relational tables, primary keys, and foreign keys"
      ],
      "vi": [
        "Kiến thức truy vấn SQL cơ bản (SELECT, INSERT, UPDATE, DELETE)",
        "Làm quen với bảng quan hệ, khóa chính (Primary Key) và khóa ngoại (Foreign Key)"
      ]
    },
    "outcomes": {
      "en": [
        "Master the precise ANSI SQL definitions of all four transaction isolation levels",
        "Distinguish Dirty Reads, Non-Repeatable Reads, Phantom Reads, and Serialization Anomalies",
        "Understand the physical mechanics of Multi-Version Concurrency Control (MVCC) and Write-Ahead Logging (WAL)"
      ],
      "vi": [
        "Nắm vững định nghĩa kỹ thuật ANSI SQL của toàn bộ 4 mức độ cô lập giao dịch",
        "Phân biệt rõ ràng Dirty Reads, Non-Repeatable Reads, Phantom Reads và Lỗi Tuần Tự Hóa (Serialization Anomalies)",
        "Hiểu sâu cơ chế vật lý của Đa Phiên Bản Kiểm Soát Đồng Thời (MVCC) và Nhật Ký Ghi Trước (WAL)"
      ]
    },
    "chapters": [
      {
        "id": "sql-def-ch-1",
        "number": 1,
        "slug": "acid-isolation-levels",
        "title": {
          "en": "ACID Guarantees & Transaction Isolation Levels",
          "vi": "Bảo Đảm ACID & Các Mức Độ Cô Lập Giao Dịch"
        },
        "summary": {
          "en": "Formal definitions of transaction isolation levels under ANSI SQL and the concurrency anomalies they prevent.",
          "vi": "Định nghĩa chuẩn hóa các mức độ cô lập giao dịch theo tiêu chuẩn ANSI SQL và các bất thường đồng thời mà chúng ngăn chặn."
        },
        "readTimeMinutes": 14,
        "sectionsCount": 2
      },
      {
        "id": "sql-def-ch-2",
        "number": 2,
        "slug": "storage-engine-concurrency-glossary",
        "title": {
          "en": "Storage Engine & Concurrency Mechanics",
          "vi": "Storage Engine & Cơ Chế Xử Lý Đồng Thời"
        },
        "summary": {
          "en": "Core technical definitions for Multi-Version Concurrency Control (MVCC), tuple visibility, and Write-Ahead Logging (WAL).",
          "vi": "Định nghĩa kỹ thuật cốt lõi cho Kiểm Soát Đồng Thời Đa Phiên Bản (MVCC), khả năng hiển thị bộ dữ liệu và Nhật Ký Ghi Trước (WAL)."
        },
        "readTimeMinutes": 14,
        "sectionsCount": 2
      }
    ]
  },
  {
    "id": "sql-query-patterns",
    "slug": "sql-query-patterns",
    "title": "SQL Query Patterns & Formulas",
    "subtitle": {
      "en": "Window Functions, Recursive CTEs & Advanced Analytical Recipes",
      "vi": "Window Functions, CTE Đệ Quy & Các Mẫu Truy Vấn Phân Tích Nâng Cao"
    },
    "bookType": "Patterns / Recipes",
    "fieldId": "computer-science",
    "domainIds": [
      "data-analytics"
    ],
    "topicId": "sql",
    "categoryId": "sql",
    "subjectId": "data-analytics",
    "author": "4TM Editorial Board",
    "role": "Data Engineering & Analytics Architecture Group",
    "level": "Intermediate to Advanced",
    "estimatedReadTime": "28 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-20",
    "accentColor": "from-violet-600 to-indigo-800",
    "tags": [
      "Patterns",
      "Recipes",
      "SQL",
      "Window Functions",
      "Recursive CTE",
      "Analytics",
      "Hierarchies"
    ],
    "description": {
      "en": "Production-tested SQL query patterns and reusable analytical recipes for running totals, moving averages, Top-N per group deduplication, and recursive CTE graph traversals with cycle detection.",
      "vi": "Các mẫu truy vấn SQL đã được kiểm chứng thực tế và công thức phân tích có thể tái sử dụng cho tính tổng dồn, trung bình trượt, lấy Top-N theo nhóm và duyệt cấu trúc cây đệ quy có kiểm soát vòng lặp."
    },
    "prerequisites": {
      "en": [
        "Strong proficiency with standard SQL syntax and JOIN operations",
        "Understanding of Common Table Expressions (WITH clauses) and aggregation (GROUP BY)"
      ],
      "vi": [
        "Thành thạo cú pháp SQL tiêu chuẩn và các phép toán JOIN",
        "Hiểu biết về Common Table Expression (mệnh đề WITH) và gom nhóm dữ liệu (GROUP BY)"
      ]
    },
    "outcomes": {
      "en": [
        "Master explicit sliding window frames (ROWS vs RANGE) for cumulative and moving aggregates",
        "Solve Top-N per category problems cleanly using ROW_NUMBER(), DENSE_RANK(), and CTEs",
        "Author robust, cycle-safe recursive CTE queries to traverse organizational hierarchies and graphs"
      ],
      "vi": [
        "Làm chủ cú pháp khung cửa sổ trượt (ROWS vs RANGE) cho các phép tính lũy kế và trung bình động",
        "Giải quyết triệt để bài toán lấy Top-N theo danh mục bằng ROW_NUMBER(), DENSE_RANK() và CTE",
        "Xây dựng các truy vấn CTE đệ quy an toàn, chống lặp vô tận khi duyệt cây phân cấp và đồ thị"
      ]
    },
    "chapters": [
      {
        "id": "sql-qp-ch-1",
        "number": 1,
        "slug": "analytics-patterns-window-functions",
        "title": {
          "en": "Analytics Patterns with Window Functions",
          "vi": "Các Mẫu Phân Tích Dữ Liệu Với Window Functions"
        },
        "summary": {
          "en": "High-performance analytical recipes using SQL window functions, partition clauses, and explicit frame specifications.",
          "vi": "Các công thức phân tích hiệu năng cao sử dụng window functions trong SQL, phân vùng dữ liệu và định nghĩa khung trượt."
        },
        "readTimeMinutes": 14,
        "sectionsCount": 2
      },
      {
        "id": "sql-qp-ch-2",
        "number": 2,
        "slug": "recursive-ctes-hierarchical-graphs",
        "title": {
          "en": "Recursive CTEs for Hierarchical Graphs",
          "vi": "CTE Đệ Quy Cho Cấu Trúc Cây & Đồ Thị"
        },
        "summary": {
          "en": "Production recipes for traversing organizational charts, threaded comments, and graph structures with cycle detection.",
          "vi": "Các mẫu truy vấn thực tế để duyệt sơ đồ tổ chức, bình luận phân cấp và cấu trúc đồ thị có kiểm soát vòng lặp."
        },
        "readTimeMinutes": 14,
        "sectionsCount": 2
      }
    ]
  },
  {
    "id": "sql-common-errors",
    "slug": "sql-common-errors",
    "title": "SQL Common Errors",
    "subtitle": {
      "en": "Diagnosis, Three-Valued Logic Pitfalls & Non-Sargable Query Traps",
      "vi": "Chẩn Đoán, Cạm Bẫy Logic Tam Trị & Lỗi Truy Vấn Non-Sargable"
    },
    "bookType": "Common Errors",
    "fieldId": "computer-science",
    "domainIds": [
      "data-analytics"
    ],
    "topicId": "sql",
    "categoryId": "sql",
    "subjectId": "data-analytics",
    "author": "4TM Editorial Board",
    "role": "Database Reliability & Query Optimization Group",
    "level": "Practical / Applied",
    "estimatedReadTime": "26 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-20",
    "accentColor": "from-rose-600 to-amber-700",
    "tags": [
      "Common Errors",
      "SQL",
      "NULL",
      "Three-Valued Logic",
      "Sargability",
      "Debugging",
      "Indexes"
    ],
    "description": {
      "en": "Systematic root-cause diagnosis, minimal reproductions, and defensive engineering patterns for the most deceptive SQL bugs, including Three-Valued Logic NULL drops, the NOT IN subquery anomaly, and non-sargable full table scans.",
      "vi": "Chẩn đoán nguyên nhân gốc rễ, mã tái hiện tối giản và giải pháp kỹ thuật phòng ngừa cho các lỗi SQL tinh vi nhất, bao gồm logic tam trị loại bỏ NULL, bẫy subquery NOT IN và quét toàn bảng do biểu thức non-sargable."
    },
    "prerequisites": {
      "en": [
        "Intermediate SQL query writing (JOINs, WHERE, GROUP BY, Subqueries)",
        "Basic understanding of B-Tree database indexes and query planners"
      ],
      "vi": [
        "Kỹ năng viết truy vấn SQL trung cấp (JOINs, WHERE, GROUP BY, Subqueries)",
        "Hiểu biết cơ bản về chỉ mục B-Tree và bộ lập kế hoạch truy vấn (query planner)"
      ]
    },
    "outcomes": {
      "en": [
        "Diagnose and prevent silent row omissions caused by ANSI SQL Three-Valued Logic (3VL)",
        "Resolve the catastrophic zero-row result bug when combining NOT IN with nullable subqueries",
        "Refactor non-sargable function calls into index-friendly range predicates to avoid full table scans"
      ],
      "vi": [
        "Chẩn đoán và khắc phục hiện tượng mất dòng ngầm do logic tam trị (3VL) trong chuẩn ANSI SQL",
        "Xử lý triệt để lỗi truy vấn trả về 0 dòng khi sử dụng toán tử NOT IN với tập con chứa giá trị NULL",
        "Tái cấu trúc các hàm non-sargable thành các điều kiện phạm vi thân thiện với chỉ mục để ngăn quét toàn bảng"
      ]
    },
    "chapters": [
      {
        "id": "sql-err-ch-1",
        "number": 1,
        "slug": "null-values-three-valued-logic",
        "title": {
          "en": "NULL Values & Three-Valued Logic Pitfalls",
          "vi": "Giá Trị NULL & Cạm Bẫy Logic Tam Trị"
        },
        "summary": {
          "en": "Diagnosing silent row omission and unexpected empty sets caused by SQL ANSI Three-Valued Logic.",
          "vi": "Chẩn đoán hiện tượng bỏ sót dòng ngầm và kết quả rỗng bất ngờ do logic tam trị trong ANSI SQL."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 2
      },
      {
        "id": "sql-err-ch-2",
        "number": 2,
        "slug": "non-sargable-predicates-performance",
        "title": {
          "en": "Non-Sargable Predicates & Query Performance Gotchas",
          "vi": "Vị Từ Non-Sargable & Các Lỗi Hiệu Năng Truy Vấn"
        },
        "summary": {
          "en": "Diagnosing full table scans caused by function-wrapped indexed columns and implicit data type coercion.",
          "vi": "Chẩn đoán hiện tượng quét toàn bảng do bọc hàm trên cột chỉ mục và chuyển đổi kiểu dữ liệu ngầm định."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 2
      }
    ]
  },
  {
    "id": "sql-best-practices",
    "slug": "sql-best-practices",
    "title": "SQL Best Practices",
    "subtitle": {
      "en": "Indexing Architecture, Plan Execution & Professional Query Design",
      "vi": "Kiến Trúc Đánh Chỉ Mục, Thực Thi Kế Hoạch & Thiết Kế Truy Vấn Chuyên Nghiệp"
    },
    "bookType": "Best Practices",
    "fieldId": "computer-science",
    "domainIds": [
      "data-analytics"
    ],
    "topicId": "sql",
    "categoryId": "sql",
    "subjectId": "data-analytics",
    "author": "4TM Editorial Board",
    "role": "Database Performance & Infrastructure Group",
    "level": "Professional / Team Standards",
    "estimatedReadTime": "28 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-20",
    "accentColor": "from-indigo-600 to-sky-700",
    "tags": [
      "Best Practices",
      "SQL",
      "Performance",
      "Indexing",
      "EXPLAIN ANALYZE",
      "Query Optimization"
    ],
    "description": {
      "en": "Professional architectural standards and trade-off analyses for database index design, execution plan profiling with EXPLAIN ANALYZE, covering index strategies, and partial indexing.",
      "vi": "Tiêu chuẩn kiến trúc chuyên nghiệp và phân tích đánh đổi cho thiết kế chỉ mục cơ sở dữ liệu, phân tích kế hoạch thực thi với EXPLAIN ANALYZE, chiến lược covering index và chỉ mục một phần."
    },
    "prerequisites": {
      "en": [
        "Experience authoring production SQL queries",
        "Familiarity with database tables, indexes, and query execution plans"
      ],
      "vi": [
        "Kinh nghiệm viết truy vấn SQL trong môi trường production",
        "Làm quen với cấu trúc bảng, chỉ mục và kế hoạch thực thi truy vấn (execution plan)"
      ]
    },
    "outcomes": {
      "en": [
        "Design covering indexes to enable ultra-fast Index Only Scans that eliminate heap fetches",
        "Master the Leftmost Prefix Rule and the Equality-Sort-Range (ESR) composite indexing standard",
        "Deploy partial indexes to reduce index size by over 90% on skewed status columns and queues"
      ],
      "vi": [
        "Thiết kế covering index để đạt tốc độ Index Only Scan cực nhanh và loại bỏ hoàn toàn việc đọc heap",
        "Nắm vững quy tắc tiền tố ngoài cùng bên trái và chuẩn thiết kế chỉ mục kết hợp Equality-Sort-Range (ESR)",
        "Ứng dụng chỉ mục một phần (partial index) để giảm hơn 90% dung lượng chỉ mục trên các cột trạng thái lệch"
      ]
    },
    "chapters": [
      {
        "id": "sql-bp-ch-1",
        "number": 1,
        "slug": "query-optimization-explain-analyze",
        "title": {
          "en": "Query Optimization & EXPLAIN ANALYZE Interpretation",
          "vi": "Tối Ưu Hóa Truy Vấn & Đọc Kế Hoạch EXPLAIN ANALYZE"
        },
        "summary": {
          "en": "Architectural principles for selecting the optimal scan strategy and profiling buffer cache hit ratios.",
          "vi": "Nguyên lý kiến trúc để lựa chọn chiến lược quét tối ưu và đánh giá tỷ lệ trúng bộ đệm RAM (buffer cache)."
        },
        "readTimeMinutes": 14,
        "sectionsCount": 2
      },
      {
        "id": "sql-bp-ch-2",
        "number": 2,
        "slug": "composite-partial-indexing-architecture",
        "title": {
          "en": "Composite & Partial Indexing Architecture",
          "vi": "Kiến Trúc Chỉ Mục Kết Hợp & Chỉ Mục Một Phần"
        },
        "summary": {
          "en": "Architectural standards for column ordering in composite indexes and targeting skewed data with partial indexes.",
          "vi": "Tiêu chuẩn kiến trúc cho thứ tự cột trong chỉ mục kết hợp và tối ưu hóa dữ liệu bị lệch bằng chỉ mục một phần."
        },
        "readTimeMinutes": 14,
        "sectionsCount": 2
      }
    ]
  },
  {
    "id": "sql-practical-guides",
    "slug": "sql-practical-guides",
    "title": "Relational Database Design & Engineering Guide",
    "subtitle": {
      "en": "Step-by-Step Practical Blueprint for Production Normalization & Zero-Downtime Migrations",
      "vi": "Hướng Dẫn Kỹ Thuật Từng Bước Về Chuẩn Hóa Schema & Migration Không Gián Đoạn"
    },
    "bookType": "Practical Guides",
    "fieldId": "computer-science",
    "domainIds": [
      "data-analytics"
    ],
    "topicId": "sql",
    "categoryId": "sql",
    "subjectId": "storage",
    "author": "4TM Technical Board",
    "role": "Core Database Engineering Group",
    "level": "Practical / Applied",
    "estimatedReadTime": "35 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-18",
    "accentColor": "from-cyan-600 to-blue-800",
    "tags": [
      "SQL",
      "Database Design",
      "Normalization",
      "Migrations",
      "Zero-Downtime",
      "Production"
    ],
    "description": {
      "en": "Production-tested practical engineering guides for transforming unnormalized schemas to 3NF and executing zero-downtime database migrations with Expand-and-Contract.",
      "vi": "Cẩm nang hướng dẫn kỹ thuật thực chiến giúp chuyển đổi schema phi chuẩn sang 3NF và triển khai migration cơ sở dữ liệu zero-downtime với mô hình Expand-and-Contract."
    },
    "prerequisites": {
      "en": [
        "Understanding of relational tables, primary keys, and foreign keys",
        "Familiarity with DDL operations (CREATE TABLE, ALTER TABLE, CREATE INDEX)"
      ],
      "vi": [
        "Hiểu biết về bảng quan hệ, khóa chính và khóa ngoại",
        "Quen thuộc với các lệnh DDL (CREATE TABLE, ALTER TABLE, CREATE INDEX)"
      ]
    },
    "outcomes": {
      "en": [
        "Decompose denormalized schemas through 1NF, 2NF, and 3NF systematically",
        "Execute multi-stage zero-downtime column migrations without table lockouts",
        "Validate foreign key constraints and verify database integrity under live traffic"
      ],
      "vi": [
        "Phân tách schema phi chuẩn qua 1NF, 2NF và 3NF một cách bài bản",
        "Triển khai migration cột zero-downtime đa giai đoạn không làm khóa bảng",
        "Kiểm chứng ràng buộc khóa ngoại và bảo toàn dữ liệu dưới tải thực tế"
      ]
    },
    "chapters": [
      {
        "id": "spg-ch-1",
        "number": 1,
        "slug": "schema-normalization-1nf-to-3nf",
        "title": {
          "en": "Step-by-Step Schema Normalization (1NF to 3NF)",
          "vi": "Quy Trình Chuẩn Hóa Schema Từng Bước (1NF Đến 3NF)"
        },
        "summary": {
          "en": "A practical, executable procedure for eliminating data redundancy and update anomalies through First, Second, and Third Normal Forms.",
          "vi": "Quy trình thực hành chi tiết giúp triệt tiêu dư thừa dữ liệu và dị thường cập nhật qua dạng chuẩn 1, 2 và 3."
        },
        "readTimeMinutes": 16,
        "sectionsCount": 1
      },
      {
        "id": "spg-ch-2",
        "number": 2,
        "slug": "zero-downtime-migrations",
        "title": {
          "en": "Zero-Downtime Database Migrations (Expand-and-Contract)",
          "vi": "Kỹ Thuật Migration Cơ Sở Dữ Liệu Không Gián Đoạn (Zero-Downtime)"
        },
        "summary": {
          "en": "Step-by-step production blueprint for executing schema changes, non-blocking indexing, and column deprecation with zero service interruption.",
          "vi": "Quy trình thực chiến giúp thực thi thay đổi schema, tạo index không khóa bảng và xóa cột cũ mà không làm gián đoạn dịch vụ."
        },
        "readTimeMinutes": 19,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "html-handbook",
    "slug": "html-handbook",
    "title": "HTML Handbook",
    "subtitle": {
      "en": "Semantic Web Architecture, DOM Mechanics, Accessible Forms & Modern HTML5 Standards",
      "vi": "Kiến Trúc Web Ngữ Nghĩa, Cơ Chế DOM, Form Tiếp Cận Chuẩn WCAG & Tiêu Chuẩn HTML5"
    },
    "bookType": "Handbook",
    "fieldId": "computer-science",
    "domainIds": [
      "web"
    ],
    "topicId": "html",
    "categoryId": "html",
    "subjectId": "web",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Foundational",
    "estimatedReadTime": "40 mins",
    "chaptersCount": 3,
    "publishedDate": "2025-02-10",
    "accentColor": "from-orange-500 to-amber-700",
    "tags": [
      "HTML5",
      "Semantics",
      "DOM",
      "Accessibility",
      "Web Standards",
      "Forms"
    ],
    "description": {
      "en": "Authoritative engineering reference manual for HTML: semantic document architecture, parsing algorithms, accessible forms, responsive media, and DOM tree relationships.",
      "vi": "Cẩm nang tra cứu kỹ thuật chuẩn mực cho HTML: kiến trúc tài liệu ngữ nghĩa, thuật toán phân tích DOM, thiết kế form chuẩn accessibility, đa phương tiện đáp ứng và quan hệ cây DOM."
    },
    "prerequisites": {
      "en": [
        "Basic familiarity with web browser operation and text editors"
      ],
      "vi": [
        "Làm quen cơ bản với thao tác trình duyệt web và trình soạn thảo văn bản"
      ]
    },
    "outcomes": {
      "en": [
        "Architect robust, accessible web document structures using native HTML5 landmarks (<header>, <main>, <nav>, <article>, <aside>, <footer>)",
        "Construct keyboard-navigable, accessible forms utilizing fieldsets, legends, explicit labels, and native constraint validation",
        "Optimize media assets with responsive <picture>, srcset, loading=\"lazy\", and decoding=\"async\" attributes to protect Web Vitals"
      ],
      "vi": [
        "Xây dựng cấu trúc tài liệu web vững chắc và tiếp cận tốt bằng các landmark HTML5 (<header>, <main>, <nav>, <article>, <aside>, <footer>)",
        "Thiết kế form điều hướng bàn phím hoàn chỉnh với fieldset, legend, nhãn label tường minh và kiểm tra hợp lệ native",
        "Tối ưu tài nguyên đa phương tiện bằng thẻ <picture>, srcset, loading=\"lazy\" và decoding=\"async\" để bảo vệ chỉ số Web Vitals"
      ]
    },
    "parts": [
      {
        "partNumber": 1,
        "title": {
          "en": "Document Foundations & Semantic Hierarchy",
          "vi": "Nền Tảng Tài Liệu & Cấu Trúc Ngữ Nghĩa"
        },
        "description": {
          "en": "HTML5 DOCTYPE, document metadata, DOM tree construction, and landmark elements.",
          "vi": "Chuẩn DOCTYPE HTML5, metadata tài liệu, cơ chế tạo cây DOM và các thẻ mốc landmark."
        },
        "chapterIds": [
          "html-hb-ch-1"
        ]
      },
      {
        "partNumber": 2,
        "title": {
          "en": "Interactive Controls & Constraint Validation Forms",
          "vi": "Điều Khiển Tương Tác & Form Xác Thực Dữ Liệu Native"
        },
        "description": {
          "en": "Form controls, explicit labeling, grouping with fieldsets, and native browser validation.",
          "vi": "Các điều khiển form, gắn nhãn tường minh, nhóm bằng fieldset và xác thực native của trình duyệt."
        },
        "chapterIds": [
          "html-hb-ch-2"
        ]
      },
      {
        "partNumber": 3,
        "title": {
          "en": "Tabular Data, Responsive Media & Accessibility Standards",
          "vi": "Dữ Liệu Bảng, Đa Phương Tiện Đáp Ứng & Tiêu Chuẩn Accessibility"
        },
        "description": {
          "en": "Accessible data tables, responsive picture art direction, lazy loading, and ARIA integration.",
          "vi": "Bảng dữ liệu tiếp cận, chỉ đạo nghệ thuật thẻ picture đáp ứng, lazy loading và tích hợp ARIA."
        },
        "chapterIds": [
          "html-hb-ch-3"
        ]
      }
    ],
    "chapters": [
      {
        "id": "html-hb-ch-1",
        "number": 1,
        "slug": "semantic-html5-structure",
        "title": {
          "en": "Semantic HTML5 Architecture & Document Tree",
          "vi": "Kiến Trúc HTML5 Ngữ Nghĩa & Cây Tài Liệu"
        },
        "summary": {
          "en": "Document structure, DOM parsing lifecycle, semantic landmarks (<header>, <nav>, <main>, <article>, <aside>, <footer>), and heading hierarchy.",
          "vi": "Cấu trúc tài liệu, chu trình parse DOM, các thẻ landmark ngữ nghĩa (<header>, <nav>, <main>, <article>, <aside>, <footer>) và thứ bậc tiêu đề."
        },
        "readTimeMinutes": 14,
        "sectionsCount": 1
      },
      {
        "id": "html-hb-ch-2",
        "number": 2,
        "slug": "forms-and-input-types",
        "title": {
          "en": "Accessible Forms & Constraint Validation",
          "vi": "Biểu Mẫu Tiếp Cận & Xác Thực Ràng Buộc"
        },
        "summary": {
          "en": "Semantic form controls, explicit label binding (<label for=\"...\">), fieldset groups, and native browser constraint validation.",
          "vi": "Các điều khiển form ngữ nghĩa, liên kết nhãn tường minh (<label for=\"...\">), nhóm fieldset và cơ chế xác thực ràng buộc native."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 1
      },
      {
        "id": "html-hb-ch-3",
        "number": 3,
        "slug": "media-tables-and-accessibility",
        "title": {
          "en": "Accessible Tables & Responsive Media Optimization",
          "vi": "Bảng Dữ Liệu Tiếp Cận & Tối Ưu Đa Phương Tiện Đáp Ứng"
        },
        "summary": {
          "en": "Data table structures with <th> scope attributes, responsive <picture> art direction, WebP/AVIF formats, and loading=\"lazy\".",
          "vi": "Cấu trúc bảng dữ liệu với thuộc tính scope trên <th>, chỉ đạo nghệ thuật <picture>, định dạng WebP/AVIF và loading=\"lazy\"."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "html-definitions",
    "slug": "html-definitions",
    "title": "HTML Definitions & DOM Concepts",
    "subtitle": {
      "en": "Element vs Tag, Attribute vs Property, Semantic Landmarks & ARIA Definitions",
      "vi": "Phần Tử vs Thẻ, Thuộc Tính vs Thuộc Tính DOM, Landmark Ngữ Nghĩa & Định Nghĩa ARIA"
    },
    "bookType": "Definitions",
    "fieldId": "computer-science",
    "domainIds": [
      "web"
    ],
    "topicId": "html",
    "categoryId": "html",
    "subjectId": "web",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Foundational",
    "estimatedReadTime": "25 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-12",
    "accentColor": "from-amber-500 to-orange-700",
    "tags": [
      "Definitions",
      "DOM",
      "A11y",
      "Glossary",
      "HTML5"
    ],
    "description": {
      "en": "Precision definitions and mental models for core HTML and Web DOM concepts: Element vs Tag, Attribute vs Property, Semantic Elements vs Generic Containers, Void Elements, and ARIA Roles.",
      "vi": "Định nghĩa chuẩn xác và mô hình tư duy cho các khái niệm HTML & DOM cốt lõi: Phần tử vs Thẻ, Thuộc tính HTML vs Thuộc tính DOM, Thẻ ngữ nghĩa vs Khối Div chung, Thẻ rỗng và Vai trò ARIA."
    },
    "prerequisites": {
      "en": [
        "Basic familiarity with writing HTML code and web browser inspection tools"
      ],
      "vi": [
        "Làm quen cơ bản với việc viết mã HTML và công cụ kiểm tra (Inspect) của trình duyệt"
      ]
    },
    "outcomes": {
      "en": [
        "Distinguish precisely between serialized HTML source code and in-memory DOM tree properties",
        "Select appropriate native semantic elements over generic div/span containers and unneeded ARIA roles",
        "Correctly identify void self-closing elements and construct valid accessible names"
      ],
      "vi": [
        "Phân biệt chính xác giữa mã nguồn HTML tuần tự hóa và thuộc tính cây DOM trong bộ nhớ",
        "Lựa chọn đúng thẻ ngữ nghĩa native thay vì lạm dụng khối div/span và các thuộc tính ARIA không cần thiết",
        "Nhận biết chính xác các phần tử rỗng tự đóng và xây dựng tên tiếp cận (accessible name) hợp lệ"
      ]
    },
    "chapters": [
      {
        "id": "html-def-ch-1",
        "number": 1,
        "slug": "dom-tree-and-elements",
        "title": {
          "en": "Syntax Foundations & DOM Tree Elements",
          "vi": "Nền Tảng Cú Pháp & Các Phần Tử Cây DOM"
        },
        "summary": {
          "en": "Formal definitions for HTML Element vs Tag, HTML Attribute vs DOM Property, Semantic Elements, and Void Elements.",
          "vi": "Định nghĩa chuẩn cho Phần Tử vs Thẻ HTML, Thuộc Tính HTML vs Thuộc Tính DOM, Thẻ Ngữ Nghĩa và Thẻ Rỗng."
        },
        "readTimeMinutes": 12,
        "sectionsCount": 2
      },
      {
        "id": "html-def-ch-2",
        "number": 2,
        "slug": "accessibility-aria-definitions",
        "title": {
          "en": "Accessibility, ARIA & Landmark Definitions",
          "vi": "Khái Niệm Accessibility, Tiêu Chuẩn ARIA & Landmark"
        },
        "summary": {
          "en": "Formal definitions for Semantic Elements vs Generic Containers, Void Elements, and ARIA Roles and Attributes.",
          "vi": "Định nghĩa chuẩn cho Thẻ Ngữ Nghĩa vs Khối Div Chung, Thẻ Rỗng (Void) và Tiêu Chuẩn ARIA."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 2
      }
    ]
  },
  {
    "id": "html-practical-guide",
    "slug": "html-practical-guide",
    "title": "Building Accessible Semantic Forms",
    "subtitle": {
      "en": "Step-by-Step Practical Guide to Designing Accessible, WCAG-Compliant HTML Forms",
      "vi": "Hướng Dẫn Thực Hành Từng Bước Xây Dựng Biểu Mẫu HTML Tiếp Cận Chuẩn WCAG"
    },
    "bookType": "Practical Guides",
    "fieldId": "computer-science",
    "domainIds": [
      "web"
    ],
    "topicId": "html",
    "categoryId": "html",
    "subjectId": "web",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Foundational to Intermediate",
    "estimatedReadTime": "30 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-15",
    "accentColor": "from-orange-600 to-amber-800",
    "tags": [
      "Forms",
      "Accessibility",
      "WCAG",
      "Guide",
      "Semantic HTML"
    ],
    "description": {
      "en": "A step-by-step practical guide to crafting enterprise-grade, keyboard-navigable HTML forms compliant with WCAG 2.1 AA standards using native semantic elements, fieldset grouping, and constraint validation.",
      "vi": "Hướng dẫn thực hành từng bước xây dựng biểu mẫu HTML doanh nghiệp hỗ trợ điều hướng bàn phím, tuân thủ tiêu chuẩn WCAG 2.1 AA bằng các thẻ ngữ nghĩa native, nhóm fieldset và kiểm tra dữ liệu ràng buộc."
    },
    "prerequisites": {
      "en": [
        "Basic understanding of HTML tags, input types, and attributes",
        "Familiarity with web browser developer tools and keyboard Tab navigation"
      ],
      "vi": [
        "Hiểu biết cơ bản về thẻ HTML, các loại input và thuộc tính",
        "Làm quen với công cụ DevTools của trình duyệt và thao tác phím Tab"
      ]
    },
    "outcomes": {
      "en": [
        "Construct accessible forms with explicit <label for=\"...\"> associations and <fieldset>/<legend> groupings",
        "Integrate native HTML5 constraint validation attributes (required, pattern, minlength) with accessible error feedback using aria-describedby",
        "Optimize media assets with art-directed <picture> elements, modern AVIF/WebP formats, and zero-shift layout attributes"
      ],
      "vi": [
        "Xây dựng biểu mẫu tiếp cận với liên kết nhãn <label for=\"...\"> tường minh và nhóm <fieldset>/<legend>",
        "Tích hợp thuộc tính xác thực ràng buộc HTML5 native (required, pattern, minlength) với thông báo lỗi qua aria-describedby",
        "Tối ưu tài nguyên hình ảnh với thẻ <picture> đa định dạng AVIF/WebP và thuộc tính chống giật trang CLS"
      ]
    },
    "chapters": [
      {
        "id": "hpg-ch-1",
        "number": 1,
        "slug": "explicit-labels-and-groups",
        "title": {
          "en": "Accessible Form Construction & Focus Management",
          "vi": "Xây Dựng Form Tiếp Cận & Quản Lý Focus Bàn Phím"
        },
        "summary": {
          "en": "Step-by-step assembly of an enterprise multi-step form: explicit label binding, fieldsets, legends, and keyboard navigation.",
          "vi": "Quy trình từng bước xây dựng form doanh nghiệp: liên kết nhãn tường minh, fieldset, legend và điều hướng bàn phím."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 1
      },
      {
        "id": "hpg-ch-2",
        "number": 2,
        "slug": "keyboard-navigation-and-focus",
        "title": {
          "en": "Responsive Images & Performance Optimization",
          "vi": "Hình Ảnh Đáp Ứng & Tối Ưu Hiệu Suất Tải Trang"
        },
        "summary": {
          "en": "Step-by-step implementation of art-directed responsive images with <picture>, modern WebP/AVIF formats, and CLS layout protection.",
          "vi": "Quy trình từng bước triển khai hình ảnh đáp ứng với thẻ <picture>, định dạng WebP/AVIF và chống giật trang CLS."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "html-common-errors",
    "slug": "html-common-errors",
    "title": "HTML Common Errors & Markup Bugs",
    "subtitle": {
      "en": "Parsing Faults, Invalid Nesting, Duplicate IDs & Accessibility Anti-Patterns",
      "vi": "Lỗi Parse Trình Duyệt, Lồng Thẻ Sai Quy Tắc, Trùng Lặp ID & Sai Lầm Accessibility"
    },
    "bookType": "Common Errors",
    "fieldId": "computer-science",
    "domainIds": [
      "web"
    ],
    "topicId": "html",
    "categoryId": "html",
    "subjectId": "web",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Foundational to Intermediate",
    "estimatedReadTime": "30 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-01-25",
    "accentColor": "from-amber-600 to-red-700",
    "tags": [
      "HTML5",
      "Invalid Markup",
      "Nesting Bugs",
      "Accessibility Errors",
      "Debugging"
    ],
    "description": {
      "en": "Systematic diagnosis and remediation guide for common HTML pitfalls: browser auto-closing parser bugs from block-inside-inline nesting, duplicate ID collisions, the div-as-button anti-pattern, and missing image alt attributes.",
      "vi": "Cẩm nang chẩn đoán và khắc phục có hệ thống cho các lỗi HTML thường gặp: lỗi trình duyệt tự động đóng thẻ khi lồng block vào inline, xung đột trùng lặp ID, sai lầm dùng thẻ div làm button và thiếu thuộc tính alt hình ảnh."
    },
    "prerequisites": {
      "en": [
        "Basic familiarity with writing HTML markup and browser DevTools element inspection"
      ],
      "vi": [
        "Làm quen cơ bản với việc viết mã HTML và công cụ Elements trong DevTools trình duyệt"
      ]
    },
    "outcomes": {
      "en": [
        "Diagnose and resolve HTML parser auto-closing errors caused by invalid block-inside-inline element nesting",
        "Eliminate duplicate ID collisions that break CSS styling, label associations, and JavaScript selectors",
        "Replace inaccessible div buttons with native accessible <button> controls supporting keyboard and screen reader APIs"
      ],
      "vi": [
        "Chẩn đoán và xử lý triệt để lỗi trình duyệt tự đóng thẻ do lồng phần tử block bên trong thẻ inline",
        "Loại bỏ xung đột trùng lặp ID làm gãy định dạng CSS, liên kết nhãn label và truy vấn JavaScript",
        "Thay thế các nút div không tiếp cận bằng thẻ native <button> chuẩn hỗ trợ đầy đủ bàn phím và screen reader"
      ]
    },
    "chapters": [
      {
        "id": "hce-ch-1",
        "number": 1,
        "slug": "invalid-nesting-and-structure",
        "title": {
          "en": "Invalid Nesting & Document Parsing Faults",
          "vi": "Lỗi Lồng Thẻ Không Hợp Lệ & Sai Sót Trình Phân Tích DOM"
        },
        "summary": {
          "en": "Browser auto-closing anomalies from block-in-paragraph nesting and duplicate ID conflicts breaking accessibility and DOM traversal.",
          "vi": "Hiện tượng trình duyệt tự động đóng thẻ khi lồng block trong paragraph và xung đột trùng lặp ID làm gãy cây DOM."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 2
      },
      {
        "id": "hce-ch-2",
        "number": 2,
        "slug": "div-button-accessibility-trap",
        "title": {
          "en": "Accessibility & Semantic Misuse Anti-Patterns",
          "vi": "Sai Lầm Về Khả Năng Tiếp Cận & Lạm Dụng Thẻ Ngữ Nghĩa"
        },
        "summary": {
          "en": "The div-as-button accessibility trap and missing image alt attributes breaking screen reader navigation.",
          "vi": "Bẫy lạm dụng thẻ div làm button và lỗi thiếu thuộc tính alt của hình ảnh làm hỏng trải nghiệm người dùng."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "html-best-practices",
    "slug": "html-best-practices",
    "title": "Modern HTML Best Practices & SEO",
    "subtitle": {
      "en": "Meta Tags, OpenGraph Cards, Structured Headings & Web Vitals",
      "vi": "Thẻ Meta SEO, Card OpenGraph, Cấu Trúc Tiêu Đề & Chỉ Số Web Vitals"
    },
    "bookType": "Best Practices",
    "fieldId": "computer-science",
    "domainIds": [
      "web"
    ],
    "topicId": "html",
    "categoryId": "html",
    "subjectId": "web",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Foundational",
    "estimatedReadTime": "25 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-01",
    "accentColor": "from-orange-600 to-amber-900",
    "tags": [
      "SEO",
      "OpenGraph",
      "Headings",
      "Best Practices",
      "Web Vitals"
    ],
    "description": {
      "en": "Production rules for modern HTML: strict heading hierarchy (single <h1>), OpenGraph social cards, viewport meta configuration, and image lazy loading.",
      "vi": "Quy chuẩn HTML sản xuất: thứ tự tiêu đề nghiêm ngặt (duy nhất một <h1>), OpenGraph social card, cấu hình viewport và lazy loading hình ảnh."
    },
    "prerequisites": {
      "en": [
        "Basic HTML page setup"
      ],
      "vi": [
        "Kỹ năng tạo trang HTML cơ bản"
      ]
    },
    "outcomes": {
      "en": [
        "Configure OpenGraph social preview metadata correctly",
        "Optimize LCP and CLS with explicit img width/height dimensions"
      ],
      "vi": [
        "Cấu hình thẻ OpenGraph preview mạng xã hội chuẩn xác",
        "Tối ưu chỉ số LCP và CLS với thuộc tính width/height hình ảnh"
      ]
    },
    "chapters": [
      {
        "id": "hbp-ch-1",
        "number": 1,
        "slug": "head-metadata-and-seo",
        "title": {
          "en": "<head> Metadata, Viewport & OpenGraph Cards",
          "vi": "Cấu Hình <head> Metadata, Viewport & OpenGraph Cards"
        },
        "summary": {
          "en": "Essential meta tags, charset, responsive viewport, og:image, and Twitter cards.",
          "vi": "Các thẻ meta quan trọng, charset, viewport đáp ứng, og:image và Twitter cards."
        },
        "readTimeMinutes": 12,
        "sectionsCount": 1
      },
      {
        "id": "hbp-ch-2",
        "number": 2,
        "slug": "performance-image-attributes",
        "title": {
          "en": "Image Performance Attributes (loading, decoding, srcset)",
          "vi": "Thuộc Tính Tối Ưu Hình Ảnh (loading, decoding, srcset)"
        },
        "summary": {
          "en": "Prevent Layout Shift (CLS) by setting explicit width/height and loading=\"lazy\".",
          "vi": "Chống giật trang (CLS) bằng thuộc tính width/height tường minh và loading=\"lazy\"."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "css-handbook",
    "slug": "css-handbook",
    "title": "CSS Handbook",
    "subtitle": {
      "en": "The Modern Cascade, Cascade Layers (@layer), Specificity, Box Model & Modern Layout Systems",
      "vi": "Cơ Chế Cascade Hiện Đại, Cascade Layers (@layer), Specificity, Box Model & Hệ Thống Bố Cục"
    },
    "bookType": "Handbook",
    "fieldId": "computer-science",
    "domainIds": [
      "web"
    ],
    "topicId": "css",
    "categoryId": "css",
    "subjectId": "web",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Foundational to Intermediate",
    "estimatedReadTime": "45 mins",
    "chaptersCount": 3,
    "publishedDate": "2025-02-10",
    "accentColor": "from-blue-500 to-sky-700",
    "tags": [
      "CSS3",
      "Cascade",
      "Cascade Layers",
      "Specificity",
      "Flexbox",
      "CSS Grid",
      "Box Model"
    ],
    "description": {
      "en": "Authoritative CSS engineering handbook covering the modern cascade algorithm, cascade layers (@layer), multi-part specificity calculations, the CSS box model, Block Formatting Contexts (BFC), Flexbox, CSS Grid, and GPU-accelerated compositing.",
      "vi": "Cẩm nang kỹ thuật CSS chuẩn mực về thuật toán cascade hiện đại, cascade layers (@layer), cách tính độ ưu tiên specificity nhiều thành phần, mô hình box model, Block Formatting Contexts (BFC), Flexbox, CSS Grid và tăng tốc đồ họa GPU."
    },
    "prerequisites": {
      "en": [
        "Basic familiarity with HTML markup structure and selector syntax"
      ],
      "vi": [
        "Làm quen cơ bản với cấu trúc mã HTML và cú pháp selector cơ bản"
      ]
    },
    "outcomes": {
      "en": [
        "Master the 5-step modern CSS Cascade resolution order: Origin, Importance, Cascade Layers (@layer), Specificity, and Source Order",
        "Architect robust layout systems using Block Formatting Contexts, Flexbox 1D alignment, and CSS Grid 2D track definitions",
        "Control stacking contexts, z-index hierarchies, and eliminate layout reflow bottlenecks with GPU-composited CSS transforms"
      ],
      "vi": [
        "Làm chủ quy trình 5 bước giải quyết xung đột CSS Cascade hiện đại: Nguồn gốc (Origin), Tầm quan trọng (Importance), Cascade Layers (@layer), Specificity và Thứ tự xuất hiện",
        "Xây dựng hệ thống bố cục vững chắc với Block Formatting Contexts, căn chỉnh Flexbox 1 chiều và lưới CSS Grid 2 chiều",
        "Kiểm soát stacking context, phân cấp z-index và triệt tiêu tắc nghẽn reflow bằng thuộc tính transform tăng tốc GPU"
      ]
    },
    "parts": [
      {
        "partNumber": 1,
        "title": {
          "en": "The Modern Cascade & Specificity Engine",
          "vi": "Thuật Toán Cascade & Engine Tính Điểm Specificity"
        },
        "description": {
          "en": "Origin, Importance, Cascade Layers (@layer), Specificity 3-tuple calculation, and Inheritance.",
          "vi": "Nguồn gốc, Tầm quan trọng, Cascade Layers (@layer), Bộ 3 điểm Specificity và Kế thừa."
        },
        "chapterIds": [
          "css-hb-ch-1"
        ]
      },
      {
        "partNumber": 2,
        "title": {
          "en": "The Box Model, Formatting Contexts & Layout Engines",
          "vi": "Mô Hình Box Model, Bối Cảnh Định Dạng & Engine Bố Cục"
        },
        "description": {
          "en": "box-sizing: border-box, margin collapsing, Block Formatting Contexts (BFC), Flexbox, and CSS Grid.",
          "vi": "box-sizing: border-box, gộp lề margin, Block Formatting Contexts (BFC), Flexbox và CSS Grid."
        },
        "chapterIds": [
          "css-hb-ch-2"
        ]
      },
      {
        "partNumber": 3,
        "title": {
          "en": "Positioning, Stacking Contexts & Rendering Performance",
          "vi": "Cơ Chế Định Vị, Stacking Context & Hiệu Năng Render"
        },
        "description": {
          "en": "Positioning schemes, z-index stacking triggers, CSS variables, and Reflow vs Repaint vs Composite.",
          "vi": "Các cơ chế position, kích hoạt stacking context z-index, biến CSS và quy trình Reflow vs Repaint."
        },
        "chapterIds": [
          "css-hb-ch-3"
        ]
      }
    ],
    "chapters": [
      {
        "id": "css-hb-ch-1",
        "number": 1,
        "slug": "cascade-and-specificity",
        "title": {
          "en": "The Modern Cascade, Cascade Layers (@layer) & Specificity",
          "vi": "Cơ Chế Cascade Hiện Đại, Cascade Layers (@layer) & Specificity"
        },
        "summary": {
          "en": "Origin and Importance, Cascade Layers (@layer), 3-tuple Specificity calculation (ID, Class/Attribute/Pseudo-class, Element/Pseudo-element), and Source Order.",
          "vi": "Nguồn và Tầm quan trọng, Tầng Cascade (@layer), Cách tính điểm Specificity bộ 3 số và Thứ tự xuất hiện trong mã."
        },
        "readTimeMinutes": 16,
        "sectionsCount": 1
      },
      {
        "id": "css-hb-ch-2",
        "number": 2,
        "slug": "box-model-and-positioning",
        "title": {
          "en": "The Box Model, Formatting Contexts & Modern Layout",
          "vi": "Mô Hình Box Model, Bối Cảnh Định Dạng & Layout Hiện Đại"
        },
        "summary": {
          "en": "box-sizing: border-box reset, margin collapsing mechanics, Block Formatting Contexts (BFC), Flexbox 1D, and CSS Grid 2D.",
          "vi": "Reset box-sizing: border-box, cơ chế gộp lề margin, Block Formatting Contexts (BFC), Flexbox 1D và CSS Grid 2D."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 1
      },
      {
        "id": "css-hb-ch-3",
        "number": 3,
        "slug": "flexbox-and-grid-layouts",
        "title": {
          "en": "Positioning, Stacking Contexts & GPU Rendering",
          "vi": "Cơ Chế Định Vị, Stacking Context & Render Tăng Tốc GPU"
        },
        "summary": {
          "en": "Positioning schemes (relative, absolute, fixed, sticky), Stacking Contexts, z-index isolation, and Reflow vs Repaint vs Composite.",
          "vi": "Các cơ chế position (relative, absolute, fixed, sticky), Stacking Context, cô lập z-index và chu trình Reflow vs Repaint."
        },
        "readTimeMinutes": 14,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "css-definitions",
    "slug": "css-definitions",
    "title": "CSS Definitions & Box Model Glossary",
    "subtitle": {
      "en": "Cascade Layers, Specificity Vector, Block Formatting Contexts & Stacking Model Glossary",
      "vi": "Tầng Cascade (@layer), Vectơ Specificity, Block Formatting Context & Bối Cảnh Xếp Lớp"
    },
    "bookType": "Definitions",
    "fieldId": "computer-science",
    "domainIds": [
      "web"
    ],
    "topicId": "css",
    "categoryId": "css",
    "subjectId": "web",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Foundational to Intermediate",
    "estimatedReadTime": "25 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-12",
    "accentColor": "from-sky-500 to-indigo-700",
    "tags": [
      "Definitions",
      "BFC",
      "Stacking Context",
      "Glossary",
      "Cascade Layers",
      "CSS3"
    ],
    "description": {
      "en": "Precision definitions and mental models for CSS core systems: Cascade Layers (@layer), 3-tuple Specificity vectors, Block Formatting Contexts (BFC), Stacking Contexts, and Margin Collapsing.",
      "vi": "Định nghĩa chuẩn xác và mô hình tư duy cho các hệ thống CSS cốt lõi: Tầng Cascade (@layer), Vectơ Specificity bộ 3 số, Bối cảnh định dạng khối (BFC), Bối cảnh xếp lớp Stacking Context và Hiện tượng gộp lề margin."
    },
    "prerequisites": {
      "en": [
        "Basic familiarity with CSS selectors and property-value declarations"
      ],
      "vi": [
        "Làm quen cơ bản với CSS selector và các khai báo thuộc tính-giá trị"
      ]
    },
    "outcomes": {
      "en": [
        "Calculate exact (A, B, C) specificity scores across complex modern selector chains",
        "Architect maintainable stylesheets with Cascade Layers (@layer) to eliminate !important specificity wars",
        "Trigger clean Block Formatting Contexts (BFC) and isolate Stacking Context hierarchies with zero visual side-effects"
      ],
      "vi": [
        "Tính toán chính xác điểm specificity (A, B, C) trên các chuỗi selector hiện đại phức tạp",
        "Xây dựng kiến trúc CSS dễ bảo trì với Cascade Layers (@layer) nhằm loại bỏ cuộc chiến !important",
        "Kích hoạt BFC chuẩn mực và cô lập phân cấp Stacking Context mà không gây tác dụng phụ thị giác"
      ]
    },
    "chapters": [
      {
        "id": "css-def-ch-1",
        "number": 1,
        "slug": "formatting-contexts-bfc",
        "title": {
          "en": "Cascade Mechanics, Specificity & Selectors",
          "vi": "Cơ Chế Cascade, Specificity & Selector"
        },
        "summary": {
          "en": "Formal definitions for Specificity (A, B, C), Cascade Layers (@layer), and Pseudo-classes vs Pseudo-elements.",
          "vi": "Định nghĩa chuẩn cho Specificity (A, B, C), Tầng Cascade (@layer) và Pseudo-class vs Pseudo-element."
        },
        "readTimeMinutes": 12,
        "sectionsCount": 2
      },
      {
        "id": "css-def-ch-2",
        "number": 2,
        "slug": "stacking-context-z-index",
        "title": {
          "en": "Formatting Contexts & Stacking Model Glossary",
          "vi": "Bối Cảnh Định Dạng & Bối Cảnh Xếp Lớp (Stacking Model)"
        },
        "summary": {
          "en": "Formal definitions for Block Formatting Contexts (BFC), Stacking Contexts, and Margin Collapsing.",
          "vi": "Định nghĩa chuẩn cho Block Formatting Context (BFC), Stacking Context và Hiện Tượng Gộp Lề (Margin Collapsing)."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 2
      }
    ]
  },
  {
    "id": "css-practical-guide",
    "slug": "css-practical-guide",
    "title": "Responsive Layouts with Flexbox & Grid",
    "subtitle": {
      "en": "Step-by-Step Practical Guide to Building Mobile-First Responsive UIs",
      "vi": "Hướng Dẫn Thực Hành Từng Bước Thiết Kế Giao Diện Đáp Ứng Mobile-First"
    },
    "bookType": "Practical Guides",
    "fieldId": "computer-science",
    "domainIds": [
      "web"
    ],
    "topicId": "css",
    "categoryId": "css",
    "subjectId": "web",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Foundational",
    "estimatedReadTime": "25 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-15",
    "accentColor": "from-blue-600 to-cyan-800",
    "tags": [
      "Responsive",
      "Grid",
      "Flexbox",
      "Mobile-First",
      "Guide"
    ],
    "description": {
      "en": "A step-by-step practical guide to building fully fluid, responsive layouts using Mobile-First CSS Media Queries, CSS Grid auto-fit, and minmax().",
      "vi": "Hướng dẫn thực hành từng bước thiết kế bố cục đáp ứng mượt mà với tư duy Mobile-First, CSS Grid auto-fit và hàm minmax()."
    },
    "prerequisites": {
      "en": [
        "Basic CSS selectors, box model properties, and document layout concepts"
      ],
      "vi": [
        "Kỹ năng sử dụng CSS selector, thuộc tính box model và kiến thức bố cục trang web cơ bản"
      ]
    },
    "outcomes": {
      "en": [
        "Implement structured mobile-first responsive media query architectures using progressive min-width breakpoints",
        "Build zero-media-query dynamic card grids leveraging repeat(auto-fit, minmax(280px, 1fr)) and CSS Grid gap",
        "Diagnose and eliminate responsive layout overflows across varying device viewports"
      ],
      "vi": [
        "Hiện thực kiến trúc media query đáp ứng chuẩn mobile-first sử dụng các điểm ngắt min-width tăng dần",
        "Xây dựng lưới thẻ card co giãn tự động không cần media query với repeat(auto-fit, minmax(280px, 1fr))",
        "Chẩn đoán và khắc phục triệt để hiện tượng vỡ khung bố cục trên các kích thước màn hình thiết bị"
      ]
    },
    "chapters": [
      {
        "id": "cpg-ch-1",
        "number": 1,
        "slug": "mobile-first-media-queries",
        "title": {
          "en": "Mobile-First Media Query Architecture",
          "vi": "Kiến Trúc Media Query Theo Phương Pháp Mobile-First"
        },
        "summary": {
          "en": "Using min-width breakpoints to scale layouts progressively from mobile to desktop without destructive overrides.",
          "vi": "Sử dụng điểm ngắt min-width để mở rộng bố cục từ mobile lên desktop một cách lũy tiến không bị ghi đè phức tạp."
        },
        "readTimeMinutes": 12,
        "sectionsCount": 1
      },
      {
        "id": "cpg-ch-2",
        "number": 2,
        "slug": "css-grid-auto-fit-minmax",
        "title": {
          "en": "Fluid Grids with auto-fit & minmax()",
          "vi": "Lưới Đáp Ứng Tự Động Với auto-fit & minmax()"
        },
        "summary": {
          "en": "Creating zero-media-query card grids with repeat(auto-fit, minmax(280px, 1fr)).",
          "vi": "Tạo lưới card đáp ứng tự động không cần media query bằng repeat(auto-fit, minmax(280px, 1fr))."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "css-common-errors",
    "slug": "css-common-errors",
    "title": "CSS Common Errors & Layout Pitfalls",
    "subtitle": {
      "en": "Z-Index Wars, Collapsing Margins & Overflow Clipping Gotchas",
      "vi": "Cuộc Chiến Z-Index, Gộp Lề Margin & Lỗi Tràn Khung Overflow"
    },
    "bookType": "Common Errors",
    "fieldId": "computer-science",
    "domainIds": [
      "web"
    ],
    "topicId": "css",
    "categoryId": "css",
    "subjectId": "web",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Foundational",
    "estimatedReadTime": "25 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-01-22",
    "accentColor": "from-amber-500 to-rose-800",
    "tags": [
      "Z-Index",
      "Margin Collapse",
      "Debugging",
      "Overflow Bugs"
    ],
    "description": {
      "en": "Debugging classic CSS nightmares: z-index not working due to stacking context isolation, vertical margin collapsing, and unexpected horizontal scrollbars.",
      "vi": "Sửa các sự cố CSS kinh điển: z-index không hoạt động do bị ngắt Stacking Context, gộp margin dọc và thanh cuộn ngang xuất hiện ngoài ý muốn."
    },
    "prerequisites": {
      "en": [
        "Basic CSS layout knowledge, positioning rules, and browser DevTools inspection"
      ],
      "vi": [
        "Hiểu biết bố cục CSS cơ bản, quy tắc định vị position và công cụ DevTools"
      ]
    },
    "outcomes": {
      "en": [
        "Fix z-index layering issues by diagnosing parent stacking contexts and isolation boundaries",
        "Eliminate unwanted horizontal page scrollbar leaks caused by 100vw calculations and missing border-box resets",
        "Prevent unintended margin collapse between adjacent blocks and parent-child boundaries"
      ],
      "vi": [
        "Sửa triệt để lỗi z-index bằng cách chẩn đoán Stacking Context cha và ranh giới cô lập",
        "Loại bỏ thanh cuộn ngang tràn trang do tính sai đơn vị 100vw và thiếu reset border-box",
        "Ngăn ngừa hiện tượng gộp lề margin ngoài ý muốn giữa các khối liền kề và quan hệ cha-con"
      ]
    },
    "chapters": [
      {
        "id": "cce-ch-1",
        "number": 1,
        "slug": "z-index-and-stacking-traps",
        "title": {
          "en": "Z-Index Failure & Stacking Context Isolation",
          "vi": "Lỗi Z-Index Không Có Tác Dụng & Cô Lập Context"
        },
        "summary": {
          "en": "Why z-index: 9999 fails when a parent element creates a lower stacking context.",
          "vi": "Tại sao z-index: 9999 vẫn bị đè khi element cha thuộc stacking context thấp hơn."
        },
        "readTimeMinutes": 12,
        "sectionsCount": 1
      },
      {
        "id": "cce-ch-2",
        "number": 2,
        "slug": "unexpected-overflow-scrollbars",
        "title": {
          "en": "Horizontal Scrollbar Leaks (vw Units & Padding)",
          "vi": "Rò Rỉ Thanh Cuộn Ngang (Đơn Vị vw & Padding)"
        },
        "summary": {
          "en": "Why width: 100vw creates horizontal scrollbars and how to fix with box-sizing.",
          "vi": "Tại sao width: 100vw gây ra thanh cuộn ngang và cách khắc phục."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "css-best-practices",
    "slug": "css-best-practices",
    "title": "Maintainable CSS & Tailwind Best Practices",
    "subtitle": {
      "en": "Design Tokens, CSS Custom Properties & Modern Styling Architecture",
      "vi": "Design Tokens, Biến CSS Custom Properties & Kiến Trúc Styling Modern"
    },
    "bookType": "Best Practices",
    "fieldId": "computer-science",
    "domainIds": [
      "web"
    ],
    "topicId": "css",
    "categoryId": "css",
    "subjectId": "web",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Intermediate",
    "estimatedReadTime": "25 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-01",
    "accentColor": "from-blue-600 to-sky-900",
    "tags": [
      "Tailwind",
      "Design Tokens",
      "Architecture",
      "Best Practices"
    ],
    "description": {
      "en": "Architecture standards for scalable CSS: organizing design tokens via CSS variables, Utility-First CSS guidelines, and avoiding specificity inflation.",
      "vi": "Tiêu chuẩn kiến trúc CSS quy mô lớn: quản lý design tokens bằng biến CSS, quy tắc Utility-First với Tailwind và tránh bùng nổ độ ưu tiên selector."
    },
    "prerequisites": {
      "en": [
        "Experience styling modern web interfaces with CSS custom properties and utility frameworks"
      ],
      "vi": [
        "Đã có kinh nghiệm định dạng giao diện web với biến CSS custom properties và utility framework"
      ]
    },
    "outcomes": {
      "en": [
        "Structure CSS custom properties and design tokens for instant zero-runtime dark mode switching",
        "Maintain clean, performant utility-first styling by balancing component extraction against @apply anti-patterns",
        "Prevent CSS specificity wars through disciplined token inheritance and cascade layering"
      ],
      "vi": [
        "Tổ chức biến CSS custom properties và design tokens hỗ trợ chuyển dark mode tức thì không tốn chi phí runtime",
        "Duy trì phong cách utility-first sạch sẽ và tối ưu hiệu năng bằng cách cân đối giữa component hóa và directive @apply",
        "Ngăn chặn bùng nổ xung đột độ ưu tiên CSS thông qua kế thừa token và cascade layer có kỷ luật"
      ]
    },
    "chapters": [
      {
        "id": "cbp-ch-1",
        "number": 1,
        "slug": "css-custom-properties-theme-tokens",
        "title": {
          "en": "Design Tokens & CSS Custom Properties",
          "vi": "Quản Lý Design Tokens Với Biến CSS Custom Properties"
        },
        "summary": {
          "en": "Defining color, spacing, and typography variables on :root for runtime dark mode without duplicate stylesheets.",
          "vi": "Định nghĩa biến màu sắc, khoảng cách, typography trên :root để đổi theme dark mode không cần nhân bản stylesheet."
        },
        "readTimeMinutes": 12,
        "sectionsCount": 1
      },
      {
        "id": "cbp-ch-2",
        "number": 2,
        "slug": "utility-first-tailwind-patterns",
        "title": {
          "en": "Utility-First Patterns with Tailwind CSS",
          "vi": "Mẫu Thiết Kế Utility-First Với Tailwind CSS"
        },
        "summary": {
          "en": "Organizing component abstractions, arbitrary values, and responsive variants without @apply misuse.",
          "vi": "Tổ chức trừu tượng hóa component, giá trị tùy chỉnh và variant đáp ứng mà không lạm dụng @apply."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "javascript-handbook",
    "slug": "javascript-handbook",
    "title": "JavaScript Handbook",
    "subtitle": {
      "en": "V8 Engine Architecture, Lexical Environments, Event Loop & Modern Asynchronous Systems",
      "vi": "Kiến Trúc Engine V8, Môi Trường Từ Vựng, Event Loop & Hệ Thống Bất Đồng Bộ Hiện Đại"
    },
    "bookType": "Handbook",
    "fieldId": "computer-science",
    "domainIds": [
      "programming",
      "web"
    ],
    "topicId": "javascript",
    "categoryId": "javascript",
    "subjectId": "programming",
    "author": "4TM Editorial Board",
    "role": "JavaScript Core Architecture & Runtime Systems Group",
    "level": "Comprehensive",
    "estimatedReadTime": "45 mins",
    "chaptersCount": 4,
    "publishedDate": "2025-02-20",
    "accentColor": "from-amber-500 to-yellow-700",
    "tags": [
      "Handbook",
      "JavaScript",
      "V8 Engine",
      "Event Loop",
      "Async",
      "Promises",
      "Closures",
      "Prototypes"
    ],
    "description": {
      "en": "An authoritative, comprehensive handbook covering the internal mechanics of the V8 JavaScript engine, execution context lifecycles, closure memory retention, prototype hidden classes, the event loop task queues, and concurrent async orchestration.",
      "vi": "Cẩm nang toàn diện và chuẩn mực về cơ chế hoạt động bên trong của engine JavaScript V8, vòng đời ngữ cảnh thực thi, quản lý bộ nhớ closure, hidden class của prototype, các hàng đợi task trong event loop và điều phối bất đồng bộ hiện đại."
    },
    "prerequisites": {
      "en": [
        "Fundamental JavaScript syntax (variables, functions, loops, objects)",
        "Basic experience writing client-side browser or server-side Node.js applications"
      ],
      "vi": [
        "Cú pháp JavaScript cơ bản (biến, hàm, vòng lặp, đối tượng)",
        "Kinh nghiệm cơ bản trong lập trình web frontend hoặc ứng dụng backend với Node.js"
      ]
    },
    "outcomes": {
      "en": [
        "Master the internal phases of the V8 engine: Ignition bytecode generation, TurboFan compilation, and execution context creation",
        "Understand how lexical environments and heap-allocated closure scopes interact with garbage collection",
        "Analyze the exact execution order of the Event Loop across macrotasks, microtasks, and UI rendering opportunities",
        "Deploy concurrent async patterns confidently using Promise combinators (all, allSettled, race, any)"
      ],
      "vi": [
        "Làm chủ các giai đoạn nội bộ của engine V8: sinh bytecode Ignition, tối ưu hóa TurboFan và khởi tạo ngữ cảnh thực thi",
        "Hiểu rõ cơ chế tương tác giữa môi trường từ vựng, phạm vi closure trên heap và bộ thu gom rác (garbage collection)",
        "Phân tích chính xác thứ tự thực thi của Event Loop qua macrotask, microtask và cơ hội render giao diện",
        "Vận dụng thành thạo các mẫu bất đồng bộ đồng thời với các hàm kết hợp Promise (all, allSettled, race, any)"
      ]
    },
    "parts": [
      {
        "partNumber": 1,
        "romanNumeral": "I",
        "title": {
          "en": "Engine Architecture & Execution Contexts",
          "vi": "Kiến Trúc Engine & Ngữ Cảnh Thực Thi"
        },
        "description": {
          "en": "The internal mechanics of V8, memory allocation, execution contexts, and closure scope chains.",
          "vi": "Cơ chế nội bộ của V8, cấp phát bộ nhớ, ngữ cảnh thực thi và chuỗi phạm vi closure."
        }
      },
      {
        "partNumber": 2,
        "romanNumeral": "II",
        "title": {
          "en": "Concurrency, Event Loop & Asynchronous Runtimes",
          "vi": "Xử Lý Đồng Thời, Event Loop & Môi Trường Bất Đồng Bộ"
        },
        "description": {
          "en": "The event-driven concurrency model, microtask priority, and Promise orchestration patterns.",
          "vi": "Mô hình xử lý đồng thời hướng sự kiện, thứ tự ưu tiên microtask và các mẫu điều phối Promise."
        }
      }
    ],
    "chapters": [
      {
        "id": "js-hb-ch-1",
        "number": 1,
        "slug": "v8-architecture-execution-contexts",
        "title": {
          "en": "V8 Architecture & Execution Contexts",
          "vi": "Kiến Trúc V8 & Ngữ Cảnh Thực Thi"
        },
        "summary": {
          "en": "The physical lifecycle of JavaScript execution: parsing, Ignition bytecode, creation and execution phases, and lexical environments.",
          "vi": "Vòng đời vật lý của quá trình thực thi JavaScript: phân tích cú pháp, sinh bytecode Ignition, các pha tạo lập/thực thi và môi trường từ vựng."
        },
        "readTimeMinutes": 12,
        "sectionsCount": 2
      },
      {
        "id": "js-hb-ch-2",
        "number": 2,
        "slug": "objects-prototypes-modern-inheritance",
        "title": {
          "en": "Objects, Prototypes & Modern Inheritance",
          "vi": "Đối Tượng, Prototype & Kế Thừa Hiện Đại"
        },
        "summary": {
          "en": "Prototype chain mechanics, V8 hidden classes (shapes), and ES6+ class semantics with private field brand checks.",
          "vi": "Cơ chế chuỗi prototype, hidden class (shapes) trong V8 và ngữ nghĩa class ES6+ với trường private."
        },
        "readTimeMinutes": 10,
        "sectionsCount": 1
      },
      {
        "id": "js-hb-ch-3",
        "number": 3,
        "slug": "event-loop-concurrency-model",
        "title": {
          "en": "The Event Loop & Concurrency Model",
          "vi": "Event Loop & Mô Hình Xử Lý Đồng Thời"
        },
        "summary": {
          "en": "Microtask vs macrotask execution order, UI rendering opportunities, and browser vs Node.js runtime architectures.",
          "vi": "Thứ tự thực thi giữa microtask và macrotask, cơ hội render UI và sự khác biệt kiến trúc giữa trình duyệt và Node.js."
        },
        "readTimeMinutes": 12,
        "sectionsCount": 2
      },
      {
        "id": "js-hb-ch-4",
        "number": 4,
        "slug": "asynchronous-orchestration-promises",
        "title": {
          "en": "Asynchronous Orchestration: Promises & Async/Await",
          "vi": "Điều Phối Bất Đồng Bộ: Promises & Async/Await"
        },
        "summary": {
          "en": "Promise state machine transitions, unhandled rejection monitoring, and concurrent combinators (all, allSettled, race, any).",
          "vi": "Chuyển đổi trạng thái máy Promise, giám sát lỗi unhandled rejection và các hàm kết hợp đồng thời (all, allSettled, race, any)."
        },
        "readTimeMinutes": 11,
        "sectionsCount": 2
      }
    ]
  },
  {
    "id": "javascript-definitions",
    "slug": "javascript-definitions",
    "title": "JavaScript Definitions & Engine Terms",
    "subtitle": {
      "en": "Precise Runtime Definitions, Mental Models & Language Specifications",
      "vi": "Định Nghĩa Chuẩn Runtime, Mô Hình Tư Duy & Đặc Tả Ngôn Ngữ JavaScript"
    },
    "bookType": "Definitions",
    "fieldId": "computer-science",
    "domainIds": [
      "programming",
      "web"
    ],
    "topicId": "javascript",
    "categoryId": "javascript",
    "subjectId": "programming",
    "author": "4TM Technical Board",
    "role": "Core Language & Web Architecture Group",
    "level": "Foundational to Intermediate",
    "estimatedReadTime": "28 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-12",
    "accentColor": "from-amber-600 to-yellow-800",
    "tags": [
      "Definitions",
      "JavaScript",
      "Closures",
      "TDZ",
      "Prototypes",
      "this",
      "Engine"
    ],
    "description": {
      "en": "Authoritative, specification-grounded definitions for JavaScript runtime mechanics: Closures, Lexical Environments, Temporal Dead Zone (TDZ), Prototype Chains, and the 4 Rules of \"this\" binding.",
      "vi": "Cẩm nang định nghĩa chuẩn xác theo đặc tả ECMAScript về cơ chế runtime: Closure, Môi trường Lexical, Vùng chết thời gian (TDZ), Chuỗi Prototype và 4 quy tắc binding từ khóa \"this\"."
    },
    "prerequisites": {
      "en": [
        "Basic familiarity with JavaScript syntax and functional execution",
        "Experience authoring object literals and asynchronous callbacks"
      ],
      "vi": [
        "Quen thuộc căn bản với cú pháp JavaScript và thực thi hàm",
        "Kinh nghiệm viết object literals và hàm callback bất đồng bộ"
      ]
    },
    "outcomes": {
      "en": [
        "Construct accurate mental models for closures and lexical environment records",
        "Explain the Temporal Dead Zone (TDZ) and distinction between initialization and declaration",
        "Trace prototype property lookups through [[Prototype]] chains with precision",
        "Determine the binding of the \"this\" keyword at any call site without ambiguity"
      ],
      "vi": [
        "Xây dựng mô hình tư duy chính xác về closure và bản ghi môi trường từ vựng (lexical environment)",
        "Giải thích tường tận vùng chết thời gian (TDZ) và sự khác biệt giữa khởi tạo và khai báo",
        "Truy vết tra cứu thuộc tính xuyên suốt chuỗi [[Prototype]] với độ chính xác cao",
        "Xác định chuẩn xác giá trị của từ khóa \"this\" tại mọi vị trí gọi hàm (call site)"
      ]
    },
    "chapters": [
      {
        "id": "js-def-ch-1",
        "number": 1,
        "slug": "scope-closures-tdz-definitions",
        "title": {
          "en": "Lexical Environments, Closures & Variable Lifecycles",
          "vi": "Môi Trường Lexical, Closures & Vòng Đời Biến"
        },
        "summary": {
          "en": "Formal definitions and mental models for Lexical Scope, Closure memory retention, Hoisting, and the Temporal Dead Zone.",
          "vi": "Định nghĩa chuẩn và mô hình tư duy về Lexical Scope, cơ chế giữ bộ nhớ của Closure, Hoisting và Vùng chết thời gian (TDZ)."
        },
        "readTimeMinutes": 14,
        "sectionsCount": 2
      },
      {
        "id": "js-def-ch-2",
        "number": 2,
        "slug": "prototypes-and-this-keyword",
        "title": {
          "en": "Prototype Chain & The 4 Rules of \"this\" Binding",
          "vi": "Chuỗi Prototype & 4 Quy Tắc Binding Của \"this\""
        },
        "summary": {
          "en": "Definitive specifications for object prototype delegation, [[Prototype]] vs .prototype, and the 4 deterministic invocation rules of the \"this\" keyword.",
          "vi": "Đặc tả chuẩn mực về ủy quyền prototype, phân biệt [[Prototype]] với .prototype và 4 quy tắc xác định giá trị của từ khóa \"this\"."
        },
        "readTimeMinutes": 14,
        "sectionsCount": 2
      }
    ]
  },
  {
    "id": "javascript-practical-guide",
    "slug": "javascript-practical-guide",
    "title": "Async JavaScript & Fetch API Practical Guide",
    "subtitle": {
      "en": "Production Blueprint for Resilient HTTP Streaming, Status Handling & AbortController Cancellation",
      "vi": "Cẩm Nang Thực Hành Gọi API Async, Đọc Stream & Hủy Request An Toàn Với AbortController"
    },
    "bookType": "Practical Guides",
    "fieldId": "computer-science",
    "domainIds": [
      "programming",
      "web"
    ],
    "topicId": "javascript",
    "categoryId": "javascript",
    "subjectId": "programming",
    "author": "4TM Technical Board",
    "role": "Core Language & Web Architecture Group",
    "level": "Intermediate",
    "estimatedReadTime": "32 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-15",
    "accentColor": "from-amber-500 to-yellow-800",
    "tags": [
      "Fetch API",
      "Async",
      "AbortController",
      "HTTP",
      "Streaming",
      "Production Guide"
    ],
    "description": {
      "en": "A step-by-step practical guide to performing asynchronous HTTP requests, handling status codes, streaming responses, and cancelling stale queries with AbortSignal.",
      "vi": "Hướng dẫn thực hành từng bước xử lý truy vấn HTTP bất đồng bộ, kiểm tra mã trạng thái, đọc phản hồi dạng stream và hủy request hết hạn bằng AbortSignal."
    },
    "prerequisites": {
      "en": [
        "Strong grasp of JavaScript Promises and async/await syntax",
        "Familiarity with standard HTTP methods and status codes (2xx, 4xx, 5xx)"
      ],
      "vi": [
        "Nắm vững Promise và cú pháp async/await trong JavaScript",
        "Hiểu biết về các phương thức HTTP và mã trạng thái chuẩn (2xx, 4xx, 5xx)"
      ]
    },
    "outcomes": {
      "en": [
        "Build resilient HTTP clients checking response.ok and parsing error envelopes correctly",
        "Read and process large streaming payloads chunk-by-chunk via ReadableStream",
        "Cancel in-flight network requests on route navigation or component unmount using AbortController",
        "Implement timeout envelopes combining AbortSignal.timeout() with exponential backoff"
      ],
      "vi": [
        "Xây dựng HTTP client bền vững kiểm tra response.ok và parse đúng format lỗi trả về",
        "Đọc và xử lý luồng dữ liệu lớn theo từng phần với ReadableStream",
        "Hủy request mạng đang chạy khi người dùng chuyển trang hoặc unmount component bằng AbortController",
        "Thiết lập phong bì timeout kết hợp AbortSignal.timeout() và cơ chế thử lại có giãn cách"
      ]
    },
    "chapters": [
      {
        "id": "jpg-ch-1",
        "number": 1,
        "slug": "fetch-api-and-response-handling",
        "title": {
          "en": "Safe HTTP Client Architecture & Response Streaming",
          "vi": "Kiến Trúc HTTP Client An Toàn & Xử Lý Stream Dữ Liệu"
        },
        "summary": {
          "en": "Overcoming the fetch() 4xx/5xx rejection pitfall, typed JSON deserialization, and chunked ReadableStream parsing.",
          "vi": "Khắc phục cạm bẫy không tự bắt lỗi 4xx/5xx của fetch(), giải mã JSON có kiểm tra kiểu và đọc luồng ReadableStream theo gói nhỏ."
        },
        "readTimeMinutes": 16,
        "sectionsCount": 1
      },
      {
        "id": "jpg-ch-2",
        "number": 2,
        "slug": "abort-controller-cancellation",
        "title": {
          "en": "Request Lifecycle Management with AbortController",
          "vi": "Quản Lý Vòng Đời Request Với AbortController & AbortSignal"
        },
        "summary": {
          "en": "Preventing race conditions, cancelling stale search queries, and enforcing hard timeout envelopes using AbortController.",
          "vi": "Chống race condition khi tìm kiếm nhanh, hủy bỏ request cũ và thiết lập giới hạn timeout bằng AbortController."
        },
        "readTimeMinutes": 16,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "javascript-common-errors",
    "slug": "javascript-common-errors",
    "title": "JavaScript Common Errors & Async Pitfalls",
    "subtitle": {
      "en": "Diagnostic Blueprints for Uncaught TypeErrors, Silent Coercion & Unhandled Promise Rejections",
      "vi": "Cẩm Nang Chẩn Đoán Lỗi Uncaught TypeError, Ép Kiểu Ngầm Định & Unhandled Promise Rejection"
    },
    "bookType": "Common Errors",
    "fieldId": "computer-science",
    "domainIds": [
      "programming",
      "web"
    ],
    "topicId": "javascript",
    "categoryId": "javascript",
    "subjectId": "programming",
    "author": "4TM Technical Board",
    "role": "Core Language & Web Architecture Group",
    "level": "Foundational to Intermediate",
    "estimatedReadTime": "26 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-01-22",
    "accentColor": "from-amber-600 to-rose-700",
    "tags": [
      "Debugging",
      "TypeError",
      "Async Pitfalls",
      "Common Errors",
      "JavaScript",
      "Production"
    ],
    "description": {
      "en": "Diagnostic reference and systematic remediation blueprints for the most frequent runtime crashes in modern JavaScript: Cannot read properties of undefined, implicit type coercion bugs, IEEE 754 precision drift, and unhandled promise rejections.",
      "vi": "Cẩm nang chẩn đoán và quy trình khắc phục bài bản các lỗi sập runtime phổ biến nhất trong JavaScript hiện đại: Cannot read properties of undefined, ép kiểu ngầm định, sai số số thực IEEE 754 và Unhandled Promise Rejection."
    },
    "prerequisites": {
      "en": [
        "Basic JavaScript syntax and execution model",
        "Experience reading browser console error stack traces"
      ],
      "vi": [
        "Hiểu biết cú pháp cơ bản và mô hình thực thi của JavaScript",
        "Kinh nghiệm đọc vết ngăn xếp (stack trace) trên console trình duyệt"
      ]
    },
    "outcomes": {
      "en": [
        "Diagnose and remediate \"Cannot read properties of undefined\" using safe navigation patterns",
        "Distinguish Nullish Coalescing (??) from Logical OR (||) to prevent falsy value truncation",
        "Neutralize IEEE 754 floating-point arithmetic rounding errors in monetary calculations",
        "Capture and structure asynchronous error chains to eliminate unhandled promise rejections"
      ],
      "vi": [
        "Chẩn đoán và khắc phục triệt để lỗi \"Cannot read properties of undefined\" bằng cú pháp an toàn",
        "Phân biệt rõ ràng toán tử Nullish Coalescing (??) và Logical OR (||) để tránh mất giá trị falsy hợp lệ",
        "Khắc phục sai số tính toán số thực IEEE 754 trong các bài toán tiền tệ và tài chính",
        "Bắt trọn chuỗi lỗi bất đồng bộ để xóa bỏ hoàn toàn cảnh báo unhandled promise rejection"
      ]
    },
    "chapters": [
      {
        "id": "jce-ch-1",
        "number": 1,
        "slug": "cannot-read-property-undefined",
        "title": {
          "en": "Properties of Undefined & Safe Nullish Navigation",
          "vi": "Lỗi Đọc Thuộc Tính Của Undefined & Điều Hướng Nullish An Toàn"
        },
        "summary": {
          "en": "Root causes, diagnosis, and modern fixes for TypeError: Cannot read properties of undefined (reading \"x\") and falsy value overwrites with Logical OR.",
          "vi": "Nguyên nhân gốc rễ, chẩn đoán và cách khắc phục lỗi TypeError: Cannot read properties of undefined cùng lỗi mất dữ liệu với toán tử ||."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 1
      },
      {
        "id": "jce-ch-2",
        "number": 2,
        "slug": "floating-point-coercion-gotchas",
        "title": {
          "en": "Unhandled Promise Rejections & IEEE 754 Precision Drift",
          "vi": "Unhandled Promise Rejection & Sai Số Làm Tròn IEEE 754"
        },
        "summary": {
          "en": "Diagnosing unhandled asynchronous promise rejections and preventing catastrophic floating-point rounding errors in financial and numeric calculations.",
          "vi": "Chẩn đoán lỗi Unhandled Promise Rejection và phòng ngừa sai số làm tròn số thực IEEE 754 trong các phép toán tài chính."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "javascript-best-practices",
    "slug": "javascript-best-practices",
    "title": "Modern ES6+ Best Practices",
    "subtitle": {
      "en": "Immutability, Functional Methods, Modules & Clean Architecture",
      "vi": "Tính Bất Biến, Hàm Functional, ES Modules & Kiến Trúc Sạch"
    },
    "bookType": "Best Practices",
    "fieldId": "computer-science",
    "domainIds": [
      "programming",
      "web"
    ],
    "topicId": "javascript",
    "categoryId": "javascript",
    "subjectId": "programming",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Intermediate",
    "estimatedReadTime": "25 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-01",
    "accentColor": "from-amber-600 to-yellow-900",
    "tags": [
      "ES6+",
      "Immutability",
      "Clean Code",
      "Best Practices"
    ],
    "description": {
      "en": "Standards for writing clean modern JavaScript: preferring const/let over var, immutable array transformations (map, filter, reduce), structured ES Modules, and avoiding global state pollution.",
      "vi": "Tiêu chuẩn viết code JavaScript hiện đại: dùng const/let thay var, biến đổi mảng bất biến (map, filter, reduce), cấu trúc ES Modules và tránh làm bẩn global state."
    },
    "prerequisites": {
      "en": [
        "Experience writing modern JavaScript applications and working with ECMAScript 2015+ features"
      ],
      "vi": [
        "Kinh nghiệm lập trình ứng dụng JavaScript hiện đại và làm việc với các tính năng ECMAScript 2015+"
      ]
    },
    "outcomes": {
      "en": [
        "Master pure, immutable array transformations using map, filter, reduce, and toSorted without mutation side-effects",
        "Architect robust ES Module systems using explicit named exports for optimal bundler tree-shaking and cyclic dependency prevention",
        "Enforce variable scoping discipline and eliminate legacy mutable state anti-patterns across production applications"
      ],
      "vi": [
        "Làm chủ các phép biến đổi mảng thuần khiết, bất biến bằng map, filter, reduce và toSorted không gây tác dụng phụ",
        "Kiến trúc hệ thống ES Module vững chắc dùng named export tường minh để tối ưu tree-shaking và phòng tránh phụ thuộc vòng",
        "Thiết lập kỷ luật phạm vi biến số và loại bỏ hoàn toàn các sai lầm quản lý trạng thái đột biến trong môi trường production"
      ]
    },
    "chapters": [
      {
        "id": "jbp-ch-1",
        "number": 1,
        "slug": "immutable-array-transformations",
        "title": {
          "en": "Immutable Array Transformations (map, filter, reduce)",
          "vi": "Biến Đổi Mảng Bất Biến Với map, filter, reduce"
        },
        "summary": {
          "en": "Avoiding push/splice in-place mutations; leveraging pure array functions for predictable state management.",
          "vi": "Tránh biến đổi trực tiếp bằng push/splice; tận dụng hàm mảng thuần khiết để quản lý trạng thái an toàn."
        },
        "readTimeMinutes": 12,
        "sectionsCount": 1
      },
      {
        "id": "jbp-ch-2",
        "number": 2,
        "slug": "es-modules-and-clean-imports",
        "title": {
          "en": "ES Modules & Code Decoupling",
          "vi": "Hệ Thống ES Modules & Tách Biệt Mã Nguồn"
        },
        "summary": {
          "en": "Named exports vs default exports, tree-shaking mechanics, and cyclic dependency prevention.",
          "vi": "Named export vs default export, cơ chế tree-shaking và phòng tránh phụ thuộc vòng."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "javascript-patterns",
    "slug": "javascript-patterns",
    "title": "JavaScript Design Patterns & Recipes",
    "subtitle": {
      "en": "Module Pattern, Factory, Pub/Sub & Debounce/Throttle Recipes",
      "vi": "Module Pattern, Factory, Mẫu Pub/Sub & Công Thức Debounce/Throttle"
    },
    "bookType": "Patterns / Recipes",
    "fieldId": "computer-science",
    "domainIds": [
      "programming",
      "web"
    ],
    "topicId": "javascript",
    "categoryId": "javascript",
    "subjectId": "programming",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Intermediate",
    "estimatedReadTime": "30 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-18",
    "accentColor": "from-amber-600 to-amber-900",
    "tags": [
      "Patterns",
      "Debounce",
      "Throttle",
      "PubSub",
      "Recipes"
    ],
    "description": {
      "en": "A collection of essential JavaScript design patterns and formulas: Debounce, Throttle, Publisher/Subscriber Event Emitter, Singleton, and Factory functions.",
      "vi": "Bộ công thức và mẫu thiết kế JavaScript hữu ích: Debounce, Throttle, Hệ thống sự kiện Pub/Sub, Singleton và Factory functions."
    },
    "prerequisites": {
      "en": [
        "Understanding of closures, higher-order functions, and event callback execution in JavaScript"
      ],
      "vi": [
        "Hiểu biết về closure, hàm bậc cao (higher-order functions) và cơ chế thực thi callback sự kiện trong JavaScript"
      ]
    },
    "outcomes": {
      "en": [
        "Implement custom lightweight debounce and throttle helper utilities from scratch without third-party dependencies",
        "Construct memory-safe Publisher/Subscriber (EventEmitter) message buses with dynamic listener registration and cleanup",
        "Optimize high-frequency UI events (search inputs, infinite scrolling, window resizing) for 60fps responsiveness"
      ],
      "vi": [
        "Tự xây dựng các hàm tiện ích Debounce và Throttle siêu nhẹ từ đầu mà không cần thư viện ngoài",
        "Thiết lập kênh truyền tin Publisher/Subscriber (EventEmitter) an toàn bộ nhớ với cơ chế đăng ký và hủy lắng nghe linh hoạt",
        "Tối ưu hóa các sự kiện giao diện tần suất cao (ô tìm kiếm, cuộn vô tận, thay đổi kích thước cửa sổ) đạt chuẩn 60fps mượt mà"
      ]
    },
    "chapters": [
      {
        "id": "jpat-ch-1",
        "number": 1,
        "slug": "debounce-and-throttle-recipes",
        "title": {
          "en": "Debounce & Throttle Helper Recipes",
          "vi": "Công Thức Viết Hàm Debounce & Throttle"
        },
        "summary": {
          "en": "Rate-limiting high-frequency DOM events (scroll, resize, search input) to prevent CPU bottlenecks.",
          "vi": "Tiết chế tần suất sự kiện DOM dồn dập (scroll, resize, gõ ô tìm kiếm) để tránh nghẽn CPU."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 1
      },
      {
        "id": "jpat-ch-2",
        "number": 2,
        "slug": "pub-sub-event-emitter",
        "title": {
          "en": "Publisher/Subscriber (Pub/Sub) Pattern",
          "vi": "Mẫu Thiết Kế Publisher/Subscriber (Pub/Sub)"
        },
        "summary": {
          "en": "Decoupling component communication with a custom EventEmitter in-memory bus.",
          "vi": "Tách biệt giao tiếp giữa các component bằng kênh EventEmitter tự chế trong bộ nhớ."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "excel-handbook",
    "slug": "excel-handbook",
    "title": "Excel Handbook",
    "subtitle": {
      "en": "Calculation Grid Mechanics, Dynamic Arrays & Memory Architectures",
      "vi": "Cơ Chế Lưới Tính Toán, Mảng Động & Kiến Trúc Bộ Nhớ Trong Excel Hiện Đại"
    },
    "bookType": "Handbook",
    "fieldId": "computer-science",
    "domainIds": [
      "data-analytics"
    ],
    "topicId": "excel",
    "categoryId": "excel",
    "subjectId": "analytics",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Comprehensive",
    "estimatedReadTime": "45 mins",
    "chaptersCount": 3,
    "publishedDate": "2025-02-10",
    "accentColor": "from-emerald-600 to-green-800",
    "tags": [
      "Excel",
      "Spreadsheet",
      "Dynamic Arrays",
      "Data Analysis",
      "Handbook"
    ],
    "description": {
      "en": "Authoritative engineering reference for Microsoft Excel: the spreadsheet calculation grid, dependency tree evaluation, reference lock mechanics ($), modern Dynamic Array spill engine (#), and in-memory PivotCache optimization.",
      "vi": "Cẩm nang kỹ thuật chuẩn xác về Microsoft Excel: cơ chế lưới tính toán, cây phụ thuộc công thức, tham chiếu ô ($), engine mảng động tràn tự động (#) và tối ưu hóa bộ nhớ PivotCache."
    },
    "prerequisites": {
      "en": [
        "Basic spreadsheet operational literacy and formula editing skills",
        "Familiarity with business data tables and tabular data layouts"
      ],
      "vi": [
        "Kỹ năng tin học văn phòng cơ bản và thao tác nhập công thức bảng tính",
        "Làm quen với các bảng dữ liệu kinh doanh và bố cục dữ liệu dạng bảng"
      ]
    },
    "outcomes": {
      "en": [
        "Master absolute ($A$1), relative ($A1/A$1), and 3D reference systems alongside Excel dependency tree evaluation",
        "Architect resilient Dynamic Array formulas (XLOOKUP, FILTER, UNIQUE, SEQUENCE) with spill operator (#) syntax",
        "Optimize workbook calculation speed by eliminating volatile cascades and managing in-memory PivotCache refreshes"
      ],
      "vi": [
        "Làm chủ hệ thống tham chiếu tuyệt đối ($A$1), tương đối, hỗn hợp và cơ chế tính toán cây phụ thuộc của Excel",
        "Xây dựng công thức mảng động bền vững (XLOOKUP, FILTER, UNIQUE, SEQUENCE) với toán tử tràn (#)",
        "Tối ưu tốc độ tính toán file Excel bằng cách triệt tiêu chuỗi hàm volatile và quản lý bộ nhớ PivotCache"
      ]
    },
    "parts": [
      {
        "partNumber": 1,
        "romanNumeral": "I",
        "title": {
          "en": "Grid Architecture & Formula Dependency Trees",
          "vi": "Kiến Trúc Lưới Tính & Cây Phụ Thuộc Công Thức"
        },
        "description": {
          "en": "Spreadsheet coordinate systems, absolute vs relative reference locks ($), and calculation dependency evaluation.",
          "vi": "Hệ tọa độ ô bảng tính, các kiểu khóa tham chiếu ($) và cơ chế đánh giá cây phụ thuộc tính toán."
        }
      },
      {
        "partNumber": 2,
        "romanNumeral": "II",
        "title": {
          "en": "Dynamic Array Engine & Modern Vector Lookups",
          "vi": "Engine Mảng Động & Các Hàm Tra Cứu Vector Hiện Đại"
        },
        "description": {
          "en": "The dynamic array calculation engine, spilled range operator (#), and vector lookups (XLOOKUP vs VLOOKUP).",
          "vi": "Động cơ tính toán mảng động, toán tử vùng tràn (#) và kỹ thuật tra cứu vector (XLOOKUP vs VLOOKUP)."
        }
      },
      {
        "partNumber": 3,
        "romanNumeral": "III",
        "title": {
          "en": "In-Memory Aggregation & PivotCache Architecture",
          "vi": "Tổng Hợp Dữ Liệu Bộ Nhớ & Kiến Trúc PivotCache"
        },
        "description": {
          "en": "PivotTable internal architecture, in-memory PivotCache indexing, and high-speed aggregation workflows.",
          "vi": "Kiến trúc nội bộ của PivotTable, chỉ mục bộ nhớ PivotCache và quy trình tổng hợp dữ liệu tốc độ cao."
        }
      }
    ],
    "chapters": [
      {
        "id": "xl-hb-ch-1",
        "number": 1,
        "slug": "cell-references-and-calculation-grid",
        "title": {
          "en": "Cell References & Calculation Grid Mechanics",
          "vi": "Tham Chiếu Ô & Cơ Chế Lưới Tính Toán"
        },
        "summary": {
          "en": "Grid coordinates, Relative vs Absolute ($) vs Mixed locks, dependency trees, dirty cell tracking, and calculation phases.",
          "vi": "Tọa độ lưới ô, khóa tham chiếu Tương đối vs Tuyệt đối ($) vs Hỗn hợp, cây phụ thuộc, đánh dấu dirty cell và các pha tính toán."
        },
        "readTimeMinutes": 14,
        "sectionsCount": 1
      },
      {
        "id": "xl-hb-ch-2",
        "number": 2,
        "slug": "dynamic-array-engine-spilling",
        "title": {
          "en": "Dynamic Arrays, Spilled Ranges (#) & Vector Calculations",
          "vi": "Mảng Động, Vùng Tràn (#) & Các Phép Tính Vector"
        },
        "summary": {
          "en": "The dynamic array calculation engine, automatic spilling, the `#` spilled range operator, #SPILL! resolution, and vector lookups (XLOOKUP vs VLOOKUP).",
          "vi": "Động cơ tính toán mảng động, tự động tràn dữ liệu, toán tử vùng tràn `#`, xử lý lỗi #SPILL! và tra cứu vector (XLOOKUP vs VLOOKUP)."
        },
        "readTimeMinutes": 16,
        "sectionsCount": 1
      },
      {
        "id": "xl-hb-ch-3",
        "number": 3,
        "slug": "pivot-tables-data-summarization",
        "title": {
          "en": "PivotTable Architecture, PivotCache & Dimensional Summarization",
          "vi": "Kiến Trúc PivotTable, Bộ Nhớ PivotCache & Tổng Hợp Dữ Liệu Chiều"
        },
        "summary": {
          "en": "In-memory PivotCache architecture, memory deduplication across multiple PivotTables, Slicers, Calculated Fields, and refresh pipelines.",
          "vi": "Kiến trúc bộ nhớ PivotCache, tái sử dụng cache giữa nhiều PivotTable, thanh lọc Slicer, trường tính toán và quy trình làm mới dữ liệu."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "excel-definitions",
    "slug": "excel-definitions",
    "title": "Excel Terminology & Formula Glossary",
    "subtitle": {
      "en": "Volatile Functions, Spilled Range Operator, Structured References & Data Model Definitions",
      "vi": "Thuật Ngữ Hàm Volatile, Toán Tử Vùng Tràn, Tham Chiếu Có Cấu Trúc & Mô Hình Dữ Liệu Excel"
    },
    "bookType": "Definitions",
    "fieldId": "computer-science",
    "domainIds": [
      "data-analytics"
    ],
    "topicId": "excel",
    "categoryId": "excel",
    "subjectId": "analytics",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Foundational to Intermediate",
    "estimatedReadTime": "25 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-12",
    "accentColor": "from-emerald-500 to-green-700",
    "tags": [
      "Definitions",
      "Glossary",
      "Excel Engine",
      "Functions",
      "Excel"
    ],
    "description": {
      "en": "Precision definitions and mental models for core Excel concepts: Volatile Functions, Spilled Range Operator (#), Structured References (Table[@Column]), and the Excel Data Model (xVelocity).",
      "vi": "Định nghĩa chuẩn xác và mô hình tư duy cho các khái niệm Excel cốt lõi: Hàm Volatile, Toán tử vùng tràn (#), Tham chiếu có cấu trúc (Table[@Column]) và Mô hình dữ liệu Excel Data Model (xVelocity)."
    },
    "prerequisites": {
      "en": [
        "Basic familiarity with Excel workbook navigation and formula writing"
      ],
      "vi": [
        "Làm quen cơ bản với thao tác sử dụng bảng tính Excel và nhập công thức"
      ]
    },
    "outcomes": {
      "en": [
        "Identify and diagnose volatile functions (NOW, TODAY, OFFSET, INDIRECT) causing workbook calculation lag",
        "Leverage the spilled range operator (#) to reference dynamic array outputs cleanly",
        "Write robust structured table references that automatically scale with data ingestion"
      ],
      "vi": [
        "Nhận biết và chẩn đoán các hàm volatile (NOW, TODAY, OFFSET, INDIRECT) làm chậm tốc độ tính toán của file",
        "Sử dụng thành thạo toán tử vùng tràn (#) để tham chiếu mảng động gọn gàng và an toàn",
        "Viết các tham chiếu bảng có cấu trúc tự động co giãn theo dữ liệu nạp vào"
      ]
    },
    "chapters": [
      {
        "id": "xl-def-ch-1",
        "number": 1,
        "slug": "volatile-functions-and-spill-terms",
        "title": {
          "en": "Volatile Functions & Spilled Range Terms",
          "vi": "Khái Niệm Hàm Volatile & Thuật Ngữ Vùng Tràn"
        },
        "summary": {
          "en": "Formal definitions for Volatile Functions, calculation triggers, and the Spilled Range Operator (`#`).",
          "vi": "Định nghĩa chuẩn cho các hàm Volatile, cơ chế kích hoạt tính toán và Toán tử vùng tràn (`#`)."
        },
        "readTimeMinutes": 12,
        "sectionsCount": 2
      },
      {
        "id": "xl-def-ch-2",
        "number": 2,
        "slug": "excel-tables-structured-references",
        "title": {
          "en": "Excel Tables, Structured References & Data Models",
          "vi": "Bảng Excel Table, Tham Chiếu Có Cấu Trúc & Data Model"
        },
        "summary": {
          "en": "Formal definitions for Structured References (Table[@Column]), ListObjects, and the Power Pivot in-memory Data Model.",
          "vi": "Định nghĩa chuẩn cho Tham Chiếu Có Cấu Trúc (Table[@Column]), ListObject và Mô Hình Dữ Liệu Excel Data Model."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 2
      }
    ]
  },
  {
    "id": "excel-formulas-recipes",
    "slug": "excel-formulas-recipes",
    "title": "Excel Advanced Formulas & Recipes",
    "subtitle": {
      "en": "Multi-Condition Lookups, Dynamic Arrays & Report Formulas",
      "vi": "Công Thức Tra Cứu Nâng Cao, Mảng Động & Công Thức Báo Cáo Tự Động"
    },
    "bookType": "Patterns / Recipes",
    "fieldId": "computer-science",
    "domainIds": [
      "data-analytics"
    ],
    "topicId": "excel",
    "categoryId": "excel",
    "subjectId": "analytics",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Intermediate",
    "estimatedReadTime": "30 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-15",
    "accentColor": "from-emerald-600 to-green-900",
    "tags": [
      "Formulas",
      "Recipes",
      "XLOOKUP",
      "SUMIFS",
      "Dynamic Array"
    ],
    "description": {
      "en": "Reusable Excel formula blueprints: multi-criteria XLOOKUP, dynamic cascading dropdowns, SUMIFS with wildcards, and LET function optimization.",
      "vi": "Bộ công thức Excel tái sử dụng: XLOOKUP nhiều điều kiện, menu thả xuống phân cấp động, SUMIFS dùng ký tự đại diện và tối ưu bằng hàm LET."
    },
    "prerequisites": {
      "en": [
        "Understanding of basic IF, SUM, and VLOOKUP functions, and spreadsheet range references"
      ],
      "vi": [
        "Hiểu biết các hàm IF, SUM và VLOOKUP cơ bản cùng cách tham chiếu ô/vùng trong Excel"
      ]
    },
    "outcomes": {
      "en": [
        "Streamline complex multi-step spreadsheet formulas using LET() variable declarations to eliminate repetitive calculations",
        "Execute multi-criteria lookups using Boolean multiplication inside XLOOKUP and FILTER functions",
        "Construct automated dashboard summary tables leveraging dynamic array formulas with SORT, UNIQUE, and FILTER"
      ],
      "vi": [
        "Tinh gọn các công thức bảng tính phức tạp nhiều bước bằng hàm LET() để loại bỏ tính toán lặp",
        "Thực hiện tra cứu nhiều điều kiện bằng phép nhân mảng Boolean trong các hàm XLOOKUP và FILTER",
        "Xây dựng bảng tổng hợp dashboard tự động cập nhật với các hàm mảng động SORT, UNIQUE và FILTER"
      ]
    },
    "chapters": [
      {
        "id": "xfr-ch-1",
        "number": 1,
        "slug": "multi-criteria-lookups-let-function",
        "title": {
          "en": "Multi-Criteria Lookups & The LET() Function",
          "vi": "Tra Cứu Nhiều Điều Kiện & Tối Ưu Với Hàm LET()"
        },
        "summary": {
          "en": "Combining boolean array conditions inside XLOOKUP and assigning variables with LET() for maximum formula performance.",
          "vi": "Kết hợp mảng điều kiện Boolean trong XLOOKUP và gán biến với LET() để đạt hiệu năng tính toán cao nhất."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 1
      },
      {
        "id": "xfr-ch-2",
        "number": 2,
        "slug": "dynamic-array-reporting-recipes",
        "title": {
          "en": "Dynamic Array Reporting Recipes",
          "vi": "Công Thức Báo Cáo Động Với Hàm Mảng"
        },
        "summary": {
          "en": "Combining FILTER, SORT, and UNIQUE to auto-generate dynamic dashboard summary tables.",
          "vi": "Kết hợp FILTER, SORT và UNIQUE để tự động tạo bảng dữ liệu dashboard cập nhật theo thời gian thực."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "excel-common-errors",
    "slug": "excel-common-errors",
    "title": "Excel Common Errors & Debugging",
    "subtitle": {
      "en": "Troubleshooting #N/A, #REF!, #VALUE!, #SPILL! & Calculation Errors",
      "vi": "Sửa Lỗi #N/A, #REF!, #VALUE!, #SPILL! & Lỗi Sai Số Bảng Tính"
    },
    "bookType": "Common Errors",
    "fieldId": "computer-science",
    "domainIds": [
      "data-analytics"
    ],
    "topicId": "excel",
    "categoryId": "excel",
    "subjectId": "analytics",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Foundational",
    "estimatedReadTime": "25 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-01-22",
    "accentColor": "from-amber-600 to-rose-800",
    "tags": [
      "Excel Errors",
      "#SPILL!",
      "#N/A",
      "Debugging",
      "Common Errors"
    ],
    "description": {
      "en": "Deconstructing common Excel spreadsheet errors: #SPILL! blocking elements, #REF! deleted cell references, numbers stored as text formatting bugs, and circular references.",
      "vi": "Khắc phục các lỗi Excel thường gặp: #SPILL! do vướng ô dữ liệu, #REF! do xóa ô tham chiếu, số lưu dưới dạng text và lỗi tham chiếu vòng (Circular Reference)."
    },
    "prerequisites": {
      "en": [
        "Basic formula editing skills"
      ],
      "vi": [
        "Kỹ năng sửa công thức Excel cơ bản"
      ]
    },
    "outcomes": {
      "en": [
        "Diagnose and clear #SPILL! range blockages",
        "Convert numbers stored as text back to numeric values safely"
      ],
      "vi": [
        "Phát hiện và dọn dẹp vật cản gây lỗi #SPILL!",
        "Chuyển đổi số lưu dạng text về đúng định dạng số tính toán"
      ]
    },
    "chapters": [
      {
        "id": "xce-ch-1",
        "number": 1,
        "slug": "spill-and-ref-errors",
        "title": {
          "en": "Fixing #SPILL! & #REF! Errors",
          "vi": "Sửa Lỗi #SPILL! & #REF! Trong Công Thức"
        },
        "summary": {
          "en": "Identifying blocking non-empty cells in spilled ranges and missing worksheet targets.",
          "vi": "Xác định các ô có dữ liệu cản trở vùng tràn và tham chiếu bị mất."
        },
        "readTimeMinutes": 12,
        "sectionsCount": 1
      },
      {
        "id": "xce-ch-2",
        "number": 2,
        "slug": "numbers-as-text-and-circular-refs",
        "title": {
          "en": "Numbers Stored as Text & Circular References",
          "vi": "Số Lưu Dạng Text & Lỗi Tham Chiếu Vòng Circular"
        },
        "summary": {
          "en": "Why SUM() returns 0 on text numbers and resolving infinite formula loops.",
          "vi": "Tại sao SUM() trả về 0 khi gặp số dạng text và cách gỡ lặp công thức."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "excel-best-practices",
    "slug": "excel-best-practices",
    "title": "Financial Modeling & Excel Best Practices",
    "subtitle": {
      "en": "Workbook Formatting, Audit Trail Rules & Calculation Speed",
      "vi": "Chuẩn Thiết Kế File Tài Chính, Kiểm Xuất Audit & Tối Ưu Tốc Độ"
    },
    "bookType": "Best Practices",
    "fieldId": "computer-science",
    "domainIds": [
      "data-analytics"
    ],
    "topicId": "excel",
    "categoryId": "excel",
    "subjectId": "analytics",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Intermediate",
    "estimatedReadTime": "25 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-01",
    "accentColor": "from-emerald-700 to-green-900",
    "tags": [
      "Financial Modeling",
      "Audit",
      "Best Practices",
      "Performance"
    ],
    "description": {
      "en": "Engineering best practices for professional spreadsheets: color coding standards (Blue inputs, Black formulas), separating Inputs/Calculations/Outputs, and optimizing calculation speed.",
      "vi": "Quy chuẩn xây dựng file Excel chuyên nghiệp: quy tắc phối màu chuẩn (Xanh dương nhập liệu, Đen công thức), tách biệt Input/Calculation/Output và tối ưu tốc độ tính toán."
    },
    "prerequisites": {
      "en": [
        "Experience creating multi-sheet Excel workbooks"
      ],
      "vi": [
        "Kinh nghiệm tạo workbook Excel nhiều sheet"
      ]
    },
    "outcomes": {
      "en": [
        "Apply standard financial modeling color-coding conventions",
        "Structure modular workbooks with clean audit trails"
      ],
      "vi": [
        "Áp dụng quy ước màu sắc chuẩn trong mô hình tài chính",
        "Cấu trúc file mô-đun hóa dễ kiểm tra đối chiếu"
      ]
    },
    "chapters": [
      {
        "id": "xbp-ch-1",
        "number": 1,
        "slug": "color-coding-and-sheet-structure",
        "title": {
          "en": "Color-Coding Conventions & Workbook Architecture",
          "vi": "Quy Ước Phối Màu & Kiến Trúc Workbook Chuyên Nghiệp"
        },
        "summary": {
          "en": "Blue text for hardcoded inputs, Black for formulas, Green for inter-sheet links.",
          "vi": "Chữ xanh dương cho dữ liệu thô nhập tay, Chữ đen cho công thức, Xanh lá cho liên kết sheet."
        },
        "readTimeMinutes": 12,
        "sectionsCount": 1
      },
      {
        "id": "xbp-ch-2",
        "number": 2,
        "slug": "calculating-speed-optimization",
        "title": {
          "en": "Optimizing Workbook Calculation Speed",
          "vi": "Tối Ưu Tốc Độ Tính Toán Của Workbook"
        },
        "summary": {
          "en": "Replacing full-column references (A:A) with structured table references.",
          "vi": "Thay thế tham chiếu nguyên cột (A:A) bằng tham chiếu tên bảng Excel Table."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "excel-practical-guide",
    "slug": "excel-practical-guide",
    "title": "Excel Practical Guides: Workflows & Automation",
    "subtitle": {
      "en": "Dynamic Dependent Dropdowns, Power Query Transformation & Dashboards",
      "vi": "Danh Sách Thả Phụ Thuộc Động, Xử Lý Dữ Liệu Power Query & Dashboard"
    },
    "bookType": "Practical Guides",
    "fieldId": "computer-science",
    "domainIds": [
      "data-analytics"
    ],
    "topicId": "excel",
    "categoryId": "excel",
    "subjectId": "analytics",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Practical / Applied",
    "estimatedReadTime": "25 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-01-20",
    "accentColor": "from-teal-600 to-emerald-800",
    "tags": [
      "Data Validation",
      "FILTER",
      "Dropdowns",
      "Practical Guides"
    ],
    "description": {
      "en": "Hands-on practical guides for Excel: creating dynamic two-tier dependent dropdowns using XLOOKUP/INDIRECT, and building automated reporting views with FILTER() and SORT().",
      "vi": "Hướng dẫn thực hành các kỹ thuật Excel thực tế: tạo danh sách thả Dropdown phụ thuộc 2 cấp bằng XLOOKUP/INDIRECT và xây dựng bảng báo cáo động với FILTER() và SORT()."
    },
    "prerequisites": {
      "en": [
        "Basic knowledge of Excel tables and functions"
      ],
      "vi": [
        "Kiến thức cơ bản về bảng và hàm Excel"
      ]
    },
    "outcomes": {
      "en": [
        "Construct cascaded multi-level dependent dropdown validation lists",
        "Build interactive real-time dashboard filters with dynamic arrays"
      ],
      "vi": [
        "Tạo danh sách thả Dropdown phụ thuộc đa cấp tự động",
        "Xây dựng bộ lọc báo cáo tương tác tức thì bằng công thức mảng động"
      ]
    },
    "chapters": [
      {
        "id": "xpg-ch-1",
        "number": 1,
        "slug": "dependent-dropdown-lists",
        "title": {
          "en": "Dynamic Dependent (Cascading) Dropdown Lists",
          "vi": "Tạo Danh Sách Thả Phụ Thuộc Đa Cấp Tự Động"
        },
        "summary": {
          "en": "Using named ranges and XLOOKUP to build category-to-subcategory dropdown cascades.",
          "vi": "Sử dụng Name Manager và XLOOKUP để tạo dropdown phân cấp ngành hàng tự động."
        },
        "readTimeMinutes": 12,
        "sectionsCount": 1
      },
      {
        "id": "xpg-ch-2",
        "number": 2,
        "slug": "dynamic-array-dashboard-filters",
        "title": {
          "en": "Dynamic Reporting with FILTER() and SORT()",
          "vi": "Xây Dựng Báo Cáo Động Bằng Hàm FILTER() & SORT()"
        },
        "summary": {
          "en": "Creating live interactive dashboard tables driven by cell criteria without VBA macros.",
          "vi": "Tạo bảng báo cáo lọc tương tác thời gian thực theo ô điều kiện không cần viết mã VBA."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "powerbi-handbook",
    "slug": "powerbi-handbook",
    "title": "Power BI Handbook",
    "subtitle": {
      "en": "VertiPaq Columnar Storage, DAX Context Evaluation & Star Schema Engineering",
      "vi": "Trình Lưu Trữ Cột VertiPaq, Đánh Giá Ngữ Cảnh DAX & Kiến Trúc Star Schema"
    },
    "bookType": "Handbook",
    "fieldId": "computer-science",
    "domainIds": [
      "data-analytics"
    ],
    "topicId": "powerbi",
    "categoryId": "powerbi",
    "subjectId": "analytics",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Comprehensive",
    "estimatedReadTime": "45 mins",
    "chaptersCount": 3,
    "publishedDate": "2025-02-10",
    "accentColor": "from-amber-500 to-yellow-700",
    "tags": [
      "Power BI",
      "DAX",
      "Star Schema",
      "VertiPaq",
      "Business Intelligence",
      "Handbook"
    ],
    "description": {
      "en": "Authoritative engineering reference for Power BI: the VertiPaq in-memory columnar engine, Star Schema dimensional modeling, DAX dual evaluation contexts (Row Context vs Filter Context), context transition, and Row-Level Security (RLS).",
      "vi": "Cẩm nang kỹ thuật chuẩn xác về Power BI: cơ chế nén bộ nhớ VertiPaq, mô hình hóa dữ liệu chiều Star Schema, hai ngữ cảnh tính toán trong DAX (Row Context vs Filter Context), chuyển đổi ngữ cảnh và bảo mật Row-Level Security (RLS)."
    },
    "prerequisites": {
      "en": [
        "Relational database querying and tabular data fundamentals",
        "Basic familiarity with Power BI Desktop and business KPI concepts"
      ],
      "vi": [
        "Nền tảng truy vấn cơ sở dữ liệu quan hệ và cấu trúc dữ liệu bảng",
        "Làm quen cơ bản với Power BI Desktop và các khái niệm KPI doanh nghiệp"
      ]
    },
    "outcomes": {
      "en": [
        "Architect low-cardinality Star Schemas optimized for VertiPaq dictionary and run-length encoding",
        "Master DAX evaluation contexts, filter propagation across 1-to-many relationships, and CALCULATE context transition",
        "Implement enterprise-grade Dynamic Row-Level Security (RLS) with USERPRINCIPALNAME() and security bridge tables"
      ],
      "vi": [
        "Thiết kế mô hình Star Schema có cardinality thấp tối ưu cho mã hóa từ điển và RLE của VertiPaq",
        "Làm chủ các ngữ cảnh tính toán DAX, lan truyền bộ lọc qua quan hệ 1-nhiều và chuyển đổi ngữ cảnh bằng CALCULATE",
        "Triển khai hệ thống phân quyền dữ liệu động (Dynamic RLS) quy mô doanh nghiệp với USERPRINCIPALNAME() và bảng cầu nối"
      ]
    },
    "parts": [
      {
        "partNumber": 1,
        "romanNumeral": "I",
        "title": {
          "en": "Storage Engine Architecture & Dimensional Modeling",
          "vi": "Kiến Trúc Storage Engine & Mô Hình Hóa Dữ Liệu Chiều"
        },
        "description": {
          "en": "VertiPaq in-memory columnar compression, dictionary encoding, and Star Schema vs Snowflake vs Flat table tradeoffs.",
          "vi": "Cơ chế nén bộ nhớ cột VertiPaq, mã hóa từ điển và bài toán đánh đổi giữa Star Schema, Snowflake và bảng phẳng."
        }
      },
      {
        "partNumber": 2,
        "romanNumeral": "II",
        "title": {
          "en": "DAX Evaluation Mechanics & Context Transitions",
          "vi": "Cơ Chế Tính Toán DAX & Chuyển Đổi Ngữ Cảnh"
        },
        "description": {
          "en": "The dual context engine: Initial Filter Context, Row Context iterators, and CALCULATE context transition mechanics.",
          "vi": "Động cơ ngữ cảnh kép: Filter Context ban đầu, iterator trong Row Context và cơ chế chuyển đổi ngữ cảnh của CALCULATE."
        }
      },
      {
        "partNumber": 3,
        "romanNumeral": "III",
        "title": {
          "en": "Enterprise Security & Governance",
          "vi": "Bảo Mật Dữ Liệu & Quản Trị Doanh Nghiệp"
        },
        "description": {
          "en": "Static vs Dynamic Row-Level Security, security matrix tables, and unidirectional filter propagation guarantees.",
          "vi": "Bảo mật phân dòng tĩnh vs động, bảng ma trận phân quyền và các đảm bảo lan truyền bộ lọc đơn hướng."
        }
      }
    ],
    "chapters": [
      {
        "id": "pbi-hb-ch-1",
        "number": 1,
        "slug": "vertipaq-engine-and-star-schema",
        "title": {
          "en": "VertiPaq Columnar Storage & Star Schema Modeling",
          "vi": "Trình Lưu Trữ Cột VertiPaq & Mô Hình Star Schema"
        },
        "summary": {
          "en": "Columnar memory allocation, 3-tier compression algorithms (Value, Dictionary, RLE), Fact vs Dimension cardinality, and Star Schema optimization.",
          "vi": "Phân bổ bộ nhớ theo cột, 3 thuật toán nén (Value, Dictionary, RLE), độ biến thiên Fact vs Dimension và tối ưu hóa Star Schema."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 1
      },
      {
        "id": "pbi-hb-ch-2",
        "number": 2,
        "slug": "dax-evaluation-contexts",
        "title": {
          "en": "DAX Evaluation Contexts: Filter Context, Row Context & Context Transition",
          "vi": "Ngữ Cảnh Tính Toán DAX: Filter Context, Row Context & Context Transition"
        },
        "summary": {
          "en": "Initial Filter Context construction, Row Context iteration (SUMX, FILTER), context transition mechanics with CALCULATE, and filter propagation.",
          "vi": "Cấu trúc Filter Context ban đầu, lặp trong Row Context (SUMX, FILTER), cơ chế chuyển đổi ngữ cảnh bằng CALCULATE và lan truyền bộ lọc."
        },
        "readTimeMinutes": 16,
        "sectionsCount": 1
      },
      {
        "id": "pbi-hb-ch-3",
        "number": 3,
        "slug": "row-level-security-rls",
        "title": {
          "en": "Row-Level Security (RLS) Implementation & Security Filters",
          "vi": "Triển Khai Phân Quyền Row-Level Security (RLS) & Bộ Lọc Bảo Mật"
        },
        "summary": {
          "en": "Static vs Dynamic RLS architecture, USERPRINCIPALNAME() resolution, security matrix bridge tables, and unidirectional filter propagation guarantees.",
          "vi": "Kiến trúc RLS Tĩnh vs Động, giải mã danh tính USERPRINCIPALNAME(), bảng cầu nối ma trận bảo mật và các đảm bảo lan truyền bộ lọc đơn hướng."
        },
        "readTimeMinutes": 14,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "powerbi-definitions",
    "slug": "powerbi-definitions",
    "title": "Power BI & DAX Definitions Glossary",
    "subtitle": {
      "en": "Cardinality, Storage Modes, Context Transitions & DAX Object Model Terminology",
      "vi": "Thuật Ngữ Cardinality, Chế Độ Lưu Trữ, Chuyển Đổi Ngữ Cảnh & Mô Hình Đối Tượng DAX"
    },
    "bookType": "Definitions",
    "fieldId": "computer-science",
    "domainIds": [
      "data-analytics"
    ],
    "topicId": "powerbi",
    "categoryId": "powerbi",
    "subjectId": "analytics",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Foundational to Intermediate",
    "estimatedReadTime": "25 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-12",
    "accentColor": "from-amber-600 to-yellow-800",
    "tags": [
      "Definitions",
      "DAX",
      "Cardinality",
      "Glossary",
      "Power BI"
    ],
    "description": {
      "en": "Precision definitions and mental models for core Power BI and DAX concepts: Column Cardinality, Import vs DirectQuery vs Dual storage modes, Explicit Measures vs Calculated Columns, and Context Transition.",
      "vi": "Định nghĩa chuẩn xác và mô hình tư duy cho các khái niệm Power BI & DAX cốt lõi: Độ biến thiên Cardinality, chế độ lưu trữ Import vs DirectQuery vs Dual, phân biệt Measure vs Calculated Column và Context Transition."
    },
    "prerequisites": {
      "en": [
        "Basic familiarity with Power BI Desktop modeling and report creation"
      ],
      "vi": [
        "Làm quen cơ bản với việc dựng mô hình và tạo báo cáo trên Power BI Desktop"
      ]
    },
    "outcomes": {
      "en": [
        "Understand how column cardinality directly governs VertiPaq compression ratios and RAM allocation",
        "Distinguish between query-time in-memory measures and table-refresh calculated columns",
        "Diagnose and predict context transition behavior when calling measures inside iterators"
      ],
      "vi": [
        "Hiểu rõ cách cardinality của cột trực tiếp quyết định tỷ lệ nén VertiPaq và dung lượng RAM",
        "Phân biệt rõ bản chất giữa Measure tính động lúc query và Calculated Column lưu cứng khi refresh",
        "Chẩn đoán và dự đoán chính xác hành vi chuyển đổi ngữ cảnh khi gọi measure trong vòng lặp"
      ]
    },
    "chapters": [
      {
        "id": "pbi-def-ch-1",
        "number": 1,
        "slug": "cardinality-and-storage-terms",
        "title": {
          "en": "Column Cardinality & Storage Mode Terminology",
          "vi": "Thuật Ngữ Cardinality & Chế Độ Lưu Trữ Mô Hình"
        },
        "summary": {
          "en": "Formal definitions for Column Cardinality and VertiPaq storage modes (Import, DirectQuery, Dual Composite).",
          "vi": "Định nghĩa chuẩn cho Cardinality của cột và các chế độ lưu trữ VertiPaq (Import, DirectQuery, Dual Composite)."
        },
        "readTimeMinutes": 12,
        "sectionsCount": 2
      },
      {
        "id": "pbi-def-ch-2",
        "number": 2,
        "slug": "dax-measures-vs-calculated-columns",
        "title": {
          "en": "Measures, Calculated Columns & Evaluation Mechanics",
          "vi": "Thuật Ngữ Measure, Calculated Column & Cơ Chế Đánh Giá"
        },
        "summary": {
          "en": "Definitive distinctions between Explicit Measures and Calculated Columns, plus the formal mechanics of Context Transition.",
          "vi": "Phân biệt rạch ròi giữa Measure tường minh và Calculated Column, cùng cơ chế chuyển đổi ngữ cảnh Context Transition."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 2
      }
    ]
  },
  {
    "id": "powerbi-common-errors",
    "slug": "powerbi-common-errors",
    "title": "Power BI Common Errors & DAX Pitfalls",
    "subtitle": {
      "en": "Circular Dependency, Matrix Total Gotchas & Bi-Directional Filter Traps",
      "vi": "Lỗi Phụ Thuộc Vòng Circular Dependency, Sai Dòng Tổng Matrix & Cạm Bẫy Lọc Hai Chiều"
    },
    "bookType": "Common Errors",
    "fieldId": "computer-science",
    "domainIds": [
      "data-analytics"
    ],
    "topicId": "powerbi",
    "categoryId": "powerbi",
    "subjectId": "analytics",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Intermediate to Advanced",
    "estimatedReadTime": "30 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-01-22",
    "accentColor": "from-amber-600 to-rose-800",
    "tags": [
      "DAX Errors",
      "Bi-Directional",
      "Debugging",
      "Common Errors",
      "Power BI"
    ],
    "description": {
      "en": "Rigorous root-cause diagnostics and engineering fixes for high-impact Power BI errors: \"A circular dependency was detected\" in calculated columns, incorrect subtotal and total rows in Matrix visuals, and Cartesian explosion caused by bi-directional cross-filtering.",
      "vi": "Chẩn đoán nguyên nhân gốc rễ và giải pháp khắc phục triệt để các lỗi Power BI phổ biến: Lỗi \"A circular dependency was detected\" trong calculated column, sai lệch dòng tổng Subtotal/Total trong Matrix và bùng nổ quan hệ do lọc hai chiều."
    },
    "prerequisites": {
      "en": [
        "Experience authoring DAX measures and calculated columns in Power BI Desktop",
        "Understanding of relationships, cardinality, and matrix visual aggregation"
      ],
      "vi": [
        "Kinh nghiệm viết DAX measure và calculated column trong Power BI Desktop",
        "Hiểu biết về mối quan hệ giữa các bảng, cardinality và tính tổng trên bảng Matrix"
      ]
    },
    "outcomes": {
      "en": [
        "Resolve \"A circular dependency was detected\" by decoupling row context transition dependencies",
        "Fix incorrect Matrix total rows using SUMX() iteration and HASONEVALUE() branching",
        "Eliminate query slowdowns caused by global bi-directional relationships using localized CROSSFILTER() modifiers"
      ],
      "vi": [
        "Khắc phục lỗi \"A circular dependency was detected\" bằng cách gỡ bỏ ràng buộc chuyển đổi ngữ cảnh chéo",
        "Sửa lỗi tính sai dòng Total/Subtotal trong visual Matrix bằng kỹ thuật duyệt SUMX() và rẽ nhánh HASONEVALUE()",
        "Triệt tiêu tình trạng nghẽn hiệu năng do lọc hai chiều toàn cục bằng hàm DAX điều khiển cục bộ CROSSFILTER()"
      ]
    },
    "chapters": [
      {
        "id": "pce-pbi-ch-1",
        "number": 1,
        "slug": "circular-dependencies-and-totals",
        "title": {
          "en": "Circular Dependencies & Matrix Subtotal Gotchas",
          "vi": "Lỗi Phụ Thuộc Vòng & Cạm Bẫy Dòng Tổng Matrix"
        },
        "summary": {
          "en": "Root cause and resolution for calculated column circular dependency loops and non-additive Matrix subtotal calculations.",
          "vi": "Nguyên nhân gốc rễ và giải pháp cho lỗi phụ thuộc vòng lặp trong calculated column và sai lệch dòng tổng trong Matrix."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 2
      },
      {
        "id": "pce-pbi-ch-2",
        "number": 2,
        "slug": "bi-directional-filtering-pitfalls",
        "title": {
          "en": "Bi-Directional Cross-Filtering Performance Traps",
          "vi": "Cạm Bẫy Hiệu Năng Từ Lọc Hai Chiều (Bi-Directional)"
        },
        "summary": {
          "en": "Ambiguous relationship paths, Cartesian explosion, and replacing permanent Both cross-filters with localized DAX CROSSFILTER().",
          "vi": "Đường dẫn quan hệ mơ hồ, bùng nổ tích Descartes và cách thay thế lọc hai chiều cứng bằng hàm DAX CROSSFILTER() cục bộ."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "powerbi-best-practices",
    "slug": "powerbi-best-practices",
    "title": "Power BI Optimization & DAX Best Practices",
    "subtitle": {
      "en": "Centralized Measure Tables, Display Folders & DAX Studio Performance Tuning",
      "vi": "Bảng Measure Tập Trung, Display Folders & Tối Ưu Hiệu Năng Bằng DAX Studio"
    },
    "bookType": "Best Practices",
    "fieldId": "computer-science",
    "domainIds": [
      "data-analytics"
    ],
    "topicId": "powerbi",
    "categoryId": "powerbi",
    "subjectId": "analytics",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Intermediate to Advanced",
    "estimatedReadTime": "30 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-01",
    "accentColor": "from-amber-600 to-yellow-900",
    "tags": [
      "DAX Studio",
      "Optimization",
      "Best Practices",
      "Tabular Editor",
      "Power BI"
    ],
    "description": {
      "en": "Enterprise-grade engineering standards for Power BI models: structuring centralized measure tables with hierarchical Display Folders, and diagnosing Formula Engine (FE) vs Storage Engine (SE) bottlenecks using DAX Studio.",
      "vi": "Quy chuẩn kỹ thuật doanh nghiệp cho các mô hình Power BI: tổ chức bảng measure tập trung với cấu trúc Display Folder phân cấp, và phân tích nút thắt cổ chai Formula Engine (FE) vs Storage Engine (SE) bằng DAX Studio."
    },
    "prerequisites": {
      "en": [
        "Experience authoring complex multi-table Power BI models and DAX measures",
        "Basic familiarity with external development tools (DAX Studio, Tabular Editor)"
      ],
      "vi": [
        "Kinh nghiệm xây dựng mô hình Power BI nhiều bảng và viết các measure DAX phức tạp",
        "Làm quen cơ bản với các công cụ phát triển bên ngoài (DAX Studio, Tabular Editor)"
      ]
    },
    "outcomes": {
      "en": [
        "Establish clean, maintainable measure architectures using dedicated `_AllMeasures` containers and Display Folders",
        "Profile query execution plans in DAX Studio, maximizing Storage Engine (SE) multi-threaded scans while minimizing single-threaded Formula Engine (FE) overhead",
        "Implement defensive measure authoring patterns with VAR caches and safe division operators"
      ],
      "vi": [
        "Xây dựng kiến trúc quản lý measure chuyên nghiệp bằng bảng chứa `_AllMeasures` và Display Folder phân cấp",
        "Phân tích kế hoạch thực thi câu truy vấn trong DAX Studio, tối đa hóa quét đa luồng của Storage Engine (SE) và giảm tải cho Formula Engine (FE) đơn luồng",
        "Triển khai các mẫu viết measure phòng thủ với biến đệm VAR và hàm chia an toàn DIVIDE()"
      ]
    },
    "chapters": [
      {
        "id": "pbp-pbi-ch-1",
        "number": 1,
        "slug": "measure-organization-display-folders",
        "title": {
          "en": "Centralized Measure Architecture & Metadata Management",
          "vi": "Kiến Trúc Measure Tập Trung & Quản Lý Metadata"
        },
        "summary": {
          "en": "Dedicated measure tables (`_AllMeasures`), hierarchical Display Folders, and hiding underlying Fact columns to prevent accidental implicit measures.",
          "vi": "Bảng chứa measure chuyên biệt (`_AllMeasures`), thư mục Display Folder phân cấp và ẩn các cột Fact thô để ngăn tạo measure ngầm định."
        },
        "readTimeMinutes": 14,
        "sectionsCount": 1
      },
      {
        "id": "pbp-pbi-ch-2",
        "number": 2,
        "slug": "dax-studio-performance-tuning",
        "title": {
          "en": "Query Performance Tuning: Formula Engine vs Storage Engine",
          "vi": "Tối Ưu Hiệu Năng Truy Vấn: Formula Engine vs Storage Engine"
        },
        "summary": {
          "en": "Benchmarking visual queries in DAX Studio, profiling SE vs FE CPU time, and refactoring iterative bottlenecks.",
          "vi": "Đo lường truy vấn visual trong DAX Studio, phân tích thời gian CPU của SE vs FE và tối ưu các nút thắt hàm lặp."
        },
        "readTimeMinutes": 16,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "building-an-executive-power-bi-report",
    "slug": "building-an-executive-power-bi-report",
    "title": "Building an Executive Power BI Report",
    "subtitle": {
      "en": "End-to-End Guide to Star Schema, DAX KPIs, Executive Layouts & Validation",
      "vi": "Hướng Dẫn Dựng Báo Cáo Quản Trị Từ Mô Hình Star Schema, DAX KPI Đến Layout UX"
    },
    "bookType": "Practical Guides",
    "fieldId": "computer-science",
    "domainIds": [
      "data-analytics"
    ],
    "topicId": "powerbi",
    "categoryId": "powerbi",
    "subjectId": "analytics",
    "author": "4TM Technical Board",
    "role": "Business Intelligence & Enterprise Analytics Architecture Group",
    "level": "Intermediate",
    "estimatedReadTime": "40 mins",
    "chaptersCount": 4,
    "publishedDate": "2025-02-18",
    "accentColor": "from-amber-500 to-yellow-800",
    "tags": [
      "Power BI",
      "Executive Report",
      "Star Schema",
      "DAX KPIs",
      "Practical Guide",
      "Data Modeling",
      "VertiPaq"
    ],
    "description": {
      "en": "A focused, step-by-step practical guide to constructing professional executive Power BI reports: Power Query data transformation, Star Schema modeling, core KPI measure design, executive UX layout, and number reconciliation.",
      "vi": "Hướng dẫn thực hành từng bước dựng báo cáo Power BI cho cấp quản trị: biến đổi dữ liệu Power Query, mô hình Star Schema, thiết kế chỉ số DAX KPI, bố cục UX báo cáo và đối soát số liệu."
    },
    "prerequisites": {
      "en": [
        "Basic understanding of Power BI Desktop interface and relational data concepts",
        "Familiarity with common business metrics (Revenue, Margin, YoY Growth)"
      ],
      "vi": [
        "Hiểu biết cơ bản về giao diện Power BI Desktop và các khái niệm dữ liệu quan hệ",
        "Quen thuộc với các chỉ số kinh doanh phổ biến (Doanh thu, Lợi nhuận, Tăng trưởng cùng kỳ)"
      ]
    },
    "outcomes": {
      "en": [
        "Transform raw transactional spreadsheets into a clean Star Schema in Power Query",
        "Design reusable DAX KPI measures for executive decision-making using CALCULATE and DIVIDE",
        "Apply high-density executive UX layouts with accessible visual hierarchy and 8px grid alignment",
        "Reconcile DAX measure totals against ERP control queries and optimize performance under 1000ms"
      ],
      "vi": [
        "Chuyển đổi bảng dữ liệu giao dịch thô thành mô hình Star Schema chuẩn chỉnh trong Power Query",
        "Thiết kế các chỉ số DAX KPI tái sử dụng cho cấp điều hành bằng CALCULATE và DIVIDE",
        "Áp dụng bố cục UX báo cáo quản trị mật độ cao theo lưới 8px và phân cấp thị giác rõ ràng",
        "Đối soát số liệu DAX với truy vấn kiểm soát ERP và tối ưu thời gian phản hồi dưới 1000ms"
      ]
    },
    "chapters": [
      {
        "id": "pbi-exec-ch-1",
        "number": 1,
        "slug": "data-preparation-and-model-design",
        "title": {
          "en": "Data Preparation & Model Design",
          "vi": "Chuẩn Bị Dữ Liệu & Thiết Kế Mô Hình"
        },
        "summary": {
          "en": "Importing raw transactional data, Power Query transformations, separating Fact vs Dimension tables, Star Schema architecture, and relationship configuration.",
          "vi": "Nạp dữ liệu thô, biến đổi trong Power Query, phân tách bảng Fact vs Dimension, kiến trúc Star Schema và cấu hình mối quan hệ."
        },
        "readTimeMinutes": 10,
        "sectionsCount": 1
      },
      {
        "id": "pbi-exec-ch-2",
        "number": 2,
        "slug": "dax-measures-and-kpi-design",
        "title": {
          "en": "DAX Measures & KPI Design",
          "vi": "Thiết Kế Chỉ Số DAX Measures & KPI"
        },
        "summary": {
          "en": "Measures vs calculated columns, dedicated measure table setup, core KPI measures with CALCULATE, time-based comparisons, and zero-error DIVIDE mechanics.",
          "vi": "Phân biệt Measure vs Calculated Column, tạo bảng chứa measure, viết KPI cốt lõi với CALCULATE, so sánh chuỗi thời gian và dùng hàm DIVIDE an toàn."
        },
        "readTimeMinutes": 10,
        "sectionsCount": 1
      },
      {
        "id": "pbi-exec-ch-3",
        "number": 3,
        "slug": "report-design-and-executive-ux",
        "title": {
          "en": "Report Design & Executive UX",
          "vi": "Thiết Kế Báo Cáo & Trải Nghiệm UX Quản Trị"
        },
        "summary": {
          "en": "Canvas layout structure, 5-second cognitive rule, KPI card positioning, chart selection for executive scan paths, reducing visual noise, and accessible design.",
          "vi": "Cấu trúc bố cục trang, quy tắc 5 giây nhận diện thông tin, vị trí thẻ KPI, lựa chọn biểu đồ theo thói quen đọc, giảm nhiễu thị giác và chuẩn tiếp cận."
        },
        "readTimeMinutes": 10,
        "sectionsCount": 1
      },
      {
        "id": "pbi-exec-ch-4",
        "number": 4,
        "slug": "validation-performance-and-publishing",
        "title": {
          "en": "Validation, Performance & Publishing",
          "vi": "Kiểm Thử Số Liệu, Hiệu Năng & Xuất Bản Báo Cáo"
        },
        "summary": {
          "en": "Reconciling DAX totals with source ERP ledgers, measuring visual speed with Performance Analyzer, VertiPaq tuning, Row-Level Security (RLS), and deployment.",
          "vi": "Đối soát số liệu DAX với sổ cái ERP, đo tốc độ visual bằng Performance Analyzer, tối ưu VertiPaq, phân quyền RLS và triển khai lên Power BI Service."
        },
        "readTimeMinutes": 10,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "power-bi-and-dax-patterns-recipes",
    "slug": "power-bi-and-dax-patterns-recipes",
    "title": "Power BI & DAX Patterns: Production Recipes",
    "subtitle": {
      "en": "Time Intelligence, Filter Context Overrides, Dynamic Ranking & Status Icons",
      "vi": "Time Intelligence, Ghi Đè Filter Context, Xếp Hạng Động & Icon Trạng Thái"
    },
    "bookType": "Patterns / Recipes",
    "fieldId": "computer-science",
    "domainIds": [
      "data-analytics"
    ],
    "topicId": "powerbi",
    "categoryId": "powerbi",
    "subjectId": "analytics",
    "author": "4TM Technical Board",
    "role": "Data Modeling & Analytical Engineering Group",
    "level": "Intermediate to Advanced",
    "estimatedReadTime": "35 mins",
    "chaptersCount": 4,
    "publishedDate": "2025-02-14",
    "accentColor": "from-yellow-600 to-amber-800",
    "tags": [
      "Power BI",
      "DAX Patterns",
      "Recipes",
      "Time Intelligence",
      "REMOVEFILTERS",
      "RANKX",
      "KPI Formatting"
    ],
    "description": {
      "en": "A curated collection of production-ready DAX calculation patterns and analytical recipes: resilient Time Intelligence, percentage-of-total calculations with REMOVEFILTERS, dynamic ranking with RANKX, and automated KPI status formatting.",
      "vi": "Tập hợp các mẫu công thức DAX chuẩn sản xuất và công thức phân tích thực tiễn: Time Intelligence bền bỉ, tính tỷ trọng tổng số bằng REMOVEFILTERS, xếp hạng động với RANKX và định dạng icon KPI tự động."
    },
    "prerequisites": {
      "en": [
        "Understanding of Star Schema concepts and Power BI relationships",
        "Familiarity with DAX syntax, evaluation context (row vs filter context), and basic CALCULATE usage"
      ],
      "vi": [
        "Hiểu biết về mô hình Star Schema và quan hệ trong Power BI",
        "Quen thuộc với cú pháp DAX, ngữ cảnh tính toán (row context vs filter context) và hàm CALCULATE cơ bản"
      ]
    },
    "outcomes": {
      "en": [
        "Implement robust YTD, YoY growth, and Rolling 12-Month calculations using native Time Intelligence",
        "Master filter context removal with REMOVEFILTERS() to calculate clean percentage-of-total metrics",
        "Author tie-safe dynamic ranking leaderboards with RANKX() and ALLSELECTED()",
        "Generate dynamic Unicode KPI badges and data-driven hex color codes directly in DAX"
      ],
      "vi": [
        "Triển khai công thức YTD, tăng trưởng cùng kỳ và 12 tháng trượt bằng Time Intelligence chuẩn",
        "Làm chủ kỹ thuật xóa ngữ cảnh lọc với REMOVEFILTERS() để tính tỷ trọng phần trăm chính xác",
        "Viết công thức xếp hạng động an toàn với RANKX() và ALLSELECTED() không lỗi dòng tổng",
        "Tạo nhãn trạng thái Unicode động và mã màu hex trực tiếp từ DAX cho định dạng có điều kiện"
      ]
    },
    "chapters": [
      {
        "id": "pbi-pat-ch-1",
        "number": 1,
        "slug": "time-intelligence-patterns",
        "title": {
          "en": "Time Intelligence Patterns",
          "vi": "Mẫu Công Thức Time Intelligence"
        },
        "summary": {
          "en": "Reusable YTD, YoY comparisons, and rolling 12-month period calculations using CALCULATE and standard Date tables.",
          "vi": "Các mẫu tính lũy kế năm (YTD), so sánh cùng kỳ (YoY) và kỳ trượt 12 tháng bằng CALCULATE và bảng Date chuẩn."
        },
        "readTimeMinutes": 9,
        "sectionsCount": 1
      },
      {
        "id": "pbi-pat-ch-2",
        "number": 2,
        "slug": "filter-and-context-patterns",
        "title": {
          "en": "Filter & Context Modification Patterns",
          "vi": "Mẫu Can Thiệp Filter & Ngữ Cảnh"
        },
        "summary": {
          "en": "Percentage of total and subtotal contribution patterns using REMOVEFILTERS and ALLEXCEPT.",
          "vi": "Các mẫu tính tỷ trọng đóng góp phần trăm trên tổng số và tổng nhóm bằng REMOVEFILTERS và ALLEXCEPT."
        },
        "readTimeMinutes": 9,
        "sectionsCount": 1
      },
      {
        "id": "pbi-pat-ch-3",
        "number": 3,
        "slug": "ranking-and-comparison-patterns",
        "title": {
          "en": "Ranking & Comparison Patterns",
          "vi": "Mẫu Xếp Hạng & So Sánh Phân Vị"
        },
        "summary": {
          "en": "Dynamic ranking of products and customers using RANKX, ALLSELECTED, and handling ties cleanly.",
          "vi": "Xếp hạng động sản phẩm và khách hàng bằng RANKX, ALLSELECTED và xử lý đồng hạng sạch sẽ."
        },
        "readTimeMinutes": 9,
        "sectionsCount": 1
      },
      {
        "id": "pbi-pat-ch-4",
        "number": 4,
        "slug": "kpi-and-conditional-patterns",
        "title": {
          "en": "KPI & Conditional Formatting Patterns",
          "vi": "Mẫu Định Dạng Có Điều Kiện & Chỉ Số KPI"
        },
        "summary": {
          "en": "Target variance calculations, dynamic SVG/Unicode status indicators, and hex-code formatting measures.",
          "vi": "Tính chênh lệch mục tiêu, biểu tượng trạng thái Unicode động và measure sinh mã màu hex cho định dạng giao diện."
        },
        "readTimeMinutes": 8,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "ai-fundamentals-handbook",
    "slug": "ai-fundamentals-handbook",
    "title": "AI & Large Language Model Architecture Handbook",
    "subtitle": {
      "en": "Transformers, Embeddings, Attention, Tokenization & Inference Mechanics",
      "vi": "Kiến Trúc Transformer, Embedding, Attention, Token Hóa & Cơ Chế Suy Luận LLM"
    },
    "bookType": "Handbook",
    "fieldId": "computer-science",
    "domainIds": [
      "ai"
    ],
    "topicId": "ai",
    "categoryId": "ai",
    "subjectId": "ai",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Foundational to Intermediate",
    "estimatedReadTime": "40 mins",
    "chaptersCount": 3,
    "publishedDate": "2025-02-15",
    "accentColor": "from-violet-600 to-indigo-900",
    "tags": [
      "AI Fundamentals",
      "Transformers",
      "Attention",
      "LLMs",
      "Tokenization"
    ],
    "description": {
      "en": "A foundational handbook on AI and Large Language Model architectures: byte-pair tokenization, high-dimensional vector embeddings, Scaled Dot-Product Attention, Transformer decoders, and KV-Cache inference optimization.",
      "vi": "Cẩm nang toàn diện về kiến trúc AI và mô hình ngôn ngữ lớn (LLM): thuật toán tách từ Byte-Pair Encoding, không gian vectơ nhúng ngữ nghĩa, cơ chế Scaled Dot-Product Attention, giải mã Transformer và tối ưu bộ nhớ đệm KV-Cache trong suy luận."
    },
    "prerequisites": {
      "en": [
        "Basic Python programming",
        "Introductory linear algebra (vectors, matrices, dot products)"
      ],
      "vi": [
        "Lập trình Python cơ bản",
        "Đại số tuyến tính căn bản (vectơ, ma trận, tích vô hướng)"
      ]
    },
    "outcomes": {
      "en": [
        "Master tokenization mechanics (BPE) and vector embedding space geometries",
        "Understand Scaled Dot-Product Attention math and PyTorch causal masking",
        "Calculate KV-Cache memory consumption for high-concurrency LLM deployments"
      ],
      "vi": [
        "Làm chủ cơ chế tách từ BPE và cấu trúc hình học của không gian vector nhúng",
        "Thấu hiểu công thức Scaled Dot-Product Attention và mặt nạ causal trong PyTorch",
        "Tính toán chính xác dung lượng bộ nhớ KV-Cache khi phục vụ LLM tải cao"
      ]
    },
    "chapters": [
      {
        "id": "ai-fb-ch-1",
        "number": 1,
        "slug": "foundations-tokens-embeddings",
        "title": {
          "en": "Foundations: Tokens, Tokenization & Vector Embeddings",
          "vi": "Nền Tảng: Token, Thuật Toán Tách Từ & Không Gian Vector Nhúng"
        },
        "summary": {
          "en": "From raw text to token IDs via Byte-Pair Encoding (BPE), and mapping discrete tokens into continuous semantic vector spaces.",
          "vi": "Từ văn bản thô sang ID token bằng thuật toán BPE và ánh xạ token rời rạc vào không gian vector ngữ nghĩa liên tục."
        },
        "readTimeMinutes": 14,
        "sectionsCount": 1
      },
      {
        "id": "ai-fb-ch-2",
        "number": 2,
        "slug": "attention-and-transformers",
        "title": {
          "en": "Attention Mechanisms & Transformer Architecture",
          "vi": "Cơ Chế Attention & Kiến Trúc Mạng Transformer"
        },
        "summary": {
          "en": "Query, Key, Value mechanics, Scaled Dot-Product math, Multi-Head Attention, and causal masking.",
          "vi": "Bản chất ma trận Query, Key, Value, công thức Scaled Dot-Product và Multi-Head Attention."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 1
      },
      {
        "id": "ai-fb-ch-3",
        "number": 3,
        "slug": "decoder-only-llms-inference",
        "title": {
          "en": "Decoder-Only LLM Inference & Autoregressive Generation",
          "vi": "Sự Khác Biệt Của LLM Decoder-Only & Quá Trình Sinh Tự Điều Hồi"
        },
        "summary": {
          "en": "Causal masking, KV-Cache optimization, Temperature, Top-P (Nucleus), and Top-K sampling.",
          "vi": "Mặt nạ Causal Masking, tối ưu KV-Cache, các tham số Temperature, Top-P và Top-K."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "ai-definitions",
    "slug": "ai-definitions",
    "title": "AI Terminology & LLM Glossary",
    "subtitle": {
      "en": "AI Glossary, Inference Parameters & Architectural Concepts",
      "vi": "Từ Điển Khái Niệm AI, Tham Số Sinh Token & Thuật Ngữ Mô Hình"
    },
    "bookType": "Definitions",
    "fieldId": "computer-science",
    "domainIds": [
      "ai"
    ],
    "topicId": "ai",
    "categoryId": "ai",
    "subjectId": "ai",
    "author": "4TM Technical Board",
    "role": "Core Engineering Group",
    "level": "Foundational",
    "estimatedReadTime": "25 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-12",
    "accentColor": "from-purple-600 to-indigo-800",
    "tags": [
      "Definitions",
      "Glossary",
      "LLM Terms",
      "AI Core"
    ],
    "description": {
      "en": "Clear reference definitions for key AI and LLM terms: Temperature, Top-P, Hallucination, Context Window, System Prompt, RAG, and Vector DB.",
      "vi": "Từ điển định nghĩa các thuật ngữ AI & LLM: Temperature, Top-P, Bệnh ảo giác (Hallucination), Cửa sổ ngữ cảnh, System Prompt, RAG và Cơ sở dữ liệu Vector."
    },
    "prerequisites": {
      "en": [
        "Basic understanding of AI concepts"
      ],
      "vi": [
        "Hiểu biết cơ bản về các khái niệm AI"
      ]
    },
    "outcomes": {
      "en": [
        "Define essential LLM sampling parameters accurately",
        "Understand hallucination taxonomies and grounding architectures"
      ],
      "vi": [
        "Phân biệt và định nghĩa chính xác các tham số lấy mẫu LLM",
        "Hiểu rõ phân loại ảo giác và kiến trúc đối chiếu dữ liệu grounding"
      ]
    },
    "chapters": [
      {
        "id": "ai-def-ch-1",
        "number": 1,
        "slug": "sampling-parameter-definitions",
        "title": {
          "en": "Inference Sampling Parameters (Temperature, Top-P, Top-K)",
          "vi": "Định Nghĩa Các Tham Số Lấy Mẫu (Temperature, Top-P, Top-K)"
        },
        "summary": {
          "en": "Temperature logit scaling, Top-P cumulative probability cutoff, and Top-K token limiting.",
          "vi": "Biến đổi logit với Temperature, ngắt xác xuất tích lũy Top-P và giới hạn Top-K token."
        },
        "readTimeMinutes": 12,
        "sectionsCount": 1
      },
      {
        "id": "ai-def-ch-2",
        "number": 2,
        "slug": "hallucination-context-window-definitions",
        "title": {
          "en": "Hallucination, Grounding & Context Window Definitions",
          "vi": "Định Nghĩa Hallucination, Grounding & Cửa Sổ Ngữ Cảnh"
        },
        "summary": {
          "en": "Mechanisms behind LLM hallucinations and grounding techniques with search tools.",
          "vi": "Cơ chế gây ra hiện tượng ảo giác (hallucination) và kỹ thuật đối chiếu grounding."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "prompt-engineering-guide",
    "slug": "prompt-engineering-guide",
    "title": "Prompt Engineering & System Directives Guide",
    "subtitle": {
      "en": "From Production System Prompts to Schema-Guaranteed JSON Workflows",
      "vi": "Từ System Prompt Sản Xuất Đến Luồng Xử Lý JSON Cam Kết Chuẩn Schema"
    },
    "bookType": "Practical Guides",
    "fieldId": "computer-science",
    "domainIds": [
      "ai"
    ],
    "topicId": "ai",
    "categoryId": "ai",
    "subjectId": "ai",
    "author": "4TM Editorial Board",
    "role": "AI Systems & LLM Orchestration Group",
    "level": "Intermediate to Advanced",
    "estimatedReadTime": "30 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-20",
    "accentColor": "from-emerald-600 to-teal-800",
    "tags": [
      "Practical Guides",
      "AI",
      "Prompt Engineering",
      "LLMs",
      "JSON Schema",
      "Structured Outputs",
      "Guardrails"
    ],
    "description": {
      "en": "Hands-on practical engineering guides for designing robust, production-grade LLM system prompts, calibrating few-shot edge case steering, enforcing grammar-constrained JSON schemas, and implementing automated validation retry guardrails.",
      "vi": "Hướng dẫn thực hành chuyên sâu để thiết kế system prompt cấp doanh nghiệp, hiệu chỉnh bộ mẫu few-shot xử lý trường hợp biên, ràng buộc đầu ra JSON bằng ngữ pháp và xây dựng cơ chế tự động sửa lỗi qua retry."
    },
    "prerequisites": {
      "en": [
        "Basic familiarity with LLM concepts (prompts, tokens, temperature, system/user roles)",
        "Working knowledge of JSON and TypeScript/Python interfaces"
      ],
      "vi": [
        "Hiểu biết cơ bản về mô hình ngôn ngữ lớn (prompt, token, temperature, các vai trò system/user)",
        "Kinh nghiệm làm việc với định dạng JSON và interface trong TypeScript hoặc Python"
      ]
    },
    "outcomes": {
      "en": [
        "Architect injection-resistant system prompts using XML delimiters, explicit personas, and bounded refusal instructions",
        "Select and format high-signal few-shot exemplars that eliminate edge-case format drift",
        "Guarantee 100% syntactically valid JSON output using structured outputs and automated self-healing validation pipelines"
      ],
      "vi": [
        "Thiết kế system prompt chống prompt injection bằng thẻ phân cách XML, định hình persona chặt chẽ và chỉ thị từ chối rõ ràng",
        "Lựa chọn và chuẩn hóa các ví dụ few-shot chất lượng cao để loại bỏ hoàn toàn hiện tượng lệch định dạng",
        "Cam kết đầu ra JSON chuẩn cú pháp 100% bằng Structured Outputs và luồng tự động sửa lỗi (self-healing validation pipeline)"
      ]
    },
    "chapters": [
      {
        "id": "peg-ch-1",
        "number": 1,
        "slug": "production-system-prompts-few-shot",
        "title": {
          "en": "Production System Prompts & Few-Shot Directives",
          "vi": "System Prompt Sản Xuất & Chỉ Thị Few-Shot Chuẩn Mực"
        },
        "summary": {
          "en": "Step-by-step workflow for architecting injection-resistant system prompts and curating balanced few-shot exemplars.",
          "vi": "Quy trình từng bước để xây dựng system prompt chống injection và chọn lọc bộ mẫu few-shot cân bằng."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 2
      },
      {
        "id": "peg-ch-2",
        "number": 2,
        "slug": "constrained-output-json-schemas",
        "title": {
          "en": "Constrained Output & Schema-Guaranteed JSON",
          "vi": "Đầu Ra Bị Ràng Buộc & JSON Đảm Bảo Chuẩn Schema"
        },
        "summary": {
          "en": "Production patterns for grammar-constrained decoding, strict JSON schemas, and automated self-healing validation pipelines.",
          "vi": "Các mẫu sản xuất cho giải mã ràng buộc ngữ pháp, JSON Schema nghiêm ngặt và luồng tự động sửa lỗi qua retry."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 2
      }
    ]
  },
  {
    "id": "rag-architecture-handbook",
    "slug": "rag-architecture-handbook",
    "title": "RAG Architecture Handbook",
    "subtitle": {
      "en": "Chunking Strategies, HNSW Vector Indices, Rerankers & Production Grounding",
      "vi": "Chiến Lược Chunking, Chỉ Mục Vector HNSW, Reranker & Kỹ Thuật Grounding Sản Xuất"
    },
    "bookType": "Handbook",
    "fieldId": "computer-science",
    "domainIds": [
      "ai"
    ],
    "topicId": "ai",
    "categoryId": "ai",
    "subjectId": "ai",
    "author": "4TM Technical Board",
    "role": "AI Systems & Retrieval Engineering Group",
    "level": "Comprehensive",
    "estimatedReadTime": "45 mins",
    "chaptersCount": 3,
    "edition": "First Edition (2025)",
    "publishedDate": "2025-02-15",
    "accentColor": "from-blue-700 to-indigo-900",
    "tags": [
      "RAG",
      "Vector Search",
      "HNSW",
      "Chunking",
      "Reranking",
      "Handbook",
      "Embeddings",
      "Information Retrieval"
    ],
    "description": {
      "en": "A comprehensive engineering reference on Retrieval-Augmented Generation (RAG) system architecture: document decomposition and sliding window chunking, HNSW vector graph mechanics, and context assembly mitigation for the \"Lost in the Middle\" phenomenon.",
      "vi": "Cẩm nang kỹ thuật toàn diện về kiến trúc hệ thống RAG (Retrieval-Augmented Generation): phân tích tài liệu và chunking cửa sổ trượt, cơ chế đồ thị vector HNSW và tái sắp xếp ngữ cảnh chống hiện tượng \"Lost in the Middle\"."
    },
    "prerequisites": {
      "en": [
        "Understanding of vector embeddings, high-dimensional cosine similarity, and LLM context windows",
        "Familiarity with Python, NumPy, and standard client-server AI architectures"
      ],
      "vi": [
        "Hiểu biết về vector embedding, độ tương đồng Cosine trong không gian nhiều chiều và cửa sổ ngữ cảnh LLM",
        "Quen thuộc với Python, NumPy và kiến trúc client-server ứng dụng AI cơ bản"
      ]
    },
    "outcomes": {
      "en": [
        "Master document chunking with character, token, and semantic window overlap mechanics",
        "Understand Hierarchical Navigable Small World (HNSW) graph indexing and hyperparameter tuning (M, efConstruction, efSearch)",
        "Mitigate the U-shaped attention distribution (\"Lost in the Middle\") via cross-encoder reranking and boundary placement",
        "Design reliable production RAG retrieval pipelines that balance latency, recall, and token budget"
      ],
      "vi": [
        "Làm chủ kỹ thuật chia nhỏ tài liệu theo ký tự, token và cửa sổ trượt gối đầu ngữ nghĩa",
        "Nắm vững cơ chế đánh chỉ mục đồ thị HNSW và tinh chỉnh siêu tham số (M, efConstruction, efSearch)",
        "Khắc phục hiện tượng phân bổ chú ý hình chữ U (\"Lost in the Middle\") bằng Cross-Encoder reranker",
        "Xây dựng pipeline RAG chuẩn sản xuất cân bằng tối ưu giữa độ trễ, độ hồi tưởng (recall) và chi phí token"
      ]
    },
    "parts": [
      {
        "partNumber": 1,
        "romanNumeral": "I",
        "title": {
          "en": "Part I: Ingestion, Chunking & Pre-processing",
          "vi": "Phần I: Thu Nạp, Chunking & Tiền Xử Lý Tài Liệu"
        },
        "description": {
          "en": "Document decomposition, token boundaries, and sliding window chunking algorithms.",
          "vi": "Phân tách tài liệu, ranh giới token và thuật toán chunking cửa sổ trượt."
        }
      },
      {
        "partNumber": 2,
        "romanNumeral": "II",
        "title": {
          "en": "Part II: Vector Indices & Approximate Nearest Neighbor Search",
          "vi": "Phần II: Chỉ Mục Vector & Tìm Kiếm Lân Cận Gần Nhất"
        },
        "description": {
          "en": "Multi-layer graph architectures, distance metrics, and HNSW hyperparameter trade-offs.",
          "vi": "Kiến trúc đồ thị đa tầng, thước đo khoảng cách và đánh đổi siêu tham số trong HNSW."
        }
      },
      {
        "partNumber": 3,
        "romanNumeral": "III",
        "title": {
          "en": "Part III: Context Assembly, Reranking & Synthesizer Grounding",
          "vi": "Phần III: Ráp Ngữ Cảnh, Reranking & Grounding Cho Mô Hình"
        },
        "description": {
          "en": "Cross-encoder scoring, prompt boundary positioning, and mitigating semantic decay.",
          "vi": "Chấm điểm bằng cross-encoder, định vị ranh giới prompt và giảm thiểu suy hao ngữ nghĩa."
        }
      }
    ],
    "chapters": [
      {
        "id": "rag-hb-ch-1",
        "number": 1,
        "partNumber": 1,
        "partTitle": {
          "en": "Part I: Ingestion, Chunking & Pre-processing",
          "vi": "Phần I: Thu Nạp, Chunking & Tiền Xử Lý Tài Liệu"
        },
        "slug": "chunking-strategies-and-parsers",
        "title": {
          "en": "Document Parsing & Semantic Chunking Strategies",
          "vi": "Phân Tích Tài Liệu & Chiến Lược Chunking Ngữ Nghĩa"
        },
        "summary": {
          "en": "Fixed-size vs sliding-window chunking, token vs character splitting, and boundary preservation algorithms.",
          "vi": "Chunking kích thước cố định vs cửa sổ trượt, cắt theo token vs ký tự và thuật toán bảo toàn ranh giới câu."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 1
      },
      {
        "id": "rag-hb-ch-2",
        "number": 2,
        "partNumber": 2,
        "partTitle": {
          "en": "Part II: Vector Indices & Approximate Nearest Neighbor Search",
          "vi": "Phần II: Chỉ Mục Vector & Tìm Kiếm Lân Cận Gần Nhất"
        },
        "slug": "vector-indexes-and-search",
        "title": {
          "en": "Vector Indexes (HNSW, IVFFlat) & Similarity Metrics",
          "vi": "Chỉ Mục Vector (HNSW, IVFFlat) & Các Thước Đo Khoảng Cách"
        },
        "summary": {
          "en": "Hierarchical Navigable Small World (HNSW) graph mechanics, M and efConstruction hyperparameter tuning, and Cosine vs Dot Product vs Euclidean distance.",
          "vi": "Cơ chế đồ thị HNSW đa tầng, tinh chỉnh siêu tham số M và efConstruction, so sánh khoảng cách Cosine vs Dot Product vs Euclidean."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 1
      },
      {
        "id": "rag-hb-ch-3",
        "number": 3,
        "partNumber": 3,
        "partTitle": {
          "en": "Part III: Context Assembly, Reranking & Synthesizer Grounding",
          "vi": "Phần III: Ráp Ngữ Cảnh, Reranking & Grounding Cho Mô Hình"
        },
        "slug": "context-assembly-and-reranking",
        "title": {
          "en": "Context Assembly, Reranking & Prompt Injection",
          "vi": "Ráp Ngữ Cảnh, Reranking & Định Vị Thông Tin Trong Prompt"
        },
        "summary": {
          "en": "The \"Lost in the Middle\" cognitive phenomenon in transformer attention heads, Cross-Encoder reranking mechanics, and context reordering algorithms.",
          "vi": "Hiện tượng \"Lost in the Middle\" trong cơ chế chú ý của Transformer, hoạt động của Cross-Encoder reranker và thuật toán tái sắp xếp ngữ cảnh."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "rag-patterns-recipes",
    "slug": "rag-patterns-recipes",
    "title": "RAG Retrieval Patterns & Recipes",
    "subtitle": {
      "en": "Hybrid Search, Reciprocal Rank Fusion, HyDE & Parent-Child Chunking",
      "vi": "Tìm Kiếm Lai Hybrid, Hợp Nhất Thứ Hạng RRF, HyDE & Chunking Cha-Con"
    },
    "bookType": "Patterns / Recipes",
    "fieldId": "computer-science",
    "domainIds": [
      "ai"
    ],
    "topicId": "ai",
    "categoryId": "ai",
    "subjectId": "ai",
    "author": "4TM Technical Board",
    "role": "Information Retrieval & AI Systems Engineering Group",
    "level": "Intermediate to Advanced",
    "estimatedReadTime": "30 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-17",
    "accentColor": "from-cyan-600 to-blue-800",
    "tags": [
      "RAG Patterns",
      "Hybrid Search",
      "RRF",
      "HyDE",
      "Parent-Child",
      "Recipes",
      "BM25"
    ],
    "description": {
      "en": "Production-tested architectural recipes for advanced RAG retrieval: combining dense semantic vectors with sparse BM25 keyword search via Reciprocal Rank Fusion (RRF), and implementing Hypothetical Document Embeddings (HyDE) with Parent-Child chunk hierarchies.",
      "vi": "Các công thức kiến trúc thực chiến cho hệ thống RAG nâng cao: kết hợp vector ngữ nghĩa với tìm kiếm từ khóa BM25 qua thuật toán RRF, và triển khai HyDE cùng phân cấp chunking Cha-Con."
    },
    "prerequisites": {
      "en": [
        "Understanding of standard dense vector embeddings and similarity search",
        "Familiarity with sparse lexical search (BM25) and basic RAG pipelines"
      ],
      "vi": [
        "Hiểu biết về vector embedding ngữ nghĩa và tìm kiếm tương đồng",
        "Quen thuộc với tìm kiếm từ khóa thưa (BM25) và pipeline RAG cơ bản"
      ]
    },
    "outcomes": {
      "en": [
        "Implement robust Hybrid Search combining BM25 keyword matching and Dense Vectors using Reciprocal Rank Fusion (RRF)",
        "Overcome the vocabulary mismatch problem with Hypothetical Document Embeddings (HyDE)",
        "Decouple search precision from synthesis context using Parent-Child chunk retrievers",
        "Optimize retrieval latency and recall trade-offs across enterprise knowledge bases"
      ],
      "vi": [
        "Triển khai tìm kiếm lai Hybrid kết hợp từ khóa BM25 và Dense Vector bằng thuật toán RRF",
        "Khắc phục triệt để hiện tượng lệch từ vựng bằng Hypothetical Document Embeddings (HyDE)",
        "Tách rời độ chính xác tìm kiếm khỏi ngữ cảnh tổng hợp bằng mô hình chunking Cha-Con",
        "Tối ưu hóa sự đánh đổi giữa độ trễ và độ hồi tưởng trên kho tri thức doanh nghiệp"
      ]
    },
    "chapters": [
      {
        "id": "rpr-ch-1",
        "number": 1,
        "slug": "hybrid-search-rrf-recipe",
        "title": {
          "en": "Hybrid Search with Reciprocal Rank Fusion (RRF)",
          "vi": "Tìm Kiếm Lai Hybrid Với Hợp Nhất Thứ Hạng RRF"
        },
        "summary": {
          "en": "Combining dense semantic vectors and sparse BM25 keyword search to eliminate exact-code misses without score calibration distortion.",
          "vi": "Kết hợp vector ngữ nghĩa và tìm kiếm từ khóa BM25 để không bị trượt mã kỹ thuật mà không làm méo thang điểm."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 1
      },
      {
        "id": "rpr-ch-2",
        "number": 2,
        "slug": "hyde-and-parent-child-retriever",
        "title": {
          "en": "HyDE (Hypothetical Document Embeddings) & Parent-Child Chunking",
          "vi": "HyDE (Hypothetical Document Embeddings) & Chunking Cha-Con"
        },
        "summary": {
          "en": "Hypothetical Document Embeddings (HyDE) for query expansion and decoupling vector search chunks from LLM synthesis context.",
          "vi": "Hypothetical Document Embeddings (HyDE) để mở rộng query và tách rời kích thước chunk tìm kiếm khỏi ngữ cảnh sinh văn bản."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "ai-agent-patterns",
    "slug": "ai-agent-patterns",
    "title": "Autonomous AI Agent Architecture",
    "subtitle": {
      "en": "ReAct Framework, Tool Use, Planning & Multi-Agent Orchestration",
      "vi": "Khung ReAct, Tự Động Dùng Tool, Lập Kế Hoạch & Điều Phối Multi-Agent"
    },
    "bookType": "Patterns / Recipes",
    "fieldId": "computer-science",
    "domainIds": [
      "ai"
    ],
    "topicId": "ai",
    "categoryId": "ai",
    "subjectId": "ai",
    "author": "4TM Technical Board",
    "role": "AI Systems & Autonomous Agents Architecture Group",
    "level": "Intermediate to Advanced",
    "estimatedReadTime": "35 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-18",
    "accentColor": "from-fuchsia-600 to-indigo-900",
    "tags": [
      "AI Agents",
      "ReAct",
      "Tool Use",
      "Multi-Agent",
      "Patterns",
      "Orchestration"
    ],
    "description": {
      "en": "Production-grade architectural patterns for autonomous AI agents: the ReAct (Reasoning + Acting) state machine loop, structured tool contracts, max-iteration guardrails, and hierarchical multi-agent supervisor orchestration.",
      "vi": "Các mẫu kiến trúc thực chiến cho hệ thống AI Agent tự hành: máy trạng thái vòng lặp ReAct (Suy luận + Hành động), ràng buộc hợp đồng tool gọi hàm, giới hạn số vòng lặp tối đa và điều phối phân cấp mô hình Supervisor."
    },
    "prerequisites": {
      "en": [
        "Understanding of LLM function calling and structured JSON output",
        "Familiarity with state machines, asynchronous loops, and API error handling"
      ],
      "vi": [
        "Hiểu biết về cơ chế function calling và xuất dữ liệu JSON có cấu trúc trong LLM",
        "Quen thuộc với máy trạng thái (state machine), vòng lặp bất đồng bộ và xử lý lỗi API"
      ]
    },
    "outcomes": {
      "en": [
        "Implement deterministic ReAct execution loops with strict state transitions",
        "Enforce input/output JSON schemas and error reflection on tool dispatching",
        "Deploy application-level safeguards including max-iteration limits and early exits",
        "Design hierarchical multi-agent supervisor systems that isolate tool contexts and eliminate prompt dilution"
      ],
      "vi": [
        "Hiện thực vòng lặp thực thi ReAct tất định với các bước chuyển trạng thái chặt chẽ",
        "Bắt buộc áp dụng JSON schema cho tham số tool và cơ chế phản tư khi công cụ trả về lỗi",
        "Thiết lập rào chắn an toàn tầng ứng dụng gồm giới hạn số vòng lặp và điều kiện thoát sớm",
        "Thiết kế hệ thống multi-agent phân cấp dạng Supervisor giúp cô lập ngữ cảnh tool và chống loãng prompt"
      ]
    },
    "chapters": [
      {
        "id": "aap-ch-1",
        "number": 1,
        "slug": "react-loop-and-tool-calling",
        "title": {
          "en": "The ReAct (Reasoning + Acting) Execution Loop",
          "vi": "Vòng Lặp Thực Thi ReAct (Reasoning + Acting)"
        },
        "summary": {
          "en": "Explicit Thought-Action-Observation state machine transitions, structured tool contracts, and max-iteration guardrails.",
          "vi": "Chuyển trạng thái rõ ràng giữa Suy luận - Hành động - Quan sát, ràng buộc tool có cấu trúc và giới hạn số vòng lặp tối đa."
        },
        "readTimeMinutes": 18,
        "sectionsCount": 1
      },
      {
        "id": "aap-ch-2",
        "number": 2,
        "slug": "multi-agent-orchestration-supervisor",
        "title": {
          "en": "Multi-Agent Orchestration & Supervisor Pattern",
          "vi": "Điều Phối Multi-Agent & Mô Hình Supervisor Router"
        },
        "summary": {
          "en": "Hierarchical multi-agent delegation, specialized system prompts, state routing, and supervisor synthesis.",
          "vi": "Phân cấp ủy quyền multi-agent, system prompt chuyên biệt, định tuyến trạng thái và tổng hợp bởi supervisor."
        },
        "readTimeMinutes": 17,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "llm-common-errors",
    "slug": "llm-common-errors",
    "title": "LLM Integration Common Errors & Pitfalls",
    "subtitle": {
      "en": "Context Overflow, Invalid JSON Parsing & Rate Limit Failures",
      "vi": "Tràn Cửa Sổ Ngữ Cảnh, Lỗi Parse JSON & Xử Lý Rate Limit"
    },
    "bookType": "Common Errors",
    "fieldId": "computer-science",
    "domainIds": [
      "ai"
    ],
    "topicId": "ai",
    "categoryId": "ai",
    "subjectId": "ai",
    "author": "4TM Technical Board",
    "role": "AI Systems Reliability & Production Operations Group",
    "level": "Foundational to Intermediate",
    "estimatedReadTime": "25 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-01-22",
    "accentColor": "from-amber-600 to-rose-700",
    "tags": [
      "LLM Bugs",
      "Rate Limits",
      "JSON Parsing",
      "Debugging",
      "Common Errors",
      "Exponential Backoff",
      "Production AI"
    ],
    "description": {
      "en": "A diagnostic catalog of frequent production LLM application bugs: fatal JSON parsing crashes caused by markdown code backticks and conversational preamble, and cascading HTTP 429 quota failures mitigated by decorrelated Exponential Backoff and Full Jitter.",
      "vi": "Cẩm nang chẩn đoán các lỗi sản xuất phổ biến khi tích hợp LLM: sập ứng dụng khi parse JSON do dính ký tự markdown backtick và lời chào đàm thoại, và lỗi nghẽn tải HTTP 429 được khắc phục bằng Exponential Backoff và Full Jitter."
    },
    "prerequisites": {
      "en": [
        "Experience invoking LLM REST APIs or SDKs (OpenAI, Gemini, Anthropic)",
        "Understanding of JSON serialization and standard HTTP status codes (429 Too Many Requests)"
      ],
      "vi": [
        "Kinh nghiệm gọi API hoặc SDK của các mô hình LLM (OpenAI, Gemini, Anthropic)",
        "Hiểu biết về chuẩn JSON và các mã trạng thái HTTP tiêu chuẩn (429 Too Many Requests)"
      ]
    },
    "outcomes": {
      "en": [
        "Sanitize markdown fences and conversational preambles from LLM JSON responses safely",
        "Diagnose and resolve token truncation errors caused by max_output_tokens cutoffs",
        "Implement mathematically decorrelated Exponential Backoff with Full Jitter for HTTP 429 errors",
        "Eliminate thundering herd retry storms across high-concurrency client clusters"
      ],
      "vi": [
        "Làm sạch ký tự markdown backtick và lời chào đàm thoại khỏi chuỗi JSON của LLM an toàn",
        "Chẩn đoán và xử lý lỗi cắt cụt token do chạm trần max_output_tokens",
        "Triển khai thuật toán Exponential Backoff kết hợp Full Jitter xử lý lỗi HTTP 429",
        "Triệt tiêu hiện tượng bão thử lại đồng loạt (thundering herd) trên các cụm máy chủ tải cao"
      ]
    },
    "chapters": [
      {
        "id": "lce-ch-1",
        "number": 1,
        "slug": "json-markdown-stripping-and-overflow",
        "title": {
          "en": "Cleaning Markdown Pollution & Context Truncation",
          "vi": "Làm Sạch Ký Tự Markdown Trong JSON & Trượt Cửa Sổ Ngữ Cảnh"
        },
        "summary": {
          "en": "Stripping ```json code fences and conversational preamble before JSON.parse, handling truncated output tokens, and defensive parsing.",
          "vi": "Bóc tách khối code ```json và lời chào xã giao trước khi parse JSON, xử lý chuỗi bị cắt cụt do thiếu token và parse phòng vệ."
        },
        "readTimeMinutes": 12,
        "sectionsCount": 1
      },
      {
        "id": "lce-ch-2",
        "number": 2,
        "slug": "handling-rate-limits-exponential-backoff",
        "title": {
          "en": "Handling HTTP 429 Rate Limits with Exponential Backoff",
          "vi": "Xử Lý Lỗi HTTP 429 Rate Limit Bằng Exponential Backoff"
        },
        "summary": {
          "en": "Mitigating HTTP 429 Too Many Requests errors using mathematically decorrelated Exponential Backoff and Full Jitter.",
          "vi": "Xử lý lỗi HTTP 429 Too Many Requests bằng thuật toán giãn cách lũy thừa Exponential Backoff kết hợp Full Jitter."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "ai-best-practices",
    "slug": "ai-best-practices",
    "title": "AI System Engineering & Security",
    "subtitle": {
      "en": "Prompt Injection Defense, PII Masking, Latency & Cost Optimization",
      "vi": "Phòng Chống Prompt Injection, Che Dấu PII, Tối Ưu Latency & Chi Phí API"
    },
    "bookType": "Best Practices",
    "fieldId": "computer-science",
    "domainIds": [
      "ai"
    ],
    "topicId": "ai",
    "categoryId": "ai",
    "subjectId": "ai",
    "author": "4TM Technical Board",
    "role": "AI Systems & Security Engineering Group",
    "level": "Intermediate to Advanced",
    "estimatedReadTime": "30 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-16",
    "accentColor": "from-violet-700 to-fuchsia-900",
    "tags": [
      "AI Security",
      "Prompt Injection",
      "Semantic Caching",
      "Best Practices",
      "RAG Security",
      "Defense in Depth"
    ],
    "description": {
      "en": "Production security and architecture standards for AI applications: mitigating indirect Prompt Injections with cryptographic nonces and dual-LLM isolation, and implementing Semantic Caching to slash latency and API token costs.",
      "vi": "Quy chuẩn bảo mật và kiến trúc hệ thống AI sản xuất: phòng chống tấn công Prompt Injection gián tiếp bằng nonce mã hóa và mô hình kép cô lập, kết hợp triển khai Semantic Caching để giảm độ trễ và chi phí token."
    },
    "prerequisites": {
      "en": [
        "Experience developing web applications or backends with LLM APIs (OpenAI, Gemini, Anthropic)",
        "Basic understanding of vector embeddings, RAG pipelines, and API latency constraints"
      ],
      "vi": [
        "Kinh nghiệm xây dựng ứng dụng web hoặc backend tích hợp LLM API (OpenAI, Gemini, Anthropic)",
        "Hiểu biết cơ bản về vector embedding, pipeline RAG và các giới hạn về độ trễ API"
      ]
    },
    "outcomes": {
      "en": [
        "Harden RAG pipelines against Indirect Prompt Injections using dynamic cryptographic XML nonces",
        "Architect a Dual-LLM privilege separation pipeline to protect autonomous tools and sensitive data",
        "Deploy an in-memory Semantic Caching layer to achieve sub-15ms response times on recurring queries",
        "Calibrate cosine similarity thresholds to balance cache hit rate against answer fidelity"
      ],
      "vi": [
        "Gia cố pipeline RAG chống tấn công Prompt Injection gián tiếp bằng thẻ XML nonce mã hóa động",
        "Thiết kế kiến trúc phân tách quyền Dual-LLM để bảo vệ các công cụ tự hành và dữ liệu nhạy cảm",
        "Triển khai tầng Semantic Cache trên RAM để đạt độ trễ dưới 15ms cho các câu hỏi trùng ý định",
        "Hiệu chuẩn ngưỡng tương đồng Cosine để cân bằng giữa tỷ lệ hit cache và độ chính xác của câu trả lời"
      ]
    },
    "chapters": [
      {
        "id": "abp-ch-1",
        "number": 1,
        "slug": "prompt-injection-defense-security",
        "title": {
          "en": "Prompt Injection Hardening & Input Sanitization",
          "vi": "Bảo Mật AI: Phòng Chống Prompt Injection & Lọc Đầu Vào"
        },
        "summary": {
          "en": "Direct vs Indirect Prompt Injection threat vectors, cryptographic XML nonce isolation, and privilege separation in agentic workflows.",
          "vi": "Các hướng tấn công Prompt Injection trực tiếp và gián tiếp, kỹ thuật cô lập bằng thẻ XML nonce mã hóa và phân quyền mô hình tự hành."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 1
      },
      {
        "id": "abp-ch-2",
        "number": 2,
        "slug": "semantic-caching-cost-optimization",
        "title": {
          "en": "Semantic Caching for Speed & Cost Reduction",
          "vi": "Semantic Caching Tối Ưu Tốc Độ & Tiết Kiệm Chi Phí API"
        },
        "summary": {
          "en": "Semantic vector similarity caching vs exact hash caches, Redis/pgvector architectures, threshold calibration, and cache invalidation.",
          "vi": "So sánh Semantic Cache vector với cache hash truyền thống, kiến trúc Redis/pgvector, hiệu chuẩn ngưỡng tương đồng và chiến lược xóa cache."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "vector-embeddings-guide",
    "slug": "vector-embeddings-guide",
    "title": "Vector Embeddings & Semantic Search Guide",
    "subtitle": {
      "en": "Step-by-Step Practical Guide to Building a Vector Search Pipeline",
      "vi": "Hướng Dẫn Thực Hành Từng Bước Xây Dựng Hệ Thống Tìm Kiếm Vectơ"
    },
    "bookType": "Practical Guides",
    "fieldId": "computer-science",
    "domainIds": [
      "ai"
    ],
    "topicId": "ai",
    "categoryId": "ai",
    "subjectId": "ai",
    "author": "4TM Technical Board",
    "role": "Data Systems & Vector Retrieval Engineering Group",
    "level": "Intermediate",
    "estimatedReadTime": "25 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-16",
    "accentColor": "from-emerald-600 to-teal-900",
    "tags": [
      "Vector Search",
      "pgvector",
      "PostgreSQL",
      "HNSW",
      "Embeddings",
      "Practical Guides"
    ],
    "description": {
      "en": "A step-by-step practical engineering guide to building enterprise vector similarity search on PostgreSQL using the pgvector extension: table schema design, model-specific dimensions, HNSW index optimization, and distance operator mechanics (<=>, <->, <#>).",
      "vi": "Hướng dẫn thực hành kỹ thuật từng bước xây dựng hệ thống tìm kiếm tương đồng vector trên PostgreSQL bằng tiện ích mở rộng pgvector: thiết kế schema bảng, số chiều vector theo mô hình, tối ưu chỉ mục HNSW và bản chất các toán tử khoảng cách (<=>, <->, <#>)."
    },
    "prerequisites": {
      "en": [
        "Basic relational SQL proficiency (DDL, DML, indexing concepts)",
        "Conceptual understanding of high-dimensional vector embeddings and similarity search"
      ],
      "vi": [
        "Thành thạo SQL cơ sở dữ liệu quan hệ (khái niệm DDL, DML, đánh chỉ mục index)",
        "Hiểu biết cơ bản về vector nhúng nhiều chiều và tìm kiếm tương đồng"
      ]
    },
    "outcomes": {
      "en": [
        "Configure PostgreSQL with the pgvector extension and declare dimension-specific vector columns",
        "Build and tune high-performance HNSW indexes with optimal m and ef_construction parameters",
        "Execute sub-millisecond semantic similarity queries using the correct distance operators (<=>, <->, <#>)",
        "Filter search results accurately by combining relational metadata constraints with vector similarity thresholds"
      ],
      "vi": [
        "Cấu hình PostgreSQL với tiện ích pgvector và khai báo cột vector theo đúng số chiều của mô hình nhúng",
        "Tạo và tinh chỉnh chỉ mục HNSW hiệu năng cao với các tham số tối ưu m và ef_construction",
        "Thực thi truy vấn tìm kiếm ngữ nghĩa dưới mili-giây bằng đúng toán tử khoảng cách (<=>, <->, <#>)",
        "Lọc kết quả chuẩn xác bằng cách kết hợp điều kiện metadata quan hệ với ngưỡng điểm tương đồng vector"
      ]
    },
    "chapters": [
      {
        "id": "veg-ch-1",
        "number": 1,
        "slug": "pgvector-setup-and-schema",
        "title": {
          "en": "PostgreSQL pgvector Extension Setup & Index Schema",
          "vi": "Cấu Hình Tiện Ích pgvector & Schema Index Trong PostgreSQL"
        },
        "summary": {
          "en": "Enabling the vector extension, defining dimension-specific vector columns, and configuring HNSW indexes.",
          "vi": "Kích hoạt tiện ích vector, khai báo cột vector theo số chiều mô hình và cấu hình chỉ mục HNSW."
        },
        "readTimeMinutes": 12,
        "sectionsCount": 1
      },
      {
        "id": "veg-ch-2",
        "number": 2,
        "slug": "cosine-similarity-queries",
        "title": {
          "en": "Executing Cosine Similarity Queries with the <=> Operator",
          "vi": "Thực Thi Truy Vấn Độ Tương Đồng Với Toán Tử <=> Trong SQL"
        },
        "summary": {
          "en": "Ordering by cosine distance (<=>), converting to similarity scores, and combining with metadata pre-filtering.",
          "vi": "Sắp xếp theo khoảng cách cosine (<=>), chuyển đổi sang điểm tương đồng và kết hợp lọc metadata."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "fine-tuning-handbook",
    "slug": "fine-tuning-handbook",
    "title": "LLM Fine-Tuning & Parameter-Efficient Tuning (LoRA)",
    "subtitle": {
      "en": "LoRA, QLoRA, Dataset Curation & Instruction Tuning Mechanics",
      "vi": "Kỹ Thuật LoRA, QLoRA, Chuẩn Bị Dataset & Tinh Chỉnh Instruction Tuning"
    },
    "bookType": "Handbook",
    "fieldId": "computer-science",
    "domainIds": [
      "ai"
    ],
    "topicId": "ai",
    "categoryId": "ai",
    "subjectId": "ai",
    "author": "4TM Technical Board",
    "role": "LLM Training & Model Adaptation Engineering Group",
    "level": "Intermediate to Advanced",
    "estimatedReadTime": "40 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-14",
    "accentColor": "from-amber-600 to-orange-900",
    "tags": [
      "Fine-Tuning",
      "LoRA",
      "QLoRA",
      "PEFT",
      "Instruction Tuning",
      "Handbook"
    ],
    "description": {
      "en": "An authoritative engineering handbook on parameter-efficient fine-tuning (PEFT): mathematical foundations of Low-Rank Adaptation (LoRA), QLoRA 4-bit NormalFloat (NF4) quantization, double quantization, paged optimizers, instruction dataset curation, and response loss masking.",
      "vi": "Cẩm nang kỹ thuật chuyên sâu về tinh chỉnh mô hình ngôn ngữ tối ưu tham số (PEFT): nền tảng toán học của Low-Rank Adaptation (LoRA), lượng tử hóa 4-bit NormalFloat (NF4) trong QLoRA, lượng tử hóa kép, paged optimizer, chuẩn bị tập dữ liệu instruction và cơ chế che nhãn loss masking."
    },
    "prerequisites": {
      "en": [
        "Linear algebra proficiency (matrix multiplication, rank, dimensionality, tensor shapes)",
        "Understanding of standard Transformer architecture, self-attention, and PyTorch training loops"
      ],
      "vi": [
        "Nắm vững đại số tuyến tính (phép nhân ma trận, hạng của ma trận, số chiều, chiều tensor)",
        "Hiểu biết về kiến trúc Transformer, cơ chế self-attention và vòng lặp huấn luyện PyTorch"
      ]
    },
    "outcomes": {
      "en": [
        "Master the mathematical derivation of Low-Rank Adaptation (LoRA) weight decomposition and forward pass mechanics",
        "Deploy QLoRA with 4-bit NF4 base quantization, double quantization, and paged optimizers on consumer GPU hardware",
        "Structure clean instruction tuning datasets using standardized ChatML, Alpaca, or ShareGPT formats",
        "Implement response-only cross-entropy loss masking to prevent model capacity degradation on prompt tokens"
      ],
      "vi": [
        "Làm chủ công thức toán học phân rã trọng số Low-Rank Adaptation (LoRA) và cơ chế lan truyền thuận forward pass",
        "Triển khai QLoRA với lượng tử hóa 4-bit NF4, lượng tử hóa kép và paged optimizer trên phần cứng GPU phổ thông",
        "Định dạng tập dữ liệu instruction chuẩn mực theo định dạng ChatML, Alpaca hoặc ShareGPT",
        "Hiện thực cơ chế che nhãn response loss masking để tránh lãng phí năng lực mô hình vào việc học vẹt prompt"
      ]
    },
    "chapters": [
      {
        "id": "fth-ch-1",
        "number": 1,
        "slug": "lora-and-qlora-mechanics",
        "title": {
          "en": "Low-Rank Adaptation (LoRA) & QLoRA Mechanics",
          "vi": "Cơ Chế Kỹ Thuật Low-Rank Adaptation (LoRA) & QLoRA"
        },
        "summary": {
          "en": "Freezing base weights W_0, low-rank decomposition matrices B and A, 4-bit NF4 quantization, and gradient backpropagation.",
          "vi": "Đóng băng trọng số gốc W_0, ma trận phân rã hạng thấp B và A, lượng tử hóa 4-bit NF4 và lan truyền ngược gradient."
        },
        "readTimeMinutes": 20,
        "sectionsCount": 1
      },
      {
        "id": "fth-ch-2",
        "number": 2,
        "slug": "dataset-curation-instruction-tuning",
        "title": {
          "en": "Dataset Curation & Instruction Formatting",
          "vi": "Xử Lý Tập Dữ Liệu & Định Dạng Instruction Tuning"
        },
        "summary": {
          "en": "Instruction tuning pipelines, JSONL formatting, Alpaca vs ShareGPT vs ChatML tokenization, and response loss masking.",
          "vi": "Quy trình tinh chỉnh chỉ dẫn, định dạng JSONL, so sánh Alpaca vs ShareGPT vs ChatML và cơ chế che nhãn loss masking."
        },
        "readTimeMinutes": 20,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "ai-safety-alignment-definitions",
    "slug": "ai-safety-alignment-definitions",
    "title": "AI Safety & Alignment Terminology",
    "subtitle": {
      "en": "RLHF, DPO, Red Teaming & Guardrails Glossary",
      "vi": "Phương Pháp RLHF, DPO, Đội Đỏ Red Teaming & Tra Cứu Khái Niệm An Toàn AI"
    },
    "bookType": "Definitions",
    "fieldId": "computer-science",
    "domainIds": [
      "ai"
    ],
    "topicId": "ai",
    "categoryId": "ai",
    "subjectId": "ai",
    "author": "4TM Technical Board",
    "role": "AI Safety, Alignment & Red Teaming Research Group",
    "level": "Intermediate",
    "estimatedReadTime": "25 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-12",
    "accentColor": "from-rose-600 to-red-950",
    "tags": [
      "AI Safety",
      "Alignment",
      "RLHF",
      "DPO",
      "Red Teaming",
      "Guardrails",
      "Definitions"
    ],
    "description": {
      "en": "An authoritative technical terminology reference and comparative guide to frontier AI alignment and safety mechanisms: mathematical differentiation of RLHF vs Direct Preference Optimization (DPO), and defense-in-depth runtime guardrails vs adversarial red teaming.",
      "vi": "Tài liệu tra cứu thuật ngữ kỹ thuật và so sánh chuyên sâu về các cơ chế an toàn và căn chỉnh AI tiên tiến: phân tích toán học so sánh giữa RLHF và Direct Preference Optimization (DPO), kiến trúc hàng rào bảo vệ lúc chạy guardrails và kiểm thử xâm nhập red teaming."
    },
    "prerequisites": {
      "en": [
        "Basic knowledge of supervised fine-tuning (SFT) and loss functions",
        "Familiarity with probability theory, cross-entropy, and reinforcement learning fundamentals"
      ],
      "vi": [
        "Kiến thức cơ bản về supervised fine-tuning (SFT) và các hàm mất mát loss",
        "Quen thuộc với lý thuyết xác suất, cross-entropy và các khái niệm cơ bản của học tăng cường (RL)"
      ]
    },
    "outcomes": {
      "en": [
        "Understand the mathematical and procedural differences between the 3-stage RLHF pipeline and closed-form DPO training",
        "Identify the role of reference policies (pi_ref) and beta KL penalties in preventing policy collapse",
        "Design defense-in-depth runtime guardrails separating deterministic rules from model-based classification",
        "Formulate structured adversarial red teaming protocols to uncover prompt injection and jailbreak vectors"
      ],
      "vi": [
        "Hiểu rõ sự khác biệt toán học và quy trình thực hiện giữa chu trình 3 bước của RLHF và giải thuật dạng đóng DPO",
        "Nhận biết vai trò của policy tham chiếu (pi_ref) và hệ số phạt KL beta trong việc chống sụp đổ mô hình",
        "Thiết kế hàng rào bảo vệ lúc chạy theo mô hình phòng thủ chiều sâu, tách biệt luật tất định và bộ phân loại AI",
        "Xây dựng quy trình kiểm thử red teaming để phát hiện các lỗ hổng prompt injection và kỹ thuật jailbreak"
      ]
    },
    "chapters": [
      {
        "id": "asa-ch-1",
        "number": 1,
        "slug": "rlhf-vs-dpo-definitions",
        "title": {
          "en": "RLHF vs Direct Preference Optimization (DPO)",
          "vi": "Định Nghĩa RLHF vs Direct Preference Optimization (DPO)"
        },
        "summary": {
          "en": "Reinforcement Learning from Human Feedback (RLHF) 3-stage pipeline vs closed-form Direct Preference Optimization (DPO).",
          "vi": "Quy trình 3 giai đoạn của RLHF so với phương pháp tối ưu hóa trực tiếp DPO dạng đóng."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 1
      },
      {
        "id": "asa-ch-2",
        "number": 2,
        "slug": "guardrails-and-red-teaming",
        "title": {
          "en": "Guardrails & Adversarial Red Teaming Definitions",
          "vi": "Thuật Ngữ Hàng Rào Guardrails & Kiểm Thử Red Teaming"
        },
        "summary": {
          "en": "Input/output validation guardrails, defense-in-depth, deterministic filters vs model moderators, and adversarial red teaming.",
          "vi": "Hàng rào kiểm duyệt đầu vào/ra, phòng thủ chiều sâu, bộ lọc tất định so với mô hình kiểm duyệt và kiểm thử red teaming."
        },
        "readTimeMinutes": 12,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "llm-eval-practical-guide",
    "slug": "llm-eval-practical-guide",
    "title": "LLM Evaluation & Benchmarking Guide",
    "subtitle": {
      "en": "Step-by-Step Practical Guide to LLM-as-a-Judge & RAG Triad Metrics",
      "vi": "Hướng Dẫn Thực Hành Từng Bước Đánh Giá Mô Hình AI Với LLM-as-a-Judge"
    },
    "bookType": "Practical Guides",
    "fieldId": "computer-science",
    "domainIds": [
      "ai"
    ],
    "topicId": "ai",
    "categoryId": "ai",
    "subjectId": "ai",
    "author": "4TM Technical Board",
    "role": "AI Quality Engineering & Evaluation Systems Group",
    "level": "Intermediate",
    "estimatedReadTime": "25 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-10",
    "accentColor": "from-cyan-600 to-blue-950",
    "tags": [
      "LLM Evaluation",
      "LLM-as-a-Judge",
      "RAG Triad",
      "Faithfulness",
      "Benchmarking",
      "Practical Guides"
    ],
    "description": {
      "en": "A step-by-step engineering guide to implementing automated LLM evaluation pipelines: structured Likert rubric design, rubric-grounded rationale, mitigating judge biases (position, verbosity), and decomposing the RAG Triad (Context Relevance, Faithfulness, Answer Relevance).",
      "vi": "Hướng dẫn thực hành kỹ thuật từng bước xây dựng hệ thống đánh giá chất lượng mô hình LLM tự động: thiết kế rubric thang điểm Likert chuẩn mực, giải trình dựa trên tiêu chí rubric, khắc phục các thiên vị của giám khảo (vị trí, độ dài câu) và bóc tách bộ ba chỉ số RAG Triad (Độ liên quan ngữ cảnh, Tính trung thực, Độ liên quan câu trả lời)."
    },
    "prerequisites": {
      "en": [
        "Understanding of RAG retrieval-augmented generation pipelines and prompt structure",
        "Basic familiarity with JSON schema configuration and statistical aggregation (mean, standard deviation)"
      ],
      "vi": [
        "Hiểu biết về kiến trúc hệ thống RAG và cấu trúc câu lệnh prompt",
        "Quen thuộc với cấu hình JSON schema và thống kê tổng hợp cơ bản (trung bình, độ lệch chuẩn)"
      ]
    },
    "outcomes": {
      "en": [
        "Construct deterministic 1-to-5 Likert judge rubrics enforcing evidence-based rationale before score emission",
        "Eliminate position bias and verbosity bias in pairwise evaluation via order-swapped evaluation loops",
        "Decompose RAG systems into independent Context Relevance, Faithfulness, and Answer Relevance metrics",
        "Pinpoint whether RAG quality regressions originate from retrieval noise or generator hallucinations"
      ],
      "vi": [
        "Xây dựng rubric chấm điểm 1 đến 5 theo thang Likert bắt buộc xuất giải trình dựa trên chứng cứ trước khi chấm điểm",
        "Loại bỏ thiên vị vị trí và thiên vị độ dài trong so sánh cặp bằng kỹ thuật đảo vị trí hai chiều",
        "Bóc tách hệ thống RAG thành 3 chỉ số độc lập: Context Relevance, Faithfulness và Answer Relevance",
        "Xác định chính xác nguyên nhân suy giảm chất lượng RAG bắt nguồn từ việc tìm kiếm sai hay do mô hình sinh ảo giác"
      ]
    },
    "chapters": [
      {
        "id": "leg-ch-1",
        "number": 1,
        "slug": "llm-as-a-judge-pattern",
        "title": {
          "en": "The LLM-as-a-Judge Evaluation Pattern",
          "vi": "Pattern Đánh Giá Chất Lượng Bằng LLM-as-a-Judge"
        },
        "summary": {
          "en": "Automated scoring with frontier models, structured Likert rubrics, rubric-grounded rationale, and mitigating judge biases.",
          "vi": "Chấm điểm tự động bằng mô hình cấp cao, thang điểm Likert rõ ràng, giải trình dựa trên tiêu chí rubric và khắc phục thiên vị giám khảo."
        },
        "readTimeMinutes": 13,
        "sectionsCount": 1
      },
      {
        "id": "leg-ch-2",
        "number": 2,
        "slug": "rag-triad-metrics",
        "title": {
          "en": "Measuring the RAG Triad (Faithfulness, Relevance)",
          "vi": "Đo Đạc Bộ Ba Chỉ Số RAG Triad"
        },
        "summary": {
          "en": "Quantifying Context Relevance, Faithfulness (Groundedness), and Answer Relevance to pinpoint RAG failure modes.",
          "vi": "Định lượng Độ liên quan ngữ cảnh, Tính trung thực và Độ liên quan câu trả lời để phát hiện chính xác lỗi RAG."
        },
        "readTimeMinutes": 12,
        "sectionsCount": 1
      }
    ]
  },
  {
    "id": "gemini-api-recipes",
    "slug": "gemini-api-recipes",
    "title": "Google Gemini API Integration Recipes",
    "subtitle": {
      "en": "Gemini 1.5 Pro/Flash, Multimodal Processing, System Instructions & Function Calling",
      "vi": "Công Thức Tích Hợp Gemini 1.5 Pro/Flash, Đa Phương Tiện Multimodal & Function Calling"
    },
    "bookType": "Patterns / Recipes",
    "fieldId": "computer-science",
    "domainIds": [
      "ai"
    ],
    "topicId": "ai",
    "categoryId": "ai",
    "subjectId": "ai",
    "author": "4TM Technical Board",
    "role": "Cloud Native & Gemini Systems Architecture Group",
    "level": "Intermediate to Advanced",
    "estimatedReadTime": "30 mins",
    "chaptersCount": 2,
    "publishedDate": "2025-02-08",
    "accentColor": "from-blue-600 to-indigo-950",
    "tags": [
      "Gemini API",
      "Multimodal",
      "Streaming",
      "Structured JSON",
      "SDK",
      "Patterns / Recipes"
    ],
    "description": {
      "en": "Production-tested architectural recipes and patterns for integrating the Google Gen AI SDK (@google/genai): safe lazy initialization to prevent container boot crashes, strict server-side API key proxying, multimodal inlineData buffer streaming, and constrained decoding with responseSchema.",
      "vi": "Các công thức và mẫu kiến trúc chuẩn sản xuất khi tích hợp Google Gen AI SDK (@google/genai): khởi tạo lazy an toàn chống sập container lúc khởi động, proxy API key bảo mật phía server, xử lý đa phương tiện buffer inlineData và ép ngữ pháp giải mã với responseSchema."
    },
    "prerequisites": {
      "en": [
        "Full-stack TypeScript and Node.js backend proficiency (Express or similar server runtimes)",
        "Understanding of client-server security boundaries and environment variable lifecycles"
      ],
      "vi": [
        "Thành thạo TypeScript full-stack và backend Node.js (Express hoặc runtime server tương đương)",
        "Hiểu biết về ranh giới bảo mật client-server và vòng đời của các biến môi trường"
      ]
    },
    "outcomes": {
      "en": [
        "Implement fail-safe lazy SDK initialization preventing container cold-start crashes",
        "Process high-throughput multimodal inputs (images, audio, PDFs) via base64 inlineData buffers",
        "Deliver sub-200ms initial response feedback using generateContentStream and Server-Sent Events",
        "Guarantee 100% deterministic JSON outputs via native responseSchema constrained logit decoding"
      ],
      "vi": [
        "Hiện thực khởi tạo lazy SDK an toàn triệt tiêu nguy cơ sập container khi khởi động",
        "Xử lý dữ liệu đa phương tiện thông lượng cao (ảnh, âm thanh, tệp PDF) qua buffer base64 inlineData",
        "Đem lại trải nghiệm phản hồi dưới 200ms bằng kỹ thuật stream token với generateContentStream",
        "Đảm bảo dữ liệu JSON đầu ra chuẩn xác 100% bằng cơ chế constrained logit decoding với responseSchema"
      ]
    },
    "chapters": [
      {
        "id": "gar-ch-1",
        "number": 1,
        "slug": "sdk-initialization-and-multimodal-generation",
        "title": {
          "en": "Server-Side SDK Setup & Multimodal Processing",
          "vi": "Khởi Tạo SDK Server-Side & Xử Lý Đa Phương Tiện Multimodal"
        },
        "summary": {
          "en": "Lazy SDK initialization, environment secret protection, and passing image/audio/PDF inlineData buffers.",
          "vi": "Khởi tạo lazy SDK, bảo mật biến môi trường và xử lý buffer đa phương tiện inlineData (ảnh/âm thanh/PDF)."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 1
      },
      {
        "id": "gar-ch-2",
        "number": 2,
        "slug": "gemini-streaming-and-structured-json",
        "title": {
          "en": "Token Streaming & Enforcing JSON Response Schemas",
          "vi": "Stream Token Trực Tiếp & Ép Kiểu JSON Trả Về Với Response Schema"
        },
        "summary": {
          "en": "generateContentStream for real-time UI typing and responseSchema for deterministic type-safe JSON extraction.",
          "vi": "Phương thức generateContentStream cho hiệu ứng gõ chữ thời gian thực và responseSchema để ép kiểu JSON chuẩn xác."
        },
        "readTimeMinutes": 15,
        "sectionsCount": 1
      }
    ]
  }
];
