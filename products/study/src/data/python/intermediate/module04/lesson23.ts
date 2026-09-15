import { Lesson } from '../../../../types';

export const lesson23: Lesson = {
  id: 'py_lesson_23',
  moduleId: 'py_mod_9',
  levelId: 'intermediate',
  courseId: 'python',
  order: 23,
  topicId: 'python_dataclasses_type_annotations',
  title: {
    en: 'Modern Data Modeling: dataclass & Comprehensive Type Annotations',
    vi: 'Mô Hình Hóa Dữ Liệu Hiện Đại: dataclass & Hệ Thống Type Annotations'
  },
  summary: {
    en: 'Master modern idiomatic data structures in Python: boilerplate-free data classes with @dataclass, field configuration (default_factory, kw_only, frozen), post-initialization hooks (__post_init__), and rich typing annotations (Union |, Optional, Callable, Generic, TypeVar).',
    vi: 'Làm chủ cấu trúc dữ liệu hiện đại trong Python: loại bỏ code thừa với @dataclass, cấu hình thuộc tính (default_factory, kw_only, frozen), hàm khởi tạo bổ trợ (__post_init__) và hệ thống type hint nâng cao (Union |, Optional, Callable, Generic, TypeVar).'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Modern Python emphasizes type safety, readability, and concise domain modeling. Introduced in Python 3.7 (PEP 557) and continuously refined, `@dataclass` auto-generates `__init__`, `__repr__`, `__eq__`, and ordering methods from type annotations, transforming how production Python services model data schemas.',
      vi: 'Python hiện đại chú trọng tính an toàn kiểu (type safety), tính rõ ràng và mô hình hóa dữ liệu gọn gàng. Được giới thiệu từ Python 3.7 (PEP 557), `@dataclass` tự động tạo các hàm `__init__`, `__repr__`, `__eq__` và phương thức so sánh dựa trên type annotation, tạo nên chuẩn mực mô hình hóa dữ liệu trong các dự án thực tế.'
    },
    conceptExplanation: {
      en: '1. The `@dataclass` Decorator:\n- Automatically synthesizes `__init__`, `__repr__`, `__eq__` based on class attribute type hints.\n- `frozen=True`: Creates immutable, hashable dataclasses (suitable as dictionary keys or set elements).\n- `slots=True` (Python 3.10+): Optimizes memory footprint and accelerates attribute lookups.\n\n2. Field Customization with `dataclasses.field`:\n- `default_factory=list`: Safely initializes mutable fields (lists, dicts) per instance without sharing state.\n- `repr=False`: Excludes sensitive fields (e.g. passwords, API tokens) from `__repr__` strings.\n- `compare=False`: Excludes secondary fields from equality checks.\n\n3. Post-Initialization Processing with `__post_init__`:\n- Executes immediately after auto-generated `__init__`.\n- Ideal for invariant validation, data sanitization, and derived attribute computation.\n\n4. Modern Type Annotations (PEP 484 & PEP 604):\n- Native Union Syntax (Python 3.10+): `str | None` (equivalent to `Optional[str]`), `int | float`.\n- Higher-Order Types: `Callable[[int, int], str]` (function signatures).\n- Generics: `from typing import Generic, TypeVar` for polymorphic container classes.',
      vi: '1. Decorator `@dataclass`:\n- Tự động sinh `__init__`, `__repr__`, `__eq__` dựa trên khai báo kiểu của thuộc tính.\n- `frozen=True`: Tạo dataclass bất biến và băm được (dùng được làm khóa dict hoặc phần tử set).\n- `slots=True` (Python 3.10+): Tối ưu bộ nhớ RAM và tăng tốc độ truy cập thuộc tính.\n\n2. Tùy Biến Thuộc Tính Với `dataclasses.field`:\n- `default_factory=list`: Khởi tạo an toàn các thuộc tính khả biến (list, dict) độc lập cho từng đối tượng.\n- `repr=False`: Ẩn các trường nhạy cảm (như mật khẩu, token) khi in `__repr__`.\n- `compare=False`: Loại bỏ các trường phụ khỏi phép so sánh bằng `==`.\n\n3. Xử Lý Sau Khởi Tạo Với `__post_init__`:\n- Thực thi ngay sau khi `__init__` tự động chạy xong.\n- Thích hợp để kiểm tra ràng buộc (validation), chuẩn hóa dữ liệu và tính toán thuộc tính phái sinh.\n\n4. Type Annotations Hiện Đại (PEP 484 & PEP 604):\n- Toán tử Union hiện đại (Python 3.10+): `str | None` (tương đương `Optional[str]`), `int | float`.\n- Kiểu hàm: `Callable[[int, int], str]` (chữ ký hàm).\n- Generic: `from typing import Generic, TypeVar` cho các lớp chứa dữ liệu đa hình.'
    },
    syntax: `from dataclasses import dataclass, field
from typing import Callable, TypeVar, Generic

# 1. Production User Schema Dataclass
@dataclass(frozen=True, slots=True)
class UserProfile:
    user_id: int
    email: str
    roles: list[str] = field(default_factory=list)
    api_secret: str = field(default="", repr=False, compare=False)
    
    def has_role(self, role: str) -> bool:
        return role in self.roles

# 2. Dataclass with Post-Init Validation
@dataclass
class Transaction:
    amount: float
    currency: str
    fee: float = field(init=False)
    
    def __post_init__(self):
        if self.amount <= 0:
            raise ValueError("Amount must be positive")
        self.currency = self.currency.upper()
        self.fee = round(self.amount * 0.015, 2)

# 3. Modern Type Hinting
def process_data(
    items: list[str],
    transform: Callable[[str], str],
    fallback: str | None = None
) -> list[str]:
    return [transform(x) for x in items] if items else ([fallback] if fallback else [])`,
    examples: [
      {
        title: {
          en: 'E-Commerce Order Line Model with Immutable Snapshot',
          vi: 'Mô Hình Hóa Đơn Bán Hàng Với Snapshot Bất Biến'
        },
        code: `from dataclasses import dataclass, field

@dataclass(frozen=True)
class OrderItem:
    sku: str
    unit_price: float
    quantity: int = 1

    @property
    def total(self) -> float:
        return self.unit_price * self.quantity

@dataclass
class Order:
    order_id: str
    customer_email: str
    items: list[OrderItem] = field(default_factory=list)

    def add_item(self, item: OrderItem) -> None:
        self.items.append(item)

    @property
    def grand_total(self) -> float:
        return sum(item.total for item in self.items)

order = Order("ORD-101", "alice@example.com")
order.add_item(OrderItem("LAPTOP-01", 1200.0, 1))
order.add_item(OrderItem("MOUSE-02", 25.0, 2))
print("Order Total:", order.grand_total)  # 1250.0`,
        language: 'python',
        explanation: {
          en: 'Combines frozen dataclasses for immutable line items with standard dataclasses for mutable parent aggregators.',
          vi: 'Kết hợp frozen dataclass cho các dòng sản phẩm bất biến với dataclass thông thường cho đối tượng đơn hàng tổng hợp.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Using mutable default arguments in dataclass fields: items: list[str] = [].',
          vi: 'Dùng danh sách rỗng trực tiếp làm giá trị mặc định trong dataclass: items: list[str] = [].'
        },
        correction: {
          en: 'Always use `field(default_factory=list)` (or `default_factory=dict`) to generate fresh instances per object.',
          vi: 'Luôn dùng `field(default_factory=list)` (hoặc `default_factory=dict`) để sinh đối tượng mới cho từng instance.'
        },
        code: `# ValueError: mutable default <class 'list'> is not allowed\n# Correct:\nitems: list[str] = field(default_factory=list)`
      },
      {
        mistake: {
          en: 'Attempting to mutate an attribute on a `@dataclass(frozen=True)` instance.',
          vi: 'Cố gắng gán lại giá trị thuộc tính trên một instance của `@dataclass(frozen=True)`.'
        },
        correction: {
          en: 'Frozen dataclasses are immutable; use `dataclasses.replace(obj, attr=val)` to create an updated copy.',
          vi: 'Frozen dataclass là bất biến; hãy dùng `dataclasses.replace(obj, attr=val)` để tạo bản sao cập nhật.'
        },
        code: `from dataclasses import dataclass, replace\n@dataclass(frozen=True)\nclass Point:\n    x: int\np1 = Point(1)\n# p1.x = 2 raises FrozenInstanceError\np2 = replace(p1, x=2)`
      }
    ],
    tips: [
      {
        en: 'Use `@dataclass(slots=True)` in Python 3.10+ to reduce memory consumption by up to 40% when creating millions of instances.',
        vi: 'Dùng `@dataclass(slots=True)` từ Python 3.10+ để giảm đến 40% bộ nhớ RAM khi khởi tạo hàng triệu đối tượng.'
      },
      {
        en: '`dataclasses.asdict(instance)` recursively converts any dataclass object into a standard Python dictionary.',
        vi: '`dataclasses.asdict(instance)` chuyển đổi đệ quy đối tượng dataclass thành một dictionary Python chuẩn.'
      }
    ]
  },
  exercisePool: [
    {
      id: 'py_37_ex1',
      type: 'write_code',
      title: {
        en: 'Exercise 1: Student Record Dataclass with Post-Init Validation',
        vi: 'Bài tập 1: Dataclass Hồ Sơ Sinh Viên Kèm Kiểm Tra Ràng Buộc'
      },
      instruction: {
        en: 'Create a dataclass `StudentRecord` with fields `student_id: str`, `name: str`, `gpa: float`, and `courses: list[str]` (defaulting to an empty list via `field(default_factory=list)`). In `__post_init__`, validate that `0.0 <= gpa <= 4.0`; raise `ValueError("Invalid GPA")` if out of bounds.',
        vi: 'Tạo dataclass `StudentRecord` gồm các trường `student_id: str`, `name: str`, `gpa: float`, và `courses: list[str]` (mặc định list rỗng bằng `field(default_factory=list)`). Trong `__post_init__`, kiểm tra `0.0 <= gpa <= 4.0`; nếu ngoài khoảng thì ném `ValueError("Invalid GPA")`.'
      },
      starterCode: `from dataclasses import dataclass, field

# TODO: Define StudentRecord dataclass with __post_init__ validation
pass`,
      solutionCode: `from dataclasses import dataclass, field

@dataclass
class StudentRecord:
    student_id: str
    name: str
    gpa: float
    courses: list[str] = field(default_factory=list)

    def __post_init__(self):
        if not (0.0 <= self.gpa <= 4.0):
            raise ValueError("Invalid GPA")`,
      hint: {
        en: 'Use `@dataclass`, `courses: list[str] = field(default_factory=list)`, and check `self.gpa` in `__post_init__`.',
        vi: 'Dùng `@dataclass`, `courses: list[str] = field(default_factory=list)`, và kiểm tra `self.gpa` trong `__post_init__`.'
      },
      explanation: {
        en: '`default_factory=list` ensures distinct instances do not share the same course list, and `__post_init__` enforces data integrity.',
        vi: '`default_factory=list` đảm bảo các instance không bị dùng chung một list, và `__post_init__` bảo vệ tính toàn vẹn dữ liệu.'
      }
    },
    {
      id: 'py_37_ex2',
      type: 'write_code',
      title: {
        en: 'Exercise 2: Immutable Coordinate Point with Distance Method',
        vi: 'Bài tập 2: Tọa Độ Điểm Bất Biến Kèm Phương Thức Tính Khoảng Cách'
      },
      instruction: {
        en: 'Create a frozen dataclass `GeoPoint` with fields `latitude: float`, `longitude: float`, and `label: str = "Location"`. Implement a method `is_equator() -> bool` returning `True` if `abs(self.latitude) < 0.0001`.',
        vi: 'Tạo frozen dataclass `GeoPoint` gồm các trường `latitude: float`, `longitude: float`, và `label: str = "Location"`. Cài đặt phương thức `is_equator() -> bool` trả về `True` nếu `abs(self.latitude) < 0.0001`.'
      },
      starterCode: `from dataclasses import dataclass

# TODO: Define frozen GeoPoint dataclass
pass`,
      solutionCode: `from dataclasses import dataclass

@dataclass(frozen=True)
class GeoPoint:
    latitude: float
    longitude: float
    label: str = "Location"

    def is_equator(self) -> bool:
        return abs(self.latitude) < 0.0001`,
      hint: {
        en: 'Decorate with `@dataclass(frozen=True)` to prevent attribute reassignment.',
        vi: 'Thêm decorator `@dataclass(frozen=True)` để chống ghi đè thuộc tính.'
      },
      explanation: {
        en: 'Frozen dataclasses make instances immutable and automatically generate `__hash__` for use in sets or dict keys.',
        vi: 'Frozen dataclass biến đối tượng thành bất biến và tự động sinh `__hash__` để dùng trong set hoặc làm key dict.'
      }
    }
  ],
  challenge: {
    id: 'py_37_challenge',
    title: {
      en: 'Configuration Store with Schema Serialization & Secret Masking',
      vi: 'Hệ Thống Quản Lý Cấu Hình Kèm Ẩn Secret & Chuyển Đổi Schema'
    },
    description: {
      en: 'Implement a `@dataclass` `AppConfig` with `app_name: str`, `port: int = 8080`, `debug: bool = False`, `secret_key: str = field(default="", repr=False)`, and `allowed_hosts: list[str] = field(default_factory=list)`. Add a method `to_safe_dict() -> dict` that converts the configuration to a dictionary excluding `secret_key`.',
      vi: 'Xây dựng `@dataclass` `AppConfig` gồm `app_name: str`, `port: int = 8080`, `debug: bool = False`, `secret_key: str = field(default="", repr=False)` và `allowed_hosts: list[str] = field(default_factory=list)`. Thêm phương thức `to_safe_dict() -> dict` trả về dictionary không chứa trường `secret_key`.'
    },
    requirements: [
      {
        en: 'Define AppConfig using @dataclass with default and factory fields',
        vi: 'Định nghĩa AppConfig sử dụng @dataclass kèm các trường mặc định và default_factory'
      },
      {
        en: 'Mask secret_key from default repr using repr=False',
        vi: 'Ẩn secret_key khỏi repr mặc định bằng repr=False'
      },
      {
        en: 'Implement to_safe_dict to serialize config without exposing secret_key',
        vi: 'Triển khai to_safe_dict để chuyển đổi cấu hình mà không để lộ secret_key'
      }
    ],
    starterCode: `from dataclasses import dataclass, field, asdict

@dataclass
class AppConfig:
    # TODO: Define fields and to_safe_dict method
    pass`,
    solutionCode: `from dataclasses import dataclass, field, asdict

@dataclass
class AppConfig:
    app_name: str
    port: int = 8080
    debug: bool = False
    secret_key: str = field(default="", repr=False)
    allowed_hosts: list[str] = field(default_factory=list)

    def to_safe_dict(self) -> dict:
        d = asdict(self)
        d.pop("secret_key", None)
        return d`,
    hints: [
      {
        en: 'Use field(default_factory=list) for mutable default lists and repr=False for secrets.',
        vi: 'Dùng field(default_factory=list) cho list mặc định và repr=False cho khóa bí mật.'
      }
    ],
    solutionExplanation: {
      en: 'Dataclasses provide automatic boilerplate methods with fine-grained field control.',
      vi: 'Dataclass tự động sinh mã mẫu kèm khả năng tùy chỉnh chi tiết từng trường.'
    }
  },
  quizQuestionPool: [
    {
      id: 'py_37_q1',
      type: 'single_choice',
      topicId: 'python_dataclasses_typing',
      difficulty: 'easy',
      question: {
        en: 'Which standard module provides the `@dataclass` decorator in Python?',
        vi: 'Module chuẩn nào cung cấp decorator `@dataclass` trong Python?'
      },
      options: [
        { en: '`classes`', vi: '`classes`' },
        { en: '`dataclasses`', vi: '`dataclasses`' },
        { en: '`typing`', vi: '`typing`' },
        { en: '`models`', vi: '`models`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'The standard module `dataclasses` was introduced in Python 3.7 (PEP 557).',
        vi: 'Module thư viện chuẩn `dataclasses` được giới thiệu từ phiên bản Python 3.7 (PEP 557).'
      }
    },
    {
      id: 'py_37_q2',
      type: 'single_choice',
      topicId: 'python_dataclasses_typing',
      difficulty: 'medium',
      question: {
        en: 'Why is `items: list = []` disallowed as a default field value in a dataclass?',
        vi: 'Tại sao `items: list = []` không được phép làm giá trị mặc định của trường trong dataclass?'
      },
      options: [
        { en: 'Lists cannot be typed in Python', vi: 'List không thể gắn type hint trong Python' },
        { en: 'Mutable defaults would be shared across all instances of the dataclass', vi: 'Giá trị mặc định khả biến sẽ bị chia sẻ chung giữa mọi instance của dataclass' },
        { en: 'Python requires tuples for defaults', vi: 'Python bắt buộc dùng tuple cho giá trị mặc định' },
        { en: 'Dataclasses only allow primitive numbers', vi: 'Dataclass chỉ cho phép kiểu số nguyên thủy' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`field(default_factory=list)` must be used to ensure a fresh, independent list is created for each new instance.',
        vi: 'Bắt buộc dùng `field(default_factory=list)` để đảm bảo mỗi instance mới được cấp một list độc lập.'
      }
    },
    {
      id: 'py_37_q3',
      type: 'single_choice',
      topicId: 'python_dataclasses_typing',
      difficulty: 'medium',
      question: {
        en: 'What effect does `@dataclass(frozen=True)` have on instances?',
        vi: 'Decorator `@dataclass(frozen=True)` có tác động gì lên các đối tượng instance?'
      },
      options: [
        { en: 'It serializes the object to disk', vi: 'Lưu đối tượng xuống ổ cứng' },
        { en: 'It makes instances immutable; assigning to attributes raises `FrozenInstanceError`', vi: 'Biến instance thành bất biến; cố gắng gán lại thuộc tính sẽ ném lỗi `FrozenInstanceError`' },
        { en: 'It pauses code execution', vi: 'Tạm dừng thực thi code' },
        { en: 'It restricts the class to a single global instance', vi: 'Giới hạn class chỉ có 1 instance duy nhất' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`frozen=True` prevents mutation and generates a `__hash__` method based on fields.',
        vi: '`frozen=True` ngăn chặn việc thay đổi dữ liệu và tự động sinh hàm `__hash__` dựa trên các trường.'
      }
    },
    {
      id: 'py_37_q4',
      type: 'single_choice',
      topicId: 'python_dataclasses_typing',
      difficulty: 'medium',
      question: {
        en: 'When is the `__post_init__` hook executed in a dataclass lifecycle?',
        vi: 'Phương thức hook `__post_init__` được thực thi vào thời điểm nào trong vòng đời của dataclass?'
      },
      options: [
        { en: 'Before `__init__` starts', vi: 'Trước khi `__init__` bắt đầu' },
        { en: 'Immediately after the auto-generated `__init__` finishes initializing fields', vi: 'Ngay sau khi hàm `__init__` tự động hoàn tất việc gán giá trị cho các trường' },
        { en: 'Only when the object is deleted', vi: 'Chỉ khi đối tượng bị xóa' },
        { en: 'When converting to JSON', vi: 'Khi chuyển đổi sang JSON' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`__post_init__` runs right after `__init__`, enabling validation and computed field derivation.',
        vi: '`__post_init__` chạy ngay sau khi `__init__` kết thúc, dùng để kiểm tra dữ liệu và tính toán trường phụ.'
      }
    },
    {
      id: 'py_37_q5',
      type: 'single_choice',
      topicId: 'python_dataclasses_typing',
      difficulty: 'medium',
      question: {
        en: 'How do you hide a sensitive field (like a password) from printing in `repr(obj)` in a dataclass?',
        vi: 'Làm thế nào để ẩn một trường nhạy cảm (như mật khẩu) khi in `repr(obj)` trong dataclass?'
      },
      options: [
        { en: '`password: str = field(private=True)`', vi: '`password: str = field(private=True)`' },
        { en: '`password: str = field(repr=False)`', vi: '`password: str = field(repr=False)`' },
        { en: '`password: str = field(hidden=True)`', vi: '`password: str = field(hidden=True)`' },
        { en: 'Prefix with triple underscores `___password`', vi: 'Thêm ba dấu gạch dưới `___password`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`field(repr=False)` excludes the field from the automatically generated `__repr__` string.',
        vi: '`field(repr=False)` loại bỏ trường đó khỏi chuỗi `__repr__` tự động sinh.'
      }
    },
    {
      id: 'py_37_q6',
      type: 'single_choice',
      topicId: 'python_dataclasses_typing',
      difficulty: 'easy',
      question: {
        en: 'What is the modern Python 3.10+ syntax for specifying that a value can be either `int` or `str`?',
        vi: 'Cú pháp hiện đại từ Python 3.10+ để khai báo một giá trị có thể là kiểu `int` hoặc `str` là gì?'
      },
      options: [
        { en: '`int | str`', vi: '`int | str`' },
        { en: '`Union<int, str>`', vi: '`Union<int, str>`' },
        { en: '`int or str`', vi: '`int or str`' },
        { en: '`int || str`', vi: '`int || str`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'PEP 604 introduced the pipe `|` operator for Union type expressions: `int | str`.',
        vi: 'PEP 604 đã giới thiệu toán tử gạch đứng `|` cho kiểu Union trong Python 3.10+: `int | str`.'
      }
    },
    {
      id: 'py_37_q7',
      type: 'single_choice',
      topicId: 'python_dataclasses_typing',
      difficulty: 'easy',
      question: {
        en: 'Which function converts a dataclass instance and all its nested dataclasses into a dictionary?',
        vi: 'Hàm nào chuyển đổi một đối tượng dataclass và toàn bộ dataclass lồng nhau của nó thành dictionary?'
      },
      options: [
        { en: '`dataclasses.to_dict()`', vi: '`dataclasses.to_dict()`' },
        { en: '`dataclasses.asdict()`', vi: '`dataclasses.asdict()`' },
        { en: '`dict(dataclass_obj)`', vi: '`dict(dataclass_obj)`' },
        { en: '`dataclass_obj.serialize()`', vi: '`dataclass_obj.serialize()`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`dataclasses.asdict(obj)` recursively converts dataclass hierarchies into standard Python dictionaries.',
        vi: '`dataclasses.asdict(obj)` chuyển đổi đệ quy cấu trúc dataclass thành dictionary Python thông thường.'
      }
    },
    {
      id: 'py_37_q8',
      type: 'single_choice',
      topicId: 'python_dataclasses_typing',
      difficulty: 'medium',
      question: {
        en: 'How do you create a modified copy of a frozen dataclass instance `p` with a new value for field `x`?',
        vi: 'Làm thế nào để tạo bản sao đã chỉnh sửa của một frozen dataclass instance `p` với giá trị mới cho trường `x`?'
      },
      options: [
        { en: '`p.x = new_val`', vi: '`p.x = new_val`' },
        { en: '`dataclasses.replace(p, x=new_val)`', vi: '`dataclasses.replace(p, x=new_val)`' },
        { en: '`p.copy(x=new_val)`', vi: '`p.copy(x=new_val)`' },
        { en: '`dataclasses.mutate(p, x=new_val)`', vi: '`dataclasses.mutate(p, x=new_val)`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`dataclasses.replace()` creates a new object with specified fields replaced while preserving immutability.',
        vi: '`dataclasses.replace()` tạo ra một đối tượng mới với các trường chỉ định được thay đổi mà vẫn bảo toàn tính bất biến.'
      }
    },
    {
      id: 'py_37_q9',
      type: 'single_choice',
      topicId: 'python_dataclasses_typing',
      difficulty: 'medium',
      question: {
        en: 'What type hint represents a function that accepts two integers and returns a boolean?',
        vi: 'Type hint nào biểu diễn một hàm nhận 2 số nguyên int và trả về kiểu boolean?'
      },
      options: [
        { en: '`Function(int, int) -> bool`', vi: '`Function(int, int) -> bool`' },
        { en: '`Callable[[int, int], bool]`', vi: '`Callable[[int, int], bool]`' },
        { en: '`typing.Func[int, int, bool]`', vi: '`typing.Func[int, int, bool]`' },
        { en: '`(int, int) => bool`', vi: '`(int, int) => bool`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`Callable[[Arg1, Arg2], ReturnType]` from the `typing` module annotates callable functions.',
        vi: '`Callable[[Arg1, Arg2], ReturnType]` từ module `typing` dùng để khai báo kiểu cho các hàm có thể gọi được.'
      }
    },
    {
      id: 'py_37_q10',
      type: 'single_choice',
      topicId: 'python_dataclasses_typing',
      difficulty: 'medium',
      question: {
        en: 'What performance benefit does `@dataclass(slots=True)` provide in Python 3.10+?',
        vi: 'Lợi ích hiệu năng nào mà `@dataclass(slots=True)` mang lại từ Python 3.10+?'
      },
      options: [
        { en: 'It eliminates the per-instance `__dict__`, reducing memory usage and speeding up attribute access', vi: 'Loại bỏ `__dict__` riêng của từng instance, giúp tiết kiệm bộ nhớ RAM và tăng tốc truy cập thuộc tính' },
        { en: 'It makes all functions asynchronous', vi: 'Biến tất cả các hàm thành bất đồng bộ' },
        { en: 'It connects the class to a database table automatically', vi: 'Tự động kết nối class với bảng cơ sở dữ liệu' },
        { en: 'It disables garbage collection', vi: 'Tắt bộ thu gom rác' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`slots=True` generates `__slots__`, avoiding dynamic `__dict__` overhead on every instantiated object.',
        vi: '`slots=True` tự động sinh `__slots__`, tránh chi phí cấp phát `__dict__` động trên từng đối tượng khởi tạo.'
      }
    }
  ]
};
