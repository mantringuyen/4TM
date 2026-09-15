import fs from 'fs';
import path from 'path';

function saveLesson(filePath: string, varName: string, lessonObj: any) {
  const content = `import { Lesson } from '../../../../types';\n\nexport const ${varName}: Lesson = ${JSON.stringify(lessonObj, null, 2)};\n`;
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Saved: ${filePath}`);
}

// Lesson 22: Cascade Layers (@layer) & CSS Architecture
const lesson22 = {
  id: "css_lesson_22",
  moduleId: "css_mod_adv_1",
  levelId: "advanced",
  courseId: "css",
  order: 4,
  topicId: "css_cascade_layers",
  title: {
    en: "Cascade Layers (@layer) & Enterprise CSS Architecture",
    vi: "Tầng Xếp Chồng @layer & Kiến Trúc CSS Doanh Nghiệp"
  },
  summary: {
    en: "Master @layer ordering, unlayered vs layered precedence, specificity isolation across teams/design systems, and large-scale architecture.",
    vi: "Làm chủ thứ tự @layer, độ ưu tiên giữa code có layer và không layer, cô lập độ ưu tiên trong dự án lớn và kiến trúc design system chuẩn doanh nghiệp."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "Cascade Layers (`@layer`) provide explicit control over CSS cascade precedence independently of selector specificity. Instead of specificity wars and `!important` hacks, layers allow structuring stylesheets into predictable tiers (reset, base, components, utilities).",
      vi: "Tầng xếp chồng Cascade Layers (`@layer`) mang lại quyền kiểm soát thứ tự ưu tiên của CSS hoàn toàn độc lập với độ ưu tiên của bộ chọn (specificity). Thay vì rơi vào 'cuộc chiến specificity' và lạm dụng `!important`, `@layer` giúp phân chia mã CSS thành các tầng rõ ràng (reset, base, components, utilities)."
    },
    conceptExplanation: {
      en: "Define layer precedence upfront with `@layer reset, base, components, utilities;`. In regular CSS rules, **later layers win over earlier layers regardless of how specific the selector is** (e.g. a simple `.btn` in `utilities` easily beats `#header nav a.btn` in `components`). Unlayered styles always have higher precedence than layered styles. Crucially, with `!important`, the layer precedence reverses: an earlier layer's `!important` rule overrides a later layer's `!important` rule.",
      vi: "Định nghĩa thứ tự ưu tiên ngay từ đầu bằng câu lệnh `@layer reset, base, components, utilities;`. Đối với các quy tắc thông thường, **layer khai báo sau luôn thắng layer khai báo trước bất kể bộ chọn có phức tạp đến đâu** (ví dụ class đơn giản `.btn` trong layer `utilities` dễ dàng ghi đè bộ chọn `#header nav a.btn` trong layer `components`). Mã CSS không có layer (unlayered) luôn có độ ưu tiên cao hơn mã nằm trong layer. Đặc biệt, với cờ `!important`, thứ tự ưu tiên sẽ bị đảo ngược: `!important` của layer khai báo trước sẽ thắng `!important` của layer sau."
    },
    syntax: `/* Declare layer hierarchy upfront */\n@layer reset, theme, components, utilities;\n\n@layer reset {\n  * { box-sizing: border-box; margin: 0; }\n}\n\n@layer components {\n  .btn {\n    background: #3b82f6;\n    color: white;\n    padding: 8px 16px;\n  }\n}\n\n@layer utilities {\n  .bg-danger { background: #ef4444; } /* Overrides .btn easily! */\n}`,
    examples: [
      {
        title: {
          en: "Third-Party Library Specificity Isolation",
          vi: "Cô Lập Độ Ưu Tiên Của Thư Viện Bên Thứ Ba Bằng @layer"
        },
        description: {
          en: "Wraps an external component library in a low-priority layer so local styles override it without !important.",
          vi: "Bọc thư viện bên ngoài vào một layer ưu tiên thấp để code dự án dễ dàng tùy biến mà không cần dùng !important."
        },
        code: `@layer vendor, app;\n\n@import "bootstrap.css" layer(vendor);\n\n@layer app {\n  /* Easily overrides vendor styles */\n  .card {\n    border-radius: 16px;\n  }\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Thinking higher selector specificity within an earlier layer can override a rule in a later layer.",
          vi: "Nghĩ rằng bộ chọn có độ ưu tiên cao trong layer đứng trước có thể đè bẹp quy tắc trong layer đứng sau."
        },
        correction: {
          en: "Layer order strictly overrides selector specificity. A later layer always wins over an earlier layer for normal styles.",
          vi: "Thứ tự layer đứng trên độ ưu tiên của bộ chọn. Layer sau luôn thắng layer trước đối với quy tắc thông thường."
        }
      }
    ],
    tips: [
      {
        en: "Always establish your full layer order at the very top of your root CSS file: @layer reset, base, components, utilities;",
        vi: "Luôn khai báo danh sách thứ tự layer ở dòng đầu tiên của file CSS gốc: @layer reset, base, components, utilities;"
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_22_1",
      type: "complete_code",
      title: {
        en: "Define Cascade Layer Hierarchy",
        vi: "Khai Báo Thứ Tự Ưu Tiên Các Tầng Cascade Layer"
      },
      instruction: {
        en: "Write an upfront declaration defining three layers in order: reset, components, utilities.",
        vi: "Viết câu lệnh khai báo thứ tự 3 layer từ thấp đến cao: reset, components, utilities."
      },
      starterCode: `/* Declare layer order: reset, components, utilities */`,
      solutionCode: `@layer reset, components, utilities;`,
      hint: {
        en: "Use @layer reset, components, utilities;",
        vi: "Dùng @layer reset, components, utilities;"
      },
      explanation: {
        en: "Declaring layer order upfront guarantees utilities layer has the highest precedence.",
        vi: "Khai báo thứ tự layer ngay từ đầu đảm bảo layer utilities luôn có độ ưu tiên cao nhất."
      }
    },
    {
      id: "css_ex_22_2",
      type: "fix_code",
      title: {
        en: "Wrap CSS Reset in a Reset Layer",
        vi: "Đưa Đoạn Mã CSS Reset Vào Layer Reset"
      },
      instruction: {
        en: "Wrap the universal box-sizing rule inside @layer reset { ... }.",
        vi: "Bọc quy tắc box-sizing vào bên trong @layer reset { ... }."
      },
      starterCode: `* {\n  box-sizing: border-box;\n}`,
      solutionCode: `@layer reset {\n  * {\n    box-sizing: border-box;\n  }\n}`,
      hint: {
        en: "Use @layer reset { * { box-sizing: border-box; } }",
        vi: "Dùng @layer reset { * { box-sizing: border-box; } }"
      },
      explanation: {
        en: "Putting resets inside @layer reset ensures base styles never accidentally override component rules.",
        vi: "Đưa reset vào @layer reset đảm bảo kiểu dáng cơ bản không bao giờ vô tình ghi đè component."
      }
    }
  ],
  challenge: {
    id: "css_ch_22",
    title: {
      en: "Build an Enterprise Multi-Layer Design Architecture",
      vi: "Xây Dựng Kiến Trúc Đa Tầng Design System Chuẩn Doanh Nghiệp"
    },
    description: {
      en: "Declare @layer base, components, utilities; at the top. In @layer components, create .badge with background: #64748b and color: white. In @layer utilities, create .badge-success with background: #22c55e.",
      vi: "Khai báo @layer base, components, utilities; ở đầu. Trong @layer components, tạo .badge với background: #64748b và color: white. Trong @layer utilities, tạo .badge-success với background: #22c55e."
    },
    requirements: [
      { en: "@layer base, components, utilities;", vi: "@layer base, components, utilities;" },
      { en: "@layer components { .badge { background: #64748b; color: white; } }", vi: "@layer components { .badge { background: #64748b; color: white; } }" },
      { en: "@layer utilities { .badge-success { background: #22c55e; } }", vi: "@layer utilities { .badge-success { background: #22c55e; } }" }
    ],
    starterCode: `/* Declare layers and assign styles */`,
    solutionCode: `@layer base, components, utilities;\n\n@layer components {\n  .badge {\n    background: #64748b;\n    color: white;\n  }\n}\n\n@layer utilities {\n  .badge-success {\n    background: #22c55e;\n  }\n}`,
    hints: [
      {
        en: "Declare the layer sequence first, then write @layer components and @layer utilities blocks.",
        vi: "Khai báo chuỗi thứ tự layer trước, sau đó viết các khối @layer components và @layer utilities."
      }
    ],
    solutionExplanation: {
      en: "The utility layer overrides the component layer seamlessly without needing higher selector specificity.",
      vi: "Layer tiện ích ghi đè layer component một cách tự nhiên mà không cần viết bộ chọn phức tạp."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_22_1",
      type: "single_choice",
      question: {
        en: "Given `@layer reset, theme, components, utilities;`, which normal layer wins when styling conflicts arise?",
        vi: "Với khai báo `@layer reset, theme, components, utilities;`, layer nào sẽ giành chiến thắng đối với các quy tắc thông thường?"
      },
      options: [
        { en: "`utilities` (The layer declared last has the highest precedence)", vi: "`utilities` (Layer khai báo sau cùng luôn có độ ưu tiên cao nhất)" },
        { en: "`reset`", vi: "`reset`" },
        { en: "Whichever rule has the most classes", vi: "Quy tắc nào có nhiều class hơn" },
        { en: "Random", vi: "Ngẫu nhiên" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "For normal declarations, layer order determines precedence: later layers override earlier layers.",
        vi: "Với các quy tắc thông thường, layer khai báo sau cùng luôn thắng layer khai báo trước."
      },
      topicId: "css_cascade_layers",
      difficulty: "easy"
    },
    {
      id: "css_q_22_2",
      type: "single_choice",
      question: {
        en: "How do unlayered CSS rules (styles outside of any `@layer`) compare in precedence against layered CSS rules?",
        vi: "Các quy tắc CSS không nằm trong layer (unlayered) có độ ưu tiên như thế nào so với CSS nằm trong layer?"
      },
      options: [
        { en: "Unlayered CSS rules ALWAYS have higher precedence than all layered CSS rules", vi: "CSS không nằm trong layer LUÔN CÓ độ ưu tiên cao hơn tất cả các quy tắc nằm trong layer" },
        { en: "Layered CSS rules always win", vi: "CSS trong layer luôn thắng" },
        { en: "They have equal weight", vi: "Chúng có trọng số bằng nhau" },
        { en: "Unlayered CSS is ignored", vi: "CSS không có layer bị bỏ qua" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Styles declared outside of layers have the highest normal precedence, making them easy for ad-hoc application overrides.",
        vi: "Mã CSS viết ngoài layer có độ ưu tiên cao nhất, giúp người dùng dễ dàng ghi đè toàn bộ các layer thư viện."
      },
      topicId: "css_cascade_layers",
      difficulty: "medium"
    },
    {
      id: "css_q_22_3",
      type: "single_choice",
      question: {
        en: "How does the `!important` keyword behave across Cascade Layers?",
        vi: "Từ khóa `!important` hoạt động như thế nào giữa các tầng Cascade Layers?"
      },
      options: [
        { en: "The precedence is inverted: an `!important` rule in an EARLIER layer overrides an `!important` rule in a later layer", vi: "Thứ tự ưu tiên bị đảo ngược: `!important` trong layer KHAI BÁO TRƯỚC sẽ ghi đè `!important` của layer sau" },
        { en: "It breaks the build", vi: "Nó làm lỗi quá trình build" },
        { en: "It behaves the same as normal rules", vi: "Nó hoạt động y hệt quy tắc thông thường" },
        { en: "`!important` is forbidden inside layers", vi: "`!important` bị cấm dùng trong layer" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "The CSS Cascade specification intentionally inverts layer priority for `!important` declarations to allow base resets to protect vital styles.",
        vi: "Đặc tả CSS Cascade cố tình đảo ngược thứ tự ưu tiên cho `!important` để các layer nền tảng (như reset) có thể bảo vệ kiểu dáng cốt lõi."
      },
      topicId: "css_cascade_layers",
      difficulty: "hard"
    },
    {
      id: "css_q_22_4",
      type: "true_false",
      question: {
        en: "True or False: Nested cascade layers can be created using dot notation like `@layer components.buttons { ... }`.",
        vi: "Đúng hay Sai: Các tầng layer lồng nhau có thể được tạo bằng cú pháp dấu chấm như `@layer components.buttons { ... }`."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Cascade Layers support nested hierarchies either by nesting `@layer` blocks or using dot notation.",
        vi: "Cascade Layers hỗ trợ phân cấp đa tầng bằng cách lồng khối hoặc dùng cú pháp dấu chấm `components.buttons`."
      },
      topicId: "css_cascade_layers",
      difficulty: "medium"
    },
    {
      id: "css_q_22_5",
      type: "single_choice",
      question: {
        en: "How can an external CSS file be imported directly into a named layer?",
        vi: "Làm thế nào để import một file CSS bên ngoài trực tiếp vào một layer đã đặt tên?"
      },
      options: [
        { en: "`@import \"framework.css\" layer(vendor);`", vi: "`@import \"framework.css\" layer(vendor);`" },
        { en: "`@layer import \"framework.css\" vendor;`", vi: "`@layer import \"framework.css\" vendor;`" },
        { en: "`@import-layer(vendor) \"framework.css\";`", vi: "`@import-layer(vendor) \"framework.css\";`" },
        { en: "`<link rel=\"stylesheet\" layer=\"vendor\">`", vi: "`<link rel=\"stylesheet\" layer=\"vendor\">`" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "The CSS `@import` at-rule accepts `layer(<name>)` to assign imported stylesheets into a specific cascade tier.",
        vi: "Cú pháp `@import` nhận hàm `layer(<tên>)` để đưa toàn bộ file ngoại vi vào đúng tầng phân cấp mong muốn."
      },
      topicId: "css_cascade_layers",
      difficulty: "medium"
    },
    {
      id: "css_q_22_6",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: The CSS at-rule used to define Cascade Layers is @________",
        vi: "Điền vào chỗ trống: Cú pháp CSS at-rule dùng để khai báo tầng Cascade Layers là @________"
      },
      fillBlankAnswers: ["layer"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: "@layer creates explicit cascade precedence.",
        vi: "@layer tạo ra các tầng phân cấp độ ưu tiên rõ ràng."
      },
      topicId: "css_cascade_layers",
      difficulty: "easy"
    },
    {
      id: "css_q_22_7",
      type: "multiple_choice",
      question: {
        en: "Which problems do Cascade Layers effectively solve in enterprise frontend codebases? (Select all that apply)",
        vi: "Những vấn đề nào sau đây được Cascade Layers giải quyết triệt để trong các dự án quy mô lớn? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "Eliminating specificity wars where developers write deep nested selectors like `#header nav ul li a`", vi: "Chấm dứt cuộc chiến specificity khi lập trình viên phải viết các bộ chọn dài dòng như `#header nav ul li a`" },
        { en: "Allowing utility classes to reliably override component styles regardless of order in file", vi: "Đảm bảo các class tiện ích luôn ghi đè component một cách đáng tin cậy mà không phụ thuộc thứ tự nạp file" },
        { en: "Taming third-party library CSS specificity conflicts", vi: "Kiểm soát và cô lập các xung đột độ ưu tiên từ thư viện bên ngoài" },
        { en: "Compressing images automatically", vi: "Tự động nén hình ảnh" }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: "Cascade Layers provide architectural governance over stylesheet priority without artificial specificity inflation.",
        vi: "Cascade Layers mang lại khả năng quản trị kiến trúc CSS toàn diện mà không cần cố tình tăng độ ưu tiên nhân tạo."
      },
      topicId: "css_cascade_layers",
      difficulty: "easy"
    },
    {
      id: "css_q_22_8",
      type: "single_choice",
      question: {
        en: "What happens if a layer is declared without a name (`@layer { ... }`)?",
        vi: "Điều gì xảy ra nếu một layer được tạo mà không có tên (`@layer { ... }`)?"
      },
      options: [
        { en: "It creates an anonymous layer that cannot be referenced elsewhere; its position in the layer order is determined by its position in the stylesheet", vi: "Nó tạo ra một layer ẩn danh không thể gọi lại ở nơi khác; vị trí ưu tiên của nó được xác định đúng theo vị trí xuất hiện trong file" },
        { en: "It throws a CSS error", vi: "Nó báo lỗi CSS" },
        { en: "It becomes unlayered code", vi: "Nó biến thành code ngoài layer" },
        { en: "It is automatically deleted", vi: "Nó tự động bị xóa" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Anonymous layers create private, one-off layers that cannot have styles appended to them later.",
        vi: "Layer ẩn danh tạo ra một tầng cục bộ khép kín và không thể thêm style vào từ nơi khác."
      },
      topicId: "css_cascade_layers",
      difficulty: "hard"
    },
    {
      id: "css_q_22_9",
      type: "true_false",
      question: {
        en: "True or False: If two conflicting rules belong to the SAME layer, the standard specificity and source order rules resolve the conflict.",
        vi: "Đúng hay Sai: Nếu hai quy tắc xung đột nhau nằm trong CÙNG MỘT layer, trình duyệt sẽ dùng độ ưu tiên specificity và thứ tự xuất hiện thông thường để phân định."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Within a single layer, normal cascade criteria (specificity and source order) decide which rule wins.",
        vi: "Bên trong cùng một layer, các tiêu chí cascade truyền thống (độ ưu tiên và thứ tự xuất hiện) sẽ phân định thắng thua."
      },
      topicId: "css_cascade_layers",
      difficulty: "easy"
    },
    {
      id: "css_q_22_10",
      type: "single_choice",
      question: {
        en: "Which layer declaration structure represents standard CSS architecture best practices?",
        vi: "Cấu trúc phân tầng layer nào sau đây thể hiện chuẩn mực kiến trúc CSS công nghiệp tốt nhất?"
      },
      options: [
        { en: "@layer reset, base, theme, components, utilities;", vi: "@layer reset, base, theme, components, utilities;" },
        { en: "@layer utilities, components, reset;", vi: "@layer utilities, components, reset;" },
        { en: "@layer random, test;", vi: "@layer random, test;" },
        { en: "@layer end;", vi: "@layer end;" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Reset -> Base -> Theme -> Components -> Utilities provides the ideal progressive cascade pipeline.",
        vi: "Reset -> Base -> Theme -> Components -> Utilities tạo nên quy trình xếp chồng lũy tiến chuẩn mực nhất."
      },
      topicId: "css_cascade_layers",
      difficulty: "easy"
    }
  ]
};

// Lesson 23: Advanced CSS Grid & Subgrid Mastery
const lesson23 = {
  id: "css_lesson_23",
  moduleId: "css_mod_adv_1",
  levelId: "advanced",
  courseId: "css",
  order: 5,
  topicId: "css_subgrid",
  title: {
    en: "Advanced CSS Grid & Subgrid Mastery",
    vi: "CSS Grid Nâng Cao & Làm Chủ Kỹ Thuật Subgrid"
  },
  summary: {
    en: "Master subgrid on rows/columns, aligning child cards across independent containers, dense auto-placement, and asymmetric masonry-style grids.",
    vi: "Làm chủ subgrid trên hàng và cột, căn thẳng hàng các thẻ con ở các khung độc lập, thuật toán dense và bố cục bất đối xứng dạng masonry."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "While standard CSS Grid creates tracks on direct children, nested elements traditionally could not align with the parent grid. **CSS Subgrid (`grid-template-columns: subgrid` / `grid-template-rows: subgrid`)** solves this fundamental limitation, allowing deeply nested elements to inherit and lock into the ancestor grid tracks.",
      vi: "Trong khi CSS Grid truyền thống chỉ tạo hàng cột cho con trực tiếp, các phần tử cháu chắt lồng bên trong không thể căn thẳng hàng với lưới cha. **CSS Subgrid (`grid-template-columns: subgrid` / `grid-template-rows: subgrid`)** giải quyết triệt để rào cản này, cho phép các phần tử con kế thừa và gắn chặt vào đúng các đường lưới của khung cha tổ tiên."
    },
    conceptExplanation: {
      en: "A common UI challenge is card grids where headers, descriptions, and action buttons in separate cards have varying text lengths, causing buttons to sit at uneven vertical heights. By making the card container span multiple rows (`grid-row: span 3`) and setting `grid-template-rows: subgrid`, all cards share the exact same row heights for headers, text, and footers, aligning perfectly across columns.",
      vi: "Một bài toán kinh điển trong giao diện là danh sách thẻ (card) có độ dài tiêu đề và mô tả khác nhau, khiến các nút bấm ở chân thẻ bị lệch hàng dọc. Bằng cách cho thẻ con chiếm nhiều hàng (`grid-row: span 3`) và khai báo `grid-template-rows: subgrid`, mọi thẻ đều dùng chung các hàng của lưới cha, giúp tiêu đề, nội dung và nút bấm thẳng hàng tăm tắp theo từng hàng ngang."
    },
    syntax: `/* Parent Grid */\n.card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  grid-auto-rows: auto auto 1fr auto; /* Title, subtitle, body, button */\n  gap: 16px;\n}\n\n/* Child Card inheriting parent rows via subgrid */\n.card {\n  display: grid;\n  grid-row: span 4;\n  grid-template-rows: subgrid;\n}`,
    examples: [
      {
        title: {
          en: "Perfect Cross-Card Subgrid Alignment",
          vi: "Căn Thẳng Hàng Hoàn Hảo Giữa Các Thẻ Bằng Subgrid"
        },
        description: {
          en: "All card titles and footer buttons align across columns regardless of description text length.",
          vi: "Tất cả tiêu đề và nút bấm chân thẻ đều thẳng hàng ngang dù phần mô tả ngắn dài khác nhau."
        },
        code: `.grid-parent {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-auto-rows: auto 1fr auto;\n  gap: 24px;\n}\n\n.card-item {\n  display: grid;\n  grid-row: span 3;\n  grid-template-rows: subgrid;\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Forgetting to specify grid-row: span N or grid-column: span N on the subgrid element.",
          vi: "Quên khai báo grid-row: span N hoặc grid-column: span N trên phần tử dùng subgrid."
        },
        correction: {
          en: "A subgrid MUST span explicit tracks on the parent grid to inherit those tracks.",
          vi: "Phần tử subgrid BẮT BUỘC phải chiếm số hàng/cột cụ thể (span N) trên lưới cha để kế thừa các đường lưới đó."
        }
      }
    ],
    tips: [
      {
        en: "Subgrid can be used on columns, rows, or both independently: grid-template-rows: subgrid; grid-template-columns: subgrid;",
        vi: "Subgrid có thể áp dụng riêng cho hàng, riêng cho cột hoặc cả hai: grid-template-rows: subgrid; grid-template-columns: subgrid;"
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_23_1",
      type: "complete_code",
      title: {
        en: "Enable Subgrid on Child Rows",
        vi: "Kích Hoạt Subgrid Trên Các Hàng Của Thẻ Con"
      },
      instruction: {
        en: "Set display: grid, grid-row: span 3, and grid-template-rows: subgrid on .subgrid-card.",
        vi: "Đặt display: grid, grid-row: span 3 và grid-template-rows: subgrid cho .subgrid-card."
      },
      starterCode: `.subgrid-card {\n  /* Apply subgrid */\n}`,
      solutionCode: `.subgrid-card {\n  display: grid;\n  grid-row: span 3;\n  grid-template-rows: subgrid;\n}`,
      hint: {
        en: "Use display: grid; grid-row: span 3; grid-template-rows: subgrid;",
        vi: "Dùng display: grid; grid-row: span 3; grid-template-rows: subgrid;"
      },
      explanation: {
        en: "grid-template-rows: subgrid locks the 3 internal rows into the parent grid tracks.",
        vi: "grid-template-rows: subgrid khóa 3 hàng bên trong thẻ vào đúng các hàng của lưới cha."
      }
    },
    {
      id: "css_ex_23_2",
      type: "fix_code",
      title: {
        en: "Enable Dense Grid Packing",
        vi: "Kích Hoạt Thuật Toán Lấp Đầy Lỗ Trống Dense"
      },
      instruction: {
        en: "Add grid-auto-flow: dense to .photo-mosaic to backfill empty grid gaps automatically.",
        vi: "Thêm grid-auto-flow: dense vào .photo-mosaic để tự động lấp đầy các ô trống trong lưới ảnh."
      },
      starterCode: `.photo-mosaic {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n}`,
      solutionCode: `.photo-mosaic {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-auto-flow: dense;\n}`,
      hint: {
        en: "Add grid-auto-flow: dense;",
        vi: "Thêm grid-auto-flow: dense;"
      },
      explanation: {
        en: "dense packing algorithm fills holes earlier in the grid if smaller items appear later in the source order.",
        vi: "Thuật toán dense tìm các phần tử nhỏ phía sau để lấp đầy khoảng trống xuất hiện phía trước trong lưới."
      }
    }
  ],
  challenge: {
    id: "css_ch_23",
    title: {
      en: "Build an Aligned Multi-Card Pricing Table with Subgrid",
      vi: "Xây Dựng Bảng Giá Đa Thẻ Căn Thẳng Hàng Bằng Subgrid"
    },
    description: {
      en: "Style .pricing-grid with display: grid, grid-template-columns: repeat(3, 1fr), and grid-auto-rows: auto auto 1fr auto. Style .pricing-card with display: grid, grid-row: span 4, and grid-template-rows: subgrid.",
      vi: "Tạo kiểu .pricing-grid với display: grid, grid-template-columns: repeat(3, 1fr) và grid-auto-rows: auto auto 1fr auto. Tạo kiểu .pricing-card với display: grid, grid-row: span 4 và grid-template-rows: subgrid."
    },
    requirements: [
      { en: "display: grid on .pricing-grid", vi: "display: grid cho .pricing-grid" },
      { en: "grid-template-columns: repeat(3, 1fr)", vi: "grid-template-columns: repeat(3, 1fr)" },
      { en: "grid-auto-rows: auto auto 1fr auto", vi: "grid-auto-rows: auto auto 1fr auto" },
      { en: "grid-row: span 4 on .pricing-card", vi: "grid-row: span 4 cho .pricing-card" },
      { en: "grid-template-rows: subgrid", vi: "grid-template-rows: subgrid" }
    ],
    starterCode: `.pricing-grid {\n}\n\n.pricing-card {\n}`,
    solutionCode: `.pricing-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-auto-rows: auto auto 1fr auto;\n}\n\n.pricing-card {\n  display: grid;\n  grid-row: span 4;\n  grid-template-rows: subgrid;\n}`,
    hints: [
      {
        en: "Declare grid-auto-rows on the parent and grid-template-rows: subgrid on the child spanning 4 rows.",
        vi: "Khai báo grid-auto-rows trên cha và grid-template-rows: subgrid trên con chiếm 4 hàng."
      }
    ],
    solutionExplanation: {
      en: "Subgrid guarantees perfect vertical alignment for pricing tiers, feature lists, and checkout buttons.",
      vi: "Subgrid đảm bảo các mốc giá, danh sách tính năng và nút mua hàng luôn thẳng hàng ngang tuyệt đối."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_23_1",
      type: "single_choice",
      question: {
        en: "What problem does CSS Subgrid primarily solve?",
        vi: "CSS Subgrid giải quyết bài toán cốt lõi nào trong thiết kế layout?"
      },
      options: [
        { en: "Allows nested child elements to align directly with the row/column tracks defined on an ancestor grid", vi: "Cho phép các phần tử con cháu lồng sâu bên trong căn thẳng hàng với các đường lưới của khung cha tổ tiên" },
        { en: "Converts Grid into Flexbox", vi: "Chuyển Grid thành Flexbox" },
        { en: "Compresses CSS file size", vi: "Nén dung lượng file CSS" },
        { en: "Renders 3D graphics", vi: "Render đồ họa 3D" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Subgrid inherits the track sizing of the parent grid rather than defining its own independent track definitions.",
        vi: "Subgrid kế thừa kích thước các hàng/cột từ lưới cha thay vì phải tự khai báo lại một hệ thống lưới độc lập."
      },
      topicId: "css_subgrid",
      difficulty: "easy"
    },
    {
      id: "css_q_23_2",
      type: "single_choice",
      question: {
        en: "What happens when `grid-auto-flow: dense;` is enabled on a CSS Grid container?",
        vi: "Điều gì xảy ra khi bật thuộc tính `grid-auto-flow: dense;` trên khung chứa CSS Grid?"
      },
      options: [
        { en: "The grid engine backfills visual holes earlier in the grid if smaller items appear later in the DOM", vi: "Trình duyệt tự động lấy các phần tử nhỏ ở phía sau trong DOM để lấp đầy các khoảng trống xuất hiện phía trước trên lưới" },
        { en: "Elements are compressed and made blurry", vi: "Các phần tử bị nén nhỏ và mờ đi" },
        { en: "All gaps are removed", vi: "Xóa toàn bộ khoảng cách gap" },
        { en: "The grid stops accepting new items", vi: "Lưới ngừng nhận phần tử mới" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Dense packing produces visually compact layouts without blank spaces, ideal for photo galleries and bento dashboards.",
        vi: "Thuật toán dense tạo bố cục xếp kín khít không bị lỗ trống, rất thích hợp cho thư viện ảnh và dashboard dạng bento."
      },
      topicId: "css_subgrid",
      difficulty: "medium"
    },
    {
      id: "css_q_23_3",
      type: "true_false",
      question: {
        en: "True or False: An element using `grid-template-columns: subgrid` must span an explicit number of columns on the parent grid (e.g. `grid-column: span 3`).",
        vi: "Đúng hay Sai: Một phần tử dùng `grid-template-columns: subgrid` bắt buộc phải chiếm một số lượng cột cụ thể trên lưới cha (ví dụ `grid-column: span 3`)."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "A subgrid must span a defined track range to inherit the corresponding parent grid lines.",
        vi: "Subgrid bắt buộc phải được chỉ định span bao nhiêu ô để nhận đúng số lượng đường lưới tương ứng từ cha."
      },
      topicId: "css_subgrid",
      difficulty: "easy"
    },
    {
      id: "css_q_23_4",
      type: "single_choice",
      question: {
        en: "Can a subgrid declare its own `gap` property that differs from the parent grid's gap?",
        vi: "Phần tử subgrid có thể khai báo thuộc tính `gap` riêng khác với `gap` của lưới cha không?"
      },
      options: [
        { en: "Yes, subgrids inherit track sizing by default but can override their own gap values", vi: "Có, subgrid kế thừa kích thước hàng cột nhưng hoàn toàn có thể tự ghi đè giá trị khoảng cách gap riêng" },
        { en: "No, gap cannot be customized in subgrid", vi: "Không, gap không thể tùy biến trong subgrid" },
        { en: "Only in Firefox", vi: "Chỉ chạy được trên Firefox" },
        { en: "Only when gap is 0", vi: "Chỉ được khi gap bằng 0" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Subgrids inherit parent line positions by default but can specify their own custom `gap` values if desired.",
        vi: "Subgrid kế thừa các đường gióng của cha nhưng vẫn cho phép định nghĩa lại `gap` độc lập nếu muốn."
      },
      topicId: "css_subgrid",
      difficulty: "hard"
    },
    {
      id: "css_q_23_5",
      type: "single_choice",
      question: {
        en: "How do you place a grid item into an explicit column span from line 2 to line 5?",
        vi: "Làm thế nào để đặt một phần tử grid chiếm các cột từ đường gióng số 2 đến đường gióng số 5?"
      },
      options: [
        { en: "grid-column: 2 / 5;", vi: "grid-column: 2 / 5;" },
        { en: "grid-column: 2 to 5;", vi: "grid-column: 2 to 5;" },
        { en: "grid-span: 2-5;", vi: "grid-span: 2-5;" },
        { en: "column-range: 2..5;", vi: "column-range: 2..5;" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "The syntax `grid-column: <start-line> / <end-line>` (e.g. `2 / 5`) places elements across specific grid lines.",
        vi: "Cú pháp `grid-column: <đường-bắt-đầu> / <đường-kết-thúc>` (ví dụ `2 / 5`) đặt phần tử nằm giữa các đường gióng chỉ định."
      },
      topicId: "css_subgrid",
      difficulty: "easy"
    },
    {
      id: "css_q_23_6",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: To inherit the parent grid's column tracks, set grid-template-columns: ________",
        vi: "Điền vào chỗ trống: Để kế thừa các cột của lưới cha, khai báo grid-template-columns: ________"
      },
      fillBlankAnswers: ["subgrid"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: "subgrid keyword delegates track definitions to the parent grid.",
        vi: "Từ khóa subgrid ủy quyền định nghĩa hàng cột cho lưới cha."
      },
      topicId: "css_subgrid",
      difficulty: "easy"
    },
    {
      id: "css_q_23_7",
      type: "multiple_choice",
      question: {
        en: "Which properties can inherit parent tracks via subgrid? (Select all that apply)",
        vi: "Những thuộc tính nào sau đây có thể kế thừa các đường lưới từ cha thông qua subgrid? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "grid-template-columns: subgrid;", vi: "grid-template-columns: subgrid;" },
        { en: "grid-template-rows: subgrid;", vi: "grid-template-rows: subgrid;" },
        { en: "grid-template-areas: subgrid;", vi: "grid-template-areas: subgrid;" },
        { en: "display: subgrid; (Invalid)", vi: "display: subgrid; (Không hợp lệ)" }
      ],
      correctAnswers: [0, 1],
      explanation: {
        en: "Subgrid is a value applied to `grid-template-columns` and `grid-template-rows`, NOT a `display` value.",
        vi: "Subgrid là giá trị gán cho `grid-template-columns` và `grid-template-rows`, KHÔNG PHẢI là một giá trị của `display`."
      },
      topicId: "css_subgrid",
      difficulty: "medium"
    },
    {
      id: "css_q_23_8",
      type: "single_choice",
      question: {
        en: "What is a Bento Grid layout in modern web design?",
        vi: "Bố cục Bento Grid trong thiết kế web hiện đại là gì?"
      },
      options: [
        { en: "An asymmetric grid layout featuring cards of varying modular sizes (1x1, 2x1, 2x2) arranged cohesively like a Japanese bento box", vi: "Bố cục lưới bất đối xứng gồm các thẻ có kích cỡ khác nhau (1x1, 2x1, 2x2) ghép lại gọn gàng như hộp cơm bento Nhật Bản" },
        { en: "A grid for food delivery apps only", vi: "Lưới chỉ dùng cho ứng dụng giao đồ ăn" },
        { en: "A 3D grid layout", vi: "Bố cục lưới 3D" },
        { en: "A deprecated table layout", vi: "Bố cục thẻ table cũ" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Bento Grids use CSS Grid column/row spanning to create engaging, dynamic modular feature showcases.",
        vi: "Bento Grid dùng tính năng span cột/hàng của CSS Grid để tạo nên các khối giới thiệu tính năng đẹp mắt và đa dạng."
      },
      topicId: "css_subgrid",
      difficulty: "easy"
    },
    {
      id: "css_q_23_9",
      type: "true_false",
      question: {
        en: "True or False: Named grid lines on a parent grid can be referenced directly by items inside a subgrid.",
        vi: "Đúng hay Sai: Các đường gióng có đặt tên trên lưới cha có thể được gọi và sử dụng trực tiếp bởi các phần tử con trong subgrid."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Subgrids inherit named lines from the parent grid and can also define their own local line names.",
        vi: "Subgrid kế thừa toàn bộ tên các đường gióng của lưới cha đồng thời có thể định nghĩa thêm tên đường gióng riêng."
      },
      topicId: "css_subgrid",
      difficulty: "hard"
    },
    {
      id: "css_q_23_10",
      type: "single_choice",
      question: {
        en: "What happens if a child element inside a subgrid is placed on a line number outside the spanned track range?",
        vi: "Điều gì xảy ra nếu một thẻ con trong subgrid được đặt vào một đường số nằm ngoài phạm vi các hàng/cột được kế thừa?"
      },
      options: [
        { en: "An implicit track is created at the edge of the subgrid without extending the parent grid", vi: "Một track ngầm định sẽ được tạo ở mép của subgrid mà không làm mở rộng lưới cha" },
        { en: "The element disappears", vi: "Phần tử biến mất" },
        { en: "The page reloads", vi: "Trang bị load lại" },
        { en: "The browser freezes", vi: "Trình duyệt bị treo" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Subgrid creates extra implicit tracks locally to contain overflowing items without corrupting the ancestor grid.",
        vi: "Subgrid sẽ tự tạo thêm các track ngầm cục bộ để chứa phần tử tràn mà không phá vỡ cấu trúc lưới cha."
      },
      topicId: "css_subgrid",
      difficulty: "hard"
    }
  ]
};

// Lesson 24: Modern Visual Effects: Filters, Blend Modes & Scroll Animations
const lesson24 = {
  id: "css_lesson_24",
  moduleId: "css_mod_adv_1",
  levelId: "advanced",
  courseId: "css",
  order: 6,
  topicId: "css_visual_effects",
  title: {
    en: "Modern Visual Effects: Filters, Blend Modes & Scroll-Driven Animations",
    vi: "Hiệu Ứng Thị Giác Đỉnh Cao: Filters, Blend Modes & Scroll-Driven Animations"
  },
  summary: {
    en: "Master backdrop-filter glassmorphism, mix-blend-mode, clip-path geometry, and native pure-CSS scroll-driven animations with animation-timeline: scroll().",
    vi: "Làm chủ hiệu ứng kính mờ backdrop-filter, hòa trộn mix-blend-mode, cắt hình học clip-path và hoạt họa theo thanh cuộn thuần CSS animation-timeline."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "Modern CSS provides native graphic-design capabilities previously requiring Photoshop or heavy JavaScript libraries. From frosted-glass backdrops (`backdrop-filter`) to vector geometric masking (`clip-path`) and pure CSS scroll-linked progress bars (`animation-timeline: scroll()`), CSS delivers native 60fps visual excellence.",
      vi: "CSS hiện đại mang tới các năng lực xử lý đồ họa cấp cao mà trước đây đòi hỏi Photoshop hoặc các thư viện JavaScript cồng kềnh. Từ kính mờ (`backdrop-filter`) tới mặt nạ cắt hình học (`clip-path`) và hoạt họa liên kết thanh cuộn thuần CSS (`animation-timeline: scroll()`), mọi hiệu ứng đều chạy mượt mà 60fps trên GPU."
    },
    conceptExplanation: {
      en: "`backdrop-filter: blur(12px)` blurs the area behind an element (the foundation of modern OS frosted-glass UI). `mix-blend-mode` blends an element's colors with its backdrop (e.g. `multiply`, `screen`, `difference`). `clip-path: polygon(...)` crops elements into bespoke geometric silhouettes. The cutting-edge **CSS Scroll-Driven Animations** specification introduces `animation-timeline: scroll()` and `view()`, allowing keyframe animations to be scrubbed directly by the user's scroll position with zero JavaScript!",
      vi: "`backdrop-filter: blur(12px)` làm mờ hậu cảnh phía sau phần tử (nền tảng của phong cách kính mờ frosted-glass). `mix-blend-mode` hòa trộn màu sắc với lớp nền bên dưới (như `multiply`, `screen`, `difference`). `clip-path: polygon(...)` cắt phần tử theo các hình đa giác độc đáo. Đặc biệt, chuẩn **CSS Scroll-Driven Animations** mang tới `animation-timeline: scroll()` và `view()`, cho phép điều khiển tiến trình chạy hoạt họa trực tiếp theo vị trí cuộn trang mà không cần một dòng JavaScript nào!"
    },
    syntax: `/* Modern Frosted-Glass Navigation Bar */\n.glass-header {\n  position: sticky;\n  top: 0;\n  background: rgba(15, 23, 42, 0.75);\n  backdrop-filter: blur(16px) saturate(180%);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n}\n\n/* Pure CSS Scroll Progress Bar */\n@keyframes grow-progress {\n  from { transform: scaleX(0); }\n  to   { transform: scaleX(1); }\n}\n\n.scroll-progress-bar {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 4px;\n  transform-origin: left;\n  background: #3b82f6;\n  animation: grow-progress auto linear;\n  animation-timeline: scroll();\n}`,
    examples: [
      {
        title: {
          en: "Scroll-Driven Reveal on View Entry",
          vi: "Hiệu Ứng Hiện Hình Khi Cuộn Đến Nơi Bằng CSS Thuần"
        },
        description: {
          en: "Fades in and scales up cards as they enter the viewport using animation-timeline: view().",
          vi: "Tự động mờ dần và phóng to thẻ khi cuộn tới tầm nhìn bằng animation-timeline: view()."
        },
        code: `@keyframes revealOnScroll {\n  from {\n    opacity: 0;\n    transform: translateY(40px) scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n\n.scroll-card {\n  animation: revealOnScroll linear both;\n  animation-timeline: view();\n  animation-range: entry 10% cover 30%;\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Using filter: blur() instead of backdrop-filter: blur(), accidentally blurring the element's own text content rather than the background behind it.",
          vi: "Dùng filter: blur() thay vì backdrop-filter: blur() khiến toàn bộ chữ của chính phần tử bị mờ nhòe thay vì làm mờ hậu cảnh phía sau."
        },
        correction: {
          en: "Use backdrop-filter: blur() when you want to blur content behind the element while keeping text sharp.",
          vi: "Dùng backdrop-filter: blur() khi muốn làm mờ hình ảnh phía sau nhưng giữ chữ bên trên sắc nét."
        }
      }
    ],
    tips: [
      {
        en: "Pair backdrop-filter with semi-transparent background colors (e.g. rgba(255, 255, 255, 0.7)) so the blur effect is visually apparent.",
        vi: "Luôn kết hợp backdrop-filter với màu nền bán trong suốt (như rgba(255, 255, 255, 0.7)) để hiệu ứng mờ kính hiển thị rõ rệt."
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_24_1",
      type: "complete_code",
      title: {
        en: "Implement Frosted Glassmorphism Header",
        vi: "Thiết Lập Thanh Header Kính Mờ Glassmorphism"
      },
      instruction: {
        en: "Add backdrop-filter: blur(12px) and background: rgba(15, 23, 42, 0.8) to .glass-nav.",
        vi: "Thêm backdrop-filter: blur(12px) và background: rgba(15, 23, 42, 0.8) cho .glass-nav."
      },
      starterCode: `.glass-nav {\n  position: fixed;\n  top: 0;\n  /* Add glassmorphism */\n}`,
      solutionCode: `.glass-nav {\n  position: fixed;\n  top: 0;\n  background: rgba(15, 23, 42, 0.8);\n  backdrop-filter: blur(12px);\n}`,
      hint: {
        en: "Use background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(12px);",
        vi: "Dùng background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(12px);"
      },
      explanation: {
        en: "backdrop-filter blurs everything underneath the semi-transparent navigation bar.",
        vi: "backdrop-filter làm mờ tất cả nội dung trượt bên dưới thanh điều hướng bán trong suốt."
      }
    },
    {
      id: "css_ex_24_2",
      type: "fix_code",
      title: {
        en: "Bind Keyframes to Scroll Timeline",
        vi: "Gắn Hoạt Họa Vào Dòng Thời Gian Cuộn Trang"
      },
      instruction: {
        en: "Add animation-timeline: scroll() to .reading-tracker so it tracks page scroll progress.",
        vi: "Thêm animation-timeline: scroll() vào .reading-tracker để thanh tiến trình chạy theo độ cuộn trang."
      },
      starterCode: `.reading-tracker {\n  animation: fillProgress linear;\n}`,
      solutionCode: `.reading-tracker {\n  animation: fillProgress linear;\n  animation-timeline: scroll();\n}`,
      hint: {
        en: "Add animation-timeline: scroll();",
        vi: "Thêm animation-timeline: scroll();"
      },
      explanation: {
        en: "animation-timeline: scroll() drives the keyframe progression based on document scroll offset.",
        vi: "animation-timeline: scroll() điều khiển hoạt họa trực tiếp theo khoảng cách cuộn trang."
      }
    }
  ],
  challenge: {
    id: "css_ch_24",
    title: {
      en: "Build a Pure CSS Scroll Progress Bar & Glass Banner",
      vi: "Xây Dựng Thanh Cuộn Tiến Trình & Khung Kính Thuần CSS"
    },
    description: {
      en: "Define @keyframes growBar from scaleX(0) to scaleX(1). Style .top-progress with transform-origin: left, animation: growBar linear, and animation-timeline: scroll(). Style .glass-card with background: rgba(255, 255, 255, 0.1), backdrop-filter: blur(16px), and border: 1px solid rgba(255, 255, 255, 0.2).",
      vi: "Định nghĩa @keyframes growBar từ scaleX(0) tới scaleX(1). Tạo kiểu .top-progress với transform-origin: left, animation: growBar linear và animation-timeline: scroll(). Tạo kiểu .glass-card với background: rgba(255, 255, 255, 0.1), backdrop-filter: blur(16px) và border: 1px solid rgba(255, 255, 255, 0.2)."
    },
    requirements: [
      { en: "@keyframes growBar from scaleX(0) to scaleX(1)", vi: "@keyframes growBar từ scaleX(0) tới scaleX(1)" },
      { en: "transform-origin: left", vi: "transform-origin: left" },
      { en: "animation-timeline: scroll()", vi: "animation-timeline: scroll()" },
      { en: "backdrop-filter: blur(16px)", vi: "backdrop-filter: blur(16px)" }
    ],
    starterCode: `/* Scroll progress and glass banner */\n@keyframes growBar {\n}\n\n.top-progress {\n}\n\n.glass-card {\n}`,
    solutionCode: `@keyframes growBar {\n  from {\n    transform: scaleX(0);\n  }\n  to {\n    transform: scaleX(1);\n  }\n}\n\n.top-progress {\n  transform-origin: left;\n  animation: growBar linear;\n  animation-timeline: scroll();\n}\n\n.glass-card {\n  background: rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(16px);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n}`,
    hints: [
      {
        en: "Define growBar keyframes, apply scroll() timeline on .top-progress, and backdrop-filter on .glass-card.",
        vi: "Định nghĩa keyframe growBar, áp dụng timeline scroll() cho .top-progress và backdrop-filter cho .glass-card."
      }
    ],
    solutionExplanation: {
      en: "Combining native CSS scroll animations with frosted glass styling produces cutting-edge high-performance interfaces.",
      vi: "Kết hợp hoạt họa cuộn trang thuần CSS với hiệu ứng kính mờ tạo nên giao diện hiện đại đỉnh cao và mượt mà tuyệt đối."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_24_1",
      type: "single_choice",
      question: {
        en: "What is the primary difference between `filter: blur(...)` and `backdrop-filter: blur(...)`?",
        vi: "Sự khác biệt cốt lõi giữa `filter: blur(...)` và `backdrop-filter: blur(...)` là gì?"
      },
      options: [
        { en: "`filter: blur()` blurs the element itself and all its children, while `backdrop-filter: blur()` blurs the area behind the element while keeping text sharp", vi: "`filter: blur()` làm mờ chính phần tử và tất cả chữ bên trong nó, còn `backdrop-filter: blur()` làm mờ hậu cảnh phía sau phần tử trong khi chữ bên trên vẫn sắc nét" },
        { en: "`backdrop-filter` only works in Firefox", vi: "`backdrop-filter` chỉ chạy trên Firefox" },
        { en: "`filter` cannot blur images", vi: "`filter` không làm mờ được hình ảnh" },
        { en: "They are completely identical", vi: "Chúng hoàn toàn giống nhau" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`backdrop-filter` applies graphical filtering exclusively to the backdrop layers underneath the target element.",
        vi: "`backdrop-filter` chỉ áp dụng bộ lọc lên các lớp nằm phía dưới phần tử mục tiêu."
      },
      topicId: "css_visual_effects",
      difficulty: "easy"
    },
    {
      id: "css_q_24_2",
      type: "single_choice",
      question: {
        en: "What does the CSS Scroll-Driven Animation property `animation-timeline: scroll();` achieve?",
        vi: "Thuộc tính `animation-timeline: scroll();` trong CSS Scroll-Driven Animation mang lại tính năng gì?"
      },
      options: [
        { en: "Links animation playback progress directly to the user's document scroll position without any JavaScript scroll listeners", vi: "Liên kết trực tiếp tiến trình chạy hoạt họa theo vị trí cuộn trang của người dùng mà không cần bất kỳ mã JavaScript nào" },
        { en: "Automatically scrolls the page down continuously", vi: "Tự động cuộn trang xuống liên tục" },
        { en: "Disables mouse wheel scrolling", vi: "Khóa con lăn chuột không cho cuộn" },
        { en: "Loads video files on scroll", vi: "Tải video khi cuộn" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`animation-timeline: scroll()` replaces heavy JS scroll event handlers with native GPU-threaded scroll animations.",
        vi: "`animation-timeline: scroll()` thay thế hoàn toàn các hàm lắng nghe sự kiện scroll nặng nề của JS bằng hoạt họa GPU mượt mà."
      },
      topicId: "css_visual_effects",
      difficulty: "medium"
    },
    {
      id: "css_q_24_3",
      type: "single_choice",
      question: {
        en: "What does `mix-blend-mode: difference;` do when text scrolls over white and black sections?",
        vi: "Hiệu ứng `mix-blend-mode: difference;` tạo ra hiện tượng gì khi đoạn chữ lướt qua các mảng nền trắng và đen?"
      },
      options: [
        { en: "Inverts the text color dynamically (turns white over black backgrounds, and black over white backgrounds) ensuring perpetual contrast", vi: "Tự động đảo ngược màu chữ (thành chữ trắng trên nền đen, và chữ đen trên nền trắng) đảm bảo luôn nhìn rõ chữ" },
        { en: "Hides the text completely", vi: "Ẩn hoàn toàn đoạn chữ" },
        { en: "Blurries the background", vi: "Làm mờ nền" },
        { en: "Rotates the text 180 degrees", vi: "Xoay ngược chữ 180 độ" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "The difference blend mode subtracts pixel values, creating automatic high-contrast inverted text against contrasting backgrounds.",
        vi: "Chế độ hòa trộn difference lấy hiệu số giá trị màu pixel, tự động đảo màu chữ để luôn đạt độ tương phản tối đa trên mọi nền."
      },
      topicId: "css_visual_effects",
      difficulty: "medium"
    },
    {
      id: "css_q_24_4",
      type: "true_false",
      question: {
        en: "True or False: `clip-path: polygon(...)` allows clipping an HTML element into custom geometric shapes like diamonds, triangles, and angled banners.",
        vi: "Đúng hay Sai: `clip-path: polygon(...)` cho phép cắt phần tử HTML thành các hình học tùy biến như hình thoi, tam giác và banner vát góc."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "clip-path defines vector clipping boundaries that mask out any pixels outside the coordinate polygon.",
        vi: "clip-path xác định đường bao vector che giấu các pixel nằm ngoài hình đa giác tọa độ."
      },
      topicId: "css_visual_effects",
      difficulty: "easy"
    },
    {
      id: "css_q_24_5",
      type: "single_choice",
      question: {
        en: "What is the difference between `animation-timeline: scroll()` and `animation-timeline: view()` in CSS Scroll-Driven Animations?",
        vi: "Sự khác biệt giữa `animation-timeline: scroll()` và `animation-timeline: view()` trong CSS Scroll-Driven Animations là gì?"
      },
      options: [
        { en: "`scroll()` tracks the scroll position of the whole scroll container, while `view()` tracks when a specific element enters and exits the viewport", vi: "`scroll()` theo dõi tiến trình cuộn của toàn bộ khung cuộn, còn `view()` theo dõi thời điểm một phần tử cụ thể bước vào và rời khỏi tầm nhìn" },
        { en: "`view()` only runs in mobile browsers", vi: "`view()` chỉ chạy trên điện thoại" },
        { en: "`scroll()` requires JavaScript", vi: "`scroll()` bắt buộc phải có JavaScript" },
        { en: "They are completely identical", vi: "Chúng hoàn toàn giống nhau" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`view()` creates view-timeline progress based on the subject's intersection with the scrollport (entry to exit).",
        vi: "`view()` tạo dòng thời gian dựa trên vị trí xuất hiện của phần tử khi cắt qua khung nhìn (từ lúc bắt đầu chạm tới lúc ra khỏi)."
      },
      topicId: "css_visual_effects",
      difficulty: "hard"
    },
    {
      id: "css_q_24_6",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: The CSS property used to apply graphical blur or saturation behind an element is backdrop-________",
        vi: "Điền vào chỗ trống: Thuộc tính CSS dùng để làm mờ hoặc tăng độ bão hòa màu hậu cảnh phía sau là backdrop-________"
      },
      fillBlankAnswers: ["filter"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: "backdrop-filter applies effects to the backdrop layer.",
        vi: "backdrop-filter áp dụng hiệu ứng thị giác lên lớp hậu cảnh."
      },
      topicId: "css_visual_effects",
      difficulty: "easy"
    },
    {
      id: "css_q_24_7",
      type: "multiple_choice",
      question: {
        en: "Which of the following are valid functions in the CSS `filter` and `backdrop-filter` properties? (Select all that apply)",
        vi: "Những hàm nào sau đây là hàm hợp lệ trong thuộc tính CSS `filter` và `backdrop-filter`? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "blur(px)", vi: "blur(px)" },
        { en: "grayscale(%)", vi: "grayscale(%)" },
        { en: "saturate(%)", vi: "saturate(%)" },
        { en: "contrast(%)", vi: "contrast(%)" }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: "blur, grayscale, saturate, contrast, brightness, sepia, invert, and hue-rotate are standard CSS filter functions.",
        vi: "blur, grayscale, saturate, contrast, brightness, sepia, invert và hue-rotate đều là các hàm filter chuẩn của CSS."
      },
      topicId: "css_visual_effects",
      difficulty: "easy"
    },
    {
      id: "css_q_24_8",
      type: "single_choice",
      question: {
        en: "How do you create a circular clipped image using `clip-path`?",
        vi: "Làm thế nào để cắt một tấm ảnh thành hình tròn hoàn hảo bằng `clip-path`?"
      },
      options: [
        { en: "clip-path: circle(50%);", vi: "clip-path: circle(50%);" },
        { en: "clip-path: round(100px);", vi: "clip-path: round(100px);" },
        { en: "clip: circle;", vi: "clip: circle;" },
        { en: "mask-style: circle;", vi: "mask-style: circle;" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`clip-path: circle(50%)` clips the element into a perfect circle based on half its shortest dimension.",
        vi: "`clip-path: circle(50%)` cắt phần tử thành hình tròn hoàn hảo lấy tâm là chính giữa."
      },
      topicId: "css_visual_effects",
      difficulty: "easy"
    },
    {
      id: "css_q_24_9",
      type: "true_false",
      question: {
        en: "True or False: CSS Scroll-Driven Animations run off the main JavaScript thread on the compositor, ensuring zero scroll stutter or lag.",
        vi: "Đúng hay Sai: CSS Scroll-Driven Animations chạy tách biệt khỏi luồng chính JavaScript trên compositor GPU, đảm bảo không bao giờ bị giật lag khi cuộn trang."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Because the browser engine executes scroll animations natively in the compositor thread, animations remain butter-smooth even if the main thread is busy.",
        vi: "Do trình duyệt thực thi trực tiếp trên GPU compositor thread, hoạt họa luôn mượt mà 60fps kể cả khi main thread JS đang bận rộn."
      },
      topicId: "css_visual_effects",
      difficulty: "medium"
    },
    {
      id: "css_q_24_10",
      type: "single_choice",
      question: {
        en: "What does `filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3))` do differently than `box-shadow` on a transparent PNG or SVG icon?",
        vi: "`filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3))` khác biệt như thế nào so với `box-shadow` khi áp dụng trên ảnh PNG trong suốt hoặc icon SVG?"
      },
      options: [
        { en: "`drop-shadow` contours to the actual visible pixel outlines of the transparent graphic, whereas `box-shadow` casts a rectangular shadow around the bounding box", vi: "`drop-shadow` đổ bóng uốn lượn theo đúng đường viền pixel thực của hình ảnh trong suốt, trong khi `box-shadow` chỉ đổ bóng hình chữ nhật bao quanh khung ngoài" },
        { en: "`drop-shadow` only works in grayscale", vi: "`drop-shadow` chỉ tạo bóng màu xám" },
        { en: "`box-shadow` is faster in 3D", vi: "`box-shadow` nhanh hơn trong 3D" },
        { en: "There is no difference", vi: "Không có gì khác biệt" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`filter: drop-shadow` respects alpha transparency, creating organic silhouettes around PNG cutouts and vector SVGs.",
        vi: "`filter: drop-shadow` nhận diện kênh alpha trong suốt để tạo bóng đổ ôm sát hình dáng thực của icon SVG và ảnh PNG."
      },
      topicId: "css_visual_effects",
      difficulty: "medium"
    }
  ]
};

// Save lessons
saveLesson('src/data/css/advanced/module01/lesson22.ts', 'lesson22', lesson22);
saveLesson('src/data/css/advanced/module01/lesson23.ts', 'lesson23', lesson23);
saveLesson('src/data/css/advanced/module01/lesson24.ts', 'lesson24', lesson24);

// Advanced Module 1 index
const advMod1Index = `export { lesson19 } from './lesson19';\nexport { lesson20 } from './lesson20';\nexport { lesson21 } from './lesson21';\nexport { lesson22 } from './lesson22';\nexport { lesson23 } from './lesson23';\nexport { lesson24 } from './lesson24';\n`;
fs.writeFileSync('src/data/css/advanced/module01/index.ts', advMod1Index, 'utf8');
console.log('Saved: src/data/css/advanced/module01/index.ts');

// Advanced Level index
const advIndex = `export * from './module01';\n`;
fs.writeFileSync('src/data/css/advanced/index.ts', advIndex, 'utf8');
console.log('Saved: src/data/css/advanced/index.ts');
