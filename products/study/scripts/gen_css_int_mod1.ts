import fs from 'fs';
import path from 'path';

function saveLesson(filePath: string, varName: string, lessonObj: any) {
  const content = `import { Lesson } from '../../../../types';\n\nexport const ${varName}: Lesson = ${JSON.stringify(lessonObj, null, 2)};\n`;
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Saved: ${filePath}`);
}

// Lesson 9: Flexbox I: Container Mechanics & Axis Alignment
const lesson09 = {
  id: "css_lesson_9",
  moduleId: "css_mod_int_1",
  levelId: "intermediate",
  courseId: "css",
  order: 1,
  topicId: "css_flexbox_container",
  title: {
    en: "Flexbox I: Container Mechanics & Axis Alignment",
    vi: "Flexbox I: Cơ Chế Khung Chứa & Căn Chỉnh Đa Trục"
  },
  summary: {
    en: "Master display: flex, main axis vs cross axis, justify-content, align-items, flex-direction, flex-wrap, and the gap property.",
    vi: "Làm chủ display: flex, trục chính main axis và trục phụ cross axis, justify-content, align-items, flex-direction, flex-wrap và thuộc tính gap."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "Flexbox (Flexible Box Layout) is a one-dimensional layout model designed for distributing space and aligning items along a single axis (row or column). Understanding how the main and cross axes flip based on flex-direction is fundamental.",
      vi: "Flexbox (Flexible Box Layout) là mô hình dàn trang 1 chiều được thiết kế để phân bổ khoảng cách và căn chỉnh phần tử dọc theo một trục (hàng ngang hoặc cột dọc). Nắm vững cách trục chính và trục phụ đảo chiều theo flex-direction là nền tảng cốt lõi."
    },
    conceptExplanation: {
      en: "Declaring `display: flex` establishes a flex formatting context. The `flex-direction` property (`row`, `column`, `row-reverse`, `column-reverse`) defines the Main Axis (the direction items flow) and Cross Axis (perpendicular). `justify-content` distributes items along the Main Axis (`flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly`). `align-items` controls alignment along the Cross Axis (`stretch`, `center`, `flex-start`, `flex-end`, `baseline`). `flex-wrap: wrap` allows items to wrap onto multiple lines, while `gap` specifies spacing between flex items without margins.",
      vi: "Khai báo `display: flex` biến phần tử thành khối flex container. Thuộc tính `flex-direction` (`row`, `column`, `row-reverse`, `column-reverse`) xác định Trục Chính Main Axis (chiều dàn trải của các phần tử) và Trục Phụ Cross Axis (chiều vuông góc). `justify-content` phân bổ phần tử dọc theo Trục Chính (`flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly`). `align-items` căn chỉnh dọc theo Trục Phụ (`stretch`, `center`, `flex-start`, `flex-end`, `baseline`). `flex-wrap: wrap` cho phép phần tử rớt xuống dòng khi hết chỗ, còn `gap` tạo khoảng cách đều đặn giữa các item mà không cần dùng margin."
    },
    syntax: `/* Flex Navigation Header */\n.nav-header {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}\n\n/* Wrapped Card Gallery */\n.badge-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}`,
    examples: [
      {
        title: {
          en: "Centering in Both Dimensions (The Holy Grail)",
          vi: "Căn Giữa Tuyệt Đối Cả Hai Trục (The Holy Grail)"
        },
        description: {
          en: "Perfect horizontal and vertical centering with two lines of CSS.",
          vi: "Căn giữa chuẩn xác theo cả chiều ngang và chiều dọc chỉ với 2 dòng CSS."
        },
        code: `.hero-center-box {\n  display: flex;\n  justify-content: center; /* Main axis (X) */\n  align-items: center;     /* Cross axis (Y) */\n  min-height: 300px;\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Confusing justify-content and align-items when flex-direction is set to column.",
          vi: "Nhầm lẫn giữa justify-content và align-items khi đặt flex-direction là column."
        },
        correction: {
          en: "Remember: justify-content always controls the main axis (vertical in column mode), and align-items controls the cross axis (horizontal in column mode).",
          vi: "Ghi nhớ: justify-content luôn điều khiển trục chính (là trục dọc khi ở chế độ column), còn align-items điều khiển trục phụ (trục ngang)."
        }
      }
    ],
    tips: [
      {
        en: "Use gap instead of margins on flex children to avoid unwanted outer margin overhangs.",
        vi: "Dùng gap thay vì margin cho các item con trong flex để không bị dư lề thừa ở phần tử đầu và cuối."
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_9_1",
      type: "complete_code",
      title: {
        en: "Center Child Elements with Flexbox",
        vi: "Căn Giữa Các Phần Tử Con Bằng Flexbox"
      },
      instruction: {
        en: "Add display: flex, justify-content: center, and align-items: center to .center-panel.",
        vi: "Thêm display: flex, justify-content: center và align-items: center vào .center-panel."
      },
      starterCode: `.center-panel {\n  min-height: 200px;\n  /* Center children */\n}`,
      solutionCode: `.center-panel {\n  min-height: 200px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}`,
      hint: {
        en: "Use display: flex; justify-content: center; align-items: center;",
        vi: "Dùng display: flex; justify-content: center; align-items: center;"
      },
      explanation: {
        en: "Flexbox centers items across both axes cleanly without positioning hacks.",
        vi: "Flexbox căn giữa hoàn hảo theo cả 2 chiều mà không cần dùng position hay margin hack."
      }
    },
    {
      id: "css_ex_9_2",
      type: "fix_code",
      title: {
        en: "Fix Space Distribution on Nav Bar",
        vi: "Sửa Phân Bổ Khoảng Cách Cho Thanh Navbar"
      },
      instruction: {
        en: "Change justify-content to space-between and add gap: 16px to .navbar-container.",
        vi: "Đổi justify-content thành space-between và thêm gap: 16px vào .navbar-container."
      },
      starterCode: `.navbar-container {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n}`,
      solutionCode: `.navbar-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}`,
      hint: {
        en: "Change justify-content: flex-start to space-between and add gap: 16px;",
        vi: "Đổi justify-content: flex-start thành space-between và thêm gap: 16px;"
      },
      explanation: {
        en: "space-between pushes the brand logo to the left and links to the right edge.",
        vi: "space-between đẩy logo sang mép trái và menu liên kết sang mép phải."
      }
    }
  ],
  challenge: {
    id: "css_ch_9",
    title: {
      en: "Build a Responsive Flexbox Toolbar",
      vi: "Xây Dựng Thanh Công Cụ Toolbar Bằng Flexbox"
    },
    description: {
      en: "Style .toolbar with display: flex, justify-content: space-between, align-items: center, flex-wrap: wrap, gap: 12px, and padding: 12px 20px.",
      vi: "Tạo kiểu cho .toolbar với display: flex, justify-content: space-between, align-items: center, flex-wrap: wrap, gap: 12px và padding: 12px 20px."
    },
    requirements: [
      { en: "display: flex", vi: "display: flex" },
      { en: "justify-content: space-between", vi: "justify-content: space-between" },
      { en: "align-items: center", vi: "align-items: center" },
      { en: "flex-wrap: wrap", vi: "flex-wrap: wrap" },
      { en: "gap: 12px", vi: "gap: 12px" }
    ],
    starterCode: `.toolbar {\n  /* Add flexbox container styles */\n}`,
    solutionCode: `.toolbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px;\n  padding: 12px 20px;\n}`,
    hints: [
      {
        en: "Declare display: flex, justify-content: space-between, align-items: center, flex-wrap: wrap, and gap: 12px.",
        vi: "Khai báo display: flex, justify-content: space-between, align-items: center, flex-wrap: wrap và gap: 12px."
      }
    ],
    solutionExplanation: {
      en: "Flexbox toolbars wrap naturally on small screens while retaining balanced alignment.",
      vi: "Thanh công cụ Flexbox tự động rớt dòng đẹp mắt trên màn hình hẹp mà vẫn giữ sự thẳng hàng chuẩn mực."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_9_1",
      type: "single_choice",
      question: {
        en: "What is the default value of `flex-direction` on a flex container?",
        vi: "Giá trị mặc định của `flex-direction` trên một flex container là gì?"
      },
      options: [
        { en: "row", vi: "row" },
        { en: "column", vi: "column" },
        { en: "row-reverse", vi: "row-reverse" },
        { en: "auto", vi: "auto" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "By default, flex-direction is 'row', aligning items horizontally from left to right.",
        vi: "Mặc định flex-direction là 'row', dàn các phần tử theo hàng ngang từ trái sang phải."
      },
      topicId: "css_flexbox_container",
      difficulty: "easy"
    },
    {
      id: "css_q_9_2",
      type: "single_choice",
      question: {
        en: "When `flex-direction: column` is set, which axis does `justify-content` control?",
        vi: "Khi đặt `flex-direction: column`, thuộc tính `justify-content` điều khiển trục nào?"
      },
      options: [
        { en: "The vertical axis (which is now the main axis)", vi: "Trục dọc (hiện tại đã trở thành trục chính)" },
        { en: "The horizontal axis", vi: "Trục ngang" },
        { en: "The z-axis depth", vi: "Trục sâu Z" },
        { en: "It is disabled in column mode", vi: "Nó bị vô hiệu hóa ở chế độ column" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "justify-content always governs the Main Axis. When direction is column, the Main Axis runs vertically.",
        vi: "justify-content luôn điều khiển Trục Chính. Khi flex-direction là column, trục chính chạy theo phương thẳng đứng."
      },
      topicId: "css_flexbox_container",
      difficulty: "medium"
    },
    {
      id: "css_q_9_3",
      type: "single_choice",
      question: {
        en: "What is the difference between `space-between` and `space-around` in `justify-content`?",
        vi: "Sự khác biệt giữa `space-between` và `space-around` trong `justify-content` là gì?"
      },
      options: [
        { en: "space-between places no space at the outer edges, whereas space-around places equal half-size space before the first and after the last item", vi: "space-between không để khoảng trống ở 2 mép ngoài, còn space-around tạo khoảng trống bằng một nửa ở 2 đầu" },
        { en: "space-around forces items to wrap", vi: "space-around buộc các item phải xuống dòng" },
        { en: "space-between aligns items vertically", vi: "space-between căn chỉnh các item theo chiều dọc" },
        { en: "They are identical", vi: "Chúng hoàn toàn giống nhau" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "space-between pins the first/last items to the container edges, while space-around gives every item equal surrounding space.",
        vi: "space-between ép item đầu và cuối sát mép ngoài, còn space-around tạo khoảng đệm xung quanh mỗi item."
      },
      topicId: "css_flexbox_container",
      difficulty: "medium"
    },
    {
      id: "css_q_9_4",
      type: "true_false",
      question: {
        en: "True or False: The `gap` property in Flexbox works across both rows and columns in wrapped flex containers.",
        vi: "Đúng hay Sai: Thuộc tính `gap` trong Flexbox hoạt động cho cả khoảng cách hàng và cột khi flex container bị rớt dòng."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "gap: 16px (or row-gap and column-gap) provides consistent spacing between all flex items regardless of wrap state.",
        vi: "gap: 16px (hoặc row-gap và column-gap) phân bổ khoảng trống đều đặn giữa các item cả theo hàng và cột."
      },
      topicId: "css_flexbox_container",
      difficulty: "easy"
    },
    {
      id: "css_q_9_5",
      type: "single_choice",
      question: {
        en: "What is the default value of `align-items` in Flexbox?",
        vi: "Giá trị mặc định của `align-items` trong Flexbox là gì?"
      },
      options: [
        { en: "stretch", vi: "stretch (kéo giãn lấp đầy trục phụ)" },
        { en: "flex-start", vi: "flex-start" },
        { en: "center", vi: "center" },
        { en: "baseline", vi: "baseline" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "By default, align-items is 'stretch', causing flex items to expand to match the height of the tallest item.",
        vi: "Mặc định align-items là 'stretch', khiến các item con tự kéo giãn bằng chiều cao của item cao nhất."
      },
      topicId: "css_flexbox_container",
      difficulty: "easy"
    },
    {
      id: "css_q_9_6",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: To allow flex items to wrap onto multiple lines when container width is exceeded, set flex-wrap: ________",
        vi: "Điền vào chỗ trống: Để cho phép các flex item rớt dòng khi vượt quá chiều rộng container, đặt flex-wrap: ________"
      },
      fillBlankAnswers: ["wrap"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: "flex-wrap: wrap enables multi-line flex containers.",
        vi: "flex-wrap: wrap kích hoạt tính năng tự động xuống dòng nhiều hàng cho flex container."
      },
      topicId: "css_flexbox_container",
      difficulty: "easy"
    },
    {
      id: "css_q_9_7",
      type: "multiple_choice",
      question: {
        en: "Which of the following are valid values for `justify-content`? (Select all that apply)",
        vi: "Những giá trị nào sau đây là hợp lệ cho `justify-content`? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "space-between", vi: "space-between" },
        { en: "space-evenly", vi: "space-evenly" },
        { en: "center", vi: "center" },
        { en: "middle", vi: "middle" }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: "space-between, space-evenly, center, flex-start, and flex-end are valid. 'middle' is not a valid justify-content value.",
        vi: "space-between, space-evenly, center, flex-start và flex-end là hợp lệ. 'middle' không tồn tại trong justify-content."
      },
      topicId: "css_flexbox_container",
      difficulty: "medium"
    },
    {
      id: "css_q_9_8",
      type: "single_choice",
      question: {
        en: "What does `align-items: baseline;` align items to?",
        vi: "`align-items: baseline;` căn chỉnh các phần tử dựa trên điểm nào?"
      },
      options: [
        { en: "The text baseline of the first line of text inside each flex item", vi: "Đường cơ sở (baseline) của dòng chữ đầu tiên bên trong mỗi flex item" },
        { en: "The bottom edge of the container", vi: "Mép đáy của khung chứa" },
        { en: "The vertical center", vi: "Tâm điểm chính giữa theo chiều dọc" },
        { en: "The element's margin box", vi: "Khung margin của phần tử" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "baseline alignment lines up the typographical baseline of text across differently sized items.",
        vi: "baseline căn thẳng hàng các dòng chữ với nhau bất kể các item có cỡ font hay chiều cao khác nhau."
      },
      topicId: "css_flexbox_container",
      difficulty: "medium"
    },
    {
      id: "css_q_9_9",
      type: "true_false",
      question: {
        en: "True or False: `display: inline-flex;` makes the flex container itself behave as an inline element while formatting its children as flex items.",
        vi: "Đúng hay Sai: `display: inline-flex;` làm cho chính khối container hiển thị như thẻ inline trong khi các con bên trong vẫn là flex item."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "inline-flex creates an inline-level box that behaves internally as a flex container.",
        vi: "inline-flex tạo một khối cấp inline ở bên ngoài nhưng bên trong vẫn có toàn bộ sức mạnh dàn trang của flexbox."
      },
      topicId: "css_flexbox_container",
      difficulty: "easy"
    },
    {
      id: "css_q_9_10",
      type: "single_choice",
      question: {
        en: "Which property controls the alignment of lines in a multi-line flex container when there is extra space on the cross axis?",
        vi: "Thuộc tính nào điều khiển khoảng cách giữa các hàng trong một flex container nhiều dòng khi có dư khoảng trống trên trục phụ?"
      },
      options: [
        { en: "align-content", vi: "align-content" },
        { en: "align-items", vi: "align-items" },
        { en: "justify-items", vi: "justify-items" },
        { en: "line-spacing", vi: "line-spacing" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "align-content aligns multiple flex lines along the cross axis (has no effect on single-line flex containers).",
        vi: "align-content căn chỉnh các hàng flex với nhau trên trục phụ (không có tác dụng với container chỉ có 1 dòng)."
      },
      topicId: "css_flexbox_container",
      difficulty: "hard"
    }
  ]
};

// Lesson 10: Flexbox II: Item Sizing & Distribution
const lesson10 = {
  id: "css_lesson_10",
  moduleId: "css_mod_int_1",
  levelId: "intermediate",
  courseId: "css",
  order: 2,
  topicId: "css_flexbox_items",
  title: {
    en: "Flexbox II: Flex Item Sizing & Alignment",
    vi: "Flexbox II: Kích Thước & Phân Bổ Phần Tử Con"
  },
  summary: {
    en: "Master flex-grow, flex-shrink, flex-basis, the flex shorthand, align-self, and order for surgical control over individual flex items.",
    vi: "Làm chủ flex-grow, flex-shrink, flex-basis, cú pháp viết tắt flex, align-self và order để điều khiển chính xác từng phần tử con."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "While container properties manage macro layout, flex item properties (`flex-grow`, `flex-shrink`, `flex-basis`, `align-self`, `order`) dictate how individual children absorb remaining space, compress during overflow, or override alignment.",
      vi: "Nếu các thuộc tính container quản lý bố cục vĩ mô, thì các thuộc tính phần tử con (`flex-grow`, `flex-shrink`, `flex-basis`, `align-self`, `order`) quyết định cách từng item hấp thụ khoảng trống thừa, co lại khi thiếu diện tích hoặc ghi đè căn lề."
    },
    conceptExplanation: {
      en: "`flex-basis` sets the default starting size of the item along the main axis before free space is distributed. `flex-grow` (default 0) specifies the proportion of leftover positive space this item will consume. `flex-shrink` (default 1) specifies the rate at which this item will shrink when space is insufficient. The standard shorthand is `flex: <grow> <shrink> <basis>` (e.g. `flex: 1 1 0%` or `flex: 1` for equal flexible columns; `flex: 0 0 auto` for fixed-width sidebars). `align-self` allows an individual child to override the container's `align-items`. `order` visually reorders items without altering DOM order.",
      vi: "`flex-basis` đặt kích thước khởi tạo ban đầu dọc theo trục chính trước khi phân chia khoảng trống thừa. `flex-grow` (mặc định 0) quy định tỷ lệ hấp thụ khoảng trống còn dư. `flex-shrink` (mặc định 1) quy định tỷ lệ co lại khi khung chứa bị thiếu chỗ. Cú pháp viết tắt chuẩn là `flex: <grow> <shrink> <basis>` (ví dụ `flex: 1 1 0%` hoặc `flex: 1` để chia cột đều nhau; `flex: 0 0 auto` cho sidebar kích thước cố định). `align-self` cho phép một phần tử con tự đổi căn lề riêng biệt. `order` thay đổi thứ tự hiển thị thị giác mà không làm đảo lộn cấu trúc DOM."
    },
    syntax: `/* Standard Sidebar + Main Content Layout */\n.sidebar {\n  flex: 0 0 260px; /* Fixed 260px, never shrinks or grows */\n}\n\n.main-content {\n  flex: 1 1 0%;   /* Takes all remaining space */\n}\n\n/* Override alignment on single item */\n.btn-logout {\n  align-self: flex-end;\n}`,
    examples: [
      {
        title: {
          en: "Input with Expandable Search Bar and Fixed Button",
          vi: "Thanh Tìm Kiếm Tự Co Giãn Kèm Nút Cố Định"
        },
        description: {
          en: "Search input grows to fill available space while action button maintains intrinsic width.",
          vi: "Ô tìm kiếm tự động nở rộng chiếm trọn không gian trong khi nút bấm giữ nguyên kích thước nội dung."
        },
        code: `.search-group {\n  display: flex;\n  gap: 8px;\n}\n\n.search-input {\n  flex: 1 1 auto; /* Expands to fill space */\n}\n\n.search-button {\n  flex: 0 0 auto; /* Stays at exact intrinsic size */\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Using flex: 1 without understanding it sets flex-basis: 0%, which can unexpectedly compress elements with intrinsic minimum widths.",
          vi: "Dùng flex: 1 mà không hiểu nó đặt flex-basis: 0%, có thể gây bẹp các phần tử có chiều rộng tối thiểu."
        },
        correction: {
          en: "Add min-width: 0 on flex children if text inside flex: 1 refuses to truncate or wrap.",
          vi: "Thêm min-width: 0 cho phần tử flex con nếu văn bản bên trong flex: 1 không chịu cắt dấu ba chấm hoặc tràn chữ."
        }
      }
    ],
    tips: [
      {
        en: "Always set min-width: 0 on flex children containing text truncation (ellipsis) to override default min-width: auto.",
        vi: "Luôn đặt min-width: 0 cho các flex item chứa chữ cắt dấu 3 chấm để ghi đè giá trị mặc định min-width: auto của trình duyệt."
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_10_1",
      type: "complete_code",
      title: {
        en: "Create a Flexible Main Column",
        vi: "Tạo Cột Nội Dung Co Giãn Linh Hoạt"
      },
      instruction: {
        en: "Set flex: 1 1 0% on .main-view and flex: 0 0 280px on .sidebar-view.",
        vi: "Đặt flex: 1 1 0% cho .main-view và flex: 0 0 280px cho .sidebar-view."
      },
      starterCode: `.sidebar-view {\n  /* Fixed 280px */\n}\n\n.main-view {\n  /* Flexible full space */\n}`,
      solutionCode: `.sidebar-view {\n  flex: 0 0 280px;\n}\n\n.main-view {\n  flex: 1 1 0%;\n}`,
      hint: {
        en: "Use flex: 0 0 280px; and flex: 1 1 0%;",
        vi: "Dùng flex: 0 0 280px; và flex: 1 1 0%;"
      },
      explanation: {
        en: "flex: 0 0 280px locks the sidebar width while flex: 1 1 0% expands the main view.",
        vi: "flex: 0 0 280px khóa cứng chiều rộng sidebar còn flex: 1 1 0% giúp vùng chính co giãn tối đa."
      }
    },
    {
      id: "css_ex_10_2",
      type: "fix_code",
      title: {
        en: "Override Individual Item Alignment",
        vi: "Ghi Đè Căn Lề Cho Riêng Một Phần Tử Con"
      },
      instruction: {
        en: "Add align-self: flex-end to .action-cta so it pins to the bottom of the card while others stretch.",
        vi: "Thêm align-self: flex-end vào .action-cta để nó dạt xuống đáy card trong khi các item khác giữ nguyên."
      },
      starterCode: `.action-cta {\n  background: #3b82f6;\n}`,
      solutionCode: `.action-cta {\n  align-self: flex-end;\n  background: #3b82f6;\n}`,
      hint: {
        en: "Add align-self: flex-end;",
        vi: "Thêm align-self: flex-end;"
      },
      explanation: {
        en: "align-self overrides the parent container's align-items property for a specific child.",
        vi: "align-self ghi đè thuộc tính align-items của thẻ cha đối với riêng phần tử con này."
      }
    }
  ],
  challenge: {
    id: "css_ch_10",
    title: {
      en: "Build an App Layout with Flexible Workspace",
      vi: "Xây Dựng Bố Cục Ứng Dụng Với Không Gian Làm Việc Co Giãn"
    },
    description: {
      en: "Style .app-shell with display: flex. Style .app-sidebar with flex: 0 0 250px. Style .app-workspace with flex: 1 1 auto and min-width: 0.",
      vi: "Tạo kiểu .app-shell với display: flex. Tạo kiểu .app-sidebar với flex: 0 0 250px. Tạo kiểu .app-workspace với flex: 1 1 auto và min-width: 0."
    },
    requirements: [
      { en: ".app-shell { display: flex }", vi: ".app-shell { display: flex }" },
      { en: "flex: 0 0 250px", vi: "flex: 0 0 250px" },
      { en: "flex: 1 1 auto", vi: "flex: 1 1 auto" },
      { en: "min-width: 0", vi: "min-width: 0" }
    ],
    starterCode: `/* App layout styles */\n.app-shell {\n}\n\n.app-sidebar {\n}\n\n.app-workspace {\n}`,
    solutionCode: `.app-shell {\n  display: flex;\n}\n\n.app-sidebar {\n  flex: 0 0 250px;\n}\n\n.app-workspace {\n  flex: 1 1 auto;\n  min-width: 0;\n}`,
    hints: [
      {
        en: "Apply display: flex on shell, flex: 0 0 250px on sidebar, and flex: 1 1 auto with min-width: 0 on workspace.",
        vi: "Đặt display: flex cho shell, flex: 0 0 250px cho sidebar và flex: 1 1 auto kèm min-width: 0 cho workspace."
      }
    ],
    solutionExplanation: {
      en: "min-width: 0 ensures flexible containers allow inner content to shrink without blowing out layouts.",
      vi: "min-width: 0 đảm bảo khung co giãn cho phép nội dung con thu nhỏ mượt mà không làm vỡ khung hình."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_10_1",
      type: "single_choice",
      question: {
        en: "What does the shorthand `flex: 1;` expand to in CSS?",
        vi: "Cú pháp viết tắt `flex: 1;` tương đương với khai báo đầy đủ nào trong CSS?"
      },
      options: [
        { en: "flex: 1 1 0% (flex-grow: 1, flex-shrink: 1, flex-basis: 0%)", vi: "flex: 1 1 0% (flex-grow: 1, flex-shrink: 1, flex-basis: 0%)" },
        { en: "flex: 1 0 auto", vi: "flex: 1 0 auto" },
        { en: "flex: 0 1 auto", vi: "flex: 0 1 auto" },
        { en: "flex: 1 0 100px", vi: "flex: 1 0 100px" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "In modern CSS specifications, `flex: 1` sets grow to 1, shrink to 1, and basis to 0%.",
        vi: "Theo đặc tả CSS hiện đại, `flex: 1` đặt grow = 1, shrink = 1 và basis = 0%."
      },
      topicId: "css_flexbox_items",
      difficulty: "easy"
    },
    {
      id: "css_q_10_2",
      type: "single_choice",
      question: {
        en: "What does `flex-grow: 2;` mean relative to a sibling with `flex-grow: 1;`?",
        vi: "`flex-grow: 2;` có ý nghĩa như thế nào so với phần tử anh em có `flex-grow: 1;`?"
      },
      options: [
        { en: "It receives twice as much of the remaining available free space as the sibling", vi: "Nó sẽ nhận gấp đôi lượng khoảng trống còn dư so với phần tử anh em" },
        { en: "It is strictly twice as wide as the sibling in absolute pixels", vi: "Nó chắc chắn rộng gấp đôi phần tử anh em theo pixel tuyệt đối" },
        { en: "It grows twice as fast during animation", vi: "Nó nở to nhanh gấp đôi khi có hiệu ứng animation" },
        { en: "It forces the sibling to hide", vi: "Nó ép phần tử anh em bị ẩn đi" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "flex-grow distributes free remaining space proportionally according to item ratios, not total final width.",
        vi: "flex-grow phân bổ lượng khoảng trống còn thừa theo tỷ lệ, chứ không phải quy định tổng chiều rộng tuyệt đối."
      },
      topicId: "css_flexbox_items",
      difficulty: "medium"
    },
    {
      id: "css_q_10_3",
      type: "single_choice",
      question: {
        en: "Why is `min-width: 0;` frequently required on flex items containing text truncation (`text-overflow: ellipsis`)?",
        vi: "Tại sao `min-width: 0;` thường xuyên cần phải thêm vào các flex item có chứa chữ cắt dấu 3 chấm (`text-overflow: ellipsis`)?"
      },
      options: [
        { en: "Flex items have an implicit default `min-width: auto`, which prevents them from shrinking below their content size", vi: "Các flex item có giá trị mặc định là `min-width: auto`, ngăn chúng không thể thu nhỏ dưới kích thước nội dung chữ" },
        { en: "It enables smooth animations", vi: "Để kích hoạt chuyển động mượt" },
        { en: "It is required to change font colors", vi: "Bắt buộc phải có để đổi màu chữ" },
        { en: "It clears browser cache", vi: "Để xóa bộ nhớ cache trình duyệt" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "By default, flex items have `min-width: auto`, meaning the browser refuses to shrink them below their content width. `min-width: 0` removes this restriction.",
        vi: "Mặc định flex item có `min-width: auto` khiến trình duyệt không cho phép co nhỏ hơn chiều dài của chữ. `min-width: 0` gỡ bỏ rào cản này."
      },
      topicId: "css_flexbox_items",
      difficulty: "hard"
    },
    {
      id: "css_q_10_4",
      type: "true_false",
      question: {
        en: "True or False: The `order` property changes the accessibility tab order and screen reader reading sequence.",
        vi: "Đúng hay Sai: Thuộc tính `order` làm thay đổi thứ tự nhấn phím Tab và thứ tự đọc của phần mềm hỗ trợ khiếm thị (screen reader)."
      },
      options: [
        { en: "False", vi: "Sai" },
        { en: "True", vi: "Đúng" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "The CSS `order` property only alters visual rendering. Screen readers and keyboard navigation still strictly follow DOM source order.",
        vi: "Thuộc tính `order` chỉ thay đổi hiển thị thị giác. Phần mềm đọc màn hình và phím Tab vẫn di chuyển đúng theo thứ tự gốc trong mã nguồn HTML."
      },
      topicId: "css_flexbox_items",
      difficulty: "medium"
    },
    {
      id: "css_q_10_5",
      type: "single_choice",
      question: {
        en: "How can you prevent a fixed icon or avatar inside a flex row from shrinking when space gets tight?",
        vi: "Làm thế nào để ngăn một icon hoặc avatar cố định trong hàng flex không bị bẹp dúm khi màn hình thu hẹp?"
      },
      options: [
        { en: "flex-shrink: 0;", vi: "flex-shrink: 0;" },
        { en: "flex-grow: 1;", vi: "flex-grow: 1;" },
        { en: "align-self: center;", vi: "align-self: center;" },
        { en: "order: 0;", vi: "order: 0;" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`flex-shrink: 0` forbids the flex algorithm from reducing this item's size below its declared width or flex-basis.",
        vi: "`flex-shrink: 0` cấm thuật toán flexbox co ép kích thước phần tử nhỏ hơn chiều rộng đã định."
      },
      topicId: "css_flexbox_items",
      difficulty: "easy"
    },
    {
      id: "css_q_10_6",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: To override the container's align-items property for a single specific flex child, use the property align-________",
        vi: "Điền vào chỗ trống: Để ghi đè thuộc tính align-items của cha cho riêng một phần tử con flex, dùng thuộc tính align-________"
      },
      fillBlankAnswers: ["self"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: "align-self controls cross-axis alignment for an individual flex item.",
        vi: "align-self điều khiển căn lề trục phụ cho riêng một flex item cụ thể."
      },
      topicId: "css_flexbox_items",
      difficulty: "easy"
    },
    {
      id: "css_q_10_7",
      type: "multiple_choice",
      question: {
        en: "Which properties apply specifically to flex items rather than the flex container? (Select all that apply)",
        vi: "Những thuộc tính nào sau đây áp dụng trực tiếp lên phần tử con (flex item) thay vì container? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "flex-grow", vi: "flex-grow" },
        { en: "flex-basis", vi: "flex-basis" },
        { en: "align-self", vi: "align-self" },
        { en: "justify-content", vi: "justify-content" }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: "flex-grow, flex-basis, flex-shrink, align-self, and order are item properties. justify-content is a container property.",
        vi: "flex-grow, flex-basis, flex-shrink, align-self và order là thuộc tính của item con. justify-content là thuộc tính của thẻ cha container."
      },
      topicId: "css_flexbox_items",
      difficulty: "easy"
    },
    {
      id: "css_q_10_8",
      type: "single_choice",
      question: {
        en: "What is the default value of the `order` property on all flex items?",
        vi: "Giá trị mặc định của thuộc tính `order` trên tất cả các flex item là bao nhiêu?"
      },
      options: [
        { en: "0", vi: "0" },
        { en: "1", vi: "1" },
        { en: "-1", vi: "-1" },
        { en: "auto", vi: "auto" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "All flex items start with `order: 0`. Setting `order: -1` moves an item before default items; `order: 1` moves it after.",
        vi: "Tất cả các flex item mặc định có `order: 0`. Đặt `order: -1` sẽ đưa item lên trước các item mặc định; `order: 1` đẩy ra sau."
      },
      topicId: "css_flexbox_items",
      difficulty: "medium"
    },
    {
      id: "css_q_10_9",
      type: "predict_output",
      question: {
        en: "A flex container has 3 children with `flex: 1`, `flex: 1`, and `flex: 2`. How is remaining free space divided?",
        vi: "Một flex container có 3 con với `flex: 1`, `flex: 1`, và `flex: 2`. Khoảng trống thừa được chia như thế nào?"
      },
      options: [
        { en: "25%, 25%, and 50% of the free space", vi: "25%, 25%, và 50% lượng khoảng trống thừa" },
        { en: "33%, 33%, and 33%", vi: "33%, 33%, và 33%" },
        { en: "50%, 50%, and 100%", vi: "50%, 50%, và 100%" },
        { en: "The third child gets 100% of the space", vi: "Con thứ 3 nhận 100% khoảng trống" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Total grow units = 1 + 1 + 2 = 4. The distribution is 1/4 (25%), 1/4 (25%), and 2/4 (50%).",
        vi: "Tổng số phần grow = 1 + 1 + 2 = 4. Tỷ lệ phân chia là 1/4 (25%), 1/4 (25%) và 2/4 (50%)."
      },
      topicId: "css_flexbox_items",
      difficulty: "medium"
    },
    {
      id: "css_q_10_10",
      type: "true_false",
      question: {
        en: "True or False: Setting `margin-left: auto;` on a flex item pushes it and all following siblings all the way to the far right of the flex container.",
        vi: "Đúng hay Sai: Đặt `margin-left: auto;` cho một flex item sẽ đẩy nó và các phần tử đi sau sang sát tận cùng mép phải của flex container."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Auto margins in Flexbox consume all available free space on that side, creating a powerful right-align alignment mechanism.",
        vi: "Auto margin trong Flexbox hấp thụ toàn bộ khoảng trống còn dư phía đó, là mẹo tuyệt vời để đẩy nút đăng nhập hoặc icon về sát mép phải."
      },
      topicId: "css_flexbox_items",
      difficulty: "medium"
    }
  ]
};

// Lesson 11: CSS Grid I: Two-Dimensional Tracks & Named Areas
const lesson11 = {
  id: "css_lesson_11",
  moduleId: "css_mod_int_1",
  levelId: "intermediate",
  courseId: "css",
  order: 3,
  topicId: "css_grid_basics",
  title: {
    en: "CSS Grid I: Two-Dimensional Tracks & Named Areas",
    vi: "CSS Grid I: Hệ Lưới 2 Chiều & Phân Vùng grid-template-areas"
  },
  summary: {
    en: "Master display: grid, column/row tracks, the fr fractional unit, gap, explicit vs implicit grids, and grid-template-areas.",
    vi: "Làm chủ display: grid, tạo track hàng và cột, đơn vị phân số fr, gap, lưới tường minh vs ngầm định và phân vùng grid-template-areas."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "CSS Grid is a true two-dimensional layout engine, capable of orchestrating simultaneous alignment across rows and columns. It replaces fragile float-based and nested flexbox systems with structured grid tracks.",
      vi: "CSS Grid là công cụ dàn trang 2 chiều thực thụ, có khả năng điều phối đồng thời cả hàng ngang và cột dọc. Nó thay thế hoàn toàn các hệ thống lồng ghép flexbox phức tạp bằng hệ thống lưới có cấu trúc chặt chẽ."
    },
    conceptExplanation: {
      en: "Declare `display: grid` to establish a grid container. Define column and row tracks with `grid-template-columns` and `grid-template-rows`. The `fr` (fractional) unit represents a fraction of available space after fixed units and gaps are allocated. `gap` (or `row-gap` and `column-gap`) defines spacing between tracks. `grid-template-areas` allows you to visually sketch layouts using named text strings (e.g. `'header header' 'sidebar main' 'footer footer'`), and assign child elements using `grid-area: header`.",
      vi: "Khai báo `display: grid` để biến phần tử thành grid container. Định nghĩa các cột và hàng bằng `grid-template-columns` và `grid-template-rows`. Đơn vị `fr` (fractional) đại diện cho một phần tỷ lệ của khoảng trống còn lại sau khi trừ đi các đơn vị cố định và gap. `gap` tạo rãnh ngăn cách giữa các track. `grid-template-areas` cho phép bạn phác thảo trực quan bố cục trang bằng các chuỗi tên (ví dụ `'header header' 'sidebar main' 'footer footer'`), rồi gán các con vào bằng `grid-area: header`."
    },
    syntax: `/* 3-column grid with fractional units */\n.dashboard-grid {\n  display: grid;\n  grid-template-columns: 240px 1fr 300px;\n  gap: 20px;\n}\n\n/* Visual Named Areas Layout */\n.app-layout {\n  display: grid;\n  grid-template-areas:\n    "header header"\n    "nav    main"\n    "footer footer";\n  grid-template-columns: 200px 1fr;\n}\n\n.app-header { grid-area: header; }\n.app-nav    { grid-area: nav; }\n.app-main   { grid-area: main; }\n.app-footer { grid-area: footer; }`,
    examples: [
      {
        title: {
          en: "Holy Grail Layout with Named Grid Areas",
          vi: "Bố Cục Trang Web Chuẩn Holy Grail Bằng Grid Areas"
        },
        description: {
          en: "Builds a complete application frame with header, nav, main content, and footer.",
          vi: "Xây dựng khung ứng dụng hoàn chỉnh gồm header, nav bên trái, nội dung chính và footer."
        },
        code: `.page-shell {\n  display: grid;\n  grid-template-areas:\n    "head head"\n    "side content"\n    "foot foot";\n  grid-template-columns: 220px 1fr;\n  grid-template-rows: 60px 1fr 50px;\n  min-height: 100vh;\n  gap: 16px;\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Mismatched column counts in grid-template-areas strings causing the entire grid definition to fail silently.",
          vi: "Số lượng cột không khớp giữa các hàng trong chuỗi grid-template-areas khiến toàn bộ lưới bị vô hiệu hóa trong im lặng."
        },
        correction: {
          en: "Ensure every row string in grid-template-areas has the exact same number of named cells.",
          vi: "Đảm bảo mỗi hàng trong grid-template-areas phải có chính xác cùng số lượng ô tên đại diện."
        }
      }
    ],
    tips: [
      {
        en: "Use dot ('.') in grid-template-areas to denote an empty/unassigned grid cell.",
        vi: "Dùng dấu chấm ('.') trong grid-template-areas để đại diện cho một ô lưới trống không gán nội dung."
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_11_1",
      type: "complete_code",
      title: {
        en: "Create a 3-Column Equal Grid",
        vi: "Tạo Lưới 3 Cột Bằng Nhau"
      },
      instruction: {
        en: "Set display: grid, grid-template-columns: 1fr 1fr 1fr, and gap: 16px on .card-grid.",
        vi: "Đặt display: grid, grid-template-columns: 1fr 1fr 1fr và gap: 16px cho .card-grid."
      },
      starterCode: `.card-grid {\n  /* Define 3-column grid */\n}`,
      solutionCode: `.card-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px;\n}`,
      hint: {
        en: "Use display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;",
        vi: "Dùng display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;"
      },
      explanation: {
        en: "1fr 1fr 1fr splits the container into three perfectly equal columns with 16px spacing.",
        vi: "1fr 1fr 1fr chia khung chứa thành 3 cột bằng nhau tuyệt đối với khoảng cách 16px."
      }
    },
    {
      id: "css_ex_11_2",
      type: "fix_code",
      title: {
        en: "Assign Child to Named Grid Area",
        vi: "Gán Phần Tử Con Vào Vùng Lưới Đã Đặt Tên"
      },
      instruction: {
        en: "Assign grid-area: sidebar to .aside-panel and grid-area: main to .content-panel.",
        vi: "Gán grid-area: sidebar cho .aside-panel và grid-area: main cho .content-panel."
      },
      starterCode: `.aside-panel {\n  /* Assign sidebar area */\n}\n\n.content-panel {\n  /* Assign main area */\n}`,
      solutionCode: `.aside-panel {\n  grid-area: sidebar;\n}\n\n.content-panel {\n  grid-area: main;\n}`,
      hint: {
        en: "Use grid-area: sidebar; and grid-area: main;",
        vi: "Dùng grid-area: sidebar; và grid-area: main;"
      },
      explanation: {
        en: "grid-area places children into the coordinates defined by parent's grid-template-areas.",
        vi: "grid-area đặt phần tử con vào đúng tọa độ tương ứng trên grid-template-areas của thẻ cha."
      }
    }
  ],
  challenge: {
    id: "css_ch_11",
    title: {
      en: "Build an Analytics Dashboard Grid Shell",
      vi: "Xây Dựng Khung Lưới Bảng Điều Khiển Phân Tích"
    },
    description: {
      en: "Style .dashboard-shell with display: grid, grid-template-columns: 240px 1fr, grid-template-rows: 64px 1fr, gap: 16px, and min-height: 100vh.",
      vi: "Tạo kiểu cho .dashboard-shell với display: grid, grid-template-columns: 240px 1fr, grid-template-rows: 64px 1fr, gap: 16px và min-height: 100vh."
    },
    requirements: [
      { en: "display: grid", vi: "display: grid" },
      { en: "grid-template-columns: 240px 1fr", vi: "grid-template-columns: 240px 1fr" },
      { en: "grid-template-rows: 64px 1fr", vi: "grid-template-rows: 64px 1fr" },
      { en: "gap: 16px", vi: "gap: 16px" }
    ],
    starterCode: `.dashboard-shell {\n  /* Add 2D grid definitions */\n}`,
    solutionCode: `.dashboard-shell {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  grid-template-rows: 64px 1fr;\n  gap: 16px;\n  min-height: 100vh;\n}`,
    hints: [
      {
        en: "Define display: grid, grid-template-columns, grid-template-rows, and gap inside .dashboard-shell.",
        vi: "Khai báo display: grid, grid-template-columns, grid-template-rows và gap trong .dashboard-shell."
      }
    ],
    solutionExplanation: {
      en: "2D CSS Grid creates robust full-height enterprise dashboard shells with fixed sidebars and fluid workspaces.",
      vi: "CSS Grid 2 chiều tạo nên khung dashboard doanh nghiệp chuẩn mực với sidebar cố định và không gian làm việc co giãn."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_11_1",
      type: "single_choice",
      question: {
        en: "What does the `1fr` unit represent in CSS Grid?",
        vi: "Đơn vị `1fr` đại diện cho điều gì trong CSS Grid?"
      },
      options: [
        { en: "One fraction of the leftover available free space inside the grid container", vi: "Một phần phân số của lượng khoảng trống còn dư bên trong grid container" },
        { en: "One frame rate animation interval", vi: "Một chu kỳ khung hình animation" },
        { en: "One font root size", vi: "Một đơn vị cỡ chữ gốc font" },
        { en: "100 pixels fixed width", vi: "100 pixel chiều rộng cố định" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "The `fr` (fractional) unit divides available space among tracks after fixed pixels, percentages, and gaps are calculated.",
        vi: "Đơn vị `fr` chia đều khoảng trống còn lại giữa các track sau khi đã tính xong các kích thước cố định và gap."
      },
      topicId: "css_grid_basics",
      difficulty: "easy"
    },
    {
      id: "css_q_11_2",
      type: "single_choice",
      question: {
        en: "In `grid-template-areas`, how do you leave a grid cell empty/unoccupied?",
        vi: "Trong `grid-template-areas`, làm thế nào để để trống một ô lưới không gán phần tử nào?"
      },
      options: [
        { en: "Use a period/dot ('.')", vi: "Sử dụng dấu chấm ('.')" },
        { en: "Use the keyword 'empty'", vi: "Dùng từ khóa 'empty'" },
        { en: "Leave a blank space", vi: "Để một khoảng trắng" },
        { en: "Use 'null'", vi: "Dùng từ khóa 'null'" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "A dot (`.`) or series of dots (`...`) in `grid-template-areas` represents an unnamed, empty grid cell.",
        vi: "Dấu chấm (`.`) trong `grid-template-areas` đại diện cho một ô lưới trống không có tên."
      },
      topicId: "css_grid_basics",
      difficulty: "medium"
    },
    {
      id: "css_q_11_3",
      type: "true_false",
      question: {
        en: "True or False: Every row string in `grid-template-areas` must have the exact same number of cell tokens.",
        vi: "Đúng hay Sai: Mỗi chuỗi hàng trong `grid-template-areas` bắt buộc phải có chính xác cùng số lượng ô token."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "If row strings have unequal column counts, the entire grid-template-areas declaration is considered invalid and ignored.",
        vi: "Nếu các hàng có số lượng cột không đều nhau, toàn bộ khai báo grid-template-areas sẽ bị coi là không hợp lệ và bị bỏ qua."
      },
      topicId: "css_grid_basics",
      difficulty: "medium"
    },
    {
      id: "css_q_11_4",
      type: "single_choice",
      question: {
        en: "What is the difference between explicit grid tracks and implicit grid tracks?",
        vi: "Sự khác biệt giữa explicit grid tracks (lưới tường minh) và implicit grid tracks (lưới ngầm định) là gì?"
      },
      options: [
        { en: "Explicit tracks are defined via grid-template-*, while implicit tracks are created automatically by the browser when items overflow", vi: "Lưới tường minh được định nghĩa qua grid-template-*, còn lưới ngầm định do trình duyệt tự tạo ra khi có phần tử tràn thêm" },
        { en: "Explicit tracks only work in Chrome", vi: "Lưới tường minh chỉ chạy trên Chrome" },
        { en: "Implicit tracks cannot have gaps", vi: "Lưới ngầm định không thể có gap" },
        { en: "They are completely identical", vi: "Chúng hoàn toàn giống hệt nhau" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Explicit tracks are declared with grid-template-columns/rows. When more items exist than cells, the browser auto-creates implicit tracks (controlled by `grid-auto-rows`/`grid-auto-columns`).",
        vi: "Lưới tường minh được lập trình qua grid-template. Khi có nhiều item hơn số ô đã khai báo, trình duyệt tự sinh thêm các hàng ngầm định (điều khiển bởi `grid-auto-rows`)."
      },
      topicId: "css_grid_basics",
      difficulty: "hard"
    },
    {
      id: "css_q_11_5",
      type: "single_choice",
      question: {
        en: "Which property sets the default height of implicitly created grid rows?",
        vi: "Thuộc tính nào thiết lập chiều cao mặc định cho các hàng lưới được tạo tự động ngầm định?"
      },
      options: [
        { en: "grid-auto-rows", vi: "grid-auto-rows" },
        { en: "grid-implicit-height", vi: "grid-implicit-height" },
        { en: "row-auto-size", vi: "row-auto-size" },
        { en: "grid-default-rows", vi: "grid-default-rows" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`grid-auto-rows: minmax(100px, auto);` specifies the track size for implicitly generated rows.",
        vi: "`grid-auto-rows` chỉ định kích thước cho các hàng tự động sinh ra khi phần tử tràn lưới."
      },
      topicId: "css_grid_basics",
      difficulty: "medium"
    },
    {
      id: "css_q_11_6",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: To assign a child element to a named area defined in the parent's template, use the property grid-________",
        vi: "Điền vào chỗ trống: Để gán một phần tử con vào vùng tên đã định nghĩa ở thẻ cha, dùng thuộc tính grid-________"
      },
      fillBlankAnswers: ["area"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: "grid-area: <name> binds the element to that named grid region.",
        vi: "grid-area: <name> liên kết phần tử con vào phân vùng lưới tương ứng."
      },
      topicId: "css_grid_basics",
      difficulty: "easy"
    },
    {
      id: "css_q_11_7",
      type: "multiple_choice",
      question: {
        en: "Which of the following are valid `grid-template-columns` definitions? (Select all that apply)",
        vi: "Những khai báo `grid-template-columns` nào sau đây là hợp lệ? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "grid-template-columns: 200px 1fr 2fr;", vi: "grid-template-columns: 200px 1fr 2fr;" },
        { en: "grid-template-columns: 30% 70%;", vi: "grid-template-columns: 30% 70%;" },
        { en: "grid-template-columns: auto 1fr auto;", vi: "grid-template-columns: auto 1fr auto;" },
        { en: "grid-template-columns: divide(3);", vi: "grid-template-columns: divide(3);" }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: "Pixels, fr, percentages, and auto are valid track sizing functions. divide() does not exist in CSS.",
        vi: "Pixel, fr, phần trăm và auto đều hợp lệ. divide() không tồn tại trong CSS."
      },
      topicId: "css_grid_basics",
      difficulty: "easy"
    },
    {
      id: "css_q_11_8",
      type: "single_choice",
      question: {
        en: "In CSS Grid, how are grid lines numbered by default?",
        vi: "Trong CSS Grid, các đường line kẻ lưới được đánh số thứ tự như thế nào theo mặc định?"
      },
      options: [
        { en: "Starting at 1 from the outer edge, incrementing by 1 for each line", vi: "Bắt đầu từ số 1 ở mép ngoài cùng và tăng dần 1 đơn vị qua từng đường kẻ" },
        { en: "Starting at 0 from the center", vi: "Bắt đầu từ số 0 ở tâm chính giữa" },
        { en: "Using letters (A, B, C...)", vi: "Dùng các chữ cái (A, B, C...)" },
        { en: "Grid lines do not have numbers", vi: "Các đường line không có số" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Grid lines are 1-indexed (1, 2, 3...) from start to end, and negative (-1, -2...) from end to start.",
        vi: "Đường kẻ lưới đánh số từ 1 (1, 2, 3...) từ đầu đến cuối, và số âm (-1, -2...) tính ngược từ mép cuối về."
      },
      topicId: "css_grid_basics",
      difficulty: "medium"
    },
    {
      id: "css_q_11_9",
      type: "predict_output",
      question: {
        en: "A grid container has `grid-template-columns: 100px 1fr 1fr;` and total width 500px with no gaps. What is the width of the second column?",
        vi: "Lưới có `grid-template-columns: 100px 1fr 1fr;` và tổng rộng 500px không gap. Cột thứ hai rộng bao nhiêu?"
      },
      options: [
        { en: "200px ((500 - 100) / 2)", vi: "200px ((500 - 100) / 2)" },
        { en: "250px", vi: "250px" },
        { en: "100px", vi: "100px" },
        { en: "150px", vi: "150px" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Remaining space = 500px - 100px = 400px. Two equal 1fr tracks receive 400px / 2 = 200px each.",
        vi: "Khoảng trống còn lại = 500px - 100px = 400px. Hai cột 1fr chia đôi: 400px / 2 = 200px mỗi cột."
      },
      topicId: "css_grid_basics",
      difficulty: "easy"
    },
    {
      id: "css_q_11_10",
      type: "true_false",
      question: {
        en: "True or False: Grid items can overlap each other on the same grid cell without breaking the grid structure.",
        vi: "Đúng hay Sai: Các phần tử trong Grid có thể xếp chồng đè lên nhau trên cùng một ô lưới mà không làm hỏng cấu trúc lưới."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Grid items can share the same grid line coordinates or grid area, controlled via z-index for layering.",
        vi: "Các phần tử Grid có thể cùng gán chung tọa độ ô để tạo hiệu ứng xếp chồng lớp và điều khiển bằng z-index."
      },
      topicId: "css_grid_basics",
      difficulty: "medium"
    }
  ]
};

// Lesson 12: CSS Grid II: Dynamic & Responsive Patterns
const lesson12 = {
  id: "css_lesson_12",
  moduleId: "css_mod_int_1",
  levelId: "intermediate",
  courseId: "css",
  order: 4,
  topicId: "css_grid_responsive",
  title: {
    en: "CSS Grid II: Dynamic & Responsive Patterns",
    vi: "CSS Grid II: Mẫu Dàn Trang Động & Tự Động Đáp Ứng"
  },
  summary: {
    en: "Master repeat(), minmax(), auto-fill vs auto-fit, line-based placement (grid-column: 1 / -1), and building zero-media-query responsive grids.",
    vi: "Làm chủ repeat(), minmax(), phân biệt auto-fill vs auto-fit, định vị theo đường line (grid-column: 1 / -1) và tạo lưới co giãn không cần media query."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "The combination of `repeat()`, `minmax()`, and auto-placement keywords (`auto-fill`, `auto-fit`) enables the 'Holy Grail' of modern CSS: fully responsive, wrapping card grids that adapt seamlessly to any screen width without writing a single `@media` query.",
      vi: "Sự kết hợp giữa hàm `repeat()`, `minmax()` và các từ khóa tự động sắp xếp (`auto-fill`, `auto-fit`) mang lại đỉnh cao của CSS hiện đại: hệ thống lưới card tự động co giãn và rớt dòng hoàn hảo trên mọi kích thước màn hình mà không cần viết bất kỳ dòng `@media` query nào."
    },
    conceptExplanation: {
      en: "`repeat(count, track)` eliminates repetition (e.g. `repeat(3, 1fr)`). `minmax(min, max)` clamps a track size between a floor and ceiling (e.g. `minmax(280px, 1fr)`). The legendary responsive pattern `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));` automatically fits as many 280px columns as possible, stretching them equally to fill leftover space. `auto-fill` creates empty ghost tracks when space permits, whereas `auto-fit` collapses empty tracks to zero, stretching filled tracks across the full width. Line placement syntax (`grid-column: 1 / -1`) allows items to span full-width.",
      vi: "`repeat(count, track)` loại bỏ việc viết lặp (ví dụ `repeat(3, 1fr)`). `minmax(min, max)` giới hạn kích thước track giữa cận dưới và cận trên (ví dụ `minmax(280px, 1fr)`). Mẫu cú pháp huyền thoại `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));` tự động chứa tối đa số cột 280px có thể, đồng thời kéo giãn đều để lấp đầy màn hình. `auto-fill` giữ lại các track trống vô hình, còn `auto-fit` ép xẹp các track trống về 0 để mở rộng tối đa các cột có nội dung. Cú pháp `grid-column: 1 / -1` giúp phần tử trải dài toàn bộ chiều rộng lưới."
    },
    syntax: `/* Responsive Grid without Media Queries */\n.responsive-cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 24px;\n}\n\n/* Full-width spanning banner inside grid */\n.featured-banner {\n  grid-column: 1 / -1;\n}`,
    examples: [
      {
        title: {
          en: "Auto-Fitting Product Grid",
          vi: "Lưới Sản Phẩm Tự Động Co Giãn Thông Minh"
        },
        description: {
          en: "Cards adapt from 1 column on mobile to 4+ columns on desktop automatically.",
          vi: "Các thẻ tự chuyển từ 1 cột trên mobile sang 4+ cột trên màn hình rộng hoàn toàn tự động."
        },
        code: `.product-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 16px;\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Using minmax(1fr, 300px) which is invalid because 1fr cannot be used as the minimum in minmax().",
          vi: "Dùng minmax(1fr, 300px) bị lỗi vì 1fr không được phép làm giá trị tối thiểu (min) trong hàm minmax()."
        },
        correction: {
          en: "Always put fixed or pixel units in the min parameter and 1fr in the max parameter: minmax(300px, 1fr).",
          vi: "Luôn đặt giá trị cố định vào tham số min và đặt 1fr ở tham số max: minmax(300px, 1fr)."
        }
      }
    ],
    tips: [
      {
        en: "Use auto-fit when you want single or few cards to expand across the full width, and auto-fill when cards must keep strict fixed width.",
        vi: "Dùng auto-fit khi muốn 1 vài card tự giãn rộng lấp đầy trang, và dùng auto-fill khi muốn các card giữ nguyên kích cỡ chuẩn mà không bị phình to."
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_12_1",
      type: "complete_code",
      title: {
        en: "Build Auto-Fit Responsive Grid",
        vi: "Tạo Lưới Đáp Ứng Tự Động auto-fit"
      },
      instruction: {
        en: "Set grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) on .responsive-grid.",
        vi: "Đặt grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) cho .responsive-grid."
      },
      starterCode: `.responsive-grid {\n  display: grid;\n  /* Define auto-fit columns */\n  gap: 20px;\n}`,
      solutionCode: `.responsive-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n}`,
      hint: {
        en: "Use grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));",
        vi: "Dùng grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));"
      },
      explanation: {
        en: "repeat(auto-fit, minmax(250px, 1fr)) creates a flexible, responsive column layout without media queries.",
        vi: "repeat(auto-fit, minmax(250px, 1fr)) tạo bố cục cột co giãn hoàn hảo không cần dùng media query."
      }
    },
    {
      id: "css_ex_12_2",
      type: "fix_code",
      title: {
        en: "Span Banner Across All Columns",
        vi: "Trải Rộng Banner Qua Tất Cả Các Cột"
      },
      instruction: {
        en: "Add grid-column: 1 / -1 to .hero-feature so it spans from the first line to the last line.",
        vi: "Thêm grid-column: 1 / -1 vào .hero-feature để nó trải dài từ đường line đầu tiên đến đường line cuối cùng."
      },
      starterCode: `.hero-feature {\n  background: #1e293b;\n  padding: 24px;\n}`,
      solutionCode: `.hero-feature {\n  grid-column: 1 / -1;\n  background: #1e293b;\n  padding: 24px;\n}`,
      hint: {
        en: "Add grid-column: 1 / -1;",
        vi: "Thêm grid-column: 1 / -1;"
      },
      explanation: {
        en: "grid-column: 1 / -1 spans across the entire width of the explicit grid.",
        vi: "grid-column: 1 / -1 trải rộng toàn bộ chiều ngang của hệ lưới tường minh."
      }
    }
  ],
  challenge: {
    id: "css_ch_12",
    title: {
      en: "Build a Modern Fluid Gallery Grid",
      vi: "Xây Dựng Thư Viện Ảnh Co Giãn Hiện Đại"
    },
    description: {
      en: "Style .media-gallery with display: grid, grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)), gap: 16px, and grid-auto-rows: 180px.",
      vi: "Tạo kiểu cho .media-gallery với display: grid, grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)), gap: 16px và grid-auto-rows: 180px."
    },
    requirements: [
      { en: "display: grid", vi: "display: grid" },
      { en: "grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))", vi: "grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))" },
      { en: "gap: 16px", vi: "gap: 16px" },
      { en: "grid-auto-rows: 180px", vi: "grid-auto-rows: 180px" }
    ],
    starterCode: `.media-gallery {\n  /* Add fluid auto-fill grid styles */\n}`,
    solutionCode: `.media-gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 16px;\n  grid-auto-rows: 180px;\n}`,
    hints: [
      {
        en: "Declare display: grid, repeat(auto-fill, minmax(200px, 1fr)), gap: 16px, and grid-auto-rows: 180px.",
        vi: "Khai báo display: grid, repeat(auto-fill, minmax(200px, 1fr)), gap: 16px và grid-auto-rows: 180px."
      }
    ],
    solutionExplanation: {
      en: "auto-fill combined with fixed grid-auto-rows creates uniform photo galleries that adapt gracefully.",
      vi: "auto-fill kết hợp cùng grid-auto-rows cố định tạo ra thư viện ảnh đồng đều và thích ứng mượt mà trên mọi màn hình."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_12_1",
      type: "single_choice",
      question: {
        en: "What is the key difference between `auto-fill` and `auto-fit` in `grid-template-columns`?",
        vi: "Sự khác biệt cốt lõi giữa `auto-fill` và `auto-fit` trong `grid-template-columns` là gì?"
      },
      options: [
        { en: "auto-fill creates empty ghost columns when space exists, while auto-fit collapses empty columns to 0, stretching existing items", vi: "auto-fill giữ lại các cột trống vô hình khi còn chỗ, còn auto-fit ép xẹp cột trống về 0 để kéo giãn các phần tử hiện có" },
        { en: "auto-fit only works on mobile devices", vi: "auto-fit chỉ hoạt động trên di động" },
        { en: "auto-fill disables grid gaps", vi: "auto-fill làm mất thuộc tính gap" },
        { en: "They are completely identical aliases", vi: "Chúng là hai từ khóa đồng nghĩa giống hệt nhau" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "auto-fit collapses unoccupied tracks to zero width so existing items expand to fill the container row. auto-fill preserves empty track slots.",
        vi: "auto-fit thu xẹp các cột trống về 0 để các thẻ hiện có nở to lấp đầy dòng. auto-fill bảo lưu các vị trí cột trống."
      },
      topicId: "css_grid_responsive",
      difficulty: "medium"
    },
    {
      id: "css_q_12_2",
      type: "single_choice",
      question: {
        en: "What does `grid-column: 1 / -1;` do?",
        vi: "`grid-column: 1 / -1;` có tác dụng gì đối với một phần tử trong Grid?"
      },
      options: [
        { en: "Spans the element across all explicit grid columns from the first line to the very last line", vi: "Trải rộng phần tử qua tất cả các cột của lưới từ đường line đầu tiên đến đường line cuối cùng" },
        { en: "Deletes the first and last columns", vi: "Xóa cột đầu tiên và cột cuối cùng" },
        { en: "Hides the element", vi: "Ẩn phần tử đi" },
        { en: "Sets column width to negative 1 pixel", vi: "Đặt chiều rộng cột thành âm 1 pixel" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Line 1 is the starting boundary, and line -1 is the ending boundary of the explicit grid.",
        vi: "Đường line 1 là mép xuất phát đầu tiên, còn đường line -1 là mép tận cùng của hệ lưới tường minh."
      },
      topicId: "css_grid_responsive",
      difficulty: "easy"
    },
    {
      id: "css_q_12_3",
      type: "single_choice",
      question: {
        en: "What does `grid-column: span 2;` mean?",
        vi: "`grid-column: span 2;` có ý nghĩa gì?"
      },
      options: [
        { en: "The item will span across 2 grid column tracks", vi: "Phần tử sẽ trải rộng chiếm đúng 2 cột trong lưới" },
        { en: "The item will duplicate itself twice", vi: "Phần tử tự nhân đôi thành 2 bản sao" },
        { en: "The item will take 2 seconds to animate", vi: "Phần tử mất 2 giây để chuyển động" },
        { en: "The item is moved 2 pixels to the right", vi: "Phần tử dịch sang phải 2 pixel" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`span N` instructs the grid item to occupy N consecutive tracks.",
        vi: "`span N` chỉ định phần tử grid chiếm giữ N track (cột hoặc hàng) liền kề."
      },
      topicId: "css_grid_responsive",
      difficulty: "easy"
    },
    {
      id: "css_q_12_4",
      type: "true_false",
      question: {
        en: "True or False: In `minmax(min, max)`, the `min` parameter cannot be a flexible unit like `1fr`.",
        vi: "Đúng hay Sai: Trong hàm `minmax(min, max)`, tham số `min` không được phép là đơn vị co giãn như `1fr`."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "CSS specifications prohibit `<flex>` units (fr) as the minimum value of minmax(). They can only be used as the maximum value.",
        vi: "Chuẩn CSS quy định đơn vị phân số co giãn (fr) chỉ được phép đặt ở vị trí max, không được làm giá trị min."
      },
      topicId: "css_grid_responsive",
      difficulty: "medium"
    },
    {
      id: "css_q_12_5",
      type: "single_choice",
      question: {
        en: "What does `grid-auto-flow: dense;` do?",
        vi: "Thuộc tính `grid-auto-flow: dense;` có tác dụng gì trong thuật toán xếp ô?"
      },
      options: [
        { en: "Instructs the auto-placement algorithm to backfill earlier empty holes in the grid with smaller items", vi: "Yêu cầu thuật toán tự động lấp các lỗ trống xuất hiện trước đó trong lưới bằng các phần tử nhỏ hơn" },
        { en: "Compresses images by 50%", vi: "Nén dung lượng ảnh 50%" },
        { en: "Removes all gap spacing", vi: "Xóa toàn bộ khoảng cách gap" },
        { en: "Disables scrolling", vi: "Tắt thanh cuộn" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`dense` packing fills gaps left by larger spanning items with smaller subsequent items, eliminating visual holes.",
        vi: "`dense` tự động tìm và lấp đầy các khoảng trống do các khối lớn để lại bằng các item nhỏ phía sau, giúp lưới luôn đặc kín không bị thủng lỗ."
      },
      topicId: "css_grid_responsive",
      difficulty: "hard"
    },
    {
      id: "css_q_12_6",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: The CSS function used to repeat a track pattern without writing it multiple times is ________(3, 1fr)",
        vi: "Điền vào chỗ trống: Hàm CSS dùng để lặp lại một mẫu track nhiều lần là ________(3, 1fr)"
      },
      fillBlankAnswers: ["repeat"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: "repeat(count, track) streamlines track definitions.",
        vi: "repeat(count, track) giúp viết gọn các khai báo track lặp đi lặp lại."
      },
      topicId: "css_grid_responsive",
      difficulty: "easy"
    },
    {
      id: "css_q_12_7",
      type: "multiple_choice",
      question: {
        en: "Which values are valid for `grid-auto-flow`? (Select all that apply)",
        vi: "Những giá trị nào sau đây là hợp lệ cho `grid-auto-flow`? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "row", vi: "row" },
        { en: "column", vi: "column" },
        { en: "row dense", vi: "row dense" },
        { en: "diagonal", vi: "diagonal" }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: "row, column, row dense, and column dense are valid. 'diagonal' is not a CSS property value.",
        vi: "row, column, row dense và column dense là hợp lệ. 'diagonal' không tồn tại trong CSS."
      },
      topicId: "css_grid_responsive",
      difficulty: "medium"
    },
    {
      id: "css_q_12_8",
      type: "single_choice",
      question: {
        en: "How do you place an item at row 2, column 3 using grid shorthand?",
        vi: "Làm thế nào để đặt một phần tử vào hàng 2, cột 3 bằng cú pháp viết tắt trong CSS Grid?"
      },
      options: [
        { en: "grid-row: 2; grid-column: 3;", vi: "grid-row: 2; grid-column: 3;" },
        { en: "position: 2, 3;", vi: "position: 2, 3;" },
        { en: "grid-cell: 2 / 3;", vi: "grid-cell: 2 / 3;" },
        { en: "track: 2x3;", vi: "track: 2x3;" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "grid-row: 2 and grid-column: 3 place the item at the intersection of the 2nd row and 3rd column tracks.",
        vi: "grid-row: 2 và grid-column: 3 đặt phần tử chính xác vào giao điểm hàng 2 và cột 3."
      },
      topicId: "css_grid_responsive",
      difficulty: "easy"
    },
    {
      id: "css_q_12_9",
      type: "true_false",
      question: {
        en: "True or False: `repeat(auto-fit, minmax(250px, 1fr))` creates a responsive layout that automatically adjusts column counts across viewport resizes.",
        vi: "Đúng hay Sai: `repeat(auto-fit, minmax(250px, 1fr))` tạo ra một bố cục đáp ứng tự động tăng giảm số cột theo độ rộng màn hình."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "This pattern is the industry standard for responsive card layouts without media queries.",
        vi: "Đây là mẫu thiết kế tiêu chuẩn công nghiệp để tạo lưới card co giãn không cần media query."
      },
      topicId: "css_grid_responsive",
      difficulty: "easy"
    },
    {
      id: "css_q_12_10",
      type: "single_choice",
      question: {
        en: "What happens if an element has `grid-column: 2 / 4;`?",
        vi: "Điều gì xảy ra khi một phần tử có `grid-column: 2 / 4;`?"
      },
      options: [
        { en: "It starts at column grid line 2 and ends at column grid line 4 (spanning 2 columns total)", vi: "Nó bắt đầu từ đường line 2 và kết thúc ở đường line 4 (chiếm tổng cộng 2 cột)" },
        { en: "It divides column 2 into 4 sub-columns", vi: "Nó chia cột 2 thành 4 cột con" },
        { en: "It moves between column 2 and 4 periodically", vi: "Nó nhảy qua lại giữa cột 2 và 4 theo chu kỳ" },
        { en: "It triggers a syntax error", vi: "Nó gây ra lỗi cú pháp" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "The slash syntax denotes `<start-line> / <end-line>`. Lines 2 to 4 span columns 2 and 3.",
        vi: "Ký hiệu dấu gạch chéo đại diện cho `<line-bắt-đầu> / <line-kết-thúc>`. Từ line 2 đến line 4 sẽ chiếm trọn 2 cột."
      },
      topicId: "css_grid_responsive",
      difficulty: "medium"
    }
  ]
};

// Lesson 13: Choosing Layout Strategies: Flexbox vs Grid vs Subgrid
const lesson13 = {
  id: "css_lesson_13",
  moduleId: "css_mod_int_1",
  levelId: "intermediate",
  courseId: "css",
  order: 5,
  topicId: "css_layout_strategy",
  title: {
    en: "Layout Strategy: Flexbox vs Grid vs Subgrid",
    vi: "Chiến Lược Bố Cục: So Sánh Flexbox, Grid & Subgrid"
  },
  summary: {
    en: "Master architectural decision-making: Content-First (Flexbox 1D) vs Layout-First (Grid 2D), compound nesting, and subgrid track inheritance.",
    vi: "Làm chủ tư duy kiến trúc giao diện: Content-First (Flexbox 1D) vs Layout-First (Grid 2D), kỹ thuật lồng ghép phối hợp và kế thừa subgrid."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "Modern web architecture is not an 'either-or' battle between Flexbox and Grid. Professional frontend developers combine both: Grid for page-level 2D skeletons and uniform cards, Flexbox for 1D component interiors (toolbars, navigation, badges), and Subgrid to synchronize nested alignments.",
      vi: "Kiến trúc web hiện đại không phải là sự lựa chọn đối đầu giữa Flexbox hay Grid. Các lập trình viên chuyên nghiệp luôn kết hợp cả hai: Grid xây dựng khung sườn 2 chiều và danh sách card đồng đều, Flexbox sắp xếp nội dung 1 chiều bên trong component (toolbar, menu, badge), và Subgrid đồng bộ thẳng hàng các phần tử con lồng ghép."
    },
    conceptExplanation: {
      en: "Decision Rule: 1. Use **Flexbox** when layout is content-driven, linear along one axis, or requires wrapping with natural item widths (e.g. tag chips, button groups, navbar bars). 2. Use **Grid** when layout is structural, 2-dimensional, or requires strict column/row track alignment across independent cards. 3. Use **Subgrid** (`grid-template-rows: subgrid`) when card children (like card headers, body copy, and bottom action buttons) must align horizontally with their sibling cards across the entire grid row.",
      vi: "Quy tắc quyết định kiến trúc: 1. Dùng **Flexbox** khi bố cục phụ thuộc vào nội dung, chỉ chạy theo 1 chiều tuyến tính hoặc cần rớt dòng tự nhiên theo chiều dài chữ (ví dụ cụm tag, nhóm nút, thanh navbar). 2. Dùng **Grid** khi bố cục mang tính kết cấu sườn, chạy theo cả 2 chiều hoặc đòi hỏi các cột/hàng phải thẳng tắp tuyệt đối giữa các card độc lập. 3. Dùng **Subgrid** (`grid-template-rows: subgrid`) khi các phần tử con bên trong card (như tiêu đề, nội dung và nút bấm ở đáy) cần phải thẳng hàng ngang tăm tắp với các card khác trong cùng một hàng."
    },
    syntax: `/* Page Layout: Grid skeleton */\n.page-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 24px;\n}\n\n/* Card Component Interior: Flexbox 1D linear alignment */\n.card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}`,
    examples: [
      {
        title: {
          en: "Compound Grid + Flexbox Card System",
          vi: "Hệ Thống Phối Hợp Đỉnh Cao Giữa Grid và Flexbox"
        },
        description: {
          en: "Grid arranges product cards in 2D space while Flexbox manages inner card button actions and pricing badges.",
          vi: "Grid dàn trận các sản phẩm thành lưới 2D còn Flexbox căn chỉnh nhãn giá và nút bấm bên trong mỗi thẻ."
        },
        code: `/* Outer 2D Layout */\n.product-catalog {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 20px;\n}\n\n/* Inner 1D Component */\n.product-card {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding: 16px;\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Forcing multi-row grids using Flexbox with fixed percentage widths (e.g. width: calc(33.333% - 16px)) instead of CSS Grid.",
          vi: "Cố ép Flexbox làm lưới nhiều cột bằng cách tính phần trăm thủ công (width: calc(33.333% - 16px)) thay vì dùng CSS Grid."
        },
        correction: {
          en: "Use display: grid for 2D multi-column lists; reserve Flexbox for 1D content alignment.",
          vi: "Dùng display: grid cho danh sách lưới đa cột 2D; dành riêng Flexbox cho căn chỉnh 1D theo chiều ngang hoặc dọc."
        }
      }
    ],
    tips: [
      {
        en: "Remember the golden rule: Grid is Layout-First (external container defines tracks), Flexbox is Content-First (items dictate their own space).",
        vi: "Hãy nhớ quy tắc vàng: Grid là Layout-First (khung cha quyết định đường kẻ), còn Flexbox là Content-First (nội dung tự định hình kích thước)."
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_13_1",
      type: "complete_code",
      title: {
        en: "Combine Grid Container with Flexbox Card Item",
        vi: "Kết Hợp Grid Container Với Thẻ Con Flexbox"
      },
      instruction: {
        en: "Set display: grid on .store-grid and display: flex with flex-direction: column on .store-card.",
        vi: "Đặt display: grid cho .store-grid và display: flex kèm flex-direction: column cho .store-card."
      },
      starterCode: `.store-grid {\n  /* Set grid */\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n\n.store-card {\n  /* Set flex column */\n}`,
      solutionCode: `.store-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n\n.store-card {\n  display: flex;\n  flex-direction: column;\n}`,
      hint: {
        en: "Use display: grid on .store-grid and display: flex; flex-direction: column; on .store-card.",
        vi: "Dùng display: grid cho .store-grid và display: flex; flex-direction: column; cho .store-card."
      },
      explanation: {
        en: "Grid orchestrates 2D layout while Flexbox manages inner card vertical flow.",
        vi: "Grid điều phối lưới 2D bên ngoài còn Flexbox kiểm soát luồng nội dung dọc bên trong card."
      }
    },
    {
      id: "css_ex_13_2",
      type: "fix_code",
      title: {
        en: "Refactor Percentage Flexbox to CSS Grid",
        vi: "Tái Cấu Trúc Flexbox Phần Trăm Sang CSS Grid Chuẩn"
      },
      instruction: {
        en: "Replace display: flex and flex-wrap with display: grid and grid-template-columns: repeat(3, 1fr) on .item-matrix.",
        vi: "Thay thế display: flex và flex-wrap bằng display: grid và grid-template-columns: repeat(3, 1fr) cho .item-matrix."
      },
      starterCode: `.item-matrix {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}`,
      solutionCode: `.item-matrix {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}`,
      hint: {
        en: "Use display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;",
        vi: "Dùng display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;"
      },
      explanation: {
        en: "Grid creates rigid 3-column rows without needing item percentage widths.",
        vi: "Grid tạo ra 3 cột thẳng tắp mà không cần phải gán phần trăm phức tạp cho các phần tử con."
      }
    }
  ],
  challenge: {
    id: "css_ch_13",
    title: {
      en: "Architect an Enterprise Pricing Tier Matrix",
      vi: "Thiết Kế Kiến Trúc Bảng Giá Doanh Nghiệp Đa Tầng"
    },
    description: {
      en: "Style .pricing-matrix with display: grid, grid-template-columns: repeat(3, 1fr), and gap: 24px. Style .pricing-card with display: flex, flex-direction: column, justify-content: space-between, and padding: 24px.",
      vi: "Tạo kiểu .pricing-matrix với display: grid, grid-template-columns: repeat(3, 1fr) và gap: 24px. Tạo kiểu .pricing-card với display: flex, flex-direction: column, justify-content: space-between và padding: 24px."
    },
    requirements: [
      { en: ".pricing-matrix { display: grid }", vi: ".pricing-matrix { display: grid }" },
      { en: "grid-template-columns: repeat(3, 1fr)", vi: "grid-template-columns: repeat(3, 1fr)" },
      { en: ".pricing-card { display: flex }", vi: ".pricing-card { display: flex }" },
      { en: "flex-direction: column", vi: "flex-direction: column" },
      { en: "justify-content: space-between", vi: "justify-content: space-between" }
    ],
    starterCode: `/* Compound Grid + Flexbox pricing matrix */\n.pricing-matrix {\n}\n\n.pricing-card {\n}`,
    solutionCode: `.pricing-matrix {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n}\n\n.pricing-card {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding: 24px;\n}`,
    hints: [
      {
        en: "Use display: grid on the container matrix and display: flex with flex-direction: column on the cards.",
        vi: "Dùng display: grid cho khối ma trận bao ngoài và display: flex với flex-direction: column cho các thẻ card."
      }
    ],
    solutionExplanation: {
      en: "The outer Grid guarantees equal card heights across columns while inner Flexbox pushes CTA buttons to the bottom.",
      vi: "Grid bên ngoài đảm bảo các card có chiều cao bằng nhau tuyệt đối trong khi Flexbox bên trong đẩy nút CTA sát đáy."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_13_1",
      type: "single_choice",
      question: {
        en: "What is the core conceptual distinction between CSS Grid and Flexbox?",
        vi: "Sự phân biệt cốt lõi về mặt khái niệm giữa CSS Grid và Flexbox là gì?"
      },
      options: [
        { en: "Grid is 2-dimensional (controls rows AND columns simultaneously), while Flexbox is 1-dimensional (controls one axis at a time)", vi: "Grid là 2 chiều (kiểm soát đồng thời cả hàng VÀ cột), trong khi Flexbox là 1 chiều (chỉ kiểm soát 1 trục tại một thời điểm)" },
        { en: "Grid is deprecated in favor of Flexbox", vi: "Grid đã bị khai tử để nhường chỗ cho Flexbox" },
        { en: "Flexbox only works for text", vi: "Flexbox chỉ dùng được cho chữ" },
        { en: "Grid cannot use gap", vi: "Grid không dùng được thuộc tính gap" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Grid is built for 2D structural layouts; Flexbox is built for 1D component-level flow and alignment.",
        vi: "Grid thiết kế cho bố cục sườn 2 chiều; Flexbox thiết kế cho luồng và căn lề 1 chiều bên trong component."
      },
      topicId: "css_layout_strategy",
      difficulty: "easy"
    },
    {
      id: "css_q_13_2",
      type: "single_choice",
      question: {
        en: "Which layout model is best suited for a navigation bar with a logo on the left and menu links on the right?",
        vi: "Mô hình nào thích hợp nhất cho thanh navbar với logo bên trái và các liên kết menu bên phải?"
      },
      options: [
        { en: "Flexbox with `display: flex; justify-content: space-between;`", vi: "Flexbox với `display: flex; justify-content: space-between;`" },
        { en: "CSS Table layout", vi: "CSS Table layout" },
        { en: "Floats with clearfix", vi: "Dùng Float kết hợp clearfix" },
        { en: "CSS Columns", vi: "CSS Multi-column" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Flexbox excels at 1D linear alignment and distributing remaining space across arbitrary content widths.",
        vi: "Flexbox là lựa chọn số 1 cho căn chỉnh 1D và phân bổ khoảng trống theo độ dài tự nhiên của chữ."
      },
      topicId: "css_layout_strategy",
      difficulty: "easy"
    },
    {
      id: "css_q_13_3",
      type: "single_choice",
      question: {
        en: "Why is CSS Grid preferred over Flexbox for rendering a photo gallery or product catalog?",
        vi: "Tại sao CSS Grid được ưu tiên hơn Flexbox khi hiển thị thư viện ảnh hoặc danh mục sản phẩm?"
      },
      options: [
        { en: "Grid enforces rigid track alignment across both columns and rows, avoiding uneven wrapping widths on the last row", vi: "Grid giữ các cột và hàng thẳng tắp tuyệt đối, tránh hiện tượng hàng cuối bị phình to méo mó khi rớt dòng" },
        { en: "Grid images load faster", vi: "Ảnh trong Grid tải nhanh hơn" },
        { en: "Flexbox cannot display images", vi: "Flexbox không thể hiển thị hình ảnh" },
        { en: "Grid requires less JavaScript", vi: "Grid tốn ít JavaScript hơn" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Flexbox wraps items independently per line (causing the last row to stretch or orphan), whereas Grid locks all items to strict vertical and horizontal tracks.",
        vi: "Flexbox rớt dòng độc lập từng hàng khiến hàng cuối bị co giãn lệch lạc, trong khi Grid khóa cứng mọi item vào đúng đường lưới thẳng hàng."
      },
      topicId: "css_layout_strategy",
      difficulty: "medium"
    },
    {
      id: "css_q_13_4",
      type: "true_false",
      question: {
        en: "True or False: You can place a Flexbox container inside a CSS Grid item.",
        vi: "Đúng hay Sai: Bạn hoàn toàn có thể đặt một flex container bên trong một ô grid item."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Combining Grid for outer page skeleton and Flexbox for inner card content is standard best practice.",
        vi: "Kết hợp Grid cho khung trang bên ngoài và Flexbox cho nội dung thẻ bên trong là chuẩn mực vàng trong thiết kế web."
      },
      topicId: "css_layout_strategy",
      difficulty: "easy"
    },
    {
      id: "css_q_13_5",
      type: "single_choice",
      question: {
        en: "What problem does CSS `subgrid` solve that traditional nested grids could not?",
        vi: "Tính năng CSS `subgrid` giải quyết bài toán nào mà hệ thống lưới lồng nhau truyền thống không làm được?"
      },
      options: [
        { en: "Allows child items inside a card to align their tracks directly with the parent grid's tracks across adjacent cards", vi: "Cho phép các phần tử con bên trong card căn thẳng hàng trực tiếp với các đường track của lưới cha giữa các card liền kề" },
        { en: "Compiles CSS to SASS automatically", vi: "Tự động dịch CSS sang SASS" },
        { en: "Increases screen refresh rate to 120Hz", vi: "Tăng tần số quét màn hình lên 120Hz" },
        { en: "Prevents CSS specificity conflicts", vi: "Ngăn chặn xung đột độ ưu tiên CSS" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`subgrid` allows a nested grid to participate in and inherit the track sizing of its parent grid, enabling alignment of titles and buttons across multi-column cards.",
        vi: "`subgrid` cho phép lưới con kế thừa trực tiếp kích thước track của lưới cha, giúp tiêu đề và nút bấm trên các card khác nhau luôn thẳng hàng ngang tuyệt đối."
      },
      topicId: "css_layout_strategy",
      difficulty: "hard"
    },
    {
      id: "css_q_13_6",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: The mental model for Flexbox is 'Content-First', while the mental model for CSS Grid is '________-First'",
        vi: "Điền vào chỗ trống: Tư duy cốt lõi của Flexbox là 'Content-First', trong khi tư duy của CSS Grid là '________-First'"
      },
      fillBlankAnswers: ["Layout", "layout"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: "Grid is Layout-First (the grid tracks dictate element dimensions).",
        vi: "Grid là Layout-First (các đường kẻ khung lưới quyết định kích thước của phần tử)."
      },
      topicId: "css_layout_strategy",
      difficulty: "medium"
    },
    {
      id: "css_q_13_7",
      type: "multiple_choice",
      question: {
        en: "Which use cases are ideal for Flexbox? (Select all that apply)",
        vi: "Những trường hợp nào sau đây là lý tưởng để sử dụng Flexbox? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "Tag pills / chip list wrapping naturally with varying text lengths", vi: "Danh sách thẻ tag/chip co giãn tự nhiên theo độ dài chữ" },
        { en: "Vertical button stack inside a dialog footer", vi: "Cụm nút bấm xếp dọc ở đáy hộp thoại" },
        { en: "A media object with avatar on the left and bio text on the right", vi: "Khối Media Object với avatar bên trái và thông tin cá nhân bên phải" },
        { en: "A full spreadsheet data table with strict row/column intersections", vi: "Bảng dữ liệu bảng tính với các hàng và cột giao nhau nghiêm ngặt" }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: "Tag chips, button stacks, and media objects are 1D content-driven layouts (Flexbox). A spreadsheet table is a 2D matrix (Grid/Table).",
        vi: "Tag chips, cụm nút và media object là bố cục 1D (Flexbox). Bảng tính spreadsheet là ma trận 2D (Grid/Table)."
      },
      topicId: "css_layout_strategy",
      difficulty: "medium"
    },
    {
      id: "css_q_13_8",
      type: "single_choice",
      question: {
        en: "How do you push a footer action button to the very bottom of a flex card whose content height varies?",
        vi: "Làm thế nào để đẩy nút bấm hành động luôn nằm sát đáy của một flex card có chiều dài nội dung thay đổi?"
      },
      options: [
        { en: "Apply `margin-top: auto;` to the button inside a card with `display: flex; flex-direction: column;`", vi: "Áp dụng `margin-top: auto;` cho nút bấm bên trong card có `display: flex; flex-direction: column;`" },
        { en: "Use position: absolute; bottom: 0; without padding", vi: "Dùng position: absolute; bottom: 0; mà không cần padding" },
        { en: "Set button height to 100%", vi: "Đặt chiều cao nút thành 100%" },
        { en: "Add 500px padding to the card body", vi: "Thêm padding 500px vào thân card" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "In a vertical flex container, `margin-top: auto` absorbs all extra vertical space, pinning the button perfectly to the bottom.",
        vi: "Trong flex container dọc, `margin-top: auto` hấp thụ toàn bộ khoảng trống dọc còn thừa, ghim chặt nút bấm xuống đáy thẻ."
      },
      topicId: "css_layout_strategy",
      difficulty: "medium"
    },
    {
      id: "css_q_13_9",
      type: "true_false",
      question: {
        en: "True or False: Using CSS Grid requires more browser memory than Flexbox and should be avoided on mobile.",
        vi: "Đúng hay Sai: Dùng CSS Grid tốn nhiều bộ nhớ trình duyệt hơn Flexbox và nên tránh dùng trên thiết bị di động."
      },
      options: [
        { en: "False", vi: "Sai" },
        { en: "True", vi: "Đúng" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "CSS Grid is natively optimized in modern browser C++ rendering engines and is fully performant on all mobile devices.",
        vi: "CSS Grid được tối ưu hóa ở tầng lõi C++ của trình duyệt và hoạt động cực kỳ mượt mà trên tất cả thiết bị di động."
      },
      topicId: "css_layout_strategy",
      difficulty: "easy"
    },
    {
      id: "css_q_13_10",
      type: "single_choice",
      question: {
        en: "What happens when you declare `display: grid;` on an element that already contains float-based children?",
        vi: "Điều gì xảy ra khi bạn khai báo `display: grid;` trên một phần tử đang chứa các con dùng float?"
      },
      options: [
        { en: "The float and clear properties on the children are ignored; they automatically become grid items", vi: "Các thuộc tính float và clear trên con bị bỏ qua; chúng tự động biến thành các grid item" },
        { en: "The browser crashes", vi: "Trình duyệt bị treo" },
        { en: "Grid fails to initialize", vi: "Grid không thể khởi tạo" },
        { en: "Float overrides the grid display", vi: "Float ghi đè lên grid" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "CSS specifications dictate that `float`, `clear`, and `vertical-align` have no effect on children of a grid or flex container.",
        vi: "Đặc tả CSS quy định `float`, `clear` và `vertical-align` hoàn toàn mất tác dụng trên các con của grid hoặc flex container."
      },
      topicId: "css_layout_strategy",
      difficulty: "medium"
    }
  ]
};

// Save lessons
saveLesson('src/data/css/intermediate/module01/lesson09.ts', 'lesson09', lesson09);
saveLesson('src/data/css/intermediate/module01/lesson10.ts', 'lesson10', lesson10);
saveLesson('src/data/css/intermediate/module01/lesson11.ts', 'lesson11', lesson11);
saveLesson('src/data/css/intermediate/module01/lesson12.ts', 'lesson12', lesson12);
saveLesson('src/data/css/intermediate/module01/lesson13.ts', 'lesson13', lesson13);

// Module 1 index
const mod1Index = `export { lesson09 } from './lesson09';\nexport { lesson10 } from './lesson10';\nexport { lesson11 } from './lesson11';\nexport { lesson12 } from './lesson12';\nexport { lesson13 } from './lesson13';\n`;
fs.writeFileSync('src/data/css/intermediate/module01/index.ts', mod1Index, 'utf8');
console.log('Saved: src/data/css/intermediate/module01/index.ts');
