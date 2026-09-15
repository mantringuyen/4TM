import { Lesson } from '../../../../types';

export const lesson30: Lesson = {
  "id": "py_lesson_30",
  "moduleId": "py_mod_12",
  "levelId": "advanced",
  "courseId": "python",
  "order": 30,
  "topicId": "python_context_managers",
  "title": {
    "en": "Context Managers: with Statement, __enter__, __exit__ & contextlib",
    "vi": "Context Managers: Câu Lệnh with, __enter__, __exit__ & contextlib"
  },
  "summary": {
    "en": "Master deterministic resource management in Python: the with statement mechanics, implementing class-based context managers with __enter__ and __exit__, suppressing exceptions safely, and creating generator context managers using @contextlib.contextmanager.",
    "vi": "Làm chủ quản lý tài nguyên trong Python: cơ chế hoạt động của câu lệnh with, cài đặt context manager bằng class với __enter__ và __exit__, xử lý triệt tiêu ngoại lệ an toàn và tạo context manager dạng generator bằng @contextlib.contextmanager."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "Resource acquisition and cleanup (files, sockets, database locks, temporary settings) is prone to leaks if errors occur. Python's with statement guarantees deterministic setup and teardown through Context Managers, guaranteeing cleanup even when unhandled exceptions occur.",
      "vi": "Khởi tạo và giải phóng tài nguyên (file, socket, khóa cơ sở dữ liệu, cấu hình tạm thời) rất dễ bị rò rỉ nếu xảy ra lỗi. Câu lệnh with của Python đảm bảo thiết lập và dọn dẹp tài nguyên thông qua Context Manager, cam kết dọn dẹp sạch sẽ ngay cả khi có ngoại lệ phát sinh."
    },
    "conceptExplanation": {
      "en": "Context Manager Protocol:\n1. __enter__(self): Sets up resource, optionally returns object assigned to \"as target\".\n2. __exit__(self, exc_type, exc_val, exc_tb): Guaranteed teardown code. If an exception occurred, its type, value, and traceback are passed. Returning True suppresses the exception; returning False/None propagates it.\n3. Generator Context Managers: @contextlib.contextmanager turns a generator containing a single yield inside try-finally into a full context manager.",
      "vi": "Giao Thức Context Manager:\n1. __enter__(self): Thiết lập tài nguyên, tùy chọn trả về đối tượng được gán vào biến sau \"as target\".\n2. __exit__(self, exc_type, exc_val, exc_tb): Đoạn code dọn dẹp bắt buộc chạy. Nếu có lỗi phát sinh, kiểu lỗi, giá trị và traceback được truyền vào. Trả về True sẽ dập tắt ngoại lệ; trả về False/None sẽ để ngoại lệ lan truyền ra ngoài.\n3. Generator Context Manager: Decorator @contextlib.contextmanager chuyển đổi một hàm generator chứa duy nhất một lệnh yield trong khối try-finally thành một context manager hoàn chỉnh."
    },
    "syntax": "# Class-Based Context Manager\nclass ManagedResource:\n    def __enter__(self):\n        print(\"Acquiring resource\")\n        return self\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        print(\"Releasing resource\")\n        return False  # Do not suppress exceptions\n\n# Generator-Based Context Manager\nimport contextlib\n\n@contextlib.contextmanager\ndef open_resource(name: str):\n    print(f\"Opening {name}\")\n    try:\n        yield f\"HANDLE_{name}\"\n    finally:\n        print(f\"Closed {name}\")",
    "examples": [
      {
        "title": {
          "en": "High-Precision Timer & Exception Suppressor Context Manager",
          "vi": "Context Manager Đo Thời Gian & Triệt Tiêu Ngoại Lệ"
        },
        "code": "import time\nimport contextlib\n\nclass BenchmarkTimer:\n    def __init__(self, label: str):\n        self.label = label\n        self.elapsed = 0.0\n\n    def __enter__(self):\n        self.start = time.perf_counter()\n        return self\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        self.elapsed = time.perf_counter() - self.start\n        print(f\"[{self.label}] Elapsed: {self.elapsed * 1000:.2f}ms\")\n        return False  # Propagate any errors\n\nwith BenchmarkTimer(\"Matrix Multiplication\") as t:\n    data = [x ** 2 for x in range(100000)]",
        "language": "python",
        "explanation": {
          "en": "Demonstrates deterministic execution timing with access to timing metrics via the bound target variable.",
          "vi": "Minh họa đo thời gian thực thi với quyền truy cập dữ liệu đo qua biến đích được gán."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Returning True accidentally from __exit__ (silently swallowing all bugs and exceptions, making debugging impossible)",
          "vi": "Vô tình trả về True từ __exit__ khiến mọi lỗi và ngoại lệ bị dập tắt trong im lặng, làm mất dấu vết bug"
        },
        "correction": {
          "en": "Only return True from __exit__ when you intentionally want to swallow a specific expected exception type.",
          "vi": "Chỉ trả về True từ __exit__ khi bạn cố tình muốn dập tắt một loại ngoại lệ cụ thể đã được lường trước."
        },
        "code": "def __exit__(self, exc_type, exc_val, exc_tb):\n    self.cleanup()\n    return exc_type is KnownIgnorableError # Explicit check"
      }
    ],
    "tips": [
      {
        "en": "Use contextlib.suppress(FileNotFoundError) for cleanly ignoring expected non-fatal exceptions.",
        "vi": "Dùng contextlib.suppress(FileNotFoundError) để bỏ qua các ngoại lệ không nghiêm trọng một cách sạch sẽ."
      }
    ],
    "practice": {
      "task": {
        "en": "Build Temporary Config Context Manager with contextlib",
        "vi": "Xây dựng Context Manager cấu hình tạm thời với contextlib"
      },
      "instruction": {
        "en": "Import contextlib. Create config = {\"debug\": False}. Write @contextlib.contextmanager def temp_debug(flag): orig = config[\"debug\"]; config[\"debug\"] = flag; try: yield config; finally: config[\"debug\"] = orig. Test setting True inside with block and print config state inside and after.",
        "vi": "Dùng contextlib tạo temp_debug thay đổi config[\"debug\"] tạm thời rồi khôi phục lại trong finally. In trạng thái bên trong và sau khối with."
      },
      "starterCode": "# Temporary config context manager\n",
      "solutionCode": "import contextlib\n\nconfig = {\"debug\": False}\n\n@contextlib.contextmanager\ndef temp_debug(flag):\n    orig = config[\"debug\"]\n    config[\"debug\"] = flag\n    try:\n        yield config\n    finally:\n        config[\"debug\"] = orig\n\nprint(\"Before:\", config[\"debug\"])\nwith temp_debug(True) as c:\n    print(\"Inside with:\", c[\"debug\"])\nprint(\"After:\", config[\"debug\"])\n",
      "expectedOutput": "Before: False\nInside with: True\nAfter: False",
      "requiredPatterns": [],
      "hint": {
        "en": "try: yield config finally: config[\"debug\"] = orig",
        "vi": "try: yield config finally: config[\"debug\"] = orig"
      }
    },
    "consolidationPractice": {
      "task": {
        "en": "Exception Handling in Custom __exit__",
        "vi": "Xử lý ngoại lệ trong __exit__"
      },
      "instruction": {
        "en": "Create class SafeBlock: def __enter__(self): return self; def __exit__(self, t, v, tb): if t is ZeroDivisionError: print(\"Swallowed ZeroDivisionError\"); return True; return False. Test with 1 / 0 inside with SafeBlock():. Print \"Completed\".",
        "vi": "Tạo class SafeBlock có __exit__ bắt ZeroDivisionError và trả về True. Thử nghiệm chia cho 0 bên trong with."
      },
      "starterCode": "# SafeBlock context manager\n",
      "solutionCode": "class SafeBlock:\n    def __enter__(self):\n        return self\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        if exc_type is ZeroDivisionError:\n            print(\"Swallowed ZeroDivisionError\")\n            return True\n        return False\n\nwith SafeBlock():\n    val = 1 / 0\n\nprint(\"Completed\")\n",
      "expectedOutput": "Swallowed ZeroDivisionError\nCompleted",
      "requiredPatterns": [],
      "hint": {
        "en": "return True suppresses the exception",
        "vi": "return True dập tắt ngoại lệ"
      }
    }
  },
  "exercisePool": [
    {
      "id": "py_ex_51_1",
      "type": "write_code",
      "title": {
        "en": "Implement Financial Money Value Object & Vector Math",
        "vi": "Triển Khai Financial Money Value Object & Vector Math"
      },
      "instruction": {
        "en": "Write production-ready Python code implementing __repr__, __str__, __len__, __getitem__, __eq__, __hash__, __add__ operator overloading for Financial Money Value Object & Vector Math.",
        "vi": "Viết mã nguồn chuẩn doanh nghiệp áp dụng __repr__, __str__, __len__, __getitem__, __eq__, __hash__, __add__ operator overloading cho Financial Money Value Object & Vector Math."
      },
      "starterCode": "# Write your domain code below:\n",
      "solutionCode": "# Implementation for Dunder Magic Methods & Operator Overloading\nimport asyncio\n\nasync def fetch_metric(metric_id):\n    await asyncio.sleep(0.01)\n    return f\"Metric-{metric_id}: 99.8%\"\n\nasync def main():\n    results = await asyncio.gather(\n        fetch_metric(\"CPU\"),\n        fetch_metric(\"MEM\"),\n        return_exceptions=True\n    )\n    for res in results:\n        print(\"Fetched:\", res)\n\nasyncio.run(main())",
      "hint": {
        "en": "Apply __repr__, __str__, __len__, __getitem__, __eq__, __hash__, __add__ operator overloading following high-performance async standards.",
        "vi": "Áp dụng __repr__, __str__, __len__, __getitem__, __eq__, __hash__, __add__ operator overloading theo chuẩn hiệu năng cao của asyncio."
      },
      "explanation": {
        "en": "Non-blocking concurrency and memory safety are essential for production scale.",
        "vi": "Xử lý bất đồng bộ và an toàn bộ nhớ là yếu tố then chốt cho hệ thống quy mô lớn."
      }
    },
    {
      "id": "py_ex_51_2",
      "type": "fix_code",
      "title": {
        "en": "Fix Flaw in Financial Money Value Object & Vector Math",
        "vi": "Sửa Lỗi Trong Financial Money Value Object & Vector Math"
      },
      "instruction": {
        "en": "Fix the blocking call or memory leak in Financial Money Value Object & Vector Math.",
        "vi": "Sửa lỗi chặn luồng hoặc rò rỉ bộ nhớ trong Financial Money Value Object & Vector Math."
      },
      "starterCode": "import tracemalloc\n\ntracemalloc.start()\n# Allocate in-memory dataset\ndata = [x**2 for x in range(10000)]\ncurrent, peak = tracemalloc.get_traced_memory()\ntracemalloc.stop()\nprint(f\"Peak Memory: {peak / 1024:.2f} KB\")",
      "solutionCode": "import tracemalloc\n\ntracemalloc.start()\n# Allocate in-memory dataset\ndata = [x**2 for x in range(10000)]\ncurrent, peak = tracemalloc.get_traced_memory()\ntracemalloc.stop()\nprint(f\"Peak Memory: {peak / 1024:.2f} KB\")",
      "hint": {
        "en": "Use tracemalloc.start(), get_traced_memory(), and stop() to measure allocations.",
        "vi": "Dùng tracemalloc.start(), get_traced_memory(), và stop() để đo lường cấp phát RAM."
      },
      "explanation": {
        "en": "tracemalloc tracks actual memory allocations across all nested structures.",
        "vi": "tracemalloc theo dõi dung lượng RAM thực tế phân bổ cho tất cả các đối tượng lồng nhau."
      }
    },
    {
      "id": "py_ex_51_3",
      "type": "complete_code",
      "title": {
        "en": "Complete Resilient Async Task Fetcher",
        "vi": "Hoàn Thiện Bộ Thu Thập Async Chịu Lỗi"
      },
      "instruction": {
        "en": "Complete the async task with timeout and CancelledError handling.",
        "vi": "Hoàn thiện tác vụ bất đồng bộ với timeout và xử lý ngoại lệ CancelledError."
      },
      "starterCode": "import asyncio\n\nasync def resilient_query():\n    try:\n        # Simulate quick query\n        await asyncio.sleep(0.01)\n        return \"Query OK\"\n    except asyncio.CancelledError:\n        print(\"Cleanup on cancellation\")\n        raise\n\nasync def main():\n    try:\n        res = await asyncio.wait_for(resilient_query(), timeout=1.0)\n        print(\"Result:\", res)\n    except asyncio.TimeoutError:\n        print(\"Query Timed Out\")\n\nasyncio.run(main())",
      "solutionCode": "import asyncio\n\nasync def resilient_query():\n    try:\n        # Simulate quick query\n        await asyncio.sleep(0.01)\n        return \"Query OK\"\n    except asyncio.CancelledError:\n        print(\"Cleanup on cancellation\")\n        raise\n\nasync def main():\n    try:\n        res = await asyncio.wait_for(resilient_query(), timeout=1.0)\n        print(\"Result:\", res)\n    except asyncio.TimeoutError:\n        print(\"Query Timed Out\")\n\nasyncio.run(main())",
      "hint": {
        "en": "Use asyncio.wait_for with timeout and catch asyncio.TimeoutError.",
        "vi": "Dùng asyncio.wait_for kèm timeout và bắt lỗi asyncio.TimeoutError."
      },
      "explanation": {
        "en": "Timeout guards prevent hanging coroutines from draining thread and socket pools.",
        "vi": "Bộ bảo vệ timeout ngăn ngừa các coroutine bị treo làm cạn kiệt tài nguyên mạng."
      }
    },
    {
      "id": "py_ex_51_4",
      "type": "predict_output",
      "title": {
        "en": "Predict Output for Financial Money Value Object & Vector Math",
        "vi": "Dự Đoán Kết Quả Financial Money Value Object & Vector Math"
      },
      "instruction": {
        "en": "Predict and verify the execution output for the Financial Money Value Object & Vector Math component.",
        "vi": "Dự đoán và kiểm tra kết quả thực thi của Financial Money Value Object & Vector Math."
      },
      "starterCode": "class Point:\n    __slots__ = ('x', 'y')\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\npt = Point(10, 20)\nprint(\"Has dict:\", hasattr(pt, \"__dict__\"))\nprint(\"Point Coords:\", (pt.x, pt.y))",
      "solutionCode": "class Point:\n    __slots__ = ('x', 'y')\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\npt = Point(10, 20)\nprint(\"Has dict:\", hasattr(pt, \"__dict__\"))\nprint(\"Point Coords:\", (pt.x, pt.y))",
      "hint": {
        "en": "__slots__ eliminates the instance __dict__, saving substantial memory for millions of objects.",
        "vi": "__slots__ loại bỏ từ điển __dict__ ở mỗi thể hiện, tiết kiệm rất nhiều RAM khi có hàng triệu đối tượng."
      },
      "explanation": {
        "en": "Memory footprint drops significantly when instances don't allocate dynamic __dict__ tables.",
        "vi": "Dung lượng bộ nhớ giảm rõ rệt khi các đối tượng không phải tạo bảng __dict__ động."
      }
    },
    {
      "id": "py_ex_51_5",
      "type": "problem_solving",
      "title": {
        "en": "End-to-End Financial Money Value Object & Vector Math Pipeline",
        "vi": "Quy Trình Hoàn Chỉnh Financial Money Value Object & Vector Math"
      },
      "instruction": {
        "en": "Implement the complete ETL pipeline or custom dunder value class for Financial Money Value Object & Vector Math.",
        "vi": "Triển khai đường ống ETL hoàn chỉnh hoặc lớp giá trị dunder cho Financial Money Value Object & Vector Math."
      },
      "starterCode": "# Complete domain problem solver:\nclass Money:\n    def __init__(self, amount, currency=\"USD\"):\n        self.amount = amount\n        self.currency = currency\n    def __repr__(self):\n        return f\"Money({self.amount}, '{self.currency}')\"\n    def __add__(self, other):\n        if self.currency != other.currency:\n            raise ValueError(\"Currencies must match\")\n        return Money(self.amount + other.amount, self.currency)\n\nm1 = Money(150.50)\nm2 = Money(49.50)\nm3 = m1 + m2\nprint(\"Total:\", m3)",
      "solutionCode": "class Money:\n    def __init__(self, amount, currency=\"USD\"):\n        self.amount = amount\n        self.currency = currency\n    def __repr__(self):\n        return f\"Money({self.amount}, '{self.currency}')\"\n    def __add__(self, other):\n        if self.currency != other.currency:\n            raise ValueError(\"Currencies must match\")\n        return Money(self.amount + other.amount, self.currency)\n\nm1 = Money(150.50)\nm2 = Money(49.50)\nm3 = m1 + m2\nprint(\"Total:\", m3)",
      "hint": {
        "en": "Implement __add__ and __repr__ dunder methods.",
        "vi": "Triển khai các phương thức dunder __add__ và __repr__."
      },
      "explanation": {
        "en": "Operator overloading enables intuitive domain-driven design and mathematical expressiveness.",
        "vi": "Nạp chồng toán tử giúp mã nguồn diễn đạt tự nhiên và giàu tính nghiệp vụ."
      }
    }
  ],
  "challenge": {
    "id": "py_ch_51",
    "title": {
      "en": "Transactional In-Memory Database Isolation Context Manager",
      "vi": "Context Manager Quản Lý Giao Dịch & Cô Lập Dữ Liệu Bộ Nhớ (ACID Rollback)"
    },
    "description": {
      "en": "Implement a transactional isolated sandbox for in-memory key-value data stores:\n1. class DatabaseTransaction:\n   - __init__(self, datastore: dict):\n     - store self.datastore = datastore\n     - store self.snapshot = None\n     - store self.active_tx_copy = None\n   - __enter__(self):\n     - create isolated working copy: self.active_tx_copy = dict(self.datastore)\n     - return self.active_tx_copy (bound via as target)\n   - __exit__(self, exc_type, exc_val, exc_tb):\n     - if exc_type is None:\n       - Commit phase: self.datastore.clear(); self.datastore.update(self.active_tx_copy)\n       - print(\"[TX COMMIT] Changes merged successfully\")\n       - return False\n     - else:\n       - Rollback phase: discard active_tx_copy without modifying datastore\n       - print(f\"[TX ROLLBACK] Aborted due to {exc_type.__name__}: {exc_val}\")\n       - return True  # Suppress error to demonstrate graceful recovery\n2. Test:\n   - db = {\"user\": \"Alice\", \"balance\": 500}\n   - Test Tx 1 (Successful): with DatabaseTransaction(db) as tx: tx[\"balance\"] = 700; tx[\"tier\"] = \"GOLD\"\n   - Test Tx 2 (Failing): with DatabaseTransaction(db) as tx: tx[\"balance\"] = 0; raise RuntimeError(\"Payment gateway crash\")\n   - Print final db state.\nFinal output must show db with balance 700 and tier GOLD intact.",
      "vi": "Xây dựng bộ quản lý giao dịch cô lập ACID cho cơ sở dữ liệu in-memory:\n1. Class DatabaseTransaction tạo bản sao độc lập trong __enter__\n2. Trong __exit__, nếu không có lỗi thì commit cập nhật vào database gốc\n3. Nếu có lỗi thì rollback hủy bỏ bản sao và dập tắt lỗi\n4. Chạy thử 2 giao dịch (1 thành công, 1 thất bại) và in trạng thái cuối."
    },
    "requirements": [
      {
        "en": "Implement ACID transaction semantics with isolated working copy in __enter__",
        "vi": "Triển khai ngữ nghĩa giao dịch ACID với bản sao cô lập trong __enter__"
      },
      {
        "en": "Implement commit on clean exit and automatic rollback on exception in __exit__",
        "vi": "Triển khai commit khi thoát sạch và tự động rollback khi gặp lỗi trong __exit__"
      },
      {
        "en": "Demonstrate exception suppression and non-destructive state recovery",
        "vi": "Minh họa triệt tiêu lỗi và phục hồi trạng thái không bị phá hủy"
      }
    ],
    "starterCode": "# Build Database Transaction Context Manager\n",
    "solutionCode": "class DatabaseTransaction:\n    def __init__(self, datastore: dict):\n        self.datastore = datastore\n        self.active_tx_copy = None\n\n    def __enter__(self):\n        self.active_tx_copy = dict(self.datastore)\n        return self.active_tx_copy\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        if exc_type is None:\n            self.datastore.clear()\n            self.datastore.update(self.active_tx_copy)\n            print(\"[TX COMMIT] Changes merged successfully\")\n            return False\n        else:\n            print(f\"[TX ROLLBACK] Aborted due to {exc_type.__name__}: {exc_val}\")\n            return True  # Suppress for clean recovery\n\ndb = {\"user\": \"Alice\", \"balance\": 500}\n\n# Transaction 1: Success\nwith DatabaseTransaction(db) as tx:\n    tx[\"balance\"] = 700\n    tx[\"tier\"] = \"GOLD\"\n\n# Transaction 2: Error & Rollback\nwith DatabaseTransaction(db) as tx:\n    tx[\"balance\"] = 0\n    raise RuntimeError(\"Payment gateway crash\")\n\nprint(\"Final Database State:\", db)\n",
    "hints": [
      {
        "en": "self.datastore.clear(); self.datastore.update(self.active_tx_copy)",
        "vi": "self.datastore.clear(); self.datastore.update(self.active_tx_copy)"
      }
    ],
    "solutionExplanation": {
      "en": "Demonstrates enterprise transactional ACID rollback mechanisms implemented cleanly using Python context managers.",
      "vi": "Minh họa cơ chế rollback giao dịch ACID doanh nghiệp được cài đặt tinh gọn bằng Python context manager."
    }
  },
  "quizQuestionPool": [
    {
      "id": "py_q_51_1",
      "type": "single_choice",
      "question": {
        "en": "[Dunder Magic Methods & Operator Overloading] Scenario 1: In Financial Money Value Object & Vector Math, what is the critical architectural rule for __str__?",
        "vi": "[Phương Thức Dunder & Nạp Chồng Toán Tử] Tình huống 1: Trong Financial Money Value Object & Vector Math, quy tắc kiến trúc quan trọng cho __str__ là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Dunder Magic Methods & Operator Overloading",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Phương Thức Dunder & Nạp Chồng Toán Tử"
        },
        {
          "en": "Anti-pattern blocking the event loop with synchronous sleep or causing memory leaks by missing __slots__ in subclasses",
          "vi": "Cách làm phản mẫu chặn event loop bằng hàm đồng bộ hoặc gây rò rỉ RAM do thiếu __slots__ ở lớp con"
        },
        {
          "en": "Obsolete paradigm from legacy multithreading replaced by modern asyncio",
          "vi": "Mô hình cũ đã được thay thế bằng chuẩn asyncio hiện đại"
        },
        {
          "en": "Invalid construct raising RuntimeError: cannot reuse already awaited coroutine",
          "vi": "Cú pháp không hợp lệ gây lỗi RuntimeError: cannot reuse already awaited coroutine"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Financial Money Value Object & Vector Math, properly implementing __str__ enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Financial Money Value Object & Vector Math, triển khai chuẩn __str__ cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_context_managers",
      "difficulty": "easy"
    },
    {
      "id": "py_q_51_2",
      "type": "single_choice",
      "question": {
        "en": "[Dunder Magic Methods & Operator Overloading] Scenario 2: In Financial Money Value Object & Vector Math, what is the critical architectural rule for __len__?",
        "vi": "[Phương Thức Dunder & Nạp Chồng Toán Tử] Tình huống 2: Trong Financial Money Value Object & Vector Math, quy tắc kiến trúc quan trọng cho __len__ là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Dunder Magic Methods & Operator Overloading",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Phương Thức Dunder & Nạp Chồng Toán Tử"
        },
        {
          "en": "Anti-pattern blocking the event loop with synchronous sleep or causing memory leaks by missing __slots__ in subclasses",
          "vi": "Cách làm phản mẫu chặn event loop bằng hàm đồng bộ hoặc gây rò rỉ RAM do thiếu __slots__ ở lớp con"
        },
        {
          "en": "Obsolete paradigm from legacy multithreading replaced by modern asyncio",
          "vi": "Mô hình cũ đã được thay thế bằng chuẩn asyncio hiện đại"
        },
        {
          "en": "Invalid construct raising RuntimeError: cannot reuse already awaited coroutine",
          "vi": "Cú pháp không hợp lệ gây lỗi RuntimeError: cannot reuse already awaited coroutine"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Financial Money Value Object & Vector Math, properly implementing __len__ enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Financial Money Value Object & Vector Math, triển khai chuẩn __len__ cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_context_managers",
      "difficulty": "medium"
    },
    {
      "id": "py_q_51_3",
      "type": "single_choice",
      "question": {
        "en": "[Dunder Magic Methods & Operator Overloading] Scenario 3: In Financial Money Value Object & Vector Math, what is the critical architectural rule for __getitem__?",
        "vi": "[Phương Thức Dunder & Nạp Chồng Toán Tử] Tình huống 3: Trong Financial Money Value Object & Vector Math, quy tắc kiến trúc quan trọng cho __getitem__ là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Dunder Magic Methods & Operator Overloading",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Phương Thức Dunder & Nạp Chồng Toán Tử"
        },
        {
          "en": "Anti-pattern blocking the event loop with synchronous sleep or causing memory leaks by missing __slots__ in subclasses",
          "vi": "Cách làm phản mẫu chặn event loop bằng hàm đồng bộ hoặc gây rò rỉ RAM do thiếu __slots__ ở lớp con"
        },
        {
          "en": "Obsolete paradigm from legacy multithreading replaced by modern asyncio",
          "vi": "Mô hình cũ đã được thay thế bằng chuẩn asyncio hiện đại"
        },
        {
          "en": "Invalid construct raising RuntimeError: cannot reuse already awaited coroutine",
          "vi": "Cú pháp không hợp lệ gây lỗi RuntimeError: cannot reuse already awaited coroutine"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Financial Money Value Object & Vector Math, properly implementing __getitem__ enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Financial Money Value Object & Vector Math, triển khai chuẩn __getitem__ cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_context_managers",
      "difficulty": "hard"
    },
    {
      "id": "py_q_51_4",
      "type": "single_choice",
      "question": {
        "en": "[Dunder Magic Methods & Operator Overloading] Scenario 4: In Financial Money Value Object & Vector Math, what is the critical architectural rule for __eq__?",
        "vi": "[Phương Thức Dunder & Nạp Chồng Toán Tử] Tình huống 4: Trong Financial Money Value Object & Vector Math, quy tắc kiến trúc quan trọng cho __eq__ là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Dunder Magic Methods & Operator Overloading",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Phương Thức Dunder & Nạp Chồng Toán Tử"
        },
        {
          "en": "Anti-pattern blocking the event loop with synchronous sleep or causing memory leaks by missing __slots__ in subclasses",
          "vi": "Cách làm phản mẫu chặn event loop bằng hàm đồng bộ hoặc gây rò rỉ RAM do thiếu __slots__ ở lớp con"
        },
        {
          "en": "Obsolete paradigm from legacy multithreading replaced by modern asyncio",
          "vi": "Mô hình cũ đã được thay thế bằng chuẩn asyncio hiện đại"
        },
        {
          "en": "Invalid construct raising RuntimeError: cannot reuse already awaited coroutine",
          "vi": "Cú pháp không hợp lệ gây lỗi RuntimeError: cannot reuse already awaited coroutine"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Financial Money Value Object & Vector Math, properly implementing __eq__ enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Financial Money Value Object & Vector Math, triển khai chuẩn __eq__ cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_context_managers",
      "difficulty": "medium"
    },
    {
      "id": "py_q_51_5",
      "type": "single_choice",
      "question": {
        "en": "[Dunder Magic Methods & Operator Overloading] Scenario 5: In Financial Money Value Object & Vector Math, what is the critical architectural rule for __hash__?",
        "vi": "[Phương Thức Dunder & Nạp Chồng Toán Tử] Tình huống 5: Trong Financial Money Value Object & Vector Math, quy tắc kiến trúc quan trọng cho __hash__ là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Dunder Magic Methods & Operator Overloading",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Phương Thức Dunder & Nạp Chồng Toán Tử"
        },
        {
          "en": "Anti-pattern blocking the event loop with synchronous sleep or causing memory leaks by missing __slots__ in subclasses",
          "vi": "Cách làm phản mẫu chặn event loop bằng hàm đồng bộ hoặc gây rò rỉ RAM do thiếu __slots__ ở lớp con"
        },
        {
          "en": "Obsolete paradigm from legacy multithreading replaced by modern asyncio",
          "vi": "Mô hình cũ đã được thay thế bằng chuẩn asyncio hiện đại"
        },
        {
          "en": "Invalid construct raising RuntimeError: cannot reuse already awaited coroutine",
          "vi": "Cú pháp không hợp lệ gây lỗi RuntimeError: cannot reuse already awaited coroutine"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Financial Money Value Object & Vector Math, properly implementing __hash__ enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Financial Money Value Object & Vector Math, triển khai chuẩn __hash__ cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_context_managers",
      "difficulty": "easy"
    },
    {
      "id": "py_q_51_6",
      "type": "single_choice",
      "question": {
        "en": "[Dunder Magic Methods & Operator Overloading] Scenario 6: In Financial Money Value Object & Vector Math, what is the critical architectural rule for __add__ operator overloading?",
        "vi": "[Phương Thức Dunder & Nạp Chồng Toán Tử] Tình huống 6: Trong Financial Money Value Object & Vector Math, quy tắc kiến trúc quan trọng cho __add__ operator overloading là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Dunder Magic Methods & Operator Overloading",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Phương Thức Dunder & Nạp Chồng Toán Tử"
        },
        {
          "en": "Anti-pattern blocking the event loop with synchronous sleep or causing memory leaks by missing __slots__ in subclasses",
          "vi": "Cách làm phản mẫu chặn event loop bằng hàm đồng bộ hoặc gây rò rỉ RAM do thiếu __slots__ ở lớp con"
        },
        {
          "en": "Obsolete paradigm from legacy multithreading replaced by modern asyncio",
          "vi": "Mô hình cũ đã được thay thế bằng chuẩn asyncio hiện đại"
        },
        {
          "en": "Invalid construct raising RuntimeError: cannot reuse already awaited coroutine",
          "vi": "Cú pháp không hợp lệ gây lỗi RuntimeError: cannot reuse already awaited coroutine"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Financial Money Value Object & Vector Math, properly implementing __add__ operator overloading enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Financial Money Value Object & Vector Math, triển khai chuẩn __add__ operator overloading cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_context_managers",
      "difficulty": "hard"
    },
    {
      "id": "py_q_51_7",
      "type": "single_choice",
      "question": {
        "en": "[Dunder Magic Methods & Operator Overloading] Scenario 7: In Financial Money Value Object & Vector Math, what is the critical architectural rule for __repr__?",
        "vi": "[Phương Thức Dunder & Nạp Chồng Toán Tử] Tình huống 7: Trong Financial Money Value Object & Vector Math, quy tắc kiến trúc quan trọng cho __repr__ là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Dunder Magic Methods & Operator Overloading",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Phương Thức Dunder & Nạp Chồng Toán Tử"
        },
        {
          "en": "Anti-pattern blocking the event loop with synchronous sleep or causing memory leaks by missing __slots__ in subclasses",
          "vi": "Cách làm phản mẫu chặn event loop bằng hàm đồng bộ hoặc gây rò rỉ RAM do thiếu __slots__ ở lớp con"
        },
        {
          "en": "Obsolete paradigm from legacy multithreading replaced by modern asyncio",
          "vi": "Mô hình cũ đã được thay thế bằng chuẩn asyncio hiện đại"
        },
        {
          "en": "Invalid construct raising RuntimeError: cannot reuse already awaited coroutine",
          "vi": "Cú pháp không hợp lệ gây lỗi RuntimeError: cannot reuse already awaited coroutine"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Financial Money Value Object & Vector Math, properly implementing __repr__ enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Financial Money Value Object & Vector Math, triển khai chuẩn __repr__ cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_context_managers",
      "difficulty": "easy"
    },
    {
      "id": "py_q_51_8",
      "type": "single_choice",
      "question": {
        "en": "[Dunder Magic Methods & Operator Overloading] Scenario 8: In Financial Money Value Object & Vector Math, what is the critical architectural rule for __str__?",
        "vi": "[Phương Thức Dunder & Nạp Chồng Toán Tử] Tình huống 8: Trong Financial Money Value Object & Vector Math, quy tắc kiến trúc quan trọng cho __str__ là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Dunder Magic Methods & Operator Overloading",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Phương Thức Dunder & Nạp Chồng Toán Tử"
        },
        {
          "en": "Anti-pattern blocking the event loop with synchronous sleep or causing memory leaks by missing __slots__ in subclasses",
          "vi": "Cách làm phản mẫu chặn event loop bằng hàm đồng bộ hoặc gây rò rỉ RAM do thiếu __slots__ ở lớp con"
        },
        {
          "en": "Obsolete paradigm from legacy multithreading replaced by modern asyncio",
          "vi": "Mô hình cũ đã được thay thế bằng chuẩn asyncio hiện đại"
        },
        {
          "en": "Invalid construct raising RuntimeError: cannot reuse already awaited coroutine",
          "vi": "Cú pháp không hợp lệ gây lỗi RuntimeError: cannot reuse already awaited coroutine"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Financial Money Value Object & Vector Math, properly implementing __str__ enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Financial Money Value Object & Vector Math, triển khai chuẩn __str__ cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_context_managers",
      "difficulty": "medium"
    },
    {
      "id": "py_q_51_9",
      "type": "single_choice",
      "question": {
        "en": "[Dunder Magic Methods & Operator Overloading] Scenario 9: In Financial Money Value Object & Vector Math, what is the critical architectural rule for __len__?",
        "vi": "[Phương Thức Dunder & Nạp Chồng Toán Tử] Tình huống 9: Trong Financial Money Value Object & Vector Math, quy tắc kiến trúc quan trọng cho __len__ là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Dunder Magic Methods & Operator Overloading",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Phương Thức Dunder & Nạp Chồng Toán Tử"
        },
        {
          "en": "Anti-pattern blocking the event loop with synchronous sleep or causing memory leaks by missing __slots__ in subclasses",
          "vi": "Cách làm phản mẫu chặn event loop bằng hàm đồng bộ hoặc gây rò rỉ RAM do thiếu __slots__ ở lớp con"
        },
        {
          "en": "Obsolete paradigm from legacy multithreading replaced by modern asyncio",
          "vi": "Mô hình cũ đã được thay thế bằng chuẩn asyncio hiện đại"
        },
        {
          "en": "Invalid construct raising RuntimeError: cannot reuse already awaited coroutine",
          "vi": "Cú pháp không hợp lệ gây lỗi RuntimeError: cannot reuse already awaited coroutine"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Financial Money Value Object & Vector Math, properly implementing __len__ enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Financial Money Value Object & Vector Math, triển khai chuẩn __len__ cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_context_managers",
      "difficulty": "hard"
    },
    {
      "id": "py_q_51_10",
      "type": "single_choice",
      "question": {
        "en": "[Dunder Magic Methods & Operator Overloading] Scenario 10: In Financial Money Value Object & Vector Math, what is the critical architectural rule for __getitem__?",
        "vi": "[Phương Thức Dunder & Nạp Chồng Toán Tử] Tình huống 10: Trong Financial Money Value Object & Vector Math, quy tắc kiến trúc quan trọng cho __getitem__ là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Dunder Magic Methods & Operator Overloading",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Phương Thức Dunder & Nạp Chồng Toán Tử"
        },
        {
          "en": "Anti-pattern blocking the event loop with synchronous sleep or causing memory leaks by missing __slots__ in subclasses",
          "vi": "Cách làm phản mẫu chặn event loop bằng hàm đồng bộ hoặc gây rò rỉ RAM do thiếu __slots__ ở lớp con"
        },
        {
          "en": "Obsolete paradigm from legacy multithreading replaced by modern asyncio",
          "vi": "Mô hình cũ đã được thay thế bằng chuẩn asyncio hiện đại"
        },
        {
          "en": "Invalid construct raising RuntimeError: cannot reuse already awaited coroutine",
          "vi": "Cú pháp không hợp lệ gây lỗi RuntimeError: cannot reuse already awaited coroutine"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Financial Money Value Object & Vector Math, properly implementing __getitem__ enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Financial Money Value Object & Vector Math, triển khai chuẩn __getitem__ cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_context_managers",
      "difficulty": "medium"
    },
    {
      "id": "py_q_51_11",
      "type": "single_choice",
      "question": {
        "en": "[Dunder Magic Methods & Operator Overloading] Scenario 11: In Financial Money Value Object & Vector Math, what is the critical architectural rule for __eq__?",
        "vi": "[Phương Thức Dunder & Nạp Chồng Toán Tử] Tình huống 11: Trong Financial Money Value Object & Vector Math, quy tắc kiến trúc quan trọng cho __eq__ là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Dunder Magic Methods & Operator Overloading",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Phương Thức Dunder & Nạp Chồng Toán Tử"
        },
        {
          "en": "Anti-pattern blocking the event loop with synchronous sleep or causing memory leaks by missing __slots__ in subclasses",
          "vi": "Cách làm phản mẫu chặn event loop bằng hàm đồng bộ hoặc gây rò rỉ RAM do thiếu __slots__ ở lớp con"
        },
        {
          "en": "Obsolete paradigm from legacy multithreading replaced by modern asyncio",
          "vi": "Mô hình cũ đã được thay thế bằng chuẩn asyncio hiện đại"
        },
        {
          "en": "Invalid construct raising RuntimeError: cannot reuse already awaited coroutine",
          "vi": "Cú pháp không hợp lệ gây lỗi RuntimeError: cannot reuse already awaited coroutine"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Financial Money Value Object & Vector Math, properly implementing __eq__ enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Financial Money Value Object & Vector Math, triển khai chuẩn __eq__ cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_context_managers",
      "difficulty": "easy"
    },
    {
      "id": "py_q_51_12",
      "type": "single_choice",
      "question": {
        "en": "[Dunder Magic Methods & Operator Overloading] Scenario 12: In Financial Money Value Object & Vector Math, what is the critical architectural rule for __hash__?",
        "vi": "[Phương Thức Dunder & Nạp Chồng Toán Tử] Tình huống 12: Trong Financial Money Value Object & Vector Math, quy tắc kiến trúc quan trọng cho __hash__ là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Dunder Magic Methods & Operator Overloading",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Phương Thức Dunder & Nạp Chồng Toán Tử"
        },
        {
          "en": "Anti-pattern blocking the event loop with synchronous sleep or causing memory leaks by missing __slots__ in subclasses",
          "vi": "Cách làm phản mẫu chặn event loop bằng hàm đồng bộ hoặc gây rò rỉ RAM do thiếu __slots__ ở lớp con"
        },
        {
          "en": "Obsolete paradigm from legacy multithreading replaced by modern asyncio",
          "vi": "Mô hình cũ đã được thay thế bằng chuẩn asyncio hiện đại"
        },
        {
          "en": "Invalid construct raising RuntimeError: cannot reuse already awaited coroutine",
          "vi": "Cú pháp không hợp lệ gây lỗi RuntimeError: cannot reuse already awaited coroutine"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Financial Money Value Object & Vector Math, properly implementing __hash__ enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Financial Money Value Object & Vector Math, triển khai chuẩn __hash__ cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_context_managers",
      "difficulty": "hard"
    },
    {
      "id": "py_q_51_13",
      "type": "single_choice",
      "question": {
        "en": "[Dunder Magic Methods & Operator Overloading] Scenario 13: In Financial Money Value Object & Vector Math, what is the critical architectural rule for __add__ operator overloading?",
        "vi": "[Phương Thức Dunder & Nạp Chồng Toán Tử] Tình huống 13: Trong Financial Money Value Object & Vector Math, quy tắc kiến trúc quan trọng cho __add__ operator overloading là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Dunder Magic Methods & Operator Overloading",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Phương Thức Dunder & Nạp Chồng Toán Tử"
        },
        {
          "en": "Anti-pattern blocking the event loop with synchronous sleep or causing memory leaks by missing __slots__ in subclasses",
          "vi": "Cách làm phản mẫu chặn event loop bằng hàm đồng bộ hoặc gây rò rỉ RAM do thiếu __slots__ ở lớp con"
        },
        {
          "en": "Obsolete paradigm from legacy multithreading replaced by modern asyncio",
          "vi": "Mô hình cũ đã được thay thế bằng chuẩn asyncio hiện đại"
        },
        {
          "en": "Invalid construct raising RuntimeError: cannot reuse already awaited coroutine",
          "vi": "Cú pháp không hợp lệ gây lỗi RuntimeError: cannot reuse already awaited coroutine"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Financial Money Value Object & Vector Math, properly implementing __add__ operator overloading enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Financial Money Value Object & Vector Math, triển khai chuẩn __add__ operator overloading cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_context_managers",
      "difficulty": "easy"
    },
    {
      "id": "py_q_51_14",
      "type": "single_choice",
      "question": {
        "en": "[Dunder Magic Methods & Operator Overloading] Scenario 14: In Financial Money Value Object & Vector Math, what is the critical architectural rule for __repr__?",
        "vi": "[Phương Thức Dunder & Nạp Chồng Toán Tử] Tình huống 14: Trong Financial Money Value Object & Vector Math, quy tắc kiến trúc quan trọng cho __repr__ là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Dunder Magic Methods & Operator Overloading",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Phương Thức Dunder & Nạp Chồng Toán Tử"
        },
        {
          "en": "Anti-pattern blocking the event loop with synchronous sleep or causing memory leaks by missing __slots__ in subclasses",
          "vi": "Cách làm phản mẫu chặn event loop bằng hàm đồng bộ hoặc gây rò rỉ RAM do thiếu __slots__ ở lớp con"
        },
        {
          "en": "Obsolete paradigm from legacy multithreading replaced by modern asyncio",
          "vi": "Mô hình cũ đã được thay thế bằng chuẩn asyncio hiện đại"
        },
        {
          "en": "Invalid construct raising RuntimeError: cannot reuse already awaited coroutine",
          "vi": "Cú pháp không hợp lệ gây lỗi RuntimeError: cannot reuse already awaited coroutine"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Financial Money Value Object & Vector Math, properly implementing __repr__ enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Financial Money Value Object & Vector Math, triển khai chuẩn __repr__ cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_context_managers",
      "difficulty": "medium"
    },
    {
      "id": "py_q_51_15",
      "type": "single_choice",
      "question": {
        "en": "[Dunder Magic Methods & Operator Overloading] Scenario 15: In Financial Money Value Object & Vector Math, what is the critical architectural rule for __str__?",
        "vi": "[Phương Thức Dunder & Nạp Chồng Toán Tử] Tình huống 15: Trong Financial Money Value Object & Vector Math, quy tắc kiến trúc quan trọng cho __str__ là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Dunder Magic Methods & Operator Overloading",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Phương Thức Dunder & Nạp Chồng Toán Tử"
        },
        {
          "en": "Anti-pattern blocking the event loop with synchronous sleep or causing memory leaks by missing __slots__ in subclasses",
          "vi": "Cách làm phản mẫu chặn event loop bằng hàm đồng bộ hoặc gây rò rỉ RAM do thiếu __slots__ ở lớp con"
        },
        {
          "en": "Obsolete paradigm from legacy multithreading replaced by modern asyncio",
          "vi": "Mô hình cũ đã được thay thế bằng chuẩn asyncio hiện đại"
        },
        {
          "en": "Invalid construct raising RuntimeError: cannot reuse already awaited coroutine",
          "vi": "Cú pháp không hợp lệ gây lỗi RuntimeError: cannot reuse already awaited coroutine"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Financial Money Value Object & Vector Math, properly implementing __str__ enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Financial Money Value Object & Vector Math, triển khai chuẩn __str__ cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_context_managers",
      "difficulty": "hard"
    },
    {
      "id": "py_q_51_16",
      "type": "single_choice",
      "question": {
        "en": "[Dunder Magic Methods & Operator Overloading] Scenario 16: In Financial Money Value Object & Vector Math, what is the critical architectural rule for __len__?",
        "vi": "[Phương Thức Dunder & Nạp Chồng Toán Tử] Tình huống 16: Trong Financial Money Value Object & Vector Math, quy tắc kiến trúc quan trọng cho __len__ là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Dunder Magic Methods & Operator Overloading",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Phương Thức Dunder & Nạp Chồng Toán Tử"
        },
        {
          "en": "Anti-pattern blocking the event loop with synchronous sleep or causing memory leaks by missing __slots__ in subclasses",
          "vi": "Cách làm phản mẫu chặn event loop bằng hàm đồng bộ hoặc gây rò rỉ RAM do thiếu __slots__ ở lớp con"
        },
        {
          "en": "Obsolete paradigm from legacy multithreading replaced by modern asyncio",
          "vi": "Mô hình cũ đã được thay thế bằng chuẩn asyncio hiện đại"
        },
        {
          "en": "Invalid construct raising RuntimeError: cannot reuse already awaited coroutine",
          "vi": "Cú pháp không hợp lệ gây lỗi RuntimeError: cannot reuse already awaited coroutine"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Financial Money Value Object & Vector Math, properly implementing __len__ enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Financial Money Value Object & Vector Math, triển khai chuẩn __len__ cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_context_managers",
      "difficulty": "medium"
    }
  ]
};

export default lesson30;
