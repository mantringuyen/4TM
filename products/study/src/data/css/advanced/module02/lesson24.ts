import { Lesson } from '../../../../types';

export const lesson24: Lesson = {
  "id": "css_lesson_24",
  "moduleId": "css_mod_6",
  "levelId": "advanced",
  "courseId": "css",
  "order": 24,
  "topicId": "css_visual_effects",
  "title": {
    "en": "Modern Visual Effects: Filters, Blend Modes & Scroll-Driven Animations",
    "vi": "Hiệu Ứng Thị Giác Đỉnh Cao: Filters, Blend Modes & Scroll-Driven Animations"
  },
  "summary": {
    "en": "Master backdrop-filter glassmorphism, mix-blend-mode, clip-path geometry, and native pure-CSS scroll-driven animations with animation-timeline: scroll().",
    "vi": "Làm chủ hiệu ứng kính mờ backdrop-filter, hòa trộn mix-blend-mode, cắt hình học clip-path và hoạt họa theo thanh cuộn thuần CSS animation-timeline."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "Modern CSS provides native graphic-design capabilities previously requiring Photoshop or heavy JavaScript libraries. From frosted-glass backdrops (`backdrop-filter`) to vector geometric masking (`clip-path`) and pure CSS scroll-linked progress bars (`animation-timeline: scroll()`), CSS delivers native 60fps visual excellence.",
      "vi": "CSS hiện đại mang tới các năng lực xử lý đồ họa cấp cao mà trước đây đòi hỏi Photoshop hoặc các thư viện JavaScript cồng kềnh. Từ kính mờ (`backdrop-filter`) tới mặt nạ cắt hình học (`clip-path`) và hoạt họa liên kết thanh cuộn thuần CSS (`animation-timeline: scroll()`), mọi hiệu ứng đều chạy mượt mà 60fps trên GPU."
    },
    "conceptExplanation": {
      "en": "`backdrop-filter: blur(12px)` blurs the area behind an element (the foundation of modern OS frosted-glass UI). `mix-blend-mode` blends an element's colors with its backdrop (e.g. `multiply`, `screen`, `difference`). `clip-path: polygon(...)` crops elements into bespoke geometric silhouettes. The cutting-edge **CSS Scroll-Driven Animations** specification introduces `animation-timeline: scroll()` and `view()`, allowing keyframe animations to be scrubbed directly by the user's scroll position with zero JavaScript!",
      "vi": "`backdrop-filter: blur(12px)` làm mờ hậu cảnh phía sau phần tử (nền tảng của phong cách kính mờ frosted-glass). `mix-blend-mode` hòa trộn màu sắc với lớp nền bên dưới (như `multiply`, `screen`, `difference`). `clip-path: polygon(...)` cắt phần tử theo các hình đa giác độc đáo. Đặc biệt, chuẩn **CSS Scroll-Driven Animations** mang tới `animation-timeline: scroll()` và `view()`, cho phép điều khiển tiến trình chạy hoạt họa trực tiếp theo vị trí cuộn trang mà không cần một dòng JavaScript nào!"
    },
    "syntax": "/* Modern Frosted-Glass Navigation Bar */\n.glass-header {\n  position: sticky;\n  top: 0;\n  background: rgba(15, 23, 42, 0.75);\n  backdrop-filter: blur(16px) saturate(180%);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n}\n\n/* Pure CSS Scroll Progress Bar */\n@keyframes grow-progress {\n  from { transform: scaleX(0); }\n  to   { transform: scaleX(1); }\n}\n\n.scroll-progress-bar {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 4px;\n  transform-origin: left;\n  background: #3b82f6;\n  animation: grow-progress auto linear;\n  animation-timeline: scroll();\n}",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "Scroll-Driven Reveal on View Entry",
          "vi": "Hiệu Ứng Hiện Hình Khi Cuộn Đến Nơi Bằng CSS Thuần"
        },
        "description": {
          "en": "Fades in and scales up cards as they enter the viewport using animation-timeline: view().",
          "vi": "Tự động mờ dần và phóng to thẻ khi cuộn tới tầm nhìn bằng animation-timeline: view()."
        },
        "code": "@keyframes revealOnScroll {\n  from {\n    opacity: 0;\n    transform: translateY(40px) scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n\n.scroll-card {\n  animation: revealOnScroll linear both;\n  animation-timeline: view();\n  animation-range: entry 10% cover 30%;\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Using filter: blur() instead of backdrop-filter: blur(), accidentally blurring the element's own text content rather than the background behind it.",
          "vi": "Dùng filter: blur() thay vì backdrop-filter: blur() khiến toàn bộ chữ của chính phần tử bị mờ nhòe thay vì làm mờ hậu cảnh phía sau."
        },
        "correction": {
          "en": "Use backdrop-filter: blur() when you want to blur content behind the element while keeping text sharp.",
          "vi": "Dùng backdrop-filter: blur() khi muốn làm mờ hình ảnh phía sau nhưng giữ chữ bên trên sắc nét."
        }
      }
    ],
    "tips": [
      {
        "en": "Pair backdrop-filter with semi-transparent background colors (e.g. rgba(255, 255, 255, 0.7)) so the blur effect is visually apparent.",
        "vi": "Luôn kết hợp backdrop-filter với màu nền bán trong suốt (như rgba(255, 255, 255, 0.7)) để hiệu ứng mờ kính hiển thị rõ rệt."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_24_1",
      "type": "complete_code",
      "title": {
        "en": "Implement Frosted Glassmorphism Header",
        "vi": "Thiết Lập Thanh Header Kính Mờ Glassmorphism"
      },
      "instruction": {
        "en": "Add backdrop-filter: blur(12px) and background: rgba(15, 23, 42, 0.8) to .glass-nav.",
        "vi": "Thêm backdrop-filter: blur(12px) và background: rgba(15, 23, 42, 0.8) cho .glass-nav."
      },
      "starterCode": ".glass-nav {\n  position: fixed;\n  top: 0;\n  /* Add glassmorphism */\n}",
      "solutionCode": ".glass-nav {\n  position: fixed;\n  top: 0;\n  background: rgba(15, 23, 42, 0.8);\n  backdrop-filter: blur(12px);\n}",
      "hint": {
        "en": "Use background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(12px);",
        "vi": "Dùng background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(12px);"
      },
      "explanation": {
        "en": "backdrop-filter blurs everything underneath the semi-transparent navigation bar.",
        "vi": "backdrop-filter làm mờ tất cả nội dung trượt bên dưới thanh điều hướng bán trong suốt."
      }
    },
    {
      "id": "css_ex_24_2",
      "type": "fix_code",
      "title": {
        "en": "Bind Keyframes to Scroll Timeline",
        "vi": "Gắn Hoạt Họa Vào Dòng Thời Gian Cuộn Trang"
      },
      "instruction": {
        "en": "Add animation-timeline: scroll() to .reading-tracker so it tracks page scroll progress.",
        "vi": "Thêm animation-timeline: scroll() vào .reading-tracker để thanh tiến trình chạy theo độ cuộn trang."
      },
      "starterCode": ".reading-tracker {\n  animation: fillProgress linear;\n}",
      "solutionCode": ".reading-tracker {\n  animation: fillProgress linear;\n  animation-timeline: scroll();\n}",
      "hint": {
        "en": "Add animation-timeline: scroll();",
        "vi": "Thêm animation-timeline: scroll();"
      },
      "explanation": {
        "en": "animation-timeline: scroll() drives the keyframe progression based on document scroll offset.",
        "vi": "animation-timeline: scroll() điều khiển hoạt họa trực tiếp theo khoảng cách cuộn trang."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_24",
    "title": {
      "en": "Build a Pure CSS Scroll Progress Bar & Glass Banner",
      "vi": "Xây Dựng Thanh Cuộn Tiến Trình & Khung Kính Thuần CSS"
    },
    "description": {
      "en": "Define @keyframes growBar from scaleX(0) to scaleX(1). Style .top-progress with transform-origin: left, animation: growBar linear, and animation-timeline: scroll(). Style .glass-card with background: rgba(255, 255, 255, 0.1), backdrop-filter: blur(16px), and border: 1px solid rgba(255, 255, 255, 0.2).",
      "vi": "Định nghĩa @keyframes growBar từ scaleX(0) tới scaleX(1). Tạo kiểu .top-progress với transform-origin: left, animation: growBar linear và animation-timeline: scroll(). Tạo kiểu .glass-card với background: rgba(255, 255, 255, 0.1), backdrop-filter: blur(16px) và border: 1px solid rgba(255, 255, 255, 0.2)."
    },
    "requirements": [
      {
        "en": "@keyframes growBar from scaleX(0) to scaleX(1)",
        "vi": "@keyframes growBar từ scaleX(0) tới scaleX(1)"
      },
      {
        "en": "transform-origin: left",
        "vi": "transform-origin: left"
      },
      {
        "en": "animation-timeline: scroll()",
        "vi": "animation-timeline: scroll()"
      },
      {
        "en": "backdrop-filter: blur(16px)",
        "vi": "backdrop-filter: blur(16px)"
      }
    ],
    "starterCode": "/* Scroll progress and glass banner */\n@keyframes growBar {\n}\n\n.top-progress {\n}\n\n.glass-card {\n}",
    "solutionCode": "@keyframes growBar {\n  from {\n    transform: scaleX(0);\n  }\n  to {\n    transform: scaleX(1);\n  }\n}\n\n.top-progress {\n  transform-origin: left;\n  animation: growBar linear;\n  animation-timeline: scroll();\n}\n\n.glass-card {\n  background: rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(16px);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n}",
    "hints": [
      {
        "en": "Define growBar keyframes, apply scroll() timeline on .top-progress, and backdrop-filter on .glass-card.",
        "vi": "Định nghĩa keyframe growBar, áp dụng timeline scroll() cho .top-progress và backdrop-filter cho .glass-card."
      }
    ],
    "solutionExplanation": {
      "en": "Combining native CSS scroll animations with frosted glass styling produces cutting-edge high-performance interfaces.",
      "vi": "Kết hợp hoạt họa cuộn trang thuần CSS với hiệu ứng kính mờ tạo nên giao diện hiện đại đỉnh cao và mượt mà tuyệt đối."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_24_1",
      "type": "single_choice",
      "question": {
        "en": "What is the primary difference between `filter: blur(...)` and `backdrop-filter: blur(...)`?",
        "vi": "Sự khác biệt cốt lõi giữa `filter: blur(...)` và `backdrop-filter: blur(...)` là gì?"
      },
      "options": [
        {
          "en": "`filter: blur()` blurs the element itself and all its children, while `backdrop-filter: blur()` blurs the area behind the element while keeping text sharp",
          "vi": "`filter: blur()` làm mờ chính phần tử và tất cả chữ bên trong nó, còn `backdrop-filter: blur()` làm mờ hậu cảnh phía sau phần tử trong khi chữ bên trên vẫn sắc nét"
        },
        {
          "en": "`backdrop-filter` only works in Firefox",
          "vi": "`backdrop-filter` chỉ chạy trên Firefox"
        },
        {
          "en": "`filter` cannot blur images",
          "vi": "`filter` không làm mờ được hình ảnh"
        },
        {
          "en": "They are completely identical",
          "vi": "Chúng hoàn toàn giống nhau"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`backdrop-filter` applies graphical filtering exclusively to the backdrop layers underneath the target element.",
        "vi": "`backdrop-filter` chỉ áp dụng bộ lọc lên các lớp nằm phía dưới phần tử mục tiêu."
      },
      "topicId": "css_visual_effects",
      "difficulty": "easy"
    },
    {
      "id": "css_q_24_2",
      "type": "single_choice",
      "question": {
        "en": "What does the CSS Scroll-Driven Animation property `animation-timeline: scroll();` achieve?",
        "vi": "Thuộc tính `animation-timeline: scroll();` trong CSS Scroll-Driven Animation mang lại tính năng gì?"
      },
      "options": [
        {
          "en": "Links animation playback progress directly to the user's document scroll position without any JavaScript scroll listeners",
          "vi": "Liên kết trực tiếp tiến trình chạy hoạt họa theo vị trí cuộn trang của người dùng mà không cần bất kỳ mã JavaScript nào"
        },
        {
          "en": "Automatically scrolls the page down continuously",
          "vi": "Tự động cuộn trang xuống liên tục"
        },
        {
          "en": "Disables mouse wheel scrolling",
          "vi": "Khóa con lăn chuột không cho cuộn"
        },
        {
          "en": "Loads video files on scroll",
          "vi": "Tải video khi cuộn"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`animation-timeline: scroll()` replaces heavy JS scroll event handlers with native GPU-threaded scroll animations.",
        "vi": "`animation-timeline: scroll()` thay thế hoàn toàn các hàm lắng nghe sự kiện scroll nặng nề của JS bằng hoạt họa GPU mượt mà."
      },
      "topicId": "css_visual_effects",
      "difficulty": "medium"
    },
    {
      "id": "css_q_24_3",
      "type": "single_choice",
      "question": {
        "en": "What does `mix-blend-mode: difference;` do when text scrolls over white and black sections?",
        "vi": "Hiệu ứng `mix-blend-mode: difference;` tạo ra hiện tượng gì khi đoạn chữ lướt qua các mảng nền trắng và đen?"
      },
      "options": [
        {
          "en": "Inverts the text color dynamically (turns white over black backgrounds, and black over white backgrounds) ensuring perpetual contrast",
          "vi": "Tự động đảo ngược màu chữ (thành chữ trắng trên nền đen, và chữ đen trên nền trắng) đảm bảo luôn nhìn rõ chữ"
        },
        {
          "en": "Hides the text completely",
          "vi": "Ẩn hoàn toàn đoạn chữ"
        },
        {
          "en": "Blurries the background",
          "vi": "Làm mờ nền"
        },
        {
          "en": "Rotates the text 180 degrees",
          "vi": "Xoay ngược chữ 180 độ"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The difference blend mode subtracts pixel values, creating automatic high-contrast inverted text against contrasting backgrounds.",
        "vi": "Chế độ hòa trộn difference lấy hiệu số giá trị màu pixel, tự động đảo màu chữ để luôn đạt độ tương phản tối đa trên mọi nền."
      },
      "topicId": "css_visual_effects",
      "difficulty": "medium"
    },
    {
      "id": "css_q_24_4",
      "type": "true_false",
      "question": {
        "en": "True or False: `clip-path: polygon(...)` allows clipping an HTML element into custom geometric shapes like diamonds, triangles, and angled banners.",
        "vi": "Đúng hay Sai: `clip-path: polygon(...)` cho phép cắt phần tử HTML thành các hình học tùy biến như hình thoi, tam giác và banner vát góc."
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
        "en": "clip-path defines vector clipping boundaries that mask out any pixels outside the coordinate polygon.",
        "vi": "clip-path xác định đường bao vector che giấu các pixel nằm ngoài hình đa giác tọa độ."
      },
      "topicId": "css_visual_effects",
      "difficulty": "easy"
    },
    {
      "id": "css_q_24_5",
      "type": "single_choice",
      "question": {
        "en": "What is the difference between `animation-timeline: scroll()` and `animation-timeline: view()` in CSS Scroll-Driven Animations?",
        "vi": "Sự khác biệt giữa `animation-timeline: scroll()` và `animation-timeline: view()` trong CSS Scroll-Driven Animations là gì?"
      },
      "options": [
        {
          "en": "`scroll()` tracks the scroll position of the whole scroll container, while `view()` tracks when a specific element enters and exits the viewport",
          "vi": "`scroll()` theo dõi tiến trình cuộn của toàn bộ khung cuộn, còn `view()` theo dõi thời điểm một phần tử cụ thể bước vào và rời khỏi tầm nhìn"
        },
        {
          "en": "`view()` only runs in mobile browsers",
          "vi": "`view()` chỉ chạy trên điện thoại"
        },
        {
          "en": "`scroll()` requires JavaScript",
          "vi": "`scroll()` bắt buộc phải có JavaScript"
        },
        {
          "en": "They are completely identical",
          "vi": "Chúng hoàn toàn giống nhau"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`view()` creates view-timeline progress based on the subject's intersection with the scrollport (entry to exit).",
        "vi": "`view()` tạo dòng thời gian dựa trên vị trí xuất hiện của phần tử khi cắt qua khung nhìn (từ lúc bắt đầu chạm tới lúc ra khỏi)."
      },
      "topicId": "css_visual_effects",
      "difficulty": "hard"
    },
    {
      "id": "css_q_24_6",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: The CSS property used to apply graphical blur or saturation behind an element is backdrop-________",
        "vi": "Điền vào chỗ trống: Thuộc tính CSS dùng để làm mờ hoặc tăng độ bão hòa màu hậu cảnh phía sau là backdrop-________"
      },
      "fillBlankAnswers": [
        "filter"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "backdrop-filter applies effects to the backdrop layer.",
        "vi": "backdrop-filter áp dụng hiệu ứng thị giác lên lớp hậu cảnh."
      },
      "topicId": "css_visual_effects",
      "difficulty": "easy"
    },
    {
      "id": "css_q_24_7",
      "type": "multiple_choice",
      "question": {
        "en": "Which of the following are valid functions in the CSS `filter` and `backdrop-filter` properties? (Select all that apply)",
        "vi": "Những hàm nào sau đây là hàm hợp lệ trong thuộc tính CSS `filter` và `backdrop-filter`? (Chọn tất cả đáp án đúng)"
      },
      "options": [
        {
          "en": "blur(px)",
          "vi": "blur(px)"
        },
        {
          "en": "grayscale(%)",
          "vi": "grayscale(%)"
        },
        {
          "en": "saturate(%)",
          "vi": "saturate(%)"
        },
        {
          "en": "contrast(%)",
          "vi": "contrast(%)"
        }
      ],
      "correctAnswers": [
        0,
        1,
        2,
        3
      ],
      "explanation": {
        "en": "blur, grayscale, saturate, contrast, brightness, sepia, invert, and hue-rotate are standard CSS filter functions.",
        "vi": "blur, grayscale, saturate, contrast, brightness, sepia, invert và hue-rotate đều là các hàm filter chuẩn của CSS."
      },
      "topicId": "css_visual_effects",
      "difficulty": "easy"
    },
    {
      "id": "css_q_24_8",
      "type": "single_choice",
      "question": {
        "en": "How do you create a circular clipped image using `clip-path`?",
        "vi": "Làm thế nào để cắt một tấm ảnh thành hình tròn hoàn hảo bằng `clip-path`?"
      },
      "options": [
        {
          "en": "clip-path: circle(50%);",
          "vi": "clip-path: circle(50%);"
        },
        {
          "en": "clip-path: round(100px);",
          "vi": "clip-path: round(100px);"
        },
        {
          "en": "clip: circle;",
          "vi": "clip: circle;"
        },
        {
          "en": "mask-style: circle;",
          "vi": "mask-style: circle;"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`clip-path: circle(50%)` clips the element into a perfect circle based on half its shortest dimension.",
        "vi": "`clip-path: circle(50%)` cắt phần tử thành hình tròn hoàn hảo lấy tâm là chính giữa."
      },
      "topicId": "css_visual_effects",
      "difficulty": "easy"
    },
    {
      "id": "css_q_24_9",
      "type": "true_false",
      "question": {
        "en": "True or False: CSS Scroll-Driven Animations run off the main JavaScript thread on the compositor, ensuring zero scroll stutter or lag.",
        "vi": "Đúng hay Sai: CSS Scroll-Driven Animations chạy tách biệt khỏi luồng chính JavaScript trên compositor GPU, đảm bảo không bao giờ bị giật lag khi cuộn trang."
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
        "en": "Because the browser engine executes scroll animations natively in the compositor thread, animations remain butter-smooth even if the main thread is busy.",
        "vi": "Do trình duyệt thực thi trực tiếp trên GPU compositor thread, hoạt họa luôn mượt mà 60fps kể cả khi main thread JS đang bận rộn."
      },
      "topicId": "css_visual_effects",
      "difficulty": "medium"
    },
    {
      "id": "css_q_24_10",
      "type": "single_choice",
      "question": {
        "en": "What does `filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3))` do differently than `box-shadow` on a transparent PNG or SVG icon?",
        "vi": "`filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3))` khác biệt như thế nào so với `box-shadow` khi áp dụng trên ảnh PNG trong suốt hoặc icon SVG?"
      },
      "options": [
        {
          "en": "`drop-shadow` contours to the actual visible pixel outlines of the transparent graphic, whereas `box-shadow` casts a rectangular shadow around the bounding box",
          "vi": "`drop-shadow` đổ bóng uốn lượn theo đúng đường viền pixel thực của hình ảnh trong suốt, trong khi `box-shadow` chỉ đổ bóng hình chữ nhật bao quanh khung ngoài"
        },
        {
          "en": "`drop-shadow` only works in grayscale",
          "vi": "`drop-shadow` chỉ tạo bóng màu xám"
        },
        {
          "en": "`box-shadow` is faster in 3D",
          "vi": "`box-shadow` nhanh hơn trong 3D"
        },
        {
          "en": "There is no difference",
          "vi": "Không có gì khác biệt"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`filter: drop-shadow` respects alpha transparency, creating organic silhouettes around PNG cutouts and vector SVGs.",
        "vi": "`filter: drop-shadow` nhận diện kênh alpha trong suốt để tạo bóng đổ ôm sát hình dáng thực của icon SVG và ảnh PNG."
      },
      "topicId": "css_visual_effects",
      "difficulty": "medium"
    }
  ]
};
