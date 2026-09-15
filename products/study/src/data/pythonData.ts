import { Course, Module, Level, Lesson } from '../types';
import { pythonLessonMetadataList } from './python/pythonLessonMetadata';

// Helper to filter lessons by module ID from metadata list
const getLessonsForModule = (modId: string): Lesson[] =>
  pythonLessonMetadataList.filter(l => l.moduleId === modId);

// ----------------------------------------------------
// Basic Level Modules (13 Lessons across 5 Domain Modules)
// ----------------------------------------------------
const basicModules: Module[] = [
  {
    id: 'py_mod_1',
    levelId: 'basic',
    courseId: 'python',
    order: 1,
    title: { en: 'Module 1: Python Fundamentals & Primitive Types', vi: 'Chương 1: Nền Tảng Python & Kiểu Dữ Liệu Cơ Bản' },
    description: { en: 'Execution model, interpreter vs bytecode, dynamic typing, numeric operations, and modern f-strings.', vi: 'Mô hình thực thi, trình thông dịch, định kiểu động, phép toán số học và định dạng chuỗi f-strings.' },
    lessons: getLessonsForModule('py_mod_1')
  },
  {
    id: 'py_mod_2',
    levelId: 'basic',
    courseId: 'python',
    order: 2,
    title: { en: 'Module 2: Logic & Control Flow', vi: 'Chương 2: Logic & Cấu Trúc Điều Kiện' },
    description: { en: 'Boolean algebra, comparison operators, truthiness, if/elif/else branching, and match-case pattern matching.', vi: 'Toán tử logic, so sánh, giá trị truthy, rẽ nhánh if/elif/else và so khớp mẫu match-case.' },
    lessons: getLessonsForModule('py_mod_2')
  },
  {
    id: 'py_mod_3',
    levelId: 'basic',
    courseId: 'python',
    order: 3,
    title: { en: 'Module 3: Loops & Sequence Traversal', vi: 'Chương 3: Vòng Lặp & Duyệt Dãy Tuần Tự' },
    description: { en: 'For loops, range(), sequence iteration, while loops, and loop control (break, continue, else).', vi: 'Vòng lặp for, hàm range(), duyệt chuỗi, vòng lặp while và điều khiển luồng lặp (break, continue, else).' },
    lessons: getLessonsForModule('py_mod_3')
  },
  {
    id: 'py_mod_4',
    levelId: 'basic',
    courseId: 'python',
    order: 4,
    title: { en: 'Module 4: Functions & Variable Scope', vi: 'Chương 4: Hàm & Phạm Vi Biến' },
    description: { en: 'Function definitions, parameters, return values, docstrings, LEGB scope, and *args/**kwargs.', vi: 'Định nghĩa hàm, tham số, giá trị trả về, docstrings, phạm vi biến LEGB và *args/**kwargs.' },
    lessons: getLessonsForModule('py_mod_4')
  },
  {
    id: 'py_mod_5',
    levelId: 'basic',
    courseId: 'python',
    order: 5,
    title: { en: 'Module 5: Data Structures & Collections', vi: 'Chương 5: Cấu Trúc Dữ Liệu & Bộ Sưu Tập' },
    description: { en: 'Lists, tuples, dictionaries, unique sets, and standard collections (Counter, defaultdict, deque, namedtuple).', vi: 'Danh sách list, tuple, từ điển dict, tập hợp set và module collections chuẩn.' },
    lessons: getLessonsForModule('py_mod_5')
  }
];

