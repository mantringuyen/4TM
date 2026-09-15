import fs from 'fs';
import path from 'path';

function saveLesson(filePath: string, varName: string, lessonObj: any) {
  const content = `import { Lesson } from '../../../../types';\n\nexport const ${varName}: Lesson = ${JSON.stringify(lessonObj, null, 2)};\n`;
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Saved: ${filePath}`);
}

// Lesson 5: The CSS Box Model & Sizing
const lesson05 = {
  id: "css_lesson_5",
  moduleId: "css_mod_basic_2",
  levelId: "basic",
  courseId: "css",
  order: 5,
  topicId: "css_box_model",
  title: {
    en: "The CSS Box Model & Sizing",
    vi: "Mô Hình Hộp CSS Box Model & Kích Thước"
  },
  summary: {
    en: "Master content, padding, border, margin, margin collapse, and why box-sizing: border-box is the universal layout standard.",
    vi: "Làm chủ content, padding, border, margin, hiện tượng chập lề (margin collapse) và lý do box-sizing: border-box là chuẩn mực toàn cầu."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "Every HTML element rendered in the browser is a rectangular box consisting of four concentric layers: Content, Padding, Border, and Margin. Understanding how dimensions are computed prevents layout overflow bugs.",
      vi: "Mọi phần tử HTML render trên trình duyệt đều là một khối hộp chữ nhật gồm 4 lớp đồng tâm: Nội dung (Content), Khoảng đệm (Padding), Đường viền (Border) và Lề ngoài (Margin). Hiểu cách tính toán kích thước giúp ngăn chặn triệt để lỗi tràn giao diện."
    },
    conceptExplanation: {
      en: "By default, `box-sizing: content-box` calculates element width as `content width + padding + border`, meaning a 200px box with 20px padding and 2px border becomes 244px wide! In contrast, `box-sizing: border-box` keeps the total rendered width exactly at 200px by absorbing padding and border inward. Vertical margins between block elements can 'collapse' into a single shared margin equal to the larger of the two.",
      vi: "Theo mặc định, `box-sizing: content-box` tính tổng chiều rộng bằng `content + padding + border`, khiến một khối 200px có 20px padding và 2px viền sẽ phình to thành 244px! Ngược lại, `box-sizing: border-box` giữ nguyên kích thước tổng là 200px bằng cách ép padding và viền vào trong. Lề dọc (vertical margins) giữa các phần tử khối có thể 'chập' lại với nhau thành một khoảng lề duy nhất bằng giá trị lớn hơn."
    },
    syntax: `/* Universal Box-Sizing Reset */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n.card {\n  width: 320px;\n  padding: 24px;\n  border: 1px solid #334155;\n  margin: 16px 0;\n}`,
    examples: [
      {
        title: {
          en: "Predictable Layout with border-box",
          vi: "Bố Cục Chính Xác Tuyệt Đối Với border-box"
        },
        description: {
          en: "Shows how two 50% width columns fit side-by-side without wrapping when padding is applied.",
          vi: "Minh họa 2 cột rộng 50% đứng cạnh nhau vừa khít không bị rớt dòng khi có padding."
        },
        code: `/* Container with two half-width columns */\n.col {\n  box-sizing: border-box;\n  width: 50%;\n  padding: 16px;\n  float: left; /* Or inline-block/flex */\n  background-color: #1e293b;\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Trying to apply top/bottom margins or padding to inline elements (like <span>) and expecting height expansion.",
          vi: "Áp dụng margin hoặc padding trên/dưới cho thẻ inline (như <span>) và mong chờ chiều cao giãn ra."
        },
        correction: {
          en: "Set display: inline-block or block on the element before adjusting vertical spacing.",
          vi: "Đặt display: inline-block hoặc block cho phần tử trước khi tùy chỉnh khoảng cách dọc."
        }
      }
    ],
    tips: [
      {
        en: "Always apply the universal box-sizing: border-box reset at the top of your global stylesheet.",
        vi: "Luôn đặt bộ reset toàn cục box-sizing: border-box ở đầu file CSS dự án của bạn."
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_5_1",
      type: "complete_code",
      title: {
        en: "Apply Universal Box Sizing Reset",
        vi: "Thiết Lập Reset Box Sizing Toàn Cục"
      },
      instruction: {
        en: "Apply box-sizing: border-box to all elements and pseudo-elements (*, *::before, *::after).",
        vi: "Áp dụng box-sizing: border-box cho tất cả phần tử và pseudo-elements (*, *::before, *::after)."
      },
      starterCode: `*,\n*::before,\n*::after {\n  /* Set box-sizing */\n}`,
      solutionCode: `*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}`,
      hint: {
        en: "Use box-sizing: border-box;",
        vi: "Dùng box-sizing: border-box;"
      },
      explanation: {
        en: "The universal border-box reset ensures predictable width calculations across all components.",
        vi: "Reset border-box toàn cục đảm bảo kích thước chiều rộng luôn được tính toán nhất quán trên mọi component."
      }
    },
    {
      id: "css_ex_5_2",
      type: "fix_code",
      title: {
        en: "Fix Overflow on Form Input",
        vi: "Sửa Lỗi Tràn Chiều Rộng Ô Input"
      },
      instruction: {
        en: "Add box-sizing: border-box to input.full-width so width: 100% does not overflow its parent with padding.",
        vi: "Thêm box-sizing: border-box vào input.full-width để width: 100% không làm tràn ra ngoài thẻ cha khi có padding."
      },
      starterCode: `input.full-width {\n  width: 100%;\n  padding: 12px 16px;\n  border: 1px solid #475569;\n}`,
      solutionCode: `input.full-width {\n  box-sizing: border-box;\n  width: 100%;\n  padding: 12px 16px;\n  border: 1px solid #475569;\n}`,
      hint: {
        en: "Add box-sizing: border-box;",
        vi: "Thêm box-sizing: border-box;"
      },
      explanation: {
        en: "border-box includes padding inside the 100% width, preventing horizontal scrollbars.",
        vi: "border-box gom khoảng đệm padding vào trong 100% chiều rộng, loại bỏ hiện tượng tràn thanh cuộn ngang."
      }
    }
  ],
  challenge: {
    id: "css_ch_5",
    title: {
      en: "Build a High-Precision Profile Card Layout",
      vi: "Xây Dựng Bố Cục Thẻ Hồ Sơ Chuẩn Box Model"
    },
    description: {
      en: "Style .profile-box with box-sizing: border-box, width: 340px, padding: 24px, border: 2px solid #3b82f6, and margin: 20px auto.",
      vi: "Tạo kiểu .profile-box với box-sizing: border-box, width: 340px, padding: 24px, border: 2px solid #3b82f6 và margin: 20px auto."
    },
    requirements: [
      { en: "box-sizing: border-box", vi: "box-sizing: border-box" },
      { en: "width: 340px", vi: "width: 340px" },
      { en: "padding: 24px", vi: "padding: 24px" },
      { en: "border: 2px solid #3b82f6", vi: "border: 2px solid #3b82f6" },
      { en: "margin: 20px auto", vi: "margin: 20px auto" }
    ],
    starterCode: `.profile-box {\n  /* Add box model styles */\n}`,
    solutionCode: `.profile-box {\n  box-sizing: border-box;\n  width: 340px;\n  padding: 24px;\n  border: 2px solid #3b82f6;\n  margin: 20px auto;\n}`,
    hints: [
      {
        en: "Declare box-sizing, width, padding, border, and margin inside .profile-box.",
        vi: "Khai báo box-sizing, width, padding, border và margin trong .profile-box."
      }
    ],
    solutionExplanation: {
      en: "The combination of border-box and margin: auto creates a centered container with locked dimensions.",
      vi: "Sự kết hợp giữa border-box và margin: auto tạo nên một khối căn giữa hoàn hảo với kích thước cố định an toàn."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_5_1",
      type: "single_choice",
      question: {
        en: "What are the four layers of the CSS Box Model from inside to outside?",
        vi: "Bốn lớp của mô hình hộp CSS Box Model tính từ trong ra ngoài là gì?"
      },
      options: [
        { en: "Content, Padding, Border, Margin", vi: "Content, Padding, Border, Margin" },
        { en: "Content, Margin, Border, Padding", vi: "Content, Margin, Border, Padding" },
        { en: "Border, Padding, Content, Margin", vi: "Border, Padding, Content, Margin" },
        { en: "Padding, Content, Border, Margin", vi: "Padding, Content, Border, Margin" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "The Box Model starts at the inner Content, surrounded by Padding, wrapped by Border, and spaced by Margin.",
        vi: "Box Model bắt đầu từ Content ở trong cùng, bọc bởi Padding, viền Border, và khoảng cách ngoài Margin."
      },
      topicId: "css_box_model",
      difficulty: "easy"
    },
    {
      id: "css_q_5_2",
      type: "single_choice",
      question: {
        en: "With `box-sizing: content-box`, what is the total rendered width of an element with `width: 200px`, `padding: 20px`, and `border: 5px`?",
        vi: "Với `box-sizing: content-box`, tổng chiều rộng hiển thị của phần tử có `width: 200px`, `padding: 20px` và `border: 5px` là bao nhiêu?"
      },
      options: [
        { en: "250px (200 + 20*2 + 5*2)", vi: "250px (200 + 20*2 + 5*2)" },
        { en: "200px", vi: "200px" },
        { en: "225px", vi: "225px" },
        { en: "240px", vi: "240px" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "In content-box: Total width = width + padding-left + padding-right + border-left + border-right = 200 + 40 + 10 = 250px.",
        vi: "Trong content-box: Tổng width = width + padding trái/phải + border trái/phải = 200 + 40 + 10 = 250px."
      },
      topicId: "css_box_model",
      difficulty: "medium"
    },
    {
      id: "css_q_5_3",
      type: "single_choice",
      question: {
        en: "With `box-sizing: border-box`, what happens when you increase an element's padding?",
        vi: "Với `box-sizing: border-box`, điều gì xảy ra khi bạn tăng padding của phần tử?"
      },
      options: [
        { en: "The content area shrinks to keep the total box size unchanged", vi: "Vùng nội dung co lại để giữ nguyên tổng kích thước của khối" },
        { en: "The entire element expands in width and height", vi: "Toàn bộ phần tử bị phình to chiều rộng và chiều cao" },
        { en: "The border turns transparent", vi: "Đường viền trở nên trong suốt" },
        { en: "The margin collapses to 0", vi: "Lề ngoài bị triệt tiêu về 0" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Under border-box, padding and border are absorbed inside the declared width/height, reducing the inner content area.",
        vi: "Dưới border-box, padding và viền được gom vào bên trong kích thước đã khai báo, làm thu nhỏ diện tích content bên trong."
      },
      topicId: "css_box_model",
      difficulty: "easy"
    },
    {
      id: "css_q_5_4",
      type: "true_false",
      question: {
        en: "True or False: Vertical margins between adjacent block elements collapse, but horizontal margins never collapse.",
        vi: "Đúng hay Sai: Lề dọc (vertical margins) giữa các khối liền kề có thể chập vào nhau, nhưng lề ngang (horizontal margins) không bao giờ chập."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Margin collapsing only occurs vertically between block elements in normal flow, never horizontally.",
        vi: "Hiện tượng Margin collapsing chỉ xảy ra theo phương thẳng đứng giữa các khối block trong luồng thông thường, không bao giờ xảy ra theo phương ngang."
      },
      topicId: "css_box_model",
      difficulty: "medium"
    },
    {
      id: "css_q_5_5",
      type: "single_choice",
      question: {
        en: "Two sibling block paragraphs have `margin-bottom: 30px` and `margin-top: 20px`. What is the distance between them?",
        vi: "Hai đoạn văn liền kề có `margin-bottom: 30px` và `margin-top: 20px`. Khoảng cách thực tế giữa chúng là bao nhiêu?"
      },
      options: [
        { en: "30px (margins collapse to the largest value)", vi: "30px (lề chập lại và lấy giá trị lớn nhất)" },
        { en: "50px (30 + 20)", vi: "50px (30 + 20)" },
        { en: "20px", vi: "20px" },
        { en: "10px (30 - 20)", vi: "10px (30 - 20)" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "When positive vertical margins collapse, the resulting space equals the maximum of the two margin values (max(30px, 20px) = 30px).",
        vi: "Khi chập lề dọc dương, khoảng cách thực tế bằng giá trị lớn nhất giữa hai lề (max(30px, 20px) = 30px)."
      },
      topicId: "css_box_model",
      difficulty: "medium"
    },
    {
      id: "css_q_5_6",
      type: "single_choice",
      question: {
        en: "Which shorthand value sets `margin-top: 10px`, `margin-right: 20px`, `margin-bottom: 30px`, and `margin-left: 40px`?",
        vi: "Cú pháp viết tắt nào thiết lập đúng `margin-top: 10px`, `margin-right: 20px`, `margin-bottom: 30px`, và `margin-left: 40px`?"
      },
      options: [
        { en: "margin: 10px 20px 30px 40px;", vi: "margin: 10px 20px 30px 40px;" },
        { en: "margin: 40px 30px 20px 10px;", vi: "margin: 40px 30px 20px 10px;" },
        { en: "margin: 10px 30px 20px 40px;", vi: "margin: 10px 30px 20px 40px;" },
        { en: "margin: 20px 40px 10px 30px;", vi: "margin: 20px 40px 10px 30px;" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "CSS 4-value shorthand follows clockwise order: Top, Right, Bottom, Left (TRBL).",
        vi: "Cú pháp 4 giá trị trong CSS tuân theo chiều kim đồng hồ: Top, Right, Bottom, Left (Trên, Phải, Dưới, Trái)."
      },
      topicId: "css_box_model",
      difficulty: "easy"
    },
    {
      id: "css_q_5_7",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: To horizontally center a block element with a fixed width, use margin: 0 ________",
        vi: "Điền vào chỗ trống: Để căn giữa theo chiều ngang một khối block có chiều rộng cố định, dùng margin: 0 ________"
      },
      fillBlankAnswers: ["auto"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: "margin: 0 auto divides the remaining horizontal space equally between left and right margins.",
        vi: "margin: 0 auto chia đều khoảng trống còn lại sang 2 bên lề trái và phải để căn giữa."
      },
      topicId: "css_box_model",
      difficulty: "easy"
    },
    {
      id: "css_q_5_8",
      type: "multiple_choice",
      question: {
        en: "Which properties create spacing inside vs outside the element border? (Select all that apply)",
        vi: "Những thuộc tính nào tạo khoảng cách bên trong so với bên ngoài đường viền phần tử? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "padding creates spacing inside the border", vi: "padding tạo khoảng đệm bên trong đường viền" },
        { en: "margin creates spacing outside the border", vi: "margin tạo khoảng cách bên ngoài đường viền" },
        { en: "border-radius changes the margin size", vi: "border-radius thay đổi kích thước margin" },
        { en: "outline is rendered outside the border and does not take up layout space", vi: "outline nằm bên ngoài border và không chiếm diện tích layout" }
      ],
      correctAnswers: [0, 1, 3],
      explanation: {
        en: "Padding is inside, Margin is outside, and Outline draws outside the border without shifting surrounding layout.",
        vi: "Padding ở trong, Margin ở ngoài, và Outline vẽ ngoài viền mà không đẩy bố cục xung quanh."
      },
      topicId: "css_box_model",
      difficulty: "medium"
    },
    {
      id: "css_q_5_9",
      type: "single_choice",
      question: {
        en: "Can `margin` accept negative values (e.g. `margin-top: -20px`)?",
        vi: "`margin` có thể nhận giá trị âm hay không (ví dụ `margin-top: -20px`)?"
      },
      options: [
        { en: "Yes, negative margins pull the element or adjacent siblings in that direction", vi: "Có, margin âm sẽ kéo phần tử hoặc phần tử lân cận về phía đó" },
        { en: "No, CSS triggers a syntax error on negative margins", vi: "Không, CSS sẽ báo lỗi cú pháp nếu dùng margin âm" },
        { en: "Only on <body> tags", vi: "Chỉ dùng được trên thẻ <body>" },
        { en: "Only inside Flexbox containers", vi: "Chỉ dùng được trong khối Flexbox" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Negative margins are fully valid and widely used for overlapping elements or pulling child elements outside container padding.",
        vi: "Margin âm hoàn toàn hợp lệ, thường dùng để tạo hiệu ứng xếp chồng lớp hoặc kéo phần tử tràn ra ngoài vùng đệm của cha."
      },
      topicId: "css_box_model",
      difficulty: "medium"
    },
    {
      id: "css_q_5_10",
      type: "true_false",
      question: {
        en: "True or False: An element with `display: inline` respects declared `width` and `height` properties.",
        vi: "Đúng hay Sai: Một phần tử có `display: inline` vẫn nhận các thuộc tính `width` và `height` đã đặt."
      },
      options: [
        { en: "False", vi: "Sai" },
        { en: "True", vi: "Đúng" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Inline elements ignore width and height. You must change their display to inline-block or block.",
        vi: "Phần tử inline thuần túy bỏ qua width và height. Bạn phải đổi display sang inline-block hoặc block."
      },
      topicId: "css_box_model",
      difficulty: "easy"
    }
  ]
};

// Lesson 6: Colors, Backgrounds & Modern Color Spaces
const lesson06 = {
  id: "css_lesson_6",
  moduleId: "css_mod_basic_2",
  levelId: "basic",
  courseId: "css",
  order: 6,
  topicId: "css_colors",
  title: {
    en: "Colors, Backgrounds & Modern Color Spaces",
    vi: "Màu Sắc, Hình Nền & Không Gian Màu Hiện Đại"
  },
  summary: {
    en: "Master HEX, RGB, HSL, modern OKLCH color spaces, linear/radial gradients, and background sizing modes.",
    vi: "Làm chủ HEX, RGB, HSL, không gian màu hiện đại OKLCH, dải chuyển màu linear/radial gradients và các chế độ hình nền."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "CSS supports traditional RGB/HEX/HSL color models and modern wide-gamut perceptually uniform color spaces like `oklch()`. Gradients and background layering provide rich visual depth.",
      vi: "CSS hỗ trợ các hệ màu truyền thống RGB/HEX/HSL cùng không gian màu dải rộng đồng đều cảm nhận hiện đại như `oklch()`. Gradient và đa tầng hình nền mang lại chiều sâu giao diện sống động."
    },
    conceptExplanation: {
      en: "Hexadecimal (`#38bdf8`), RGB (`rgb(56 189 248 / 0.8)`), and HSL (`hsl(199 95% 74%)`) are standard color formats. Modern CSS Color 4 introduces `oklch(L C H / A)` (Lightness, Chroma, Hue, Alpha), which ensures consistent perceived brightness across hues without muddy gradient transitions. Background properties include `background-color`, `background-image: linear-gradient(135deg, ...)` or `radial-gradient()`, `background-size: cover | contain`, `background-position: center`, and `background-repeat: no-repeat`.",
      vi: "Hệ Hex (`#38bdf8`), RGB (`rgb(56 189 248 / 0.8)`), và HSL (`hsl(199 95% 74%)`) là các định dạng phổ biến. Chuẩn CSS Color 4 mang tới `oklch(L C H / A)` (Độ sáng, Độ bão hòa Chroma, Tông màu Hue, Độ trong suốt), giúp độ sáng hiển thị đồng đều khi đổi màu và tạo gradient chuyển màu siêu mượt không bị xỉn. Các thuộc tính hình nền gồm `background-color`, `linear-gradient()`, `radial-gradient()`, `background-size: cover | contain`, và `background-position`."
    },
    syntax: `/* Modern OKLCH color with alpha */\n.badge {\n  color: oklch(0.95 0.05 240);\n  background-color: oklch(0.35 0.15 240 / 0.8);\n}\n\n/* High-contrast gradient hero */\n.hero-banner {\n  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);\n}`,
    examples: [
      {
        title: {
          en: "Layered Gradient with Full Cover Background Image",
          vi: "Hình Nền Đa Tầng Kết Hợp Gradient Phủ và Cover"
        },
        description: {
          en: "Darkens a hero background image using a semi-transparent linear gradient overlay.",
          vi: "Làm tối ảnh nền hero bằng lớp phủ linear gradient bán trong suốt để chữ luôn rõ nét."
        },
        code: `.hero-card {\n  background-image:\n    linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.9)),\n    url('/assets/hero.webp');\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n  color: #ffffff;\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Using background-image without providing a fallback background-color, causing unreadable text while images load.",
          vi: "Dùng background-image mà không đặt màu nền dự phòng background-color, khiến chữ bị chìm khi ảnh đang tải."
        },
        correction: {
          en: "Always supply a solid background-color matching the dominant image tone beneath background-image.",
          vi: "Luôn đặt một background-color cùng tông màu chủ đạo phía dưới background-image."
        }
      }
    ],
    tips: [
      {
        en: "Use oklch() for dynamic UI theming because changing the hue angle (H) preserves perceived brightness and accessibility contrast.",
        vi: "Dùng oklch() khi làm hệ thống đổi màu giao diện vì khi xoay góc Hue, độ sáng và độ tương phản mắt nhìn luôn được giữ nguyên vẹn."
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_6_1",
      type: "complete_code",
      title: {
        en: "Create a 2-Stop Linear Gradient",
        vi: "Tạo Dải Màu Linear Gradient 2 Điểm Dừng"
      },
      instruction: {
        en: "Apply a linear-gradient from #1e293b to #0f172a at a 135deg angle to .gradient-bg.",
        vi: "Áp dụng linear-gradient từ #1e293b sang #0f172a với góc 135deg cho .gradient-bg."
      },
      starterCode: `.gradient-bg {\n  /* Add background gradient */\n}`,
      solutionCode: `.gradient-bg {\n  background: linear-gradient(135deg, #1e293b, #0f172a);\n}`,
      hint: {
        en: "Use background: linear-gradient(135deg, #1e293b, #0f172a);",
        vi: "Dùng background: linear-gradient(135deg, #1e293b, #0f172a);"
      },
      explanation: {
        en: "linear-gradient takes an angle and color stops to create smooth transitions.",
        vi: "linear-gradient nhận góc xoay và các điểm dừng màu để tạo hiệu ứng chuyển sắc mềm mại."
      }
    },
    {
      id: "css_ex_6_2",
      type: "fix_code",
      title: {
        en: "Set Background Cover and Center",
        vi: "Đặt Hình Nền Phủ Kín Cover và Căn Giữa"
      },
      instruction: {
        en: "Add background-size: cover, background-position: center, and background-repeat: no-repeat to .card-media.",
        vi: "Thêm background-size: cover, background-position: center và background-repeat: no-repeat cho .card-media."
      },
      starterCode: `.card-media {\n  background-image: url('photo.jpg');\n}`,
      solutionCode: `.card-media {\n  background-image: url('photo.jpg');\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n}`,
      hint: {
        en: "Add background-size: cover; background-position: center; background-repeat: no-repeat;",
        vi: "Thêm background-size: cover; background-position: center; background-repeat: no-repeat;"
      },
      explanation: {
        en: "cover ensures the image fills the container completely without distortion.",
        vi: "cover đảm bảo hình nền lấp đầy toàn bộ khung chứa mà không bị méo tỷ lệ."
      }
    }
  ],
  challenge: {
    id: "css_ch_6",
    title: {
      en: "Build a Modern Frosted Card Backdrop",
      vi: "Xây Dựng Khối Thẻ Nền Kính Hiện Đại"
    },
    description: {
      en: "Style .glass-banner with background: rgba(30, 41, 59, 0.8), border: 1px solid rgba(255, 255, 255, 0.1), color: #f8fafc, and padding: 24px.",
      vi: "Tạo kiểu cho .glass-banner với background: rgba(30, 41, 59, 0.8), border: 1px solid rgba(255, 255, 255, 0.1), color: #f8fafc và padding: 24px."
    },
    requirements: [
      { en: "background: rgba(30, 41, 59, 0.8)", vi: "background: rgba(30, 41, 59, 0.8)" },
      { en: "border: 1px solid rgba(255, 255, 255, 0.1)", vi: "border: 1px solid rgba(255, 255, 255, 0.1)" },
      { en: "color: #f8fafc", vi: "color: #f8fafc" },
      { en: "padding: 24px", vi: "padding: 24px" }
    ],
    starterCode: `.glass-banner {\n  /* Add translucent color declarations */\n}`,
    solutionCode: `.glass-banner {\n  background: rgba(30, 41, 59, 0.8);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  color: #f8fafc;\n  padding: 24px;\n}`,
    hints: [
      {
        en: "Declare background, border, color, and padding using rgba colors.",
        vi: "Khai báo background, border, color và padding sử dụng hệ màu rgba."
      }
    ],
    solutionExplanation: {
      en: "Alpha transparency in RGBA creates clean layered interfaces with strong accessibility contrast.",
      vi: "Độ trong suốt Alpha trong RGBA tạo chiều sâu đa lớp sắc nét và giữ độ tương phản tiếp cận cao."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_6_1",
      type: "single_choice",
      question: {
        en: "What do the parameters in `oklch(L C H)` represent?",
        vi: "Các tham số trong `oklch(L C H)` đại diện cho những giá trị nào?"
      },
      options: [
        { en: "Lightness, Chroma, Hue", vi: "Lightness (Độ sáng), Chroma (Độ bão hòa sắc độ), Hue (Tông màu)" },
        { en: "Layer, Color, Height", vi: "Layer, Color, Height" },
        { en: "Level, Contrast, Highlight", vi: "Level, Contrast, Highlight" },
        { en: "Luminance, Cyan, Hex", vi: "Luminance, Cyan, Hex" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "OKLCH uses Lightness (perceived brightness 0-1), Chroma (saturation/purity), and Hue (color wheel angle 0-360).",
        vi: "OKLCH dùng Lightness (độ sáng mắt nhìn 0-1), Chroma (độ đậm sắc), và Hue (góc bánh xe màu 0-360)."
      },
      topicId: "css_colors",
      difficulty: "easy"
    },
    {
      id: "css_q_6_2",
      type: "single_choice",
      question: {
        en: "What does `background-size: cover;` do to an image?",
        vi: "`background-size: cover;` xử lý hình nền như thế nào?"
      },
      options: [
        { en: "Scales image proportionally to completely cover the container, cropping overflow if necessary", vi: "Co giãn ảnh theo đúng tỷ lệ để phủ kín toàn bộ khung chứa, cắt bớt phần thừa nếu cần" },
        { en: "Distorts image width and height to force exact fit", vi: "Kéo méo tỷ lệ ảnh để ép vừa khít kích thước" },
        { en: "Tiles the image repeatedly across the background", vi: "Lặp lại ảnh nhiều lần tạo hoa văn nền" },
        { en: "Shrinks the image so the entire picture is visible without cropping", vi: "Thu nhỏ ảnh để hiển thị trọn vẹn toàn bộ bức ảnh không bị cắt" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`cover` guarantees the entire container area is filled while preserving image aspect ratio.",
        vi: "`cover` đảm bảo khung chứa luôn được lấp đầy 100% trong khi vẫn giữ nguyên tỷ lệ khung hình của ảnh."
      },
      topicId: "css_colors",
      difficulty: "easy"
    },
    {
      id: "css_q_6_3",
      type: "single_choice",
      question: {
        en: "What is the keyword `currentcolor` in CSS?",
        vi: "Từ khóa `currentcolor` trong CSS có ý nghĩa gì?"
      },
      options: [
        { en: "A variable that evaluates to the computed value of the element's current text `color` property", vi: "Một biến mang giá trị được tính toán của thuộc tính `color` (màu chữ) hiện tại của phần tử" },
        { en: "The browser default background color", vi: "Màu nền mặc định của trình duyệt" },
        { en: "A random color generated at runtime", vi: "Màu ngẫu nhiên sinh ra khi chạy" },
        { en: "A shortcut for pure white (#fff)", vi: "Lối tắt cho màu trắng tinh (#fff)" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`currentcolor` inherits and reuses the current `color` value (e.g. for borders or SVG icons).",
        vi: "`currentcolor` kế thừa và tái sử dụng giá trị `color` hiện tại (ví dụ cho viền border hoặc icon SVG)."
      },
      topicId: "css_colors",
      difficulty: "medium"
    },
    {
      id: "css_q_6_4",
      type: "true_false",
      question: {
        en: "True or False: CSS linear gradients are treated by the browser as images (`<image>`) rather than solid colors.",
        vi: "Đúng hay Sai: CSS linear gradient được trình duyệt xem là một dạng hình ảnh (`<image>`) thay vì một màu đơn sắc thuần túy."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Gradients are data type <image> in CSS, so they are applied via `background-image` or `background`.",
        vi: "Gradient thuộc kiểu dữ liệu <image> trong CSS, do đó được gán thông qua `background-image` hoặc `background`."
      },
      topicId: "css_colors",
      difficulty: "easy"
    },
    {
      id: "css_q_6_5",
      type: "single_choice",
      question: {
        en: "What does the `color-mix()` function in modern CSS do?",
        vi: "Hàm `color-mix()` trong CSS hiện đại dùng để làm gì?"
      },
      options: [
        { en: "Blends two colors together in a specified color space (e.g. in oklab, color1 70%, color2 30%)", vi: "Trộn hai màu với nhau theo tỷ lệ trong một không gian màu xác định (ví dụ in oklab, color1 70%, color2 30%)" },
        { en: "Changes screen brightness automatically", vi: "Tự động đổi độ sáng màn hình" },
        { en: "Converts text to an image", vi: "Chuyển văn bản thành hình ảnh" },
        { en: "Extracts colors from user camera", vi: "Trích xuất màu từ camera người dùng" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`color-mix(in oklab, var(--primary) 80%, black)` produces smooth tinting and shading directly in CSS.",
        vi: "`color-mix(in oklab, var(--primary) 80%, black)` tạo ra các sắc độ màu sáng/tối linh hoạt trực tiếp bằng CSS."
      },
      topicId: "css_colors",
      difficulty: "hard"
    },
    {
      id: "css_q_6_6",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: The 8-digit HEX code #00000080 represents black with approximately 50% ________",
        vi: "Điền vào chỗ trống: Mã HEX 8 ký tự #00000080 đại diện cho màu đen với khoảng 50% độ trong suốt (________)"
      },
      fillBlankAnswers: ["opacity", "alpha"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: "The last two hex digits (80 = 128/255 ≈ 50%) control the alpha / opacity channel.",
        vi: "Hai ký tự hex cuối cùng (80 = 128/255 ≈ 50%) điều khiển kênh alpha / độ trong suốt."
      },
      topicId: "css_colors",
      difficulty: "medium"
    },
    {
      id: "css_q_6_7",
      type: "multiple_choice",
      question: {
        en: "Which values are valid for the `background-repeat` property? (Select all that apply)",
        vi: "Những giá trị nào sau đây là hợp lệ cho thuộc tính `background-repeat`? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "no-repeat", vi: "no-repeat" },
        { en: "repeat-x", vi: "repeat-x" },
        { en: "space", vi: "space" },
        { en: "expand", vi: "expand" }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: "no-repeat, repeat-x, repeat-y, repeat, space, and round are valid values for background-repeat.",
        vi: "no-repeat, repeat-x, repeat-y, repeat, space và round là các giá trị hợp lệ của background-repeat."
      },
      topicId: "css_colors",
      difficulty: "medium"
    },
    {
      id: "css_q_6_8",
      type: "single_choice",
      question: {
        en: "How do you specify multiple layered backgrounds on a single element?",
        vi: "Làm thế nào để áp dụng nhiều lớp hình nền chồng lên nhau trên cùng một phần tử?"
      },
      options: [
        { en: "Separate multiple background declarations with commas (first declared is top layer)", vi: "Ngăn cách các lớp hình nền bằng dấu phẩy (lớp khai báo đầu tiên nằm trên cùng)" },
        { en: "Write multiple background-image properties one after another", vi: "Viết nhiều dòng thuộc tính background-image liên tiếp" },
        { en: "Use background-layer: 1, 2, 3", vi: "Dùng background-layer: 1, 2, 3" },
        { en: "Layered backgrounds are not supported in CSS", vi: "CSS không hỗ trợ nhiều lớp nền" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Comma-separated background values stack in z-order: the first layer sits on top, subsequent layers render underneath.",
        vi: "Các giá trị nền cách nhau bởi dấu phẩy sẽ xếp lớp theo thứ tự: lớp viết trước nằm trên, lớp viết sau nằm dưới."
      },
      topicId: "css_colors",
      difficulty: "medium"
    },
    {
      id: "css_q_6_9",
      type: "true_false",
      question: {
        en: "True or False: `background-attachment: fixed;` causes the background image to remain fixed relative to the viewport while content scrolls.",
        vi: "Đúng hay Sai: `background-attachment: fixed;` làm hình nền đứng yên cố định theo màn hình khi nội dung cuộn (hiệu ứng parallax)."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "background-attachment: fixed locks the background position relative to the browser viewport.",
        vi: "background-attachment: fixed khóa vị trí hình nền cố định theo khung nhìn màn hình trình duyệt."
      },
      topicId: "css_colors",
      difficulty: "easy"
    },
    {
      id: "css_q_6_10",
      type: "single_choice",
      question: {
        en: "What advantage does `oklch()` have over `hsl()` when generating UI color palettes?",
        vi: "Ưu điểm vượt trội của `oklch()` so với `hsl()` khi tạo bảng màu giao diện là gì?"
      },
      options: [
        { en: "Uniform perceptual lightness: yellow and blue at 70% lightness actually look equally bright to the human eye", vi: "Độ sáng mắt nhìn đồng đều: màu vàng và xanh ở mức sáng 70% thực sự sáng tương đương nhau đối với mắt người" },
        { en: "It reduces file download size by 90%", vi: "Nó giảm 90% dung lượng tải file" },
        { en: "It automatically creates HTML buttons", vi: "Nó tự động tạo nút bấm HTML" },
        { en: "It only uses 3 bytes of memory", vi: "Nó chỉ tốn 3 byte bộ nhớ" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "OKLCH is perceptually uniform, solving HSL's flaw where yellow appears dramatically brighter than blue at the same lightness value.",
        vi: "OKLCH đồng đều về thị giác, khắc phục nhược điểm của HSL khi màu vàng bị quá chói còn màu xanh lại quá tối ở cùng giá trị lightness."
      },
      topicId: "css_colors",
      difficulty: "hard"
    }
  ]
};

// Lesson 7: Web Typography & Text Layout
const lesson07 = {
  id: "css_lesson_7",
  moduleId: "css_mod_basic_2",
  levelId: "basic",
  courseId: "css",
  order: 7,
  topicId: "css_typography",
  title: {
    en: "Web Typography & Text Layout",
    vi: "Nghệ Thuật Chữ Web Typography & Bố Cục Văn Bản"
  },
  summary: {
    en: "Master font stacks, @font-face, unitless line-height, letter-spacing, text-overflow truncation, and web font loading strategies.",
    vi: "Làm chủ font stacks, @font-face, line-height không đơn vị, letter-spacing, cắt ngắn văn bản text-overflow và tối ưu tải web font."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "Typography constitutes over 90% of web content consumption. Proper font pairing, unitless line-height ratios, and truncation rules ensure professional hierarchy and effortless readability.",
      vi: "Văn bản chiếm hơn 90% trải nghiệm tiếp nhận thông tin trên web. Phối hợp font chữ chuẩn, tỷ lệ line-height không đơn vị và xử lý tràn chữ giúp tạo nên thứ bậc thị giác chuyên nghiệp và dễ đọc."
    },
    conceptExplanation: {
      en: "A robust font stack starts with primary custom fonts, followed by system fallbacks (`system-ui, -apple-system, sans-serif`). `@font-face` loads external web fonts with `font-display: swap` to prevent Flash of Invisible Text (FOIT). Best practice for `line-height` is unitless (e.g. `1.5` to `1.7` for body, `1.2` for headings) so it scales proportionally across all child font sizes. Single-line truncation requires: `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`.",
      vi: "Một danh sách font stack an toàn bắt đầu bằng font tùy chỉnh, nối tiếp bởi font hệ thống (`system-ui, -apple-system, sans-serif`). Cú pháp `@font-face` tải font ngoài với `font-display: swap` để tránh hiện tượng chữ bị tàng hình khi tải (FOIT). Chuẩn mực vàng cho `line-height` là dùng số không kèm đơn vị (ví dụ `1.5` đến `1.7` cho đoạn văn, `1.2` cho tiêu đề) để tỷ lệ giãn dòng tự động nhân theo cỡ font. Cắt ngắn chữ thành dấu 3 chấm đòi hỏi: `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`."
    },
    syntax: `/* Web Font Declaration with Swap Display */\n@font-face {\n  font-family: 'Inter';\n  src: url('/fonts/Inter.woff2') format('woff2');\n  font-weight: 400 700;\n  font-display: swap;\n}\n\n/* Single line text ellipsis */\n.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}`,
    examples: [
      {
        title: {
          en: "Editorial Typography Styling",
          vi: "Thiết Lập Khối Văn Bản Báo Chí Chuẩn Mực"
        },
        description: {
          en: "Applies high-legibility proportional line-height, letter-spacing, and responsive text width.",
          vi: "Áp dụng tỷ lệ giãn dòng, khoảng cách chữ và độ rộng đoạn văn tối ưu cho mắt đọc."
        },
        code: `body {\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n  font-size: 1rem;\n  line-height: 1.6; /* Unitless! */\n  color: #334155;\n}\n\nh1 {\n  font-size: 2.25rem;\n  line-height: 1.2;\n  letter-spacing: -0.025em;\n  color: #0f172a;\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Setting fixed pixel units on line-height (e.g. line-height: 20px) which clips large headings.",
          vi: "Đặt đơn vị pixel cố định cho line-height (ví dụ line-height: 20px) khiến các tiêu đề chữ to bị đè chữ hoặc cắt cụt."
        },
        correction: {
          en: "Always use unitless numbers for line-height (e.g. 1.5) so it scales with font size.",
          vi: "Luôn dùng số không đơn vị cho line-height (ví dụ 1.5) để chiều cao dòng tự co giãn theo kích thước chữ."
        }
      }
    ],
    tips: [
      {
        en: "Always specify font-display: swap in @font-face to render fallback text immediately while web fonts download.",
        vi: "Luôn đặt font-display: swap trong @font-face để hiện chữ bằng font hệ thống ngay lập tức trong khi chờ tải font ngoài."
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_7_1",
      type: "complete_code",
      title: {
        en: "Implement Single-Line Text Truncation",
        vi: "Thực Hiện Cắt Ngắn Chữ 1 Dòng Với Dấu Ba Chấm"
      },
      instruction: {
        en: "Add white-space: nowrap, overflow: hidden, and text-overflow: ellipsis to .title-ellipsis.",
        vi: "Thêm white-space: nowrap, overflow: hidden và text-overflow: ellipsis vào .title-ellipsis."
      },
      starterCode: `.title-ellipsis {\n  /* Truncate overflow text */\n}`,
      solutionCode: `.title-ellipsis {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}`,
      hint: {
        en: "Use white-space: nowrap; overflow: hidden; text-overflow: ellipsis;",
        vi: "Dùng white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
      },
      explanation: {
        en: "All three properties must be present together for single-line ellipsis truncation to activate.",
        vi: "Cả 3 thuộc tính này bắt buộc phải đi cùng nhau thì hiệu ứng dấu 3 chấm mới hoạt động."
      }
    },
    {
      id: "css_ex_7_2",
      type: "fix_code",
      title: {
        en: "Fix Heading Line Height",
        vi: "Sửa Tỷ Lệ Giãn Dòng Cho Tiêu Đề"
      },
      instruction: {
        en: "Change line-height from 16px to unitless 1.25 on h1.headline.",
        vi: "Đổi line-height từ 16px thành số không đơn vị 1.25 cho h1.headline."
      },
      starterCode: `h1.headline {\n  font-size: 2.5rem;\n  line-height: 16px;\n}`,
      solutionCode: `h1.headline {\n  font-size: 2.5rem;\n  line-height: 1.25;\n}`,
      hint: {
        en: "Change line-height: 16px to line-height: 1.25;",
        vi: "Đổi line-height: 16px thành line-height: 1.25;"
      },
      explanation: {
        en: "Unitless line-height multiplies by the computed font-size (2.5rem * 1.25 = 3.125rem).",
        vi: "Line-height không đơn vị sẽ tự nhân với cỡ chữ (2.5rem * 1.25 = 3.125rem) giúp dòng chữ thoáng đẹp."
      }
    }
  ],
  challenge: {
    id: "css_ch_7",
    title: {
      en: "Build an Accessible Article Typography Header",
      vi: "Xây Dựng Khối Tiêu Đề Bài Báo Chuẩn Nghệ Thuật Chữ"
    },
    description: {
      en: "Style .article-title with font-size: 2rem, line-height: 1.2, letter-spacing: -0.02em, font-weight: 700, and color: #0f172a.",
      vi: "Tạo kiểu cho .article-title với font-size: 2rem, line-height: 1.2, letter-spacing: -0.02em, font-weight: 700 và color: #0f172a."
    },
    requirements: [
      { en: "font-size: 2rem", vi: "font-size: 2rem" },
      { en: "line-height: 1.2", vi: "line-height: 1.2" },
      { en: "letter-spacing: -0.02em", vi: "letter-spacing: -0.02em" },
      { en: "font-weight: 700", vi: "font-weight: 700" },
      { en: "color: #0f172a", vi: "color: #0f172a" }
    ],
    starterCode: `.article-title {\n  /* Add typography properties */\n}`,
    solutionCode: `.article-title {\n  font-size: 2rem;\n  line-height: 1.2;\n  letter-spacing: -0.02em;\n  font-weight: 700;\n  color: #0f172a;\n}`,
    hints: [
      {
        en: "Declare font-size, line-height, letter-spacing, font-weight, and color inside .article-title.",
        vi: "Khai báo font-size, line-height, letter-spacing, font-weight và color trong .article-title."
      }
    ],
    solutionExplanation: {
      en: "Tight letter-spacing and compact unitless line-height produce refined editorial display headings.",
      vi: "Khoảng cách chữ co nhẹ và giãn dòng gọn gàng tạo nên tiêu đề chuẩn phong cách tạp chí cao cấp."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_7_1",
      type: "single_choice",
      question: {
        en: "Why is a unitless value (e.g. `line-height: 1.5;`) strongly recommended over fixed units?",
        vi: "Tại sao giá trị không đơn vị (ví dụ `line-height: 1.5;`) được khuyến nghị mạnh mẽ hơn giá trị có đơn vị?"
      },
      options: [
        { en: "Child elements inherit the ratio and dynamically multiply it against their own computed font-size", vi: "Các phần tử con sẽ kế thừa tỷ lệ này và tự nhân với cỡ chữ riêng của chúng" },
        { en: "It prevents browsers from loading fonts", vi: "Nó ngăn trình duyệt tải font" },
        { en: "It enables 3D text rotation", vi: "Nó kích hoạt xoay chữ 3D" },
        { en: "Unitless values are required by HTML5", vi: "HTML5 bắt buộc phải dùng số không đơn vị" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "With unitless line-height, inherited elements calculate their line-height as `ratio * current-font-size`, preventing overlap bugs.",
        vi: "Với line-height không đơn vị, các thẻ con kế thừa sẽ tính chiều cao dòng bằng `tỷ lệ * cỡ chữ hiện tại`, tránh lỗi chữ đè nhau."
      },
      topicId: "css_typography",
      difficulty: "medium"
    },
    {
      id: "css_q_7_2",
      type: "single_choice",
      question: {
        en: "What does `font-display: swap;` inside `@font-face` accomplish?",
        vi: "`font-display: swap;` trong `@font-face` có tác dụng gì?"
      },
      options: [
        { en: "Instructs the browser to render fallback text immediately and swap in the custom font once downloaded", vi: "Yêu cầu trình duyệt hiện chữ bằng font dự phòng ngay lập tức và tự thế font tùy chỉnh khi tải xong" },
        { en: "Swaps uppercase letters to lowercase", vi: "Đổi chữ hoa thành chữ thường" },
        { en: "Rotates fonts 180 degrees", vi: "Xoay ngược font chữ 180 độ" },
        { en: "Disables bold text formatting", vi: "Tắt định dạng chữ in đậm" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`font-display: swap` eliminates Flash of Invisible Text (FOIT) by displaying system fallback fonts until web fonts finish loading.",
        vi: "`font-display: swap` loại bỏ hiện tượng chữ tàng hình (FOIT) bằng cách hiển thị font hệ thống dự phòng trong lúc chờ tải font."
      },
      topicId: "css_typography",
      difficulty: "easy"
    },
    {
      id: "css_q_7_3",
      type: "multiple_choice",
      question: {
        en: "Which three CSS properties are required together to create single-line text ellipsis truncation? (Select 3)",
        vi: "Ba thuộc tính CSS nào bắt buộc phải kết hợp cùng nhau để tạo hiệu ứng cắt chữ dấu 3 chấm trên 1 dòng? (Chọn 3)"
      },
      options: [
        { en: "white-space: nowrap;", vi: "white-space: nowrap;" },
        { en: "overflow: hidden;", vi: "overflow: hidden;" },
        { en: "text-overflow: ellipsis;", vi: "text-overflow: ellipsis;" },
        { en: "display: flex;", vi: "display: flex;" }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: "You need `white-space: nowrap` (prevent wrapping), `overflow: hidden` (clip excess), and `text-overflow: ellipsis` (render dots).",
        vi: "Bạn cần `white-space: nowrap` (không xuống dòng), `overflow: hidden` (ẩn phần tràn), và `text-overflow: ellipsis` (hiện dấu 3 chấm)."
      },
      topicId: "css_typography",
      difficulty: "medium"
    },
    {
      id: "css_q_7_4",
      type: "single_choice",
      question: {
        en: "Which modern font file format offers the highest compression and performance for web browsers?",
        vi: "Định dạng file font chữ hiện đại nào mang lại tỷ lệ nén và hiệu năng tốt nhất cho trình duyệt web?"
      },
      options: [
        { en: "WOFF2 (.woff2)", vi: "WOFF2 (.woff2)" },
        { en: "TTF (.ttf)", vi: "TTF (.ttf)" },
        { en: "EOT (.eot)", vi: "EOT (.eot)" },
        { en: "SVG Font (.svg)", vi: "SVG Font (.svg)" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "WOFF2 uses Brotli compression, providing roughly 30% smaller file sizes than WOFF and widely supported across all modern browsers.",
        vi: "WOFF2 sử dụng thuật toán nén Brotli, giúp file nhỏ hơn khoảng 30% so với WOFF1 và được hỗ trợ trên tất cả trình duyệt hiện đại."
      },
      topicId: "css_typography",
      difficulty: "easy"
    },
    {
      id: "css_q_7_5",
      type: "true_false",
      question: {
        en: "True or False: `letter-spacing` can accept negative values to tighten headline tracking.",
        vi: "Đúng hay Sai: `letter-spacing` có thể nhận giá trị âm để kéo các chữ cái trong tiêu đề lại gần nhau hơn."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Negative letter-spacing (e.g. -0.025em) is standard in modern web design for large headings.",
        vi: "Giá trị letter-spacing âm (ví dụ -0.025em) là tiêu chuẩn thiết kế hiện đại giúp các tiêu đề lớn nhìn chắc chắn và đẹp mắt hơn."
      },
      topicId: "css_typography",
      difficulty: "easy"
    },
    {
      id: "css_q_7_6",
      type: "single_choice",
      question: {
        en: "What does the property `text-transform: capitalize;` do?",
        vi: "Thuộc tính `text-transform: capitalize;` có tác dụng gì?"
      },
      options: [
        { en: "Transforms the first letter of each word to uppercase", vi: "Chuyển chữ cái đầu tiên của mỗi từ thành chữ in hoa" },
        { en: "Transforms all characters in the text to uppercase", vi: "Chuyển toàn bộ tất cả các ký tự thành chữ in hoa" },
        { en: "Converts text to bold", vi: "In đậm đoạn văn bản" },
        { en: "Underlines capital letters", vi: "Gạch chân các chữ in hoa" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "capitalize turns the first character of every word into uppercase (Title Case).",
        vi: "capitalize viết hoa chữ cái đầu tiên của từng từ trong câu (dạng Title Case)."
      },
      topicId: "css_typography",
      difficulty: "easy"
    },
    {
      id: "css_q_7_7",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: To force long unbroken words or URLs to break onto a new line and prevent container overflow, use word-break: break-________",
        vi: "Điền vào chỗ trống: Để buộc các từ quá dài hoặc link URL bẻ dòng tránh tràn khung, dùng word-break: break-________"
      },
      fillBlankAnswers: ["all", "word"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: "word-break: break-all or overflow-wrap: break-word splits long words across lines.",
        vi: "word-break: break-all hoặc overflow-wrap: break-word giúp ngắt từ dài xuống dòng linh hoạt."
      },
      topicId: "css_typography",
      difficulty: "medium"
    },
    {
      id: "css_q_7_8",
      type: "single_choice",
      question: {
        en: "Which font family keyword uses the operating system's native modern UI font?",
        vi: "Từ khóa font-family nào sẽ kích hoạt font chữ giao diện mặc định của hệ điều hành người dùng?"
      },
      options: [
        { en: "system-ui", vi: "system-ui" },
        { en: "os-font", vi: "os-font" },
        { en: "native-sans", vi: "native-sans" },
        { en: "default-device", vi: "default-device" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "`system-ui` tells the browser to use the default UI font of the host operating system (San Francisco on macOS/iOS, Segoe UI on Windows, Roboto on Android).",
        vi: "`system-ui` chỉ định trình duyệt dùng font mặc định của hệ điều hành (San Francisco trên Apple, Segoe UI trên Windows, Roboto trên Android)."
      },
      topicId: "css_typography",
      difficulty: "medium"
    },
    {
      id: "css_q_7_9",
      type: "true_false",
      question: {
        en: "True or False: `font-weight: 700;` is equivalent to the keyword `font-weight: bold;`.",
        vi: "Đúng hay Sai: `font-weight: 700;` tương đương với từ khóa `font-weight: bold;`."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "In CSS font specifications, 400 maps to 'normal' and 700 maps to 'bold'.",
        vi: "Trong chuẩn CSS, giá trị số 400 tương ứng với 'normal' và 700 tương ứng với 'bold'."
      },
      topicId: "css_typography",
      difficulty: "easy"
    },
    {
      id: "css_q_7_10",
      type: "single_choice",
      question: {
        en: "How do you clamp a paragraph to a maximum of 3 lines with an ellipsis at the end?",
        vi: "Làm thế nào để giới hạn một đoạn văn tối đa 3 dòng và hiện dấu 3 chấm ở cuối?"
      },
      options: [
        { en: "display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;", vi: "display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;" },
        { en: "max-lines: 3; text-overflow: ellipsis;", vi: "max-lines: 3; text-overflow: ellipsis;" },
        { en: "line-limit: 3;", vi: "line-limit: 3;" },
        { en: "overflow-lines: 3; clip: true;", vi: "overflow-lines: 3; clip: true;" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "The standard multi-line truncation pattern uses `-webkit-line-clamp: 3` with `-webkit-box-orient: vertical` and `overflow: hidden`.",
        vi: "Chuẩn cắt chữ nhiều dòng trên trình duyệt sử dụng `-webkit-line-clamp: 3` kết hợp với `-webkit-box-orient: vertical` và `overflow: hidden`."
      },
      topicId: "css_typography",
      difficulty: "hard"
    }
  ]
};

// Lesson 8: Element Flow & Positioning Schemes
const lesson08 = {
  id: "css_lesson_8",
  moduleId: "css_mod_basic_2",
  levelId: "basic",
  courseId: "css",
  order: 8,
  topicId: "css_positioning",
  title: {
    en: "Element Flow & Positioning Schemes",
    vi: "Luồng Phần Tử & Các Cơ Chế Định Vị Positioning"
  },
  summary: {
    en: "Master normal document flow, relative, absolute, fixed, sticky positioning, and how stacking contexts govern z-index rendering.",
    vi: "Làm chủ luồng tài liệu tự nhiên, định vị relative, absolute, fixed, sticky và cách ngữ cảnh xếp chồng (stacking context) điều khiển z-index."
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: "CSS positioning removes or offsets elements from the normal document flow. Mastering `relative`, `absolute`, `fixed`, `sticky`, and stacking contexts with `z-index` is vital for overlays, sticky headers, and modal dialogs.",
      vi: "Cơ chế định vị CSS giúp dịch chuyển hoặc tách phần tử ra khỏi luồng tài liệu thông thường. Làm chủ `relative`, `absolute`, `fixed`, `sticky` và ngữ cảnh xếp chồng với `z-index` là chìa khóa để xây dựng thanh header dính, modal và menu dropdown."
    },
    conceptExplanation: {
      en: "`static` is the default normal flow. `relative` offsets an element without removing its original space from the layout. `absolute` completely removes the element from flow, positioning it relative to its closest ancestor with a position other than static (often a parent with `position: relative`). `fixed` pins the element relative to the viewport. `sticky` toggles between relative and fixed depending on scroll threshold. `z-index` controls layer depth along the z-axis, but only functions within a Stacking Context (created by positioned elements, opacity < 1, transform, or `isolation: isolate`).",
      vi: "`static` là vị trí tự nhiên mặc định. `relative` dịch chuyển phần tử nhưng vẫn giữ nguyên khoảng trống ban đầu của nó. `absolute` tách hẳn phần tử khỏi luồng tài liệu và căn vị trí theo thẻ tổ tiên gần nhất có position khác static (thường là thẻ cha đặt `position: relative`). `fixed` ghim phần tử cố định theo màn hình viewport. `sticky` tự động chuyển đổi giữa relative và fixed khi cuộn trang qua ngưỡng xác định. `z-index` điều khiển độ sâu lớp dọc trục Z, nhưng chỉ có hiệu lực bên trong Ngữ cảnh Xếp chồng (Stacking Context)."
    },
    syntax: `/* Parent anchor for absolute child */\n.card-container {\n  position: relative;\n}\n\n/* Top-right corner badge */\n.badge-pin {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  z-index: 10;\n}\n\n/* Sticky site header */\n.sticky-nav {\n  position: sticky;\n  top: 0;\n  z-index: 50;\n}`,
    examples: [
      {
        title: {
          en: "Sticky Header and Absolute Close Button",
          vi: "Thanh Điều Hướng Dính và Nút Đóng Tuyệt Đối"
        },
        description: {
          en: "Demonstrates sticky navigation and an absolutely positioned dismiss button inside a modal dialog.",
          vi: "Minh họa thanh navbar bám dính khi cuộn và nút đóng 'X' định vị tuyệt đối ở góc modal."
        },
        code: `/* Sticky Navigation Header */\nheader.top-nav {\n  position: sticky;\n  top: 0;\n  background: #0f172a;\n  z-index: 100;\n}\n\n/* Modal Box Container */\n.modal-card {\n  position: relative;\n  padding: 24px;\n}\n\n.modal-close-btn {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Using position: absolute without declaring position: relative on the intended container, causing the child to pin to <body>.",
          vi: "Dùng position: absolute mà quên đặt position: relative cho thẻ cha, khiến thẻ con nhảy ra tận góc của thẻ <body>."
        },
        correction: {
          en: "Always add position: relative to the immediate containing parent of an absolute child.",
          vi: "Luôn đặt position: relative cho thẻ cha trực tiếp bao quanh phần tử absolute."
        }
      }
    ],
    tips: [
      {
        en: "position: sticky requires a directional offset (e.g. top: 0) and cannot work if any ancestor has overflow: hidden.",
        vi: "position: sticky bắt buộc phải có tọa độ bám (như top: 0) và sẽ bị vô hiệu hóa nếu có bất kỳ thẻ cha nào chứa overflow: hidden."
      }
    ]
  },
  exercisePool: [
    {
      id: "css_ex_8_1",
      type: "complete_code",
      title: {
        en: "Pin a Badge to Top-Right Corner",
        vi: "Ghim Huy Hiệu Vào Góc Trên Bên Phải"
      },
      instruction: {
        en: "Set position: absolute, top: 8px, and right: 8px on .status-pill inside a relative container.",
        vi: "Đặt position: absolute, top: 8px và right: 8px cho .status-pill bên trong thẻ cha relative."
      },
      starterCode: `.status-pill {\n  /* Position in top right */\n}`,
      solutionCode: `.status-pill {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n}`,
      hint: {
        en: "Use position: absolute; top: 8px; right: 8px;",
        vi: "Dùng position: absolute; top: 8px; right: 8px;"
      },
      explanation: {
        en: "position: absolute anchors the element precisely to the top-right corner of its relative parent.",
        vi: "position: absolute neo chính xác phần tử vào góc trên bên phải của thẻ cha relative."
      }
    },
    {
      id: "css_ex_8_2",
      type: "fix_code",
      title: {
        en: "Create a Sticky Navbar",
        vi: "Tạo Thanh Điều Hướng Dính Khi Cuộn"
      },
      instruction: {
        en: "Add position: sticky, top: 0, and z-index: 50 to .site-navbar.",
        vi: "Thêm position: sticky, top: 0 và z-index: 50 vào .site-navbar."
      },
      starterCode: `.site-navbar {\n  background-color: #0f172a;\n}`,
      solutionCode: `.site-navbar {\n  position: sticky;\n  top: 0;\n  z-index: 50;\n  background-color: #0f172a;\n}`,
      hint: {
        en: "Add position: sticky; top: 0; z-index: 50;",
        vi: "Thêm position: sticky; top: 0; z-index: 50;"
      },
      explanation: {
        en: "Sticky elements stick to top: 0 once scrolled past, with z-index keeping them above scrolling body content.",
        vi: "Sticky giúp phần tử bám dính ở top: 0 khi cuộn qua, z-index giữ thanh menu luôn nổi phía trên nội dung."
      }
    }
  ],
  challenge: {
    id: "css_ch_8",
    title: {
      en: "Build a Floating Action Card with Relative Anchor",
      vi: "Xây Dựng Thẻ Hành Động Nổi Với Khung Neo Relative"
    },
    description: {
      en: "Style .action-card with position: relative, padding: 24px, and background: #1e293b. Style .floating-badge with position: absolute, top: -10px, right: 16px, background: #38bdf8, color: #0f172a, and z-index: 10.",
      vi: "Tạo kiểu cho .action-card với position: relative, padding: 24px, background: #1e293b. Tạo kiểu cho .floating-badge với position: absolute, top: -10px, right: 16px, background: #38bdf8, color: #0f172a và z-index: 10."
    },
    requirements: [
      { en: ".action-card { position: relative }", vi: ".action-card { position: relative }" },
      { en: "position: absolute", vi: "position: absolute" },
      { en: "top: -10px", vi: "top: -10px" },
      { en: "right: 16px", vi: "right: 16px" },
      { en: "z-index: 10", vi: "z-index: 10" }
    ],
    starterCode: `/* Container and badge positioning */\n.action-card {\n}\n\n.floating-badge {\n}`,
    solutionCode: `.action-card {\n  position: relative;\n  padding: 24px;\n  background: #1e293b;\n}\n\n.floating-badge {\n  position: absolute;\n  top: -10px;\n  right: 16px;\n  background: #38bdf8;\n  color: #0f172a;\n  z-index: 10;\n}`,
    hints: [
      {
        en: "Use position: relative on the card and position: absolute on the badge.",
        vi: "Dùng position: relative cho card và position: absolute cho badge."
      }
    ],
    solutionExplanation: {
      en: "Combining relative parent and absolute child allows badges to float neatly over card borders.",
      vi: "Kết hợp cha relative và con absolute giúp huy hiệu nổi đẹp mắt vượt ra ngoài viền card."
    }
  },
  quizQuestionPool: [
    {
      id: "css_q_8_1",
      type: "single_choice",
      question: {
        en: "What does an element with `position: absolute;` position itself relative to?",
        vi: "Một phần tử có `position: absolute;` sẽ căn vị trí tương đối theo đối tượng nào?"
      },
      options: [
        { en: "Its nearest ancestor element that has a position other than static", vi: "Thẻ tổ tiên gần nhất có giá trị position khác static" },
        { en: "Always the browser viewport window", vi: "Luôn luôn căn theo cửa sổ màn hình trình duyệt" },
        { en: "Its immediate sibling element", vi: "Phần tử anh em nằm liền kề" },
        { en: "The <html> element exclusively", vi: "Duy nhất thẻ <html>" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "An absolute element searches up the DOM tree for the nearest positioned ancestor (relative, absolute, fixed, or sticky). If none exist, it defaults to the initial containing block (viewport/html).",
        vi: "Phần tử absolute tìm ngược lên cây DOM để tìm thẻ tổ tiên gần nhất có position khác static. Nếu không có, nó mới căn theo khung nhìn viewport."
      },
      topicId: "css_positioning",
      difficulty: "easy"
    },
    {
      id: "css_q_8_2",
      type: "single_choice",
      question: {
        en: "What is the key difference between `position: fixed;` and `position: absolute;`?",
        vi: "Khác biệt cốt lõi giữa `position: fixed;` và `position: absolute;` là gì?"
      },
      options: [
        { en: "fixed is always anchored to the browser viewport and stays in place when scrolling, while absolute scrolls with its positioned parent", vi: "fixed luôn neo vào màn hình trình duyệt và đứng yên khi cuộn trang, còn absolute cuộn theo thẻ cha của nó" },
        { en: "fixed cannot use z-index", vi: "fixed không dùng được z-index" },
        { en: "absolute elements cannot have background colors", vi: "absolute không đặt được màu nền" },
        { en: "fixed only works on mobile devices", vi: "fixed chỉ hoạt động trên di động" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "position: fixed anchors to the viewport, making it immune to document scrolling.",
        vi: "position: fixed neo theo khung nhìn màn hình, không bị trôi đi khi người dùng cuộn trang."
      },
      topicId: "css_positioning",
      difficulty: "easy"
    },
    {
      id: "css_q_8_3",
      type: "single_choice",
      question: {
        en: "Why might `position: sticky;` fail to stick when scrolling?",
        vi: "Tại sao `position: sticky;` có thể bị lỗi không bám dính khi cuộn trang?"
      },
      options: [
        { en: "An ancestor element has `overflow: hidden`, `overflow: auto`, or no top/bottom offset was defined", vi: "Một thẻ cha nào đó có thuộc tính `overflow: hidden`, `overflow: auto` hoặc chưa khai báo tọa độ top/bottom" },
        { en: "The browser is running in dark mode", vi: "Trình duyệt đang bật chế độ tối" },
        { en: "The sticky element has a border", vi: "Phần tử sticky có đường viền border" },
        { en: "The page has more than 100 lines of CSS", vi: "Trang web có hơn 100 dòng CSS" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Sticky positioning requires a scroll threshold (e.g. `top: 0`) and is disabled if an ancestor container clips overflow with `overflow: hidden`.",
        vi: "Sticky đòi hỏi phải có tọa độ bám (như `top: 0`) và sẽ mất tác dụng nếu có thẻ cha nào đó chứa thuộc tính `overflow: hidden`."
      },
      topicId: "css_positioning",
      difficulty: "medium"
    },
    {
      id: "css_q_8_4",
      type: "true_false",
      question: {
        en: "True or False: `position: relative;` removes an element completely from the document flow, collapsing the space it originally occupied.",
        vi: "Đúng hay Sai: `position: relative;` tách hoàn toàn phần tử ra khỏi luồng tài liệu, làm xẹp khoảng trống ban đầu của nó."
      },
      options: [
        { en: "False", vi: "Sai" },
        { en: "True", vi: "Đúng" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "position: relative offsets an element visually while preserving its original space in the document flow.",
        vi: "position: relative chỉ dịch chuyển hiển thị của phần tử nhưng vẫn giữ nguyên khoảng trống ban đầu của nó trong bố cục."
      },
      topicId: "css_positioning",
      difficulty: "easy"
    },
    {
      id: "css_q_8_5",
      type: "single_choice",
      question: {
        en: "Why does a higher `z-index` (e.g. `z-index: 9999`) sometimes fail to appear in front of an element with `z-index: 1`?",
        vi: "Tại sao một phần tử có `z-index: 9999` đôi khi vẫn bị nằm chìm phía dưới một phần tử có `z-index: 1`?"
      },
      options: [
        { en: "It is trapped inside a parent Stacking Context whose overall z-index is lower than the competing element's stacking context", vi: "Nó bị kẹt bên trong một Ngữ cảnh Xếp chồng (Stacking Context) cha có z-index thấp hơn ngữ cảnh của phần tử đối thủ" },
        { en: "z-index caps out at 100 in modern CSS", vi: "z-index bị giới hạn tối đa là 100 trong CSS hiện đại" },
        { en: "The background color is transparent", vi: "Do màu nền bị trong suốt" },
        { en: "The element contains text instead of images", vi: "Do phần tử chứa chữ thay vì hình ảnh" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "z-index values are evaluated locally within their parent Stacking Context. A child cannot escape its parent's stacking level.",
        vi: "z-index chỉ có giá trị so sánh nội bộ trong cùng một Ngữ cảnh Xếp chồng (Stacking Context). Thẻ con không thể vượt mặt cấp bậc của thẻ cha."
      },
      topicId: "css_positioning",
      difficulty: "hard"
    },
    {
      id: "css_q_8_6",
      type: "fill_blank",
      question: {
        en: "Fill in the blank: To explicitly create a new isolated stacking context on an element without altering positioning or opacity, use the property isolation: ________",
        vi: "Điền vào chỗ trống: Để chủ động tạo một ngữ cảnh xếp chồng độc lập mới mà không cần đổi position hay opacity, dùng thuộc tính isolation: ________"
      },
      fillBlankAnswers: ["isolate"],
      options: [],
      correctAnswers: [0],
      explanation: {
        en: "isolation: isolate creates a clean new stacking context, preventing child z-index leakage.",
        vi: "isolation: isolate tạo ra một ngữ cảnh xếp chồng mới sạch sẽ, ngăn rò rỉ z-index của các thẻ con."
      },
      topicId: "css_positioning",
      difficulty: "hard"
    },
    {
      id: "css_q_8_7",
      type: "multiple_choice",
      question: {
        en: "Which of the following actions create a new Stacking Context in CSS? (Select all that apply)",
        vi: "Những hành động nào sau đây sẽ tạo ra một Ngữ cảnh Xếp chồng (Stacking Context) mới trong CSS? (Chọn tất cả đáp án đúng)"
      },
      options: [
        { en: "An element with position: relative and z-index other than auto", vi: "Phần tử có position: relative và z-index khác auto" },
        { en: "An element with opacity less than 1 (e.g. opacity: 0.95)", vi: "Phần tử có opacity nhỏ hơn 1 (ví dụ opacity: 0.95)" },
        { en: "An element with transform (e.g. transform: scale(1))", vi: "Phần tử có thuộc tính transform (ví dụ transform: scale(1))" },
        { en: "Setting font-size: 16px", vi: "Đặt font-size: 16px" }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: "Positioned elements with z-index, opacity < 1, transforms, filters, and isolation: isolate all instantiate new stacking contexts.",
        vi: "Phần tử định vị có z-index, opacity < 1, transform, filter và isolation: isolate đều tạo ra một stacking context mới."
      },
      topicId: "css_positioning",
      difficulty: "hard"
    },
    {
      id: "css_q_8_8",
      type: "single_choice",
      question: {
        en: "What is the default value of the `position` property in CSS?",
        vi: "Giá trị mặc định của thuộc tính `position` trong CSS là gì?"
      },
      options: [
        { en: "static", vi: "static" },
        { en: "relative", vi: "relative" },
        { en: "absolute", vi: "absolute" },
        { en: "initial-flow", vi: "initial-flow" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Elements have position: static by default, rendering in normal document flow and ignoring top/right/bottom/left/z-index.",
        vi: "Mặc định mọi phần tử có position: static, nằm trong luồng tài liệu tự nhiên và bỏ qua các thuộc tính top/right/bottom/left/z-index."
      },
      topicId: "css_positioning",
      difficulty: "easy"
    },
    {
      id: "css_q_8_9",
      type: "predict_output",
      question: {
        en: "An element has `position: static; top: 50px; z-index: 10;`. How does it move?",
        vi: "Một phần tử có `position: static; top: 50px; z-index: 10;`. Phần tử này sẽ di chuyển như thế nào?"
      },
      options: [
        { en: "It does not move at all (top and z-index have no effect on static elements)", vi: "Nó hoàn toàn không di chuyển (top và z-index vô tác dụng trên phần tử static)" },
        { en: "It moves down by 50px", vi: "Nó dịch xuống dưới 50px" },
        { en: "It jumps to the top of the page", vi: "Nó nhảy lên đỉnh trang" },
        { en: "It hides behind the body", vi: "Nó ẩn ra phía sau thẻ body" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "Coordinate offsets (top/left/right/bottom) and z-index are completely ignored on elements with position: static.",
        vi: "Các thuộc tính tọa độ (top/left/right/bottom) và z-index hoàn toàn bị bỏ qua trên phần tử position: static."
      },
      topicId: "css_positioning",
      difficulty: "easy"
    },
    {
      id: "css_q_8_10",
      type: "true_false",
      question: {
        en: "True or False: Using `inset: 0;` is shorthand for `top: 0; right: 0; bottom: 0; left: 0;`.",
        vi: "Đúng hay Sai: Thuộc tính `inset: 0;` là cách viết tắt của `top: 0; right: 0; bottom: 0; left: 0;`."
      },
      options: [
        { en: "True", vi: "Đúng" },
        { en: "False", vi: "Sai" }
      ],
      correctAnswers: [0],
      explanation: {
        en: "inset is standard shorthand for all four directional offsets (top, right, bottom, left) on positioned elements.",
        vi: "inset là cú pháp viết tắt chuẩn cho cả 4 tọa độ (top, right, bottom, left) của phần tử định vị."
      },
      topicId: "css_positioning",
      difficulty: "easy"
    }
  ]
};

// Save lessons
saveLesson('src/data/css/basic/module02/lesson05.ts', 'lesson05', lesson05);
saveLesson('src/data/css/basic/module02/lesson06.ts', 'lesson06', lesson06);
saveLesson('src/data/css/basic/module02/lesson07.ts', 'lesson07', lesson07);
saveLesson('src/data/css/basic/module02/lesson08.ts', 'lesson08', lesson08);

// Module 2 index
const mod2Index = `export { lesson05 } from './lesson05';\nexport { lesson06 } from './lesson06';\nexport { lesson07 } from './lesson07';\nexport { lesson08 } from './lesson08';\n`;
fs.writeFileSync('src/data/css/basic/module02/index.ts', mod2Index, 'utf8');
console.log('Saved: src/data/css/basic/module02/index.ts');

// Basic Level index
const basicIndex = `export * from './module01';\nexport * from './module02';\n`;
fs.writeFileSync('src/data/css/basic/index.ts', basicIndex, 'utf8');
console.log('Saved: src/data/css/basic/index.ts');
