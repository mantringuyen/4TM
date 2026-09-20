import { BookType, PublicationTemplate, Language } from '../types';

export const PUBLICATION_TEMPLATES: Record<BookType, PublicationTemplate> = {
  Handbook: {
    id: 'Handbook',
    slug: 'handbook',
    name: {
      en: 'Handbook',
      vi: 'Cẩm Nang Kỹ Thuật',
    },
    tagline: {
      en: 'Comprehensive foundational & deep-dive technical manual',
      vi: 'Tài liệu toàn diện từ nền tảng đến chuyên sâu kiến trúc',
    },
    purpose: {
      en: 'Provide an authoritative, multi-part, chapter-by-chapter mastery manual covering language mechanics, runtime internals, and architecture.',
      vi: 'Cung cấp cẩm nang làm chủ kiến trúc và runtime có thẩm quyền, phân chia thành nhiều phần và chương chuyên sâu.',
    },
    editorialStructure: {
      en: [
        'Cover',
        'Front Matter',
        'Table of Contents',
        'Part Overview',
        'Chapter Opener',
        'In-Depth Prose Sections',
        'Process Diagrams & Schemas',
        'Annotated Code Examples',
        'Deep Dives & Runtime Internals',
        'Critical Pitfalls & Anti-Patterns',
        'Chapter Summary (Mental Models & Rules)',
        'Socratic Self-Review',
        'Back Matter & Authoritative References',
      ],
      vi: [
        'Bìa Ấn Phẩm',
        'Đầu Sách & Lời Tựa',
        'Mục Lục Tổng Quan',
        'Giới Thiệu Phần',
        'Mở Đầu Chương',
        'Nội Dung Chuyên Khảo Chi Tiết',
        'Sơ Đồ Quy Trình & Kiến Trúc',
        'Mã Nguồn Mẫu Kèm Chú Thích',
        'Phân Tích Sâu Runtime & Cơ Chế',
        'Sai Lầm Chí Tử & Anti-Pattern',
        'Tổng Hợp Cốt Lõi (Mô Hình & Quy Tắc)',
        'Câu Hỏi Tự Đánh Giá Socratic',
        'Thuật Ngữ & Tài Liệu Tham Khảo',
      ],
    },
    recommendedPrimitives: [
      'KeyIdeaBlock',
      'ProcessDiagramBlock',
      'ComparisonTableBlock',
      'DeepDiveBlock',
      'CommonMistakesBlock',
      'WhenToUseBlock',
      'PracticalScenarioBlock',
      'BestPracticesBlock',
      'RelatedConceptsBlock',
      'ChapterSummaryBlock',
      'SelfReviewBlock',
    ],
    visualStyle: {
      badgeTone: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      accentColor: '#2563EB',
      layoutDensity: 'deep-handbook',
      openerLabel: {
        en: 'CHAPTER',
        vi: 'CHƯƠNG',
      },
      iconName: 'BookMarked',
    },
    navigationStyle: 'parts-and-chapters',
    readingPacing: {
      en: 'Structured deep reading with progressive parts and self-contained chapters.',
      vi: 'Đọc sâu có hệ thống theo từng phần và chương độc lập.',
    },
  },

  Definitions: {
    id: 'Definitions',
    slug: 'definitions',
    name: {
      en: 'Definitions',
      vi: 'Từ Điển Định Nghĩa',
    },
    tagline: {
      en: 'Precise technical concept definitions and mental models',
      vi: 'Định nghĩa chính xác khái niệm kỹ thuật và mô hình tư duy',
    },
    purpose: {
      en: 'Explain technical concepts clearly and precisely through crisp definitions, visual mental models, and common misconceptions without course fluff.',
      vi: 'Giải thích chính xác các khái niệm kỹ thuật cốt lõi bằng định nghĩa chuẩn xác, mô hình tâm trí và vạch trần ngộ nhận.',
    },
    editorialStructure: {
      en: [
        'Concept Identifier',
        'Formal Specification Definition',
        'Visual Mental Model',
        'Why It Matters in Production',
        'Minimal Canonical Example',
        'Common Misconception Debunked',
        'Related Concepts Matrix',
        'Quick Reference Sheet',
      ],
      vi: [
        'Tên Khái Niệm Cốt Lõi',
        'Định Nghĩa Chuẩn Quy Cách',
        'Mô Hình Tư Duy Trực Quan',
        'Tầm Quan Trọng Trong Thực Tế',
        'Mã Mẫu Điển Hình Chuẩn Mực',
        'Vạch Trần Hiểu Lầm Phổ Biến',
        'Ma Trận Khái Niệm Liên Quan',
        'Bảng Tra Cứu Nhanh',
      ],
    },
    recommendedPrimitives: [
      'DefinitionCardBlock',
      'KeyIdeaBlock',
      'ProcessDiagramBlock',
      'ComparisonTableBlock',
      'RelatedConceptsBlock',
      'SelfReviewBlock',
    ],
    visualStyle: {
      badgeTone: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
      accentColor: '#0D9488',
      layoutDensity: 'reference-cards',
      openerLabel: {
        en: 'CONCEPT',
        vi: 'KHÁI NIỆM',
      },
      iconName: 'Layers',
    },
    navigationStyle: 'concept-index',
    readingPacing: {
      en: 'High-speed reference lookup and conceptual grounding.',
      vi: 'Tra cứu nhanh gọn và củng cố mô hình tư duy cốt lõi.',
    },
  },

  Tips: {
    id: 'Tips',
    slug: 'tips',
    name: {
      en: 'Tips',
      vi: 'Mẹo Kỹ Thuật',
    },
    tagline: {
      en: 'High-value practical techniques, idioms, and quick insights',
      vi: 'Kỹ thuật thực chiến giá trị cao, thành ngữ lập trình và giải pháp tức thì',
    },
    purpose: {
      en: 'Provide actionable, highly scannable engineering techniques that solve specific problems with clear justification and minimal overhead.',
      vi: 'Cung cấp các mẹo lập trình thực chiến, dễ quét mắt, giải quyết nhanh vấn đề kèm lý do hoạt động và hạn chế.',
    },
    editorialStructure: {
      en: [
        'Problem / Engineering Situation',
        'Quick Actionable Insight',
        'Recommended Idiomatic Pattern',
        'Working Code Example',
        'Why It Works (Under the Hood)',
        'Pitfalls & Limitations',
        'Quick Takeaway Summary',
      ],
      vi: [
        'Tình Huống / Vấn Đề Gặp Phải',
        'Hiểu Biết Sâu & Giải Pháp Nhanh',
        'Mẫu Code Chuẩn Thành Ngữ',
        'Ví Dụ Code Hoạt Động',
        'Tại Sao Hiệu Quả (Bản Chất)',
        'Hạn Chế & Lưu Ý Khi Dùng',
        'Ghi Nhớ Trọng Tâm',
      ],
    },
    recommendedPrimitives: [
      'TipInsightBlock',
      'KeyIdeaBlock',
      'WhenToUseBlock',
      'CommonMistakesBlock',
      'EditorialChecklistBlock',
    ],
    visualStyle: {
      badgeTone: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      accentColor: '#D97706',
      layoutDensity: 'scannable-tips',
      openerLabel: {
        en: 'TECHNIQUE',
        vi: 'KỸ THUẬT',
      },
      iconName: 'Lightbulb',
    },
    navigationStyle: 'tip-stream',
    readingPacing: {
      en: 'Fast, byte-sized techniques with instant production applicability.',
      vi: 'Các mẹo ngắn gọn, áp dụng ngay vào dự án thực tế.',
    },
  },

  'Practical Guides': {
    id: 'Practical Guides',
    slug: 'practical-guides',
    name: {
      en: 'Practical Guides',
      vi: 'Hướng Dẫn Thực Hành',
    },
    tagline: {
      en: 'Step-by-step procedures to achieve real engineering objectives',
      vi: 'Quy trình từng bước để hoàn thành mục tiêu kỹ thuật thực tế',
    },
    purpose: {
      en: 'Guide engineers through completing concrete technical tasks with step-by-step instructions, verification checkpoints, and troubleshooting protocols.',
      vi: 'Hướng dẫn kỹ sư thực hiện nhiệm vụ kỹ thuật cụ thể với quy trình từng bước, mốc xác thực và cẩm nang xử lý sự cố.',
    },
    editorialStructure: {
      en: [
        'Goal & Target Outcome',
        'Prerequisites & Tooling',
        'Preparation & Setup',
        'Step-by-Step Procedure',
        'Complete Working Example',
        'Verification & Acceptance Criteria',
        'Troubleshooting & Diagnostic Matrix',
        'Final Production Checklist',
        'Further Reading & Deep References',
      ],
      vi: [
        'Mục Tiêu & Kết Quả Đầu Ra',
        'Yêu Cầu Tiền Đề & Công Cụ',
        'Chuẩn Bị & Thiết Lập',
        'Quy Trình Thực Hiện Từng Bước',
        'Mã Mẫu Hoàn Chỉnh Vận Hành',
        'Tiêu Chí Xác Thực Thành Công',
        'Ma Trận Chẩn Đoán & Sửa Lỗi',
        'Checklist Nghiệm Thu Sản Phẩm',
        'Tài Liệu Đọc Thêm Chuyên Sâu',
      ],
    },
    recommendedPrimitives: [
      'GuideStepWorkflowBlock',
      'TroubleshootingMatrixBlock',
      'EditorialChecklistBlock',
      'ProcessDiagramBlock',
      'KeyIdeaBlock',
    ],
    visualStyle: {
      badgeTone: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      accentColor: '#059669',
      layoutDensity: 'procedural-steps',
      openerLabel: {
        en: 'PROCEDURE',
        vi: 'QUY TRÌNH',
      },
      iconName: 'Workflow',
    },
    navigationStyle: 'step-workflow',
    readingPacing: {
      en: 'Task-driven, linear execution with verification gates at each step.',
      vi: 'Đọc theo mạch thực thi tuần tự kèm các điểm kiểm tra xác thực.',
    },
  },

  'Common Errors': {
    id: 'Common Errors',
    slug: 'common-errors',
    name: {
      en: 'Common Errors',
      vi: 'Chẩn Đoán & Sửa Lỗi',
    },
    tagline: {
      en: 'Root cause analysis, diagnosis, and prevention of recurring traps',
      vi: 'Phân tích nguyên nhân gốc rễ, chẩn đoán và phòng ngừa cạm bẫy',
    },
    purpose: {
      en: 'Equip developers to diagnose, understand the root causes of, and eliminate recurring runtime exceptions, compiler errors, and logic traps.',
      vi: 'Trang bị cho lập trình viên phương pháp chẩn đoán, hiểu nguyên nhân gốc rễ và sửa dứt điểm các lỗi runtime và bẫy logic.',
    },
    editorialStructure: {
      en: [
        'Error Signature & Exception Name',
        'Observed Symptoms & Context',
        'Minimal Reproducible Example',
        'Why It Happens (Engine / Spec Level)',
        'Step-by-Step Diagnostic Method',
        'Prescribed Verified Fix (Code Diff)',
        'Prevention & Guardrail Rules',
        'Related Concepts & Defensive Patterns',
      ],
      vi: [
        'Tên Lỗi & Ngoại Lệ Đặc Trưng',
        'Triệu Chứng & Bối Cảnh Xuất Hiện',
        'Ví Dụ Tái Hiện Lỗi Tối Giản',
        'Nguyên Nhân Gốc Rễ (Cơ Chế Máy)',
        'Phương Pháp Chẩn Đoán Từng Bước',
        'Giải Pháp Sửa Lỗi Chuẩn (So Sánh Code)',
        'Quy Tắc Phòng Ngừa Về Sau',
        'Khái Niệm Liên Quan & Code Phòng Thủ',
      ],
    },
    recommendedPrimitives: [
      'ErrorDiagnosisBlock',
      'CommonMistakesBlock',
      'ComparisonTableBlock',
      'ProcessDiagramBlock',
      'KeyIdeaBlock',
    ],
    visualStyle: {
      badgeTone: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      accentColor: '#E11D48',
      layoutDensity: 'diagnostic-flow',
      openerLabel: {
        en: 'CASE DIAGNOSIS',
        vi: 'CHẨN ĐOÁN LỖI',
      },
      iconName: 'AlertTriangle',
    },
    navigationStyle: 'error-catalog',
    readingPacing: {
      en: 'Problem-to-solution triage with deep root cause understanding.',
      vi: 'Truy vết từ triệu chứng lỗi đến phân tích bản chất và giải pháp chuẩn.',
    },
  },

  'Best Practices': {
    id: 'Best Practices',
    slug: 'best-practices',
    name: {
      en: 'Best Practices',
      vi: 'Quy Tắc Thực Hành',
    },
    tagline: {
      en: 'Battle-tested engineering standards, design trade-offs, and rules',
      vi: 'Tiêu chuẩn kỹ thuật đã kiểm chứng, đánh đổi kiến trúc và quy chuẩn',
    },
    purpose: {
      en: 'Explain production engineering standards, architectural decisions, and their contextual trade-offs without dogmatic absolute rules.',
      vi: 'Giải thích các tiêu chuẩn kỹ thuật trong sản xuất, phân tích lý do và các đánh đổi bối cảnh mà không giáo điều.',
    },
    editorialStructure: {
      en: [
        'Engineering Context & Problem Domain',
        'Recommended Industry Standard',
        'Why: Architectural & Performance Rationale',
        'Good Example (Canonical Implementation)',
        'Risky / Anti-Pattern Example',
        'Explicit Trade-offs & Costs',
        'Exceptions & When to Break the Rule',
        'Practical Production Checklist',
      ],
      vi: [
        'Bối Cảnh Kỹ Thuật & Phạm Vi Áp Dụng',
        'Tiêu Chuẩn Thực Hành Được Khuyến Nghị',
        'Lý Do: Cơ Sở Hiệu Năng & Kiến Trúc',
        'Ví Dụ Chuẩn Mực (Nên Dùng)',
        'Ví Dụ Rủi Ro / Anti-Pattern (Nên Tránh)',
        'Các Đánh Đổi & Chi Phí Thực Tế',
        'Trường Hợp Ngoại Lệ Được Phép Khác Đi',
        'Checklist Áp Dụng Thực Tế',
      ],
    },
    recommendedPrimitives: [
      'BestPracticeComparisonBlock',
      'BestPracticesBlock',
      'WhenToUseBlock',
      'ComparisonTableBlock',
      'EditorialChecklistBlock',
    ],
    visualStyle: {
      badgeTone: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      accentColor: '#4F46E5',
      layoutDensity: 'tradeoff-matrix',
      openerLabel: {
        en: 'STANDARD',
        vi: 'TIÊU CHUẨN',
      },
      iconName: 'ShieldCheck',
    },
    navigationStyle: 'practice-matrix',
    readingPacing: {
      en: 'Thoughtful evaluation of architectural trade-offs and code health.',
      vi: 'Đánh giá thấu đáo các đánh đổi thiết kế và độ bền vững của mã nguồn.',
    },
  },

  'Patterns / Recipes': {
    id: 'Patterns / Recipes',
    slug: 'patterns-recipes',
    name: {
      en: 'Patterns / Recipes',
      vi: 'Mẫu Thiết Kế & Công Thức',
    },
    tagline: {
      en: 'Reusable architectural blueprints and production-ready recipes',
      vi: 'Khuôn mẫu thiết kế tái sử dụng và công thức giải pháp hoàn chỉnh',
    },
    purpose: {
      en: 'Provide reusable architectural patterns and concrete recipe implementations with variations, gotchas, and contextual boundaries.',
      vi: 'Cung cấp các khuôn mẫu kiến trúc tái sử dụng và công thức lập trình mẫu kèm biến thể, cạm bẫy và giới hạn áp dụng.',
    },
    editorialStructure: {
      en: [
        'Target Problem & Context',
        'Architecture Overview & Blueprint',
        'Canonical Solution Implementation',
        'Step-by-Step Code Walkthrough',
        'Production Variations & Adaptations',
        'Architectural Trade-Offs Matrix',
        'Gotchas & Edge Cases',
        'When NOT to Use This Pattern',
        'Related Patterns & Composition',
      ],
      vi: [
        'Vấn Đề Mục Tiêu & Bối Cảnh',
        'Tổng Quan Kiến Trúc & Sơ Đồ Blueprint',
        'Triển Khai Giải Pháp Chuẩn Mực',
        'Phân Tích Chi Tiết Từng Dòng Code',
        'Các Biến Thể Ứng Dụng Trong Thực Tế',
        'Ma Trận Đánh Đổi Kiến Trúc',
        'Các Bẫy Ngầm & Trường Hợp Biên',
        'Khi Nào KHÔNG Nên Dùng Pattern Này',
        'Các Pattern Liên Quan & Phối Hợp',
      ],
    },
    recommendedPrimitives: [
      'PatternRecipeBlock',
      'ProcessDiagramBlock',
      'ComparisonTableBlock',
      'WhenToUseBlock',
      'CommonMistakesBlock',
      'RelatedConceptsBlock',
    ],
    visualStyle: {
      badgeTone: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
      accentColor: '#0891B2',
      layoutDensity: 'solution-recipe',
      openerLabel: {
        en: 'PATTERN',
        vi: 'MẪU THIẾT KẾ',
      },
      iconName: 'Binary',
    },
    navigationStyle: 'pattern-library',
    readingPacing: {
      en: 'Modular solution blueprints designed for direct architectural reuse.',
      vi: 'Các mẫu kiến trúc module hóa để tái sử dụng ngay trong hệ thống.',
    },
  },
};

/**
 * Returns the publication template definition for a given BookType.
 * Defaults safely to 'Handbook' if not found.
 */
export function getPublicationTemplate(bookType: BookType): PublicationTemplate {
  return PUBLICATION_TEMPLATES[bookType] || PUBLICATION_TEMPLATES.Handbook;
}

/**
 * Returns all 7 publication template definitions.
 */
export function getAllPublicationTemplates(): PublicationTemplate[] {
  return Object.values(PUBLICATION_TEMPLATES);
}

/**
 * Returns localized publication structure steps.
 */
export function getPublicationStructureSteps(bookType: BookType, language: Language): string[] {
  const template = getPublicationTemplate(bookType);
  return template.editorialStructure[language] || template.editorialStructure.en;
}
