import { Course, Module, Level, Lesson } from '../types';
import { basicLessons } from './ai/basic';
import { intermediateLessons } from './ai/intermediate';
import { advancedLessons } from './ai/advanced';

const allAiLessons: Lesson[] = [
  ...basicLessons,
  ...intermediateLessons,
  ...advancedLessons
];

const getLessonsForModule = (modId: string): Lesson[] =>
  allAiLessons.filter(l => l.moduleId === modId);

// ----------------------------------------------------
// Basic Level Modules (Level 1: AI Fundamentals)
// ----------------------------------------------------
const basicModules: Module[] = [
  {
    id: 'ai_mod_1',
    levelId: 'basic',
    courseId: 'ai',
    order: 1,
    title: { en: 'Module 1: What is AI, ML, DL, & Generative AI', vi: 'Chương 1: Tổng Quan AI, ML, Deep Learning & GenAI' },
    description: { en: 'Foundations of AI evolution, paradigm shifts, rule-based systems vs statistical discriminative vs generative models.', vi: 'Nền tảng sự phát triển AI, các bước ngoặt công nghệ và so sánh rule-based, ML truyền thống vs Generative AI.' },
    lessons: getLessonsForModule('ai_mod_1')
  },
  {
    id: 'ai_mod_2',
    levelId: 'basic',
    courseId: 'ai',
    order: 2,
    title: { en: 'Module 2: How LLMs Work Conceptually', vi: 'Chương 2: Cơ Chế Hoạt Động Cốt Lõi Của LLM' },
    description: { en: 'Tokenization, context window capacity, pre-training, RLHF alignment, inference execution, and sampling dynamics.', vi: 'Token hóa, dung lượng cửa sổ ngữ cảnh, pre-training, RLHF, suy luận và các tham số điều khiển.' },
    lessons: getLessonsForModule('ai_mod_2')
  },
  {
    id: 'ai_mod_3',
    levelId: 'basic',
    courseId: 'ai',
    order: 3,
    title: { en: 'Module 3: Model Landscape & Modalities', vi: 'Chương 3: Phân Loại Mô Hình & AI Đa Phương Thức' },
    description: { en: 'Native multimodal models (vision, speech, text), open-weight vs proprietary models, and SLMs vs LLMs.', vi: 'Mô hình đa phương thức bản địa (thị giác, âm thanh, văn bản), mô hình mở vs đóng, SLM vs LLM.' },
    lessons: getLessonsForModule('ai_mod_3')
  },
  {
    id: 'ai_mod_4',
    levelId: 'basic',
    courseId: 'ai',
    order: 4,
    title: { en: 'Module 4: Limitations, Safety & Ethics', vi: 'Chương 4: Hạn Chế, An Toàn AI & Prompt Injection' },
    description: { en: 'Hallucination mechanisms, non-determinism, bias, indirect prompt injection attacks, and defensive boundaries.', vi: 'Hiện tượng bịa đặt (hallucination), tính bất định, thiên kiến, tấn công Prompt Injection và giải pháp.' },
    lessons: getLessonsForModule('ai_mod_4')
  }
];

