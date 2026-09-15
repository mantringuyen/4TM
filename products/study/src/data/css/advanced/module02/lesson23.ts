import { Lesson } from '../../../../types';

export const lesson23: Lesson = {
  "id": "css_lesson_23",
  "moduleId": "css_mod_6",
  "levelId": "advanced",
  "courseId": "css",
  "order": 23,
  "topicId": "css_subgrid",
  "title": {
    "en": "Advanced CSS Grid & Subgrid Mastery",
    "vi": "CSS Grid Nâng Cao & Làm Chủ Kỹ Thuật Subgrid"
  },
  "summary": {
    "en": "Master subgrid on rows/columns, aligning child cards across independent containers, dense auto-placement, and asymmetric masonry-style grids.",
    "vi": "Làm chủ subgrid trên hàng và cột, căn thẳng hàng các thẻ con ở các khung độc lập, thuật toán dense và bố cục bất đối xứng dạng masonry."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "While standard CSS Grid creates tracks on direct children, nested elements traditionally could not align with the parent grid. **CSS Subgrid (`grid-template-columns: subgrid` / `grid-template-rows: subgrid`)** solves this fundamental limitation, allowing deeply nested elements to inherit and lock into the ancestor grid tracks.",
      "vi": "Trong khi CSS Grid truyền thống chỉ tạo hàng cột cho con trực tiếp, các phần tử cháu chắt lồng bên trong không thể căn thẳng hàng với lưới cha. **CSS Subgrid (`grid-template-columns: subgrid` / `grid-template-rows: subgrid`)** giải quyết triệt để rào cản này, cho phép các phần tử con kế thừa và gắn chặt vào đúng các đường lưới của khung cha tổ tiên."
    },
    "conceptExplanation": {
      "en": "A common UI challenge is card grids where headers, descriptions, and action buttons in separate cards have varying text lengths, causing buttons to sit at uneven vertical heights. By making the card container span multiple rows (`grid-row: span 3`) and setting `grid-template-rows: subgrid`, all cards share the exact same row heights for headers, text, and footers, aligning perfectly across columns.",
      "vi": "Một bài toán kinh điển trong giao diện là danh sách thẻ (card) có độ dài tiêu đề và mô tả khác nhau, khiến các nút bấm ở chân thẻ bị lệch hàng dọc. Bằng cách cho thẻ con chiếm nhiều hàng (`grid-row: span 3`) và khai báo `grid-template-rows: subgrid`, mọi thẻ đều dùng chung các hàng của lưới cha, giúp tiêu đề, nội dung và nút bấm thẳng hàng tăm tắp theo từng hàng ngang."
    },
    "syntax": "/* Parent Grid */\n.card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  grid-auto-rows: auto auto 1fr auto; /* Title, subtitle, body, button */\n  gap: 16px;\n}\n\n/* Child Card inheriting parent rows via subgrid */\n.card {\n  display: grid;\n  grid-row: span 4;\n  grid-template-rows: subgrid;\n}",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "Perfect Cross-Card Subgrid Alignment",
          "vi": "Căn Thẳng Hàng Hoàn Hảo Giữa Các Thẻ Bằng Subgrid"
        },
        "description": {
          "en": "All card titles and footer buttons align across columns regardless of description text length.",
          "vi": "Tất cả tiêu đề và nút bấm chân thẻ đều thẳng hàng ngang dù phần mô tả ngắn dài khác nhau."
        },
        "code": ".grid-parent {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-auto-rows: auto 1fr auto;\n  gap: 24px;\n}\n\n.card-item {\n  display: grid;\n  grid-row: span 3;\n  grid-template-rows: subgrid;\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Forgetting to specify grid-row: span N or grid-column: span N on the subgrid element.",
          "vi": "Quên khai báo grid-row: span N hoặc grid-column: span N trên phần tử dùng subgrid."
        },
        "correction": {
          "en": "A subgrid MUST span explicit tracks on the parent grid to inherit those tracks.",
          "vi": "Phần tử subgrid BẮT BUỘC phải chiếm số hàng/cột cụ thể (span N) trên lưới cha để kế thừa các đường lưới đó."
        }
      }
    ],
    "tips": [
      {
        "en": "Subgrid can be used on columns, rows, or both independently: grid-template-rows: subgrid; grid-template-columns: subgrid;",
        "vi": "Subgrid có thể áp dụng riêng cho hàng, riêng cho cột hoặc cả hai: grid-template-rows: subgrid; grid-template-columns: subgrid;"
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_23_1",
      "type": "complete_code",
      "title": {
        "en": "Enable Subgrid on Child Rows",
        "vi": "Kích Hoạt Subgrid Trên Các Hàng Của Thẻ Con"
      },
      "instruction": {
        "en": "Set display: grid, grid-row: span 3, and grid-template-rows: subgrid on .subgrid-card.",
        "vi": "Đặt display: grid, grid-row: span 3 và grid-template-rows: subgrid cho .subgrid-card."
      },
      "starterCode": ".subgrid-card {\n  /* Apply subgrid */\n}",
      "solutionCode": ".subgrid-card {\n  display: grid;\n  grid-row: span 3;\n  grid-template-rows: subgrid;\n}",
      "hint": {
        "en": "Use display: grid; grid-row: span 3; grid-template-rows: subgrid;",
        "vi": "Dùng display: grid; grid-row: span 3; grid-template-rows: subgrid;"
      },
      "explanation": {
        "en": "grid-template-rows: subgrid locks the 3 internal rows into the parent grid tracks.",
        "vi": "grid-template-rows: subgrid khóa 3 hàng bên trong thẻ vào đúng các hàng của lưới cha."
      }
    },
    {
      "id": "css_ex_23_2",
      "type": "fix_code",
      "title": {
        "en": "Enable Dense Grid Packing",
        "vi": "Kích Hoạt Thuật Toán Lấp Đầy Lỗ Trống Dense"
      },
      "instruction": {
        "en": "Add grid-auto-flow: dense to .photo-mosaic to backfill empty grid gaps automatically.",
        "vi": "Thêm grid-auto-flow: dense vào .photo-mosaic để tự động lấp đầy các ô trống trong lưới ảnh."
      },
      "starterCode": ".photo-mosaic {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n}",
      "solutionCode": ".photo-mosaic {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-auto-flow: dense;\n}",
      "hint": {
        "en": "Add grid-auto-flow: dense;",
        "vi": "Thêm grid-auto-flow: dense;"
      },
      "explanation": {
        "en": "dense packing algorithm fills holes earlier in the grid if smaller items appear later in the source order.",
        "vi": "Thuật toán dense tìm các phần tử nhỏ phía sau để lấp đầy khoảng trống xuất hiện phía trước trong lưới."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_23",
    "title": {
      "en": "Build an Aligned Multi-Card Pricing Table with Subgrid",
      "vi": "Xây Dựng Bảng Giá Đa Thẻ Căn Thẳng Hàng Bằng Subgrid"
    },
    "description": {
      "en": "Style .pricing-grid with display: grid, grid-template-columns: repeat(3, 1fr), and grid-auto-rows: auto auto 1fr auto. Style .pricing-card with display: grid, grid-row: span 4, and grid-template-rows: subgrid.",
      "vi": "Tạo kiểu .pricing-grid với display: grid, grid-template-columns: repeat(3, 1fr) và grid-auto-rows: auto auto 1fr auto. Tạo kiểu .pricing-card với display: grid, grid-row: span 4 và grid-template-rows: subgrid."
    },
    "requirements": [
      {
        "en": "display: grid on .pricing-grid",
        "vi": "display: grid cho .pricing-grid"
      },
      {
        "en": "grid-template-columns: repeat(3, 1fr)",
        "vi": "grid-template-columns: repeat(3, 1fr)"
      },
      {
        "en": "grid-auto-rows: auto auto 1fr auto",
        "vi": "grid-auto-rows: auto auto 1fr auto"
      },
      {
        "en": "grid-row: span 4 on .pricing-card",
        "vi": "grid-row: span 4 cho .pricing-card"
      },
      {
        "en": "grid-template-rows: subgrid",
        "vi": "grid-template-rows: subgrid"
      }
    ],
    "starterCode": ".pricing-grid {\n}\n\n.pricing-card {\n}",
    "solutionCode": ".pricing-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-auto-rows: auto auto 1fr auto;\n}\n\n.pricing-card {\n  display: grid;\n  grid-row: span 4;\n  grid-template-rows: subgrid;\n}",
    "hints": [
      {
        "en": "Declare grid-auto-rows on the parent and grid-template-rows: subgrid on the child spanning 4 rows.",
        "vi": "Khai báo grid-auto-rows trên cha và grid-template-rows: subgrid trên con chiếm 4 hàng."
      }
    ],
    "solutionExplanation": {
      "en": "Subgrid guarantees perfect vertical alignment for pricing tiers, feature lists, and checkout buttons.",
      "vi": "Subgrid đảm bảo các mốc giá, danh sách tính năng và nút mua hàng luôn thẳng hàng ngang tuyệt đối."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_23_1",
      "type": "single_choice",
      "question": {
        "en": "What problem does CSS Subgrid primarily solve?",
        "vi": "CSS Subgrid giải quyết bài toán cốt lõi nào trong thiết kế layout?"
      },
      "options": [
        {
          "en": "Allows nested child elements to align directly with the row/column tracks defined on an ancestor grid",
          "vi": "Cho phép các phần tử con cháu lồng sâu bên trong căn thẳng hàng với các đường lưới của khung cha tổ tiên"
        },
        {
          "en": "Converts Grid into Flexbox",
          "vi": "Chuyển Grid thành Flexbox"
        },
        {
          "en": "Compresses CSS file size",
          "vi": "Nén dung lượng file CSS"
        },
        {
          "en": "Renders 3D graphics",
          "vi": "Render đồ họa 3D"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Subgrid inherits the track sizing of the parent grid rather than defining its own independent track definitions.",
        "vi": "Subgrid kế thừa kích thước các hàng/cột từ lưới cha thay vì phải tự khai báo lại một hệ thống lưới độc lập."
      },
      "topicId": "css_subgrid",
      "difficulty": "easy"
    },
    {
      "id": "css_q_23_2",
      "type": "single_choice",
      "question": {
        "en": "What happens when `grid-auto-flow: dense;` is enabled on a CSS Grid container?",
        "vi": "Điều gì xảy ra khi bật thuộc tính `grid-auto-flow: dense;` trên khung chứa CSS Grid?"
      },
      "options": [
        {
          "en": "The grid engine backfills visual holes earlier in the grid if smaller items appear later in the DOM",
          "vi": "Trình duyệt tự động lấy các phần tử nhỏ ở phía sau trong DOM để lấp đầy các khoảng trống xuất hiện phía trước trên lưới"
        },
        {
          "en": "Elements are compressed and made blurry",
          "vi": "Các phần tử bị nén nhỏ và mờ đi"
        },
        {
          "en": "All gaps are removed",
          "vi": "Xóa toàn bộ khoảng cách gap"
        },
        {
          "en": "The grid stops accepting new items",
          "vi": "Lưới ngừng nhận phần tử mới"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Dense packing produces visually compact layouts without blank spaces, ideal for photo galleries and bento dashboards.",
        "vi": "Thuật toán dense tạo bố cục xếp kín khít không bị lỗ trống, rất thích hợp cho thư viện ảnh và dashboard dạng bento."
      },
      "topicId": "css_subgrid",
      "difficulty": "medium"
    },
    {
      "id": "css_q_23_3",
      "type": "true_false",
      "question": {
        "en": "True or False: An element using `grid-template-columns: subgrid` must span an explicit number of columns on the parent grid (e.g. `grid-column: span 3`).",
        "vi": "Đúng hay Sai: Một phần tử dùng `grid-template-columns: subgrid` bắt buộc phải chiếm một số lượng cột cụ thể trên lưới cha (ví dụ `grid-column: span 3`)."
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
        "en": "A subgrid must span a defined track range to inherit the corresponding parent grid lines.",
        "vi": "Subgrid bắt buộc phải được chỉ định span bao nhiêu ô để nhận đúng số lượng đường lưới tương ứng từ cha."
      },
      "topicId": "css_subgrid",
      "difficulty": "easy"
    },
    {
      "id": "css_q_23_4",
      "type": "single_choice",
      "question": {
        "en": "Can a subgrid declare its own `gap` property that differs from the parent grid's gap?",
        "vi": "Phần tử subgrid có thể khai báo thuộc tính `gap` riêng khác với `gap` của lưới cha không?"
      },
      "options": [
        {
          "en": "Yes, subgrids inherit track sizing by default but can override their own gap values",
          "vi": "Có, subgrid kế thừa kích thước hàng cột nhưng hoàn toàn có thể tự ghi đè giá trị khoảng cách gap riêng"
        },
        {
          "en": "No, gap cannot be customized in subgrid",
          "vi": "Không, gap không thể tùy biến trong subgrid"
        },
        {
          "en": "Only in Firefox",
          "vi": "Chỉ chạy được trên Firefox"
        },
        {
          "en": "Only when gap is 0",
          "vi": "Chỉ được khi gap bằng 0"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Subgrids inherit parent line positions by default but can specify their own custom `gap` values if desired.",
        "vi": "Subgrid kế thừa các đường gióng của cha nhưng vẫn cho phép định nghĩa lại `gap` độc lập nếu muốn."
      },
      "topicId": "css_subgrid",
      "difficulty": "hard"
    },
    {
      "id": "css_q_23_5",
      "type": "single_choice",
      "question": {
        "en": "How do you place a grid item into an explicit column span from line 2 to line 5?",
        "vi": "Làm thế nào để đặt một phần tử grid chiếm các cột từ đường gióng số 2 đến đường gióng số 5?"
      },
      "options": [
        {
          "en": "grid-column: 2 / 5;",
          "vi": "grid-column: 2 / 5;"
        },
        {
          "en": "grid-column: 2 to 5;",
          "vi": "grid-column: 2 to 5;"
        },
        {
          "en": "grid-span: 2-5;",
          "vi": "grid-span: 2-5;"
        },
        {
          "en": "column-range: 2..5;",
          "vi": "column-range: 2..5;"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The syntax `grid-column: <start-line> / <end-line>` (e.g. `2 / 5`) places elements across specific grid lines.",
        "vi": "Cú pháp `grid-column: <đường-bắt-đầu> / <đường-kết-thúc>` (ví dụ `2 / 5`) đặt phần tử nằm giữa các đường gióng chỉ định."
      },
      "topicId": "css_subgrid",
      "difficulty": "easy"
    },
    {
      "id": "css_q_23_6",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: To inherit the parent grid's column tracks, set grid-template-columns: ________",
        "vi": "Điền vào chỗ trống: Để kế thừa các cột của lưới cha, khai báo grid-template-columns: ________"
      },
      "fillBlankAnswers": [
        "subgrid"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "subgrid keyword delegates track definitions to the parent grid.",
        "vi": "Từ khóa subgrid ủy quyền định nghĩa hàng cột cho lưới cha."
      },
      "topicId": "css_subgrid",
      "difficulty": "easy"
    },
    {
      "id": "css_q_23_7",
      "type": "multiple_choice",
      "question": {
        "en": "Which properties can inherit parent tracks via subgrid? (Select all that apply)",
        "vi": "Những thuộc tính nào sau đây có thể kế thừa các đường lưới từ cha thông qua subgrid? (Chọn tất cả đáp án đúng)"
      },
      "options": [
        {
          "en": "grid-template-columns: subgrid;",
          "vi": "grid-template-columns: subgrid;"
        },
        {
          "en": "grid-template-rows: subgrid;",
          "vi": "grid-template-rows: subgrid;"
        },
        {
          "en": "grid-template-areas: subgrid;",
          "vi": "grid-template-areas: subgrid;"
        },
        {
          "en": "display: subgrid; (Invalid)",
          "vi": "display: subgrid; (Không hợp lệ)"
        }
      ],
      "correctAnswers": [
        0,
        1
      ],
      "explanation": {
        "en": "Subgrid is a value applied to `grid-template-columns` and `grid-template-rows`, NOT a `display` value.",
        "vi": "Subgrid là giá trị gán cho `grid-template-columns` và `grid-template-rows`, KHÔNG PHẢI là một giá trị của `display`."
      },
      "topicId": "css_subgrid",
      "difficulty": "medium"
    },
    {
      "id": "css_q_23_8",
      "type": "single_choice",
      "question": {
        "en": "What is a Bento Grid layout in modern web design?",
        "vi": "Bố cục Bento Grid trong thiết kế web hiện đại là gì?"
      },
      "options": [
        {
          "en": "An asymmetric grid layout featuring cards of varying modular sizes (1x1, 2x1, 2x2) arranged cohesively like a Japanese bento box",
          "vi": "Bố cục lưới bất đối xứng gồm các thẻ có kích cỡ khác nhau (1x1, 2x1, 2x2) ghép lại gọn gàng như hộp cơm bento Nhật Bản"
        },
        {
          "en": "A grid for food delivery apps only",
          "vi": "Lưới chỉ dùng cho ứng dụng giao đồ ăn"
        },
        {
          "en": "A 3D grid layout",
          "vi": "Bố cục lưới 3D"
        },
        {
          "en": "A deprecated table layout",
          "vi": "Bố cục thẻ table cũ"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Bento Grids use CSS Grid column/row spanning to create engaging, dynamic modular feature showcases.",
        "vi": "Bento Grid dùng tính năng span cột/hàng của CSS Grid để tạo nên các khối giới thiệu tính năng đẹp mắt và đa dạng."
      },
      "topicId": "css_subgrid",
      "difficulty": "easy"
    },
    {
      "id": "css_q_23_9",
      "type": "true_false",
      "question": {
        "en": "True or False: Named grid lines on a parent grid can be referenced directly by items inside a subgrid.",
        "vi": "Đúng hay Sai: Các đường gióng có đặt tên trên lưới cha có thể được gọi và sử dụng trực tiếp bởi các phần tử con trong subgrid."
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
        "en": "Subgrids inherit named lines from the parent grid and can also define their own local line names.",
        "vi": "Subgrid kế thừa toàn bộ tên các đường gióng của lưới cha đồng thời có thể định nghĩa thêm tên đường gióng riêng."
      },
      "topicId": "css_subgrid",
      "difficulty": "hard"
    },
    {
      "id": "css_q_23_10",
      "type": "single_choice",
      "question": {
        "en": "What happens if a child element inside a subgrid is placed on a line number outside the spanned track range?",
        "vi": "Điều gì xảy ra nếu một thẻ con trong subgrid được đặt vào một đường số nằm ngoài phạm vi các hàng/cột được kế thừa?"
      },
      "options": [
        {
          "en": "An implicit track is created at the edge of the subgrid without extending the parent grid",
          "vi": "Một track ngầm định sẽ được tạo ở mép của subgrid mà không làm mở rộng lưới cha"
        },
        {
          "en": "The element disappears",
          "vi": "Phần tử biến mất"
        },
        {
          "en": "The page reloads",
          "vi": "Trang bị load lại"
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
        "en": "Subgrid creates extra implicit tracks locally to contain overflowing items without corrupting the ancestor grid.",
        "vi": "Subgrid sẽ tự tạo thêm các track ngầm cục bộ để chứa phần tử tràn mà không phá vỡ cấu trúc lưới cha."
      },
      "topicId": "css_subgrid",
      "difficulty": "hard"
    }
  ]
};
