import { Lesson } from '../../../../types';

export const lesson32: Lesson = {
  "id": "py_lesson_32",
  "moduleId": "py_mod_13",
  "levelId": "advanced",
  "courseId": "python",
  "order": 32,
  "topicId": "python_asyncio_fundamentals",
  "title": {
    "en": "Asynchronous Programming: asyncio Event Loop, async & await",
    "vi": "Lập Trình Bất Đồng Bộ: asyncio Event Loop, async & await"
  },
  "summary": {
    "en": "Master asynchronous single-threaded concurrency with Python's asyncio: the cooperative event loop architecture, async def coroutines, non-blocking I/O with await, asyncio.run(), and asyncio.sleep().",
    "vi": "Làm chủ xử lý đồng thời đơn luồng bất đồng bộ với asyncio trong Python: kiến trúc vòng lặp sự kiện hợp tác (event loop), coroutine async def, I/O không chặn với await, asyncio.run() và asyncio.sleep()."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "Traditional synchronous code blocks execution while waiting for network requests, database queries, or disk I/O. Python's asyncio module introduces single-threaded cooperative multitasking, enabling thousands of concurrent operations on an Event Loop without thread overhead.",
      "vi": "Mã đồng bộ truyền thống sẽ chặn luồng thực thi trong khi chờ phản hồi từ mạng, truy vấn cơ sở dữ liệu hoặc đọc ghi ổ đĩa. Module asyncio của Python mang đến mô hình đa nhiệm hợp tác đơn luồng, cho phép xử lý hàng ngàn tác vụ đồng thời trên một Event Loop duy nhất mà không tốn chi phí quản lý luồng thread."
    },
    "conceptExplanation": {
      "en": "Asyncio Core Concepts:\n1. The Event Loop: The central scheduler managing and executing cooperative tasks.\n2. async def: Defines a coroutine function. Calling it does NOT run the code; it returns a coroutine object.\n3. await: Suspends the current coroutine until the awaited awaitable completes, yielding control back to the event loop to execute other tasks in the meantime.\n4. asyncio.run(coro): The canonical top-level entry point initializing a new event loop and executing the main coroutine to completion.\n5. Non-Blocking Delay: asyncio.sleep(seconds) yields execution without blocking the CPU. \n\n**Resilient Asyncio Execution Patterns:**\n1. **Timeouts:** `await asyncio.wait_for(task, timeout=2.0)` raises `asyncio.TimeoutError` if task exceeds time.\n2. **Cancellation:** Calling `task.cancel()` raises `asyncio.CancelledError` inside the coroutine. Always use `try...finally` to cleanly release database connections, sockets, and locks.\n3. **Batch Resilience:** `await asyncio.gather(*tasks, return_exceptions=True)` prevents a single failing task from cancelling sibling tasks; failed tasks return their Exception object in the results list.",
      "vi": "Các Khái Niệm Cốt Lõi Về Asyncio:\n1. Event Loop (Vòng Lặp Sự Kiện): Bộ điều phối trung tâm quản lý và thực thi các tác vụ hợp tác.\n2. async def: Định nghĩa một hàm coroutine. Gọi hàm này KHÔNG thực thi code ngay; nó trả về một đối tượng coroutine.\n3. await: Tạm dừng coroutine hiện tại cho đến khi tác vụ được chờ hoàn thành, nhường quyền điều khiển cho event loop để chạy các tác vụ khác trong lúc chờ.\n4. asyncio.run(coro): Điểm vào thực thi cao nhất khởi tạo một event loop mới và chạy coroutine chính cho đến khi hoàn tất.\n5. Tạm dừng không chặn: asyncio.sleep(seconds) nhường quyền thực thi mà không làm đơ luồng xử lý CPU. \n\n**Mô Hình Xử Lý Asyncio Bền Vững:**\n1. **Giới Hạn Thời Gian (Timeout):** `await asyncio.wait_for(task, timeout=2.0)` sẽ ném ra `asyncio.TimeoutError` nếu tác vụ chạy quá giờ.\n2. **Hủy Tác Vụ (Cancellation):** Gọi `task.cancel()` sẽ ném ngoại lệ `asyncio.CancelledError` vào trong coroutine. Luôn dùng khối `try...finally` để đóng kết nối cơ sở dữ liệu, socket và giải phóng khóa an toàn.\n3. **Thu Thập Chịu Lỗi (Batch Resilience):** `await asyncio.gather(*tasks, return_exceptions=True)` giúp 1 tác vụ thất bại không làm hỏng các tác vụ khác trong nhóm; các tác vụ lỗi sẽ trả về đối tượng ngoại lệ trong danh sách kết quả."
    },
    "syntax": "import asyncio\n\nasync def fetch_user_data(user_id: int) -> dict:\n    print(f\"Starting fetch for user {user_id}...\")\n    await asyncio.sleep(0.01)  # Non-blocking I/O simulation\n    print(f\"Completed fetch for user {user_id}\")\n    return {\"id\": user_id, \"name\": f\"User_{user_id}\"}\n\n# Synchronous entry point runner\n# asyncio.run(fetch_user_data(101))",
    "examples": [
      {
        "title": {
          "en": "Cooperative Non-Blocking Async Microservice Call",
          "vi": "Lời Gọi Microservice Bất Đồng Bộ Hợp Tác Không Chặn"
        },
        "code": "import asyncio\n\nasync def query_database(query_id: str):\n    print(f\"[DB] Executing query {query_id}...\")\n    await asyncio.sleep(0.05)  # Yields control to loop\n    print(f\"[DB] Query {query_id} resolved\")\n    return {\"query\": query_id, \"rows\": 150}\n\nasync def main():\n    print(\"Starting async pipeline...\")\n    res = await query_database(\"SELECT_USERS_V1\")\n    print(\"Fetched Payload:\", res)\n    print(\"Async pipeline complete.\")\n\nasyncio.run(main())",
        "language": "python",
        "explanation": {
          "en": "Demonstrates defining coroutines with async def, yielding control with await, and driving execution with asyncio.run.",
          "vi": "Minh họa định nghĩa coroutine với async def, nhường quyền điều khiển với await và khởi chạy bằng asyncio.run."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Calling time.sleep() inside an async def function (blocks the entire thread and freezes all concurrent tasks on the event loop!)",
          "vi": "Gọi time.sleep() bên trong hàm async def làm chặn toàn bộ luồng và làm đơ toàn bộ các tác vụ khác trên event loop!"
        },
        "correction": {
          "en": "Always use \"await asyncio.sleep()\" inside async functions for non-blocking pauses.",
          "vi": "Luôn sử dụng \"await asyncio.sleep()\" bên trong các hàm async để tạm dừng mà không gây nghẽn."
        },
        "code": "async def worker():\n    await asyncio.sleep(1) # Correct, non-blocking"
      }
    ],
    "tips": [
      {
        "en": "Only use await inside functions declared with async def, or at top-level in modern Python interactive REPLs.",
        "vi": "Chỉ sử dụng await bên trong các hàm được khai báo với async def, hoặc ở cấp cao nhất trong terminal REPL hiện đại."
      }
    ],
    "practice": {
      "task": {
        "en": "Build Asynchronous Ping Handler",
        "vi": "Xây dựng Coroutine Ping Bất Đồng Bộ"
      },
      "instruction": {
        "en": "Import asyncio. Define async def async_ping(host): await asyncio.sleep(0.01); return f\"PONG from {host}\". Define async def main(): res = await async_ping(\"api.internal\"); print(res). Execute with asyncio.run(main()).",
        "vi": "Import asyncio. Định nghĩa async def async_ping(host) có await asyncio.sleep(0.01). Tạo hàm main chạy bằng asyncio.run và in kết quả."
      },
      "starterCode": "# Build async ping\nimport asyncio\n",
      "solutionCode": "import asyncio\n\nasync def async_ping(host):\n    await asyncio.sleep(0.01)\n    return f\"PONG from {host}\"\n\nasync def main():\n    res = await async_ping(\"api.internal\")\n    print(res)\n\nasyncio.run(main())\n",
      "expectedOutput": "PONG from api.internal",
      "requiredPatterns": [],
      "hint": {
        "en": "await async_ping(\"api.internal\")",
        "vi": "await async_ping(\"api.internal\")"
      }
    },
    "consolidationPractice": {
      "task": {
        "en": "Sequential Async Execution Pipeline",
        "vi": "Đường ống thực thi tuần tự bất đồng bộ"
      },
      "instruction": {
        "en": "Define async def step_a(): await asyncio.sleep(0.01); return \"Step A OK\". Define async def step_b(): await asyncio.sleep(0.01); return \"Step B OK\". Run in async main() and print both results.",
        "vi": "Định nghĩa 2 coroutine step_a và step_b. Chạy tuần tự trong main() và in kết quả."
      },
      "starterCode": "# Sequential async pipeline\nimport asyncio\n",
      "solutionCode": "import asyncio\n\nasync def step_a():\n    await asyncio.sleep(0.01)\n    return \"Step A OK\"\n\nasync def step_b():\n    await asyncio.sleep(0.01)\n    return \"Step B OK\"\n\nasync def main():\n    a = await step_a()\n    b = await step_b()\n    print(f\"{a} -> {b}\")\n\nasyncio.run(main())\n",
      "expectedOutput": "Step A OK -> Step B OK",
      "requiredPatterns": [],
      "hint": {
        "en": "a = await step_a(); b = await step_b()",
        "vi": "a = await step_a(); b = await step_b()"
      }
    }
  },
  "exercisePool": [
    {
      "id": "py_ex_53_1",
      "type": "write_code",
      "title": {
        "en": "Implement Async HTTP Web Scraper & Non-Blocking I/O",
        "vi": "Triển Khai Async HTTP Web Scraper & Non-Blocking I/O"
      },
      "instruction": {
        "en": "Write production-ready Python code implementing async def, await, asyncio.run(), event loop mechanics, non-blocking I/O vs blocking calls for Async HTTP Web Scraper & Non-Blocking I/O.",
        "vi": "Viết mã nguồn chuẩn doanh nghiệp áp dụng async def, await, asyncio.run(), event loop mechanics, non-blocking I/O vs blocking calls cho Async HTTP Web Scraper & Non-Blocking I/O."
      },
      "starterCode": "# Write your domain code below:\n",
      "solutionCode": "# Implementation for Asyncio Foundations: Event Loop & Coroutines\nimport asyncio\n\nasync def fetch_metric(metric_id):\n    await asyncio.sleep(0.01)\n    return f\"Metric-{metric_id}: 99.8%\"\n\nasync def main():\n    results = await asyncio.gather(\n        fetch_metric(\"CPU\"),\n        fetch_metric(\"MEM\"),\n        return_exceptions=True\n    )\n    for res in results:\n        print(\"Fetched:\", res)\n\nasyncio.run(main())",
      "hint": {
        "en": "Apply async def, await, asyncio.run(), event loop mechanics, non-blocking I/O vs blocking calls following high-performance async standards.",
        "vi": "Áp dụng async def, await, asyncio.run(), event loop mechanics, non-blocking I/O vs blocking calls theo chuẩn hiệu năng cao của asyncio."
      },
      "explanation": {
        "en": "Non-blocking concurrency and memory safety are essential for production scale.",
        "vi": "Xử lý bất đồng bộ và an toàn bộ nhớ là yếu tố then chốt cho hệ thống quy mô lớn."
      }
    },
    {
      "id": "py_ex_53_2",
      "type": "fix_code",
      "title": {
        "en": "Fix Flaw in Async HTTP Web Scraper & Non-Blocking I/O",
        "vi": "Sửa Lỗi Trong Async HTTP Web Scraper & Non-Blocking I/O"
      },
      "instruction": {
        "en": "Fix the blocking call or memory leak in Async HTTP Web Scraper & Non-Blocking I/O.",
        "vi": "Sửa lỗi chặn luồng hoặc rò rỉ bộ nhớ trong Async HTTP Web Scraper & Non-Blocking I/O."
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
      "id": "py_ex_53_3",
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
      "id": "py_ex_53_4",
      "type": "predict_output",
      "title": {
        "en": "Predict Output for Async HTTP Web Scraper & Non-Blocking I/O",
        "vi": "Dự Đoán Kết Quả Async HTTP Web Scraper & Non-Blocking I/O"
      },
      "instruction": {
        "en": "Predict and verify the execution output for the Async HTTP Web Scraper & Non-Blocking I/O component.",
        "vi": "Dự đoán và kiểm tra kết quả thực thi của Async HTTP Web Scraper & Non-Blocking I/O."
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
      "id": "py_ex_53_5",
      "type": "problem_solving",
      "title": {
        "en": "End-to-End Async HTTP Web Scraper & Non-Blocking I/O Pipeline",
        "vi": "Quy Trình Hoàn Chỉnh Async HTTP Web Scraper & Non-Blocking I/O"
      },
      "instruction": {
        "en": "Implement the complete ETL pipeline or custom dunder value class for Async HTTP Web Scraper & Non-Blocking I/O.",
        "vi": "Triển khai đường ống ETL hoàn chỉnh hoặc lớp giá trị dunder cho Async HTTP Web Scraper & Non-Blocking I/O."
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
    "id": "py_ch_53",
    "title": {
      "en": "Distributed Gateway Health Monitor with Asynchronous Polling",
      "vi": "Trình Giám Sát Sức Khỏe Cổng Phân Tán Bất Đồng Bộ Với asyncio"
    },
    "description": {
      "en": "Build an asynchronous service health checker:\n1. Define async def check_service(name: str, latency_ms: int, status_code: int):\n   - Simulates network probe: await asyncio.sleep(latency_ms / 1000.0)\n   - Returns dict: {\"service\": name, \"status\": \"UP\" if status_code == 200 else \"DOWN\", \"latency\": latency_ms}\n2. Define async def monitor_cluster():\n   - List of service specs: [(\"AuthService\", 10, 200), (\"PaymentService\", 20, 500), (\"InventoryService\", 15, 200)]\n   - Check services sequentially in order and aggregate results into a report dict: {\"total\": 3, \"up\": count_up, \"down\": count_down, \"services\": results_list}\n   - Return report\n3. In main(), run monitor_cluster() with asyncio.run() and print:\n   \"Cluster Health Report: Total 3 | Up: 2 | Down: 1\"\n   \"Services: [{'service': 'AuthService', 'status': 'UP', 'latency': 10}, ...]\".",
      "vi": "Xây dựng trình kiểm tra trạng thái sức khỏe dịch vụ mạng bất đồng bộ:\n1. Coroutine check_service mô phỏng request mạng bằng asyncio.sleep\n2. Coroutine monitor_cluster duyệt danh sách dịch vụ và tổng hợp báo cáo UP/DOWN\n3. Chạy hàm qua asyncio.run và in kết quả chính xác."
    },
    "requirements": [
      {
        "en": "Define async coroutines using async def and non-blocking await asyncio.sleep",
        "vi": "Định nghĩa coroutine bằng async def và lệnh chờ không chặn await asyncio.sleep"
      },
      {
        "en": "Coordinate sequential async multi-service execution flow",
        "vi": "Điều phối luồng thực thi bất đồng bộ tuần tự nhiều dịch vụ"
      },
      {
        "en": "Execute complete async event loop via asyncio.run",
        "vi": "Khởi chạy hoàn chỉnh toàn bộ event loop qua asyncio.run"
      }
    ],
    "starterCode": "# Build Async Service Monitor\nimport asyncio\n",
    "solutionCode": "import asyncio\n\nasync def check_service(name: str, latency_ms: int, status_code: int):\n    await asyncio.sleep(latency_ms / 1000.0)\n    return {\n        \"service\": name,\n        \"status\": \"UP\" if status_code == 200 else \"DOWN\",\n        \"latency\": latency_ms\n    }\n\nasync def monitor_cluster():\n    services_to_test = [\n        (\"AuthService\", 10, 200),\n        (\"PaymentService\", 20, 500),\n        (\"InventoryService\", 15, 200)\n    ]\n    results = []\n    for name, lat, code in services_to_test:\n        res = await check_service(name, lat, code)\n        results.append(res)\n\n    up_count = sum(1 for r in results if r[\"status\"] == \"UP\")\n    down_count = sum(1 for r in results if r[\"status\"] == \"DOWN\")\n    return {\n        \"total\": len(results),\n        \"up\": up_count,\n        \"down\": down_count,\n        \"services\": results\n    }\n\nasync def main():\n    report = await monitor_cluster()\n    print(f\"Cluster Health Report: Total {report['total']} | Up: {report['up']} | Down: {report['down']}\")\n    print(f\"Services: {report['services']}\")\n\nasyncio.run(main())\n",
    "hints": [
      {
        "en": "res = await check_service(name, lat, code)",
        "vi": "res = await check_service(name, lat, code)"
      }
    ],
    "solutionExplanation": {
      "en": "Demonstrates building clean async services with structured coroutine delegation and non-blocking I/O simulations.",
      "vi": "Minh họa xây dựng dịch vụ async chuẩn mực với ủy quyền coroutine có cấu trúc và mô phỏng I/O không chặn."
    }
  },
  "quizQuestionPool": [
    {
      "id": "py_q_53_1",
      "type": "single_choice",
      "question": {
        "en": "[Asyncio Foundations: Event Loop & Coroutines] Scenario 1: In Async HTTP Web Scraper & Non-Blocking I/O, what is the critical architectural rule for await?",
        "vi": "[Nền Tảng Asyncio: Event Loop & Coroutine] Tình huống 1: Trong Async HTTP Web Scraper & Non-Blocking I/O, quy tắc kiến trúc quan trọng cho await là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Asyncio Foundations: Event Loop & Coroutines",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Nền Tảng Asyncio: Event Loop & Coroutine"
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
        "en": "In Async HTTP Web Scraper & Non-Blocking I/O, properly implementing await enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Async HTTP Web Scraper & Non-Blocking I/O, triển khai chuẩn await cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_fundamentals",
      "difficulty": "easy"
    },
    {
      "id": "py_q_53_2",
      "type": "single_choice",
      "question": {
        "en": "[Asyncio Foundations: Event Loop & Coroutines] Scenario 2: In Async HTTP Web Scraper & Non-Blocking I/O, what is the critical architectural rule for asyncio.run()?",
        "vi": "[Nền Tảng Asyncio: Event Loop & Coroutine] Tình huống 2: Trong Async HTTP Web Scraper & Non-Blocking I/O, quy tắc kiến trúc quan trọng cho asyncio.run() là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Asyncio Foundations: Event Loop & Coroutines",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Nền Tảng Asyncio: Event Loop & Coroutine"
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
        "en": "In Async HTTP Web Scraper & Non-Blocking I/O, properly implementing asyncio.run() enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Async HTTP Web Scraper & Non-Blocking I/O, triển khai chuẩn asyncio.run() cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_fundamentals",
      "difficulty": "medium"
    },
    {
      "id": "py_q_53_3",
      "type": "single_choice",
      "question": {
        "en": "[Asyncio Foundations: Event Loop & Coroutines] Scenario 3: In Async HTTP Web Scraper & Non-Blocking I/O, what is the critical architectural rule for event loop mechanics?",
        "vi": "[Nền Tảng Asyncio: Event Loop & Coroutine] Tình huống 3: Trong Async HTTP Web Scraper & Non-Blocking I/O, quy tắc kiến trúc quan trọng cho event loop mechanics là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Asyncio Foundations: Event Loop & Coroutines",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Nền Tảng Asyncio: Event Loop & Coroutine"
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
        "en": "In Async HTTP Web Scraper & Non-Blocking I/O, properly implementing event loop mechanics enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Async HTTP Web Scraper & Non-Blocking I/O, triển khai chuẩn event loop mechanics cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_fundamentals",
      "difficulty": "hard"
    },
    {
      "id": "py_q_53_4",
      "type": "single_choice",
      "question": {
        "en": "[Asyncio Foundations: Event Loop & Coroutines] Scenario 4: In Async HTTP Web Scraper & Non-Blocking I/O, what is the critical architectural rule for non-blocking I/O vs blocking calls?",
        "vi": "[Nền Tảng Asyncio: Event Loop & Coroutine] Tình huống 4: Trong Async HTTP Web Scraper & Non-Blocking I/O, quy tắc kiến trúc quan trọng cho non-blocking I/O vs blocking calls là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Asyncio Foundations: Event Loop & Coroutines",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Nền Tảng Asyncio: Event Loop & Coroutine"
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
        "en": "In Async HTTP Web Scraper & Non-Blocking I/O, properly implementing non-blocking I/O vs blocking calls enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Async HTTP Web Scraper & Non-Blocking I/O, triển khai chuẩn non-blocking I/O vs blocking calls cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_fundamentals",
      "difficulty": "medium"
    },
    {
      "id": "py_q_53_5",
      "type": "single_choice",
      "question": {
        "en": "[Asyncio Foundations: Event Loop & Coroutines] Scenario 5: In Async HTTP Web Scraper & Non-Blocking I/O, what is the critical architectural rule for async def?",
        "vi": "[Nền Tảng Asyncio: Event Loop & Coroutine] Tình huống 5: Trong Async HTTP Web Scraper & Non-Blocking I/O, quy tắc kiến trúc quan trọng cho async def là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Asyncio Foundations: Event Loop & Coroutines",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Nền Tảng Asyncio: Event Loop & Coroutine"
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
        "en": "In Async HTTP Web Scraper & Non-Blocking I/O, properly implementing async def enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Async HTTP Web Scraper & Non-Blocking I/O, triển khai chuẩn async def cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_fundamentals",
      "difficulty": "easy"
    },
    {
      "id": "py_q_53_6",
      "type": "single_choice",
      "question": {
        "en": "[Asyncio Foundations: Event Loop & Coroutines] Scenario 6: In Async HTTP Web Scraper & Non-Blocking I/O, what is the critical architectural rule for await?",
        "vi": "[Nền Tảng Asyncio: Event Loop & Coroutine] Tình huống 6: Trong Async HTTP Web Scraper & Non-Blocking I/O, quy tắc kiến trúc quan trọng cho await là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Asyncio Foundations: Event Loop & Coroutines",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Nền Tảng Asyncio: Event Loop & Coroutine"
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
        "en": "In Async HTTP Web Scraper & Non-Blocking I/O, properly implementing await enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Async HTTP Web Scraper & Non-Blocking I/O, triển khai chuẩn await cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_fundamentals",
      "difficulty": "hard"
    },
    {
      "id": "py_q_53_7",
      "type": "single_choice",
      "question": {
        "en": "[Asyncio Foundations: Event Loop & Coroutines] Scenario 7: In Async HTTP Web Scraper & Non-Blocking I/O, what is the critical architectural rule for asyncio.run()?",
        "vi": "[Nền Tảng Asyncio: Event Loop & Coroutine] Tình huống 7: Trong Async HTTP Web Scraper & Non-Blocking I/O, quy tắc kiến trúc quan trọng cho asyncio.run() là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Asyncio Foundations: Event Loop & Coroutines",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Nền Tảng Asyncio: Event Loop & Coroutine"
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
        "en": "In Async HTTP Web Scraper & Non-Blocking I/O, properly implementing asyncio.run() enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Async HTTP Web Scraper & Non-Blocking I/O, triển khai chuẩn asyncio.run() cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_fundamentals",
      "difficulty": "easy"
    },
    {
      "id": "py_q_53_8",
      "type": "single_choice",
      "question": {
        "en": "[Asyncio Foundations: Event Loop & Coroutines] Scenario 8: In Async HTTP Web Scraper & Non-Blocking I/O, what is the critical architectural rule for event loop mechanics?",
        "vi": "[Nền Tảng Asyncio: Event Loop & Coroutine] Tình huống 8: Trong Async HTTP Web Scraper & Non-Blocking I/O, quy tắc kiến trúc quan trọng cho event loop mechanics là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Asyncio Foundations: Event Loop & Coroutines",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Nền Tảng Asyncio: Event Loop & Coroutine"
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
        "en": "In Async HTTP Web Scraper & Non-Blocking I/O, properly implementing event loop mechanics enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Async HTTP Web Scraper & Non-Blocking I/O, triển khai chuẩn event loop mechanics cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_fundamentals",
      "difficulty": "medium"
    },
    {
      "id": "py_q_53_9",
      "type": "single_choice",
      "question": {
        "en": "[Asyncio Foundations: Event Loop & Coroutines] Scenario 9: In Async HTTP Web Scraper & Non-Blocking I/O, what is the critical architectural rule for non-blocking I/O vs blocking calls?",
        "vi": "[Nền Tảng Asyncio: Event Loop & Coroutine] Tình huống 9: Trong Async HTTP Web Scraper & Non-Blocking I/O, quy tắc kiến trúc quan trọng cho non-blocking I/O vs blocking calls là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Asyncio Foundations: Event Loop & Coroutines",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Nền Tảng Asyncio: Event Loop & Coroutine"
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
        "en": "In Async HTTP Web Scraper & Non-Blocking I/O, properly implementing non-blocking I/O vs blocking calls enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Async HTTP Web Scraper & Non-Blocking I/O, triển khai chuẩn non-blocking I/O vs blocking calls cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_fundamentals",
      "difficulty": "hard"
    },
    {
      "id": "py_q_53_10",
      "type": "single_choice",
      "question": {
        "en": "[Asyncio Foundations: Event Loop & Coroutines] Scenario 10: In Async HTTP Web Scraper & Non-Blocking I/O, what is the critical architectural rule for async def?",
        "vi": "[Nền Tảng Asyncio: Event Loop & Coroutine] Tình huống 10: Trong Async HTTP Web Scraper & Non-Blocking I/O, quy tắc kiến trúc quan trọng cho async def là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Asyncio Foundations: Event Loop & Coroutines",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Nền Tảng Asyncio: Event Loop & Coroutine"
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
        "en": "In Async HTTP Web Scraper & Non-Blocking I/O, properly implementing async def enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Async HTTP Web Scraper & Non-Blocking I/O, triển khai chuẩn async def cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_fundamentals",
      "difficulty": "medium"
    },
    {
      "id": "py_q_53_11",
      "type": "single_choice",
      "question": {
        "en": "[Asyncio Foundations: Event Loop & Coroutines] Scenario 11: In Async HTTP Web Scraper & Non-Blocking I/O, what is the critical architectural rule for await?",
        "vi": "[Nền Tảng Asyncio: Event Loop & Coroutine] Tình huống 11: Trong Async HTTP Web Scraper & Non-Blocking I/O, quy tắc kiến trúc quan trọng cho await là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Asyncio Foundations: Event Loop & Coroutines",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Nền Tảng Asyncio: Event Loop & Coroutine"
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
        "en": "In Async HTTP Web Scraper & Non-Blocking I/O, properly implementing await enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Async HTTP Web Scraper & Non-Blocking I/O, triển khai chuẩn await cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_fundamentals",
      "difficulty": "easy"
    },
    {
      "id": "py_q_53_12",
      "type": "single_choice",
      "question": {
        "en": "[Asyncio Foundations: Event Loop & Coroutines] Scenario 12: In Async HTTP Web Scraper & Non-Blocking I/O, what is the critical architectural rule for asyncio.run()?",
        "vi": "[Nền Tảng Asyncio: Event Loop & Coroutine] Tình huống 12: Trong Async HTTP Web Scraper & Non-Blocking I/O, quy tắc kiến trúc quan trọng cho asyncio.run() là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Asyncio Foundations: Event Loop & Coroutines",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Nền Tảng Asyncio: Event Loop & Coroutine"
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
        "en": "In Async HTTP Web Scraper & Non-Blocking I/O, properly implementing asyncio.run() enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Async HTTP Web Scraper & Non-Blocking I/O, triển khai chuẩn asyncio.run() cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_fundamentals",
      "difficulty": "hard"
    },
    {
      "id": "py_q_53_13",
      "type": "single_choice",
      "question": {
        "en": "[Asyncio Foundations: Event Loop & Coroutines] Scenario 13: In Async HTTP Web Scraper & Non-Blocking I/O, what is the critical architectural rule for event loop mechanics?",
        "vi": "[Nền Tảng Asyncio: Event Loop & Coroutine] Tình huống 13: Trong Async HTTP Web Scraper & Non-Blocking I/O, quy tắc kiến trúc quan trọng cho event loop mechanics là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Asyncio Foundations: Event Loop & Coroutines",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Nền Tảng Asyncio: Event Loop & Coroutine"
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
        "en": "In Async HTTP Web Scraper & Non-Blocking I/O, properly implementing event loop mechanics enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Async HTTP Web Scraper & Non-Blocking I/O, triển khai chuẩn event loop mechanics cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_fundamentals",
      "difficulty": "easy"
    },
    {
      "id": "py_q_53_14",
      "type": "single_choice",
      "question": {
        "en": "[Asyncio Foundations: Event Loop & Coroutines] Scenario 14: In Async HTTP Web Scraper & Non-Blocking I/O, what is the critical architectural rule for non-blocking I/O vs blocking calls?",
        "vi": "[Nền Tảng Asyncio: Event Loop & Coroutine] Tình huống 14: Trong Async HTTP Web Scraper & Non-Blocking I/O, quy tắc kiến trúc quan trọng cho non-blocking I/O vs blocking calls là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Asyncio Foundations: Event Loop & Coroutines",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Nền Tảng Asyncio: Event Loop & Coroutine"
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
        "en": "In Async HTTP Web Scraper & Non-Blocking I/O, properly implementing non-blocking I/O vs blocking calls enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Async HTTP Web Scraper & Non-Blocking I/O, triển khai chuẩn non-blocking I/O vs blocking calls cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_fundamentals",
      "difficulty": "medium"
    },
    {
      "id": "py_q_53_15",
      "type": "single_choice",
      "question": {
        "en": "[Asyncio Foundations: Event Loop & Coroutines] Scenario 15: In Async HTTP Web Scraper & Non-Blocking I/O, what is the critical architectural rule for async def?",
        "vi": "[Nền Tảng Asyncio: Event Loop & Coroutine] Tình huống 15: Trong Async HTTP Web Scraper & Non-Blocking I/O, quy tắc kiến trúc quan trọng cho async def là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Asyncio Foundations: Event Loop & Coroutines",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Nền Tảng Asyncio: Event Loop & Coroutine"
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
        "en": "In Async HTTP Web Scraper & Non-Blocking I/O, properly implementing async def enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Async HTTP Web Scraper & Non-Blocking I/O, triển khai chuẩn async def cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_fundamentals",
      "difficulty": "hard"
    },
    {
      "id": "py_q_53_16",
      "type": "single_choice",
      "question": {
        "en": "[Asyncio Foundations: Event Loop & Coroutines] Scenario 16: In Async HTTP Web Scraper & Non-Blocking I/O, what is the critical architectural rule for await?",
        "vi": "[Nền Tảng Asyncio: Event Loop & Coroutine] Tình huống 16: Trong Async HTTP Web Scraper & Non-Blocking I/O, quy tắc kiến trúc quan trọng cho await là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Asyncio Foundations: Event Loop & Coroutines",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Nền Tảng Asyncio: Event Loop & Coroutine"
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
        "en": "In Async HTTP Web Scraper & Non-Blocking I/O, properly implementing await enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Async HTTP Web Scraper & Non-Blocking I/O, triển khai chuẩn await cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_fundamentals",
      "difficulty": "medium"
    }
  ]
};

export default lesson32;
