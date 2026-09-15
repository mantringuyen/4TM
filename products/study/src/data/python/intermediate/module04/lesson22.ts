import { Lesson } from '../../../../types';

export const lesson22: Lesson = {
  "id": "py_lesson_22",
  "moduleId": "py_mod_9",
  "levelId": "intermediate",
  "courseId": "python",
  "order": 22,
  "topicId": "python_dunder_methods",
  "title": {
    "en": "OOP: Special Dunder Magic Methods (__str__, __repr__, __len__, __getitem__, __eq__)",
    "vi": "OOP: Các Phương Thức Kỳ Diệu Dunder (__str__, __repr__, __len__, __getitem__, __eq__)"
  },
  "summary": {
    "en": "Master Python's data model protocols by implementing dunder methods: string representations (__str__, __repr__), container protocols (__len__, __getitem__, __contains__), and operator overloading (__eq__, __add__).",
    "vi": "Làm chủ giao thức mô hình dữ liệu của Python bằng cách cài đặt các phương thức dunder: biểu diễn chuỗi (__str__, __repr__), giao thức container (__len__, __getitem__, __contains__) và nạp chồng toán tử (__eq__, __add__)."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "Dunder (\"Double UNDERscore\") methods are Python's hook into core language syntax. By defining methods like __len__ or __getitem__, your custom classes integrate seamlessly with Python built-ins like len(), indexing [i], print(), and operator arithmetic (+, ==).",
      "vi": "Phương thức Dunder (\"Double UNDERscore\") là các điểm móc nối vào cú pháp cốt lõi của ngôn ngữ Python. Khi định nghĩa các hàm như __len__ hoặc __getitem__, các lớp tự tạo của bạn sẽ tương tác mượt mà với các hàm có sẵn như len(), truy cập chỉ số [i], in ấn print() và toán tử (+, ==)."
    },
    "conceptExplanation": {
      "en": "Core Dunder Categories:\n1. Representation: __str__(self) for end-user readability (print, str()); __repr__(self) for unambiguous developer debugging.\n2. Container Emulation: __len__(self) enables len(obj); __getitem__(self, key) enables obj[key] access; __contains__(self, item) enables \"in\" checks.\n3. Comparison: __eq__(self, other) overrides ==; __lt__ overrides <.\n4. Arithmetic: __add__(self, other) overrides +. \n\n**Nominal Subtyping (ABC) vs Structural Subtyping (typing.Protocol):**\n- `abc.ABC` enforces **Nominal Subtyping**: classes must explicitly inherit from the ABC (`class S3Storage(BaseStorage)`).\n- `typing.Protocol` (PEP 544) enables **Static Duck Typing (Structural Subtyping)**: any class that implements the required methods satisfies the Protocol without explicit inheritance!\n- Use `@runtime_checkable` with `typing.Protocol` to enable `isinstance(obj, MyProtocol)` checks at runtime.",
      "vi": "Các Nhóm Phương Thức Dunder Cốt Lõi:\n1. Biểu diễn chuỗi: __str__(self) cho người dùng cuối (print, str()); __repr__(self) cho lập trình viên gỡ lỗi chi tiết.\n2. Giả lập Container: __len__(self) cho phép gọi len(obj); __getitem__(self, key) cho phép truy cập chỉ số obj[key]; __contains__(self, item) cho phép dùng toán tử \"in\".\n3. So sánh: __eq__(self, other) nạp chồng ==; __lt__ nạp chồng <.\n4. Số học: __add__(self, other) nạp chồng toán tử +. \n\n**Kế Thừa Định Danh (ABC) vs Phân Kiểu Cấu Trúc (typing.Protocol):**\n- `abc.ABC` thực thi **Nominal Subtyping**: các lớp bắt buộc phải kế thừa tường minh từ lớp cha (`class S3Storage(BaseStorage)`).\n- `typing.Protocol` (PEP 544) mang lại **Static Duck Typing (Structural Subtyping)**: bất kỳ lớp nào có đủ các phương thức yêu cầu đều thỏa mãn Protocol mà không cần phải kế thừa trực tiếp!\n- Dùng decorator `@runtime_checkable` kèm `typing.Protocol` để cho phép kiểm tra `isinstance(obj, MyProtocol)` ngay lúc chạy."
    },
    "syntax": "class Vector2D:\n    def __init__(self, x: float, y: float):\n        self.x, self.y = x, y\n\n    def __repr__(self) -> str:\n        return f\"Vector2D({self.x}, {self.y})\"\n\n    def __add__(self, other: \"Vector2D\") -> \"Vector2D\":\n        return Vector2D(self.x + other.x, self.y + other.y)\n\n    def __eq__(self, other: object) -> bool:\n        return isinstance(other, Vector2D) and (self.x, self.y) == (other.x, other.y)",
    "examples": [
      {
        "title": {
          "en": "Custom Playlist Container with Dunder Hooks",
          "vi": "Container Danh Sách Phát Nhạc Tùy Chỉnh Với Dunder"
        },
        "code": "class Playlist:\n    def __init__(self, name, tracks=None):\n        self.name = name\n        self.tracks = list(tracks or [])\n\n    def __len__(self):\n        return len(self.tracks)\n\n    def __getitem__(self, index):\n        return self.tracks[index]\n\n    def __repr__(self):\n        return f\"Playlist({self.name!r}, track_count={len(self)})\"\n\n    def __add__(self, other):\n        if isinstance(other, Playlist):\n            return Playlist(f\"{self.name} + {other.name}\", self.tracks + other.tracks)\n        raise TypeError(\"Can only add two Playlist objects\")\n\np1 = Playlist(\"Chill\", [\"Track 1\", \"Track 2\"])\np2 = Playlist(\"Focus\", [\"Track 3\"])\np3 = p1 + p2\n\nprint(\"Repr:\", repr(p3))\nprint(\"Length:\", len(p3))\nprint(\"First item via index:\", p3[0])",
        "language": "python",
        "explanation": {
          "en": "Demonstrates implementing __len__, __getitem__, __repr__, and __add__ on a custom domain object.",
          "vi": "Minh họa cài đặt các phương thức __len__, __getitem__, __repr__ và __add__ trên đối tượng nghiệp vụ."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Returning a non-string from __str__ or __repr__ (raises TypeError: __str__ returned non-string)",
          "vi": "Trả về giá trị không phải chuỗi từ __str__ hoặc __repr__ (gây lỗi TypeError: __str__ returned non-string)"
        },
        "correction": {
          "en": "Always ensure __str__ and __repr__ return a string object.",
          "vi": "Luôn đảm bảo __str__ và __repr__ trả về đối tượng chuỗi (str)."
        },
        "code": "def __str__(self):\n    return str(self.val) # Must return string"
      }
    ],
    "tips": [
      {
        "en": "Rule of thumb: __repr__ should look like valid Python code to recreate the object if possible (e.g. ClassName(arg1, arg2)).",
        "vi": "Quy tắc vàng: __repr__ nên có dạng mã Python hợp lệ để tái tạo đối tượng nếu có thể (ví dụ ClassName(arg1, arg2))."
      }
    ],
    "practice": {
      "task": {
        "en": "Implement Currency Value Object with Arithmetic",
        "vi": "Triển khai đối tượng Giá trị Tiền tệ với phép cộng"
      },
      "instruction": {
        "en": "Create class Money: __init__(self, amount, currency=\"USD\"). Implement __repr__ returning f\"Money({self.amount}, '{self.currency}')\", __eq__ comparing amount and currency, and __add__ returning a new Money with combined amount if currencies match (else raise ValueError(\"Currency mismatch\")). Test m1 = Money(100) + Money(50) and print repr(m1).",
        "vi": "Tạo class Money có __repr__, __eq__, __add__. Cộng hai đối tượng Money(100) + Money(50) và in kết quả repr."
      },
      "starterCode": "# Money Value Object\n",
      "solutionCode": "class Money:\n    def __init__(self, amount, currency=\"USD\"):\n        self.amount = amount\n        self.currency = currency\n\n    def __repr__(self):\n        return f\"Money({self.amount}, '{self.currency}')\"\n\n    def __eq__(self, other):\n        return isinstance(other, Money) and self.amount == other.amount and self.currency == other.currency\n\n    def __add__(self, other):\n        if not isinstance(other, Money) or self.currency != other.currency:\n            raise ValueError(\"Currency mismatch\")\n        return Money(self.amount + other.amount, self.currency)\n\nm1 = Money(100) + Money(50)\nprint(\"Combined:\", repr(m1))\n",
      "expectedOutput": "Combined: Money(150, 'USD')",
      "requiredPatterns": [],
      "hint": {
        "en": "def __add__(self, other): return Money(self.amount + other.amount, self.currency)",
        "vi": "def __add__(self, other): return Money(self.amount + other.amount, self.currency)"
      }
    },
    "consolidationPractice": {
      "task": {
        "en": "Container Slicing with __getitem__ and __len__",
        "vi": "Cắt lát container tùy chỉnh với __getitem__ và __len__"
      },
      "instruction": {
        "en": "Create class DataBatch(records): store self.records = list(records). Implement def __len__(self): return len(self.records); def __getitem__(self, idx): return self.records[idx]. Instantiate b = DataBatch([\"R1\", \"R2\", \"R3\"]). Print len(b) and b[1].",
        "vi": "Tạo class DataBatch có __len__ và __getitem__. In độ dài và phần tử ở vị trí 1."
      },
      "starterCode": "# Custom container\n",
      "solutionCode": "class DataBatch:\n    def __init__(self, records):\n        self.records = list(records)\n\n    def __len__(self):\n        return len(self.records)\n\n    def __getitem__(self, idx):\n        return self.records[idx]\n\nb = DataBatch([\"R1\", \"R2\", \"R3\"])\nprint(f\"Batch Size: {len(b)}, Second Record: {b[1]}\")\n",
      "expectedOutput": "Batch Size: 3, Second Record: R2",
      "requiredPatterns": [],
      "hint": {
        "en": "def __len__(self): return len(self.records); def __getitem__(self, idx): return self.records[idx]",
        "vi": "def __len__(self): return len(self.records); def __getitem__(self, idx): return self.records[idx]"
      }
    }
  },
  "exercisePool": [
    {
      "id": "py_ex_41_1",
      "type": "write_code",
      "title": {
        "en": "Implement Universal Document Exporter & Storage Backend",
        "vi": "Triển Khai Universal Document Exporter & Storage Backend"
      },
      "instruction": {
        "en": "Write professional Python code implementing duck typing, typing.Protocol (PEP 544 structural subtyping), @runtime_checkable isinstance() for Universal Document Exporter & Storage Backend.",
        "vi": "Viết mã nguồn chuyên nghiệp áp dụng duck typing, typing.Protocol (PEP 544 structural subtyping), @runtime_checkable isinstance() cho Universal Document Exporter & Storage Backend."
      },
      "starterCode": "# Write your domain logic below:\n",
      "solutionCode": "# Implementation for Polymorphism, Duck Typing & typing.Protocol\ndef log_stream(count):\n    for i in range(count):\n        yield f\"Event-{i}\"\n\nfor event in log_stream(3):\n    print(\"Streamed:\", event)",
      "hint": {
        "en": "Apply duck typing, typing.Protocol (PEP 544 structural subtyping), @runtime_checkable isinstance() using Python advanced idioms.",
        "vi": "Áp dụng duck typing, typing.Protocol (PEP 544 structural subtyping), @runtime_checkable isinstance() theo chuẩn nâng cao của Python."
      },
      "explanation": {
        "en": "Lazy generation and metaprogramming unlock massive throughput.",
        "vi": "Sinh dữ liệu lười và lập trình siêu cấu trúc mở ra hiệu năng xử lý cực cao."
      }
    },
    {
      "id": "py_ex_41_2",
      "type": "fix_code",
      "title": {
        "en": "Fix Architectural Flaw in Universal Document Exporter & Storage Backend",
        "vi": "Sửa Lỗi Kiến Trúc Trong Universal Document Exporter & Storage Backend"
      },
      "instruction": {
        "en": "Fix the decorator or iterator bug in Universal Document Exporter & Storage Backend.",
        "vi": "Sửa lỗi trong decorator hoặc iterator của Universal Document Exporter & Storage Backend."
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
      "id": "py_ex_41_3",
      "type": "complete_code",
      "title": {
        "en": "Complete Universal Document Exporter & Storage Backend Generator Pipeline",
        "vi": "Hoàn Thiện Bộ Xử Lý Generator Universal Document Exporter & Storage Backend"
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
      "id": "py_ex_41_4",
      "type": "predict_output",
      "title": {
        "en": "Predict Output for Universal Document Exporter & Storage Backend",
        "vi": "Dự Đoán Kết Quả Universal Document Exporter & Storage Backend"
      },
      "instruction": {
        "en": "Predict and verify the execution result for the Universal Document Exporter & Storage Backend component.",
        "vi": "Dự đoán và kiểm tra kết quả thực thi của Universal Document Exporter & Storage Backend."
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
      "id": "py_ex_41_5",
      "type": "problem_solving",
      "title": {
        "en": "End-to-End Universal Document Exporter & Storage Backend Engine",
        "vi": "Quy Trình Hoàn Chỉnh Universal Document Exporter & Storage Backend"
      },
      "instruction": {
        "en": "Implement the complete custom context manager or closure engine for Universal Document Exporter & Storage Backend.",
        "vi": "Triển khai context manager hoặc closure hoàn chỉnh cho Universal Document Exporter & Storage Backend."
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
    "id": "py_ch_41",
    "title": {
      "en": "Immutable Fixed-Size Circular Ring Buffer Container",
      "vi": "Cấu Trúc Dữ Liệu Ring Buffer Vòng Tròn Tùy Chỉnh Với Dunder"
    },
    "description": {
      "en": "Implement a professional circular RingBuffer container leveraging Python's data model:\n1. class RingBuffer:\n   - __init__(self, capacity): store self.capacity = capacity, self._buf = []\n   - Method append(self, item): append item. If len(self._buf) > self.capacity, pop(0)\n   - __len__(self): returns number of active items in self._buf\n   - __getitem__(self, index): returns self._buf[index]\n   - __contains__(self, item): returns True if item in self._buf, else False\n   - __repr__(self): returns f\"RingBuffer(capacity={self.capacity}, items={self._buf})\"\n   - __eq__(self, other): returns True if other is RingBuffer with same capacity and same items\n2. Test: create RingBuffer(3), append \"A\", \"B\", \"C\", \"D\" (capacity 3, \"A\" dropped, items are [\"B\", \"C\", \"D\"]).\n3. Check len, check if \"A\" in buffer, check if \"B\" in buffer, and get rb[0].\nPrint output:\n\"Buffer: RingBuffer(capacity=3, items=['B', 'C', 'D'])\"\n\"Length: 3 | Has A: False | Has B: True | First: B\".",
      "vi": "Xây dựng cấu trúc RingBuffer kích thước cố định bằng mô hình dữ liệu Dunder của Python:\n1. class RingBuffer có capacity và _buf\n2. Cài đặt các phương thức dunder: __len__, __getitem__, __contains__, __repr__, __eq__\n3. Thêm \"A\", \"B\", \"C\", \"D\" vào buffer dung lượng 3 (\"A\" bị đẩy ra)\nIn kết quả định dạng chuẩn."
    },
    "requirements": [
      {
        "en": "Implement __len__, __getitem__, and __contains__ container hooks",
        "vi": "Triển khai đầy đủ __len__, __getitem__ và __contains__"
      },
      {
        "en": "Implement __repr__ and __eq__ special methods",
        "vi": "Triển khai các hàm dunder __repr__ và __eq__"
      },
      {
        "en": "Enforce circular capacity boundary constraints",
        "vi": "Đảm bảo giới hạn dung lượng vòng tròn"
      }
    ],
    "starterCode": "# Build RingBuffer container\n",
    "solutionCode": "class RingBuffer:\n    def __init__(self, capacity):\n        self.capacity = capacity\n        self._buf = []\n\n    def append(self, item):\n        self._buf.append(item)\n        if len(self._buf) > self.capacity:\n            self._buf.pop(0)\n\n    def __len__(self):\n        return len(self._buf)\n\n    def __getitem__(self, index):\n        return self._buf[index]\n\n    def __contains__(self, item):\n        return item in self._buf\n\n    def __repr__(self):\n        return f\"RingBuffer(capacity={self.capacity}, items={self._buf})\"\n\n    def __eq__(self, other):\n        return isinstance(other, RingBuffer) and self.capacity == other.capacity and self._buf == other._buf\n\nrb = RingBuffer(3)\nfor char in [\"A\", \"B\", \"C\", \"D\"]:\n    rb.append(char)\n\nprint(f\"Buffer: {repr(rb)}\")\nprint(f\"Length: {len(rb)} | Has A: {'A' in rb} | Has B: {'B' in rb} | First: {rb[0]}\")\n",
    "hints": [
      {
        "en": "def __contains__(self, item): return item in self._buf",
        "vi": "def __contains__(self, item): return item in self._buf"
      }
    ],
    "solutionExplanation": {
      "en": "Demonstrates building first-class Python data structures that behave natively with built-in syntax operators.",
      "vi": "Minh họa xây dựng cấu trúc dữ liệu hạng nhất tương tác tự nhiên với cú pháp và toán tử của Python."
    }
  },
  "quizQuestionPool": [
    {
      "id": "py_q_41_1",
      "type": "single_choice",
      "question": {
        "en": "[Polymorphism, Duck Typing & typing.Protocol] Scenario 1: In Universal Document Exporter & Storage Backend, what is the key architectural rule regarding typing.Protocol (PEP 544 structural subtyping)?",
        "vi": "[Đa Hình, Duck Typing & typing.Protocol] Tình huống 1: Trong Universal Document Exporter & Storage Backend, quy tắc kiến trúc quan trọng về typing.Protocol (PEP 544 structural subtyping) là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Polymorphism, Duck Typing & typing.Protocol",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Đa Hình, Duck Typing & typing.Protocol"
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
        "en": "In Universal Document Exporter & Storage Backend, proper mastery of typing.Protocol (PEP 544 structural subtyping) ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Universal Document Exporter & Storage Backend, làm chủ typing.Protocol (PEP 544 structural subtyping) đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_dunder_methods",
      "difficulty": "easy"
    },
    {
      "id": "py_q_41_2",
      "type": "single_choice",
      "question": {
        "en": "[Polymorphism, Duck Typing & typing.Protocol] Scenario 2: In Universal Document Exporter & Storage Backend, what is the key architectural rule regarding @runtime_checkable isinstance()?",
        "vi": "[Đa Hình, Duck Typing & typing.Protocol] Tình huống 2: Trong Universal Document Exporter & Storage Backend, quy tắc kiến trúc quan trọng về @runtime_checkable isinstance() là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Polymorphism, Duck Typing & typing.Protocol",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Đa Hình, Duck Typing & typing.Protocol"
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
        "en": "In Universal Document Exporter & Storage Backend, proper mastery of @runtime_checkable isinstance() ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Universal Document Exporter & Storage Backend, làm chủ @runtime_checkable isinstance() đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_dunder_methods",
      "difficulty": "medium"
    },
    {
      "id": "py_q_41_3",
      "type": "single_choice",
      "question": {
        "en": "[Polymorphism, Duck Typing & typing.Protocol] Scenario 3: In Universal Document Exporter & Storage Backend, what is the key architectural rule regarding duck typing?",
        "vi": "[Đa Hình, Duck Typing & typing.Protocol] Tình huống 3: Trong Universal Document Exporter & Storage Backend, quy tắc kiến trúc quan trọng về duck typing là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Polymorphism, Duck Typing & typing.Protocol",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Đa Hình, Duck Typing & typing.Protocol"
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
        "en": "In Universal Document Exporter & Storage Backend, proper mastery of duck typing ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Universal Document Exporter & Storage Backend, làm chủ duck typing đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_dunder_methods",
      "difficulty": "hard"
    },
    {
      "id": "py_q_41_4",
      "type": "single_choice",
      "question": {
        "en": "[Polymorphism, Duck Typing & typing.Protocol] Scenario 4: In Universal Document Exporter & Storage Backend, what is the key architectural rule regarding typing.Protocol (PEP 544 structural subtyping)?",
        "vi": "[Đa Hình, Duck Typing & typing.Protocol] Tình huống 4: Trong Universal Document Exporter & Storage Backend, quy tắc kiến trúc quan trọng về typing.Protocol (PEP 544 structural subtyping) là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Polymorphism, Duck Typing & typing.Protocol",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Đa Hình, Duck Typing & typing.Protocol"
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
        "en": "In Universal Document Exporter & Storage Backend, proper mastery of typing.Protocol (PEP 544 structural subtyping) ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Universal Document Exporter & Storage Backend, làm chủ typing.Protocol (PEP 544 structural subtyping) đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_dunder_methods",
      "difficulty": "medium"
    },
    {
      "id": "py_q_41_5",
      "type": "single_choice",
      "question": {
        "en": "[Polymorphism, Duck Typing & typing.Protocol] Scenario 5: In Universal Document Exporter & Storage Backend, what is the key architectural rule regarding @runtime_checkable isinstance()?",
        "vi": "[Đa Hình, Duck Typing & typing.Protocol] Tình huống 5: Trong Universal Document Exporter & Storage Backend, quy tắc kiến trúc quan trọng về @runtime_checkable isinstance() là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Polymorphism, Duck Typing & typing.Protocol",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Đa Hình, Duck Typing & typing.Protocol"
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
        "en": "In Universal Document Exporter & Storage Backend, proper mastery of @runtime_checkable isinstance() ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Universal Document Exporter & Storage Backend, làm chủ @runtime_checkable isinstance() đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_dunder_methods",
      "difficulty": "easy"
    },
    {
      "id": "py_q_41_6",
      "type": "single_choice",
      "question": {
        "en": "[Polymorphism, Duck Typing & typing.Protocol] Scenario 6: In Universal Document Exporter & Storage Backend, what is the key architectural rule regarding duck typing?",
        "vi": "[Đa Hình, Duck Typing & typing.Protocol] Tình huống 6: Trong Universal Document Exporter & Storage Backend, quy tắc kiến trúc quan trọng về duck typing là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Polymorphism, Duck Typing & typing.Protocol",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Đa Hình, Duck Typing & typing.Protocol"
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
        "en": "In Universal Document Exporter & Storage Backend, proper mastery of duck typing ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Universal Document Exporter & Storage Backend, làm chủ duck typing đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_dunder_methods",
      "difficulty": "hard"
    },
    {
      "id": "py_q_41_7",
      "type": "single_choice",
      "question": {
        "en": "[Polymorphism, Duck Typing & typing.Protocol] Scenario 7: In Universal Document Exporter & Storage Backend, what is the key architectural rule regarding typing.Protocol (PEP 544 structural subtyping)?",
        "vi": "[Đa Hình, Duck Typing & typing.Protocol] Tình huống 7: Trong Universal Document Exporter & Storage Backend, quy tắc kiến trúc quan trọng về typing.Protocol (PEP 544 structural subtyping) là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Polymorphism, Duck Typing & typing.Protocol",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Đa Hình, Duck Typing & typing.Protocol"
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
        "en": "In Universal Document Exporter & Storage Backend, proper mastery of typing.Protocol (PEP 544 structural subtyping) ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Universal Document Exporter & Storage Backend, làm chủ typing.Protocol (PEP 544 structural subtyping) đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_dunder_methods",
      "difficulty": "easy"
    },
    {
      "id": "py_q_41_8",
      "type": "single_choice",
      "question": {
        "en": "[Polymorphism, Duck Typing & typing.Protocol] Scenario 8: In Universal Document Exporter & Storage Backend, what is the key architectural rule regarding @runtime_checkable isinstance()?",
        "vi": "[Đa Hình, Duck Typing & typing.Protocol] Tình huống 8: Trong Universal Document Exporter & Storage Backend, quy tắc kiến trúc quan trọng về @runtime_checkable isinstance() là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Polymorphism, Duck Typing & typing.Protocol",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Đa Hình, Duck Typing & typing.Protocol"
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
        "en": "In Universal Document Exporter & Storage Backend, proper mastery of @runtime_checkable isinstance() ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Universal Document Exporter & Storage Backend, làm chủ @runtime_checkable isinstance() đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_dunder_methods",
      "difficulty": "medium"
    },
    {
      "id": "py_q_41_9",
      "type": "single_choice",
      "question": {
        "en": "[Polymorphism, Duck Typing & typing.Protocol] Scenario 9: In Universal Document Exporter & Storage Backend, what is the key architectural rule regarding duck typing?",
        "vi": "[Đa Hình, Duck Typing & typing.Protocol] Tình huống 9: Trong Universal Document Exporter & Storage Backend, quy tắc kiến trúc quan trọng về duck typing là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Polymorphism, Duck Typing & typing.Protocol",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Đa Hình, Duck Typing & typing.Protocol"
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
        "en": "In Universal Document Exporter & Storage Backend, proper mastery of duck typing ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Universal Document Exporter & Storage Backend, làm chủ duck typing đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_dunder_methods",
      "difficulty": "hard"
    },
    {
      "id": "py_q_41_10",
      "type": "single_choice",
      "question": {
        "en": "[Polymorphism, Duck Typing & typing.Protocol] Scenario 10: In Universal Document Exporter & Storage Backend, what is the key architectural rule regarding typing.Protocol (PEP 544 structural subtyping)?",
        "vi": "[Đa Hình, Duck Typing & typing.Protocol] Tình huống 10: Trong Universal Document Exporter & Storage Backend, quy tắc kiến trúc quan trọng về typing.Protocol (PEP 544 structural subtyping) là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Polymorphism, Duck Typing & typing.Protocol",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Đa Hình, Duck Typing & typing.Protocol"
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
        "en": "In Universal Document Exporter & Storage Backend, proper mastery of typing.Protocol (PEP 544 structural subtyping) ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Universal Document Exporter & Storage Backend, làm chủ typing.Protocol (PEP 544 structural subtyping) đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_dunder_methods",
      "difficulty": "medium"
    },
    {
      "id": "py_q_41_11",
      "type": "single_choice",
      "question": {
        "en": "[Polymorphism, Duck Typing & typing.Protocol] Scenario 11: In Universal Document Exporter & Storage Backend, what is the key architectural rule regarding @runtime_checkable isinstance()?",
        "vi": "[Đa Hình, Duck Typing & typing.Protocol] Tình huống 11: Trong Universal Document Exporter & Storage Backend, quy tắc kiến trúc quan trọng về @runtime_checkable isinstance() là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Polymorphism, Duck Typing & typing.Protocol",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Đa Hình, Duck Typing & typing.Protocol"
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
        "en": "In Universal Document Exporter & Storage Backend, proper mastery of @runtime_checkable isinstance() ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Universal Document Exporter & Storage Backend, làm chủ @runtime_checkable isinstance() đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_dunder_methods",
      "difficulty": "easy"
    },
    {
      "id": "py_q_41_12",
      "type": "single_choice",
      "question": {
        "en": "[Polymorphism, Duck Typing & typing.Protocol] Scenario 12: In Universal Document Exporter & Storage Backend, what is the key architectural rule regarding duck typing?",
        "vi": "[Đa Hình, Duck Typing & typing.Protocol] Tình huống 12: Trong Universal Document Exporter & Storage Backend, quy tắc kiến trúc quan trọng về duck typing là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Polymorphism, Duck Typing & typing.Protocol",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Đa Hình, Duck Typing & typing.Protocol"
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
        "en": "In Universal Document Exporter & Storage Backend, proper mastery of duck typing ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Universal Document Exporter & Storage Backend, làm chủ duck typing đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_dunder_methods",
      "difficulty": "hard"
    },
    {
      "id": "py_q_41_13",
      "type": "single_choice",
      "question": {
        "en": "[Polymorphism, Duck Typing & typing.Protocol] Scenario 13: In Universal Document Exporter & Storage Backend, what is the key architectural rule regarding typing.Protocol (PEP 544 structural subtyping)?",
        "vi": "[Đa Hình, Duck Typing & typing.Protocol] Tình huống 13: Trong Universal Document Exporter & Storage Backend, quy tắc kiến trúc quan trọng về typing.Protocol (PEP 544 structural subtyping) là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Polymorphism, Duck Typing & typing.Protocol",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Đa Hình, Duck Typing & typing.Protocol"
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
        "en": "In Universal Document Exporter & Storage Backend, proper mastery of typing.Protocol (PEP 544 structural subtyping) ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Universal Document Exporter & Storage Backend, làm chủ typing.Protocol (PEP 544 structural subtyping) đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_dunder_methods",
      "difficulty": "easy"
    },
    {
      "id": "py_q_41_14",
      "type": "single_choice",
      "question": {
        "en": "[Polymorphism, Duck Typing & typing.Protocol] Scenario 14: In Universal Document Exporter & Storage Backend, what is the key architectural rule regarding @runtime_checkable isinstance()?",
        "vi": "[Đa Hình, Duck Typing & typing.Protocol] Tình huống 14: Trong Universal Document Exporter & Storage Backend, quy tắc kiến trúc quan trọng về @runtime_checkable isinstance() là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Polymorphism, Duck Typing & typing.Protocol",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Đa Hình, Duck Typing & typing.Protocol"
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
        "en": "In Universal Document Exporter & Storage Backend, proper mastery of @runtime_checkable isinstance() ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Universal Document Exporter & Storage Backend, làm chủ @runtime_checkable isinstance() đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_dunder_methods",
      "difficulty": "medium"
    },
    {
      "id": "py_q_41_15",
      "type": "single_choice",
      "question": {
        "en": "[Polymorphism, Duck Typing & typing.Protocol] Scenario 15: In Universal Document Exporter & Storage Backend, what is the key architectural rule regarding duck typing?",
        "vi": "[Đa Hình, Duck Typing & typing.Protocol] Tình huống 15: Trong Universal Document Exporter & Storage Backend, quy tắc kiến trúc quan trọng về duck typing là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Polymorphism, Duck Typing & typing.Protocol",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Đa Hình, Duck Typing & typing.Protocol"
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
        "en": "In Universal Document Exporter & Storage Backend, proper mastery of duck typing ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Universal Document Exporter & Storage Backend, làm chủ duck typing đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_dunder_methods",
      "difficulty": "hard"
    },
    {
      "id": "py_q_41_16",
      "type": "single_choice",
      "question": {
        "en": "[Polymorphism, Duck Typing & typing.Protocol] Scenario 16: In Universal Document Exporter & Storage Backend, what is the key architectural rule regarding typing.Protocol (PEP 544 structural subtyping)?",
        "vi": "[Đa Hình, Duck Typing & typing.Protocol] Tình huống 16: Trong Universal Document Exporter & Storage Backend, quy tắc kiến trúc quan trọng về typing.Protocol (PEP 544 structural subtyping) là gì?"
      },
      "options": [
        {
          "en": "Standard modern Python approach leveraging structural protocols, lazy streams, and metadata-preserving decorators for Polymorphism, Duck Typing & typing.Protocol",
          "vi": "Cách tiếp cận hiện đại tận dụng giao thức Protocol cấu trúc, luồng dữ liệu lười và decorator bảo toàn siêu dữ liệu cho Đa Hình, Duck Typing & typing.Protocol"
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
        "en": "In Universal Document Exporter & Storage Backend, proper mastery of typing.Protocol (PEP 544 structural subtyping) ensures minimal memory overhead and seamless framework interoperability.",
        "vi": "Trong Universal Document Exporter & Storage Backend, làm chủ typing.Protocol (PEP 544 structural subtyping) đảm bảo tiêu tốn ít RAM nhất và tương thích hoàn hảo với các framework hiện đại."
      },
      "topicId": "python_dunder_methods",
      "difficulty": "medium"
    }
  ]
};

export default lesson22;
