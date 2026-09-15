import { Lesson } from '../../../../types';

export const lesson18: Lesson = {
  "id": "css_lesson_18",
  "moduleId": "css_mod_4",
  "levelId": "intermediate",
  "courseId": "css",
  "order": 18,
  "topicId": "css_animations",
  "title": {
    "en": "Keyframe Animations & GPU Optimization",
    "vi": "Hiệu Ứng Hoạt Họa @keyframes & Tối Ưu Hóa GPU"
  },
  "summary": {
    "en": "Master @keyframes, animation-fill-mode, iteration-count, will-change property, reduced-motion accessibility, and infinite spinners.",
    "vi": "Làm chủ @keyframes, animation-fill-mode, iteration-count, thuộc tính will-change, tối ưu khả năng tiếp cận và tạo vòng xoay spinner vô tận."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "CSS Keyframe Animations (`@keyframes`) enable complex, multi-stage, recurring UI motion sequences without JavaScript runtime overhead. Leveraging GPU compositing properties guarantees fluid 60fps performance on all devices.",
      "vi": "Hiệu ứng hoạt họa CSS Keyframe (`@keyframes`) cho phép xây dựng các chuỗi chuyển động đa bước phức tạp lặp đi lặp lại mà không tốn tài nguyên chạy JavaScript. Tận dụng xử lý trên GPU đảm bảo hoạt họa luôn đạt 60fps mượt mà trên mọi thiết bị."
    },
    "conceptExplanation": {
      "en": "Define animation sequences using `@keyframes <name> { from / to / 0% / 50% / 100% }`. Bind to elements using `animation: <name> <duration> <timing-function> <delay> <iteration-count> <direction> <fill-mode>`. Key properties include: `animation-iteration-count: infinite`, `animation-fill-mode: forwards` (retains the final keyframe styles after animation ends), and `animation-play-state: paused | running`. To prevent jank, use `will-change: transform` sparingly on active animating layers.",
      "vi": "Định nghĩa chuỗi hoạt họa bằng cú pháp `@keyframes <tên> { 0% { ... } 50% { ... } 100% { ... } }`. Gán vào phần tử bằng `animation: <tên> <thời-lượng> <hàm-gia-tốc> <độ-trễ> <số-lần-lặp> <hướng> <fill-mode>`. Các thuộc tính cốt lõi gồm: `animation-iteration-count: infinite` (lặp vô tận), `animation-fill-mode: forwards` (giữ nguyên kiểu dáng của khung hình cuối khi kết thúc) và `animation-play-state: paused`. Để tránh giật lag, dùng `will-change: transform` một cách hợp lý trên các layer chuyển động."
    },
    "syntax": "/* Infinite Loading Spinner */\n@keyframes spin {\n  from { transform: rotate(0deg); }\n  to   { transform: rotate(360deg); }\n}\n\n.spinner {\n  width: 32px;\n  height: 32px;\n  border: 3px solid rgba(255, 255, 255, 0.2);\n  border-top-color: #3b82f6;\n  border-radius: 50%;\n  animation: spin 800ms linear infinite;\n}",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "Pulse Radar Ping Animation",
          "vi": "Hiệu Ứng Sóng Radar Lan Tỏa Vô Tận"
        },
        "description": {
          "en": "Creates a radiating sonar pulse expanding outward and fading.",
          "vi": "Tạo vòng sóng sonar mở rộng ra ngoài và mờ dần liên tục."
        },
        "code": "@keyframes pulse-ring {\n  0% {\n    transform: scale(0.95);\n    opacity: 0.8;\n  }\n  100% {\n    transform: scale(1.5);\n    opacity: 0;\n  }\n}\n\n.ping-dot {\n  position: relative;\n}\n\n.ping-dot::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  border-radius: 50%;\n  background: #22c55e;\n  animation: pulse-ring 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Overusing will-change: all across many elements, exhausting device GPU memory.",
          "vi": "Lạm dụng will-change: all trên quá nhiều phần tử gây tràn bộ nhớ GPU của thiết bị."
        },
        "correction": {
          "en": "Apply will-change only to specific animating properties (e.g. will-change: transform) and only on elements with active animations.",
          "vi": "Chỉ đặt will-change cho đúng thuộc tính chuyển động (will-change: transform) trên các phần tử đang chạy animation."
        }
      }
    ],
    "tips": [
      {
        "en": "Always respect prefers-reduced-motion by setting animation-duration: 0.01ms or animation: none for accessibility compliance.",
        "vi": "Luôn hỗ trợ prefers-reduced-motion bằng cách đặt animation: none hoặc giảm thời lượng về 0 để đảm bảo chuẩn tiếp cận."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_18_1",
      "type": "complete_code",
      "title": {
        "en": "Create an Infinite Rotate Spinner",
        "vi": "Tạo Vòng Xoay Spinner Lặp Vô Tận"
      },
      "instruction": {
        "en": "Define @keyframes spin from rotate(0deg) to rotate(360deg) and apply animation: spin 1s linear infinite to .loader.",
        "vi": "Định nghĩa @keyframes spin từ rotate(0deg) tới rotate(360deg) và gán animation: spin 1s linear infinite cho .loader."
      },
      "starterCode": "/* Define keyframes spin and apply to .loader */\n.loader {\n}",
      "solutionCode": "@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.loader {\n  animation: spin 1s linear infinite;\n}",
      "hint": {
        "en": "Write @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } and animation: spin 1s linear infinite;",
        "vi": "Viết @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } và animation: spin 1s linear infinite;"
      },
      "explanation": {
        "en": "linear infinite guarantees smooth unbroken rotation around the center axis.",
        "vi": "linear infinite đảm bảo chuyển động quay tròn đều không bị giật khựng."
      }
    },
    {
      "id": "css_ex_18_2",
      "type": "fix_code",
      "title": {
        "en": "Retain Final Animation Frame",
        "vi": "Giữ Nguyên Trạng Thái Khung Hình Cuối"
      },
      "instruction": {
        "en": "Add animation-fill-mode: forwards to .slide-entry so it does not snap back to its initial position when finished.",
        "vi": "Thêm animation-fill-mode: forwards vào .slide-entry để phần tử không bị nhảy ngược về vị trí ban đầu khi chạy xong."
      },
      "starterCode": ".slide-entry {\n  animation: slideIn 500ms ease-out;\n}",
      "solutionCode": ".slide-entry {\n  animation: slideIn 500ms ease-out forwards;\n}",
      "hint": {
        "en": "Add forwards to the animation shorthand or set animation-fill-mode: forwards;",
        "vi": "Thêm forwards vào cuối dòng animation hoặc đặt animation-fill-mode: forwards;"
      },
      "explanation": {
        "en": "forwards freezes the element at its final 100% keyframe state upon completion.",
        "vi": "forwards giữ phần tử đứng yên ở trạng thái 100% cuối cùng sau khi hoàn tất hoạt họa."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_18",
    "title": {
      "en": "Build a Smooth Slide-In Notification Banner",
      "vi": "Xây Dựng Thông Báo Trượt Xuống Mượt Mà"
    },
    "description": {
      "en": "Define @keyframes slideDown from translateY(-100%) opacity 0 to translateY(0) opacity 1. Style .toast-banner with animation: slideDown 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards.",
      "vi": "Định nghĩa @keyframes slideDown từ translateY(-100%) opacity 0 tới translateY(0) opacity 1. Tạo kiểu cho .toast-banner với animation: slideDown 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards."
    },
    "requirements": [
      {
        "en": "@keyframes slideDown",
        "vi": "@keyframes slideDown"
      },
      {
        "en": "translateY(-100%)",
        "vi": "translateY(-100%)"
      },
      {
        "en": "translateY(0)",
        "vi": "translateY(0)"
      },
      {
        "en": "animation: slideDown 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "vi": "animation: slideDown 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards"
      }
    ],
    "starterCode": "/* Keyframes and toast notification styles */",
    "solutionCode": "@keyframes slideDown {\n  from {\n    transform: translateY(-100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n\n.toast-banner {\n  animation: slideDown 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards;\n}",
    "hints": [
      {
        "en": "Define slideDown from translateY(-100%) opacity: 0 to translateY(0) opacity: 1 and apply to .toast-banner.",
        "vi": "Định nghĩa slideDown từ translateY(-100%) opacity: 0 tới translateY(0) opacity: 1 và gán cho .toast-banner."
      }
    ],
    "solutionExplanation": {
      "en": "Using cubic-bezier with forwards creates snappy native app toast entries that stay locked in place.",
      "vi": "Dùng cubic-bezier kết hợp forwards tạo hiệu ứng thông báo trượt xuất hiện dứt khoát như ứng dụng di động."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_18_1",
      "type": "single_choice",
      "question": {
        "en": "What does `animation-fill-mode: forwards;` do?",
        "vi": "`animation-fill-mode: forwards;` có tác dụng gì đối với một animation?"
      },
      "options": [
        {
          "en": "The element retains the styles calculated in the final keyframe (100% or to) after the animation ends",
          "vi": "Phần tử sẽ giữ nguyên các giá trị kiểu dáng của khung hình cuối cùng (100% hoặc to) sau khi animation kết thúc"
        },
        {
          "en": "The animation plays forward and backward repeatedly",
          "vi": "Animation chạy tiến rồi chạy lùi liên tục"
        },
        {
          "en": "The animation only plays on forward page scroll",
          "vi": "Animation chỉ chạy khi cuộn trang xuống dưới"
        },
        {
          "en": "The element resets to its original CSS styles before the animation started",
          "vi": "Phần tử tự nhảy ngược về kiểu dáng ban đầu trước khi animation chạy"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Without `forwards` (default `none`), elements snap back to their pre-animation styles the moment the animation completes.",
        "vi": "Nếu không có `forwards` (mặc định là `none`), phần tử sẽ lập tức bị giật ngược về trạng thái gốc ngay khi animation kết thúc."
      },
      "topicId": "css_animations",
      "difficulty": "easy"
    },
    {
      "id": "css_q_18_2",
      "type": "single_choice",
      "question": {
        "en": "What does `animation-direction: alternate;` do?",
        "vi": "Thuộc tính `animation-direction: alternate;` có tác dụng gì?"
      },
      "options": [
        {
          "en": "Plays forward on odd iterations (1, 3, 5) and in reverse on even iterations (2, 4, 6)",
          "vi": "Chạy xuôi ở các lần lặp lẻ (1, 3, 5) và chạy ngược chiều ở các lần lặp chẵn (2, 4, 6)"
        },
        {
          "en": "Alternates background colors randomly",
          "vi": "Đổi màu nền ngẫu nhiên"
        },
        {
          "en": "Skips every second animation frame",
          "vi": "Bỏ qua các khung hình chẵn"
        },
        {
          "en": "Plays in a diagonal direction",
          "vi": "Chạy theo đường chéo"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`alternate` cycles back and forth smoothly, popular for breathing, pulsing, or floating animations.",
        "vi": "`alternate` tạo chuyển động đảo chiều qua lại nhịp nhàng như nhịp thở hoặc bóng bập bênh."
      },
      "topicId": "css_animations",
      "difficulty": "medium"
    },
    {
      "id": "css_q_18_3",
      "type": "single_choice",
      "question": {
        "en": "What is the primary purpose of the CSS `will-change` property?",
        "vi": "Mục đích chính của thuộc tính `will-change` trong CSS là gì?"
      },
      "options": [
        {
          "en": "Hints to the browser that an element will undergo specific changes, allowing ahead-of-time GPU layer promotion",
          "vi": "Báo trước cho trình duyệt biết phần tử sắp thay đổi thuộc tính nào để chuẩn bị sẵn sàng layer trên GPU, tránh giật lag"
        },
        {
          "en": "Forces JavaScript to re-render the page",
          "vi": "Ép JavaScript phải render lại trang"
        },
        {
          "en": "Automatically translates text into other languages",
          "vi": "Tự động dịch văn bản sang ngôn ngữ khác"
        },
        {
          "en": "Disables user hover states",
          "vi": "Tắt trạng thái hover của người dùng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`will-change: transform` prepares graphics memory in advance for demanding animations.",
        "vi": "`will-change: transform` chuẩn bị sẵn bộ nhớ đồ họa trước khi animation bắt đầu để đạt độ mượt tối đa."
      },
      "topicId": "css_animations",
      "difficulty": "hard"
    },
    {
      "id": "css_q_18_4",
      "type": "true_false",
      "question": {
        "en": "True or False: `animation-play-state: paused;` can temporarily freeze an in-flight keyframe animation.",
        "vi": "Đúng hay Sai: Thuộc tính `animation-play-state: paused;` có thể tạm dừng một animation đang chạy ở đúng khung hình hiện tại."
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
        "en": "Setting animation-play-state to paused freezes animations at their exact current progress and resumes seamlessly when set back to running.",
        "vi": "Đặt animation-play-state: paused sẽ đóng băng animation ở đúng thời điểm đó và tiếp tục chạy mượt mà khi đổi lại thành running."
      },
      "topicId": "css_animations",
      "difficulty": "easy"
    },
    {
      "id": "css_q_18_5",
      "type": "single_choice",
      "question": {
        "en": "How do you pause an animation when the user hovers over a marquee or ticker banner?",
        "vi": "Làm thế nào để tạm dừng animation khi người dùng rê chuột lên thanh chữ chạy (marquee)?"
      },
      "options": [
        {
          "en": ".marquee:hover { animation-play-state: paused; }",
          "vi": ".marquee:hover { animation-play-state: paused; }"
        },
        {
          "en": ".marquee:hover { animation: stop; }",
          "vi": ".marquee:hover { animation: stop; }"
        },
        {
          "en": ".marquee:hover { animation-duration: 0s; }",
          "vi": ".marquee:hover { animation-duration: 0s; }"
        },
        {
          "en": ".marquee:hover { transform: none; }",
          "vi": ".marquee:hover { transform: none; }"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`animation-play-state: paused` on hover pauses tickers so users can read content or click links comfortably.",
        "vi": "`animation-play-state: paused` khi hover giúp người dùng dễ dàng dừng chữ lại để đọc hoặc click liên kết."
      },
      "topicId": "css_animations",
      "difficulty": "easy"
    },
    {
      "id": "css_q_18_6",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: The value used to make a keyframe animation loop continuously without ever stopping is animation-iteration-count: ________",
        "vi": "Điền vào chỗ trống: Giá trị dùng để làm animation lặp đi lặp lại liên tục không bao giờ dừng là animation-iteration-count: ________"
      },
      "fillBlankAnswers": [
        "infinite"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "infinite causes the animation to loop indefinitely.",
        "vi": "infinite giúp animation lặp lại vô hạn."
      },
      "topicId": "css_animations",
      "difficulty": "easy"
    },
    {
      "id": "css_q_18_7",
      "type": "multiple_choice",
      "question": {
        "en": "Which properties can be set inside individual @keyframes steps? (Select all that apply)",
        "vi": "Những thuộc tính nào sau đây có thể định nghĩa bên trong các bước của @keyframes? (Chọn tất cả đáp án đúng)"
      },
      "options": [
        {
          "en": "transform",
          "vi": "transform"
        },
        {
          "en": "opacity",
          "vi": "opacity"
        },
        {
          "en": "background-color",
          "vi": "background-color"
        },
        {
          "en": "filter",
          "vi": "filter"
        }
      ],
      "correctAnswers": [
        0,
        1,
        2,
        3
      ],
      "explanation": {
        "en": "Transforms, opacity, colors, and filters are all fully valid inside keyframe rules.",
        "vi": "Transform, opacity, màu sắc và bộ lọc filter đều có thể tạo hoạt họa bên trong @keyframes."
      },
      "topicId": "css_animations",
      "difficulty": "easy"
    },
    {
      "id": "css_q_18_8",
      "type": "single_choice",
      "question": {
        "en": "What is the recommended accessible fallback when a user has enabled reduced motion in their OS?",
        "vi": "Giải pháp tiếp cận web chuẩn mực khi người dùng bật chế độ giảm chuyển động trong hệ điều hành là gì?"
      },
      "options": [
        {
          "en": "@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }",
          "vi": "@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }"
        },
        {
          "en": "Disable all images on the website",
          "vi": "Tắt toàn bộ hình ảnh trên trang web"
        },
        {
          "en": "Redirect the user to an error page",
          "vi": "Chuyển hướng người dùng sang trang báo lỗi"
        },
        {
          "en": "Delete the stylesheet",
          "vi": "Xóa file CSS"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Reducing animation and transition durations to near-zero provides instant state changes while honoring accessibility needs.",
        "vi": "Giảm thời lượng animation về gần 0 giúp chuyển trạng thái tức thì mà không gây choáng ngợp cho người dùng nhạy cảm."
      },
      "topicId": "css_animations",
      "difficulty": "medium"
    },
    {
      "id": "css_q_18_9",
      "type": "true_false",
      "question": {
        "en": "True or False: In `@keyframes`, you can use percentage milestones like `0%`, `25%`, `50%`, `75%`, `100%` to orchestrate multi-step animations.",
        "vi": "Đúng hay Sai: Trong `@keyframes`, bạn có thể dùng các mốc phần trăm như `0%`, `25%`, `50%`, `75%`, `100%` để điều phối hoạt họa nhiều giai đoạn."
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
        "en": "Percentage milestones allow granular choreography across the animation timeline.",
        "vi": "Các mốc phần trăm cho phép biên đạo tỉ mỉ từng bước chuyển động trên dòng thời gian."
      },
      "topicId": "css_animations",
      "difficulty": "easy"
    },
    {
      "id": "css_q_18_10",
      "type": "single_choice",
      "question": {
        "en": "What does `animation-timing-function: steps(4);` do?",
        "vi": "`animation-timing-function: steps(4);` tạo ra chuyển động như thế nào?"
      },
      "options": [
        {
          "en": "Divides the animation into 4 discrete abrupt jumps rather than smooth continuous interpolation (ideal for sprite sheet animations)",
          "vi": "Chia chuyển động thành 4 bước nhảy giật dứt khoát thay vì chuyển đổi mượt (lý tưởng cho hoạt họa sprite sheet 2D)"
        },
        {
          "en": "Repeats the animation 4 times",
          "vi": "Lặp lại animation 4 lần"
        },
        {
          "en": "Slows the animation down by 4 seconds",
          "vi": "Làm chậm animation 4 giây"
        },
        {
          "en": "Creates 4 copies of the element",
          "vi": "Nhân bản phần tử thành 4 bản sao"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`steps(N)` splits playback into N distinct intervals, essential for retro pixel art and frame-by-frame sprite sheets.",
        "vi": "`steps(N)` chia dòng thời gian thành N bước nhảy rời rạc, là bí quyết tạo hoạt họa hoạt hình frame-by-frame và game pixel 2D."
      },
      "topicId": "css_animations",
      "difficulty": "hard"
    }
  ]
};
