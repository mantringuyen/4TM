import { Lesson } from '../../../../types';

export const lesson16: Lesson = {
  "id": "css_lesson_16",
  "moduleId": "css_mod_4",
  "levelId": "intermediate",
  "courseId": "css",
  "order": 16,
  "topicId": "css_transitions",
  "title": {
    "en": "CSS Transitions & Timing Functions",
    "vi": "Hiệu Ứng Chuyển Động CSS Transitions & Hàm Định Thời"
  },
  "summary": {
    "en": "Master transition-property, duration, delay, cubic-bezier timing functions, and smooth state changes on hover/focus.",
    "vi": "Làm chủ transition-property, thời lượng duration, độ trễ delay, hàm gia tốc cubic-bezier và chuyển đổi trạng thái hover/focus mượt mà."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "CSS Transitions provide smooth state changes when an element changes property values (such as on hover, focus, or active states). Mastering timing functions and hardware-accelerated properties creates silky, responsive UI micro-interactions.",
      "vi": "CSS Transitions mang lại sự chuyển đổi mượt mà giữa các trạng thái của phần tử (như khi rê chuột hover, nhấn phím focus hoặc click active). Làm chủ các hàm gia tốc và các thuộc tính tăng tốc phần cứng giúp tạo nên vi tương tác mượt mà và tinh tế."
    },
    "conceptExplanation": {
      "en": "The four transition properties are `transition-property`, `transition-duration`, `transition-timing-function`, and `transition-delay`. The shorthand is `transition: <property> <duration> <timing-function> <delay>`. Timing functions govern acceleration: `ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`, or custom `cubic-bezier(x1, y1, x2, y2)`. For optimal 60fps performance, transition composite-only properties (`transform` and `opacity`) rather than layout-triggering properties (`width`, `height`, `margin`, `top`).",
      "vi": "Bốn thuộc tính của transition gồm `transition-property`, `transition-duration`, `transition-timing-function` và `transition-delay`. Cú pháp viết tắt: `transition: <thuộc-tính> <thời-lượng> <hàm-gia-tốc> <độ-trễ>`. Hàm gia tốc điều khiển tốc độ: `ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`, hoặc `cubic-bezier(x1, y1, x2, y2)`. Để đạt hiệu năng 60fps mượt mà, luôn ưu tiên transition các thuộc tính xử lý trên GPU (`transform` và `opacity`) thay vì các thuộc tính gây tính toán lại bố cục (`width`, `height`, `margin`, `top`)."
    },
    "syntax": "/* Smooth button hover interaction */\n.btn {\n  background-color: #3b82f6;\n  transform: translateY(0);\n  transition:\n    background-color 200ms ease,\n    transform 150ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.btn:hover {\n  background-color: #2563eb;\n  transform: translateY(-2px);\n}",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "Interactive Card Elevation Transition",
          "vi": "Hiệu Ứng Nâng Thẻ Mượt Khi Rê Chuột"
        },
        "description": {
          "en": "Lifts card upwards and casts a soft shadow using high-performance GPU transitions.",
          "vi": "Nâng nhẹ thẻ lên và đổ bóng mềm mại bằng transition hiệu năng cao."
        },
        "code": ".interactive-card {\n  background: #1e293b;\n  transform: translateY(0);\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n  transition: transform 250ms ease, box-shadow 250ms ease;\n}\n\n.interactive-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Using transition: all on elements with many properties, causing unintended sluggish transitions on layout resize.",
          "vi": "Dùng transition: all bừa bãi khiến mọi thuộc tính đều bị trễ, làm lag giao diện khi thay đổi kích thước cửa sổ."
        },
        "correction": {
          "en": "Always explicitly specify the exact properties being transitioned (e.g. transition: opacity 200ms, transform 200ms).",
          "vi": "Luôn chỉ đích danh các thuộc tính cần chuyển động (ví dụ transition: opacity 200ms, transform 200ms)."
        }
      }
    ],
    "tips": [
      {
        "en": "Always declare the transition property on the base element, not inside the :hover selector, so the transition animates smoothly both on enter AND exit.",
        "vi": "Luôn khai báo transition trên class gốc của phần tử, không đặt trong selector :hover, để hiệu ứng mượt mà cả lúc đưa chuột vào LẪN lúc rút chuột ra."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_16_1",
      "type": "complete_code",
      "title": {
        "en": "Add a Smooth Opacity Transition",
        "vi": "Thêm Chuyển Động Opacity Mượt Mà"
      },
      "instruction": {
        "en": "Add transition: opacity 300ms ease to .fade-box so opacity changes animate smoothly.",
        "vi": "Thêm transition: opacity 300ms ease vào .fade-box để sự thay đổi độ mờ diễn ra êm ái."
      },
      "starterCode": ".fade-box {\n  opacity: 0.5;\n  /* Add transition */\n}\n\n.fade-box:hover {\n  opacity: 1;\n}",
      "solutionCode": ".fade-box {\n  opacity: 0.5;\n  transition: opacity 300ms ease;\n}\n\n.fade-box:hover {\n  opacity: 1;\n}",
      "hint": {
        "en": "Add transition: opacity 300ms ease;",
        "vi": "Thêm transition: opacity 300ms ease;"
      },
      "explanation": {
        "en": "transition on the base class creates smooth fading on both hover in and hover out.",
        "vi": "transition đặt ở class gốc tạo hiệu ứng mờ dần mượt mà cả khi rê chuột vào lẫn khi rời ra."
      }
    },
    {
      "id": "css_ex_16_2",
      "type": "fix_code",
      "title": {
        "en": "Specify Exact Properties instead of All",
        "vi": "Chỉ Định Chính Xác Thuộc Tính Chuyển Động"
      },
      "instruction": {
        "en": "Replace transition: all 200ms with transition: transform 200ms ease, background-color 200ms ease on .nav-tab.",
        "vi": "Thay thế transition: all 200ms bằng transition: transform 200ms ease, background-color 200ms ease cho .nav-tab."
      },
      "starterCode": ".nav-tab {\n  transition: all 200ms;\n}",
      "solutionCode": ".nav-tab {\n  transition: transform 200ms ease, background-color 200ms ease;\n}",
      "hint": {
        "en": "Use transition: transform 200ms ease, background-color 200ms ease;",
        "vi": "Dùng transition: transform 200ms ease, background-color 200ms ease;"
      },
      "explanation": {
        "en": "Explicit property transitions prevent unexpected layout recalculations.",
        "vi": "Chỉ định rõ ràng thuộc tính giúp ngăn chặn các tính toán bố cục không mong muốn."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_16",
    "title": {
      "en": "Build a Micro-Interactive Action Button",
      "vi": "Xây Dựng Nút Bấm Vi Tương Tác Chuẩn UX"
    },
    "description": {
      "en": "Style .action-pill with background: #3b82f6, transform: scale(1), and transition: transform 150ms ease, background-color 150ms ease. On .action-pill:hover, set background: #2563eb and transform: scale(1.05). On .action-pill:active, set transform: scale(0.95).",
      "vi": "Tạo kiểu .action-pill với background: #3b82f6, transform: scale(1) và transition: transform 150ms ease, background-color 150ms ease. Khi :hover, set background: #2563eb và transform: scale(1.05). Khi :active, set transform: scale(0.95)."
    },
    "requirements": [
      {
        "en": "transition: transform 150ms ease, background-color 150ms ease",
        "vi": "transition: transform 150ms ease, background-color 150ms ease"
      },
      {
        "en": ".action-pill:hover { transform: scale(1.05) }",
        "vi": ".action-pill:hover { transform: scale(1.05) }"
      },
      {
        "en": ".action-pill:active { transform: scale(0.95) }",
        "vi": ".action-pill:active { transform: scale(0.95) }"
      }
    ],
    "starterCode": ".action-pill {\n}\n\n.action-pill:hover {\n}\n\n.action-pill:active {\n}",
    "solutionCode": ".action-pill {\n  background: #3b82f6;\n  transform: scale(1);\n  transition: transform 150ms ease, background-color 150ms ease;\n}\n\n.action-pill:hover {\n  background: #2563eb;\n  transform: scale(1.05);\n}\n\n.action-pill:active {\n  transform: scale(0.95);\n}",
    "hints": [
      {
        "en": "Declare base transition on .action-pill, scale up on hover, and scale down on active.",
        "vi": "Khai báo transition gốc trên .action-pill, phóng to khi hover và thu nhỏ khi nhấn active."
      }
    ],
    "solutionExplanation": {
      "en": "Pairing hover enlargement with active compression creates physical tactile button feedback.",
      "vi": "Kết hợp phóng to khi hover và nhấn lún khi active tạo cảm giác xúc giác đàn hồi sống động cho nút bấm."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_16_1",
      "type": "single_choice",
      "question": {
        "en": "Where should the `transition` property be declared for smooth animations on both hover and un-hover?",
        "vi": "Thuộc tính `transition` nên được khai báo ở đâu để hiệu ứng mượt mà cả lúc đưa chuột vào và lúc rời chuột ra?"
      },
      "options": [
        {
          "en": "On the base element class/rule (not inside `:hover`)",
          "vi": "Trên selector class gốc của phần tử (không đặt bên trong `:hover`)"
        },
        {
          "en": "Exclusively inside the `:hover` pseudo-class",
          "vi": "Chỉ đặt duy nhất trong pseudo-class `:hover`"
        },
        {
          "en": "Inside the HTML `<head>` tag",
          "vi": "Trong thẻ HTML `<head>`"
        },
        {
          "en": "Inside a JavaScript click event",
          "vi": "Trong sự kiện click của JavaScript"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Declaring transition on the base element ensures the transition runs in both directions (forward on hover, reverse on un-hover).",
        "vi": "Đặt transition ở class gốc đảm bảo hiệu ứng chạy mượt cả 2 chiều (tiến lên khi hover và lùi về khi bỏ chuột)."
      },
      "topicId": "css_transitions",
      "difficulty": "easy"
    },
    {
      "id": "css_q_16_2",
      "type": "single_choice",
      "question": {
        "en": "Which pair of CSS properties deliver the highest 60fps animation performance on modern browser GPUs?",
        "vi": "Cặp thuộc tính CSS nào mang lại hiệu năng chuyển động 60fps mượt nhất nhờ xử lý trực tiếp trên GPU của trình duyệt?"
      },
      "options": [
        {
          "en": "`transform` and `opacity`",
          "vi": "`transform` và `opacity`"
        },
        {
          "en": "`width` and `height`",
          "vi": "`width` và `height`"
        },
        {
          "en": "`top` and `left`",
          "vi": "`top` và `left`"
        },
        {
          "en": "`margin` and `padding`",
          "vi": "`margin` và `padding`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Transform and Opacity are handled directly in the GPU compositor layer without triggering expensive layout recalculations or paint reflows.",
        "vi": "Transform và Opacity được xử lý trực tiếp ở tầng GPU compositor mà không kích hoạt tính toán lại bố cục hay vẽ lại trang."
      },
      "topicId": "css_transitions",
      "difficulty": "medium"
    },
    {
      "id": "css_q_16_3",
      "type": "single_choice",
      "question": {
        "en": "What does the `ease-out` timing function do?",
        "vi": "Hàm định thời `ease-out` tạo ra kiểu chuyển động như thế nào?"
      },
      "options": [
        {
          "en": "Starts quickly and decelerates smoothly toward the end",
          "vi": "Bắt đầu nhanh và giảm tốc êm ái khi về đích"
        },
        {
          "en": "Maintains a constant static speed throughout",
          "vi": "Duy trì một tốc độ đều chằn chặn từ đầu đến cuối"
        },
        {
          "en": "Starts slowly and accelerates rapidly at the end",
          "vi": "Bắt đầu chậm và tăng tốc đột ngột ở đoạn cuối"
        },
        {
          "en": "Repeats infinitely",
          "vi": "Lặp lại vô tận"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`ease-out` decelerates toward the conclusion, which feels natural for incoming UI elements.",
        "vi": "`ease-out` giảm tốc từ từ về cuối, tạo cảm giác tự nhiên như vật thể dừng lại trong thực tế."
      },
      "topicId": "css_transitions",
      "difficulty": "easy"
    },
    {
      "id": "css_q_16_4",
      "type": "true_false",
      "question": {
        "en": "True or False: Using `transition: all 0.3s;` on everything is an industry best practice.",
        "vi": "Đúng hay Sai: Lạm dụng `transition: all 0.3s;` cho tất cả mọi thứ là chuẩn mực tốt nhất."
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
        "en": "transition: all incurs performance penalties and can cause unintended transitions on resize or font loading. Explicit property lists are required.",
        "vi": "transition: all làm giảm hiệu năng và gây ra các hiệu ứng trễ không mong muốn khi đổi kích cỡ cửa sổ. Cần chỉ rõ từng thuộc tính."
      },
      "topicId": "css_transitions",
      "difficulty": "easy"
    },
    {
      "id": "css_q_16_5",
      "type": "single_choice",
      "question": {
        "en": "In the shorthand `transition: transform 300ms ease 100ms;`, what does `100ms` represent?",
        "vi": "Trong cú pháp viết tắt `transition: transform 300ms ease 100ms;`, giá trị `100ms` đại diện cho điều gì?"
      },
      "options": [
        {
          "en": "transition-delay (the waiting period before the transition starts)",
          "vi": "transition-delay (thời gian chờ trước khi hiệu ứng bắt đầu chạy)"
        },
        {
          "en": "transition-duration",
          "vi": "transition-duration"
        },
        {
          "en": "frame rate",
          "vi": "tốc độ khung hình"
        },
        {
          "en": "repeat count",
          "vi": "số lần lặp"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In CSS transition shorthand, the second time value is always parsed as `transition-delay`.",
        "vi": "Trong cú pháp viết tắt transition, giá trị thời gian thứ hai luôn được hiểu là `transition-delay`."
      },
      "topicId": "css_transitions",
      "difficulty": "medium"
    },
    {
      "id": "css_q_16_6",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: The CSS function that allows defining custom 4-point Bézier acceleration curves is cubic-________(x1, y1, x2, y2)",
        "vi": "Điền vào chỗ trống: Hàm CSS cho phép tùy chỉnh đường cong gia tốc Bézier 4 điểm là cubic-________(x1, y1, x2, y2)"
      },
      "fillBlankAnswers": [
        "bezier"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "cubic-bezier() creates tailored physics-based spring and easing curves.",
        "vi": "cubic-bezier() tạo các đường cong gia tốc đàn hồi tinh tế theo ý muốn."
      },
      "topicId": "css_transitions",
      "difficulty": "easy"
    },
    {
      "id": "css_q_16_7",
      "type": "multiple_choice",
      "question": {
        "en": "Which of the following are animatable/transitionable CSS properties? (Select all that apply)",
        "vi": "Những thuộc tính CSS nào sau đây có thể tạo hiệu ứng transition chuyển đổi mượt mà? (Chọn tất cả đáp án đúng)"
      },
      "options": [
        {
          "en": "opacity",
          "vi": "opacity"
        },
        {
          "en": "transform",
          "vi": "transform"
        },
        {
          "en": "background-color",
          "vi": "background-color"
        },
        {
          "en": "display (e.g. none to block)",
          "vi": "display (ví dụ none sang block)"
        }
      ],
      "correctAnswers": [
        0,
        1,
        2
      ],
      "explanation": {
        "en": "opacity, transform, and background-color interpolate smoothly. `display` is discrete (cannot interpolate intermediate states).",
        "vi": "opacity, transform và background-color chuyển đổi liên tục. `display` là thuộc tính rời rạc (không thể tính toán trạng thái trung gian)."
      },
      "topicId": "css_transitions",
      "difficulty": "medium"
    },
    {
      "id": "css_q_16_8",
      "type": "single_choice",
      "question": {
        "en": "How can you transition an element from hidden to visible smoothly using modern CSS?",
        "vi": "Làm thế nào để chuyển đổi một phần tử từ ẩn sang hiện mượt mà bằng CSS hiện đại?"
      },
      "options": [
        {
          "en": "Transition `opacity` and `visibility: hidden/visible` (or `transition: opacity, display` with `@starting-style` in modern CSS)",
          "vi": "Transition kết hợp `opacity` và `visibility: hidden/visible` (hoặc dùng `@starting-style` trong CSS mới)"
        },
        {
          "en": "Set display: block with transition: display 1s",
          "vi": "Đặt display: block với transition: display 1s"
        },
        {
          "en": "Transitions cannot make elements visible",
          "vi": "Transition không thể làm hiện phần tử"
        },
        {
          "en": "Use z-index: -9999 to 9999",
          "vi": "Dùng z-index từ -9999 sang 9999"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Combining opacity with visibility (or modern `@starting-style`) prevents keyboard focus on hidden elements while allowing smooth fades.",
        "vi": "Kết hợp opacity với visibility giúp ẩn hoàn toàn phần tử khỏi bàn phím tab trong khi vẫn giữ hiệu ứng mờ dần đẹp mắt."
      },
      "topicId": "css_transitions",
      "difficulty": "hard"
    },
    {
      "id": "css_q_16_9",
      "type": "true_false",
      "question": {
        "en": "True or False: Multiple property transitions can be comma-separated inside a single `transition` declaration.",
        "vi": "Đúng hay Sai: Có thể khai báo nhiều hiệu ứng chuyển động cho các thuộc tính khác nhau ngăn cách bởi dấu phẩy trong cùng một dòng `transition`."
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
        "en": "Comma-separated transitions (e.g. `transition: opacity 200ms, transform 300ms ease`) are fully supported.",
        "vi": "Khai báo ngăn cách bằng dấu phẩy (như `transition: opacity 200ms, transform 300ms ease`) hoàn toàn hợp lệ."
      },
      "topicId": "css_transitions",
      "difficulty": "easy"
    },
    {
      "id": "css_q_16_10",
      "type": "single_choice",
      "question": {
        "en": "What happens if `transition-duration` is set to `0s` (or omitted)?",
        "vi": "Điều gì xảy ra nếu `transition-duration` được đặt là `0s` (hoặc bị bỏ qua)?"
      },
      "options": [
        {
          "en": "The property change happens instantaneously with no transition animation",
          "vi": "Thuộc tính thay đổi tức thì ngay lập tức mà không có bất kỳ hiệu ứng chuyển động nào"
        },
        {
          "en": "The transition lasts forever",
          "vi": "Hiệu ứng chạy mãi mãi không dừng"
        },
        {
          "en": "The element disappears",
          "vi": "Phần tử biến mất"
        },
        {
          "en": "The browser freezes",
          "vi": "Trình duyệt bị treo"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "A duration of 0s executes property updates instantly.",
        "vi": "Thời lượng 0s khiến các thay đổi thuộc tính có hiệu lực ngay lập tức."
      },
      "topicId": "css_transitions",
      "difficulty": "easy"
    }
  ]
};
