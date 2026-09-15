import { Lesson } from '../../../../types';

export const lesson31: Lesson = {
  id: 'py_lesson_31',
  moduleId: 'py_mod_12',
  levelId: 'advanced',
  courseId: 'python',
  order: 31,
  topicId: 'python_metaprogramming_descriptors',
  title: {
    en: 'Metaprogramming & Descriptors: __new__, __init_subclass__, Metaclasses & Descriptor Protocol',
    vi: 'Siêu Lập Trình (Metaprogramming) & Giao Thức Descriptor Trong Python'
  },
  summary: {
    en: 'Master deep Python internals and metaprogramming architecture: instance creation hooks with __new__, lightweight class customization via __init_subclass__, dynamic class synthesis with type(), custom metaclasses, and the full Descriptor Protocol (__get__, __set__, __delete__, __set_name__).',
    vi: 'Làm chủ cơ chế hoạt động sâu bên trong của Python và kiến trúc siêu lập trình: can thiệp khởi tạo đối tượng với __new__, tùy biến lớp con bằng __init_subclass__, tạo class động với type(), metaclass tùy biến và toàn bộ giao thức Descriptor Protocol (__get__, __set__, __delete__, __set_name__).'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Metaprogramming is the technique of writing code that inspects, modifies, or generates classes and objects dynamically at runtime. Python achieves this through its object instantiation lifecycle (`__new__`), class construction hooks (`__init_subclass__`, metaclasses), and the descriptor protocol powering `@property`, methods, and ORM attribute mappers.',
      vi: 'Siêu lập trình (Metaprogramming) là kỹ thuật viết mã có khả năng kiểm tra, biến đổi hoặc sinh ra các class và đối tượng động khi chương trình đang chạy. Python hiện thực điều này thông qua vòng đời khởi tạo đối tượng (`__new__`), hook tạo class (`__init_subclass__`, metaclass) và giao thức descriptor tạo nên nền tảng cho `@property`, methods và các thư viện ORM.'
    },
    conceptExplanation: {
      en: '1. Object Instantiation: `__new__` vs `__init__`:\n- `__new__(cls, *args, **kwargs)`: The static allocator responsible for creating and returning a new raw instance. Used in singletons, immutable subclasses (inheriting `tuple` or `int`), and metaprogramming.\n- `__init__(self, *args, **kwargs)`: The initializer that configures attributes on the newly created instance.\n\n2. The Descriptor Protocol (PEP 487):\n- A descriptor is an object attribute whose binding behavior is overridden by methods in the descriptor protocol: `__get__(self, instance, owner)`, `__set__(self, instance, value)`, `__delete__(self, instance)`, `__set_name__(self, owner, name)`.\n- **Data Descriptor**: Implements `__set__` or `__delete__` (takes precedence over instance `__dict__`).\n- **Non-Data Descriptor**: Only implements `__get__` (e.g. standard class methods).\n\n3. Modern Class Customization with `__init_subclass__` (PEP 487):\n- Eliminates the need for complex metaclasses in 95% of use cases.\n- Automatically hooks into child class declaration to enforce schema rules, register subclasses, or validate attributes.\n\n4. Metaclasses & Dynamic Classes with `type`:\n- In Python, classes are instances of metaclasses (`type`).\n- `DynamicClass = type("ClassName", (BaseClass,), {"attribute": value})` creates classes dynamically.',
      vi: '1. Khởi Tạo Đối Tượng: `__new__` vs `__init__`:\n- `__new__(cls, *args, **kwargs)`: Hàm cấp phát bộ nhớ chịu trách nhiệm tạo và trả về một instance thô mới. Dùng trong Singleton, kế thừa kiểu bất biến (`tuple`, `int`) và metaprogramming.\n- `__init__(self, *args, **kwargs)`: Hàm khởi tạo gán giá trị thuộc tính cho instance sau khi đã được tạo.\n\n2. Giao Thức Descriptor Protocol (PEP 487):\n- Descriptor là thuộc tính của class có hành vi truy cập được ghi đè bởi các phương thức: `__get__(self, instance, owner)`, `__set__(self, instance, value)`, `__delete__(self, instance)`, `__set_name__(self, owner, name)`.\n- **Data Descriptor**: Có cài đặt `__set__` hoặc `__delete__` (ưu tiên cao hơn `__dict__` của instance).\n- **Non-Data Descriptor**: Chỉ cài đặt `__get__` (vd: method thông thường).\n\n3. Tùy Biến Lớp Con Hiện Đại Với `__init_subclass__` (PEP 487):\n- Thay thế hoàn toàn sự phức tạp của Metaclass trong 95% tình huống thực tế.\n- Tự động can thiệp khi một lớp con kế thừa để đăng ký plugin, kiểm tra schema hoặc ràng buộc thuộc tính.\n\n4. Metaclass & Tạo Lớp Động Với `type`:\n- Trong Python, class cũng chính là các đối tượng instance của metaclass (`type`).\n- `DynamicClass = type("ClassName", (BaseClass,), {"attribute": value})` sinh ra class động trong lúc chạy.'
    },
    syntax: `# 1. Validation Data Descriptor (PEP 487)
class PositiveFloat:
    def __set_name__(self, owner, name):
        self.private_name = f"_{name}"

    def __get__(self, instance, owner):
        if instance is None:
            return self
        return getattr(instance, self.private_name, 0.0)

    def __set__(self, instance, value):
        if not isinstance(value, (int, float)) or value < 0:
            raise ValueError(f"Attribute must be a non-negative number, got {value}")
        setattr(instance, self.private_name, float(value))

# 2. Modern Subclass Registration Hook
class PluginBase:
    registry: dict[str, type] = {}

    def __init_subclass__(cls, plugin_name: str | None = None, **kwargs):
        super().__init_subclass__(**kwargs)
        if plugin_name:
            cls.registry[plugin_name] = cls

class StripePayment(PluginBase, plugin_name="stripe"):
    pass

# 3. Singleton with __new__
class DatabaseConnection:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance`,
    examples: [
      {
        title: {
          en: 'Production ORM Field Descriptor & Auto-Registration Architecture',
          vi: 'Kiến Trúc ORM Field Descriptor & Tự Động Đăng Ký Model'
        },
        code: `class TypedField:
    def __init__(self, expected_type):
        self.expected_type = expected_type

    def __set_name__(self, owner, name):
        self.field_name = name
        self.storage_name = f"_{name}"

    def __get__(self, instance, owner):
        if instance is None:
            return self
        return getattr(instance, self.storage_name, None)

    def __set__(self, instance, value):
        if not isinstance(value, self.expected_type):
            raise TypeError(f"Field {self.field_name} must be {self.expected_type.__name__}")
        setattr(instance, self.storage_name, value)

class UserAccount:
    user_id = TypedField(int)
    username = TypedField(str)

    def __init__(self, user_id: int, username: str):
        self.user_id = user_id
        self.username = username

user = UserAccount(101, "dev_admin")
print(f"User validated: {user.user_id}, {user.username}")`,
        language: 'python',
        explanation: {
          en: 'Uses TypedField descriptors with `__set_name__` to enforce type safety on assignment transparently.',
          vi: 'Sử dụng descriptor TypedField với `__set_name__` để kiểm tra kiểu dữ liệu tự động khi gán giá trị thuộc tính.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Storing instance values directly on `self` inside a descriptor (shares data across all class instances).',
          vi: 'Lưu giá trị của instance trực tiếp vào `self` bên trong descriptor (khiến tất cả các đối tượng dùng chung một giá trị).'
        },
        correction: {
          en: 'Store values on the target `instance` using `setattr(instance, self.private_name, value)` or a WeakKeyDictionary.',
          vi: 'Lưu giá trị trên đối tượng `instance` mục tiêu bằng `setattr(instance, self.private_name, value)` hoặc WeakKeyDictionary.'
        },
        code: `# Bug: self.value = value\n# Correct:\nsetattr(instance, self.private_name, value)`
      },
      {
        mistake: {
          en: 'Overusing Metaclasses when `__init_subclass__` or class decorators provide a much simpler and cleaner solution.',
          vi: 'Lạm dụng Metaclass trong khi `__init_subclass__` hoặc class decorator đem lại giải pháp đơn giản và dễ hiểu hơn nhiều.'
        },
        correction: {
          en: 'Adopt `__init_subclass__` (PEP 487) as the standard default for subclass hook customization.',
          vi: 'Áp dụng `__init_subclass__` (PEP 487) làm tiêu chuẩn mặc định khi cần can thiệp lớp con.'
        },
        code: `class Base:\n    def __init_subclass__(cls, **kwargs):\n        super().__init_subclass__(**kwargs)\n        cls.registered = True`
      }
    ],
    tips: [
      {
        en: '`__set_name__(self, owner, name)` is invoked automatically at class creation time, giving the descriptor its attribute name without manual configuration.',
        vi: '`__set_name__(self, owner, name)` được tự động gọi khi class được tạo, giúp descriptor biết chính xác tên thuộc tính của mình.'
      },
      {
        en: 'Method binding in Python (`instance.method()`) is implemented via the Non-Data Descriptor protocol on function objects.',
        vi: 'Cơ chế gắn kết method (`instance.method()`) trong Python được hiện thực thông qua Non-Data Descriptor trên đối tượng hàm.'
      }
    ]
  },
  exercisePool: [
    {
      id: 'py_28_ex1',
      type: 'write_code',
      title: {
        en: 'Exercise 1: Non-Empty String Descriptor with __set_name__',
        vi: 'Bài tập 1: Descriptor Kiểm Tra Chuỗi Không Rỗng'
      },
      instruction: {
        en: 'Implement a descriptor `NonEmptyString` that validates assignments. In `__set__(self, instance, value)`, ensure `value` is an `isinstance(value, str)` and `len(value.strip()) > 0`; otherwise raise `ValueError("Must be non-empty string")`. Use `__set_name__` to store value under `_{name}`.',
        vi: 'Cài đặt descriptor `NonEmptyString` kiểm tra gán giá trị. Trong `__set__(self, instance, value)`, đảm bảo `value` là `isinstance(value, str)` và `len(value.strip()) > 0`; nếu không thì ném `ValueError("Must be non-empty string")`. Dùng `__set_name__` để lưu thuộc tính dưới tên `_{name}`.'
      },
      starterCode: `class NonEmptyString:
    # TODO: Implement descriptor protocol methods
    pass`,
      solutionCode: `class NonEmptyString:
    def __set_name__(self, owner, name):
        self.storage_name = f"_{name}"

    def __get__(self, instance, owner):
        if instance is None:
            return self
        return getattr(instance, self.storage_name, None)

    def __set__(self, instance, value):
        if not isinstance(value, str) or not value.strip():
            raise ValueError("Must be non-empty string")
        setattr(instance, self.storage_name, value)`,
      hint: {
        en: 'Implement `__set_name__`, `__get__`, and `__set__` checking string validity.',
        vi: 'Cài đặt `__set_name__`, `__get__`, và `__set__` kiểm tra tính hợp lệ của chuỗi.'
      },
      explanation: {
        en: 'Demonstrates a complete Data Descriptor with descriptor protocol hooks.',
        vi: 'Minh họa một Data Descriptor hoàn chỉnh với đầy đủ các hook giao thức descriptor.'
      }
    },
    {
      id: 'py_28_ex2',
      type: 'write_code',
      title: {
        en: 'Exercise 2: Subclass Registry via __init_subclass__',
        vi: 'Bài tập 2: Tự Động Đăng Ký Lớp Con Với __init_subclass__'
      },
      instruction: {
        en: 'Create a base class `EventSink` with a class attribute `registry = {}`. Implement `__init_subclass__(cls, event_type: str = "", **kwargs)` so that any subclass providing `event_type` is automatically saved in `EventSink.registry[event_type] = cls`.',
        vi: 'Tạo class cha `EventSink` có thuộc tính `registry = {}`. Cài đặt `__init_subclass__(cls, event_type: str = "", **kwargs)` sao cho bất kỳ lớp con nào cung cấp `event_type` đều được tự động lưu vào `EventSink.registry[event_type] = cls`.'
      },
      starterCode: `class EventSink:
    # TODO: Implement class registry with __init_subclass__
    pass`,
      solutionCode: `class EventSink:
    registry = {}

    def __init_subclass__(cls, event_type: str = "", **kwargs):
        super().__init_subclass__(**kwargs)
        if event_type:
            EventSink.registry[event_type] = cls`,
      hint: {
        en: 'Call `super().__init_subclass__(**kwargs)` and populate `EventSink.registry`.',
        vi: 'Gọi `super().__init_subclass__(**kwargs)` và gán vào `EventSink.registry`.'
      },
      explanation: {
        en: '`__init_subclass__` provides automatic child registration at class definition time without metaclasses.',
        vi: '`__init_subclass__` tự động đăng ký lớp con tại thời điểm định nghĩa class mà không cần metaclass.'
      }
    }
  ],
  challenge: {
    id: 'py_28_challenge',
    title: {
      en: 'Thread-Safe Singleton Metaclass Architecture',
      vi: 'Kiến Trúc Singleton Metaclass An Toàn Luồng'
    },
    description: {
      en: 'Implement a metaclass `SingletonMeta(type)` that ensures classes using `metaclass=SingletonMeta` only ever instantiate a single instance. Subsequent calls to `Class()` must return the existing cached instance.',
      vi: 'Xây dựng một metaclass `SingletonMeta(type)` đảm bảo các class sử dụng `metaclass=SingletonMeta` chỉ khởi tạo duy nhất một instance. Các lệnh gọi `Class()` tiếp theo phải trả về đúng instance đã tạo trước đó.'
    },
    requirements: [
      {
        en: 'Inherit from Python built-in type',
        vi: 'Kế thừa từ type nguyên bản của Python'
      },
      {
        en: 'Maintain a class dictionary mapping class types to single instantiated objects',
        vi: 'Duy trì từ điển ánh xạ kiểu class sang đối tượng đơn thể đã khởi tạo'
      },
      {
        en: 'Override __call__ to intercept class instantiation',
        vi: 'Ghi đè __call__ để can thiệp quá trình khởi tạo instance của class'
      }
    ],
    hints: [
      {
        en: 'In __call__(cls, *args, **kwargs), check if cls is in cls._instances. If not, call super().__call__.',
        vi: 'Trong __call__(cls, *args, **kwargs), kiểm tra nếu cls chưa có trong cls._instances thì gọi super().__call__.'
      }
    ],
    starterCode: `class SingletonMeta(type):
    # TODO: Implement __call__ intercepting instantiation
    pass`,
    solutionCode: `class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]`,
    solutionExplanation: {
      en: 'Overriding __call__ on a metaclass controls object construction before __new__ or __init__ of the target class.',
      vi: 'Ghi đè __call__ trên metaclass kiểm soát việc tạo đối tượng trước khi __new__ hoặc __init__ của lớp mục tiêu được kích hoạt.'
    }
  },
  quizQuestionPool: [
    {
      id: 'py_28_q1',
      type: 'single_choice',
      topicId: 'python_metaprogramming',
      difficulty: 'easy',
      question: {
        en: 'What is the fundamental difference between `__new__` and `__init__` in Python?',
        vi: 'Điểm khác biệt căn bản giữa `__new__` và `__init__` trong Python là gì?'
      },
      options: [
        { en: '`__init__` creates the instance in memory, while `__new__` assigns values', vi: '`__init__` cấp phát instance trong bộ nhớ, còn `__new__` gán giá trị' },
        { en: '`__new__` is the constructor method that allocates and returns the new raw instance object, whereas `__init__` initializes attributes on the existing instance', vi: '`__new__` là phương thức cấp phát bộ nhớ tạo và trả về instance thô mới, trong khi `__init__` khởi tạo thuộc tính trên instance đã có' },
        { en: '`__new__` only runs for numbers', vi: '`__new__` chỉ chạy cho các kiểu số' },
        { en: '`__init__` is only used in abstract classes', vi: '`__init__` chỉ dùng trong abstract class' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`__new__` allocates the object (`cls` parameter); `__init__` customizes the created object (`self` parameter).',
        vi: '`__new__` cấp phát đối tượng (nhận tham số `cls`); `__init__` gán thuộc tính cho đối tượng vừa tạo (nhận tham số `self`).'
      }
    },
    {
      id: 'py_28_q2',
      type: 'single_choice',
      topicId: 'python_metaprogramming',
      difficulty: 'medium',
      question: {
        en: 'What distinguishes a "Data Descriptor" from a "Non-Data Descriptor"?',
        vi: 'Điều gì phân biệt "Data Descriptor" với "Non-Data Descriptor"?'
      },
      options: [
        { en: 'Data descriptors store data on disk', vi: 'Data descriptor lưu dữ liệu xuống đĩa' },
        { en: 'Data descriptors implement `__set__` or `__delete__` (taking priority over instance `__dict__`), while Non-Data descriptors only implement `__get__` (e.g. methods)', vi: 'Data descriptor có cài đặt `__set__` hoặc `__delete__` (ưu tiên cao hơn `__dict__` của instance), trong khi Non-Data descriptor chỉ cài đặt `__get__` (vd: method)' },
        { en: 'Non-data descriptors cannot be called', vi: 'Non-data descriptor không thể gọi được' },
        { en: 'Data descriptors must inherit from list', vi: 'Data descriptor phải kế thừa từ list' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Python attribute lookup checks Data Descriptors before instance `__dict__`, and Non-Data Descriptors after instance `__dict__`.',
        vi: 'Thứ tự tra cứu thuộc tính của Python kiểm tra Data Descriptor trước `__dict__` của instance, và Non-Data Descriptor sau `__dict__`.'
      }
    },
    {
      id: 'py_28_q3',
      type: 'single_choice',
      topicId: 'python_metaprogramming',
      difficulty: 'medium',
      question: {
        en: 'What hook method introduced in PEP 487 is automatically called on a parent class whenever it is subclassed?',
        vi: 'Phương thức hook nào được giới thiệu trong PEP 487 sẽ tự động được gọi trên class cha mỗi khi có một class con kế thừa nó?'
      },
      options: [
        { en: '`__on_inherit__`', vi: '`__on_inherit__`' },
        { en: '`__init_subclass__`', vi: '`__init_subclass__`' },
        { en: '`__subclass_created__`', vi: '`__subclass_created__`' },
        { en: '`__inherit__`', vi: '`__inherit__`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`__init_subclass__` allows parent classes to intercept and customize child class creation cleanly.',
        vi: '`__init_subclass__` cho phép lớp cha can thiệp và tùy biến việc tạo lớp con một cách gọn gàng.'
      }
    },
    {
      id: 'py_28_q4',
      type: 'single_choice',
      topicId: 'python_metaprogramming',
      difficulty: 'easy',
      question: {
        en: 'What is the role of `__set_name__(self, owner, name)` in the descriptor protocol?',
        vi: 'Vai trò của phương thức `__set_name__(self, owner, name)` trong giao thức descriptor là gì?'
      },
      options: [
        { en: 'It renames the file', vi: 'Nó đổi tên file' },
        { en: 'It is automatically called at class creation time to inform the descriptor of the attribute name it was assigned to', vi: 'Nó được tự động gọi khi class được tạo để thông báo cho descriptor biết tên thuộc tính mà nó được gán' },
        { en: 'It sets the user\'s username', vi: 'Nó đặt username của người dùng' },
        { en: 'It changes the class name dynamically', vi: 'Nó đổi tên class một cách động' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`__set_name__` removes the need to manually pass attribute names to descriptor constructors.',
        vi: '`__set_name__` loại bỏ sự cần thiết phải truyền tên thuộc tính vào constructor của descriptor một cách thủ công.'
      }
    },
    {
      id: 'py_28_q5',
      type: 'single_choice',
      topicId: 'python_metaprogramming',
      difficulty: 'medium',
      question: {
        en: 'How do you create a class dynamically at runtime using the built-in `type` constructor?',
        vi: 'Làm thế nào để tạo một class động trong lúc chạy bằng constructor `type` tích hợp sẵn?'
      },
      options: [
        { en: '`type.new("MyClass", [Base], {attrs})`', vi: '`type.new("MyClass", [Base], {attrs})`' },
        { en: '`type(name_str, bases_tuple, dict_attributes)`', vi: '`type(name_str, bases_tuple, dict_attributes)`' },
        { en: '`type.create("MyClass")`', vi: '`type.create("MyClass")`' },
        { en: '`class.from_dict("MyClass", {attrs})`', vi: '`class.from_dict("MyClass", {attrs})`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`type(name, bases, dict)` is the three-argument constructor that dynamically synthesizes new classes.',
        vi: '`type(name, bases, dict)` là constructor 3 tham số để sinh ra một class mới trong runtime.'
      }
    },
    {
      id: 'py_28_q6',
      type: 'single_choice',
      topicId: 'python_metaprogramming',
      difficulty: 'easy',
      question: {
        en: 'What is the default metaclass for all standard Python 3 classes?',
        vi: 'Metaclass mặc định cho tất cả các class trong Python 3 là gì?'
      },
      options: [
        { en: '`object`', vi: '`object`' },
        { en: '`type`', vi: '`type`' },
        { en: '`class`', vi: '`class`' },
        { en: '`Meta`', vi: '`Meta`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`type` is the metaclass responsible for creating class objects in Python.',
        vi: '`type` là metaclass chịu trách nhiệm khởi tạo các đối tượng class trong Python.'
      }
    },
    {
      id: 'py_28_q7',
      type: 'single_choice',
      topicId: 'python_metaprogramming',
      difficulty: 'medium',
      question: {
        en: 'When does a metaclass\'s `__new__` method execute?',
        vi: 'Phương thức `__new__` của một metaclass được thực thi khi nào?'
      },
      options: [
        { en: 'When an instance of the regular class is created', vi: 'Khi một instance của class thông thường được tạo' },
        { en: 'When the class definition itself is parsed and evaluated by the Python interpreter', vi: 'Khi định nghĩa của class được trình thông dịch Python đọc và biên dịch' },
        { en: 'Only when the program shuts down', vi: 'Chỉ khi chương trình tắt' },
        { en: 'Inside a thread worker', vi: 'Bên trong luồng worker' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Metaclasses construct classes at class definition time, before any class instances exist.',
        vi: 'Metaclass tạo dựng class tại thời điểm định nghĩa class, trước khi bất kỳ instance nào của class tồn tại.'
      }
    },
    {
      id: 'py_28_q8',
      type: 'single_choice',
      topicId: 'python_metaprogramming',
      difficulty: 'medium',
      question: {
        en: 'Why must descriptor attributes avoid storing instance-specific data in `self`?',
        vi: 'Tại sao thuộc tính descriptor phải tránh lưu dữ liệu riêng của instance vào biến `self`?'
      },
      options: [
        { en: 'Because descriptors are class attributes shared across all instances of the class', vi: 'Vì descriptor là thuộc tính mức class và được chia sẻ chung giữa mọi instance của class đó' },
        { en: 'Because `self` is read-only in Python', vi: 'Vì `self` là thuộc tính chỉ đọc trong Python' },
        { en: 'Because Python deletes `self` after each method call', vi: 'Vì Python xóa `self` sau mỗi lệnh gọi hàm' },
        { en: 'Descriptors cannot have methods', vi: 'Descriptor không thể có phương thức' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'A descriptor instance lives on the class; storing instance state on `self` overwrites data across all instances.',
        vi: 'Instance descriptor nằm trên class; lưu trạng thái instance trên `self` sẽ làm ghi đè dữ liệu của mọi đối tượng.'
      }
    },
    {
      id: 'py_28_q9',
      type: 'single_choice',
      topicId: 'python_metaprogramming',
      difficulty: 'easy',
      question: {
        en: 'How does Python\'s built-in `@property` decorator work under the hood?',
        vi: 'Decorator `@property` tích hợp sẵn của Python hoạt động bên dưới như thế nào?'
      },
      options: [
        { en: 'Through a C preprocessor macro', vi: 'Thông qua macro tiền xử lý C' },
        { en: 'As a built-in Data Descriptor class implementing `__get__`, `__set__`, and `__delete__`', vi: 'Như một Data Descriptor class tích hợp sẵn có cài đặt `__get__`, `__set__`, và `__delete__`' },
        { en: 'Using background threads', vi: 'Sử dụng các luồng chạy ngầm' },
        { en: 'By modifying the global dictionary', vi: 'Bằng cách sửa đổi dictionary toàn cục' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`property` is a native implementation of the descriptor protocol.',
        vi: '`property` là một cài đặt nguyên bản của giao thức descriptor protocol.'
      }
    },
    {
      id: 'py_28_q10',
      type: 'single_choice',
      topicId: 'python_metaprogramming',
      difficulty: 'medium',
      question: {
        en: 'What is the primary architectural justification for choosing `__init_subclass__` over a full custom Metaclass?',
        vi: 'Lý do kiến trúc chính để chọn `__init_subclass__` thay vì tạo một Metaclass tùy biến hoàn chỉnh là gì?'
      },
      options: [
        { en: 'It avoids metaclass conflict errors during multiple inheritance and provides cleaner, more readable syntax', vi: 'Nó tránh lỗi xung đột metaclass (metaclass conflicts) khi đa kế thừa và mang lại cú pháp rõ ràng, dễ đọc hơn nhiều' },
        { en: '`__init_subclass__` is 100x faster than metaclasses', vi: '`__init_subclass__` chạy nhanh hơn metaclass 100 lần' },
        { en: 'Metaclasses are deprecated in Python 3', vi: 'Metaclass đã bị loại bỏ trong Python 3' },
        { en: '`__init_subclass__` works without classes', vi: '`__init_subclass__` chạy được mà không cần class' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`__init_subclass__` eliminates boilerplate and avoids metaclass composition conflicts.',
        vi: '`__init_subclass__` loại bỏ code rườm rà và tránh được xung đột kết hợp metaclass trong đa kế thừa.'
      }
    }
  ]
};
