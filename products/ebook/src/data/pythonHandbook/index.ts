import { Book } from '../../types';
import { PART_1_CHAPTERS } from './part1';
import { PART_2_CHAPTERS } from './part2';
import { PART_3_CHAPTERS } from './part3';
import { PART_4_CHAPTERS } from './part4';
import { PART_5_CHAPTERS } from './part5';
import {
  PYTHON_HANDBOOK_GLOSSARY,
  PYTHON_HANDBOOK_REFERENCES,
  PYTHON_HANDBOOK_FURTHER_READING,
} from './backmatter';

export const PYTHON_HANDBOOK_CHAPTERS = [
  ...PART_1_CHAPTERS,
  ...PART_2_CHAPTERS,
  ...PART_3_CHAPTERS,
  ...PART_4_CHAPTERS,
  ...PART_5_CHAPTERS,
];

export const PYTHON_HANDBOOK: Book = {
  id: 'python-handbook',
  slug: 'python-handbook',
  title: 'Python Handbook',
  subtitle: {
    en: 'Language Mechanics, Data Models, VM Architecture & Modern Engineering',
    vi: 'Cơ Chế Ngôn Ngữ, Data Models, Kiến Trúc Máy Ảo & Kỹ Thuật Python Hiện Đại',
  },
  bookType: 'Handbook',
  categoryId: 'python',
  subjectId: 'programming',
  domainId: 'backend-systems',
  topicId: 'python-core',
  author: '4TM Technical Board',
  role: 'Language & Runtime Engineering Committee',
  level: 'Comprehensive',
  estimatedReadTime: '5.5 hours',
  chaptersCount: PYTHON_HANDBOOK_CHAPTERS.length,
  publishedDate: '2025-02-15',
  publishedYear: 2025,
  edition: '2nd Revised Editorial Edition',
  isbn: '978-0-4TM-PY2025-1',
  accentColor: 'from-blue-600 to-indigo-800',
  tags: [
    'Python 3.12+',
    'CPython VM',
    'Data Model',
    'Bytecode',
    'Decorators',
    'Asyncio',
    'Typing Protocols',
  ],
  description: {
    en: 'The definitive technical publication on Python internals, memory representations, object model dunders, scoping rules, and high-performance concurrent architectures.',
    vi: 'Ấn phẩm kỹ thuật chuẩn mực và chuyên sâu về bản chất CPython, cơ chế bộ nhớ, mô hình đối tượng data model, quy tắc phạm vi biến và kiến trúc lập trình đồng thời hiệu năng cao.',
  },
  prerequisites: {
    en: [
      'Basic programming familiarity in Python or another high-level language',
      'Fundamental understanding of data structures (arrays, hash maps)',
    ],
    vi: [
      'Kiến thức lập trình cơ bản với Python hoặc một ngôn ngữ bậc cao khác',
      'Hiểu biết cơ bản về cấu trúc dữ liệu (mảng, bảng băm)',
    ],
  },
  outcomes: {
    en: [
      'Understand the 4-stage CPython compilation and stack execution pipeline',
      'Master the Python reference model, mutability nuances, and copy depths',
      'Design robust APIs using LEGB scoping, keyword-only parameters, and closures',
      'Harness advanced dunders, descriptors, and slots for memory optimization',
      'Architect concurrent applications choosing between threads, multiprocessing, and asyncio',
      'Write enterprise-grade typed codebases using structural subtyping and protocols',
    ],
    vi: [
      'Hiểu sâu quy trình 4 giai đoạn biên dịch và thực thi trên stack của máy ảo CPython',
      'Làm chủ mô hình tham chiếu bộ nhớ, tính khả biến và các cấp độ sao chép',
      'Thiết kế API chuẩn mực với quy tắc LEGB, tham số keyword-only và closure',
      'Tận dụng dunder methods, descriptors và __slots__ để tối ưu hóa bộ nhớ RAM',
      'Xây dựng ứng dụng đồng thời với lựa chọn chính xác giữa threading, multiprocessing và asyncio',
      'Viết mã nguồn chuẩn doanh nghiệp với gợi ý kiểu hiện đại và duck typing cấu trúc',
    ],
  },
  parts: [
    {
      partNumber: 1,
      title: {
        en: 'Python Execution & Object Model',
        vi: 'Mô Hình Thực Thi & Đối Tượng Python',
      },
      description: {
        en: 'CPython parser, bytecode compilation, execution stack frames, and the names-as-labels reference model.',
        vi: 'Parser CPython, biên dịch bytecode, ngăn xếp frame thực thi và mô hình biến là nhãn tham chiếu.',
      },
      chapters: [PART_1_CHAPTERS[0], PART_1_CHAPTERS[1], PART_1_CHAPTERS[2]],
    },
    {
      partNumber: 2,
      title: {
        en: 'Core Data Structures & Iteration',
        vi: 'Cấu Trúc Dữ Liệu Cốt Lõi & Lặp Dữ Liệu',
      },
      description: {
        en: 'Dynamic arrays, compact hash tables, IEEE floats, Unicode boundaries, and lazy generators.',
        vi: 'Mảng động, bảng băm compact, số thực IEEE, ranh giới Unicode và generator đánh giá lười.',
      },
      chapters: [
        PART_2_CHAPTERS[0],
        PART_2_CHAPTERS[1],
        PART_2_CHAPTERS[2],
        PART_2_CHAPTERS[3],
      ],
    },
    {
      partNumber: 3,
      title: {
        en: 'Functions, Scopes & Functional Core',
        vi: 'Hàm, Phạm Vi Biến & Lõi Hàm Học',
      },
      description: {
        en: 'LEGB lookup rules, closures, decorators, the iteration protocol, and deterministic context managers.',
        vi: 'Quy tắc LEGB, closure, decorator, giao thức lặp và context manager quản lý tài nguyên tất định.',
      },
      chapters: [
        PART_3_CHAPTERS[0],
        PART_3_CHAPTERS[1],
        PART_3_CHAPTERS[2],
        PART_3_CHAPTERS[3],
      ],
    },
    {
      partNumber: 4,
      title: {
        en: 'Object-Oriented Architecture & Metaprogramming',
        vi: 'Kiến Trúc Hướng Đối Tượng & Lập Trình Siêu Cấp',
      },
      description: {
        en: 'Two-phase instantiation, C3 linearization MRO, data model dunders, descriptors, and slots.',
        vi: 'Khởi tạo 2 giai đoạn, thuật toán MRO C3, dunder methods, descriptor và tối ưu __slots__.',
      },
      chapters: [
        PART_4_CHAPTERS[0],
        PART_4_CHAPTERS[1],
        PART_4_CHAPTERS[2],
        PART_4_CHAPTERS[3],
      ],
    },
    {
      partNumber: 5,
      title: {
        en: 'Concurrency, Memory & Modern Python',
        vi: 'Đồng Thời, Bộ Nhớ & Python Hiện Đại',
      },
      description: {
        en: 'The Global Interpreter Lock (GIL), multiprocessing, asyncio structured concurrency, and typing protocols.',
        vi: 'Khóa toàn cục GIL, multiprocessing, structured concurrency trong asyncio và protocol kiểm tra kiểu.',
      },
      chapters: [PART_5_CHAPTERS[0], PART_5_CHAPTERS[1]],
    },
  ],
  chapters: PYTHON_HANDBOOK_CHAPTERS,
  glossary: PYTHON_HANDBOOK_GLOSSARY,
  references: PYTHON_HANDBOOK_REFERENCES,
  furtherReading: PYTHON_HANDBOOK_FURTHER_READING,
};