// ----------------------------------------------------
// Intermediate Level Modules (12 Lessons across 5 Domain Modules)
// ----------------------------------------------------
const intermediateModules: Module[] = [
  {
    id: 'py_mod_6',
    levelId: 'intermediate',
    courseId: 'python',
    order: 1,
    title: { en: 'Module 6: Data Transformations & Time', vi: 'Chương 6: Chuyển Đổi Dữ Liệu & Xử Lý Thời Gian' },
    description: { en: 'Comprehensions for list/dict/set, nested transformations, datetime, and timezone-aware zoneinfo.', vi: 'Comprehension cho list/dict/set, lặp lồng, datetime và xử lý múi giờ zoneinfo.' },
    lessons: getLessonsForModule('py_mod_6')
  },
  {
    id: 'py_mod_7',
    levelId: 'intermediate',
    courseId: 'python',
    order: 2,
    title: { en: 'Module 7: File Systems & Structured Data', vi: 'Chương 7: Hệ Thống Tệp & Dữ Liệu Có Cấu Trúc' },
    description: { en: 'Modern file system manipulation with pathlib, CSV processing, and JSON serialization.', vi: 'Thao tác hệ thống tệp với pathlib, phân tích dữ liệu JSON và xử lý CSV.' },
    lessons: getLessonsForModule('py_mod_7')
  },
  {
    id: 'py_mod_8',
    levelId: 'intermediate',
    courseId: 'python',
    order: 3,
    title: { en: 'Module 8: Error Handling & Regular Expressions', vi: 'Chương 8: Xử Lý Lỗi & Biểu Thức Chính Quy' },
    description: { en: 'Try-except-else-finally hierarchies, custom exceptions, and pattern matching with re.', vi: 'Cấu trúc try-except-else-finally, ngoại lệ tùy biến và so khớp mẫu với re.' },
    lessons: getLessonsForModule('py_mod_8')
  },
  {
    id: 'py_mod_9',
    levelId: 'intermediate',
    courseId: 'python',
    order: 4,
    title: { en: 'Module 9: Object-Oriented Programming & Data Modeling', vi: 'Chương 9: Lập Trình Hướng Đối Tượng & Mô Hình Hóa Dữ Liệu' },
    description: { en: 'Classes, instances, inheritance, super(), dunder protocols, dataclasses, and static type annotations.', vi: 'Lớp, đối tượng, phân cấp kế thừa, dunder methods, dataclass và type hints tĩnh.' },
    lessons: getLessonsForModule('py_mod_9')
  },
  {
    id: 'py_mod_10',
    levelId: 'intermediate',
    courseId: 'python',
    order: 5,
    title: { en: 'Module 10: Packaging & Automated Testing', vi: 'Chương 10: Đóng Gói Module & Kiểm Thử Tự Động' },
    description: { en: 'Virtual environments (venv), pip, pyproject.toml package distribution, and testing with pytest.', vi: 'Môi trường ảo venv, pip, đóng gói pyproject.toml và kiểm thử tự động với pytest.' },
    lessons: getLessonsForModule('py_mod_10')
  }
];

