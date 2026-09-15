import { Lesson } from '../../../../types';

export const lesson33: Lesson = {
  "id": "py_lesson_33",
  "moduleId": "py_mod_13",
  "levelId": "advanced",
  "courseId": "python",
  "order": 33,
  "topicId": "python_asyncio_gather_queues_tasks",
  "title": {
    "en": "Concurrent Programming: asyncio.gather, Task Cancellation, Timeouts & Queues",
    "vi": "Lập Trình Đồng Thời: asyncio.gather, Hủy Tác Vụ, Timeouts & Hàng Đợi Async"
  },
  "summary": {
    "en": "Master multi-task asynchronous concurrency: parallel batch execution with asyncio.gather, setting hard SLAs with asyncio.wait_for timeouts, task cancellation mechanics, and producer-consumer architectures with asyncio.Queue.",
    "vi": "Làm chủ xử lý đồng thời đa tác vụ: thực thi song song theo lô với asyncio.gather, thiết lập SLA với timeout asyncio.wait_for, cơ chế hủy tác vụ Task.cancel() và kiến trúc Producer-Consumer với asyncio.Queue."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "Running async operations sequentially is no faster than synchronous code. The real power of asyncio comes from concurrent execution: running multiple I/O operations simultaneously using asyncio.gather, enforcing timeout deadlines, and decoupling pipelines with asynchronous queues.",
      "vi": "Chạy các tác vụ async tuần tự không nhanh hơn code đồng bộ. Sức mạnh thực sự của asyncio nằm ở khả năng thực thi đồng thời: chạy nhiều tác vụ I/O cùng lúc bằng asyncio.gather, giới hạn deadline bằng timeout và phân tách các tầng xử lý với hàng đợi bất đồng bộ asyncio.Queue."
    },
    "conceptExplanation": {
      "en": "Concurrent Async Tools:\n1. asyncio.gather(*tasks, return_exceptions=False): Runs multiple coroutines concurrently, collects all results into an ordered list matching input order.\n2. asyncio.wait_for(coro, timeout=seconds): Enforces maximum duration; raises asyncio.TimeoutError on breach.\n3. Task Cancellation: task.cancel() injects asyncio.CancelledError into the target coroutine.\n4. asyncio.Queue(maxsize): Thread-safe asynchronous FIFO queue for producer-consumer workflows using await queue.put() and await queue.get(). \n\n**Resilient Asyncio Execution Patterns:**\n1. **Timeouts:** `await asyncio.wait_for(task, timeout=2.0)` raises `asyncio.TimeoutError` if task exceeds time.\n2. **Cancellation:** Calling `task.cancel()` raises `asyncio.CancelledError` inside the coroutine. Always use `try...finally` to cleanly release database connections, sockets, and locks.\n3. **Batch Resilience:** `await asyncio.gather(*tasks, return_exceptions=True)` prevents a single failing task from cancelling sibling tasks; failed tasks return their Exception object in the results list.",
      "vi": "Các Công Cụ Đồng Thời Trong Asyncio:\n1. asyncio.gather(*tasks, return_exceptions=False): Chạy nhiều coroutine đồng thời, thu thập toàn bộ kết quả vào danh sách theo đúng thứ tự truyền vào.\n2. asyncio.wait_for(coro, timeout=giây): Ép giới hạn thời gian tối đa; ném ngoại lệ asyncio.TimeoutError nếu quá hạn.\n3. Hủy Tác Vụ: task.cancel() bắn asyncio.CancelledError vào coroutine mục tiêu.\n4. asyncio.Queue(maxsize): Hàng đợi FIFO bất đồng bộ cho mô hình Producer-Consumer qua await queue.put() và await queue.get(). \n\n**Mô Hình Xử Lý Asyncio Bền Vững:**\n1. **Giới Hạn Thời Gian (Timeout):** `await asyncio.wait_for(task, timeout=2.0)` sẽ ném ra `asyncio.TimeoutError` nếu tác vụ chạy quá giờ.\n2. **Hủy Tác Vụ (Cancellation):** Gọi `task.cancel()` sẽ ném ngoại lệ `asyncio.CancelledError` vào trong coroutine. Luôn dùng khối `try...finally` để đóng kết nối cơ sở dữ liệu, socket và giải phóng khóa an toàn.\n3. **Thu Thập Chịu Lỗi (Batch Resilience):** `await asyncio.gather(*tasks, return_exceptions=True)` giúp 1 tác vụ thất bại không làm hỏng các tác vụ khác trong nhóm; các tác vụ lỗi sẽ trả về đối tượng ngoại lệ trong danh sách kết quả."
    },
    "syntax": "import asyncio\n\nasync def fetch_batch():\n    # Run 3 network calls simultaneously\n    results = await asyncio.gather(\n        fetch_api(\"/endpoint1\"),\n        fetch_api(\"/endpoint2\"),\n        fetch_api(\"/endpoint3\"),\n        return_exceptions=True\n    )\n    return results",
    "examples": [
      {
        "title": {
          "en": "Concurrent Multi-Source Aggregator with Timeout Safeguards",
          "vi": "Bộ Thu Thập Đa Nguồn Đồng Thời Kèm Giới Hạn Timeout"
        },
        "code": "import asyncio\n\nasync def fetch_source(name: str, delay: float):\n    await asyncio.sleep(delay)\n    return f\"{name}_DATA\"\n\nasync def main():\n    # Run all sources concurrently\n    tasks = [\n        fetch_source(\"SOURCE_A\", 0.02),\n        fetch_source(\"SOURCE_B\", 0.01),\n        fetch_source(\"SOURCE_C\", 0.03),\n    ]\n    # gather awaits all tasks in parallel!\n    results = await asyncio.gather(*tasks)\n    print(\"All Concurrent Results Collected:\", results)\n\nasyncio.run(main())",
        "language": "python",
        "explanation": {
          "en": "Demonstrates concurrent parallel resolution using asyncio.gather to reduce total latency to the duration of the slowest task.",
          "vi": "Minh họa xử lý song song đồng thời bằng asyncio.gather giúp giảm tổng thời gian chờ về bằng thời gian của tác vụ lâu nhất."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Not setting return_exceptions=True in asyncio.gather when handling independent external services (one failure crashes the entire gather batch!)",
          "vi": "Không đặt return_exceptions=True trong asyncio.gather khi gọi các dịch vụ độc lập khiến một lỗi duy nhất làm sập toàn bộ các tác vụ còn lại"
        },
        "correction": {
          "en": "Use return_exceptions=True so failed tasks return Exception objects in the list rather than aborting the gather.",
          "vi": "Dùng return_exceptions=True để các tác vụ bị lỗi trả về đối tượng Exception trong mảng kết quả thay vì làm hỏng toàn bộ mẻ chạy."
        },
        "code": "res = await asyncio.gather(*tasks, return_exceptions=True)"
      }
    ],
    "tips": [
      {
        "en": "Always call queue.task_done() after processing an item from an asyncio.Queue, and use await queue.join() to wait for completion.",
        "vi": "Luôn gọi queue.task_done() sau khi xử lý xong item từ asyncio.Queue và dùng await queue.join() để chờ hoàn tất."
      }
    ],
    "practice": {
      "task": {
        "en": "Concurrent Batch Calculation with asyncio.gather",
        "vi": "Tính toán hàng loạt đồng thời với asyncio.gather"
      },
      "instruction": {
        "en": "Define async def square_async(n): await asyncio.sleep(0.01); return n ** 2. In async main(): use asyncio.gather on [square_async(x) for x in [2, 4, 6]]. Print results.",
        "vi": "Tạo async def square_async(n) tính bình phương. Dùng asyncio.gather tính song song cho 2, 4, 6 và in mảng kết quả."
      },
      "starterCode": "# Concurrent square batch\nimport asyncio\n",
      "solutionCode": "import asyncio\n\nasync def square_async(n):\n    await asyncio.sleep(0.01)\n    return n ** 2\n\nasync def main():\n    results = await asyncio.gather(square_async(2), square_async(4), square_async(6))\n    print(\"Squared Results:\", results)\n\nasyncio.run(main())\n",
      "expectedOutput": "Squared Results: [4, 16, 36]",
      "requiredPatterns": [],
      "hint": {
        "en": "await asyncio.gather(square_async(2), square_async(4), square_async(6))",
        "vi": "await asyncio.gather(square_async(2), square_async(4), square_async(6))"
      }
    },
    "consolidationPractice": {
      "task": {
        "en": "Handle Timeout with asyncio.wait_for",
        "vi": "Bắt lỗi Timeout với asyncio.wait_for"
      },
      "instruction": {
        "en": "Define async def slow_worker(): await asyncio.sleep(0.5); return \"SUCCESS\". In async main(), wrap with asyncio.wait_for(slow_worker(), timeout=0.01). Catch TimeoutError and print \"Task Timed Out\".",
        "vi": "Tạo slow_worker() ngủ 0.5s. Dùng asyncio.wait_for với timeout 0.01s, bắt ngoại lệ TimeoutError và in \"Task Timed Out\"."
      },
      "starterCode": "# Async timeout\nimport asyncio\n",
      "solutionCode": "import asyncio\n\nasync def slow_worker():\n    await asyncio.sleep(0.5)\n    return \"SUCCESS\"\n\nasync def main():\n    try:\n        await asyncio.wait_for(slow_worker(), timeout=0.01)\n    except (asyncio.TimeoutError, TimeoutError):\n        print(\"Task Timed Out\")\n\nasyncio.run(main())\n",
      "expectedOutput": "Task Timed Out",
      "requiredPatterns": [],
      "hint": {
        "en": "await asyncio.wait_for(slow_worker(), timeout=0.01)",
        "vi": "await asyncio.wait_for(slow_worker(), timeout=0.01)"
      }
    }
  },
  "exercisePool": [
    {
      "id": "py_ex_54_1",
      "type": "write_code",
      "title": {
        "en": "Implement Concurrent Microservice API Gateway Fetcher",
        "vi": "Triển Khai Concurrent Microservice API Gateway Fetcher"
      },
      "instruction": {
        "en": "Write production-ready Python code implementing asyncio.gather(*tasks, return_exceptions=True), asyncio.wait_for(timeout), asyncio.CancelledError, task cancellation for Concurrent Microservice API Gateway Fetcher.",
        "vi": "Viết mã nguồn chuẩn doanh nghiệp áp dụng asyncio.gather(*tasks, return_exceptions=True), asyncio.wait_for(timeout), asyncio.CancelledError, task cancellation cho Concurrent Microservice API Gateway Fetcher."
      },
      "starterCode": "# Write your domain code below:\n",
      "solutionCode": "# Implementation for Async Concurrency: Tasks, Gather & Resilience\nimport asyncio\n\nasync def fetch_metric(metric_id):\n    await asyncio.sleep(0.01)\n    return f\"Metric-{metric_id}: 99.8%\"\n\nasync def main():\n    results = await asyncio.gather(\n        fetch_metric(\"CPU\"),\n        fetch_metric(\"MEM\"),\n        return_exceptions=True\n    )\n    for res in results:\n        print(\"Fetched:\", res)\n\nasyncio.run(main())",
      "hint": {
        "en": "Apply asyncio.gather(*tasks, return_exceptions=True), asyncio.wait_for(timeout), asyncio.CancelledError, task cancellation following high-performance async standards.",
        "vi": "Áp dụng asyncio.gather(*tasks, return_exceptions=True), asyncio.wait_for(timeout), asyncio.CancelledError, task cancellation theo chuẩn hiệu năng cao của asyncio."
      },
      "explanation": {
        "en": "Non-blocking concurrency and memory safety are essential for production scale.",
        "vi": "Xử lý bất đồng bộ và an toàn bộ nhớ là yếu tố then chốt cho hệ thống quy mô lớn."
      }
    },
    {
      "id": "py_ex_54_2",
      "type": "fix_code",
      "title": {
        "en": "Fix Flaw in Concurrent Microservice API Gateway Fetcher",
        "vi": "Sửa Lỗi Trong Concurrent Microservice API Gateway Fetcher"
      },
      "instruction": {
        "en": "Fix the blocking call or memory leak in Concurrent Microservice API Gateway Fetcher.",
        "vi": "Sửa lỗi chặn luồng hoặc rò rỉ bộ nhớ trong Concurrent Microservice API Gateway Fetcher."
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
      "id": "py_ex_54_3",
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
      "id": "py_ex_54_4",
      "type": "predict_output",
      "title": {
        "en": "Predict Output for Concurrent Microservice API Gateway Fetcher",
        "vi": "Dự Đoán Kết Quả Concurrent Microservice API Gateway Fetcher"
      },
      "instruction": {
        "en": "Predict and verify the execution output for the Concurrent Microservice API Gateway Fetcher component.",
        "vi": "Dự đoán và kiểm tra kết quả thực thi của Concurrent Microservice API Gateway Fetcher."
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
      "id": "py_ex_54_5",
      "type": "problem_solving",
      "title": {
        "en": "End-to-End Concurrent Microservice API Gateway Fetcher Pipeline",
        "vi": "Quy Trình Hoàn Chỉnh Concurrent Microservice API Gateway Fetcher"
      },
      "instruction": {
        "en": "Implement the complete ETL pipeline or custom dunder value class for Concurrent Microservice API Gateway Fetcher.",
        "vi": "Triển khai đường ống ETL hoàn chỉnh hoặc lớp giá trị dunder cho Concurrent Microservice API Gateway Fetcher."
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
    "id": "py_ch_54",
    "title": {
      "en": "High-Throughput Asynchronous Worker Pool with Queue & Resilient Gather",
      "vi": "Hồ Công Nhân Bất Đồng Bộ Hiệu Suất Cao Với Hàng Đợi & Gather Bền Bỉ"
    },
    "description": {
      "en": "Build an enterprise asynchronous Producer-Consumer pipeline:\n1. Define async def producer(queue: asyncio.Queue, items: list):\n   - Puts each item into the queue with await queue.put(item)\n2. Define async def consumer(name: str, queue: asyncio.Queue, results: list):\n   - In an infinite loop: item = await queue.get()\n   - If item is None: queue.task_done(); break  # Sentinel exit signal\n   - Simulate processing: await asyncio.sleep(0.01)\n   - Append f\"{name} processed {item}\" to results\n   - queue.task_done()\n3. In async def orchestrate():\n   - Create queue = asyncio.Queue()\n   - results = []\n   - Launch 2 concurrent consumer workers: c1, c2\n   - Run producer with items = [\"JOB_1\", \"JOB_2\", \"JOB_3\", \"JOB_4\"]\n   - Send sentinel None (one for each consumer) into queue to trigger clean termination\n   - Wait for queue completion via await queue.join()\n   - Wait for consumers with await asyncio.gather(c1, c2)\n   - Return results\n4. Execute orchestrate() with asyncio.run() and print:\n   \"Pipeline Finished: 4 Jobs Processed\"\n   \"Sample Log: Worker_1 processed JOB_1\".",
      "vi": "Xây dựng đường ống Producer-Consumer bất đồng bộ hoàn chỉnh:\n1. Producer đưa công việc vào asyncio.Queue\n2. Hai consumer chạy đồng thời xử lý công việc từ hàng đợi\n3. Gửi giá trị lính canh None để kết thúc consumer sạch sẽ\n4. Đảm bảo đồng bộ hóa qua queue.join() và asyncio.gather()\nChạy thử và in kết quả chính xác."
    },
    "requirements": [
      {
        "en": "Implement decoupled asynchronous Producer-Consumer pattern using asyncio.Queue",
        "vi": "Triển khai mẫu Producer-Consumer bất đồng bộ tách rời dùng asyncio.Queue"
      },
      {
        "en": "Ensure graceful shutdown mechanics using None sentinel objects and queue.task_done()",
        "vi": "Đảm bảo cơ chế tắt an toàn dùng đối tượng lính canh None và queue.task_done()"
      },
      {
        "en": "Coordinate multi-worker termination via asyncio.gather",
        "vi": "Điều phối kết thúc đa worker qua asyncio.gather"
      }
    ],
    "starterCode": "# Build Worker Pool\nimport asyncio\n",
    "solutionCode": "import asyncio\n\nasync def producer(queue: asyncio.Queue, items: list):\n    for item in items:\n        await queue.put(item)\n\nasync def consumer(name: str, queue: asyncio.Queue, results: list):\n    while True:\n        item = await queue.get()\n        if item is None:\n            queue.task_done()\n            break\n        await asyncio.sleep(0.01)\n        results.append(f\"{name} processed {item}\")\n        queue.task_done()\n\nasync def orchestrate():\n    queue = asyncio.Queue()\n    results = []\n    num_consumers = 2\n    jobs = [\"JOB_1\", \"JOB_2\", \"JOB_3\", \"JOB_4\"]\n\n    # Spawn consumer tasks\n    consumers = [\n        asyncio.create_task(consumer(f\"Worker_{i+1}\", queue, results))\n        for i in range(num_consumers)\n    ]\n\n    # Produce jobs\n    await producer(queue, jobs)\n\n    # Push exit sentinels for each consumer\n    for _ in range(num_consumers):\n        await queue.put(None)\n\n    # Wait until all items processed\n    await queue.join()\n    await asyncio.gather(*consumers)\n    return results\n\nasync def main():\n    results = await orchestrate()\n    print(f\"Pipeline Finished: {len(results)} Jobs Processed\")\n    print(f\"Sample Log: {results[0]}\")\n\nasyncio.run(main())\n",
    "hints": [
      {
        "en": "await queue.join() then await asyncio.gather(*consumers)",
        "vi": "await queue.join() sau đó await asyncio.gather(*consumers)"
      }
    ],
    "solutionExplanation": {
      "en": "Demonstrates the canonical asynchronous Producer-Consumer queue pattern with graceful sentinel-based termination.",
      "vi": "Minh họa mẫu hàng đợi Producer-Consumer bất đồng bộ chuẩn mực với cơ chế tắt an toàn dựa trên giá trị lính canh."
    }
  },
  "quizQuestionPool": [
    {
      "id": "py_q_54_1",
      "type": "single_choice",
      "question": {
        "en": "[Async Concurrency: Tasks, Gather & Resilience] Scenario 1: In Concurrent Microservice API Gateway Fetcher, what is the critical architectural rule for return_exceptions=True)?",
        "vi": "[Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi] Tình huống 1: Trong Concurrent Microservice API Gateway Fetcher, quy tắc kiến trúc quan trọng cho return_exceptions=True) là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Async Concurrency: Tasks, Gather & Resilience",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi"
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
        "en": "In Concurrent Microservice API Gateway Fetcher, properly implementing return_exceptions=True) enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Concurrent Microservice API Gateway Fetcher, triển khai chuẩn return_exceptions=True) cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_gather_queues_tasks",
      "difficulty": "easy"
    },
    {
      "id": "py_q_54_2",
      "type": "single_choice",
      "question": {
        "en": "[Async Concurrency: Tasks, Gather & Resilience] Scenario 2: In Concurrent Microservice API Gateway Fetcher, what is the critical architectural rule for asyncio.wait_for(timeout)?",
        "vi": "[Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi] Tình huống 2: Trong Concurrent Microservice API Gateway Fetcher, quy tắc kiến trúc quan trọng cho asyncio.wait_for(timeout) là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Async Concurrency: Tasks, Gather & Resilience",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi"
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
        "en": "In Concurrent Microservice API Gateway Fetcher, properly implementing asyncio.wait_for(timeout) enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Concurrent Microservice API Gateway Fetcher, triển khai chuẩn asyncio.wait_for(timeout) cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_gather_queues_tasks",
      "difficulty": "medium"
    },
    {
      "id": "py_q_54_3",
      "type": "single_choice",
      "question": {
        "en": "[Async Concurrency: Tasks, Gather & Resilience] Scenario 3: In Concurrent Microservice API Gateway Fetcher, what is the critical architectural rule for asyncio.CancelledError?",
        "vi": "[Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi] Tình huống 3: Trong Concurrent Microservice API Gateway Fetcher, quy tắc kiến trúc quan trọng cho asyncio.CancelledError là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Async Concurrency: Tasks, Gather & Resilience",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi"
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
        "en": "In Concurrent Microservice API Gateway Fetcher, properly implementing asyncio.CancelledError enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Concurrent Microservice API Gateway Fetcher, triển khai chuẩn asyncio.CancelledError cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_gather_queues_tasks",
      "difficulty": "hard"
    },
    {
      "id": "py_q_54_4",
      "type": "single_choice",
      "question": {
        "en": "[Async Concurrency: Tasks, Gather & Resilience] Scenario 4: In Concurrent Microservice API Gateway Fetcher, what is the critical architectural rule for task cancellation?",
        "vi": "[Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi] Tình huống 4: Trong Concurrent Microservice API Gateway Fetcher, quy tắc kiến trúc quan trọng cho task cancellation là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Async Concurrency: Tasks, Gather & Resilience",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi"
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
        "en": "In Concurrent Microservice API Gateway Fetcher, properly implementing task cancellation enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Concurrent Microservice API Gateway Fetcher, triển khai chuẩn task cancellation cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_gather_queues_tasks",
      "difficulty": "medium"
    },
    {
      "id": "py_q_54_5",
      "type": "single_choice",
      "question": {
        "en": "[Async Concurrency: Tasks, Gather & Resilience] Scenario 5: In Concurrent Microservice API Gateway Fetcher, what is the critical architectural rule for asyncio.gather(*tasks?",
        "vi": "[Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi] Tình huống 5: Trong Concurrent Microservice API Gateway Fetcher, quy tắc kiến trúc quan trọng cho asyncio.gather(*tasks là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Async Concurrency: Tasks, Gather & Resilience",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi"
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
        "en": "In Concurrent Microservice API Gateway Fetcher, properly implementing asyncio.gather(*tasks enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Concurrent Microservice API Gateway Fetcher, triển khai chuẩn asyncio.gather(*tasks cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_gather_queues_tasks",
      "difficulty": "easy"
    },
    {
      "id": "py_q_54_6",
      "type": "single_choice",
      "question": {
        "en": "[Async Concurrency: Tasks, Gather & Resilience] Scenario 6: In Concurrent Microservice API Gateway Fetcher, what is the critical architectural rule for return_exceptions=True)?",
        "vi": "[Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi] Tình huống 6: Trong Concurrent Microservice API Gateway Fetcher, quy tắc kiến trúc quan trọng cho return_exceptions=True) là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Async Concurrency: Tasks, Gather & Resilience",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi"
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
        "en": "In Concurrent Microservice API Gateway Fetcher, properly implementing return_exceptions=True) enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Concurrent Microservice API Gateway Fetcher, triển khai chuẩn return_exceptions=True) cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_gather_queues_tasks",
      "difficulty": "hard"
    },
    {
      "id": "py_q_54_7",
      "type": "single_choice",
      "question": {
        "en": "[Async Concurrency: Tasks, Gather & Resilience] Scenario 7: In Concurrent Microservice API Gateway Fetcher, what is the critical architectural rule for asyncio.wait_for(timeout)?",
        "vi": "[Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi] Tình huống 7: Trong Concurrent Microservice API Gateway Fetcher, quy tắc kiến trúc quan trọng cho asyncio.wait_for(timeout) là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Async Concurrency: Tasks, Gather & Resilience",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi"
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
        "en": "In Concurrent Microservice API Gateway Fetcher, properly implementing asyncio.wait_for(timeout) enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Concurrent Microservice API Gateway Fetcher, triển khai chuẩn asyncio.wait_for(timeout) cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_gather_queues_tasks",
      "difficulty": "easy"
    },
    {
      "id": "py_q_54_8",
      "type": "single_choice",
      "question": {
        "en": "[Async Concurrency: Tasks, Gather & Resilience] Scenario 8: In Concurrent Microservice API Gateway Fetcher, what is the critical architectural rule for asyncio.CancelledError?",
        "vi": "[Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi] Tình huống 8: Trong Concurrent Microservice API Gateway Fetcher, quy tắc kiến trúc quan trọng cho asyncio.CancelledError là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Async Concurrency: Tasks, Gather & Resilience",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi"
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
        "en": "In Concurrent Microservice API Gateway Fetcher, properly implementing asyncio.CancelledError enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Concurrent Microservice API Gateway Fetcher, triển khai chuẩn asyncio.CancelledError cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_gather_queues_tasks",
      "difficulty": "medium"
    },
    {
      "id": "py_q_54_9",
      "type": "single_choice",
      "question": {
        "en": "[Async Concurrency: Tasks, Gather & Resilience] Scenario 9: In Concurrent Microservice API Gateway Fetcher, what is the critical architectural rule for task cancellation?",
        "vi": "[Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi] Tình huống 9: Trong Concurrent Microservice API Gateway Fetcher, quy tắc kiến trúc quan trọng cho task cancellation là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Async Concurrency: Tasks, Gather & Resilience",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi"
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
        "en": "In Concurrent Microservice API Gateway Fetcher, properly implementing task cancellation enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Concurrent Microservice API Gateway Fetcher, triển khai chuẩn task cancellation cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_gather_queues_tasks",
      "difficulty": "hard"
    },
    {
      "id": "py_q_54_10",
      "type": "single_choice",
      "question": {
        "en": "[Async Concurrency: Tasks, Gather & Resilience] Scenario 10: In Concurrent Microservice API Gateway Fetcher, what is the critical architectural rule for asyncio.gather(*tasks?",
        "vi": "[Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi] Tình huống 10: Trong Concurrent Microservice API Gateway Fetcher, quy tắc kiến trúc quan trọng cho asyncio.gather(*tasks là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Async Concurrency: Tasks, Gather & Resilience",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi"
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
        "en": "In Concurrent Microservice API Gateway Fetcher, properly implementing asyncio.gather(*tasks enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Concurrent Microservice API Gateway Fetcher, triển khai chuẩn asyncio.gather(*tasks cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_gather_queues_tasks",
      "difficulty": "medium"
    },
    {
      "id": "py_q_54_11",
      "type": "single_choice",
      "question": {
        "en": "[Async Concurrency: Tasks, Gather & Resilience] Scenario 11: In Concurrent Microservice API Gateway Fetcher, what is the critical architectural rule for return_exceptions=True)?",
        "vi": "[Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi] Tình huống 11: Trong Concurrent Microservice API Gateway Fetcher, quy tắc kiến trúc quan trọng cho return_exceptions=True) là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Async Concurrency: Tasks, Gather & Resilience",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi"
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
        "en": "In Concurrent Microservice API Gateway Fetcher, properly implementing return_exceptions=True) enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Concurrent Microservice API Gateway Fetcher, triển khai chuẩn return_exceptions=True) cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_gather_queues_tasks",
      "difficulty": "easy"
    },
    {
      "id": "py_q_54_12",
      "type": "single_choice",
      "question": {
        "en": "[Async Concurrency: Tasks, Gather & Resilience] Scenario 12: In Concurrent Microservice API Gateway Fetcher, what is the critical architectural rule for asyncio.wait_for(timeout)?",
        "vi": "[Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi] Tình huống 12: Trong Concurrent Microservice API Gateway Fetcher, quy tắc kiến trúc quan trọng cho asyncio.wait_for(timeout) là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Async Concurrency: Tasks, Gather & Resilience",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi"
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
        "en": "In Concurrent Microservice API Gateway Fetcher, properly implementing asyncio.wait_for(timeout) enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Concurrent Microservice API Gateway Fetcher, triển khai chuẩn asyncio.wait_for(timeout) cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_gather_queues_tasks",
      "difficulty": "hard"
    },
    {
      "id": "py_q_54_13",
      "type": "single_choice",
      "question": {
        "en": "[Async Concurrency: Tasks, Gather & Resilience] Scenario 13: In Concurrent Microservice API Gateway Fetcher, what is the critical architectural rule for asyncio.CancelledError?",
        "vi": "[Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi] Tình huống 13: Trong Concurrent Microservice API Gateway Fetcher, quy tắc kiến trúc quan trọng cho asyncio.CancelledError là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Async Concurrency: Tasks, Gather & Resilience",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi"
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
        "en": "In Concurrent Microservice API Gateway Fetcher, properly implementing asyncio.CancelledError enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Concurrent Microservice API Gateway Fetcher, triển khai chuẩn asyncio.CancelledError cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_gather_queues_tasks",
      "difficulty": "easy"
    },
    {
      "id": "py_q_54_14",
      "type": "single_choice",
      "question": {
        "en": "[Async Concurrency: Tasks, Gather & Resilience] Scenario 14: In Concurrent Microservice API Gateway Fetcher, what is the critical architectural rule for task cancellation?",
        "vi": "[Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi] Tình huống 14: Trong Concurrent Microservice API Gateway Fetcher, quy tắc kiến trúc quan trọng cho task cancellation là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Async Concurrency: Tasks, Gather & Resilience",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi"
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
        "en": "In Concurrent Microservice API Gateway Fetcher, properly implementing task cancellation enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Concurrent Microservice API Gateway Fetcher, triển khai chuẩn task cancellation cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_gather_queues_tasks",
      "difficulty": "medium"
    },
    {
      "id": "py_q_54_15",
      "type": "single_choice",
      "question": {
        "en": "[Async Concurrency: Tasks, Gather & Resilience] Scenario 15: In Concurrent Microservice API Gateway Fetcher, what is the critical architectural rule for asyncio.gather(*tasks?",
        "vi": "[Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi] Tình huống 15: Trong Concurrent Microservice API Gateway Fetcher, quy tắc kiến trúc quan trọng cho asyncio.gather(*tasks là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Async Concurrency: Tasks, Gather & Resilience",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi"
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
        "en": "In Concurrent Microservice API Gateway Fetcher, properly implementing asyncio.gather(*tasks enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Concurrent Microservice API Gateway Fetcher, triển khai chuẩn asyncio.gather(*tasks cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_gather_queues_tasks",
      "difficulty": "hard"
    },
    {
      "id": "py_q_54_16",
      "type": "single_choice",
      "question": {
        "en": "[Async Concurrency: Tasks, Gather & Resilience] Scenario 16: In Concurrent Microservice API Gateway Fetcher, what is the critical architectural rule for return_exceptions=True)?",
        "vi": "[Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi] Tình huống 16: Trong Concurrent Microservice API Gateway Fetcher, quy tắc kiến trúc quan trọng cho return_exceptions=True) là gì?"
      },
      "options": [
        {
          "en": "Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for Async Concurrency: Tasks, Gather & Resilience",
          "vi": "Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi"
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
        "en": "In Concurrent Microservice API Gateway Fetcher, properly implementing return_exceptions=True) enables thousands of concurrent operations per second while keeping RAM bounded.",
        "vi": "Trong Concurrent Microservice API Gateway Fetcher, triển khai chuẩn return_exceptions=True) cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM."
      },
      "topicId": "python_asyncio_gather_queues_tasks",
      "difficulty": "medium"
    }
  ]
};

export default lesson33;
