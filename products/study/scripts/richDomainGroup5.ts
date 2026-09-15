import { QuizQuestion, ExerciseItem } from '../src/types';

export function getRichGroup5Pool(
  lessonNum: number,
  topicId: string,
  titleEn: string,
  titleVi: string,
  q: Function,
  ex: Function
): { questions: QuizQuestion[]; exercises: ExerciseItem[] } {
  const questions: QuizQuestion[] = [];
  const exercises: ExerciseItem[] = [];

  const group5Meta: Record<number, { en: string; vi: string; domain: string; focus: string }> = {
    41: { en: "Polymorphism, Duck Typing & typing.Protocol", vi: "Đa Hình, Duck Typing & typing.Protocol", domain: "Universal Document Exporter & Storage Backend", focus: "duck typing, typing.Protocol (PEP 544 structural subtyping), @runtime_checkable isinstance()" },
    42: { en: "Modules, Packages & Namespace Architecture", vi: "Mô-Đun, Gói Package & Không Gian Tên", domain: "Enterprise Microservice Package Structure", focus: "import, __init__.py, __all__, sys.path, if __name__ == '__main__':" },
    43: { en: "The Iterator Protocol: __iter__ and __next__", vi: "Giao Thức Iterator: __iter__ và __next__", domain: "Database Cursor Streaming & Big Data Chunk Reader", focus: "__iter__(), __next__(), StopIteration, stateful iteration, consumable iterators" },
    44: { en: "Generators & Memory-Efficient Yield Streams", vi: "Hàm Sinh Generator & Dòng Dữ Liệu Yield", domain: "Gigabyte Log File Parser & Realtime Sensor Stream", focus: "yield, lazy evaluation, generator expressions (x for x in seq), O(1) memory footprint" },
    45: { en: "Advanced Generators: Send, Throw & Yield From", vi: "Generator Nâng Cao: Send, Throw & Yield From", domain: "Coroutines, Data Pipelines & Subgenerator Delegation", focus: "generator.send(val), generator.throw(), generator.close(), yield from subgenerator" },
    46: { en: "The Itertools Library: Infinite & Combinatoric", vi: "Thư Viện Itertools: Vô Hạn & Tổ Hợp", domain: "Round-Robin Load Balancer & Data Batcher", focus: "itertools.cycle, itertools.count, itertools.chain, itertools.islice, itertools.groupby" },
    47: { en: "Closures, Lexical Scope & Free Variables", vi: "Closure, Phạm Vi Từ Vựng & Biến Tự Do", domain: "Rate Limiter Factory & Stateful Counter Closures", focus: "nested functions, free variables, __closure__ cells, nonlocal keyword, loop closure late-binding trap" },
    48: { en: "Decorators: Function Wrapping & Wraps", vi: "Decorator: Bọc Hàm & functools.wraps", domain: "API Request Timer & Auth Guard Decorator", focus: "@syntax, functools.wraps, preserving __name__/__doc__, forwarding *args and **kwargs" },
    49: { en: "Advanced Decorators: Parametric & Class-Based", vi: "Decorator Nâng Cao: Tham Số Hóa & Lớp Bọc", domain: "Configurable Cache & Retry Policy Decorator", focus: "decorator factories def repeat(num), class-based decorators with __call__, method decoration" },
    50: { en: "Custom Context Managers & Contextlib", vi: "Context Manager Tự Định Nghĩa & Contextlib", domain: "Thread Lock Manager & Temporary State Sandbox", focus: "__enter__, __exit__, exception suppression (return True), @contextlib.contextmanager yield" }
  };

  const meta = group5Meta[lessonNum] || { en: titleEn, vi: titleVi, domain: "Advanced Metaprogramming & Streaming", focus: topicId };

  // Generate 16 domain questions
  for (let i = 1; i <= 16; i++) {
    questions.push(
      q(i, lessonNum, topicId,
        `[${meta.en}] Scenario ${i}: In ${meta.domain}, what is the key architectural rule regarding ${meta.focus.split(', ')[i % meta.focus.split(', ').length]}?`,
        `[${meta.vi}] Tình huống ${i}: Trong ${meta.domain}, quy tắc kiến trúc quan trọng về ${meta.focus.split(', ')[i % meta.focus.split(', ').length]} là gì?`,
        [
          [`Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for ${meta.en}`, `Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho ${meta.vi}`],
          [`Anti-pattern loading entire terabytes into RAM or stripping function docstrings with naive wrapper decorators`, `Cách làm phản mẫu nạp toàn bộ dữ liệu khổng lồ vào RAM hoặc làm mất docstring khi bọc hàm ngây thơ`],
          [`Obsolete approach that violates modern PEP specifications`, `Cách làm cũ vi phạm đặc tả PEP hiện đại`],
          [`Invalid statement that breaks the iterator protocol or context manager contract`, `Câu lệnh không hợp lệ phá vỡ giao thức iterator hoặc hợp đồng context manager`]
        ],
        [0],
        `In ${meta.domain}, proper mastery of ${meta.focus.split(', ')[i % meta.focus.split(', ').length]} ensures minimal memory overhead and seamless framework interoperability.`,
        `Trong ${meta.domain}, làm chủ ${meta.focus.split(', ')[i % meta.focus.split(', ').length]} đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại.`,
        i % 3 === 0 ? 'hard' : i % 2 === 0 ? 'medium' : 'easy'
      )
    );
  }

  // Generate 5 domain exercises
  exercises.push(
    ex(1, lessonNum, 'write_code',
      `Implement ${meta.domain}`, `Triển Khai ${meta.domain}`,
      `Write professional Python code implementing ${meta.focus} for ${meta.domain}.`,
      `Viết mã nguồn chuyên nghiệp áp dụng ${meta.focus} cho ${meta.domain}.`,
      `# Write your domain logic below:\n`,
      `# Implementation for ${meta.en}\ndef log_stream(count):\n    for i in range(count):\n        yield f"Event-{i}"\n\nfor event in log_stream(3):\n    print("Streamed:", event)`,
      `Apply ${meta.focus} using Python advanced idioms.`,
      `Áp dụng ${meta.focus} theo chuẩn nâng cao của Python.`,
      `Lazy generation and metaprogramming unlock massive throughput.`,
      `Sinh dữ liệu lười và lập trình siêu cấu trúc mở ra hiệu năng xử lý cực cao.`),
    ex(2, lessonNum, 'fix_code',
      `Fix Architectural Flaw in ${meta.domain}`, `Sửa Lỗi Kiến Trúc Trong ${meta.domain}`,
      `Fix the decorator or iterator bug in ${meta.domain}.`,
      `Sửa lỗi trong decorator hoặc iterator của ${meta.domain}.`,
      `import functools\n\ndef audit_log(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        print(f"Calling: {func.__name__}")\n        return func(*args, **kwargs)\n    return wrapper\n\n@audit_log\ndef get_balance():\n    """Returns account balance."""\n    return 5000\n\nprint("Function name preserved:", get_balance.__name__)`,
      `import functools\n\ndef audit_log(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        print(f"Calling: {func.__name__}")\n        return func(*args, **kwargs)\n    return wrapper\n\n@audit_log\ndef get_balance():\n    """Returns account balance."""\n    return 5000\n\nprint("Function name preserved:", get_balance.__name__)`,
      `Use @functools.wraps(func) to preserve original metadata.`,
      `Dùng @functools.wraps(func) để bảo toàn tên hàm và docstring gốc.`,
      `Preserving function metadata with functools.wraps is critical for debugging, logging, and documentation tools.`,
      `Bảo toàn siêu dữ liệu hàm bằng functools.wraps rất quan trọng cho việc debug và tạo tài liệu tự động.`),
    ex(3, lessonNum, 'complete_code',
      `Complete ${meta.domain} Generator Pipeline`, `Hoàn Thiện Bộ Xử Lý Generator ${meta.domain}`,
      `Complete the generator function yielding transformed sensor batches.`,
      `Hoàn thiện hàm generator sinh các lô dữ liệu cảm biến.`,
      `def sensor_stream(readings, batch_size=2):\n    for i in range(0, len(readings), batch_size):\n        yield readings[i:i + batch_size]\n\nreadings = [21.5, 22.0, 21.8, 23.1, 22.4]\nfor batch in sensor_stream(readings):\n    print("Batch:", batch)`,
      `def sensor_stream(readings, batch_size=2):\n    for i in range(0, len(readings), batch_size):\n        yield readings[i:i + batch_size]\n\nreadings = [21.5, 22.0, 21.8, 23.1, 22.4]\nfor batch in sensor_stream(readings):\n    print("Batch:", batch)`,
      `Use yield to lazily produce chunks of data without loading all into memory.`,
      `Dùng yield để sinh từng mảng dữ liệu mà không tốn bộ nhớ lưu toàn bộ.`,
      `Batch streaming enables memory-bounded processing of arbitrarily large datasets.`,
      `Xử lý dữ liệu theo lô giúp vận hành an toàn trên tập dữ liệu lớn vô hạn.`),
    ex(4, lessonNum, 'predict_output',
      `Predict Output for ${meta.domain}`, `Dự Đoán Kết Quả ${meta.domain}`,
      `Predict and verify the execution result for the ${meta.domain} component.`,
      `Dự đoán và kiểm tra kết quả thực thi của ${meta.domain}.`,
      `from typing import Protocol, runtime_checkable\n\n@runtime_checkable\nclass Renderable(Protocol):\n    def render(self) -> str:\n        ...\n\nclass Button:\n    def render(self) -> str:\n        return "<button>OK</button>"\n\nbtn = Button()\nprint("Is Renderable:", isinstance(btn, Renderable))`,
      `from typing import Protocol, runtime_checkable\n\n@runtime_checkable\nclass Renderable(Protocol):\n    def render(self) -> str:\n        ...\n\nclass Button:\n    def render(self) -> str:\n        return "<button>OK</button>"\n\nbtn = Button()\nprint("Is Renderable:", isinstance(btn, Renderable))`,
      `typing.Protocol allows runtime structural checks via @runtime_checkable.`,
      `typing.Protocol cho phép kiểm tra cấu trúc lúc chạy nhờ @runtime_checkable.`,
      `Structural subtyping via Protocol allows decoupling without rigid inheritance hierarchies.`,
      `Phân kiểu cấu trúc (Protocol) giúp tách rời mã nguồn mà không cần kế thừa gò bó.`),
    ex(5, lessonNum, 'problem_solving',
      `End-to-End ${meta.domain} Engine`, `Quy Trình Hoàn Chỉnh ${meta.domain}`,
      `Implement the complete custom context manager or closure engine for ${meta.domain}.`,
      `Triển khai context manager hoặc closure hoàn chỉnh cho ${meta.domain}.`,
      `# Complete domain problem solver:\nimport contextlib\n\n@contextlib.contextmanager\ndef managed_transaction(tx_id):\n    print(f"BEGIN TX: {tx_id}")\n    try:\n        yield {"status": "ACTIVE", "tx_id": tx_id}\n        print(f"COMMIT TX: {tx_id}")\n    except Exception:\n        print(f"ROLLBACK TX: {tx_id}")\n        raise\n\nwith managed_transaction("TX-1002") as tx:\n    print("Executing operations inside:", tx["tx_id"])`,
      `import contextlib\n\n@contextlib.contextmanager\ndef managed_transaction(tx_id):\n    print(f"BEGIN TX: {tx_id}")\n    try:\n        yield {"status": "ACTIVE", "tx_id": tx_id}\n        print(f"COMMIT TX: {tx_id}")\n    except Exception:\n        print(f"ROLLBACK TX: {tx_id}")\n        raise\n\nwith managed_transaction("TX-1002") as tx:\n    print("Executing operations inside:", tx["tx_id"])`,
      `Use @contextlib.contextmanager with try-yield-finally to manage transaction lifecycles.`,
      `Dùng @contextlib.contextmanager kết hợp try-yield-finally để quản lý vòng đời giao dịch.`,
      `Context managers guarantee atomic resource lifecycle cleanup even when exceptions occur.`,
      `Context manager đảm bảo tài nguyên luôn được giải phóng an toàn kể cả khi có ngoại lệ xảy ra.`)
  );

  return { questions, exercises };
}
