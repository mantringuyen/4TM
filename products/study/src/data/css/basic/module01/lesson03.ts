import { Lesson } from '../../../../types';

export const lesson03: Lesson = {
  "id": "css_lesson_3",
  "moduleId": "css_mod_1",
  "levelId": "basic",
  "courseId": "css",
  "order": 3,
  "topicId": "css_pseudo",
  "title": {
    "en": "Pseudo-classes & Pseudo-elements",
    "vi": "Pseudo-classes & Pseudo-elements"
  },
  "summary": {
    "en": "Differentiate state-based pseudo-classes (:hover, :focus-visible, :nth-child) and structural pseudo-elements (::before, ::after, ::placeholder).",
    "vi": "Phân biệt pseudo-classes biểu thị trạng thái (:hover, :focus-visible, :nth-child) và pseudo-elements tạo cấu trúc ảo (::before, ::after, ::placeholder)."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "Pseudo-classes (single colon ':') select elements based on state, interaction, or document position. Pseudo-elements (double colon '::') create and style virtual sub-elements that do not exist explicitly in the HTML DOM.",
      "vi": "Pseudo-classes (dấu 2 chấm đơn ':') nhắm vào trạng thái, tương tác người dùng hoặc vị trí trong DOM. Pseudo-elements (dấu 2 chấm kép '::') tạo và tạo kiểu cho các phần tử con ảo không tồn tại sẵn trong mã HTML."
    },
    "conceptExplanation": {
      "en": "Common dynamic pseudo-classes include `:hover`, `:active`, `:focus`, and `:focus-visible` (best for keyboard accessibility). Structural pseudo-classes include `:first-child`, `:last-child`, `:nth-child(An+B)` (e.g. `:nth-child(2n)` for alternating rows), and `:nth-of-type()`. Pseudo-elements `::before` and `::after` require `content: ''` to render and are commonly used for decorative icons, badges, and accents. `::placeholder` styles input hints, and `::selection` customizes text highlighting.",
      "vi": "Các pseudo-classes động phổ biến gồm `:hover`, `:active`, `:focus`, và `:focus-visible` (tối ưu khả năng truy cập qua bàn phím). Các pseudo-class vị trí gồm `:first-child`, `:last-child`, `:nth-child(An+B)` và `:nth-of-type()`. Pseudo-elements `::before` và `::after` bắt buộc phải có thuộc tính `content: ''` để hiển thị, chuyên dùng tạo icon trang trí, huy hiệu và viền nhấn. `::placeholder` chỉnh kiểu chữ gợi ý, còn `::selection` đổi màu vùng bôi đen."
    },
    "syntax": "/* Dynamic & Accessibility pseudo-class */\nbutton:focus-visible {\n  outline: 2px solid #38bdf8;\n  outline-offset: 2px;\n}\n\n/* Pseudo-element decorative badge */\n.badge::before {\n  content: \"★ \";\n  color: #f59e0b;\n}",
    "examples": [
      {
        "language": "css",
        "title": {
          "en": "Zebra Striping and Custom Tooltip Accent",
          "vi": "Kẻ Bảng So Le (Zebra Striping) và Điểm Nhấn Tooltip"
        },
        "description": {
          "en": "Uses :nth-child(even) for alternating table rows and ::after for an indicator dot.",
          "vi": "Dùng :nth-child(even) tạo màu so le cho hàng bảng và ::after tạo chấm chỉ báo trạng thái."
        },
        "code": "/* Alternate row background */\ntr:nth-child(even) {\n  background-color: #1e293b;\n}\n\n/* Status indicator dot using ::after */\n.status-online::after {\n  content: \"\";\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background-color: #22c55e;\n  margin-left: 6px;\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Forgetting to declare content: '' on ::before or ::after, preventing the element from rendering.",
          "vi": "Quên khai báo content: '' cho ::before hoặc ::after khiến phần tử ảo không thể hiển thị."
        },
        "correction": {
          "en": "Always supply content: '' (even if empty string) when initializing ::before and ::after.",
          "vi": "Luôn luôn khai báo content: '' (dù là chuỗi rỗng) khi sử dụng ::before và ::after."
        }
      }
    ],
    "tips": [
      {
        "en": "Use :focus-visible instead of :focus to avoid distracting focus rings on mouse clicks while preserving keyboard tab navigation.",
        "vi": "Dùng :focus-visible thay vì :focus để không hiện viền xanh khi nhấp chuột mà vẫn giữ điều hướng chuẩn qua phím Tab."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "css_ex_3_1",
      "type": "complete_code",
      "title": {
        "en": "Style Keyboard Focus Indicator",
        "vi": "Tạo Hiệu Ứng Tiêu Điểm Bàn Phím"
      },
      "instruction": {
        "en": "Add a :focus-visible rule for .action-link with outline: 2px solid #38bdf8 and outline-offset: 4px.",
        "vi": "Thêm quy tắc :focus-visible cho .action-link với outline: 2px solid #38bdf8 và outline-offset: 4px."
      },
      "starterCode": ".action-link {\n  color: #38bdf8;\n}\n\n/* Add :focus-visible */\n.action-link {\n}",
      "solutionCode": ".action-link {\n  color: #38bdf8;\n}\n\n.action-link:focus-visible {\n  outline: 2px solid #38bdf8;\n  outline-offset: 4px;\n}",
      "hint": {
        "en": "Use .action-link:focus-visible { outline: 2px solid #38bdf8; outline-offset: 4px; }",
        "vi": "Dùng .action-link:focus-visible { outline: 2px solid #38bdf8; outline-offset: 4px; }"
      },
      "explanation": {
        "en": ":focus-visible ensures accessible navigation for keyboard users.",
        "vi": ":focus-visible đảm bảo trải nghiệm tiếp cận chuẩn mực cho người dùng bàn phím."
      }
    },
    {
      "id": "css_ex_3_2",
      "type": "fix_code",
      "title": {
        "en": "Fix ::before Missing Content Property",
        "vi": "Sửa Lỗi Thiếu Content Trong ::before"
      },
      "instruction": {
        "en": "Add content: '' and background-color: #3b82f6 to the .pill::before pseudo-element.",
        "vi": "Thêm content: '' và background-color: #3b82f6 vào pseudo-element .pill::before."
      },
      "starterCode": ".pill::before {\n  display: inline-block;\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n}",
      "solutionCode": ".pill::before {\n  content: \"\";\n  display: inline-block;\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background-color: #3b82f6;\n}",
      "hint": {
        "en": "Add content: \"\"; and background-color: #3b82f6;",
        "vi": "Thêm content: \"\"; và background-color: #3b82f6;"
      },
      "explanation": {
        "en": "Without content property, ::before generates no box in the rendering tree.",
        "vi": "Nếu thiếu thuộc tính content, ::before sẽ không tạo ra khối hiển thị trên màn hình."
      }
    }
  ],
  "challenge": {
    "id": "css_ch_3",
    "title": {
      "en": "Build an Interactive Card Badge with Pseudo Elements",
      "vi": "Xây Dựng Thẻ Tương Tác Với Huy Hiệu Bằng Pseudo Elements"
    },
    "description": {
      "en": "Style .card:hover with border-color: #38bdf8, and style .card::after with content: 'NEW', display: inline-block, background: #0284c7, color: #fff, and padding: 2px 8px.",
      "vi": "Thiết lập .card:hover với border-color: #38bdf8, và .card::after với content: 'NEW', display: inline-block, background: #0284c7, color: #fff, padding: 2px 8px."
    },
    "requirements": [
      {
        "en": ".card:hover { border-color: #38bdf8 }",
        "vi": ".card:hover { border-color: #38bdf8 }"
      },
      {
        "en": "content: 'NEW'",
        "vi": "content: 'NEW'"
      },
      {
        "en": "background: #0284c7",
        "vi": "background: #0284c7"
      },
      {
        "en": "color: #fff",
        "vi": "color: #fff"
      }
    ],
    "starterCode": ".card {\n  border: 1px solid #334155;\n  padding: 16px;\n}\n\n/* Add hover and ::after styles */",
    "solutionCode": ".card {\n  border: 1px solid #334155;\n  padding: 16px;\n}\n\n.card:hover {\n  border-color: #38bdf8;\n}\n\n.card::after {\n  content: \"NEW\";\n  display: inline-block;\n  background: #0284c7;\n  color: #fff;\n  padding: 2px 8px;\n}",
    "hints": [
      {
        "en": "Define .card:hover and .card::after blocks separately.",
        "vi": "Định nghĩa riêng biệt khối .card:hover và .card::after."
      }
    ],
    "solutionExplanation": {
      "en": "Combining hover pseudo-classes and ::after badges enriches cards without cluttering HTML markup.",
      "vi": "Kết hợp pseudo-class hover và huy hiệu ::after làm phong phú giao diện mà không làm bẩn mã HTML."
    }
  },
  "quizQuestionPool": [
    {
      "id": "css_q_3_1",
      "type": "single_choice",
      "question": {
        "en": "What is the key syntactical difference between pseudo-classes and pseudo-elements in CSS3?",
        "vi": "Sự khác biệt chính về cú pháp giữa pseudo-classes và pseudo-elements trong chuẩn CSS3 là gì?"
      },
      "options": [
        {
          "en": "Pseudo-classes use a single colon (:), while pseudo-elements use a double colon (::)",
          "vi": "Pseudo-classes dùng một dấu hai chấm (:), còn pseudo-elements dùng hai dấu hai chấm (::)"
        },
        {
          "en": "Pseudo-classes only apply to links",
          "vi": "Pseudo-classes chỉ dùng cho thẻ liên kết"
        },
        {
          "en": "Pseudo-elements require JavaScript to activate",
          "vi": "Pseudo-elements cần JavaScript để kích hoạt"
        },
        {
          "en": "There is no difference; they are completely interchangeable",
          "vi": "Không có khác biệt nào, chúng hoàn toàn thay thế được cho nhau"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "CSS3 introduced the double-colon notation (::) to explicitly distinguish pseudo-elements from pseudo-classes (:).",
        "vi": "CSS3 quy định dấu :: cho pseudo-elements để phân biệt rõ ràng với pseudo-classes (:)."
      },
      "topicId": "css_pseudo",
      "difficulty": "easy"
    },
    {
      "id": "css_q_3_2",
      "type": "single_choice",
      "question": {
        "en": "Which property is mandatory for `::before` and `::after` to render on the page?",
        "vi": "Thuộc tính nào là bắt buộc phải có để `::before` và `::after` hiển thị được trên trang?"
      },
      "options": [
        {
          "en": "content",
          "vi": "content"
        },
        {
          "en": "display",
          "vi": "display"
        },
        {
          "en": "width",
          "vi": "width"
        },
        {
          "en": "position",
          "vi": "position"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Without the `content` property (even an empty string `content: ''`), the browser generates no box for ::before or ::after.",
        "vi": "Nếu không có thuộc tính `content` (kể cả chuỗi rỗng `content: ''`), trình duyệt sẽ không render ra phần tử."
      },
      "topicId": "css_pseudo",
      "difficulty": "easy"
    },
    {
      "id": "css_q_3_3",
      "type": "single_choice",
      "question": {
        "en": "Which formula matches all odd-numbered child elements (1, 3, 5, 7...)?",
        "vi": "Công thức nào sau đây nhắm chọn tất cả các phần tử con ở vị trí lẻ (1, 3, 5, 7...)?"
      },
      "options": [
        {
          "en": ":nth-child(2n + 1) or :nth-child(odd)",
          "vi": ":nth-child(2n + 1) hoặc :nth-child(odd)"
        },
        {
          "en": ":nth-child(2n)",
          "vi": ":nth-child(2n)"
        },
        {
          "en": ":nth-child(even)",
          "vi": ":nth-child(even)"
        },
        {
          "en": ":nth-child(n + 2)",
          "vi": ":nth-child(n + 2)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": ":nth-child(odd) or :nth-child(2n+1) calculates odd indices starting at n=0 (1, 3, 5...).",
        "vi": ":nth-child(odd) hoặc :nth-child(2n+1) tính ra các chỉ số lẻ bắt đầu từ n=0 (1, 3, 5...)."
      },
      "topicId": "css_pseudo",
      "difficulty": "medium"
    },
    {
      "id": "css_q_3_4",
      "type": "single_choice",
      "question": {
        "en": "Why is `:focus-visible` preferred over `:focus` for interactive button styling?",
        "vi": "Tại sao `:focus-visible` được khuyên dùng hơn `:focus` khi tạo kiểu cho nút bấm tương tác?"
      },
      "options": [
        {
          "en": "It displays outline rings only during keyboard navigation, suppressing them on mouse clicks",
          "vi": "Nó chỉ hiển thị viền focus khi dùng phím Tab, ẩn đi khi người dùng click chuột"
        },
        {
          "en": "It increases button font size",
          "vi": "Nó tự động tăng kích thước chữ"
        },
        {
          "en": "It works without CSS enabled",
          "vi": "Nó hoạt động mà không cần bật CSS"
        },
        {
          "en": "It loads faster than :focus",
          "vi": "Nó tải nhanh hơn :focus"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": ":focus-visible provides accessibility for keyboard users without displaying unwanted outline rings upon mouse clicks.",
        "vi": ":focus-visible đảm bảo tính tiếp cận cho người dùng bàn phím mà không gây khó chịu khi nhấp chuột."
      },
      "topicId": "css_pseudo",
      "difficulty": "medium"
    },
    {
      "id": "css_q_3_5",
      "type": "true_false",
      "question": {
        "en": "True or False: The `:nth-of-type(n)` selector only counts sibling elements that share the exact same HTML tag type.",
        "vi": "Đúng hay Sai: Bộ chọn `:nth-of-type(n)` chỉ đếm các phần tử anh em có cùng đúng loại thẻ HTML."
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
        "en": ":nth-of-type filters by element tag name before counting, unlike :nth-child which counts all child elements regardless of tag.",
        "vi": ":nth-of-type lọc theo đúng tên thẻ trước khi đếm, khác với :nth-child đếm tất cả phần tử con bất kể thẻ gì."
      },
      "topicId": "css_pseudo",
      "difficulty": "medium"
    },
    {
      "id": "css_q_3_6",
      "type": "single_choice",
      "question": {
        "en": "Which pseudo-element is used to style the selected/highlighted text on a webpage?",
        "vi": "Pseudo-element nào dùng để tạo kiểu cho đoạn văn bản được người dùng bôi đen lựa chọn?"
      },
      "options": [
        {
          "en": "::selection",
          "vi": "::selection"
        },
        {
          "en": "::highlight",
          "vi": "::highlight"
        },
        {
          "en": "::active-text",
          "vi": "::active-text"
        },
        {
          "en": "::focus-text",
          "vi": "::focus-text"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The `::selection` pseudo-element customizes the background and text color of user-highlighted text.",
        "vi": "Pseudo-element `::selection` tùy biến màu nền và màu chữ khi người dùng kéo chuột bôi đen văn bản."
      },
      "topicId": "css_pseudo",
      "difficulty": "easy"
    },
    {
      "id": "css_q_3_7",
      "type": "fill_blank",
      "question": {
        "en": "Fill in the blank: To style the placeholder text inside an `<input>` element, use the pseudo-element ::________",
        "vi": "Điền vào chỗ trống: Để tạo kiểu cho văn bản gợi ý trong ô `<input>`, dùng pseudo-element ::________"
      },
      "fillBlankAnswers": [
        "placeholder"
      ],
      "options": [],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "::placeholder targets the placeholder text of input and textarea elements.",
        "vi": "::placeholder tác động lên phần chữ hướng dẫn mờ trong input và textarea."
      },
      "topicId": "css_pseudo",
      "difficulty": "easy"
    },
    {
      "id": "css_q_3_8",
      "type": "multiple_choice",
      "question": {
        "en": "Which of the following are valid CSS pseudo-elements? (Select all that apply)",
        "vi": "Những mục nào sau đây là pseudo-elements hợp lệ trong CSS? (Chọn tất cả đáp án đúng)"
      },
      "options": [
        {
          "en": "::before",
          "vi": "::before"
        },
        {
          "en": "::after",
          "vi": "::after"
        },
        {
          "en": "::first-letter",
          "vi": "::first-letter"
        },
        {
          "en": ":hover",
          "vi": ":hover"
        }
      ],
      "correctAnswers": [
        0,
        1,
        2
      ],
      "explanation": {
        "en": "::before, ::after, and ::first-letter are pseudo-elements. :hover is a pseudo-class representing a dynamic user state.",
        "vi": "::before, ::after và ::first-letter là pseudo-elements. Còn :hover là pseudo-class chỉ trạng thái tương tác."
      },
      "topicId": "css_pseudo",
      "difficulty": "medium"
    },
    {
      "id": "css_q_3_9",
      "type": "predict_output",
      "question": {
        "en": "In a container with `<h1>Title</h1><p>Para 1</p><p>Para 2</p>`, which element is matched by `p:first-child`?",
        "vi": "Trong container có `<h1>Title</h1><p>Para 1</p><p>Para 2</p>`, phần tử nào khớp với `p:first-child`?"
      },
      "options": [
        {
          "en": "None (because the first child is an <h1>, not a <p>)",
          "vi": "Không có phần tử nào (vì con đầu tiên là <h1>, không phải <p>)"
        },
        {
          "en": "<p>Para 1</p>",
          "vi": "<p>Para 1</p>"
        },
        {
          "en": "<p>Para 2</p>",
          "vi": "<p>Para 2</p>"
        },
        {
          "en": "<h1>Title</h1>",
          "vi": "<h1>Title</h1>"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "p:first-child checks if the element is both the very first child of its parent and a <p>. Since <h1> is child #1, no <p> matches.",
        "vi": "p:first-child kiểm tra xem phần tử có vừa là con đầu tiên vừa là thẻ p không. Vì con đầu tiên là h1 nên không có thẻ p nào khớp."
      },
      "topicId": "css_pseudo",
      "difficulty": "hard"
    },
    {
      "id": "css_q_3_10",
      "type": "true_false",
      "question": {
        "en": "True or False: A single element can have both a `::before` and an `::after` pseudo-element attached simultaneously.",
        "vi": "Đúng hay Sai: Một phần tử HTML có thể cùng lúc sở hữu cả hai pseudo-elements `::before` và `::after`."
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
        "en": "An element can render both ::before (prepended) and ::after (appended) child boxes.",
        "vi": "Một phần tử có thể chứa đồng thời cả ::before (chèn vào đầu) và ::after (chèn vào cuối)."
      },
      "topicId": "css_pseudo",
      "difficulty": "easy"
    }
  ]
};
