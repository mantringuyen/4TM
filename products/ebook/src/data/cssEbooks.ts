import { Book } from '../types';

export const CSS_EBOOKS: Book[] = [
  // 1. CSS Handbook
  {
    id: 'css-handbook',
    slug: 'css-handbook',
    title: 'CSS Handbook',
    subtitle: {
      en: 'Cascade Rules, Specificity, Box Model & Modern Layout Systems',
      vi: 'Quy Tắc Cascade, Độ Ưu Tiên Specificity, Box Model & Bố Cục Modern',
    },
    bookType: 'Handbook',
    categoryId: 'css',
    subjectId: 'web',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '35 mins',
    chaptersCount: 3,
    publishedDate: '2025-02-10',
    accentColor: 'from-blue-500 to-sky-700',
    tags: ['CSS3', 'Flexbox', 'Grid', 'Cascade', 'Box Model'],
    description: {
      en: 'Comprehensive reference manual for CSS styling: the Cascade algorithm, inheritance, specificity calculation, Flexbox, CSS Grid, and custom properties.',
      vi: 'Cẩm nang tra cứu CSS toàn diện: thuật toán Cascade, kế thừa, tính toán độ ưu tiên Specificity, Flexbox, CSS Grid và biến CSS custom properties.',
    },
    prerequisites: {
      en: ['Basic HTML layout concepts'],
      vi: ['Khái niệm bố cục HTML cơ bản'],
    },
    outcomes: {
      en: ['Calculate CSS specificity values accurately', 'Master Flexbox alignment and CSS Grid track layouts'],
      vi: ['Tính toán chính xác điểm ưu tiên Specificity trong CSS', 'Làm chủ căn chỉnh Flexbox và bố cục lưới CSS Grid'],
    },
    chapters: [
      {
        id: 'css-hb-ch-1',
        number: 1,
        slug: 'cascade-and-specificity',
        title: {
          en: 'The Cascade, Specificity & Inheritance',
          vi: 'Thuật Toán Cascade, Specificity & Kế Thừa',
        },
        summary: {
          en: 'Understanding specificity points (Inline, ID, Class, Type) and origin importance.',
          vi: 'Hiểu điểm ưu tiên specificity (Inline, ID, Class, Type) và thứ tự ưu tiên.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'css-hb-1-1',
            title: {
              en: 'Calculating Specificity Score (0,0,0,0)',
              vi: 'Cách Tính Điểm Specificity (Inline, ID, Class, Element)',
            },
            content: {
              en: 'Specificity is represented as a 4-tuple: (Inline styles, ID selectors, Class/Attribute/Pseudo-class selectors, Element/Pseudo-element selectors).',
              vi: 'Specificity được biểu diễn dưới dạng bộ 4 số: (Thẻ inline, ID selector, Class/Attribute/Pseudo-class, Element/Pseudo-element).',
            },
            codeBlock: {
              language: 'css',
              filename: 'specificity.css',
              code: `/* Score: (0, 1, 0, 0) */
#main-nav { color: blue; }

/* Score: (0, 0, 2, 1) - Wins if no ID matches! */
nav.primary-menu ul.active { color: green; }`,
            },
          },
        ],
      },
      {
        id: 'css-hb-ch-2',
        number: 2,
        slug: 'box-model-and-positioning',
        title: {
          en: 'The Box Model & Positioning Schemes',
          vi: 'Mô Hình Box Model & Các Cơ Chế Positioning',
        },
        summary: {
          en: 'box-sizing: border-box, margin collapsing, static, relative, absolute, fixed, sticky.',
          vi: 'box-sizing: border-box, gộp margin, static, relative, absolute, fixed, sticky.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'css-hb-2-1',
            title: {
              en: 'Universal box-sizing: border-box Reset',
              vi: 'Reset Box Model Toàn Cục Với box-sizing: border-box',
            },
            content: {
              en: 'Using `box-sizing: border-box` forces padding and borders to be included inside the element’s total declared width and height, eliminating layout sizing bugs.',
              vi: 'Sử dụng `box-sizing: border-box` ép padding và border tính vào bên trong chiều rộng tổng thể, loại bỏ lỗi tính toán kích thước.',
            },
          },
        ],
      },
      {
        id: 'css-hb-ch-3',
        number: 3,
        slug: 'flexbox-and-grid-layouts',
        title: {
          en: 'Flexbox vs CSS Grid Layout Systems',
          vi: 'Hệ Bố Cục Flexbox vs CSS Grid',
        },
        summary: {
          en: '1D axis layout with Flexbox vs 2D matrix layout with CSS Grid.',
          vi: 'Bố cục 1 chiều với Flexbox vs Bố cục ma trận 2 chiều với CSS Grid.',
        },
        readTimeMinutes: 11,
        sections: [
          {
            id: 'css-hb-3-1',
            title: {
              en: 'When to Use Flexbox vs CSS Grid',
              vi: 'Khi Nào Dùng Flexbox vs CSS Grid',
            },
            content: {
              en: 'Use Flexbox for 1-dimensional component alignment (navbars, button groups). Use CSS Grid for 2-dimensional page layouts and matrix card grids.',
              vi: 'Dùng Flexbox cho dàn trang 1 chiều (navbar, nhóm button). Dùng CSS Grid cho bố cục 2 chiều toàn trang và lưới card.',
            },
          },
        ],
      },
    ],
  },

  // 2. CSS Definitions
  {
    id: 'css-definitions',
    slug: 'css-definitions',
    title: 'CSS Definitions & Box Model Glossary',
    subtitle: {
      en: 'Styling Terminology, Stacking Contexts & Formatting Model Glossary',
      vi: 'Thuật Ngữ CSS, Stacking Context & Tra Cứu Khái Niệm Bố Cục',
    },
    bookType: 'Definitions',
    categoryId: 'css',
    subjectId: 'web',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '20 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-12',
    accentColor: 'from-sky-500 to-indigo-700',
    tags: ['Definitions', 'BFC', 'Stacking Context', 'Glossary'],
    description: {
      en: 'Definitions for CSS layout concepts: Block Formatting Context (BFC), Stacking Context, z-index hierarchy, Reflow vs Repaint, and CSS Variables.',
      vi: 'Từ điển định nghĩa khái niệm CSS: Block Formatting Context (BFC), Stacking Context, thứ tự z-index, Reflow vs Repaint và Biến CSS.',
    },
    prerequisites: {
      en: ['Basic CSS styling knowledge'],
      vi: ['Hiểu biết định dạng CSS cơ bản'],
    },
    outcomes: {
      en: ['Understand BFC margin collapse prevention and z-index stacking triggers'],
      vi: ['Hiểu nguyên lý chống gộp margin của BFC và kích hoạt Stacking Context'],
    },
    chapters: [
      {
        id: 'css-def-ch-1',
        number: 1,
        slug: 'formatting-contexts-bfc',
        title: {
          en: 'Block Formatting Context (BFC) Definitions',
          vi: 'Định Nghĩa Block Formatting Context (BFC)',
        },
        summary: {
          en: 'BFC triggers, float containment, and margin collapse elimination.',
          vi: 'Tác nhân kích hoạt BFC, bao bọc phần tử float và chống gộp lề margin.',
        },
        readTimeMinutes: 10,
        sections: [
          {
            id: 'css-def-1-1',
            title: {
              en: 'What Triggers a Block Formatting Context?',
              vi: 'Điều Kiện Kích Hoạt Một Block Formatting Context (BFC)',
            },
            content: {
              en: 'A BFC is created by elements with `display: flow-root`, `display: flex`, `position: absolute/fixed`, or `overflow: hidden/auto`.',
              vi: 'Một BFC được tạo ra bởi các element có `display: flow-root`, `display: flex`, `position: absolute/fixed`, hoặc `overflow: hidden/auto`.',
            },
          },
        ],
      },
      {
        id: 'css-def-ch-2',
        number: 2,
        slug: 'stacking-context-z-index',
        title: {
          en: 'Stacking Context & Rendering Pipeline Glossary',
          vi: 'Stacking Context & Quy Trình Dựng Hình (Rendering)',
        },
        summary: {
          en: 'Stacking context rules, z-index isolation, Reflow vs Repaint vs Composite.',
          vi: 'Quy tắc stacking context, cô lập z-index, Reflow vs Repaint vs Composite.',
        },
        readTimeMinutes: 10,
        sections: [
          {
            id: 'css-def-2-1',
            title: {
              en: 'Reflow vs Repaint Performance',
              vi: 'Khái Niệm Reflow vs Repaint Trong Rendering Browser',
            },
            content: {
              en: 'Reflow recomputes element geometry and layout positions (expensive). Repaint updates visual pixels (color, background). Compositing uses GPU acceleration (transform, opacity).',
              vi: 'Reflow tính toán lại vị trí bố cục (rất tốn kém). Repaint vẽ lại điểm ảnh (màu sắc). Compositing dùng GPU để biến đổi (transform, opacity).',
            },
          },
        ],
      },
    ],
  },

  // 3. CSS Practical Guide
  {
    id: 'css-practical-guide',
    slug: 'css-practical-guide',
    title: 'Responsive Layouts with Flexbox & Grid',
    subtitle: {
      en: 'Step-by-Step Practical Guide to Building Mobile-First Responsive UIs',
      vi: 'Hướng Dẫn Thực Hành Từng Bước Thiết Kế Giao Diện Đáp Ứng Mobile-First',
    },
    bookType: 'Practical Guides',
    categoryId: 'css',
    subjectId: 'web',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '25 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-15',
    accentColor: 'from-blue-600 to-cyan-800',
    tags: ['Responsive', 'Grid', 'Flexbox', 'Mobile-First', 'Guide'],
    description: {
      en: 'A step-by-step practical guide to building fully fluid, responsive layouts using Mobile-First CSS Media Queries, CSS Grid auto-fit, and minmax().',
      vi: 'Hướng dẫn thực hành từng bước thiết kế bố cục đáp ứng mượt mà với tư duy Mobile-First, CSS Grid auto-fit và hàm minmax().',
    },
    prerequisites: {
      en: ['Basic CSS selectors and properties'],
      vi: ['Kỹ năng sử dụng CSS selector và thuộc tính cơ bản'],
    },
    outcomes: {
      en: ['Build auto-responsive grid systems without media query clutter'],
      vi: ['Tạo hệ thống lưới tự động đáp ứng không cần quá nhiều media query'],
    },
    chapters: [
      {
        id: 'cpg-ch-1',
        number: 1,
        slug: 'mobile-first-media-queries',
        title: {
          en: 'Mobile-First Media Query Architecture',
          vi: 'Kiến Trúc Media Query Theo Phương Pháp Mobile-First',
        },
        summary: {
          en: 'Using min-width breakpoints to scale layouts progressively from mobile to desktop.',
          vi: 'Sử dụng điểm ngắt min-width để mở rộng bố cục từ mobile lên desktop.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'cpg-1-1',
            title: {
              en: 'Why min-width overrides max-width',
              vi: 'Tại Sao min-width Vượt Trội Hơn max-width',
            },
            content: {
              en: 'Mobile-First design starts with base styles without media queries for small screens, applying `min-width` queries to layer complexity for larger displays.',
              vi: 'Thiết kế Mobile-First viết style cơ bản cho màn hình nhỏ, sau đó nâng cấp bằng `min-width` cho màn hình lớn hơn.',
            },
          },
        ],
      },
      {
        id: 'cpg-ch-2',
        number: 2,
        slug: 'css-grid-auto-fit-minmax',
        title: {
          en: 'Fluid Grids with auto-fit & minmax()',
          vi: 'Lưới Đáp Ứng Tự Động Với auto-fit & minmax()',
        },
        summary: {
          en: 'Creating zero-media-query card grids with repeat(auto-fit, minmax(280px, 1fr)).',
          vi: 'Tạo lưới card đáp ứng tự động không cần media query bằng repeat(auto-fit, minmax(280px, 1fr)).',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'cpg-2-1',
            title: {
              en: 'The Magic Grid Formula',
              vi: 'Công Thức Tạo Lưới Tự Động Tối Ưu',
            },
            content: {
              en: '`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` automatically wraps cards to new lines based on available container width.',
              vi: 'Cú pháp `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` tự động rớt card xuống dòng mới dựa trên độ rộng khung chứa.',
            },
            codeBlock: {
              language: 'css',
              filename: 'responsive_grid.css',
              code: `.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}`,
            },
          },
        ],
      },
    ],
  },

  // 4. CSS Common Errors
  {
    id: 'css-common-errors',
    slug: 'css-common-errors',
    title: 'CSS Common Errors & Layout Pitfalls',
    subtitle: {
      en: 'Z-Index Wars, Collapsing Margins & Overflow Clipping Gotchas',
      vi: 'Cuộc Chiến Z-Index, Gộp Lề Margin & Lỗi Tràn Khung Overflow',
    },
    bookType: 'Common Errors',
    categoryId: 'css',
    subjectId: 'web',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '25 mins',
    chaptersCount: 2,
    publishedDate: '2025-01-22',
    accentColor: 'from-amber-500 to-rose-800',
    tags: ['Z-Index', 'Margin Collapse', 'Debugging', 'Overflow Bugs'],
    description: {
      en: 'Debugging classic CSS nightmares: z-index not working due to stacking context isolation, vertical margin collapsing, and unexpected horizontal scrollbars.',
      vi: 'Sửa các sự cố CSS kinh điển: z-index không hoạt động do bị ngắt Stacking Context, gộp margin dọc và thanh cuộn ngang xuất hiện ngoài ý muốn.',
    },
    prerequisites: {
      en: ['Basic CSS layout knowledge'],
      vi: ['Hiểu biết bố cục CSS cơ bản'],
    },
    outcomes: {
      en: ['Fix z-index layering issues by managing parent stacking contexts', 'Eliminate unwanted horizontal page overflow'],
      vi: ['Sửa triệt để lỗi z-index bằng cách quản lý Stacking Context cha', 'Loại bỏ thanh cuộn ngang tràn trang'],
    },
    chapters: [
      {
        id: 'cce-ch-1',
        number: 1,
        slug: 'z-index-and-stacking-traps',
        title: {
          en: 'Z-Index Failure & Stacking Context Isolation',
          vi: 'Lỗi Z-Index Không Có Tác Dụng & Cô Lập Context',
        },
        summary: {
          en: 'Why z-index: 9999 fails when a parent element creates a lower stacking context.',
          vi: 'Tại sao z-index: 9999 vẫn bị đè khi element cha thuộc stacking context thấp hơn.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'cce-1-1',
            title: {
              en: 'Parent Stacking Context Hierarchy',
              vi: 'Thứ Tự Stacking Context Của Element Cha',
            },
            content: {
              en: 'Child element z-index values are evaluated strictly inside their parent’s stacking context. No child z-index can escape its parent container’s layer.',
              vi: 'Giá trị z-index của phần tử con chỉ có tác dụng trong lòng Stacking Context cha. Phần tử con không thể đè lên lớp ngoài nếu cha bị đè.',
            },
          },
        ],
      },
      {
        id: 'cce-ch-2',
        number: 2,
        slug: 'unexpected-overflow-scrollbars',
        title: {
          en: 'Horizontal Scrollbar Leaks (vw Units & Padding)',
          vi: 'Rò Rỉ Thanh Cuộn Ngang (Đơn Vị vw & Padding)',
        },
        summary: {
          en: 'Why width: 100vw creates horizontal scrollbars and how to fix with box-sizing.',
          vi: 'Tại sao width: 100vw gây ra thanh cuộn ngang và cách khắc phục.',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'cce-2-1',
            title: {
              en: '100vw Scrollbar Width Bug',
              vi: 'Lỗi 100vw Tính Cả Độ Rộng Thanh Cuộn',
            },
            content: {
              en: '`100vw` includes the width of the vertical browser scrollbar, causing total page width to exceed 100%. Use `width: 100%` or `max-width: 100%` instead.',
              vi: 'Thẻ `100vw` tính cả bề rộng thanh cuộn dọc trình duyệt, khiến trang bị thừa bề ngang. Hãy dùng `width: 100%` hoặc `max-width: 100%`.',
            },
          },
        ],
      },
    ],
  },

  // 5. CSS Best Practices
  {
    id: 'css-best-practices',
    slug: 'css-best-practices',
    title: 'Maintainable CSS & Tailwind Best Practices',
    subtitle: {
      en: 'Design Tokens, CSS Custom Properties & Modern Styling Architecture',
      vi: 'Design Tokens, Biến CSS Custom Properties & Kiến Trúc Styling Modern',
    },
    bookType: 'Best Practices',
    categoryId: 'css',
    subjectId: 'web',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '25 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-01',
    accentColor: 'from-blue-600 to-sky-900',
    tags: ['Tailwind', 'Design Tokens', 'Architecture', 'Best Practices'],
    description: {
      en: 'Architecture standards for scalable CSS: organizing design tokens via CSS variables, Utility-First CSS guidelines, and avoiding specificity inflation.',
      vi: 'Tiêu chuẩn kiến trúc CSS quy mô lớn: quản lý design tokens bằng biến CSS, quy tắc Utility-First với Tailwind và tránh bùng nổ độ ưu tiên selector.',
    },
    prerequisites: {
      en: ['Experience styling modern web interfaces'],
      vi: ['Đã có kinh nghiệm định dạng giao diện web'],
    },
    outcomes: {
      en: ['Structure CSS custom properties for instant dark mode switching', 'Write maintainable Tailwind CSS codebases'],
      vi: ['Tổ chức biến CSS custom properties hỗ trợ chuyển dark mode tức thì', 'Viết mã nguồn Tailwind CSS sạch đẹp dễ bảo trì'],
    },
    chapters: [
      {
        id: 'cbp-ch-1',
        number: 1,
        slug: 'css-custom-properties-theme-tokens',
        title: {
          en: 'Design Tokens & CSS Custom Properties',
          vi: 'Quản Lý Design Tokens Với Biến CSS Custom Properties',
        },
        summary: {
          en: 'Defining color, spacing, and typography variables on :root for runtime dark mode.',
          vi: 'Định nghĩa biến màu sắc, khoảng cách, typography trên :root để đổi theme dark mode.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'cbp-1-1',
            title: {
              en: 'Runtime Theme Switching with CSS Variables',
              vi: 'Chuyển Đổi Theme Runtime Bằng Biến CSS',
            },
            content: {
              en: 'Unlike SASS variables that compile statically, CSS custom properties (`--bg-color`) evaluate dynamically at runtime in the DOM tree.',
              vi: 'Khác với biến SASS biên dịch tĩnh, biến CSS custom properties (`--bg-color`) được tính toán động ngay tại runtime trong cây DOM.',
            },
          },
        ],
      },
      {
        id: 'cbp-ch-2',
        number: 2,
        slug: 'utility-first-tailwind-patterns',
        title: {
          en: 'Utility-First Patterns with Tailwind CSS',
          vi: 'Mẫu Thiết Kế Utility-First Với Tailwind CSS',
        },
        summary: {
          en: 'Organizing component abstractions, arbitrary values, and responsive variants.',
          vi: 'Tổ chức trừu tượng hóa component, giá trị tùy chỉnh và variant đáp ứng.',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'cbp-2-1',
            title: {
              en: 'Avoiding @apply Overuse',
              vi: 'Tránh Lạm Dụng Directive @apply Trong Tailwind',
            },
            content: {
              en: 'Overusing `@apply` reintroduces traditional custom class management issues. Prefer extracting React/UI components for reusability.',
              vi: 'Lạm dụng `@apply` sẽ vô tình mang các vấn đề quản lý class truyền thống quay lại. Hãy ưu tiên tách component React/UI.',
            },
          },
        ],
      },
    ],
  },
];
