import { Lesson } from '../../../../types';

export const lesson12: Lesson = {
  "id": "css_lesson_12",
  "moduleId": "css_mod_3",
  "levelId": "intermediate",
  "courseId": "css",
  "order": 12,
  "topicId": "css_grid_responsive",
  "title": {
    "en": "CSS Grid II: Dynamic & Responsive Patterns",
    "vi": "CSS Grid II: Mẫu Dàn Trang Động & Tự Động Đáp Ứng"
  },
  "summary": {
    "en": "Master repeat(), minmax(), auto-fill vs auto-fit, line-based placement (grid-column: 1 / -1), and building zero-media-query responsive grids.",
    "vi": "Làm chủ repeat(), minmax(), phân biệt auto-fill vs auto-fit, định vị theo đường line (grid-column: 1 / -1) và tạo lưới co giãn không cần media query."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "The combination of `repeat()`, `minmax()`, and auto-placement keywords (`auto-fill`, `auto-fit`) enables the 'Holy Grail' of modern CSS: fully responsive, wrapping card grids that adapt seamlessly to any screen width without writing a single `@media` query.",
      "vi": "Sự kết hợp giữa hàm `repeat()`, `minmax()` và các từ khóa tự động sắp xếp (`auto-fill`, `auto-fit`) mang lại đỉnh cao của CSS hiện đại: hệ thống lưới card tự động co giãn và rớt dòng hoàn hảo trên mọi kích thước màn hình mà không cần viết bất kỳ dòng `@media` query nào."
    },
    "conceptExplanation": {
      "en": "`repeat(count, track)` eliminates repetition (e.g. `repeat(3, 1fr)`). `minmax(min, max)` clamps a track size between a floor and ceiling (e.g. `minmax(280px, 1fr)`). The legendary responsive pattern `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));` automatically fits as many 280px columns as possible, stretching them equally to fill leftover space. `auto-fill` creates empty ghost tracks when space permits, whereas `auto-fit` collapses empty tracks to zero, stretching filled tracks across the full width. Line placement syntax (`grid-column: 1 / -1`) allows items to span full-width.",
      "vi": "`repeat(count, track)` loại bỏ việc viết lặp (ví dụ `repeat(3, 1fr)`). `minmax(min, max)` giới hạn kích thước track giữa cận dưới và cận trên (ví dụ `minmax(280px, 1fr)`). Mẫu cú pháp huyền thoại `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));` tự động chứa tối đa số cột 280px có thể, đồng thời kéo giãn đều để lấp đầy màn hình. `auto-fill` giữ lại các track trống vô hình, còn `auto-fit` ép xẹp các track trống về 0 để mở rộng tối đa các cột có nội dung. Cú pháp `grid-column: 1 / -1` giúp phần tử trải dài toàn bộ chiều rộng lưới."
    },
    "syntax": "/* Responsive Grid without Media Queries */\n.responsive-cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 24px;\n}\n\n/* Full-width spanning banner inside grid */\n.featured-banner {\n  grid-column: 1 / -1;\n}",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "Auto-Fitting Product Grid",
          "vi": "Lưới Sản Phẩm Tự Động Co Giãn Thông Minh"
        },
        "description": {
          "en": "Cards adapt from 1 column on mobile to 4+ columns on desktop automatically.",
          "vi": "Các thẻ tự chuyển từ 1 cột trên mobile sang 4+ cột trên màn hình rộng hoàn toàn tự động."
        },
        "code": ".product-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 16px;\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Using minmax(1fr, 300px) which is invalid because 1fr cannot be used as the minimum in minmax().",
          "vi": "Dùng minmax(1fr, 300px) bị lỗi vì 1fr không được phép làm giá trị tối thiểu (min) trong hàm minmax()."
        },
        "correction": {
          "en": "Always put fixed or pixel units in the min parameter and 1fr in the max parameter: minmax(300px, 1fr).",
          "vi": "Luôn đặt giá trị cố định vào tham số min và đặt 1fr ở tham số max: minmax(300px, 1fr)."
        }
      }
    ],
    "tips": [
      {
        "en": "Use auto-fit when you want single or few cards to expand across the full width, and auto-fill when cards must keep strict fixed width.",
        "vi": "Dùng auto-fit khi muốn 1 vài card tự giãn rộng lấp đầy trang, và dùng auto-fill khi muốn các card giữ nguyên kích cỡ chuẩn mà không bị phình to."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_12_1",
      "type": "complete_code",
      "title": {
        "en": "Build Auto-Fit Responsive Grid",
        "vi": "Tạo Lưới Đáp Ứng Tự Động auto-fit"
      },
      "instruction": {
        "en": "Set grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) on .responsive-grid.",
        "vi": "Đặt grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) cho .responsive-grid."
      },
      "starterCode": ".responsive-grid {\n  display: grid;\n  /* Define auto-fit columns */\n  gap: 20px;\n}",
      "solutionCode": ".responsive-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n}",
      "hint": {
        "en": "Use grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));",
        "vi": "Dùng grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));"
      },
      "explanation": {
        "en": "repeat(auto-fit, minmax(250px, 1fr)) creates a flexible, responsive column layout without media queries.",
        "vi": "repeat(auto-fit, minmax(250px, 1fr)) tạo bố cục cột co giãn hoàn hảo không cần dùng media query."
      }
    },
    {
      "id": "css_ex_12_2",
      "type": "fix_code",
      "title": {
        "en": "Span Banner Across All Columns",
        "vi": "Trải Rộng Banner Qua Tất Cả Các Cột"
      },
      "instruction": {
        "en": "Add grid-column: 1 / -1 to .hero-feature so it spans from the first line to the last line.",
        "vi": "Thêm grid-column: 1 / -1 vào .hero-feature để nó trải dài từ đường line đầu tiên đến đường line cuối cùng."
      },
      "starterCode": ".hero-feature {\n  background: #1e293b;\n  padding: 24px;\n}",
      "solutionCode": ".hero-feature {\n  grid-column: 1 / -1;\n  background: #1e293b;\n  padding: 24px;\n}",
      "hint": {
        "en": "Add grid-column: 1 / -1;",
        "vi": "Thêm grid-column: 1 / -1;"
      },
      "explanation": {
        "en": "grid-column: 1 / -1 spans across the entire width of the explicit grid.",
        "vi": "grid-column: 1 / -1 trải rộng toàn bộ chiều ngang của hệ lưới tường minh."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_12",
    "title": {
      "en": "Build a Modern Fluid Gallery Grid",
      "vi": "Xây Dựng Thư Viện Ảnh Co Giãn Hiện Đại"
    },
    "description": {
      "en": "Style .media-gallery with display: grid, grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)), gap: 16px, and grid-auto-rows: 180px.",
      "vi": "Tạo kiểu cho .media-gallery với display: grid, grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)), gap: 16px và grid-auto-rows: 180px."
    },
    "requirements": [
      {
        "en": "display: grid",
        "vi": "display: grid"
      },
      {
        "en": "grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))",
        "vi": "grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))"
      },
      {
        "en": "gap: 16px",
        "vi": "gap: 16px"
      },
      {
        "en": "grid-auto-rows: 180px",
        "vi": "grid-auto-rows: 180px"
      }
    ],
    "starterCode": ".media-gallery {\n  /* Add fluid auto-fill grid styles */\n}",
    "solutionCode": ".media-gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 16px;\n  grid-auto-rows: 180px;\n}",
    "hints": [
      {
        "en": "Declare display: grid, repeat(auto-fill, minmax(200px, 1fr)), gap: 16px, and grid-auto-rows: 180px.",
        "vi": "Khai báo display: grid, repeat(auto-fill, minmax(200px, 1fr)), gap: 16px và grid-auto-rows: 180px."
      }
    ],
    "solutionExplanation": {
      "en": "auto-fill combined with fixed grid-auto-rows creates uniform photo galleries that adapt gracefully.",
      "vi": "auto-fill kết hợp cùng grid-auto-rows cố định tạo ra thư viện ảnh đồng đều và thích ứng mượt mà trên mọi màn hình."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_12_1",
      "type": "single_choice",
      "question": {
        "en": "What is the key difference between `auto-fill` and `auto-fit` in `grid-template-columns`?",
        "vi": "Sự khác biệt cốt lõi giữa `auto-fill` và `auto-fit` trong `grid-template-columns` là gì?"
      },
      "options": [
        {
          "en": "auto-fill creates empty ghost columns when space exists, while auto-fit collapses empty columns to 0, stretching existing items",
          "vi": "auto-fill giữ lại các cột trống vô hình khi còn chỗ, còn auto-fit ép xẹp cột trống về 0 để kéo giãn các phần tử hiện có"
        },
        {
          "en": "auto-fit only works on mobile devices",
          "vi": "auto-fit chỉ hoạt động trên di động"
        },
        {
          "en": "auto-fill disables grid gaps",
          "vi": "auto-fill làm mất thuộc tính gap"
        },
        {
          "en": "They are completely identical aliases",
          "vi": "Chúng là hai từ khóa đồng nghĩa giống hệt nhau"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "auto-fit collapses unoccupied tracks to zero width so existing items expand to fill the container row. auto-fill preserves empty track slots.",
        "vi": "auto-fit thu xẹp các cột trống về 0 để các thẻ hiện có nở to lấp đầy dòng. auto-fill bảo lưu các vị trí cột trống."
      },
      "topicId": "css_grid_responsive",
      "difficulty": "medium"
    },
    {
      "id": "css_q_12_2",
      "type": "single_choice",
      "question": {
        "en": "What does `grid-column: 1 / -1;` do?",
        "vi": "`grid-column: 1 / -1;` có tác dụng gì đối với một phần tử trong Grid?"
      },
      "options": [
        {
          "en": "Spans the element across all explicit grid columns from the first line to the very last line",
          "vi": "Trải rộng phần tử qua tất cả các cột của lưới từ đường line đầu tiên đến đường line cuối cùng"
        },
        {
          "en": "Deletes the first and last columns",
          "vi": "Xóa cột đầu tiên và cột cuối cùng"
        },
        {
          "en": "Hides the element",
          "vi": "Ẩn phần tử đi"
        },
        {
          "en": "Sets column width to negative 1 pixel",
          "vi": "Đặt chiều rộng cột thành âm 1 pixel"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Line 1 is the starting boundary, and line -1 is the ending boundary of the explicit grid.",
        "vi": "Đường line 1 là mép xuất phát đầu tiên, còn đường line -1 là mép tận cùng của hệ lưới tường minh."
      },
      "topicId": "css_grid_responsive",
      "difficulty": "easy"
    },
    {
      "id": "css_q_12_3",
      "type": "single_choice",
      "question": {
        "en": "What does `grid-column: span 2;` mean?",
        "vi": "`grid-column: span 2;` có ý nghĩa gì?"
      },
      "options": [
        {
          "en": "The item will span across 2 grid column tracks",
          "vi": "Phần tử sẽ trải rộng chiếm đúng 2 cột trong lưới"
        },
        {
          "en": "The item will duplicate itself twice",
          "vi": "Phần tử tự nhân đôi thành 2 bản sao"
        },
        {
          "en": "The item will take 2 seconds to animate",
          "vi": "Phần tử mất 2 giây để chuyển động"
        },
        {
          "en": "The item is moved 2 pixels to the right",
          "vi": "Phần tử dịch sang phải 2 pixel"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`span N` instructs the grid item to occupy N consecutive tracks.",
        "vi": "`span N` chỉ định phần tử grid chiếm giữ N track (cột hoặc hàng) liền kề."
      },
      "topicId": "css_grid_responsive",
      "difficulty": "easy"
    },
    {
      "id": "css_q_12_4",
      "type": "true_false",
      "question": {
        "en": "True or False: In `minmax(min, max)`, the `min` parameter cannot be a flexible unit like `1fr`.",
        "vi": "Đúng hay Sai: Trong hàm `minmax(min, max)`, tham số `min` không được phép là đơn vị co giãn như `1fr`."
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
        "en": "CSS specifications prohibit `<flex>` units (fr) as the minimum value of minmax(). They can only be used as the maximum value.",
        "vi": "Chuẩn CSS quy định đơn vị phân số co giãn (fr) chỉ được phép đặt ở vị trí max, không được làm giá trị min."
      },
      "topicId": "css_grid_responsive",
      "difficulty": "medium"
    },
    {
      "id": "css_q_12_5",
      "type": "single_choice",
      "question": {
        "en": "What does `grid-auto-flow: dense;` do?",
        "vi": "Thuộc tính `grid-auto-flow: dense;` có tác dụng gì trong thuật toán xếp ô?"
      },
      "options": [
        {
          "en": "Instructs the auto-placement algorithm to backfill earlier empty holes in the grid with smaller items",
          "vi": "Yêu cầu thuật toán tự động lấp các lỗ trống xuất hiện trước đó trong lưới bằng các phần tử nhỏ hơn"
        },
        {
          "en": "Compresses images by 50%",
          "vi": "Nén dung lượng ảnh 50%"
        },
        {
          "en": "Removes all gap spacing",
          "vi": "Xóa toàn bộ khoảng cách gap"
        },
        {
          "en": "Disables scrolling",
          "vi": "Tắt thanh cuộn"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`dense` packing fills gaps left by larger spanning items with smaller subsequent items, eliminating visual holes.",
        "vi": "`dense` tự động tìm và lấp đầy các khoảng trống do các khối lớn để lại bằng các item nhỏ phía sau, giúp lưới luôn đặc kín không bị thủng lỗ."
      },
      "topicId": "css_grid_responsive",
      "difficulty": "hard"
    },
    {
      "id": "css_q_12_6",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: The CSS function used to repeat a track pattern without writing it multiple times is ________(3, 1fr)",
        "vi": "Điền vào chỗ trống: Hàm CSS dùng để lặp lại một mẫu track nhiều lần là ________(3, 1fr)"
      },
      "fillBlankAnswers": [
        "repeat"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "repeat(count, track) streamlines track definitions.",
        "vi": "repeat(count, track) giúp viết gọn các khai báo track lặp đi lặp lại."
      },
      "topicId": "css_grid_responsive",
      "difficulty": "easy"
    },
    {
      "id": "css_q_12_7",
      "type": "multiple_choice",
      "question": {
        "en": "Which values are valid for `grid-auto-flow`? (Select all that apply)",
        "vi": "Những giá trị nào sau đây là hợp lệ cho `grid-auto-flow`? (Chọn tất cả đáp án đúng)"
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
          "en": "row dense",
          "vi": "row dense"
        },
        {
          "en": "diagonal",
          "vi": "diagonal"
        }
      ],
      "correctAnswers": [
        0,
        1,
        2
      ],
      "explanation": {
        "en": "row, column, row dense, and column dense are valid. 'diagonal' is not a CSS property value.",
        "vi": "row, column, row dense và column dense là hợp lệ. 'diagonal' không tồn tại trong CSS."
      },
      "topicId": "css_grid_responsive",
      "difficulty": "medium"
    },
    {
      "id": "css_q_12_8",
      "type": "single_choice",
      "question": {
        "en": "How do you place an item at row 2, column 3 using grid shorthand?",
        "vi": "Làm thế nào để đặt một phần tử vào hàng 2, cột 3 bằng cú pháp viết tắt trong CSS Grid?"
      },
      "options": [
        {
          "en": "grid-row: 2; grid-column: 3;",
          "vi": "grid-row: 2; grid-column: 3;"
        },
        {
          "en": "position: 2, 3;",
          "vi": "position: 2, 3;"
        },
        {
          "en": "grid-cell: 2 / 3;",
          "vi": "grid-cell: 2 / 3;"
        },
        {
          "en": "track: 2x3;",
          "vi": "track: 2x3;"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "grid-row: 2 and grid-column: 3 place the item at the intersection of the 2nd row and 3rd column tracks.",
        "vi": "grid-row: 2 và grid-column: 3 đặt phần tử chính xác vào giao điểm hàng 2 và cột 3."
      },
      "topicId": "css_grid_responsive",
      "difficulty": "easy"
    },
    {
      "id": "css_q_12_9",
      "type": "true_false",
      "question": {
        "en": "True or False: `repeat(auto-fit, minmax(250px, 1fr))` creates a responsive layout that automatically adjusts column counts across viewport resizes.",
        "vi": "Đúng hay Sai: `repeat(auto-fit, minmax(250px, 1fr))` tạo ra một bố cục đáp ứng tự động tăng giảm số cột theo độ rộng màn hình."
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
        "en": "This pattern is the industry standard for responsive card layouts without media queries.",
        "vi": "Đây là mẫu thiết kế tiêu chuẩn công nghiệp để tạo lưới card co giãn không cần media query."
      },
      "topicId": "css_grid_responsive",
      "difficulty": "easy"
    },
    {
      "id": "css_q_12_10",
      "type": "single_choice",
      "question": {
        "en": "What happens if an element has `grid-column: 2 / 4;`?",
        "vi": "Điều gì xảy ra khi một phần tử có `grid-column: 2 / 4;`?"
      },
      "options": [
        {
          "en": "It starts at column grid line 2 and ends at column grid line 4 (spanning 2 columns total)",
          "vi": "Nó bắt đầu từ đường line 2 và kết thúc ở đường line 4 (chiếm tổng cộng 2 cột)"
        },
        {
          "en": "It divides column 2 into 4 sub-columns",
          "vi": "Nó chia cột 2 thành 4 cột con"
        },
        {
          "en": "It moves between column 2 and 4 periodically",
          "vi": "Nó nhảy qua lại giữa cột 2 và 4 theo chu kỳ"
        },
        {
          "en": "It triggers a syntax error",
          "vi": "Nó gây ra lỗi cú pháp"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The slash syntax denotes `<start-line> / <end-line>`. Lines 2 to 4 span columns 2 and 3.",
        "vi": "Ký hiệu dấu gạch chéo đại diện cho `<line-bắt-đầu> / <line-kết-thúc>`. Từ line 2 đến line 4 sẽ chiếm trọn 2 cột."
      },
      "topicId": "css_grid_responsive",
      "difficulty": "medium"
    }
  ]
};
