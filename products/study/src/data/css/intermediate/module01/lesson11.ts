import { Lesson } from '../../../../types';

export const lesson11: Lesson = {
  "id": "css_lesson_11",
  "moduleId": "css_mod_3",
  "levelId": "intermediate",
  "courseId": "css",
  "order": 11,
  "topicId": "css_grid_basics",
  "title": {
    "en": "CSS Grid I: Two-Dimensional Tracks & Named Areas",
    "vi": "CSS Grid I: Hệ Lưới 2 Chiều & Phân Vùng grid-template-areas"
  },
  "summary": {
    "en": "Master display: grid, column/row tracks, the fr fractional unit, gap, explicit vs implicit grids, and grid-template-areas.",
    "vi": "Làm chủ display: grid, tạo track hàng và cột, đơn vị phân số fr, gap, lưới tường minh vs ngầm định và phân vùng grid-template-areas."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "CSS Grid is a true two-dimensional layout engine, capable of orchestrating simultaneous alignment across rows and columns. It replaces fragile float-based and nested flexbox systems with structured grid tracks.",
      "vi": "CSS Grid là công cụ dàn trang 2 chiều thực thụ, có khả năng điều phối đồng thời cả hàng ngang và cột dọc. Nó thay thế hoàn toàn các hệ thống lồng ghép flexbox phức tạp bằng hệ thống lưới có cấu trúc chặt chẽ."
    },
    "conceptExplanation": {
      "en": "Declare `display: grid` to establish a grid container. Define column and row tracks with `grid-template-columns` and `grid-template-rows`. The `fr` (fractional) unit represents a fraction of available space after fixed units and gaps are allocated. `gap` (or `row-gap` and `column-gap`) defines spacing between tracks. `grid-template-areas` allows you to visually sketch layouts using named text strings (e.g. `'header header' 'sidebar main' 'footer footer'`), and assign child elements using `grid-area: header`.",
      "vi": "Khai báo `display: grid` để biến phần tử thành grid container. Định nghĩa các cột và hàng bằng `grid-template-columns` và `grid-template-rows`. Đơn vị `fr` (fractional) đại diện cho một phần tỷ lệ của khoảng trống còn lại sau khi trừ đi các đơn vị cố định và gap. `gap` tạo rãnh ngăn cách giữa các track. `grid-template-areas` cho phép bạn phác thảo trực quan bố cục trang bằng các chuỗi tên (ví dụ `'header header' 'sidebar main' 'footer footer'`), rồi gán các con vào bằng `grid-area: header`."
    },
    "syntax": "/* 3-column grid with fractional units */\n.dashboard-grid {\n  display: grid;\n  grid-template-columns: 240px 1fr 300px;\n  gap: 20px;\n}\n\n/* Visual Named Areas Layout */\n.app-layout {\n  display: grid;\n  grid-template-areas:\n    \"header header\"\n    \"nav    main\"\n    \"footer footer\";\n  grid-template-columns: 200px 1fr;\n}\n\n.app-header { grid-area: header; }\n.app-nav    { grid-area: nav; }\n.app-main   { grid-area: main; }\n.app-footer { grid-area: footer; }",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "Holy Grail Layout with Named Grid Areas",
          "vi": "Bố Cục Trang Web Chuẩn Holy Grail Bằng Grid Areas"
        },
        "description": {
          "en": "Builds a complete application frame with header, nav, main content, and footer.",
          "vi": "Xây dựng khung ứng dụng hoàn chỉnh gồm header, nav bên trái, nội dung chính và footer."
        },
        "code": ".page-shell {\n  display: grid;\n  grid-template-areas:\n    \"head head\"\n    \"side content\"\n    \"foot foot\";\n  grid-template-columns: 220px 1fr;\n  grid-template-rows: 60px 1fr 50px;\n  min-height: 100vh;\n  gap: 16px;\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Mismatched column counts in grid-template-areas strings causing the entire grid definition to fail silently.",
          "vi": "Số lượng cột không khớp giữa các hàng trong chuỗi grid-template-areas khiến toàn bộ lưới bị vô hiệu hóa trong im lặng."
        },
        "correction": {
          "en": "Ensure every row string in grid-template-areas has the exact same number of named cells.",
          "vi": "Đảm bảo mỗi hàng trong grid-template-areas phải có chính xác cùng số lượng ô tên đại diện."
        }
      }
    ],
    "tips": [
      {
        "en": "Use dot ('.') in grid-template-areas to denote an empty/unassigned grid cell.",
        "vi": "Dùng dấu chấm ('.') trong grid-template-areas để đại diện cho một ô lưới trống không gán nội dung."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_11_1",
      "type": "complete_code",
      "title": {
        "en": "Create a 3-Column Equal Grid",
        "vi": "Tạo Lưới 3 Cột Bằng Nhau"
      },
      "instruction": {
        "en": "Set display: grid, grid-template-columns: 1fr 1fr 1fr, and gap: 16px on .card-grid.",
        "vi": "Đặt display: grid, grid-template-columns: 1fr 1fr 1fr và gap: 16px cho .card-grid."
      },
      "starterCode": ".card-grid {\n  /* Define 3-column grid */\n}",
      "solutionCode": ".card-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px;\n}",
      "hint": {
        "en": "Use display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;",
        "vi": "Dùng display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;"
      },
      "explanation": {
        "en": "1fr 1fr 1fr splits the container into three perfectly equal columns with 16px spacing.",
        "vi": "1fr 1fr 1fr chia khung chứa thành 3 cột bằng nhau tuyệt đối với khoảng cách 16px."
      }
    },
    {
      "id": "css_ex_11_2",
      "type": "fix_code",
      "title": {
        "en": "Assign Child to Named Grid Area",
        "vi": "Gán Phần Tử Con Vào Vùng Lưới Đã Đặt Tên"
      },
      "instruction": {
        "en": "Assign grid-area: sidebar to .aside-panel and grid-area: main to .content-panel.",
        "vi": "Gán grid-area: sidebar cho .aside-panel và grid-area: main cho .content-panel."
      },
      "starterCode": ".aside-panel {\n  /* Assign sidebar area */\n}\n\n.content-panel {\n  /* Assign main area */\n}",
      "solutionCode": ".aside-panel {\n  grid-area: sidebar;\n}\n\n.content-panel {\n  grid-area: main;\n}",
      "hint": {
        "en": "Use grid-area: sidebar; and grid-area: main;",
        "vi": "Dùng grid-area: sidebar; và grid-area: main;"
      },
      "explanation": {
        "en": "grid-area places children into the coordinates defined by parent's grid-template-areas.",
        "vi": "grid-area đặt phần tử con vào đúng tọa độ tương ứng trên grid-template-areas của thẻ cha."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_11",
    "title": {
      "en": "Build an Analytics Dashboard Grid Shell",
      "vi": "Xây Dựng Khung Lưới Bảng Điều Khiển Phân Tích"
    },
    "description": {
      "en": "Style .dashboard-shell with display: grid, grid-template-columns: 240px 1fr, grid-template-rows: 64px 1fr, gap: 16px, and min-height: 100vh.",
      "vi": "Tạo kiểu cho .dashboard-shell với display: grid, grid-template-columns: 240px 1fr, grid-template-rows: 64px 1fr, gap: 16px và min-height: 100vh."
    },
    "requirements": [
      {
        "en": "display: grid",
        "vi": "display: grid"
      },
      {
        "en": "grid-template-columns: 240px 1fr",
        "vi": "grid-template-columns: 240px 1fr"
      },
      {
        "en": "grid-template-rows: 64px 1fr",
        "vi": "grid-template-rows: 64px 1fr"
      },
      {
        "en": "gap: 16px",
        "vi": "gap: 16px"
      }
    ],
    "starterCode": ".dashboard-shell {\n  /* Add 2D grid definitions */\n}",
    "solutionCode": ".dashboard-shell {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  grid-template-rows: 64px 1fr;\n  gap: 16px;\n  min-height: 100vh;\n}",
    "hints": [
      {
        "en": "Define display: grid, grid-template-columns, grid-template-rows, and gap inside .dashboard-shell.",
        "vi": "Khai báo display: grid, grid-template-columns, grid-template-rows và gap trong .dashboard-shell."
      }
    ],
    "solutionExplanation": {
      "en": "2D CSS Grid creates robust full-height enterprise dashboard shells with fixed sidebars and fluid workspaces.",
      "vi": "CSS Grid 2 chiều tạo nên khung dashboard doanh nghiệp chuẩn mực với sidebar cố định và không gian làm việc co giãn."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_11_1",
      "type": "single_choice",
      "question": {
        "en": "What does the `1fr` unit represent in CSS Grid?",
        "vi": "Đơn vị `1fr` đại diện cho điều gì trong CSS Grid?"
      },
      "options": [
        {
          "en": "One fraction of the leftover available free space inside the grid container",
          "vi": "Một phần phân số của lượng khoảng trống còn dư bên trong grid container"
        },
        {
          "en": "One frame rate animation interval",
          "vi": "Một chu kỳ khung hình animation"
        },
        {
          "en": "One font root size",
          "vi": "Một đơn vị cỡ chữ gốc font"
        },
        {
          "en": "100 pixels fixed width",
          "vi": "100 pixel chiều rộng cố định"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The `fr` (fractional) unit divides available space among tracks after fixed pixels, percentages, and gaps are calculated.",
        "vi": "Đơn vị `fr` chia đều khoảng trống còn lại giữa các track sau khi đã tính xong các kích thước cố định và gap."
      },
      "topicId": "css_grid_basics",
      "difficulty": "easy"
    },
    {
      "id": "css_q_11_2",
      "type": "single_choice",
      "question": {
        "en": "In `grid-template-areas`, how do you leave a grid cell empty/unoccupied?",
        "vi": "Trong `grid-template-areas`, làm thế nào để để trống một ô lưới không gán phần tử nào?"
      },
      "options": [
        {
          "en": "Use a period/dot ('.')",
          "vi": "Sử dụng dấu chấm ('.')"
        },
        {
          "en": "Use the keyword 'empty'",
          "vi": "Dùng từ khóa 'empty'"
        },
        {
          "en": "Leave a blank space",
          "vi": "Để một khoảng trắng"
        },
        {
          "en": "Use 'null'",
          "vi": "Dùng từ khóa 'null'"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "A dot (`.`) or series of dots (`...`) in `grid-template-areas` represents an unnamed, empty grid cell.",
        "vi": "Dấu chấm (`.`) trong `grid-template-areas` đại diện cho một ô lưới trống không có tên."
      },
      "topicId": "css_grid_basics",
      "difficulty": "medium"
    },
    {
      "id": "css_q_11_3",
      "type": "true_false",
      "question": {
        "en": "True or False: Every row string in `grid-template-areas` must have the exact same number of cell tokens.",
        "vi": "Đúng hay Sai: Mỗi chuỗi hàng trong `grid-template-areas` bắt buộc phải có chính xác cùng số lượng ô token."
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
        "en": "If row strings have unequal column counts, the entire grid-template-areas declaration is considered invalid and ignored.",
        "vi": "Nếu các hàng có số lượng cột không đều nhau, toàn bộ khai báo grid-template-areas sẽ bị coi là không hợp lệ và bị bỏ qua."
      },
      "topicId": "css_grid_basics",
      "difficulty": "medium"
    },
    {
      "id": "css_q_11_4",
      "type": "single_choice",
      "question": {
        "en": "What is the difference between explicit grid tracks and implicit grid tracks?",
        "vi": "Sự khác biệt giữa explicit grid tracks (lưới tường minh) và implicit grid tracks (lưới ngầm định) là gì?"
      },
      "options": [
        {
          "en": "Explicit tracks are defined via grid-template-*, while implicit tracks are created automatically by the browser when items overflow",
          "vi": "Lưới tường minh được định nghĩa qua grid-template-*, còn lưới ngầm định do trình duyệt tự tạo ra khi có phần tử tràn thêm"
        },
        {
          "en": "Explicit tracks only work in Chrome",
          "vi": "Lưới tường minh chỉ chạy trên Chrome"
        },
        {
          "en": "Implicit tracks cannot have gaps",
          "vi": "Lưới ngầm định không thể có gap"
        },
        {
          "en": "They are completely identical",
          "vi": "Chúng hoàn toàn giống hệt nhau"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Explicit tracks are declared with grid-template-columns/rows. When more items exist than cells, the browser auto-creates implicit tracks (controlled by `grid-auto-rows`/`grid-auto-columns`).",
        "vi": "Lưới tường minh được lập trình qua grid-template. Khi có nhiều item hơn số ô đã khai báo, trình duyệt tự sinh thêm các hàng ngầm định (điều khiển bởi `grid-auto-rows`)."
      },
      "topicId": "css_grid_basics",
      "difficulty": "hard"
    },
    {
      "id": "css_q_11_5",
      "type": "single_choice",
      "question": {
        "en": "Which property sets the default height of implicitly created grid rows?",
        "vi": "Thuộc tính nào thiết lập chiều cao mặc định cho các hàng lưới được tạo tự động ngầm định?"
      },
      "options": [
        {
          "en": "grid-auto-rows",
          "vi": "grid-auto-rows"
        },
        {
          "en": "grid-implicit-height",
          "vi": "grid-implicit-height"
        },
        {
          "en": "row-auto-size",
          "vi": "row-auto-size"
        },
        {
          "en": "grid-default-rows",
          "vi": "grid-default-rows"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`grid-auto-rows: minmax(100px, auto);` specifies the track size for implicitly generated rows.",
        "vi": "`grid-auto-rows` chỉ định kích thước cho các hàng tự động sinh ra khi phần tử tràn lưới."
      },
      "topicId": "css_grid_basics",
      "difficulty": "medium"
    },
    {
      "id": "css_q_11_6",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: To assign a child element to a named area defined in the parent's template, use the property grid-________",
        "vi": "Điền vào chỗ trống: Để gán một phần tử con vào vùng tên đã định nghĩa ở thẻ cha, dùng thuộc tính grid-________"
      },
      "fillBlankAnswers": [
        "area"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "grid-area: <name> binds the element to that named grid region.",
        "vi": "grid-area: <name> liên kết phần tử con vào phân vùng lưới tương ứng."
      },
      "topicId": "css_grid_basics",
      "difficulty": "easy"
    },
    {
      "id": "css_q_11_7",
      "type": "multiple_choice",
      "question": {
        "en": "Which of the following are valid `grid-template-columns` definitions? (Select all that apply)",
        "vi": "Những khai báo `grid-template-columns` nào sau đây là hợp lệ? (Chọn tất cả đáp án đúng)"
      },
      "options": [
        {
          "en": "grid-template-columns: 200px 1fr 2fr;",
          "vi": "grid-template-columns: 200px 1fr 2fr;"
        },
        {
          "en": "grid-template-columns: 30% 70%;",
          "vi": "grid-template-columns: 30% 70%;"
        },
        {
          "en": "grid-template-columns: auto 1fr auto;",
          "vi": "grid-template-columns: auto 1fr auto;"
        },
        {
          "en": "grid-template-columns: divide(3);",
          "vi": "grid-template-columns: divide(3);"
        }
      ],
      "correctAnswers": [
        0,
        1,
        2
      ],
      "explanation": {
        "en": "Pixels, fr, percentages, and auto are valid track sizing functions. divide() does not exist in CSS.",
        "vi": "Pixel, fr, phần trăm và auto đều hợp lệ. divide() không tồn tại trong CSS."
      },
      "topicId": "css_grid_basics",
      "difficulty": "easy"
    },
    {
      "id": "css_q_11_8",
      "type": "single_choice",
      "question": {
        "en": "In CSS Grid, how are grid lines numbered by default?",
        "vi": "Trong CSS Grid, các đường line kẻ lưới được đánh số thứ tự như thế nào theo mặc định?"
      },
      "options": [
        {
          "en": "Starting at 1 from the outer edge, incrementing by 1 for each line",
          "vi": "Bắt đầu từ số 1 ở mép ngoài cùng và tăng dần 1 đơn vị qua từng đường kẻ"
        },
        {
          "en": "Starting at 0 from the center",
          "vi": "Bắt đầu từ số 0 ở tâm chính giữa"
        },
        {
          "en": "Using letters (A, B, C...)",
          "vi": "Dùng các chữ cái (A, B, C...)"
        },
        {
          "en": "Grid lines do not have numbers",
          "vi": "Các đường line không có số"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Grid lines are 1-indexed (1, 2, 3...) from start to end, and negative (-1, -2...) from end to start.",
        "vi": "Đường kẻ lưới đánh số từ 1 (1, 2, 3...) từ đầu đến cuối, và số âm (-1, -2...) tính ngược từ mép cuối về."
      },
      "topicId": "css_grid_basics",
      "difficulty": "medium"
    },
    {
      "id": "css_q_11_9",
      "type": "predict_output",
      "question": {
        "en": "A grid container has `grid-template-columns: 100px 1fr 1fr;` and total width 500px with no gaps. What is the width of the second column?",
        "vi": "Lưới có `grid-template-columns: 100px 1fr 1fr;` và tổng rộng 500px không gap. Cột thứ hai rộng bao nhiêu?"
      },
      "options": [
        {
          "en": "200px ((500 - 100) / 2)",
          "vi": "200px ((500 - 100) / 2)"
        },
        {
          "en": "250px",
          "vi": "250px"
        },
        {
          "en": "100px",
          "vi": "100px"
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
        "en": "Remaining space = 500px - 100px = 400px. Two equal 1fr tracks receive 400px / 2 = 200px each.",
        "vi": "Khoảng trống còn lại = 500px - 100px = 400px. Hai cột 1fr chia đôi: 400px / 2 = 200px mỗi cột."
      },
      "topicId": "css_grid_basics",
      "difficulty": "easy"
    },
    {
      "id": "css_q_11_10",
      "type": "true_false",
      "question": {
        "en": "True or False: Grid items can overlap each other on the same grid cell without breaking the grid structure.",
        "vi": "Đúng hay Sai: Các phần tử trong Grid có thể xếp chồng đè lên nhau trên cùng một ô lưới mà không làm hỏng cấu trúc lưới."
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
        "en": "Grid items can share the same grid line coordinates or grid area, controlled via z-index for layering.",
        "vi": "Các phần tử Grid có thể cùng gán chung tọa độ ô để tạo hiệu ứng xếp chồng lớp và điều khiển bằng z-index."
      },
      "topicId": "css_grid_basics",
      "difficulty": "medium"
    }
  ]
};
