import { QuizQuestion, ExerciseItem } from '../src/types';

export function getRichGroup6Pool(
  lessonNum: number,
  topicId: string,
  titleEn: string,
  titleVi: string,
  q: Function,
  ex: Function
): { questions: QuizQuestion[]; exercises: ExerciseItem[] } {
  const questions: QuizQuestion[] = [];
  const exercises: ExerciseItem[] = [];

  const group6Meta: Record<number, { en: string; vi: string; domain: string; focus: string }> = {
    51: { en: "Dunder Magic Methods & Operator Overloading", vi: "Phương Thức Dunder & Nạp Chồng Toán Tử", domain: "Financial Money Value Object & Vector Math", focus: "__repr__, __str__, __len__, __getitem__, __eq__, __hash__, __add__ operator overloading" },
    52: { en: "Abstract Base Classes & Interface Contracts", vi: "Lớp Cơ Sở Trừu Tượng ABC & Giao Diện", domain: "Pluggable Storage Engine (S3/GCS/LocalDisk)", focus: "abc.ABC, @abstractmethod, abstract property, static duck typing vs Protocol contracts" },
    53: { en: "Asyncio Foundations: Event Loop & Coroutines", vi: "Nền Tảng Asyncio: Event Loop & Coroutine", domain: "Async HTTP Web Scraper & Non-Blocking I/O", focus: "async def, await, asyncio.run(), event loop mechanics, non-blocking I/O vs blocking calls" },
    54: { en: "Async Concurrency: Tasks, Gather & Resilience", vi: "Bất Đồng Bộ Nâng Cao: Task, Gather & Chịu Lỗi", domain: "Concurrent Microservice API Gateway Fetcher", focus: "asyncio.gather(*tasks, return_exceptions=True), asyncio.wait_for(timeout), asyncio.CancelledError, task cancellation" },
    55: { en: "Performance Profiling & Memory Optimization", vi: "Tối Ưu Hiệu Năng & Quản Lý Bộ Nhớ RAM", domain: "High-Scale In-Memory Cache (Tracemalloc & Slots)", focus: "tracemalloc.start() / get_traced_memory(), sys.getsizeof() shallow limits, __slots__ and subclass inheritance rules, timeit" },
    56: { en: "Capstone: High-Performance Async Data ETL Pipeline", vi: "Dự Án Tổng Hợp: Đường Ống ETL Bất Đồng Bộ", domain: "Enterprise Realtime Telemetry ETL Engine", focus: "dataclasses, async generator streams, batch chunking, resilient error logging, memory-efficient aggregation" }
  };

  const meta = group6Meta[lessonNum] || { en: titleEn, vi: titleVi, domain: "Advanced Concurrency & Systems", focus: topicId };

  // Generate 16 domain questions
  for (let i = 1; i <= 16; i++) {
    questions.push(
      q(i, lessonNum, topicId,
        `[${meta.en}] Scenario ${i}: In ${meta.domain}, what is the critical architectural rule for ${meta.focus.split(', ')[i % meta.focus.split(', ').length]}?`,
        `[${meta.vi}] Tình huống ${i}: Trong ${meta.domain}, quy tắc kiến trúc quan trọng cho ${meta.focus.split(', ')[i % meta.focus.split(', ').length]} là gì?`,
        [
          [`Standard high-performance pattern adhering to async safety, memory bounds, and exception resilience for ${meta.en}`, `Mô hình hiệu năng cao tuân thủ an toàn bất đồng bộ, giới hạn bộ nhớ và khả năng chịu lỗi cho ${meta.vi}`],
          [`Anti-pattern blocking the event loop with synchronous sleep or causing memory leaks by missing __slots__ in subclasses`, `Cách làm phản mẫu chặn event loop bằng hàm đồng bộ hoặc gây rò rỉ RAM do thiếu __slots__ ở lớp con`],
          [`Obsolete paradigm from legacy multithreading replaced by modern asyncio`, `Mô hình cũ đã được thay thế bằng chuẩn asyncio hiện đại`],
          [`Invalid construct raising RuntimeError: cannot reuse already awaited coroutine`, `Cú pháp không hợp lệ gây lỗi RuntimeError: cannot reuse already awaited coroutine`]
        ],
        [0],
        `In ${meta.domain}, properly implementing ${meta.focus.split(', ')[i % meta.focus.split(', ').length]} enables thousands of concurrent operations per second while keeping RAM bounded.`,
        `Trong ${meta.domain}, triển khai chuẩn ${meta.focus.split(', ')[i % meta.focus.split(', ').length]} cho phép xử lý hàng nghìn tác vụ đồng thời mỗi giây mà vẫn kiểm soát chặt chẽ dung lượng RAM.`,
        i % 3 === 0 ? 'hard' : i % 2 === 0 ? 'medium' : 'easy'
      )
    );
  }

  // Generate 5 domain exercises
  exercises.push(
    ex(1, lessonNum, 'write_code',
      `Implement ${meta.domain}`, `Triển Khai ${meta.domain}`,
      `Write production-ready Python code implementing ${meta.focus} for ${meta.domain}.`,
      `Viết mã nguồn chuẩn doanh nghiệp áp dụng ${meta.focus} cho ${meta.domain}.`,
      `# Write your domain code below:\n`,
      `# Implementation for ${meta.en}\nimport asyncio\n\nasync def fetch_metric(metric_id):\n    await asyncio.sleep(0.01)\n    return f"Metric-{metric_id}: 99.8%"\n\nasync def main():\n    results = await asyncio.gather(\n        fetch_metric("CPU"),\n        fetch_metric("MEM"),\n        return_exceptions=True\n    )\n    for res in results:\n        print("Fetched:", res)\n\nasyncio.run(main())`,
      `Apply ${meta.focus} following high-performance async standards.`,
      `Áp dụng ${meta.focus} theo chuẩn hiệu năng cao của asyncio.`,
      `Non-blocking concurrency and memory safety are essential for production scale.`,
      `Xử lý bất đồng bộ và an toàn bộ nhớ là yếu tố then chốt cho hệ thống quy mô lớn.`),
    ex(2, lessonNum, 'fix_code',
      `Fix Flaw in ${meta.domain}`, `Sửa Lỗi Trong ${meta.domain}`,
      `Fix the blocking call or memory leak in ${meta.domain}.`,
      `Sửa lỗi chặn luồng hoặc rò rỉ bộ nhớ trong ${meta.domain}.`,
      `import tracemalloc\n\ntracemalloc.start()\n# Allocate in-memory dataset\ndata = [x**2 for x in range(10000)]\ncurrent, peak = tracemalloc.get_traced_memory()\ntracemalloc.stop()\nprint(f"Peak Memory: {peak / 1024:.2f} KB")`,
      `import tracemalloc\n\ntracemalloc.start()\n# Allocate in-memory dataset\ndata = [x**2 for x in range(10000)]\ncurrent, peak = tracemalloc.get_traced_memory()\ntracemalloc.stop()\nprint(f"Peak Memory: {peak / 1024:.2f} KB")`,
      `Use tracemalloc.start(), get_traced_memory(), and stop() to measure allocations.`,
      `Dùng tracemalloc.start(), get_traced_memory(), và stop() để đo lường cấp phát RAM.`,
      `tracemalloc tracks actual memory allocations across all nested structures.`,
      `tracemalloc theo dõi dung lượng RAM thực tế phân bổ cho tất cả các đối tượng lồng nhau.`),
    ex(3, lessonNum, 'complete_code',
      `Complete Resilient Async Task Fetcher`, `Hoàn Thiện Bộ Thu Thập Async Chịu Lỗi`,
      `Complete the async task with timeout and CancelledError handling.`,
      `Hoàn thiện tác vụ bất đồng bộ với timeout và xử lý ngoại lệ CancelledError.`,
      `import asyncio\n\nasync def resilient_query():\n    try:\n        # Simulate quick query\n        await asyncio.sleep(0.01)\n        return "Query OK"\n    except asyncio.CancelledError:\n        print("Cleanup on cancellation")\n        raise\n\nasync def main():\n    try:\n        res = await asyncio.wait_for(resilient_query(), timeout=1.0)\n        print("Result:", res)\n    except asyncio.TimeoutError:\n        print("Query Timed Out")\n\nasyncio.run(main())`,
      `import asyncio\n\nasync def resilient_query():\n    try:\n        # Simulate quick query\n        await asyncio.sleep(0.01)\n        return "Query OK"\n    except asyncio.CancelledError:\n        print("Cleanup on cancellation")\n        raise\n\nasync def main():\n    try:\n        res = await asyncio.wait_for(resilient_query(), timeout=1.0)\n        print("Result:", res)\n    except asyncio.TimeoutError:\n        print("Query Timed Out")\n\nasyncio.run(main())`,
      `Use asyncio.wait_for with timeout and catch asyncio.TimeoutError.`,
      `Dùng asyncio.wait_for kèm timeout và bắt lỗi asyncio.TimeoutError.`,
      `Timeout guards prevent hanging coroutines from draining thread and socket pools.`,
      `Bộ bảo vệ timeout ngăn ngừa các coroutine bị treo làm cạn kiệt tài nguyên mạng.`),
    ex(4, lessonNum, 'predict_output',
      `Predict Output for ${meta.domain}`, `Dự Đoán Kết Quả ${meta.domain}`,
      `Predict and verify the execution output for the ${meta.domain} component.`,
      `Dự đoán và kiểm tra kết quả thực thi của ${meta.domain}.`,
      `class Point:\n    __slots__ = ('x', 'y')\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\npt = Point(10, 20)\nprint("Has dict:", hasattr(pt, "__dict__"))\nprint("Point Coords:", (pt.x, pt.y))`,
      `class Point:\n    __slots__ = ('x', 'y')\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\npt = Point(10, 20)\nprint("Has dict:", hasattr(pt, "__dict__"))\nprint("Point Coords:", (pt.x, pt.y))`,
      `__slots__ eliminates the instance __dict__, saving substantial memory for millions of objects.`,
      `__slots__ loại bỏ từ điển __dict__ ở mỗi thể hiện, tiết kiệm rất nhiều RAM khi có hàng triệu đối tượng.`,
      `Memory footprint drops significantly when instances don't allocate dynamic __dict__ tables.`,
      `Dung lượng bộ nhớ giảm rõ rệt khi các đối tượng không phải tạo bảng __dict__ động.`),
    ex(5, lessonNum, 'problem_solving',
      `End-to-End ${meta.domain} Pipeline`, `Quy Trình Hoàn Chỉnh ${meta.domain}`,
      `Implement the complete ETL pipeline or custom dunder value class for ${meta.domain}.`,
      `Triển khai đường ống ETL hoàn chỉnh hoặc lớp giá trị dunder cho ${meta.domain}.`,
      `# Complete domain problem solver:\nclass Money:\n    def __init__(self, amount, currency="USD"):\n        self.amount = amount\n        self.currency = currency\n    def __repr__(self):\n        return f"Money({self.amount}, '{self.currency}')"\n    def __add__(self, other):\n        if self.currency != other.currency:\n            raise ValueError("Currencies must match")\n        return Money(self.amount + other.amount, self.currency)\n\nm1 = Money(150.50)\nm2 = Money(49.50)\nm3 = m1 + m2\nprint("Total:", m3)`,
      `class Money:\n    def __init__(self, amount, currency="USD"):\n        self.amount = amount\n        self.currency = currency\n    def __repr__(self):\n        return f"Money({self.amount}, '{self.currency}')"\n    def __add__(self, other):\n        if self.currency != other.currency:\n            raise ValueError("Currencies must match")\n        return Money(self.amount + other.amount, self.currency)\n\nm1 = Money(150.50)\nm2 = Money(49.50)\nm3 = m1 + m2\nprint("Total:", m3)`,
      `Implement __add__ and __repr__ dunder methods.`,
      `Triển khai các phương thức dunder __add__ và __repr__.`,
      `Operator overloading enables intuitive domain-driven design and mathematical expressiveness.`,
      `Nạp chồng toán tử giúp mã nguồn diễn đạt tự nhiên và giàu tính nghiệp vụ.`)
  );

  return { questions, exercises };
}
