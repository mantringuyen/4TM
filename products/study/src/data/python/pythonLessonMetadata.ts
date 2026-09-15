import { Lesson } from "../../types";

// Lightweight lesson headers for fast course indexing without heavy content
export const pythonLessonMetadataList: Lesson[] = [
  // =========================================================================
  // BASIC LEVEL (13 canonical lessons, Module 1 - 6)
  // =========================================================================
  {
    id: "py_lesson_1",
    moduleId: "py_mod_1",
    levelId: "basic",
    courseId: "python",
    order: 1,
    topicId: "python_foundations",
    title: {
      en: "Python: What It Is & How It Works",
      vi: "Python Là Gì & Nguyên Lý Hoạt Động"
    },
    summary: {
      en: "Understand Python origins, execution model, interpreter vs bytecode, REPL, and your first end-to-end script.",
      vi: "Hiểu về nguồn gốc Python, mô hình thông dịch bytecode, REPL và luồng thực thi chương trình hoàn chỉnh."
    },
    estimatedMinutes: 10,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_2",
    moduleId: "py_mod_1",
    levelId: "basic",
    courseId: "python",
    order: 2,
    topicId: "python_variables",
    title: {
      en: "Variables & Dynamic Typing",
      vi: "Biến & Cơ Chế Định Kiểu Động"
    },
    summary: {
      en: "Master variable assignment, naming rules, memory reference model, and dynamic re-binding.",
      vi: "Làm chủ phép gán biến, quy tắc đặt tên, mô hình tham chiếu bộ nhớ và gán lại kiểu động."
    },
    estimatedMinutes: 10,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_3",
    moduleId: "py_mod_1",
    levelId: "basic",
    courseId: "python",
    order: 3,
    topicId: "python_numeric_types",
    title: {
      en: "Numeric Data Types & Arithmetic Operations",
      vi: "Các Kiểu Dữ Liệu Số & Phép Toán Số Học"
    },
    summary: {
      en: "Master int, float, complex, arithmetic operators, floor division, modulus, power, math module, and precision.",
      vi: "Làm chủ kiểu int, float, complex, toán tử số học, chia lấy nguyên, chia lấy dư, lũy thừa, module math và độ chính xác."
    },
    estimatedMinutes: 12,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_4",
    moduleId: "py_mod_1",
    levelId: "basic",
    courseId: "python",
    order: 4,
    topicId: "python_string_basics",
    title: {
      en: "Strings & Modern Formatting (f-strings)",
      vi: "Chuỗi Ký Tự & Định Dạng Hiện Đại (f-strings)"
    },
    summary: {
      en: "Master single/double/triple quotes, indexing, slicing, escape characters, immutability, and f-strings.",
      vi: "Làm chủ dấu nháy đơn/kép/ba, chỉ số, cắt lát chuỗi, ký tự thoát escape, tính bất biến và định dạng f-string."
    },
    estimatedMinutes: 12,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_5",
    moduleId: "py_mod_2",
    levelId: "basic",
    courseId: "python",
    order: 5,
    topicId: "python_booleans",
    title: {
      en: "Boolean Logic & Comparison Operators",
      vi: "Logic Boolean & Toán Tử So Sánh"
    },
    summary: {
      en: "Master True/False, comparison operators, logical and/or/not, short-circuit evaluation, and truthy/falsy values.",
      vi: "Làm chủ giá trị True/False, toán tử so sánh, logic and/or/not, đánh giá ngắt mạch và giá trị truthy/falsy."
    },
    estimatedMinutes: 10,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_6",
    moduleId: "py_mod_2",
    levelId: "basic",
    courseId: "python",
    order: 6,
    topicId: "python_conditionals",
    title: {
      en: "Conditionals: if, elif, else & match-case",
      vi: "Cấu Trúc Điều Kiện: if, elif, else & match-case"
    },
    summary: {
      en: "Master branching with if/elif/else, nested conditions, ternary operators, and modern Python 3.10+ match-case syntax.",
      vi: "Làm chủ rẽ nhánh if/elif/else, điều kiện lồng nhau, toán tử 3 ngôi và cú pháp so khớp mẫu match-case trong Python 3.10+."
    },
    estimatedMinutes: 12,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_7",
    moduleId: "py_mod_3",
    levelId: "basic",
    courseId: "python",
    order: 7,
    topicId: "python_for_loops",
    title: {
      en: "For Loops, range() & Sequence Traversal",
      vi: "Vòng Lặp For, range() & Duyệt Dãy Tuần Tự"
    },
    summary: {
      en: "Master iterating through sequences with for loops, range() generation, enumerate(), and zip().",
      vi: "Làm chủ lặp qua chuỗi dữ liệu với for loop, sinh khoảng với range(), hàm enumerate() và hàm zip()."
    },
    estimatedMinutes: 12,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_8",
    moduleId: "py_mod_3",
    levelId: "basic",
    courseId: "python",
    order: 8,
    topicId: "python_while_loops",
    title: {
      en: "While Loops & Loop Control (break, continue, else)",
      vi: "Vòng Lặp While & Điều Khiển Luồng (break, continue, else)"
    },
    summary: {
      en: "Master condition-driven while loops, avoiding infinite loops, loop interruption with break, continue, and the unique while-else clause.",
      vi: "Làm chủ vòng lặp theo điều kiện while, phòng tránh lặp vô hạn, ngắt bước lặp với break, continue và khối while-else độc đáo."
    },
    estimatedMinutes: 12,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_9",
    moduleId: "py_mod_4",
    levelId: "basic",
    courseId: "python",
    order: 9,
    topicId: "python_functions",
    title: {
      en: "Functions: def, Parameters & Return Values",
      vi: "Hàm: def, Tham Số & Giá Trị Trả Về"
    },
    summary: {
      en: "Master function definitions with def, positional and keyword arguments, default parameters, docstrings, and multiple return values.",
      vi: "Làm chủ định nghĩa hàm bằng def, tham số vị trí và đặt tên, giá trị mặc định, tài liệu docstring và trả về nhiều giá trị."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_10",
    moduleId: "py_mod_4",
    levelId: "basic",
    courseId: "python",
    order: 10,
    topicId: "python_scope_advanced_args",
    title: {
      en: "Variable Scope (LEGB) & Advanced Arguments (*args, **kwargs, /, *)",
      vi: "Phạm Vi Biến (LEGB) & Tham Số Nâng Cao (*args, **kwargs, /, *)"
    },
    summary: {
      en: "Master Local/Enclosing/Global/Built-in scopes, global/nonlocal keywords, variable-length *args/**kwargs, positional-only (/) and keyword-only (*) parameters.",
      vi: "Làm chủ quy tắc phạm vi biến LEGB, từ khóa global/nonlocal, tham số biến đổi *args/**kwargs, tham số thuần vị trí (/) và thuần tên (*)."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_11",
    moduleId: "py_mod_5",
    levelId: "basic",
    courseId: "python",
    order: 11,
    topicId: "python_lists_tuples",
    title: {
      en: "Lists & Tuples: Sequential Collections",
      vi: "Lists & Tuples: Bộ Sưu Tập Tuần Tự"
    },
    summary: {
      en: "Master mutable lists, immutable tuples, indexing, slicing, list methods (.append, .extend, .pop, .sort), tuple unpacking, and memory differences.",
      vi: "Làm chủ list khả biến, tuple bất biến, chỉ số, cắt lát, các phương thức list, giải nén tuple và sự khác biệt về bộ nhớ."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_12",
    moduleId: "py_mod_5",
    levelId: "basic",
    courseId: "python",
    order: 12,
    topicId: "python_dictionaries_sets",
    title: {
      en: "Dictionaries & Sets: Hash Maps & Unique Sets",
      vi: "Từ Điển & Tập Hợp: Hash Map & Tập Hợp Không Trùng"
    },
    summary: {
      en: "Master hash map key-value pairs in dict, methods (.get, .items, .keys, .values), unique sets, and set theory mathematical operations (&, |, -, ^).",
      vi: "Làm chủ cặp key-value trong dict, các phương thức tra cứu an toàn, tập hợp set duy nhất và các phép toán tập hợp toán học (&, |, -, ^)."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_13",
    moduleId: "py_mod_5",
    levelId: "basic",
    courseId: "python",
    order: 13,
    topicId: "python_advanced_collections",
    title: {
      en: "Advanced Collections: Counter, defaultdict, deque & namedtuple",
      vi: "Bộ Sưu Tập Nâng Cao: Counter, defaultdict, deque & namedtuple"
    },
    summary: {
      en: "Master Python's standard collections module: frequency counting with Counter, missing key handlers with defaultdict, double-ended queues with deque, and lightweight records with namedtuple.",
      vi: "Làm chủ module collections chuẩn: đếm tần suất với Counter, xử lý khóa thiếu với defaultdict, hàng đợi 2 đầu deque và bản ghi nhẹ namedtuple."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },

  // =========================================================================
  // INTERMEDIATE LEVEL (12 canonical lessons, Module 7 - 12)
  // =========================================================================
  {
    id: "py_lesson_14",
    moduleId: "py_mod_6",
    levelId: "intermediate",
    courseId: "python",
    order: 14,
    topicId: "python_comprehensions_collections",
    title: {
      en: "Comprehensions: List, Dict, Set & Nested Patterns",
      vi: "Comprehensions: List, Dict, Set & Cấu Trúc Lồng Nhau"
    },
    summary: {
      en: "Master expressive, high-performance comprehension constructs in Python: list comprehensions, dictionary comprehensions, set comprehensions, multi-clause nested iterations, and conditional transformations.",
      vi: "Làm chủ cú pháp comprehension ngắn gọn và hiệu năng cao trong Python: list comprehension, dict comprehension, set comprehension, lặp lồng đa tầng và biến đổi điều kiện."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_15",
    moduleId: "py_mod_6",
    levelId: "intermediate",
    courseId: "python",
    order: 15,
    topicId: "python_datetime_zoneinfo",
    title: {
      en: "Date & Time Handling: datetime, timedelta, timezone & zoneinfo",
      vi: "Xử Lý Ngày & Giờ: datetime, timedelta, múi giờ & zoneinfo"
    },
    summary: {
      en: "Master date, time, datetime objects, strftime/strptime parsing, timezone-aware scheduling with IANA zoneinfo, and timedelta arithmetic.",
      vi: "Làm chủ các đối tượng date, time, datetime, định dạng strftime/strptime, xử lý múi giờ IANA chuẩn với zoneinfo và phép tính khoảng thời gian timedelta."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_16",
    moduleId: "py_mod_7",
    levelId: "intermediate",
    courseId: "python",
    order: 16,
    topicId: "python_file_io_pathlib",
    title: {
      en: "File I/O & Modern Path Manipulation with pathlib",
      vi: "Đọc Ghi File & Thao Tác Đường Dẫn Hiện Đại Với pathlib"
    },
    summary: {
      en: "Master modern filesystem operations with pathlib.Path: reading/writing text & binary streams, context managers, directory globbing, and cross-platform paths.",
      vi: "Làm chủ thao tác hệ thống tệp hiện đại với pathlib.Path: đọc/ghi file văn bản và nhị phân, quản lý ngữ cảnh with, quét thư mục bằng glob và xử lý đường dẫn đa nền tảng."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_17",
    moduleId: "py_mod_7",
    levelId: "intermediate",
    courseId: "python",
    order: 17,
    topicId: "python_csv_json_processing",
    title: {
      en: "Structured Data: CSV & JSON Processing with Built-in Modules",
      vi: "Dữ Liệu Có Cấu Trúc: Xử Lý CSV & JSON Với Module Có Sẵn"
    },
    summary: {
      en: "Master standard library modules: json (loads, dumps, load, dump, indent, ensure_ascii) and csv (reader, writer, DictReader, DictWriter).",
      vi: "Làm chủ các module thư viện chuẩn: json (loads, dumps, load, dump, indent, ensure_ascii) và csv (reader, writer, DictReader, DictWriter)."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_18",
    moduleId: "py_mod_8",
    levelId: "intermediate",
    courseId: "python",
    order: 18,
    topicId: "python_exception_handling",
    title: {
      en: "Exception Handling: try, except, else & finally",
      vi: "Xử Lý Ngoại Lệ: try, except, else & finally"
    },
    summary: {
      en: "Master robust fault-tolerant programming with multi-except clauses, exception aliasing (as err), else blocks for clean paths, and finally blocks for guaranteed resource cleanup.",
      vi: "Làm chủ lập trình chịu lỗi với nhiều mệnh đề except, gán nhãn ngoại lệ (as err), khối else cho luồng xử lý thành công và finally để đảm bảo dọn dẹp tài nguyên."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_19",
    moduleId: "py_mod_8",
    levelId: "intermediate",
    courseId: "python",
    order: 19,
    topicId: "python_regular_expressions_re",
    title: {
      en: "Regular Expressions: Text Pattern Matching, Extraction & Validation with re",
      vi: "Biểu Thức Chính Quy (Regex): Khớp Mẫu, Trích Xuất & Kiểm Tra Dữ Liệu Với re"
    },
    summary: {
      en: "Master Python's re module: re.search, re.findall, re.sub, named capture groups, compiled regex objects, raw string literals, and regex flags.",
      vi: "Làm chủ module re trong Python: re.search, re.findall, re.sub, nhóm trích xuất có tên, biên dịch re.compile, chuỗi thô r'' và các cờ regex."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_20",
    moduleId: "py_mod_9",
    levelId: "intermediate",
    courseId: "python",
    order: 20,
    topicId: "python_classes_instances",
    title: {
      en: "OOP: Classes, Instances, Attributes & Methods",
      vi: "OOP: Lớp (Class), Đối Tượng (Instance), Thuộc Tính & Phương Thức"
    },
    summary: {
      en: "Master object-oriented programming foundations: class definition, the __init__ constructor, instance attributes (self.attr), class attributes, and instance methods.",
      vi: "Làm chủ nền tảng lập trình hướng đối tượng (OOP): định nghĩa lớp, hàm khởi tạo __init__, thuộc tính đối tượng (self.attr), thuộc tính lớp (class attribute) và phương thức đối tượng."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_21",
    moduleId: "py_mod_9",
    levelId: "intermediate",
    courseId: "python",
    order: 21,
    topicId: "python_inheritance_super",
    title: {
      en: "OOP: Inheritance & Method Overriding (super())",
      vi: "OOP: Tính Kế Thừa & Ghi Đè Phương Thức (super())"
    },
    summary: {
      en: "Master class hierarchies: single inheritance (class Sub(Base)), calling parent constructors with super().__init__(), method overriding, and isinstance() / issubclass() type inspection.",
      vi: "Làm chủ phân cấp lớp: đơn kế thừa (class Sub(Base)), gọi hàm khởi tạo lớp cha với super().__init__(), ghi đè phương thức và kiểm tra kiểu với isinstance() / issubclass()."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_22",
    moduleId: "py_mod_9",
    levelId: "intermediate",
    courseId: "python",
    order: 22,
    topicId: "python_dunder_methods",
    title: {
      en: "OOP: Special Dunder Magic Methods (__str__, __repr__, __len__, __getitem__, __eq__)",
      vi: "OOP: Các Phương Thức Kỳ Diệu Dunder (__str__, __repr__, __len__, __getitem__, __eq__)"
    },
    summary: {
      en: "Master Python's data model protocols by implementing dunder methods: string representations (__str__, __repr__), container protocols (__len__, __getitem__, __contains__), and operator overloading (__eq__, __add__).",
      vi: "Làm chủ giao thức mô hình dữ liệu của Python bằng cách cài đặt các phương thức dunder: biểu diễn chuỗi (__str__, __repr__), giao thức container (__len__, __getitem__, __contains__) và nạp chồng toán tử (__eq__, __add__)."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_23",
    moduleId: "py_mod_9",
    levelId: "intermediate",
    courseId: "python",
    order: 23,
    topicId: "python_dataclass_type_annotations",
    title: {
      en: "Modern Data Modeling: dataclass & Comprehensive Type Annotations",
      vi: "Mô Hình Hóa Dữ Liệu Hiện Đại: dataclass & Type Hinting Toàn Diện"
    },
    summary: {
      en: "Master modern declarative data classes (@dataclass, field, frozen, kw_only) and Python's typing system (Optional, Union, Literal, Protocol, TypeVar).",
      vi: "Làm chủ cấu trúc dữ liệu hiện đại (@dataclass, field, frozen, kw_only) và hệ thống kiểu dữ liệu tĩnh trong Python (Optional, Union, Literal, Protocol, TypeVar)."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_24",
    moduleId: "py_mod_10",
    levelId: "intermediate",
    courseId: "python",
    order: 24,
    topicId: "python_packaging_virtualenvs_pyproject",
    title: {
      en: "Modules, Packages, Virtual Environments (venv), pip & pyproject.toml",
      vi: "Module, Gói Package, Môi Trường Ảo (venv), pip & Chuẩn pyproject.toml"
    },
    summary: {
      en: "Master Python packaging architecture: module imports, package layout with __init__.py, isolated virtual environments (venv), dependency management with pip, and modern packaging with pyproject.toml.",
      vi: "Làm chủ kiến trúc đóng gói package trong Python: cơ chế import module, cấu trúc gói với __init__.py, cô lập môi trường ảo venv, quản lý thư viện với pip và chuẩn đóng gói hiện đại pyproject.toml."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_25",
    moduleId: "py_mod_10",
    levelId: "intermediate",
    courseId: "python",
    order: 25,
    topicId: "python_testing_pytest_fundamentals",
    title: {
      en: "Automated Testing Fundamentals: Assertions, Test Functions & pytest",
      vi: "Nền Tảng Kiểm Thử Tự Động: Assertion, Hàm Test & Thư Viện pytest"
    },
    summary: {
      en: "Master professional automated testing in Python: writing test functions, pytest discovery, assertions, pytest.raises for exception verification, fixtures, and parametrized testing.",
      vi: "Làm chủ kỹ thuật kiểm thử tự động chuyên nghiệp trong Python: viết hàm test, cơ chế tự động tìm test của pytest, kiểm tra ngoại lệ với pytest.raises, fixture và tham số hóa kiểm thử."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },

  // =========================================================================
  // ADVANCED LEVEL (11 canonical lessons, Module 13 - 18)
  // =========================================================================
  {
    id: "py_lesson_26",
    moduleId: "py_mod_11",
    levelId: "advanced",
    courseId: "python",
    order: 26,
    topicId: "python_functional_programming_lambdas_closures",
    title: {
      en: "Functional Programming: First-Class Functions, Lambdas, Closures & functools",
      vi: "Lập Trình Hàm (Functional): First-Class Functions, Lambdas, Closures & functools"
    },
    summary: {
      en: "Master functional programming paradigms in Python: first-class citizen functions, closures, lambda expressions, map/filter/reduce, and high-performance utilities in functools (partial, lru_cache).",
      vi: "Làm chủ mô hình lập trình hàm trong Python: hàm là đối tượng bậc nhất (first-class), closure lưu trạng thái, biểu thức lambda, map/filter/reduce và các công cụ hiệu năng cao trong functools (partial, lru_cache)."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_27",
    moduleId: "py_mod_11",
    levelId: "advanced",
    courseId: "python",
    order: 27,
    topicId: "python_iterator_protocol",
    title: {
      en: "Iterators, Iterable Protocol & Custom Iterators (__iter__, __next__)",
      vi: "Iterators, Giao Thức Lặp Iterable & Custom Iterators (__iter__, __next__)"
    },
    summary: {
      en: "Master Python's iteration mechanics: difference between Iterables and Iterators, manual iteration using iter() and next(), StopIteration exception lifecycle, and building stateful custom iterator classes.",
      vi: "Làm chủ cơ chế lặp trong Python: phân biệt Iterable và Iterator, lặp thủ công bằng iter() và next(), vòng đời ngoại lệ StopIteration và xây dựng lớp iterator tùy chỉnh có trạng thái."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_28",
    moduleId: "py_mod_11",
    levelId: "advanced",
    courseId: "python",
    order: 28,
    topicId: "python_generators_iterators_itertools",
    title: {
      en: "Generators, Custom Iterators & itertools",
      vi: "Bộ Sinh (Generators), Iterator Tùy Chỉnh & Thư Viện itertools"
    },
    summary: {
      en: "Master memory-efficient lazy data streaming in Python: generator functions with yield, generator expressions, custom iterable classes, coroutine communication, and itertools.",
      vi: "Làm chủ xử lý luồng dữ liệu lười tối ưu bộ nhớ trong Python: hàm generator với yield, generator expressions, lớp iterator tùy biến, giao tiếp coroutine và thư viện itertools."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_29",
    moduleId: "py_mod_12",
    levelId: "advanced",
    courseId: "python",
    order: 29,
    topicId: "python_parametric_class_decorators",
    title: {
      en: "Advanced Decorators: Function & Class Decorators with Arguments",
      vi: "Decorators Nâng Cao: Function & Class Decorator Có Tham Số"
    },
    summary: {
      en: "Master advanced metaprogramming decorators: triple-nested decorator factories accepting arbitrary arguments, class-based callable decorators using __call__, and decorating entire classes.",
      vi: "Làm chủ kỹ thuật decorator nâng cao: decorator factory lồng 3 cấp nhận tham số tùy ý, class decorator sử dụng phương thức __call__ và áp dụng decorator trực tiếp lên class."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_30",
    moduleId: "py_mod_12",
    levelId: "advanced",
    courseId: "python",
    order: 30,
    topicId: "python_context_managers_contextlib",
    title: {
      en: "Context Managers: The with Statement & contextlib Utilities",
      vi: "Context Managers: Câu Lệnh with & Module contextlib"
    },
    summary: {
      en: "Master resource management and RAII patterns in Python: implementing the __enter__ and __exit__ protocol, suppressing errors cleanly, and writing generator-based context managers with @contextlib.contextmanager.",
      vi: "Làm chủ quản lý tài nguyên an toàn trong Python: cài đặt giao thức __enter__ và __exit__, triệt tiêu ngoại lệ an toàn và tạo context manager bằng hàm generator với @contextlib.contextmanager."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_31",
    moduleId: "py_mod_12",
    levelId: "advanced",
    courseId: "python",
    order: 31,
    topicId: "python_metaprogramming_descriptors",
    title: {
      en: "Metaprogramming & Descriptors: __new__, __init_subclass__, Metaclasses & Descriptor Protocol",
      vi: "Siêu Lập Trình (Metaprogramming) & Giao Thức Descriptor Trong Python"
    },
    summary: {
      en: "Master deep Python internals and metaprogramming architecture: instance creation hooks with __new__, lightweight class customization via __init_subclass__, dynamic class synthesis with type(), custom metaclasses, and the full Descriptor Protocol.",
      vi: "Làm chủ cơ chế hoạt động sâu bên trong của Python và kiến trúc siêu lập trình: can thiệp khởi tạo đối tượng với __new__, tùy biến lớp con bằng __init_subclass__, tạo class động với type(), metaclass tùy biến và toàn bộ giao thức Descriptor Protocol."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_32",
    moduleId: "py_mod_13",
    levelId: "advanced",
    courseId: "python",
    order: 32,
    topicId: "python_asyncio_fundamentals",
    title: {
      en: "Asynchronous Programming & asyncio Core Foundations",
      vi: "Lập Trình Bất Đồng Bộ & Nền Tảng Cốt Lõi asyncio"
    },
    summary: {
      en: "Master cooperative multitasking and non-blocking I/O in Python: event loop mechanics, defining and calling coroutines with async def and await, wrapping futures into Tasks, and bridging synchronous-asynchronous boundaries.",
      vi: "Làm chủ đa nhiệm hợp tác và I/O không khóa trong Python: cơ chế vòng lặp sự kiện (event loop), định nghĩa và gọi coroutine với async def và await, đóng gói task và cầu nối giữa mã đồng bộ và bất đồng bộ."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_33",
    moduleId: "py_mod_13",
    levelId: "advanced",
    courseId: "python",
    order: 33,
    topicId: "python_asyncio_gather_queues_tasks",
    title: {
      en: "Concurrent Programming: asyncio.gather, Task Cancellation, Timeouts & Queues",
      vi: "Lập Trình Đồng Thời: asyncio.gather, Hủy Tác Vụ, Timeouts & Hàng Đợi Async"
    },
    summary: {
      en: "Master multi-task asynchronous concurrency: parallel batch execution with asyncio.gather, setting hard SLAs with asyncio.wait_for timeouts, task cancellation mechanics, and producer-consumer architectures with asyncio.Queue.",
      vi: "Làm chủ xử lý đồng thời đa tác vụ: thực thi song song theo lô với asyncio.gather, thiết lập SLA với timeout asyncio.wait_for, cơ chế hủy tác vụ Task.cancel() và kiến trúc Producer-Consumer với asyncio.Queue."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_34",
    moduleId: "py_mod_14",
    levelId: "advanced",
    courseId: "python",
    order: 34,
    topicId: "python_concurrency_gil_threading_multiprocessing_asyncio",
    title: {
      en: "Modern Concurrency: GIL Architecture, Threading, Multiprocessing & AsyncIO",
      vi: "Kiến Trúc Đa Nhiệm Hiện Đại: Khóa GIL, Threading, Multiprocessing & AsyncIO"
    },
    summary: {
      en: "Master high-concurrency systems design in Python: understand CPython's Global Interpreter Lock (GIL), choose correctly between Threading, Multiprocessing, and AsyncIO.",
      vi: "Làm chủ thiết kế hệ thống đa nhiệm hiệu năng cao trong Python: hiểu sâu về khóa GIL của CPython, lựa chọn chính xác giữa Threading, Multiprocessing và AsyncIO."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_35",
    moduleId: "py_mod_14",
    levelId: "advanced",
    courseId: "python",
    order: 35,
    topicId: "python_performance_optimization_slots_cprofile",
    title: {
      en: "Performance Optimization, Memory Engineering & Profiling (__slots__, sys.getsizeof, cProfile)",
      vi: "Tối Ưu Hiệu Năng, Kỹ Thuật Bộ Nhớ & Định Cấu Hình Đo Đạc (__slots__, sys.getsizeof, cProfile)"
    },
    summary: {
      en: "Master enterprise performance engineering in Python: drastic RAM reduction using __slots__, precise memory auditing with sys.getsizeof, microbenchmarking with timeit, and locating execution bottlenecks using cProfile and pstats.",
      vi: "Làm chủ kỹ thuật tối ưu hiệu năng doanh nghiệp trong Python: tiết kiệm RAM vượt bậc bằng __slots__, kiểm toán bộ nhớ chính xác với sys.getsizeof, đo đạc vi mô bằng timeit và định vị điểm nghẽn bằng cProfile."
    },
    estimatedMinutes: 15,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  },
  {
    id: "py_lesson_36",
    moduleId: "py_mod_15",
    levelId: "advanced",
    courseId: "python",
    order: 36,
    topicId: "python_capstone_project_async_etl",
    title: {
      en: "Capstone Project: End-to-End Enterprise Python Application",
      vi: "Dự Án Tốt Nghiệp: Xây Dựng Ứng Dụng Doanh Nghiệp Hoàn Chỉnh Bằng Python"
    },
    summary: {
      en: "Design and implement a production-grade, resilient, multi-threaded/async ETL and streaming analytics pipeline integrating OOP, decorators, robust error handling, concurrency, and performance optimization.",
      vi: "Thiết kế và xây dựng đường ống xử lý dữ liệu ETL và phân tích luồng lớn chuẩn doanh nghiệp, tích hợp OOP, decorators, xử lý lỗi toàn diện, đa nhiệm và tối ưu hóa hiệu năng."
    },
    estimatedMinutes: 20,
    learn: null,
    exercisePool: [],
    challenge: null,
    quizQuestionPool: []
  }
];
