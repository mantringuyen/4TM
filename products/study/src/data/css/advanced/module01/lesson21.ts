import { Lesson } from '../../../../types';

export const lesson21: Lesson = {
  "id": "css_lesson_21",
  "moduleId": "css_mod_5",
  "levelId": "advanced",
  "courseId": "css",
  "order": 21,
  "topicId": "css_container_queries",
  "title": {
    "en": "Container Queries & Component-Driven Responsive Design",
    "vi": "Container Queries & Thiết Kế Đáp Ứng Theo Kích Thước Component"
  },
  "summary": {
    "en": "Master container-type: inline-size, container-name, @container queries, cqw/cqh container query units, and truly modular UI components.",
    "vi": "Làm chủ container-type: inline-size, container-name, truy vấn @container, đơn vị cqw/cqh và xây dựng component tự đáp ứng theo khung chứa."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "For 15 years, responsive design was locked to the browser viewport. **Container Queries (`@container`)** revolutionize frontend architecture by allowing components to adapt based on the width of their immediate parent container, enabling reusable components that look perfect whether placed in a narrow sidebar or a wide main workspace.",
      "vi": "Trong suốt 15 năm, thiết kế đáp ứng luôn bị trói buộc vào khung nhìn toàn màn hình. **Container Queries (`@container`)** tạo ra cuộc cách mạng kiến trúc giao diện khi cho phép component tự biến đổi theo độ rộng của khung cha chứa nó, giúp component tái sử dụng hoàn hảo dù đặt trong sidebar hẹp hay không gian chính rộng lớn."
    },
    "conceptExplanation": {
      "en": "To create a containment context, set `container-type: inline-size` (and optional `container-name: card`) on the parent wrapper. Child elements can then use `@container (width >= 400px)` to change layouts independently of the viewport. Container Query units (`1cqw` = 1% of container width, `1cqh` = 1% of container height) enable container-proportional font sizes and padding.",
      "vi": "Để tạo một ngữ cảnh container, đặt `container-type: inline-size` (và tùy chọn `container-name: card`) trên thẻ bao bọc cha. Các phần tử con bên trong sẽ dùng câu lệnh `@container (width >= 400px)` để tự đổi bố cục mà không quan tâm màn hình to hay nhỏ. Các đơn vị container query (`1cqw` = 1% chiều rộng container, `1cqh` = 1% chiều cao container) giúp cỡ chữ và khoảng đệm tự co giãn theo khung chứa."
    },
    "syntax": "/* Define container context on parent */\n.card-wrapper {\n  container-type: inline-size;\n  container-name: product-card;\n}\n\n/* Card layout adapts to parent container width */\n.card-content {\n  display: flex;\n  flex-direction: column;\n}\n\n@container (width >= 450px) {\n  .card-content {\n    flex-direction: row;\n    gap: 20px;\n  }\n}",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "Adaptive User Profile Card",
          "vi": "Thẻ Hồ Sơ Người Dùng Tự Động Thích Ứng Mọi Vị Trí"
        },
        "description": {
          "en": "Stacks vertically in narrow sidebars (<350px) and switches to horizontal layout when in wide main areas (>=350px).",
          "vi": "Xếp dọc khi nằm trong sidebar hẹp (<350px) và tự chuyển sang hàng ngang khi nằm trong vùng làm việc rộng (>=350px)."
        },
        "code": ".profile-container {\n  container-type: inline-size;\n}\n\n.profile-card {\n  display: flex;\n  flex-direction: column;\n  padding: 16px;\n}\n\n@container (width >= 350px) {\n  .profile-card {\n    flex-direction: row;\n    align-items: center;\n    gap: 16px;\n  }\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Applying @container query styles to the container element itself instead of its children.",
          "vi": "Áp dụng câu lệnh @container query lên chính thẻ cha làm container thay vì áp dụng cho các con bên trong nó."
        },
        "correction": {
          "en": "Container queries evaluate the parent container to style descendants inside that container.",
          "vi": "Container queries đo kích thước thẻ cha để áp dụng kiểu dáng cho các phần tử con bên trong thẻ cha đó."
        }
      }
    ],
    "tips": [
      {
        "en": "Always declare container-type: inline-size rather than container-type: size unless you explicitly need vertical container height queries.",
        "vi": "Luôn dùng container-type: inline-size thay vì container-type: size trừ khi bạn thực sự cần đo chiều cao dọc của container."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_21_1",
      "type": "complete_code",
      "title": {
        "en": "Establish Container Context",
        "vi": "Thiết Lập Ngữ Cảnh Container Cho Khung Cha"
      },
      "instruction": {
        "en": "Add container-type: inline-size to .widget-wrapper.",
        "vi": "Thêm container-type: inline-size vào .widget-wrapper."
      },
      "starterCode": ".widget-wrapper {\n  /* Define container context */\n}",
      "solutionCode": ".widget-wrapper {\n  container-type: inline-size;\n}",
      "hint": {
        "en": "Use container-type: inline-size;",
        "vi": "Dùng container-type: inline-size;"
      },
      "explanation": {
        "en": "container-type: inline-size establishes a queryable container on the horizontal axis.",
        "vi": "container-type: inline-size kích hoạt khả năng đo đạc kích thước theo chiều ngang cho khung chứa."
      }
    },
    {
      "id": "css_ex_21_2",
      "type": "fix_code",
      "title": {
        "en": "Write an @container Query",
        "vi": "Viết Câu Lệnh Truy Vấn @container"
      },
      "instruction": {
        "en": "Write @container (width >= 400px) that sets .product-box to display: flex and flex-direction: row.",
        "vi": "Viết @container (width >= 400px) để đặt .product-box thành display: flex và flex-direction: row."
      },
      "starterCode": ".product-box {\n  display: flex;\n  flex-direction: column;\n}\n\n/* Add container query */",
      "solutionCode": ".product-box {\n  display: flex;\n  flex-direction: column;\n}\n\n@container (width >= 400px) {\n  .product-box {\n    flex-direction: row;\n  }\n}",
      "hint": {
        "en": "Use @container (width >= 400px) { .product-box { flex-direction: row; } }",
        "vi": "Dùng @container (width >= 400px) { .product-box { flex-direction: row; } }"
      },
      "explanation": {
        "en": "@container queries evaluate parent container width instead of viewport width.",
        "vi": "@container query đánh giá độ rộng của khung cha thay vì độ rộng của toàn màn hình."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_21",
    "title": {
      "en": "Build a Fully Modular Adaptive Media Card",
      "vi": "Xây Dựng Thẻ Đa Phương Tiện Tự Thích Ứng Hoàn Toàn"
    },
    "description": {
      "en": "Style .media-container with container-type: inline-size. Style .media-card with display: flex and flex-direction: column. Inside @container (width >= 500px), set .media-card to flex-direction: row and gap: 20px.",
      "vi": "Tạo kiểu .media-container với container-type: inline-size. Tạo kiểu .media-card với display: flex và flex-direction: column. Trong @container (width >= 500px), đổi .media-card sang flex-direction: row và gap: 20px."
    },
    "requirements": [
      {
        "en": "container-type: inline-size",
        "vi": "container-type: inline-size"
      },
      {
        "en": "display: flex",
        "vi": "display: flex"
      },
      {
        "en": "flex-direction: column",
        "vi": "flex-direction: column"
      },
      {
        "en": "@container (width >= 500px)",
        "vi": "@container (width >= 500px)"
      },
      {
        "en": "flex-direction: row",
        "vi": "flex-direction: row"
      }
    ],
    "starterCode": ".media-container {\n}\n\n.media-card {\n}\n\n/* Container query */",
    "solutionCode": ".media-container {\n  container-type: inline-size;\n}\n\n.media-card {\n  display: flex;\n  flex-direction: column;\n}\n\n@container (width >= 500px) {\n  .media-card {\n    flex-direction: row;\n    gap: 20px;\n  }\n}",
    "hints": [
      {
        "en": "Declare container-type on the wrapper and @container query on the card.",
        "vi": "Khai báo container-type trên khung bọc và @container query cho card."
      }
    ],
    "solutionExplanation": {
      "en": "Container queries enable drop-in components that adapt anywhere on any page layout automatically.",
      "vi": "Container queries tạo ra các component độc lập tự động biến đổi giao diện ở bất kỳ vị trí nào."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_21_1",
      "type": "single_choice",
      "question": {
        "en": "What is the primary difference between `@media` queries and `@container` queries?",
        "vi": "Sự khác biệt cốt lõi giữa `@media` query và `@container` query là gì?"
      },
      "options": [
        {
          "en": "`@media` queries inspect the entire browser viewport window, whereas `@container` queries inspect the width/height of the component's nearest container ancestor",
          "vi": "`@media` query kiểm tra độ rộng toàn màn hình trình duyệt, còn `@container` query kiểm tra độ rộng của chính khung cha chứa component"
        },
        {
          "en": "`@container` queries only run in JavaScript",
          "vi": "`@container` query chỉ chạy được bằng JavaScript"
        },
        {
          "en": "`@media` queries are deprecated",
          "vi": "`@media` query đã bị khai tử"
        },
        {
          "en": "`@container` queries cannot use flexbox",
          "vi": "`@container` query không dùng được flexbox"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Container queries decouple component responsiveness from viewport dimensions, enabling true component-driven design.",
        "vi": "Container queries giải phóng tính thích ứng của component khỏi màn hình trình duyệt, hiện thực hóa thiết kế hướng component thực thụ."
      },
      "topicId": "css_container_queries",
      "difficulty": "easy"
    },
    {
      "id": "css_q_21_2",
      "type": "single_choice",
      "question": {
        "en": "Which property must be declared on an ancestor element to establish it as a queryable container?",
        "vi": "Thuộc tính nào bắt buộc phải khai báo trên thẻ tổ tiên để biến nó thành một container có thể truy vấn?"
      },
      "options": [
        {
          "en": "`container-type: inline-size;` (or `container: <name> / inline-size;`)",
          "vi": "`container-type: inline-size;` (hoặc `container: <tên> / inline-size;`)"
        },
        {
          "en": "`display: container;`",
          "vi": "`display: container;`"
        },
        {
          "en": "`query: true;`",
          "vi": "`query: true;`"
        },
        {
          "en": "`position: relative;`",
          "vi": "`position: relative;`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`container-type: inline-size` establishes containment along the horizontal axis.",
        "vi": "`container-type: inline-size` kích hoạt cơ chế đo đạc kích thước theo trục ngang cho container."
      },
      "topicId": "css_container_queries",
      "difficulty": "easy"
    },
    {
      "id": "css_q_21_3",
      "type": "single_choice",
      "question": {
        "en": "What does the `10cqw` unit represent?",
        "vi": "Đơn vị `10cqw` đại diện cho giá trị kích thước nào?"
      },
      "options": [
        {
          "en": "10% of the query container's inline width",
          "vi": "10% chiều rộng của khung chứa container gần nhất"
        },
        {
          "en": "10% of the viewport width",
          "vi": "10% chiều rộng màn hình trình duyệt"
        },
        {
          "en": "10 pixels container quality",
          "vi": "10 pixel chất lượng container"
        },
        {
          "en": "10 container queries per second",
          "vi": "10 truy vấn container mỗi giây"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`cqw` (Container Query Width) represents 1% of the query container's width.",
        "vi": "`cqw` (Container Query Width) đại diện cho 1% độ rộng của khung chứa container."
      },
      "topicId": "css_container_queries",
      "difficulty": "medium"
    },
    {
      "id": "css_q_21_4",
      "type": "true_false",
      "question": {
        "en": "True or False: An `@container` rule can target a specifically named container using `@container <name> (width >= 400px)`.",
        "vi": "Đúng hay Sai: Một câu lệnh `@container` có thể nhắm đích danh vào một container đã đặt tên cụ thể bằng cú pháp `@container <tên> (width >= 400px)`."
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
        "en": "Named containers (`container-name: card`) allow child elements to target specific ancestors when multiple nested containers exist.",
        "vi": "Đặt tên container (`container-name: card`) giúp phần tử con nhắm đúng khung cha mong muốn khi có nhiều container lồng nhau."
      },
      "topicId": "css_container_queries",
      "difficulty": "medium"
    },
    {
      "id": "css_q_21_5",
      "type": "single_choice",
      "question": {
        "en": "Why is `container-type: inline-size` commonly preferred over `container-type: size`?",
        "vi": "Tại sao `container-type: inline-size` thường được ưu tiên sử dụng hơn `container-type: size`?"
      },
      "options": [
        {
          "en": "`container-type: size` requires rigid height containment on both axes, preventing natural vertical content expansion and height collapsing",
          "vi": "`container-type: size` đòi hỏi phải khóa cứng cả chiều cao 2 trục, khiến nội dung bên trong không thể tự giãn chiều cao tự nhiên"
        },
        {
          "en": "`size` only works on images",
          "vi": "`size` chỉ hoạt động trên hình ảnh"
        },
        {
          "en": "`inline-size` is faster in JavaScript",
          "vi": "`inline-size` nhanh hơn trong JavaScript"
        },
        {
          "en": "`size` is not a valid CSS keyword",
          "vi": "`size` không phải là từ khóa hợp lệ"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`inline-size` only contains the horizontal axis, allowing elements to grow vertically as tall as their content requires.",
        "vi": "`inline-size` chỉ kiểm soát trục ngang, cho phép chiều cao của phần tử tự co giãn tự nhiên theo lượng chữ bên trong."
      },
      "topicId": "css_container_queries",
      "difficulty": "hard"
    },
    {
      "id": "css_q_21_6",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: The CSS at-rule used to query parent container dimensions is @________",
        "vi": "Điền vào chỗ trống: Quy tắc CSS at-rule dùng để truy vấn kích thước khung cha là @________"
      },
      "fillBlankAnswers": [
        "container"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "@container enables modular responsive rules.",
        "vi": "@container kích hoạt các quy tắc đáp ứng độc lập cho component."
      },
      "topicId": "css_container_queries",
      "difficulty": "easy"
    },
    {
      "id": "css_q_21_7",
      "type": "multiple_choice",
      "question": {
        "en": "Which units are Container Query units? (Select all that apply)",
        "vi": "Những đơn vị nào sau đây là đơn vị Container Query? (Chọn tất cả đáp án đúng)"
      },
      "options": [
        {
          "en": "cqw (1% of container width)",
          "vi": "cqw (1% chiều rộng container)"
        },
        {
          "en": "cqh (1% of container height)",
          "vi": "cqh (1% chiều cao container)"
        },
        {
          "en": "cqi (1% of container inline size)",
          "vi": "cqi (1% kích thước inline của container)"
        },
        {
          "en": "rem (Root font size)",
          "vi": "rem (Cỡ font gốc)"
        }
      ],
      "correctAnswers": [
        0,
        1,
        2
      ],
      "explanation": {
        "en": "cqw, cqh, cqi, cqb, cqmin, and cqmax are dedicated container query units. rem is root-relative.",
        "vi": "cqw, cqh, cqi, cqb, cqmin và cqmax là các đơn vị container query. rem là đơn vị theo cỡ font gốc."
      },
      "topicId": "css_container_queries",
      "difficulty": "medium"
    },
    {
      "id": "css_q_21_8",
      "type": "single_choice",
      "question": {
        "en": "Can Container Queries be used inside a page that also uses standard `@media` queries?",
        "vi": "Có thể kết hợp Container Queries trong một trang web đang dùng `@media` query truyền thống không?"
      },
      "options": [
        {
          "en": "Yes, combining @media for macro page scaffolding and @container for micro component interiors is best practice",
          "vi": "Có, kết hợp @media cho khung sườn vĩ mô toàn trang và @container cho chi tiết vi mô bên trong component là chuẩn mực tối ưu"
        },
        {
          "en": "No, they cancel each other out",
          "vi": "Không, chúng sẽ triệt tiêu lẫn nhau"
        },
        {
          "en": "Only on desktop browsers",
          "vi": "Chỉ chạy được trên máy tính"
        },
        {
          "en": "Only in WebAssembly",
          "vi": "Chỉ chạy được trong WebAssembly"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Modern frontend architecture uses Media Queries for global viewport layout and Container Queries for self-contained components.",
        "vi": "Kiến trúc hiện đại sử dụng Media Query cho bố cục toàn cục và Container Query cho từng component độc lập."
      },
      "topicId": "css_container_queries",
      "difficulty": "easy"
    },
    {
      "id": "css_q_21_9",
      "type": "true_false",
      "question": {
        "en": "True or False: If no parent has `container-type` declared, `@container` queries fall back to evaluating the small viewport.",
        "vi": "Đúng hay Sai: Nếu không có thẻ cha nào khai báo `container-type`, câu lệnh `@container` query sẽ tự động căn theo kích thước khung nhìn nhỏ của trình duyệt."
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
        "en": "If no container context is established, container query units and queries fall back to the default small viewport.",
        "vi": "Nếu không có container nào được thiết lập, container query sẽ lấy khung nhìn mặc định của trình duyệt làm căn cứ."
      },
      "topicId": "css_container_queries",
      "difficulty": "medium"
    },
    {
      "id": "css_q_21_10",
      "type": "single_choice",
      "question": {
        "en": "How do you assign both a name and an inline-size type to a container in a single line shorthand?",
        "vi": "Làm thế nào để vừa đặt tên vừa gán kiểu inline-size cho một container chỉ trong một dòng ngắn gọn?"
      },
      "options": [
        {
          "en": "container: card-wrapper / inline-size;",
          "vi": "container: card-wrapper / inline-size;"
        },
        {
          "en": "container-setup: card-wrapper, inline-size;",
          "vi": "container-setup: card-wrapper, inline-size;"
        },
        {
          "en": "container-type: card-wrapper(inline-size);",
          "vi": "container-type: card-wrapper(inline-size);"
        },
        {
          "en": "box-container: card-wrapper 100%;",
          "vi": "box-container: card-wrapper 100%;"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The `container` shorthand syntax is `container: <container-name> / <container-type>`.",
        "vi": "Cú pháp viết tắt chuẩn là `container: <tên-container> / <kiểu-container>`."
      },
      "topicId": "css_container_queries",
      "difficulty": "medium"
    }
  ]
};
