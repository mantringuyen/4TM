import { Category, Subject, Book } from '../types';
import { PYTHON_EBOOKS } from './pythonEbooks';
import { SQL_EBOOKS } from './sqlEbooks';
import { HTML_EBOOKS } from './htmlEbooks';
import { CSS_EBOOKS } from './cssEbooks';
import { JAVASCRIPT_EBOOKS } from './javascriptEbooks';
import { EXCEL_EBOOKS } from './excelEbooks';
import { POWERBI_EBOOKS } from './powerbiEbooks';
import { AI_EBOOKS } from './aiEbooks';

export const CATEGORIES: Category[] = [
  {
    id: 'python',
    name: {
      en: 'Python',
      vi: 'Python',
    },
    description: {
      en: 'Core runtime, dynamic typing, syntax idioms & backend architecture.',
      vi: 'Runtime cốt lõi, định kiểu động, cú pháp tối ưu & kiến trúc backend.',
    },
    icon: 'Code',
  },
  {
    id: 'sql',
    name: {
      en: 'SQL',
      vi: 'SQL',
    },
    description: {
      en: 'Relational data modeling, indexing, joins & query optimization.',
      vi: 'Mô hình dữ liệu quan hệ, đánh chỉ mục, phép join & tối ưu truy vấn.',
    },
    icon: 'Database',
  },
  {
    id: 'html',
    name: {
      en: 'HTML',
      vi: 'HTML',
    },
    description: {
      en: 'Semantic web markup, accessibility (A11y), DOM structure & SEO.',
      vi: 'Thẻ web ngữ nghĩa, khả năng truy cập (A11y), cấu trúc DOM & SEO.',
    },
    icon: 'Layout',
  },
  {
    id: 'css',
    name: {
      en: 'CSS',
      vi: 'CSS',
    },
    description: {
      en: 'Cascade algorithms, Flexbox, CSS Grid & responsive layout systems.',
      vi: 'Thuật toán Cascade, Flexbox, CSS Grid & bố cục đáp ứng.',
    },
    icon: 'Palette',
  },
  {
    id: 'javascript',
    name: {
      en: 'JavaScript',
      vi: 'JavaScript',
    },
    description: {
      en: 'V8 engine internals, Event Loop, closures, ES6+ & async workflows.',
      vi: 'Kiến trúc V8, Event Loop, closure, ES6+ & lập trình bất đồng bộ.',
    },
    icon: 'FileCode',
  },
  {
    id: 'excel',
    name: {
      en: 'Excel',
      vi: 'Excel',
    },
    description: {
      en: 'Spreadsheet formulas, dynamic arrays, Pivot Tables & Power Query.',
      vi: 'Công thức bảng tính, mảng động, Pivot Table & Power Query.',
    },
    icon: 'Table',
  },
  {
    id: 'powerbi',
    name: {
      en: 'Power BI',
      vi: 'Power BI',
    },
    description: {
      en: 'Business intelligence, DAX analytics, VertiPaq & Star Schemas.',
      vi: 'Báo cáo thông minh, phân tích DAX, VertiPaq & Star Schema.',
    },
    icon: 'BarChart',
  },
  {
    id: 'ai',
    name: {
      en: 'AI',
      vi: 'AI',
    },
    description: {
      en: 'LLM architectures, Prompt Engineering, RAG, Embeddings & Agents.',
      vi: 'Kiến trúc LLM, Prompt Engineering, RAG, Vector Embeddings & Agent tự hành.',
    },
    icon: 'Sparkles',
  },
];

export const SUBJECTS: Subject[] = [
  {
    id: 'programming',
    categoryId: 'python',
    name: {
      en: 'Software Engineering',
      vi: 'Kỹ Thuật Lập Trình',
    },
    description: {
      en: 'Programming languages, runtime execution models & syntax mechanics.',
      vi: 'Ngôn ngữ lập trình, mô hình thực thi runtime & cơ chế cú pháp.',
    },
  },
  {
    id: 'storage',
    categoryId: 'sql',
    name: {
      en: 'Data Persistence',
      vi: 'Lưu Trữ Dữ Liệu',
    },
    description: {
      en: 'Relational databases, indexing, query planners & transactions.',
      vi: 'Cơ sở dữ liệu quan hệ, chỉ mục, bộ tối ưu truy vấn & giao dịch.',
    },
  },
  {
    id: 'web',
    categoryId: 'html',
    name: {
      en: 'Web Standards',
      vi: 'Tiêu Chuẩn Web',
    },
    description: {
      en: 'HTML5 markup, CSS layout systems, browser rendering & accessibility.',
      vi: 'Thẻ HTML5, hệ bố cục CSS, rendering trình duyệt & accessibility.',
    },
  },
  {
    id: 'analytics',
    categoryId: 'excel',
    name: {
      en: 'Data Analytics & BI',
      vi: 'Phân Tích Dữ Liệu & BI',
    },
    description: {
      en: 'Spreadsheets, DAX measures, data modeling & business dashboards.',
      vi: 'Bảng tính, chỉ số DAX, mô hình hóa dữ liệu & dashboard báo cáo.',
    },
  },
  {
    id: 'ai',
    categoryId: 'ai',
    name: {
      en: 'Artificial Intelligence',
      vi: 'Trí Tuệ Nhân Tạo',
    },
    description: {
      en: 'Machine learning, large language models, vector search & agent orchestration.',
      vi: 'Học máy, mô hình ngôn ngữ lớn, tìm kiếm vector & điều phối agent.',
    },
  },
];

export const EBOOKS: Book[] = [
  ...PYTHON_EBOOKS,
  ...SQL_EBOOKS,
  ...HTML_EBOOKS,
  ...CSS_EBOOKS,
  ...JAVASCRIPT_EBOOKS,
  ...EXCEL_EBOOKS,
  ...POWERBI_EBOOKS,
  ...AI_EBOOKS,
];
