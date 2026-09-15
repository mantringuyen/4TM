import { Lesson } from '../../../../types';

export const lesson08: Lesson = {
  "id": "css_lesson_8",
  "moduleId": "css_mod_2",
  "levelId": "basic",
  "courseId": "css",
  "order": 8,
  "topicId": "css_positioning",
  "title": {
    "en": "Element Flow & Positioning Schemes",
    "vi": "Luồng Phần Tử & Các Cơ Chế Định Vị Positioning"
  },
  "summary": {
    "en": "Master normal document flow, relative, absolute, fixed, sticky positioning, and how stacking contexts govern z-index rendering.",
    "vi": "Làm chủ luồng tài liệu tự nhiên, định vị relative, absolute, fixed, sticky và cách ngữ cảnh xếp chồng (stacking context) điều khiển z-index."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "CSS positioning removes or offsets elements from the normal document flow. Mastering `relative`, `absolute`, `fixed`, `sticky`, and stacking contexts with `z-index` is vital for overlays, sticky headers, and modal dialogs.",
      "vi": "Cơ chế định vị CSS giúp dịch chuyển hoặc tách phần tử ra khỏi luồng tài liệu thông thường. Làm chủ `relative`, `absolute`, `fixed`, `sticky` và ngữ cảnh xếp chồng với `z-index` là chìa khóa để xây dựng thanh header dính, modal và menu dropdown."
    },
    "conceptExplanation": {
      "en": "`static` is the default normal flow. `relative` offsets an element without removing its original space from the layout. `absolute` completely removes the element from flow, positioning it relative to its closest ancestor with a position other than static (often a parent with `position: relative`). `fixed` pins the element relative to the viewport. `sticky` toggles between relative and fixed depending on scroll threshold. `z-index` controls layer depth along the z-axis, but only functions within a Stacking Context (created by positioned elements, opacity < 1, transform, or `isolation: isolate`).",
      "vi": "`static` là vị trí tự nhiên mặc định. `relative` dịch chuyển phần tử nhưng vẫn giữ nguyên khoảng trống ban đầu của nó. `absolute` tách hẳn phần tử khỏi luồng tài liệu và căn vị trí theo thẻ tổ tiên gần nhất có position khác static (thường là thẻ cha đặt `position: relative`). `fixed` ghim phần tử cố định theo màn hình viewport. `sticky` tự động chuyển đổi giữa relative và fixed khi cuộn trang qua ngưỡng xác định. `z-index` điều khiển độ sâu lớp dọc trục Z, nhưng chỉ có hiệu lực bên trong Ngữ cảnh Xếp chồng (Stacking Context)."
    },
    "syntax": "/* Parent anchor for absolute child */\n.card-container {\n  position: relative;\n}\n\n/* Top-right corner badge */\n.badge-pin {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  z-index: 10;\n}\n\n/* Sticky site header */\n.sticky-nav {\n  position: sticky;\n  top: 0;\n  z-index: 50;\n}",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "Sticky Header and Absolute Close Button",
          "vi": "Thanh Điều Hướng Dính và Nút Đóng Tuyệt Đối"
        },
        "description": {
          "en": "Demonstrates sticky navigation and an absolutely positioned dismiss button inside a modal dialog.",
          "vi": "Minh họa thanh navbar bám dính khi cuộn và nút đóng 'X' định vị tuyệt đối ở góc modal."
        },
        "code": "/* Sticky Navigation Header */\nheader.top-nav {\n  position: sticky;\n  top: 0;\n  background: #0f172a;\n  z-index: 100;\n}\n\n/* Modal Box Container */\n.modal-card {\n  position: relative;\n  padding: 24px;\n}\n\n.modal-close-btn {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Using position: absolute without declaring position: relative on the intended container, causing the child to pin to <body>.",
          "vi": "Dùng position: absolute mà quên đặt position: relative cho thẻ cha, khiến thẻ con nhảy ra tận góc của thẻ <body>."
        },
        "correction": {
          "en": "Always add position: relative to the immediate containing parent of an absolute child.",
          "vi": "Luôn đặt position: relative cho thẻ cha trực tiếp bao quanh phần tử absolute."
        }
      }
    ],
    "tips": [
      {
        "en": "position: sticky requires a directional offset (e.g. top: 0) and cannot work if any ancestor has overflow: hidden.",
        "vi": "position: sticky bắt buộc phải có tọa độ bám (như top: 0) và sẽ bị vô hiệu hóa nếu có bất kỳ thẻ cha nào chứa overflow: hidden."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_8_1",
      "type": "complete_code",
      "title": {
        "en": "Pin a Badge to Top-Right Corner",
        "vi": "Ghim Huy Hiệu Vào Góc Trên Bên Phải"
      },
      "instruction": {
        "en": "Set position: absolute, top: 8px, and right: 8px on .status-pill inside a relative container.",
        "vi": "Đặt position: absolute, top: 8px và right: 8px cho .status-pill bên trong thẻ cha relative."
      },
      "starterCode": ".status-pill {\n  /* Position in top right */\n}",
      "solutionCode": ".status-pill {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n}",
      "hint": {
        "en": "Use position: absolute; top: 8px; right: 8px;",
        "vi": "Dùng position: absolute; top: 8px; right: 8px;"
      },
      "explanation": {
        "en": "position: absolute anchors the element precisely to the top-right corner of its relative parent.",
        "vi": "position: absolute neo chính xác phần tử vào góc trên bên phải của thẻ cha relative."
      }
    },
    {
      "id": "css_ex_8_2",
      "type": "fix_code",
      "title": {
        "en": "Create a Sticky Navbar",
        "vi": "Tạo Thanh Điều Hướng Dính Khi Cuộn"
      },
      "instruction": {
        "en": "Add position: sticky, top: 0, and z-index: 50 to .site-navbar.",
        "vi": "Thêm position: sticky, top: 0 và z-index: 50 vào .site-navbar."
      },
      "starterCode": ".site-navbar {\n  background-color: #0f172a;\n}",
      "solutionCode": ".site-navbar {\n  position: sticky;\n  top: 0;\n  z-index: 50;\n  background-color: #0f172a;\n}",
      "hint": {
        "en": "Add position: sticky; top: 0; z-index: 50;",
        "vi": "Thêm position: sticky; top: 0; z-index: 50;"
      },
      "explanation": {
        "en": "Sticky elements stick to top: 0 once scrolled past, with z-index keeping them above scrolling body content.",
        "vi": "Sticky giúp phần tử bám dính ở top: 0 khi cuộn qua, z-index giữ thanh menu luôn nổi phía trên nội dung."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_8",
    "title": {
      "en": "Build a Floating Action Card with Relative Anchor",
      "vi": "Xây Dựng Thẻ Hành Động Nổi Với Khung Neo Relative"
    },
    "description": {
      "en": "Style .action-card with position: relative, padding: 24px, and background: #1e293b. Style .floating-badge with position: absolute, top: -10px, right: 16px, background: #38bdf8, color: #0f172a, and z-index: 10.",
      "vi": "Tạo kiểu cho .action-card với position: relative, padding: 24px, background: #1e293b. Tạo kiểu cho .floating-badge với position: absolute, top: -10px, right: 16px, background: #38bdf8, color: #0f172a và z-index: 10."
    },
    "requirements": [
      {
        "en": ".action-card { position: relative }",
        "vi": ".action-card { position: relative }"
      },
      {
        "en": "position: absolute",
        "vi": "position: absolute"
      },
      {
        "en": "top: -10px",
        "vi": "top: -10px"
      },
      {
        "en": "right: 16px",
        "vi": "right: 16px"
      },
      {
        "en": "z-index: 10",
        "vi": "z-index: 10"
      }
    ],
    "starterCode": "/* Container and badge positioning */\n.action-card {\n}\n\n.floating-badge {\n}",
    "solutionCode": ".action-card {\n  position: relative;\n  padding: 24px;\n  background: #1e293b;\n}\n\n.floating-badge {\n  position: absolute;\n  top: -10px;\n  right: 16px;\n  background: #38bdf8;\n  color: #0f172a;\n  z-index: 10;\n}",
    "hints": [
      {
        "en": "Use position: relative on the card and position: absolute on the badge.",
        "vi": "Dùng position: relative cho card và position: absolute cho badge."
      }
    ],
    "solutionExplanation": {
      "en": "Combining relative parent and absolute child allows badges to float neatly over card borders.",
      "vi": "Kết hợp cha relative và con absolute giúp huy hiệu nổi đẹp mắt vượt ra ngoài viền card."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_8_1",
      "type": "single_choice",
      "question": {
        "en": "What does an element with `position: absolute;` position itself relative to?",
        "vi": "Một phần tử có `position: absolute;` sẽ căn vị trí tương đối theo đối tượng nào?"
      },
      "options": [
        {
          "en": "Its nearest ancestor element that has a position other than static",
          "vi": "Thẻ tổ tiên gần nhất có giá trị position khác static"
        },
        {
          "en": "Always the browser viewport window",
          "vi": "Luôn luôn căn theo cửa sổ màn hình trình duyệt"
        },
        {
          "en": "Its immediate sibling element",
          "vi": "Phần tử anh em nằm liền kề"
        },
        {
          "en": "The <html> element exclusively",
          "vi": "Duy nhất thẻ <html>"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "An absolute element searches up the DOM tree for the nearest positioned ancestor (relative, absolute, fixed, or sticky). If none exist, it defaults to the initial containing block (viewport/html).",
        "vi": "Phần tử absolute tìm ngược lên cây DOM để tìm thẻ tổ tiên gần nhất có position khác static. Nếu không có, nó mới căn theo khung nhìn viewport."
      },
      "topicId": "css_positioning",
      "difficulty": "easy"
    },
    {
      "id": "css_q_8_2",
      "type": "single_choice",
      "question": {
        "en": "What is the key difference between `position: fixed;` and `position: absolute;`?",
        "vi": "Khác biệt cốt lõi giữa `position: fixed;` và `position: absolute;` là gì?"
      },
      "options": [
        {
          "en": "fixed is always anchored to the browser viewport and stays in place when scrolling, while absolute scrolls with its positioned parent",
          "vi": "fixed luôn neo vào màn hình trình duyệt và đứng yên khi cuộn trang, còn absolute cuộn theo thẻ cha của nó"
        },
        {
          "en": "fixed cannot use z-index",
          "vi": "fixed không dùng được z-index"
        },
        {
          "en": "absolute elements cannot have background colors",
          "vi": "absolute không đặt được màu nền"
        },
        {
          "en": "fixed only works on mobile devices",
          "vi": "fixed chỉ hoạt động trên di động"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "position: fixed anchors to the viewport, making it immune to document scrolling.",
        "vi": "position: fixed neo theo khung nhìn màn hình, không bị trôi đi khi người dùng cuộn trang."
      },
      "topicId": "css_positioning",
      "difficulty": "easy"
    },
    {
      "id": "css_q_8_3",
      "type": "single_choice",
      "question": {
        "en": "Why might `position: sticky;` fail to stick when scrolling?",
        "vi": "Tại sao `position: sticky;` có thể bị lỗi không bám dính khi cuộn trang?"
      },
      "options": [
        {
          "en": "An ancestor element has `overflow: hidden`, `overflow: auto`, or no top/bottom offset was defined",
          "vi": "Một thẻ cha nào đó có thuộc tính `overflow: hidden`, `overflow: auto` hoặc chưa khai báo tọa độ top/bottom"
        },
        {
          "en": "The browser is running in dark mode",
          "vi": "Trình duyệt đang bật chế độ tối"
        },
        {
          "en": "The sticky element has a border",
          "vi": "Phần tử sticky có đường viền border"
        },
        {
          "en": "The page has more than 100 lines of CSS",
          "vi": "Trang web có hơn 100 dòng CSS"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Sticky positioning requires a scroll threshold (e.g. `top: 0`) and is disabled if an ancestor container clips overflow with `overflow: hidden`.",
        "vi": "Sticky đòi hỏi phải có tọa độ bám (như `top: 0`) và sẽ mất tác dụng nếu có thẻ cha nào đó chứa thuộc tính `overflow: hidden`."
      },
      "topicId": "css_positioning",
      "difficulty": "medium"
    },
    {
      "id": "css_q_8_4",
      "type": "true_false",
      "question": {
        "en": "True or False: `position: relative;` removes an element completely from the document flow, collapsing the space it originally occupied.",
        "vi": "Đúng hay Sai: `position: relative;` tách hoàn toàn phần tử ra khỏi luồng tài liệu, làm xẹp khoảng trống ban đầu của nó."
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
        "en": "position: relative offsets an element visually while preserving its original space in the document flow.",
        "vi": "position: relative chỉ dịch chuyển hiển thị của phần tử nhưng vẫn giữ nguyên khoảng trống ban đầu của nó trong bố cục."
      },
      "topicId": "css_positioning",
      "difficulty": "easy"
    },
    {
      "id": "css_q_8_5",
      "type": "single_choice",
      "question": {
        "en": "Why does a higher `z-index` (e.g. `z-index: 9999`) sometimes fail to appear in front of an element with `z-index: 1`?",
        "vi": "Tại sao một phần tử có `z-index: 9999` đôi khi vẫn bị nằm chìm phía dưới một phần tử có `z-index: 1`?"
      },
      "options": [
        {
          "en": "It is trapped inside a parent Stacking Context whose overall z-index is lower than the competing element's stacking context",
          "vi": "Nó bị kẹt bên trong một Ngữ cảnh Xếp chồng (Stacking Context) cha có z-index thấp hơn ngữ cảnh của phần tử đối thủ"
        },
        {
          "en": "z-index caps out at 100 in modern CSS",
          "vi": "z-index bị giới hạn tối đa là 100 trong CSS hiện đại"
        },
        {
          "en": "The background color is transparent",
          "vi": "Do màu nền bị trong suốt"
        },
        {
          "en": "The element contains text instead of images",
          "vi": "Do phần tử chứa chữ thay vì hình ảnh"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "z-index values are evaluated locally within their parent Stacking Context. A child cannot escape its parent's stacking level.",
        "vi": "z-index chỉ có giá trị so sánh nội bộ trong cùng một Ngữ cảnh Xếp chồng (Stacking Context). Thẻ con không thể vượt mặt cấp bậc của thẻ cha."
      },
      "topicId": "css_positioning",
      "difficulty": "hard"
    },
    {
      "id": "css_q_8_6",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: To explicitly create a new isolated stacking context on an element without altering positioning or opacity, use the property isolation: ________",
        "vi": "Điền vào chỗ trống: Để chủ động tạo một ngữ cảnh xếp chồng độc lập mới mà không cần đổi position hay opacity, dùng thuộc tính isolation: ________"
      },
      "fillBlankAnswers": [
        "isolate"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "isolation: isolate creates a clean new stacking context, preventing child z-index leakage.",
        "vi": "isolation: isolate tạo ra một ngữ cảnh xếp chồng mới sạch sẽ, ngăn rò rỉ z-index của các thẻ con."
      },
      "topicId": "css_positioning",
      "difficulty": "hard"
    },
    {
      "id": "css_q_8_7",
      "type": "multiple_choice",
      "question": {
        "en": "Which of the following actions create a new Stacking Context in CSS? (Select all that apply)",
        "vi": "Những hành động nào sau đây sẽ tạo ra một Ngữ cảnh Xếp chồng (Stacking Context) mới trong CSS? (Chọn tất cả đáp án đúng)"
      },
      "options": [
        {
          "en": "An element with position: relative and z-index other than auto",
          "vi": "Phần tử có position: relative và z-index khác auto"
        },
        {
          "en": "An element with opacity less than 1 (e.g. opacity: 0.95)",
          "vi": "Phần tử có opacity nhỏ hơn 1 (ví dụ opacity: 0.95)"
        },
        {
          "en": "An element with transform (e.g. transform: scale(1))",
          "vi": "Phần tử có thuộc tính transform (ví dụ transform: scale(1))"
        },
        {
          "en": "Setting font-size: 16px",
          "vi": "Đặt font-size: 16px"
        }
      ],
      "correctAnswers": [
        0,
        1,
        2
      ],
      "explanation": {
        "en": "Positioned elements with z-index, opacity < 1, transforms, filters, and isolation: isolate all instantiate new stacking contexts.",
        "vi": "Phần tử định vị có z-index, opacity < 1, transform, filter và isolation: isolate đều tạo ra một stacking context mới."
      },
      "topicId": "css_positioning",
      "difficulty": "hard"
    },
    {
      "id": "css_q_8_8",
      "type": "single_choice",
      "question": {
        "en": "What is the default value of the `position` property in CSS?",
        "vi": "Giá trị mặc định của thuộc tính `position` trong CSS là gì?"
      },
      "options": [
        {
          "en": "static",
          "vi": "static"
        },
        {
          "en": "relative",
          "vi": "relative"
        },
        {
          "en": "absolute",
          "vi": "absolute"
        },
        {
          "en": "initial-flow",
          "vi": "initial-flow"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Elements have position: static by default, rendering in normal document flow and ignoring top/right/bottom/left/z-index.",
        "vi": "Mặc định mọi phần tử có position: static, nằm trong luồng tài liệu tự nhiên và bỏ qua các thuộc tính top/right/bottom/left/z-index."
      },
      "topicId": "css_positioning",
      "difficulty": "easy"
    },
    {
      "id": "css_q_8_9",
      "type": "predict_output",
      "question": {
        "en": "An element has `position: static; top: 50px; z-index: 10;`. How does it move?",
        "vi": "Một phần tử có `position: static; top: 50px; z-index: 10;`. Phần tử này sẽ di chuyển như thế nào?"
      },
      "options": [
        {
          "en": "It does not move at all (top and z-index have no effect on static elements)",
          "vi": "Nó hoàn toàn không di chuyển (top và z-index vô tác dụng trên phần tử static)"
        },
        {
          "en": "It moves down by 50px",
          "vi": "Nó dịch xuống dưới 50px"
        },
        {
          "en": "It jumps to the top of the page",
          "vi": "Nó nhảy lên đỉnh trang"
        },
        {
          "en": "It hides behind the body",
          "vi": "Nó ẩn ra phía sau thẻ body"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Coordinate offsets (top/left/right/bottom) and z-index are completely ignored on elements with position: static.",
        "vi": "Các thuộc tính tọa độ (top/left/right/bottom) và z-index hoàn toàn bị bỏ qua trên phần tử position: static."
      },
      "topicId": "css_positioning",
      "difficulty": "easy"
    },
    {
      "id": "css_q_8_10",
      "type": "true_false",
      "question": {
        "en": "True or False: Using `inset: 0;` is shorthand for `top: 0; right: 0; bottom: 0; left: 0;`.",
        "vi": "Đúng hay Sai: Thuộc tính `inset: 0;` là cách viết tắt của `top: 0; right: 0; bottom: 0; left: 0;`."
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
        "en": "inset is standard shorthand for all four directional offsets (top, right, bottom, left) on positioned elements.",
        "vi": "inset là cú pháp viết tắt chuẩn cho cả 4 tọa độ (top, right, bottom, left) của phần tử định vị."
      },
      "topicId": "css_positioning",
      "difficulty": "easy"
    }
  ]
};
