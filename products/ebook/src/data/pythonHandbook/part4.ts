import { Chapter } from '../../types';

export const PART_4_CHAPTERS: Chapter[] = [
  // Chapter 12: Classes, Instances & The Type System
  {
    id: 'py-hb-ch-12',
    number: 12,
    partNumber: 4,
    partTitle: {
      en: 'Object-Oriented Architecture & Metaprogramming',
      vi: 'Kiến Trúc Hướng Đối Tượng & Lập Trình Siêu Cấp',
    },
    slug: 'classes-instances-type-system',
    title: {
      en: 'Classes, Instances & The Type System',
      vi: 'Classes, Instances & Hệ Thống Kiểu Đối Tượng',
    },
    summary: {
      en: 'Classes as runtime objects, the type metaclass, the two-phase instantiation pipeline (__new__ allocator vs __init__ initializer), and method binding mechanics.',
      vi: 'Class là đối tượng runtime, metaclass type, quy trình khởi tạo 2 giai đoạn (__new__ cấp phát bộ nhớ vs __init__ khởi tạo thuộc tính) và cơ chế method binding.',
    },
    readTimeMinutes: 20,
    sections: [
      {
        id: 'py-hb-12-1',
        title: {
          en: 'Classes as First-Class Objects & The type Metaclass',
          vi: 'Class Là Đối Tượng Hạng Nhất & Metaclass type',
        },
        content: {
          en: 'In Python, **classes are themselves objects** residing in heap memory. Just as an instance `p = Point(1, 2)` is an instance of class `Point`, the class `Point` is an instance of the built-in metaclass `type`. When Python executes a `class MyClass:` block, it executes the class body in a temporary namespace dictionary and calls `type(name, bases, dict)` to dynamically construct the class object.',
          vi: 'Trong Python, **bản thân class cũng là một đối tượng** nằm trên bộ nhớ heap. Giống như một instance `p = Point(1, 2)` là đối tượng của class `Point`, thì class `Point` lại chính là đối tượng của metaclass `type`. Khi Python thực thi khối lệnh `class MyClass:`, nó chạy toàn bộ thân class trong một namespace dictionary tạm rồi gọi `type(name, bases, dict)` để tạo ra đối tượng class một cách linh hoạt.',
        },
        diagram: {
          title: {
            en: 'Python 3-Tier Object & Metaclass Hierarchy',
            vi: 'Cây Phân Cấp Đối Tượng & Metaclass 3 Tầng Của Python',
          },
          steps: [
            {
              number: 1,
              label: { en: 'Metaclass (type)', vi: 'Metaclass (type)' },
              description: {
                en: 'type is the factory that constructs class objects.',
                vi: 'type là khuôn mẫu mẹ sinh ra các đối tượng class.',
              },
            },
            {
              number: 2,
              label: { en: 'Class (UserClass)', vi: 'Class (UserClass)' },
              description: {
                en: 'UserClass is an instance of type and the factory for user instances.',
                vi: 'UserClass là một instance của type và là khuôn mẫu tạo ra instance người dùng.',
              },
            },
            {
              number: 3,
              label: { en: 'Instance (obj)', vi: 'Instance (obj)' },
              description: {
                en: 'obj is an instance of UserClass holding instance state __dict__.',
                vi: 'obj là instance của UserClass, lưu trữ trạng thái trong __dict__.',
              },
            },
          ],
        },
        codeBlock: {
          language: 'python',
          filename: 'dynamic_class_creation.py',
          code: `# Dynamic class creation using type(name, bases, dict)
def greet_method(self) -> str:
    return f"Hello, I am {self.name}!"

# Dynamically construct 'Robot' class at runtime
Robot = type(
    "Robot",
    (object,),
    {
        "model": "v2.0",
        "greet": greet_method,
        "__init__": lambda self, name: setattr(self, "name", name),
    }
)

bot = Robot("HAL-9000")
print("Instance greeting:", bot.greet())  # Hello, I am HAL-9000!
print("Is instance of Robot?", isinstance(bot, Robot))  # True
print("Is Robot instance of type?", isinstance(Robot, type))  # True`,
          explanation: {
            en: 'Illustrates how Python `class` statements compile to `type()` metaclass constructor calls under the hood.',
            vi: 'Minh họa cách câu lệnh `class` trong Python thực chất được dịch thành hàm khởi tạo metaclass `type()`.',
          },
        },
      },
      {
        id: 'py-hb-12-2',
        title: {
          en: 'The Two-Phase Instantiation Pipeline: __new__ vs. __init__',
          vi: 'Quy Trình Khởi Tạo 2 Giai Đoạn: __new__ vs. __init__',
        },
        content: {
          en: 'When creating an instance via `obj = MyClass(*args)`, Python executes a **two-phase instantiation pipeline**: 1) `__new__(cls, *args)` is the **Allocator**: it is a static method that allocates the raw memory object in the heap and returns the newly minted instance. 2) `__init__(self, *args)` is the **Initializer**: it receives the instance returned by `__new__` and populates its initial attribute state. Overriding `__new__` is required when subclassing immutable types (like `int`, `str`, `tuple`) or implementing singletons.',
          vi: 'Khi bạn tạo đối tượng bằng `obj = MyClass(*args)`, Python thực thi **quy trình 2 giai đoạn**: 1) `__new__(cls, *args)` là **Bộ cấp phát (Allocator)**: đây là phương thức static cấp phát vùng nhớ thô trên heap và trả về instance vừa sinh ra. 2) `__init__(self, *args)` là **Bộ khởi tạo (Initializer)**: nhận instance từ `__new__` và thiết lập các thuộc tính ban đầu. Cần ghi đè `__new__` khi kế thừa các kiểu dữ liệu bất biến (như `int`, `str`, `tuple`) hoặc khi cài đặt mẫu Singleton.',
        },
        codeBlock: {
          language: 'python',
          filename: 'singleton_via_new.py',
          code: `class DatabasePool:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            print("[ALLOCATING] Creating new singleton heap allocation...")
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self, dsn: str):
        self.dsn = dsn

# Both variables reference the identical instance
pool1 = DatabasePool("postgres://primary:5432")
pool2 = DatabasePool("postgres://replica:5432")
print("Are pools identical?", pool1 is pool2)  # True`,
          explanation: {
            en: '`__new__` intercepts memory allocation to ensure only a single instance of `DatabasePool` ever exists in the heap.',
            vi: '`__new__` can thiệp vào bước cấp phát bộ nhớ để đảm bảo chỉ có duy nhất một instance `DatabasePool` trên heap.',
          },
        },
      },
      {
        id: 'py-hb-12-3',
        title: {
          en: 'Instance, Class (@classmethod) & Static (@staticmethod) Methods',
          vi: 'Phương Thức Instance, Class (@classmethod) & Static (@staticmethod)',
        },
        content: {
          en: 'Python distinguishes three types of class methods: 1) **Instance Methods**: Receive `self` bound to the calling instance object. 2) **Class Methods** (`@classmethod`): Receive `cls` bound to the class object itself, widely used as alternative factory constructors (e.g., `User.from_json()`). 3) **Static Methods** (`@staticmethod`): Plain functions bound inside the class namespace without implicit `self` or `cls` parameters.',
          vi: 'Python phân biệt 3 loại phương thức trong class: 1) **Instance Method**: Nhận tham số `self` gắn với đối tượng gọi hàm. 2) **Class Method** (`@classmethod`): Nhận tham số `cls` gắn với chính đối tượng class, thường dùng làm factory constructor (như `User.from_json()`). 3) **Static Method** (`@staticmethod`): Hàm thuần túy đặt trong namespace của class, không tự động nhận `self` hay `cls`.',
        },
        codeBlock: {
          language: 'python',
          filename: 'method_types.py',
          code: `import json
from datetime import datetime

class TimestampedRecord:
    def __init__(self, data: dict, created_at: datetime):
        self.data = data
        self.created_at = created_at

    # 1. Alternative constructor factory
    @classmethod
    def from_json(cls, json_payload: str) -> "TimestampedRecord":
        parsed = json.loads(json_payload)
        return cls(data=parsed, created_at=datetime.utcnow())

    # 2. Pure static validation helper
    @staticmethod
    def validate_schema(data: dict) -> bool:
        return "id" in data and "version" in data`,
          explanation: {
            en: 'Shows idiomatically using `@classmethod` for factory constructors and `@staticmethod` for namespace-grouped utilities.',
            vi: 'Minh họa cách dùng chuẩn mực của `@classmethod` làm constructor phụ và `@staticmethod` cho các hàm tiện ích trong namespace class.',
          },
        },
        keyTakeaways: {
          en: [
            'Classes are heap objects instantiated by the `type` metaclass',
            '`__new__` allocates memory; `__init__` initializes instance attributes',
            'Use `@classmethod` for alternative factory constructors supporting subclass polymorphism',
          ],
          vi: [
            'Class là đối tượng trên heap được sinh ra từ metaclass `type`',
            '`__new__` cấp phát bộ nhớ; `__init__` thiết lập giá trị thuộc tính',
            'Dùng `@classmethod` để tạo các constructor phụ hỗ trợ tính đa hình khi kế thừa',
          ],
        },
      },
    ],
    chapterSummary: {
      mentalModels: {
        en: [
          'Python has a uniform object model: functions, classes, and instances are all first-class objects',
          'Instantiation is a two-step handshake: memory allocation (__new__) followed by attribute initialization (__init__)',
        ],
        vi: [
          'Mô hình đối tượng đồng nhất: hàm, class và instance đều là đối tượng hạng nhất',
          'Khởi tạo instance gồm 2 bước: cấp phát ô nhớ (__new__) rồi gán thuộc tính (__init__)',
        ],
      },
      rules: {
        en: [
          'Always return a new instance from `__new__(cls)` when overriding it',
          'Prefer `@classmethod` over `@staticmethod` when creating alternative constructors so subclasses inherit correctly',
        ],
        vi: [
          'Luôn trả về instance mới từ phương thức `__new__(cls)` khi ghi đè nó',
          'Ưu tiên dùng `@classmethod` hơn `@staticmethod` cho constructor phụ để class con kế thừa đúng',
        ],
      },
      commonTraps: {
        en: [
          'Modifying mutable class variables via an instance, inadvertently shadowing the class attribute with an instance variable',
        ],
        vi: [
          'Gán thuộc tính class biến đổi qua instance làm vô tình tạo ra biến instance che khuất biến class',
        ],
      },
      takeaway: {
        en: 'Understanding the relationship between instances, classes, and the type metaclass unlocks Python dynamic runtime metaprogramming.',
        vi: 'Hiểu rõ mối liên hệ giữa instance, class và metaclass type mở ra cánh cửa lập trình siêu cấp linh hoạt trong Python.',
      },
    },
    selfReview: [
      {
        question: {
          en: 'Why must `__new__` be overridden instead of `__init__` when creating a custom subclass of `tuple` or `str`?',
          vi: 'Tại sao bắt buộc phải ghi đè `__new__` thay vì `__init__` khi kế thừa class bất biến như `tuple` hay `str`?',
        },
        hint: {
          en: 'Consider when immutable objects are sealed in memory.',
          vi: 'Hãy nghĩ về thời điểm một đối tượng bất biến bị đóng băng dữ liệu trong RAM.',
        },
        answer: {
          en: 'Tuples and strings are immutable. By the time `__init__` is called, the immutable object has already been allocated and sealed in memory by `__new__`, making attribute or element mutation impossible. Therefore, customizations to immutable data must occur inside `__new__` before memory allocation completes.',
          vi: 'Tuple và string là kiểu dữ liệu bất biến. Khi phương thức `__init__` chạy thì đối tượng đã được `__new__` cấp phát và đóng băng trong RAM, không thể chỉnh sửa nội dung được nữa. Vì vậy, mọi biến đổi dữ liệu bất biến phải được thực hiện trong `__new__` trước khi chốt vùng nhớ.',
        },
      },
    ],
  },

  // Chapter 13: Inheritance, MRO & super() Mechanics
  {
    id: 'py-hb-ch-13',
    number: 13,
    partNumber: 4,
    partTitle: {
      en: 'Object-Oriented Architecture & Metaprogramming',
      vi: 'Kiến Trúc Hướng Đối Tượng & Lập Trình Siêu Cấp',
    },
    slug: 'inheritance-mro-super',
    title: {
      en: 'Inheritance, MRO & super() Mechanics',
      vi: 'Kế Thừa, MRO & Cơ Chế Hoạt Động Của super()',
    },
    summary: {
      en: 'Multiple inheritance, the C3 Linearization algorithm for Method Resolution Order (MRO), cooperative super() calls without explicit base class hardcoding, and mixin patterns.',
      vi: 'Đa kế thừa, thuật toán tuyến tính hóa C3 để xác định thứ tự MRO, gọi super() hợp tác không phụ thuộc tên class cha và kiến trúc Mixin.',
    },
    readTimeMinutes: 21,
    sections: [
      {
        id: 'py-hb-13-1',
        title: {
          en: 'Multiple Inheritance & The C3 Linearization Algorithm',
          vi: 'Đa Kế Thừa & Thuật Toán Tuyến Tính Hóa C3',
        },
        content: {
          en: 'Python supports multiple inheritance. When resolving method calls in complex diamond inheritance hierarchies, Python computes a deterministic search order known as the **Method Resolution Order (MRO)** using the **C3 Linearization Algorithm**. C3 guarantees two fundamental invariants: 1) **Local Precedence Order**: Subclasses appear before their parent base classes. 2) **Monotonicity**: If class A precedes class B in one class MRO, A must precede B in all descendant class MROs.',
          vi: 'Python hỗ trợ đa kế thừa toàn diện. Khi tìm kiếm phương thức trong cấu trúc hình kim cương (diamond inheritance), Python tính toán một danh sách thứ tự tìm kiếm xác định gọi là **Method Resolution Order (MRO)** dựa trên **Thuật Toán Tuyến Tính Hóa C3**. Thuật toán C3 đảm bảo 2 nguyên tắc bất biến: 1) **Thứ tự ưu tiên cục bộ**: Class con luôn đứng trước class cha. 2) **Tính đơn điệu (Monotonicity)**: Nếu class A đứng trước class B trong MRO của một class, thì A bắt buộc phải đứng trước B trong MRO của mọi class con cháu.',
        },
        diagram: {
          title: {
            en: 'Diamond Inheritance & C3 Linearization',
            vi: 'Đa Kế Thừa Hình Kim Cương & Thuật Toán C3',
          },
          steps: [
            {
              number: 1,
              label: { en: 'Base (A)', vi: 'Gốc (A)' },
              description: {
                en: 'Base class A defines core interface contract.',
                vi: 'Class cha gốc A định nghĩa giao diện chuẩn.',
              },
            },
            {
              number: 2,
              label: { en: 'Branches (B, C)', vi: 'Hai Nhánh (B, C)' },
              description: {
                en: 'Class B(A) and Class C(A) extend base class independently.',
                vi: 'Class B(A) và C(A) cùng kế thừa độc lập từ A.',
              },
            },
            {
              number: 3,
              label: { en: 'Leaf (D)', vi: 'Đỉnh (D)' },
              description: {
                en: 'Class D(B, C) inherits both branches. MRO resolves to: D -> B -> C -> A -> object.',
                vi: 'Class D(B, C) kế thừa cả hai. C3 giải MRO: D -> B -> C -> A -> object.',
              },
            },
          ],
        },
        codeBlock: {
          language: 'python',
          filename: 'c3_mro_inspection.py',
          code: `class A:
    def ping(self):
        print("A.ping")

class B(A):
    def ping(self):
        print("B.ping")
        super().ping()

class C(A):
    def ping(self):
        print("C.ping")
        super().ping()

class D(B, C):
    def ping(self):
        print("D.ping")
        super().ping()

# Inspect computed MRO tuple
print("Class D MRO Order:")
for idx, cls in enumerate(D.__mro__, 1):
    print(f"  {idx}. {cls.__name__}")

# Cooperative execution
d = D()
d.ping()`,
          explanation: {
            en: '`D.__mro__` proves `super()` inside B jumps horizontally to C before reaching base class A, executing cooperative diamond dispatch cleanly.',
            vi: '`D.__mro__` chứng minh lệnh `super()` trong class B sẽ nhảy ngang sang class C trước khi lên class cha A, tạo luồng thực thi hợp tác hoàn hảo.',
          },
        },
      },
      {
        id: 'py-hb-13-2',
        title: {
          en: 'Cooperative super() Calls vs. Hardcoded Parent Calls',
          vi: 'Gọi super() Hợp Tác vs. Gọi Cứng Tên Class Cha',
        },
        content: {
          en: 'A dangerous anti-pattern is calling base methods via explicit class names like `A.__init__(self)`. This bypasses the MRO and causes diamond base classes to be executed multiple times. Zero-argument `super()` (PEP 3135) inspects the runtime MRO of `type(self)` and delegates dynamically to the **next sibling class in the MRO chain**, guaranteeing every base class is visited exactly once.',
          vi: 'Một anti-pattern nguy hiểm là gọi hàm class cha bằng tên cứng như `A.__init__(self)`. Cách này bỏ qua bảng MRO và khiến class gốc bị chạy lặp lại nhiều lần. Cú pháp `super()` không tham số (PEP 3135) sẽ tự soi MRO của `type(self)` lúc runtime và chuyển tiếp tới **class tiếp theo trong chuỗi MRO**, đảm bảo mỗi class chỉ chạy đúng một lần.',
        },
        commonMistakes: [
          {
            mistake: {
              en: 'Hardcoding base class initializers `BaseClass.__init__(self)` instead of `super().__init__()` in multiple inheritance',
              vi: 'Gọi cứng hàm khởi tạo `BaseClass.__init__(self)` thay vì dùng `super().__init__()` trong đa kế thừa',
            },
            why: {
              en: 'Hardcoded calls skip intermediate classes in the MRO chain and duplicate calls to shared root classes.',
              vi: 'Gọi cứng sẽ nhảy cóc qua các class trung gian trong chuỗi MRO và làm class cha gốc bị khởi tạo 2 lần.',
            },
            solution: {
              en: 'Always use cooperative zero-argument `super().__init__(**kwargs)` across all classes in an inheritance hierarchy.',
              vi: 'Luôn dùng `super().__init__(**kwargs)` có tính hợp tác trên toàn bộ các class trong cây kế thừa.',
            },
            codeIncorrect: `class Service(BaseLogger, BaseConfig):
    def __init__(self):
        BaseLogger.__init__(self)  # Skips cooperative MRO dispatch!
        BaseConfig.__init__(self)`,
            codeCorrect: `class Service(BaseLogger, BaseConfig):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)  # Clean cooperative MRO chain`,
          },
        ],
        keyTakeaways: {
          en: [
            'CPython computes Method Resolution Order (MRO) using the C3 Linearization algorithm',
            'Zero-argument `super()` delegates to the next class in the runtime MRO sequence',
            'Never hardcode parent class names when calling overridden methods',
          ],
          vi: [
            'CPython tính thứ tự MRO bằng thuật toán Tuyến tính hóa C3',
            'Cú pháp `super()` không tham số gọi tới class tiếp theo trong chuỗi MRO runtime',
            'Tuyệt đối không gọi cứng tên class cha khi ghi đè phương thức',
          ],
        },
      },
    ],
    chapterSummary: {
      mentalModels: {
        en: [
          'MRO is a flat, linear search list computed deterministically at class definition time',
          'super() does not mean "my direct parent"; it means "the next class in this instance MRO"',
        ],
        vi: [
          'MRO là danh sách tìm kiếm phẳng, tuyến tính được tính toán khi định nghĩa class',
          'super() không có nghĩa là "cha trực tiếp"; nó có nghĩa là "class tiếp theo trong chuỗi MRO"',
        ],
      },
      rules: {
        en: [
          'Inspect `cls.__mro__` whenever debugging complex method resolution behaviors',
          'Forward keyword arguments (`**kwargs`) when designing cooperative multiple inheritance initializers',
        ],
        vi: [
          'Soi thuộc tính `cls.__mro__` mỗi khi debug hành vi gọi phương thức trong đa kế thừa',
          'Luôn chuyển tiếp `**kwargs` khi thiết kế constructor trong hệ thống đa kế thừa hợp tác',
        ],
      },
      commonTraps: {
        en: [
          'Creating inconsistent method resolution orders that raise `TypeError: Cannot create a consistent method resolution order (MRO)`',
        ],
        vi: [
          'Khai báo thứ tự kế thừa mâu thuẫn khiến Python báo lỗi không thể tạo bảng MRO nhất quán',
        ],
      },
      takeaway: {
        en: 'Cooperative multiple inheritance powered by C3 Linearization provides flexible, composable mixin architectures when super() is used consistently.',
        vi: 'Đa kế thừa hợp tác dựa trên thuật toán C3 mang lại kiến trúc Mixin linh hoạt và mạnh mẽ khi áp dụng super() đồng bộ.',
      },
    },
    selfReview: [
      {
        question: {
          en: 'What does `super().method()` actually do in Python 3?',
          vi: 'Lệnh `super().method()` thực chất làm gì trong Python 3?',
        },
        hint: {
          en: 'Consider the runtime MRO of the instance.',
          vi: 'Hãy nghĩ về chuỗi MRO của instance lúc runtime.',
        },
        answer: {
          en: '`super()` returns a proxy object that delegates method calls to the NEXT class in the calling instance Method Resolution Order (`__mro__`). It is NOT bound statically to the immediate lexical parent; its target is resolved dynamically based on `type(self)`.',
          vi: '`super()` trả về một đối tượng proxy chuyển tiếp lời gọi hàm tới class TIẾP THEO trong chuỗi MRO (`__mro__`) của instance hiện tại. Nó không gắn cố định vào class cha trực tiếp mà được giải quyết động dựa trên `type(self)`.',
        },
      },
    ],
  },

  // Chapter 14: Special (Dunder) Methods & Protocols
  {
    id: 'py-hb-ch-14',
    number: 14,
    partNumber: 4,
    partTitle: {
      en: 'Object-Oriented Architecture & Metaprogramming',
      vi: 'Kiến Trúc Hướng Đối Tượng & Lập Trình Siêu Cấp',
    },
    slug: 'special-dunder-methods-protocols',
    title: {
      en: 'Special Methods & Data Model Protocols',
      vi: 'Phương Thức Đặc Biệt & Giao Thức Data Model',
    },
    summary: {
      en: 'Python Data Model, special dunder methods, __repr__ vs __str__ developer contracts, operator overloading, and implementing sequence, mapping, and numeric protocols.',
      vi: 'Mô hình dữ liệu Python Data Model, các dunder method, quy ước __repr__ và __str__, nạp chồng toán tử và cài đặt giao thức sequence, mapping, số học.',
    },
    readTimeMinutes: 20,
    sections: [
      {
        id: 'py-hb-14-1',
        title: {
          en: 'The Python Data Model & Operator Overloading',
          vi: 'Mô Hình Dữ Liệu Python Data Model & Nạp Chồng Toán Tử',
        },
        content: {
          en: 'The **Python Data Model** defines an extensive suite of special double-underscore ("dunder") methods that allow user-defined classes to hook into language syntax seamlessly. When you write `len(obj)`, Python invokes `obj.__len__()`; when you write `a + b`, Python invokes `a.__add__(b)` (or falls back to `b.__radd__(a)`). By implementing these protocols, custom domain objects behave as natural first-class language citizens.',
          vi: '**Python Data Model** định nghĩa một bộ phương thức đặc biệt có 2 dấu gạch dưới ("dunder") cho phép class tự định nghĩa tích hợp mượt mà vào cú pháp ngôn ngữ. Khi bạn gọi `len(obj)`, Python gọi `obj.__len__()`; khi viết `a + b`, Python gọi `a.__add__(b)` (hoặc chuyển sang `b.__radd__(a)` nếu cần). Nhờ cài đặt các giao thức này, đối tượng của bạn sẽ hoạt động tự nhiên như các kiểu dữ liệu gốc.',
        },
        codeBlock: {
          language: 'python',
          filename: 'vector_math_protocol.py',
          code: `import math

class Vector2D:
    def __init__(self, x: float, y: float):
        self.x = float(x)
        self.y = float(y)

    # 1. Unambiguous developer representation
    def __repr__(self) -> str:
        return f"Vector2D(x={self.x}, y={self.y})"

    # 2. Human readable string representation
    def __str__(self) -> str:
        return f"({self.x}, {self.y})"

    # 3. Vector addition: v1 + v2
    def __add__(self, other: "Vector2D") -> "Vector2D":
        if not isinstance(other, Vector2D):
            return NotImplemented
        return Vector2D(self.x + other.x, self.y + other.y)

    # 4. Scalar multiplication: v * 3.0
    def __mul__(self, scalar: float) -> "Vector2D":
        return Vector2D(self.x * scalar, self.y * scalar)

    # 5. Length protocol: abs(v)
    def __abs__(self) -> float:
        return math.hypot(self.x, self.y)

v1 = Vector2D(3, 4)
v2 = Vector2D(1, 2)
print("Addition:", v1 + v2)        # (4.0, 6.0)
print("Magnitude:", abs(v1))        # 5.0
print("Developer repr:", repr(v1))  # Vector2D(x=3.0, y=4.0)`,
          explanation: {
            en: 'Demonstrates implementing `__repr__`, `__str__`, `__add__`, `__mul__`, and `__abs__` to build an expressive mathematical vector object.',
            vi: 'Minh họa cách cài đặt `__repr__`, `__str__`, `__add__`, `__mul__` và `__abs__` để xây dựng đối tượng vector toán học chuẩn mực.',
          },
        },
      },
      {
        id: 'py-hb-14-2',
        title: {
          en: '__repr__ vs. __str__: The Introspection Contract',
          vi: '__repr__ vs. __str__: Hợp Đồng Phản Chiếu Thông Tin',
        },
        content: {
          en: 'Every professional Python class must implement `__repr__`. The golden contract between `__repr__` and `__str__` is: 1) `__repr__()` is for **Developers and Debuggers**: it should be unambiguous and ideally return a valid Python expression string that can recreate the object (`eval(repr(obj)) == obj`). 2) `__str__()` is for **End Users**: it provides a clean, human-readable summary. If `__str__` is not implemented, Python automatically falls back to `__repr__`.',
          vi: 'Mọi class Python chuyên nghiệp đều cần cài đặt `__repr__`. Quy ước vàng giữa `__repr__` và `__str__` là: 1) `__repr__()` dành cho **Lập trình viên và Debugger**: phải rõ ràng, không mập mờ và lý tưởng nhất là trả về chuỗi biểu thức Python có thể tái tạo lại đối tượng (`eval(repr(obj)) == obj`). 2) `__str__()` dành cho **Người dùng cuối**: hiển thị thông tin thân thiện. Nếu không cài đặt `__str__`, Python sẽ tự động dùng `__repr__`.',
        },
        keyTakeaways: {
          en: [
            'The Python Data Model standardizes operator overloading and sequence behavior',
            'Always implement `__repr__` first on all custom classes for diagnostic clarity',
            'Return `NotImplemented` from binary operators to allow Python to try reflected methods (`__radd__`)',
          ],
          vi: [
            'Python Data Model chuẩn hóa hành vi nạp chồng toán tử và giao thức sequence',
            'Luôn ưu tiên cài đặt `__repr__` đầu tiên cho mọi class để dễ debug',
            'Trả về `NotImplemented` trong các toán tử 2 ngôi để Python thử gọi phương thức đảo (`__radd__`)',
          ],
        },
      },
    ],
    chapterSummary: {
      mentalModels: {
        en: [
          'Dunder methods translate Python syntax operators into polymorphic method dispatches',
          'repr is the unambiguous code representation; str is the user-facing display',
        ],
        vi: [
          'Dunder method dịch các toán tử cú pháp của ngôn ngữ thành các lời gọi hàm đa hình',
          'repr là biểu diễn mã nguồn chuẩn xác; str là định dạng hiển thị cho người dùng',
        ],
      },
      rules: {
        en: [
          'Return `NotImplemented` instead of raising `TypeError` inside binary dunder methods',
          'Ensure `__repr__` outputs class name and critical state attributes',
        ],
        vi: [
          'Trả về `NotImplemented` thay vì tự ném lỗi `TypeError` trong các dunder method toán tử',
          'Đảm bảo `__repr__` hiển thị tên class và các thuộc tính trạng thái quan trọng',
        ],
      },
      commonTraps: {
        en: [
          'Raising TypeError inside `__add__` which breaks Python fallback to `__radd__` on the right-hand operand',
        ],
        vi: [
          'Ném lỗi TypeError trong `__add__` làm chặn đứng cơ chế thử lại bằng `__radd__` của toán hạng bên phải',
        ],
      },
      takeaway: {
        en: 'By leveraging special dunder methods, custom domain models integrate seamlessly with Python built-in idioms and standard library algorithms.',
        vi: 'Tận dụng dunder methods giúp các domain model tùy chỉnh tích hợp mượt mà vào cú pháp tự nhiên của Python và các thuật toán trong thư viện chuẩn.',
      },
    },
    selfReview: [
      {
        question: {
          en: 'Why should a custom operator method return `NotImplemented` rather than raising `TypeError`?',
          vi: 'Tại sao phương thức nạp chồng toán tử nên trả về `NotImplemented` thay vì ném lỗi `TypeError`?',
        },
        hint: {
          en: 'Consider what Python does when the left-hand operand does not know how to handle the right-hand type.',
          vi: 'Hãy xem Python xử lý thế nào khi toán hạng bên trái không biết cách cộng với kiểu dữ liệu bên phải.',
        },
        answer: {
          en: 'When `a.__add__(b)` returns `NotImplemented`, Python catches this signal and immediately attempts the reflected operation on the right operand: `b.__radd__(a)`. If you raise `TypeError` directly, the entire operation crashes immediately without giving `b` an opportunity to handle the operation.',
          vi: 'Khi `a.__add__(b)` trả về `NotImplemented`, Python bắt tín hiệu này và thử gọi phương thức đảo trên toán hạng bên phải: `b.__radd__(a)`. Nếu bạn tự ý ném `TypeError`, chương trình sẽ crash ngay lập tức và không cho đối tượng `b` cơ hội xử lý phép tính.',
        },
      },
    ],
  },

  // Chapter 15: Descriptors, Properties & Attribute Lookup
  {
    id: 'py-hb-ch-15',
    number: 15,
    partNumber: 4,
    partTitle: {
      en: 'Object-Oriented Architecture & Metaprogramming',
      vi: 'Kiến Trúc Hướng Đối Tượng & Lập Trình Siêu Cấp',
    },
    slug: 'descriptors-properties-attribute-lookup',
    title: {
      en: 'Descriptors, Properties & Attribute Lookup',
      vi: 'Descriptors, Properties & Tra Cứu Thuộc Tính',
    },
    summary: {
      en: 'The definitive attribute lookup precedence hierarchy (__getattribute__ vs __getattr__), data vs non-data descriptors, property mechanics, and __slots__ memory optimization.',
      vi: 'Thứ tự ưu tiên tra cứu thuộc tính (__getattribute__ vs __getattr__), data descriptor và non-data descriptor, cơ chế @property và tối ưu bộ nhớ bằng __slots__.',
    },
    readTimeMinutes: 22,
    sections: [
      {
        id: 'py-hb-15-1',
        title: {
          en: 'The Attribute Lookup Precedence Algorithm',
          vi: 'Thuật Toán Phân Cấp Tra Cứu Thuộc Tính',
        },
        content: {
          en: 'When accessing `obj.attr`, CPython follows a strict 5-step lookup precedence: 1) **Data Descriptor**: Searches the class MRO for descriptors implementing `__set__` or `__delete__` (Data Descriptors take absolute precedence over instance dictionaries). 2) **Instance Dictionary**: Searches `obj.__dict__["attr"]`. 3) **Non-Data Descriptor / Class Attribute**: Searches the class MRO for non-data descriptors (like methods or descriptors implementing only `__get__`) and raw class attributes. 4) **__getattr__ Fallback**: If still not found, invokes `obj.__getattr__("attr")`. 5) **AttributeError**: Raises `AttributeError` if all steps fail.',
          vi: 'Khi bạn truy cập `obj.attr`, CPython thực thi thuật toán tra cứu 5 bước nghiêm ngặt: 1) **Data Descriptor**: Tìm trong MRO của class các descriptor có cài đặt `__set__` hoặc `__delete__` (Data descriptor luôn chiếm quyền ưu tiên cao hơn dictionary của instance). 2) **Instance Dictionary**: Tìm trong `obj.__dict__["attr"]`. 3) **Non-Data Descriptor / Class Attribute**: Tìm trong MRO của class các non-data descriptor (như phương thức hoặc descriptor chỉ có `__get__`) và thuộc tính class. 4) **Dự phòng __getattr__**: Nếu vẫn chưa thấy, gọi phương thức `obj.__getattr__("attr")`. 5) **AttributeError**: Báo lỗi nếu tất cả các bước đều thất bại.',
        },
        diagram: {
          title: {
            en: 'Python Attribute Lookup Hierarchy',
            vi: 'Cây Phân Cấp Tra Cứu Thuộc Tính Trong Python',
          },
          steps: [
            {
              number: 1,
              label: { en: 'Data Descriptor Check', vi: 'Kiểm Tra Data Descriptor' },
              description: {
                en: 'Checks class MRO for descriptor defining __get__ AND (__set__ or __delete__).',
                vi: 'Tìm trong class MRO xem có descriptor cài đặt __get__ VÀ (__set__ hoặc __delete__).',
              },
            },
            {
              number: 2,
              label: { en: 'Instance __dict__', vi: 'Kiểm Tra Instance __dict__' },
              description: {
                en: 'Searches instance dictionary obj.__dict__["attr"].',
                vi: 'Tìm khóa trong dictionary riêng của instance obj.__dict__["attr"].',
              },
            },
            {
              number: 3,
              label: { en: 'Non-Data / Class Attr', vi: 'Non-Data / Thuộc Tính Class' },
              description: {
                en: 'Searches class MRO for methods or descriptors defining only __get__.',
                vi: 'Tìm trong class MRO các phương thức hoặc descriptor chỉ có __get__.',
              },
            },
            {
              number: 4,
              label: { en: '__getattr__ Hook', vi: 'Phương Thức Dự Phòng __getattr__' },
              description: {
                en: 'Invokes fallback __getattr__ hook if attribute was missing.',
                vi: 'Gọi hàm dự phòng __getattr__ nếu không tìm thấy thuộc tính ở các bước trên.',
              },
            },
          ],
        },
      },
      {
        id: 'py-hb-15-2',
        title: {
          en: 'Custom Descriptors & The @property Protocol',
          vi: 'Tự Viết Descriptors & Cơ Chế Hoạt Động Của @property',
        },
        content: {
          en: 'A **Descriptor** is any object that implements at least one of `__get__`, `__set__`, or `__delete__`. Descriptors power all advanced Python attribute binding: methods, `@property`, `@classmethod`, `@staticmethod`, and ORM model fields (like Django or SQLAlchemy). Python 3.6 introduced `__set_name__(self, owner, name)`, which automatically captures the attribute name when assigned to a class attribute.',
          vi: 'Một **Descriptor** là bất kỳ đối tượng nào cài đặt ít nhất một trong các phương thức `__get__`, `__set__` hoặc `__delete__`. Descriptor chính là động cơ đứng sau toàn bộ cơ chế gắn thuộc tính nâng cao của Python: methods, `@property`, `@classmethod`, `@staticmethod` và các trường ORM model. Từ Python 3.6 có thêm `__set_name__(self, owner, name)` giúp tự động ghi nhận tên biến được gán trong class cha.',
        },
        codeBlock: {
          language: 'python',
          filename: 'typed_field_descriptor.py',
          code: `class ValidatedPositiveNumber:
    def __set_name__(self, owner, name):
        self.public_name = name
        self.private_name = f"_{name}"

    def __get__(self, instance, owner):
        if instance is None:
            return self
        return getattr(instance, self.private_name, 0.0)

    def __set__(self, instance, value):
        if not isinstance(value, (int, float)) or value < 0:
            raise ValueError(f"'{self.public_name}' must be a positive number! Got {value}")
        setattr(instance, self.private_name, float(value))

class ProductListing:
    price = ValidatedPositiveNumber()
    shipping_cost = ValidatedPositiveNumber()

    def __init__(self, title: str, price: float, shipping: float):
        self.title = title
        self.price = price
        self.shipping_cost = shipping

p = ProductListing("Mechanical Keyboard", 120.0, 15.0)
print("Valid price:", p.price)

# Invalid assignment triggers descriptor validation
try:
    p.price = -45.0
except ValueError as e:
    print("Caught validation failure:", e)`,
          explanation: {
            en: 'Demonstrates a reusable Data Descriptor validating attributes across class instances using `__set_name__`, `__get__`, and `__set__`.',
            vi: 'Minh họa cách viết Data Descriptor tái sử dụng để kiểm tra tính hợp lệ của dữ liệu bằng `__set_name__`, `__get__` và `__set__`.',
          },
        },
      },
      {
        id: 'py-hb-15-3',
        title: {
          en: '__slots__ Memory Optimization for High-Volume Objects',
          vi: 'Tối Ưu Hóa Bộ Nhớ Bằng __slots__ Cho Hàng Triệu Đối Tượng',
        },
        content: {
          en: 'By default, every Python instance stores its attributes in an internal `__dict__` hash table dictionary, consuming roughly 150-200 bytes of overhead per instance. When instantiating millions of small records, defining `__slots__ = ("attr1", "attr2")` suppresses `__dict__` creation. CPython allocates a fixed-size compact C struct array of pointers instead, slashing memory consumption by **~60-70%** and improving attribute access speed.',
          vi: 'Mặc định, mỗi instance trong Python lưu thuộc tính trong một bảng băm `__dict__` riêng, tốn khoảng 150-200 byte overhead cho mỗi object. Khi cần tạo hàng triệu bản ghi, việc khai báo `__slots__ = ("attr1", "attr2")` sẽ triệt tiêu việc tạo `__dict__`. CPython sẽ thay thế bằng một mảng con trỏ C cố định kích thước, cắt giảm **~60-70%** dung lượng RAM và tăng tốc độ đọc ghi thuộc tính.',
        },
        codeBlock: {
          language: 'python',
          filename: 'slots_memory_savings.py',
          code: `import sys

class StandardPoint:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

class SlottedPoint:
    __slots__ = ("x", "y")
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

p_std = StandardPoint(1.0, 2.0)
p_slot = SlottedPoint(1.0, 2.0)

# Memory footprint comparison
std_total_size = sys.getsizeof(p_std) + sys.getsizeof(p_std.__dict__)
slot_total_size = sys.getsizeof(p_slot)

print(f"Standard instance memory: {std_total_size} bytes (has __dict__)")
print(f"Slotted instance memory:  {slot_total_size} bytes (no __dict__)")
print(f"Memory reduction:         {(1 - slot_total_size / std_total_size):.1%}")`,
          explanation: {
            en: 'Proves `__slots__` eliminates `__dict__` allocation, dramatically reducing memory overhead for high-volume data structures.',
            vi: 'Chứng minh `__slots__` loại bỏ hoàn toàn `__dict__`, giúp tiết kiệm bộ nhớ vượt trội khi xử lý dữ liệu lớn.',
          },
        },
        keyTakeaways: {
          en: [
            'Data descriptors take precedence over instance `__dict__` during attribute lookup',
            '`__getattr__` is called only when an attribute is not found by normal lookup mechanisms',
            'Use `__slots__` to eliminate `__dict__` overhead and reduce memory consumption by up to 70%',
          ],
          vi: [
            'Data descriptor luôn có quyền ưu tiên cao hơn `__dict__` của instance khi tra cứu',
            '`__getattr__` chỉ được gọi khi thuộc tính không tìm thấy qua các bước tra cứu chuẩn',
            'Dùng `__slots__` để xóa bỏ overhead của `__dict__` và giảm tới 70% dung lượng RAM',
          ],
        },
      },
    ],
    chapterSummary: {
      mentalModels: {
        en: [
          'Attribute lookup is a deterministic waterfall: Data Descriptor -> Instance dict -> Non-Data Descriptor -> __getattr__',
          'Descriptors intercept and virtualize attribute reads, writes, and deletions at the class level',
        ],
        vi: [
          'Tra cứu thuộc tính là dòng thác có thứ tự: Data Descriptor -> Instance dict -> Non-Data Descriptor -> __getattr__',
          'Descriptor can thiệp và trừu tượng hóa các thao tác đọc, ghi, xóa thuộc tính ở cấp class',
        ],
      },
      rules: {
        en: [
          'Always use `__set_name__` in custom descriptors to automatically discover bound attribute names',
          'Only add `__slots__` after profiling confirms high-volume instance memory pressure',
        ],
        vi: [
          'Luôn tận dụng `__set_name__` trong descriptor tùy chỉnh để tự động nhận diện tên thuộc tính',
          'Chỉ dùng `__slots__` khi profile bộ nhớ chứng minh ứng dụng đang tạo số lượng instance cực lớn',
        ],
      },
      commonTraps: {
        en: [
          'Storing instance data directly on the descriptor instance `self.val`, inadvertently sharing state across all class instances',
        ],
        vi: [
          'Lưu dữ liệu instance trực tiếp trên biến `self.val` của descriptor khiến tất cả các instance dùng chung một giá trị',
        ],
      },
      takeaway: {
        en: 'Descriptors and attribute lookup rules represent the peak of Python object architecture, unlocking elegant validation, lazy properties, and ORM abstractions.',
        vi: 'Descriptor và quy tắc tra cứu thuộc tính là đỉnh cao của kiến trúc hướng đối tượng Python, mở ra khả năng xây dựng hệ thống validation, lazy property và ORM tuyệt vời.',
      },
    },
    selfReview: [
      {
        question: {
          en: 'What is the difference between a Data Descriptor and a Non-Data Descriptor in Python?',
          vi: 'Sự khác biệt giữa Data Descriptor và Non-Data Descriptor trong Python là gì?',
        },
        hint: {
          en: 'Look at the methods implemented (`__set__` vs `__get__`) and precedence over `instance.__dict__`.',
          vi: 'Xem phương thức nào được cài đặt (`__set__` so với `__get__`) và độ ưu tiên so với `instance.__dict__`.',
        },
        answer: {
          en: 'A Data Descriptor implements `__set__` or `__delete__` (in addition to `__get__`) and takes precedence OVER the instance dictionary `__dict__`. A Non-Data Descriptor implements ONLY `__get__` (like regular methods), so an entry in `instance.__dict__` overrides and shadows the non-data descriptor.',
          vi: 'Data Descriptor cài đặt phương thức `__set__` hoặc `__delete__` (bên cạnh `__get__`) và có quyền ưu tiên CAO HƠN `__dict__` của instance. Non-Data Descriptor CHỈ cài đặt `__get__` (như các hàm method thông thường), nên nếu instance có thuộc tính trùng tên trong `__dict__` thì nó sẽ ghi đè lên non-data descriptor.',
        },
      },
    ],
  },
];