// ----------------------------------------------------
// Intermediate Level Modules (Level 2: Practical AI Usage)
// ----------------------------------------------------
const intermediateModules: Module[] = [
  {
    id: 'ai_mod_5',
    levelId: 'intermediate',
    courseId: 'ai',
    order: 1,
    title: { en: 'Module 5: Prompt Engineering Foundations', vi: 'Chương 5: Nền Tảng Kỹ Thuật Prompt (Prompt Engineering)' },
    description: { en: 'System prompt design, framing blueprints, zero-shot, few-shot in-context learning, and Chain-of-Thought (CoT).', vi: 'Thiết kế System prompt, khung cấu trúc prompt, Zero-shot, Few-shot và suy luận Chain-of-Thought (CoT).' },
    lessons: getLessonsForModule('ai_mod_5')
  },
  {
    id: 'ai_mod_6',
    levelId: 'intermediate',
    courseId: 'ai',
    order: 2,
    title: { en: 'Module 6: Structured Inputs & Outputs', vi: 'Chương 6: Dữ Liệu Đầu Ra Có Cấu Trúc (Structured Outputs)' },
    description: { en: 'Native JSON mode, responseSchema enforcement, parsing error-feedback retry loops, and runtime validation.', vi: 'Chế độ JSON mode bản địa, ép cấu trúc responseSchema, vòng lặp tự sửa lỗi và kiểm duyệt runtime.' },
    lessons: getLessonsForModule('ai_mod_6')
  },
  {
    id: 'ai_mod_7',
    levelId: 'intermediate',
    courseId: 'ai',
    order: 3,
    title: { en: 'Module 7: AI for Engineering & Productivity', vi: 'Chương 7: AI Cho Lập Trình & Tăng Năng Suất Kỹ Thuật' },
    description: { en: 'Code generation, stack trace debugging, unit test synthesis, legacy refactoring, and document analysis.', vi: 'Tạo code, sửa lỗi qua stack trace, sinh unit test tự động, refactor code cũ và phân tích tài liệu.' },
    lessons: getLessonsForModule('ai_mod_7')
  },
  {
    id: 'ai_mod_8',
    levelId: 'intermediate',
    courseId: 'ai',
    order: 4,
    title: { en: 'Module 8: Agentic Concepts & Workflows', vi: 'Chương 8: Khái Niệm Agentic & Quy Trình Tự Động' },
    description: { en: 'Autonomous agents, ReAct planning loop, short/long-term memory, tool invocation, and human-in-the-loop.', vi: 'Autonomous agent, vòng lặp ReAct, bộ nhớ ngắn/dài hạn, gọi công cụ và cơ chế Human-in-the-loop.' },
    lessons: getLessonsForModule('ai_mod_8')
  }
];

// ----------------------------------------------------
// Advanced Level Modules (Level 3: AI Application Development)
// ----------------------------------------------------
const advancedModules: Module[] = [
  {
    id: 'ai_mod_9',
    levelId: 'advanced',
    courseId: 'ai',
    order: 1,
    title: { en: 'Module 9: AI APIs & Integration', vi: 'Chương 9: Tích Hợp Generative AI API & SDK' },
    description: { en: 'Server SDK integration (@google/genai), rate limit handling (429), exponential backoff, and SSE token streaming.', vi: 'Tích hợp SDK phía server (@google/genai), xử lý 429 rate limit, exponential backoff và SSE streaming.' },
    lessons: getLessonsForModule('ai_mod_9')
  },
  {
    id: 'ai_mod_10',
    levelId: 'advanced',
    courseId: 'ai',
    order: 2,
    title: { en: 'Module 10: Function & Tool Calling', vi: 'Chương 10: Function Calling & Tích Hợp Hệ Thống' },
    description: { en: 'JSON schema tool declarations, model functionCall intent parsing, local tool execution, and tool response loops.', vi: 'Khai báo công cụ JSON schema, xử lý ý định functionCall từ AI, thi hành hàm và vòng lặp phản hồi.' },
    lessons: getLessonsForModule('ai_mod_10')
  },
  {
    id: 'ai_mod_11',
    levelId: 'advanced',
    courseId: 'ai',
    order: 3,
    title: { en: 'Module 11: Embeddings & Vector Search', vi: 'Chương 11: Text Embeddings & Tìm Kiếm Vector' },
    description: { en: 'Vector space mapping, text embeddings, mathematical similarity algorithms (Cosine, Dot Product, Euclidean).', vi: 'Không gian vector, tạo text embedding, các thuật toán đo độ tương đồng (Cosine, Dot Product, Euclidean).' },
    lessons: getLessonsForModule('ai_mod_11')
  },
  {
    id: 'ai_mod_12',
    levelId: 'advanced',
    courseId: 'ai',
    order: 4,
    title: { en: 'Module 12: RAG Architecture', vi: 'Chương 12: Kiến Trúc RAG (Retrieval-Augmented Generation)' },
    description: { en: 'Document parsing, chunking strategies with overlap, vector DB indexing, nearest neighbor search, and context grounding.', vi: 'Parse tài liệu, chiến lược chunking có gối đầu, đánh chỉ mục Vector DB, tìm kiếm vector và chèn ngữ cảnh.' },
    lessons: getLessonsForModule('ai_mod_12')
  },
  {
    id: 'ai_mod_13',
    levelId: 'advanced',
    courseId: 'ai',
    order: 5,
    title: { en: 'Module 13: Building Production AI Workflows', vi: 'Chương 13: Dự Án Tổng Hợp: Xây Dựng AI Agent & Guardrails' },
    description: { en: 'End-to-end full-stack AI application architecture with input/output guardrails, PII redaction, and LLM-as-a-judge evaluation.', vi: 'Kiến trúc ứng dụng AI sản xuất full-stack hoàn chỉnh với guardrails bảo mật, ẩn PII và đánh giá LLM-as-a-judge.' },
    lessons: getLessonsForModule('ai_mod_13')
  }
];

