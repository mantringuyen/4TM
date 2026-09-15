import fs from 'fs';
import path from 'path';
import { Lesson, QuizQuestion, ExerciseItem } from '../src/types';

import { basicLessons } from '../src/data/python/basicLessons';
import { pythonIntermediateLessonsPart1 } from '../src/data/python/intermediateLessonsPart1';
import { pythonIntermediateLessonsPart2 } from '../src/data/python/intermediateLessonsPart2';
import { pythonAdvancedLessonsPart1 } from '../src/data/python/advancedLessonsPart1';
import { pythonAdvancedLessonsPart2 } from '../src/data/python/advancedLessonsPart2';
import { pythonAdvancedLessonsPart3 } from '../src/data/python/advancedLessonsPart3';

// 56 Topic mapping
const topicMeta: Record<number, { topicId: string; titleEn: string; titleVi: string; concept: string }> = {
  1: { topicId: 'python_foundations', titleEn: 'Python Foundations & Execution Model', titleVi: 'Nền Tảng Python & Mô Hình Thực Thi', concept: 'Bytecode, PVM, REPL, print, comments, Zen of Python' },
  2: { topicId: 'python_variables_types', titleEn: 'Variables, Dynamic Typing & References', titleVi: 'Biến Số, Định Kiểu Động & Tham Chiếu', concept: 'Variable assignment, dynamic typing, id(), type(), garbage collection' },
  3: { topicId: 'python_numbers_math', titleEn: 'Numeric Types, Arithmetic & Math Module', titleVi: 'Kiểu Số, Số Học & Thư Viện Math', concept: 'int, float, //, %, **, operator precedence, math module' },
  4: { topicId: 'python_io_print', titleEn: 'Standard I/O, Print Formatting & Input', titleVi: 'Xuất Nhập Chuẩn, Định Dạng Print & Input', concept: 'print sep/end parameters, input(), type conversion' },
  5: { topicId: 'python_type_casting', titleEn: 'Type Casting & Explicit Conversion', titleVi: 'Ép Kiểu & Chuyển Đổi Dữ Liệu Tường Minh', concept: 'int(), float(), str(), bool(), ValueError in conversion' },
  6: { topicId: 'python_booleans_truthiness', titleEn: 'Booleans, Comparison & Truthiness', titleVi: 'Kiểu Boolean, Phép So Sánh & Truthiness', concept: 'bool, ==, !=, is, truthy/falsy values, None' },
  7: { topicId: 'python_logical_operators', titleEn: 'Logical Operators & Short-Circuit Evaluation', titleVi: 'Toán Tử Logic & Đánh Giá Ngắn Mạch', concept: 'and, or, not, short-circuit evaluation, precedence' },
  8: { topicId: 'python_if_elif_else', titleEn: 'Conditional Branching & Ternary Operators', titleVi: 'Rẽ Nhánh Điều Kiện & Toán Tử 3 Ngôi', concept: 'if, elif, else, nested conditionals, ternary expressions' },
  9: { topicId: 'python_string_basics', titleEn: 'String Indexing, Slicing & Immutability', titleVi: 'Chỉ Mục Chuỗi, Cắt Lát & Tính Bất Biến', concept: '0-based indexing, negative indices, [start:stop:step], immutability' },
  10: { topicId: 'python_string_methods', titleEn: 'Essential String Methods & Sanitization', titleVi: 'Phương Thức Chuỗi Cốt Lõi & Làm Sạch Dữ Liệu', concept: 'upper, lower, strip, split, join, replace, find, count' },
  11: { topicId: 'python_string_formatting', titleEn: 'String Interpolation, F-Strings & Specifiers', titleVi: 'Nội Suy Chuỗi, F-String & Định Dạng Số', concept: 'f-strings, format specifiers, :.2f, :>10, expressions in f-strings' },
  12: { topicId: 'python_lists_basics', titleEn: 'Lists: Creation, Slicing & Mutability', titleVi: 'Danh Sách List: Khởi Tạo, Cắt Lát & Khả Biến', concept: 'List indexing, mutability, append, extend, insert, pop, remove' },
  13: { topicId: 'python_list_methods', titleEn: 'List Operations, Sorting & Searching', titleVi: 'Thao Tác List, Sắp Xếp & Tìm Kiếm', concept: 'sort() vs sorted(), reverse(), index(), count(), shallow copy' },
  14: { topicId: 'python_tuples', titleEn: 'Tuples: Immutability, Packing & Unpacking', titleVi: 'Tuple: Tính Bất Biến, Đóng Gói & Mở Gói', concept: 'Tuple immutability, (x,), tuple packing, unpacking, tuple as dict key' },
  15: { topicId: 'python_sets', titleEn: 'Sets: Uniqueness & Mathematical Set Operations', titleVi: 'Tập Hợp Set: Tính Duy Nhất & Phép Toán Tập Hợp', concept: 'Set uniqueness, union |, intersection &, difference -, symmetric diff ^' },
  16: { topicId: 'python_dictionaries', titleEn: 'Dictionaries: Key-Value Hash Maps & Lookup', titleVi: 'Từ Điển Dictionary: Bảng Băm Key-Value & Tra Cứu', concept: 'Dict literal, key lookup, get() with default, hashable keys requirement' },
  17: { topicId: 'python_dict_operations', titleEn: 'Dictionary Methods, Mutation & Iteration', titleVi: 'Phương Thức Dictionary, Cập Nhật & Duyệt Khóa', concept: 'keys(), values(), items(), update(), pop(), popitem(), dict unpacking **' },
  18: { topicId: 'python_for_loops', titleEn: 'For Loops & Sequence Iteration', titleVi: 'Vòng Lặp For & Duyệt Tuần Tự', concept: 'for-in loop, iterating sequences, unpacking in loops, enumerate()' },
  19: { topicId: 'python_range_function', titleEn: 'Range Generator, Steps & Memory Efficiency', titleVi: 'Hàm Sinh Range, Bước Nhảy & Bộ Nhớ', concept: 'range(stop), range(start, stop, step), negative step, lazy evaluation' },
  20: { topicId: 'python_while_loops', titleEn: 'While Loops, State Conditions & Loop-Else', titleVi: 'Vòng Lặp While, Điều Kiện Trạng Thái & While-Else', concept: 'while loops, infinite loop prevention, while-else execution logic' },
  21: { topicId: 'python_loop_control', titleEn: 'Loop Control: Break, Continue & Pass', titleVi: 'Điều Khiển Vòng Lặp: Break, Continue & Pass', concept: 'break, continue, pass placeholder, loop else behavior when broken' },
  22: { topicId: 'python_functions_basic', titleEn: 'Functions: Definition, Return Values & Scope', titleVi: 'Hàm: Định Nghĩa, Giá Trị Trả Về & Phạm Vi', concept: 'def, parameters, return statement, default None return, docstrings' },
  23: { topicId: 'python_func_params', titleEn: 'Function Parameters, Defaults & Keyword Args', titleVi: 'Tham Số Hàm, Giá Trị Mặc Định & Keyword Args', concept: 'positional args, keyword args, default parameters, mutable default pitfall' },
  24: { topicId: 'python_lambdas', titleEn: 'Lambda Functions & Anonymous Callables', titleVi: 'Hàm Ẩn Danh Lambda & Xử Lý Gọi Hàm', concept: 'lambda arguments: expression, key function in sorted(), limitation to single expression' },
  25: { topicId: 'python_lists_mutability', titleEn: 'List Mutability, In-Place Ops & Shallow Copy', titleVi: 'Khả Biến Của List, Thao Tác Tại Chỗ & Sao Chép Nông', concept: 'Reference assignment vs copy(), shallow copy vs deepcopy(), in-place modification' },
  26: { topicId: 'python_dict_advanced', titleEn: 'Advanced Dictionaries: defaultdict, Counter & Merge', titleVi: 'Dictionary Nâng Cao: defaultdict, Counter & Gộp Dict', concept: 'collections.defaultdict, Counter, dict union operator |, setdefault()' },
  27: { topicId: 'python_args_kwargs', titleEn: 'Variable Arguments: *args and **kwargs Unpacking', titleVi: 'Tham Số Biến Thiên: Mở Gói *args và **kwargs', concept: '*args tuple, **kwargs dict, unpacking arguments, parameter order' },
  28: { topicId: 'python_scopes_legb', titleEn: 'LEGB Scope Resolution, Global & Nonlocal', titleVi: 'Quy Tắc Phạm Vi LEGB, Từ Khóa Global & Nonlocal', concept: 'Local, Enclosing, Global, Built-in, global keyword, nonlocal keyword' },
  29: { topicId: 'python_list_comprehensions', titleEn: 'List Comprehensions & Conditional Filtering', titleVi: 'List Comprehension & Lọc Điều Kiện', concept: '[expr for x in seq if cond], nested comprehensions, matrix flattening' },
  30: { topicId: 'python_dict_set_comprehensions', titleEn: 'Dictionary & Set Comprehensions', titleVi: 'Dict & Set Comprehension', concept: '{k: v for ...}, {x for ...}, swapping dict keys and values' },
  31: { topicId: 'python_functional_tools', titleEn: 'Functional Tools: map, filter, zip & reduce', titleVi: 'Lập Trình Hàm: map, filter, zip & reduce', concept: 'map(), filter(), zip(), functools.reduce(), lazy iterators' },
  32: { topicId: 'python_file_io', titleEn: 'File I/O, Modes & Context Managers (with)', titleVi: 'Đọc Ghi File, Chế Độ Mở & Quản Lý Ngữ Cảnh with', concept: 'open(), modes r/w/a/x/b, with statement, read(), readlines(), write()' },
  33: { topicId: 'python_csv_json', titleEn: 'Data Serialization: CSV DictReader & JSON Parsing', titleVi: 'Tuần Tự Hóa Dữ Liệu: CSV DictReader & Phân Tích JSON', concept: 'csv.reader, csv.DictReader, json.loads, json.dumps, json.load, json.dump' },
  34: { topicId: 'python_pathlib', titleEn: 'Modern Filesystem Navigation with pathlib.Path', titleVi: 'Thao Tác Tệp Tin Hiện Đại Với pathlib.Path', concept: 'pathlib.Path, / operator, exists(), is_file(), glob(), read_text()' },
  35: { topicId: 'python_exceptions_basic', titleEn: 'Exception Handling: try, except & Built-in Errors', titleVi: 'Xử Lý Lỗi: try, except & Lỗi Tích Hợp Sẵn', concept: 'try, except, ValueError, KeyError, IndexError, TypeError, Exception hierarchy' },
  36: { topicId: 'python_exceptions_advanced', titleEn: 'Advanced Error Flow: else, finally & raise', titleVi: 'Luồng Xử Lý Lỗi Nâng Cao: else, finally & raise', concept: 'try-except-else-finally execution order, else only on success, finally always, raise' },
  37: { topicId: 'python_custom_exceptions', titleEn: 'Custom Exception Classes & Domain Error Hierarchy', titleVi: 'Tự Tạo Lớp Ngoại Lệ & Cấu Trúc Lỗi Nghiệp Vụ', concept: 'class MyError(Exception), super().__init__(), custom attributes, raise MyError' },
  38: { topicId: 'python_oop_classes', titleEn: 'OOP Classes, Instances, __init__ & self', titleVi: 'Lập Trình Hướng Đối Tượng: Class, Instance, __init__ & self', concept: 'class definition, __init__ constructor, self reference, instance vs class attributes' },
  39: { topicId: 'python_oop_encapsulation', titleEn: 'Encapsulation, Name Mangling & @property', titleVi: 'Đóng Gói Dữ Liệu, Name Mangling & @property', concept: 'public, _protected, __private name mangling, @property, @setter' },
  40: { topicId: 'python_oop_inheritance', titleEn: 'Class Inheritance, Method Overriding & super()', titleVi: 'Kế Thừa Class, Ghi Đè Phương Thức & super()', concept: 'Single inheritance, method overriding, super().__init__(), isinstance(), issubclass()' },
  41: { topicId: 'python_oop_polymorphism', titleEn: 'Polymorphism, Duck Typing & Protocols', titleVi: 'Tính Đa Hình, Duck Typing & Giao Thức Protocol', concept: 'Duck typing ("if it walks like a duck"), method polymorphism, common interface' },
  42: { topicId: 'python_modules_packages', titleEn: 'Modules, Packages & Entry Points (__name__)', titleVi: 'Mô-đun, Package & Điểm Khởi Chạy (__name__)', concept: 'import, from ... import, __name__ == "__main__", __init__.py, sys.path' },
  43: { topicId: 'python_iterators', titleEn: 'Iterator Protocol, __iter__, __next__ & StopIteration', titleVi: 'Giao Thức Iterator, __iter__, __next__ & StopIteration', concept: 'Iterable vs Iterator, __iter__(), __next__(), StopIteration exception, iter(), next()' },
  44: { topicId: 'python_generators', titleEn: 'Generators, yield Keyword & Lazy Streams', titleVi: 'Generator, Từ Khóa yield & Luồng Dữ Liệu Lười', concept: 'yield keyword, generator functions, generator objects, lazy evaluation, memory efficiency' },
  45: { topicId: 'python_generator_advanced', titleEn: 'Advanced Generators: send(), throw(), close() & yield from', titleVi: 'Generator Nâng Cao: send(), throw(), close() & yield from', concept: 'generator.send(), yield from subgenerator delegation, coroutine pipelines' },
  46: { topicId: 'python_itertools', titleEn: 'itertools: count, cycle, chain, groupby & islice', titleVi: 'Thư Viện itertools: count, cycle, chain, groupby & islice', concept: 'itertools.count, cycle, repeat, chain, groupby, islice, infinite iterators' },
  47: { topicId: 'python_closures', titleEn: 'Function Closures & Enclosing Scope Cells', titleVi: 'Function Closure & Vùng Nhớ Enclosing Scope', concept: 'Nested functions, closures, enclosing state retention, __closure__ cell objects' },
  48: { topicId: 'python_decorators_basic', titleEn: 'Function Decorators & functools.wraps', titleVi: 'Function Decorator & functools.wraps', concept: '@decorator syntax, wrapping callables, functools.wraps preserving function metadata' },
  49: { topicId: 'python_decorators_advanced', titleEn: 'Parametric Decorators & Class-Based Decorators', titleVi: 'Decorator Có Tham Số & Class-Based Decorator', concept: 'Decorator factories with arguments, stacked decorators execution order, class decorators (__call__)' },
  50: { topicId: 'python_context_managers', titleEn: 'Context Managers: __enter__, __exit__ & contextlib', titleVi: 'Context Manager: __enter__, __exit__ & contextlib', concept: '__enter__() and __exit__(), exception handling in __exit__, @contextmanager decorator' },
  51: { topicId: 'python_dunder_methods', titleEn: 'Magic Dunder Methods: __repr__, __len__, __getitem__', titleVi: 'Phương Thức Dunder Kỳ Diệu: __repr__, __len__, __getitem__', concept: '__str__, __repr__, __len__, __getitem__, __setitem__, __eq__, __add__, __call__' },
  52: { topicId: 'python_abstract_classes', titleEn: 'Abstract Base Classes (abc.ABC) & Interface Contracts', titleVi: 'Lớp Trừu Tượng (abc.ABC) & Ràng Buộc Interface', concept: 'abc.ABC, @abstractmethod, enforcing interface implementations, preventing direct instantiation' },
  53: { topicId: 'python_asyncio_basics', titleEn: 'Asynchronous I/O, Event Loop, async & await', titleVi: 'Bất Đồng Bộ I/O, Event Loop, async & await', concept: 'async def coroutine, await keyword, asyncio.run(), event loop concurrency model' },
  54: { topicId: 'python_asyncio_concurrency', titleEn: 'Async Concurrency: asyncio.gather, Tasks & Timeouts', titleVi: 'Xử Lý Đồng Thời Async: asyncio.gather, Task & Timeout', concept: 'asyncio.gather(), asyncio.create_task(), concurrent execution, asyncio.wait_for()' },
  55: { topicId: 'python_performance_memory', titleEn: 'Performance Engineering, __slots__ & sys.getsizeof', titleVi: 'Tối Ưu Hiệu Năng, __slots__ & Đo Bộ Nhớ sys.getsizeof', concept: '__slots__ attribute optimization, sys.getsizeof(), timeit benchmarking, list vs deque vs set lookup' },
  56: { topicId: 'python_capstone_pipeline', titleEn: 'High-Performance Asynchronous Data ETL Capstone', titleVi: 'Dự Án Tốt Nghiệp: Đường Ống ETL Xử Lý Dữ Liệu Bất Đồng Bộ', concept: 'End-to-end streaming data pipeline combining async, generators, type annotations, OOP & error handling' },
};

console.log("Ready to build master question & exercise pools.");
