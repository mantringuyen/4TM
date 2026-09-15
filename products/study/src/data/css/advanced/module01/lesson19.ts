import { Lesson } from '../../../../types';

export const lesson19: Lesson = {
  "id": "css_lesson_19",
  "moduleId": "css_mod_5",
  "levelId": "advanced",
  "courseId": "css",
  "order": 19,
  "topicId": "css_math_functions",
  "title": {
    "en": "Mathematical Functions: calc(), min(), max(), clamp()",
    "vi": "Hàm Toán Học CSS: calc(), min(), max(), clamp()"
  },
  "summary": {
    "en": "Master dynamic calculations, fluid responsive typography with clamp(), viewport boundary locking with min()/max(), and zero-media-query fluid scaling.",
    "vi": "Làm chủ tính toán động, kiểu chữ co giãn mượt mà với clamp(), khóa biên màn hình với min()/max() và co giãn tự động không cần media query."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "CSS math functions (`calc()`, `min()`, `max()`, `clamp()`) empower developers to perform dynamic arithmetic calculations across mixed units directly in the browser, enabling truly fluid layouts and typography without brittle breakpoint jumps.",
      "vi": "Các hàm toán học trong CSS (`calc()`, `min()`, `max()`, `clamp()`) cho phép lập trình viên thực hiện các phép tính số học động giữa nhiều loại đơn vị khác nhau trực tiếp trên trình duyệt, tạo nên giao diện và chữ co giãn mượt mà mà không bị giật nấc breakpoint."
    },
    "conceptExplanation": {
      "en": "`calc()` combines mixed units (e.g. `calc(100% - 32px)`). `min(a, b)` selects the smallest value (acting as a ceiling/maximum constraint). `max(a, b)` selects the largest value (acting as a floor/minimum constraint). `clamp(min, preferred, max)` bounds a flexible value between lower and upper limits. For fluid responsive typography, `font-size: clamp(1.5rem, 1rem + 2.5vw, 3rem)` dynamically scales text smoothly between mobile and desktop viewports.",
      "vi": "`calc()` tính toán kết hợp nhiều đơn vị khác nhau (ví dụ `calc(100% - 32px)`). `min(a, b)` chọn giá trị nhỏ nhất (đóng vai trò chặn trần tối đa). `max(a, b)` chọn giá trị lớn nhất (đóng vai trò chặn sàn tối thiểu). `clamp(min, preferred, max)` kẹp giá trị co giãn giữa ngưỡng dưới và ngưỡng trên. Để tạo kiểu chữ co giãn linh hoạt, công thức `font-size: clamp(1.5rem, 1rem + 2.5vw, 3rem)` giúp cỡ chữ tăng giảm mượt mà theo độ rộng màn hình."
    },
    "syntax": "/* Fluid typography without media queries */\nh1.fluid-headline {\n  font-size: clamp(2rem, 1.25rem + 3vw, 4.5rem);\n  line-height: 1.1;\n}\n\n/* Clamped container width */\n.container {\n  width: min(100% - 32px, 1200px);\n  margin-inline: auto;\n}",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "Fluid Dynamic Layout Container",
          "vi": "Khung Chứa Co Giãn Tự Động Theo Màn Hình"
        },
        "description": {
          "en": "Keeps container centered with 16px side gutters on mobile and capped at 1280px on desktop.",
          "vi": "Giữ khung chứa căn giữa với lề 16px trên điện thoại và khóa trần 1280px trên máy tính."
        },
        "code": ".shell {\n  width: min(100% - 32px, 1280px);\n  margin-inline: auto;\n  padding-block: clamp(16px, 4vw, 64px);\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Omitting spaces around + and - operators inside calc() (e.g. calc(100%-20px)), causing a CSS syntax error.",
          "vi": "Quên dấu cách quanh dấu cộng (+) và trừ (-) trong calc() (ví dụ calc(100%-20px)) khiến câu lệnh bị lỗi cú pháp."
        },
        "correction": {
          "en": "Always include whitespace around + and - operators: calc(100% - 20px).",
          "vi": "Luôn đặt dấu cách trước và sau dấu + và -: calc(100% - 20px)."
        }
      }
    ],
    "tips": [
      {
        "en": "Use width: min(100% - 32px, 1200px) instead of max-width + width + margin to achieve responsive centering in one line.",
        "vi": "Dùng width: min(100% - 32px, 1200px) thay cho bộ ba max-width + width + margin để căn giữa đáp ứng chỉ trong 1 dòng."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_19_1",
      "type": "complete_code",
      "title": {
        "en": "Implement Fluid Heading with clamp()",
        "vi": "Thiết Lập Tiêu Đề Co Giãn Bằng clamp()"
      },
      "instruction": {
        "en": "Set font-size to clamp(1.75rem, 1rem + 2vw, 3.5rem) on h1.hero-title.",
        "vi": "Đặt font-size thành clamp(1.75rem, 1rem + 2vw, 3.5rem) cho h1.hero-title."
      },
      "starterCode": "h1.hero-title {\n  /* Set fluid font size */\n}",
      "solutionCode": "h1.hero-title {\n  font-size: clamp(1.75rem, 1rem + 2vw, 3.5rem);\n}",
      "hint": {
        "en": "Use font-size: clamp(1.75rem, 1rem + 2vw, 3.5rem);",
        "vi": "Dùng font-size: clamp(1.75rem, 1rem + 2vw, 3.5rem);"
      },
      "explanation": {
        "en": "clamp() locks font-size between 1.75rem minimum and 3.5rem maximum, scaling fluidly in-between.",
        "vi": "clamp() khóa cỡ chữ trong khoảng từ 1.75rem tới 3.5rem và co giãn mượt mà theo độ rộng màn hình."
      }
    },
    {
      "id": "css_ex_19_2",
      "type": "fix_code",
      "title": {
        "en": "Fix Whitespace Syntax Error in calc()",
        "vi": "Sửa Lỗi Thiếu Dấu Cách Trong Hàm calc()"
      },
      "instruction": {
        "en": "Add required spaces around the minus sign in width: calc(100%-48px) on .full-box.",
        "vi": "Thêm khoảng trắng xung quanh dấu trừ trong width: calc(100%-48px) cho .full-box."
      },
      "starterCode": ".full-box {\n  width: calc(100%-48px);\n}",
      "solutionCode": ".full-box {\n  width: calc(100% - 48px);\n}",
      "hint": {
        "en": "Change calc(100%-48px) to calc(100% - 48px);",
        "vi": "Đổi calc(100%-48px) thành calc(100% - 48px);"
      },
      "explanation": {
        "en": "CSS math parser requires whitespace around + and - to distinguish from negative number signs.",
        "vi": "Bộ phân tích cú pháp CSS bắt buộc phải có khoảng trắng quanh + và - để phân biệt với dấu số âm."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_19",
    "title": {
      "en": "Build a Fully Fluid Responsive Hero Section",
      "vi": "Xây Dựng Khối Hero Co Giãn Tự Động Không Cần Media Query"
    },
    "description": {
      "en": "Style .hero-container with width: min(100% - 40px, 1200px), margin-inline: auto, and padding-block: clamp(32px, 6vw, 96px). Style .hero-title with font-size: clamp(2rem, 1.25rem + 3vw, 4.5rem).",
      "vi": "Tạo kiểu .hero-container với width: min(100% - 40px, 1200px), margin-inline: auto và padding-block: clamp(32px, 6vw, 96px). Tạo kiểu .hero-title với font-size: clamp(2rem, 1.25rem + 3vw, 4.5rem)."
    },
    "requirements": [
      {
        "en": "width: min(100% - 40px, 1200px)",
        "vi": "width: min(100% - 40px, 1200px)"
      },
      {
        "en": "margin-inline: auto",
        "vi": "margin-inline: auto"
      },
      {
        "en": "padding-block: clamp(32px, 6vw, 96px)",
        "vi": "padding-block: clamp(32px, 6vw, 96px)"
      },
      {
        "en": "font-size: clamp(2rem, 1.25rem + 3vw, 4.5rem)",
        "vi": "font-size: clamp(2rem, 1.25rem + 3vw, 4.5rem)"
      }
    ],
    "starterCode": ".hero-container {\n}\n\n.hero-title {\n}",
    "solutionCode": ".hero-container {\n  width: min(100% - 40px, 1200px);\n  margin-inline: auto;\n  padding-block: clamp(32px, 6vw, 96px);\n}\n\n.hero-title {\n  font-size: clamp(2rem, 1.25rem + 3vw, 4.5rem);\n}",
    "hints": [
      {
        "en": "Use min() for container width and clamp() for padding and font-size.",
        "vi": "Dùng min() cho chiều rộng khung và clamp() cho khoảng cách đệm và cỡ chữ."
      }
    ],
    "solutionExplanation": {
      "en": "Combining min() and clamp() creates modern layouts that adapt fluidly across all devices without breakpoint maintenance.",
      "vi": "Kết hợp min() và clamp() tạo nên layout hiện đại co giãn mượt mà trên mọi thiết bị mà không cần viết media query."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_19_1",
      "type": "single_choice",
      "question": {
        "en": "What are the three arguments passed to `clamp(MIN, PREFERRED, MAX)`?",
        "vi": "Ba tham số truyền vào hàm `clamp(MIN, PREFERRED, MAX)` có ý nghĩa lần lượt là gì?"
      },
      "options": [
        {
          "en": "Minimum floor value, preferred ideal flexible value, and maximum ceiling value",
          "vi": "Giá trị sàn tối thiểu, giá trị lý tưởng co giãn mong muốn và giá trị trần tối đa"
        },
        {
          "en": "Margin, padding, and border",
          "vi": "Margin, padding và border"
        },
        {
          "en": "Mobile size, tablet size, desktop size",
          "vi": "Cỡ mobile, cỡ tablet, cỡ desktop"
        },
        {
          "en": "Red, Green, Blue",
          "vi": "Đỏ, Xanh lá, Xanh dương"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "clamp() ensures the output never drops below MIN and never exceeds MAX while scaling with PREFERRED.",
        "vi": "clamp() đảm bảo giá trị không bao giờ nhỏ hơn MIN và không vượt quá MAX trong khi co giãn theo PREFERRED."
      },
      "topicId": "css_math_functions",
      "difficulty": "easy"
    },
    {
      "id": "css_q_19_2",
      "type": "single_choice",
      "question": {
        "en": "Why is `width: min(100% - 32px, 1200px);` a best practice for container wrappers?",
        "vi": "Tại sao `width: min(100% - 32px, 1200px);` được xem là chuẩn mực tối ưu cho khung chứa container?"
      },
      "options": [
        {
          "en": "It automatically provides 16px side gutters on mobile while capping maximum width at 1200px on widescreen",
          "vi": "Nó tự động tạo lề 16px ở 2 bên trên màn hình nhỏ đồng thời giới hạn chiều rộng tối đa 1200px trên màn hình lớn"
        },
        {
          "en": "It prevents text from wrapping",
          "vi": "Nó ngăn chữ không bị xuống dòng"
        },
        {
          "en": "It hides horizontal scrollbars in JavaScript",
          "vi": "Nó ẩn thanh cuộn ngang bằng JavaScript"
        },
        {
          "en": "It accelerates GPU rendering",
          "vi": "Nó tăng tốc render trên GPU"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`min()` picks `100% - 32px` whenever the screen is narrower than 1200px, and caps at `1200px` on larger screens.",
        "vi": "`min()` sẽ chọn `100% - 32px` khi màn hình nhỏ hơn 1200px, và tự động khóa trần ở `1200px` trên màn hình lớn."
      },
      "topicId": "css_math_functions",
      "difficulty": "medium"
    },
    {
      "id": "css_q_19_3",
      "type": "true_false",
      "question": {
        "en": "True or False: Whitespace is strictly required around `+` and `-` operators inside `calc()`.",
        "vi": "Đúng hay Sai: Khoảng trắng là bắt buộc tuyệt đối xung quanh các toán tử `+` và `-` bên trong hàm `calc()`."
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
        "en": "Without whitespace, `calc(100%-10px)` is parsed as an identifier with a negative number, causing a syntax error.",
        "vi": "Nếu thiếu khoảng trắng, `calc(100%-10px)` sẽ bị hiểu nhầm là một định danh kèm số âm, dẫn tới lỗi cú pháp vô hiệu hóa câu lệnh."
      },
      "topicId": "css_math_functions",
      "difficulty": "easy"
    },
    {
      "id": "css_q_19_4",
      "type": "single_choice",
      "question": {
        "en": "What does `max(50vw, 300px)` evaluate to when the viewport width is 800px (where 50vw = 400px)?",
        "vi": "Hàm `max(50vw, 300px)` trả về giá trị nào khi chiều rộng màn hình là 800px (khi đó 50vw = 400px)?"
      },
      "options": [
        {
          "en": "400px (since 400px > 300px)",
          "vi": "400px (vì 400px > 300px)"
        },
        {
          "en": "300px",
          "vi": "300px"
        },
        {
          "en": "800px",
          "vi": "800px"
        },
        {
          "en": "150px",
          "vi": "150px"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`max()` selects the largest value between 400px and 300px, which is 400px.",
        "vi": "`max()` chọn giá trị lớn nhất giữa 400px và 300px, kết quả là 400px."
      },
      "topicId": "css_math_functions",
      "difficulty": "medium"
    },
    {
      "id": "css_q_19_5",
      "type": "single_choice",
      "question": {
        "en": "Can CSS variables (`var(--token)`) be nested and used inside `calc()` or `clamp()`?",
        "vi": "Có thể lồng biến CSS (`var(--token)`) bên trong hàm `calc()` hoặc `clamp()` không?"
      },
      "options": [
        {
          "en": "Yes, variables are fully resolved and dynamically evaluated inside CSS math functions",
          "vi": "Có, biến CSS được phân giải hoàn toàn và tính toán động bình thường bên trong các hàm toán học"
        },
        {
          "en": "No, math functions only accept raw numbers",
          "vi": "Không, hàm toán học chỉ nhận số thuần túy"
        },
        {
          "en": "Only in Google Chrome",
          "vi": "Chỉ chạy được trên Google Chrome"
        },
        {
          "en": "Only for color values",
          "vi": "Chỉ dùng được cho màu sắc"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "CSS variables are dynamically evaluated inside math expressions (e.g. `calc(var(--base-unit) * 2)`).",
        "vi": "Biến CSS được tính toán trực tiếp trong biểu thức toán học (ví dụ `calc(var(--base-unit) * 2)`)."
      },
      "topicId": "css_math_functions",
      "difficulty": "easy"
    },
    {
      "id": "css_q_19_6",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: The CSS mathematical function used to select the largest value among given options is ________(value1, value2)",
        "vi": "Điền vào chỗ trống: Hàm toán học CSS dùng để chọn giá trị lớn nhất trong các giá trị truyền vào là ________(value1, value2)"
      },
      "fillBlankAnswers": [
        "max"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "max() returns the largest value from a comma-separated list.",
        "vi": "max() trả về giá trị lớn nhất từ danh sách các tham số."
      },
      "topicId": "css_math_functions",
      "difficulty": "easy"
    },
    {
      "id": "css_q_19_7",
      "type": "multiple_choice",
      "question": {
        "en": "Which of the following are valid modern CSS mathematical functions? (Select all that apply)",
        "vi": "Những hàm nào sau đây là hàm toán học CSS hiện đại hợp lệ? (Chọn tất cả đáp án đúng)"
      },
      "options": [
        {
          "en": "calc()",
          "vi": "calc()"
        },
        {
          "en": "clamp()",
          "vi": "clamp()"
        },
        {
          "en": "min()",
          "vi": "min()"
        },
        {
          "en": "round()",
          "vi": "round()"
        }
      ],
      "correctAnswers": [
        0,
        1,
        2,
        3
      ],
      "explanation": {
        "en": "calc, clamp, min, max, round, mod, rem, sin, cos, and abs are all part of the CSS Values and Units Level 4 specification.",
        "vi": "calc, clamp, min, max, round, mod, rem, sin, cos và abs đều thuộc đặc tả toán học CSS Values and Units Level 4."
      },
      "topicId": "css_math_functions",
      "difficulty": "medium"
    },
    {
      "id": "css_q_19_8",
      "type": "single_choice",
      "question": {
        "en": "What happens if the preferred value in `clamp(16px, 10vw, 32px)` evaluates to `12px`?",
        "vi": "Điều gì xảy ra nếu giá trị preferred trong `clamp(16px, 10vw, 32px)` tính ra kết quả là `12px`?"
      },
      "options": [
        {
          "en": "The function clamps and outputs `16px` (the minimum limit)",
          "vi": "Hàm sẽ tự động kẹp và trả về `16px` (giới hạn sàn tối thiểu)"
        },
        {
          "en": "It outputs 12px",
          "vi": "Nó trả về 12px"
        },
        {
          "en": "It throws an error",
          "vi": "Nó báo lỗi"
        },
        {
          "en": "It outputs 32px",
          "vi": "Nó trả về 32px"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Because 12px is smaller than the 16px minimum, clamp() returns 16px.",
        "vi": "Vì 12px nhỏ hơn giới hạn sàn 16px nên hàm clamp() sẽ trả về 16px."
      },
      "topicId": "css_math_functions",
      "difficulty": "easy"
    },
    {
      "id": "css_q_19_9",
      "type": "true_false",
      "question": {
        "en": "True or False: Multiplication (*) and division (/) inside `calc()` also strictly require spaces around their operators.",
        "vi": "Đúng hay Sai: Phép nhân (*) và phép chia (/) trong `calc()` cũng bắt buộc phải có khoảng trắng quanh toán tử giống như phép cộng và trừ."
      },
      "options": [
        {
          "en": "False",
          "vi": "Sai"
        },
        {
          "en": "True",
          "vi": "Đúng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "While spaces are recommended for style consistency, CSS grammar only strictly requires spaces for `+` and `-` (to avoid collision with signs). However, division without spaces (`/`) can clash with shorthand properties.",
        "vi": "Về mặt ngữ pháp CSS chỉ bắt buộc khoảng trắng cho `+` và `-`. Tuy nhiên đặt khoảng trắng cho tất cả các toán tử luôn là thói quen tốt nhất."
      },
      "topicId": "css_math_functions",
      "difficulty": "hard"
    },
    {
      "id": "css_q_19_10",
      "type": "predict_output",
      "question": {
        "en": "An element has `height: calc(100vh - 60px);`. If the viewport height is 900px, what is the computed height?",
        "vi": "Một phần tử có `height: calc(100vh - 60px);`. Nếu chiều cao màn hình là 900px, chiều cao tính toán là bao nhiêu?"
      },
      "options": [
        {
          "en": "840px (900px - 60px)",
          "vi": "840px (900px - 60px)"
        },
        {
          "en": "900px",
          "vi": "900px"
        },
        {
          "en": "960px",
          "vi": "960px"
        },
        {
          "en": "60px",
          "vi": "60px"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "100vh equals 900px. 900px - 60px = 840px.",
        "vi": "100vh bằng 900px. 900px - 60px = 840px."
      },
      "topicId": "css_math_functions",
      "difficulty": "easy"
    }
  ]
};