// Assemble Levels
const basicLevel: Level = {
  id: 'basic',
  courseId: 'ai',
  title: { en: 'Level 1: AI Fundamentals', vi: 'Cấp Độ 1: Nền Tảng AI' },
  description: { en: 'Understand how AI, Deep Learning, and LLMs work conceptually without math overload.', vi: 'Hiểu cơ chế hoạt động của AI, Deep Learning và LLM một cách trực quan dễ hiểu.' },
  order: 1,
  modules: basicModules
};

const intermediateLevel: Level = {
  id: 'intermediate',
  courseId: 'ai',
  title: { en: 'Level 2: Practical AI Usage', vi: 'Cấp Độ 2: Thực Hành Sử Dụng AI' },
  description: { en: 'Master Prompt Engineering, Structured Outputs, Coding Productivity, and Agent Workflows.', vi: 'Làm chủ Kỹ thuật Prompt, Structured Outputs, Tăng năng suất code và Quy trình Agent.' },
  order: 2,
  modules: intermediateModules
};

const advancedLevel: Level = {
  id: 'advanced',
  courseId: 'ai',
  title: { en: 'Level 3: AI Application Development', vi: 'Cấp Độ 3: Phát Triển Ứng Dụng AI' },
  description: { en: 'Build production full-stack AI applications with APIs, Function Calling, RAG, and Guardrails.', vi: 'Xây dựng ứng dụng AI full-stack chuẩn sản xuất với API, Function Calling, RAG và Guardrails.' },
  order: 3,
  modules: advancedModules
};

export const aiCourseData: Course = {
  id: 'ai',
  title: { en: 'AI & Generative Engineering', vi: 'AI & Kỹ Thuật Generative AI' },
  description: {
    en: 'Master Generative AI from core mechanics to Prompt Engineering, API integration, Function Calling, RAG, and Agent workflows.',
    vi: 'Làm chủ Generative AI từ nguyên lý cốt lõi đến Prompt Engineering, tích hợp API, Function Calling, RAG và quy trình Agent.'
  },
  tagline: {
    en: 'From AI concepts to hands-on Prompt Engineering, Function Calling & RAG Application Development.',
    vi: 'Từ nền tảng AI đến thực hành Prompt Engineering, Function Calling & Phát triển ứng dụng RAG.'
  },
  iconName: 'Sparkles',
  color: '#8B5CF6',
  accentBg: 'bg-purple-500/10',
  levels: {
    basic: basicLevel,
    intermediate: intermediateLevel,
    advanced: advancedLevel
  }
};
