import { Lesson } from '../../../../types';

export const lesson27: Lesson = {
  "id": "py_lesson_27",
  "moduleId": "py_mod_11",
  "levelId": "advanced",
  "courseId": "python",
  "order": 27,
  "topicId": "python_iterator_protocol",
  "title": {
    "en": "Iterators, Iterable Protocol & Custom Iterators (__iter__, __next__)",
    "vi": "Iterators, Giao Thức Lặp Iterable & Custom Iterators (__iter__, __next__)"
  },
  "summary": {
    "en": "Master Python's iteration mechanics: difference between Iterables and Iterators, manual iteration using iter() and next(), StopIteration exception lifecycle, and building stateful custom iterator classes.",
    "vi": "Làm chủ cơ chế lặp trong Python: phân biệt Iterable và Iterator, lặp thủ công bằng iter() và next(), vòng đời ngoại lệ StopIteration và xây dựng lớp iterator tùy chỉnh có trạng thái."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "The iteration protocol is the backbone of Python's data flow. Every for-loop, list comprehension, and unpacking syntax relies on the Iterable and Iterator protocols. Understanding how __iter__ and __next__ work enables writing memory-efficient infinite streams and custom traversals.",
      "vi": "Giao thức lặp là xương sống trong luồng xử lý dữ liệu của Python. Mọi vòng lặp for, list comprehension và thao tác giải nén đều dựa trên giao thức Iterable và Iterator. Hiểu rõ cách hoạt động của __iter__ và __next__ cho phép bạn xây dựng các luồng dữ liệu vô hạn tiết kiệm bộ nhớ và các bộ duyệt tùy biến."
    },
    "conceptExplanation": {
      "en": "The Iteration Protocol Anatomy:\n1. Iterable: Any object defining __iter__() that returns an iterator (e.g. lists, dicts, strings, files).\n2. Iterator: Any object defining __next__() (returns next item or raises StopIteration) AND __iter__() (returning self).\n3. Manual Iteration Flow: it = iter(obj) -> next(it) -> next(it) -> ... -> raises StopIteration when exhausted.\n4. Default Sentinel: next(it, default_value) returns default_value instead of raising StopIteration.",
      "vi": "Cấu Trúc Giao Thức Lặp:\n1. Iterable: Bất kỳ đối tượng nào có hàm __iter__() trả về một iterator (như list, dict, str, file).\n2. Iterator: Bất kỳ đối tượng nào định nghĩa cả __next__() (trả về phần tử tiếp theo hoặc ném StopIteration) VÀ __iter__() (trả về chính nó self).\n3. Luồng lặp thủ công: it = iter(obj) -> next(it) -> next(it) -> ... -> ném StopIteration khi hết dữ liệu.\n4. Giá trị lính canh: next(it, default_value) trả về giá trị mặc định thay vì báo lỗi StopIteration."
    },
    "syntax": "class CountDown:\n    def __init__(self, start: int):\n        self.current = start\n\n    def __iter__(self):\n        return self\n\n    def __next__(self) -> int:\n        if self.current <= 0:\n            raise StopIteration\n        val = self.current\n        self.current -= 1\n        return val\n\n# Usage in for loop\nfor num in CountDown(3):\n    print(num)  # 3, 2, 1",
    "examples": [
      {
        "title": {
          "en": "Chunked Data Window Iterator",
          "vi": "Bộ Duyệt Dữ Liệu Theo Cửa Sổ Khối (Chunked Window)"
        },
        "code": "class ChunkIterator:\n    def __init__(self, data, chunk_size):\n        self.data = list(data)\n        self.chunk_size = chunk_size\n        self.cursor = 0\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        if self.cursor >= len(self.data):\n            raise StopIteration\n        chunk = self.data[self.cursor : self.cursor + self.chunk_size]\n        self.cursor += self.chunk_size\n        return chunk\n\nitems = [\"A\", \"B\", \"C\", \"D\", \"E\", \"F\", \"G\"]\nfor chunk in ChunkIterator(items, 3):\n    print(\"Processing Batch:\", chunk)",
        "language": "python",
        "explanation": {
          "en": "Demonstrates building a robust stateful custom iterator that chunks a sequence on demand.",
          "vi": "Minh họa xây dựng lớp iterator tùy biến có lưu trạng thái con trỏ để chia khối dữ liệu theo yêu cầu."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Forgetting to implement __iter__(self) on a custom iterator class, causing TypeError: 'ClassName' object is not iterable when passed to for-loops",
          "vi": "Quên cài đặt hàm __iter__(self) trên lớp iterator tùy chỉnh, gây lỗi TypeError: 'ClassName' object is not iterable khi truyền vào vòng lặp for"
        },
        "correction": {
          "en": "Every iterator MUST define def __iter__(self): return self so it can be passed directly to for-loops and built-ins.",
          "vi": "Mọi iterator bắt buộc phải định nghĩa def __iter__(self): return self để có thể dùng trực tiếp trong vòng lặp for và các hàm có sẵn."
        },
        "code": "def __iter__(self):\n    return self"
      }
    ],
    "tips": [
      {
        "en": "Use iter(callable, sentinel) to create an iterator that calls a zero-argument function repeatedly until it returns sentinel (e.g. iter(file.readline, \"\")).",
        "vi": "Dùng iter(callable, sentinel) để tạo iterator gọi hàm 0 tham số lặp đi lặp lại cho đến khi gặp giá trị lính canh sentinel (ví dụ iter(file.readline, \"\"))."
      }
    ],
    "practice": {
      "task": {
        "en": "Implement Fibonacci Sequence Iterator",
        "vi": "Triển khai Iterator sinh dãy Fibonacci"
      },
      "instruction": {
        "en": "Create class FibonacciIterator(max_count): store count and state (a=0, b=1). In __next__, yield up to max_count terms, updating a, b = b, a + b. Test for fib in FibonacciIterator(5) and print terms.",
        "vi": "Tạo class FibonacciIterator sinh n số Fibonacci đầu tiên bằng __next__ và StopIteration. In kết quả 5 số đầu."
      },
      "starterCode": "# Fibonacci Iterator\n",
      "solutionCode": "class FibonacciIterator:\n    def __init__(self, max_count):\n        self.max_count = max_count\n        self.count = 0\n        self.a, self.b = 0, 1\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        if self.count >= self.max_count:\n            raise StopIteration\n        val = self.a\n        self.a, self.b = self.b, self.a + self.b\n        self.count += 1\n        return val\n\nprint(\"Fibonacci:\", list(FibonacciIterator(6)))\n",
      "expectedOutput": "Fibonacci: [0, 1, 1, 2, 3, 5]",
      "requiredPatterns": [],
      "hint": {
        "en": "raise StopIteration when count >= max_count",
        "vi": "raise StopIteration when count >= max_count"
      }
    },
    "consolidationPractice": {
      "task": {
        "en": "Manual Iteration with next() and Sentinel Default",
        "vi": "Lặp thủ công với next() và giá trị mặc định"
      },
      "instruction": {
        "en": "Create it = iter([10, 20]). Call next(it) twice, then call next(it, \"EOF\") twice. Print all returned values.",
        "vi": "Tạo iterator từ [10, 20]. Gọi next(it) 2 lần, sau đó gọi next(it, \"EOF\") 2 lần. In toàn bộ giá trị."
      },
      "starterCode": "# Manual iteration\n",
      "solutionCode": "it = iter([10, 20])\nprint(next(it))\nprint(next(it))\nprint(next(it, \"EOF\"))\nprint(next(it, \"EOF\"))\n",
      "expectedOutput": "10\n20\nEOF\nEOF",
      "requiredPatterns": [],
      "hint": {
        "en": "next(it, \"EOF\")",
        "vi": "next(it, \"EOF\")"
      }
    }
  },
  "exercisePool": [
    {
      "id": "py_ex_45_1",
      "type": "write_code",
      "title": {
        "en": "Implement Coroutines, Data Pipelines & Subgenerator Delegation",
        "vi": "Triển Khai Coroutines, Data Pipelines & Subgenerator Delegation"
      },
      "instruction": {
        "en": "Write professional Python code implementing generator.send(val), generator.throw(), generator.close(), yield from subgenerator for Coroutines, Data Pipelines & Subgenerator Delegation.",
        "vi": "Viết mã nguồn chuyên nghiệp áp dụng generator.send(val), generator.throw(), generator.close(), yield from subgenerator cho Coroutines, Data Pipelines & Subgenerator Delegation."
      },
      "starterCode": "# Write your domain logic below:\n",
      "solutionCode": "# Implementation for Advanced Generators: Send, Throw & Yield From\ndef log_stream(count):\n    for i in range(count):\n        yield f\"Event-{i}\"\n\nfor event in log_stream(3):\n    print(\"Streamed:\", event)",
      "hint": {
        "en": "Apply generator.send(val), generator.throw(), generator.close(), yield from subgenerator using Python advanced idioms.",
        "vi": "Áp dụng generator.send(val), generator.throw(), generator.close(), yield from subgenerator theo chuẩn nâng cao của Python."
      },
      "explanation": {
        "en": "Lazy generation and metaprogramming unlock massive throughput.",
        "vi": "Sinh dữ liệu lười và lập trình siêu cấu trúc mở ra hiệu năng xử lý cực cao."
      }
    },
    {
      "id": "py_ex_45_2",
      "type": "fix_code",
      "title": {
        "en": "Fix Architectural Flaw in Coroutines, Data Pipelines & Subgenerator Delegation",
        "vi": "Sửa Lỗi Kiến Trúc Trong Coroutines, Data Pipelines & Subgenerator Delegation"
      },
      "instruction": {
        "en": "Fix the decorator or iterator bug in Coroutines, Data Pipelines & Subgenerator Delegation.",
        "vi": "Sửa lỗi trong decorator hoặc iterator của Coroutines, Data Pipelines & Subgenerator Delegation."
      },
      "starterCode": "import functools\n\ndef audit_log(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        print(f\"Calling: {func.__name__}\")\n        return func(*args, **kwargs)\n    return wrapper\n\n@audit_log\ndef get_balance():\n    \"\"\"Returns account balance.\"\"\"\n    return 5000\n\nprint(\"Function name preserved:\", get_balance.__name__)",
      "solutionCode": "import functools\n\ndef audit_log(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        print(f\"Calling: {func.__name__}\")\n        return func(*args, **kwargs)\n    return wrapper\n\n@audit_log\ndef get_balance():\n    \"\"\"Returns account balance.\"\"\"\n    return 5000\n\nprint(\"Function name preserved:\", get_balance.__name__)",
      "hint": {
        "en": "Use @functools.wraps(func) to preserve original metadata.",
        "vi": "Dùng @functools.wraps(func) để bảo toàn tên hàm và docstring gốc."
      },
      "explanation": {
        "en": "Preserving function metadata with functools.wraps is critical for debugging, logging, and documentation tools.",
        "vi": "Bảo toàn siêu dữ liệu hàm bằng functools.wraps rất quan trọng cho việc debug và tạo tài liệu tự động."
      }
    },
    {
      "id": "py_ex_45_3",
      "type": "complete_code",
      "title": {
        "en": "Complete Coroutines, Data Pipelines & Subgenerator Delegation Generator Pipeline",
        "vi": "Hoàn Thiện Bộ Xử Lý Generator Coroutines, Data Pipelines & Subgenerator Delegation"
      },
      "instruction": {
        "en": "Complete the generator function yielding transformed sensor batches.",
        "vi": "Hoàn thiện hàm generator sinh các lô dữ liệu cảm biến."
      },
      "starterCode": "def sensor_stream(readings, batch_size=2):\n    for i in range(0, len(readings), batch_size):\n        yield readings[i:i + batch_size]\n\nreadings = [21.5, 22.0, 21.8, 23.1, 22.4]\nfor batch in sensor_stream(readings):\n    print(\"Batch:\", batch)",
      "solutionCode": "def sensor_stream(readings, batch_size=2):\n    for i in range(0, len(readings), batch_size):\n        yield readings[i:i + batch_size]\n\nreadings = [21.5, 22.0, 21.8, 23.1, 22.4]\nfor batch in sensor_stream(readings):\n    print(\"Batch:\", batch)",
      "hint": {
        "en": "Use yield to lazily produce chunks of data without loading all into memory.",
        "vi": "Dùng yield để sinh từng mảng dữ liệu mà không tốn bộ nhớ lưu toàn bộ."
      },
      "explanation": {
        "en": "Batch streaming enables memory-bounded processing of arbitrarily large datasets.",
        "vi": "Xử lý dữ liệu theo lô giúp vận hành an toàn trên tập dữ liệu lớn vô hạn."
      }
    },
    {
      "id": "py_ex_45_4",
      "type": "predict_output",
      "title": {
        "en": "Predict Output for Coroutines, Data Pipelines & Subgenerator Delegation",
        "vi": "Dự Đoán Kết Quả Coroutines, Data Pipelines & Subgenerator Delegation"
      },
      "instruction": {
        "en": "Predict and verify the execution result for the Coroutines, Data Pipelines & Subgenerator Delegation component.",
        "vi": "Dự đoán và kiểm tra kết quả thực thi của Coroutines, Data Pipelines & Subgenerator Delegation."
      },
      "starterCode": "from typing import Protocol, runtime_checkable\n\n@runtime_checkable\nclass Renderable(Protocol):\n    def render(self) -> str:\n        ...\n\nclass Button:\n    def render(self) -> str:\n        return \"<button>OK</button>\"\n\nbtn = Button()\nprint(\"Is Renderable:\", isinstance(btn, Renderable))",
      "solutionCode": "from typing import Protocol, runtime_checkable\n\n@runtime_checkable\nclass Renderable(Protocol):\n    def render(self) -> str:\n        ...\n\nclass Button:\n    def render(self) -> str:\n        return \"<button>OK</button>\"\n\nbtn = Button()\nprint(\"Is Renderable:\", isinstance(btn, Renderable))",
      "hint": {
        "en": "typing.Protocol allows runtime structural checks via @runtime_checkable.",
        "vi": "typing.Protocol cho phép kiểm tra cấu trúc lúc chạy nhờ @runtime_checkable."
      },
      "explanation": {
        "en": "Structural subtyping via Protocol allows decoupling without rigid inheritance hierarchies.",
        "vi": "Phân kiểu cấu trúc (Protocol) giúp tách rời mã nguồn mà không cần kế thừa gò bó."
      }
    },
    {
      "id": "py_ex_45_5",
      "type": "problem_solving",
      "title": {
        "en": "End-to-End Coroutines, Data Pipelines & Subgenerator Delegation Engine",
        "vi": "Quy Trình Hoàn Chỉnh Coroutines, Data Pipelines & Subgenerator Delegation"
      },
      "instruction": {
        "en": "Implement the complete custom context manager or closure engine for Coroutines, Data Pipelines & Subgenerator Delegation.",
        "vi": "Triển khai context manager hoặc closure hoàn chỉnh cho Coroutines, Data Pipelines & Subgenerator Delegation."
      },
      "starterCode": "# Complete domain problem solver:\nimport contextlib\n\n@contextlib.contextmanager\ndef managed_transaction(tx_id):\n    print(f\"BEGIN TX: {tx_id}\")\n    try:\n        yield {\"status\": \"ACTIVE\", \"tx_id\": tx_id}\n        print(f\"COMMIT TX: {tx_id}\")\n    except Exception:\n        print(f\"ROLLBACK TX: {tx_id}\")\n        raise\n\nwith managed_transaction(\"TX-1002\") as tx:\n    print(\"Executing operations inside:\", tx[\"tx_id\"])",
      "solutionCode": "import contextlib\n\n@contextlib.contextmanager\ndef managed_transaction(tx_id):\n    print(f\"BEGIN TX: {tx_id}\")\n    try:\n        yield {\"status\": \"ACTIVE\", \"tx_id\": tx_id}\n        print(f\"COMMIT TX: {tx_id}\")\n    except Exception:\n        print(f\"ROLLBACK TX: {tx_id}\")\n        raise\n\nwith managed_transaction(\"TX-1002\") as tx:\n    print(\"Executing operations inside:\", tx[\"tx_id\"])",
      "hint": {
        "en": "Use @contextlib.contextmanager with try-yield-finally to manage transaction lifecycles.",
        "vi": "Dùng @contextlib.contextmanager kết hợp try-yield-finally để quản lý vòng đời giao dịch."
      },
      "explanation": {
        "en": "Context managers guarantee atomic resource lifecycle cleanup even when exceptions occur.",
        "vi": "Context manager đảm bảo tài nguyên luôn được giải phóng an toàn kể cả khi có ngoại lệ xảy ra."
      }
    }
  ],
  "challenge": {
    "id": "py_ch_45",
    "title": {
      "en": "Bidirectional Sliding-Window Moving Average Stream Iterator",
      "vi": "Bộ Duyệt Dòng Tính Trung Bình Trượt Cửa Sổ Trượt Tùy Chỉnh"
    },
    "description": {
      "en": "Implement a specialized MovingAverageIterator class satisfying the full iterator protocol:\n1. class MovingAverageIterator:\n   - __init__(self, stream, window_size):\n     - store stream = list(stream)\n     - store window_size = window_size\n     - store cursor = 0\n   - __iter__(self): return self\n   - __next__(self):\n     - While cursor + window_size <= len(stream):\n       - slice current window = stream[cursor : cursor + window_size]\n       - compute window average = sum(window) / window_size, rounded to 2 decimal places\n       - advance cursor by 1\n       - return (window, avg)\n     - Raise StopIteration when not enough elements remain for a full window.\n2. Instantiate with stream = [10, 20, 30, 40, 50, 60] and window_size = 3.\n3. Iterate and print each step in format:\n\"Window: [10, 20, 30] -> Avg: 20.0\"\n\"Window: [20, 30, 40] -> Avg: 30.0\"\n\"Window: [30, 40, 50] -> Avg: 40.0\"\n\"Window: [40, 50, 60] -> Avg: 50.0\".",
      "vi": "Xây dựng lớp MovingAverageIterator tuân thủ đầy đủ giao thức iterator protocol:\n1. __init__ nhận stream và window_size\n2. __iter__ trả về self\n3. __next__ trượt cửa sổ 1 vị trí mỗi lần, tính trung bình cộng làm tròn 2 chữ số thập phân, trả về (window, avg)\n4. Ném StopIteration khi không còn đủ phần tử cho một cửa sổ\nChạy thử với dữ liệu mẫu và in kết quả đúng mẫu."
    },
    "requirements": [
      {
        "en": "Implement custom iterator class with stateful window cursor tracking",
        "vi": "Triển khai lớp custom iterator với con trỏ theo dõi trạng thái cửa sổ"
      },
      {
        "en": "Enforce complete __iter__ and __next__ iteration contract",
        "vi": "Tuân thủ đầy đủ hợp đồng giao thức lặp __iter__ và __next__"
      },
      {
        "en": "Terminate cleanly via StopIteration exception",
        "vi": "Kết thúc sạch sẽ thông qua ngoại lệ StopIteration"
      }
    ],
    "starterCode": "# Build Moving Average Stream Iterator\n",
    "solutionCode": "class MovingAverageIterator:\n    def __init__(self, stream, window_size):\n        self.stream = list(stream)\n        self.window_size = window_size\n        self.cursor = 0\n\n    def __iter__(self):\n        return self\n\n    def __next__(self):\n        if self.cursor + self.window_size > len(self.stream):\n            raise StopIteration\n        window = self.stream[self.cursor : self.cursor + self.window_size]\n        avg = round(sum(window) / self.window_size, 2)\n        self.cursor += 1\n        return window, avg\n\nstream = [10, 20, 30, 40, 50, 60]\nfor window, avg in MovingAverageIterator(stream, 3):\n    print(f\"Window: {window} -> Avg: {avg}\")\n",
    "hints": [
      {
        "en": "if self.cursor + self.window_size > len(self.stream): raise StopIteration",
        "vi": "if self.cursor + self.window_size > len(self.stream): raise StopIteration"
      }
    ],
    "solutionExplanation": {
      "en": "Demonstrates implementing stateful stream processing algorithms directly on top of Python's low-level iterator protocol.",
      "vi": "Minh họa cài đặt thuật toán xử lý luồng dữ liệu có trạng thái trực tiếp trên nền giao thức iterator cấp thấp của Python."
    }
  },
  "quizQuestionPool": [
    {
      "id": "py_q_45_1",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Generators: Send, Throw & Yield From] Scenario 1: In Coroutines, Data Pipelines & Subgenerator Delegation, what is the key architectural rule regarding generator.throw()?",
        "vi": "[Generator Nâng Cao: Send, Throw & Yield From] Tình huống 1: Trong Coroutines, Data Pipelines & Subgenerator Delegation, quy tắc kiến trúc quan trọng về generator.throw() là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Advanced Generators: Send, Throw & Yield From",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Generator Nâng Cao: Send, Throw & Yield From"
        },
        {
          "en": "Anti-pattern loading entire terabytes into RAM or stripping function docstrings with naive wrapper decorators",
          "vi": "Cách làm phản mẫu nạp toàn bộ dữ liệu khổng lồ vào RAM hoặc làm mất docstring khi bọc hàm ngây thơ"
        },
        {
          "en": "Obsolete approach that violates modern PEP specifications",
          "vi": "Cách làm cũ vi phạm đặc tả PEP hiện đại"
        },
        {
          "en": "Invalid statement that breaks the iterator protocol or context manager contract",
          "vi": "Câu lệnh không hợp lệ phá vỡ giao thức iterator hoặc hợp đồng context manager"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Coroutines, Data Pipelines & Subgenerator Delegation, proper mastery of generator.throw() ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Coroutines, Data Pipelines & Subgenerator Delegation, làm chủ generator.throw() đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_iterator_protocol",
      "difficulty": "easy"
    },
    {
      "id": "py_q_45_2",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Generators: Send, Throw & Yield From] Scenario 2: In Coroutines, Data Pipelines & Subgenerator Delegation, what is the key architectural rule regarding generator.close()?",
        "vi": "[Generator Nâng Cao: Send, Throw & Yield From] Tình huống 2: Trong Coroutines, Data Pipelines & Subgenerator Delegation, quy tắc kiến trúc quan trọng về generator.close() là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Advanced Generators: Send, Throw & Yield From",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Generator Nâng Cao: Send, Throw & Yield From"
        },
        {
          "en": "Anti-pattern loading entire terabytes into RAM or stripping function docstrings with naive wrapper decorators",
          "vi": "Cách làm phản mẫu nạp toàn bộ dữ liệu khổng lồ vào RAM hoặc làm mất docstring khi bọc hàm ngây thơ"
        },
        {
          "en": "Obsolete approach that violates modern PEP specifications",
          "vi": "Cách làm cũ vi phạm đặc tả PEP hiện đại"
        },
        {
          "en": "Invalid statement that breaks the iterator protocol or context manager contract",
          "vi": "Câu lệnh không hợp lệ phá vỡ giao thức iterator hoặc hợp đồng context manager"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Coroutines, Data Pipelines & Subgenerator Delegation, proper mastery of generator.close() ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Coroutines, Data Pipelines & Subgenerator Delegation, làm chủ generator.close() đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_iterator_protocol",
      "difficulty": "medium"
    },
    {
      "id": "py_q_45_3",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Generators: Send, Throw & Yield From] Scenario 3: In Coroutines, Data Pipelines & Subgenerator Delegation, what is the key architectural rule regarding yield from subgenerator?",
        "vi": "[Generator Nâng Cao: Send, Throw & Yield From] Tình huống 3: Trong Coroutines, Data Pipelines & Subgenerator Delegation, quy tắc kiến trúc quan trọng về yield from subgenerator là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Advanced Generators: Send, Throw & Yield From",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Generator Nâng Cao: Send, Throw & Yield From"
        },
        {
          "en": "Anti-pattern loading entire terabytes into RAM or stripping function docstrings with naive wrapper decorators",
          "vi": "Cách làm phản mẫu nạp toàn bộ dữ liệu khổng lồ vào RAM hoặc làm mất docstring khi bọc hàm ngây thơ"
        },
        {
          "en": "Obsolete approach that violates modern PEP specifications",
          "vi": "Cách làm cũ vi phạm đặc tả PEP hiện đại"
        },
        {
          "en": "Invalid statement that breaks the iterator protocol or context manager contract",
          "vi": "Câu lệnh không hợp lệ phá vỡ giao thức iterator hoặc hợp đồng context manager"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Coroutines, Data Pipelines & Subgenerator Delegation, proper mastery of yield from subgenerator ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Coroutines, Data Pipelines & Subgenerator Delegation, làm chủ yield from subgenerator đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_iterator_protocol",
      "difficulty": "hard"
    },
    {
      "id": "py_q_45_4",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Generators: Send, Throw & Yield From] Scenario 4: In Coroutines, Data Pipelines & Subgenerator Delegation, what is the key architectural rule regarding generator.send(val)?",
        "vi": "[Generator Nâng Cao: Send, Throw & Yield From] Tình huống 4: Trong Coroutines, Data Pipelines & Subgenerator Delegation, quy tắc kiến trúc quan trọng về generator.send(val) là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Advanced Generators: Send, Throw & Yield From",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Generator Nâng Cao: Send, Throw & Yield From"
        },
        {
          "en": "Anti-pattern loading entire terabytes into RAM or stripping function docstrings with naive wrapper decorators",
          "vi": "Cách làm phản mẫu nạp toàn bộ dữ liệu khổng lồ vào RAM hoặc làm mất docstring khi bọc hàm ngây thơ"
        },
        {
          "en": "Obsolete approach that violates modern PEP specifications",
          "vi": "Cách làm cũ vi phạm đặc tả PEP hiện đại"
        },
        {
          "en": "Invalid statement that breaks the iterator protocol or context manager contract",
          "vi": "Câu lệnh không hợp lệ phá vỡ giao thức iterator hoặc hợp đồng context manager"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Coroutines, Data Pipelines & Subgenerator Delegation, proper mastery of generator.send(val) ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Coroutines, Data Pipelines & Subgenerator Delegation, làm chủ generator.send(val) đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_iterator_protocol",
      "difficulty": "medium"
    },
    {
      "id": "py_q_45_5",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Generators: Send, Throw & Yield From] Scenario 5: In Coroutines, Data Pipelines & Subgenerator Delegation, what is the key architectural rule regarding generator.throw()?",
        "vi": "[Generator Nâng Cao: Send, Throw & Yield From] Tình huống 5: Trong Coroutines, Data Pipelines & Subgenerator Delegation, quy tắc kiến trúc quan trọng về generator.throw() là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Advanced Generators: Send, Throw & Yield From",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Generator Nâng Cao: Send, Throw & Yield From"
        },
        {
          "en": "Anti-pattern loading entire terabytes into RAM or stripping function docstrings with naive wrapper decorators",
          "vi": "Cách làm phản mẫu nạp toàn bộ dữ liệu khổng lồ vào RAM hoặc làm mất docstring khi bọc hàm ngây thơ"
        },
        {
          "en": "Obsolete approach that violates modern PEP specifications",
          "vi": "Cách làm cũ vi phạm đặc tả PEP hiện đại"
        },
        {
          "en": "Invalid statement that breaks the iterator protocol or context manager contract",
          "vi": "Câu lệnh không hợp lệ phá vỡ giao thức iterator hoặc hợp đồng context manager"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Coroutines, Data Pipelines & Subgenerator Delegation, proper mastery of generator.throw() ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Coroutines, Data Pipelines & Subgenerator Delegation, làm chủ generator.throw() đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_iterator_protocol",
      "difficulty": "easy"
    },
    {
      "id": "py_q_45_6",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Generators: Send, Throw & Yield From] Scenario 6: In Coroutines, Data Pipelines & Subgenerator Delegation, what is the key architectural rule regarding generator.close()?",
        "vi": "[Generator Nâng Cao: Send, Throw & Yield From] Tình huống 6: Trong Coroutines, Data Pipelines & Subgenerator Delegation, quy tắc kiến trúc quan trọng về generator.close() là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Advanced Generators: Send, Throw & Yield From",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Generator Nâng Cao: Send, Throw & Yield From"
        },
        {
          "en": "Anti-pattern loading entire terabytes into RAM or stripping function docstrings with naive wrapper decorators",
          "vi": "Cách làm phản mẫu nạp toàn bộ dữ liệu khổng lồ vào RAM hoặc làm mất docstring khi bọc hàm ngây thơ"
        },
        {
          "en": "Obsolete approach that violates modern PEP specifications",
          "vi": "Cách làm cũ vi phạm đặc tả PEP hiện đại"
        },
        {
          "en": "Invalid statement that breaks the iterator protocol or context manager contract",
          "vi": "Câu lệnh không hợp lệ phá vỡ giao thức iterator hoặc hợp đồng context manager"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Coroutines, Data Pipelines & Subgenerator Delegation, proper mastery of generator.close() ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Coroutines, Data Pipelines & Subgenerator Delegation, làm chủ generator.close() đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_iterator_protocol",
      "difficulty": "hard"
    },
    {
      "id": "py_q_45_7",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Generators: Send, Throw & Yield From] Scenario 7: In Coroutines, Data Pipelines & Subgenerator Delegation, what is the key architectural rule regarding yield from subgenerator?",
        "vi": "[Generator Nâng Cao: Send, Throw & Yield From] Tình huống 7: Trong Coroutines, Data Pipelines & Subgenerator Delegation, quy tắc kiến trúc quan trọng về yield from subgenerator là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Advanced Generators: Send, Throw & Yield From",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Generator Nâng Cao: Send, Throw & Yield From"
        },
        {
          "en": "Anti-pattern loading entire terabytes into RAM or stripping function docstrings with naive wrapper decorators",
          "vi": "Cách làm phản mẫu nạp toàn bộ dữ liệu khổng lồ vào RAM hoặc làm mất docstring khi bọc hàm ngây thơ"
        },
        {
          "en": "Obsolete approach that violates modern PEP specifications",
          "vi": "Cách làm cũ vi phạm đặc tả PEP hiện đại"
        },
        {
          "en": "Invalid statement that breaks the iterator protocol or context manager contract",
          "vi": "Câu lệnh không hợp lệ phá vỡ giao thức iterator hoặc hợp đồng context manager"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Coroutines, Data Pipelines & Subgenerator Delegation, proper mastery of yield from subgenerator ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Coroutines, Data Pipelines & Subgenerator Delegation, làm chủ yield from subgenerator đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_iterator_protocol",
      "difficulty": "easy"
    },
    {
      "id": "py_q_45_8",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Generators: Send, Throw & Yield From] Scenario 8: In Coroutines, Data Pipelines & Subgenerator Delegation, what is the key architectural rule regarding generator.send(val)?",
        "vi": "[Generator Nâng Cao: Send, Throw & Yield From] Tình huống 8: Trong Coroutines, Data Pipelines & Subgenerator Delegation, quy tắc kiến trúc quan trọng về generator.send(val) là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Advanced Generators: Send, Throw & Yield From",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Generator Nâng Cao: Send, Throw & Yield From"
        },
        {
          "en": "Anti-pattern loading entire terabytes into RAM or stripping function docstrings with naive wrapper decorators",
          "vi": "Cách làm phản mẫu nạp toàn bộ dữ liệu khổng lồ vào RAM hoặc làm mất docstring khi bọc hàm ngây thơ"
        },
        {
          "en": "Obsolete approach that violates modern PEP specifications",
          "vi": "Cách làm cũ vi phạm đặc tả PEP hiện đại"
        },
        {
          "en": "Invalid statement that breaks the iterator protocol or context manager contract",
          "vi": "Câu lệnh không hợp lệ phá vỡ giao thức iterator hoặc hợp đồng context manager"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Coroutines, Data Pipelines & Subgenerator Delegation, proper mastery of generator.send(val) ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Coroutines, Data Pipelines & Subgenerator Delegation, làm chủ generator.send(val) đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_iterator_protocol",
      "difficulty": "medium"
    },
    {
      "id": "py_q_45_9",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Generators: Send, Throw & Yield From] Scenario 9: In Coroutines, Data Pipelines & Subgenerator Delegation, what is the key architectural rule regarding generator.throw()?",
        "vi": "[Generator Nâng Cao: Send, Throw & Yield From] Tình huống 9: Trong Coroutines, Data Pipelines & Subgenerator Delegation, quy tắc kiến trúc quan trọng về generator.throw() là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Advanced Generators: Send, Throw & Yield From",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Generator Nâng Cao: Send, Throw & Yield From"
        },
        {
          "en": "Anti-pattern loading entire terabytes into RAM or stripping function docstrings with naive wrapper decorators",
          "vi": "Cách làm phản mẫu nạp toàn bộ dữ liệu khổng lồ vào RAM hoặc làm mất docstring khi bọc hàm ngây thơ"
        },
        {
          "en": "Obsolete approach that violates modern PEP specifications",
          "vi": "Cách làm cũ vi phạm đặc tả PEP hiện đại"
        },
        {
          "en": "Invalid statement that breaks the iterator protocol or context manager contract",
          "vi": "Câu lệnh không hợp lệ phá vỡ giao thức iterator hoặc hợp đồng context manager"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Coroutines, Data Pipelines & Subgenerator Delegation, proper mastery of generator.throw() ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Coroutines, Data Pipelines & Subgenerator Delegation, làm chủ generator.throw() đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_iterator_protocol",
      "difficulty": "hard"
    },
    {
      "id": "py_q_45_10",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Generators: Send, Throw & Yield From] Scenario 10: In Coroutines, Data Pipelines & Subgenerator Delegation, what is the key architectural rule regarding generator.close()?",
        "vi": "[Generator Nâng Cao: Send, Throw & Yield From] Tình huống 10: Trong Coroutines, Data Pipelines & Subgenerator Delegation, quy tắc kiến trúc quan trọng về generator.close() là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Advanced Generators: Send, Throw & Yield From",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Generator Nâng Cao: Send, Throw & Yield From"
        },
        {
          "en": "Anti-pattern loading entire terabytes into RAM or stripping function docstrings with naive wrapper decorators",
          "vi": "Cách làm phản mẫu nạp toàn bộ dữ liệu khổng lồ vào RAM hoặc làm mất docstring khi bọc hàm ngây thơ"
        },
        {
          "en": "Obsolete approach that violates modern PEP specifications",
          "vi": "Cách làm cũ vi phạm đặc tả PEP hiện đại"
        },
        {
          "en": "Invalid statement that breaks the iterator protocol or context manager contract",
          "vi": "Câu lệnh không hợp lệ phá vỡ giao thức iterator hoặc hợp đồng context manager"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Coroutines, Data Pipelines & Subgenerator Delegation, proper mastery of generator.close() ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Coroutines, Data Pipelines & Subgenerator Delegation, làm chủ generator.close() đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_iterator_protocol",
      "difficulty": "medium"
    },
    {
      "id": "py_q_45_11",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Generators: Send, Throw & Yield From] Scenario 11: In Coroutines, Data Pipelines & Subgenerator Delegation, what is the key architectural rule regarding yield from subgenerator?",
        "vi": "[Generator Nâng Cao: Send, Throw & Yield From] Tình huống 11: Trong Coroutines, Data Pipelines & Subgenerator Delegation, quy tắc kiến trúc quan trọng về yield from subgenerator là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Advanced Generators: Send, Throw & Yield From",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Generator Nâng Cao: Send, Throw & Yield From"
        },
        {
          "en": "Anti-pattern loading entire terabytes into RAM or stripping function docstrings with naive wrapper decorators",
          "vi": "Cách làm phản mẫu nạp toàn bộ dữ liệu khổng lồ vào RAM hoặc làm mất docstring khi bọc hàm ngây thơ"
        },
        {
          "en": "Obsolete approach that violates modern PEP specifications",
          "vi": "Cách làm cũ vi phạm đặc tả PEP hiện đại"
        },
        {
          "en": "Invalid statement that breaks the iterator protocol or context manager contract",
          "vi": "Câu lệnh không hợp lệ phá vỡ giao thức iterator hoặc hợp đồng context manager"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Coroutines, Data Pipelines & Subgenerator Delegation, proper mastery of yield from subgenerator ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Coroutines, Data Pipelines & Subgenerator Delegation, làm chủ yield from subgenerator đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_iterator_protocol",
      "difficulty": "easy"
    },
    {
      "id": "py_q_45_12",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Generators: Send, Throw & Yield From] Scenario 12: In Coroutines, Data Pipelines & Subgenerator Delegation, what is the key architectural rule regarding generator.send(val)?",
        "vi": "[Generator Nâng Cao: Send, Throw & Yield From] Tình huống 12: Trong Coroutines, Data Pipelines & Subgenerator Delegation, quy tắc kiến trúc quan trọng về generator.send(val) là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Advanced Generators: Send, Throw & Yield From",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Generator Nâng Cao: Send, Throw & Yield From"
        },
        {
          "en": "Anti-pattern loading entire terabytes into RAM or stripping function docstrings with naive wrapper decorators",
          "vi": "Cách làm phản mẫu nạp toàn bộ dữ liệu khổng lồ vào RAM hoặc làm mất docstring khi bọc hàm ngây thơ"
        },
        {
          "en": "Obsolete approach that violates modern PEP specifications",
          "vi": "Cách làm cũ vi phạm đặc tả PEP hiện đại"
        },
        {
          "en": "Invalid statement that breaks the iterator protocol or context manager contract",
          "vi": "Câu lệnh không hợp lệ phá vỡ giao thức iterator hoặc hợp đồng context manager"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Coroutines, Data Pipelines & Subgenerator Delegation, proper mastery of generator.send(val) ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Coroutines, Data Pipelines & Subgenerator Delegation, làm chủ generator.send(val) đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_iterator_protocol",
      "difficulty": "hard"
    },
    {
      "id": "py_q_45_13",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Generators: Send, Throw & Yield From] Scenario 13: In Coroutines, Data Pipelines & Subgenerator Delegation, what is the key architectural rule regarding generator.throw()?",
        "vi": "[Generator Nâng Cao: Send, Throw & Yield From] Tình huống 13: Trong Coroutines, Data Pipelines & Subgenerator Delegation, quy tắc kiến trúc quan trọng về generator.throw() là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Advanced Generators: Send, Throw & Yield From",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Generator Nâng Cao: Send, Throw & Yield From"
        },
        {
          "en": "Anti-pattern loading entire terabytes into RAM or stripping function docstrings with naive wrapper decorators",
          "vi": "Cách làm phản mẫu nạp toàn bộ dữ liệu khổng lồ vào RAM hoặc làm mất docstring khi bọc hàm ngây thơ"
        },
        {
          "en": "Obsolete approach that violates modern PEP specifications",
          "vi": "Cách làm cũ vi phạm đặc tả PEP hiện đại"
        },
        {
          "en": "Invalid statement that breaks the iterator protocol or context manager contract",
          "vi": "Câu lệnh không hợp lệ phá vỡ giao thức iterator hoặc hợp đồng context manager"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Coroutines, Data Pipelines & Subgenerator Delegation, proper mastery of generator.throw() ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Coroutines, Data Pipelines & Subgenerator Delegation, làm chủ generator.throw() đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_iterator_protocol",
      "difficulty": "easy"
    },
    {
      "id": "py_q_45_14",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Generators: Send, Throw & Yield From] Scenario 14: In Coroutines, Data Pipelines & Subgenerator Delegation, what is the key architectural rule regarding generator.close()?",
        "vi": "[Generator Nâng Cao: Send, Throw & Yield From] Tình huống 14: Trong Coroutines, Data Pipelines & Subgenerator Delegation, quy tắc kiến trúc quan trọng về generator.close() là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Advanced Generators: Send, Throw & Yield From",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Generator Nâng Cao: Send, Throw & Yield From"
        },
        {
          "en": "Anti-pattern loading entire terabytes into RAM or stripping function docstrings with naive wrapper decorators",
          "vi": "Cách làm phản mẫu nạp toàn bộ dữ liệu khổng lồ vào RAM hoặc làm mất docstring khi bọc hàm ngây thơ"
        },
        {
          "en": "Obsolete approach that violates modern PEP specifications",
          "vi": "Cách làm cũ vi phạm đặc tả PEP hiện đại"
        },
        {
          "en": "Invalid statement that breaks the iterator protocol or context manager contract",
          "vi": "Câu lệnh không hợp lệ phá vỡ giao thức iterator hoặc hợp đồng context manager"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Coroutines, Data Pipelines & Subgenerator Delegation, proper mastery of generator.close() ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Coroutines, Data Pipelines & Subgenerator Delegation, làm chủ generator.close() đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_iterator_protocol",
      "difficulty": "medium"
    },
    {
      "id": "py_q_45_15",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Generators: Send, Throw & Yield From] Scenario 15: In Coroutines, Data Pipelines & Subgenerator Delegation, what is the key architectural rule regarding yield from subgenerator?",
        "vi": "[Generator Nâng Cao: Send, Throw & Yield From] Tình huống 15: Trong Coroutines, Data Pipelines & Subgenerator Delegation, quy tắc kiến trúc quan trọng về yield from subgenerator là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Advanced Generators: Send, Throw & Yield From",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Generator Nâng Cao: Send, Throw & Yield From"
        },
        {
          "en": "Anti-pattern loading entire terabytes into RAM or stripping function docstrings with naive wrapper decorators",
          "vi": "Cách làm phản mẫu nạp toàn bộ dữ liệu khổng lồ vào RAM hoặc làm mất docstring khi bọc hàm ngây thơ"
        },
        {
          "en": "Obsolete approach that violates modern PEP specifications",
          "vi": "Cách làm cũ vi phạm đặc tả PEP hiện đại"
        },
        {
          "en": "Invalid statement that breaks the iterator protocol or context manager contract",
          "vi": "Câu lệnh không hợp lệ phá vỡ giao thức iterator hoặc hợp đồng context manager"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Coroutines, Data Pipelines & Subgenerator Delegation, proper mastery of yield from subgenerator ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Coroutines, Data Pipelines & Subgenerator Delegation, làm chủ yield from subgenerator đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_iterator_protocol",
      "difficulty": "hard"
    },
    {
      "id": "py_q_45_16",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Generators: Send, Throw & Yield From] Scenario 16: In Coroutines, Data Pipelines & Subgenerator Delegation, what is the key architectural rule regarding generator.send(val)?",
        "vi": "[Generator Nâng Cao: Send, Throw & Yield From] Tình huống 16: Trong Coroutines, Data Pipelines & Subgenerator Delegation, quy tắc kiến trúc quan trọng về generator.send(val) là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Advanced Generators: Send, Throw & Yield From",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Generator Nâng Cao: Send, Throw & Yield From"
        },
        {
          "en": "Anti-pattern loading entire terabytes into RAM or stripping function docstrings with naive wrapper decorators",
          "vi": "Cách làm phản mẫu nạp toàn bộ dữ liệu khổng lồ vào RAM hoặc làm mất docstring khi bọc hàm ngây thơ"
        },
        {
          "en": "Obsolete approach that violates modern PEP specifications",
          "vi": "Cách làm cũ vi phạm đặc tả PEP hiện đại"
        },
        {
          "en": "Invalid statement that breaks the iterator protocol or context manager contract",
          "vi": "Câu lệnh không hợp lệ phá vỡ giao thức iterator hoặc hợp đồng context manager"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Coroutines, Data Pipelines & Subgenerator Delegation, proper mastery of generator.send(val) ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Coroutines, Data Pipelines & Subgenerator Delegation, làm chủ generator.send(val) đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_iterator_protocol",
      "difficulty": "medium"
    }
  ]
};

export default lesson27;
