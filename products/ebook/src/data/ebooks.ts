import { EbookField, EbookDomain, EbookTopic, Category, Subject, Book } from '../types';
import { PYTHON_EBOOKS } from './pythonEbooks';
import { SQL_EBOOKS } from './sqlEbooks';
import { HTML_EBOOKS } from './htmlEbooks';
import { CSS_EBOOKS } from './cssEbooks';
import { JAVASCRIPT_EBOOKS } from './javascriptEbooks';
import { EXCEL_EBOOKS } from './excelEbooks';
import { POWERBI_EBOOKS } from './powerbiEbooks';
import { AI_EBOOKS } from './aiEbooks';

export const EBOOK_FIELD: EbookField = {
  id: 'computer-science',
  name: {
    en: 'Computer Science',
    vi: 'Khoa Học Máy Tính',
  },
  description: {
    en: 'Fundamental software engineering, architectural paradigms, systems & artificial intelligence.',
    vi: 'Kỹ thuật phần mềm nền tảng, kiến trúc hệ thống, tiêu chuẩn web và trí tuệ nhân tạo.',
  },
  domains: ['programming', 'web', 'data-analytics', 'ai'],
};

export const DOMAINS: EbookDomain[] = [
  {
    id: 'programming',
    fieldId: 'computer-science',
    name: {
      en: 'Programming',
      vi: 'Lập Trình',
    },
    description: {
      en: 'Core runtimes, dynamic typing, syntax idioms & backend architecture.',
      vi: 'Runtime cốt lõi, định kiểu động, cú pháp tối ưu & kiến trúc backend.',
    },
    topics: ['python', 'javascript'],
    icon: 'Code',
  },
  {
    id: 'web',
    fieldId: 'computer-science',
    name: {
      en: 'Web Development',
      vi: 'Phát Triển Web',
    },
    description: {
      en: 'Semantic markup, cascade styling, browser runtimes & responsive layouts.',
      vi: 'Thẻ ngữ nghĩa, định kiểu cascade, runtime trình duyệt & bố cục đáp ứng.',
    },
    topics: ['html', 'css', 'javascript'],
    icon: 'Layout',
  },
  {
    id: 'data-analytics',
    fieldId: 'computer-science',
    name: {
      en: 'Data & Analytics',
      vi: 'Dữ Liệu & Phân Tích',
    },
    description: {
      en: 'Relational storage, modeling, analytical formulas & business dashboards.',
      vi: 'Lưu trữ quan hệ, mô hình hóa, công thức phân tích & dashboard báo cáo.',
    },
    topics: ['sql', 'excel', 'powerbi'],
    icon: 'Database',
  },
  {
    id: 'ai',
    fieldId: 'computer-science',
    name: {
      en: 'Artificial Intelligence',
      vi: 'Trí Tuệ Nhân Tạo',
    },
    description: {
      en: 'LLM architectures, Prompt Engineering, RAG, Embeddings & Autonomous Agents.',
      vi: 'Kiến trúc LLM, Prompt Engineering, RAG, Vector Embeddings & Agent tự hành.',
    },
    topics: ['ai'],
    icon: 'Sparkles',
  },
];

export const TOPICS: EbookTopic[] = [
  {
    id: 'python',
    domainIds: ['programming'],
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
    id: 'javascript',
    domainIds: ['programming', 'web'],
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
    id: 'html',
    domainIds: ['web'],
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
    domainIds: ['web'],
    name: {
      en: 'CSS',
      vi: 'CSS',
    },
    description: {
      en: 'CSS Cascade rules, Flexbox, CSS Grid & responsive layout systems.',
      vi: 'Quy tắc Cascade, Flexbox, CSS Grid & bố cục đáp ứng.',
    },
    icon: 'Palette',
  },
  {
    id: 'sql',
    domainIds: ['data-analytics'],
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
    id: 'excel',
    domainIds: ['data-analytics'],
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
    domainIds: ['data-analytics'],
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
    domainIds: ['ai'],
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

// Preserved category array pointing to TOPICS
export const CATEGORIES: Category[] = TOPICS;

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

const RAW_EBOOKS: Book[] = [
  ...PYTHON_EBOOKS,
  ...SQL_EBOOKS,
  ...HTML_EBOOKS,
  ...CSS_EBOOKS,
  ...JAVASCRIPT_EBOOKS,
  ...EXCEL_EBOOKS,
  ...POWERBI_EBOOKS,
  ...AI_EBOOKS,
];

export const EBOOKS: Book[] = RAW_EBOOKS.map((b) => {
  const domainIds =
    b.categoryId === 'javascript'
      ? ['programming', 'web']
      : b.categoryId === 'python'
      ? ['programming']
      : b.categoryId === 'html' || b.categoryId === 'css'
      ? ['web']
      : b.categoryId === 'sql' || b.categoryId === 'excel' || b.categoryId === 'powerbi'
      ? ['data-analytics']
      : ['ai'];

  return {
    ...b,
    fieldId: 'computer-science',
    domainIds,
    topicId: b.categoryId,
  };
});
