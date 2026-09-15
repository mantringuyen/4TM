import { Lesson } from '../../../../types';

export const lesson05: Lesson = {
  "id": "css_lesson_5",
  "moduleId": "css_mod_2",
  "levelId": "basic",
  "courseId": "css",
  "order": 5,
  "topicId": "css_box_model",
  "title": {
    "en": "The CSS Box Model & Sizing",
    "vi": "Mô Hình Hộp CSS Box Model & Kích Thước"
  },
  "summary": {
    "en": "Master content, padding, border, margin, margin collapse, and why box-sizing: border-box is the universal layout standard.",
    "vi": "Làm chủ content, padding, border, margin, hiện tượng chập lề (margin collapse) và lý do box-sizing: border-box là chuẩn mực toàn cầu."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "Every HTML element rendered in the browser is a rectangular box consisting of four concentric layers: Content, Padding, Border, and Margin. Understanding how dimensions are computed prevents layout overflow bugs.",
      "vi": "Mọi phần tử HTML render trên trình duyệt đều là một khối hộp chữ nhật gồm 4 lớp đồng tâm: Nội dung (Content), Khoảng đệm (Padding), Đường viền (Border) và Lề ngoài (Margin). Hiểu cách tính toán kích thước giúp ngăn chặn triệt để lỗi tràn giao diện."
    },
    "conceptExplanation": {
      "en": "By default, `box-sizing: content-box` calculates element width as `content width + padding + border`, meaning a 200px box with 20px padding and 2px border becomes 244px wide! In contrast, `box-sizing: border-box` keeps the total rendered width exactly at 200px by absorbing padding and border inward. Vertical margins between block elements can 'collapse' into a single shared margin equal to the larger of the two.",
      "vi": "Theo mặc định, `box-sizing: content-box` tính tổng chiều rộng bằng `content + padding + border`, khiến một khối 200px có 20px padding và 2px viền sẽ phình to thành 244px! Ngược lại, `box-sizing: border-box` giữ nguyên kích thước tổng là 200px bằng cách ép padding và viền vào trong. Lề dọc (vertical margins) giữa các phần tử khối có thể 'chập' lại với nhau thành một khoảng lề duy nhất bằng giá trị lớn hơn."
    },
    "syntax": "/* Universal Box-Sizing Reset */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n.card {\n  width: 320px;\n  padding: 24px;\n  border: 1px solid #334155;\n  margin: 16px 0;\n}",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "Predictable Layout with border-box",
          "vi": "Bố Cục Chính Xác Tuyệt Đối Với border-box"
        },
        "description": {
          "en": "Shows how two 50% width columns fit side-by-side without wrapping when padding is applied.",
          "vi": "Minh họa 2 cột rộng 50% đứng cạnh nhau vừa khít không bị rớt dòng khi có padding."
        },
        "code": "/* Container with two half-width columns */\n.col {\n  box-sizing: border-box;\n  width: 50%;\n  padding: 16px;\n  float: left; /* Or inline-block/flex */\n  background-color: #1e293b;\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Trying to apply top/bottom margins or padding to inline elements (like <span>) and expecting height expansion.",
          "vi": "Áp dụng margin hoặc padding trên/dưới cho thẻ inline (như <span>) và mong chờ chiều cao giãn ra."
        },
        "correction": {
          "en": "Set display: inline-block or block on the element before adjusting vertical spacing.",
          "vi": "Đặt display: inline-block hoặc block cho phần tử trước khi tùy chỉnh khoảng cách dọc."
        }
      }
    ],
    "tips": [
      {
        "en": "Always apply the universal box-sizing: border-box reset at the top of your global stylesheet.",
        "vi": "Luôn đặt bộ reset toàn cục box-sizing: border-box ở đầu file CSS dự án của bạn."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_5_1",
      "type": "complete_code",
      "title": {
        "en": "Apply Universal Box Sizing Reset",
        "vi": "Thiết Lập Reset Box Sizing Toàn Cục"
      },
      "instruction": {
        "en": "Apply box-sizing: border-box to all elements and pseudo-elements (*, *::before, *::after).",
        "vi": "Áp dụng box-sizing: border-box cho tất cả phần tử và pseudo-elements (*, *::before, *::after)."
      },
      "starterCode": "*,\n*::before,\n*::after {\n  /* Set box-sizing */\n}",
      "solutionCode": "*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}",
      "hint": {
        "en": "Use box-sizing: border-box;",
        "vi": "Dùng box-sizing: border-box;"
      },
      "explanation": {
        "en": "The universal border-box reset ensures predictable width calculations across all components.",
        "vi": "Reset border-box toàn cục đảm bảo kích thước chiều rộng luôn được tính toán nhất quán trên mọi component."
      }
    },
    {
      "id": "css_ex_5_2",
      "type": "fix_code",
      "title": {
        "en": "Fix Overflow on Form Input",
        "vi": "Sửa Lỗi Tràn Chiều Rộng Ô Input"
      },
      "instruction": {
        "en": "Add box-sizing: border-box to input.full-width so width: 100% does not overflow its parent with padding.",
        "vi": "Thêm box-sizing: border-box vào input.full-width để width: 100% không làm tràn ra ngoài thẻ cha khi có padding."
      },
      "starterCode": "input.full-width {\n  width: 100%;\n  padding: 12px 16px;\n  border: 1px solid #475569;\n}",
      "solutionCode": "input.full-width {\n  box-sizing: border-box;\n  width: 100%;\n  padding: 12px 16px;\n  border: 1px solid #475569;\n}",
      "hint": {
        "en": "Add box-sizing: border-box;",
        "vi": "Thêm box-sizing: border-box;"
      },
      "explanation": {
        "en": "border-box includes padding inside the 100% width, preventing horizontal scrollbars.",
        "vi": "border-box gom khoảng đệm padding vào trong 100% chiều rộng, loại bỏ hiện tượng tràn thanh cuộn ngang."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_5",
    "title": {
      "en": "Build a High-Precision Profile Card Layout",
      "vi": "Xây Dựng Bố Cục Thẻ Hồ Sơ Chuẩn Box Model"
    },
    "description": {
      "en": "Style .profile-box with box-sizing: border-box, width: 340px, padding: 24px, border: 2px solid #3b82f6, and margin: 20px auto.",
      "vi": "Tạo kiểu .profile-box với box-sizing: border-box, width: 340px, padding: 24px, border: 2px solid #3b82f6 và margin: 20px auto."
    },
    "requirements": [
      {
        "en": "box-sizing: border-box",
        "vi": "box-sizing: border-box"
      },
      {
        "en": "width: 340px",
        "vi": "width: 340px"
      },
      {
        "en": "padding: 24px",
        "vi": "padding: 24px"
      },
      {
        "en": "border: 2px solid #3b82f6",
        "vi": "border: 2px solid #3b82f6"
      },
      {
        "en": "margin: 20px auto",
        "vi": "margin: 20px auto"
      }
    ],
    "starterCode": ".profile-box {\n  /* Add box model styles */\n}",
    "solutionCode": ".profile-box {\n  box-sizing: border-box;\n  width: 340px;\n  padding: 24px;\n  border: 2px solid #3b82f6;\n  margin: 20px auto;\n}",
    "hints": [
      {
        "en": "Declare box-sizing, width, padding, border, and margin inside .profile-box.",
        "vi": "Khai báo box-sizing, width, padding, border và margin trong .profile-box."
      }
    ],
    "solutionExplanation": {
      "en": "The combination of border-box and margin: auto creates a centered container with locked dimensions.",
      "vi": "Sự kết hợp giữa border-box và margin: auto tạo nên một khối căn giữa hoàn hảo với kích thước cố định an toàn."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_5_1",
      "type": "single_choice",
      "question": {
        "en": "What are the four layers of the CSS Box Model from inside to outside?",
        "vi": "Bốn lớp của mô hình hộp CSS Box Model tính từ trong ra ngoài là gì?"
      },
      "options": [
        {
          "en": "Content, Padding, Border, Margin",
          "vi": "Content, Padding, Border, Margin"
        },
        {
          "en": "Content, Margin, Border, Padding",
          "vi": "Content, Margin, Border, Padding"
        },
        {
          "en": "Border, Padding, Content, Margin",
          "vi": "Border, Padding, Content, Margin"
        },
        {
          "en": "Padding, Content, Border, Margin",
          "vi": "Padding, Content, Border, Margin"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The Box Model starts at the inner Content, surrounded by Padding, wrapped by Border, and spaced by Margin.",
        "vi": "Box Model bắt đầu từ Content ở trong cùng, bọc bởi Padding, viền Border, và khoảng cách ngoài Margin."
      },
      "topicId": "css_box_model",
      "difficulty": "easy"
    },
    {
      "id": "css_q_5_2",
      "type": "single_choice",
      "question": {
        "en": "With `box-sizing: content-box`, what is the total rendered width of an element with `width: 200px`, `padding: 20px`, and `border: 5px`?",
        "vi": "Với `box-sizing: content-box`, tổng chiều rộng hiển thị của phần tử có `width: 200px`, `padding: 20px` và `border: 5px` là bao nhiêu?"
      },
      "options": [
        {
          "en": "250px (200 + 20*2 + 5*2)",
          "vi": "250px (200 + 20*2 + 5*2)"
        },
        {
          "en": "200px",
          "vi": "200px"
        },
        {
          "en": "225px",
          "vi": "225px"
        },
        {
          "en": "240px",
          "vi": "240px"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In content-box: Total width = width + padding-left + padding-right + border-left + border-right = 200 + 40 + 10 = 250px.",
        "vi": "Trong content-box: Tổng width = width + padding trái/phải + border trái/phải = 200 + 40 + 10 = 250px."
      },
      "topicId": "css_box_model",
      "difficulty": "medium"
    },
    {
      "id": "css_q_5_3",
      "type": "single_choice",
      "question": {
        "en": "With `box-sizing: border-box`, what happens when you increase an element's padding?",
        "vi": "Với `box-sizing: border-box`, điều gì xảy ra khi bạn tăng padding của phần tử?"
      },
      "options": [
        {
          "en": "The content area shrinks to keep the total box size unchanged",
          "vi": "Vùng nội dung co lại để giữ nguyên tổng kích thước của khối"
        },
        {
          "en": "The entire element expands in width and height",
          "vi": "Toàn bộ phần tử bị phình to chiều rộng và chiều cao"
        },
        {
          "en": "The border turns transparent",
          "vi": "Đường viền trở nên trong suốt"
        },
        {
          "en": "The margin collapses to 0",
          "vi": "Lề ngoài bị triệt tiêu về 0"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Under border-box, padding and border are absorbed inside the declared width/height, reducing the inner content area.",
        "vi": "Dưới border-box, padding và viền được gom vào bên trong kích thước đã khai báo, làm thu nhỏ diện tích content bên trong."
      },
      "topicId": "css_box_model",
      "difficulty": "easy"
    },
    {
      "id": "css_q_5_4",
      "type": "true_false",
      "question": {
        "en": "True or False: Vertical margins between adjacent block elements collapse, but horizontal margins never collapse.",
        "vi": "Đúng hay Sai: Lề dọc (vertical margins) giữa các khối liền kề có thể chập vào nhau, nhưng lề ngang (horizontal margins) không bao giờ chập."
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
        "en": "Margin collapsing only occurs vertically between block elements in normal flow, never horizontally.",
        "vi": "Hiện tượng Margin collapsing chỉ xảy ra theo phương thẳng đứng giữa các khối block trong luồng thông thường, không bao giờ xảy ra theo phương ngang."
      },
      "topicId": "css_box_model",
      "difficulty": "medium"
    },
    {
      "id": "css_q_5_5",
      "type": "single_choice",
      "question": {
        "en": "Two sibling block paragraphs have `margin-bottom: 30px` and `margin-top: 20px`. What is the distance between them?",
        "vi": "Hai đoạn văn liền kề có `margin-bottom: 30px` và `margin-top: 20px`. Khoảng cách thực tế giữa chúng là bao nhiêu?"
      },
      "options": [
        {
          "en": "30px (margins collapse to the largest value)",
          "vi": "30px (lề chập lại và lấy giá trị lớn nhất)"
        },
        {
          "en": "50px (30 + 20)",
          "vi": "50px (30 + 20)"
        },
        {
          "en": "20px",
          "vi": "20px"
        },
        {
          "en": "10px (30 - 20)",
          "vi": "10px (30 - 20)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "When positive vertical margins collapse, the resulting space equals the maximum of the two margin values (max(30px, 20px) = 30px).",
        "vi": "Khi chập lề dọc dương, khoảng cách thực tế bằng giá trị lớn nhất giữa hai lề (max(30px, 20px) = 30px)."
      },
      "topicId": "css_box_model",
      "difficulty": "medium"
    },
    {
      "id": "css_q_5_6",
      "type": "single_choice",
      "question": {
        "en": "Which shorthand value sets `margin-top: 10px`, `margin-right: 20px`, `margin-bottom: 30px`, and `margin-left: 40px`?",
        "vi": "Cú pháp viết tắt nào thiết lập đúng `margin-top: 10px`, `margin-right: 20px`, `margin-bottom: 30px`, và `margin-left: 40px`?"
      },
      "options": [
        {
          "en": "margin: 10px 20px 30px 40px;",
          "vi": "margin: 10px 20px 30px 40px;"
        },
        {
          "en": "margin: 40px 30px 20px 10px;",
          "vi": "margin: 40px 30px 20px 10px;"
        },
        {
          "en": "margin: 10px 30px 20px 40px;",
          "vi": "margin: 10px 30px 20px 40px;"
        },
        {
          "en": "margin: 20px 40px 10px 30px;",
          "vi": "margin: 20px 40px 10px 30px;"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "CSS 4-value shorthand follows clockwise order: Top, Right, Bottom, Left (TRBL).",
        "vi": "Cú pháp 4 giá trị trong CSS tuân theo chiều kim đồng hồ: Top, Right, Bottom, Left (Trên, Phải, Dưới, Trái)."
      },
      "topicId": "css_box_model",
      "difficulty": "easy"
    },
    {
      "id": "css_q_5_7",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: To horizontally center a block element with a fixed width, use margin: 0 ________",
        "vi": "Điền vào chỗ trống: Để căn giữa theo chiều ngang một khối block có chiều rộng cố định, dùng margin: 0 ________"
      },
      "fillBlankAnswers": [
        "auto"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "margin: 0 auto divides the remaining horizontal space equally between left and right margins.",
        "vi": "margin: 0 auto chia đều khoảng trống còn lại sang 2 bên lề trái và phải để căn giữa."
      },
      "topicId": "css_box_model",
      "difficulty": "easy"
    },
    {
      "id": "css_q_5_8",
      "type": "multiple_choice",
      "question": {
        "en": "Which properties create spacing inside vs outside the element border? (Select all that apply)",
        "vi": "Những thuộc tính nào tạo khoảng cách bên trong so với bên ngoài đường viền phần tử? (Chọn tất cả đáp án đúng)"
      },
      "options": [
        {
          "en": "padding creates spacing inside the border",
          "vi": "padding tạo khoảng đệm bên trong đường viền"
        },
        {
          "en": "margin creates spacing outside the border",
          "vi": "margin tạo khoảng cách bên ngoài đường viền"
        },
        {
          "en": "border-radius changes the margin size",
          "vi": "border-radius thay đổi kích thước margin"
        },
        {
          "en": "outline is rendered outside the border and does not take up layout space",
          "vi": "outline nằm bên ngoài border và không chiếm diện tích layout"
        }
      ],
      "correctAnswers": [
        0,
        1,
        3
      ],
      "explanation": {
        "en": "Padding is inside, Margin is outside, and Outline draws outside the border without shifting surrounding layout.",
        "vi": "Padding ở trong, Margin ở ngoài, và Outline vẽ ngoài viền mà không đẩy bố cục xung quanh."
      },
      "topicId": "css_box_model",
      "difficulty": "medium"
    },
    {
      "id": "css_q_5_9",
      "type": "single_choice",
      "question": {
        "en": "Can `margin` accept negative values (e.g. `margin-top: -20px`)?",
        "vi": "`margin` có thể nhận giá trị âm hay không (ví dụ `margin-top: -20px`)?"
      },
      "options": [
        {
          "en": "Yes, negative margins pull the element or adjacent siblings in that direction",
          "vi": "Có, margin âm sẽ kéo phần tử hoặc phần tử lân cận về phía đó"
        },
        {
          "en": "No, CSS triggers a syntax error on negative margins",
          "vi": "Không, CSS sẽ báo lỗi cú pháp nếu dùng margin âm"
        },
        {
          "en": "Only on <body> tags",
          "vi": "Chỉ dùng được trên thẻ <body>"
        },
        {
          "en": "Only inside Flexbox containers",
          "vi": "Chỉ dùng được trong khối Flexbox"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Negative margins are fully valid and widely used for overlapping elements or pulling child elements outside container padding.",
        "vi": "Margin âm hoàn toàn hợp lệ, thường dùng để tạo hiệu ứng xếp chồng lớp hoặc kéo phần tử tràn ra ngoài vùng đệm của cha."
      },
      "topicId": "css_box_model",
      "difficulty": "medium"
    },
    {
      "id": "css_q_5_10",
      "type": "true_false",
      "question": {
        "en": "True or False: An element with `display: inline` respects declared `width` and `height` properties.",
        "vi": "Đúng hay Sai: Một phần tử có `display: inline` vẫn nhận các thuộc tính `width` và `height` đã đặt."
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
        "en": "Inline elements ignore width and height. You must change their display to inline-block or block.",
        "vi": "Phần tử inline thuần túy bỏ qua width và height. Bạn phải đổi display sang inline-block hoặc block."
      },
      "topicId": "css_box_model",
      "difficulty": "easy"
    }
  ]
};
