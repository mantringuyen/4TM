import { Lesson } from '../../../../types';

export const lesson13: Lesson = {
  "id": "css_lesson_13",
  "moduleId": "css_mod_3",
  "levelId": "intermediate",
  "courseId": "css",
  "order": 13,
  "topicId": "css_layout_strategy",
  "title": {
    "en": "Layout Strategy: Flexbox vs Grid vs Subgrid",
    "vi": "Chiến Lược Bố Cục: So Sánh Flexbox, Grid & Subgrid"
  },
  "summary": {
    "en": "Master architectural decision-making: Content-First (Flexbox 1D) vs Layout-First (Grid 2D), compound nesting, and subgrid track inheritance.",
    "vi": "Làm chủ tư duy kiến trúc giao diện: Content-First (Flexbox 1D) vs Layout-First (Grid 2D), kỹ thuật lồng ghép phối hợp và kế thừa subgrid."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "Modern web architecture is not an 'either-or' battle between Flexbox and Grid. Professional frontend developers combine both: Grid for page-level 2D skeletons and uniform cards, Flexbox for 1D component interiors (toolbars, navigation, badges), and Subgrid to synchronize nested alignments.",
      "vi": "Kiến trúc web hiện đại không phải là sự lựa chọn đối đầu giữa Flexbox hay Grid. Các lập trình viên chuyên nghiệp luôn kết hợp cả hai: Grid xây dựng khung sườn 2 chiều và danh sách card đồng đều, Flexbox sắp xếp nội dung 1 chiều bên trong component (toolbar, menu, badge), và Subgrid đồng bộ thẳng hàng các phần tử con lồng ghép."
    },
    "conceptExplanation": {
      "en": "Decision Rule: 1. Use **Flexbox** when layout is content-driven, linear along one axis, or requires wrapping with natural item widths (e.g. tag chips, button groups, navbar bars). 2. Use **Grid** when layout is structural, 2-dimensional, or requires strict column/row track alignment across independent cards. 3. Use **Subgrid** (`grid-template-rows: subgrid`) when card children (like card headers, body copy, and bottom action buttons) must align horizontally with their sibling cards across the entire grid row.",
      "vi": "Quy tắc quyết định kiến trúc: 1. Dùng **Flexbox** khi bố cục phụ thuộc vào nội dung, chỉ chạy theo 1 chiều tuyến tính hoặc cần rớt dòng tự nhiên theo chiều dài chữ (ví dụ cụm tag, nhóm nút, thanh navbar). 2. Dùng **Grid** khi bố cục mang tính kết cấu sườn, chạy theo cả 2 chiều hoặc đòi hỏi các cột/hàng phải thẳng tắp tuyệt đối giữa các card độc lập. 3. Dùng **Subgrid** (`grid-template-rows: subgrid`) khi các phần tử con bên trong card (như tiêu đề, nội dung và nút bấm ở đáy) cần phải thẳng hàng ngang tăm tắp với các card khác trong cùng một hàng."
    },
    "syntax": "/* Page Layout: Grid skeleton */\n.page-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 24px;\n}\n\n/* Card Component Interior: Flexbox 1D linear alignment */\n.card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "Compound Grid + Flexbox Card System",
          "vi": "Hệ Thống Phối Hợp Đỉnh Cao Giữa Grid và Flexbox"
        },
        "description": {
          "en": "Grid arranges product cards in 2D space while Flexbox manages inner card button actions and pricing badges.",
          "vi": "Grid dàn trận các sản phẩm thành lưới 2D còn Flexbox căn chỉnh nhãn giá và nút bấm bên trong mỗi thẻ."
        },
        "code": "/* Outer 2D Layout */\n.product-catalog {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 20px;\n}\n\n/* Inner 1D Component */\n.product-card {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding: 16px;\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Forcing multi-row grids using Flexbox with fixed percentage widths (e.g. width: calc(33.333% - 16px)) instead of CSS Grid.",
          "vi": "Cố ép Flexbox làm lưới nhiều cột bằng cách tính phần trăm thủ công (width: calc(33.333% - 16px)) thay vì dùng CSS Grid."
        },
        "correction": {
          "en": "Use display: grid for 2D multi-column lists; reserve Flexbox for 1D content alignment.",
          "vi": "Dùng display: grid cho danh sách lưới đa cột 2D; dành riêng Flexbox cho căn chỉnh 1D theo chiều ngang hoặc dọc."
        }
      }
    ],
    "tips": [
      {
        "en": "Remember the golden rule: Grid is Layout-First (external container defines tracks), Flexbox is Content-First (items dictate their own space).",
        "vi": "Hãy nhớ quy tắc vàng: Grid là Layout-First (khung cha quyết định đường kẻ), còn Flexbox là Content-First (nội dung tự định hình kích thước)."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_13_1",
      "type": "complete_code",
      "title": {
        "en": "Combine Grid Container with Flexbox Card Item",
        "vi": "Kết Hợp Grid Container Với Thẻ Con Flexbox"
      },
      "instruction": {
        "en": "Set display: grid on .store-grid and display: flex with flex-direction: column on .store-card.",
        "vi": "Đặt display: grid cho .store-grid và display: flex kèm flex-direction: column cho .store-card."
      },
      "starterCode": ".store-grid {\n  /* Set grid */\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n\n.store-card {\n  /* Set flex column */\n}",
      "solutionCode": ".store-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n\n.store-card {\n  display: flex;\n  flex-direction: column;\n}",
      "hint": {
        "en": "Use display: grid on .store-grid and display: flex; flex-direction: column; on .store-card.",
        "vi": "Dùng display: grid cho .store-grid và display: flex; flex-direction: column; cho .store-card."
      },
      "explanation": {
        "en": "Grid orchestrates 2D layout while Flexbox manages inner card vertical flow.",
        "vi": "Grid điều phối lưới 2D bên ngoài còn Flexbox kiểm soát luồng nội dung dọc bên trong card."
      }
    },
    {
      "id": "css_ex_13_2",
      "type": "fix_code",
      "title": {
        "en": "Refactor Percentage Flexbox to CSS Grid",
        "vi": "Tái Cấu Trúc Flexbox Phần Trăm Sang CSS Grid Chuẩn"
      },
      "instruction": {
        "en": "Replace display: flex and flex-wrap with display: grid and grid-template-columns: repeat(3, 1fr) on .item-matrix.",
        "vi": "Thay thế display: flex và flex-wrap bằng display: grid và grid-template-columns: repeat(3, 1fr) cho .item-matrix."
      },
      "starterCode": ".item-matrix {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}",
      "solutionCode": ".item-matrix {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}",
      "hint": {
        "en": "Use display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;",
        "vi": "Dùng display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;"
      },
      "explanation": {
        "en": "Grid creates rigid 3-column rows without needing item percentage widths.",
        "vi": "Grid tạo ra 3 cột thẳng tắp mà không cần phải gán phần trăm phức tạp cho các phần tử con."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_13",
    "title": {
      "en": "Architect an Enterprise Pricing Tier Matrix",
      "vi": "Thiết Kế Kiến Trúc Bảng Giá Doanh Nghiệp Đa Tầng"
    },
    "description": {
      "en": "Style .pricing-matrix with display: grid, grid-template-columns: repeat(3, 1fr), and gap: 24px. Style .pricing-card with display: flex, flex-direction: column, justify-content: space-between, and padding: 24px.",
      "vi": "Tạo kiểu .pricing-matrix với display: grid, grid-template-columns: repeat(3, 1fr) và gap: 24px. Tạo kiểu .pricing-card với display: flex, flex-direction: column, justify-content: space-between và padding: 24px."
    },
    "requirements": [
      {
        "en": ".pricing-matrix { display: grid }",
        "vi": ".pricing-matrix { display: grid }"
      },
      {
        "en": "grid-template-columns: repeat(3, 1fr)",
        "vi": "grid-template-columns: repeat(3, 1fr)"
      },
      {
        "en": ".pricing-card { display: flex }",
        "vi": ".pricing-card { display: flex }"
      },
      {
        "en": "flex-direction: column",
        "vi": "flex-direction: column"
      },
      {
        "en": "justify-content: space-between",
        "vi": "justify-content: space-between"
      }
    ],
    "starterCode": "/* Compound Grid + Flexbox pricing matrix */\n.pricing-matrix {\n}\n\n.pricing-card {\n}",
    "solutionCode": ".pricing-matrix {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n}\n\n.pricing-card {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding: 24px;\n}",
    "hints": [
      {
        "en": "Use display: grid on the container matrix and display: flex with flex-direction: column on the cards.",
        "vi": "Dùng display: grid cho khối ma trận bao ngoài và display: flex với flex-direction: column cho các thẻ card."
      }
    ],
    "solutionExplanation": {
      "en": "The outer Grid guarantees equal card heights across columns while inner Flexbox pushes CTA buttons to the bottom.",
      "vi": "Grid bên ngoài đảm bảo các card có chiều cao bằng nhau tuyệt đối trong khi Flexbox bên trong đẩy nút CTA sát đáy."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_13_1",
      "type": "single_choice",
      "question": {
        "en": "What is the core conceptual distinction between CSS Grid and Flexbox?",
        "vi": "Sự phân biệt cốt lõi về mặt khái niệm giữa CSS Grid và Flexbox là gì?"
      },
      "options": [
        {
          "en": "Grid is 2-dimensional (controls rows AND columns simultaneously), while Flexbox is 1-dimensional (controls one axis at a time)",
          "vi": "Grid là 2 chiều (kiểm soát đồng thời cả hàng VÀ cột), trong khi Flexbox là 1 chiều (chỉ kiểm soát 1 trục tại một thời điểm)"
        },
        {
          "en": "Grid is deprecated in favor of Flexbox",
          "vi": "Grid đã bị khai tử để nhường chỗ cho Flexbox"
        },
        {
          "en": "Flexbox only works for text",
          "vi": "Flexbox chỉ dùng được cho chữ"
        },
        {
          "en": "Grid cannot use gap",
          "vi": "Grid không dùng được thuộc tính gap"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Grid is built for 2D structural layouts; Flexbox is built for 1D component-level flow and alignment.",
        "vi": "Grid thiết kế cho bố cục sườn 2 chiều; Flexbox thiết kế cho luồng và căn lề 1 chiều bên trong component."
      },
      "topicId": "css_layout_strategy",
      "difficulty": "easy"
    },
    {
      "id": "css_q_13_2",
      "type": "single_choice",
      "question": {
        "en": "Which layout model is best suited for a navigation bar with a logo on the left and menu links on the right?",
        "vi": "Mô hình nào thích hợp nhất cho thanh navbar với logo bên trái và các liên kết menu bên phải?"
      },
      "options": [
        {
          "en": "Flexbox with `display: flex; justify-content: space-between;`",
          "vi": "Flexbox với `display: flex; justify-content: space-between;`"
        },
        {
          "en": "CSS Table layout",
          "vi": "CSS Table layout"
        },
        {
          "en": "Floats with clearfix",
          "vi": "Dùng Float kết hợp clearfix"
        },
        {
          "en": "CSS Columns",
          "vi": "CSS Multi-column"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Flexbox excels at 1D linear alignment and distributing remaining space across arbitrary content widths.",
        "vi": "Flexbox là lựa chọn số 1 cho căn chỉnh 1D và phân bổ khoảng trống theo độ dài tự nhiên của chữ."
      },
      "topicId": "css_layout_strategy",
      "difficulty": "easy"
    },
    {
      "id": "css_q_13_3",
      "type": "single_choice",
      "question": {
        "en": "Why is CSS Grid preferred over Flexbox for rendering a photo gallery or product catalog?",
        "vi": "Tại sao CSS Grid được ưu tiên hơn Flexbox khi hiển thị thư viện ảnh hoặc danh mục sản phẩm?"
      },
      "options": [
        {
          "en": "Grid enforces rigid track alignment across both columns and rows, avoiding uneven wrapping widths on the last row",
          "vi": "Grid giữ các cột và hàng thẳng tắp tuyệt đối, tránh hiện tượng hàng cuối bị phình to méo mó khi rớt dòng"
        },
        {
          "en": "Grid images load faster",
          "vi": "Ảnh trong Grid tải nhanh hơn"
        },
        {
          "en": "Flexbox cannot display images",
          "vi": "Flexbox không thể hiển thị hình ảnh"
        },
        {
          "en": "Grid requires less JavaScript",
          "vi": "Grid tốn ít JavaScript hơn"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Flexbox wraps items independently per line (causing the last row to stretch or orphan), whereas Grid locks all items to strict vertical and horizontal tracks.",
        "vi": "Flexbox rớt dòng độc lập từng hàng khiến hàng cuối bị co giãn lệch lạc, trong khi Grid khóa cứng mọi item vào đúng đường lưới thẳng hàng."
      },
      "topicId": "css_layout_strategy",
      "difficulty": "medium"
    },
    {
      "id": "css_q_13_4",
      "type": "true_false",
      "question": {
        "en": "True or False: You can place a Flexbox container inside a CSS Grid item.",
        "vi": "Đúng hay Sai: Bạn hoàn toàn có thể đặt một flex container bên trong một ô grid item."
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
        "en": "Combining Grid for outer page skeleton and Flexbox for inner card content is standard best practice.",
        "vi": "Kết hợp Grid cho khung trang bên ngoài và Flexbox cho nội dung thẻ bên trong là chuẩn mực vàng trong thiết kế web."
      },
      "topicId": "css_layout_strategy",
      "difficulty": "easy"
    },
    {
      "id": "css_q_13_5",
      "type": "single_choice",
      "question": {
        "en": "What problem does CSS `subgrid` solve that traditional nested grids could not?",
        "vi": "Tính năng CSS `subgrid` giải quyết bài toán nào mà hệ thống lưới lồng nhau truyền thống không làm được?"
      },
      "options": [
        {
          "en": "Allows child items inside a card to align their tracks directly with the parent grid's tracks across adjacent cards",
          "vi": "Cho phép các phần tử con bên trong card căn thẳng hàng trực tiếp với các đường track của lưới cha giữa các card liền kề"
        },
        {
          "en": "Compiles CSS to SASS automatically",
          "vi": "Tự động dịch CSS sang SASS"
        },
        {
          "en": "Increases screen refresh rate to 120Hz",
          "vi": "Tăng tần số quét màn hình lên 120Hz"
        },
        {
          "en": "Prevents CSS specificity conflicts",
          "vi": "Ngăn chặn xung đột độ ưu tiên CSS"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`subgrid` allows a nested grid to participate in and inherit the track sizing of its parent grid, enabling alignment of titles and buttons across multi-column cards.",
        "vi": "`subgrid` cho phép lưới con kế thừa trực tiếp kích thước track của lưới cha, giúp tiêu đề và nút bấm trên các card khác nhau luôn thẳng hàng ngang tuyệt đối."
      },
      "topicId": "css_layout_strategy",
      "difficulty": "hard"
    },
    {
      "id": "css_q_13_6",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: The mental model for Flexbox is 'Content-First', while the mental model for CSS Grid is '________-First'",
        "vi": "Điền vào chỗ trống: Tư duy cốt lõi của Flexbox là 'Content-First', trong khi tư duy của CSS Grid là '________-First'"
      },
      "fillBlankAnswers": [
        "Layout",
        "layout"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Grid is Layout-First (the grid tracks dictate element dimensions).",
        "vi": "Grid là Layout-First (các đường kẻ khung lưới quyết định kích thước của phần tử)."
      },
      "topicId": "css_layout_strategy",
      "difficulty": "medium"
    },
    {
      "id": "css_q_13_7",
      "type": "multiple_choice",
      "question": {
        "en": "Which use cases are ideal for Flexbox? (Select all that apply)",
        "vi": "Những trường hợp nào sau đây là lý tưởng để sử dụng Flexbox? (Chọn tất cả đáp án đúng)"
      },
      "options": [
        {
          "en": "Tag pills / chip list wrapping naturally with varying text lengths",
          "vi": "Danh sách thẻ tag/chip co giãn tự nhiên theo độ dài chữ"
        },
        {
          "en": "Vertical button stack inside a dialog footer",
          "vi": "Cụm nút bấm xếp dọc ở đáy hộp thoại"
        },
        {
          "en": "A media object with avatar on the left and bio text on the right",
          "vi": "Khối Media Object với avatar bên trái và thông tin cá nhân bên phải"
        },
        {
          "en": "A full spreadsheet data table with strict row/column intersections",
          "vi": "Bảng dữ liệu bảng tính với các hàng và cột giao nhau nghiêm ngặt"
        }
      ],
      "correctAnswers": [
        0,
        1,
        2
      ],
      "explanation": {
        "en": "Tag chips, button stacks, and media objects are 1D content-driven layouts (Flexbox). A spreadsheet table is a 2D matrix (Grid/Table).",
        "vi": "Tag chips, cụm nút và media object là bố cục 1D (Flexbox). Bảng tính spreadsheet là ma trận 2D (Grid/Table)."
      },
      "topicId": "css_layout_strategy",
      "difficulty": "medium"
    },
    {
      "id": "css_q_13_8",
      "type": "single_choice",
      "question": {
        "en": "How do you push a footer action button to the very bottom of a flex card whose content height varies?",
        "vi": "Làm thế nào để đẩy nút bấm hành động luôn nằm sát đáy của một flex card có chiều dài nội dung thay đổi?"
      },
      "options": [
        {
          "en": "Apply `margin-top: auto;` to the button inside a card with `display: flex; flex-direction: column;`",
          "vi": "Áp dụng `margin-top: auto;` cho nút bấm bên trong card có `display: flex; flex-direction: column;`"
        },
        {
          "en": "Use position: absolute; bottom: 0; without padding",
          "vi": "Dùng position: absolute; bottom: 0; mà không cần padding"
        },
        {
          "en": "Set button height to 100%",
          "vi": "Đặt chiều cao nút thành 100%"
        },
        {
          "en": "Add 500px padding to the card body",
          "vi": "Thêm padding 500px vào thân card"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In a vertical flex container, `margin-top: auto` absorbs all extra vertical space, pinning the button perfectly to the bottom.",
        "vi": "Trong flex container dọc, `margin-top: auto` hấp thụ toàn bộ khoảng trống dọc còn thừa, ghim chặt nút bấm xuống đáy thẻ."
      },
      "topicId": "css_layout_strategy",
      "difficulty": "medium"
    },
    {
      "id": "css_q_13_9",
      "type": "true_false",
      "question": {
        "en": "True or False: Using CSS Grid requires more browser memory than Flexbox and should be avoided on mobile.",
        "vi": "Đúng hay Sai: Dùng CSS Grid tốn nhiều bộ nhớ trình duyệt hơn Flexbox và nên tránh dùng trên thiết bị di động."
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
        "en": "CSS Grid is natively optimized in modern browser C++ rendering engines and is fully performant on all mobile devices.",
        "vi": "CSS Grid được tối ưu hóa ở tầng lõi C++ của trình duyệt và hoạt động cực kỳ mượt mà trên tất cả thiết bị di động."
      },
      "topicId": "css_layout_strategy",
      "difficulty": "easy"
    },
    {
      "id": "css_q_13_10",
      "type": "single_choice",
      "question": {
        "en": "What happens when you declare `display: grid;` on an element that already contains float-based children?",
        "vi": "Điều gì xảy ra khi bạn khai báo `display: grid;` trên một phần tử đang chứa các con dùng float?"
      },
      "options": [
        {
          "en": "The float and clear properties on the children are ignored; they automatically become grid items",
          "vi": "Các thuộc tính float và clear trên con bị bỏ qua; chúng tự động biến thành các grid item"
        },
        {
          "en": "The browser crashes",
          "vi": "Trình duyệt bị treo"
        },
        {
          "en": "Grid fails to initialize",
          "vi": "Grid không thể khởi tạo"
        },
        {
          "en": "Float overrides the grid display",
          "vi": "Float ghi đè lên grid"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "CSS specifications dictate that `float`, `clear`, and `vertical-align` have no effect on children of a grid or flex container.",
        "vi": "Đặc tả CSS quy định `float`, `clear` và `vertical-align` hoàn toàn mất tác dụng trên các con của grid hoặc flex container."
      },
      "topicId": "css_layout_strategy",
      "difficulty": "medium"
    }
  ]
};