// ----------------------------------------------------
// Advanced Level Modules (11 Lessons across 5 Domain Modules)
// ----------------------------------------------------
const advancedModules: Module[] = [
  {
    id: 'py_mod_11',
    levelId: 'advanced',
    courseId: 'python',
    order: 1,
    title: { en: 'Module 11: Functional Programming, Iterators & Generators', vi: 'Chương 11: Lập Trình Hàm, Iterators & Generators' },
    description: { en: 'First-class functions, closures, lambdas, functools, iterator protocols, generator pipelines, and itertools.', vi: 'Hàm bậc nhất, closures, lambda, functools, giao thức lặp, generator pipelines và itertools.' },
    lessons: getLessonsForModule('py_mod_11')
  },
  {
    id: 'py_mod_12',
    levelId: 'advanced',
    courseId: 'python',
    order: 2,
    title: { en: 'Module 12: Advanced Language Features & Metaprogramming', vi: 'Chương 12: Tính Năng Ngôn Ngữ Nâng Cao & Siêu Lập Trình' },
    description: { en: 'Parametric & class decorators, context managers (with & contextlib), metaclasses, and descriptor protocols.', vi: 'Decorators tham số, context managers (with & contextlib), metaclass và giao thức descriptor.' },
    lessons: getLessonsForModule('py_mod_12')
  },
  {
    id: 'py_mod_13',
    levelId: 'advanced',
    courseId: 'python',
    order: 3,
    title: { en: 'Module 13: Asynchronous Programming with asyncio', vi: 'Chương 13: Lập Trình Bất Đồng Bộ Với asyncio' },
    description: { en: 'Event loop, coroutines, async/await, asyncio.gather, task cancellation, timeouts, and async queues.', vi: 'Vòng lặp sự kiện, async/await, coroutine, asyncio.gather, hủy task và hàng đợi async.' },
    lessons: getLessonsForModule('py_mod_13')
  },
  {
    id: 'py_mod_14',
    levelId: 'advanced',
    courseId: 'python',
    order: 4,
    title: { en: 'Module 14: Concurrency Architecture & Performance Optimization', vi: 'Chương 14: Kiến Trúc Đa Nhiệm & Tối Ưu Hóa Hiệu Năng' },
    description: { en: 'GIL architecture, threading vs multiprocessing, memory engineering with __slots__, and profiling with cProfile.', vi: 'Bản chất khóa GIL, threading, multiprocessing, tiết kiệm RAM với __slots__ và đo đạc cProfile.' },
    lessons: getLessonsForModule('py_mod_14')
  },
  {
    id: 'py_mod_15',
    levelId: 'advanced',
    courseId: 'python',
    order: 5,
    title: { en: 'Module 15: Enterprise Capstone Application', vi: 'Chương 15: Dự Án Doanh Nghiệp Hoàn Chỉnh' },
    description: { en: 'End-to-end enterprise streaming ETL and analytics application integrating all 36 core Python competencies.', vi: 'Đường ống xử lý dữ liệu và phân tích luồng lớn chuẩn doanh nghiệp tổng hợp 36 năng lực cốt lõi.' },
    lessons: getLessonsForModule('py_mod_15')
  }
];

export const pythonCourse: Course = {
  id: 'python',
  title: { en: 'Python Programming', vi: 'Lập Trình Python' },
  tagline: { en: 'From zero to building automated algorithms and data systems', vi: 'Từ số 0 đến tự động hóa và hệ thống dữ liệu doanh nghiệp' },
  description: {
    en: 'Master Python through practical coding across 36 canonical lessons structured into 15 cohesive domain modules. Learn syntax, data structures, loops, OOP, metaprogramming, and high-performance asynchronous systems.',
    vi: 'Làm chủ Python qua thực hành viết mã thực tế với 36 bài học chuẩn hóa thuộc 15 chương chuyên sâu. Nắm vững cú pháp, cấu trúc dữ liệu, vòng lặp, OOP, metaprogramming và lập trình bất đồng bộ hiệu suất cao.'
  },
  iconName: 'Code2',
  color: 'from-amber-500 to-yellow-600',
  accentBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  levels: {
    basic: {
      id: 'basic',
      courseId: 'python',
      title: { en: 'Python Basic', vi: 'Python Cơ Bản' },
      description: { en: 'Core syntax, variables, conditionals, data structures, loops, and functions (13 lessons across 5 modules).', vi: 'Cú pháp cốt lõi, biến, điều kiện, cấu trúc dữ liệu, vòng lặp và hàm (13 bài học trong 5 chương).' },
      order: 1,
      modules: basicModules
    },
    intermediate: {
      id: 'intermediate',
      courseId: 'python',
      title: { en: 'Python Intermediate', vi: 'Python Trung Cấp' },
      description: { en: 'Comprehensions, file I/O, regex, OOP, dataclasses, packaging, and testing (12 lessons across 5 modules).', vi: 'Comprehensions, đọc ghi tệp, regex, OOP, dataclass, đóng gói package và kiểm thử pytest (12 bài học trong 5 chương).' },
      order: 2,
      modules: intermediateModules
    },
    advanced: {
      id: 'advanced',
      courseId: 'python',
      title: { en: 'Python Advanced', vi: 'Python Nâng Cao' },
      description: { en: 'Functional programming, generators, decorators, context managers, metaprogramming, asyncio, and concurrency (11 lessons across 5 modules).', vi: 'Lập trình hàm, generators, decorators, context managers, metaprogramming, asyncio và đa nhiệm (11 bài học trong 5 chương).' },
      order: 3,
      modules: advancedModules
    }
  }
};
