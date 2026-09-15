import { Lesson } from '../../../../types';

export const lesson09: Lesson = {
  "id": "css_lesson_9",
  "moduleId": "css_mod_3",
  "levelId": "intermediate",
  "courseId": "css",
  "order": 9,
  "topicId": "css_flexbox_container",
  "title": {
    "en": "Flexbox I: Container Mechanics & Axis Alignment",
    "vi": "Flexbox I: Cơ Chế Khung Chứa & Căn Chỉnh Đa Trục"
  },
  "summary": {
    "en": "Master display: flex, main axis vs cross axis, justify-content, align-items, flex-direction, flex-wrap, and the gap property.",
    "vi": "Làm chủ display: flex, trục chính main axis và trục phụ cross axis, justify-content, align-items, flex-direction, flex-wrap và thuộc tính gap."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "Flexbox (Flexible Box Layout) is a one-dimensional layout model designed for distributing space and aligning items along a single axis (row or column). Understanding how the main and cross axes flip based on flex-direction is fundamental.",
      "vi": "Flexbox (Flexible Box Layout) là mô hình dàn trang 1 chiều được thiết kế để phân bổ khoảng cách và căn chỉnh phần tử dọc theo một trục (hàng ngang hoặc cột dọc). Nắm vững cách trục chính và trục phụ đảo chiều theo flex-direction là nền tảng cốt lõi."
    },
    "conceptExplanation": {
      "en": "Declaring `display: flex` establishes a flex formatting context. The `flex-direction` property (`row`, `column`, `row-reverse`, `column-reverse`) defines the Main Axis (the direction items flow) and Cross Axis (perpendicular). `justify-content` distributes items along the Main Axis (`flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly`). `align-items` controls alignment along the Cross Axis (`stretch`, `center`, `flex-start`, `flex-end`, `baseline`). `flex-wrap: wrap` allows items to wrap onto multiple lines, while `gap` specifies spacing between flex items without margins.",
      "vi": "Khai báo `display: flex` biến phần tử thành khối flex container. Thuộc tính `flex-direction` (`row`, `column`, `row-reverse`, `column-reverse`) xác định Trục Chính Main Axis (chiều dàn trải của các phần tử) và Trục Phụ Cross Axis (chiều vuông góc). `justify-content` phân bổ phần tử dọc theo Trục Chính (`flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly`). `align-items` căn chỉnh dọc theo Trục Phụ (`stretch`, `center`, `flex-start`, `flex-end`, `baseline`). `flex-wrap: wrap` cho phép phần tử rớt xuống dòng khi hết chỗ, còn `gap` tạo khoảng cách đều đặn giữa các item mà không cần dùng margin."
    },
    "syntax": "/* Flex Navigation Header */\n.nav-header {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}\n\n/* Wrapped Card Gallery */\n.badge-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "Centering in Both Dimensions (The Holy Grail)",
          "vi": "Căn Giữa Tuyệt Đối Cả Hai Trục (The Holy Grail)"
        },
        "description": {
          "en": "Perfect horizontal and vertical centering with two lines of CSS.",
          "vi": "Căn giữa chuẩn xác theo cả chiều ngang và chiều dọc chỉ với 2 dòng CSS."
        },
        "code": ".hero-center-box {\n  display: flex;\n  justify-content: center; /* Main axis (X) */\n  align-items: center;     /* Cross axis (Y) */\n  min-height: 300px;\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Confusing justify-content and align-items when flex-direction is set to column.",
          "vi": "Nhầm lẫn giữa justify-content và align-items khi đặt flex-direction là column."
        },
        "correction": {
          "en": "Remember: justify-content always controls the main axis (vertical in column mode), and align-items controls the cross axis (horizontal in column mode).",
          "vi": "Ghi nhớ: justify-content luôn điều khiển trục chính (là trục dọc khi ở chế độ column), còn align-items điều khiển trục phụ (trục ngang)."
        }
      }
    ],
    "tips": [
      {
        "en": "Use gap instead of margins on flex children to avoid unwanted outer margin overhangs.",
        "vi": "Dùng gap thay vì margin cho các item con trong flex để không bị dư lề thừa ở phần tử đầu và cuối."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_9_1",
      "type": "complete_code",
      "title": {
        "en": "Center Child Elements with Flexbox",
        "vi": "Căn Giữa Các Phần Tử Con Bằng Flexbox"
      },
      "instruction": {
        "en": "Add display: flex, justify-content: center, and align-items: center to .center-panel.",
        "vi": "Thêm display: flex, justify-content: center và align-items: center vào .center-panel."
      },
      "starterCode": ".center-panel {\n  min-height: 200px;\n  /* Center children */\n}",
      "solutionCode": ".center-panel {\n  min-height: 200px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}",
      "hint": {
        "en": "Use display: flex; justify-content: center; align-items: center;",
        "vi": "Dùng display: flex; justify-content: center; align-items: center;"
      },
      "explanation": {
        "en": "Flexbox centers items across both axes cleanly without positioning hacks.",
        "vi": "Flexbox căn giữa hoàn hảo theo cả 2 chiều mà không cần dùng position hay margin hack."
      }
    },
    {
      "id": "css_ex_9_2",
      "type": "fix_code",
      "title": {
        "en": "Fix Space Distribution on Nav Bar",
        "vi": "Sửa Phân Bổ Khoảng Cách Cho Thanh Navbar"
      },
      "instruction": {
        "en": "Change justify-content to space-between and add gap: 16px to .navbar-container.",
        "vi": "Đổi justify-content thành space-between và thêm gap: 16px vào .navbar-container."
      },
      "starterCode": ".navbar-container {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n}",
      "solutionCode": ".navbar-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}",
      "hint": {
        "en": "Change justify-content: flex-start to space-between and add gap: 16px;",
        "vi": "Đổi justify-content: flex-start thành space-between và thêm gap: 16px;"
      },
      "explanation": {
        "en": "space-between pushes the brand logo to the left and links to the right edge.",
        "vi": "space-between đẩy logo sang mép trái và menu liên kết sang mép phải."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_9",
    "title": {
      "en": "Build a Responsive Flexbox Toolbar",
      "vi": "Xây Dựng Thanh Công Cụ Toolbar Bằng Flexbox"
    },
    "description": {
      "en": "Style .toolbar with display: flex, justify-content: space-between, align-items: center, flex-wrap: wrap, gap: 12px, and padding: 12px 20px.",
      "vi": "Tạo kiểu cho .toolbar với display: flex, justify-content: space-between, align-items: center, flex-wrap: wrap, gap: 12px và padding: 12px 20px."
    },
    "requirements": [
      {
        "en": "display: flex",
        "vi": "display: flex"
      },
      {
        "en": "justify-content: space-between",
        "vi": "justify-content: space-between"
      },
      {
        "en": "align-items: center",
        "vi": "align-items: center"
      },
      {
        "en": "flex-wrap: wrap",
        "vi": "flex-wrap: wrap"
      },
      {
        "en": "gap: 12px",
        "vi": "gap: 12px"
      }
    ],
    "starterCode": ".toolbar {\n  /* Add flexbox container styles */\n}",
    "solutionCode": ".toolbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px;\n  padding: 12px 20px;\n}",
    "hints": [
      {
        "en": "Declare display: flex, justify-content: space-between, align-items: center, flex-wrap: wrap, and gap: 12px.",
        "vi": "Khai báo display: flex, justify-content: space-between, align-items: center, flex-wrap: wrap và gap: 12px."
      }
    ],
    "solutionExplanation": {
      "en": "Flexbox toolbars wrap naturally on small screens while retaining balanced alignment.",
      "vi": "Thanh công cụ Flexbox tự động rớt dòng đẹp mắt trên màn hình hẹp mà vẫn giữ sự thẳng hàng chuẩn mực."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_9_1",
      "type": "single_choice",
      "question": {
        "en": "What is the default value of `flex-direction` on a flex container?",
        "vi": "Giá trị mặc định của `flex-direction` trên một flex container là gì?"
      },
      "options": [
        {
          "en": "row",
          "vi": "row"
        },
        {
          "en": "column",
          "vi": "column"
        },
        {
          "en": "row-reverse",
          "vi": "row-reverse"
        },
        {
          "en": "auto",
          "vi": "auto"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "By default, flex-direction is 'row', aligning items horizontally from left to right.",
        "vi": "Mặc định flex-direction là 'row', dàn các phần tử theo hàng ngang từ trái sang phải."
      },
      "topicId": "css_flexbox_container",
      "difficulty": "easy"
    },
    {
      "id": "css_q_9_2",
      "type": "single_choice",
      "question": {
        "en": "When `flex-direction: column` is set, which axis does `justify-content` control?",
        "vi": "Khi đặt `flex-direction: column`, thuộc tính `justify-content` điều khiển trục nào?"
      },
      "options": [
        {
          "en": "The vertical axis (which is now the main axis)",
          "vi": "Trục dọc (hiện tại đã trở thành trục chính)"
        },
        {
          "en": "The horizontal axis",
          "vi": "Trục ngang"
        },
        {
          "en": "The z-axis depth",
          "vi": "Trục sâu Z"
        },
        {
          "en": "It is disabled in column mode",
          "vi": "Nó bị vô hiệu hóa ở chế độ column"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "justify-content always governs the Main Axis. When direction is column, the Main Axis runs vertically.",
        "vi": "justify-content luôn điều khiển Trục Chính. Khi flex-direction là column, trục chính chạy theo phương thẳng đứng."
      },
      "topicId": "css_flexbox_container",
      "difficulty": "medium"
    },
    {
      "id": "css_q_9_3",
      "type": "single_choice",
      "question": {
        "en": "What is the difference between `space-between` and `space-around` in `justify-content`?",
        "vi": "Sự khác biệt giữa `space-between` và `space-around` trong `justify-content` là gì?"
      },
      "options": [
        {
          "en": "space-between places no space at the outer edges, whereas space-around places equal half-size space before the first and after the last item",
          "vi": "space-between không để khoảng trống ở 2 mép ngoài, còn space-around tạo khoảng trống bằng một nửa ở 2 đầu"
        },
        {
          "en": "space-around forces items to wrap",
          "vi": "space-around buộc các item phải xuống dòng"
        },
        {
          "en": "space-between aligns items vertically",
          "vi": "space-between căn chỉnh các item theo chiều dọc"
        },
        {
          "en": "They are identical",
          "vi": "Chúng hoàn toàn giống nhau"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "space-between pins the first/last items to the container edges, while space-around gives every item equal surrounding space.",
        "vi": "space-between ép item đầu và cuối sát mép ngoài, còn space-around tạo khoảng đệm xung quanh mỗi item."
      },
      "topicId": "css_flexbox_container",
      "difficulty": "medium"
    },
    {
      "id": "css_q_9_4",
      "type": "true_false",
      "question": {
        "en": "True or False: The `gap` property in Flexbox works across both rows and columns in wrapped flex containers.",
        "vi": "Đúng hay Sai: Thuộc tính `gap` trong Flexbox hoạt động cho cả khoảng cách hàng và cột khi flex container bị rớt dòng."
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
        "en": "gap: 16px (or row-gap and column-gap) provides consistent spacing between all flex items regardless of wrap state.",
        "vi": "gap: 16px (hoặc row-gap và column-gap) phân bổ khoảng trống đều đặn giữa các item cả theo hàng và cột."
      },
      "topicId": "css_flexbox_container",
      "difficulty": "easy"
    },
    {
      "id": "css_q_9_5",
      "type": "single_choice",
      "question": {
        "en": "What is the default value of `align-items` in Flexbox?",
        "vi": "Giá trị mặc định của `align-items` trong Flexbox là gì?"
      },
      "options": [
        {
          "en": "stretch",
          "vi": "stretch (kéo giãn lấp đầy trục phụ)"
        },
        {
          "en": "flex-start",
          "vi": "flex-start"
        },
        {
          "en": "center",
          "vi": "center"
        },
        {
          "en": "baseline",
          "vi": "baseline"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "By default, align-items is 'stretch', causing flex items to expand to match the height of the tallest item.",
        "vi": "Mặc định align-items là 'stretch', khiến các item con tự kéo giãn bằng chiều cao của item cao nhất."
      },
      "topicId": "css_flexbox_container",
      "difficulty": "easy"
    },
    {
      "id": "css_q_9_6",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: To allow flex items to wrap onto multiple lines when container width is exceeded, set flex-wrap: ________",
        "vi": "Điền vào chỗ trống: Để cho phép các flex item rớt dòng khi vượt quá chiều rộng container, đặt flex-wrap: ________"
      },
      "fillBlankAnswers": [
        "wrap"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "flex-wrap: wrap enables multi-line flex containers.",
        "vi": "flex-wrap: wrap kích hoạt tính năng tự động xuống dòng nhiều hàng cho flex container."
      },
      "topicId": "css_flexbox_container",
      "difficulty": "easy"
    },
    {
      "id": "css_q_9_7",
      "type": "multiple_choice",
      "question": {
        "en": "Which of the following are valid values for `justify-content`? (Select all that apply)",
        "vi": "Những giá trị nào sau đây là hợp lệ cho `justify-content`? (Chọn tất cả đáp án đúng)"
      },
      "options": [
        {
          "en": "space-between",
          "vi": "space-between"
        },
        {
          "en": "space-evenly",
          "vi": "space-evenly"
        },
        {
          "en": "center",
          "vi": "center"
        },
        {
          "en": "middle",
          "vi": "middle"
        }
      ],
      "correctAnswers": [
        0,
        1,
        2
      ],
      "explanation": {
        "en": "space-between, space-evenly, center, flex-start, and flex-end are valid. 'middle' is not a valid justify-content value.",
        "vi": "space-between, space-evenly, center, flex-start và flex-end là hợp lệ. 'middle' không tồn tại trong justify-content."
      },
      "topicId": "css_flexbox_container",
      "difficulty": "medium"
    },
    {
      "id": "css_q_9_8",
      "type": "single_choice",
      "question": {
        "en": "What does `align-items: baseline;` align items to?",
        "vi": "`align-items: baseline;` căn chỉnh các phần tử dựa trên điểm nào?"
      },
      "options": [
        {
          "en": "The text baseline of the first line of text inside each flex item",
          "vi": "Đường cơ sở (baseline) của dòng chữ đầu tiên bên trong mỗi flex item"
        },
        {
          "en": "The bottom edge of the container",
          "vi": "Mép đáy của khung chứa"
        },
        {
          "en": "The vertical center",
          "vi": "Tâm điểm chính giữa theo chiều dọc"
        },
        {
          "en": "The element's margin box",
          "vi": "Khung margin của phần tử"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "baseline alignment lines up the typographical baseline of text across differently sized items.",
        "vi": "baseline căn thẳng hàng các dòng chữ với nhau bất kể các item có cỡ font hay chiều cao khác nhau."
      },
      "topicId": "css_flexbox_container",
      "difficulty": "medium"
    },
    {
      "id": "css_q_9_9",
      "type": "true_false",
      "question": {
        "en": "True or False: `display: inline-flex;` makes the flex container itself behave as an inline element while formatting its children as flex items.",
        "vi": "Đúng hay Sai: `display: inline-flex;` làm cho chính khối container hiển thị như thẻ inline trong khi các con bên trong vẫn là flex item."
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
        "en": "inline-flex creates an inline-level box that behaves internally as a flex container.",
        "vi": "inline-flex tạo một khối cấp inline ở bên ngoài nhưng bên trong vẫn có toàn bộ sức mạnh dàn trang của flexbox."
      },
      "topicId": "css_flexbox_container",
      "difficulty": "easy"
    },
    {
      "id": "css_q_9_10",
      "type": "single_choice",
      "question": {
        "en": "Which property controls the alignment of lines in a multi-line flex container when there is extra space on the cross axis?",
        "vi": "Thuộc tính nào điều khiển khoảng cách giữa các hàng trong một flex container nhiều dòng khi có dư khoảng trống trên trục phụ?"
      },
      "options": [
        {
          "en": "align-content",
          "vi": "align-content"
        },
        {
          "en": "align-items",
          "vi": "align-items"
        },
        {
          "en": "justify-items",
          "vi": "justify-items"
        },
        {
          "en": "line-spacing",
          "vi": "line-spacing"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "align-content aligns multiple flex lines along the cross axis (has no effect on single-line flex containers).",
        "vi": "align-content căn chỉnh các hàng flex với nhau trên trục phụ (không có tác dụng với container chỉ có 1 dòng)."
      },
      "topicId": "css_flexbox_container",
      "difficulty": "hard"
    }
  ]
};
