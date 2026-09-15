import fs from 'fs';
import path from 'path';

function saveLesson(filePath: string, varName: string, lessonObj: any) {
  const content = `import { Lesson } from '../../../../types';\n\nexport const ${varName}: Lesson = ${JSON.stringify(lessonObj, null, 2)};\n`;
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Saved: ${filePath}`);
}

// Lesson 19: Mathematical Functions: calc(), min(), max(), clamp()
const lesson19 = {
  id: "css_lesson_19",
  moduleId: "css_mod_adv_1",
  levelId: "advanced",
  courseId: "css",
  order: 1,
  topicId: "css_math_functions",
  title: {
    en: "Mathematical Functions: calc(), min(), max(), clamp()",
    vi: "Hàm Toán Học CSS: calc(), min(), max(), clamp()"
  },
  summary: {
    en: "Master dynamic calculations, fluid responsive typography with clamp(), viewport boundary locking with min()/max(), and zero-media-query fluid scaling.",
    vi: "Làm chủ tính toán động, kiểu chữ co giãn mượt mà với clamp(), khóa biên màn hình với min()/max() và co giãn tự động không cần media query."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "CSS math functions (`calc()`, `min()`, `max()`, `clamp()`) empower developers to perform dynamic arithmetic calculations across mixed units directly in the browser, enabling truly fluid layouts and typography without brittle breakpoint jumps.",
      vi: "Các hàm toán học trong CSS (`calc()`, `min()`, `max()`, `clamp()`) cho phép lập trình viên thực hiện các phép tính số học động giữa nhiều loại đơn vị khác nhau trực tiếp trên trình duyệt, tạo nên giao diện và chữ co giãn mượt mà mà không bị giật nấc breakpoint."
    },
    conceptExplanation: {
      en: "`calc()` combines mixed units (e.g. `calc(100% - 32px)`). `min(a, b)` selects the smallest value (acting as a ceiling/maximum constraint). `max(a, b)` selects the largest value (acting as a floor/minimum constraint). `clamp(min, preferred, max)` bounds a flexible value between lower and upper limits. For fluid responsive typography, `font-size: clamp(1.5rem, 1rem + 2.5vw, 3rem)` dynamically scales text smoothly between mobile and desktop viewports.",
      vi: "`calc()` tính toán kết hợp nhiều đơn vị khác nhau (ví dụ `calc(100% - 32px)`). `min(a, b)` chọn giá trị nhỏ nhất (đóng vai trò chặn trần tối đa). `max(a, b)` chọn giá trị lớn nhất (đóng vai trò chặn sàn tối thiểu). `clamp(min, preferred, max)` kẹp giá trị co giãn giữa ngưỡng dưới và ngưỡng trên. Để tạo kiểu chữ co giãn linh hoạt, công thức `font-size: clamp(1.5rem, 1rem + 2.5vw, 3rem)` giúp cỡ chữ tăng giảm mượt mà theo độ rộng màn hình."
    },
    syntax: `/* Fluid typography without media queries */\nh1.fluid-headline {\n  font-size: clamp(2rem, 1.25rem + 3vw, 4.5rem);\n  line-height: 1.1;\n}\n\n/* Clamped container width */\n.container {\n  width: min(100% - 32px, 1200px);\n  margin-inline: auto;\n}`,
    examples: [
      {
        title: {
          en: "Fluid Dynamic Layout Container",
          vi: "Khung Chứa Co Giãn Tự Động Theo Màn Hình"
        },
        description: {
          en: "Keeps container centered with 16px side gutters on mobile and capped at 1280px on desktop.",
          vi: "Giữ khung chứa căn giữa với lề 16px trên điện thoại và khóa trần 1280px trên máy tính."
        },
        code: `.shell {\n  width: min(100% - 32px, 1280px);\n  margin-inline: auto;\n  padding-block: clamp(16px, 4vw, 64px);\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Omitting spaces around + and - operators inside calc() (e.g. calc(100%-20px)), causing a CSS syntax error.",
          vi: "Quên dấu cách quanh dấu cộng (+) và trừ (-) trong calc() (ví dụ calc(100%-20px)) khiến câu lệnh bị lỗi cú pháp."
        },
        correction: {
          en: "Always include whitespace around + and - operators: calc(100% - 20px).",
          vi: "Luôn đặt dấu cách trước và sau dấu + và -: calc(100% - 20px)."
        }
      }
    ],
    tips: [
      {
        en: "Use width: min(100% - 32px, 1200px) instead of max-width + width + margin to achieve responsive centering in one line.",
        vi: "Dùng width: min(100% - 32px, 1200px) thay cho bộ ba max-width + width + margin để căn giữa đáp ứng chỉ trong 1 dòng."
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_19_1",
      type: "complete_code",
      title: {
        en: "Implement Fluid Heading with clamp()",
        vi: "Thiết Lập Tiêu Đề Co Giãn Bằng clamp()"
      },
      instruction: {
        en: "Set font-size to clamp(1.75rem, 1rem + 2vw, 3.5rem) on h1.hero-title.",
        vi: "Đặt font-size thành clamp(1.75rem, 1rem + 2vw, 3.5rem) cho h1.hero-title."
      },
      starterCode: `h1.hero-title {\n  /* Set fluid font size */\n}`,
      solutionCode: `h1.hero-title {\n  font-size: clamp(1.75rem, 1rem + 2vw, 3.5rem);\n}`,
      hint: {
        en: "Use font-size: clamp(1.75rem, 1rem + 2vw, 3.5rem);",
        vi: "Dùng font-size: clamp(1.75rem, 1rem + 2vw, 3.5rem);"
      },
      explanation: {
        en: "clamp() locks font-size between 1.75rem minimum and 3.5rem maximum, scaling fluidly in-between.",
        vi: "clamp() khóa cỡ chữ trong khoảng từ 1.75rem tới 3.5rem và co giãn mượt mà theo độ rộng màn hình."
      }
    },
    {
      id: "css_ex_19_2",
      type: "fix_code",
      title: {
        en: "Fix Whitespace Syntax Error in calc()",
        vi: "Sửa Lỗi Thiếu Dấu Cách Trong Hàm calc()"
      },
      instruction: {
        en: "Add required spaces around the minus sign in width: calc(100%-48px) on .full-box.",
        vi: "Thêm khoảng trắng xung quanh dấu trừ trong width: calc(100%-48px) cho .full-box."
      },
      starterCode: `.full-box {\n  width: calc(100%-48px);\n}`,
      solutionCode: `.full-box {\n  width: calc(100% - 48px);\n}`,
      hint: {
        en: "Change calc(100%-48px) to calc(100% - 48px);",
        vi: "Đổi calc(100%-48px) thành calc(100% - 48px);"
      },
      explanation: {
        en: "CSS math parser requires whitespace around + and - to distinguish from negative number signs.",
        vi: "Bộ phân tích cú pháp CSS bắt buộc phải có khoảng trắng quanh + và - để phân biệt với dấu số âm."
      }
    }
  ],
  challenge: {
    id: "css_ch_19",
    title: {
      en: "Build a Fully Fluid Responsive Hero Section",
      vi: "Xây Dựng Khối Hero Co Giãn Tự Động Không Cần Media Query"
    },
    description: {
      en: "Style .hero-container with width: min(100% - 40px, 1200px), margin-inline: auto, and padding-block: clamp(32px, 6vw, 96px). Style .hero-title with font-size: clamp(2rem, 1.25rem + 3vw, 4.5rem).",
      vi: "Tạo kiểu .hero-container với width: min(100% - 40px, 1200px), margin-inline: auto và padding-block: clamp(32px, 6vw, 96px). Tạo kiểu .hero-title với font-size: clamp(2rem, 1.25rem + 3vw, 4.5rem)."
    },
    requirements: [
      { en: "width: min(100% - 40px, 1200px)", vi: "width: min(100% - 40px, 1200px)" },
      { en: "margin-inline: auto", vi: "margin-inline: auto" },
      { en: "padding-block: clamp(32px, 6vw, 96px)", vi: "padding-block: clamp(32px, 6vw, 96px)" },
      { en: "font-size: clamp(2rem, 1.25rem + 3vw, 4.5rem)", vi: "font-size: clamp(2rem, 1.25rem + 3vw, 4.5rem)" }
    ],
    starterCode: `.hero-container {\n}\n\n.hero-title {\n}`,
    solutionCode: `.hero-container {\n  width: min(100% - 40px, 1200px);\n  margin-inline: auto;\n  padding-block: clamp(32px, 6vw, 96px);\n}\n\n.hero-title {\n  font-size: clamp(2rem, 1.25rem + 3vw, 4.5rem);\n}`,
    hints: [
      {
        en: "Use min() for container width and clamp() for padding and font-size.",
        vi: "Dùng min() cho chiều rộng khung và clamp() cho khoảng cách đệm và cỡ chữ."
      }
    ],
    solutionExplanation: {
      en: "Combining min() and clamp() creates modern layouts that adapt fluidly across all devices without breakpoint maintenance.",
      vi: "Kết hợp min() và clamp() tạo nên layout hiện đại co giãn mượt mà trên mọi thiết bị mà không cần viết media query."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_19_1",
      type: "single_choice",
      question: {
        en: "What are the three arguments passed to `clamp(MIN, PREFERRED, MAX)`?",
        vi: "Ba tham số truyền vào hàm `clamp(MIN, PREFERRED, MAX)` có ý nghĩa lần lượt là gì?"
      },
      options: [
        { en: "Minimum floor value, preferred ideal flexible value, and maximum ceiling value", vi: "Giá trị sàn tối thiểu, giá trị lý tưởng co giãn mong muốn và giá trị trần tối đa" },
        { en: "Margin, padding, and border", vi: "Margin, padding và border" },
        { en: "Mobile size, tablet size, desktop size", vi: "Cỡ mobile, cỡ tablet, cỡ desktop" },
        { en: "Red, Green, Blue", vi: "Đỏ, Xanh lá, Xanh dương" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "clamp() ensures the output never drops below MIN and never exceeds MAX while scaling with PREFERRED.",
        vi: "clamp() đảm bảo giá trị không bao giờ nhỏ hơn MIN và không vượt quá MAX trong khi co giãn theo PREFERRED."
      },
      topicId: "css_math_functions",
      difficulty: "easy"
    },
    {
      id: "css_q_19_2",
      type: "single_choice",
      question: {
        en: "Why is `width: min(100% - 32px, 1200px);` a best practice for container wrappers?",
        vi: "Tại sao `width: min(100% - 32px, 1200px);` được xem là chuẩn mực tối ưu cho khung chứa container?"
      },
      options: [
        { en: "It automatically provides 16px side gutters on mobile while capping maximum width at 1200px on widescreen", vi: "Nó tự động tạo lề 16px ở 2 bên trên màn hình nhỏ đồng thời giới hạn chiều rộng tối đa 1200px trên màn hình lớn" },
        { en: "It prevents text from wrapping", vi: "Nó ngăn chữ không bị xuống dòng" },
        { en: "It hides horizontal scrollbars in JavaScript", vi: "Nó ẩn thanh cuộn ngang bằng JavaScript" },
        { en: "It accelerates GPU rendering", vi: "Nó tăng tốc render trên GPU" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`min()` picks `100% - 32px` whenever the screen is narrower than 1200px, and caps at `1200px` on larger screens.",
        vi: "`min()` sẽ chọn `100% - 32px` khi màn hình nhỏ hơn 1200px, và tự động khóa trần ở `1200px` trên màn hình lớn."
      },
      topicId: "css_math_functions",
      difficulty: "medium"
    },
    {
      id: "css_q_19_3",
      type: "true_false",
      question: {
        en: "True or False: Whitespace is strictly required around `+` and `-` operators inside `calc()`.",
        vi: "Đúng hay Sai: Khoảng trắng là bắt buộc tuyệt đối xung quanh các toán tử `+` và `-` bên trong hàm `calc()`."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Without whitespace, `calc(100%-10px)` is parsed as an identifier with a negative number, causing a syntax error.",
        vi: "Nếu thiếu khoảng trắng, `calc(100%-10px)` sẽ bị hiểu nhầm là một định danh kèm số âm, dẫn tới lỗi cú pháp vô hiệu hóa câu lệnh."
      },
      topicId: "css_math_functions",
      difficulty: "easy"
    },
    {
      id: "css_q_19_4",
      type: "single_choice",
      question: {
        en: "What does `max(50vw, 300px)` evaluate to when the viewport width is 800px (where 50vw = 400px)?",
        vi: "Hàm `max(50vw, 300px)` trả về giá trị nào khi chiều rộng màn hình là 800px (khi đó 50vw = 400px)?"
      },
      options: [
        { en: "400px (since 400px > 300px)", vi: "400px (vì 400px > 300px)" },
        { en: "300px", vi: "300px" },
        { en: "800px", vi: "800px" },
        { en: "150px", vi: "150px" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`max()` selects the largest value between 400px and 300px, which is 400px.",
        vi: "`max()` chọn giá trị lớn nhất giữa 400px và 300px, kết quả là 400px."
      },
      topicId: "css_math_functions",
      difficulty: "medium"
    },
    {
      id: "css_q_19_5",
      type: "single_choice",
      question: {
        en: "Can CSS variables (`var(--token)`) be nested and used inside `calc()` or `clamp()`?",
        vi: "Có thể lồng biến CSS (`var(--token)`) bên trong hàm `calc()` hoặc `clamp()` không?"
      },
      options: [
        { en: "Yes, variables are fully resolved and dynamically evaluated inside CSS math functions", vi: "Có, biến CSS được phân giải hoàn toàn và tính toán động bình thường bên trong các hàm toán học" },
        { en: "No, math functions only accept raw numbers", vi: "Không, hàm toán học chỉ nhận số thuần túy" },
        { en: "Only in Google Chrome", vi: "Chỉ chạy được trên Google Chrome" },
        { en: "Only for color values", vi: "Chỉ dùng được cho màu sắc" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "CSS variables are dynamically evaluated inside math expressions (e.g. `calc(var(--base-unit) * 2)`).",
        vi: "Biến CSS được tính toán trực tiếp trong biểu thức toán học (ví dụ `calc(var(--base-unit) * 2)`)."
      },
      topicId: "css_math_functions",
      difficulty: "easy"
    },
    {
      id: "css_q_19_6",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: The CSS mathematical function used to select the largest value among given options is ________(value1, value2)",
        vi: "Điền vào chỗ trống: Hàm toán học CSS dùng để chọn giá trị lớn nhất trong các giá trị truyền vào là ________(value1, value2)"
      },
      fillBlankAnswers: ["max"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: "max() returns the largest value from a comma-separated list.",
        vi: "max() trả về giá trị lớn nhất từ danh sách các tham số."
      },
      topicId: "css_math_functions",
      difficulty: "easy"
    },
    {
      id: "css_q_19_7",
      type: "multiple_choice",
      question: {
        en: "Which of the following are valid modern CSS mathematical functions? (Select all that apply)",
        vi: "Những hàm nào sau đây là hàm toán học CSS hiện đại hợp lệ? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "calc()", vi: "calc()" },
        { en: "clamp()", vi: "clamp()" },
        { en: "min()", vi: "min()" },
        { en: "round()", vi: "round()" }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: "calc, clamp, min, max, round, mod, rem, sin, cos, and abs are all part of the CSS Values and Units Level 4 specification.",
        vi: "calc, clamp, min, max, round, mod, rem, sin, cos và abs đều thuộc đặc tả toán học CSS Values and Units Level 4."
      },
      topicId: "css_math_functions",
      difficulty: "medium"
    },
    {
      id: "css_q_19_8",
      type: "single_choice",
      question: {
        en: "What happens if the preferred value in `clamp(16px, 10vw, 32px)` evaluates to `12px`?",
        vi: "Điều gì xảy ra nếu giá trị preferred trong `clamp(16px, 10vw, 32px)` tính ra kết quả là `12px`?"
      },
      options: [
        { en: "The function clamps and outputs `16px` (the minimum limit)", vi: "Hàm sẽ tự động kẹp và trả về `16px` (giới hạn sàn tối thiểu)" },
        { en: "It outputs 12px", vi: "Nó trả về 12px" },
        { en: "It throws an error", vi: "Nó báo lỗi" },
        { en: "It outputs 32px", vi: "Nó trả về 32px" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Because 12px is smaller than the 16px minimum, clamp() returns 16px.",
        vi: "Vì 12px nhỏ hơn giới hạn sàn 16px nên hàm clamp() sẽ trả về 16px."
      },
      topicId: "css_math_functions",
      difficulty: "easy"
    },
    {
      id: "css_q_19_9",
      type: "true_false",
      question: {
        en: "True or False: Multiplication (*) and division (/) inside `calc()` also strictly require spaces around their operators.",
        vi: "Đúng hay Sai: Phép nhân (*) và phép chia (/) trong `calc()` cũng bắt buộc phải có khoảng trắng quanh toán tử giống như phép cộng và trừ."
      },
      options: [
        { en: "False", vi: "Sai" },
        { en: "True", vi: "Đúng" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "While spaces are recommended for style consistency, CSS grammar only strictly requires spaces for `+` and `-` (to avoid collision with signs). However, division without spaces (`/`) can clash with shorthand properties.",
        vi: "Về mặt ngữ pháp CSS chỉ bắt buộc khoảng trắng cho `+` và `-`. Tuy nhiên đặt khoảng trắng cho tất cả các toán tử luôn là thói quen tốt nhất."
      },
      topicId: "css_math_functions",
      difficulty: "hard"
    },
    {
      id: "css_q_19_10",
      type: "predict_output",
      question: {
        en: "An element has `height: calc(100vh - 60px);`. If the viewport height is 900px, what is the computed height?",
        vi: "Một phần tử có `height: calc(100vh - 60px);`. Nếu chiều cao màn hình là 900px, chiều cao tính toán là bao nhiêu?"
      },
      options: [
        { en: "840px (900px - 60px)", vi: "840px (900px - 60px)" },
        { en: "900px", vi: "900px" },
        { en: "960px", vi: "960px" },
        { en: "60px", vi: "60px" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "100vh equals 900px. 900px - 60px = 840px.",
        vi: "100vh bằng 900px. 900px - 60px = 840px."
      },
      topicId: "css_math_functions",
      difficulty: "easy"
    }
  ]
};

// Lesson 20: Modern Pseudo-Class Selectors: :is(), :where(), :has()
const lesson20 = {
  id: "css_lesson_20",
  moduleId: "css_mod_adv_1",
  levelId: "advanced",
  courseId: "css",
  order: 2,
  topicId: "css_modern_selectors",
  title: {
    en: "Modern Pseudo-Class Selectors: :is(), :where(), :has()",
    vi: "Bộ Chọn Hiện Đại: :is(), :where() & 'Parent Selector' :has()"
  },
  summary: {
    en: "Master grouping with :is(), zero-specificity reset styling with :where(), and styling parent elements based on child state using :has().",
    vi: "Làm chủ gom nhóm với :is(), reset kiểu dáng không tăng độ ưu tiên với :where() và chọn phần tử cha dựa trên trạng thái con bằng :has()."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "CSS Selectors Level 4 introduces game-changing pseudo-classes: `:is()`, `:where()`, and `:has()`. The revolutionary `:has()` selector acts as a native 'parent and relational selector', eliminating decades of unnecessary JavaScript DOM listeners.",
      vi: "Chuẩn CSS Selectors Level 4 mang tới các pseudo-class đột phá: `:is()`, `:where()` và `:has()`. Đặc biệt, bộ chọn mang tính cách mạng `:has()` đóng vai trò là 'bộ chọn phần tử cha' chính thức của CSS, xóa bỏ hàng thập kỷ phải dùng JavaScript để bắt sự kiện thay đổi giao diện."
    },
    conceptExplanation: {
      en: "`:is(header, main, footer) p` compresses repetitive selector lists while taking the specificity of its highest-ranked argument. `:where()` functions identically to `:is()` but has **ZERO specificity** (`(0, 0, 0)`), making it the ultimate tool for CSS design systems and CSS resets that can be easily overridden. `:has()` checks if a parent contains matching descendants (e.g. `form:has(input:invalid)` or `figure:has(figcaption)`), allowing parents and preceding siblings to style dynamically based on descendant state.",
      vi: "`:is(header, main, footer) p` gom gọn danh sách bộ chọn trùng lặp và nhận độ ưu tiên specificity của đối số cao nhất trong danh sách. `:where()` hoạt động tương tự nhưng có **ĐỘ ƯU TIÊN BẰNG 0 TUYỆT ĐỐI** (`(0, 0, 0)`), là vũ khí tối thượng để viết CSS Reset và thư viện component dễ dàng bị ghi đè. `:has()` kiểm tra xem phần tử cha có chứa con thỏa mãn điều kiện hay không (ví dụ `form:has(input:invalid)` hoặc `figure:has(figcaption)`), cho phép định kiểu thẻ cha và thẻ anh em liền trước một cách linh hoạt."
    },
    syntax: `/* Zero-specificity CSS reset with :where() */\n:where(h1, h2, h3, h4) {\n  margin-block-start: 0;\n  line-height: 1.2;\n}\n\n/* Parent styling with :has() */\n.card:has(img) {\n  padding: 0; /* Remove padding if card contains an image */\n}\n\n/* Form validation state on container */\n.form-group:has(input:focus) {\n  border-color: #3b82f6;\n}`,
    examples: [
      {
        title: {
          en: "Interactive Modal Backdrop via :has()",
          vi: "Đổi Màu Toàn Bộ Trang Khi Mở Modal Bằng :has()"
        },
        description: {
          en: "Locks body scroll and applies backdrop blur whenever a modal dialog is open, without JavaScript.",
          vi: "Khóa cuộn trang body và làm mờ nền khi có modal mở mà không cần dùng JavaScript."
        },
        code: `/* Lock body scroll when dialog open */\nbody:has(dialog[open]) {\n  overflow: hidden;\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Assuming :where() adds class specificity when styling components.",
          vi: "Nghĩ rằng :where() làm tăng độ ưu tiên khi tạo kiểu cho component."
        },
        correction: {
          en: "Remember :where() always has specificity (0, 0, 0). Use :is() if you want specificity preserved.",
          vi: "Ghi nhớ :where() luôn có specificity là 0. Dùng :is() nếu muốn giữ nguyên độ ưu tiên."
        }
      }
    ],
    tips: [
      {
        en: "Use :has() to create pure CSS dark mode toggles: html:has(#dark-mode-checkbox:checked).",
        vi: "Dùng :has() để tạo tính năng chuyển giao diện tối thuần CSS: html:has(#dark-mode-checkbox:checked)."
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_20_1",
      type: "complete_code",
      title: {
        en: "Style Parent Card When Checked with :has()",
        vi: "Tạo Kiểu Cho Khung Cha Khi Checkbox Được Chọn Bằng :has()"
      },
      instruction: {
        en: "Add a selector .todo-card:has(input:checked) that sets opacity: 0.6 and text-decoration: line-through on .todo-card.",
        vi: "Thêm bộ chọn .todo-card:has(input:checked) đặt opacity: 0.6 và text-decoration: line-through cho .todo-card."
      },
      starterCode: `/* Style .todo-card when it contains a checked input */`,
      solutionCode: `.todo-card:has(input:checked) {\n  opacity: 0.6;\n  text-decoration: line-through;\n}`,
      hint: {
        en: "Use .todo-card:has(input:checked) { opacity: 0.6; text-decoration: line-through; }",
        vi: "Dùng .todo-card:has(input:checked) { opacity: 0.6; text-decoration: line-through; }"
      },
      explanation: {
        en: ":has(input:checked) matches the parent .todo-card only when an inner checkbox is active.",
        vi: ":has(input:checked) chỉ khớp với thẻ cha .todo-card khi checkbox bên trong đang được tích chọn."
      }
    },
    {
      id: "css_ex_20_2",
      type: "fix_code",
      title: {
        en: "Write Zero-Specificity Reset with :where()",
        vi: "Viết CSS Reset Độ Ưu Tiên Bằng 0 Với :where()"
      },
      instruction: {
        en: "Wrap the selectors in :where(h1, h2, h3) to ensure zero specificity for typography resets.",
        vi: "Bọc các bộ chọn vào trong :where(h1, h2, h3) để đảm bảo độ ưu tiên bằng 0 cho phần reset."
      },
      starterCode: `h1, h2, h3 {\n  margin-top: 0;\n}`,
      solutionCode: `:where(h1, h2, h3) {\n  margin-top: 0;\n}`,
      hint: {
        en: "Use :where(h1, h2, h3) { margin-top: 0; }",
        vi: "Dùng :where(h1, h2, h3) { margin-top: 0; }"
      },
      explanation: {
        en: ":where() has (0,0,0) specificity, allowing any downstream utility class to override it effortlessly.",
        vi: ":where() có độ ưu tiên bằng 0, cho phép mọi class tiện ích ghi đè mà không gặp trở ngại."
      }
    }
  ],
  challenge: {
    id: "css_ch_20",
    title: {
      en: "Build an Interactive Form Group with :has() Validation",
      vi: "Xây Dựng Khối Form Tương Tác Bằng Bộ Chọn :has()"
    },
    description: {
      en: "Style .form-field:has(input:focus) with border-color: #3b82f6 and box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2). Style .form-field:has(input:invalid:not(:placeholder-shown)) with border-color: #ef4444.",
      vi: "Tạo kiểu .form-field:has(input:focus) với border-color: #3b82f6 và box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2). Tạo kiểu .form-field:has(input:invalid:not(:placeholder-shown)) với border-color: #ef4444."
    },
    requirements: [
      { en: ".form-field:has(input:focus)", vi: ".form-field:has(input:focus)" },
      { en: "border-color: #3b82f6", vi: "border-color: #3b82f6" },
      { en: "box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2)", vi: "box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2)" },
      { en: ".form-field:has(input:invalid:not(:placeholder-shown))", vi: ".form-field:has(input:invalid:not(:placeholder-shown))" },
      { en: "border-color: #ef4444", vi: "border-color: #ef4444" }
    ],
    starterCode: `/* Dynamic form state styling */\n.form-field:has(input:focus) {\n}\n\n.form-field:has(input:invalid:not(:placeholder-shown)) {\n}`,
    solutionCode: `.form-field:has(input:focus) {\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);\n}\n\n.form-field:has(input:invalid:not(:placeholder-shown)) {\n  border-color: #ef4444;\n}`,
    hints: [
      {
        en: "Use :has() with pseudo-classes like :focus and :invalid.",
        vi: "Dùng :has() kết hợp cùng các pseudo-class như :focus và :invalid."
      }
    ],
    solutionExplanation: {
      en: ":has() allows container elements to react instantly to user input events without JS class toggling.",
      vi: ":has() giúp thẻ cha phản ứng tức thì với các sự kiện nhập liệu của người dùng mà không cần JavaScript bật tắt class."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_20_1",
      type: "single_choice",
      question: {
        en: "What is the specificity weight of the `:where()` pseudo-class selector?",
        vi: "Độ ưu tiên (specificity weight) của bộ chọn pseudo-class `:where()` là bao nhiêu?"
      },
      options: [
        { en: "Always exactly 0 (0, 0, 0)", vi: "Luôn luôn bằng 0 tuyệt đối (0, 0, 0)" },
        { en: "The specificity of its highest argument", vi: "Bằng độ ưu tiên của đối số cao nhất bên trong nó" },
        { en: "Equal to one class (0, 1, 0)", vi: "Tương đương 1 class (0, 1, 0)" },
        { en: "Equal to an ID (1, 0, 0)", vi: "Tương đương 1 ID (1, 0, 0)" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`:where()` always contributes 0 specificity, making it ideal for base resets that can be easily overridden.",
        vi: "`:where()` luôn có độ ưu tiên bằng 0, là lựa chọn số 1 để viết CSS reset không gây xung đột."
      },
      topicId: "css_modern_selectors",
      difficulty: "easy"
    },
    {
      id: "css_q_20_2",
      type: "single_choice",
      question: {
        en: "How does specificity calculation differ between `:is(.a, #b)` and `:where(.a, #b)`?",
        vi: "Cách tính độ ưu tiên khác nhau như thế nào giữa `:is(.a, #b)` và `:where(.a, #b)`?"
      },
      options: [
        { en: "`:is()` takes the specificity of its most specific argument (`#b` = 1,0,0), while `:where()` is always (0,0,0)", vi: "`:is()` lấy độ ưu tiên của đối số cao nhất (`#b` = 1,0,0), còn `:where()` luôn luôn bằng (0,0,0)" },
        { en: "`:is()` is always 0", vi: "`:is()` luôn bằng 0" },
        { en: "They calculate specificity identically", vi: "Chúng tính độ ưu tiên hoàn toàn giống nhau" },
        { en: "`:where()` takes the specificity of `#b`", vi: "`:where()` lấy độ ưu tiên của `#b`" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`:is()` adopts the maximum specificity from its list of selectors, whereas `:where()` always discards all specificity.",
        vi: "`:is()` nhận độ ưu tiên cao nhất trong danh sách đối số, còn `:where()` triệt tiêu toàn bộ độ ưu tiên về 0."
      },
      topicId: "css_modern_selectors",
      difficulty: "medium"
    },
    {
      id: "css_q_20_3",
      type: "single_choice",
      question: {
        en: "What does the selector `article:has(img)` match?",
        vi: "Bộ chọn `article:has(img)` sẽ chọn phần tử nào trong DOM?"
      },
      options: [
        { en: "Matches any `<article>` element that contains at least one `<img>` descendant", vi: "Chọn bất kỳ thẻ `<article>` nào có chứa ít nhất một thẻ con `<img>` bên trong" },
        { en: "Matches the `<img>` tag inside the article", vi: "Chọn thẻ `<img>` nằm trong bài viết" },
        { en: "Matches articles that do NOT have images", vi: "Chọn các bài viết KHÔNG có ảnh" },
        { en: "Creates a new image tag inside article", vi: "Tự tạo một thẻ ảnh mới trong bài viết" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`:has()` styles the target element (`article`) based on the presence of matching descendants (`img`).",
        vi: "`:has()` áp dụng kiểu dáng lên chính phần tử mục tiêu (`article`) dựa trên sự tồn tại của phần tử con (`img`)."
      },
      topicId: "css_modern_selectors",
      difficulty: "easy"
    },
    {
      id: "css_q_20_4",
      type: "true_false",
      question: {
        en: "True or False: `:has()` can be combined with sibling combinators (e.g. `h1:has(+ p)` matches an `h1` immediately followed by a paragraph).",
        vi: "Đúng hay Sai: `:has()` có thể kết hợp với các bộ chọn anh em liền kề (ví dụ `h1:has(+ p)` chọn thẻ `h1` có ngay một thẻ đoạn văn đi liền phía sau)."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`:has()` fully supports relative selectors like `+`, `~`, and `>` (e.g. `h1:has(+ p)`).",
        vi: "`:has()` hỗ trợ đầy đủ các bộ chọn quan hệ như `+`, `~` và `>` (ví dụ `h1:has(+ p)`)."
      },
      topicId: "css_modern_selectors",
      difficulty: "medium"
    },
    {
      id: "css_q_20_5",
      type: "single_choice",
      question: {
        en: "What happens if one selector inside `:is(:invalid-selector, .valid-class)` is invalid?",
        vi: "Điều gì xảy ra nếu có một bộ chọn không hợp lệ nằm trong danh sách `:is(:invalid-selector, .valid-class)`?"
      },
      options: [
        { en: "The browser forgives the invalid selector and continues matching `.valid-class` (Forgiving Selector List)", vi: "Trình duyệt bỏ qua bộ chọn lỗi và vẫn tiếp tục áp dụng cho `.valid-class` (Danh Sách Bộ Chọn Khoan Dung)" },
        { en: "The entire CSS stylesheet breaks", vi: "Toàn bộ file CSS bị hỏng" },
        { en: "The valid class is ignored", vi: "Class hợp lệ bị bỏ qua" },
        { en: "The browser throws a JS exception", vi: "Trình duyệt ném ra ngoại lệ JS" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`:is()` and `:where()` use forgiving selector parsing, meaning invalid items in the list do not invalidate the entire rule.",
        vi: "`:is()` và `:where()` sử dụng cơ chế phân tích khoan dung, một mục bị lỗi sẽ không làm vô hiệu hóa các mục hợp lệ còn lại."
      },
      topicId: "css_modern_selectors",
      difficulty: "hard"
    },
    {
      id: "css_q_20_6",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: The CSS selector known as the 'Parent Selector' is :________",
        vi: "Điền vào chỗ trống: Bộ chọn CSS được mệnh danh là 'Parent Selector' là :________"
      },
      fillBlankAnswers: ["has"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: ":has() allows styling an element based on its descendants.",
        vi: ":has() cho phép tạo kiểu cho phần tử dựa trên các con bên trong nó."
      },
      topicId: "css_modern_selectors",
      difficulty: "easy"
    },
    {
      id: "css_q_20_7",
      type: "multiple_choice",
      question: {
        en: "Which of the following are valid uses of the `:has()` pseudo-class? (Select all that apply)",
        vi: "Những cách sử dụng nào sau đây của `:has()` là hoàn toàn hợp lệ? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "form:has(:focus)", vi: "form:has(:focus)" },
        { en: "li:has(> ul)", vi: "li:has(> ul)" },
        { en: "body:has(dialog[open])", vi: "body:has(dialog[open])" },
        { en: ":has(:has(.nested)) (Nested :has)", vi: ":has(:has(.nested)) (Lồng :has trong :has)" }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: ":has() cannot be nested inside another :has(). form:has(:focus), li:has(> ul), and body:has(dialog[open]) are standard valid patterns.",
        vi: ":has() không được phép lồng bên trong một :has() khác. Ba trường hợp đầu là các mẫu thiết kế chuẩn."
      },
      topicId: "css_modern_selectors",
      difficulty: "hard"
    },
    {
      id: "css_q_20_8",
      type: "single_choice",
      question: {
        en: "How do you select a navigation link that is NOT active using modern negation pseudo-class?",
        vi: "Làm thế nào để chọn liên kết menu KHÔNG có class active bằng pseudo-class phủ định?"
      },
      options: [
        { en: "a.nav-link:not(.active)", vi: "a.nav-link:not(.active)" },
        { en: "a.nav-link:without(.active)", vi: "a.nav-link:without(.active)" },
        { en: "a.nav-link:is(!.active)", vi: "a.nav-link:is(!.active)" },
        { en: "a.nav-link:false(.active)", vi: "a.nav-link:false(.active)" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`:not(.active)` filters out elements containing the matching class.",
        vi: "`:not(.active)` loại bỏ các phần tử có chứa class tương ứng."
      },
      topicId: "css_modern_selectors",
      difficulty: "easy"
    },
    {
      id: "css_q_20_9",
      type: "true_false",
      question: {
        en: "True or False: `:is(h1, h2, h3)` takes the same amount of code execution as writing three separate selectors `h1, h2, h3`.",
        vi: "Đúng hay Sai: `:is(h1, h2, h3)` giúp viết code ngắn gọn hơn nhưng trình duyệt vẫn tối ưu hóa tốc độ khớp selector tương đương."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`:is()` simplifies authoring without incurring performance penalties in modern rendering engines.",
        vi: "`:is()` giúp viết mã nguồn gọn gàng mà không làm giảm tốc độ xử lý của trình duyệt."
      },
      topicId: "css_modern_selectors",
      difficulty: "easy"
    },
    {
      id: "css_q_20_10",
      type: "single_choice",
      question: {
        en: "What does `section:has(> h2 + p)` match?",
        vi: "`section:has(> h2 + p)` sẽ khớp với phần tử nào?"
      },
      options: [
        { en: "A `<section>` that has a direct child `<h2>` immediately followed by a `<p>`", vi: "Một thẻ `<section>` có con trực tiếp là `<h2>` và đi liền ngay sau `<h2>` là một thẻ `<p>`" },
        { en: "The `<p>` tag inside the section", vi: "Thẻ `<p>` nằm trong section" },
        { en: "The `<h2>` tag inside the section", vi: "Thẻ `<h2>` nằm trong section" },
        { en: "All sections without headings", vi: "Tất cả các section không có tiêu đề" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "It targets the `<section>` based on the precise child sequence: direct child h2 followed immediately by p.",
        vi: "Nó chọn thẻ `<section>` dựa trên đúng trình tự: con trực tiếp h2 có ngay thẻ p đi liền sau."
      },
      topicId: "css_modern_selectors",
      difficulty: "medium"
    }
  ]
};

// Lesson 21: Container Queries & Component-Driven Layouts
const lesson21 = {
  id: "css_lesson_21",
  moduleId: "css_mod_adv_1",
  levelId: "advanced",
  courseId: "css",
  order: 3,
  topicId: "css_container_queries",
  title: {
    en: "Container Queries & Component-Driven Responsive Design",
    vi: "Container Queries & Thiết Kế Đáp Ứng Theo Kích Thước Component"
  },
  summary: {
    en: "Master container-type: inline-size, container-name, @container queries, cqw/cqh container query units, and truly modular UI components.",
    vi: "Làm chủ container-type: inline-size, container-name, truy vấn @container, đơn vị cqw/cqh và xây dựng component tự đáp ứng theo khung chứa."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "For 15 years, responsive design was locked to the browser viewport. **Container Queries (`@container`)** revolutionize frontend architecture by allowing components to adapt based on the width of their immediate parent container, enabling reusable components that look perfect whether placed in a narrow sidebar or a wide main workspace.",
      vi: "Trong suốt 15 năm, thiết kế đáp ứng luôn bị trói buộc vào khung nhìn toàn màn hình. **Container Queries (`@container`)** tạo ra cuộc cách mạng kiến trúc giao diện khi cho phép component tự biến đổi theo độ rộng của khung cha chứa nó, giúp component tái sử dụng hoàn hảo dù đặt trong sidebar hẹp hay không gian chính rộng lớn."
    },
    conceptExplanation: {
      en: "To create a containment context, set `container-type: inline-size` (and optional `container-name: card`) on the parent wrapper. Child elements can then use `@container (width >= 400px)` to change layouts independently of the viewport. Container Query units (`1cqw` = 1% of container width, `1cqh` = 1% of container height) enable container-proportional font sizes and padding.",
      vi: "Để tạo một ngữ cảnh container, đặt `container-type: inline-size` (và tùy chọn `container-name: card`) trên thẻ bao bọc cha. Các phần tử con bên trong sẽ dùng câu lệnh `@container (width >= 400px)` để tự đổi bố cục mà không quan tâm màn hình to hay nhỏ. Các đơn vị container query (`1cqw` = 1% chiều rộng container, `1cqh` = 1% chiều cao container) giúp cỡ chữ và khoảng đệm tự co giãn theo khung chứa."
    },
    syntax: `/* Define container context on parent */\n.card-wrapper {\n  container-type: inline-size;\n  container-name: product-card;\n}\n\n/* Card layout adapts to parent container width */\n.card-content {\n  display: flex;\n  flex-direction: column;\n}\n\n@container (width >= 450px) {\n  .card-content {\n    flex-direction: row;\n    gap: 20px;\n  }\n}`,
    examples: [
      {
        title: {
          en: "Adaptive User Profile Card",
          vi: "Thẻ Hồ Sơ Người Dùng Tự Động Thích Ứng Mọi Vị Trí"
        },
        description: {
          en: "Stacks vertically in narrow sidebars (<350px) and switches to horizontal layout when in wide main areas (>=350px).",
          vi: "Xếp dọc khi nằm trong sidebar hẹp (<350px) và tự chuyển sang hàng ngang khi nằm trong vùng làm việc rộng (>=350px)."
        },
        code: `.profile-container {\n  container-type: inline-size;\n}\n\n.profile-card {\n  display: flex;\n  flex-direction: column;\n  padding: 16px;\n}\n\n@container (width >= 350px) {\n  .profile-card {\n    flex-direction: row;\n    align-items: center;\n    gap: 16px;\n  }\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Applying @container query styles to the container element itself instead of its children.",
          vi: "Áp dụng câu lệnh @container query lên chính thẻ cha làm container thay vì áp dụng cho các con bên trong nó."
        },
        correction: {
          en: "Container queries evaluate the parent container to style descendants inside that container.",
          vi: "Container queries đo kích thước thẻ cha để áp dụng kiểu dáng cho các phần tử con bên trong thẻ cha đó."
        }
      }
    ],
    tips: [
      {
        en: "Always declare container-type: inline-size rather than container-type: size unless you explicitly need vertical container height queries.",
        vi: "Luôn dùng container-type: inline-size thay vì container-type: size trừ khi bạn thực sự cần đo chiều cao dọc của container."
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_21_1",
      type: "complete_code",
      title: {
        en: "Establish Container Context",
        vi: "Thiết Lập Ngữ Cảnh Container Cho Khung Cha"
      },
      instruction: {
        en: "Add container-type: inline-size to .widget-wrapper.",
        vi: "Thêm container-type: inline-size vào .widget-wrapper."
      },
      starterCode: `.widget-wrapper {\n  /* Define container context */\n}`,
      solutionCode: `.widget-wrapper {\n  container-type: inline-size;\n}`,
      hint: {
        en: "Use container-type: inline-size;",
        vi: "Dùng container-type: inline-size;"
      },
      explanation: {
        en: "container-type: inline-size establishes a queryable container on the horizontal axis.",
        vi: "container-type: inline-size kích hoạt khả năng đo đạc kích thước theo chiều ngang cho khung chứa."
      }
    },
    {
      id: "css_ex_21_2",
      type: "fix_code",
      title: {
        en: "Write an @container Query",
        vi: "Viết Câu Lệnh Truy Vấn @container"
      },
      instruction: {
        en: "Write @container (width >= 400px) that sets .product-box to display: flex and flex-direction: row.",
        vi: "Viết @container (width >= 400px) để đặt .product-box thành display: flex và flex-direction: row."
      },
      starterCode: `.product-box {\n  display: flex;\n  flex-direction: column;\n}\n\n/* Add container query */`,
      solutionCode: `.product-box {\n  display: flex;\n  flex-direction: column;\n}\n\n@container (width >= 400px) {\n  .product-box {\n    flex-direction: row;\n  }\n}`,
      hint: {
        en: "Use @container (width >= 400px) { .product-box { flex-direction: row; } }",
        vi: "Dùng @container (width >= 400px) { .product-box { flex-direction: row; } }"
      },
      explanation: {
        en: "@container queries evaluate parent container width instead of viewport width.",
        vi: "@container query đánh giá độ rộng của khung cha thay vì độ rộng của toàn màn hình."
      }
    }
  ],
  challenge: {
    id: "css_ch_21",
    title: {
      en: "Build a Fully Modular Adaptive Media Card",
      vi: "Xây Dựng Thẻ Đa Phương Tiện Tự Thích Ứng Hoàn Toàn"
    },
    description: {
      en: "Style .media-container with container-type: inline-size. Style .media-card with display: flex and flex-direction: column. Inside @container (width >= 500px), set .media-card to flex-direction: row and gap: 20px.",
      vi: "Tạo kiểu .media-container với container-type: inline-size. Tạo kiểu .media-card với display: flex và flex-direction: column. Trong @container (width >= 500px), đổi .media-card sang flex-direction: row và gap: 20px."
    },
    requirements: [
      { en: "container-type: inline-size", vi: "container-type: inline-size" },
      { en: "display: flex", vi: "display: flex" },
      { en: "flex-direction: column", vi: "flex-direction: column" },
      { en: "@container (width >= 500px)", vi: "@container (width >= 500px)" },
      { en: "flex-direction: row", vi: "flex-direction: row" }
    ],
    starterCode: `.media-container {\n}\n\n.media-card {\n}\n\n/* Container query */`,
    solutionCode: `.media-container {\n  container-type: inline-size;\n}\n\n.media-card {\n  display: flex;\n  flex-direction: column;\n}\n\n@container (width >= 500px) {\n  .media-card {\n    flex-direction: row;\n    gap: 20px;\n  }\n}`,
    hints: [
      {
        en: "Declare container-type on the wrapper and @container query on the card.",
        vi: "Khai báo container-type trên khung bọc và @container query cho card."
      }
    ],
    solutionExplanation: {
      en: "Container queries enable drop-in components that adapt anywhere on any page layout automatically.",
      vi: "Container queries tạo ra các component độc lập tự động biến đổi giao diện ở bất kỳ vị trí nào."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_21_1",
      type: "single_choice",
      question: {
        en: "What is the primary difference between `@media` queries and `@container` queries?",
        vi: "Sự khác biệt cốt lõi giữa `@media` query và `@container` query là gì?"
      },
      options: [
        { en: "`@media` queries inspect the entire browser viewport window, whereas `@container` queries inspect the width/height of the component's nearest container ancestor", vi: "`@media` query kiểm tra độ rộng toàn màn hình trình duyệt, còn `@container` query kiểm tra độ rộng của chính khung cha chứa component" },
        { en: "`@container` queries only run in JavaScript", vi: "`@container` query chỉ chạy được bằng JavaScript" },
        { en: "`@media` queries are deprecated", vi: "`@media` query đã bị khai tử" },
        { en: "`@container` queries cannot use flexbox", vi: "`@container` query không dùng được flexbox" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Container queries decouple component responsiveness from viewport dimensions, enabling true component-driven design.",
        vi: "Container queries giải phóng tính thích ứng của component khỏi màn hình trình duyệt, hiện thực hóa thiết kế hướng component thực thụ."
      },
      topicId: "css_container_queries",
      difficulty: "easy"
    },
    {
      id: "css_q_21_2",
      type: "single_choice",
      question: {
        en: "Which property must be declared on an ancestor element to establish it as a queryable container?",
        vi: "Thuộc tính nào bắt buộc phải khai báo trên thẻ tổ tiên để biến nó thành một container có thể truy vấn?"
      },
      options: [
        { en: "`container-type: inline-size;` (or `container: <name> / inline-size;`)", vi: "`container-type: inline-size;` (hoặc `container: <tên> / inline-size;`)" },
        { en: "`display: container;`", vi: "`display: container;`" },
        { en: "`query: true;`", vi: "`query: true;`" },
        { en: "`position: relative;`", vi: "`position: relative;`" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`container-type: inline-size` establishes containment along the horizontal axis.",
        vi: "`container-type: inline-size` kích hoạt cơ chế đo đạc kích thước theo trục ngang cho container."
      },
      topicId: "css_container_queries",
      difficulty: "easy"
    },
    {
      id: "css_q_21_3",
      type: "single_choice",
      question: {
        en: "What does the `10cqw` unit represent?",
        vi: "Đơn vị `10cqw` đại diện cho giá trị kích thước nào?"
      },
      options: [
        { en: "10% of the query container's inline width", vi: "10% chiều rộng của khung chứa container gần nhất" },
        { en: "10% of the viewport width", vi: "10% chiều rộng màn hình trình duyệt" },
        { en: "10 pixels container quality", vi: "10 pixel chất lượng container" },
        { en: "10 container queries per second", vi: "10 truy vấn container mỗi giây" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`cqw` (Container Query Width) represents 1% of the query container's width.",
        vi: "`cqw` (Container Query Width) đại diện cho 1% độ rộng của khung chứa container."
      },
      topicId: "css_container_queries",
      difficulty: "medium"
    },
    {
      id: "css_q_21_4",
      type: "true_false",
      question: {
        en: "True or False: An `@container` rule can target a specifically named container using `@container <name> (width >= 400px)`.",
        vi: "Đúng hay Sai: Một câu lệnh `@container` có thể nhắm đích danh vào một container đã đặt tên cụ thể bằng cú pháp `@container <tên> (width >= 400px)`."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Named containers (`container-name: card`) allow child elements to target specific ancestors when multiple nested containers exist.",
        vi: "Đặt tên container (`container-name: card`) giúp phần tử con nhắm đúng khung cha mong muốn khi có nhiều container lồng nhau."
      },
      topicId: "css_container_queries",
      difficulty: "medium"
    },
    {
      id: "css_q_21_5",
      type: "single_choice",
      question: {
        en: "Why is `container-type: inline-size` commonly preferred over `container-type: size`?",
        vi: "Tại sao `container-type: inline-size` thường được ưu tiên sử dụng hơn `container-type: size`?"
      },
      options: [
        { en: "`container-type: size` requires rigid height containment on both axes, preventing natural vertical content expansion and height collapsing", vi: "`container-type: size` đòi hỏi phải khóa cứng cả chiều cao 2 trục, khiến nội dung bên trong không thể tự giãn chiều cao tự nhiên" },
        { en: "`size` only works on images", vi: "`size` chỉ hoạt động trên hình ảnh" },
        { en: "`inline-size` is faster in JavaScript", vi: "`inline-size` nhanh hơn trong JavaScript" },
        { en: "`size` is not a valid CSS keyword", vi: "`size` không phải là từ khóa hợp lệ" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`inline-size` only contains the horizontal axis, allowing elements to grow vertically as tall as their content requires.",
        vi: "`inline-size` chỉ kiểm soát trục ngang, cho phép chiều cao của phần tử tự co giãn tự nhiên theo lượng chữ bên trong."
      },
      topicId: "css_container_queries",
      difficulty: "hard"
    },
    {
      id: "css_q_21_6",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: The CSS at-rule used to query parent container dimensions is @________",
        vi: "Điền vào chỗ trống: Quy tắc CSS at-rule dùng để truy vấn kích thước khung cha là @________"
      },
      fillBlankAnswers: ["container"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: "@container enables modular responsive rules.",
        vi: "@container kích hoạt các quy tắc đáp ứng độc lập cho component."
      },
      topicId: "css_container_queries",
      difficulty: "easy"
    },
    {
      id: "css_q_21_7",
      type: "multiple_choice",
      question: {
        en: "Which units are Container Query units? (Select all that apply)",
        vi: "Những đơn vị nào sau đây là đơn vị Container Query? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "cqw (1% of container width)", vi: "cqw (1% chiều rộng container)" },
        { en: "cqh (1% of container height)", vi: "cqh (1% chiều cao container)" },
        { en: "cqi (1% of container inline size)", vi: "cqi (1% kích thước inline của container)" },
        { en: "rem (Root font size)", vi: "rem (Cỡ font gốc)" }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: "cqw, cqh, cqi, cqb, cqmin, and cqmax are dedicated container query units. rem is root-relative.",
        vi: "cqw, cqh, cqi, cqb, cqmin và cqmax là các đơn vị container query. rem là đơn vị theo cỡ font gốc."
      },
      topicId: "css_container_queries",
      difficulty: "medium"
    },
    {
      id: "css_q_21_8",
      type: "single_choice",
      question: {
        en: "Can Container Queries be used inside a page that also uses standard `@media` queries?",
        vi: "Có thể kết hợp Container Queries trong một trang web đang dùng `@media` query truyền thống không?"
      },
      options: [
        { en: "Yes, combining @media for macro page scaffolding and @container for micro component interiors is best practice", vi: "Có, kết hợp @media cho khung sườn vĩ mô toàn trang và @container cho chi tiết vi mô bên trong component là chuẩn mực tối ưu" },
        { en: "No, they cancel each other out", vi: "Không, chúng sẽ triệt tiêu lẫn nhau" },
        { en: "Only on desktop browsers", vi: "Chỉ chạy được trên máy tính" },
        { en: "Only in WebAssembly", vi: "Chỉ chạy được trong WebAssembly" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Modern frontend architecture uses Media Queries for global viewport layout and Container Queries for self-contained components.",
        vi: "Kiến trúc hiện đại sử dụng Media Query cho bố cục toàn cục và Container Query cho từng component độc lập."
      },
      topicId: "css_container_queries",
      difficulty: "easy"
    },
    {
      id: "css_q_21_9",
      type: "true_false",
      question: {
        en: "True or False: If no parent has `container-type` declared, `@container` queries fall back to evaluating the small viewport.",
        vi: "Đúng hay Sai: Nếu không có thẻ cha nào khai báo `container-type`, câu lệnh `@container` query sẽ tự động căn theo kích thước khung nhìn nhỏ của trình duyệt."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "If no container context is established, container query units and queries fall back to the default small viewport.",
        vi: "Nếu không có container nào được thiết lập, container query sẽ lấy khung nhìn mặc định của trình duyệt làm căn cứ."
      },
      topicId: "css_container_queries",
      difficulty: "medium"
    },
    {
      id: "css_q_21_10",
      type: "single_choice",
      question: {
        en: "How do you assign both a name and an inline-size type to a container in a single line shorthand?",
        vi: "Làm thế nào để vừa đặt tên vừa gán kiểu inline-size cho một container chỉ trong một dòng ngắn gọn?"
      },
      options: [
        { en: "container: card-wrapper / inline-size;", vi: "container: card-wrapper / inline-size;" },
        { en: "container-setup: card-wrapper, inline-size;", vi: "container-setup: card-wrapper, inline-size;" },
        { en: "container-type: card-wrapper(inline-size);", vi: "container-type: card-wrapper(inline-size);" },
        { en: "box-container: card-wrapper 100%;", vi: "box-container: card-wrapper 100%;" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "The `container` shorthand syntax is `container: <container-name> / <container-type>`.",
        vi: "Cú pháp viết tắt chuẩn là `container: <tên-container> / <kiểu-container>`."
      },
      topicId: "css_container_queries",
      difficulty: "medium"
    }
  ]
};

// Save lessons
saveLesson('src/data/css/advanced/module01/lesson19.ts', 'lesson19', lesson19);
saveLesson('src/data/css/advanced/module01/lesson20.ts', 'lesson20', lesson20);
saveLesson('src/data/css/advanced/module01/lesson21.ts', 'lesson21', lesson21);
