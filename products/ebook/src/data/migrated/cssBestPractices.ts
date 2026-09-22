import { Book } from '../../types';

export const CSS_BEST_PRACTICES_BOOK: Book = {
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
    en: [
      'Experience styling modern web interfaces with CSS custom properties and utility frameworks',
    ],
    vi: [
      'Đã có kinh nghiệm định dạng giao diện web với biến CSS custom properties và utility framework',
    ],
  },
  outcomes: {
    en: [
      'Structure CSS custom properties and design tokens for instant zero-runtime dark mode switching',
      'Maintain clean, performant utility-first styling by balancing component extraction against @apply anti-patterns',
      'Prevent CSS specificity wars through disciplined token inheritance and cascade layering',
    ],
    vi: [
      'Tổ chức biến CSS custom properties và design tokens hỗ trợ chuyển dark mode tức thì không tốn chi phí runtime',
      'Duy trì phong cách utility-first sạch sẽ và tối ưu hiệu năng bằng cách cân đối giữa component hóa và directive @apply',
      'Ngăn chặn bùng nổ xung đột độ ưu tiên CSS thông qua kế thừa token và cascade layer có kỷ luật',
    ],
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
        en: 'Defining color, spacing, and typography variables on :root for runtime dark mode without duplicate stylesheets.',
        vi: 'Định nghĩa biến màu sắc, khoảng cách, typography trên :root để đổi theme dark mode không cần nhân bản stylesheet.',
      },
      readTimeMinutes: 12,
      sections: [
        {
          id: 'cbp-1-1',
          title: {
            en: 'Runtime Theme Switching with CSS Variables',
            vi: 'Chuyển Đổi Theme Runtime Bằng Biến CSS',
          },
          keyIdea: {
            en: 'Unlike preprocessor variables (SASS/LESS) which compile statically at build time, CSS Custom Properties evaluate dynamically in the browser DOM cascade, enabling instantaneous theme switches without rebuilding CSS.',
            vi: 'Khác với biến tiền xử lý (SASS/LESS) vốn được biên dịch tĩnh tại build-time, biến CSS Custom Properties được tính toán động trực tiếp trong cây DOM của trình duyệt, cho phép đổi theme tức thì mà không cần build lại CSS.',
          },
          content: {
            en: 'Structuring design tokens with CSS Custom Properties on `:root` and overriding them via `[data-theme="dark"]` or `.dark` classes establishes a single source of truth for design systems. Component styles reference semantic token names (`var(--bg-surface)`, `var(--text-primary)`) rather than hardcoded hex colors, enabling seamless dark mode transitions, user customizations, and theme isolation.',
            vi: 'Tổ chức design tokens bằng biến CSS Custom Properties trên `:root` và ghi đè chúng thông qua thuộc tính `[data-theme="dark"]` hoặc class `.dark` tạo nên một nguồn chân lý duy nhất cho toàn bộ design system. Các component tham chiếu tên token mang tính ngữ nghĩa (`var(--bg-surface)`, `var(--text-primary)`) thay vì gán cứng mã màu hex, giúp việc chuyển đổi dark mode, tùy biến giao diện và cô lập theme diễn ra mượt mà.',
          },
          practiceDetails: {
            context: {
              en: 'Engineering scalable web applications requiring instant runtime theme switching (light/dark/high-contrast) across thousands of UI components.',
              vi: 'Xây dựng ứng dụng web quy mô lớn đòi hỏi chuyển đổi theme tức thì (sáng/tối/tương phản cao) trên hàng ngàn component giao diện.',
            },
            recommendedPractice: {
              en: 'Declare semantic design token variables on `:root` and reassign values under `[data-theme="dark"]`, keeping component CSS completely theme-agnostic.',
              vi: 'Khai báo các biến design token ngữ nghĩa trên `:root` và gán lại giá trị dưới bộ chọn `[data-theme="dark"]`, giữ cho mã CSS component hoàn toàn độc lập với theme.',
            },
            whyItMatters: {
              en: 'Hardcoding hex colors in individual components forces duplicate CSS bundles for dark mode and creates maintenance debt. CSS custom properties switch instantly at zero CPU rendering overhead.',
              vi: 'Viết cứng mã màu hex trong từng component buộc phải tải thêm bundle CSS trùng lặp cho dark mode và gây nợ kỹ thuật. Biến CSS tùy chỉnh chuyển đổi tức thì mà không gây tiêu tốn CPU rendering.',
            },
            goodExample: {
              language: 'css',
              filename: 'theme_tokens_best_practice.css',
              explanation: {
                en: 'Semantic token naming on :root with dark mode overrides at the root boundary.',
                vi: 'Đặt tên token ngữ nghĩa trên :root và ghi đè dark mode ở cấp gốc tài liệu.',
              },
              code: `/* Light theme defaults on :root */
:root {
  --color-bg-canvas: #f8fafc;
  --color-bg-surface: #ffffff;
  --color-text-primary: #0f172a;
  --color-border: #e2e8f0;
}

/* Dark theme overrides on root container */
[data-theme="dark"] {
  --color-bg-canvas: #0f172a;
  --color-bg-surface: #1e293b;
  --color-text-primary: #f8fafc;
  --color-border: #334155;
}

/* Component references token - ZERO dark mode classes needed! */
.card {
  background-color: var(--color-bg-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}`,
            },
            riskyExample: {
              language: 'css',
              filename: 'hardcoded_theme_anti_pattern.css',
              explanation: {
                en: 'Scattering dark mode class overrides across individual component selectors.',
                vi: 'Rải rác ghi đè class dark mode trên từng selector component riêng lẻ.',
              },
              code: `/* ANTI-PATTERN: Specificity explosions and duplicate declarations */
.card {
  background-color: #ffffff;
  color: #0f172a;
}

body.dark .card {
  background-color: #1e293b;
  color: #f8fafc;
}

body.dark .card .title {
  color: #ffffff;
}`,
            },
            tradeOffs: {
              en: [
                'Token governance: Requires disciplined team naming conventions to prevent token proliferation.',
                'Initial setup: Upfront effort is higher than quick inline utility values.',
              ],
              vi: [
                'Quản trị token: Yêu cầu đội ngũ tuân thủ quy ước đặt tên chặt chẽ để tránh bùng nổ số lượng token.',
                'Thiết lập ban đầu: Tốn công sức cấu trúc hơn so với việc gán mã màu trực tiếp.',
              ],
            },
            checklist: {
              en: [
                'All color properties in components utilize semantic CSS custom property tokens',
                'Dark mode variables are encapsulated within [data-theme="dark"] or prefers-color-scheme media query',
                'Fallback values are provided for critical tokens: var(--color-bg-surface, #ffffff)',
              ],
              vi: [
                'Tất cả thuộc tính màu sắc trong component đều sử dụng biến CSS token ngữ nghĩa',
                'Biến dark mode được đóng gói trong [data-theme="dark"] hoặc media query prefers-color-scheme',
                'Cung cấp giá trị fallback cho các token quan trọng: var(--color-bg-surface, #ffffff)',
              ],
            },
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
        en: 'Organizing component abstractions, arbitrary values, and responsive variants without @apply misuse.',
        vi: 'Tổ chức trừu tượng hóa component, giá trị tùy chỉnh và variant đáp ứng mà không lạm dụng @apply.',
      },
      readTimeMinutes: 13,
      sections: [
        {
          id: 'cbp-2-1',
          title: {
            en: 'Avoiding @apply Overuse',
            vi: 'Tránh Lạm Dụng Directive @apply Trong Tailwind',
          },
          keyIdea: {
            en: 'Overusing Tailwind’s @apply directive recreates traditional CSS maintenance pitfalls. Reusability should be achieved through UI component templates (React/Vue/Svelte) rather than CSS class aliases.',
            vi: 'Việc lạm dụng directive @apply trong Tailwind sẽ vô tình mang toàn bộ nhược điểm bảo trì của CSS truyền thống quay lại. Tính tái sử dụng nên được thực hiện thông qua UI component (React/Vue/Svelte) thay vì tạo bí danh class trong CSS.',
          },
          content: {
            en: 'The primary advantage of Utility-First CSS is colocation of styling with HTML structure and elimination of dead CSS bundle growth. When developers wrap dozens of utility classes into custom class names using `@apply`, they reintroduce naming fatigue, CSS file bloat, and specificity hierarchy bugs. The canonical solution is writing direct utility classes in markup and extracting reusable UI components.',
            vi: 'Lợi ích cốt lõi của CSS Utility-First là đặt định dạng ngay cạnh cấu trúc HTML và loại bỏ code CSS thừa không dùng. Khi lập trình viên gom hàng loạt utility class thành các tên class tùy biến bằng `@apply`, họ lại rơi vào bẫy đặt tên, phình to file CSS và lỗi thứ bậc độ ưu tiên. Giải pháp chuẩn mực là viết trực tiếp utility class trong mã markup và tách các UI component tái sử dụng.',
          },
          practiceDetails: {
            context: {
              en: 'Developing scalable component libraries and enterprise design systems using Tailwind CSS or utility-based styling frameworks.',
              vi: 'Phát triển thư viện component và hệ thống thiết kế doanh nghiệp với Tailwind CSS hoặc utility framework.',
            },
            recommendedPractice: {
              en: 'Compose utility classes directly in UI component templates (e.g., `<Button className="...">`) and reserve `@apply` strictly for third-party widget overrides (like markdown typography plugins).',
              vi: 'Kết hợp các utility class trực tiếp trong template component UI (ví dụ: `<Button className="...">`) và chỉ dùng `@apply` trong các trường hợp bắt buộc ghi đè plugin bên thứ ba (như plugin markdown).',
            },
            whyItMatters: {
              en: 'Component-level abstraction retains full tree-shaking, eliminates premature CSS abstraction, and enables instant visual inspections in JSX markup without cross-referencing stylesheet files.',
              vi: 'Trừu tượng hóa ở cấp component giữ trọn vẹn khả năng tree-shaking, loại bỏ việc trừu tượng hóa CSS non nớt và giúp lập trình viên nắm bắt trực quan ngay trong JSX mà không cần tra cứu qua lại nhiều file.',
            },
            goodExample: {
              language: 'tsx',
              filename: 'ButtonComponent.tsx',
              explanation: {
                en: 'Reusable React UI component encapsulating Tailwind utility classes.',
                vi: 'Component React tái sử dụng đóng gói các utility class của Tailwind.',
              },
              code: `// Best Practice: Reusable component encapsulation in template layer
export function Button({ variant = 'primary', children, ...props }) {
  const baseStyles = 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500',
  };

  return (
    <button className={\`\${baseStyles} \${variants[variant]}\`} {...props}>
      {children}
    </button>
  );
}`,
            },
            riskyExample: {
              language: 'css',
              filename: 'overused_apply.css',
              explanation: {
                en: 'Overusing @apply in stylesheet creating unnecessary CSS abstraction layers.',
                vi: 'Lạm dụng @apply trong stylesheet tạo thêm các tầng trừu tượng CSS không cần thiết.',
              },
              code: `/* RISKY: Re-creating custom class naming debt with @apply */
.btn-primary-custom {
  @apply inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700;
}

.btn-secondary-custom {
  @apply inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-slate-100 text-slate-900 hover:bg-slate-200;
}`,
            },
            tradeOffs: {
              en: [
                'HTML class verbosity: Utility classes result in longer className strings in JSX.',
                'Component reliance: Requires a modern UI component architecture (React, Vue, Web Components).',
              ],
              vi: [
                'Độ dài class trong HTML: Các utility class khiến chuỗi className trong JSX dài hơn.',
                'Phụ thuộc mô hình component: Đòi hỏi kiến trúc component hiện đại (React, Vue, Web Components).',
              ],
            },
            checklist: {
              en: [
                'UI styling is encapsulated in reusable component files rather than custom CSS classes',
                '@apply is strictly minimized and not used for standard button/card definitions',
                'Color and spacing tokens stay aligned with Tailwind theme configuration',
              ],
              vi: [
                'Định dạng UI được đóng gói trong file component tái sử dụng thay vì tạo class CSS tùy biến',
                'Directive @apply được hạn chế tối đa và không dùng cho các định nghĩa button/card thông thường',
                'Các token màu sắc và khoảng cách đồng bộ chuẩn xác với cấu hình theme trong Tailwind',
              ],
            },
          },
        },
      ],
    },
  ],
};
