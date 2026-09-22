import { Book } from '../../types';

export const CSS_HANDBOOK_BOOK: Book = {
  id: 'css-handbook',
  slug: 'css-handbook',
  title: 'CSS Handbook',
  subtitle: {
    en: 'The Modern Cascade, Cascade Layers (@layer), Specificity, Box Model & Modern Layout Systems',
    vi: 'Cơ Chế Cascade Hiện Đại, Cascade Layers (@layer), Specificity, Box Model & Hệ Thống Bố Cục',
  },
  bookType: 'Handbook',
  categoryId: 'css',
  subjectId: 'web',
  author: '4TM Technical Board',
  role: 'Core Engineering Group',
  level: 'Foundational to Intermediate',
  estimatedReadTime: '45 mins',
  chaptersCount: 3,
  publishedDate: '2025-02-10',
  accentColor: 'from-blue-500 to-sky-700',
  tags: ['CSS3', 'Cascade', 'Cascade Layers', 'Specificity', 'Flexbox', 'CSS Grid', 'Box Model'],
  description: {
    en: 'Authoritative CSS engineering handbook covering the modern cascade algorithm, cascade layers (@layer), multi-part specificity calculations, the CSS box model, Block Formatting Contexts (BFC), Flexbox, CSS Grid, and GPU-accelerated compositing.',
    vi: 'Cẩm nang kỹ thuật CSS chuẩn mực về thuật toán cascade hiện đại, cascade layers (@layer), cách tính độ ưu tiên specificity nhiều thành phần, mô hình box model, Block Formatting Contexts (BFC), Flexbox, CSS Grid và tăng tốc đồ họa GPU.',
  },
  prerequisites: {
    en: [
      'Basic familiarity with HTML markup structure and selector syntax',
    ],
    vi: [
      'Làm quen cơ bản với cấu trúc mã HTML và cú pháp selector cơ bản',
    ],
  },
  outcomes: {
    en: [
      'Master the 5-step modern CSS Cascade resolution order: Origin, Importance, Cascade Layers (@layer), Specificity, and Source Order',
      'Architect robust layout systems using Block Formatting Contexts, Flexbox 1D alignment, and CSS Grid 2D track definitions',
      'Control stacking contexts, z-index hierarchies, and eliminate layout reflow bottlenecks with GPU-composited CSS transforms',
    ],
    vi: [
      'Làm chủ quy trình 5 bước giải quyết xung đột CSS Cascade hiện đại: Nguồn gốc (Origin), Tầm quan trọng (Importance), Cascade Layers (@layer), Specificity và Thứ tự xuất hiện',
      'Xây dựng hệ thống bố cục vững chắc với Block Formatting Contexts, căn chỉnh Flexbox 1 chiều và lưới CSS Grid 2 chiều',
      'Kiểm soát stacking context, phân cấp z-index và triệt tiêu tắc nghẽn reflow bằng thuộc tính transform tăng tốc GPU',
    ],
  },
  parts: [
    {
      partNumber: 1,
      title: {
        en: 'The Modern Cascade & Specificity Engine',
        vi: 'Thuật Toán Cascade & Engine Tính Điểm Specificity',
      },
      description: {
        en: 'Origin, Importance, Cascade Layers (@layer), Specificity 3-tuple calculation, and Inheritance.',
        vi: 'Nguồn gốc, Tầm quan trọng, Cascade Layers (@layer), Bộ 3 điểm Specificity và Kế thừa.',
      },
      chapterIds: ['css-hb-ch-1'],
    },
    {
      partNumber: 2,
      title: {
        en: 'The Box Model, Formatting Contexts & Layout Engines',
        vi: 'Mô Hình Box Model, Bối Cảnh Định Dạng & Engine Bố Cục',
      },
      description: {
        en: 'box-sizing: border-box, margin collapsing, Block Formatting Contexts (BFC), Flexbox, and CSS Grid.',
        vi: 'box-sizing: border-box, gộp lề margin, Block Formatting Contexts (BFC), Flexbox và CSS Grid.',
      },
      chapterIds: ['css-hb-ch-2'],
    },
    {
      partNumber: 3,
      title: {
        en: 'Positioning, Stacking Contexts & Rendering Performance',
        vi: 'Cơ Chế Định Vị, Stacking Context & Hiệu Năng Render',
      },
      description: {
        en: 'Positioning schemes, z-index stacking triggers, CSS variables, and Reflow vs Repaint vs Composite.',
        vi: 'Các cơ chế position, kích hoạt stacking context z-index, biến CSS và quy trình Reflow vs Repaint.',
      },
      chapterIds: ['css-hb-ch-3'],
    },
  ],
  glossary: [
    {
      term: 'The Cascade',
      vietnameseTerm: 'Quy Tắc Xếp Tầng (The Cascade)',
      category: 'Engine',
      definition: {
        en: 'The algorithm that resolves conflicts when multiple CSS rules target the same property on an element, evaluating Origin & Importance, Cascade Layers, Specificity, and Source Order.',
        vi: 'Thuật toán giải quyết xung đột khi nhiều quy tắc CSS cùng áp dụng lên một thuộc tính của phần tử, đánh giá theo Thứ tự Nguồn & Tầm quan trọng, Cascade Layers, Specificity và Thứ tự xuất hiện.',
      },
      relatedChapter: 1,
    },
    {
      term: 'Cascade Layer (@layer)',
      vietnameseTerm: 'Tầng Xếp Chồng (@layer)',
      category: 'Architecture',
      definition: {
        en: 'A modern CSS feature allowing developers to explicitly declare the priority order of style blocks (e.g. reset, framework, custom), where layer order takes precedence over internal specificity.',
        vi: 'Tính năng CSS hiện đại cho phép khai báo rõ ràng thứ tự ưu tiên của các khối style (như reset, framework, custom), trong đó thứ tự tầng được ưu tiên trước độ specificity bên trong.',
      },
      relatedChapter: 1,
    },
    {
      term: 'Specificity',
      vietnameseTerm: 'Độ Ưu Tiên Specificity',
      category: 'Engine',
      definition: {
        en: 'A weight vector (A, B, C) calculated from the selector composition: (ID selectors, Class/Attribute/Pseudo-classes, Elements/Pseudo-elements), evaluated within the same cascade layer.',
        vi: 'Vectơ trọng số (A, B, C) tính từ thành phần selector: (ID selector, Class/Thuộc tính/Pseudo-class, Element/Pseudo-element), được so sánh trong cùng một tầng cascade layer.',
      },
      relatedChapter: 1,
    },
    {
      term: 'Block Formatting Context (BFC)',
      vietnameseTerm: 'Bối Cảnh Định Dạng Khối (BFC)',
      category: 'Layout',
      definition: {
        en: 'An isolated rendering region of the page in which block boxes are laid out, preventing margin collapsing with external siblings and containing internal floated elements.',
        vi: 'Khu vực dựng hình độc lập trên trang, nơi các hộp khối được bố trí, ngăn chặn gộp lề margin với phần tử bên ngoài và bao bọc hoàn toàn các phần tử float bên trong.',
      },
      relatedChapter: 2,
    },
    {
      term: 'Stacking Context',
      vietnameseTerm: 'Bối Cảnh Xếp Lớp (Stacking Context)',
      category: 'Rendering',
      definition: {
        en: 'A three-dimensional conceptual grouping of elements along the Z-axis (depth toward the user), isolating internal z-index values from the rest of the document.',
        vi: 'Nhóm cấu trúc 3 chiều của các phần tử dọc theo trục Z (chiều sâu hướng tới người nhìn), cô lập giá trị z-index bên trong với phần còn lại của tài liệu.',
      },
      relatedChapter: 3,
    },
    {
      term: 'Box-Sizing: Border-Box',
      vietnameseTerm: 'Mô Hình Khung Border-Box',
      category: 'Layout',
      definition: {
        en: 'A box-sizing model where declared width and height encompass the element content, padding, and border, eliminating unexpected layout expansion.',
        vi: 'Mô hình kích thước hộp mà trong đó chiều rộng và chiều cao khai báo đã bao gồm cả nội dung, padding và border, triệt tiêu lỗi phình to kích thước.',
      },
      relatedChapter: 2,
    },
    {
      term: 'Reflow (Layout Shift)',
      vietnameseTerm: 'Tái Tính Toán Bố Cục (Reflow)',
      category: 'Performance',
      definition: {
        en: 'The browser rendering pipeline phase that recalculates physical geometry and screen positions for elements, triggered by mutations to width, height, margin, or font-size.',
        vi: 'Giai đoạn trong chu trình render khi trình duyệt phải tính toán lại hình học và vị trí màn hình của các phần tử, kích hoạt khi thay đổi width, height, margin hoặc font-size.',
      },
      relatedChapter: 3,
    },
    {
      term: 'CSS Custom Properties (Variables)',
      vietnameseTerm: 'Biến CSS (Custom Properties)',
      category: 'Syntax',
      definition: {
        en: 'Dynamic variables declared with the --prefix syntax (e.g. --brand-color) that cascade down the DOM tree and can be read or mutated at runtime via var() and JavaScript.',
        vi: 'Các biến động khai báo với cú pháp tiền tố -- (như --brand-color) kế thừa dọc theo cây DOM và có thể đọc hoặc gán lại khi chạy bằng var() và JavaScript.',
      },
      relatedChapter: 3,
    },
  ],
  furtherReading: [
    {
      title: 'CSS Cascading and Inheritance Level 5',
      author: 'W3C CSS Working Group',
      year: '2024',
      description: {
        en: 'The official W3C specification defining the modern cascade order, cascade layers (@layer), and specificity sorting rules.',
        vi: 'Đặc tả W3C chính thức quy định thứ tự cascade hiện đại, cascade layers (@layer) và quy tắc sắp xếp độ ưu tiên specificity.',
      },
    },
    {
      title: 'CSS Box Model Module Level 3',
      author: 'W3C CSS Working Group',
      year: '2023',
      description: {
        en: 'Canonical specification governing margins, borders, padding, box-sizing, and flow geometry.',
        vi: 'Đặc tả tiêu chuẩn quy định margin, border, padding, mô hình box-sizing và hình học dòng chảy.',
      },
    },
    {
      title: 'CSS Grid Layout Module Level 2',
      author: 'W3C CSS Working Group',
      year: '2024',
      description: {
        en: 'Detailed technical specification for two-dimensional grid layouts and subgrid alignment.',
        vi: 'Đặc tả kỹ thuật chi tiết cho bố cục lưới 2 chiều và căn chỉnh lưới con (subgrid).',
      },
    },
    {
      title: 'CSS in Depth',
      author: 'Keith J. Grant',
      year: '2018',
      description: {
        en: 'Comprehensive architectural guide to mastering the cascade, modular design, layout engines, and browser rendering pipelines.',
        vi: 'Cẩm nang kiến trúc toàn diện làm chủ cơ chế cascade, thiết kế module, engine bố cục và đường ống render của trình duyệt.',
      },
    },
  ],
  chapters: [
    {
      id: 'css-hb-ch-1',
      number: 1,
      slug: 'cascade-and-specificity',
      title: {
        en: 'The Modern Cascade, Cascade Layers (@layer) & Specificity',
        vi: 'Cơ Chế Cascade Hiện Đại, Cascade Layers (@layer) & Specificity',
      },
      summary: {
        en: 'Origin and Importance, Cascade Layers (@layer), 3-tuple Specificity calculation (ID, Class/Attribute/Pseudo-class, Element/Pseudo-element), and Source Order.',
        vi: 'Nguồn và Tầm quan trọng, Tầng Cascade (@layer), Cách tính điểm Specificity bộ 3 số và Thứ tự xuất hiện trong mã.',
      },
      readTimeMinutes: 16,
      sections: [
        {
          id: 'css-hb-1-1',
          title: {
            en: 'The 5-Step Cascade Resolution Order',
            vi: 'Quy Trình 5 Bước Giải Quyết Xung Đột Trong CSS Cascade',
          },
          keyIdea: {
            en: 'The Cascade evaluates rules in strict order: 1. Origin & Importance, 2. Context (Shadow DOM), 3. Cascade Layers (@layer), 4. Specificity, and 5. Source Order. A higher layer or higher origin always beats internal selector specificity.',
            vi: 'Thuật toán Cascade đánh giá quy tắc theo thứ tự nghiêm ngặt: 1. Nguồn & Tầm quan trọng, 2. Ngữ cảnh (Shadow DOM), 3. Cascade Layers (@layer), 4. Specificity, và 5. Thứ tự xuất hiện. Tầng cao hơn luôn thắng độ specificity bên trong tầng thấp hơn.',
          },
          content: {
            en: 'When multiple conflicting declarations match the same element property, CSS runs the **Cascade Algorithm**. First, it evaluates **Origin & Importance** (User Agent, User, and Author styles, modified by `!important`). Second, it evaluates **Cascade Layers (`@layer`)**: un-layered author styles always override layered author styles, and later declared layers override earlier declared layers (with the order completely inverted for `!important` declarations). Third, within the winning layer, it computes **Specificity**: a 3-component score `(A, B, C)` where A = ID count, B = Class / Attribute / Pseudo-class count, and C = Element / Pseudo-element count. Inline styles act as an explicit override above selector specificity. Fourth, if specificity is equal, **Source Order** awards victory to the rule declared latest in the stylesheet.',
            vi: 'Khi nhiều khai báo CSS xung đột cùng trỏ vào một thuộc tính của phần tử, CSS sẽ thực thi **Thuật Toán Cascade**. Bước 1, nó đánh giá **Nguồn & Tầm quan trọng (Origin & Importance)** (gồm User Agent mặc định, cấu hình Người dùng và Author CSS của lập trình viên, kèm cờ `!important`). Bước 2, nó đánh giá **Cascade Layers (`@layer`)**: các style tự do không thuộc layer luôn ghi đè style nằm trong layer, và layer khai báo sau sẽ ghi đè layer khai báo trước (thứ tự này bị đảo ngược hoàn toàn đối với các khai báo có `!important`). Bước 3, trong cùng một layer chiến thắng, nó so sánh điểm **Specificity**: một bộ 3 số `(A, B, C)` với A = số lượng ID, B = số lượng Class/Thuộc tính/Pseudo-class, và C = số lượng Thẻ/Pseudo-element. Style viết trực tiếp inline là cấp độ ghi đè cao hơn selector. Bước 4, nếu điểm specificity bằng nhau, **Thứ tự xuất hiện (Source Order)** sẽ trao phần thắng cho quy tắc được viết sau cùng.',
          },
          codeBlock: {
            language: 'css',
            filename: 'modern_cascade.css',
            explanation: {
              en: 'Demonstrating Cascade Layers (@layer) overriding high-specificity internal rules.',
              vi: 'Minh họa cách Cascade Layers (@layer) ghi đè các quy tắc có specificity cao bên trong.',
            },
            code: `/* 1. Explicit Layer Order Declaration */
@layer reset, framework, components, utilities;

@layer framework {
  /* High Specificity (1, 1, 0) inside framework layer */
  #navigation ul.menu li.active {
    color: red;
    padding: 16px;
  }
}

@layer utilities {
  /* Low Specificity (0, 1, 0) inside utilities layer */
  /* WINS because @layer utilities comes AFTER @layer framework! */
  .text-brand-blue {
    color: #0284c7;
  }
}

/* 2. Specificity Score Breakdown (A, B, C) */
/* Score: (1, 0, 0) */
#hero-header { font-size: 2.5rem; }

/* Score: (0, 2, 1) - Loses to ID above */
header.site-header .nav-link { font-size: 1.25rem; }`,
          },
          diagram: {
            title: {
              en: 'Modern Cascade Evaluation Hierarchy',
              vi: 'Sơ Đồ Phân Cấp Đánh Giá Của Thuật Toán Modern Cascade',
            },
            steps: [
              {
                stepNumber: 1,
                title: { en: 'Origin & Importance', vi: 'Nguồn & Tầm Quan Trọng' },
                description: {
                  en: 'Evaluates Author !important > Layered Author !important > Author normal > UA defaults.',
                  vi: 'Đánh giá Author !important > Layered Author !important > Author thông thường > Mặc định trình duyệt.',
                },
              },
              {
                stepNumber: 2,
                title: { en: 'Cascade Layers (@layer)', vi: 'Tầng Xếp Chồng (@layer)' },
                description: {
                  en: 'Un-layered author styles win over layered styles. Later declared layers win over earlier layers.',
                  vi: 'Style ngoài layer thắng style trong layer. Layer khai báo sau thắng layer khai báo trước.',
                },
              },
              {
                stepNumber: 3,
                title: { en: 'Inline Styles', vi: 'Style Viết Trực Tiếp Inline' },
                description: {
                  en: 'style="..." attributes on elements override external stylesheet selectors.',
                  vi: 'Thuộc tính style="..." viết trực tiếp trên phần tử HTML ghi đè các selector bên ngoài.',
                },
              },
              {
                stepNumber: 4,
                title: { en: 'Specificity Tuple (A, B, C)', vi: 'Bộ 3 Điểm Specificity (A, B, C)' },
                description: {
                  en: 'Compares ID count (A), Class/Attr/Pseudo-class count (B), and Element count (C) from left to right.',
                  vi: 'So sánh số lượng ID (A), số lượng Class/Attr (B) và số lượng Thẻ (C) lần lượt từ trái qua phải.',
                },
              },
              {
                stepNumber: 5,
                title: { en: 'Source Order', vi: 'Thứ Tự Xuất Hiện Trong File' },
                description: {
                  en: 'If all preceding criteria are identical, the rule declared latest in stylesheet order wins.',
                  vi: 'Nếu mọi tiêu chí trên bằng nhau, quy tắc được viết sau cùng trong stylesheet sẽ chiến thắng.',
                },
              },
            ],
          },
          comparisonTable: {
            headers: [
              { en: 'Selector / Syntax', vi: 'Selector / Cú Pháp' },
              { en: 'Specificity Vector (A, B, C)', vi: 'Vectơ Specificity (A, B, C)' },
              { en: 'Category Classification', vi: 'Phân Loại Thành Phần' },
            ],
            rows: [
              {
                en: ['#sidebar-main', '(1, 0, 0)', 'Single ID selector'],
                vi: ['#sidebar-main', '(1, 0, 0)', 'Một ID selector duy nhất'],
              },
              {
                en: ['nav.menu ul li a:hover', '(0, 2, 4)', '2 classes/pseudo-classes (.menu, :hover) + 4 elements'],
                vi: ['nav.menu ul li a:hover', '(0, 2, 4)', '2 class/pseudo-class (.menu, :hover) + 4 thẻ element'],
              },
              {
                en: ['input[type="email"]:focus', '(0, 2, 1)', '1 element (input) + 1 attribute + 1 pseudo-class'],
                vi: ['input[type="email"]:focus', '(0, 2, 1)', '1 thẻ (input) + 1 thuộc tính [type] + 1 pseudo-class :focus'],
              },
              {
                en: [':is(#header, .banner)', 'Highest inside matches', ':is() takes specificity of its most specific argument'],
                vi: [':is(#header, .banner)', 'Lấy điểm nhánh cao nhất', ':is() nhận điểm của selector con có specificity cao nhất'],
              },
              {
                en: [':where(#header, .banner)', '(0, 0, 0)', ':where() always forces specificity to absolute zero'],
                vi: [':where(#header, .banner)', '(0, 0, 0)', ':where() luôn luôn triệt tiêu điểm specificity về 0 tuyệt đối'],
              },
            ],
          },
        },
      ],
    },
    {
      id: 'css-hb-ch-2',
      number: 2,
      slug: 'box-model-and-positioning',
      title: {
        en: 'The Box Model, Formatting Contexts & Modern Layout',
        vi: 'Mô Hình Box Model, Bối Cảnh Định Dạng & Layout Hiện Đại',
      },
      summary: {
        en: 'box-sizing: border-box reset, margin collapsing mechanics, Block Formatting Contexts (BFC), Flexbox 1D, and CSS Grid 2D.',
        vi: 'Reset box-sizing: border-box, cơ chế gộp lề margin, Block Formatting Contexts (BFC), Flexbox 1D và CSS Grid 2D.',
      },
      readTimeMinutes: 15,
      sections: [
        {
          id: 'css-hb-2-1',
          title: {
            en: 'The Modern Box Model & Block Formatting Contexts (BFC)',
            vi: 'Mô Hình Box Model & Block Formatting Context (BFC)',
          },
          keyIdea: {
            en: 'Universal box-sizing: border-box eliminates layout calculation bugs, while display: flow-root creates a clean Block Formatting Context that encapsulates internal floats and stops margin collapse.',
            vi: 'Reset box-sizing: border-box toàn cục loại bỏ lỗi tính kích thước, trong khi display: flow-root tạo một BFC độc lập bao bọc float và chặn gộp lề margin.',
          },
          content: {
            en: 'In the default CSS box model (`box-sizing: content-box`), padding and border are added onto the declared width and height, causing unexpected element overflow. Modern architecture sets `box-sizing: border-box` universally so that padding and border are absorbed inside the dimensions. Vertical margins between adjacent block elements undergo **Margin Collapsing**, combining into a single margin equal to the largest value. Margin collapsing can be cleanly halted by establishing a **Block Formatting Context (BFC)** on the container using `display: flow-root` (modern standard) or `overflow: hidden`.',
            vi: 'Trong mô hình box model mặc định (`box-sizing: content-box`), padding và border bị cộng thêm vào bên ngoài chiều rộng và chiều cao khai báo, gây tràn khung bất ngờ. Kiến trúc hiện đại luôn reset `box-sizing: border-box` toàn cục để padding và border được tính vào bên trong kích thước. Các khoảng lề dọc giữa hai phần tử khối liền kề sẽ diễn ra hiện tượng **Gộp Lề (Margin Collapsing)**, chỉ giữ lại khoảng lề có giá trị lớn nhất. Hiện tượng này có thể được chặn đứng hoàn toàn bằng cách kích hoạt một **Block Formatting Context (BFC)** trên container thông qua `display: flow-root` (chuẩn hiện đại) hoặc `overflow: hidden`.',
          },
          codeBlock: {
            language: 'css',
            filename: 'box_model_and_bfc.css',
            explanation: {
              en: 'Universal border-box reset and establishing a clean Block Formatting Context with display: flow-root.',
              vi: 'Reset border-box toàn cục và kích hoạt BFC chuẩn với display: flow-root.',
            },
            code: `/* 1. Universal Box-Sizing Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* 2. Modern BFC Container (Stops margin collapse & contains floats) */
.card-container {
  display: flow-root; /* Standard modern BFC trigger */
  background-color: #f8fafc;
  padding: 24px;
  border-radius: 12px;
}

/* 3. Modern Layout: Flexbox vs Grid */
.flex-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.grid-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}`,
          },
        },
      ],
    },
    {
      id: 'css-hb-ch-3',
      number: 3,
      slug: 'flexbox-and-grid-layouts',
      title: {
        en: 'Positioning, Stacking Contexts & GPU Rendering',
        vi: 'Cơ Chế Định Vị, Stacking Context & Render Tăng Tốc GPU',
      },
      summary: {
        en: 'Positioning schemes (relative, absolute, fixed, sticky), Stacking Contexts, z-index isolation, and Reflow vs Repaint vs Composite.',
        vi: 'Các cơ chế position (relative, absolute, fixed, sticky), Stacking Context, cô lập z-index và chu trình Reflow vs Repaint.',
      },
      readTimeMinutes: 14,
      sections: [
        {
          id: 'css-hb-3-1',
          title: {
            en: 'Stacking Contexts & Browser Rendering Pipeline',
            vi: 'Cơ Chế Stacking Context & Chu Trình Render Trình Duyệt',
          },
          keyIdea: {
            en: 'A Stacking Context isolates internal z-index layers from external siblings, and GPU-composited properties (transform, opacity) prevent expensive main-thread layout reflows.',
            vi: 'Stacking Context cô lập các lớp z-index bên trong với các phần tử ngang hàng bên ngoài, và các thuộc tính tăng tốc GPU (transform, opacity) tránh gây tái tính toán bố cục reflow.',
          },
          content: {
            en: 'A **Stacking Context** is an isolated 3D rendering layer on the Z-axis. It is triggered by elements with `position: relative/absolute` with a numeric `z-index`, `position: fixed/sticky`, `opacity < 1`, `transform`, `filter`, or `isolation: isolate`. Children within a stacking context can never display behind or in front of an external element whose stacking context has a higher or lower priority. For high-performance animations (60/120fps), developers must animate only composite-stage properties (`transform: translate3d()` and `opacity`), completely avoiding `top`, `left`, `width`, or `height` mutations that trigger full CPU reflows and repaints.',
            vi: '**Stacking Context** là một lớp dựng hình 3D độc lập dọc theo trục Z. Nó được kích hoạt bởi các phần tử có `position: relative/absolute` kèm `z-index` dạng số, `position: fixed/sticky`, `opacity < 1`, `transform`, `filter` hoặc `isolation: isolate`. Các phần tử con nằm trong một stacking context không bao giờ có thể hiển thị đè lên hoặc chìm dưới một phần tử bên ngoài có stacking context ưu tiên hơn. Để tối ưu hiệu năng diễn hoạt (60/120fps), lập trình viên bắt buộc chỉ nên animate các thuộc tính ở tầng composite (`transform: translate3d()` và `opacity`), tránh tuyệt đối thay đổi `top`, `left`, `width` hoặc `height` vì chúng gây tái tính toán bố cục CPU (Reflow) và vẽ lại điểm ảnh (Repaint).',
          },
          codeBlock: {
            language: 'css',
            filename: 'stacking_and_performance.css',
            explanation: {
              en: 'Stacking context isolation using isolation: isolate and GPU-composited animations.',
              vi: 'Cô lập stacking context bằng isolation: isolate và diễn hoạt mượt mà với GPU.',
            },
            code: `/* 1. Explicit Stacking Context Isolation */
.modal-overlay {
  position: fixed;
  inset: 0;
  isolation: isolate; /* Creates clean stacking context boundary */
  z-index: 1000;
}

/* 2. High-Performance GPU Composited Animation (Zero Reflow) */
.drawer-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  height: 100vh;
  transform: translateX(100%);
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.drawer-panel.is-open {
  transform: translateX(0); /* GPU Layer Accelerated */
}`,
          },
        },
      ],
    },
  ],
};
