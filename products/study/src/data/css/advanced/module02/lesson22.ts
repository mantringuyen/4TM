import { Lesson } from '../../../../types';

export const lesson22: Lesson = {
  "id": "css_lesson_22",
  "moduleId": "css_mod_6",
  "levelId": "advanced",
  "courseId": "css",
  "order": 22,
  "topicId": "css_cascade_layers",
  "title": {
    "en": "Cascade Layers (@layer) & Enterprise CSS Architecture",
    "vi": "Tầng Xếp Chồng @layer & Kiến Trúc CSS Doanh Nghiệp"
  },
  "summary": {
    "en": "Master @layer ordering, unlayered vs layered precedence, specificity isolation across teams/design systems, and large-scale architecture.",
    "vi": "Làm chủ thứ tự @layer, độ ưu tiên giữa code có layer và không layer, cô lập độ ưu tiên trong dự án lớn và kiến trúc design system chuẩn doanh nghiệp."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "Cascade Layers (`@layer`) provide explicit control over CSS cascade precedence independently of selector specificity. Instead of specificity wars and `!important` hacks, layers allow structuring stylesheets into predictable tiers (reset, base, components, utilities).",
      "vi": "Tầng xếp chồng Cascade Layers (`@layer`) mang lại quyền kiểm soát thứ tự ưu tiên của CSS hoàn toàn độc lập với độ ưu tiên của bộ chọn (specificity). Thay vì rơi vào 'cuộc chiến specificity' và lạm dụng `!important`, `@layer` giúp phân chia mã CSS thành các tầng rõ ràng (reset, base, components, utilities)."
    },
    "conceptExplanation": {
      "en": "Define layer precedence upfront with `@layer reset, base, components, utilities;`. In regular CSS rules, **later layers win over earlier layers regardless of how specific the selector is** (e.g. a simple `.btn` in `utilities` easily beats `#header nav a.btn` in `components`). Unlayered styles always have higher precedence than layered styles. Crucially, with `!important`, the layer precedence reverses: an earlier layer's `!important` rule overrides a later layer's `!important` rule.",
      "vi": "Định nghĩa thứ tự ưu tiên ngay từ đầu bằng câu lệnh `@layer reset, base, components, utilities;`. Đối với các quy tắc thông thường, **layer khai báo sau luôn thắng layer khai báo trước bất kể bộ chọn có phức tạp đến đâu** (ví dụ class đơn giản `.btn` trong layer `utilities` dễ dàng ghi đè bộ chọn `#header nav a.btn` trong layer `components`). Mã CSS không có layer (unlayered) luôn có độ ưu tiên cao hơn mã nằm trong layer. Đặc biệt, với cờ `!important`, thứ tự ưu tiên sẽ bị đảo ngược: `!important` của layer khai báo trước sẽ thắng `!important` của layer sau."
    },
    "syntax": "/* Declare layer hierarchy upfront */\n@layer reset, theme, components, utilities;\n\n@layer reset {\n  * { box-sizing: border-box; margin: 0; }\n}\n\n@layer components {\n  .btn {\n    background: #3b82f6;\n    color: white;\n    padding: 8px 16px;\n  }\n}\n\n@layer utilities {\n  .bg-danger { background: #ef4444; } /* Overrides .btn easily! */\n}",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "Third-Party Library Specificity Isolation",
          "vi": "Cô Lập Độ Ưu Tiên Của Thư Viện Bên Thứ Ba Bằng @layer"
        },
        "description": {
          "en": "Wraps an external component library in a low-priority layer so local styles override it without !important.",
          "vi": "Bọc thư viện bên ngoài vào một layer ưu tiên thấp để code dự án dễ dàng tùy biến mà không cần dùng !important."
        },
        "code": "@layer vendor, app;\n\n@import \"bootstrap.css\" layer(vendor);\n\n@layer app {\n  /* Easily overrides vendor styles */\n  .card {\n    border-radius: 16px;\n  }\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Thinking higher selector specificity within an earlier layer can override a rule in a later layer.",
          "vi": "Nghĩ rằng bộ chọn có độ ưu tiên cao trong layer đứng trước có thể đè bẹp quy tắc trong layer đứng sau."
        },
        "correction": {
          "en": "Layer order strictly overrides selector specificity. A later layer always wins over an earlier layer for normal styles.",
          "vi": "Thứ tự layer đứng trên độ ưu tiên của bộ chọn. Layer sau luôn thắng layer trước đối với quy tắc thông thường."
        }
      }
    ],
    "tips": [
      {
        "en": "Always establish your full layer order at the very top of your root CSS file: @layer reset, base, components, utilities;",
        "vi": "Luôn khai báo danh sách thứ tự layer ở dòng đầu tiên của file CSS gốc: @layer reset, base, components, utilities;"
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_22_1",
      "type": "complete_code",
      "title": {
        "en": "Define Cascade Layer Hierarchy",
        "vi": "Khai Báo Thứ Tự Ưu Tiên Các Tầng Cascade Layer"
      },
      "instruction": {
        "en": "Write an upfront declaration defining three layers in order: reset, components, utilities.",
        "vi": "Viết câu lệnh khai báo thứ tự 3 layer từ thấp đến cao: reset, components, utilities."
      },
      "starterCode": "/* Declare layer order: reset, components, utilities */",
      "solutionCode": "@layer reset, components, utilities;",
      "hint": {
        "en": "Use @layer reset, components, utilities;",
        "vi": "Dùng @layer reset, components, utilities;"
      },
      "explanation": {
        "en": "Declaring layer order upfront guarantees utilities layer has the highest precedence.",
        "vi": "Khai báo thứ tự layer ngay từ đầu đảm bảo layer utilities luôn có độ ưu tiên cao nhất."
      }
    },
    {
      "id": "css_ex_22_2",
      "type": "fix_code",
      "title": {
        "en": "Wrap CSS Reset in a Reset Layer",
        "vi": "Đưa Đoạn Mã CSS Reset Vào Layer Reset"
      },
      "instruction": {
        "en": "Wrap the universal box-sizing rule inside @layer reset { ... }.",
        "vi": "Bọc quy tắc box-sizing vào bên trong @layer reset { ... }."
      },
      "starterCode": "* {\n  box-sizing: border-box;\n}",
      "solutionCode": "@layer reset {\n  * {\n    box-sizing: border-box;\n  }\n}",
      "hint": {
        "en": "Use @layer reset { * { box-sizing: border-box; } }",
        "vi": "Dùng @layer reset { * { box-sizing: border-box; } }"
      },
      "explanation": {
        "en": "Putting resets inside @layer reset ensures base styles never accidentally override component rules.",
        "vi": "Đưa reset vào @layer reset đảm bảo kiểu dáng cơ bản không bao giờ vô tình ghi đè component."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_22",
    "title": {
      "en": "Build an Enterprise Multi-Layer Design Architecture",
      "vi": "Xây Dựng Kiến Trúc Đa Tầng Design System Chuẩn Doanh Nghiệp"
    },
    "description": {
      "en": "Declare @layer base, components, utilities; at the top. In @layer components, create .badge with background: #64748b and color: white. In @layer utilities, create .badge-success with background: #22c55e.",
      "vi": "Khai báo @layer base, components, utilities; ở đầu. Trong @layer components, tạo .badge với background: #64748b và color: white. Trong @layer utilities, tạo .badge-success với background: #22c55e."
    },
    "requirements": [
      {
        "en": "@layer base, components, utilities;",
        "vi": "@layer base, components, utilities;"
      },
      {
        "en": "@layer components { .badge { background: #64748b; color: white; } }",
        "vi": "@layer components { .badge { background: #64748b; color: white; } }"
      },
      {
        "en": "@layer utilities { .badge-success { background: #22c55e; } }",
        "vi": "@layer utilities { .badge-success { background: #22c55e; } }"
      }
    ],
    "starterCode": "/* Declare layers and assign styles */",
    "solutionCode": "@layer base, components, utilities;\n\n@layer components {\n  .badge {\n    background: #64748b;\n    color: white;\n  }\n}\n\n@layer utilities {\n  .badge-success {\n    background: #22c55e;\n  }\n}",
    "hints": [
      {
        "en": "Declare the layer sequence first, then write @layer components and @layer utilities blocks.",
        "vi": "Khai báo chuỗi thứ tự layer trước, sau đó viết các khối @layer components và @layer utilities."
      }
    ],
    "solutionExplanation": {
      "en": "The utility layer overrides the component layer seamlessly without needing higher selector specificity.",
      "vi": "Layer tiện ích ghi đè layer component một cách tự nhiên mà không cần viết bộ chọn phức tạp."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_22_1",
      "type": "single_choice",
      "question": {
        "en": "Given `@layer reset, theme, components, utilities;`, which normal layer wins when styling conflicts arise?",
        "vi": "Với khai báo `@layer reset, theme, components, utilities;`, layer nào sẽ giành chiến thắng đối với các quy tắc thông thường?"
      },
      "options": [
        {
          "en": "`utilities` (The layer declared last has the highest precedence)",
          "vi": "`utilities` (Layer khai báo sau cùng luôn có độ ưu tiên cao nhất)"
        },
        {
          "en": "`reset`",
          "vi": "`reset`"
        },
        {
          "en": "Whichever rule has the most classes",
          "vi": "Quy tắc nào có nhiều class hơn"
        },
        {
          "en": "Random",
          "vi": "Ngẫu nhiên"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "For normal declarations, layer order determines precedence: later layers override earlier layers.",
        "vi": "Với các quy tắc thông thường, layer khai báo sau cùng luôn thắng layer khai báo trước."
      },
      "topicId": "css_cascade_layers",
      "difficulty": "easy"
    },
    {
      "id": "css_q_22_2",
      "type": "single_choice",
      "question": {
        "en": "How do unlayered CSS rules (styles outside of any `@layer`) compare in precedence against layered CSS rules?",
        "vi": "Các quy tắc CSS không nằm trong layer (unlayered) có độ ưu tiên như thế nào so với CSS nằm trong layer?"
      },
      "options": [
        {
          "en": "Unlayered CSS rules ALWAYS have higher precedence than all layered CSS rules",
          "vi": "CSS không nằm trong layer LUÔN CÓ độ ưu tiên cao hơn tất cả các quy tắc nằm trong layer"
        },
        {
          "en": "Layered CSS rules always win",
          "vi": "CSS trong layer luôn thắng"
        },
        {
          "en": "They have equal weight",
          "vi": "Chúng có trọng số bằng nhau"
        },
        {
          "en": "Unlayered CSS is ignored",
          "vi": "CSS không có layer bị bỏ qua"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Styles declared outside of layers have the highest normal precedence, making them easy for ad-hoc application overrides.",
        "vi": "Mã CSS viết ngoài layer có độ ưu tiên cao nhất, giúp người dùng dễ dàng ghi đè toàn bộ các layer thư viện."
      },
      "topicId": "css_cascade_layers",
      "difficulty": "medium"
    },
    {
      "id": "css_q_22_3",
      "type": "single_choice",
      "question": {
        "en": "How does the `!important` keyword behave across Cascade Layers?",
        "vi": "Từ khóa `!important` hoạt động như thế nào giữa các tầng Cascade Layers?"
      },
      "options": [
        {
          "en": "The precedence is inverted: an `!important` rule in an EARLIER layer overrides an `!important` rule in a later layer",
          "vi": "Thứ tự ưu tiên bị đảo ngược: `!important` trong layer KHAI BÁO TRƯỚC sẽ ghi đè `!important` của layer sau"
        },
        {
          "en": "It breaks the build",
          "vi": "Nó làm lỗi quá trình build"
        },
        {
          "en": "It behaves the same as normal rules",
          "vi": "Nó hoạt động y hệt quy tắc thông thường"
        },
        {
          "en": "`!important` is forbidden inside layers",
          "vi": "`!important` bị cấm dùng trong layer"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The CSS Cascade specification intentionally inverts layer priority for `!important` declarations to allow base resets to protect vital styles.",
        "vi": "Đặc tả CSS Cascade cố tình đảo ngược thứ tự ưu tiên cho `!important` để các layer nền tảng (như reset) có thể bảo vệ kiểu dáng cốt lõi."
      },
      "topicId": "css_cascade_layers",
      "difficulty": "hard"
    },
    {
      "id": "css_q_22_4",
      "type": "true_false",
      "question": {
        "en": "True or False: Nested cascade layers can be created using dot notation like `@layer components.buttons { ... }`.",
        "vi": "Đúng hay Sai: Các tầng layer lồng nhau có thể được tạo bằng cú pháp dấu chấm như `@layer components.buttons { ... }`."
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
        "en": "Cascade Layers support nested hierarchies either by nesting `@layer` blocks or using dot notation.",
        "vi": "Cascade Layers hỗ trợ phân cấp đa tầng bằng cách lồng khối hoặc dùng cú pháp dấu chấm `components.buttons`."
      },
      "topicId": "css_cascade_layers",
      "difficulty": "medium"
    },
    {
      "id": "css_q_22_5",
      "type": "single_choice",
      "question": {
        "en": "How can an external CSS file be imported directly into a named layer?",
        "vi": "Làm thế nào để import một file CSS bên ngoài trực tiếp vào một layer đã đặt tên?"
      },
      "options": [
        {
          "en": "`@import \"framework.css\" layer(vendor);`",
          "vi": "`@import \"framework.css\" layer(vendor);`"
        },
        {
          "en": "`@layer import \"framework.css\" vendor;`",
          "vi": "`@layer import \"framework.css\" vendor;`"
        },
        {
          "en": "`@import-layer(vendor) \"framework.css\";`",
          "vi": "`@import-layer(vendor) \"framework.css\";`"
        },
        {
          "en": "`<link rel=\"stylesheet\" layer=\"vendor\">`",
          "vi": "`<link rel=\"stylesheet\" layer=\"vendor\">`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The CSS `@import` at-rule accepts `layer(<name>)` to assign imported stylesheets into a specific cascade tier.",
        "vi": "Cú pháp `@import` nhận hàm `layer(<tên>)` để đưa toàn bộ file ngoại vi vào đúng tầng phân cấp mong muốn."
      },
      "topicId": "css_cascade_layers",
      "difficulty": "medium"
    },
    {
      "id": "css_q_22_6",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: The CSS at-rule used to define Cascade Layers is @________",
        "vi": "Điền vào chỗ trống: Cú pháp CSS at-rule dùng để khai báo tầng Cascade Layers là @________"
      },
      "fillBlankAnswers": [
        "layer"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "@layer creates explicit cascade precedence.",
        "vi": "@layer tạo ra các tầng phân cấp độ ưu tiên rõ ràng."
      },
      "topicId": "css_cascade_layers",
      "difficulty": "easy"
    },
    {
      "id": "css_q_22_7",
      "type": "multiple_choice",
      "question": {
        "en": "Which problems do Cascade Layers effectively solve in enterprise frontend codebases? (Select all that apply)",
        "vi": "Những vấn đề nào sau đây được Cascade Layers giải quyết triệt để trong các dự án quy mô lớn? (Chọn tất cả đáp án đúng)"
      },
      "options": [
        {
          "en": "Eliminating specificity wars where developers write deep nested selectors like `#header nav ul li a`",
          "vi": "Chấm dứt cuộc chiến specificity khi lập trình viên phải viết các bộ chọn dài dòng như `#header nav ul li a`"
        },
        {
          "en": "Allowing utility classes to reliably override component styles regardless of order in file",
          "vi": "Đảm bảo các class tiện ích luôn ghi đè component một cách đáng tin cậy mà không phụ thuộc thứ tự nạp file"
        },
        {
          "en": "Taming third-party library CSS specificity conflicts",
          "vi": "Kiểm soát và cô lập các xung đột độ ưu tiên từ thư viện bên ngoài"
        },
        {
          "en": "Compressing images automatically",
          "vi": "Tự động nén hình ảnh"
        }
      ],
      "correctAnswers": [
        0,
        1,
        2
      ],
      "explanation": {
        "en": "Cascade Layers provide architectural governance over stylesheet priority without artificial specificity inflation.",
        "vi": "Cascade Layers mang lại khả năng quản trị kiến trúc CSS toàn diện mà không cần cố tình tăng độ ưu tiên nhân tạo."
      },
      "topicId": "css_cascade_layers",
      "difficulty": "easy"
    },
    {
      "id": "css_q_22_8",
      "type": "single_choice",
      "question": {
        "en": "What happens if a layer is declared without a name (`@layer { ... }`)?",
        "vi": "Điều gì xảy ra nếu một layer được tạo mà không có tên (`@layer { ... }`)?"
      },
      "options": [
        {
          "en": "It creates an anonymous layer that cannot be referenced elsewhere; its position in the layer order is determined by its position in the stylesheet",
          "vi": "Nó tạo ra một layer ẩn danh không thể gọi lại ở nơi khác; vị trí ưu tiên của nó được xác định đúng theo vị trí xuất hiện trong file"
        },
        {
          "en": "It throws a CSS error",
          "vi": "Nó báo lỗi CSS"
        },
        {
          "en": "It becomes unlayered code",
          "vi": "Nó biến thành code ngoài layer"
        },
        {
          "en": "It is automatically deleted",
          "vi": "Nó tự động bị xóa"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Anonymous layers create private, one-off layers that cannot have styles appended to them later.",
        "vi": "Layer ẩn danh tạo ra một tầng cục bộ khép kín và không thể thêm style vào từ nơi khác."
      },
      "topicId": "css_cascade_layers",
      "difficulty": "hard"
    },
    {
      "id": "css_q_22_9",
      "type": "true_false",
      "question": {
        "en": "True or False: If two conflicting rules belong to the SAME layer, the standard specificity and source order rules resolve the conflict.",
        "vi": "Đúng hay Sai: Nếu hai quy tắc xung đột nhau nằm trong CÙNG MỘT layer, trình duyệt sẽ dùng độ ưu tiên specificity và thứ tự xuất hiện thông thường để phân định."
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
        "en": "Within a single layer, normal cascade criteria (specificity and source order) decide which rule wins.",
        "vi": "Bên trong cùng một layer, các tiêu chí cascade truyền thống (độ ưu tiên và thứ tự xuất hiện) sẽ phân định thắng thua."
      },
      "topicId": "css_cascade_layers",
      "difficulty": "easy"
    },
    {
      "id": "css_q_22_10",
      "type": "single_choice",
      "question": {
        "en": "Which layer declaration structure represents standard CSS architecture best practices?",
        "vi": "Cấu trúc phân tầng layer nào sau đây thể hiện chuẩn mực kiến trúc CSS công nghiệp tốt nhất?"
      },
      "options": [
        {
          "en": "@layer reset, base, theme, components, utilities;",
          "vi": "@layer reset, base, theme, components, utilities;"
        },
        {
          "en": "@layer utilities, components, reset;",
          "vi": "@layer utilities, components, reset;"
        },
        {
          "en": "@layer random, test;",
          "vi": "@layer random, test;"
        },
        {
          "en": "@layer end;",
          "vi": "@layer end;"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Reset -> Base -> Theme -> Components -> Utilities provides the ideal progressive cascade pipeline.",
        "vi": "Reset -> Base -> Theme -> Components -> Utilities tạo nên quy trình xếp chồng lũy tiến chuẩn mực nhất."
      },
      "topicId": "css_cascade_layers",
      "difficulty": "easy"
    }
  ]
};
