import { Lesson } from '../../../../types';

export const lesson10: Lesson = {
  "id": "css_lesson_10",
  "moduleId": "css_mod_3",
  "levelId": "intermediate",
  "courseId": "css",
  "order": 10,
  "topicId": "css_flexbox_items",
  "title": {
    "en": "Flexbox II: Flex Item Sizing & Alignment",
    "vi": "Flexbox II: Kích Thước & Phân Bổ Phần Tử Con"
  },
  "summary": {
    "en": "Master flex-grow, flex-shrink, flex-basis, the flex shorthand, align-self, and order for surgical control over individual flex items.",
    "vi": "Làm chủ flex-grow, flex-shrink, flex-basis, cú pháp viết tắt flex, align-self và order để điều khiển chính xác từng phần tử con."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "While container properties manage macro layout, flex item properties (`flex-grow`, `flex-shrink`, `flex-basis`, `align-self`, `order`) dictate how individual children absorb remaining space, compress during overflow, or override alignment.",
      "vi": "Nếu các thuộc tính container quản lý bố cục vĩ mô, thì các thuộc tính phần tử con (`flex-grow`, `flex-shrink`, `flex-basis`, `align-self`, `order`) quyết định cách từng item hấp thụ khoảng trống thừa, co lại khi thiếu diện tích hoặc ghi đè căn lề."
    },
    "conceptExplanation": {
      "en": "`flex-basis` sets the default starting size of the item along the main axis before free space is distributed. `flex-grow` (default 0) specifies the proportion of leftover positive space this item will consume. `flex-shrink` (default 1) specifies the rate at which this item will shrink when space is insufficient. The standard shorthand is `flex: <grow> <shrink> <basis>` (e.g. `flex: 1 1 0%` or `flex: 1` for equal flexible columns; `flex: 0 0 auto` for fixed-width sidebars). `align-self` allows an individual child to override the container's `align-items`. `order` visually reorders items without altering DOM order.",
      "vi": "`flex-basis` đặt kích thước khởi tạo ban đầu dọc theo trục chính trước khi phân chia khoảng trống thừa. `flex-grow` (mặc định 0) quy định tỷ lệ hấp thụ khoảng trống còn dư. `flex-shrink` (mặc định 1) quy định tỷ lệ co lại khi khung chứa bị thiếu chỗ. Cú pháp viết tắt chuẩn là `flex: <grow> <shrink> <basis>` (ví dụ `flex: 1 1 0%` hoặc `flex: 1` để chia cột đều nhau; `flex: 0 0 auto` cho sidebar kích thước cố định). `align-self` cho phép một phần tử con tự đổi căn lề riêng biệt. `order` thay đổi thứ tự hiển thị thị giác mà không làm đảo lộn cấu trúc DOM."
    },
    "syntax": "/* Standard Sidebar + Main Content Layout */\n.sidebar {\n  flex: 0 0 260px; /* Fixed 260px, never shrinks or grows */\n}\n\n.main-content {\n  flex: 1 1 0%;   /* Takes all remaining space */\n}\n\n/* Override alignment on single item */\n.btn-logout {\n  align-self: flex-end;\n}",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "Input with Expandable Search Bar and Fixed Button",
          "vi": "Thanh Tìm Kiếm Tự Co Giãn Kèm Nút Cố Định"
        },
        "description": {
          "en": "Search input grows to fill available space while action button maintains intrinsic width.",
          "vi": "Ô tìm kiếm tự động nở rộng chiếm trọn không gian trong khi nút bấm giữ nguyên kích thước nội dung."
        },
        "code": ".search-group {\n  display: flex;\n  gap: 8px;\n}\n\n.search-input {\n  flex: 1 1 auto; /* Expands to fill space */\n}\n\n.search-button {\n  flex: 0 0 auto; /* Stays at exact intrinsic size */\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Using flex: 1 without understanding it sets flex-basis: 0%, which can unexpectedly compress elements with intrinsic minimum widths.",
          "vi": "Dùng flex: 1 mà không hiểu nó đặt flex-basis: 0%, có thể gây bẹp các phần tử có chiều rộng tối thiểu."
        },
        "correction": {
          "en": "Add min-width: 0 on flex children if text inside flex: 1 refuses to truncate or wrap.",
          "vi": "Thêm min-width: 0 cho phần tử flex con nếu văn bản bên trong flex: 1 không chịu cắt dấu ba chấm hoặc tràn chữ."
        }
      }
    ],
    "tips": [
      {
        "en": "Always set min-width: 0 on flex children containing text truncation (ellipsis) to override default min-width: auto.",
        "vi": "Luôn đặt min-width: 0 cho các flex item chứa chữ cắt dấu 3 chấm để ghi đè giá trị mặc định min-width: auto của trình duyệt."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_10_1",
      "type": "complete_code",
      "title": {
        "en": "Create a Flexible Main Column",
        "vi": "Tạo Cột Nội Dung Co Giãn Linh Hoạt"
      },
      "instruction": {
        "en": "Set flex: 1 1 0% on .main-view and flex: 0 0 280px on .sidebar-view.",
        "vi": "Đặt flex: 1 1 0% cho .main-view và flex: 0 0 280px cho .sidebar-view."
      },
      "starterCode": ".sidebar-view {\n  /* Fixed 280px */\n}\n\n.main-view {\n  /* Flexible full space */\n}",
      "solutionCode": ".sidebar-view {\n  flex: 0 0 280px;\n}\n\n.main-view {\n  flex: 1 1 0%;\n}",
      "hint": {
        "en": "Use flex: 0 0 280px; and flex: 1 1 0%;",
        "vi": "Dùng flex: 0 0 280px; và flex: 1 1 0%;"
      },
      "explanation": {
        "en": "flex: 0 0 280px locks the sidebar width while flex: 1 1 0% expands the main view.",
        "vi": "flex: 0 0 280px khóa cứng chiều rộng sidebar còn flex: 1 1 0% giúp vùng chính co giãn tối đa."
      }
    },
    {
      "id": "css_ex_10_2",
      "type": "fix_code",
      "title": {
        "en": "Override Individual Item Alignment",
        "vi": "Ghi Đè Căn Lề Cho Riêng Một Phần Tử Con"
      },
      "instruction": {
        "en": "Add align-self: flex-end to .action-cta so it pins to the bottom of the card while others stretch.",
        "vi": "Thêm align-self: flex-end vào .action-cta để nó dạt xuống đáy card trong khi các item khác giữ nguyên."
      },
      "starterCode": ".action-cta {\n  background: #3b82f6;\n}",
      "solutionCode": ".action-cta {\n  align-self: flex-end;\n  background: #3b82f6;\n}",
      "hint": {
        "en": "Add align-self: flex-end;",
        "vi": "Thêm align-self: flex-end;"
      },
      "explanation": {
        "en": "align-self overrides the parent container's align-items property for a specific child.",
        "vi": "align-self ghi đè thuộc tính align-items của thẻ cha đối với riêng phần tử con này."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_10",
    "title": {
      "en": "Build an App Layout with Flexible Workspace",
      "vi": "Xây Dựng Bố Cục Ứng Dụng Với Không Gian Làm Việc Co Giãn"
    },
    "description": {
      "en": "Style .app-shell with display: flex. Style .app-sidebar with flex: 0 0 250px. Style .app-workspace with flex: 1 1 auto and min-width: 0.",
      "vi": "Tạo kiểu .app-shell với display: flex. Tạo kiểu .app-sidebar với flex: 0 0 250px. Tạo kiểu .app-workspace với flex: 1 1 auto và min-width: 0."
    },
    "requirements": [
      {
        "en": ".app-shell { display: flex }",
        "vi": ".app-shell { display: flex }"
      },
      {
        "en": "flex: 0 0 250px",
        "vi": "flex: 0 0 250px"
      },
      {
        "en": "flex: 1 1 auto",
        "vi": "flex: 1 1 auto"
      },
      {
        "en": "min-width: 0",
        "vi": "min-width: 0"
      }
    ],
    "starterCode": "/* App layout styles */\n.app-shell {\n}\n\n.app-sidebar {\n}\n\n.app-workspace {\n}",
    "solutionCode": ".app-shell {\n  display: flex;\n}\n\n.app-sidebar {\n  flex: 0 0 250px;\n}\n\n.app-workspace {\n  flex: 1 1 auto;\n  min-width: 0;\n}",
    "hints": [
      {
        "en": "Apply display: flex on shell, flex: 0 0 250px on sidebar, and flex: 1 1 auto with min-width: 0 on workspace.",
        "vi": "Đặt display: flex cho shell, flex: 0 0 250px cho sidebar và flex: 1 1 auto kèm min-width: 0 cho workspace."
      }
    ],
    "solutionExplanation": {
      "en": "min-width: 0 ensures flexible containers allow inner content to shrink without blowing out layouts.",
      "vi": "min-width: 0 đảm bảo khung co giãn cho phép nội dung con thu nhỏ mượt mà không làm vỡ khung hình."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_10_1",
      "type": "single_choice",
      "question": {
        "en": "What does the shorthand `flex: 1;` expand to in CSS?",
        "vi": "Cú pháp viết tắt `flex: 1;` tương đương với khai báo đầy đủ nào trong CSS?"
      },
      "options": [
        {
          "en": "flex: 1 1 0% (flex-grow: 1, flex-shrink: 1, flex-basis: 0%)",
          "vi": "flex: 1 1 0% (flex-grow: 1, flex-shrink: 1, flex-basis: 0%)"
        },
        {
          "en": "flex: 1 0 auto",
          "vi": "flex: 1 0 auto"
        },
        {
          "en": "flex: 0 1 auto",
          "vi": "flex: 0 1 auto"
        },
        {
          "en": "flex: 1 0 100px",
          "vi": "flex: 1 0 100px"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In modern CSS specifications, `flex: 1` sets grow to 1, shrink to 1, and basis to 0%.",
        "vi": "Theo đặc tả CSS hiện đại, `flex: 1` đặt grow = 1, shrink = 1 và basis = 0%."
      },
      "topicId": "css_flexbox_items",
      "difficulty": "easy"
    },
    {
      "id": "css_q_10_2",
      "type": "single_choice",
      "question": {
        "en": "What does `flex-grow: 2;` mean relative to a sibling with `flex-grow: 1;`?",
        "vi": "`flex-grow: 2;` có ý nghĩa như thế nào so với phần tử anh em có `flex-grow: 1;`?"
      },
      "options": [
        {
          "en": "It receives twice as much of the remaining available free space as the sibling",
          "vi": "Nó sẽ nhận gấp đôi lượng khoảng trống còn dư so với phần tử anh em"
        },
        {
          "en": "It is strictly twice as wide as the sibling in absolute pixels",
          "vi": "Nó chắc chắn rộng gấp đôi phần tử anh em theo pixel tuyệt đối"
        },
        {
          "en": "It grows twice as fast during animation",
          "vi": "Nó nở to nhanh gấp đôi khi có hiệu ứng animation"
        },
        {
          "en": "It forces the sibling to hide",
          "vi": "Nó ép phần tử anh em bị ẩn đi"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "flex-grow distributes free remaining space proportionally according to item ratios, not total final width.",
        "vi": "flex-grow phân bổ lượng khoảng trống còn thừa theo tỷ lệ, chứ không phải quy định tổng chiều rộng tuyệt đối."
      },
      "topicId": "css_flexbox_items",
      "difficulty": "medium"
    },
    {
      "id": "css_q_10_3",
      "type": "single_choice",
      "question": {
        "en": "Why is `min-width: 0;` frequently required on flex items containing text truncation (`text-overflow: ellipsis`)?",
        "vi": "Tại sao `min-width: 0;` thường xuyên cần phải thêm vào các flex item có chứa chữ cắt dấu 3 chấm (`text-overflow: ellipsis`)?"
      },
      "options": [
        {
          "en": "Flex items have an implicit default `min-width: auto`, which prevents them from shrinking below their content size",
          "vi": "Các flex item có giá trị mặc định là `min-width: auto`, ngăn chúng không thể thu nhỏ dưới kích thước nội dung chữ"
        },
        {
          "en": "It enables smooth animations",
          "vi": "Để kích hoạt chuyển động mượt"
        },
        {
          "en": "It is required to change font colors",
          "vi": "Bắt buộc phải có để đổi màu chữ"
        },
        {
          "en": "It clears browser cache",
          "vi": "Để xóa bộ nhớ cache trình duyệt"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "By default, flex items have `min-width: auto`, meaning the browser refuses to shrink them below their content width. `min-width: 0` removes this restriction.",
        "vi": "Mặc định flex item có `min-width: auto` khiến trình duyệt không cho phép co nhỏ hơn chiều dài của chữ. `min-width: 0` gỡ bỏ rào cản này."
      },
      "topicId": "css_flexbox_items",
      "difficulty": "hard"
    },
    {
      "id": "css_q_10_4",
      "type": "true_false",
      "question": {
        "en": "True or False: The `order` property changes the accessibility tab order and screen reader reading sequence.",
        "vi": "Đúng hay Sai: Thuộc tính `order` làm thay đổi thứ tự nhấn phím Tab và thứ tự đọc của phần mềm hỗ trợ khiếm thị (screen reader)."
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
        "en": "The CSS `order` property only alters visual rendering. Screen readers and keyboard navigation still strictly follow DOM source order.",
        "vi": "Thuộc tính `order` chỉ thay đổi hiển thị thị giác. Phần mềm đọc màn hình và phím Tab vẫn di chuyển đúng theo thứ tự gốc trong mã nguồn HTML."
      },
      "topicId": "css_flexbox_items",
      "difficulty": "medium"
    },
    {
      "id": "css_q_10_5",
      "type": "single_choice",
      "question": {
        "en": "How can you prevent a fixed icon or avatar inside a flex row from shrinking when space gets tight?",
        "vi": "Làm thế nào để ngăn một icon hoặc avatar cố định trong hàng flex không bị bẹp dúm khi màn hình thu hẹp?"
      },
      "options": [
        {
          "en": "flex-shrink: 0;",
          "vi": "flex-shrink: 0;"
        },
        {
          "en": "flex-grow: 1;",
          "vi": "flex-grow: 1;"
        },
        {
          "en": "align-self: center;",
          "vi": "align-self: center;"
        },
        {
          "en": "order: 0;",
          "vi": "order: 0;"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`flex-shrink: 0` forbids the flex algorithm from reducing this item's size below its declared width or flex-basis.",
        "vi": "`flex-shrink: 0` cấm thuật toán flexbox co ép kích thước phần tử nhỏ hơn chiều rộng đã định."
      },
      "topicId": "css_flexbox_items",
      "difficulty": "easy"
    },
    {
      "id": "css_q_10_6",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: To override the container's align-items property for a single specific flex child, use the property align-________",
        "vi": "Điền vào chỗ trống: Để ghi đè thuộc tính align-items của cha cho riêng một phần tử con flex, dùng thuộc tính align-________"
      },
      "fillBlankAnswers": [
        "self"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "align-self controls cross-axis alignment for an individual flex item.",
        "vi": "align-self điều khiển căn lề trục phụ cho riêng một flex item cụ thể."
      },
      "topicId": "css_flexbox_items",
      "difficulty": "easy"
    },
    {
      "id": "css_q_10_7",
      "type": "multiple_choice",
      "question": {
        "en": "Which properties apply specifically to flex items rather than the flex container? (Select all that apply)",
        "vi": "Những thuộc tính nào sau đây áp dụng trực tiếp lên phần tử con (flex item) thay vì container? (Chọn tất cả đáp án đúng)"
      },
      "options": [
        {
          "en": "flex-grow",
          "vi": "flex-grow"
        },
        {
          "en": "flex-basis",
          "vi": "flex-basis"
        },
        {
          "en": "align-self",
          "vi": "align-self"
        },
        {
          "en": "justify-content",
          "vi": "justify-content"
        }
      ],
      "correctAnswers": [
        0,
        1,
        2
      ],
      "explanation": {
        "en": "flex-grow, flex-basis, flex-shrink, align-self, and order are item properties. justify-content is a container property.",
        "vi": "flex-grow, flex-basis, flex-shrink, align-self và order là thuộc tính của item con. justify-content là thuộc tính của thẻ cha container."
      },
      "topicId": "css_flexbox_items",
      "difficulty": "easy"
    },
    {
      "id": "css_q_10_8",
      "type": "single_choice",
      "question": {
        "en": "What is the default value of the `order` property on all flex items?",
        "vi": "Giá trị mặc định của thuộc tính `order` trên tất cả các flex item là bao nhiêu?"
      },
      "options": [
        {
          "en": "0",
          "vi": "0"
        },
        {
          "en": "1",
          "vi": "1"
        },
        {
          "en": "-1",
          "vi": "-1"
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
        "en": "All flex items start with `order: 0`. Setting `order: -1` moves an item before default items; `order: 1` moves it after.",
        "vi": "Tất cả các flex item mặc định có `order: 0`. Đặt `order: -1` sẽ đưa item lên trước các item mặc định; `order: 1` đẩy ra sau."
      },
      "topicId": "css_flexbox_items",
      "difficulty": "medium"
    },
    {
      "id": "css_q_10_9",
      "type": "predict_output",
      "question": {
        "en": "A flex container has 3 children with `flex: 1`, `flex: 1`, and `flex: 2`. How is remaining free space divided?",
        "vi": "Một flex container có 3 con với `flex: 1`, `flex: 1`, và `flex: 2`. Khoảng trống thừa được chia như thế nào?"
      },
      "options": [
        {
          "en": "25%, 25%, and 50% of the free space",
          "vi": "25%, 25%, và 50% lượng khoảng trống thừa"
        },
        {
          "en": "33%, 33%, and 33%",
          "vi": "33%, 33%, và 33%"
        },
        {
          "en": "50%, 50%, and 100%",
          "vi": "50%, 50%, và 100%"
        },
        {
          "en": "The third child gets 100% of the space",
          "vi": "Con thứ 3 nhận 100% khoảng trống"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Total grow units = 1 + 1 + 2 = 4. The distribution is 1/4 (25%), 1/4 (25%), and 2/4 (50%).",
        "vi": "Tổng số phần grow = 1 + 1 + 2 = 4. Tỷ lệ phân chia là 1/4 (25%), 1/4 (25%) và 2/4 (50%)."
      },
      "topicId": "css_flexbox_items",
      "difficulty": "medium"
    },
    {
      "id": "css_q_10_10",
      "type": "true_false",
      "question": {
        "en": "True or False: Setting `margin-left: auto;` on a flex item pushes it and all following siblings all the way to the far right of the flex container.",
        "vi": "Đúng hay Sai: Đặt `margin-left: auto;` cho một flex item sẽ đẩy nó và các phần tử đi sau sang sát tận cùng mép phải của flex container."
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
        "en": "Auto margins in Flexbox consume all available free space on that side, creating a powerful right-align alignment mechanism.",
        "vi": "Auto margin trong Flexbox hấp thụ toàn bộ khoảng trống còn dư phía đó, là mẹo tuyệt vời để đẩy nút đăng nhập hoặc icon về sát mép phải."
      },
      "topicId": "css_flexbox_items",
      "difficulty": "medium"
    }
  ]
};
