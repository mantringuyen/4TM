import { Lesson } from '../../../../types';

export const lesson20: Lesson = {
  "id": "css_lesson_20",
  "moduleId": "css_mod_5",
  "levelId": "advanced",
  "courseId": "css",
  "order": 20,
  "topicId": "css_modern_selectors",
  "title": {
    "en": "Modern Pseudo-Class Selectors: :is(), :where(), :has()",
    "vi": "Bộ Chọn Hiện Đại: :is(), :where() & 'Parent Selector' :has()"
  },
  "summary": {
    "en": "Master grouping with :is(), zero-specificity reset styling with :where(), and styling parent elements based on child state using :has().",
    "vi": "Làm chủ gom nhóm với :is(), reset kiểu dáng không tăng độ ưu tiên với :where() và chọn phần tử cha dựa trên trạng thái con bằng :has()."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "CSS Selectors Level 4 introduces game-changing pseudo-classes: `:is()`, `:where()`, and `:has()`. The revolutionary `:has()` selector acts as a native 'parent and relational selector', eliminating decades of unnecessary JavaScript DOM listeners.",
      "vi": "Chuẩn CSS Selectors Level 4 mang tới các pseudo-class đột phá: `:is()`, `:where()` và `:has()`. Đặc biệt, bộ chọn mang tính cách mạng `:has()` đóng vai trò là 'bộ chọn phần tử cha' chính thức của CSS, xóa bỏ hàng thập kỷ phải dùng JavaScript để bắt sự kiện thay đổi giao diện."
    },
    "conceptExplanation": {
      "en": "`:is(header, main, footer) p` compresses repetitive selector lists while taking the specificity of its highest-ranked argument. `:where()` functions identically to `:is()` but has **ZERO specificity** (`(0, 0, 0)`), making it the ultimate tool for CSS design systems and CSS resets that can be easily overridden. `:has()` checks if a parent contains matching descendants (e.g. `form:has(input:invalid)` or `figure:has(figcaption)`), allowing parents and preceding siblings to style dynamically based on descendant state.",
      "vi": "`:is(header, main, footer) p` gom gọn danh sách bộ chọn trùng lặp và nhận độ ưu tiên specificity của đối số cao nhất trong danh sách. `:where()` hoạt động tương tự nhưng có **ĐỘ ƯU TIÊN BẰNG 0 TUYỆT ĐỐI** (`(0, 0, 0)`), là vũ khí tối thượng để viết CSS Reset và thư viện component dễ dàng bị ghi đè. `:has()` kiểm tra xem phần tử cha có chứa con thỏa mãn điều kiện hay không (ví dụ `form:has(input:invalid)` hoặc `figure:has(figcaption)`), cho phép định kiểu thẻ cha và thẻ anh em liền trước một cách linh hoạt."
    },
    "syntax": "/* Zero-specificity CSS reset with :where() */\n:where(h1, h2, h3, h4) {\n  margin-block-start: 0;\n  line-height: 1.2;\n}\n\n/* Parent styling with :has() */\n.card:has(img) {\n  padding: 0; /* Remove padding if card contains an image */\n}\n\n/* Form validation state on container */\n.form-group:has(input:focus) {\n  border-color: #3b82f6;\n}",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "Interactive Modal Backdrop via :has()",
          "vi": "Đổi Màu Toàn Bộ Trang Khi Mở Modal Bằng :has()"
        },
        "description": {
          "en": "Locks body scroll and applies backdrop blur whenever a modal dialog is open, without JavaScript.",
          "vi": "Khóa cuộn trang body và làm mờ nền khi có modal mở mà không cần dùng JavaScript."
        },
        "code": "/* Lock body scroll when dialog open */\nbody:has(dialog[open]) {\n  overflow: hidden;\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Assuming :where() adds class specificity when styling components.",
          "vi": "Nghĩ rằng :where() làm tăng độ ưu tiên khi tạo kiểu cho component."
        },
        "correction": {
          "en": "Remember :where() always has specificity (0, 0, 0). Use :is() if you want specificity preserved.",
          "vi": "Ghi nhớ :where() luôn có specificity là 0. Dùng :is() nếu muốn giữ nguyên độ ưu tiên."
        }
      }
    ],
    "tips": [
      {
        "en": "Use :has() to create pure CSS dark mode toggles: html:has(#dark-mode-checkbox:checked).",
        "vi": "Dùng :has() để tạo tính năng chuyển giao diện tối thuần CSS: html:has(#dark-mode-checkbox:checked)."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_20_1",
      "type": "complete_code",
      "title": {
        "en": "Style Parent Card When Checked with :has()",
        "vi": "Tạo Kiểu Cho Khung Cha Khi Checkbox Được Chọn Bằng :has()"
      },
      "instruction": {
        "en": "Add a selector .todo-card:has(input:checked) that sets opacity: 0.6 and text-decoration: line-through on .todo-card.",
        "vi": "Thêm bộ chọn .todo-card:has(input:checked) đặt opacity: 0.6 và text-decoration: line-through cho .todo-card."
      },
      "starterCode": "/* Style .todo-card when it contains a checked input */",
      "solutionCode": ".todo-card:has(input:checked) {\n  opacity: 0.6;\n  text-decoration: line-through;\n}",
      "hint": {
        "en": "Use .todo-card:has(input:checked) { opacity: 0.6; text-decoration: line-through; }",
        "vi": "Dùng .todo-card:has(input:checked) { opacity: 0.6; text-decoration: line-through; }"
      },
      "explanation": {
        "en": ":has(input:checked) matches the parent .todo-card only when an inner checkbox is active.",
        "vi": ":has(input:checked) chỉ khớp với thẻ cha .todo-card khi checkbox bên trong đang được tích chọn."
      }
    },
    {
      "id": "css_ex_20_2",
      "type": "fix_code",
      "title": {
        "en": "Write Zero-Specificity Reset with :where()",
        "vi": "Viết CSS Reset Độ Ưu Tiên Bằng 0 Với :where()"
      },
      "instruction": {
        "en": "Wrap the selectors in :where(h1, h2, h3) to ensure zero specificity for typography resets.",
        "vi": "Bọc các bộ chọn vào trong :where(h1, h2, h3) để đảm bảo độ ưu tiên bằng 0 cho phần reset."
      },
      "starterCode": "h1, h2, h3 {\n  margin-top: 0;\n}",
      "solutionCode": ":where(h1, h2, h3) {\n  margin-top: 0;\n}",
      "hint": {
        "en": "Use :where(h1, h2, h3) { margin-top: 0; }",
        "vi": "Dùng :where(h1, h2, h3) { margin-top: 0; }"
      },
      "explanation": {
        "en": ":where() has (0,0,0) specificity, allowing any downstream utility class to override it effortlessly.",
        "vi": ":where() có độ ưu tiên bằng 0, cho phép mọi class tiện ích ghi đè mà không gặp trở ngại."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_20",
    "title": {
      "en": "Build an Interactive Form Group with :has() Validation",
      "vi": "Xây Dựng Khối Form Tương Tác Bằng Bộ Chọn :has()"
    },
    "description": {
      "en": "Style .form-field:has(input:focus) with border-color: #3b82f6 and box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2). Style .form-field:has(input:invalid:not(:placeholder-shown)) with border-color: #ef4444.",
      "vi": "Tạo kiểu .form-field:has(input:focus) với border-color: #3b82f6 và box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2). Tạo kiểu .form-field:has(input:invalid:not(:placeholder-shown)) với border-color: #ef4444."
    },
    "requirements": [
      {
        "en": ".form-field:has(input:focus)",
        "vi": ".form-field:has(input:focus)"
      },
      {
        "en": "border-color: #3b82f6",
        "vi": "border-color: #3b82f6"
      },
      {
        "en": "box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2)",
        "vi": "box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2)"
      },
      {
        "en": ".form-field:has(input:invalid:not(:placeholder-shown))",
        "vi": ".form-field:has(input:invalid:not(:placeholder-shown))"
      },
      {
        "en": "border-color: #ef4444",
        "vi": "border-color: #ef4444"
      }
    ],
    "starterCode": "/* Dynamic form state styling */\n.form-field:has(input:focus) {\n}\n\n.form-field:has(input:invalid:not(:placeholder-shown)) {\n}",
    "solutionCode": ".form-field:has(input:focus) {\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);\n}\n\n.form-field:has(input:invalid:not(:placeholder-shown)) {\n  border-color: #ef4444;\n}",
    "hints": [
      {
        "en": "Use :has() with pseudo-classes like :focus and :invalid.",
        "vi": "Dùng :has() kết hợp cùng các pseudo-class như :focus và :invalid."
      }
    ],
    "solutionExplanation": {
      "en": ":has() allows container elements to react instantly to user input events without JS class toggling.",
      "vi": ":has() giúp thẻ cha phản ứng tức thì với các sự kiện nhập liệu của người dùng mà không cần JavaScript bật tắt class."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_20_1",
      "type": "single_choice",
      "question": {
        "en": "What is the specificity weight of the `:where()` pseudo-class selector?",
        "vi": "Độ ưu tiên (specificity weight) của bộ chọn pseudo-class `:where()` là bao nhiêu?"
      },
      "options": [
        {
          "en": "Always exactly 0 (0, 0, 0)",
          "vi": "Luôn luôn bằng 0 tuyệt đối (0, 0, 0)"
        },
        {
          "en": "The specificity of its highest argument",
          "vi": "Bằng độ ưu tiên của đối số cao nhất bên trong nó"
        },
        {
          "en": "Equal to one class (0, 1, 0)",
          "vi": "Tương đương 1 class (0, 1, 0)"
        },
        {
          "en": "Equal to an ID (1, 0, 0)",
          "vi": "Tương đương 1 ID (1, 0, 0)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`:where()` always contributes 0 specificity, making it ideal for base resets that can be easily overridden.",
        "vi": "`:where()` luôn có độ ưu tiên bằng 0, là lựa chọn số 1 để viết CSS reset không gây xung đột."
      },
      "topicId": "css_modern_selectors",
      "difficulty": "easy"
    },
    {
      "id": "css_q_20_2",
      "type": "single_choice",
      "question": {
        "en": "How does specificity calculation differ between `:is(.a, #b)` and `:where(.a, #b)`?",
        "vi": "Cách tính độ ưu tiên khác nhau như thế nào giữa `:is(.a, #b)` và `:where(.a, #b)`?"
      },
      "options": [
        {
          "en": "`:is()` takes the specificity of its most specific argument (`#b` = 1,0,0), while `:where()` is always (0,0,0)",
          "vi": "`:is()` lấy độ ưu tiên của đối số cao nhất (`#b` = 1,0,0), còn `:where()` luôn luôn bằng (0,0,0)"
        },
        {
          "en": "`:is()` is always 0",
          "vi": "`:is()` luôn bằng 0"
        },
        {
          "en": "They calculate specificity identically",
          "vi": "Chúng tính độ ưu tiên hoàn toàn giống nhau"
        },
        {
          "en": "`:where()` takes the specificity of `#b`",
          "vi": "`:where()` lấy độ ưu tiên của `#b`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`:is()` adopts the maximum specificity from its list of selectors, whereas `:where()` always discards all specificity.",
        "vi": "`:is()` nhận độ ưu tiên cao nhất trong danh sách đối số, còn `:where()` triệt tiêu toàn bộ độ ưu tiên về 0."
      },
      "topicId": "css_modern_selectors",
      "difficulty": "medium"
    },
    {
      "id": "css_q_20_3",
      "type": "single_choice",
      "question": {
        "en": "What does the selector `article:has(img)` match?",
        "vi": "Bộ chọn `article:has(img)` sẽ chọn phần tử nào trong DOM?"
      },
      "options": [
        {
          "en": "Matches any `<article>` element that contains at least one `<img>` descendant",
          "vi": "Chọn bất kỳ thẻ `<article>` nào có chứa ít nhất một thẻ con `<img>` bên trong"
        },
        {
          "en": "Matches the `<img>` tag inside the article",
          "vi": "Chọn thẻ `<img>` nằm trong bài viết"
        },
        {
          "en": "Matches articles that do NOT have images",
          "vi": "Chọn các bài viết KHÔNG có ảnh"
        },
        {
          "en": "Creates a new image tag inside article",
          "vi": "Tự tạo một thẻ ảnh mới trong bài viết"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`:has()` styles the target element (`article`) based on the presence of matching descendants (`img`).",
        "vi": "`:has()` áp dụng kiểu dáng lên chính phần tử mục tiêu (`article`) dựa trên sự tồn tại của phần tử con (`img`)."
      },
      "topicId": "css_modern_selectors",
      "difficulty": "easy"
    },
    {
      "id": "css_q_20_4",
      "type": "true_false",
      "question": {
        "en": "True or False: `:has()` can be combined with sibling combinators (e.g. `h1:has(+ p)` matches an `h1` immediately followed by a paragraph).",
        "vi": "Đúng hay Sai: `:has()` có thể kết hợp với các bộ chọn anh em liền kề (ví dụ `h1:has(+ p)` chọn thẻ `h1` có ngay một thẻ đoạn văn đi liền phía sau)."
      },
      "options": [
        {
          "en": "True",
          "vi": "Đúng"
        },
        {
          "en": "False",
          "vi": "Sai"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`:has()` fully supports relative selectors like `+`, `~`, and `>` (e.g. `h1:has(+ p)`).",
        "vi": "`:has()` hỗ trợ đầy đủ các bộ chọn quan hệ như `+`, `~` và `>` (ví dụ `h1:has(+ p)`)."
      },
      "topicId": "css_modern_selectors",
      "difficulty": "medium"
    },
    {
      "id": "css_q_20_5",
      "type": "single_choice",
      "question": {
        "en": "What happens if one selector inside `:is(:invalid-selector, .valid-class)` is invalid?",
        "vi": "Điều gì xảy ra nếu có một bộ chọn không hợp lệ nằm trong danh sách `:is(:invalid-selector, .valid-class)`?"
      },
      "options": [
        {
          "en": "The browser forgives the invalid selector and continues matching `.valid-class` (Forgiving Selector List)",
          "vi": "Trình duyệt bỏ qua bộ chọn lỗi và vẫn tiếp tục áp dụng cho `.valid-class` (Danh Sách Bộ Chọn Khoan Dung)"
        },
        {
          "en": "The entire CSS stylesheet breaks",
          "vi": "Toàn bộ file CSS bị hỏng"
        },
        {
          "en": "The valid class is ignored",
          "vi": "Class hợp lệ bị bỏ qua"
        },
        {
          "en": "The browser throws a JS exception",
          "vi": "Trình duyệt ném ra ngoại lệ JS"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`:is()` and `:where()` use forgiving selector parsing, meaning invalid items in the list do not invalidate the entire rule.",
        "vi": "`:is()` và `:where()` sử dụng cơ chế phân tích khoan dung, một mục bị lỗi sẽ không làm vô hiệu hóa các mục hợp lệ còn lại."
      },
      "topicId": "css_modern_selectors",
      "difficulty": "hard"
    },
    {
      "id": "css_q_20_6",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: The CSS selector known as the 'Parent Selector' is :________",
        "vi": "Điền vào chỗ trống: Bộ chọn CSS được mệnh danh là 'Parent Selector' là :________"
      },
      "fillBlankAnswers": [
        "has"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": ":has() allows styling an element based on its descendants.",
        "vi": ":has() cho phép tạo kiểu cho phần tử dựa trên các con bên trong nó."
      },
      "topicId": "css_modern_selectors",
      "difficulty": "easy"
    },
    {
      "id": "css_q_20_7",
      "type": "multiple_choice",
      "question": {
        "en": "Which of the following are valid uses of the `:has()` pseudo-class? (Select all that apply)",
        "vi": "Những cách sử dụng nào sau đây của `:has()` là hoàn toàn hợp lệ? (Chọn tất cả đáp án đúng)"
      },
      "options": [
        {
          "en": "form:has(:focus)",
          "vi": "form:has(:focus)"
        },
        {
          "en": "li:has(> ul)",
          "vi": "li:has(> ul)"
        },
        {
          "en": "body:has(dialog[open])",
          "vi": "body:has(dialog[open])"
        },
        {
          "en": ":has(:has(.nested)) (Nested :has)",
          "vi": ":has(:has(.nested)) (Lồng :has trong :has)"
        }
      ],
      "correctAnswers": [
        0,
        1,
        2
      ],
      "explanation": {
        "en": ":has() cannot be nested inside another :has(). form:has(:focus), li:has(> ul), and body:has(dialog[open]) are standard valid patterns.",
        "vi": ":has() không được phép lồng bên trong một :has() khác. Ba trường hợp đầu là các mẫu thiết kế chuẩn."
      },
      "topicId": "css_modern_selectors",
      "difficulty": "hard"
    },
    {
      "id": "css_q_20_8",
      "type": "single_choice",
      "question": {
        "en": "How do you select a navigation link that is NOT active using modern negation pseudo-class?",
        "vi": "Làm thế nào để chọn liên kết menu KHÔNG có class active bằng pseudo-class phủ định?"
      },
      "options": [
        {
          "en": "a.nav-link:not(.active)",
          "vi": "a.nav-link:not(.active)"
        },
        {
          "en": "a.nav-link:without(.active)",
          "vi": "a.nav-link:without(.active)"
        },
        {
          "en": "a.nav-link:is(!.active)",
          "vi": "a.nav-link:is(!.active)"
        },
        {
          "en": "a.nav-link:false(.active)",
          "vi": "a.nav-link:false(.active)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`:not(.active)` filters out elements containing the matching class.",
        "vi": "`:not(.active)` loại bỏ các phần tử có chứa class tương ứng."
      },
      "topicId": "css_modern_selectors",
      "difficulty": "easy"
    },
    {
      "id": "css_q_20_9",
      "type": "true_false",
      "question": {
        "en": "True or False: `:is(h1, h2, h3)` takes the same amount of code execution as writing three separate selectors `h1, h2, h3`.",
        "vi": "Đúng hay Sai: `:is(h1, h2, h3)` giúp viết code ngắn gọn hơn nhưng trình duyệt vẫn tối ưu hóa tốc độ khớp selector tương đương."
      },
      "options": [
        {
          "en": "True",
          "vi": "Đúng"
        },
        {
          "en": "False",
          "vi": "Sai"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`:is()` simplifies authoring without incurring performance penalties in modern rendering engines.",
        "vi": "`:is()` giúp viết mã nguồn gọn gàng mà không làm giảm tốc độ xử lý của trình duyệt."
      },
      "topicId": "css_modern_selectors",
      "difficulty": "easy"
    },
    {
      "id": "css_q_20_10",
      "type": "single_choice",
      "question": {
        "en": "What does `section:has(> h2 + p)` match?",
        "vi": "`section:has(> h2 + p)` sẽ khớp với phần tử nào?"
      },
      "options": [
        {
          "en": "A `<section>` that has a direct child `<h2>` immediately followed by a `<p>`",
          "vi": "Một thẻ `<section>` có con trực tiếp là `<h2>` và đi liền ngay sau `<h2>` là một thẻ `<p>`"
        },
        {
          "en": "The `<p>` tag inside the section",
          "vi": "Thẻ `<p>` nằm trong section"
        },
        {
          "en": "The `<h2>` tag inside the section",
          "vi": "Thẻ `<h2>` nằm trong section"
        },
        {
          "en": "All sections without headings",
          "vi": "Tất cả các section không có tiêu đề"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "It targets the `<section>` based on the precise child sequence: direct child h2 followed immediately by p.",
        "vi": "Nó chọn thẻ `<section>` dựa trên đúng trình tự: con trực tiếp h2 có ngay thẻ p đi liền sau."
      },
      "topicId": "css_modern_selectors",
      "difficulty": "medium"
    }
  ]
};
